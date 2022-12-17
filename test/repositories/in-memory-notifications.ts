import { Notification } from '@app/entities/notification/notification';
import { NotificationsRepository } from '@app/repositories/notifications';

export class InMemoryNotificationRepository implements NotificationsRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
