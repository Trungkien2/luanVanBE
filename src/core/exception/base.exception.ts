import { IException } from '../interface/exception.interface';

export class BaseException extends Error {
  public options: IException;
  public status?: number; // Add status property

  constructor(_options: IException, _type: string, status?: number) {
    super();
    this.options = Object.assign({}, _options);
    this.options.type = `${_type}_${_options.type}`;
    this.status = status; // Assign status if provided
  }

  toJSON() {
    return this.options;
  }
}
