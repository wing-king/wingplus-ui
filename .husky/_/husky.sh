#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint:script && npx format
