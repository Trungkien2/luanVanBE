import { SetMetadata } from '@nestjs/common';

export const TRANSACTION_REQUIRED_KEY = 'transaction_required';
export const TransactionRequired = () =>
  SetMetadata(TRANSACTION_REQUIRED_KEY, true);
