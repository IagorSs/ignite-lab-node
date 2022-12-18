import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const recipientIdUser = 'recipient-1';
    const recipientIdAnotherUser = 'recipient-2';

    await notificationsRepository.create(
      makeNotification({ recipientId: recipientIdUser }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: recipientIdUser }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: recipientIdAnotherUser }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: recipientIdUser,
    });

    expect(count).toEqual(2);
  });
});
