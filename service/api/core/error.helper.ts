import { AppError, StatusCode } from '@/core/error'
import { Result } from '@/core/result'

interface ErrorOptions {
  errorCode?: StatusCode
  errorMessage?: string
}

export async function handleErrorOperation<T>({
  operation,
  errorOptions = {},
}: {
  operation: () => Promise<T>
  errorOptions?: ErrorOptions
}): Promise<Result<T>> {
  try {
    const result = await operation()
    return Result.ok(result)
  } catch (error: unknown) {
    const detailedMessage =
      error instanceof Error
        ? `${errorOptions.errorMessage || 'An unexpected error occurred'}: ${error.message}`
        : errorOptions.errorMessage || 'An unexpected error occurred'
    const appError = new AppError(
      errorOptions.errorCode || StatusCode.INTERNAL_SERVER_ERROR,
      detailedMessage
    )
    return Result.fail(appError)
  }
}
