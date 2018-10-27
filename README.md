[![CircleCI](https://circleci.com/gh/freelyformd/github-todos.svg?style=svg)](https://circleci.com/gh/freelyformd/github-todos)

# Github App that creates issue's out of TODO and FIXME comments

The app basically searches through a repo's source code and looks for occurrences of key words such as TODO and FIXME.

On finding these key words it creates a github issue titled <KeyWord> with file name. eg `TODOs from main.ts`

The issues in that file are turned into a check list containing issue description with issue author (git committer).


## Setup

```sh
# Install dependencies
yarn

# Run the bot
yarn start
```

Setting up bot for first time
____

- If developing locally you will need a webhook URL. Follow instructions [here] (https://probot.github.io/docs/development/#configure-a-github-app)

- Run `npm start` and follow instructions [here](https://probot.github.io/docs/development/)

- Go to developer settings of the account where bot is installed and give bot access for the following permissions and corresponding events;
    - Repository
    - Issues
    - Pull requests
    - Repository contents

- In github developer settings click on install app and chose repositories on which you want app to access.
