#!/bin/bash

# Script pour soumettre automatiquement le sitemap à Google Search Console
# Exécuté après chaque déploiement Netlify

SITEMAP_URL="https://the-opod-hotel-telaviv.netlify.app/sitemap.xml"

echo "🔍 Soumission du sitemap à Google Search Console..."
echo "URL du sitemap: $SITEMAP_URL"

# Ping Google pour notifier du nouveau sitemap
curl -s "https://www.google.com/ping?sitemap=$SITEMAP_URL" > /dev/null

if [ $? -eq 0 ]; then
    echo "✅ Sitemap soumis avec succès à Google!"
else
    echo "⚠️  Erreur lors de la soumission du sitemap"
fi

# Ping Bing
curl -s "https://www.bing.com/ping?sitemap=$SITEMAP_URL" > /dev/null

if [ $? -eq 0 ]; then
    echo "✅ Sitemap soumis avec succès à Bing!"
else
    echo "⚠️  Erreur lors de la soumission du sitemap à Bing"
fi

echo "🎉 Processus de soumission terminé!"
