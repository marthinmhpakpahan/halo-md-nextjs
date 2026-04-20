"use client";

import { useEffect, useState } from "react";
import { type User, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { getFirebaseAuth, getGoogleProvider, hasFirebaseConfig } from "@/lib/firebase";

type AuthToolbarProps = {
  onUserChange?: (user: User | null) => void;
  compact?: boolean;
};

export function AuthToolbar({ onUserChange, compact = false }: AuthToolbarProps) {
  const [user, setUser] = useState<User | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getFirebaseAuth();

    if (!auth) {
      onUserChange?.(null);
      return;
    }

    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      onUserChange?.(nextUser);
    });
  }, [onUserChange]);

  const handleSignIn = async () => {
    const auth = getFirebaseAuth();
    setError(null);

    if (!auth) {
      setError("Firebase config is missing, so HaloMD is running in local mode.");
      return;
    }

    try {
      setBusy(true);
      await signInWithPopup(auth, getGoogleProvider());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    const auth = getFirebaseAuth();

    if (!auth) {
      setUser(null);
      onUserChange?.(null);
      return;
    }

    await signOut(auth);
  };

  return (
    <div className={compact ? "auth-bar auth-bar-compact" : "auth-bar"}>
      <div>
        <span className="stat-label">Auth</span>
        <strong>{user ? user.displayName ?? user.email ?? "Signed in" : hasFirebaseConfig() ? "Not signed in" : "Local mode"}</strong>
      </div>

      <div className="auth-actions">
        {user ? (
          <button type="button" className="ghost-button" onClick={() => void handleSignOut()}>
            Sign out
          </button>
        ) : (
          <button type="button" className="ghost-button" onClick={() => void handleSignIn()} disabled={busy}>
            {busy ? "Signing in..." : "Sign in with Google"}
          </button>
        )}
      </div>

      {error ? <p className="auth-error">{error}</p> : null}
    </div>
  );
}
