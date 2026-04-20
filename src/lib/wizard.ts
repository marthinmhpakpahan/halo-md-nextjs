export type WizardField = {
  key: string;
  label: string;
  placeholder?: string;
  helperText?: string;
  multiline?: boolean;
};

export type WizardSection = {
  id: string;
  title: string;
  description: string;
  fields: WizardField[];
};

export type WizardValues = Record<string, string>;

export const wizardSections: WizardSection[] = [
  {
    id: "app-details",
    title: "App Details",
    description: "Basic context for the software project.",
    fields: [
      { key: "projectName", label: "Project Name", placeholder: "HaloMD" },
      { key: "shortDescription", label: "Short Description", placeholder: "A markdown wizard for software docs", multiline: true },
      { key: "mainGoal", label: "Main Goal", placeholder: "Help teams generate docs faster" },
      { key: "targetUsers", label: "Target Users", placeholder: "Founders, developers, product teams" },
      { key: "projectStatus", label: "Project Status", placeholder: "Idea, prototype, in development" }
    ]
  },
  {
    id: "product-scope",
    title: "Product Scope",
    description: "What the software should do and what it should not do.",
    fields: [
      { key: "coreFeatures", label: "Core Features", placeholder: "Wizard, live preview, export", multiline: true },
      { key: "keyUserFlows", label: "Key User Flows", placeholder: "Login, fill wizard, preview output", multiline: true },
      { key: "mainUseCases", label: "Main Use Cases", placeholder: "Generate README, design docs, guidelines", multiline: true },
      { key: "nonGoals", label: "Non-Goals", placeholder: "Not a full CMS or docs hosting platform", multiline: true },
      { key: "successCriteria", label: "Success Criteria", placeholder: "Fast setup and good quality output", multiline: true }
    ]
  },
  {
    id: "design",
    title: "Design",
    description: "Visual direction and interaction style.",
    fields: [
      { key: "theme", label: "Theme", placeholder: "Minimal, bold, calm, editorial" },
      { key: "typography", label: "Typography", placeholder: "Readable sans-serif with strong hierarchy" },
      { key: "colorStyle", label: "Color Style", placeholder: "Dark slate with bright blue accents", multiline: true },
      { key: "layoutStyle", label: "Layout Style", placeholder: "Split-screen, responsive, card-based" },
      { key: "motionStyle", label: "Motion / Interaction Style", placeholder: "Subtle transitions and staged reveals", multiline: true },
      { key: "accessibilityNotes", label: "Accessibility Notes", placeholder: "High contrast, keyboard friendly, clear labels", multiline: true }
    ]
  },
  {
    id: "technical-setup",
    title: "Technical Setup",
    description: "The technical foundation of the app.",
    fields: [
      { key: "techStack", label: "Tech Stack", placeholder: "Next.js, Firebase, TypeScript" },
      { key: "database", label: "Database or Storage", placeholder: "Firebase Firestore or Storage" },
      { key: "authentication", label: "Authentication", placeholder: "Google sign-in" },
      { key: "hosting", label: "Hosting / Deployment", placeholder: "Vercel or Firebase Hosting" },
      { key: "integrations", label: "Integrations", placeholder: "GitHub, AI, export tools", multiline: true },
      { key: "environmentVariables", label: "Environment Variables", placeholder: "API keys, Firebase config", multiline: true }
    ]
  },
  {
    id: "architecture",
    title: "Architecture",
    description: "How the codebase is structured.",
    fields: [
      { key: "systemOverview", label: "System Overview", placeholder: "Client form, markdown engine, storage layer", multiline: true },
      { key: "mainModules", label: "Main Modules", placeholder: "Wizard, preview, exporter, auth", multiline: true },
      { key: "folderStructure", label: "Folder Structure", placeholder: "app, components, lib, features", multiline: true },
      { key: "stateManagement", label: "State Management", placeholder: "Local state, context, server state", multiline: true },
      { key: "dataFlow", label: "Data Flow", placeholder: "User input -> schema -> markdown output", multiline: true },
      { key: "componentStructure", label: "Component Structure", placeholder: "Section panels, reusable fields, preview pane", multiline: true }
    ]
  },
  {
    id: "data-structure",
    title: "Data Structure",
    description: "Entities, relationships, and content organization.",
    fields: [
      { key: "mainEntities", label: "Main Entities", placeholder: "Projects, sections, templates, exports", multiline: true },
      { key: "importantFields", label: "Important Fields", placeholder: "Name, summary, goals, docs", multiline: true },
      { key: "relationships", label: "Relationships", placeholder: "A project contains sections and outputs", multiline: true },
      { key: "contentSections", label: "Content Sections", placeholder: "Overview, setup, architecture, rules", multiline: true },
      { key: "namingConventions", label: "File or Document Naming", placeholder: "overview.md, design.md, rules.md", multiline: true }
    ]
  },
  {
    id: "api-integrations",
    title: "API and Integrations",
    description: "External services and contract details.",
    fields: [
      { key: "apiEndpoints", label: "API Endpoints", placeholder: "Save project, generate output, sync docs", multiline: true },
      { key: "externalServices", label: "External Services", placeholder: "Firebase, GitHub, AI services", multiline: true },
      { key: "webhooks", label: "Webhooks", placeholder: "Document sync and export events", multiline: true },
      { key: "requestResponse", label: "Request and Response Shapes", placeholder: "Project payloads, section payloads", multiline: true },
      { key: "apiErrors", label: "Error Handling", placeholder: "Validation errors, auth errors, network failures", multiline: true }
    ]
  },
  {
    id: "behavior",
    title: "Behavior",
    description: "Screen states and interactive behavior.",
    fields: [
      { key: "screens", label: "Screens", placeholder: "Input screen, preview screen, export screen", multiline: true },
      { key: "wizardSteps", label: "Wizard Steps", placeholder: "Section by section with optional skipping", multiline: true },
      { key: "emptyStates", label: "Empty States", placeholder: "Helpful prompts when nothing is filled in", multiline: true },
      { key: "errorStates", label: "Error States", placeholder: "Inline validation and retry messaging", multiline: true },
      { key: "loadingStates", label: "Loading States", placeholder: "Skeletons and subtle progress feedback", multiline: true }
    ]
  },
  {
    id: "rules",
    title: "Rules",
    description: "Validation, formatting, and content guidance.",
    fields: [
      { key: "validationRules", label: "Validation Rules", placeholder: "Optional fields, gentle validation only", multiline: true },
      { key: "contentRules", label: "Content Rules", placeholder: "Keep output concise and useful", multiline: true },
      { key: "formattingRules", label: "Formatting Rules", placeholder: "Use markdown headings, bullets, and code blocks", multiline: true },
      { key: "accessibilityRules", label: "Accessibility Rules", placeholder: "Keyboard navigation, labels, contrast", multiline: true },
      { key: "documentRules", label: "Document Rules", placeholder: "Generate only sections the user wants", multiline: true },
      { key: "specialInstructions", label: "Special Instructions", placeholder: "Anything that should override the defaults", multiline: true }
    ]
  },
  {
    id: "testing",
    title: "Testing",
    description: "How the software should be verified.",
    fields: [
      { key: "testStrategy", label: "Test Strategy", placeholder: "Smoke tests, unit coverage, manual checks", multiline: true },
      { key: "unitTests", label: "Unit Tests", placeholder: "Critical helpers and markdown generation", multiline: true },
      { key: "integrationTests", label: "Integration Tests", placeholder: "Auth flow, save flow, export flow", multiline: true },
      { key: "manualQa", label: "Manual QA", placeholder: "Responsive layout and edge cases", multiline: true },
      { key: "edgeCases", label: "Edge Cases", placeholder: "Empty input, partial input, long text", multiline: true }
    ]
  },
  {
    id: "deployment",
    title: "Deployment",
    description: "How the app is built and released.",
    fields: [
      { key: "deploymentPlatform", label: "Deployment Platform", placeholder: "Vercel, Firebase Hosting, or similar" },
      { key: "buildSteps", label: "Build Steps", placeholder: "Install, build, deploy", multiline: true },
      { key: "releaseProcess", label: "Release Process", placeholder: "Preview first, then promote to production", multiline: true },
      { key: "environmentSetup", label: "Environment Setup", placeholder: "Local env vars and preview env vars", multiline: true },
      { key: "monitoring", label: "Monitoring / Logging", placeholder: "Error tracking and usage monitoring", multiline: true }
    ]
  },
  {
    id: "security",
    title: "Security",
    description: "Sensitive data, permissions, and safe handling.",
    fields: [
      { key: "authRules", label: "Authentication Rules", placeholder: "Use Google login and session checks", multiline: true },
      { key: "accessControl", label: "Access Control", placeholder: "Only signed-in users can save projects", multiline: true },
      { key: "sensitiveData", label: "Sensitive Data Handling", placeholder: "Keep secrets in env vars", multiline: true },
      { key: "sanitization", label: "Validation and Sanitization", placeholder: "Sanitize user input before rendering", multiline: true },
      { key: "securityNotes", label: "Security Notes", placeholder: "Any additional safety requirements", multiline: true }
    ]
  },
  {
    id: "maintenance",
    title: "Maintenance",
    description: "Long-term upkeep and collaboration.",
    fields: [
      { key: "contributing", label: "Contributing", placeholder: "How teammates can add or update docs", multiline: true },
      { key: "troubleshooting", label: "Troubleshooting", placeholder: "Common issues and fixes", multiline: true },
      { key: "faq", label: "FAQ", placeholder: "Frequently asked questions", multiline: true },
      { key: "roadmap", label: "Roadmap", placeholder: "Ideas for future improvements", multiline: true },
      { key: "openQuestions", label: "Open Questions", placeholder: "Things still being decided", multiline: true }
    ]
  }
];

export function createInitialValues(sections: WizardSection[]): WizardValues {
  return sections.reduce<WizardValues>((values, section) => {
    for (const field of section.fields) {
      values[field.key] = "";
    }

    return values;
  }, {});
}

export function buildMarkdown(values: WizardValues): string {
  const lines: string[] = [];
  const projectName = values.projectName.trim() || "HaloMD";
  const shortDescription = values.shortDescription.trim();

  lines.push(`# ${projectName}`);

  if (shortDescription) {
    lines.push("");
    lines.push(shortDescription);
  }

  for (const section of wizardSections) {
    const entries = section.fields
      .map((field) => [field.label, values[field.key].trim()] as const)
      .filter(([, value]) => value.length > 0);

    if (entries.length === 0) {
      continue;
    }

    lines.push("");
    lines.push(`## ${section.title}`);

    for (const [label, value] of entries) {
      lines.push("");
      lines.push(`### ${label}`);
      lines.push("");

      if (value.includes("\n")) {
        lines.push(value);
      } else {
        lines.push(value);
      }
    }
  }

  return lines.join("\n").trim();
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
