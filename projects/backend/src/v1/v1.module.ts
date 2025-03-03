import { Module} from '@nestjs/common';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from './user/user.module';
import { SpacesModule } from './spaces/spaces.module';
import { LocationModule } from './location/location.module';
import { BoxModule } from './box/box.module';

@Module({
  imports: [
    HealthcheckModule,
    AuthModule,
    UserModule,
    SpacesModule,
    LocationModule,
    BoxModule,
  ]
})
export class V1Module {}

