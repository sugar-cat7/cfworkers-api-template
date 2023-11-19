---
to: internal/infra/http/server/<%= h.inflection.underscore(entity.toLowerCase()) %>/<%= sublayer %>.ts
---
import { Context } from 'hono';
import { <%= h.inflection.classify(entity) %>Schema } from '@/schema/shared/schema';
import { <%= h.inflection.classify(sublayer) %><%= h.inflection.classify(entity) %>Interactor } from '@/internal/usecase/<%= h.inflection.underscore(entity.toLowerCase()) %>/<%= sublayer %>';
import { <%= h.inflection.classify(entity) %>Response } from '@/internal/infra/http/dto/<%= h.inflection.underscore(entity.toLowerCase()) %>';

export class <%= h.inflection.classify(sublayer) %><%= h.inflection.classify(entity) %>Handler {
  private <%= h.inflection.camelize(sublayer.toLowerCase(), true) %><%= h.inflection.classify(entity) %>Usecase: <%= h.inflection.classify(sublayer) %><%= h.inflection.classify(entity) %>Interactor;

  constructor(<%= h.inflection.camelize(sublayer.toLowerCase(), true) %><%= h.inflection.classify(entity) %>Usecase: <%= h.inflection.classify(sublayer) %><%= h.inflection.classify(entity) %>Interactor) {
    this.<%= h.inflection.camelize(sublayer.toLowerCase(), true) %><%= h.inflection.classify(entity) %>Usecase = <%= h.inflection.camelize(sublayer.toLowerCase(), true) %><%= h.inflection.classify(entity) %>Usecase;
  }

  async <%= h.inflection.camelize(sublayer.toLowerCase(), true) %><%= h.inflection.classify(entity) %>(c: Context): Promise<Response> {
    const validationResult = <%= h.inflection.classify(entity) %>Schema.safeParse(await c.req.json());
    if (!validationResult.success) {
      return c.json({ error: validationResult.error.flatten() }, 400);
    }

    const input = validationResult.data;
    const result = await this.<%= h.inflection.camelize(sublayer.toLowerCase(), true) %><%= h.inflection.classify(entity) %>Usecase.execute(input);

    if (!result.isSuccess) {
      // FIXME: implement
      return c.json({ error: result.error?.message }, result.error?.code);
    }

    // FIXME: implement
    const output = result.getValue();
    const response = new <%= h.inflection.classify(entity) %>Response(output.id);

    return c.json(response, 201);
  }
}
