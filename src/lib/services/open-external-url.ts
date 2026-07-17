// shared/open-external-url.ts

/**
 * Opens an external URL in the user's system browser.
 *
 * This exists because `window.open()` does not reliably do the right thing
 * inside a Tauri webview: depending on the app's CSP and webview configuration,
 * it may open the URL inside the app's own window instead of the OS's default
 * browser, or be blocked outright. Detecting Tauri and routing through the
 * `@tauri-apps/plugin-opener` plugin ensures the link always lands in a real
 * browser tab, both in Tauri builds and in plain web/browser contexts.
 *
 * The `@tauri-apps/plugin-opener` import is dynamic (`await import(...)`) and
 * guarded by the `__TAURI_INTERNALS__` check so that:
 *  - Consumers of this shared library that are NOT Tauri apps are not required
 *    to install `@tauri-apps/plugin-opener` as a hard dependency.
 *  - The plugin code is only loaded (and only needs to exist) when actually
 *    running inside a Tauri shell.
 *
 * @param url - The external URL to open. Assumed to already be a full,
 *              trusted URL (http/https) — this function does not validate
 *              or sanitize it.
 *
 * @remarks
 * Requires `@tauri-apps/plugin-opener` to be listed as an **optional**
 * peer dependency by any consuming app that runs under Tauri. Apps that
 * are not Tauri-based do not need it at all — the dynamic import is only
 * reached when `__TAURI_INTERNALS__` is present on `window`.
 *
 * @example
 * ```ts
 * async openDocs() {
 *   const url = this.helpUrl();
 *   if (url) await openExternalUrl(url);
 * }
 * ```
 */
export async function openExternalUrl(url: string): Promise<void> {
  try {
    if ('__TAURI_INTERNALS__' in window) {
      // Running inside a Tauri webview: hand off to the OS's real
      // browser via the opener plugin, rather than window.open(),
      // which would otherwise navigate inside the app's own window.
      const { openUrl } = await import('@tauri-apps/plugin-opener');
      await openUrl(url);
    } else {
      // Plain browser context (e.g. app running as a regular web app,
      // or this component used outside of Tauri entirely): a normal
      // new-tab open is correct and safe here.
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  } catch (err) {
    // Fail silently from the caller's perspective — opening docs is
    // never critical-path, so we log rather than throw.
    console.error('Failed to open external URL:', url, err);
  }
}