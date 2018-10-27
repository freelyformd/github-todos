export interface Context {
  github: any; // an object with octokit methods
  payload: any;
  logger: any;
  issue: any; // methods
  repo: any;  // methods
}

export interface Issue {
  title: string;
  body: string;
}

export interface RepoProps {
  owner: string;
  repo: string;
}

export interface GHIssue {
  comments: string[];
  number: number;
  title: string;
}
