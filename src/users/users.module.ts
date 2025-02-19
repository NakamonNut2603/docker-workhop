import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from './middleware/current-user.middleware';
import { Report } from 'src/reports/report.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Report])],
    controllers: [UsersController],
    providers: [
        UsersService,
        AuthService
    ]
})
export class UsersModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CurrentUserMiddleware).forRoutes("*");
    }
}
