import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmExModule } from 'libs/db/typeorm-ex.module';
import { AuthController } from './auth.controller';
import { UserRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'Secret1234',
      signOptions: {
        expiresIn: 60 * 60,
      },
    }),
    TypeOrmExModule.forCustomRepository([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
