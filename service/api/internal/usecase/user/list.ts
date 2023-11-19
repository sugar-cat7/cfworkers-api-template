import { handleErrorOperation } from '@/core/error.helper'
import { Result } from '@/core/result'
import { User } from '@/internal/domain/model/user'
import { IUserRepository } from '@/internal/domain/repository/user'

export interface IListUserInput {
  // FIXME: implement
}

// Output Port
export interface IListUserOutput {
  // FIXME: implement
  id: string
}

export class ListUserInteractor {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(input: IListUserInput): Promise<Result<IListUserOutput>> {
    // FIXME: implement
    return handleErrorOperation({
      operation: async () => {
        const output: IListUserOutput = {
          id: '',
        }
        return Promise.resolve(output)
      },
    })
  }
}
