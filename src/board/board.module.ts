import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'libs/db/typeorm-ex.module';
import { AuthModule } from 'src/auth/auth.module';
import { BoardsController } from './board.controller';
import { BoardRepository } from './board.repository';
import { BoardsService } from './board.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([BoardRepository]), AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardModule {}
