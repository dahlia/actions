#!/usr/bin/python3
import argparse
import html
import os
import pathlib
import re
import sys


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '-r', '--redirect-index',
        action='store_true',
        default=False
    )
    parser.add_argument('dir')
    parser.add_argument('subdir')
    args = parser.parse_args()
    dir = pathlib.Path(args.dir)
    subdir_name = args.subdir
    subdir = dir / subdir_name
    if not dir.is_dir():
        return parser.error(f'not a directory: {dir}')
    if subdir.exists():
        return parser.error(f'already exists: {subdir}')
    tmp = pathlib.Path('.') / f'.tmp_{os.urandom(32).hex()}'
    dir.rename(tmp)
    subdir.parent.mkdir(parents=True)
    tmp.rename(subdir)
    if args.redirect_index:
        index = (subdir / 'index.html').read_bytes()
        base = html.escape(subdir_name)
        if not subdir_name.endswith('/'):
            base += '/'
        redirect_index = re.sub(
            rb'<title\s*>',
            f'<meta http-equiv="refresh" content="0;{base}">'
            f'<base href="{base}">'
            f'<title>'.encode('ascii'),
            index,
            1
        )
        (dir / 'index.html').write_bytes(redirect_index)


if __name__ == '__main__':
    main()
