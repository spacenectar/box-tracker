import { Module } from '@nestjs/common';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from './user/user.module';
import { SpaceModule } from './space/space.module';
import { LocationModule } from './location/location.module';
import { BoxModule } from './box/box.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    HealthcheckModule,
    AuthModule,
    UserModule,
    SpaceModule,
    LocationModule,
    BoxModule,
    ItemModule,
  ],
})
export class V1Module {}

