import { PrismaNotificationRepository } from './prisma/repositories/prisma-notifications-repository';
import { NotificationsRepository } from 'src/app/repositories/notifications';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
