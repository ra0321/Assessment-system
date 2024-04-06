import { Module, Logger } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { ConfigServiceCustom } from './config.service';

@Module({
  imports: [TerminusModule, ConfigModule.forRoot()],
  providers: [Logger, ConfigServiceCustom],
  exports: [ConfigServiceCustom],
})
export class ConfigCustomModule {}
