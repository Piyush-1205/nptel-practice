#!/bin/bash
cd -- "$(dirname -- "$0")" || exit 1
if ! command -v python3 >/dev/null 2>&1; then
  printf 'Python 3 is not installed. Open index.html directly in your browser instead.\n'
  read -r -p 'Press Enter to close.'
  exit 1
fi
python3 server.py
