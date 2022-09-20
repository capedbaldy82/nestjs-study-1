import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'libs/db/typeorm-ex.module';
import { BoardsController } from './board.controller';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardsService } from './board.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([BoardRepository])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardModule {}
