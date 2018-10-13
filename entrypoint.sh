#!/bin/sh
set -e

yarn start

exec "$@"
