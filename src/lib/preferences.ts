type Preference = "theme" | "notifications" | "workspace";

/** Preserve local preferences when moving from the original project name. */
export function readPreference(name: Preference) {
  const key = `hulmio-${name}`;
  const current = localStorage.getItem(key);
  if (current !== null) return current;
  const previous = localStorage.getItem(`forma-${name}`);
  if (previous !== null) localStorage.setItem(key, previous);
  return previous;
}
