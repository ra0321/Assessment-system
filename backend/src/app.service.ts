import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from './user/user.service';
import { CronExpression } from '@nestjs/schedule';
import * as cron from 'node-cron';
@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly userService: UserService) {}

  onModuleInit() {
    // Setup cron job to update positions every 3 hours
    cron.schedule(CronExpression.EVERY_3_HOURS, async () => {});

    // Setup cron job to update protocols every 24 hour
    cron.schedule(CronExpression.EVERY_DAY_AT_MIDNIGHT, async () => {});
  }

  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
