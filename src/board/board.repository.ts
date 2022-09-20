import { NotFoundException } from '@nestjs/common';
import { CustomRepository } from 'libs/db/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);

    return board;
  }

  async deleteBoard(id: number): Promise<void | any> {
    const result = await this.delete(id);

    if (result.affected === 0) {
      return new NotFoundException(`Can't find Board with id ${id}`);
    }
  }
}
