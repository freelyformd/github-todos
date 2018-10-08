export interface Context {
  github: any; // an object with octokit methods
  payload: any;
  logger: any;
  issue: any; // methods
  repo: any;  // methods
}
