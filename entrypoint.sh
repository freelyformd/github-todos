#!/bin/sh
set -e

yarn build

exec "$@"
