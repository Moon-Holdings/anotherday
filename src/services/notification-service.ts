
import { Task } from '@/types';

export interface Notification {
  id: string;
  type: 'reminder' | 'overdue' | 'assignment' | 'completion' | 'escalation';
  title: string;
  message: string;
  taskId?: string;
  userId?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
  isRead: boolean;
  actionRequired?: boolean;
}

export class NotificationService {
  private notifications: Notification[] = [];
  private listeners: ((notifications: Notification[]) => void)[] = [];

  // Subscribe to notification updates
  subscribe(callback: (notifications: Notification[]) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  // Notify all listeners
  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.notifications));
  }

  // Create a new notification
  createNotification(notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      isRead: false
    };

    this.notifications.unshift(newNotification);
    this.notifyListeners();
  }

  // Check for overdue tasks and create notifications
  checkOverdueTasks(tasks: Task[]) {
    const now = new Date();
    tasks.forEach(task => {
      if (task.deadline && new Date(task.deadline) < now && !task.isCompleted) {
        const existingNotification = this.notifications.find(
          n => n.taskId === task.id && n.type === 'overdue'
        );

        if (!existingNotification) {
          this.createNotification({
            type: 'overdue',
            title: 'Task Overdue',
            message: `"${task.name}" is overdue and needs immediate attention`,
            taskId: task.id,
            priority: task.priority === 'urgent' ? 'urgent' : 'high',
            actionRequired: true
          });
        }
      }
    });
  }

  // Mark notification as read
  markAsRead(notificationId: string) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      this.notifyListeners();
    }
  }

  // Get all notifications
  getNotifications() {
    return this.notifications;
  }

  // Get unread count
  getUnreadCount() {
    return this.notifications.filter(n => !n.isRead).length;
  }
}

export const notificationService = new NotificationService();
