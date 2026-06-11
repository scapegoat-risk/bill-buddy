import { useState } from "react";
import { Link } from "react-router-dom";

const NAV_ITEMS = ["home", "transaction", "add", "budget", "analytics"] as const;
type NavItem = (typeof NAV_ITEMS)[number];

const stats = [
  {
    label: "Total Balance",
    value: "€12,450",
    change: "+2.4%",
    positive: true,
    gradient: "from-brand-green to-emerald-600",
  },
  {
    label: "Income",
    value: "€5,240",
    change: "+8.1%",
    positive: true,
    gradient: "from-brand-blue to-blue-400",
  },
  {
    label: "Expenses",
    value: "€4,678",
    change: "+3.2%",
    positive: false,
    gradient: "from-brand-red to-rose-400",
  },
  {
    label: "Savings",
    value: "€562",
    change: "+12%",
    positive: true,
    gradient: "from-brand-yellow to-amber-400",
  },
];

const transactions = [
  {
    icon: "🛒",
    name: "Kaufland",
    category: "Groceries",
    date: "Today",
    amount: "-€67.45",
  },
  {
    icon: "☕",
    name: "Starbucks",
    category: "Restaurant",
    date: "Today",
    amount: "-€12.50",
  },
  {
    icon: "🚗",
    name: "Uber",
    category: "Transportation",
    date: "Today",
    amount: "-€18.75",
  },
  {
    icon: "📱",
    name: "Netflix",
    category: "Subscription",
    date: "Yesterday",
    amount: "-€15.99",
  },
];

const chartSegments = [
  { color: "#FB2C36", pct: "40%", label: "Food" },
  { color: "#2B7FFF", pct: "24%", label: "Housing" },
  { color: "#00C950", pct: "18%", label: "Transport" },
  { color: "#F0B100", pct: "12%", label: "Health" },
  { color: "#99A1AF", pct: "6%", label: "Other" },
];

export default function Index() {
  const [activeNav, setActiveNav] = useState<NavItem>("home");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Phone frame wrapper */}
      <div
        className="relative bg-white overflow-hidden flex flex-col"
        style={{
          width: "min(375px, 100vw)",
          height: "min(812px, 100svh)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          borderRadius: "clamp(0px, (100vw - 374px) * 9999, 40px)",
        }}
      >
        {/* Status Bar */}
        <StatusBar />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pb-20">
          {/* Header */}
          <Header />

          {/* Stats */}
          <StatsRow />

          {/* Spending Chart */}
          <div className="px-5 mt-7">
            <SpendingChart />
          </div>

          {/* Recent Transactions */}
          <div className="px-5 mt-9">
            <RecentTransactions />
          </div>
        </div>

        {/* Bottom Nav */}
        <BottomNav active={activeNav} onSelect={setActiveNav} />
      </div>
    </div>
  );
}

/* ─────────────────── Status Bar ─────────────────── */
function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1 shrink-0">
      <span
        style={{ fontFamily: "Inter, sans-serif" }}
        className="text-sm font-semibold text-black"
      >
        9:41
      </span>
      <div className="flex items-center gap-1.5">
        {/* Signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
          <rect x="0" y="6.5" width="3" height="4.5" rx="0.5" fill="black" />
          <rect x="4.5" y="4.5" width="3" height="6.5" rx="0.5" fill="black" />
          <rect x="9" y="2" width="3" height="9" rx="0.5" fill="black" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" fill="black" />
        </svg>
        {/* Wifi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <path
            d="M8 8.5C8.83 8.5 9.5 9.17 9.5 10S8.83 11.5 8 11.5 6.5 10.83 6.5 10 7.17 8.5 8 8.5Z"
            fill="black"
          />
          <path
            d="M8 5.5C9.65 5.5 11.14 6.18 12.22 7.26L13.64 5.84C12.18 4.38 10.19 3.5 8 3.5S3.82 4.38 2.36 5.84L3.78 7.26C4.86 6.18 6.35 5.5 8 5.5Z"
            fill="black"
          />
          <path
            d="M8 2C10.54 2 12.84 3.02 14.54 4.72L16 3.26C13.92 1.24 11.1 0 8 0S2.08 1.24 0 3.26L1.46 4.72C3.16 3.02 5.46 2 8 2Z"
            fill="black"
          />
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="21"
            height="11"
            rx="2.5"
            stroke="black"
            strokeOpacity="0.35"
          />
          <rect x="1.5" y="1.5" width="18" height="9" rx="1.5" fill="black" />
          <path
            d="M23 4v4c.83-.33 1.33-1.12 1.33-2S23.83 4.33 23 4Z"
            fill="black"
            fillOpacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────── Header ─────────────────── */
function Header() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-2 shrink-0">
      <h1
        style={{ fontFamily: "Inter, sans-serif" }}
        className="text-xl font-semibold text-black tracking-tight"
      >
        Welcome Back!
      </h1>
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/f1258c07d92f262d9d43ddd7dd0e80034c6e9805?width=112"
        alt="Profile"
        className="w-14 h-14 rounded-full object-cover shrink-0"
      />
    </div>
  );
}

/* ─────────────────── Stats Row ─────────────────── */
function StatsRow() {
  return (
    <div className="mt-2 px-4">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`shrink-0 w-36 rounded-2xl bg-gradient-to-br ${s.gradient} p-4 text-white`}
          >
            <p
              style={{ fontFamily: "Inter, sans-serif" }}
              className="text-xs font-medium opacity-85"
            >
              {s.label}
            </p>
            <p
              style={{ fontFamily: "Arimo, sans-serif" }}
              className="text-lg font-bold mt-1"
            >
              {s.value}
            </p>
            <span
              style={{ fontFamily: "Inter, sans-serif" }}
              className={`text-xs font-medium mt-1 inline-block px-1.5 py-0.5 rounded-full ${
                s.positive
                  ? "bg-white/20 text-white"
                  : "bg-white/20 text-white"
              }`}
            >
              {s.change} this month
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────── Spending Chart ─────────────────── */
function SpendingChart() {
  const [isDetailedView, setIsDetailedView] = useState(false);

  return (
    <div
      className="rounded-[10px] bg-white p-5 pt-5"
      style={{
        boxShadow:
          "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-3.5">
        <h3
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-sm font-semibold text-[#101828]"
        >
          Spending by Category
        </h3>
        <button
          onClick={() => setIsDetailedView(!isDetailedView)}
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-[10.5px] font-medium text-[#030213] bg-[#ECEEF2] hover:bg-[#DDD4DA] rounded-[6.75px] px-2 py-0.5 cursor-pointer transition-colors"
        >
          {isDetailedView ? "Donut View" : "Detailed View"}
        </button>
      </div>

      {/* Chart + legend or detailed breakdown */}
      {!isDetailedView ? (
        <div className="flex items-center gap-4">
          {/* SVG donut chart */}
          <div className="shrink-0">
            <svg
              width="180"
              height="180"
              viewBox="0 0 215 215"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip-chart)">
                <path
                  d="M107.5 0C130.202 0 152.321 7.18691 170.687 20.5307C189.053 33.8744 202.723 52.69 209.739 74.2807C216.754 95.8713 216.754 119.129 209.739 140.719C202.723 162.31 189.053 181.126 170.687 194.469L159.673 179.31C174.837 168.292 186.125 152.756 191.917 134.929C197.71 117.102 197.71 97.8983 191.917 80.0712C186.125 62.244 174.837 46.7082 159.673 35.6905C144.508 24.6727 126.245 18.7385 107.5 18.7385V0Z"
                  fill="#FB2C36"
                  stroke="white"
                />
                <path
                  d="M170.687 194.469C148.567 210.541 121.153 217.579 94.0267 214.152C66.9 210.725 42.0985 197.091 24.6698 176.023L39.1081 164.079C53.4987 181.474 73.9771 192.732 96.3752 195.562C118.773 198.391 141.408 192.579 159.673 179.31L170.687 194.469Z"
                  fill="#2B7FFF"
                  stroke="white"
                />
                <path
                  d="M24.6698 176.023C11.6668 160.305 3.40439 141.212 0.847672 120.973C-1.70905 100.735 1.54547 80.1866 10.2311 61.7287L27.1862 69.7072C20.0146 84.9476 17.3274 101.914 19.4384 118.625C21.5495 135.335 28.3717 151.101 39.1081 164.079L24.6698 176.023Z"
                  fill="#00C950"
                  stroke="white"
                />
                <path
                  d="M10.2311 61.7287C21.8729 36.9887 42.5044 17.6144 67.9266 7.54901L74.8247 24.9717C53.8339 33.2825 36.7987 49.2796 27.1862 69.7072L10.2311 61.7287Z"
                  fill="#F0B100"
                  stroke="white"
                />
                <path
                  d="M67.9266 7.54903C80.5241 2.56131 93.951 0 107.5 0V18.7385C96.3128 18.7385 85.2264 20.8534 74.8247 24.9717L67.9266 7.54903Z"
                  fill="#99A1AF"
                  stroke="white"
                />
                <text
                  fill="black"
                  style={{ whiteSpace: "pre" }}
                  fontFamily="Inter"
                  fontSize="26"
                  fontWeight="600"
                  letterSpacing="-0.02em"
                >
                  <tspan x="57" y="118">
                    €4,678
                  </tspan>
                </text>
              </g>
              <defs>
                <clipPath id="clip-chart">
                  <rect width="215" height="215" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-4 justify-center">
            {chartSegments.map((seg) => (
              <div key={seg.color} className="flex items-center gap-2.5">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: seg.color }}
                />
                <div className="flex flex-col">
                  <span
                    style={{ fontFamily: "Inter, sans-serif" }}
                    className="text-[12px] font-medium text-[#364153] leading-none"
                  >
                    {seg.pct}
                  </span>
                  <span
                    style={{ fontFamily: "Inter, sans-serif" }}
                    className="text-[10px] text-[#6A7282] leading-none mt-0.5"
                  >
                    {seg.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {chartSegments.map((seg) => (
            <div key={seg.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ background: seg.color }}
                />
                <span
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className="text-[13px] font-medium text-[#364153]"
                >
                  {seg.label}
                </span>
              </div>
              <span
                style={{ fontFamily: "Inter, sans-serif" }}
                className="text-[13px] font-semibold text-[#101828]"
              >
                {seg.pct}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────── Recent Transactions ─────────────────── */
function RecentTransactions() {
  return (
    <div className="flex flex-col gap-3">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2
          style={{ fontFamily: "Arimo, sans-serif" }}
          className="text-sm font-bold text-[#101828]"
        >
          Recent Transactions
        </h2>
        <button
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-[12px] font-medium text-brand-green"
        >
          View All
        </button>
      </div>

      {/* Transaction items */}
      <div className="flex flex-col gap-2.5">
        {transactions.map((tx) => (
          <TransactionRow key={tx.name + tx.date} tx={tx} />
        ))}
      </div>
    </div>
  );
}

function TransactionRow({
  tx,
}: {
  tx: (typeof transactions)[number];
}) {
  return (
    <div className="flex items-center gap-3.5 bg-[#F9FAFB] rounded-[12.75px] px-2.5 py-2.5">
      {/* Icon */}
      <div
        className="w-9 h-9 rounded-[12.75px] bg-white flex items-center justify-center shrink-0"
        style={{
          boxShadow:
            "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.1)",
        }}
      >
        <span className="text-base leading-none">{tx.icon}</span>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-[12px] font-medium text-[#101828] leading-snug"
        >
          {tx.name}
        </span>
        <div className="flex items-center gap-1.5">
          <span
            style={{ fontFamily: "Inter, sans-serif" }}
            className="text-[10px] font-medium text-[#0A0A0A] border border-black/10 rounded-[6.75px] px-2 py-0.5 leading-tight"
          >
            {tx.category}
          </span>
          <span
            style={{ fontFamily: "Inter, sans-serif" }}
            className="text-[10px] font-normal text-[#6A7282]"
          >
            {tx.date}
          </span>
        </div>
      </div>

      {/* Amount */}
      <span
        style={{ fontFamily: "Arimo, sans-serif" }}
        className="text-sm font-bold text-[#101828] shrink-0"
      >
        {tx.amount}
      </span>
    </div>
  );
}

/* ─────────────────── Bottom Navigation ─────────────────── */
function BottomNav({
  active,
  onSelect,
}: {
  active: NavItem;
  onSelect: (v: NavItem) => void;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[79px] shrink-0">
      {/* curved bg */}
      <svg
        viewBox="0 0 375 79"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M188 55C207.882 55 224 38.8823 224 19C224 17.0988 223.853 15.2321 223.569 13.4105C222.602 7.20823 226.711 0 232.988 0H367C371.418 0 375 3.58172 375 8V79H0V8C0 3.58172 3.58172 0 8 0H143.012C149.289 0 153.398 7.20824 152.431 13.4105C152.147 15.2321 152 17.0988 152 19C152 38.8823 168.118 55 188 55Z"
          fill="#FCFCFC"
        />
        <filter id="nav-shadow">
          <feDropShadow
            dx="0"
            dy="-2"
            stdDeviation="3"
            floodOpacity="0.08"
          />
        </filter>
      </svg>

      {/* Nav items */}
      <div className="relative z-10 h-full flex items-end pb-3 px-6">
        <div className="flex w-full items-end justify-between">
          {/* Home */}
          <NavButton
            active={active === "home"}
            label="Home"
            onClick={() => onSelect("home")}
            icon={
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M27.67 13.56L25.67 11.74L18 4.78001C17.45 4.28806 16.7379 4.01608 16 4.01608C15.2621 4.01608 14.55 4.28806 14 4.78001L6.35 11.78L4.35 13.6C4.21533 13.7367 4.12281 13.9092 4.08348 14.097C4.04415 14.2847 4.05967 14.4799 4.12819 14.6591C4.19671 14.8383 4.31534 14.994 4.46992 15.1077C4.6245 15.2213 4.80851 15.2881 5 15.3C5.25329 15.2886 5.49278 15.1813 5.67 15L6 14.7V25C6 25.7957 6.31607 26.5587 6.87868 27.1213C7.44129 27.6839 8.20435 28 9 28H23C23.7957 28 24.5587 27.6839 25.1213 27.1213C25.6839 26.5587 26 25.7957 26 25V14.74L26.33 15.04C26.5134 15.2067 26.7522 15.2994 27 15.3C27.2016 15.2995 27.3984 15.238 27.5645 15.1237C27.7305 15.0094 27.8582 14.8475 27.9306 14.6594C28.0031 14.4712 28.0169 14.2655 27.9704 14.0694C27.9239 13.8732 27.8192 13.6956 27.67 13.56Z"
                  fill={active === "home" ? "#1E5128" : "#C6C6C6"}
                />
              </svg>
            }
          />

          {/* Transaction */}
          <NavButton
            active={active === "transaction"}
            label="Transaction"
            onClick={() => onSelect("transaction")}
            icon={
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M20.13 17.93V18.93C20.13 19.5866 20.0007 20.2368 19.7494 20.8434C19.4981 21.45 19.1298 22.0012 18.6655 22.4655C18.2013 22.9298 17.6501 23.2981 17.0434 23.5494C16.4368 23.8007 15.7866 23.93 15.13 23.93H11.87C11.8546 24.4769 11.6899 25.0091 11.3938 25.4692C11.0977 25.9292 10.6814 26.2995 10.19 26.54C9.78018 26.7448 9.32816 26.8509 8.87001 26.85C8.19228 26.854 7.53316 26.6284 7.00001 26.21L3.29001 23.3C2.92868 23.0196 2.63625 22.6602 2.43508 22.2495C2.23392 21.8387 2.12933 21.3874 2.12933 20.93C2.12933 20.4726 2.23392 20.0213 2.43508 19.6105C2.63625 19.1998 2.92868 18.8404 3.29001 18.56L7.00001 15.65C7.44701 15.2933 7.98666 15.0717 8.55539 15.0115C9.12411 14.9512 9.6982 15.0548 10.21 15.31C10.8915 15.636 11.4164 16.2184 11.67 16.93H19.1C19.2338 16.926 19.3671 16.9489 19.4919 16.9973C19.6167 17.0458 19.7305 17.1188 19.8266 17.2121C19.9227 17.3053 19.999 17.4169 20.0511 17.5403C20.1032 17.6636 20.1301 17.7961 20.13 17.93Z"
                  fill={active === "transaction" ? "#1E5128" : "#C6C6C6"}
                />
                <path
                  d="M29.87 11.07C29.8701 11.5273 29.7656 11.9786 29.5646 12.3894C29.3635 12.8002 29.0712 13.1595 28.71 13.44L25 16.35C24.4594 16.7701 23.7946 16.9987 23.11 17C22.6519 17.0009 22.1999 16.8948 21.79 16.69C21.1085 16.364 20.5836 15.7817 20.33 15.07H12.87C12.6048 15.07 12.3505 14.9647 12.1629 14.7771C11.9754 14.5896 11.87 14.3352 11.87 14.07V13.07C11.87 11.7439 12.3968 10.4722 13.3345 9.53448C14.2722 8.5968 15.5439 8.07001 16.87 8.07001H20.13C20.1422 7.51096 20.3104 6.96644 20.6156 6.4979C20.9208 6.02935 21.3509 5.65543 21.8573 5.41834C22.3637 5.18124 22.9263 5.0904 23.4817 5.15608C24.037 5.22175 24.5629 5.44132 25 5.79001L28.71 8.70001C29.0712 8.98051 29.3635 9.33987 29.5646 9.75063C29.7656 10.1614 29.8701 10.6127 29.87 11.07Z"
                  fill={active === "transaction" ? "#1E5128" : "#C6C6C6"}
                />
              </svg>
            }
          />

          {/* Add button (center) */}
          <div className="flex flex-col items-center" style={{ marginTop: -28 }}>
            <button
              onClick={() => onSelect("add")}
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "#1E5128" }}
              aria-label="Add transaction"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="#FCFCFC"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Budget */}
          <NavButton
            active={active === "budget"}
            label="Budget"
            onClick={() => onSelect("budget")}
            icon={
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M28 15H17V4C19.8412 4.22837 22.5083 5.46063 24.5239 7.47614C26.5394 9.49166 27.7716 12.1588 28 15Z"
                  fill={active === "budget" ? "#1E5128" : "#C6C6C6"}
                />
                <path
                  d="M28 17C27.801 19.2756 26.9566 21.4471 25.566 23.2594C24.1754 25.0716 22.2965 26.4493 20.15 27.2306C18.0035 28.0119 15.6786 28.1643 13.4484 27.6699C11.2183 27.1755 9.1756 26.0549 7.56038 24.4396C5.94515 22.8244 4.82449 20.7817 4.33009 18.5516C3.83569 16.3214 3.98809 13.9965 4.76938 11.85C5.55067 9.7035 6.92839 7.82457 8.74065 6.43401C10.5529 5.04346 12.7244 4.19905 15 4V16C15 16.2652 15.1054 16.5196 15.2929 16.7071C15.4804 16.8946 15.7348 17 16 17H28Z"
                  fill={active === "budget" ? "#1E5128" : "#C6C6C6"}
                />
              </svg>
            }
          />

          {/* Analytics */}
          <NavButton
            active={active === "analytics"}
            label="Analytics"
            onClick={() => onSelect("analytics")}
            icon={
              <svg
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
              >
                <path
                  d="M1.6875 18.5625C1.6875 18.1149 1.86529 17.6857 2.18176 17.3693C2.49822 17.0528 2.92745 16.875 3.375 16.875H6.75C7.19755 16.875 7.62677 17.0528 7.94324 17.3693C8.25971 17.6857 8.4375 18.1149 8.4375 18.5625V23.625C8.4375 24.0726 8.25971 24.5018 7.94324 24.8182C7.62677 25.1347 7.19755 25.3125 6.75 25.3125H3.375C2.92745 25.3125 2.49822 25.1347 2.18176 24.8182C1.86529 24.5018 1.6875 24.0726 1.6875 23.625V18.5625ZM10.125 11.8125C10.125 11.3649 10.3028 10.9357 10.6193 10.6193C10.9357 10.3028 11.3649 10.125 11.8125 10.125H15.1875C15.6351 10.125 16.0643 10.3028 16.3807 10.6193C16.6972 10.9357 16.875 11.3649 16.875 11.8125V23.625C16.875 24.0726 16.6972 24.5018 16.3807 24.8182C16.0643 25.1347 15.6351 25.3125 15.1875 25.3125H11.8125C11.3649 25.3125 10.9357 25.1347 10.6193 24.8182C10.3028 24.5018 10.125 24.0726 10.125 23.625V11.8125ZM18.5625 3.375C18.5625 2.92745 18.7403 2.49822 19.0568 2.18176C19.3732 1.86529 19.8024 1.6875 20.25 1.6875H23.625C24.0726 1.6875 24.5018 1.86529 24.8182 2.18176C25.1347 2.49822 25.3125 2.92745 25.3125 3.375V23.625C25.3125 24.0726 25.1347 24.5018 24.8182 24.8182C24.5018 25.1347 24.0726 25.3125 23.625 25.3125H20.25C19.8024 25.3125 19.3732 25.1347 19.0568 24.8182C18.7403 24.5018 18.5625 24.0726 18.5625 23.625V3.375Z"
                  fill={active === "analytics" ? "#1E5128" : "#C6C6C6"}
                />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}

function NavButton({
  active,
  label,
  icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-0.5 min-w-[40px]"
    >
      {icon}
      <span
        style={{ fontFamily: "Inter, sans-serif", color: active ? "#1E5128" : "#C6C6C6" }}
        className="text-[10px] font-medium"
      >
        {label}
      </span>
    </button>
  );
}
