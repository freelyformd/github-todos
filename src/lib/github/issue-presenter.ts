import { RepoIssues } from "../parser";

type Comment = string;
type Title = string;
interface IssueWithComments {
   title: Title;
   comments: Comment[];
}

const returnIssueWithComments = (data: RepoIssues[]): IssueWithComments => {
const  arrayComments = data.map((issue) => {
    return  {
           title: issue.keyWord,
           comments: [issue.commentText]
       };
    });
const objComments = arrayComments.reduce((acc, obj) => {
        return {
        ...acc,
        title: obj.title,
        comments: [...obj.comments]
        };
      }, {});
    return objComments;
};

export default returnIssueWithComments;