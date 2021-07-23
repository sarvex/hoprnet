#!/usr/bin/env bash

# prevent souring of this script, only allow execution
$(return >/dev/null 2>&1)
test "$?" -eq "0" && { echo "This script should only be executed." >&2; exit 1; }

# exit on errors, undefined variables, ensure errors in pipes are not hidden
set -Eeuo pipefail

declare branch
declare mydir
declare npm_package
declare version_type

# ensure local copy is up-to-date with origin
branch=$(git rev-parse --abbrev-ref HEAD)
git pull origin "${branch}" --rebase

# get package info
mydir=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd -P)
npm_package=$(${mydir}/get-npm-package-info.sh)

# identify version type
test -n "${npm_package}" && version_type="preminor" || version_type="prerelease"

# ensure the build is up-to-date
yarn
yarn build

# create new version in each package
yarn workspaces foreach -piv --no-private --topological-dev version prerelease
declare new_version
new_version=$(HOPR_PACKAGE=hoprd ${mydir}/get-package-version.sh)

# commit changes and create Git tag
git add packages/*/package.json
git commit -m "chore(release): publish ${new_version}"
git tag v${new_version}

# only make remote changes if running in CI
if [ "${CI:-}" = "true" ] && [ -z "${ACT:-}" ]; then
  # push changes back onto origin including new tag
  git push origin "${branch}" --tags

  # publish each workspace package to npm
  yarn workspaces foreach -piv --no-private --topological-dev \
    npm publish --access public
fi
