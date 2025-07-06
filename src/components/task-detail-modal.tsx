
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Task, TaskComment, TaskTimeEntry, TaskDependency, TaskHistoryEntry, TaskAttachment } from '@/types';
import TaskDependencies from './task-dependencies';
import TaskTimeTracker from './task-time-tracker';
import TaskComments from './task-comments';
import { Clock, MessageSquare, Link, History, Paperclip, Edit, CheckCircle, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  allTasks: Task[];
  comments: TaskComment[];
  timeEntries: TaskTimeEntry[];
  dependencies: TaskDependency[];
  history: TaskHistoryEntry[];
  attachments: TaskAttachment[];
  currentUserId: string;
  currentUserName: string;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onAddComment: (taskId: string, content: string, parentId?: string) => void;
  onStartTimer: (taskId: string) => void;
  onStopTimer: (taskId: string, duration: number, description?: string) => void;
  onAddTimeEntry: (taskId: string, duration: number, description?: string) => void;
  onAddDependency: (prerequisiteTaskId: string) => void;
  onRemoveDependency: (dependencyId: string) => void;
  onEditTask?: () => void;
}

const TaskDetailModal = ({
  isOpen,
  onClose,
  task,
  allTasks,
  comments,
  timeEntries,
  dependencies,
  history,
  attachments,
  currentUserId,
  currentUserName,
  onUpdateTask,
  onAddComment,
  onStartTimer,
  onStopTimer,
  onAddTimeEntry,
  onAddDependency,
  onRemoveDependency,
  onEditTask
}: TaskDetailModalProps) => {
  if (!task) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'blocked': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleToggleComplete = () => {
    onUpdateTask(task.id, {
      isCompleted: !task.isCompleted,
      status: !task.isCompleted ? 'completed' : 'pending',
      completedAt: !task.isCompleted ? new Date().toISOString() : undefined,
      completedBy: !task.isCompleted ? currentUserId : undefined
    });
    toast.success(task.isCompleted ? 'Task marked as incomplete' : 'Task completed!');
  };

  // Filter data for this specific task
  const taskComments = comments.filter(c => c.taskId === task.id);
  const taskTimeEntries = timeEntries.filter(t => t.taskId === task.id);
  const taskHistory = history.filter(h => h.taskId === task.id);
  const taskAttachments = attachments.filter(a => a.taskId === task.id);

  const totalTimeMinutes = taskTimeEntries.reduce((total, entry) => total + (entry.duration || 0), 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-xl mb-2">{task.name}</DialogTitle>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
                <Badge variant="outline" className={getStatusColor(task.status)}>
                  {task.status}
                </Badge>
                {task.department && (
                  <Badge variant="outline" className="capitalize">
                    {task.department}
                  </Badge>
                )}
              </div>
              {task.description && (
                <p className="text-sm text-gray-600 mb-4">{task.description}</p>
              )}
            </div>
            <div className="flex gap-2 ml-4">
              {onEditTask && (
                <Button variant="outline" size="sm" onClick={onEditTask}>
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              <Button
                onClick={handleToggleComplete}
                variant={task.isCompleted ? "outline" : "default"}
                size="sm"
                className={task.isCompleted ? "" : "bg-green-600 hover:bg-green-700"}
              >
                {task.isCompleted ? (
                  <>
                    <XCircle className="h-4 w-4 mr-1" />
                    Mark Incomplete
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Complete Task
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="time" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Time
            </TabsTrigger>
            <TabsTrigger value="comments" className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              Comments ({taskComments.length})
            </TabsTrigger>
            <TabsTrigger value="dependencies" className="flex items-center gap-1">
              <Link className="h-3 w-3" />
              Dependencies
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <History className="h-3 w-3" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Task Details</h4>
                <div className="text-sm space-y-1">
                  <div><strong>Type:</strong> {task.type}</div>
                  <div><strong>Recurrence:</strong> {task.recurrence}</div>
                  <div><strong>Completion Method:</strong> {task.completionMethod}</div>
                  {task.assignedTo && (
                    <div><strong>Assigned To:</strong> {task.assignedTo}</div>
                  )}
                  {task.deadline && (
                    <div><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Progress & Time</h4>
                <div className="text-sm space-y-1">
                  <div><strong>Estimated Duration:</strong> {task.estimatedDuration ? `${task.estimatedDuration}m` : 'Not set'}</div>
                  <div><strong>Time Spent:</strong> {totalTimeMinutes}m</div>
                  {task.isCompleted && task.completedAt && (
                    <div><strong>Completed:</strong> {formatDistanceToNow(new Date(task.completedAt), { addSuffix: true })}</div>
                  )}
                  {taskAttachments.length > 0 && (
                    <div><strong>Attachments:</strong> {taskAttachments.length} files</div>
                  )}
                </div>
              </div>
            </div>

            {task.tags && task.tags.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {task.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="time">
            <TaskTimeTracker
              task={task}
              timeEntries={taskTimeEntries}
              onStartTimer={onStartTimer}
              onStopTimer={onStopTimer}
              onAddTimeEntry={onAddTimeEntry}
            />
          </TabsContent>

          <TabsContent value="comments">
            <TaskComments
              taskId={task.id}
              comments={taskComments}
              currentUserId={currentUserId}
              currentUserName={currentUserName}
              onAddComment={onAddComment}
            />
          </TabsContent>

          <TabsContent value="dependencies">
            <TaskDependencies
              task={task}
              allTasks={allTasks}
              dependencies={dependencies}
              onAddDependency={onAddDependency}
              onRemoveDependency={onRemoveDependency}
            />
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-3">
              {taskHistory.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No history available</p>
              ) : (
                taskHistory.map(entry => (
                  <div key={entry.id} className="flex gap-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{entry.userName}</span>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm">{entry.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailModal;
