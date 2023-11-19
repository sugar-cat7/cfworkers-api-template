import { handleErrorOperation } from '@/core/error.helper'
import { Result } from '@/core/result'
import { User } from '@/internal/domain/model/user'
import { IUserRepository } from '@/internal/domain/repository/user'

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<Result<User>> {
    return handleErrorOperation({
      operation: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // FIXME: implement
        return Promise.resolve(user)
      },
    })
  }

  async getById(id: string): Promise<Result<User | null>> {
    return handleErrorOperation({
      operation: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // FIXME: implement
        return Promise.resolve(null)
      },
    })
  }

  async update(user: User): Promise<Result<User>> {
    return handleErrorOperation({
      operation: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // FIXME: implement
        return Promise.resolve(user)
      },
    })
  }

  async delete(id: string): Promise<Result<void>> {
    return handleErrorOperation({
      operation: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // FIXME: implement
        return Promise.resolve()
      },
    })
  }

  async getAll(): Promise<Result<Array<User>>> {
    return handleErrorOperation({
      operation: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // FIXME: implement
        return Promise.resolve([])
      },
    })
  }
}
