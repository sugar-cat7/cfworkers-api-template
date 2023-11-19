---
to: internal/usecase/<%= h.inflection.underscore(entity.toLowerCase()) %>/<%= sublayer %>.ts
---
import { handleErrorOperation } from "@/core/error.helper";
import { Result } from "@/core/result";
import { <%= h.inflection.classify(entity) %> } from '@/internal/domain/model/<%= h.inflection.underscore(entity.toLowerCase()) %>'
import { I<%= h.inflection.classify(entity) %>Repository } from '@/internal/domain/repository/<%= h.inflection.underscore(entity.toLowerCase()) %>'

export interface I<%= h.inflection.classify(sublayer) %><%= h.inflection.classify(entity) %>Input {
  // FIXME: implement
}

// Output Port
export interface I<%= h.inflection.classify(sublayer) %><%= h.inflection.classify(entity) %>Output {
  // FIXME: implement
  id: string;
}

export class <%= h.inflection.classify(sublayer) %><%= h.inflection.classify(entity) %>Interactor {
  private <%= h.inflection.camelize(entity.toLowerCase(), true) %>Repository: I<%= h.inflection.classify(entity) %>Repository;

  constructor(<%= h.inflection.camelize(entity.toLowerCase(), true) %>Repository: I<%= h.inflection.classify(entity) %>Repository) {
    this.<%= h.inflection.camelize(entity.toLowerCase(), true) %>Repository = <%= h.inflection.camelize(entity.toLowerCase(), true) %>Repository;
  }

  async execute(input: I<%= h.inflection.classify(sublayer) %><%= h.inflection.classify(entity) %>Input): Promise<Result<I<%= h.inflection.classify(sublayer) %><%= h.inflection.classify(entity) %>Output>> {
    // FIXME: implement
    return handleErrorOperation({
      operation: async () => {
        const output: I<%= h.inflection.classify(sublayer) %><%= h.inflection.classify(entity) %>Output = {
          id: "",
        };
        return Promise.resolve(output);
      },
    });
  }
}
