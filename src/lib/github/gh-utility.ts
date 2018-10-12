/**
 * function that returns common payload properties.
 */

import { Context } from "./types";

export default function commonPayloadProps (context: Context): any {
  const owner = context.payload.repository.owner.login;
  const repo = context.payload.repository.name;
  const fields = { owner, repo };

  return fields;
}