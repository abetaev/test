#!/bin/sh -e

if which docker && docker compose 2>&1 > /dev/null; then
  # use docker compose plugin
  compose="docker compose"
elif which podman-compose; then
  # use podman-compose
  compose=podman-compose
fi > /dev/null

if [ -z "$compose" ]; then
  echo "docker-compose or podman-compose is required" 1>&2
  exit 1
fi

cd "$(dirname $0)/.."

down() {
  $compose down
  echo
}

trap down INT
$compose build
$compose watch
