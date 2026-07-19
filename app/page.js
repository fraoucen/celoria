"use client";

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Banknote,
  BarChart3,
  Boxes,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  ExternalLink,
  FileCheck2,
  FileText,
  Flag,
  Globe2,
  Home,
  Landmark,
  MapPin,
  Package,
  Scale,
  Search,
  Share2,
  SlidersHorizontal,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const VERIFIED_DATE = "18 juillet 2026";
const OFFICIAL_PLATFORM_LIST =
  "https://www.impots.gouv.fr/je-consulte-la-liste-des-plateformes-agreees";

const SOURCES = [
  {
    name: "Questionnaire officiel — DGFiP",
    url: "https://www.impots.gouv.fr/facturation-electronique-qu-est-ce-que-ca-change-pour-moi",
  },
  {
    name: "Calendrier officiel — DGFiP",
    url: "https://www.impots.gouv.fr/professionnel/questions/partir-de-quand-suis-je-concerne-par-la-reforme-de-la-facturation",
  },
  {
    name: "Présentation de la réforme — Économie.gouv.fr",
    url: "https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises",
  },
  {
    name: "Plateformes agréées — DGFiP",
    url: "https://www.impots.gouv.fr/facturation-electronique-et-plateformes-agreees",
  },
];

const PROFILE_OPTIONS = [
  {
    value: "standard",
    title: "Micro-entrepreneur, indépendant ou société",
    description: "SAS, SASU, SARL, EURL, entreprise individuelle…",
    icon: BriefcaseBusiness,
  },
  {
    value: "association",
    title: "Association",
    description: "Avec ou sans activité commerciale",
    icon: Users,
  },
  {
    value: "property",
    title: "SCI ou location meublée",
    description: "Activité immobilière ou LMNP",
    icon: Home,
  },
  {
    value: "special",
    title: "Syndic, organisme public ou autre cas",
    description: "Situation qui demande une vérification particulière",
    icon: Landmark,
  },
  {
    value: "unknown",
    title: "Je ne sais pas",
    description: "Nous vous indiquerons comment vérifier",
    icon: CircleHelp,
  },
];

const LOCATION_OPTIONS = [
  {
    value: "metropolitan",
    title: "France métropolitaine",
    description: "L’adresse officielle est en métropole",
    icon: Flag,
  },
  {
    value: "dom_vat",
    title: "Guadeloupe, Martinique ou La Réunion",
    description: "Un parcours adapté sera proposé",
    icon: MapPin,
  },
  {
    value: "other_territory",
    title: "Guyane, Mayotte ou autre territoire français",
    description: "Des règles particulières peuvent s’appliquer",
    icon: MapPin,
  },
  {
    value: "foreign",
    title: "Étranger",
    description: "L’activité n’est pas établie en France",
    icon: Globe2,
  },
  {
    value: "unknown",
    title: "Je ne sais pas",
    description: "Regardez l’adresse sur votre avis SIRENE ou Kbis",
    icon: CircleHelp,
  },
];

const EMPLOYEE_OPTIONS = [
  {
    value: "under",
    title: "Non, moins de 250 salariés",
    description: "Vous travaillez seul ou dans une petite ou moyenne structure",
    icon: Users,
  },
  {
    value: "over",
    title: "Oui, 250 salariés ou plus",
    description: "Votre entreprise est de taille importante",
    icon: Building2,
  },
  {
    value: "unknown",
    title: "Je ne sais pas",
    description: "Nous conserverons une réserve sur votre échéance",
    icon: CircleHelp,
  },
];

const REVENUE_OPTIONS = [
  {
    value: "under",
    title: "Non, 50 millions d’euros ou moins",
    description: "C’est le cas de la très grande majorité des petites entreprises",
    icon: Banknote,
  },
  {
    value: "over",
    title: "Oui, plus de 50 millions d’euros",
    description: "Une dernière vérification sera nécessaire",
    icon: BarChart3,
  },
  {
    value: "unknown",
    title: "Je ne sais pas",
    description: "L’information figure dans vos comptes annuels",
    icon: CircleHelp,
  },
];

const BALANCE_OPTIONS = [
  {
    value: "under",
    title: "Non, 43 millions d’euros ou moins",
    description: "Le total figure dans vos comptes annuels",
    icon: WalletCards,
  },
  {
    value: "over",
    title: "Oui, plus de 43 millions d’euros",
    description: "Votre échéance d’émission est probablement en 2026",
    icon: BarChart3,
  },
  {
    value: "unknown",
    title: "Je ne sais pas",
    description: "Votre comptable peut vous le confirmer",
    icon: CircleHelp,
  },
];

const CLIENT_OPTIONS = [
  {
    value: "business_fr",
    title: "Des entreprises françaises",
    description: "Professionnels établis en France",
    icon: Building2,
  },
  {
    value: "individuals",
    title: "Des particuliers",
    description: "En France ou à l’étranger",
    icon: Users,
  },
  {
    value: "business_foreign",
    title: "Des entreprises étrangères",
    description: "Professionnels établis hors de France",
    icon: Globe2,
  },
  {
    value: "none",
    title: "Je n’ai pas encore de clients",
    description: "Vous préparez ou démarrez votre activité",
    icon: Sparkles,
  },
  {
    value: "unknown",
    title: "Je ne sais pas",
    description: "Nous vous donnerons une réponse prudente",
    icon: CircleHelp,
  },
];

const ACTIVITY_OPTIONS = [
  {
    value: "goods",
    title: "Des produits ou des marchandises",
    description: "Objets, matériaux, alimentation, équipements…",
    icon: Package,
  },
  {
    value: "services",
    title: "Des services",
    description: "Conseil, bâtiment, soin, création, réparation…",
    icon: Wrench,
  },
  {
    value: "both",
    title: "Les deux",
    description: "Vous vendez des produits et des services",
    icon: Boxes,
  },
  {
    value: "unknown",
    title: "Je ne sais pas",
    description: "Nous resterons prudents sur certaines obligations",
    icon: CircleHelp,
  },
];

const VAT_OPTIONS = [
  {
    value: "vat",
    title: "Oui, j’ajoute de la TVA",
    description: "Une ou plusieurs lignes de TVA apparaissent",
    icon: FileText,
  },
  {
    value: "franchise",
    title: "Non — « TVA non applicable, article 293 B »",
    description: "Souvent le cas des micro-entrepreneurs",
    icon: BadgeCheck,
  },
  {
    value: "exempt",
    title: "Non — mon activité est exonérée de TVA",
    description: "Certaines activités de santé, d’enseignement, d’assurance…",
    icon: ShieldCheck,
  },
  {
    value: "none",
    title: "Je n’émets pas encore de factures",
    description: "Vous préparez ou démarrez votre activité",
    icon: Sparkles,
  },
  {
    value: "unknown",
    title: "Je ne sais pas",
    description: "Regardez une facture récente ou votre espace professionnel",
    icon: CircleHelp,
  },
];

const MANAGEMENT_OPTIONS = [
  {
    value: "accountant",
    title: "Avec mon expert-comptable",
    description: "Il gère tout ou une partie de ma facturation",
    icon: Users,
  },
  {
    value: "software",
    title: "Avec un logiciel",
    description: "J’utilise déjà un outil de facturation",
    icon: FileText,
  },
  {
    value: "manual",
    title: "Avec Word, Excel ou manuellement",
    description: "Je crée et j’envoie mes factures moi-même",
    icon: ClipboardCheck,
  },
  {
    value: "none",
    title: "Je n’ai pas encore de solution",
    description: "Je démarre ou je souhaite changer de méthode",
    icon: Sparkles,
  },
  {
    value: "unknown",
    title: "Je ne sais pas",
    description: "Celoria vous aidera à identifier la prochaine étape",
    icon: CircleHelp,
  },
];

const VOLUME_OPTIONS = [
  {
    value: "small",
    title: "10 factures ou moins par mois",
    description: "Un besoin simple et occasionnel",
    icon: FileText,
  },
  {
    value: "medium",
    title: "Entre 11 et 100 factures par mois",
    description: "Un volume régulier à automatiser",
    icon: Boxes,
  },
  {
    value: "large",
    title: "Plus de 100 factures par mois",
    description: "Un besoin plus structuré ou connecté",
    icon: BarChart3,
  },
  {
    value: "unknown",
    title: "Je ne sais pas",
    description: "Une estimation approximative suffit",
    icon: CircleHelp,
  },
];

const NEED_OPTIONS = [
  {
    value: "invoicing",
    title: "Créer et recevoir mes factures",
    description: "Je cherche avant tout un outil simple",
    icon: FileCheck2,
  },
  {
    value: "accounting",
    title: "Gérer aussi ma comptabilité",
    description: "Facturation, déclarations et suivi comptable",
    icon: WalletCards,
  },
  {
    value: "accountant",
    title: "Trouver un expert-comptable",
    description: "Je préfère être accompagné par un professionnel",
    icon: Users,
  },
  {
    value: "unknown",
    title: "Je ne sais pas encore",
    description: "Celoria privilégiera l’option la plus simple",
    icon: CircleHelp,
  },
];

const SOLUTIONS = {
  tiime: {
    name: "Tiime",
    label: "Facturation simple",
    url: "https://www.tiime.fr/",
    description:
      "Une solution pensée pour créer, envoyer et suivre ses factures sans ajouter une gestion comptable complète.",
    check: "Vérifiez que l’offre choisie couvre votre volume et les fonctions dont vous avez besoin.",
  },
  indy: {
    name: "Indy",
    label: "Facturation et comptabilité",
    url: "https://www.indy.fr/",
    description:
      "Une solution destinée notamment aux indépendants qui veulent réunir facturation et gestion comptable.",
    check: "Vérifiez que votre statut, votre régime fiscal et vos déclarations sont pris en charge.",
  },
  dougs: {
    name: "Dougs",
    label: "Accompagnement comptable",
    url: "https://www.dougs.fr/",
    description:
      "Un cabinet d’expertise comptable en ligne pour les professionnels qui souhaitent être accompagnés.",
    check: "Demandez précisément ce qui est inclus dans la mission et qui gérera vos factures électroniques.",
  },
};

const DIAGNOSTIC_STAGES = {
  profile: { number: 1, title: "Votre activité" },
  location: { number: 2, title: "Adresse administrative" },
  employees: { number: 3, title: "Taille de l’entreprise" },
  revenue: { number: 3, title: "Taille de l’entreprise", precision: true },
  balance: { number: 3, title: "Taille de l’entreprise", precision: true },
  clients: { number: 4, title: "Vos clients" },
  activity: { number: 5, title: "Ce que vous facturez" },
  vat: { number: 6, title: "Votre situation TVA" },
};

const DIAGNOSTIC_STAGE_COUNT = 6;

function initialAnswers() {
  return {
    profile: null,
    location: null,
    employees: null,
    revenue: null,
    balance: null,
    clients: [],
    activity: null,
    vat: null,
  };
}

function initialRecommendationAnswers() {
  return {
    management: null,
    volume: null,
    need: null,
  };
}

function trackEvent(name, details = {}) {
  if (typeof window === "undefined") return;
  const event = { name, details, at: new Date().toISOString() };
  window.dispatchEvent(new CustomEvent("celoria:metric", { detail: event }));
}

function getRecommendation(answers, commercialAnswers) {
  const complexCompany =
    answers.employees === "over" ||
    (answers.revenue === "over" && answers.balance === "over") ||
    answers.profile === "special";

  if (complexCompany || commercialAnswers.volume === "large") {
    return {
      type: "orientation",
      title: "Votre besoin demande une étude plus complète",
      description:
        "Votre volume ou la structure de votre entreprise justifie une analyse avec votre équipe comptable, votre intégrateur ou votre éditeur ERP.",
      action:
        "Préparez votre volume mensuel, vos logiciels actuels et vos besoins d’intégration avant de contacter un professionnel.",
    };
  }

  if (commercialAnswers.management === "accountant") {
    return {
      type: "existing",
      title: "Votre expert-comptable est votre premier interlocuteur",
      description:
        "Une nouvelle solution n’est pas forcément nécessaire. Demandez d’abord quelle plateforme agréée sera utilisée pour votre entreprise.",
      script:
        "Quelle plateforme agréée utiliserez-vous pour mes factures électroniques, et dois-je effectuer une action de mon côté ?",
    };
  }

  if (commercialAnswers.management === "software") {
    return {
      type: "existing",
      title: "Vérifiez d’abord votre logiciel actuel",
      description:
        "Changer d’outil serait inutile si votre éditeur prévoit déjà la réception et l’émission des factures électroniques.",
      script:
        "Votre logiciel passera-t-il par une plateforme agréée, et quelles actions dois-je réaliser avant mon échéance ?",
    };
  }

  if (commercialAnswers.need === "accountant") {
    return { type: "solution", key: "dougs", solution: SOLUTIONS.dougs };
  }

  if (commercialAnswers.need === "accounting") {
    return { type: "solution", key: "indy", solution: SOLUTIONS.indy };
  }

  return { type: "solution", key: "tiime", solution: SOLUTIONS.tiime };
}

function getSteps(answers) {
  const steps = [
    {
      id: "profile",
      group: "Votre activité",
      eyebrow: "Commençons simplement",
      question: "Sous quelle forme exercez-vous votre activité ?",
      helper: "Choisissez la réponse la plus proche de votre situation.",
      type: "single",
      options: PROFILE_OPTIONS,
    },
    {
      id: "location",
      group: "Localisation",
      eyebrow: "Adresse administrative",
      question: "Quelle adresse figure sur les documents officiels de votre activité ?",
      helper: "Par exemple sur votre avis SIRENE, votre extrait Kbis ou vos documents fiscaux.",
      type: "single",
      options: LOCATION_OPTIONS,
    },
    {
      id: "employees",
      group: "Votre entreprise",
      eyebrow: "Taille de la structure",
      question: "Votre entreprise compte-t-elle 250 salariés ou plus ?",
      helper: "Cette information sert uniquement à déterminer votre échéance.",
      type: "single",
      options: EMPLOYEE_OPTIONS,
    },
  ];

  if (answers.employees === "under") {
    steps.push({
      id: "revenue",
      group: "Votre entreprise",
      eyebrow: "Une vérification rapide",
      question: "Votre chiffre d’affaires annuel dépasse-t-il 50 millions d’euros ?",
      helper: "Utilisez le dernier exercice clos avant le 1er janvier 2025.",
      type: "single",
      options: REVENUE_OPTIONS,
    });
  }

  if (answers.employees === "under" && answers.revenue === "over") {
    steps.push({
      id: "balance",
      group: "Votre entreprise",
      eyebrow: "Dernière vérification de taille",
      question: "Le total de votre bilan dépasse-t-il 43 millions d’euros ?",
      helper: "Cette information figure dans vos comptes annuels. Votre comptable peut vous la confirmer.",
      type: "single",
      options: BALANCE_OPTIONS,
    });
  }

  steps.push(
    {
      id: "clients",
      group: "Vos clients",
      eyebrow: "Plusieurs choix possibles",
      question: "Qui sont vos clients ?",
      helper: "Sélectionnez toutes les réponses qui correspondent à votre activité.",
      type: "multi",
      options: CLIENT_OPTIONS,
    },
    {
      id: "activity",
      group: "Votre activité",
      eyebrow: "Ce que vous facturez",
      question: "Que mettez-vous principalement sur vos factures ?",
      helper: "Choisissez la réponse la plus proche de votre activité habituelle.",
      type: "single",
      options: ACTIVITY_OPTIONS,
    },
    {
      id: "vat",
      group: "TVA",
      eyebrow: "Regardez une facture récente",
      question: "Sur vos factures, ajoutez-vous de la TVA ?",
      helper: "Si vous hésitez, choisissez « Je ne sais pas » : votre résultat restera prudent.",
      type: "single",
      options: VAT_OPTIONS,
    },
  );

  return steps;
}

function hasUnknown(answers) {
  return (
    Object.entries(answers).some(([key, value]) => key !== "clients" && value === "unknown") ||
    answers.clients.includes("unknown")
  );
}

function calculateResult(answers) {
  const specialProfile = ["association", "property", "special"].includes(answers.profile);
  const specialLocation = answers.location !== "metropolitan";
  const uncertain = hasUnknown(answers);
  const exempt = answers.vat === "exempt";
  const hasFrenchBusiness = answers.clients.includes("business_fr");
  const hasReportingClients =
    answers.clients.includes("individuals") || answers.clients.includes("business_foreign");

  let size = "uncertain";
  if (answers.employees === "over") size = "large";
  if (answers.employees === "under" && answers.revenue === "under") size = "small";
  if (answers.employees === "under" && answers.revenue === "over" && answers.balance === "under")
    size = "small";
  if (answers.employees === "under" && answers.revenue === "over" && answers.balance === "over")
    size = "large";

  const needsReview = specialProfile || specialLocation || uncertain || exempt || size === "uncertain";
  const issueDate = size === "large" ? "1er septembre 2026" : "1er septembre 2027";
  const calendarLabel =
    size === "large"
      ? "Calendrier ETI / grande entreprise"
      : size === "small"
        ? "Calendrier microentreprise / PME"
        : "Catégorie à confirmer";

  if (needsReview) {
    const reviewReasons = [];
    if (specialProfile) reviewReasons.push("votre forme d’activité demande une vérification particulière");
    if (specialLocation) reviewReasons.push("votre localisation relève de règles territoriales spécifiques");
    if (exempt) reviewReasons.push("les opérations exonérées de TVA obéissent à des règles particulières");
    if (uncertain || size === "uncertain")
      reviewReasons.push("au moins une information nécessaire reste à confirmer");

    return {
      tone: "review",
      label: "Un point doit être confirmé",
      title: "Votre situation mérite une vérification ciblée",
      summary:
        "Nous pouvons déjà vous orienter, mais nous ne voulons pas transformer une incertitude en fausse certitude.",
      calendarLabel,
      receptionDate: "1er septembre 2026*",
      emissionDate: hasFrenchBusiness ? `${issueDate}*` : "Non identifiée",
      calendarNote:
        "Les dates marquées d’un astérisque sont probables, mais un élément de votre dossier doit être confirmé avant de les considérer comme définitives.",
      reasons: reviewReasons,
      reception:
        "La réception électronique peut vous concerner dès le 1er septembre 2026 selon votre qualité d’assujetti et vos opérations.",
      emission: hasFrenchBusiness
        ? `L’émission électronique vers vos clients professionnels français pourrait s’appliquer à partir du ${issueDate}, sous réserve de confirmation.`
        : "Vos réponses ne permettent pas de confirmer une obligation d’émission de factures électroniques B2B françaises.",
      reporting: hasReportingClients
        ? "Vos ventes à des particuliers ou à des entreprises étrangères peuvent relever de la transmission de données (e-reporting)."
        : "Aucune obligation particulière d’e-reporting n’est identifiée à partir des clients sélectionnés.",
      next: "Confirmez le point signalé avec le questionnaire officiel ou votre comptable avant toute décision.",
    };
  }

  return {
    tone: "clear",
    label: "Votre situation est claire",
    title: "Vous êtes concerné par la réforme",
    summary:
      answers.vat === "franchise"
        ? "Le fait de ne pas facturer la TVA au titre de l’article 293 B ne vous exclut pas de la réforme."
        : "Votre activité entre dans le parcours général de la facturation électronique.",
    calendarLabel,
    receptionDate: "1er septembre 2026",
    emissionDate: hasFrenchBusiness ? issueDate : "Non identifiée",
    calendarNote: hasFrenchBusiness
      ? size === "large"
        ? "Réception et émission commencent le même jour : d’après vos réponses, votre entreprise relève du calendrier 2026 des ETI et grandes entreprises."
        : "Vous recevez dès 2026, puis vous émettez à partir de 2027 : d’après vos réponses, votre entreprise dispose d’un an supplémentaire pour l’émission."
      : "Vous devez pouvoir recevoir des factures dès 2026. Aucune émission B2B française n’est identifiée avec les clients sélectionnés.",
    reasons: [],
    reception:
      "Vous devrez pouvoir recevoir les factures électroniques de vos fournisseurs avant le 1er septembre 2026.",
    emission: hasFrenchBusiness
      ? `Vous devrez émettre vos factures électroniques vers les entreprises françaises à partir du ${issueDate}.`
      : "Aucune émission électronique B2B française n’est identifiée avec les clients sélectionnés.",
    reporting: hasReportingClients
      ? `Vos ventes à des particuliers ou à des entreprises étrangères pourront relever du e-reporting à partir du ${issueDate}. Votre plateforme s’en chargera généralement.`
      : "Aucun e-reporting particulier n’est identifié avec les clients sélectionnés.",
    next:
      "Demandez d’abord à votre comptable ou à votre logiciel quelle plateforme agréée sera utilisée pour votre entreprise.",
  };
}

function FranceMark() {
  return (
    <span className="france-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function Brand() {
  return (
    <div className="brand" aria-label="Celoria">
      <span className="brand-logo-frame">
        <img src="/celoria-logo.png" alt="Celoria" className="brand-logo" />
      </span>
    </div>
  );
}

function TrustLine({ compact = false }) {
  return (
    <div className={`trust-line ${compact ? "compact" : ""}`}>
      <span className="trust-item">
        <FranceMark />
        Réforme française
      </span>
      <span className="trust-divider" aria-hidden="true" />
      <span className="trust-item">
        <ShieldCheck size={16} />
        Vérifié le {VERIFIED_DATE}
      </span>
    </div>
  );
}

function Header({ onHome, minimal = false }) {
  return (
    <header className={`site-header ${minimal ? "minimal" : ""}`}>
      <button className="brand-button" onClick={onHome} aria-label="Retour à l’accueil">
        <Brand />
      </button>
      <div className="header-right">
        {!minimal && <TrustLine compact />}
      </div>
    </header>
  );
}

function SourceDrawer({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="drawer-backdrop" onMouseDown={onClose}>
      <aside
        className="source-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sources-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="drawer-close" onClick={onClose} aria-label="Fermer">
          <X size={20} />
        </button>
        <div className="drawer-icon">
          <ShieldCheck size={25} />
        </div>
        <p className="eyebrow">Transparence</p>
        <h2 id="sources-title">Nos sources officielles</h2>
        <p>
          Les règles présentées ont été contrôlées le <strong>{VERIFIED_DATE}</strong>. Utilisez
          toujours le questionnaire de la DGFiP pour confirmer une situation particulière.
        </p>
        <div className="source-list">
          {SOURCES.map((source) => (
            <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
              <span>{source.name}</span>
              <ExternalLink size={17} />
            </a>
          ))}
        </div>
        <div className="source-note">
          <CheckCircle2 size={18} />
          <span>Dernier contrôle réussi : {VERIFIED_DATE}</span>
        </div>
      </aside>
    </div>
  );
}

function Footer({ onSources }) {
  const footerLinks = [
    "À propos",
    "Comment ça marche",
    "Contact",
    "FAQ",
    "Mentions légales",
    "Confidentialité",
    "Cookies",
  ];

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Brand />
        <p>Des réponses claires pour choisir la prochaine étape adaptée à votre entreprise.</p>
      </div>
      <nav aria-label="Pied de page">
        {footerLinks.map((label) => (
          <button type="button" key={label}>
            {label}
          </button>
        ))}
        <button type="button" onClick={onSources}>
          Sources officielles
        </button>
      </nav>
      <small>© {new Date().getFullYear()} Celoria</small>
    </footer>
  );
}

function Landing({ onStart, onSources }) {
  return (
    <main className="landing">
      <Header onHome={() => {}} />
      <section className="hero">
        <div className="hero-copy">
          <div className="country-pill">
            <SlidersHorizontal size={17} />
            Recommandation personnalisée
          </div>
          <h1>
            Trouvez la solution de facturation
            <span> adaptée à votre entreprise.</span>
          </h1>
          <p className="hero-lead">
            Celoria clarifie d’abord vos obligations, puis compare vos besoins pour vous orienter
            vers une solution réellement pertinente.
          </p>
          <div className="hero-actions">
            <button className="primary-button hero-button" onClick={onStart}>
              Comparer gratuitement
              <ArrowRight size={20} />
            </button>
          </div>
          <p className="hero-proof">6 étapes rapides · Sans inscription · Résultat immédiat</p>
        </div>

        <div className="hero-card" aria-label="Aperçu de la recommandation">
          <div className="hero-card-top">
            <div className="mini-brand">
              <Search size={18} />
              Votre orientation
            </div>
            <span className="ready-dot">Sur mesure</span>
          </div>
          <div className="timeline-preview">
            <div className="timeline-row active">
              <span className="timeline-icon">
                <Check size={17} />
              </span>
              <div>
                <small>Étape gratuite</small>
                <strong>Vos obligations clarifiées</strong>
              </div>
            </div>
            <div className="timeline-line" />
            <div className="timeline-row">
              <span className="timeline-icon">
                <Scale size={17} />
              </span>
              <div>
                <small>Comparaison</small>
                <strong>Vos besoins analysés</strong>
              </div>
            </div>
            <div className="timeline-line" />
            <div className="timeline-row">
              <span className="timeline-icon">
                <ArrowRight size={17} />
              </span>
              <div>
                <small>Votre résultat</small>
                <strong>Une solution expliquée</strong>
              </div>
            </div>
          </div>
          <div className="verified-card">
            <ShieldCheck size={20} />
            <div>
              <strong>Diagnostic avant recommandation</strong>
              <span>Le résultat réglementaire reste séparé de la comparaison.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works compact-flow">
        <div>
          <span className="section-number">01</span>
          <h2>Diagnostic gratuit</h2>
          <p>Vos obligations et vos échéances sont clarifiées avant toute recommandation.</p>
        </div>
        <div>
          <span className="section-number">02</span>
          <h2>Besoin analysé</h2>
          <p>Votre méthode actuelle, votre volume et votre besoin sont comparés.</p>
        </div>
        <div>
          <span className="section-number">03</span>
          <h2>Solution adaptée</h2>
          <p>Une seule orientation expliquée, avec les alternatives officielles toujours accessibles.</p>
        </div>
      </section>

      <Footer onSources={onSources} />
    </main>
  );
}

function Progress({ step }) {
  const stage = DIAGNOSTIC_STAGES[step.id];
  const remaining = DIAGNOSTIC_STAGE_COUNT - stage.number;
  const progress = Math.round((stage.number / DIAGNOSTIC_STAGE_COUNT) * 100);
  const guidance = stage.precision
    ? "Une courte précision est nécessaire pour déterminer votre échéance."
    : stage.number === DIAGNOSTIC_STAGE_COUNT
      ? "Dernière étape avant votre résultat."
      : `Encore ${remaining} étape${remaining > 1 ? "s" : ""} avant votre résultat.`;

  return (
    <div
      className={`progress-wrap ${stage.precision ? "precision" : ""} ${stage.number === DIAGNOSTIC_STAGE_COUNT ? "last" : ""}`}
      aria-label={`Étape ${stage.number} sur ${DIAGNOSTIC_STAGE_COUNT} : ${stage.title}`}
    >
      <div className="progress-main">
        <div className="progress-topic">
          <span>{stage.precision ? "Question de précision" : "Étape actuelle"}</span>
          <strong>
            <b>{stage.number}</b> sur {DIAGNOSTIC_STAGE_COUNT}
            <em>— {stage.title}</em>
          </strong>
        </div>
        <div className="progress-target">
          <Flag size={17} />
          <span>Votre résultat</span>
        </div>
      </div>
      <div className="progress-track">
        <span style={{ width: `${progress}%` }} />
        <i aria-hidden="true" />
      </div>
      <p className="progress-guidance">
        {stage.precision ? <CircleHelp size={15} /> : <ArrowRight size={15} />}
        {guidance}
      </p>
    </div>
  );
}

function OptionCard({ option, selected, onClick, multi }) {
  const Icon = option.icon;
  return (
    <button
      className={`option-card ${selected ? "selected" : ""}`}
      onClick={onClick}
      aria-pressed={selected}
      type="button"
    >
      <span className="option-icon">
        <Icon size={24} strokeWidth={1.9} />
      </span>
      <span className="option-copy">
        <strong>{option.title}</strong>
        <small>{option.description}</small>
      </span>
      <span className={`selection-indicator ${multi ? "square" : ""}`}>
        {selected && <Check size={16} strokeWidth={3} />}
      </span>
    </button>
  );
}

function Questionnaire({
  answers,
  setAnswers,
  stepIndex,
  setStepIndex,
  onAnalyze,
  onHome,
}) {
  const steps = useMemo(() => getSteps(answers), [answers]);
  const safeIndex = Math.min(stepIndex, steps.length - 1);
  const step = steps[safeIndex];
  const answer = answers[step.id];
  const advanceTimer = useRef(null);

  useEffect(() => {
    return () => clearTimeout(advanceTimer.current);
  }, []);

  const setSingle = (value) => {
    const nextAnswers = { ...answers, [step.id]: value };

    if (step.id === "employees" && value !== "under") {
      nextAnswers.revenue = null;
      nextAnswers.balance = null;
    }
    if (step.id === "revenue" && value !== "over") {
      nextAnswers.balance = null;
    }

    setAnswers(nextAnswers);
    clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => {
      const nextSteps = getSteps(nextAnswers);
      if (safeIndex >= nextSteps.length - 1) onAnalyze();
      else setStepIndex(safeIndex + 1);
    }, 260);
  };

  const toggleMulti = (value) => {
    const current = Array.isArray(answer) ? answer : [];
    let next;
    if (value === "none" || value === "unknown") {
      next = current.includes(value) ? [] : [value];
    } else {
      const clean = current.filter((item) => item !== "none" && item !== "unknown");
      next = clean.includes(value) ? clean.filter((item) => item !== value) : [...clean, value];
    }
    setAnswers({ ...answers, [step.id]: next });
  };

  const canContinue = step.type === "multi" ? answer.length > 0 : Boolean(answer);

  const goNext = () => {
    if (!canContinue) return;
    if (safeIndex >= steps.length - 1) onAnalyze();
    else setStepIndex(safeIndex + 1);
  };

  const goBack = () => {
    if (safeIndex === 0) onHome();
    else setStepIndex(safeIndex - 1);
  };

  return (
    <main className="questionnaire">
      <Header onHome={onHome} minimal />
      <div className="question-shell">
        <div className="diagnostic-label">
          <ShieldCheck size={17} />
          <span>
            <strong>Diagnostic réglementaire gratuit</strong>
            6 étapes rapides. Une courte précision peut apparaître selon votre situation.
          </span>
        </div>
        <Progress step={step} />
        <section className="question-card" key={step.id}>
          <p className="eyebrow">{step.eyebrow}</p>
          <h1>{step.question}</h1>
          <p className="question-helper">{step.helper}</p>
          <div className={`choice-guidance ${step.type}`}>
            {step.type === "multi" ? (
              <ClipboardCheck size={21} />
            ) : (
              <CheckCircle2 size={21} />
            )}
            <div>
              <strong>
                {step.type === "multi"
                  ? "Plusieurs réponses possibles"
                  : "Une seule réponse possible"}
              </strong>
              <span>
                {step.type === "multi"
                  ? "Cochez tout ce qui correspond, puis cliquez sur « Continuer »."
                  : "Cliquez sur votre réponse : l’étape suivante s’affichera automatiquement."}
              </span>
            </div>
          </div>
          <div className="options-grid">
            {step.options.map((option) => (
              <OptionCard
                key={option.value}
                option={option}
                selected={
                  step.type === "multi"
                    ? answer.includes(option.value)
                    : answer === option.value
                }
                multi={step.type === "multi"}
                onClick={() =>
                  step.type === "multi" ? toggleMulti(option.value) : setSingle(option.value)
                }
              />
            ))}
          </div>
          <div className="question-actions">
            <button className="back-button" onClick={goBack}>
              <ArrowLeft size={18} />
              Retour
            </button>
            {step.type === "multi" && (
              <button
                className="primary-button continue-button"
                onClick={goNext}
                disabled={!canContinue}
              >
                Continuer
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </section>
        <div className="privacy-note">
          <ShieldCheck size={16} />
          Vos réponses restent dans votre navigateur et ne sont pas transmises.
        </div>
      </div>
    </main>
  );
}

function Analyzing({ onDone }) {
  const [stage, setStage] = useState(0);
  const items = [
    "Analyse de vos réponses",
    `Comparaison avec les règles vérifiées le ${VERIFIED_DATE}`,
    "Création de vos prochaines étapes",
  ];

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 340),
      setTimeout(() => setStage(2), 720),
      setTimeout(onDone, 1250),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <main className="analysis-screen">
      <div className="analysis-card">
        <div className="analysis-orbit">
          <FileCheck2 size={29} />
        </div>
        <p className="eyebrow">Quelques secondes</p>
        <h1>Préparation de votre réponse…</h1>
        <p>Nous transformons vos réponses en une feuille de route simple.</p>
        <div className="analysis-list">
          {items.map((item, index) => (
            <div className={index <= stage ? "done" : ""} key={item}>
              <span>{index <= stage ? <Check size={15} /> : null}</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function Result({
  answers,
  onEdit,
  onRecommend,
  onFinish,
  onHome,
}) {
  const result = calculateResult(answers);
  const [resultStep, setResultStep] = useState(0);
  const resultSteps = ["Réponse", "Échéances", "Action", "Diagnostic terminé"];
  const nextLabels = [
    "Voir mes dates",
    "Voir ma prochaine action",
    "Voir mon récapitulatif",
  ];

  const goBack = () => {
    if (resultStep === 0) onEdit();
    else setResultStep((current) => current - 1);
  };

  const goNext = () => {
    if (resultStep < resultSteps.length - 1) {
      setResultStep((current) => current + 1);
    }
  };

  return (
    <main className="result-page result-wizard-page">
      <Header onHome={onHome} minimal />
      <div className="result-wizard-shell">
        <div className="result-wizard-progress">
          <div>
            <span>Votre feuille de route</span>
            <strong>
              Étape {resultStep + 1} sur {resultSteps.length} — {resultSteps[resultStep]}
            </strong>
          </div>
          <div className="result-dots" aria-label={`Étape ${resultStep + 1} sur ${resultSteps.length}`}>
            {resultSteps.map((step, index) => (
              <span
                className={index <= resultStep ? "active" : ""}
                key={step}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        <section className={`result-wizard-card step-${resultStep}`}>
          {resultStep === 0 && (
            <div className="wizard-screen verdict-screen">
              <div className={`wizard-main-icon ${result.tone}`}>
                {result.tone === "clear" ? (
                  <CheckCircle2 size={38} />
                ) : (
                  <CircleHelp size={38} />
                )}
              </div>
              <div className={`result-status ${result.tone}`}>
                {result.tone === "clear" ? <CheckCircle2 size={17} /> : <CircleHelp size={17} />}
                {result.label}
              </div>
              <p className="eyebrow">Votre réponse</p>
              <h1>
                {result.tone === "clear"
                  ? "Oui, vous êtes concerné"
                  : "Votre situation doit être confirmée"}
              </h1>
              <p className="wizard-lead">{result.summary}</p>
              {result.reasons.length > 0 && (
                <div className="wizard-warning">
                  <CircleHelp size={20} />
                  <span>{result.reasons[0]}.</span>
                </div>
              )}
              <div className="wizard-next-hint">
                <ArrowRight size={19} />
                <span>Étape suivante : découvrir vos dates.</span>
              </div>
            </div>
          )}

          {resultStep === 1 && (
            <div className="wizard-screen dates-screen">
              <p className="eyebrow">Vos échéances</p>
              <h2>Deux dates, dans l’ordre</h2>
              <div className="wizard-dates-flow">
                <article className={`wizard-date-card ${result.tone}`}>
                  <span>1 — Recevoir</span>
                  <strong>{result.receptionDate}</strong>
                  <small>
                    {result.tone === "clear" ? "Date confirmée" : "Date probable, à confirmer"}
                  </small>
                </article>
                <div className="wizard-date-arrow">
                  <ArrowRight size={26} />
                </div>
                <article className={`wizard-date-card ${result.tone}`}>
                  <span>2 — Émettre</span>
                  <strong>{result.emissionDate}</strong>
                  <small>{result.calendarLabel}</small>
                </article>
              </div>
              <div className={`wizard-calendar-note ${result.tone}`}>
                {result.tone === "clear" ? <CheckCircle2 size={21} /> : <CircleHelp size={21} />}
                <span>{result.calendarNote}</span>
              </div>
              <div className="wizard-reporting-note">
                <strong>E-reporting :</strong>
                <span>{result.reporting}</span>
              </div>
            </div>
          )}

          {resultStep === 2 && (
            <div className="wizard-screen action-screen">
              <div className="action-step-number">1</div>
              <p className="eyebrow">Votre action après le diagnostic</p>
              <h2>Vérifiez ce qui est déjà prévu</h2>
              <p className="wizard-lead">
                Votre comptable ou votre logiciel actuel a peut-être déjà préparé le passage à la
                facturation électronique.
              </p>
              <span className="quote-label">Question à lui transmettre</span>
              <blockquote>
                « Quelle plateforme agréée utiliserez-vous pour mes factures ? Dois-je agir de mon
                côté ? »
              </blockquote>
              <div className="action-confirmation">
                <CheckCircle2 size={19} />
                <span>C’est votre première action après le diagnostic.</span>
              </div>
            </div>
          )}

          {resultStep === 3 && (
            <div className="wizard-screen transition-screen">
              <div className="wizard-main-icon clear">
                <Check size={38} />
              </div>
              <p className="eyebrow">Diagnostic gratuit terminé</p>
              <h2>Votre situation et votre prochaine action sont claires</h2>
              <p className="wizard-lead">
                Vous pouvez vous arrêter ici, ou poursuivre avec une comparaison personnalisée.
              </p>
              <div className="diagnostic-action-recap">
                <CheckCircle2 size={21} />
                <div>
                  <span>Votre action maintenant</span>
                  <strong>Demandez à votre comptable ou logiciel ce qui est déjà prévu.</strong>
                </div>
              </div>
              <div className="optional-comparison">
                <div>
                  <span>Étape facultative</span>
                  <strong>Vous n’avez pas de solution ou souhaitez comparer ?</strong>
                  <p>Répondez à quelques questions pour obtenir une option adaptée.</p>
                </div>
                <button className="primary-button" onClick={onRecommend}>
                  Comparer mes options
                  <ArrowRight size={19} />
                </button>
              </div>
              <button className="finish-here-button" onClick={onFinish}>
                Terminer ici
              </button>
            </div>
          )}

        </section>

        <div className="result-wizard-nav">
          <button className="wizard-back" onClick={goBack}>
            <ArrowLeft size={18} />
            {resultStep === 0 ? "Modifier mes réponses" : "Retour"}
          </button>

          {resultStep < resultSteps.length - 1 ? (
            <button className="primary-button wizard-next" onClick={goNext}>
              {nextLabels[resultStep]}
              <ArrowRight size={19} />
            </button>
          ) : null}
        </div>

        <div className="wizard-disclaimer">
          <ShieldCheck size={14} />
          Pré-orientation fondée sur vos réponses — informations vérifiées le {VERIFIED_DATE}.
        </div>
      </div>

    </main>
  );
}

function RecommendationQuestionnaire({
  answers,
  setAnswers,
  stepIndex,
  setStepIndex,
  onComplete,
  onBack,
  onHome,
}) {
  const steps = useMemo(() => {
    const list = [
      {
        id: "management",
        group: "Votre organisation",
        eyebrow: "Comparaison facultative",
        question: "Comment gérez-vous actuellement vos factures ?",
        helper: "Cette réponse évite de vous proposer un outil dont vous n’avez pas besoin.",
        options: MANAGEMENT_OPTIONS,
      },
    ];
    if (!["accountant", "software"].includes(answers.management)) {
      list.push(
        {
          id: "volume",
          group: "Votre volume",
          eyebrow: "Une estimation suffit",
          question: "Combien de factures gérez-vous approximativement chaque mois ?",
          helper: "Comptez les factures envoyées et reçues. Il n’est pas nécessaire d’être précis.",
          options: VOLUME_OPTIONS,
        },
        {
          id: "need",
          group: "Votre besoin",
          eyebrow: "Dernière question",
          question: "De quoi avez-vous principalement besoin ?",
          helper: "Choisissez votre priorité actuelle. Vous pourrez toujours comparer ensuite.",
          options: NEED_OPTIONS,
        },
      );
    }
    return list;
  }, [answers.management]);

  const safeIndex = Math.min(stepIndex, steps.length - 1);
  const step = steps[safeIndex];
  const selected = answers[step.id];

  const choose = (value) => {
    const next = { ...answers, [step.id]: value };
    if (step.id === "management" && ["accountant", "software"].includes(value)) {
      next.volume = null;
      next.need = null;
    }
    setAnswers(next);
    setTimeout(() => {
      const nextSteps =
        ["accountant", "software"].includes(next.management) ? steps.slice(0, 1) : steps;
      if (safeIndex >= nextSteps.length - 1) onComplete(next);
      else setStepIndex(safeIndex + 1);
    }, 220);
  };

  return (
    <main className="recommendation-page">
      <Header onHome={onHome} minimal />
      <div className="recommendation-shell">
        <div className="recommendation-head">
          <span>Comparaison personnalisée</span>
          <strong>
            Question {safeIndex + 1} sur {steps.length}
          </strong>
        </div>
        <section className="recommendation-question" key={step.id}>
          <div className="commercial-badge">
            <Scale size={17} />
            Recommandation facultative
          </div>
          <p className="eyebrow">{step.eyebrow}</p>
          <h1>{step.question}</h1>
          <p className="question-helper">{step.helper}</p>
          <div className="options-grid">
            {step.options.map((option) => (
              <OptionCard
                key={option.value}
                option={option}
                selected={selected === option.value}
                onClick={() => choose(option.value)}
              />
            ))}
          </div>
          <div className="question-actions">
            <button
              className="back-button"
              onClick={() => (safeIndex === 0 ? onBack() : setStepIndex(safeIndex - 1))}
            >
              <ArrowLeft size={18} />
              Retour
            </button>
          </div>
        </section>
        <p className="commercial-separation">
          Cette partie compare votre besoin. Elle ne modifie pas votre diagnostic réglementaire.
        </p>
      </div>
    </main>
  );
}

function SolutionComparison({ selectedKey }) {
  const rows = [
    ["tiime", "Tiime", "Facturer simplement", "Facturation seule"],
    ["indy", "Indy", "Facturer et gérer sa comptabilité", "Indépendants"],
    ["dougs", "Dougs", "Être accompagné par un comptable", "Accompagnement"],
  ];

  return (
    <div className="comparison-table">
      <div className="comparison-table-head">
        <div>
          <p className="eyebrow">Comparaison simple</p>
          <h2>Comprendre les différences</h2>
        </div>
        <span>Pas de classement général</span>
      </div>
      <div className="comparison-rows">
        {rows.map(([key, name, purpose, profile]) => (
          <div className={key === selectedKey ? "recommended" : ""} key={key}>
            <strong>{name}</strong>
            <span>{purpose}</span>
            <small>{profile}</small>
            {key === selectedKey && <b>Adapté à vos réponses</b>}
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendationResult({ regulatoryAnswers, commercialAnswers, onFinish, onEdit, onHome }) {
  const recommendation = getRecommendation(regulatoryAnswers, commercialAnswers);

  const clickSolution = () => {
    if (recommendation.type === "solution") {
      trackEvent("partner_click", { solution: recommendation.key });
    }
  };

  return (
    <main className="recommendation-result-page">
      <Header onHome={onHome} />
      <div className="recommendation-result-shell">
        <div className="result-intro">
          <div className="commercial-badge">
            <SlidersHorizontal size={17} />
            Orientation selon vos réponses
          </div>
          <p className="eyebrow">Votre comparaison</p>
          <h1>
            {recommendation.type === "solution"
              ? "Une option adaptée à votre besoin"
              : recommendation.title}
          </h1>
          <p>
            {recommendation.type === "solution"
              ? "Celoria a rapproché votre organisation, votre volume et votre priorité."
              : recommendation.description}
          </p>
        </div>

        {recommendation.type === "solution" ? (
          <>
            <article className="solution-card">
              <div className="solution-card-main">
                <span className="solution-match">Correspond à votre besoin</span>
                <h2>{recommendation.solution.name}</h2>
                <strong>{recommendation.solution.label}</strong>
                <p>{recommendation.solution.description}</p>
                <div className="solution-check">
                  <CircleHelp size={19} />
                  <span>
                    <b>À vérifier avant de choisir :</b> {recommendation.solution.check}
                  </span>
                </div>
              </div>
              <div className="solution-card-action">
                <a
                  href={recommendation.solution.url}
                  target="_blank"
                  rel="noreferrer"
                  className="primary-button solution-button"
                  onClick={clickSolution}
                >
                  Découvrir {recommendation.solution.name}
                  <ExternalLink size={18} />
                </a>
                <small>
                  Suggestion commerciale facultative. Si un partenariat est actif, Celoria peut
                  recevoir une commission en cas d’inscription. Le diagnostic reste inchangé.
                </small>
              </div>
            </article>
            <SolutionComparison selectedKey={recommendation.key} />
          </>
        ) : (
          <article className="orientation-card">
            {recommendation.script ? (
              <>
                <p>Question à transmettre :</p>
                <blockquote>« {recommendation.script} »</blockquote>
              </>
            ) : (
              <p>{recommendation.action}</p>
            )}
          </article>
        )}

        <div className="recommendation-bottom">
          <a href={OFFICIAL_PLATFORM_LIST} target="_blank" rel="noreferrer">
            Consulter la liste officielle des plateformes agréées
            <ExternalLink size={16} />
          </a>
          <div>
            <button className="secondary-button" onClick={onEdit}>
              <ArrowLeft size={17} />
              Modifier mes réponses
            </button>
            <button className="primary-button" onClick={() => onFinish(recommendation)}>
              Terminer ma feuille de route
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function FinalScreen({
  regulatoryAnswers,
  recommendation,
  onEdit,
  onRestart,
  onSources,
  onHome,
}) {
  const result = calculateResult(regulatoryAnswers);
  const [shared, setShared] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const share = async () => {
    const data = {
      title: "Celoria",
      text: "Clarifiez vos obligations et trouvez une solution de facturation adaptée avec Celoria.",
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      trackEvent("shared");
    } catch {
      setShared(false);
    }
  };

  const priority =
    recommendation?.type === "solution"
      ? `Vérifier si ${recommendation.solution.name} correspond à vos besoins précis.`
      : recommendation?.script
        ? "Transmettre la question préparée à votre interlocuteur actuel."
        : result.next;

  return (
    <main className="final-page">
      <Header onHome={onHome} minimal />
      <section className="final-card">
        <div className="wizard-main-icon clear">
          <Check size={39} />
        </div>
        <p className="eyebrow">Parcours terminé</p>
        <h1>Votre feuille de route est prête</h1>
        <div className="final-summary">
          <div>
            <span>Échéance principale</span>
            <strong>{result.emissionDate}</strong>
          </div>
          <div>
            <span>Action prioritaire</span>
            <strong>{priority}</strong>
          </div>
          {recommendation?.type === "solution" && (
            <div>
              <span>Option identifiée</span>
              <strong>{recommendation.solution.name}</strong>
            </div>
          )}
        </div>
        <div className="final-actions">
          <button className="secondary-button" onClick={onEdit}>
            Modifier mes réponses
          </button>
          <button className="secondary-button" onClick={share}>
            <Share2 size={17} />
            {shared ? "Lien copié" : "Partager à un collègue"}
          </button>
          <button className="text-button" onClick={onRestart}>
            Recommencer
          </button>
        </div>
        <div className="final-feedback">
          <span>Cette orientation vous a-t-elle aidé ?</span>
          {feedback ? (
            <strong>
              <Check size={15} /> Merci
            </strong>
          ) : (
            <div>
              <button onClick={() => setFeedback("yes")}>Oui</button>
              <button onClick={() => setFeedback("improve")}>À améliorer</button>
            </div>
          )}
        </div>
        <button className="sources-inline" onClick={onSources}>
          <ShieldCheck size={16} />
          Sources officielles vérifiées le {VERIFIED_DATE}
        </button>
      </section>
      <Footer onSources={onSources} />
    </main>
  );
}

export default function Page() {
  const [view, setView] = useState("landing");
  const [answers, setAnswers] = useState(initialAnswers);
  const [commercialAnswers, setCommercialAnswers] = useState(initialRecommendationAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const [recommendationStep, setRecommendationStep] = useState(0);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [sourcesOpen, setSourcesOpen] = useState(false);

  useEffect(() => {
    trackEvent("visitor");
  }, []);

  const goHome = () => {
    setView("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const start = () => {
    setStepIndex(0);
    setView("questionnaire");
    trackEvent("diagnostic_started");
    window.scrollTo(0, 0);
  };

  const analyze = () => {
    setView("analyzing");
    window.scrollTo(0, 0);
  };

  const showResult = () => {
    setView("result");
    trackEvent("diagnostic_completed");
    window.scrollTo(0, 0);
  };

  const restart = () => {
    setAnswers(initialAnswers());
    setCommercialAnswers(initialRecommendationAnswers());
    setStepIndex(0);
    setRecommendationStep(0);
    setSelectedRecommendation(null);
    setView("questionnaire");
    window.scrollTo(0, 0);
  };

  const startRecommendation = () => {
    setRecommendationStep(0);
    setView("recommendation");
    trackEvent("recommendation_requested");
    window.scrollTo(0, 0);
  };

  const showRecommendation = (nextAnswers = commercialAnswers) => {
    setCommercialAnswers(nextAnswers);
    setView("recommendation-result");
    trackEvent("recommendation_completed");
    window.scrollTo(0, 0);
  };

  const finish = (recommendation = null) => {
    setSelectedRecommendation(recommendation);
    setView("final");
    trackEvent("journey_completed", {
      recommendation: recommendation?.key || recommendation?.type || "none",
    });
    window.scrollTo(0, 0);
  };

  return (
    <>
      {view === "landing" && (
        <Landing onStart={start} onSources={() => setSourcesOpen(true)} />
      )}
      {view === "questionnaire" && (
        <Questionnaire
          answers={answers}
          setAnswers={setAnswers}
          stepIndex={stepIndex}
          setStepIndex={setStepIndex}
          onAnalyze={analyze}
          onHome={goHome}
        />
      )}
      {view === "analyzing" && <Analyzing onDone={showResult} />}
      {view === "result" && (
        <Result
          answers={answers}
          onEdit={() => {
            setStepIndex(0);
            setView("questionnaire");
          }}
          onRecommend={startRecommendation}
          onFinish={() => finish(null)}
          onHome={goHome}
        />
      )}
      {view === "recommendation" && (
        <RecommendationQuestionnaire
          answers={commercialAnswers}
          setAnswers={setCommercialAnswers}
          stepIndex={recommendationStep}
          setStepIndex={setRecommendationStep}
          onComplete={showRecommendation}
          onBack={() => setView("result")}
          onHome={goHome}
        />
      )}
      {view === "recommendation-result" && (
        <RecommendationResult
          regulatoryAnswers={answers}
          commercialAnswers={commercialAnswers}
          onFinish={finish}
          onEdit={() => {
            setRecommendationStep(0);
            setView("recommendation");
          }}
          onHome={goHome}
        />
      )}
      {view === "final" && (
        <FinalScreen
          regulatoryAnswers={answers}
          recommendation={selectedRecommendation}
          onEdit={() => {
            setStepIndex(0);
            setView("questionnaire");
          }}
          onRestart={restart}
          onSources={() => setSourcesOpen(true)}
          onHome={goHome}
        />
      )}
      <SourceDrawer open={sourcesOpen} onClose={() => setSourcesOpen(false)} />
    </>
  );
}
