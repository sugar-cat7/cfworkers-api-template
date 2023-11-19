import { AppError } from './error'

export class Result<T, E = AppError> {
  public isSuccess: boolean
  public error?: E
  private value?: T

  private constructor(isSuccess: boolean, value?: T, error?: E) {
    this.isSuccess = isSuccess
    this.value = value
    this.error = error
    Object.freeze(this)
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U, any>(true, value)
  }

  public static fail<U>(error: U): Result<any, U> {
    return new Result<any, U>(false, undefined, error)
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error('Cannot get the value of a failed result.')
    }
    return this.value!
  }

  public getError(): E {
    if (this.isSuccess) {
      throw new Error('Cannot get the error of a successful result.')
    }
    return this.error!
  }
}
