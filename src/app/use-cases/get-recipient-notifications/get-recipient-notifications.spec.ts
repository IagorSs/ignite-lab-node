import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: recipientIdUser,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: recipientIdUser }),
        expect.objectContaining({ recipientId: recipientIdUser }),
      ]),
    );
  });
});
