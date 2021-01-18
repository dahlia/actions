#!/usr/bin/python3
import glob
import re
import subprocess
import sys


def main():
    schema = sys.argv[1]
    documents = glob.glob(sys.argv[2])

    r = subprocess.run(
        ['yajsv', '-s', schema, *documents],
        capture_output=True,
        encoding='utf-8',
    )
    p = re.compile(r'([^:]+): fail: (.+)')

    for line in r.stdout.splitlines():
        line = line.strip()
        m = p.match(line)
        if m:
            print(f'::error file={m.group(1)}::{m.group(2)}')
    raise SystemExit(r.returncode)


main()
