// ══════════════════════════════════════════════════════
//  lang.js — Traductions AR / FR pour tout le projet
//  رابطة شباب بلدية ملزم تيشط
//  Gestion de langue via COOKIE (persiste entre pages)
// ══════════════════════════════════════════════════════

const TRANSLATIONS = {

    // ── INDEX ──────────────────────────────────────────
    'app.title':              { ar: 'رابطة الطليعة الشبابية لبلدية ملزم تيشط', fr: 'Association de la Jeunesse de Melzam Tichit' },
    'app.subtitle':           { ar: 'موريتانيا', fr: 'Mauritanie 🇲🇷' },
    'app.services':           { ar: 'الخدمات والأقسام', fr: 'Services & Sections' },

    'card.inscH.title':       { ar: 'تسجيل الرجال', fr: 'Inscription Hommes' },
    'card.inscH.desc':        { ar: 'الانضمام إلى قائمة الأعضاء الرجال في الرابطة', fr: 'Rejoindre la liste des membres hommes' },
    'card.inscF.title':       { ar: 'تسجيل النساء', fr: 'Inscription Femmes' },
    'card.inscF.desc':        { ar: 'الانضمام إلى قائمة الأعضاء النساء في الرابطة', fr: 'Rejoindre la liste des membres femmes' },
    'card.list.title':        { ar: 'إحصاءات الأعضاء', fr: 'Statistiques Membres' },
    'card.list.desc':         { ar: 'عرض إحصاءات الأعضاء المسجلين', fr: 'Voir les statistiques des membres inscrits' },
    'card.admin.title':       { ar: 'الإدارة', fr: 'Administration' },
    'card.admin.desc':        { ar: 'لوحة التحكم والإشراف على البيانات', fr: 'Tableau de bord et gestion des données' },

    'stat.hommes':            { ar: 'رجال مسجلون', fr: 'Hommes inscrits' },
    'stat.femmes':            { ar: 'نساء مسجلات', fr: 'Femmes inscrites' },
    'stat.total':             { ar: 'إجمالي الأعضاء', fr: 'Total membres' },

    'footer':                 { ar: '© 2026 رابطة شباب بلدية ملزم تيشط — جميع الحقوق محفوظة', fr: '© 2026 Association Jeunesse Melzam Tichit — Tous droits réservés' },

    // ── FORMULAIRES ────────────────────────────────────
    'form.nom':               { ar: 'الاسم واللقب', fr: 'Nom et Prénom' },
    'form.nom.placeholder':   { ar: 'أدخل اسمك الكامل', fr: 'Entrez votre nom complet' },
    'form.nomF.placeholder':  { ar: 'أدخلي اسمك الكامل', fr: 'Entrez votre nom complet' },
    'form.tel':               { ar: 'رقم الهاتف', fr: 'Numéro de téléphone' },
    'form.tel.placeholder':   { ar: 'مثال: 22000000', fr: 'Ex: 22000000' },
    'form.age':               { ar: 'العمر', fr: 'Tranche d\'âge' },
    'form.age.placeholder':   { ar: 'اختر الفئة العمرية', fr: 'Choisir la tranche d\'âge' },
    'form.age.placeholder.f': { ar: 'اختري الفئة العمرية', fr: 'Choisir la tranche d\'âge' },
    'form.village':           { ar: 'القرية / المنطقة', fr: 'Village / Région' },
    'form.situation':         { ar: 'هل تعمل حالياً؟', fr: 'Travaillez-vous actuellement ?' },
    'form.oui':               { ar: '✅ نعم', fr: '✅ Oui' },
    'form.non':               { ar: '❌ لا', fr: '❌ Non' },
    'form.submit.h':          { ar: '✔ تسجيل الآن', fr: '✔ S\'inscrire maintenant' },
    'form.submit.f':          { ar: '✔ تسجيل الآن', fr: '✔ S\'inscrire maintenant' },
    'form.header.h':          { ar: 'تسجيل الرجال', fr: 'Inscription Hommes' },
    'form.header.f':          { ar: 'تسجيل النساء', fr: 'Inscription Femmes' },
    'form.back':              { ar: '← الرئيسية', fr: '← Accueil' },

    // ── VILLAGES ───────────────────────────────────────
    'village.label':          { ar: 'القرية / المنطقة', fr: 'Village / Région' },
    'village.jadda':          { ar: 'جدة', fr: 'Jaddetta' },
    'village.halla':          { ar: 'الحلة', fr: 'Al-Halla' },
    'village.wadichark':      { ar: 'وديشرك', fr: 'Wadichark' },
    'village.dawach':         { ar: 'دواش', fr: 'Dawach' },
    'village.lmhaysar':       { ar: 'لمحيصر', fr: 'Lmhaysar' },
    'village.twizikra':       { ar: 'تويزكره', fr: 'Twizikra' },
    'village.darssalam':      { ar: 'دار السلام', fr: 'Dar Es-Salam' },
    'village.lfray3':         { ar: 'لفريع', fr: 'Lfray3' },

    'toast.no.village':       { ar: '⚠️ يرجى اختيار القرية', fr: '⚠️ Veuillez choisir un village' },
    'toast.no.situation':     { ar: '⚠️ يرجى تحديد وضع العمل', fr: '⚠️ Veuillez indiquer la situation professionnelle' },
    'toast.success':          { ar: '✅ تم التسجيل بنجاح!', fr: '✅ Inscription réussie !' },
    'toast.error.conn':       { ar: '❌ خطأ في الاتصال', fr: '❌ Erreur de connexion' },

    'dup.tel':                { ar: 'هذا الرقم مسجل مسبقاً ❌', fr: 'Ce numéro est déjà inscrit ❌' },
    'dup.tel.ok':             { ar: 'الرقم متاح ✓', fr: 'Numéro disponible ✓' },
    'dup.nom.warn':           { ar: 'اسم مشابه موجود، تأكد من عدم التكرار ⚠️', fr: 'Un nom similaire existe, vérifiez les doublons ⚠️' },
    'dup.tel.blocked':        { ar: '❌ هذا الرقم مسجل مسبقاً', fr: '❌ Ce numéro est déjà inscrit' },

    // ── PAGE STATISTIQUES ──────────────────────────────
    'stats.page.title':       { ar: 'إحصاءات الأعضاء', fr: 'Statistiques des Membres' },
    'stats.section.title':    { ar: '📊 الإحصاءات العامة', fr: '📊 Statistiques Générales' },
    'stats.section.sub':      { ar: 'إجمالي الأعضاء المسجلين في الرابطة', fr: 'Total des membres inscrits dans l\'association' },
    'stats.loading':          { ar: 'جاري التحميل...', fr: 'Chargement en cours...' },
    'stats.refresh':          { ar: '🔄 تحديث', fr: '🔄 Actualiser' },
    'stats.error':            { ar: '❌ خطأ في تحميل البيانات', fr: '❌ Erreur lors du chargement des données' },

    // ── LISTE MEMBRES ──────────────────────────────────
    'list.title':             { ar: 'قائمة الأعضاء', fr: 'Liste des Membres' },
    'list.back':              { ar: '← الرئيسية', fr: '← Accueil' },
    'list.tab.hommes':        { ar: '👨 الرجال', fr: '👨 Hommes' },
    'list.tab.femmes':        { ar: '👩 النساء', fr: '👩 Femmes' },
    'list.search':            { ar: 'البحث بالاسم أو القرية...', fr: 'Rechercher par nom ou village...' },
    'list.filter.all':        { ar: 'الكل', fr: 'Tous' },
    'list.filter.travaille':  { ar: '💼 يعملون', fr: '💼 Travaillent' },
    'list.filter.chomage':    { ar: '🏠 بدون عمل', fr: '🏠 Sans emploi' },
    'list.print':             { ar: '🖨️ طباعة / PDF', fr: '🖨️ Imprimer / PDF' },
    'list.empty':             { ar: 'لا توجد نتائج', fr: 'Aucun résultat' },

    'col.num':                { ar: '#', fr: '#' },
    'col.nom':                { ar: 'الاسم واللقب', fr: 'Nom et Prénom' },
    'col.tel':                { ar: 'الهاتف', fr: 'Téléphone' },
    'col.village':            { ar: 'القرية', fr: 'Village' },
    'col.age':                { ar: 'العمر', fr: 'Âge' },
    'col.situation':          { ar: 'الوضع', fr: 'Situation' },
    'col.date':               { ar: 'التاريخ', fr: 'Date' },

    'stat.travaille':         { ar: 'يعملون (رجال)', fr: 'Travaillent (H)' },
    'stat.chomage':           { ar: 'بدون عمل (رجال)', fr: 'Sans emploi (H)' },
    'stat.totalh':            { ar: 'مجموع الرجال', fr: 'Total Hommes' },
    'stat.totalf':            { ar: 'مجموع النساء', fr: 'Total Femmes' },
    'stat.totalmembers':      { ar: 'إجمالي الأعضاء', fr: 'Total Membres' },

    'badge.travaille':        { ar: '💼 يعمل', fr: '💼 Travaille' },
    'badge.chomage':          { ar: '🏠 بدون عمل', fr: '🏠 Sans emploi' },

    'mc.tel':                 { ar: 'الهاتف', fr: 'Tél' },
    'mc.village':             { ar: 'القرية', fr: 'Village' },
    'mc.age':                 { ar: 'العمر', fr: 'Âge' },
    'mc.date':                { ar: 'التاريخ', fr: 'Date' },

    // ── ADMIN ──────────────────────────────────────────
    'admin.title':            { ar: 'لوحة الإدارة', fr: 'Administration' },
    'admin.login.title':      { ar: 'لوحة الإدارة', fr: 'Administration' },
    'admin.login.pwd':        { ar: 'كلمة المرور', fr: 'Mot de passe' },
    'admin.login.btn':        { ar: '🔓 دخول', fr: '🔓 Connexion' },
    'admin.login.err':        { ar: 'كلمة المرور غير صحيحة', fr: 'Mot de passe incorrect' },
    'admin.home':             { ar: '← الرئيسية', fr: '← Accueil' },
    'admin.logout':           { ar: 'خروج', fr: 'Déconnexion' },

    'admin.tab.stats':        { ar: '📊 الإحصاءات', fr: '📊 Statistiques' },
    'admin.tab.hommes':       { ar: '👨 الرجال', fr: '👨 Hommes' },
    'admin.tab.femmes':       { ar: '👩 النساء', fr: '👩 Femmes' },

    'admin.stat.hommes':      { ar: 'إجمالي الرجال', fr: 'Total Hommes' },
    'admin.stat.femmes':      { ar: 'إجمالي النساء', fr: 'Total Femmes' },
    'admin.stat.total':       { ar: 'إجمالي الأعضاء', fr: 'Total Membres' },
    'admin.stat.travaille':   { ar: 'يعملون', fr: 'Travaillent' },
    'admin.stat.chomage':     { ar: 'بدون عمل', fr: 'Sans emploi' },
    'admin.stat.today':       { ar: 'تسجيل اليوم', fr: "Inscrits aujourd'hui" },

    'admin.chart.vilH':       { ar: '🏘️ الرجال حسب القرية', fr: '🏘️ Hommes par village' },
    'admin.chart.vilF':       { ar: '🏘️ النساء حسب القرية', fr: '🏘️ Femmes par village' },
    'admin.chart.ageH':       { ar: '📊 الرجال حسب الفئة العمرية', fr: '📊 Hommes par tranche d\'âge' },
    'admin.chart.emploi':     { ar: '💼 وضع التشغيل (رجال)', fr: '💼 Situation emploi (Hommes)' },
    'admin.chart.nodata':     { ar: 'لا توجد بيانات', fr: 'Aucune donnée' },
    'admin.donut.oui':        { ar: 'يعملون', fr: 'Travaillent' },
    'admin.donut.non':        { ar: 'بدون عمل', fr: 'Sans emploi' },

    'admin.sec.hommes':       { ar: '👨 الرجال المسجلون', fr: '👨 Hommes inscrits' },
    'admin.sec.femmes':       { ar: '👩 النساء المسجلات', fr: '👩 Femmes inscrites' },
    'admin.search':           { ar: 'بحث...', fr: 'Rechercher...' },
    'admin.print':            { ar: '🖨️ طباعة', fr: '🖨️ Imprimer' },
    'admin.empty':            { ar: 'لا توجد نتائج', fr: 'Aucun résultat' },

    'admin.confirm.title':    { ar: '⚠️ تأكيد الحذف', fr: '⚠️ Confirmer la suppression' },
    'admin.confirm.msg':      { ar: 'هل أنت متأكد من حذف "{name}"؟ لا يمكن التراجع.', fr: 'Confirmer la suppression de "{name}" ? Cette action est irréversible.' },
    'admin.confirm.cancel':   { ar: 'إلغاء', fr: 'Annuler' },
    'admin.confirm.delete':   { ar: 'حذف', fr: 'Supprimer' },

    // ── PRINT ──────────────────────────────────────────
    'print.title.h':          { ar: 'قائمة الرجال المسجلين', fr: 'Liste des Hommes inscrits' },
    'print.title.f':          { ar: 'قائمة النساء المسجلات', fr: 'Liste des Femmes inscrites' },
    'print.printed':          { ar: 'طُبع بتاريخ:', fr: 'Imprimé le :' },
    'print.member':           { ar: 'عضو', fr: 'membre(s)' },
    'print.travaille':        { ar: 'يعمل', fr: 'Travaille' },
    'print.chomage':          { ar: 'بدون عمل', fr: 'Sans emploi' },
};

// ══════════════════════════════════════════════════════
//  GESTION DE LANGUE — via Cookie
//  Le cookie persiste 1 an entre toutes les pages du site
// ══════════════════════════════════════════════════════

/**
 * Lire la langue depuis le cookie.
 * Fallback : 'ar' si aucun cookie trouvé.
 */
function _getLangFromCookie() {
    const match = document.cookie
        .split('; ')
        .find(row => row.startsWith('lang='));
    return match ? match.split('=')[1] : 'ar';
}

/**
 * Écrire la langue dans le cookie (durée 1 an, chemin /).
 */
function _setLangCookie(lang) {
    const maxAge = 60 * 60 * 24 * 365; // 1 an en secondes
    document.cookie = `lang=${lang};path=/;max-age=${maxAge};SameSite=Lax`;
}

// Langue active — lue depuis le cookie au chargement
let currentLang = _getLangFromCookie();

/**
 * Traduction d'une clé.
 * Retourne la clé elle-même si non trouvée.
 */
function t(key) {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[currentLang] || entry['ar'];
}

/**
 * Changer la langue et relancer applyLang() sur la page courante.
 * Le cookie est mis à jour immédiatement — pas besoin de reload.
 */
function setLang(lang) {
    currentLang = lang;
    _setLangCookie(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    if (typeof applyLang === 'function') applyLang();
}

/**
 * Basculer entre arabe et français.
 */
function toggleLang() {
    setLang(currentLang === 'ar' ? 'fr' : 'ar');
}

// ══════════════════════════════════════════════════════
//  BOUTON DE LANGUE
// ══════════════════════════════════════════════════════

/**
 * Retourne le HTML du bouton de changement de langue.
 * @param {string} style - 'dark' (fond sombre) ou 'light' (fond clair)
 */
function getLangBtnHTML(style = 'dark') {
    const light = style === 'light';
    return `
    <button
        onclick="toggleLang()"
        id="langBtn"
        title="${currentLang === 'ar' ? 'Passer en français' : 'التبديل إلى العربية'}"
        style="
            background: ${light ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.15)'};
            border: 1px solid ${light ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.25)'};
            color: ${light ? '#374151' : 'white'};
            padding: 0.35rem 0.8rem;
            border-radius: 20px;
            cursor: pointer;
            font-family: 'Cairo', sans-serif;
            font-size: 0.78rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 0.3rem;
            transition: background 0.2s, transform 0.15s;
            letter-spacing: 0.03em;
            white-space: nowrap;
        "
        onmouseover="this.style.transform='scale(1.05)'"
        onmouseout="this.style.transform='scale(1)'"
    >
        <span id="langFlag"></span>
        <span id="langLabel"></span>
    </button>`;
}

/**
 * Mettre à jour le drapeau et le libellé du bouton
 * selon la langue active. Doit être appelé après injection du HTML.
 */
function updateLangBtn() {
    const flag  = document.getElementById('langFlag');
    const label = document.getElementById('langLabel');
    if (!flag || !label) return;

    // On affiche la langue CIBLE (celle vers laquelle on va basculer)
    if (currentLang === 'ar') {
        flag.textContent  = '🇫🇷';
        label.textContent = 'FR';
    } else {
        flag.textContent  = '🇲🇷';
        label.textContent = 'عر';
    }
}

// ══════════════════════════════════════════════════════
//  TRADUCTION AUTOMATIQUE data-lang
//  Appeler cette fonction dans applyLang() de chaque page
//  Elle traduit tous les éléments ayant l'attribut data-lang
//  Exemple HTML : <label for="v1" data-lang="village.jadda"></label>
// ══════════════════════════════════════════════════════

/**
 * Traduit automatiquement tous les éléments portant data-lang="clé".
 * Supporte aussi data-lang-placeholder="clé" pour les inputs.
 * À appeler dans applyLang() de chaque page.
 */
function translateDataLang() {
    // Traduire textContent
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        el.textContent = t(key);
    });
    // Traduire placeholder des inputs
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        el.placeholder = t(key);
    });
}

// ══════════════════════════════════════════════════════
//  Appliquer la direction dès le chargement du script
// ══════════════════════════════════════════════════════
document.documentElement.lang = currentLang;
document.documentElement.dir  = currentLang === 'ar' ? 'rtl' : 'ltr';