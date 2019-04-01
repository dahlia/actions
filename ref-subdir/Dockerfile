FROM python:3.7-alpine3.9

LABEL "com.github.actions.name" = "ref-subdir"
LABEL "com.github.actions.description" = \
    "Copy files into a subdir of the ref name"
LABEL "com.github.actions.icon" = "folder-plus"
LABEL "com.github.actions.color" = "blue"

LABEL "repository" = "http://github.com/dahlia/actions"
LABEL "homepage" = "http://github.com/dahlia/actions"
LABEL "maintainer" = "Hong Minhee <hong.minhee@gmail.com>"

COPY entrypoint.sh /entrypoint.sh
COPY ref_subdir.py /ref_subdir.py

ENTRYPOINT ["/entrypoint.sh"]
