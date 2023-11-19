---
to: internal/domain/model/<%= h.inflection.underscore(entity.toLowerCase()) %>.ts
---
export class <%= h.inflection.classify(entity) %> {
  // FIXME: implement
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
