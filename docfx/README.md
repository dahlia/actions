docfx
=====

This action builds a typical .NET project's docs using [DocFX].

    action "build docs" {
      uses = "dahlia/actions/docfx@master"
      env = {
        MSBUILD_PROJECT = "MyProject"
      }
      args = ["Docs/docfx.json"]
    }

[DocFX]: https://dotnet.github.io/docfx/


Environments
------------

 -  `MSBUILD_PROJECT`: Specify a project to build using MSBuild.  If omitted
    (default) nothing is built.


Arguments
---------

All `args` are passed to `docfx.exe` command.
