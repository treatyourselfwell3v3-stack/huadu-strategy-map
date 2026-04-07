#!/usr/bin/env bash
set -euo pipefail

python -m json.tool app.json >/dev/null
python -m json.tool pages/home/home.json >/dev/null
python -m json.tool pages/publish/publish.json >/dev/null
python -m json.tool pages/match/match.json >/dev/null
python -m json.tool pages/profile/profile.json >/dev/null
python -m json.tool sitemap.json >/dev/null

node --check app.js
node --check pages/home/home.js
node --check pages/publish/publish.js
node --check pages/match/match.js
node --check pages/profile/profile.js
node --check utils/mock.js
node --check utils/storage.js

echo "Smoke checks passed."
