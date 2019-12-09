#!/bin/sh
if test "$1" = "build" ; then
    npm run build:prod
elif test "$1" = "lint" ; then
    npm run lint:ci
elif test "$1" = "test" ; then
    npm run test:ci && npm run test:ci:post
elif test "$1" = "e2e" ; then
    npm run e2e:ci
elif test "$1" = "sonar" ; then
    sed -i "s,PLACE_HOLDER_SONAR_TOKEN,${SONAR_TOKEN}," /sources/sonar-project.properties && npm run sonar:ci
fi