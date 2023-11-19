import { UserRepository } from '@/internal/infra/database/repository/user'
import { ListUserInteractor } from '@/internal/usecase/user/list'
import { ListUserHandler } from '@/internal/infra/http/server/user/list'

export class ListUserInjector {
  handler(): ListUserHandler {
    const userRepository = new UserRepository()
    const userListUsecase = new ListUserInteractor(userRepository)
    return new ListUserHandler(userListUsecase)
  }
}
