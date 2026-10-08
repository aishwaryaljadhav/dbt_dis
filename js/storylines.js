/*
 * dbt_dis content.
 * Everything a booth host might want to change lives here: event details,
 * technology names, summit stages, industry icons and the six storylines.
 * Company names, people and figures are illustrative.
 */
window.DIS = (function () {
  // Event start and end in UTC (Dubai is UTC+4). 09:00 Dubai on 14 Oct = 05:00 UTC.
  const EVENT = {
    name: "Data Innovation Summit MEA 2026",
    dates: "14–15 October 2026",
    venue: "JW Marriott Hotel Marina, Dubai",
    start: "2026-10-14T05:00:00Z",
    end: "2026-10-15T14:00:00Z",
    booth: "Diggibyte booth, exhibition area"
  };

  const TECH = {
    genie:    { name: "AI/BI Genie",      tagline: "Ask questions of governed data in plain language" },
    agents:   { name: "Agent Bricks",     tagline: "Build, evaluate and run production AI agents" },
    lakebase: { name: "Lakebase",         tagline: "Managed Postgres for real-time apps on the lakehouse" },
    apps:     { name: "Databricks Apps",  tagline: "Ship secure data and AI apps inside the platform" },
    uc:       { name: "Unity Catalog",    tagline: "One governance layer for data, models and agents" },
    lakeflow: { name: "Lakeflow",         tagline: "Ingest and transform data with managed pipelines" }
  };

  // The four DIS MEA 2026 stages. Each use case is tagged with the stage it belongs to.
  const STAGES = {
    ai_gov:    "AI Strategy & Governance",
    data_gov:  "Data Strategy & Governance",
    analytics: "Analytics & Decision Intelligence",
    agentic:   "ML, Gen & Agentic AI"
  };

  // 24×24 line icons, drawn with currentColor.
  const ICONS = {
    banking:    '<path d="M3 10h18L12 4 3 10Z"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
    government: '<path d="M4 20h16M6 20v-7M10 20v-7M14 20v-7M18 20v-7M4 13h16"/><path d="M6 13a6 6 0 0 1 12 0"/><path d="M12 7V3"/>',
    energy:     '<path d="M13 2 5 14h6l-1 8 8-12h-6l1-8Z"/>',
    realestate: '<path d="M4 21V9l5-3v15M9 21V4l6 3v14M15 21v-9l5 2v7M3 21h18"/>',
    retail:     '<path d="M5 8h14l-1.2 12.1a1 1 0 0 1-1 .9H7.2a1 1 0 0 1-1-.9L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    healthcare: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/><path d="M12 9v5M9.5 11.5h5"/>'
  };

  const ROWS = [
    {
      id: "banking",
      name: "Banking & Fintech",
      company: "Gulf Crescent Bank",
      city: "Dubai",
      headline: "Explainable credit decisions, answered in minutes",
      storyline:
        "The central bank wants every credit model traced back to the data it learned from. " +
        "Meanwhile, relationship managers wait days for portfolio reports that analysts build by hand.",
      useCases: [
        { tech: "uc", stage: "ai_gov",
          title: "Every model traced to its data",
          outcome: "Lineage, access policies and model versions sit in one catalog, so the audit pack is generated instead of assembled.",
          metric: "Audit pack in 2 days instead of 6 weeks" },
        { tech: "genie", stage: "analytics",
          title: "Relationship managers ask, Genie answers",
          outcome: "RMs ask about exposure, churn risk or product mix and get answers from certified tables only.",
          metric: "70% fewer ad-hoc report requests" },
        { tech: "agents", stage: "agentic",
          title: "A fraud triage agent for the night shift",
          outcome: "An agent groups alerts, pulls customer context and drafts a case summary for the analyst to approve.",
          metric: "Alert handling time cut by half" }
      ],
      demo: [
        "Open the credit risk catalog and follow one model back to its source tables.",
        "Ask Genie which segments drove last quarter's rise in early arrears.",
        "Hand three overnight fraud alerts to the triage agent and review its case notes.",
        "Approve one case and watch the decision land in the audit log."
      ]
    },
    {
      id: "government",
      name: "Government & Smart Cities",
      company: "Emirate Digital Services Authority",
      city: "Abu Dhabi",
      headline: "One view of the citizen across forty entities",
      storyline:
        "Forty government entities each hold part of the citizen's story, and none can see the rest. " +
        "Policy teams want answers that need data from five of them at once, without moving it around.",
      useCases: [
        { tech: "uc", stage: "data_gov",
          title: "Share data without copying it",
          outcome: "Entities publish governed data products and grant access by purpose, with row and column rules enforced centrally.",
          metric: "New data-sharing request live in 3 days, not 3 months" },
        { tech: "genie", stage: "analytics",
          title: "Policy questions in plain language",
          outcome: "Analysts ask how a housing programme affects school enrolment and get a governed answer with the query behind it.",
          metric: "Policy briefs drafted 4× faster" },
        { tech: "apps", stage: "agentic",
          title: "A citizen services assistant",
          outcome: "An app on the platform answers service questions from approved knowledge and hands complex cases to a person.",
          metric: "35% of service queries resolved first time" }
      ],
      demo: [
        "Browse the cross-entity data marketplace and request access to a housing dataset.",
        "See the access policy apply: personal identifiers masked for your role.",
        "Ask Genie how enrolment changed in districts with new housing.",
        "Try the citizen assistant and hand a complex case over to an agent."
      ]
    },
    {
      id: "energy",
      name: "Energy & Utilities",
      company: "Sahara Grid Utilities",
      city: "Riyadh",
      headline: "From smart-meter noise to outages prevented",
      storyline:
        "Two million smart meters and a fast-growing solar fleet send data every fifteen minutes. " +
        "Field teams still learn about faults from customer calls.",
      useCases: [
        { tech: "lakeflow", stage: "data_gov",
          title: "Meter and SCADA data in one pipeline",
          outcome: "Streaming pipelines land meter reads, weather and grid telemetry in governed tables within minutes.",
          metric: "Data freshness from next-day to 5 minutes" },
        { tech: "lakebase", stage: "analytics",
          title: "A live outage board for control rooms",
          outcome: "Operational data in Lakebase powers a real-time board that shows likely faults before customers call.",
          metric: "Outage detection 40 minutes earlier" },
        { tech: "agents", stage: "agentic",
          title: "A maintenance planning agent",
          outcome: "An agent ranks transformers by failure risk, checks crew availability and proposes the week's work orders.",
          metric: "18% fewer unplanned outages" }
      ],
      demo: [
        "Watch meter readings stream into a governed table in real time.",
        "Open the outage board and spot a feeder showing early warning signs.",
        "Ask the maintenance agent to plan next week's crew schedule around it.",
        "Approve the plan and see work orders created for the field team."
      ]
    },
    {
      id: "realestate",
      name: "Real Estate & Hospitality",
      company: "Marina Heights Developments",
      city: "Dubai",
      headline: "Know which buyers are serious before the launch",
      storyline:
        "Off-plan launches sell out in hours, but leads arrive from portals, brokers and walk-ins in different formats. " +
        "Sales teams cannot tell which enquiries will convert, and pricing reviews take weeks.",
      useCases: [
        { tech: "uc", stage: "ai_gov",
          title: "Responsible pricing and lead models",
          outcome: "Pricing and lead-scoring models are registered with owners, approvals and monitored drift.",
          metric: "Every model reviewed before each launch" },
        { tech: "genie", stage: "analytics",
          title: "Sales leaders ask about the pipeline",
          outcome: "Leaders ask which units, nationalities and channels are converting this week and get answers with sources.",
          metric: "Weekly sales review prep from 2 days to 1 hour" },
        { tech: "apps", stage: "agentic",
          title: "A broker assistant app",
          outcome: "Brokers get a ranked lead list, unit availability from Lakebase and a drafted follow-up message.",
          metric: "Lead-to-viewing conversion up 22%" }
      ],
      demo: [
        "Open the model registry and check the approval trail for the pricing model.",
        "Ask Genie which channels brought the highest-value buyers last launch.",
        "Open the broker app and pick the top lead for a two-bedroom unit.",
        "Send the drafted follow-up and see the unit held in real time."
      ]
    },
    {
      id: "retail",
      name: "Retail & FMCG",
      company: "Oasis Retail Group",
      city: "Riyadh and Jeddah",
      headline: "Stock that keeps up with Ramadan and summer peaks",
      storyline:
        "Demand swings sharply around Ramadan, Eid and the summer season. " +
        "Store managers order from instinct, and promotions are planned in spreadsheets that never match the sales data.",
      useCases: [
        { tech: "lakeflow", stage: "data_gov",
          title: "A single, trusted sales and stock table",
          outcome: "Point-of-sale, e-commerce and supplier feeds are cleaned into one set of certified tables.",
          metric: "One version of sales across 300 stores" },
        { tech: "genie", stage: "analytics",
          title: "Store managers ask before they order",
          outcome: "Managers ask what sold last Ramadan and what is forecast this week, in plain language on a tablet.",
          metric: "Out-of-stocks down 15% in peak weeks" },
        { tech: "agents", stage: "agentic",
          title: "A promotion planning agent",
          outcome: "An agent proposes promotions, checks margin and stock, and explains why each one should work.",
          metric: "Promotion margin up 3 points" }
      ],
      demo: [
        "See last year's Ramadan demand curve next to this year's forecast.",
        "Ask Genie which categories ran out early in Jeddah stores.",
        "Ask the promotion agent for an Eid plan within a fixed margin.",
        "Review its reasoning and accept two of the three proposals."
      ]
    },
    {
      id: "healthcare",
      name: "Healthcare & Life Sciences",
      company: "Nile Care Hospitals",
      city: "Cairo",
      headline: "Shorter waits without compromising patient privacy",
      storyline:
        "Emergency waits are rising and beds are hard to plan. " +
        "Clinicians want help with paperwork, but every use of patient data has to respect consent and privacy rules.",
      useCases: [
        { tech: "uc", stage: "data_gov",
          title: "Patient data protected by default",
          outcome: "Identifiers are masked by role, consent is enforced in policy, and every access is logged.",
          metric: "100% of patient-data access audited" },
        { tech: "lakebase", stage: "analytics",
          title: "A live bed and patient-flow view",
          outcome: "Admissions, discharges and theatre schedules feed a live view that predicts bed pressure for the next 12 hours.",
          metric: "Emergency waits down 20 minutes" },
        { tech: "agents", stage: "ai_gov",
          title: "Discharge summaries with a clinician in the loop",
          outcome: "An agent drafts discharge summaries from notes, and a clinician reviews and signs every one.",
          metric: "45 minutes saved per doctor per shift" }
      ],
      demo: [
        "Query patient data as a researcher and see identifiers masked automatically.",
        "Open the patient-flow view and spot the ward that will fill first.",
        "Ask the agent to draft a discharge summary for a sample patient.",
        "Edit and sign it as the clinician, and see the review recorded."
      ]
    }
  ];

  return { EVENT, TECH, STAGES, ICONS, ROWS };
})();
