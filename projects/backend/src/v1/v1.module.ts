import { Module} from '@nestjs/common';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    HealthcheckModule,
    AuthModule,
    UserModule,
  ],
})
export class V1Module {}

