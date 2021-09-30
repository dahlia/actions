setup-yq
========

This action helps you to install [yq] in GitHub Actions.  Supports all platforms
and architectures that [yq] officially supports.

    - uses: dahlia/actions/setup-yq@main
      with:
        version: "4.13.2"

It automatically installs the latest version if the `version` parameter is
omitted:

    - uses: dahlia/actions/setup-yq@main

[yq]: https://github.com/mikefarah/yq
