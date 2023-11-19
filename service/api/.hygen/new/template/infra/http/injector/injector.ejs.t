---
to: internal/infra/http/injector/<%= h.inflection.underscore(entity.toLowerCase()) %>/<%= sublayer %>.ts
---
import { <%= h.inflection.classify(entity) %>Repository } from '@/internal/infra/database/repository/<%= h.inflection.underscore(entity.toLowerCase()) %>';
import { <%= h.inflection.capitalize(sublayer) %><%= h.inflection.classify(entity) %>Interactor } from '@/internal/usecase/<%= h.inflection.underscore(entity.toLowerCase()) %>/<%= sublayer %>';
import { <%= h.inflection.capitalize(sublayer) %><%= h.inflection.classify(entity) %>Handler } from '@/internal/infra/http/server/<%= h.inflection.underscore(entity.toLowerCase()) %>/<%= sublayer %>';

export class <%= h.inflection.capitalize(sublayer) %><%= h.inflection.classify(entity) %>Injector {
  handler(): <%= h.inflection.capitalize(sublayer) %><%= h.inflection.classify(entity) %>Handler {
    const <%= h.inflection.camelize(entity.toLowerCase(), true) %>Repository = new <%= h.inflection.classify(entity) %>Repository();
    const <%= h.inflection.camelize(entity.toLowerCase(), true) %><%= h.inflection.capitalize(sublayer) %>Usecase = new <%= h.inflection.capitalize(sublayer) %><%= h.inflection.classify(entity) %>Interactor(<%= h.inflection.camelize(entity.toLowerCase(), true) %>Repository);
    return new <%= h.inflection.capitalize(sublayer) %><%= h.inflection.classify(entity) %>Handler(<%= h.inflection.camelize(entity.toLowerCase(), true) %><%= h.inflection.capitalize(sublayer) %>Usecase);
  }
}
