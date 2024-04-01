#!/bin/sh
# line endings must be \n, not \r\n !

echo "window._env_ = {" > ./env-runtime-config.js
awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' ./.env >> ./env-runtime-config.js
echo "}" >> ./env-runtime-config.js