import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bookmark,
  BookmarkCheck,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Columns3,
  ExternalLink,
  GraduationCap,
  Heart,
  ListFilter,
  MapPin,
  Menu,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

const opportunities = [
  {
    id: 1,
    org: "The Wharton School",
    shortOrg: "WHARTON",
    title: "Global High School Investment Competition",
    category: "Competition",
    paid: "Unpaid",
    location: "Global · Remote",
    grades: "9–12",
    deadline: "Sep 30",
    deadlineLong: "September 30, 2026",
    time: "3–5 hrs / week",
    duration: "10 weeks",
    difficulty: "Competitive",
    format: "Remote",
    applicationType: "Team",
    deadlineDate: "2026-09-30",
    blurb:
      "Build and defend an investment strategy with a team using a real-world case and institutional-grade analysis.",
    why: "A rare mix of markets, teamwork, and persuasive communication—with a globally recognized final round.",
    image:
      "https://www.smeal.psu.edu/traderoom/images/TradingRoom_015.jpg/@@images/image.jpeg",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/University_of_Pennsylvania_shield.svg/240px-University_of_Pennsylvania_shield.svg.png",
    impact: "High impact",
    added: "Added 2 days ago",
    applyUrl: "https://globalyouth.wharton.upenn.edu/investment-competition/",
    sourceUrl: "https://globalyouth.wharton.upenn.edu/investment-competition/",
  },
  {
    id: 2,
    org: "Bank of America",
    shortOrg: "BANK OF AMERICA",
    title: "Student Leaders Program",
    category: "Internship",
    paid: "Paid",
    location: "40+ U.S. markets",
    grades: "11–12",
    deadline: "Oct 14",
    deadlineLong: "October 14, 2026",
    time: "35 hrs / week",
    duration: "8 weeks",
    difficulty: "Highly competitive",
    format: "In person",
    applicationType: "Individual",
    deadlineDate: "2026-10-14",
    blurb:
      "A paid summer placement with a local nonprofit plus a national leadership summit in Washington, D.C.",
    why: "Substantive local work and a selective national network make this much more than a résumé line.",
    image:
      "https://resources.finalsite.net/images/f_auto%2Cq_auto%2Ct_image_size_2/v1764086245/ccsk12inus/ewbz8bbnerupu2pjkzu3/AaronandVaradatStateFarm1.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Bank_of_America_logo.svg/512px-Bank_of_America_logo.svg.png",
    impact: "High impact",
    added: "Added this week",
    applyUrl:
      "https://about.bankofamerica.com/en/making-an-impact/student-leaders",
    sourceUrl:
      "https://about.bankofamerica.com/en/making-an-impact/student-leaders",
  },
  {
    id: 3,
    org: "LaunchX",
    shortOrg: "LAUNCHX",
    title: "LaunchX Entrepreneurship Program",
    category: "Summer Program",
    paid: "Unpaid",
    location: "Remote",
    grades: "10–12",
    deadline: "Oct 28",
    deadlineLong: "October 28, 2026",
    time: "Full time",
    duration: "4 weeks",
    difficulty: "Competitive",
    format: "Remote",
    applicationType: "Individual",
    deadlineDate: "2026-10-28",
    blurb:
      "Launch a real venture with ambitious peers through customer research, prototyping, and structured mentorship.",
    why: "Excellent for students who want to test whether they actually enjoy building—not just studying—businesses.",
    image:
      "https://www.temple.edu/sites/www/files/media/image/20180828_160_90_Fox_012.jpg",
    logo: "",
    impact: "Featured",
    added: "Added yesterday",
    applyUrl: "https://www.launchx.com/programs/online-entrepreneurship",
    sourceUrl: "https://www.launchx.com/programs/online-entrepreneurship",
  },
  {
    id: 4,
    org: "Junior Achievement",
    shortOrg: "JA",
    title: "National Stock Market Challenge",
    category: "Competition",
    paid: "Scholarship awards",
    location: "Remote",
    grades: "9–12",
    deadline: "Nov 03",
    deadlineLong: "November 3, 2026",
    time: "2 hrs / week",
    duration: "6 weeks",
    difficulty: "Moderate",
    format: "Remote",
    applicationType: "Team",
    deadlineDate: "2026-11-03",
    blurb:
      "Manage a simulated portfolio and respond to market-moving news in a fast-paced team competition.",
    why: "A strong, accessible first signal of serious interest in markets and portfolio thinking.",
    image:
      "https://www.iona.edu/sites/default/files/styles/scale/public/2025-08/ancillary-images/students-trading-floor.jpg?itok=DG3GmheJ",
    logo: "",
    impact: "Recently added",
    added: "Added today",
    applyUrl: "https://jausa.ja.org/programs/ja-stock-market-challenge",
    sourceUrl: "https://jausa.ja.org/programs/ja-stock-market-challenge",
  },
  {
    id: 5,
    org: "University of Michigan",
    shortOrg: "MICHIGAN",
    title: "Youth Research Scholars",
    category: "Research",
    paid: "Stipend",
    location: "Ann Arbor, MI",
    grades: "11–12",
    deadline: "Nov 18",
    deadlineLong: "November 18, 2026",
    time: "20 hrs / week",
    duration: "7 weeks",
    difficulty: "Highly competitive",
    format: "In person",
    applicationType: "Individual",
    deadlineDate: "2026-11-18",
    blurb:
      "Join a faculty-led research group and present an original project at a closing symposium.",
    why: "Real mentorship, defined outputs, and exposure to the pace and ambiguity of university research.",
    image:
      "https://umdearborn.edu/sites/default/files/2023-09/UMD-FanLab-Jun23%2826%29-a.jpeg",
    logo: "",
    impact: "High impact",
    added: "Added 4 days ago",
    applyUrl:
      "https://umdearborn.edu/academics/research/undergraduate-research",
    sourceUrl:
      "https://umdearborn.edu/academics/research/undergraduate-research",
  },
];

function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(`beacon:${key}`);
      return stored === null ? initialValue : JSON.parse(stored);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(`beacon:${key}`, JSON.stringify(value));
    } catch {
      // Storage can be unavailable in private browsing; the session still works.
    }
  }, [key, value]);

  return [value, setValue];
}

function routeFromHash() {
  const hash = window.location.hash.replace("#", "");
  if (hash.startsWith("opportunity-"))
    return { page: "detail", id: Number(hash.replace("opportunity-", "")) };
  if (["saved", "compare", "discover"].includes(hash)) return { page: hash };
  return { page: "discover" };
}

function normalizeSearch(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const emptyFilters = {
  Category: [],
  "Grade level": [],
  Compensation: [],
  Format: [],
  Deadline: [],
  "Time commitment": [],
  "Application type": [],
};

function matchesFilters(item, filters) {
  if (filters.Category.length && !filters.Category.includes(item.category))
    return false;
  if (filters["Grade level"].length) {
    const [min, max = min] = item.grades.split("–").map(Number);
    if (
      !filters["Grade level"].some(
        (grade) =>
          Number(grade.replace(/\D/g, "")) >= min &&
          Number(grade.replace(/\D/g, "")) <= max,
      )
    )
      return false;
  }
  if (filters.Compensation.length) {
    const compensation =
      item.paid === "Paid"
        ? "Paid"
        : item.paid === "Unpaid"
          ? "Unpaid"
          : "Stipend / award";
    if (!filters.Compensation.includes(compensation)) return false;
  }
  if (filters.Format.length && !filters.Format.includes(item.format))
    return false;
  if (
    filters["Application type"].length &&
    !filters["Application type"].includes(item.applicationType)
  )
    return false;
  if (filters.Deadline.length) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = Math.ceil(
      (new Date(`${item.deadlineDate}T23:59:59`) - today) / 86400000,
    );
    const deadlineMatch = filters.Deadline.some((value) =>
      value === "Next 7 days"
        ? days >= 0 && days <= 7
        : value === "Next 30 days"
          ? days >= 0 && days <= 30
          : days >= 0 && days <= 120,
    );
    if (!deadlineMatch) return false;
  }
  if (filters["Time commitment"].length) {
    const hours = Number(item.time.match(/\d+/)?.[0] || 40);
    const timeMatch = filters["Time commitment"].some((value) =>
      value === "Under 5 hrs / week"
        ? hours < 5
        : value === "5–15 hrs / week"
          ? hours >= 5 && hours <= 15
          : item.time === "Full time" || hours > 15,
    );
    if (!timeMatch) return false;
  }
  return true;
}

function Brand({ compact = false, onClick }) {
  return (
    <button
      className="brand"
      aria-label="Beacon Finance home"
      onClick={onClick}
    >
      <svg className="bull" viewBox="0 0 46 32" aria-hidden="true">
        <path d="M7 7c5 0 9 2 11 6M39 7c-5 0-9 2-11 6M7 7 3 2M39 7l4-5M16 12c2-3 12-3 14 0 2 3 1 12-2 15-3 3-7 3-10 0-3-3-4-12-2-15Z" />
        <path d="M18 20c3 2 7 2 10 0" />
      </svg>
      {!compact && (
        <span>
          <b>BEACON</b>
          <small>FINANCE</small>
        </span>
      )}
    </button>
  );
}

function OrgLogo({ item, large = false }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`org-logo ${large ? "large" : ""}`}>
      {item.logo && !failed ? (
        <img
          src={item.logo}
          alt={`${item.org} logo`}
          onError={() => setFailed(true)}
        />
      ) : (
        <span>{item.shortOrg.slice(0, 2)}</span>
      )}
    </div>
  );
}

function App() {
  const initialRoute = useMemo(routeFromHash, []);
  const [page, setPage] = useState(initialRoute.page);
  const [current, setCurrent] = usePersistentState("current-opportunity", 0);
  const [detailId, setDetailId] = useState(
    initialRoute.id || opportunities[0].id,
  );
  const [saved, setSaved] = usePersistentState("saved-opportunities", []);
  const [compare, setCompare] = usePersistentState("comparison", []);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = usePersistentState("filters", emptyFilters);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [statuses, setStatuses] = usePersistentState(
    "application-statuses",
    {},
  );
  const [notes, setNotes] = usePersistentState("notes", {});
  const [actionHistory, setActionHistory] = useState([]);
  const [reviewedIds, setReviewedIds] = usePersistentState(
    "reviewed-opportunities",
    [],
  );

  const filteredOpportunities = useMemo(
    () => opportunities.filter((item) => matchesFilters(item, filters)),
    [filters],
  );
  const deckOpportunities = useMemo(
    () =>
      filteredOpportunities.filter((item) => !reviewedIds.includes(item.id)),
    [filteredOpportunities, reviewedIds],
  );
  const activeCategory =
    filters.Category.length === 1 ? filters.Category[0] : "All opportunities";
  const activeFilterCount = Object.values(filters).reduce(
    (total, values) => total + values.length,
    0,
  );
  const detailItem =
    opportunities.find((opportunity) => opportunity.id === detailId) ||
    opportunities[0];
  const visible = useMemo(() => {
    const terms = normalizeSearch(query).split(" ").filter(Boolean);
    return opportunities.filter((o) => {
      const aliases = o.location.includes("Remote") ? "virtual online" : "";
      const haystack = normalizeSearch(
        `${o.title} ${o.org} ${o.category} ${o.location} ${o.paid} grades ${o.grades} ${o.time} ${o.duration} ${aliases}`,
      );
      return terms.every((term) => haystack.includes(term));
    });
  }, [query]);

  useEffect(() => {
    if (!window.location.hash)
      window.history.replaceState({ beacon: true }, "", "#discover");
    const handleBack = () => {
      const route = routeFromHash();
      if (route.id) setDetailId(route.id);
      setPage(route.page);
      setMobileOpen(false);
    };
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, []);

  const go = (next, id, replace = false) => {
    if (id) setDetailId(id);
    const hash = next === "detail" ? `#opportunity-${id}` : `#${next}`;
    const method = replace ? "replaceState" : "pushState";
    window.history[method]({ beacon: true, fromBeacon: !replace }, "", hash);
    setPage(next);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  const goBack = () =>
    window.history.state?.fromBeacon
      ? window.history.back()
      : go("discover", undefined, true);
  const toggleSaved = (id) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const toggleCompare = (id) =>
    setCompare((s) =>
      s.includes(id)
        ? s.filter((x) => x !== id)
        : s.length < 4
          ? [...s, id]
          : s,
    );
  const setCategory = (category) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      Category: category === "All opportunities" ? [] : [category],
    }));
    setCurrent(0);
  };
  const clearFilters = () => {
    setFilters(emptyFilters);
    setCurrent(0);
  };
  const actOnOpportunity = (kind, id) => {
    setActionHistory((h) => [
      ...h.slice(-9),
      { kind, id, current, saved, compare, reviewedIds },
    ]);
    if (kind === "save") setSaved((s) => (s.includes(id) ? s : [...s, id]));
    if (kind === "compare")
      setCompare((s) => (s.includes(id) ? s : s.length < 4 ? [...s, id] : s));
    setReviewedIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
  };
  const undoLastAction = () => {
    const last = actionHistory.at(-1);
    if (!last) return;
    setCurrent(last.current);
    setSaved(last.saved);
    setCompare(last.compare);
    setReviewedIds(last.reviewedIds);
    setActionHistory((h) => h.slice(0, -1));
  };
  const resetCurrentDeck = () => {
    const visibleIds = new Set(
      filteredOpportunities.map((opportunity) => opportunity.id),
    );
    setReviewedIds((ids) => ids.filter((id) => !visibleIds.has(id)));
    setCurrent(0);
    setActionHistory([]);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <Brand onClick={() => go("discover")} />
        <nav className={mobileOpen ? "mobile-open" : ""}>
          <button
            className={page === "discover" ? "active" : ""}
            onClick={() => go("discover")}
          >
            Opportunities
          </button>
          <button
            onClick={() => {
              setSearchOpen(true);
              setMobileOpen(false);
            }}
          >
            <Search size={17} /> Search
          </button>
          <button
            onClick={() => {
              setFiltersOpen(true);
              setMobileOpen(false);
            }}
          >
            <SlidersHorizontal size={17} /> Filters{" "}
            {activeFilterCount > 0 && (
              <span className="count">{activeFilterCount}</span>
            )}
          </button>
          <button
            className={page === "saved" ? "active" : ""}
            onClick={() => go("saved")}
          >
            Saved <span className="count">{saved.length}</span>
          </button>
        </nav>
      <button
        className="profile"
        aria-label="Open profile menu"
        aria-expanded={profileOpen}
        onClick={() => setProfileOpen((open) => !open)}
      >
        <span className="profile-avatar">GU</span>
        <b>Guest User</b>
        <ChevronDown size={14} />
      </button>
        <button
          className="menu-button"
          aria-label="Open navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu />
      </button>
      {profileOpen && (
        <div className="profile-menu">
          <div><b>Guest User</b><span>Guest profile</span></div>
          <button onClick={() => { setProfileOpen(false); go("saved"); }}>Saved opportunities <Bookmark /></button>
          <button onClick={() => { setProfileOpen(false); go("compare"); }}>Comparison shortlist <Columns3 /></button>
        </div>
      )}
    </header>

      {compare.length > 0 && page === "saved" && (
        <button className="compare-dock" onClick={() => go("compare")}>
          <Columns3 size={17} />
          <span>Compare shortlist</span>
          <b>{compare.length}</b>
          <ArrowRight size={16} />
        </button>
      )}

      {page === "discover" && (
        <Discovery
          item={
            deckOpportunities.length
              ? deckOpportunities[current % deckOpportunities.length]
              : null
          }
          matchCount={filteredOpportunities.length}
          remainingCount={deckOpportunities.length}
          saved={saved}
          compare={compare}
          lastAction={actionHistory.at(-1)}
          onAction={actOnOpportunity}
          onUndo={undoLastAction}
          onResetDeck={resetCurrentDeck}
          onView={(id) => go("detail", id)}
          onOpenCompare={() => go("compare")}
          onCategory={setCategory}
          activeCategory={activeCategory}
          activeFilterCount={activeFilterCount}
          onClearFilters={clearFilters}
        />
      )}
      {page === "detail" && (
        <Detail
          item={detailItem}
          saved={saved}
          onBack={goBack}
          onSave={toggleSaved}
          onCompare={toggleCompare}
          onView={(id) => go("detail", id)}
        />
      )}
      {page === "saved" && (
        <SavedPage
          items={saved
            .map((id) => opportunities.find((o) => o.id === id))
            .filter(Boolean)}
          compare={compare}
          statuses={statuses}
          setStatuses={setStatuses}
          notes={notes}
          setNotes={setNotes}
          onView={(id) => go("detail", id)}
          onCompare={toggleCompare}
          onUnsave={toggleSaved}
          onBrowse={() => go("discover")}
        />
      )}
      {page === "compare" && (
        <ComparePage
          items={opportunities.filter((o) => compare.includes(o.id))}
          onRemove={toggleCompare}
          onBack={() => go("discover")}
          onView={(id) => go("detail", id)}
        />
      )}

      {searchOpen && (
        <SearchOverlay
          query={query}
          setQuery={setQuery}
          results={visible}
          onClose={() => setSearchOpen(false)}
          onBrowseAll={() => {
            setQuery("");
            clearFilters();
            setSearchOpen(false);
            go("discover");
          }}
          onView={(id) => {
            setSearchOpen(false);
            go("detail", id);
          }}
        />
      )}
      {filtersOpen && (
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          resultCount={filteredOpportunities.length}
          onClear={clearFilters}
          onClose={() => setFiltersOpen(false)}
        />
      )}
    </div>
  );
}

function Discovery({
  item,
  matchCount,
  remainingCount,
  saved,
  compare,
  lastAction,
  onAction,
  onUndo,
  onResetDeck,
  onView,
  onOpenCompare,
  onCategory,
  activeCategory,
  activeFilterCount,
  onClearFilters,
}) {
  const start = useRef(null);
  const [drag, setDrag] = useState({
    x: 0,
    y: 0,
    active: false,
    exiting: false,
  });
  const commit = (kind) => {
    if (drag.exiting) return;
    const target =
      kind === "pass"
        ? { x: -620, y: 30 }
        : kind === "save"
          ? { x: 620, y: 30 }
          : { x: 0, y: -620 };
    setDrag({ ...target, active: false, exiting: true });
    window.setTimeout(() => {
      onAction(kind, item.id);
      setDrag({ x: 0, y: 0, active: false, exiting: false });
    }, 230);
  };
  const onPointerDown = (e) => {
    if (e.target.closest("button")) return;
    start.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDrag((d) => ({ ...d, active: true, exiting: false }));
  };
  const onPointerMove = (e) => {
    if (!start.current || !drag.active) return;
    const x = e.clientX - start.current.x;
    const y = e.clientY - start.current.y;
    setDrag((d) => ({ ...d, x: x * 0.82, y: Math.min(20, y * 0.72) }));
  };
  const onPointerUp = (e) => {
    if (!start.current) return;
    const x = e.clientX - start.current.x;
    const y = e.clientY - start.current.y;
    start.current = null;
    if (x < -115 && Math.abs(x) > Math.abs(y) * 1.25) commit("pass");
    else if (x > 115 && Math.abs(x) > Math.abs(y) * 1.25) commit("save");
    else if (y < -95 && Math.abs(y) > Math.abs(x) * 1.2) commit("compare");
    else setDrag({ x: 0, y: 0, active: false, exiting: false });
  };
  useEffect(() => {
    const handleKeys = (e) => {
      if (
        !item ||
        e.repeat ||
        e.target.matches("input, textarea, select, button, a")
      )
        return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        commit("pass");
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        commit("save");
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        commit("compare");
      }
      if (e.key.toLowerCase() === "z" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onUndo();
      }
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  });
  const sections = [
    [
      "Closing Soon",
      "The deadlines worth acting on now.",
      opportunities.slice(0, 3),
    ],
    [
      "Paid Opportunities",
      "Strong experiences that compensate your time.",
      [opportunities[1], opportunities[4], opportunities[3]],
    ],
    [
      "High-Impact Opportunities",
      "Selective programs with meaningful scope.",
      [opportunities[4], opportunities[0], opportunities[1]],
    ],
    [
      "Recently Added",
      "Freshly verified by the Beacon team.",
      opportunities.slice(2, 5),
    ],
  ];
  return (
    <main className="discovery-page">
      <section className="masthead">
        <div>
          <p className="eyebrow">OPPORTUNITY DISCOVERY</p>
          <h1>
            A sharper way to find
            <br />
            your next move.
          </h1>
        </div>
        <p className="mast-copy">
          Five fresh, verified picks. Swipe to triage quickly, then go deep when
          something earns your attention.
        </p>
      </section>

      <div className="category-strip">
        {[
          "All opportunities",
          "Internship",
          "Competition",
          "Research",
          "Summer Program",
        ].map((c) => (
          <button
            key={c}
            className={activeCategory === c ? "active" : ""}
            onClick={() => onCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <section className="featured-block">
        <div className="swipe-status">
          <div className="section-kicker">
            <span>01</span> Today’s curated deck
          </div>
          <div className="deck-progress">
            <span>
              {remainingCount === 0 && matchCount > 0 ? (
                <>
                  <b>Deck complete</b> · reviewed today
                </>
              ) : (
                <>
                  <b>{remainingCount}</b> new opportunities remaining
                </>
              )}
            </span>
            <div>
              <i
                style={{
                  width: `${matchCount ? ((matchCount - remainingCount) / matchCount) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
          {compare.length > 0 && (
            <button className="shortlist-action" onClick={onOpenCompare}>
              <Columns3 /> {compare.length} shortlisted
            </button>
          )}
          <button
            className="undo-action"
            onClick={onUndo}
            disabled={!lastAction}
          >
            <RotateCcw /> Undo{lastAction ? ` ${lastAction.kind}` : ""}
          </button>
        </div>
        {!item && matchCount === 0 ? (
          <div className="empty-state deck-empty">
            <SlidersHorizontal />
            <h2>No opportunities match</h2>
            <p>
              Your filters are working, but this combination is too narrow.
              Clear them to return to the full deck.
            </p>
            <button className="primary-action" onClick={onClearFilters}>
              Clear {activeFilterCount}{" "}
              {activeFilterCount === 1 ? "filter" : "filters"}
            </button>
          </div>
        ) : !item ? (
          <div className="empty-state deck-empty">
            <Check />
            <h2>You’ve reviewed today’s deck</h2>
            <p>
              Your saves and comparison shortlist are ready. You can revisit
              this deck without losing either.
            </p>
            <button className="primary-action" onClick={onResetDeck}>
              Review again <RotateCcw />
            </button>
          </div>
        ) : (
          <>
            <div className="deck-stage">
              <div className="deck-sheet deck-sheet-two" aria-hidden="true" />
              <div className="deck-sheet deck-sheet-one" aria-hidden="true" />
              <div
                key={item.id}
                className={`hero-card swipe-card ${drag.active ? "is-dragging" : ""} ${drag.exiting ? "is-exiting" : ""}`}
                style={{
                  transform: `translate3d(${drag.x}px, ${drag.y}px, 0) rotate(${drag.x / 55}deg)`,
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                aria-label={`${item.title} by ${item.org}. Swipe left to pass, right to save, or up to compare.`}
              >
                <div
                  className={`swipe-cue cue-pass ${drag.x < -38 ? "visible" : ""}`}
                >
                  <ArrowLeft /> PASS
                </div>
                <div
                  className={`swipe-cue cue-save ${drag.x > 38 ? "visible" : ""}`}
                >
                  <Bookmark /> SAVE
                </div>
                <div
                  className={`swipe-cue cue-compare ${drag.y < -30 ? "visible" : ""}`}
                >
                  <Columns3 /> COMPARE
                </div>
                <div className="hero-image">
                  <img
                    src={item.image}
                    alt="Students working together on a professional project"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div className="image-label">
                    <Sparkles size={14} /> BEACON FEATURED
                  </div>
                </div>
                <div className="hero-content">
                  <div className="org-row">
                    <OrgLogo item={item} />
                    <div>
                      <span>{item.org}</span>
                      <small>Verified organization</small>
                    </div>
                  </div>
                  <p className="category">
                    {item.category} · {item.paid}
                  </p>
                  <h2>{item.title}</h2>
                  <p className="description">{item.blurb}</p>
                  <div className="facts-grid">
                    <div>
                      <MapPin />
                      <span>
                        LOCATION<b>{item.location}</b>
                      </span>
                    </div>
                    <div>
                      <GraduationCap />
                      <span>
                        ELIGIBILITY<b>Grades {item.grades}</b>
                      </span>
                    </div>
                    <div>
                      <CalendarDays />
                      <span>
                        DEADLINE<b>{item.deadline}</b>
                      </span>
                    </div>
                    <div>
                      <Clock3 />
                      <span>
                        COMMITMENT<b>{item.time}</b>
                      </span>
                    </div>
                  </div>
                  <div className="beacon-note">
                    <span>B</span>
                    <p>
                      <b>Why we picked this</b>
                      {item.why}
                    </p>
                  </div>
                  <div className="hero-actions">
                    <button
                      className="text-action"
                      onClick={() => commit("pass")}
                    >
                      <X /> Pass
                    </button>
                    <button
                      className={
                        saved.includes(item.id)
                          ? "text-action selected"
                          : "text-action"
                      }
                      onClick={() => commit("save")}
                    >
                      {saved.includes(item.id) ? (
                        <BookmarkCheck />
                      ) : (
                        <Bookmark />
                      )}{" "}
                      {saved.includes(item.id) ? "Saved" : "Save"}
                    </button>
                    <button
                      className={
                        compare.includes(item.id)
                          ? "text-action selected"
                          : "text-action"
                      }
                      onClick={() => commit("compare")}
                    >
                      <Columns3 />{" "}
                      {compare.includes(item.id) ? "Shortlisted" : "Compare"}
                    </button>
                    <button
                      className="primary-action"
                      onClick={() => onView(item.id)}
                    >
                      View opportunity <ArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="gesture-guide"
              aria-label="Swipe and keyboard controls"
            >
              <span>
                <ArrowLeft /> Swipe left <b>Pass</b>
              </span>
              <span>
                <ArrowRight /> Swipe right <b>Save</b>
              </span>
              <span>
                <ArrowUp /> Swipe up <b>Compare</b>
              </span>
              <small>{item.added} · Arrow keys also work</small>
            </div>
          </>
        )}
      </section>

      <section className="signal-band">
        <p>THE BEACON STANDARD</p>
        <div>
          <strong>500+</strong>
          <span>Programs reviewed</span>
        </div>
        <div>
          <strong>86</strong>
          <span>Open now</span>
        </div>
        <div>
          <strong>72h</strong>
          <span>Verification cycle</span>
        </div>
        <p className="quote">
          “No filler. Just opportunities we’d send to a serious student.”
        </p>
      </section>

      {sections.map((section, i) => (
        <OpportunitySection
          key={section[0]}
          number={i + 2}
          title={section[0]}
          subtitle={section[1]}
          items={section[2]}
          onView={onView}
        />
      ))}
    </main>
  );
}

function OpportunitySection({ number, title, subtitle, items, onView }) {
  return (
    <section className="opportunity-section">
      <div className="section-heading">
        <div>
          <span>{String(number).padStart(2, "0")}</span>
          <div>
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="opportunity-grid">
        {items.map((item, index) => (
          <article
            className="opportunity-row"
            key={item.id}
            role="button"
            tabIndex="0"
            aria-label={`View ${item.title}`}
            onClick={() => onView(item.id)}
            onKeyDown={(event) =>
              (event.key === "Enter" || event.key === " ") && onView(item.id)
            }
          >
            <div className="thumb">
              <img src={item.image} alt="" loading="lazy" decoding="async" />
              <span>{index + 1}</span>
            </div>
            <div className="row-main">
              <p>
                {item.category} · {item.paid}
              </p>
              <h4>{item.title}</h4>
              <span>{item.org}</span>
            </div>
            <div className="row-data">
              <small>DEADLINE</small>
              <b>{item.deadline}</b>
            </div>
            <div className="row-data optional">
              <small>ELIGIBILITY</small>
              <b>Grades {item.grades}</b>
            </div>
            <span className="row-arrow" aria-hidden="true">
              <ArrowRight />
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Detail({ item, saved, onBack, onSave, onCompare, onView }) {
  return (
    <main className="detail-page">
      <button className="back-link" onClick={onBack}>
        <ArrowLeft /> Back to opportunities
      </button>
      <section className="detail-hero">
        <img src={item.image} alt="Students participating in the program" />
        <div className="detail-title">
          <div className="org-row">
            <OrgLogo item={item} large />
            <span>
              {item.org}
              <small>Verified organization</small>
            </span>
          </div>
          <p className="eyebrow">
            {item.category} · {item.impact}
          </p>
          <h1>{item.title}</h1>
          <p>{item.blurb}</p>
          <div className="detail-actions">
            <a
              className="primary-action"
              href={item.applyUrl}
              target="_blank"
              rel="noreferrer"
            >
              Apply on organization site <ExternalLink />
            </a>
            <button
              aria-label={
                saved.includes(item.id)
                  ? "Remove from saved opportunities"
                  : "Save opportunity"
              }
              onClick={() => onSave(item.id)}
            >
              {saved.includes(item.id) ? <BookmarkCheck /> : <Bookmark />}
            </button>
            <button
              aria-label="Add to comparison"
              onClick={() => onCompare(item.id)}
            >
              <Columns3 />
            </button>
          </div>
        </div>
      </section>
      <section className="detail-layout">
        <aside className="quick-facts">
          <h3>At a glance</h3>
          {[
            ["Deadline", item.deadlineLong],
            ["Compensation", item.paid],
            ["Location", item.location],
            ["Eligibility", `Grades ${item.grades}`],
            ["Duration", item.duration],
            ["Time commitment", item.time],
            ["Application", item.difficulty],
          ].map(([k, v]) => (
            <div key={k}>
              <small>{k}</small>
              <b>{v}</b>
            </div>
          ))}
        </aside>
        <div className="detail-copy">
          <section>
            <p className="eyebrow">OVERVIEW</p>
            <h2>A serious test of how you think.</h2>
            <p>
              This program gives students a structured way to move beyond
              classroom concepts and apply judgment in a demanding,
              collaborative setting. Participants work toward a clear final
              output, receive feedback from experienced mentors, and build a
              practical understanding of the field.
            </p>
            <p>
              The strongest applicants show curiosity, follow-through, and the
              ability to explain their thinking. Prior experience helps, but it
              matters less than evidence that you have taken initiative.
            </p>
          </section>
          <section className="recommendation">
            <span>BEACON VIEW</span>
            <h3>Why we recommend it</h3>
            <p>{item.why}</p>
            <div>
              <Check /> Substantive work <Check /> Credible mentors <Check />{" "}
              Clear student output
            </div>
          </section>
          <section>
            <p className="eyebrow">ELIGIBILITY</p>
            <h2>Who should apply</h2>
            <ul>
              <li>Students currently in grades {item.grades}</li>
              <li>
                Available for the full {item.duration.toLowerCase()} program
                period
              </li>
              <li>Comfortable working independently and in a team</li>
              <li>
                Demonstrated interest in finance, business, economics, or
                research
              </li>
            </ul>
          </section>
          <section>
            <p className="eyebrow">APPLICATION REQUIREMENTS</p>
            <h2>What you’ll need</h2>
            <ol>
              <li>
                <span>01</span>Short application and activity list
              </li>
              <li>
                <span>02</span>Two written responses
              </li>
              <li>
                <span>03</span>One teacher or mentor recommendation
              </li>
              <li>
                <span>04</span>Team information, where applicable
              </li>
            </ol>
          </section>
          <section className="source-row">
            <div>
              <small>ORIGINAL SOURCE</small>
              <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                Official program page <ExternalLink />
              </a>
            </div>
            <div>
              <small>LAST VERIFIED</small>
              <b>September 24, 2026</b>
            </div>
            <a
              className="report-link"
              href={`mailto:opportunities@beaconfinance.org?subject=${encodeURIComponent(`Outdated opportunity: ${item.title}`)}`}
            >
              Report outdated information
            </a>
          </section>
        </div>
      </section>
      <OpportunitySection
        number={3}
        title="Similar opportunities"
        subtitle="More programs worth a closer look."
        items={opportunities.filter((o) => o.id !== item.id).slice(0, 3)}
        onView={onView}
      />
    </main>
  );
}

function SavedPage({
  items,
  compare,
  statuses,
  setStatuses,
  notes,
  setNotes,
  onView,
  onCompare,
  onUnsave,
  onBrowse,
}) {
  const [sort, setSort] = useState("Deadline");
  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sort === "Organization") return a.org.localeCompare(b.org);
        if (sort === "Recently saved")
          return items.indexOf(b) - items.indexOf(a);
        return new Date(a.deadlineDate) - new Date(b.deadlineDate);
      }),
    [items, sort],
  );
  return (
    <main className="saved-page">
      <section className="page-intro">
        <p className="eyebrow">YOUR SHORTLIST</p>
        <h1>Saved opportunities</h1>
        <p>
          Keep the good ones close. Track decisions, deadlines, and what needs
          to happen next.
        </p>
      </section>
      <div className="list-toolbar">
        <span>{items.length} opportunities</span>
        <label>
          Sort by{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option>Deadline</option>
            <option>Recently saved</option>
            <option>Organization</option>
          </select>
        </label>
      </div>
      {items.length === 0 ? (
        <div className="empty-state">
          <Bookmark />
          <h2>No saved opportunities yet</h2>
          <p>
            Save the opportunities worth a second look. They’ll stay here with
            your status and private notes.
          </p>
          <button className="primary-action" onClick={onBrowse}>
            Browse opportunities <ArrowRight />
          </button>
        </div>
      ) : (
        <div className="saved-list">
          {sortedItems.map((item) => (
            <article className="saved-item" key={item.id}>
              <img src={item.image} alt="" />
              <div className="saved-main">
                <p>
                  {item.category} · {item.org}
                </p>
                <button className="saved-title" onClick={() => onView(item.id)}>
                  {item.title}
                </button>
                <span>
                  <CalendarDays /> {item.deadlineLong} <MapPin />{" "}
                  {item.location}
                </span>
              </div>
              <div className="status-control">
                <small>STATUS</small>
                <select
                  value={statuses[item.id] || "Saved"}
                  onChange={(e) =>
                    setStatuses((s) => ({ ...s, [item.id]: e.target.value }))
                  }
                >
                  <option>Saved</option>
                  <option>Applying</option>
                  <option>Applied</option>
                  <option>Closed</option>
                </select>
              </div>
              <textarea
                aria-label={`Notes for ${item.title}`}
                value={notes[item.id] || ""}
                onChange={(e) =>
                  setNotes((n) => ({ ...n, [item.id]: e.target.value }))
                }
                placeholder="Add a private note…"
              />
              <div className="saved-actions">
                <button
                  className={
                    compare.includes(item.id)
                      ? "icon-button selected"
                      : "icon-button"
                  }
                  aria-label={
                    compare.includes(item.id)
                      ? "Remove from comparison"
                      : "Add to comparison"
                  }
                  onClick={() => onCompare(item.id)}
                >
                  <Columns3 />
                </button>
                <button
                  className="icon-button"
                  aria-label={`Remove ${item.title} from saved opportunities`}
                  onClick={() => onUnsave(item.id)}
                >
                  <BookmarkCheck />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

function ComparePage({ items, onRemove, onBack, onView }) {
  const fields = [
    ["Deadline", "deadlineLong"],
    ["Pay", "paid"],
    ["Time commitment", "time"],
    ["Eligibility", "grades"],
    ["Location", "location"],
    ["Duration", "duration"],
    ["Application difficulty", "difficulty"],
    ["Program type", "category"],
  ];
  return (
    <main className="compare-page">
      <button className="back-link" onClick={onBack}>
        <ArrowLeft /> Back to discovery
      </button>
      <section className="page-intro">
        <p className="eyebrow">DECISION TOOL</p>
        <h1>Compare your shortlist</h1>
        <p>
          Put the tradeoffs in one place. You can compare up to four
          opportunities.
        </p>
      </section>
      {items.length === 0 ? (
        <div className="empty-state">
          <Columns3 />
          <h2>No opportunities selected</h2>
          <p>
            Add opportunities from discovery or your saved list to compare
            deadlines, eligibility, time, and value.
          </p>
          <button className="primary-action" onClick={onBack}>
            Browse opportunities <ArrowRight />
          </button>
        </div>
      ) : (
        <div
          className="compare-scroll"
          role="region"
          aria-label="Opportunity comparison"
          tabIndex="0"
        >
          <div
            className="compare-table"
            style={{
              gridTemplateColumns: `180px repeat(${items.length}, minmax(220px, 1fr))`,
            }}
          >
            <div className="compare-header label-cell">OPPORTUNITY</div>
            {items.map((item) => (
              <div className="compare-header" key={item.id}>
                <button
                  aria-label={`Remove ${item.title} from comparison`}
                  onClick={() => onRemove(item.id)}
                >
                  <X />
                </button>
                <OrgLogo item={item} />
                <small>{item.org}</small>
                <h3>{item.title}</h3>
                <button className="view-link" onClick={() => onView(item.id)}>
                  View details <ArrowRight />
                </button>
              </div>
            ))}
            {fields.map(([label, key]) => (
              <React.Fragment key={key}>
                <div className="label-cell">{label}</div>
                {items.map((item) => (
                  <div className="value-cell" key={item.id}>
                    {key === "grades" ? "Grades " : ""}
                    {item[key]}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      {items.length > 0 && items.length < 4 && (
        <button className="add-compare" onClick={onBack}>
          + Add another opportunity
        </button>
      )}
    </main>
  );
}

function SearchOverlay({
  query,
  setQuery,
  results,
  onClose,
  onBrowseAll,
  onView,
}) {
  useEffect(() => {
    const closeOnEscape = (e) => e.key === "Escape" && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <div
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Search opportunities"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="search-modal">
        <div className="search-input">
          <Search />
          <input
            autoFocus={window.matchMedia("(min-width: 721px)").matches}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search opportunities"
            placeholder="Search programs, organizations, locations, or categories"
          />
          {query && (
            <button
              className="clear-search"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <X />
            </button>
          )}
          <button aria-label="Close search" onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="search-results">
          <p>
            {query
              ? `${results.length} ${results.length === 1 ? "RESULT" : "RESULTS"}`
              : "ALL OPPORTUNITIES"}
          </p>
          {results.slice(0, 5).map((item) => (
            <button key={item.id} onClick={() => onView(item.id)}>
              <OrgLogo item={item} />
              <span>
                <b>{item.title}</b>
                <small>
                  {item.org} · {item.category} · {item.location}
                </small>
              </span>
              <ArrowRight />
            </button>
          ))}
          {query && results.length === 0 && (
            <div className="search-empty">
              <h3>No matching opportunities</h3>
              <p>
                Try a shorter term, search by organization or location, or
                return to the full opportunity deck.
              </p>
              <div>
                <button onClick={() => setQuery("")}>Clear search</button>
                <button className="primary-action" onClick={onBrowseAll}>
                  View all opportunities
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterPanel({ filters, setFilters, resultCount, onClear, onClose }) {
  const groups = [
    ["Category", ["Internship", "Competition", "Research", "Summer Program"]],
    ["Grade level", ["9th", "10th", "11th", "12th"]],
    ["Compensation", ["Paid", "Unpaid", "Stipend / award"]],
    ["Format", ["Remote", "In person"]],
    ["Deadline", ["Next 7 days", "Next 30 days", "This semester"]],
    ["Time commitment", ["Under 5 hrs / week", "5–15 hrs / week", "Full time"]],
    ["Application type", ["Individual", "Team"]],
  ];
  const toggle = (group, option) =>
    setFilters((current) => ({
      ...current,
      [group]: current[group].includes(option)
        ? current[group].filter((value) => value !== option)
        : [...current[group], option],
    }));
  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);
  return (
    <div
      className="filter-overlay"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <aside
        className="filter-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Filter opportunities"
      >
        <header>
          <div>
            <p>REFINE RESULTS</p>
            <h2>Filters</h2>
          </div>
          <button aria-label="Close filters" onClick={onClose}>
            <X />
          </button>
        </header>
        <div className="filter-groups">
          {groups.map(([title, opts]) => (
            <fieldset key={title}>
              <legend>{title}</legend>
              {opts.map((opt) => (
                <label key={opt}>
                  <input
                    type="checkbox"
                    checked={filters[title].includes(opt)}
                    onChange={() => toggle(title, opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </fieldset>
          ))}
        </div>
        <footer>
          <button
            onClick={onClear}
            disabled={Object.values(filters).every(
              (values) => values.length === 0,
            )}
          >
            Clear all
          </button>
          <button className="primary-action" onClick={onClose}>
            Show {resultCount}{" "}
            {resultCount === 1 ? "opportunity" : "opportunities"}
          </button>
        </footer>
      </aside>
    </div>
  );
}

export default App;
