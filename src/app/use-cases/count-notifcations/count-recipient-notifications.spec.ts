import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications';
import { Notification } from '@app/entities/notification/notification';
import { Content } from '@app/entities/notification/content/content';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const recipientIdUser = 'recipient-1';
    const recipientIdAnotherUser = 'recipient-2';

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade!'),
        recipientId: recipientIdUser,
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade!'),
        recipientId: recipientIdUser,
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade!'),
        recipientId: recipientIdAnotherUser,
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: recipientIdUser,
    });

    expect(count).toEqual(2);
  });
});
