import { Controller, Get } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';
import { Public } from '../../decorators/public.decorator';
@Controller({ path: 'healthcheck', version: '1' })
export class HealthcheckController {
  constructor(private readonly healthcheckService: HealthcheckService) {}

  @Public()
  @Get()
  checkHealth() {
    return this.healthcheckService.getHealthStatus();
  }
}
