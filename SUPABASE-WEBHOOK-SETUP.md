# 📘 Configuration Webhook Supabase pour Blog Auto-Revalidation

## 🎯 Objectif

Quand tu ajoutes/modifies un article dans Supabase, le site se met automatiquement à jour **sans rebuild complet**.

---

## ⚙️ Configuration dans Netlify (À FAIRE EN PREMIER)

### 1. Générer un Secret

Va sur: https://www.uuidgenerator.net/

Copie l'UUID généré (exemple: `550e8400-e29b-41d4-a716-446655440000`)

### 2. Ajouter la Variable d'Environnement

1. Va sur Netlify: https://app.netlify.com/
2. Sélectionne ton site "The O Pod Hotel"
3. Va dans **Site settings** → **Environment variables**
4. Clique sur **Add a variable**
5. Ajoute:
   - **Key**: `REVALIDATE_SECRET`
   - **Value**: Colle l'UUID que tu as généré
   - **Scopes**: Sélectionne toutes les options (Production, Deploy Previews, Branch deploys)
6. Clique sur **Create variable**
7. ⚠️ **IMPORTANT**: Redéploie le site pour que la variable soit active

---

## 🔧 Configuration dans Supabase

### Étape 1: Accéder aux Webhooks

1. Va sur ton dashboard Supabase: https://supabase.com/dashboard
2. Sélectionne ton projet "The O Pod Hotel"
3. Dans le menu de gauche, clique sur **Database**
4. Clique sur **Webhooks** (dans le sous-menu)

### Étape 2: Créer un Webhook pour les INSERT

1. Clique sur **Create a new webhook**
2. Configure:

**Name**: `Blog Post Created - Revalidate`

**Table**: `blog_posts`

**Events**: ✅ Coche uniquement **Insert**

**Type**: `HTTP Request`

**Method**: `POST`

**URL**:
```
https://opodhotel.com/api/revalidate?secret=TON_UUID_ICI&path=/blog
```

⚠️ **Remplace `TON_UUID_ICI`** par l'UUID que tu as généré à l'étape Netlify!

**HTTP Headers** (optionnel):
```json
{
  "Content-Type": "application/json"
}
```

3. Clique sur **Create webhook**

### Étape 3: Créer un Webhook pour les UPDATE

Répète les mêmes étapes mais:

**Name**: `Blog Post Updated - Revalidate`

**Events**: ✅ Coche uniquement **Update**

**URL**: La même que pour INSERT

### Étape 4: (Optionnel) Webhook pour DELETE

Si tu veux que la page se mette à jour quand tu supprimes un article:

**Name**: `Blog Post Deleted - Revalidate`

**Events**: ✅ Coche uniquement **Delete**

**URL**: La même que pour INSERT

---

## 🧪 Tester le Webhook

### Test Manuel

1. Va dans **Webhooks** sur Supabase
2. Clique sur ton webhook `Blog Post Created - Revalidate`
3. Clique sur **Send test webhook**
4. Tu devrais voir une réponse de succès:
```json
{
  "revalidated": true,
  "path": "/blog",
  "type": "page",
  "timestamp": "2025-11-19T12:00:00.000Z",
  "message": "Successfully revalidated /blog"
}
```

### Test Réel

1. Va dans **Table Editor** sur Supabase
2. Sélectionne la table `blog_posts`
3. Ajoute un nouvel article (ou modifie-en un)
4. Attends 1-2 secondes
5. Visite la page blog: https://opodhotel.com/fr/blog
6. ✅ Le nouvel article doit apparaître immédiatement!

---

## 🔄 Comment ça Fonctionne

```
1. Tu ajoutes un article dans Supabase
         ↓
2. Supabase déclenche le webhook automatiquement
         ↓
3. Le webhook appelle https://opodhotel.com/api/revalidate
         ↓
4. L'API vérifie le secret (sécurité)
         ↓
5. Next.js regénère la page /blog en arrière-plan
         ↓
6. La nouvelle version est servie aux visiteurs (1-2 secondes)
```

---

## 📝 URLs de Revalidation Disponibles

Tu peux utiliser ces URLs dans tes webhooks:

### Revalider toutes les pages blog (3 langues)
```
https://opodhotel.com/api/revalidate?secret=TON_SECRET&path=/blog
```

Cela va revalider:
- `/fr/blog`
- `/en/blog`
- `/he/blog`

### Revalider une langue spécifique
```
https://opodhotel.com/api/revalidate?secret=TON_SECRET&path=/fr/blog
https://opodhotel.com/api/revalidate?secret=TON_SECRET&path=/en/blog
https://opodhotel.com/api/revalidate?secret=TON_SECRET&path=/he/blog
```

### Revalider un article spécifique
```
https://opodhotel.com/api/revalidate?secret=TON_SECRET&path=/fr/blog/mon-article
```

---

## 🛡️ Sécurité

✅ **Le secret protège l'API**: Seuls les webhooks Supabase peuvent revalider les pages

✅ **Pas de rebuild complet**: Seules les pages concernées sont regénérées

✅ **Aucun accès public**: L'endpoint retourne 401 sans le bon secret

---

## ❓ FAQ

### Q: Est-ce que je dois reconfigurer après chaque deploy?
**R**: Non! Une fois configuré, ça fonctionne pour toujours.

### Q: Combien de temps pour voir le nouvel article?
**R**: 1-2 secondes maximum après l'ajout dans Supabase.

### Q: Ça fonctionne aussi pour les modifications?
**R**: Oui! Crée juste un webhook supplémentaire pour UPDATE.

### Q: Je peux tester sans ajouter un vrai article?
**R**: Oui! Utilise "Send test webhook" dans Supabase.

### Q: Ça coûte plus cher en ressources?
**R**: Non, c'est ultra optimisé. Seules les pages modifiées sont regénérées.

---

## 🚨 Troubleshooting

### Le webhook ne se déclenche pas

1. Vérifie que l'article a `published = true`
2. Vérifie les logs du webhook dans Supabase (onglet **Logs**)
3. Vérifie que l'URL est correcte (pas de typo)

### Erreur 401 "Invalid token"

1. Vérifie que `REVALIDATE_SECRET` est bien définie dans Netlify
2. Vérifie que le secret dans l'URL du webhook correspond
3. Redéploie le site si tu viens de créer la variable

### Le site ne se met pas à jour

1. Vide le cache du navigateur (Cmd+Shift+R ou Ctrl+Shift+R)
2. Vérifie les logs Netlify Functions
3. Teste manuellement l'URL de revalidation dans ton navigateur

---

## ✅ Checklist Finale

- [ ] Variable `REVALIDATE_SECRET` créée dans Netlify
- [ ] Site redéployé après création de la variable
- [ ] Webhook "Insert" créé dans Supabase
- [ ] Webhook "Update" créé dans Supabase
- [ ] Test manuel réussi (Send test webhook)
- [ ] Test réel réussi (ajouter un article)

---

**Date de création**: 19 Novembre 2025
**Dernière mise à jour**: 19 Novembre 2025
