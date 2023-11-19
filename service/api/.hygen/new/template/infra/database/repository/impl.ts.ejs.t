---
to: internal/infra/database/repository/<%= h.inflection.underscore(entity.toLowerCase()) %>.ts
---
import { handleErrorOperation } from "@/core/error.helper";
import { Result } from "@/core/result";
import { <%= h.inflection.classify(entity) %> } from '@/internal/domain/model/<%= h.inflection.underscore(entity.toLowerCase()) %>'
import { I<%= h.inflection.classify(entity) %>Repository } from '@/internal/domain/repository/<%= h.inflection.underscore(entity.toLowerCase()) %>'

export class <%= h.inflection.classify(entity) %>Repository implements I<%= h.inflection.classify(entity) %>Repository {
  async create(<%= h.inflection.camelize(entity.toLowerCase(), true) %>: <%= h.inflection.classify(entity) %>): Promise<Result<<%= h.inflection.classify(entity) %>>> {
    return handleErrorOperation({
      operation: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // FIXME: implement
        return Promise.resolve(<%= h.inflection.camelize(entity.toLowerCase(), true) %>);
      },
    });
  }

  async getById(id: string): Promise<Result<<%= h.inflection.classify(entity) %>|null>> {
    return handleErrorOperation({
      operation: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // FIXME: implement
        return Promise.resolve(null);
      },
    });
  }

  async update(<%= h.inflection.camelize(entity.toLowerCase(), true) %>: <%= h.inflection.classify(entity) %>): Promise<Result<<%= h.inflection.classify(entity) %>>> {
    return handleErrorOperation({
      operation: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // FIXME: implement
        return Promise.resolve(<%= h.inflection.camelize(entity.toLowerCase(), true) %>);
      },
    });
  }


  async delete(id: string): Promise<Result<void>> {
    return handleErrorOperation({
      operation: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // FIXME: implement
        return Promise.resolve()
      },
    });
  }

  async getAll(): Promise<Result<Array<<%= h.inflection.classify(entity) %>>>> {
    return handleErrorOperation({
      operation: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // FIXME: implement
        return Promise.resolve([]);
      },
    });
  }
}
