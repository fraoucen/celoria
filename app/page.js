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
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  Mail,
  MapPin,
  Package,
  RefreshCcw,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Store,
  Users,
  WalletCards,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const VERIFIED_DATE = "18 juillet 2026";

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
      <span className="brand-mark" aria-hidden="true">
        <FileCheck2 size={21} strokeWidth={2.1} />
      </span>
      <span>Celoria</span>
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
        <span className="independent">Site indépendant</span>
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
          Les règles présentées ont été contrôlées le <strong>{VERIFIED_DATE}</strong>. Le site
          est indépendant et n’est pas affilié à l’administration française.
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

function Landing({ onStart, onSources }) {
  return (
    <main className="landing">
      <Header onHome={() => {}} />
      <section className="hero">
        <div className="hero-copy">
          <div className="country-pill">
            <FranceMark />
            Pour les professionnels en France
          </div>
          <h1>
            La facture électronique,
            <span> enfin expliquée clairement.</span>
          </h1>
          <p className="hero-lead">
            Répondez à quelques questions simples. Repartez avec vos échéances et vos prochaines
            étapes, gratuitement.
          </p>
          <div className="hero-actions">
            <button className="primary-button hero-button" onClick={onStart}>
              Obtenir ma feuille de route
              <ArrowRight size={20} />
            </button>
            <span className="duration">
              <CalendarClock size={18} />
              Environ 1 minute
            </span>
          </div>
          <div className="benefits" aria-label="Avantages">
            <span>
              <Check size={17} /> Sans inscription
            </span>
            <span>
              <Check size={17} /> Sans e-mail obligatoire
            </span>
            <span>
              <Check size={17} /> Résultat immédiat
            </span>
          </div>
        </div>

        <div className="hero-card" aria-label="Aperçu de la feuille de route">
          <div className="hero-card-top">
            <div className="mini-brand">
              <ClipboardCheck size={18} />
              Votre feuille de route
            </div>
            <span className="ready-dot">Prête en 1 min</span>
          </div>
          <div className="timeline-preview">
            <div className="timeline-row active">
              <span className="timeline-icon">
                <Check size={17} />
              </span>
              <div>
                <small>Votre situation</small>
                <strong>Une réponse claire</strong>
              </div>
            </div>
            <div className="timeline-line" />
            <div className="timeline-row">
              <span className="timeline-icon">
                <CalendarClock size={17} />
              </span>
              <div>
                <small>Vos échéances</small>
                <strong>2026 et 2027 expliquées</strong>
              </div>
            </div>
            <div className="timeline-line" />
            <div className="timeline-row">
              <span className="timeline-icon">
                <ArrowRight size={17} />
              </span>
              <div>
                <small>Votre prochaine étape</small>
                <strong>Une action simple à réaliser</strong>
              </div>
            </div>
          </div>
          <div className="verified-card">
            <ShieldCheck size={20} />
            <div>
              <strong>Informations vérifiées</strong>
              <span>Sources officielles contrôlées le {VERIFIED_DATE}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div>
          <span className="section-number">01</span>
          <h2>Vous répondez</h2>
          <p>Des questions sans jargon, avec toujours la possibilité de dire « Je ne sais pas ».</p>
        </div>
        <div>
          <span className="section-number">02</span>
          <h2>Nous clarifions</h2>
          <p>Vos réponses sont comparées aux règles officielles vérifiées.</p>
        </div>
        <div>
          <span className="section-number">03</span>
          <h2>Vous agissez</h2>
          <p>Vous obtenez vos dates, vos obligations probables et votre prochaine action.</p>
        </div>
      </section>

      <section className="trust-banner">
        <div className="trust-banner-icon">
          <ShieldCheck size={26} />
        </div>
        <div>
          <p className="eyebrow">Une information transparente</p>
          <h2>Des sources officielles, une lecture indépendante.</h2>
          <p>
            Celoria Facture simplifie les informations publiques sans se substituer à
            l’administration ni à votre conseil professionnel.
          </p>
        </div>
        <button className="text-button" onClick={onSources}>
          Voir les sources
          <ExternalLink size={17} />
        </button>
      </section>

      <footer className="site-footer">
        <Brand />
        <p>Site indépendant — non affilié à l’administration française.</p>
        <button onClick={onSources}>Sources officielles</button>
      </footer>
    </main>
  );
}

function Progress({ steps, currentIndex }) {
  const progress = Math.round(((currentIndex + 1) / steps.length) * 100);
  return (
    <div className="progress-wrap" aria-label={`Progression : ${progress} %`}>
      <div className="progress-main">
        <div className="progress-topic">
          <span>Votre progression</span>
          <strong>{steps[currentIndex]?.group}</strong>
        </div>
        <div className="progress-score">
          <strong>
            {progress}<span>%</span>
          </strong>
          <small>
            Question {currentIndex + 1} sur {steps.length}
          </small>
        </div>
      </div>
      <div className="progress-track">
        <span style={{ width: `${progress}%` }} />
      </div>
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
        <Progress steps={steps} currentIndex={safeIndex} />
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
  onRestart,
  onSources,
  onHome,
}) {
  const result = calculateResult(answers);
  const [resultStep, setResultStep] = useState(0);
  const [emailOpen, setEmailOpen] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const resultSteps = ["Réponse", "Dates", "Action 1", "Action 2", "Action 3", "Terminé"];
  const nextLabels = [
    "Voir mes dates",
    "Voir ce que je dois faire",
    "Action suivante",
    "Action suivante",
    "Terminer ma feuille de route",
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
              <p className="eyebrow">À faire en premier</p>
              <h2>Interrogez votre solution actuelle</h2>
              <p className="wizard-lead">
                Contactez votre comptable ou l’assistance de votre logiciel de facturation.
              </p>
              <blockquote>
                « Quelle plateforme agréée utiliserez-vous pour mes factures ? Dois-je effectuer
                une action de mon côté ? »
              </blockquote>
              <div className="wizard-next-hint">
                <CheckCircle2 size={19} />
                <span>Commencez par cette question. N’achetez encore aucun nouveau logiciel.</span>
              </div>
            </div>
          )}

          {resultStep === 3 && (
            <div className="wizard-screen action-screen">
              <div className="action-step-number">2</div>
              <p className="eyebrow">Vérification officielle</p>
              <h2>Confirmez votre situation</h2>
              <p className="wizard-lead">
                Utilisez le questionnaire de la DGFiP pour confirmer le résultat avant toute
                décision importante.
              </p>
              <a
                href={SOURCES[0].url}
                target="_blank"
                rel="noreferrer"
                className="official-link-button"
              >
                Ouvrir le questionnaire officiel
                <ExternalLink size={18} />
              </a>
              <div className="wizard-next-hint">
                <ShieldCheck size={19} />
                <span>Ce lien ouvre le site officiel impots.gouv.fr.</span>
              </div>
            </div>
          )}

          {resultStep === 4 && (
            <div className="wizard-screen action-screen">
              <div className="action-step-number">3</div>
              <p className="eyebrow">Seulement si nécessaire</p>
              <h2>Choisissez une solution uniquement s’il en manque une</h2>
              <p className="wizard-lead">
                Si votre comptable ou votre logiciel a déjà prévu une plateforme agréée, vous
                n’avez probablement rien à changer.
              </p>
              <a
                href={SOURCES[3].url}
                target="_blank"
                rel="noreferrer"
                className="official-link-button secondary"
              >
                Voir la liste des plateformes agréées
                <ExternalLink size={18} />
              </a>
              <div className="wizard-next-hint">
                <CircleHelp size={19} />
                <span>Ne choisissez une nouvelle solution qu’après l’action 1.</span>
              </div>
            </div>
          )}

          {resultStep === 5 && (
            <div className="wizard-screen finish-screen">
              <div className="wizard-main-icon clear">
                <Check size={40} />
              </div>
              <p className="eyebrow">Fin de votre feuille de route</p>
              <h2>C’est terminé : vous savez quoi faire</h2>
              <div className="finish-recap">
                <div>
                  <Check size={17} />
                  <span>Votre situation est expliquée</span>
                </div>
                <div>
                  <Check size={17} />
                  <span>Vos dates sont identifiées</span>
                </div>
                <div>
                  <Check size={17} />
                  <span>Votre première action est claire</span>
                </div>
              </div>
              <div className="finish-priority">
                <span>Votre priorité maintenant</span>
                <strong>Demandez à votre comptable ou logiciel quelle plateforme sera utilisée.</strong>
              </div>
              <div className="finish-tools">
                <button className="secondary-button" onClick={() => setEmailOpen(true)}>
                  <Mail size={18} />
                  Recevoir par e-mail
                </button>
                <button className="text-button" onClick={onSources}>
                  <ShieldCheck size={17} />
                  Voir les sources
                </button>
              </div>
              <div className="wizard-feedback">
                <span>Cette feuille de route est-elle claire ?</span>
                {feedback ? (
                  <strong>
                    <Check size={16} /> Merci pour votre avis
                  </strong>
                ) : (
                  <div>
                    {["Oui", "À améliorer"].map((label) => (
                      <button key={label} onClick={() => setFeedback(label)}>
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        <div className="result-wizard-nav">
          <button className="wizard-back" onClick={resultStep === 5 ? () => setResultStep(0) : goBack}>
            <ArrowLeft size={18} />
            {resultStep === 0
              ? "Modifier mes réponses"
              : resultStep === 5
                ? "Revoir depuis le début"
                : "Retour"}
          </button>

          {resultStep < resultSteps.length - 1 ? (
            <button className="primary-button wizard-next" onClick={goNext}>
              {nextLabels[resultStep]}
              <ArrowRight size={19} />
            </button>
          ) : (
            <button className="primary-button wizard-next" onClick={onRestart}>
              Recommencer
              <RotateCcw size={18} />
            </button>
          )}
        </div>

        <div className="wizard-disclaimer">
          <ShieldCheck size={14} />
          Pré-orientation fondée sur vos réponses — informations vérifiées le {VERIFIED_DATE}.
        </div>
      </div>

      {emailOpen && <EmailModal onClose={() => setEmailOpen(false)} />}
    </main>
  );
}

function EmailModal({ onClose }) {
  const [sent, setSent] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="email-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="drawer-close" onClick={onClose} aria-label="Fermer">
          <X size={20} />
        </button>
        {sent ? (
          <div className="email-success">
            <div className="success-icon">
              <Check size={25} />
            </div>
            <h2>Fonction bientôt disponible</h2>
            <p>
              Cette première version présente l’expérience complète. L’envoi réel sera activé lors
              de la mise en ligne commerciale.
            </p>
            <button className="primary-button" onClick={onClose}>
              Fermer
            </button>
          </div>
        ) : (
          <>
            <div className="modal-icon">
              <Mail size={24} />
            </div>
            <p className="eyebrow">Facultatif</p>
            <h2 id="email-title">Recevoir votre feuille de route</h2>
            <p>
              Votre résultat reste visible sans e-mail. Cette adresse servirait uniquement à vous
              envoyer cette feuille de route.
            </p>
            <form onSubmit={submit}>
              <label htmlFor="email">Votre adresse e-mail</label>
              <input id="email" type="email" placeholder="vous@entreprise.fr" required />
              <button className="primary-button" type="submit">
                M’envoyer ma feuille de route
                <ArrowRight size={18} />
              </button>
            </form>
            <small>Aucune inscription automatique à une newsletter.</small>
          </>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  const [view, setView] = useState("landing");
  const [answers, setAnswers] = useState(initialAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const [sourcesOpen, setSourcesOpen] = useState(false);

  const goHome = () => {
    setView("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const start = () => {
    setStepIndex(0);
    setView("questionnaire");
    window.scrollTo(0, 0);
  };

  const analyze = () => {
    setView("analyzing");
    window.scrollTo(0, 0);
  };

  const showResult = () => {
    setView("result");
    window.scrollTo(0, 0);
  };

  const restart = () => {
    setAnswers(initialAnswers());
    setStepIndex(0);
    setView("questionnaire");
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
          onRestart={restart}
          onSources={() => setSourcesOpen(true)}
          onHome={goHome}
        />
      )}
      <SourceDrawer open={sourcesOpen} onClose={() => setSourcesOpen(false)} />
    </>
  );
}
