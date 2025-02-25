import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthcheckService {
  getHealthStatus() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
