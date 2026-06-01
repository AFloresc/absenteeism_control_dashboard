# Corporate Sick Leave & Incident Analytics Dashboard

An executive, high-performance web dashboard for tracking, analyzing, and managing employee sick leave, clinical absence patterns, and workplace capacity loss. Built with **React 18**, **Material UI (MUI)**, **Recharts**, and **Tailwind CSS**, designed for medical case officers, HR managers, and leadership.

---

## 🎨 Design Philosophy & Aesthetics

The application is crafted with a high-contrast, sleek modern interface prioritizing spacious readability, visual hierarchy, and instant interactive feedback.

- **Double-Viewport Optimization**: Fully customized interfaces for both desktop tables (expandable workspace adjustment records) and mobile-responsive bento cards (touch-friendly sliders, collapse actions).
- **Executive Typography & Themes**: Inter mixed with JetBrains Mono for clinical IDs, timespans, and raw financial metrics, rendering comfortably in light and dark modes.
- **Micro-Animations**: Staggered transition fade-ins for dashboard analytics and dialog states using premium animations.
- **Robust Chart Elements**: Real-time rendering with Recharts featuring defensive mounting guards to secure dynamic component width calculations on complex window resized states.

---

## 🚀 Core Features & Capabilities

### 1. Executive Incident KPI Dashboard
- **Dynamic KPI Cards**: Tracks Cumulative Absence Days, Active Open Cases, Salary/Indirect Cost Impacts, and Average Healing Spans.
- **Real-Time Data Streams**: Multi-dimensional charting representing:
  - Absenteeism trends by **Company/Employer Entity**.
  - Internal resource usage by **Operating Department** (Sales, IT, HR, etc.).
  - Regional statistics on **Work Center Facilities**.
  - Chronic longitudinal patterns (Combined Incident Volume & Capacity/Days-Lost curves).
  - Pie-chart distribution of **Pathology Diagnoses** (Musculoskeletal, Respiratory, Mental Health, Cardiovascular) coupled with regulatory **Leave Classification Ranges**.

### 2. Multi-Faceted Filter Matrix
- Clean, searchable input targeting worker names, contacts, pathology classifications, or specific ID keys.
- Dropdown selectors to drill down data instantly based on Company, Department, work regional center, clinical pathology, and case status (Active vs. Closed).

### 3. Case Operations & Form Engines
- **Add & Edit Dialog**: Full-stack modal form with validation handling contact profiles, demographic elements, and clinical classifications.
- **Date Safety Computing**: Smart validation guaranteeing start-dates precede end-dates, with real-time automatic day-count estimates.
- **Interactive Progress Notes**: Allows case officers to enter workstations restrictions and specific clinical rehabilitation notes.

### 4. Patient-Centric Recurrence Analytics
- Deep-dive profiles grouping absences by individual employee names.
- Identifies and tags records with smart risk flags:
  - `Chronic Recurrency`: Flags employees with 2 or more separate leave incidents.
  - `Severe Lost Days`: Highlights cases surpassing 25 cumulative lost workdays.
- Interactive nested historical timelines showing past cases and officer notes for targeted workplace accommodation plans.

### 5. Automated PDF & Excel Document Generator
- Simulates professional reports for clinical safety coordinators.
- Generates high-fidelity structured summaries, pathology breakdowns, and detailed action lists exportable to Excel or formatted PDF sheets.

---

## 🛠️ Tech Stack & Directory Structure

```text
├── src/
│   ├── App.jsx               # Main application routing and core global state
│   ├── mockData.js           # Comprehensive pre-populated sick leave records
│   ├── utils.js              # Business logic helpers (KPI math, date conversions)
│   ├── index.css             # Root styles (Tailwind CSS configuration & Google Fonts imports)
│   ├── hooks/                # Custom React State & Logic Hooks
│   │   └── useSickLeaveForm.js # Form state validation, submission & formatting logic hook
│   └── components/           # UI sub-systems
│       ├── KPICharts.jsx     # Complex charting container (Bar, Line, Composed, Pies)
│       ├── KPICards.jsx      # Senior leadership metrics widgets - container
│       ├── KPICardItem.jsx   # Micro-component for single KPI statistics metrics card
│       ├── ExportDialog.jsx  # Excel & PDF report generation suite
│       ├── ExportDatasetScope.jsx # Modular control for export scope
│       ├── ExportExcelSection.jsx # Modular control for Excel workbook generation
│       ├── ExportPDFSection.jsx   # Modular control for corporate PDF rendering
│       ├── SickLeaveForm.jsx # Add & edit leave record workflow engine (delegating to hook)
│       ├── FormWorkerInfo.jsx # Modular form section: worker info & contact profile
│       ├── FormWorkplaceLogistics.jsx # Modular form section: employer & placements
│       ├── FormLeaveDetails.jsx # Modular form section: dates & clinical classifications
│       ├── SickLeaveTable.jsx# Centralized core table filter layout container
│       ├── SickLeaveFilters.jsx        # Advanced multi-select filtering widgets
│       ├── FilterDropdown.jsx          # Reusable customized select drop-down filter
│       ├── SickLeaveDesktopTable.jsx   # Column-rich layout with detailed expand drawers
│       ├── SickLeaveRow.jsx            # Detailed single patient leave row element
│       ├── SickLeaveRowExpanded.jsx    # Expanded clinical notes and contacts sub-drawer
│       ├── SickLeaveMobileList.jsx     # Responsive stack card interface for mobile users
│       ├── SickLeaveMobileItem.jsx     # Single touch-optimized mobile statistics card
│       ├── PersonStats.jsx             # Key Worker analytical search container
│       ├── PersonStatsDesktopTable.jsx # Recurrency tracking & profile history database
│       ├── PersonStatsRow.jsx          # Double-row element mapping employee recurrent profile card
│       ├── PersonStatsRowExpanded.jsx  # Expanded table of employee historical sick cases
│       ├── PersonStatsMobileList.jsx   # Worker profiles formatted for smaller devices
│       ├── PersonStatsMobileItem.jsx   # Individual employee stats-sheet mobile item
│       ├── PrintableReport.jsx         # Raw report engine print layout template 
│       ├── PrintExecutiveKPIs.jsx      # Hard-copy friendly presence KPI blocks
│       ├── PrintPathologyDistribution.jsx # Hard-copy friendly table mapping pathology metrics
│       └── PrintIncidentRegistries.jsx # Hard-copy friendly full list of selected records
├── node-domexception-mock/   # Local non-deprecated implementation resolving transitive warnings
│   ├── package.json          # Mock package description
│   └── index.js              # Exports platform's native globalThis.DOMException
├── package.json              # Main project dependencies with npm overrides configured
├── vite.config.ts            # Vite compiler configuration
└── metadata.json             # Global application configuration and capability metadata
```

- **Framework**: `React 18` + `Vite` for sub-second hot reloading.
- **Component System**: `Material UI` (v6) for state-of-the-art form structures, dialogues, collapse animations, and accessibility.
- **Interactive Visualizations**: `Recharts` for high-performance SVG dashboard models.
- **Icons**: `Lucide React` for sharp, modern visual signposting.
- **State Management**: Reactive React Context/Hook architecture with persistent state preservation in client storage.

---

## ⚡ Setup & Launch Instructions

To spin up the project locally:

1. **Install Base Packages**:
   ```bash
   npm install
   ```
2. **Execute Dev Server**:
   ```bash
   npm run dev
   ```
3. **Verify App Quality (Linter & Compiling Checks)**:
   ```bash
   npm run lint
   npm run build
   ```

---

*This application is optimized for modern web browsers, ensuring reliable, fluid interactions across all dynamic administrative dashboards.*
