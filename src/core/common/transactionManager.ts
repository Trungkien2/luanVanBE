import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
@Injectable()
export class TransactionManager {
  constructor(private readonly sequelize: Sequelize) {}

  async startTransaction() {
    return await this.sequelize.transaction();
  }
}
