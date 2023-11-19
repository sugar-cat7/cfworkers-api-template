---
to: internal/domain/repository/<%= h.inflection.underscore(entity.toLowerCase()) %>.ts
---
import { Result } from "@/core/result";
import { <%= h.inflection.classify(entity) %> } from '@/internal/domain/model/<%= h.inflection.underscore(entity.toLowerCase()) %>'

export interface I<%= h.inflection.classify(entity) %>Repository {
  create(<%= h.inflection.camelize(entity.toLowerCase(), true) %>: <%= h.inflection.classify(entity) %>): Promise<Result<<%= h.inflection.classify(entity) %>>>;
  getById(id: string): Promise<Result<<%= h.inflection.classify(entity) %>|null>>;
  update(<%= h.inflection.camelize(entity.toLowerCase(), true) %>: <%= h.inflection.classify(entity) %>): Promise<Result<<%= h.inflection.classify(entity) %>>>;
  delete(id: string): Promise<Result<void>>;
  getAll(): Promise<Result<Array<<%= h.inflection.classify(entity) %>>>>;
}
