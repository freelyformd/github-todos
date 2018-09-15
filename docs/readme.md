# How app works

___

The app basically searches through a repo's source code and looks for occurrences of key words such as TODO and FIXME.

On finding these key words it creates a github issue titled <KeyWord> with file name. eg `TODOs from main.ts`

The issues in that file are turned into a check list containing issue description with issue author (git committer).

Architecture.
____

- We need a module that searches through a repo's source code and searches for TODOs FixMe comments within new git commits.

- We need another module that sends found TODOs to github. This module should also
assigns the commits author to the created issue. It could also add relative labels to created issue.

- We could also have a module that tracks metrics around these created issues.
