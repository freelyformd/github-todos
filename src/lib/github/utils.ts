/**
 * function that returns basic repository properties from payload.
 */

import { Context } from "./types";

export interface RepoProps {
  owner: string;
  repo: string;
}

export function getBasicRepoProps (context: Context): RepoProps {
  const owner = context.payload.repository.owner.login;
  const repo = context.payload.repository.name;
  const fields = { owner, repo };

  return fields;
}
