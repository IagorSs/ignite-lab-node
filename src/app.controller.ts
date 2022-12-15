import { PrismaService } from './prisma.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from './create-notification-body';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('notifications')
  getNotifications() {
    return this.prismaService.notification.findMany();
  }

  @Post('notifications')
  async createNotification(@Body() body: CreateNotificationBody) {
    await this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        content: body.content,
        category: body.category,
        recipientId: body.recipientId,
      },
    });
  }
}
