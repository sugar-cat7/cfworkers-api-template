---
to: internal/infra/http/dto/<%= h.inflection.underscore(entity.toLowerCase()) %>.ts
---
export class <%= h.inflection.classify(entity) %>Response {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
