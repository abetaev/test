#!/bin/sh -e

if which podman-compose; then
  compose=podman-compose
elif which docker-compose; then
  compose=docker-compose
fi > /dev/null

if [ -z "$compose" ]; then
  echo "docker-compose or podman-compose is required" 1>&2
  exit 1
fi

cd "$(dirname $0)/.."

down() {
  $compose down
}

trap down INT
$compose build
$compose up
