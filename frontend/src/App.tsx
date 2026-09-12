import { useState } from "react";
import {
  LayoutDashboard,
  Swords,
  UserRound,
  ShoppingBag,
  Settings,
  LogOut,
  Flame,
  Coins,
  Check,
  Plus,
  Brain,
  Dumbbell,
  Heart,
  Sparkles,
} from "lucide-react";
import "./App.css";

type Quest = {
  id: number;
  title: string;
  description: string;
  xp: number;
  gold: number;
  type: "Intellect" | "Strength" | "Vitality" | "Creativity";
  completed: boolean;
};

const initialQuests: Quest[] = [
  {
    id: 1,
    title: "Master React Components",
    description: "Complete one React development session",
    xp: 50,
    gold: 25,
    type: "Intellect",
    completed: false,
  },
  {
    id: 2,
    title: "Forge Your Strength",
    description: "Complete a 30 minute workout",
    xp: 40,
    gold: 20,
    type: "Strength",
    completed: false,
  },
  {
    id: 3,
    title: "Read & Reflect",
    description: "Read at least 20 pages of a book",
    xp: 30,
    gold: 15,
    type: "Intellect",
    completed: false,
  },
];

const attributeIcons = {
  Intellect: Brain,
  Strength: Dumbbell,
  Vitality: Heart,
  Creativity: Sparkles,
};

function App() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [quests, setQuests] = useState<Quest[]>(initialQuests);

  const [xp, setXp] = useState(820);
  const [gold, setGold] = useState(340);
  const [level, setLevel] = useState(8);

  const [showLevelUp, setShowLevelUp] = useState(false);

  const xpRequired = level * 125;

  const completeQuest = (id: number) => {
    const quest = quests.find((item) => item.id === id);

    if (!quest || quest.completed) {
      return;
    }

    const newTotalXP = xp + quest.xp;

    if (newTotalXP >= xpRequired) {
      setLevel((currentLevel) => currentLevel + 1);
      setXp(newTotalXP - xpRequired);
      setShowLevelUp(true);
    } else {
      setXp(newTotalXP);
    }

    setGold((currentGold) => currentGold + quest.gold);

    setQuests((currentQuests) =>
      currentQuests.map((currentQuest) =>
        currentQuest.id === id
          ? { ...currentQuest, completed: true }
          : currentQuest
      )
    );
  };

  return (
    <div className="app-shell">
      {/* SIDEBAR */}

      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <Swords size={24} />
          </div>

          <div>
            <h1>LIFE RPG</h1>
            <span>Forge Your Legend</span>
          </div>
        </div>

        <nav className="navigation" aria-label="Main navigation">
          {[
            {
              name: "Dashboard",
              icon: LayoutDashboard,
            },
            {
              name: "Quests",
              icon: Swords,
            },
            {
              name: "Character",
              icon: UserRound,
            },
            {
              name: "Shop",
              icon: ShoppingBag,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  activeNav === item.name ? "active" : ""
                }`}
                onClick={() => setActiveNav(item.name)}
                type="button"
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item" type="button">
            <Settings size={20} />
            <span>Settings</span>
          </button>

          <button className="nav-item logout" type="button">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}

      <main className="main-content">
        {/* TOP BAR */}

        <header className="topbar">
          <div>
            <p className="eyebrow">WELCOME BACK, ADVENTURER</p>
            <h2>Your journey continues.</h2>
          </div>

          <div className="topbar-stats">
            <div className="mini-stat">
              <Flame size={18} />
              <span>7 day streak</span>
            </div>

            <div className="mini-stat gold">
              <Coins size={18} />
              <span>{gold} Gold</span>
            </div>

            <div className="avatar">T</div>
          </div>
        </header>

        {/* HERO / XP */}

        <section className="hero-card">
          <div className="hero-glow"></div>

          <div className="hero-content">
            <div className="level-badge">
              LEVEL {String(level).padStart(2, "0")}
            </div>

            <h3>Keep forging your legend.</h3>

            <p>
              Every quest completed makes the real-world you stronger.
            </p>

            <div className="xp-section">
              <div className="xp-label">
                <span>Experience</span>

                <strong>
                  {xp} / {xpRequired} XP
                </strong>
              </div>

              <div
                className="xp-track"
                role="progressbar"
                aria-valuenow={xp}
                aria-valuemin={0}
                aria-valuemax={xpRequired}
                aria-label="Experience progress"
              >
                <div
                  className="xp-fill"
                  style={{
                    width: `${Math.min(
                      (xp / xpRequired) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="hero-emblem" aria-hidden="true">
            <Swords size={72} strokeWidth={1.2} />
          </div>
        </section>

        {/* ATTRIBUTES */}

        <section className="section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CHARACTER</p>
              <h3>Your Attributes</h3>
            </div>

            <button className="view-button" type="button">
              View Character
            </button>
          </div>

          <div className="attribute-grid">
            {[
              {
                name: "Intellect",
                value: 82,
              },
              {
                name: "Strength",
                value: 67,
              },
              {
                name: "Vitality",
                value: 74,
              },
              {
                name: "Creativity",
                value: 51,
              },
            ].map((attribute) => {
              const Icon =
                attributeIcons[
                  attribute.name as keyof typeof attributeIcons
                ];

              return (
                <div className="attribute-card" key={attribute.name}>
                  <div className="attribute-top">
                    <div className="attribute-icon">
                      <Icon size={20} />
                    </div>

                    <span>{attribute.name}</span>
                  </div>

                  <div className="attribute-value">
                    {attribute.value}
                  </div>

                  <div className="attribute-track">
                    <div
                      className="attribute-fill"
                      style={{
                        width: `${attribute.value}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* QUESTS */}

        <section className="section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">DAILY MISSIONS</p>
              <h3>Today's Quests</h3>
            </div>

            <button className="add-quest" type="button">
              <Plus size={17} />
              New Quest
            </button>
          </div>

          <div className="quest-list">
            {quests.map((quest) => (
              <div
                className={`quest-card ${
                  quest.completed ? "completed" : ""
                }`}
                key={quest.id}
              >
                <div className="quest-icon">
                  <Swords size={21} />
                </div>

                <div className="quest-info">
                  <h4>{quest.title}</h4>

                  <p>{quest.description}</p>

                  <div className="quest-meta">
                    <span className="xp-reward">
                      +{quest.xp} XP
                    </span>

                    <span className="gold-reward">
                      <Coins size={14} />
                      +{quest.gold}
                    </span>

                    <span className="attribute-tag">
                      {quest.type}
                    </span>
                  </div>
                </div>

                <button
                  className={`complete-button ${
                    quest.completed ? "done" : ""
                  }`}
                  disabled={quest.completed}
                  onClick={() => completeQuest(quest.id)}
                  type="button"
                >
                  {quest.completed ? (
                    <>
                      <Check size={18} />
                      Completed
                    </>
                  ) : (
                    "Complete"
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* STREAK */}

        <section className="streak-card">
          <div className="streak-icon">
            <Flame size={30} />
          </div>

          <div>
            <p className="eyebrow">CURRENT STREAK</p>

            <h3>7 Days of Momentum 🔥</h3>

            <p>
              Complete one quest today to keep your streak alive.
            </p>
          </div>

          <div className="streak-days">
            {["M", "T", "W", "T", "F", "S", "S"].map(
              (day, index) => (
                <div
                  className="streak-day active"
                  key={`${day}-${index}`}
                >
                  <span>{day}</span>
                  <div>✓</div>
                </div>
              )
            )}
          </div>
        </section>
      </main>

      {/* LEVEL UP MODAL */}

      {showLevelUp && (
        <div
          className="modal-overlay"
          onClick={() => setShowLevelUp(false)}
        >
          <div
            className="level-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="level-up-title"
          >
            <div className="level-icon">
              <Sparkles size={38} />
            </div>

            <p className="eyebrow">ACHIEVEMENT UNLOCKED</p>

            <h2 id="level-up-title">LEVEL UP!</h2>

            <p>
              Your dedication has made you stronger.
            </p>

            <button
              onClick={() => setShowLevelUp(false)}
              type="button"
            >
              Continue Journey
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;