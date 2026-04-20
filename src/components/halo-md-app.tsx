"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { type User } from "firebase/auth";
import { AuthToolbar } from "@/components/auth-toolbar";
import { MarkdownPreview } from "@/components/markdown-preview";
import {
  deleteProject,
  listProjects,
  loadLatestProject,
  loadProject,
  saveProject,
  type StoredProject
} from "@/lib/project-storage";
import { buildMarkdown, createInitialValues, slugify, wizardSections, type WizardValues } from "@/lib/wizard";

function formatProjectUpdatedAt(value: unknown) {
  if (typeof value === "string") {
    return new Date(value).toLocaleString();
  }

  if (
    value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof (value as { toDate: () => Date }).toDate === "function"
  ) {
    return (value as { toDate: () => Date }).toDate().toLocaleString();
  }

  return "Saved draft";
}

export function HaloMdApp() {
  const [values, setValues] = useState<WizardValues>(() => createInitialValues(wizardSections));
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<StoredProject[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState("Ready");
  const [isSaving, setIsSaving] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);

  const markdown = useMemo(() => buildMarkdown(values), [values]);
  const activeSection = wizardSections[activeSectionIndex];
  const projectFileName = `${slugify(values.projectName || "halo-md") || "halo-md"}.md`;

  const goToSection = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, wizardSections.length - 1));
    setActiveSectionIndex(nextIndex);
    window.setTimeout(() => {
      document.getElementById(wizardSections[nextIndex].id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown || "# HaloMD"], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = projectFileName;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    const text = markdown || "# HaloMD";

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (historyRef.current && !historyRef.current.contains(event.target as Node)) {
        setIsHistoryOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const savedProjects = await listProjects(user?.uid ?? null);

      if (cancelled) {
        return;
      }

      setProjects(savedProjects);

      const project = savedProjects[0] ?? (await loadLatestProject(user?.uid ?? null));

      if (!project) {
        return;
      }

      setCurrentProjectId(project.id);
      setValues((current) => ({ ...current, ...project.values }));
      setSaveStatus(`Loaded ${project.name}`);
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.uid]);

  const handleProjectSelect = async (projectId: string) => {
    const project = await loadProject(user?.uid ?? null, projectId);

    if (!project) {
      setSaveStatus("Project not found");
      return;
    }

    setCurrentProjectId(project.id);
    setValues((current) => ({ ...current, ...project.values }));
    setSaveStatus(`Loaded ${project.name}`);
    setIsHistoryOpen(false);
  };

  const handleProjectRename = async (project: StoredProject) => {
    const nextName = window.prompt("Rename project", project.name)?.trim();

    if (!nextName || nextName === project.name) {
      return;
    }

    const result = await saveProject(user?.uid ?? null, {
      id: project.id,
      name: nextName,
      markdown: project.markdown,
      values: project.values,
      updatedAt: new Date().toISOString()
    });

    setProjects((currentProjects) => [result.project, ...currentProjects.filter((entry) => entry.id !== project.id)]);

    if (currentProjectId === project.id) {
      setValues((current) => ({ ...current, projectName: nextName }));
    }

    setSaveStatus(`Renamed to ${nextName}`);
  };

  const handleProjectDelete = async (projectId: string) => {
    const project = projects.find((entry) => entry.id === projectId);

    if (!project) {
      return;
    }

    const confirmed = window.confirm(`Delete "${project.name}"? This cannot be undone.`);

    if (!confirmed) {
      return;
    }

    await deleteProject(user?.uid ?? null, projectId);
    setProjects((currentProjects) => currentProjects.filter((entry) => entry.id !== projectId));

    if (currentProjectId === projectId) {
      setCurrentProjectId(null);
      setValues(createInitialValues(wizardSections));
    }

    setSaveStatus(`Deleted ${project.name}`);
  };

  const handleNewDraft = () => {
    setCurrentProjectId(null);
    setValues(createInitialValues(wizardSections));
    setSaveStatus("Started a new draft");
    setIsHistoryOpen(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("Saving...");

    try {
      const result = await saveProject(user?.uid ?? null, {
        id: currentProjectId ?? undefined,
        name: values.projectName || "HaloMD",
        markdown: markdown || "# HaloMD",
        values,
        updatedAt: new Date().toISOString()
      });

      setCurrentProjectId(result.project.id);
      setProjects((currentProjects) => {
        const nextProjects = currentProjects.filter((project) => project.id !== result.project.id);
        return [result.project, ...nextProjects];
      });
      setSaveStatus(result.scope === "firebase" ? "Saved to Firebase" : "Saved locally");
    } catch (error) {
      setSaveStatus(error instanceof Error ? error.message : "Unable to save");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="shell shell-wide">
      <header className="topbar">
        <div className="brand-block">
          <p className="eyebrow">HaloMD</p>
          <h1>Software docs, generated in one flow.</h1>
        </div>

        <div className="topbar-actions">
          <div className="history-menu" ref={historyRef}>
            <button type="button" className="ghost-button" onClick={() => setIsHistoryOpen((current) => !current)}>
              History
            </button>

            {isHistoryOpen ? (
              <div className="history-popover">
                <div className="history-head">
                  <div>
                    <span className="stat-label">Saved</span>
                    <strong>{projects.length}</strong>
                  </div>
                  <button type="button" className="chip-action" onClick={handleNewDraft}>
                    New draft
                  </button>
                </div>

                <div className="history-list">
                  {projects.length === 0 ? (
                    <p className="history-empty">No saved drafts yet.</p>
                  ) : (
                    projects.map((project) => (
                      <div key={project.id} className={project.id === currentProjectId ? "history-item active" : "history-item"}>
                        <button type="button" className="history-main" onClick={() => void handleProjectSelect(project.id)}>
                          <span>{project.name}</span>
                          <small>{formatProjectUpdatedAt(project.updatedAt)}</small>
                        </button>

                        <div className="history-actions">
                          <button type="button" className="chip-action" onClick={() => void handleProjectRename(project)}>
                            Rename
                          </button>
                          <button type="button" className="chip-action danger" onClick={() => void handleProjectDelete(project.id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : null}
          </div>

          <AuthToolbar compact onUserChange={setUser} />
        </div>
      </header>

      <section className="workspaces">
        <section className="screen wizard-screen">
          <div className="screen-head">
            <div>
              <p className="panel-kicker">Wizard</p>
              <h2>Question flow</h2>
              <p className="panel-copy">
                Every field is optional. Fill in only what you know, and the markdown will grow around it.
              </p>
            </div>
          </div>

          <div className="wizard-tabs">
            {wizardSections.map((section, index) => (
              <button
                key={section.id}
                type="button"
                className={index === activeSectionIndex ? "section-chip active" : "section-chip"}
                aria-current={index === activeSectionIndex ? "true" : undefined}
                onClick={() => goToSection(index)}
              >
                <span>{section.title}</span>
                <small>{section.fields.length} prompts</small>
              </button>
            ))}
          </div>

          <article className="wizard-card" id={activeSection?.id}>
            <div className="section-heading">
              <div>
                <p className="panel-kicker">{activeSection?.title}</p>
                <h3>{activeSection?.description}</h3>
              </div>
            </div>

            <div className="field-grid">
              {activeSection?.fields.map((field) => (
                <label key={field.key} className="field">
                  <span className="field-label">{field.label}</span>
                  {field.helperText ? <span className="field-help">{field.helperText}</span> : null}
                  {field.multiline ? (
                    <textarea
                      value={values[field.key]}
                      placeholder={field.placeholder}
                      onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))}
                    />
                  ) : (
                    <input
                      value={values[field.key]}
                      placeholder={field.placeholder}
                      onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))}
                    />
                  )}
                </label>
              ))}
            </div>

            <div className="wizard-footer">
              <div className="wizard-progress">
                <span className="stat-label">Current</span>
                <strong>{activeSection?.title}</strong>
                <small>
                  {activeSectionIndex + 1} / {wizardSections.length}
                </small>
              </div>

              <div className="wizard-nav">
                <button type="button" className="ghost-button" onClick={() => goToSection(activeSectionIndex - 1)} disabled={activeSectionIndex === 0}>
                  Previous
                </button>
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => goToSection(activeSectionIndex + 1)}
                  disabled={activeSectionIndex === wizardSections.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </article>
        </section>

        <section className="screen output-screen">
          <div className="screen-head">
            <div>
              <p className="panel-kicker">Live Output</p>
              <h2>Markdown preview</h2>
              <p className="panel-copy">
                The preview only includes filled fields, so the output stays clean while you work.
              </p>
            </div>

            <div className="preview-actions">
              <button type="button" className="ghost-button" onClick={() => void handleCopy()}>
                Copy
              </button>
              <button type="button" className="ghost-button" onClick={() => void handleSave()} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button type="button" className="primary-button" onClick={handleDownload}>
                Download {projectFileName}
              </button>
            </div>
          </div>

          <p className="save-status">{saveStatus}</p>
          <MarkdownPreview markdown={markdown || "# HaloMD"} />
        </section>
      </section>
    </main>
  );
}
