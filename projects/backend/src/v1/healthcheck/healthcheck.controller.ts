import { Controller, Get } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';
import { Public } from '../../decorators/public.decorator';
@Controller('healthcheck')
export class HealthcheckController {
  constructor(private readonly healthcheckService: HealthcheckService) {}

  @Public()
  @Get()
  checkHealth() {
    return this.healthcheckService.getHealthStatus();
  }
}
