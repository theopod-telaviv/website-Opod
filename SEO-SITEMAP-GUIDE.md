# Guide SEO & Sitemap - The O Pod Hotel

## 📋 Configuration du Sitemap Dynamique

### Fichiers configurés :

#### 1. **`/app/sitemap.ts`** - Sitemap dynamique principal
- ✅ Génère automatiquement toutes les URLs du site
- ✅ Inclut les articles de blog depuis Supabase
- ✅ Se revalide toutes les heures (`revalidate = 3600`)
- ✅ Priorités SEO optimisées :
  - Homepage : **Priority 1.0** (daily)
  - Blog index : **Priority 0.9** (daily - 3 nouveaux articles/semaine)
  - Capsules : **Priority 0.9** (weekly)
  - Articles de blog : **Priority 0.7** (weekly)
  - Pages légales : **Priority 0.3** (monthly)

#### 2. **`/app/robots.ts`** - Fichier robots.txt
- ✅ Autorise tous les crawlers
- ✅ Optimisation spéciale pour Googlebot (crawl rapide)
- ✅ Pointe vers le sitemap XML

#### 3. **`/public/google3f34b9262462e4fa.html`** - Vérification Google Search Console
- ✅ Fichier de vérification placé dans `/public`
- ✅ Accessible via : `https://the-opod-hotel-telaviv.netlify.app/google3f34b9262462e4fa.html`

#### 4. **`/app/[locale]/layout.tsx`** - Meta tag de vérification
- ✅ Ajout de `<meta name="google-site-verification" content="google3f34b9262462e4fa" />`
- ✅ Méthode alternative pour vérifier le site dans Google Search Console

#### 5. **`/scripts/submit-sitemap.sh`** - Soumission automatique
- ✅ Ping Google après chaque build
- ✅ Ping Bing également
- ✅ Exécuté automatiquement via `npm run postbuild`

#### 6. **`/netlify.toml`** - Configuration Netlify
- ✅ Headers optimisés pour le SEO
- ✅ Cache du sitemap : 1 heure
- ✅ Plugin de soumission automatique du sitemap

---

## 🚀 Comment ça fonctionne ?

### Flux de publication d'article (Lundi, Mercredi, Vendredi) :

1. **Article ajouté dans Supabase** (`blog_posts` table)
   - `published = true`
   - `published_at` = date de publication

2. **Sitemap se met à jour automatiquement**
   - Revalidation toutes les heures
   - Nouvel article ajouté dans le sitemap avec `lastModified = updated_at`

3. **Netlify build déclenché** (si deploy hook configuré)
   - Build Next.js
   - Génération du sitemap avec tous les articles
   - Script `postbuild` exécute `submit-sitemap.sh`
   - Ping Google & Bing

4. **Google crawle le nouveau sitemap**
   - Détecte le nouvel article
   - Indexe dans les 24-48h

---

## 📊 URLs incluses dans le sitemap

### Pages statiques (par langue: fr, en, he) :
- ✅ Homepage (`/`)
- ✅ Capsules index (`/capsules`)
- ✅ Hotel (`/hotel`)
- ✅ Blog index (`/blog`)
- ✅ FAQ (`/faq`)
- ✅ Contact (`/contact`)
- ✅ Privacy (`/privacy`)
- ✅ Terms (`/terms`)
- ✅ Accessibility (`/accessibility`)
- ✅ Sitemap page (`/sitemap-page`)

### Pages dynamiques :
- ✅ 7 capsules individuelles (`/capsules/o-snug`, `/capsules/o-dreamy`, etc.)
- ✅ **Tous les articles de blog** depuis Supabase (`/blog/[slug]`)

### Total approximatif :
- 10 pages statiques × 3 langues = **30 URLs**
- 7 capsules × 3 langues = **21 URLs**
- Articles de blog × 3 langues = **Variable** (augmente de 3 chaque semaine)

**Total actuel : ~51+ URLs** (augmente de 3 URLs/semaine)

---

## ✅ Vérification dans Google Search Console

### Étape 1 : Vérifier la propriété
1. Va sur [Google Search Console](https://search.google.com/search-console)
2. Clique sur "Ajouter une propriété"
3. Sélectionne "Préfixe d'URL" : `https://the-opod-hotel-telaviv.netlify.app`
4. Choisis la méthode **"Balise HTML"** ou **"Fichier HTML"** :
   - **Balise HTML** : Déjà ajoutée dans `layout.tsx` ✅
   - **Fichier HTML** : Déjà uploadé dans `/public/` ✅
5. Clique sur "Vérifier"

### Étape 2 : Soumettre le sitemap
1. Dans Google Search Console, va dans **"Sitemaps"**
2. Entre l'URL du sitemap : `https://the-opod-hotel-telaviv.netlify.app/sitemap.xml`
3. Clique sur "Soumettre"

### Étape 3 : Attendre l'indexation
- Google commence à crawler dans les 24-48h
- Les articles de blog apparaîtront progressivement dans les résultats
- Vérifie l'état dans **"Couverture"** (Coverage)

---

## 🔄 Fréquence de crawl recommandée

Basé sur 3 nouveaux articles/semaine (lundi, mercredi, vendredi) :

| Type de page | Fréquence | Pourquoi |
|--------------|-----------|----------|
| Homepage | **Daily** | Mise à jour fréquente avec nouveaux articles |
| Blog index | **Daily** | 3 nouveaux articles/semaine |
| Articles de blog | **Weekly** | Contenu peut être mis à jour |
| Capsules | **Weekly** | Prix/disponibilité peuvent changer |
| Pages légales | **Monthly** | Rarement modifiées |

---

## 🎯 Optimisations SEO implémentées

### 1. **Données structurées Schema.org**
- ✅ Hotel schema avec 5 étoiles et 320 avis
- ✅ Product schema pour chaque capsule
- ✅ FAQ schema
- ✅ Breadcrumb schema

### 2. **Meta tags optimisés**
- ✅ Titles uniques par page et langue
- ✅ Descriptions optimisées (150-160 caractères)
- ✅ Open Graph pour réseaux sociaux
- ✅ Twitter Cards

### 3. **Sitemap XML dynamique**
- ✅ Mise à jour automatique avec nouveaux articles
- ✅ Dates de modification précises
- ✅ Priorités SEO optimisées

### 4. **Robots.txt**
- ✅ Crawl rapide pour Googlebot
- ✅ Pas de délai pour Google
- ✅ Pointage vers sitemap

### 5. **Headers HTTP**
- ✅ Cache optimisé (sitemap : 1h, images : 1 an)
- ✅ Headers de sécurité
- ✅ Content-Type correct pour XML

---

## 📈 Monitoring & Maintenance

### À vérifier régulièrement :

1. **Google Search Console**
   - Erreurs d'indexation
   - Couverture du sitemap
   - Performance des recherches

2. **Sitemap XML**
   - Vérifier que les nouveaux articles apparaissent : `https://the-opod-hotel-telaviv.netlify.app/sitemap.xml`
   - Tester avec [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

3. **Robots.txt**
   - Vérifier : `https://the-opod-hotel-telaviv.netlify.app/robots.txt`
   - Tester avec [Google Robots.txt Tester](https://support.google.com/webmasters/answer/6062598)

4. **Données structurées**
   - Tester avec [Rich Results Test](https://search.google.com/test/rich-results)
   - Vérifier que les 5 étoiles apparaissent

---

## 🐛 Troubleshooting

### Le sitemap ne se met pas à jour ?
1. Vérifier que `revalidate = 3600` est bien dans `sitemap.ts`
2. Forcer un rebuild sur Netlify
3. Vérifier les logs du build

### Les articles n'apparaissent pas dans le sitemap ?
1. Vérifier que `published = true` dans Supabase
2. Vérifier que `getBlogPosts()` retourne les articles
3. Checker les logs serveur

### Google ne crawle pas assez souvent ?
1. Soumettre manuellement le sitemap dans Search Console
2. Utiliser "Demander une indexation" pour les nouveaux articles
3. Partager les articles sur les réseaux sociaux (augmente le crawl)

---

## 📞 Support

Pour toute question concernant le SEO ou le sitemap :
- Email technique : opodhotel@gmail.com
- Documentation Next.js : https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

---

**✅ Configuration terminée le 18 Novembre 2025**
