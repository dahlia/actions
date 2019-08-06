FROM alpine/git:1.0.7

LABEL "com.github.actions.name" = "checkout-pull-request"
LABEL "com.github.actions.description" = \
  "Make the workspace to have the contents that a pull request offered."
LABEL "com.github.actions.icon" = "git-pull-request"
LABEL "com.github.actions.color" = "purple"

LABEL "repository" = "http://github.com/dahlia/actions"
LABEL "homepage" = "http://github.com/dahlia/actions"
LABEL "maintainer" = "Hong Minhee <hong.minhee@gmail.com>"

RUN apk add --no-cache jq

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
