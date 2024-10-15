import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { CrudService } from 'src/core/Base/crud.service';

@Injectable()
export class UserService  extends CrudService<User> {
  constructor() {
    super(User);
  }
  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }
}
