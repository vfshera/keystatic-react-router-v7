import type { Route } from "./+types/api.keystatic.$";
import keystaticConfig from "../../keystatic.config";
import { type APIRouteConfig, makeGenericAPIRouteHandler } from "@keystatic/core/api/generic";

async function handleLoader(
  _config: APIRouteConfig,
  args: {
    request: Request;
    params: {
      readonly [key: string]: string | undefined;
    };
    context: Record<string, unknown>;
  },
) {
  const handler = makeGenericAPIRouteHandler(_config);
  const { body, headers, status } = await handler(args.request);

  return new Response(body, { headers, status });
}

export async function loader(args: Route.LoaderArgs) {
  return handleLoader({ config: keystaticConfig }, args);
}

export async function action(args: Route.ActionArgs) {
  return handleLoader({ config: keystaticConfig }, args);
}
