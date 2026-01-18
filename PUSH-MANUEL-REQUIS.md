# ⚠️ Push Manuel Requis

## Problème rencontré
GitHub rencontre actuellement des problèmes de connexion (Error in HTTP2 framing layer / 503 / Empty reply).

Le commit a été créé localement mais n'a pas pu être poussé automatiquement.

---

## ✅ Commit créé localement

**Commit ID** : `f9a6768`

**Message** :
```
fix: Mise à jour du nom de domaine vers opodhotel.com
```

**Fichiers modifiés** : 13 fichiers
- app/sitemap.ts
- app/robots.ts
- lib/schema.ts
- app/[locale]/page.tsx
- app/[locale]/hotel/page.tsx
- app/[locale]/capsules/page.tsx
- app/[locale]/capsules/[slug]/page.tsx
- netlify.toml
- scripts/submit-sitemap.sh
- Tous les .md de documentation

---

## 🔧 Comment pousser manuellement

### Option 1 : Depuis ton terminal

```bash
cd /tmp/website-Opod
git push
```

Si ça échoue encore, attends 5-10 minutes que GitHub se stabilise, puis réessaye.

### Option 2 : Vérifier l'état

```bash
cd /tmp/website-Opod
git status
git log --oneline -5
```

Tu devrais voir le commit `f9a6768` en tête.

### Option 3 : Forcer avec SSH (si configuré)

```bash
cd /tmp/website-Opod
git remote set-url origin git@github.com:theopod-telaviv/website-Opod.git
git push
```

---

## ✅ Changements effectués

### Domaine mis à jour
- **Ancien** : `https://the-opod-hotel-telaviv.netlify.app`
- **Nouveau** : `https://opodhotel.com`

### Tous les fichiers concernés ont été mis à jour :

1. **Sitemap XML** → `https://opodhotel.com/sitemap.xml`
2. **Robots.txt** → `https://opodhotel.com/robots.txt`
3. **Schema.org** → Toutes les URLs canoniques
4. **Metadata** → Open Graph, Twitter Cards, canonical URLs
5. **Documentation** → Tous les exemples et instructions

---

## 🧪 Tests après push réussi

Une fois que le push aura réussi et que Netlify aura déployé :

### 1. Vérifier le sitemap
```
https://opodhotel.com/sitemap.xml
```

Toutes les URLs doivent commencer par `https://opodhotel.com`

### 2. Vérifier le robots.txt
```
https://opodhotel.com/robots.txt
```

Doit contenir : `Sitemap: https://opodhotel.com/sitemap.xml`

### 3. Re-soumettre dans Google Search Console

1. Va sur https://search.google.com/search-console
2. **IMPORTANT** : Change la propriété !
   - Ancienne : `https://the-opod-hotel-telaviv.netlify.app`
   - Nouvelle : `https://opodhotel.com`
3. Vérifie le site avec la balise HTML (déjà en place)
4. Soumets le sitemap : `sitemap.xml`

### 4. Tester les données structurées

```
https://search.google.com/test/rich-results
```

Entre : `https://opodhotel.com/fr`

Vérifie que les 5 étoiles sont détectées ✅

---

## 📊 Résumé des modifications

| Fichier | Changement |
|---------|------------|
| `sitemap.ts` | baseUrl → `opodhotel.com` |
| `robots.ts` | baseUrl → `opodhotel.com` |
| `schema.ts` | Tous les @id et urls → `opodhotel.com` |
| `page.tsx` (home) | metadataBase → `opodhotel.com` |
| Pages capsules | Metadata URLs → `opodhotel.com` |
| `netlify.toml` | Plugin baseUrl → `opodhotel.com` |
| `submit-sitemap.sh` | SITEMAP_URL → `opodhotel.com` |
| Docs MD (×6) | Tous les exemples → `opodhotel.com` |

**Total** : 13 fichiers, 46 changements (46 insertions, 46 deletions)

---

## ⏰ Prochaine tentative

Si le push échoue toujours :

1. Attends 10-15 minutes (problème GitHub temporaire)
2. Vérifie l'état de GitHub : https://www.githubstatus.com/
3. Réessaye le push

---

**Date** : 18 Novembre 2025
**Commit** : f9a6768
**Branche** : 17-Novembre
