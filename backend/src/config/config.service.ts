import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigServiceCustom {
  constructor(private readonly configService: ConfigService) {}
}
