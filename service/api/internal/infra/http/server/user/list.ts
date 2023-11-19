import { Context } from "hono";
import { UserSchema } from "@/schema/shared/schema";
import { ListUserInteractor } from "@/internal/usecase/user/list";
import { UserResponse } from "@/internal/infra/http/dto/user";

export class ListUserHandler {
  private listUserUsecase: ListUserInteractor;

  constructor(listUserUsecase: ListUserInteractor) {
    this.listUserUsecase = listUserUsecase;
  }

  async listUser(c: Context): Promise<Response> {
    // const validationResult = UserSchema.safeParse(await c.req.json())
    // if (!validationResult.success) {
    //   return c.json({ error: validationResult.error.flatten() }, 400)
    // }

    // const input = validationResult.data
    const result = await this.listUserUsecase.execute({});

    if (!result.isSuccess) {
      // FIXME: implement
      return c.json({ error: result.error?.message }, result.error?.code);
    }

    // FIXME: implement
    const output = result.getValue();
    const response = new UserResponse(output.id);

    return c.json(response, 200);
  }
}
