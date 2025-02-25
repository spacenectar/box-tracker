import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthMiddleware } from './middleware/auth.middleware';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    HealthcheckModule,
    AuthModule,
    UserModule,
  ],
})
export class V1Module implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('healthcheck').forRoutes('*');
  }
}

