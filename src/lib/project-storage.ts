"use client";

import { deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { getFirebaseDb, getProjectsCollection } from "@/lib/firebase";
import type { WizardValues } from "@/lib/wizard";

export type StoredProject = {
  id: string;
  name: string;
  markdown: string;
  values: WizardValues;
  updatedAt?: string;
};

const LOCAL_STORAGE_KEY = "halomd:projects";

function readLocalProjects(): StoredProject[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as StoredProject[];
  } catch {
    return [];
  }
}

function writeLocalProjects(projects: StoredProject[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
}

export function readLocalProject(): StoredProject | null {
  return readLocalProjects()[0] ?? null;
}

export function listLocalProjects(): StoredProject[] {
  return readLocalProjects().sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""));
}

export function writeLocalProject(project: StoredProject) {
  const projects = readLocalProjects();
  const existingIndex = projects.findIndex((entry) => entry.id === project.id);

  if (existingIndex >= 0) {
    projects[existingIndex] = project;
  } else {
    projects.unshift(project);
  }

  writeLocalProjects(projects);
}

export async function saveProject(uid: string | null, project: Omit<StoredProject, "id"> & { id?: string }) {
  const db = getFirebaseDb();
  const now = new Date().toISOString();
  const projectId = project.id ?? globalThis.crypto?.randomUUID?.() ?? `project-${Date.now()}`;
  const payload = {
    id: projectId,
    name: project.name,
    markdown: project.markdown,
    values: project.values,
    updatedAt: now
  };

  if (!uid || !db) {
    writeLocalProject(payload);
    return { scope: "local" as const, project: payload };
  }

  await setDoc(doc(getProjectsCollection(db, uid), projectId), {
    name: project.name,
    markdown: project.markdown,
    values: project.values,
    updatedAt: serverTimestamp()
  });

  return { scope: "firebase" as const, project: payload };
}

export async function deleteProject(uid: string | null, projectId: string) {
  const db = getFirebaseDb();

  if (!uid || !db) {
    const projects = listLocalProjects().filter((project) => project.id !== projectId);
    writeLocalProjects(projects);
    return;
  }

  await deleteDoc(doc(getProjectsCollection(db, uid), projectId));
}

export async function loadLatestProject(uid: string | null) {
  const db = getFirebaseDb();

  if (!uid || !db) {
    return readLocalProject();
  }

  const snapshot = await getDocs(query(getProjectsCollection(db, uid), orderBy("updatedAt", "desc")));
  const firstDoc = snapshot.docs[0];

  if (!firstDoc) {
    return null;
  }

  return {
    id: firstDoc.id,
    ...(firstDoc.data() as Omit<StoredProject, "id">)
  };
}

export async function loadProject(uid: string | null, projectId: string) {
  const db = getFirebaseDb();

  if (!uid || !db) {
    return listLocalProjects().find((project) => project.id === projectId) ?? null;
  }

  const snapshot = await getDoc(doc(getProjectsCollection(db, uid), projectId));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<StoredProject, "id">)
  };
}

export async function listProjects(uid: string | null) {
  const db = getFirebaseDb();

  if (!uid || !db) {
    return listLocalProjects();
  }

  const snapshot = await getDocs(query(getProjectsCollection(db, uid), orderBy("updatedAt", "desc")));

  return snapshot.docs.map((projectDoc) => ({
    id: projectDoc.id,
    ...(projectDoc.data() as Omit<StoredProject, "id">)
  }));
}
