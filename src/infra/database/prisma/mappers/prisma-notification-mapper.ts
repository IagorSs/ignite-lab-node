import { Notification } from '@app/entities/notification/notification';
import { Notification as DbNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification): DbNotification {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt ?? null,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt ?? null,
    };
  }
}
