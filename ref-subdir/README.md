ref-subdir
==========

This action pushes a specified directory into its subdirectory of a branch
name or a tag name.  It is useful for building a static website from multiple
branches and tags and publishing them as subdirectories.

The following example pushes contents in the *_site/* directory into
a subdirectory like *_site/master/* or *_site/1.0.0/*.

    action "ref-subdir" {
      uses = "dahlia/actions/ref-subdir@master"
      env = {
        DIR = "_site"
      }
    }


Environments
------------

 -  `DIR`: The path of the directory that contains contents to push into
    a subdirectory.  By default, `.` is used.

 -  `REDIRECT_INDEX`: Turn on by passing any value like `1`, to create an
    *index.html* in the `DIR` root which redirects to a created subdirectory.
    It is useful for redirecting from the root URL to the subdirectory URL
    of the latest released website.  Turned off by default.
