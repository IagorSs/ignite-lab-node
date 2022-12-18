import { Content } from '@app/entities/notification/content/content';
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

  static toDomain(dbNotification: DbNotification): Notification {
    return new Notification(
      {
        category: dbNotification.category,
        content: new Content(dbNotification.content),
        recipientId: dbNotification.recipientId,
        readAt: dbNotification.readAt,
        createdAt: dbNotification.createdAt,
      },
      dbNotification.id,
    );
  }
}
