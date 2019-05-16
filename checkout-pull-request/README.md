checkout-pull-request
=====================

GitHub Actions' `pull_request` event is triggered when a pull request is opened
or a pull request is changed.  However, its `GITHUB_REPOSITORY`, `GITHUB_REF`,
`GITHUB_SHA`, and the actual workspace directory all refer to the *base* of
the pull request if it's from a forked repository.

This action simply makes the workspace to have the contents that a pull request
actually offered.  More specifically:

 -  The branch name used by a pull request's head is checked out.
 -  The contents are `reset --hard` to A pull request's head commit.
 -  The remote referring to a fork repository is added with a name `fork`.

On the other hand, `GITHUB_REPOSITORY`, `GITHUB_REF`, and `GITHUB_SHA`
environment variables are not touched, because these are determined by
GitHub Actions.  If you need these values parse `GITHUB_EVENT_PATH` file.

If a build is not triggered by `pull_request` event this action does no-op.

    action "checkout-pull-request" {
      uses = "dahlia/actions/checkout-pull-request@master"
    }
