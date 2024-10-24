import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TRANSACTION_REQUIRED_KEY } from '../decorator/transactions.decorator';
import { TransactionManager } from '../common/transactionManager';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly transactionManager: TransactionManager) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const handler = context.getHandler();
    const requiresTransaction = Reflect.getMetadata(
      TRANSACTION_REQUIRED_KEY,
      handler,
    );

    let transaction;

    if (requiresTransaction) {
      transaction = await this.transactionManager.startTransaction(); // Khởi tạo transaction
      context.switchToHttp().getRequest().transaction = transaction;
    }

    return next.handle().pipe(
      tap(() => {
        if (transaction) {
          //   transaction.commit(); // Commit nếu không có lỗi
        }
      }),
      catchError(async (error) => {
        if (transaction) {
          await transaction.rollback(); // Rollback nếu có lỗi
        }
        throw error; // Ném lại lỗi để nó được xử lý ở cấp cao hơn
      }),
    );
  }
}
