import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CustomRepository } from 'libs/db/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      console.log('Error: ', error);

      if (error.code === '23505') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.delete(id);

    console.log('deleted');
    console.log(user);
  }
}
