#!/bin/sh
# Önbellek kırıcı: bütün sayfalarda kendi CSS/JS dosyalarımızın bağlantısına yeni bir sürüm ekler
# (ör. js/ortak.js?v=20261031-1530). Böylece yayından sonra tarayıcılar eski dosyayı önbellekten getirmez.
# Her commit'ten önce çalıştırılır:  sh surum.sh
cd "$(dirname "$0")" || exit 1
SURUM=$(date +%Y%m%d-%H%M%S)
for f in *.html; do
  case "$f" in *kopyası*) continue ;; esac
  sed -i '' -E "s#((src|href)=\"(css|js)/[a-z-]+\.(css|js))(\?v=[0-9-]+)?\"#\1?v=$SURUM\"#g" "$f"
done
echo "Sürüm: $SURUM"
