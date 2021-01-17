yajsv
=====

This action validates if JSON/YAML files comply schema using [yajsv].

    - uses: dahlia/actions/yajsv@master
      with:
        schema: schema.json
        documents: data/*.json

[yajsv]: https://github.com/neilpa/yajsv
