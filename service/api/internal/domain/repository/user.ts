import { Result } from '@/core/result'
import { User } from '@/internal/domain/model/user'

export interface IUserRepository {
  create(user: User): Promise<Result<User>>
  getById(id: string): Promise<Result<User | null>>
  update(user: User): Promise<Result<User>>
  delete(id: string): Promise<Result<void>>
  getAll(): Promise<Result<Array<User>>>
}
