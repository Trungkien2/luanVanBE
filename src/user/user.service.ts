import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/core/Base/crud.service';
import { User } from './user.entity';

@Injectable()
export class UserService  extends CrudService<User> {
  constructor() {
    super(User);
  }
  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  async updatePassWord({email,newPassword}:{email : string,newPassword : string}): Promise<any>{
    try {
      
    } catch (error) {
      
    }
  }
}
