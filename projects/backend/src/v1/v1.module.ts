import { Module} from '@nestjs/common';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from './user/user.module';
import { SpacesModule } from './spaces/spaces.module';
import { LocationController } from './location/location.controller';
import { LocationService } from './location/location.service';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    HealthcheckModule,
    AuthModule,
    UserModule,
    SpacesModule,
    LocationModule,
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class V1Module {}

