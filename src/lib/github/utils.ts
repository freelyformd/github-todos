/**
 * function that returns basic repository properties from payload.
 */

import * as R from "ramda";
import { Context } from "./types";

export interface RepoProps {
  owner: string;
  repo: string;
}

export interface Issue {
  title: string;
  body: string;
}

export function getBasicRepoProps (context: Context): RepoProps {
  const owner = context.payload.repository.owner.login;
  const repo = context.payload.repository.name;
  const fields = { owner, repo };

  return fields;
}

// returns issue diff. Diff pre-existing issues on github with new ones
// from source code
export function diffIssues (repo: Issue[], github: Issue[]): Issue[] {
  const groupedObj = R.groupBy(obj => obj.title, repo);
  return Object.keys(groupedObj).map((key) => {

    const bodyArr = github.map(old => {
      if (key === old.title) {
        const newIssueArr = groupedObj[key][0].body.split(`\n`);
        const oldIssueArr = old.body.split(`\n`);
        return newIssueArr.filter(iss => !oldIssueArr.includes(iss));
      }
      return null;
    })
    .filter(body => body !== null );

    return {title: key, body: R.flatten(bodyArr).join(`\n`)};
  });
}
