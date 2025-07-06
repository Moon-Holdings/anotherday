
import { Task, ShiftType, ShiftAction, Department, TaskRecurrence } from '@/types';
import { notificationService } from './notification-service';

export interface TaskTemplate {
  id: string;
  name: string;
  description?: string;
  department: Department;
  shift: ShiftType;
  shiftAction: ShiftAction;
  daysOfWeek: number[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedDuration?: number;
  completionMethod: 'checkmark' | 'photo' | 'quantity' | 'photo-checkmark';
  quantityRequired?: number;
  recurrence: TaskRecurrence;
  isActive: boolean;
}

export class TaskScheduler {
  private templates: TaskTemplate[] = [];
  private scheduledTasks: Task[] = [];

  // Add a task template
  addTemplate(template: Omit<TaskTemplate, 'id'>) {
    const newTemplate: TaskTemplate = {
      ...template,
      id: Math.random().toString(36).substr(2, 9)
    };
    this.templates.push(newTemplate);
    return newTemplate;
  }

  // Generate tasks for a specific date based on templates
  generateTasksForDate(date: Date): Task[] {
    const dayOfWeek = date.getDay();
    const generatedTasks: Task[] = [];

    this.templates
      .filter(template => template.isActive && template.daysOfWeek.includes(dayOfWeek))
      .forEach(template => {
        const task: Task = {
          id: Math.random().toString(36).substr(2, 9),
          name: template.name,
          description: template.description,
          department: template.department,
          shift: template.shift,
          shiftAction: template.shiftAction,
          priority: template.priority,
          status: 'pending',
          assignmentType: 'role',
          completionMethod: template.completionMethod,
          type: 'role',
          recurrence: template.recurrence,
          estimatedDuration: template.estimatedDuration,
          quantityRequired: template.quantityRequired,
          quantityOnHand: template.quantityRequired,
          isCompleted: false,
          createdAt: date.toISOString(),
          scheduledFor: date.toISOString()
        };

        // Set deadline based on shift
        const deadline = new Date(date);
        switch (template.shift) {
          case 'morning':
            deadline.setHours(template.shiftAction === 'opening' ? 10 : 14);
            break;
          case 'lunch':
            deadline.setHours(template.shiftAction === 'opening' ? 12 : 16);
            break;
          case 'afternoon':
            deadline.setHours(template.shiftAction === 'opening' ? 16 : 20);
            break;
          case 'evening':
            deadline.setHours(template.shiftAction === 'opening' ? 18 : 23);
            break;
        }
        task.deadline = deadline.toISOString();

        generatedTasks.push(task);
      });

    return generatedTasks;
  }

  // Auto-adjust task priorities based on deadlines and dependencies
  adjustTaskPriorities(tasks: Task[]): Task[] {
    const now = new Date();
    
    return tasks.map(task => {
      if (task.deadline && !task.isCompleted) {
        const deadline = new Date(task.deadline);
        const hoursUntilDeadline = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);
        
        // Escalate priority if deadline is approaching
        if (hoursUntilDeadline <= 1 && task.priority !== 'urgent') {
          notificationService.createNotification({
            type: 'escalation',
            title: 'Task Priority Escalated',
            message: `"${task.name}" priority escalated due to approaching deadline`,
            taskId: task.id,
            priority: 'urgent',
            actionRequired: true
          });
          
          return { ...task, priority: 'urgent' as const };
        } else if (hoursUntilDeadline <= 2 && task.priority === 'low') {
          return { ...task, priority: 'medium' as const };
        }
      }
      
      return task;
    });
  }

  // Balance workload across team members
  balanceWorkload(tasks: Task[], teamMembers: string[]): Task[] {
    const unassignedTasks = tasks.filter(task => !task.assignedTo);
    const workloadCount = teamMembers.reduce((acc, member) => {
      acc[member] = tasks.filter(task => task.assignedTo === member && !task.isCompleted).length;
      return acc;
    }, {} as Record<string, number>);

    return tasks.map(task => {
      if (!task.assignedTo && task.assignmentType === 'user') {
        // Find team member with least workload
        const leastBusyMember = teamMembers.reduce((least, member) => 
          workloadCount[member] < workloadCount[least] ? member : least
        );
        
        workloadCount[leastBusyMember]++;
        
        notificationService.createNotification({
          type: 'assignment',
          title: 'New Task Assigned',
          message: `You have been assigned: "${task.name}"`,
          taskId: task.id,
          userId: leastBusyMember,
          priority: task.priority,
          actionRequired: true
        });
        
        return { ...task, assignedTo: leastBusyMember };
      }
      return task;
    });
  }

  // Get all templates
  getTemplates() {
    return this.templates;
  }

  // Update template
  updateTemplate(id: string, updates: Partial<TaskTemplate>) {
    const templateIndex = this.templates.findIndex(t => t.id === id);
    if (templateIndex !== -1) {
      this.templates[templateIndex] = { ...this.templates[templateIndex], ...updates };
    }
  }

  // Delete template
  deleteTemplate(id: string) {
    this.templates = this.templates.filter(t => t.id !== id);
  }
}

export const taskScheduler = new TaskScheduler();
