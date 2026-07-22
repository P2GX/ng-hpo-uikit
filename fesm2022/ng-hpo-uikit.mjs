import * as i0 from '@angular/core';
import { inject, Injectable, input, output, computed, Component, viewChild, signal, HostListener, ViewChild, model, effect } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1 from '@angular/forms';
import { FormsModule, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import * as i2 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import { startWith, map, debounceTime, switchMap, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import * as i3 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i3$1 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i4 from '@angular/material/autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import * as i5 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i6 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i2$1 from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as i1$2 from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import * as i5$1 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';

class NotificationService {
    snackBar = inject(MatSnackBar);
    showError(message, duration = 8000) {
        this.snackBar.open(message, 'Dismiss', {
            panelClass: ['error-snackbar'],
            duration,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
        });
    }
    showSuccess(message, duration = 4000) {
        this.snackBar.open(message, 'OK', {
            panelClass: ['success-snackbar'],
            duration,
            verticalPosition: 'bottom',
        });
    }
    showWarning(message, duration = 6000) {
        this.snackBar.open(message, 'Close', {
            panelClass: ['warning-snackbar'],
            duration,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: NotificationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: NotificationService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: NotificationService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class FooterComponent {
    sanitizer = inject(DomSanitizer);
    appName = input.required(...(ngDevMode ? [{ debugName: "appName" }] : /* istanbul ignore next */ []));
    appVersion = input.required(...(ngDevMode ? [{ debugName: "appVersion" }] : /* istanbul ignore next */ []));
    gitHubIssuesUrl = input.required(...(ngDevMode ? [{ debugName: "gitHubIssuesUrl" }] : /* istanbul ignore next */ []));
    currentYear = input(2026, ...(ngDevMode ? [{ debugName: "currentYear" }] : /* istanbul ignore next */ [])); // Sensible default
    helpRequested = output();
    sanitizedIssuesUrl = computed(() => this.sanitizer.bypassSecurityTrustUrl(this.gitHubIssuesUrl()), ...(ngDevMode ? [{ debugName: "sanitizedIssuesUrl" }] : /* istanbul ignore next */ []));
    onHelpClick() {
        this.helpRequested.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: FooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.17", type: FooterComponent, isStandalone: true, selector: "hpo-shared-footer", inputs: { appName: { classPropertyName: "appName", publicName: "appName", isSignal: true, isRequired: true, transformFunction: null }, appVersion: { classPropertyName: "appVersion", publicName: "appVersion", isSignal: true, isRequired: true, transformFunction: null }, gitHubIssuesUrl: { classPropertyName: "gitHubIssuesUrl", publicName: "gitHubIssuesUrl", isSignal: true, isRequired: true, transformFunction: null }, currentYear: { classPropertyName: "currentYear", publicName: "currentYear", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { helpRequested: "helpRequested" }, ngImport: i0, template: "<!-- Inside your UI library: shared-footer.component.html -->\n<footer class=\"site-footer\">\n  <div class=\"footer-content\">\n    <p>&copy; {{ currentYear() }} {{ appName() }} v{{ appVersion() }}</p>\n    \n    <button \n      (click)=\"onHelpClick()\"\n      class=\"footer-link\"\n      title=\"Open help documentation\"\n    >\n      <span>Help</span>\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-4 w-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />\n      </svg>\n    </button>\n\n    <!-- The link now uses a reactive input bound to href -->\n    <a\n      [href]=\"sanitizedIssuesUrl()\"\n      target=\"_blank\"\n      rel=\"noopener noreferrer\"\n      class=\"footer-link\"\n      title=\"Report a bug or problem on GitHub\"\n    >\n      <span>Report bug</span>\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-4 w-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 8l1.5-1.5M5 8L3.5 6.5M12 1v2M12 5a4 4 0 00-4 4v2H8 a4 4 0 008 0h0V9a4 4 0 00-4-4zM4 13h16M4 17h16M12 21v2\" />\n      </svg>\n    </a>\n  </div>\n</footer>", styles: [".site-footer{background-color:#f3f4f6;text-align:center;padding:1rem 0;font-size:14px;color:#4b5563;box-shadow:inset 0 2px 4px #0000000d}.footer-content{display:flex;align-items:center;justify-content:center;gap:16px}.footer-link{display:flex;align-items:center;gap:4px;color:#2563eb;text-decoration:underline;background:none;border:none;padding:0;cursor:pointer;font-size:inherit;transition:color .2s ease}.footer-link:hover{color:#1e40af}.site-footer .icon{height:16px;width:16px}@media(max-width:480px){.footer-content{flex-direction:column;gap:8px}}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: FooterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hpo-shared-footer', standalone: true, template: "<!-- Inside your UI library: shared-footer.component.html -->\n<footer class=\"site-footer\">\n  <div class=\"footer-content\">\n    <p>&copy; {{ currentYear() }} {{ appName() }} v{{ appVersion() }}</p>\n    \n    <button \n      (click)=\"onHelpClick()\"\n      class=\"footer-link\"\n      title=\"Open help documentation\"\n    >\n      <span>Help</span>\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-4 w-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />\n      </svg>\n    </button>\n\n    <!-- The link now uses a reactive input bound to href -->\n    <a\n      [href]=\"sanitizedIssuesUrl()\"\n      target=\"_blank\"\n      rel=\"noopener noreferrer\"\n      class=\"footer-link\"\n      title=\"Report a bug or problem on GitHub\"\n    >\n      <span>Report bug</span>\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-4 w-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 8l1.5-1.5M5 8L3.5 6.5M12 1v2M12 5a4 4 0 00-4 4v2H8 a4 4 0 008 0h0V9a4 4 0 00-4-4zM4 13h16M4 17h16M12 21v2\" />\n      </svg>\n    </a>\n  </div>\n</footer>", styles: [".site-footer{background-color:#f3f4f6;text-align:center;padding:1rem 0;font-size:14px;color:#4b5563;box-shadow:inset 0 2px 4px #0000000d}.footer-content{display:flex;align-items:center;justify-content:center;gap:16px}.footer-link{display:flex;align-items:center;gap:4px;color:#2563eb;text-decoration:underline;background:none;border:none;padding:0;cursor:pointer;font-size:inherit;transition:color .2s ease}.footer-link:hover{color:#1e40af}.site-footer .icon{height:16px;width:16px}@media(max-width:480px){.footer-content{flex-direction:column;gap:8px}}\n"] }]
        }], propDecorators: { appName: [{ type: i0.Input, args: [{ isSignal: true, alias: "appName", required: true }] }], appVersion: [{ type: i0.Input, args: [{ isSignal: true, alias: "appVersion", required: true }] }], gitHubIssuesUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "gitHubIssuesUrl", required: true }] }], currentYear: [{ type: i0.Input, args: [{ isSignal: true, alias: "currentYear", required: false }] }], helpRequested: [{ type: i0.Output, args: ["helpRequested"] }] } });

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
async function openExternalUrl(url) {
    try {
        if ('__TAURI_INTERNALS__' in window) {
            // Running inside a Tauri webview: hand off to the OS's real
            // browser via the opener plugin, rather than window.open(),
            // which would otherwise navigate inside the app's own window.
            const { openUrl } = await import('@tauri-apps/plugin-opener');
            await openUrl(url);
        }
        else {
            // Plain browser context (e.g. app running as a regular web app,
            // or this component used outside of Tauri entirely): a normal
            // new-tab open is correct and safe here.
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    }
    catch (err) {
        // Fail silently from the caller's perspective — opening docs is
        // never critical-path, so we log rather than throw.
        console.error('Failed to open external URL:', url, err);
    }
}

class HelpButtonComponent {
    title = input.required(...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    lines = input.required(...(ngDevMode ? [{ debugName: "lines" }] : /* istanbul ignore next */ []));
    helpUrl = input(...(ngDevMode ? [undefined, { debugName: "helpUrl" }] : /* istanbul ignore next */ []));
    popoverEl = viewChild.required('popoverEl');
    toggle() {
        const el = this.popoverEl().nativeElement;
        if (el.matches(':popover-open')) {
            el.hidePopover();
        }
        else {
            el.showPopover();
        }
    }
    async openDocs() {
        const url = this.helpUrl();
        if (url)
            await openExternalUrl(url);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HelpButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: HelpButtonComponent, isStandalone: true, selector: "hpo-help-button", inputs: { title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: true, transformFunction: null }, lines: { classPropertyName: "lines", publicName: "lines", isSignal: true, isRequired: true, transformFunction: null }, helpUrl: { classPropertyName: "helpUrl", publicName: "helpUrl", isSignal: true, isRequired: false, transformFunction: null } }, viewQueries: [{ propertyName: "popoverEl", first: true, predicate: ["popoverEl"], descendants: true, isSignal: true }], ngImport: i0, template: "<!-- help-button.component.html -->\n<button (click)=\"toggle()\" class=\"help-trigger\" type=\"button\" aria-label=\"Help\">\n  <!-- replace mat-icon: inline SVG, or an icon font class, your call -->\n  <svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"currentColor\">\n    <path d=\"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm.75 15h-1.5v-1.5h1.5Zm1.53-6.22c-.36.4-.9.86-1.53 1.28-.4.27-.63.51-.63.94v.25h-1.5v-.3c0-.86.42-1.4 1.05-1.83.5-.35.85-.63 1.1-.94.24-.3.36-.62.36-1 0-.83-.67-1.43-1.6-1.43-.86 0-1.5.5-1.68 1.32l-1.47-.26c.28-1.35 1.4-2.31 3.15-2.31 1.83 0 3.1 1.06 3.1 2.6 0 .7-.28 1.28-.85 1.68Z\"/>\n  </svg>\n</button>\n\n<div #popoverEl popover=\"auto\" class=\"help-bubble-menu\">\n  <div class=\"help-content\">\n    <h3 class=\"help-title\">{{ title() }}</h3>\n\n    @for (line of lines(); track line) {\n      <p class=\"help-text\" [innerHTML]=\"line\"></p>\n    }\n\n    @if (helpUrl()) {\n      <hr class=\"help-divider\">\n      <button class=\"btn-docs\" (click)=\"openDocs()\">\n        <span>Learn more</span>\n      </button>\n    }\n  </div>\n</div>", styles: [".help-bubble-menu{position:fixed;margin:0;padding:0;border:none;inset:auto;overflow:visible;max-width:280px;border-radius:8px;background-color:#fff;box-shadow:0 4px 12px #00000026}.help-bubble-menu .help-content{padding:12px 16px}.help-bubble-menu .help-content .help-title{margin:0 0 8px;font-size:.95rem;font-weight:600;color:#333}.help-bubble-menu .help-content .help-text{margin:0 0 6px;font-size:.85rem;line-height:1.4;color:#555}.help-bubble-menu .help-content .help-text:last-of-type{margin-bottom:0}.help-bubble-menu .help-content .help-divider{border:0;border-top:1px solid #eef0f2;margin:10px 0}.help-bubble-menu .help-content .btn-docs{display:flex;align-items:center;gap:6px;background:none;border:none;color:#0288d1;font-size:.85rem;font-weight:500;cursor:pointer;padding:4px 0;width:100%;text-align:left}.help-bubble-menu .help-content .btn-docs svg{width:16px;height:16px;flex-shrink:0}.help-bubble-menu .help-content .btn-docs:hover{color:#01579b;text-decoration:underline}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HelpButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hpo-help-button', standalone: true, template: "<!-- help-button.component.html -->\n<button (click)=\"toggle()\" class=\"help-trigger\" type=\"button\" aria-label=\"Help\">\n  <!-- replace mat-icon: inline SVG, or an icon font class, your call -->\n  <svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"currentColor\">\n    <path d=\"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm.75 15h-1.5v-1.5h1.5Zm1.53-6.22c-.36.4-.9.86-1.53 1.28-.4.27-.63.51-.63.94v.25h-1.5v-.3c0-.86.42-1.4 1.05-1.83.5-.35.85-.63 1.1-.94.24-.3.36-.62.36-1 0-.83-.67-1.43-1.6-1.43-.86 0-1.5.5-1.68 1.32l-1.47-.26c.28-1.35 1.4-2.31 3.15-2.31 1.83 0 3.1 1.06 3.1 2.6 0 .7-.28 1.28-.85 1.68Z\"/>\n  </svg>\n</button>\n\n<div #popoverEl popover=\"auto\" class=\"help-bubble-menu\">\n  <div class=\"help-content\">\n    <h3 class=\"help-title\">{{ title() }}</h3>\n\n    @for (line of lines(); track line) {\n      <p class=\"help-text\" [innerHTML]=\"line\"></p>\n    }\n\n    @if (helpUrl()) {\n      <hr class=\"help-divider\">\n      <button class=\"btn-docs\" (click)=\"openDocs()\">\n        <span>Learn more</span>\n      </button>\n    }\n  </div>\n</div>", styles: [".help-bubble-menu{position:fixed;margin:0;padding:0;border:none;inset:auto;overflow:visible;max-width:280px;border-radius:8px;background-color:#fff;box-shadow:0 4px 12px #00000026}.help-bubble-menu .help-content{padding:12px 16px}.help-bubble-menu .help-content .help-title{margin:0 0 8px;font-size:.95rem;font-weight:600;color:#333}.help-bubble-menu .help-content .help-text{margin:0 0 6px;font-size:.85rem;line-height:1.4;color:#555}.help-bubble-menu .help-content .help-text:last-of-type{margin-bottom:0}.help-bubble-menu .help-content .help-divider{border:0;border-top:1px solid #eef0f2;margin:10px 0}.help-bubble-menu .help-content .btn-docs{display:flex;align-items:center;gap:6px;background:none;border:none;color:#0288d1;font-size:.85rem;font-weight:500;cursor:pointer;padding:4px 0;width:100%;text-align:left}.help-bubble-menu .help-content .btn-docs svg{width:16px;height:16px;flex-shrink:0}.help-bubble-menu .help-content .btn-docs:hover{color:#01579b;text-decoration:underline}\n"] }]
        }], propDecorators: { title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: true }] }], lines: [{ type: i0.Input, args: [{ isSignal: true, alias: "lines", required: true }] }], helpUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "helpUrl", required: false }] }], popoverEl: [{ type: i0.ViewChild, args: ['popoverEl', { isSignal: true }] }] } });

// regexes for human strings such as 4y2m and 4yrs 2nth
const RE_YEAR = /(\d+(?:\.\d+)?)\s*y/i;
const RE_MONTH = /(\d+(?:\.\d+)?)\s*m/i;
const RE_WEEK = /(\d+(?:\.\d+)?)\s*w/i;
const RE_DAY = /(\d+)\s*d/i;
// Matches ISO 8601 durations like "P1Y6M3D" or "P0D"
const ISO8601_RE = /^P(?:\d+Y)?(?:\d+M)?(?:\d+D)?$/i;
const GESTATIONAL_AGE_RE = /^G(\d+)w(?:([0-6])d)?$/i;
class AgeService {
    ALLOWED_AGE_LABELS = new Set(['na', 'Antenatal onset',
        'Embryonal onset', 'Fetal onset',
        'Late first trimester onset', 'Second trimester onset', 'Third trimester onset',
        'Congenital onset',
        'Pediatric onset',
        'Neonatal onset', 'Infantile onset', 'Childhood onset', 'Juvenile onset',
        'Adult onset', 'Young adult onset', 'Early young adult onset', 'Intermediate young adult onset', 'Late young adult onset',
        'Middle age onset', 'Late onset']);
    AGE_TERM_MAP = {
        antenatal: "Antenatal onset",
        neonate: "Neonatal onset",
        neonatal: "Neonatal onset",
        birth: "Congenital onset",
        congenital: "Congenital onset",
        childhood: "Childhood onset",
        adult: "Adult onset",
        unk: "na",
        na: "na",
    };
    isoPattern = /^P(?:\d+Y)?(?:\d+M)?(?:\d+D)?$/;
    gestationalAgePattern = /^G\d{1,2}w(?:[0-6]d)?$/;
    /** The source of truth for user-selected age strings.*/
    _selectedTerms = signal(["na"], ...(ngDevMode ? [{ debugName: "_selectedTerms" }] : /* istanbul ignore next */ []));
    /** Expose the signal as read-only for components */
    selectedTerms = this._selectedTerms.asReadonly();
    /** for autocomplete lists */
    allAvailableTerms = computed(() => {
        return Array.from(new Set([...this.ALLOWED_AGE_LABELS, ...this._selectedTerms()]));
    }, ...(ngDevMode ? [{ debugName: "allAvailableTerms" }] : /* istanbul ignore next */ []));
    /**
     * Returns true if the input is
     * 1. A valid ISO8601 age string.
     * 2. A gestational age string.
     * 3. A known HPO onset term ("na" is also an allowed entry)
     */
    validateAgeInput(input) {
        return input == "na" ||
            this.ALLOWED_AGE_LABELS.has(input) ||
            this.isoPattern.test(input) ||
            this.gestationalAgePattern.test(input);
    }
    /** Expose an Angular validator that uses the same logic */
    validator() {
        return (control) => {
            const value = control.value;
            if (!value)
                return null; // don't mark empty as invalid, let required handle that
            return this.validateAgeInput(value) ? null : { invalid: true };
        };
    }
    /** always present "na" as the first value. These are the age terms that are selectable for the phenotypic features */
    addSelectedTerms(terms) {
        this._selectedTerms.update(current => Array.from(new Set([...current, ...terms])));
    }
    addSelectedTerm(term) {
        this._selectedTerms.update(current => Array.from(new Set([...current, term])));
    }
    removeSelectedTerm(term) {
        this._selectedTerms.update(current => current.filter(t => t !== term));
    }
    removeSelectedTerms(terms) {
        const removeSet = new Set(terms);
        this._selectedTerms.update(current => current.filter(t => !removeSet.has(t)));
    }
    clearSelectedTerms() {
        this._selectedTerms.set(["na"]);
    }
    mapAgeStringToSymbolic(input) {
        const lower = input.toLowerCase();
        if (this.AGE_TERM_MAP[lower])
            return this.AGE_TERM_MAP[lower];
        if (this.ALLOWED_AGE_LABELS.has(input))
            return input;
        return null;
    }
    // transform strings like 11 and 11.2 (years) into ISO format
    numericYearToIso(input) {
        const yVal = parseFloat(input) ?? 0;
        const years = Math.floor(yVal);
        const monthsFromY = Math.round((yVal - years) * 12);
        let res = "P";
        if (years > 0)
            res += `${years}Y`;
        if (monthsFromY > 0)
            res += `${monthsFromY}M`;
        return res === "P" ? undefined : res;
    }
    mapYmdToIso(input) {
        const yMatch = RE_YEAR.exec(input);
        const mMatch = RE_MONTH.exec(input);
        const wMatch = RE_WEEK.exec(input);
        const dMatch = RE_DAY.exec(input);
        const yVal = yMatch ? parseFloat(yMatch[1]) : 0;
        const mVal = mMatch ? parseFloat(mMatch[1]) : 0;
        const wVal = wMatch ? parseFloat(wMatch[1]) : 0;
        const dVal = dMatch ? parseFloat(dMatch[1]) : 0;
        console.log(`input=${input} y=${yVal} m=${mVal} w=${wVal} d=${dVal}`);
        if (yVal === 0 && mVal === 0 && wVal === 0 && dVal === 0)
            return undefined;
        const years = Math.floor(yVal);
        const monthsFromY = Math.round((yVal - years) * 12);
        const totalMonths = Math.floor(mVal) + monthsFromY;
        const daysFromW = Math.round(wVal * 7);
        const totalDays = Math.floor(dVal) + daysFromW;
        let res = "P";
        if (years > 0)
            res += `${years}Y`;
        if (totalMonths > 0)
            res += `${totalMonths}M`;
        if (totalDays > 0)
            res += `${totalDays}D`;
        return res === "P" ? undefined : res;
    }
    mapEtlAgeString(input) {
        if (!input)
            return undefined;
        const symbolic = this.mapAgeStringToSymbolic(input);
        if (symbolic)
            return symbolic;
        if (GESTATIONAL_AGE_RE.test(input))
            return input;
        if (ISO8601_RE.test(input))
            return input;
        return this.mapYmdToIso(input);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: AgeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: AgeService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: AgeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class HpoAgeSelectorDialogComponent {
    dialogRef;
    currentSelection = input(null, ...(ngDevMode ? [{ debugName: "currentSelection" }] : /* istanbul ignore next */ []));
    selected = output();
    dismissed = output();
    ageService = inject(AgeService);
    notificationService = inject(NotificationService);
    customAge = signal('', ...(ngDevMode ? [{ debugName: "customAge" }] : /* istanbul ignore next */ []));
    showSuggestions = signal(false, ...(ngDevMode ? [{ debugName: "showSuggestions" }] : /* istanbul ignore next */ []));
    existingAgeStrings = computed(() => this.ageService.selectedTerms(), ...(ngDevMode ? [{ debugName: "existingAgeStrings" }] : /* istanbul ignore next */ []));
    filteredTerms = computed(() => {
        const typed = this.customAge().trim().toLowerCase();
        if (!typed)
            return [];
        const allAvailable = this.ageService.allAvailableTerms();
        return allAvailable.filter(t => t.toLowerCase().includes(typed));
    }, ...(ngDevMode ? [{ debugName: "filteredTerms" }] : /* istanbul ignore next */ []));
    ngOnInit() {
        const current = this.currentSelection();
        if (current) {
            this.customAge.set(current);
        }
    }
    open() {
        this.dialogRef.nativeElement.showModal();
        this.showSuggestions.set(false);
    }
    close() {
        this.dialogRef.nativeElement.close();
        this.showSuggestions.set(false);
    }
    onInputChange(value) {
        this.customAge.set(value);
        this.showSuggestions.set(true);
    }
    onSelectExisting(term) {
        if (term) {
            this.showSuggestions.set(false);
            this.selected.emit(term);
            this.close();
        }
    }
    onSubmitCustom() {
        const rawVal = this.customAge().trim();
        if (!rawVal)
            return;
        this.showSuggestions.set(false);
        const processedVal = this.ageService.mapEtlAgeString(rawVal);
        if (processedVal && this.ageService.validateAgeInput(processedVal)) {
            this.ageService.addSelectedTerm(processedVal);
            this.selected.emit(processedVal);
            this.close();
        }
        else {
            this.notificationService.showError('Invalid format. Please use standard HPO terms, ISO8601 (e.g., P1Y), or Gestational (e.g., G20w).');
        }
    }
    onCancel() {
        this.showSuggestions.set(false);
        this.dismissed.emit();
        this.close();
    }
    onBackdropClick(event) {
        const rect = this.dialogRef.nativeElement.getBoundingClientRect();
        if (event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom) {
            this.onCancel();
        }
    }
    // Close suggestions if clicking completely outside the input area
    onDocumentClick(event) {
        const target = event.target;
        if (!target.closest('.manual-entry')) {
            this.showSuggestions.set(false);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoAgeSelectorDialogComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: HpoAgeSelectorDialogComponent, isStandalone: true, selector: "hpo-age-selector-dialog", inputs: { currentSelection: { classPropertyName: "currentSelection", publicName: "currentSelection", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { selected: "selected", dismissed: "dismissed" }, host: { listeners: { "document:click": "onDocumentClick($event)" } }, viewQueries: [{ propertyName: "dialogRef", first: true, predicate: ["ageSelectorDialog"], descendants: true }], ngImport: i0, template: "<dialog \n  #ageSelectorDialog \n  class=\"compact-dialog-overlay\" \n  (click)=\"onBackdropClick($event)\" \n  (cancel)=\"onCancel()\">\n  <h2 class=\"dialog-title\">Select Age</h2>\n\n  <div class=\"dialog-content\">\n    <div class=\"dialog-stack\">\n      @if (existingAgeStrings().length > 0) {\n        <div class=\"selection-section\">\n          <label class=\"section-label\">Choose Existing</label>\n          <div class=\"age-tag-cloud\">\n            @for (term of existingAgeStrings(); track term) {\n              <button \n                type=\"button\"\n                (click)=\"onSelectExisting(term)\"\n                class=\"age-tag\">\n                {{ term }}\n              </button>\n            }\n          </div>\n        </div>\n\n        <div class=\"divider\">\n            <div class=\"divider-line\"></div>\n            <span class=\"divider-text\">OR CREATE NEW</span>\n            <div class=\"divider-line\"></div>\n        </div>\n      }\n\n      <!-- Manual Entry Layout -->\n      <div class=\"manual-entry\">\n        <div class=\"custom-form-field position-relative\">\n          <label class=\"field-label\" for=\"new-age-input\">New Age String</label>\n          <input \n                id=\"new-age-input\"\n                type=\"text\"\n                class=\"native-input\"\n                [ngModel]=\"customAge()\" \n                (ngModelChange)=\"onInputChange($event)\"\n                (keyup.enter)=\"onSubmitCustom()\"\n                autofocus\n                autocapitalize=\"none\"\n                spellcheck=\"false\"\n                autocomplete=\"off\"\n                placeholder=\"e.g. P35Y\">\n        @if (showSuggestions() && filteredTerms().length > 0) {\n          <ul class=\"native-autocomplete-list\">\n            @for (term of filteredTerms(); track term) {\n              <li class=\"autocomplete-option\" (click)=\"onSelectExisting(term)\">\n                {{ term }}\n              </li>\n            }\n          </ul>\n        }\n        </div>\n        <div class=\"action-row\">\n          <button type=\"button\" class=\"btn-outline-primary\" (click)=\"onSubmitCustom()\">Use</button>\n          <button type=\"button\" class=\"btn-outline-cancel\" (click)=\"onCancel()\">Cancel</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</dialog>", styles: ["dialog.compact-dialog-overlay{position:fixed;inset:0;margin:auto;width:440px;max-width:90vw;padding:24px;min-height:220px;max-height:85vh;overflow-y:auto;border:none;border-radius:8px;background:#fff;box-shadow:0 4px 20px #00000026;z-index:200000}dialog.compact-dialog-overlay::backdrop{background-color:#00000080;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);z-index:199999}.dialog-title{margin-top:0;margin-bottom:16px;font-size:1.25rem;font-weight:600;color:#1f2937}.dialog-content{display:flex;flex-direction:column}.dialog-stack{display:flex;flex-direction:column;gap:16px}.selection-section{display:flex;flex-direction:column;gap:8px}.selection-section .section-label{font-size:.85rem;font-weight:500;color:#4b5563}.selection-section .age-tag-cloud{display:flex;flex-wrap:wrap;gap:6px}.selection-section .age-tag-cloud .age-tag{padding:4px 10px;font-size:.85rem;background-color:#f3f4f6;border:1px solid #d1d5db;border-radius:4px;cursor:pointer;transition:background-color .2s}.selection-section .age-tag-cloud .age-tag:hover{background-color:#e5e7eb}.divider{display:flex;align-items:center;text-align:center;margin:4px 0}.divider .divider-line{flex-grow:1;height:1px;background-color:#e5e7eb}.divider .divider-text{padding:0 10px;font-size:.75rem;font-weight:600;color:#9ca3af}.manual-entry{display:flex;flex-direction:column;gap:12px}.position-relative{position:relative}.custom-form-field{display:flex;flex-direction:column;gap:4px}.custom-form-field .field-label{font-size:.85rem;font-weight:500;color:#4b5563}.custom-form-field .native-input{padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:.95rem;outline:none;transition:border-color .2s}.custom-form-field .native-input:focus{border-color:#2563eb;box-shadow:0 0 0 2px #2563eb1a}.native-autocomplete-list{position:absolute;top:100%;left:0;right:0;background:#fff;border:1px solid #d1d5db;border-radius:6px;box-shadow:0 4px 12px #0000001a;list-style:none;padding:0;margin:2px 0 0;max-height:180px;overflow-y:auto;z-index:10}.native-autocomplete-list .autocomplete-option{padding:8px 12px;font-size:.9rem;cursor:pointer}.native-autocomplete-list .autocomplete-option:hover{background-color:#f3f4f6;color:#2563eb}.action-row{display:flex;justify-content:flex-end;gap:8px;margin-top:8px}.action-row button{padding:6px 14px;border-radius:6px;font-size:.9rem;cursor:pointer;font-weight:500}.action-row .btn-outline-primary{background-color:#2563eb;color:#fff;border:none}.action-row .btn-outline-primary:hover{background-color:#1d4ed8}.action-row .btn-outline-cancel{background-color:transparent;color:#4b5563;border:1px solid #d1d5db}.action-row .btn-outline-cancel:hover{background-color:#f3f4f6}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoAgeSelectorDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hpo-age-selector-dialog', standalone: true, imports: [
                        CommonModule,
                        FormsModule
                    ], template: "<dialog \n  #ageSelectorDialog \n  class=\"compact-dialog-overlay\" \n  (click)=\"onBackdropClick($event)\" \n  (cancel)=\"onCancel()\">\n  <h2 class=\"dialog-title\">Select Age</h2>\n\n  <div class=\"dialog-content\">\n    <div class=\"dialog-stack\">\n      @if (existingAgeStrings().length > 0) {\n        <div class=\"selection-section\">\n          <label class=\"section-label\">Choose Existing</label>\n          <div class=\"age-tag-cloud\">\n            @for (term of existingAgeStrings(); track term) {\n              <button \n                type=\"button\"\n                (click)=\"onSelectExisting(term)\"\n                class=\"age-tag\">\n                {{ term }}\n              </button>\n            }\n          </div>\n        </div>\n\n        <div class=\"divider\">\n            <div class=\"divider-line\"></div>\n            <span class=\"divider-text\">OR CREATE NEW</span>\n            <div class=\"divider-line\"></div>\n        </div>\n      }\n\n      <!-- Manual Entry Layout -->\n      <div class=\"manual-entry\">\n        <div class=\"custom-form-field position-relative\">\n          <label class=\"field-label\" for=\"new-age-input\">New Age String</label>\n          <input \n                id=\"new-age-input\"\n                type=\"text\"\n                class=\"native-input\"\n                [ngModel]=\"customAge()\" \n                (ngModelChange)=\"onInputChange($event)\"\n                (keyup.enter)=\"onSubmitCustom()\"\n                autofocus\n                autocapitalize=\"none\"\n                spellcheck=\"false\"\n                autocomplete=\"off\"\n                placeholder=\"e.g. P35Y\">\n        @if (showSuggestions() && filteredTerms().length > 0) {\n          <ul class=\"native-autocomplete-list\">\n            @for (term of filteredTerms(); track term) {\n              <li class=\"autocomplete-option\" (click)=\"onSelectExisting(term)\">\n                {{ term }}\n              </li>\n            }\n          </ul>\n        }\n        </div>\n        <div class=\"action-row\">\n          <button type=\"button\" class=\"btn-outline-primary\" (click)=\"onSubmitCustom()\">Use</button>\n          <button type=\"button\" class=\"btn-outline-cancel\" (click)=\"onCancel()\">Cancel</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</dialog>", styles: ["dialog.compact-dialog-overlay{position:fixed;inset:0;margin:auto;width:440px;max-width:90vw;padding:24px;min-height:220px;max-height:85vh;overflow-y:auto;border:none;border-radius:8px;background:#fff;box-shadow:0 4px 20px #00000026;z-index:200000}dialog.compact-dialog-overlay::backdrop{background-color:#00000080;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);z-index:199999}.dialog-title{margin-top:0;margin-bottom:16px;font-size:1.25rem;font-weight:600;color:#1f2937}.dialog-content{display:flex;flex-direction:column}.dialog-stack{display:flex;flex-direction:column;gap:16px}.selection-section{display:flex;flex-direction:column;gap:8px}.selection-section .section-label{font-size:.85rem;font-weight:500;color:#4b5563}.selection-section .age-tag-cloud{display:flex;flex-wrap:wrap;gap:6px}.selection-section .age-tag-cloud .age-tag{padding:4px 10px;font-size:.85rem;background-color:#f3f4f6;border:1px solid #d1d5db;border-radius:4px;cursor:pointer;transition:background-color .2s}.selection-section .age-tag-cloud .age-tag:hover{background-color:#e5e7eb}.divider{display:flex;align-items:center;text-align:center;margin:4px 0}.divider .divider-line{flex-grow:1;height:1px;background-color:#e5e7eb}.divider .divider-text{padding:0 10px;font-size:.75rem;font-weight:600;color:#9ca3af}.manual-entry{display:flex;flex-direction:column;gap:12px}.position-relative{position:relative}.custom-form-field{display:flex;flex-direction:column;gap:4px}.custom-form-field .field-label{font-size:.85rem;font-weight:500;color:#4b5563}.custom-form-field .native-input{padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:.95rem;outline:none;transition:border-color .2s}.custom-form-field .native-input:focus{border-color:#2563eb;box-shadow:0 0 0 2px #2563eb1a}.native-autocomplete-list{position:absolute;top:100%;left:0;right:0;background:#fff;border:1px solid #d1d5db;border-radius:6px;box-shadow:0 4px 12px #0000001a;list-style:none;padding:0;margin:2px 0 0;max-height:180px;overflow-y:auto;z-index:10}.native-autocomplete-list .autocomplete-option{padding:8px 12px;font-size:.9rem;cursor:pointer}.native-autocomplete-list .autocomplete-option:hover{background-color:#f3f4f6;color:#2563eb}.action-row{display:flex;justify-content:flex-end;gap:8px;margin-top:8px}.action-row button{padding:6px 14px;border-radius:6px;font-size:.9rem;cursor:pointer;font-weight:500}.action-row .btn-outline-primary{background-color:#2563eb;color:#fff;border:none}.action-row .btn-outline-primary:hover{background-color:#1d4ed8}.action-row .btn-outline-cancel{background-color:transparent;color:#4b5563;border:1px solid #d1d5db}.action-row .btn-outline-cancel:hover{background-color:#f3f4f6}\n"] }]
        }], propDecorators: { dialogRef: [{
                type: ViewChild,
                args: ['ageSelectorDialog']
            }], currentSelection: [{ type: i0.Input, args: [{ isSignal: true, alias: "currentSelection", required: false }] }], selected: [{ type: i0.Output, args: ["selected"] }], dismissed: [{ type: i0.Output, args: ["dismissed"] }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }] } });

class HpoAgeSelectorComponent {
    dialogComponent;
    selectedOnset = input(null, ...(ngDevMode ? [{ debugName: "selectedOnset" }] : /* istanbul ignore next */ []));
    size = input('normal', ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    onsetChanged = output();
    openSelectorDialog() {
        this.dialogComponent.open();
    }
    onDialogSelected(result) {
        if (result) {
            this.onsetChanged.emit(result);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoAgeSelectorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.17", type: HpoAgeSelectorComponent, isStandalone: true, selector: "hpo-age-selector", inputs: { selectedOnset: { classPropertyName: "selectedOnset", publicName: "selectedOnset", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { onsetChanged: "onsetChanged" }, viewQueries: [{ propertyName: "dialogComponent", first: true, predicate: HpoAgeSelectorDialogComponent, descendants: true }], ngImport: i0, template: "<button\n  type=\"button\"\n  [class]=\"selectedOnset() ? 'age-picker-trigger' : 'annotation-action'\"\n  [class.annotation-value-small]=\"size() === 'small'\"\n  (click)=\"openSelectorDialog()\">\n  {{ selectedOnset() || '+Add Age of Onset' }}\n</button>\n\n<hpo-age-selector-dialog\n  [currentSelection]=\"selectedOnset()\"\n  (selected)=\"onDialogSelected($event)\">\n</hpo-age-selector-dialog>\n\n", styles: [".age-picker-trigger{background:transparent;border:none;padding:4px 8px;cursor:pointer;text-align:left;font-family:inherit;font-size:13px;border-radius:4px;width:100%}.age-picker-trigger:hover{background-color:#f3f4f6}.age-picker-small{font-size:11px;padding:2px 6px}.age-value{color:#1f2937;font-weight:500}.placeholder-text{color:#9ca3af;font-style:italic}\n"], dependencies: [{ kind: "component", type: HpoAgeSelectorDialogComponent, selector: "hpo-age-selector-dialog", inputs: ["currentSelection"], outputs: ["selected", "dismissed"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoAgeSelectorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hpo-age-selector', standalone: true, imports: [HpoAgeSelectorDialogComponent], template: "<button\n  type=\"button\"\n  [class]=\"selectedOnset() ? 'age-picker-trigger' : 'annotation-action'\"\n  [class.annotation-value-small]=\"size() === 'small'\"\n  (click)=\"openSelectorDialog()\">\n  {{ selectedOnset() || '+Add Age of Onset' }}\n</button>\n\n<hpo-age-selector-dialog\n  [currentSelection]=\"selectedOnset()\"\n  (selected)=\"onDialogSelected($event)\">\n</hpo-age-selector-dialog>\n\n", styles: [".age-picker-trigger{background:transparent;border:none;padding:4px 8px;cursor:pointer;text-align:left;font-family:inherit;font-size:13px;border-radius:4px;width:100%}.age-picker-trigger:hover{background-color:#f3f4f6}.age-picker-small{font-size:11px;padding:2px 6px}.age-value{color:#1f2937;font-weight:500}.placeholder-text{color:#9ca3af;font-style:italic}\n"] }]
        }], propDecorators: { dialogComponent: [{
                type: ViewChild,
                args: [HpoAgeSelectorDialogComponent]
            }], selectedOnset: [{ type: i0.Input, args: [{ isSignal: true, alias: "selectedOnset", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], onsetChanged: [{ type: i0.Output, args: ["onsetChanged"] }] } });

class ModifierSelectorComponent {
    availableModifiers = input.required(...(ngDevMode ? [{ debugName: "availableModifiers" }] : /* istanbul ignore next */ []));
    selectedModifiers = input.required(...(ngDevMode ? [{ debugName: "selectedModifiers" }] : /* istanbul ignore next */ []));
    selectionChanged = output();
    close = output();
    select(mod) { }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: ModifierSelectorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: ModifierSelectorComponent, isStandalone: true, selector: "app-modifier-selector", inputs: { availableModifiers: { classPropertyName: "availableModifiers", publicName: "availableModifiers", isSignal: true, isRequired: true, transformFunction: null }, selectedModifiers: { classPropertyName: "selectedModifiers", publicName: "selectedModifiers", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { selectionChanged: "selectionChanged", close: "close" }, ngImport: i0, template: `
    <div class="modifier-menu">
       @for (mod of availableModifiers(); track mod.termId) {
         <button (click)="select(mod)">{{ mod.label }}</button>
       }
       <button (click)="close.emit()">Done</button>
    </div>
  `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: ModifierSelectorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-modifier-selector',
                    standalone: true,
                    template: `
    <div class="modifier-menu">
       @for (mod of availableModifiers(); track mod.termId) {
         <button (click)="select(mod)">{{ mod.label }}</button>
       }
       <button (click)="close.emit()">Done</button>
    </div>
  `
                }]
        }], propDecorators: { availableModifiers: [{ type: i0.Input, args: [{ isSignal: true, alias: "availableModifiers", required: true }] }], selectedModifiers: [{ type: i0.Input, args: [{ isSignal: true, alias: "selectedModifiers", required: true }] }], selectionChanged: [{ type: i0.Output, args: ["selectionChanged"] }], close: [{ type: i0.Output, args: ["close"] }] } });

/*
 * This component provides one row in the HPO annotation table and allows users to "polish" the
 * annotations by toggling observed/excluded, setting onsets, adding modifiers, deleting annotations,
 * and adding new annotations via autocompletion.
*/
class HpoPolishRowComponent {
    isModifierDialogOpen = signal(false, ...(ngDevMode ? [{ debugName: "isModifierDialogOpen" }] : /* istanbul ignore next */ []));
    annotation = model.required(...(ngDevMode ? [{ debugName: "annotation" }] : /* istanbul ignore next */ []));
    hierarchy = signal(null, ...(ngDevMode ? [{ debugName: "hierarchy" }] : /* istanbul ignore next */ []));
    hierarchyProvider = input.required(...(ngDevMode ? [{ debugName: "hierarchyProvider" }] : /* istanbul ignore next */ []));
    availableModifiers = input([], ...(ngDevMode ? [{ debugName: "availableModifiers" }] : /* istanbul ignore next */ []));
    updated = output();
    deleteRequested = output();
    termClick = output();
    // Local autocomplete search inputs
    modifierSearchQuery = signal('', ...(ngDevMode ? [{ debugName: "modifierSearchQuery" }] : /* istanbul ignore next */ []));
    showHierarchyMenu = signal(false, ...(ngDevMode ? [{ debugName: "showHierarchyMenu" }] : /* istanbul ignore next */ []));
    showModifierMenu = signal(false, ...(ngDevMode ? [{ debugName: "showModifierMenu" }] : /* istanbul ignore next */ []));
    filteredModifiers = computed(() => {
        const query = this.modifierSearchQuery().toLowerCase().trim();
        const available = this.availableModifiers();
        const currentSelected = this.annotation().modifiers || [];
        return available.filter(mod => !currentSelected.includes(mod) &&
            mod.label.includes(query));
    }, ...(ngDevMode ? [{ debugName: "filteredModifiers" }] : /* istanbul ignore next */ []));
    formattedModifierOptions = computed(() => {
        return this.availableModifiers().map(m => ({ id: m, label: m }));
    }, ...(ngDevMode ? [{ debugName: "formattedModifierOptions" }] : /* istanbul ignore next */ []));
    remainingModifierLabels = computed(() => {
        const mods = this.annotation().modifiers ?? [];
        return mods
            .slice(2)
            .map(m => m.label)
            .join('\n');
    }, ...(ngDevMode ? [{ debugName: "remainingModifierLabels" }] : /* istanbul ignore next */ []));
    modifierButtonText = computed(() => {
        const count = this.annotation().modifiers?.length ?? 0;
        return count === 0 ? '+Add modifier' : 'Edit';
    }, ...(ngDevMode ? [{ debugName: "modifierButtonText" }] : /* istanbul ignore next */ []));
    updateModifiers(updatedMods) {
        const updatedAnnotation = {
            ...this.annotation(),
            modifiers: updatedMods
        };
        this.annotation.set(updatedAnnotation);
        this.updated.emit(updatedAnnotation);
    }
    toggleModifierModal() {
        this.isModifierDialogOpen.update(v => !v);
    }
    toggleHierarchyMenu() {
        this.showHierarchyMenu.update(v => !v);
    }
    async openHierarchyMenu() {
        if (!this.showHierarchyMenu() && this.hierarchy() === null) {
            const provider = this.hierarchyProvider(); // Get the function
            const data = await provider(this.annotation().termId); // Fetch fresh
            this.hierarchy.set(data);
        }
        this.showHierarchyMenu.update(v => !v);
    }
    /* replace a term with a parent or child from the hierarchy menu */
    /* replace a term with a parent or child from the hierarchy menu */
    async replaceTerm(target) {
        const updatedAnnotation = {
            ...this.annotation(),
            termId: target.termId,
            label: target.label
        };
        this.annotation.set(updatedAnnotation);
        this.updated.emit(updatedAnnotation);
        //  fetch fresh data for the new term immediately
        // this prevents the menu from showing stale data on the next open
        const provider = this.hierarchyProvider();
        const data = await provider(target.termId);
        this.hierarchy.set(data);
        this.showHierarchyMenu.set(false);
    }
    toggleObserved() {
        const updatedAnnotation = {
            ...this.annotation(),
            excluded: !this.annotation().excluded
        };
        this.annotation.set(updatedAnnotation);
        this.updated.emit(updatedAnnotation);
    }
    removeModifier(idx) {
        const currentMods = this.annotation().modifiers || [];
        const updatedMods = currentMods.filter((_, i) => i !== idx);
        const updatedAnnotation = {
            ...this.annotation(),
            modifiers: updatedMods
        };
        this.annotation.set(updatedAnnotation);
        this.updated.emit(updatedAnnotation);
    }
    changeOnset(newOnset) {
        const updatedAnnotation = {
            ...this.annotation(),
            onsetString: newOnset || undefined
        };
        this.annotation.set(updatedAnnotation);
        this.updated.emit(updatedAnnotation);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoPolishRowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: HpoPolishRowComponent, isStandalone: true, selector: "tr[hpo-polisher-row]", inputs: { annotation: { classPropertyName: "annotation", publicName: "annotation", isSignal: true, isRequired: true, transformFunction: null }, hierarchyProvider: { classPropertyName: "hierarchyProvider", publicName: "hierarchyProvider", isSignal: true, isRequired: true, transformFunction: null }, availableModifiers: { classPropertyName: "availableModifiers", publicName: "availableModifiers", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { annotation: "annotationChange", updated: "updated", deleteRequested: "deleteRequested", termClick: "termClick" }, ngImport: i0, template: "  <td class=\"font-mono\">\n      <a (click)=\"termClick.emit(annotation().termId)\" class=\"link-text\">\n      {{ annotation().termId }}\n      </a>\n  </td>\n\n  <td class=\"label-cell\">\n      <div class=\"dropdown-wrapper\">\n      <span \n        cdkOverlayOrigin\n        #trigger=\"cdkOverlayOrigin\"\n        (click)=\"openHierarchyMenu();\" \n        class=\"dropdown-trigger\">\n          {{ annotation().label }} <span class=\"caret\">\u25BC</span>\n      </span>\n        <ng-template\n            cdkConnectedOverlay\n            [cdkConnectedOverlayOrigin]=\"trigger\"\n            [cdkConnectedOverlayOpen]=\"showHierarchyMenu()\"\n            [cdkConnectedOverlayPositions]=\"[{\n                originX: 'start', originY: 'bottom',\n                overlayX: 'start', overlayY: 'top',\n                offsetY: 4\n            }, {\n                originX: 'start', originY: 'top',\n                overlayX: 'start', overlayY: 'bottom',\n                offsetY: -4\n            }]\"\n            (backdropClick)=\"showHierarchyMenu.set(false)\"\n            [cdkConnectedOverlayHasBackdrop]=\"true\"\n            [cdkConnectedOverlayBackdropClass]=\"'cdk-overlay-transparent-backdrop'\">\n          <div class=\"local-context-menu\" (mouseleave)=\"showHierarchyMenu.set(false)\">\n          @if (hierarchy()?.parents?.length) {\n              <div class=\"menu-section-title\">Parents</div>\n              <ul>\n              @for (p of hierarchy()?.parents; track p.termId) {\n                  <li (click)=\"replaceTerm(p);$event.stopPropagation();\" class=\"menu-item\">{{ p.label }} ({{ p.termId }})</li>\n              }\n              </ul>\n          }\n          @if (hierarchy()?.children?.length) {\n              <div class=\"menu-section-title\">Children</div>\n              <ul>\n              @for (c of hierarchy()?.children; track c.termId) {\n                  <li (click)=\"replaceTerm(c)\" class=\"menu-item\">{{ c.label }} ({{ c.termId }})</li>\n              }\n              </ul>\n          }\n          </div>\n      </ng-template>\n      </div>\n  </td>\n\n  <td>\n      <span class=\"badge\" [ngClass]=\"annotation().excluded ?  'badge-red' : 'badge-green'\">\n      {{ annotation().excluded ?  'EXC' : 'OBS' }}\n      </span>\n  </td>\n\n  <td class=\"onset-cell\">\n    <hpo-age-selector\n      size=\"small\"\n      [selectedOnset]=\"annotation().onsetString || null\"\n      (onsetChanged)=\"changeOnset($event)\"\n    />\n  </td>\n\n  <td class=\"modifier-cell\">\n    <div class=\"active-modifiers-preview\" (click)=\"toggleModifierModal()\">\n      @for (mod of annotation().modifiers?.slice(0,2) ?? []; track mod.termId) {\n        <span class=\"modifier-chip\"\n                [title]=\"mod.label\">\n             {{ mod.label.length > 10 ? mod.label.slice(0, 10) + '\u2026' : mod.label }}\n        </span>\n        }\n\n        @if ((annotation().modifiers?.length ?? 0) > 2) {\n        <span\n            class=\"modifier-chip more\"\n            [title]=\"remainingModifierLabels()\">\n            +{{ (annotation().modifiers?.length ?? 0) - 2 }}\n        </span>\n        }\n        <button\n            class=\"annotation-action\"\n            (click)=\"toggleModifierModal(); $event.stopPropagation()\">\n            {{ modifierButtonText() }}\n        </button>\n    </div>\n    @if (isModifierDialogOpen()) {\n    <div class=\"modifier-overlay\">\n      <app-modifier-selector\n        [availableModifiers]=\"availableModifiers()\"\n        [selectedModifiers]=\"annotation().modifiers ?? []\"\n        (selectionChanged)=\"updateModifiers($event)\"\n        (close)=\"isModifierDialogOpen.set(false)\"\n      />\n    </div>\n  }\n  </td>\n\n  <td class=\"action-cell\">\n      <div class=\"action-group\">\n        <button\n            title=\"Toggle observed/excluded\"\n            (click)=\"toggleObserved()\">\n            <svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"currentColor\">\n                <path d=\"M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z\"/>\n            </svg>\n        </button>\n\n        <button\n            color=\"warn\"\n            title=\"Delete annotation\"\n            (click)=\"deleteRequested.emit()\">\n            \uD83D\uDDD1\n        </button>\n    </div>\n  </td>", styles: [":host{display:table-row;--border-color: #e5e7eb;--bg-gray-light: #f9fafb;--text-gray-dark: #374151;--text-gray-muted: #6b7280;--green-bg: #dcfce7;--green-text: #15803d;--red-bg: #fee2e2;--red-text: #b91c1c;--blue-primary: #2563eb;--blue-hover: #1d4ed8;--shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)}.label-cell{position:relative}.dropdown-wrapper{position:relative;display:inline-block}.dropdown-trigger{cursor:pointer;color:#0d6efd;font-weight:500}.dropdown-trigger:hover{text-decoration:underline}.local-context-menu{z-index:1000;margin-bottom:8px;background:#fff;border:1px solid #ced4da;border-radius:6px;box-shadow:0 -4px 12px #0000001a;min-width:260px;max-height:300px;overflow-y:auto}.menu-section-title{background:#f8f9fa;padding:6px 12px;font-weight:700;font-size:11px;text-transform:uppercase;color:#6c757d}.menu-item{padding:4px 6px;font-size:13px;cursor:pointer;list-style:none}.menu-item:hover{background-color:#f1f3f5}td{padding:4px 8px;vertical-align:middle}.modifiers-container{display:flex;flex-wrap:wrap;gap:4px;align-items:center}.modifier-chip{background:#e9ecef;border-radius:12px;padding:1px 6px;font-size:8px;display:inline-flex;align-items:center;gap:4px;max-width:90px}.modifier-chip.more{cursor:help}.remove-mod-btn{border:none;background:transparent;cursor:pointer;font-weight:700;color:#dc3545}.modifier-select,.onset-select{padding:4px;border-radius:4px;border:1px solid #ced4da;font-size:11px}.active-modifiers-preview{display:flex;flex-wrap:wrap;gap:2px;align-items:center;min-height:22px}.badge{padding:.125rem .375rem;border-radius:9999px;font-size:8px;font-weight:700;padding:1px 5px}.badge.badge-green{background:var(--green-bg);color:var(--green-text)}.badge.badge-red{background:var(--red-bg);color:var(--red-text)}.action-group{display:flex;gap:8px;align-items:center}.action-group button{background:none;border:none;cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;border-radius:4px}.action-group button:hover{background-color:#f0f0f0}\n"], dependencies: [{ kind: "component", type: ModifierSelectorComponent, selector: "app-modifier-selector", inputs: ["availableModifiers", "selectedModifiers"], outputs: ["selectionChanged", "close"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "ngmodule", type: FormsModule }, { kind: "component", type: HpoAgeSelectorComponent, selector: "hpo-age-selector", inputs: ["selectedOnset", "size"], outputs: ["onsetChanged"] }, { kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation", "cdkConnectedOverlayUsePopover", "cdkConnectedOverlayMatchWidth", "cdkConnectedOverlay"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoPolishRowComponent, decorators: [{
            type: Component,
            args: [{ selector: 'tr[hpo-polisher-row]', standalone: true, imports: [
                        ModifierSelectorComponent,
                        CommonModule,
                        FormsModule,
                        HpoAgeSelectorComponent,
                        OverlayModule
                    ], template: "  <td class=\"font-mono\">\n      <a (click)=\"termClick.emit(annotation().termId)\" class=\"link-text\">\n      {{ annotation().termId }}\n      </a>\n  </td>\n\n  <td class=\"label-cell\">\n      <div class=\"dropdown-wrapper\">\n      <span \n        cdkOverlayOrigin\n        #trigger=\"cdkOverlayOrigin\"\n        (click)=\"openHierarchyMenu();\" \n        class=\"dropdown-trigger\">\n          {{ annotation().label }} <span class=\"caret\">\u25BC</span>\n      </span>\n        <ng-template\n            cdkConnectedOverlay\n            [cdkConnectedOverlayOrigin]=\"trigger\"\n            [cdkConnectedOverlayOpen]=\"showHierarchyMenu()\"\n            [cdkConnectedOverlayPositions]=\"[{\n                originX: 'start', originY: 'bottom',\n                overlayX: 'start', overlayY: 'top',\n                offsetY: 4\n            }, {\n                originX: 'start', originY: 'top',\n                overlayX: 'start', overlayY: 'bottom',\n                offsetY: -4\n            }]\"\n            (backdropClick)=\"showHierarchyMenu.set(false)\"\n            [cdkConnectedOverlayHasBackdrop]=\"true\"\n            [cdkConnectedOverlayBackdropClass]=\"'cdk-overlay-transparent-backdrop'\">\n          <div class=\"local-context-menu\" (mouseleave)=\"showHierarchyMenu.set(false)\">\n          @if (hierarchy()?.parents?.length) {\n              <div class=\"menu-section-title\">Parents</div>\n              <ul>\n              @for (p of hierarchy()?.parents; track p.termId) {\n                  <li (click)=\"replaceTerm(p);$event.stopPropagation();\" class=\"menu-item\">{{ p.label }} ({{ p.termId }})</li>\n              }\n              </ul>\n          }\n          @if (hierarchy()?.children?.length) {\n              <div class=\"menu-section-title\">Children</div>\n              <ul>\n              @for (c of hierarchy()?.children; track c.termId) {\n                  <li (click)=\"replaceTerm(c)\" class=\"menu-item\">{{ c.label }} ({{ c.termId }})</li>\n              }\n              </ul>\n          }\n          </div>\n      </ng-template>\n      </div>\n  </td>\n\n  <td>\n      <span class=\"badge\" [ngClass]=\"annotation().excluded ?  'badge-red' : 'badge-green'\">\n      {{ annotation().excluded ?  'EXC' : 'OBS' }}\n      </span>\n  </td>\n\n  <td class=\"onset-cell\">\n    <hpo-age-selector\n      size=\"small\"\n      [selectedOnset]=\"annotation().onsetString || null\"\n      (onsetChanged)=\"changeOnset($event)\"\n    />\n  </td>\n\n  <td class=\"modifier-cell\">\n    <div class=\"active-modifiers-preview\" (click)=\"toggleModifierModal()\">\n      @for (mod of annotation().modifiers?.slice(0,2) ?? []; track mod.termId) {\n        <span class=\"modifier-chip\"\n                [title]=\"mod.label\">\n             {{ mod.label.length > 10 ? mod.label.slice(0, 10) + '\u2026' : mod.label }}\n        </span>\n        }\n\n        @if ((annotation().modifiers?.length ?? 0) > 2) {\n        <span\n            class=\"modifier-chip more\"\n            [title]=\"remainingModifierLabels()\">\n            +{{ (annotation().modifiers?.length ?? 0) - 2 }}\n        </span>\n        }\n        <button\n            class=\"annotation-action\"\n            (click)=\"toggleModifierModal(); $event.stopPropagation()\">\n            {{ modifierButtonText() }}\n        </button>\n    </div>\n    @if (isModifierDialogOpen()) {\n    <div class=\"modifier-overlay\">\n      <app-modifier-selector\n        [availableModifiers]=\"availableModifiers()\"\n        [selectedModifiers]=\"annotation().modifiers ?? []\"\n        (selectionChanged)=\"updateModifiers($event)\"\n        (close)=\"isModifierDialogOpen.set(false)\"\n      />\n    </div>\n  }\n  </td>\n\n  <td class=\"action-cell\">\n      <div class=\"action-group\">\n        <button\n            title=\"Toggle observed/excluded\"\n            (click)=\"toggleObserved()\">\n            <svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"currentColor\">\n                <path d=\"M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z\"/>\n            </svg>\n        </button>\n\n        <button\n            color=\"warn\"\n            title=\"Delete annotation\"\n            (click)=\"deleteRequested.emit()\">\n            \uD83D\uDDD1\n        </button>\n    </div>\n  </td>", styles: [":host{display:table-row;--border-color: #e5e7eb;--bg-gray-light: #f9fafb;--text-gray-dark: #374151;--text-gray-muted: #6b7280;--green-bg: #dcfce7;--green-text: #15803d;--red-bg: #fee2e2;--red-text: #b91c1c;--blue-primary: #2563eb;--blue-hover: #1d4ed8;--shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)}.label-cell{position:relative}.dropdown-wrapper{position:relative;display:inline-block}.dropdown-trigger{cursor:pointer;color:#0d6efd;font-weight:500}.dropdown-trigger:hover{text-decoration:underline}.local-context-menu{z-index:1000;margin-bottom:8px;background:#fff;border:1px solid #ced4da;border-radius:6px;box-shadow:0 -4px 12px #0000001a;min-width:260px;max-height:300px;overflow-y:auto}.menu-section-title{background:#f8f9fa;padding:6px 12px;font-weight:700;font-size:11px;text-transform:uppercase;color:#6c757d}.menu-item{padding:4px 6px;font-size:13px;cursor:pointer;list-style:none}.menu-item:hover{background-color:#f1f3f5}td{padding:4px 8px;vertical-align:middle}.modifiers-container{display:flex;flex-wrap:wrap;gap:4px;align-items:center}.modifier-chip{background:#e9ecef;border-radius:12px;padding:1px 6px;font-size:8px;display:inline-flex;align-items:center;gap:4px;max-width:90px}.modifier-chip.more{cursor:help}.remove-mod-btn{border:none;background:transparent;cursor:pointer;font-weight:700;color:#dc3545}.modifier-select,.onset-select{padding:4px;border-radius:4px;border:1px solid #ced4da;font-size:11px}.active-modifiers-preview{display:flex;flex-wrap:wrap;gap:2px;align-items:center;min-height:22px}.badge{padding:.125rem .375rem;border-radius:9999px;font-size:8px;font-weight:700;padding:1px 5px}.badge.badge-green{background:var(--green-bg);color:var(--green-text)}.badge.badge-red{background:var(--red-bg);color:var(--red-text)}.action-group{display:flex;gap:8px;align-items:center}.action-group button{background:none;border:none;cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;border-radius:4px}.action-group button:hover{background-color:#f0f0f0}\n"] }]
        }], propDecorators: { annotation: [{ type: i0.Input, args: [{ isSignal: true, alias: "annotation", required: true }] }, { type: i0.Output, args: ["annotationChange"] }], hierarchyProvider: [{ type: i0.Input, args: [{ isSignal: true, alias: "hierarchyProvider", required: true }] }], availableModifiers: [{ type: i0.Input, args: [{ isSignal: true, alias: "availableModifiers", required: false }] }], updated: [{ type: i0.Output, args: ["updated"] }], deleteRequested: [{ type: i0.Output, args: ["deleteRequested"] }], termClick: [{ type: i0.Output, args: ["termClick"] }] } });

// ontology-autocomplete.component.ts
class OntologyAutocompleteComponent {
    elRef;
    placeholder = input('Search ontology term...', ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    inputString = input('', ...(ngDevMode ? [{ debugName: "inputString" }] : /* istanbul ignore next */ []));
    autocompleteProvider = input.required(...(ngDevMode ? [{ debugName: "autocompleteProvider" }] : /* istanbul ignore next */ []));
    requireConfirmation = input.required(...(ngDevMode ? [{ debugName: "requireConfirmation" }] : /* istanbul ignore next */ []));
    confirmPosition = input('right', ...(ngDevMode ? [{ debugName: "confirmPosition" }] : /* istanbul ignore next */ []));
    selected = output();
    inputElement = viewChild('ontologyInput', ...(ngDevMode ? [{ debugName: "inputElement" }] : /* istanbul ignore next */ []));
    control = new FormControl('', { nonNullable: true });
    // UI State Signals
    isOpen = signal(false, ...(ngDevMode ? [{ debugName: "isOpen" }] : /* istanbul ignore next */ []));
    activeHighlightIndex = signal(-1, ...(ngDevMode ? [{ debugName: "activeHighlightIndex" }] : /* istanbul ignore next */ []));
    activeSelection = signal(null, ...(ngDevMode ? [{ debugName: "activeSelection" }] : /* istanbul ignore next */ []));
    hasValidSelection = computed(() => this.activeSelection() !== null, ...(ngDevMode ? [{ debugName: "hasValidSelection" }] : /* istanbul ignore next */ []));
    constructor(elRef) {
        this.elRef = elRef;
        effect(() => {
            const val = this.inputString();
            const inputRef = this.inputElement();
            if (val && inputRef) {
                this.control.setValue(val, { emitEvent: true });
                setTimeout(() => {
                    inputRef.nativeElement.focus();
                    inputRef.nativeElement.select();
                }, 0);
            }
        });
        // Reset keyboard highlight whenever choices update
        effect(() => {
            this.options();
            this.activeHighlightIndex.set(-1);
        });
        // Automatically clear the input and reset state if the parent clears the inputString
        effect(() => {
            const text = this.inputString();
            if (!text) {
                this.clear(); // Calls your existing clear method inside the autocomplete component
            }
        });
    }
    isValid = toSignal(this.control.valueChanges.pipe(startWith(this.control.value), map(val => {
        const text = typeof val === 'string' ? val.trim() : '';
        // Valid if empty, or if the current text matches the active selection label
        return text === '' || text === this.activeSelection()?.label;
    })), { initialValue: true });
    // Computed error flag for your template
    hasError = computed(() => {
        const text = this.control.value.trim();
        // Show error if there's text typed in, it's touched/dirty, and it doesn't match a selected term
        return text.length > 0 && text !== this.activeSelection()?.label && this.control.touched;
    }, ...(ngDevMode ? [{ debugName: "hasError" }] : /* istanbul ignore next */ []));
    options = toSignal(this.control.valueChanges.pipe(startWith(this.control.value), debounceTime(300), switchMap((value) => {
        const query = typeof value === 'string' ? value.trim() : '';
        if (!query) {
            this.activeSelection.set(null);
            return of([]);
        }
        // If the current input text matches the active selection, don't search
        if (query === this.activeSelection()?.label) {
            return of([]);
        }
        // If the user typed something different than the active selection, 
        // clear the old selection so they can search for a new term!
        if (this.activeSelection() !== null) {
            this.activeSelection.set(null);
        }
        // Perform autocomplete with fenominal!
        if (query.length > 2) {
            return this.autocompleteProvider()(query);
        }
        // fall back
        return of([]);
    })), { initialValue: [] });
    // Close the dropdown cleanly when clicking completely outside the host element
    onDocumentClick(event) {
        if (!this.elRef.nativeElement.contains(event.target)) {
            this.hideDropdown();
        }
    }
    truncatedSelectionLabel = computed(() => {
        const label = this.activeSelection()?.label ?? '';
        return label.length > 20 ? label.slice(0, 20) + '…' : label;
    }, ...(ngDevMode ? [{ debugName: "truncatedSelectionLabel" }] : /* istanbul ignore next */ []));
    showDropdown() {
        this.isOpen.set(true);
    }
    hideDropdown() {
        this.isOpen.set(false);
    }
    selectOption(option) {
        this.activeSelection.set(option);
        this.control.setValue(option.label, { emitEvent: true });
        this.control.markAsPristine();
        if (!this.requireConfirmation()) {
            this.selected.emit(option);
        }
        this.hideDropdown();
    }
    confirmSelection() {
        const current = this.activeSelection();
        if (current) {
            this.selected.emit(current);
            this.clear();
        }
    }
    onKeyDown(event) {
        if (!this.isOpen() || this.options().length === 0)
            return;
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                this.activeHighlightIndex.update(idx => (idx + 1) % this.options().length);
                break;
            case 'ArrowUp':
                event.preventDefault();
                this.activeHighlightIndex.update(idx => (idx - 1 + this.options().length) % this.options().length);
                break;
            case 'Enter':
                event.preventDefault();
                if (this.activeHighlightIndex() >= 0) {
                    this.selectOption(this.options()[this.activeHighlightIndex()]);
                }
                break;
            case 'Escape':
                this.hideDropdown();
                break;
        }
    }
    clear() {
        this.control.setValue('', { emitEvent: false });
        this.control.markAsUntouched();
        this.control.markAsPristine();
        this.control.setErrors(null);
        this.activeSelection.set(null);
        this.activeHighlightIndex.set(-1);
        this.hideDropdown();
        const inputRef = this.inputElement();
        if (inputRef) {
            inputRef.nativeElement.value = '';
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: OntologyAutocompleteComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: OntologyAutocompleteComponent, isStandalone: true, selector: "hpo-ontology-autocomplete", inputs: { placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, inputString: { classPropertyName: "inputString", publicName: "inputString", isSignal: true, isRequired: false, transformFunction: null }, autocompleteProvider: { classPropertyName: "autocompleteProvider", publicName: "autocompleteProvider", isSignal: true, isRequired: true, transformFunction: null }, requireConfirmation: { classPropertyName: "requireConfirmation", publicName: "requireConfirmation", isSignal: true, isRequired: true, transformFunction: null }, confirmPosition: { classPropertyName: "confirmPosition", publicName: "confirmPosition", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { selected: "selected" }, host: { listeners: { "document:click": "onDocumentClick($event)" } }, viewQueries: [{ propertyName: "inputElement", first: true, predicate: ["ontologyInput"], descendants: true, isSignal: true }], ngImport: i0, template: "<div class=\"autocomplete-wrapper\" (clickOutside)=\"hideDropdown()\">\n  <!-- Dynamic container class based on confirmPosition input -->\n  <div class=\"autocomplete-injection-box\" [class.layout-right]=\"confirmPosition() === 'right'\">\n    \n    <div class=\"input-container-wrapper\">\n      <div class=\"input-container\">\n        <input type=\"text\"\n          #ontologyInput\n          [placeholder]=\"placeholder()\"\n          [formControl]=\"control\"\n          [class.error-border]=\"hasError()\"\n          [title]=\"hasError() ? 'Please select a term from the list' : ''\"\n          (focus)=\"showDropdown()\"\n          (keydown)=\"onKeyDown($event)\"\n          spellcheck=\"false\"\n          autocomplete=\"off\"\n          autocorrect=\"off\"\n          autocapitalize=\"off\">\n\n        @if (control.value) {\n          <button type=\"button\" class=\"clear-btn\" aria-label=\"Clear input\" (click)=\"clear()\">\n            <span class=\"close-icon\">&times;</span>\n          </button>\n        }\n      </div>\n\n      <!-- Dropdown Menu -->\n      @if (isOpen() && options().length > 0) {\n        <ul class=\"dropdown-menu\" role=\"listbox\">\n          @for (option of options(); track option.id; let i = $index) {\n            <li \n              role=\"option\"\n              [class.active-highlight]=\"i === activeHighlightIndex()\"\n              [attr.aria-selected]=\"i === activeHighlightIndex()\"\n              (click)=\"selectOption(option)\"\n              (mouseenter)=\"activeHighlightIndex.set(i)\">\n              \n              <div class=\"option-container\">\n                <span class=\"option-matched-text\">{{ option.matchedText }}</span>\n                @if (option.matchedText !== option.label) {\n                  <small class=\"option-primary-label\">Primary: {{ option.label }}</small>\n                }\n                <small class=\"option-id\">{{ option.id }}</small>\n              </div>\n            </li>\n          }\n        </ul>\n      }\n    </div>\n\n    <!-- Confirm Action Section (Rendered inline when position is 'right', or stacked when 'bottom') -->\n    @if (requireConfirmation()) {\n      <div class=\"confirmation-actions\">\n        <button type=\"button\" \n          class=\"confirm-btn btn-workspace-add\" \n          [disabled]=\"!activeSelection()\"\n          (click)=\"confirmSelection()\">\n          <svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"currentColor\">\n            <path d=\"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z\"/>\n          </svg>\n          @if (activeSelection(); as current) {\n            Confirm \"{{ current.label }}\"\n          } @else {\n            Add Term\n          }\n        </button>\n      </div>\n    }\n  </div>\n</div>", styles: [".autocomplete-injection-box{display:flex;flex-direction:column;gap:8px;width:100%}.autocomplete-injection-box.layout-right{flex-direction:row;align-items:center;gap:10px}.autocomplete-injection-box.layout-right .input-container-wrapper{flex:1}.input-container-wrapper{position:relative;width:100%}.input-container input.error-border{border:2px solid #ef4444}.confirmation-actions{display:flex;align-items:center}.btn-workspace-add{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;white-space:nowrap;height:41px}.btn-workspace-add:disabled{opacity:.5;cursor:not-allowed}.autocomplete-wrapper{position:relative;width:100%;font-family:inherit}.input-container{position:relative;display:flex;align-items:center}.input-container input{width:100%;padding:10px 35px 10px 12px;color:#2a66e8;background-color:#fff;font-size:14px;border:1px solid var(--border-color, #ccc);border-radius:4px;outline:none;transition:border-color .2s ease}.input-container input.error-border{border:2px solid #e53935}.input-container input:focus{border-color:#06c;box-shadow:0 0 0 2px #06c3}.clear-btn{position:absolute;right:10px;background:none;border:none;cursor:pointer;font-size:18px;color:#888;padding:0}.clear-btn:hover{color:#333}.dropdown-menu{position:absolute;top:100%;left:0;width:100%;max-height:250px;overflow-y:auto;margin:4px 0 0;padding:0;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 6px #0000001a;list-style:none;z-index:1000}.dropdown-menu li{padding:8px 12px;cursor:pointer}.dropdown-menu li.active-highlight{background-color:#f0f7ff}.option-container{display:flex;flex-direction:column;gap:2px}.option-container .option-matched-text{font-size:14px;color:#333}.option-container .option-primary-label,.option-container .option-id{font-size:11px;color:#666}.error-message{display:block;font-size:12px;color:#dc3545;margin-top:4px}.confirmation-actions{margin-top:12px}.confirmation-actions .confirm-btn{padding:8px 16px;background-color:#06c;color:#fff;border:none;border-radius:4px;cursor:pointer;font-weight:500}.confirmation-actions .confirm-btn:hover{background-color:#0052a3}\n"], dependencies: [{ kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: OntologyAutocompleteComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hpo-ontology-autocomplete', standalone: true, imports: [ReactiveFormsModule] // Complete removal of all Material dependencies
                    , template: "<div class=\"autocomplete-wrapper\" (clickOutside)=\"hideDropdown()\">\n  <!-- Dynamic container class based on confirmPosition input -->\n  <div class=\"autocomplete-injection-box\" [class.layout-right]=\"confirmPosition() === 'right'\">\n    \n    <div class=\"input-container-wrapper\">\n      <div class=\"input-container\">\n        <input type=\"text\"\n          #ontologyInput\n          [placeholder]=\"placeholder()\"\n          [formControl]=\"control\"\n          [class.error-border]=\"hasError()\"\n          [title]=\"hasError() ? 'Please select a term from the list' : ''\"\n          (focus)=\"showDropdown()\"\n          (keydown)=\"onKeyDown($event)\"\n          spellcheck=\"false\"\n          autocomplete=\"off\"\n          autocorrect=\"off\"\n          autocapitalize=\"off\">\n\n        @if (control.value) {\n          <button type=\"button\" class=\"clear-btn\" aria-label=\"Clear input\" (click)=\"clear()\">\n            <span class=\"close-icon\">&times;</span>\n          </button>\n        }\n      </div>\n\n      <!-- Dropdown Menu -->\n      @if (isOpen() && options().length > 0) {\n        <ul class=\"dropdown-menu\" role=\"listbox\">\n          @for (option of options(); track option.id; let i = $index) {\n            <li \n              role=\"option\"\n              [class.active-highlight]=\"i === activeHighlightIndex()\"\n              [attr.aria-selected]=\"i === activeHighlightIndex()\"\n              (click)=\"selectOption(option)\"\n              (mouseenter)=\"activeHighlightIndex.set(i)\">\n              \n              <div class=\"option-container\">\n                <span class=\"option-matched-text\">{{ option.matchedText }}</span>\n                @if (option.matchedText !== option.label) {\n                  <small class=\"option-primary-label\">Primary: {{ option.label }}</small>\n                }\n                <small class=\"option-id\">{{ option.id }}</small>\n              </div>\n            </li>\n          }\n        </ul>\n      }\n    </div>\n\n    <!-- Confirm Action Section (Rendered inline when position is 'right', or stacked when 'bottom') -->\n    @if (requireConfirmation()) {\n      <div class=\"confirmation-actions\">\n        <button type=\"button\" \n          class=\"confirm-btn btn-workspace-add\" \n          [disabled]=\"!activeSelection()\"\n          (click)=\"confirmSelection()\">\n          <svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"currentColor\">\n            <path d=\"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z\"/>\n          </svg>\n          @if (activeSelection(); as current) {\n            Confirm \"{{ current.label }}\"\n          } @else {\n            Add Term\n          }\n        </button>\n      </div>\n    }\n  </div>\n</div>", styles: [".autocomplete-injection-box{display:flex;flex-direction:column;gap:8px;width:100%}.autocomplete-injection-box.layout-right{flex-direction:row;align-items:center;gap:10px}.autocomplete-injection-box.layout-right .input-container-wrapper{flex:1}.input-container-wrapper{position:relative;width:100%}.input-container input.error-border{border:2px solid #ef4444}.confirmation-actions{display:flex;align-items:center}.btn-workspace-add{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;white-space:nowrap;height:41px}.btn-workspace-add:disabled{opacity:.5;cursor:not-allowed}.autocomplete-wrapper{position:relative;width:100%;font-family:inherit}.input-container{position:relative;display:flex;align-items:center}.input-container input{width:100%;padding:10px 35px 10px 12px;color:#2a66e8;background-color:#fff;font-size:14px;border:1px solid var(--border-color, #ccc);border-radius:4px;outline:none;transition:border-color .2s ease}.input-container input.error-border{border:2px solid #e53935}.input-container input:focus{border-color:#06c;box-shadow:0 0 0 2px #06c3}.clear-btn{position:absolute;right:10px;background:none;border:none;cursor:pointer;font-size:18px;color:#888;padding:0}.clear-btn:hover{color:#333}.dropdown-menu{position:absolute;top:100%;left:0;width:100%;max-height:250px;overflow-y:auto;margin:4px 0 0;padding:0;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 6px #0000001a;list-style:none;z-index:1000}.dropdown-menu li{padding:8px 12px;cursor:pointer}.dropdown-menu li.active-highlight{background-color:#f0f7ff}.option-container{display:flex;flex-direction:column;gap:2px}.option-container .option-matched-text{font-size:14px;color:#333}.option-container .option-primary-label,.option-container .option-id{font-size:11px;color:#666}.error-message{display:block;font-size:12px;color:#dc3545;margin-top:4px}.confirmation-actions{margin-top:12px}.confirmation-actions .confirm-btn{padding:8px 16px;background-color:#06c;color:#fff;border:none;border-radius:4px;cursor:pointer;font-weight:500}.confirmation-actions .confirm-btn:hover{background-color:#0052a3}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], inputString: [{ type: i0.Input, args: [{ isSignal: true, alias: "inputString", required: false }] }], autocompleteProvider: [{ type: i0.Input, args: [{ isSignal: true, alias: "autocompleteProvider", required: true }] }], requireConfirmation: [{ type: i0.Input, args: [{ isSignal: true, alias: "requireConfirmation", required: true }] }], confirmPosition: [{ type: i0.Input, args: [{ isSignal: true, alias: "confirmPosition", required: false }] }], selected: [{ type: i0.Output, args: ["selected"] }], inputElement: [{ type: i0.ViewChild, args: ['ontologyInput', { isSignal: true }] }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }] } });

function ui_from_fenominal(hit, id) {
    const ui_hit = {
        id: id,
        termId: hit.termId,
        label: hit.label,
        span: hit.span,
        severity: undefined,
        onset: undefined,
        excluded: hit.excluded,
        modifiers: []
    };
    return ui_hit;
}

function tokenize(text) {
    const tokens = [];
    const re = /[\p{L}\p{N}]+|[^\s\p{L}\p{N}]+|\s+/gu;
    let match;
    while ((match = re.exec(text)) !== null) {
        const raw = match[0];
        const isWhitespace = /^\s+$/u.test(raw);
        const isPunctuation = !isWhitespace && /^[^\p{L}\p{N}]+$/u.test(raw);
        tokens.push({
            text: raw,
            startOffset: match.index,
            endOffset: match.index + raw.length,
            isWhitespace,
            isPunctuation,
        });
    }
    return tokens;
}
class SentenceAnnotationDialogComponent {
    segment = input.required(...(ngDevMode ? [{ debugName: "segment" }] : /* istanbul ignore next */ []));
    autocompleteProvider = input.required(...(ngDevMode ? [{ debugName: "autocompleteProvider" }] : /* istanbul ignore next */ []));
    close = output();
    tokens = signal([], ...(ngDevMode ? [{ debugName: "tokens" }] : /* istanbul ignore next */ []));
    selectedIndices = signal(new Set(), ...(ngDevMode ? [{ debugName: "selectedIndices" }] : /* istanbul ignore next */ []));
    chosenTerm = signal(null, ...(ngDevMode ? [{ debugName: "chosenTerm" }] : /* istanbul ignore next */ []));
    isDragging = signal(false, ...(ngDevMode ? [{ debugName: "isDragging" }] : /* istanbul ignore next */ []));
    dragStartIndex = signal(null, ...(ngDevMode ? [{ debugName: "dragStartIndex" }] : /* istanbul ignore next */ []));
    constructor() {
        effect(() => {
            this.tokens.set(tokenize(this.segment().text));
        });
    }
    selectedText = computed(() => {
        const idxs = [...this.selectedIndices()].sort((a, b) => a - b);
        if (idxs.length === 0)
            return '';
        const toks = this.tokens();
        return toks
            .slice(idxs[0], idxs[idxs.length - 1] + 1)
            .map((t) => t.text)
            .join('');
    }, ...(ngDevMode ? [{ debugName: "selectedText" }] : /* istanbul ignore next */ []));
    handleAutocompleteSelection(match) {
        this.chosenTerm.set(match);
        this.confirm();
    }
    textSegment(text, start, end) {
        return { kind: 'text', text, span: { start, end } };
    }
    hitSegment(text, match, start, end) {
        const hit = {
            termId: match.id,
            label: match.label,
            span: { start, end },
            excluded: false,
        };
        return { kind: 'hit', text, hit };
    }
    confirm() {
        // Use the signal inputs
        const seg = this.segment();
        const idxs = [...this.selectedIndices()].sort((a, b) => a - b);
        const toks = this.tokens();
        const segStart = seg.span.start;
        const match = this.chosenTerm();
        const result = [];
        const firstTok = toks[idxs[0]];
        const lastTok = toks[idxs[idxs.length - 1]];
        if (firstTok.startOffset > 0) {
            result.push(this.textSegment(seg.text.slice(0, firstTok.startOffset), segStart, segStart + firstTok.startOffset));
        }
        result.push(this.hitSegment(seg.text.slice(firstTok.startOffset, lastTok.endOffset), match, segStart + firstTok.startOffset, segStart + lastTok.endOffset));
        if (lastTok.endOffset < seg.text.length) {
            result.push(this.textSegment(seg.text.slice(lastTok.endOffset), segStart + lastTok.endOffset, seg.span.end));
        }
        this.close.emit(result);
    }
    cancel() {
        this.close.emit(null);
    }
    onWordMouseDown(index, event) {
        const tok = this.tokens()[index];
        if (tok.isWhitespace || tok.isPunctuation)
            return;
        event.preventDefault(); // avoid native text selection while dragging
        this.isDragging.set(true);
        this.dragStartIndex.set(index);
        this.selectedIndices.set(new Set([index]));
        this.chosenTerm.set(null);
    }
    onWordMouseEnter(index) {
        if (!this.isDragging())
            return;
        const start = this.dragStartIndex();
        if (start === null)
            return;
        const [lo, hi] = start <= index ? [start, index] : [index, start];
        const toks = this.tokens();
        // Collect all non-whitespace tokens in the dragged range.
        let indices = [];
        for (let i = lo; i <= hi; i++) {
            if (!toks[i].isWhitespace)
                indices.push(i);
        }
        // Trim leading/trailing punctuation so a mark never begins or ends
        // on a punctuation token, even if the drag physically covers one.
        let s = 0;
        let e = indices.length - 1;
        while (s <= e && toks[indices[s]].isPunctuation)
            s++;
        while (e >= s && toks[indices[e]].isPunctuation)
            e--;
        indices = indices.slice(s, e + 1);
        this.selectedIndices.set(new Set(indices));
    }
    onMouseUp() {
        this.isDragging.set(false);
        this.dragStartIndex.set(null);
    }
    clearSelection() {
        this.selectedIndices.set(new Set());
        this.chosenTerm.set(null);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: SentenceAnnotationDialogComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: SentenceAnnotationDialogComponent, isStandalone: true, selector: "app-sentence-annotation-dialog", inputs: { segment: { classPropertyName: "segment", publicName: "segment", isSignal: true, isRequired: true, transformFunction: null }, autocompleteProvider: { classPropertyName: "autocompleteProvider", publicName: "autocompleteProvider", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { close: "close" }, host: { listeners: { "document:mouseup": "onMouseUp()" } }, ngImport: i0, template: "<div class=\"manual-annotation-dialog\">\n  <div class=\"dialog-header\">\n    <h2>Manual HPO Annotation</h2>\n  </div>\n\n  <div class=\"dialog-body\">\n    <p class=\"dialog-hint\">Mark words to select the span that matches an HPO term.</p>\n\n    <div class=\"word-picker\" [class.is-dragging]=\"isDragging()\" (mouseleave)=\"onMouseUp()\">\n      @for (tok of tokens(); track $index) {\n        @if (tok.isWhitespace) {\n          <span class=\"word-space\">{{ tok.text }}</span>\n        } @else if (tok.isPunctuation) {\n          <span\n            class=\"word-token punctuation-token\"\n            [class.selected]=\"selectedIndices().has($index)\"\n            (mouseenter)=\"onWordMouseEnter($index)\"\n            >{{ tok.text }}</span\n          >\n        } @else {\n          <span\n            class=\"word-token\"\n            [class.selected]=\"selectedIndices().has($index)\"\n            (mousedown)=\"onWordMouseDown($index, $event)\"\n            (mouseenter)=\"onWordMouseEnter($index)\"\n          >\n            {{ tok.text }}</span\n          >\n        }\n      }\n    </div>\n<div class=\"selection-section\" [class.has-selection]=\"selectedText()\">\n    @if (selectedText() && !isDragging()) {\n      <p class=\"selected-preview\">\n        Selected: <strong>{{ selectedText() }}</strong>\n      </p>\n    } @else {\n        <p class=\"selected-preview placeholder-text\">\n          <em>Highlight text above to search for matching HPO terms...</em>\n        </p>\n      }\n       <hpo-ontology-autocomplete\n        [inputString]=\"selectedText()\"\n        [autocompleteProvider]=\"autocompleteProvider()\"\n        [requireConfirmation]=\"true\"\n        (selected)=\"handleAutocompleteSelection($event)\"\n      >\n      </hpo-ontology-autocomplete>\n  </div>\n\n  <div class=\"dialog-footer\">\n    @if (selectedIndices().size > 0) {\n      <button class=\"btn-outline-cancel\" (click)=\"clearSelection()\">Clear selection</button>\n    }\n    <button class=\"btn-outline-cancel\" (click)=\"cancel()\">Cancel</button>\n  </div>\n</div>\n", styles: [":host{display:flex;flex-direction:column;height:100%;width:100%}.manual-annotation-dialog{display:flex;flex-direction:column;height:100%;width:100%;background:#fff;box-sizing:border-box}.dialog-header{padding:16px 24px;border-bottom:1px solid #e2e8f0;display:flex;flex-shrink:0}.dialog-header h2{margin:0;font-size:1.25rem;font-weight:600}.dialog-body{padding:24px;flex:1 1 auto;overflow-y:auto;min-height:0}.dialog-footer{padding:16px 24px;border-top:1px solid #e2e8f0;display:flex;justify-content:flex-end;gap:8px;flex-shrink:0}.dialog-hint{margin:0 0 12px;font-size:.85rem;color:#64748b}.word-picker{display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 0;padding:12px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;line-height:1.6;-webkit-user-select:none;user-select:none}.word-picker.is-dragging{cursor:crosshair}.word-space{white-space:pre}.word-token{cursor:pointer;padding:1px 4px;border-radius:4px;transition:background-color .1s ease,color .1s ease}.word-token:hover{background:#e2e8f0}.word-token.selected{background-color:#bae6fd;color:#0369a1;font-weight:500}.selected-preview{margin:16px 0 8px;font-size:.85rem;color:#475569}.selected-preview strong{color:#0f172a}mat-dialog-content{max-height:60vh;overflow-y:auto}hpo-ontology-autocomplete{display:block;margin-top:8px}\n"], dependencies: [{ kind: "component", type: OntologyAutocompleteComponent, selector: "hpo-ontology-autocomplete", inputs: ["placeholder", "inputString", "autocompleteProvider", "requireConfirmation", "confirmPosition"], outputs: ["selected"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: SentenceAnnotationDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-sentence-annotation-dialog', standalone: true, imports: [OntologyAutocompleteComponent], template: "<div class=\"manual-annotation-dialog\">\n  <div class=\"dialog-header\">\n    <h2>Manual HPO Annotation</h2>\n  </div>\n\n  <div class=\"dialog-body\">\n    <p class=\"dialog-hint\">Mark words to select the span that matches an HPO term.</p>\n\n    <div class=\"word-picker\" [class.is-dragging]=\"isDragging()\" (mouseleave)=\"onMouseUp()\">\n      @for (tok of tokens(); track $index) {\n        @if (tok.isWhitespace) {\n          <span class=\"word-space\">{{ tok.text }}</span>\n        } @else if (tok.isPunctuation) {\n          <span\n            class=\"word-token punctuation-token\"\n            [class.selected]=\"selectedIndices().has($index)\"\n            (mouseenter)=\"onWordMouseEnter($index)\"\n            >{{ tok.text }}</span\n          >\n        } @else {\n          <span\n            class=\"word-token\"\n            [class.selected]=\"selectedIndices().has($index)\"\n            (mousedown)=\"onWordMouseDown($index, $event)\"\n            (mouseenter)=\"onWordMouseEnter($index)\"\n          >\n            {{ tok.text }}</span\n          >\n        }\n      }\n    </div>\n<div class=\"selection-section\" [class.has-selection]=\"selectedText()\">\n    @if (selectedText() && !isDragging()) {\n      <p class=\"selected-preview\">\n        Selected: <strong>{{ selectedText() }}</strong>\n      </p>\n    } @else {\n        <p class=\"selected-preview placeholder-text\">\n          <em>Highlight text above to search for matching HPO terms...</em>\n        </p>\n      }\n       <hpo-ontology-autocomplete\n        [inputString]=\"selectedText()\"\n        [autocompleteProvider]=\"autocompleteProvider()\"\n        [requireConfirmation]=\"true\"\n        (selected)=\"handleAutocompleteSelection($event)\"\n      >\n      </hpo-ontology-autocomplete>\n  </div>\n\n  <div class=\"dialog-footer\">\n    @if (selectedIndices().size > 0) {\n      <button class=\"btn-outline-cancel\" (click)=\"clearSelection()\">Clear selection</button>\n    }\n    <button class=\"btn-outline-cancel\" (click)=\"cancel()\">Cancel</button>\n  </div>\n</div>\n", styles: [":host{display:flex;flex-direction:column;height:100%;width:100%}.manual-annotation-dialog{display:flex;flex-direction:column;height:100%;width:100%;background:#fff;box-sizing:border-box}.dialog-header{padding:16px 24px;border-bottom:1px solid #e2e8f0;display:flex;flex-shrink:0}.dialog-header h2{margin:0;font-size:1.25rem;font-weight:600}.dialog-body{padding:24px;flex:1 1 auto;overflow-y:auto;min-height:0}.dialog-footer{padding:16px 24px;border-top:1px solid #e2e8f0;display:flex;justify-content:flex-end;gap:8px;flex-shrink:0}.dialog-hint{margin:0 0 12px;font-size:.85rem;color:#64748b}.word-picker{display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 0;padding:12px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;line-height:1.6;-webkit-user-select:none;user-select:none}.word-picker.is-dragging{cursor:crosshair}.word-space{white-space:pre}.word-token{cursor:pointer;padding:1px 4px;border-radius:4px;transition:background-color .1s ease,color .1s ease}.word-token:hover{background:#e2e8f0}.word-token.selected{background-color:#bae6fd;color:#0369a1;font-weight:500}.selected-preview{margin:16px 0 8px;font-size:.85rem;color:#475569}.selected-preview strong{color:#0f172a}mat-dialog-content{max-height:60vh;overflow-y:auto}hpo-ontology-autocomplete{display:block;margin-top:8px}\n"] }]
        }], ctorParameters: () => [], propDecorators: { segment: [{ type: i0.Input, args: [{ isSignal: true, alias: "segment", required: true }] }], autocompleteProvider: [{ type: i0.Input, args: [{ isSignal: true, alias: "autocompleteProvider", required: true }] }], close: [{ type: i0.Output, args: ["close"] }], onMouseUp: [{
                type: HostListener,
                args: ['document:mouseup']
            }] } });

class TextMiningContainerComponent {
    dialogRef;
    notificationService = inject(NotificationService);
    selectedSentence = signal(null, ...(ngDevMode ? [{ debugName: "selectedSentence" }] : /* istanbul ignore next */ []));
    selectedSegment = signal(null, ...(ngDevMode ? [{ debugName: "selectedSegment" }] : /* istanbul ignore next */ []));
    selectedIndex = signal(null, ...(ngDevMode ? [{ debugName: "selectedIndex" }] : /* istanbul ignore next */ []));
    sentences = input([], ...(ngDevMode ? [{ debugName: "sentences" }] : /* istanbul ignore next */ []));
    deleteHitRequested = output();
    autocompleteProvider = input.required(...(ngDevMode ? [{ debugName: "autocompleteProvider" }] : /* istanbul ignore next */ []));
    segmentsReplaced = output();
    /* Show sentences above this index in collapsed mode to save space */
    collapsedUntilIndex = signal(null, ...(ngDevMode ? [{ debugName: "collapsedUntilIndex" }] : /* istanbul ignore next */ []));
    collapseUpTo(sentenceStart) {
        this.collapsedUntilIndex.set(sentenceStart);
    }
    /** Resets layout back to the full text mapping */
    resetCollapse() {
        this.collapsedUntilIndex.set(null);
    }
    isSentenceCollapsed(sentenceStart) {
        const cutoff = this.collapsedUntilIndex();
        if (cutoff === null)
            return false;
        return sentenceStart <= cutoff;
    }
    deleteHit(sentence, hit) {
        this.deleteHitRequested.emit({
            sentenceStart: sentence.start,
            hit,
        });
    }
    openManualAnnotationDialog(sentence, segmentIndex) {
        const segment = sentence.segments[segmentIndex];
        if (segment.kind !== 'text')
            return;
        this.selectedSentence.set(sentence);
        this.selectedIndex.set(segmentIndex);
        this.selectedSegment.set(segment);
        this.dialogRef.nativeElement.showModal();
    }
    handleDialogResult(result) {
        this.dialogRef.nativeElement.close();
        const sentence = this.selectedSentence();
        const idx = this.selectedIndex();
        this.selectedSentence.set(null);
        this.selectedIndex.set(null);
        if (!result) {
            return;
        }
        if (!sentence || idx === null) {
            this.notificationService.showError("Could not retrieve sentence context for annotation.");
            return;
        }
        this.segmentsReplaced.emit({
            sentence,
            segmentIndex: idx,
            newSegments: result,
        });
    }
    punctuationOnlyPattern = /^[\p{P}\p{S}\s]+$/u;
    isPunctuationOnly(text) {
        return this.punctuationOnlyPattern.test(text);
    }
    getTooltipText(hit) {
        return `ID: ${hit.termId}\nSpan: [${hit.span.start}, ${hit.span.end}]`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: TextMiningContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: TextMiningContainerComponent, isStandalone: true, selector: "hpo-text-mining-container", inputs: { sentences: { classPropertyName: "sentences", publicName: "sentences", isSignal: true, isRequired: false, transformFunction: null }, autocompleteProvider: { classPropertyName: "autocompleteProvider", publicName: "autocompleteProvider", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { deleteHitRequested: "deleteHitRequested", segmentsReplaced: "segmentsReplaced" }, viewQueries: [{ propertyName: "dialogRef", first: true, predicate: ["annotationDialog"], descendants: true }], ngImport: i0, template: "<div class=\"text-mining-workspace\">\n  \n  @for (sentence of sentences(); track sentence.start) {\n    <span class=\"sentence-row\" [class.is-collapsed-view]=\"isSentenceCollapsed(sentence.start)\">\n      \n      @if (isSentenceCollapsed(sentence.start)) {\n        <span class=\"compact-token-line\">\n          @for (segment of sentence.segments; track $index) {\n            @if (segment.kind === 'hit') {\n              <span \n              class=\"annotation-badge compact-token\" \n              [class.is-excluded]=\"segment.hit?.excluded\" \n              [attr.title]=\"getTooltipText(segment.hit)\">\n                <span class=\"annotated-text\">{{ segment.text }}</span>\n              </span>\n            }\n          }\n        </span>\n      } @else {\n        <span class=\"sentence-line\">\n          @for (segment of sentence.segments; track $index) {\n            @if (segment.kind === 'text') {\n              <span class=\"plain-text\">{{ segment.text }}</span>\n              @if (!isPunctuationOnly(segment.text)) {\n                <button\n                  class=\"manual-annotate-btn\"\n                  (click)=\"openManualAnnotationDialog(sentence, $index)\"\n                  title=\"Manually add HPO term\"\n                  aria-label=\"Manually add HPO term\">\n                  <svg viewBox=\"0 0 24 24\" width=\"14\" height=\"14\" fill=\"currentColor\">\n                    <path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z\"/>\n                  </svg>\n                </button>\n              }\n            } @else if (segment.kind === 'hit') {\n              <span \n                class=\"annotation-badge\"\n                [class.is-excluded]=\"segment.hit?.excluded\"\n                [attr.data-term-id]=\"segment.hit.termId\"\n                [attr.title]=\"getTooltipText(segment.hit)\">\n                <span class=\"annotated-text\">{{ segment.text }}</span>\n                  <span class=\"badge-overlay-controls\">\n                  <button class=\"collapse-above-btn\" (click)=\"collapseUpTo(sentence.start); $event.stopPropagation()\" title=\"Collapse all text above this line\">\n                    Collapse Above\n                  </button>\n                </span>\n                <button\n                  class=\"delete-hit-icon\"\n                  (click)=\"deleteHit(sentence, segment.hit); $event.stopPropagation()\"\n                  title=\"Delete annotation\">x</button>\n              </span>\n            }\n          }\n        </span>\n      }\n\n    </span>\n  }\n\n  @if (collapsedUntilIndex() !== null) {\n    <button class=\"reset-view-btn\" (click)=\"resetCollapse()\">Show Full Document</button>\n  }\n\n  <dialog #annotationDialog class=\"hpo-annotation-dialog\">\n    @if (selectedSentence(); as sentence) {\n    @let segment = sentence.segments[selectedIndex()!];\n    \n    @if (segment.kind === 'text') {\n      <app-sentence-annotation-dialog\n        [segment]=\"segment\"\n        [autocompleteProvider]=\"autocompleteProvider()\"\n        (close)=\"handleDialogResult($event)\">\n      </app-sentence-annotation-dialog>\n    }\n  }\n  </dialog>\n</div>", styles: [":host{display:flex;flex-direction:column;height:100%;width:100%;overflow:hidden}.text-mining-workspace{line-height:1.35;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;padding:12px;background:#fff}.sentence-row{display:inline;transition:opacity .2s ease}.sentence-row.is-collapsed-view{opacity:.6;border-left:2px solid #e2e8f0;padding-left:8px}.sentence-row+.sentence-row:before{content:\" \"}.compact-token-line{display:inline-flex;flex-wrap:wrap;gap:4px}.compact-token-line .compact-token{font-size:.75rem;padding:1px 4px;background-color:#f1f5f9;color:#475569;border-bottom:none;cursor:default}.badge-overlay-controls{display:none;position:absolute;top:-22px;left:50%;transform:translate(-50%);background:#0f172a;color:#fff;padding:2px 4px;border-radius:4px;align-items:center;gap:4px;z-index:50;white-space:nowrap;box-shadow:0 2px 8px -1px #00000040}.badge-overlay-controls:before{content:\"\";position:absolute;bottom:-8px;left:0;width:100%;height:8px;background:transparent}.annotation-badge-pill{position:relative;display:inline-flex;align-items:center;justify-content:center;font-weight:500;padding:2px 22px 2px 8px;border-radius:12px;margin:0 4px;line-height:1.2;background-color:#e0f2fe;color:#0369a1}.annotation-badge-pill .annotated-text{padding-right:18px}.annotation-badge-pill.is-excluded{background-color:#fee2e2;color:#b91c1c}.annotation-badge-pill .delete-hit-icon{position:absolute;right:4px;width:14px;height:14px;display:flex;align-items:center;justify-content:center;background:transparent;border:1px solid #b91c1c;color:#b91c1c;border-radius:50%;font-size:9px;font-weight:900;cursor:pointer;padding:0;margin:0;transition:all .2s ease}.annotation-badge-pill .delete-hit-icon:hover{background:#b91c1c;color:#fff}.annotation-badge-pill .delete-hit-icon:focus-visible{outline:2px solid currentColor;outline-offset:1px;opacity:1}.annotation-badge-pill .badge-overlay-controls{display:none}.reset-view-btn{display:block;margin-top:16px;background:#fff;border:1px solid #cbd5e1;color:#64748b;font-size:.75rem;font-weight:500;padding:4px 12px;border-radius:6px;cursor:pointer;transition:all .1s ease}.reset-view-btn:hover{background:#f8fafc;color:#334155;border-color:#94a3b8}.sentence-line{margin:0;display:inline}.plain-text{color:#334155;white-space:normal}.annotation-badge{position:relative;display:inline;background-color:#e0f2fe;color:#0369a1;padding:2px 0;border-radius:2px;box-decoration-break:clone;-webkit-box-decoration-break:clone;cursor:help}.annotation-badge:hover{background-color:#bae6fd}.annotation-badge:hover .badge-overlay-controls{display:inline-flex}.annotation-badge.is-excluded{background-color:#fee2e2;color:#b91c1c}.annotation-badge.is-excluded .annotated-text{text-decoration:line-through}.annotated-text{font-weight:500}.badge-overlay-controls{display:none;position:absolute;top:-24px;left:50%;transform:translate(-50%);background:#0f172a;color:#fff;padding:2px 4px;border-radius:4px;align-items:center;gap:4px;z-index:20;box-shadow:0 4px 6px -1px #00000026;white-space:nowrap}.badge-overlay-controls .span-handle{font-size:.6rem;color:#38bdf8;cursor:pointer;padding:0 2px;-webkit-user-select:none;user-select:none}.badge-overlay-controls .span-handle:hover{color:#bae6fd}.badge-overlay-controls .shift-btn{background:transparent;border:none;color:#fff;font-size:.65rem;cursor:pointer;padding:0 2px}.badge-overlay-controls .shift-btn:hover{color:#38bdf8}.manual-annotate-btn{background:none;border:none;cursor:pointer;padding:0 4px;display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;color:#64748b;transition:all .2s ease;border-radius:50%}.manual-annotate-btn:hover{color:#2563eb;background-color:#f1f5f9}.manual-annotate-btn svg{display:block}.hpo-annotation-dialog{padding:0;border:none;border-radius:8px;width:750px;height:400px;max-height:600px;overflow:hidden;box-shadow:0 20px 25px -5px #0000001a}.hpo-annotation-dialog::backdrop{background:#0006}.dialog-container{display:flex;flex-direction:column;max-height:90vh}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: SentenceAnnotationDialogComponent, selector: "app-sentence-annotation-dialog", inputs: ["segment", "autocompleteProvider"], outputs: ["close"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: TextMiningContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hpo-text-mining-container', standalone: true, imports: [CommonModule, SentenceAnnotationDialogComponent], template: "<div class=\"text-mining-workspace\">\n  \n  @for (sentence of sentences(); track sentence.start) {\n    <span class=\"sentence-row\" [class.is-collapsed-view]=\"isSentenceCollapsed(sentence.start)\">\n      \n      @if (isSentenceCollapsed(sentence.start)) {\n        <span class=\"compact-token-line\">\n          @for (segment of sentence.segments; track $index) {\n            @if (segment.kind === 'hit') {\n              <span \n              class=\"annotation-badge compact-token\" \n              [class.is-excluded]=\"segment.hit?.excluded\" \n              [attr.title]=\"getTooltipText(segment.hit)\">\n                <span class=\"annotated-text\">{{ segment.text }}</span>\n              </span>\n            }\n          }\n        </span>\n      } @else {\n        <span class=\"sentence-line\">\n          @for (segment of sentence.segments; track $index) {\n            @if (segment.kind === 'text') {\n              <span class=\"plain-text\">{{ segment.text }}</span>\n              @if (!isPunctuationOnly(segment.text)) {\n                <button\n                  class=\"manual-annotate-btn\"\n                  (click)=\"openManualAnnotationDialog(sentence, $index)\"\n                  title=\"Manually add HPO term\"\n                  aria-label=\"Manually add HPO term\">\n                  <svg viewBox=\"0 0 24 24\" width=\"14\" height=\"14\" fill=\"currentColor\">\n                    <path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z\"/>\n                  </svg>\n                </button>\n              }\n            } @else if (segment.kind === 'hit') {\n              <span \n                class=\"annotation-badge\"\n                [class.is-excluded]=\"segment.hit?.excluded\"\n                [attr.data-term-id]=\"segment.hit.termId\"\n                [attr.title]=\"getTooltipText(segment.hit)\">\n                <span class=\"annotated-text\">{{ segment.text }}</span>\n                  <span class=\"badge-overlay-controls\">\n                  <button class=\"collapse-above-btn\" (click)=\"collapseUpTo(sentence.start); $event.stopPropagation()\" title=\"Collapse all text above this line\">\n                    Collapse Above\n                  </button>\n                </span>\n                <button\n                  class=\"delete-hit-icon\"\n                  (click)=\"deleteHit(sentence, segment.hit); $event.stopPropagation()\"\n                  title=\"Delete annotation\">x</button>\n              </span>\n            }\n          }\n        </span>\n      }\n\n    </span>\n  }\n\n  @if (collapsedUntilIndex() !== null) {\n    <button class=\"reset-view-btn\" (click)=\"resetCollapse()\">Show Full Document</button>\n  }\n\n  <dialog #annotationDialog class=\"hpo-annotation-dialog\">\n    @if (selectedSentence(); as sentence) {\n    @let segment = sentence.segments[selectedIndex()!];\n    \n    @if (segment.kind === 'text') {\n      <app-sentence-annotation-dialog\n        [segment]=\"segment\"\n        [autocompleteProvider]=\"autocompleteProvider()\"\n        (close)=\"handleDialogResult($event)\">\n      </app-sentence-annotation-dialog>\n    }\n  }\n  </dialog>\n</div>", styles: [":host{display:flex;flex-direction:column;height:100%;width:100%;overflow:hidden}.text-mining-workspace{line-height:1.35;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;padding:12px;background:#fff}.sentence-row{display:inline;transition:opacity .2s ease}.sentence-row.is-collapsed-view{opacity:.6;border-left:2px solid #e2e8f0;padding-left:8px}.sentence-row+.sentence-row:before{content:\" \"}.compact-token-line{display:inline-flex;flex-wrap:wrap;gap:4px}.compact-token-line .compact-token{font-size:.75rem;padding:1px 4px;background-color:#f1f5f9;color:#475569;border-bottom:none;cursor:default}.badge-overlay-controls{display:none;position:absolute;top:-22px;left:50%;transform:translate(-50%);background:#0f172a;color:#fff;padding:2px 4px;border-radius:4px;align-items:center;gap:4px;z-index:50;white-space:nowrap;box-shadow:0 2px 8px -1px #00000040}.badge-overlay-controls:before{content:\"\";position:absolute;bottom:-8px;left:0;width:100%;height:8px;background:transparent}.annotation-badge-pill{position:relative;display:inline-flex;align-items:center;justify-content:center;font-weight:500;padding:2px 22px 2px 8px;border-radius:12px;margin:0 4px;line-height:1.2;background-color:#e0f2fe;color:#0369a1}.annotation-badge-pill .annotated-text{padding-right:18px}.annotation-badge-pill.is-excluded{background-color:#fee2e2;color:#b91c1c}.annotation-badge-pill .delete-hit-icon{position:absolute;right:4px;width:14px;height:14px;display:flex;align-items:center;justify-content:center;background:transparent;border:1px solid #b91c1c;color:#b91c1c;border-radius:50%;font-size:9px;font-weight:900;cursor:pointer;padding:0;margin:0;transition:all .2s ease}.annotation-badge-pill .delete-hit-icon:hover{background:#b91c1c;color:#fff}.annotation-badge-pill .delete-hit-icon:focus-visible{outline:2px solid currentColor;outline-offset:1px;opacity:1}.annotation-badge-pill .badge-overlay-controls{display:none}.reset-view-btn{display:block;margin-top:16px;background:#fff;border:1px solid #cbd5e1;color:#64748b;font-size:.75rem;font-weight:500;padding:4px 12px;border-radius:6px;cursor:pointer;transition:all .1s ease}.reset-view-btn:hover{background:#f8fafc;color:#334155;border-color:#94a3b8}.sentence-line{margin:0;display:inline}.plain-text{color:#334155;white-space:normal}.annotation-badge{position:relative;display:inline;background-color:#e0f2fe;color:#0369a1;padding:2px 0;border-radius:2px;box-decoration-break:clone;-webkit-box-decoration-break:clone;cursor:help}.annotation-badge:hover{background-color:#bae6fd}.annotation-badge:hover .badge-overlay-controls{display:inline-flex}.annotation-badge.is-excluded{background-color:#fee2e2;color:#b91c1c}.annotation-badge.is-excluded .annotated-text{text-decoration:line-through}.annotated-text{font-weight:500}.badge-overlay-controls{display:none;position:absolute;top:-24px;left:50%;transform:translate(-50%);background:#0f172a;color:#fff;padding:2px 4px;border-radius:4px;align-items:center;gap:4px;z-index:20;box-shadow:0 4px 6px -1px #00000026;white-space:nowrap}.badge-overlay-controls .span-handle{font-size:.6rem;color:#38bdf8;cursor:pointer;padding:0 2px;-webkit-user-select:none;user-select:none}.badge-overlay-controls .span-handle:hover{color:#bae6fd}.badge-overlay-controls .shift-btn{background:transparent;border:none;color:#fff;font-size:.65rem;cursor:pointer;padding:0 2px}.badge-overlay-controls .shift-btn:hover{color:#38bdf8}.manual-annotate-btn{background:none;border:none;cursor:pointer;padding:0 4px;display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;color:#64748b;transition:all .2s ease;border-radius:50%}.manual-annotate-btn:hover{color:#2563eb;background-color:#f1f5f9}.manual-annotate-btn svg{display:block}.hpo-annotation-dialog{padding:0;border:none;border-radius:8px;width:750px;height:400px;max-height:600px;overflow:hidden;box-shadow:0 20px 25px -5px #0000001a}.hpo-annotation-dialog::backdrop{background:#0006}.dialog-container{display:flex;flex-direction:column;max-height:90vh}\n"] }]
        }], propDecorators: { dialogRef: [{
                type: ViewChild,
                args: ['annotationDialog']
            }], sentences: [{ type: i0.Input, args: [{ isSignal: true, alias: "sentences", required: false }] }], deleteHitRequested: [{ type: i0.Output, args: ["deleteHitRequested"] }], autocompleteProvider: [{ type: i0.Input, args: [{ isSignal: true, alias: "autocompleteProvider", required: true }] }], segmentsReplaced: [{ type: i0.Output, args: ["segmentsReplaced"] }] } });

class HpoPolishingWorkspaceComponent {
    notificationService = inject(NotificationService);
    sentences = input([], ...(ngDevMode ? [{ debugName: "sentences" }] : /* istanbul ignore next */ []));
    // relay change signal to data owner outside of the library
    segmentsReplaced = output();
    availableModifiers = input([], ...(ngDevMode ? [{ debugName: "availableModifiers" }] : /* istanbul ignore next */ []));
    hierarchyProvider = input.required(...(ngDevMode ? [{ debugName: "hierarchyProvider" }] : /* istanbul ignore next */ []));
    autocompleteProvider = input.required(...(ngDevMode ? [{ debugName: "autocompleteProvider" }] : /* istanbul ignore next */ []));
    activeTermId = signal(null, ...(ngDevMode ? [{ debugName: "activeTermId" }] : /* istanbul ignore next */ []));
    complete = output();
    cancel = output();
    badgeMoved = output();
    localSentences = signal([], ...(ngDevMode ? [{ debugName: "localSentences" }] : /* istanbul ignore next */ []));
    // Autocomplete variables
    hpoInputString = '';
    selectedHpoMatch = signal(null, ...(ngDevMode ? [{ debugName: "selectedHpoMatch" }] : /* istanbul ignore next */ []));
    // Computed state to extract unique table annotations dynamically from sentence arrays
    // TODO check if there are conflicting UiHits, e.g., observed/excluded
    uniqueTableAnnotations = computed(() => {
        const uniqueMap = new Map();
        for (const sentence of this.localSentences()) {
            for (const segment of sentence.segments) {
                if (segment.kind === 'hit') {
                    const uiHit = segment.hit;
                    if (!uniqueMap.has(uiHit.termId)) {
                        uniqueMap.set(uiHit.termId, {
                            termId: uiHit.termId,
                            label: uiHit.label,
                            excluded: uiHit.excluded,
                            onsetString: uiHit.onset,
                            modifiers: uiHit.modifiers || []
                        });
                    }
                }
            }
        }
        return Array.from(uniqueMap.values());
    }, ...(ngDevMode ? [{ debugName: "uniqueTableAnnotations" }] : /* istanbul ignore next */ []));
    hasInitialized = false;
    constructor() {
        effect(() => {
            // convert from FenominalSentence to UiFenominalSentence
            const rawSentences = this.sentences();
            if (rawSentences && rawSentences.length > 0 && !this.hasInitialized) {
                const uiSentences = rawSentences.map((s, sIdx) => ({
                    start: s.start,
                    originalText: s.originalText,
                    segments: s.segments.map((seg, segIdx) => {
                        if (seg.kind === 'hit') {
                            const trackingId = `hit-${sIdx}-${segIdx}-${seg.hit.termId}`;
                            return {
                                kind: 'hit',
                                text: seg.text,
                                hit: ui_from_fenominal(seg.hit, trackingId)
                            };
                        }
                        return seg;
                    })
                }));
                this.localSentences.set(uiSentences);
                this.hasInitialized = true; // Prevents subsequent internal mutations from being overwritten
            }
        });
    }
    handleAnnotationUpdate(oldItem, newItem) {
        console.log('update fired', { oldTermId: oldItem.termId, newItem });
        this.localSentences.update(sentences => {
            let matched = 0;
            const next = sentences.map(sentence => ({
                ...sentence,
                segments: sentence.segments.map(segment => {
                    if (segment.kind === 'hit' && segment.hit.termId === oldItem.termId) {
                        matched++;
                        return { ...segment, hit: { ...segment.hit, termId: newItem.termId, label: newItem.label, excluded: newItem.excluded, onset: newItem.onsetString, modifiers: newItem.modifiers } };
                    }
                    return segment;
                })
            }));
            console.log('matched segments:', matched);
            return next;
        });
    }
    deleteAnnotationEverywhere(termId) {
        this.localSentences.update(sentences => sentences.map(s => ({
            ...s,
            segments: s.segments.filter(seg => seg.kind !== 'hit' || seg.hit.termId !== termId)
        })));
    }
    handleAutocompleteSelection(match) {
        this.selectedHpoMatch.set(match);
        this.injectManualHpoToken();
    }
    /**
     * Transforms the currently selected autocomplete search result into a structured clinical hit
     * and appends it to the workspace state loop.
     *
     * This method maps an {@link OntologyMatch} into an augmented {@link FenominalHit} payload.
     * Rather than updating the layout table directly, it introduces a synthetic sentence envelope into
     * the underlying `localSentences` tracking signal. Because the data table updates reactively via
     * the `uniqueTableAnnotations` computed signal, the newly injected concept instantly computes into
     * a fresh table row ready for modifier curation.
     *
     * Workflow side-effects:
     * - Appends a mock sentence tracking chunk into the `localSentences` signal.
     * - Instantiates default uncurated properties (`is_observed: true`, empty modifiers) for the entry.
     * - Resets the internal `selectedHpoMatch` state signal to `null`.
     * - Empties the `hpoInputString` bounding model to prepare the autocomplete search input field for subsequent queries.
     *
     * @protected
     * @returns {void}
     */
    injectManualHpoToken() {
        const match = this.selectedHpoMatch();
        if (!match)
            return;
        // Build the hit structure matching how handleBadgeUpdated handles UI additions
        const newUiHit = {
            id: `manual-${Date.now()}-${match.id}`,
            termId: match.id,
            label: match.label,
            excluded: false,
            span: { start: 0, end: match.label.length },
            modifiers: []
        };
        // Append a synthetic sentence block to display the new manual add token
        this.localSentences.update(list => [
            ...list,
            {
                start: Date.now(),
                originalText: match.label,
                segments: [{ kind: 'hit', text: match.label, hit: newUiHit }]
            }
        ]);
        // Reset autocomplete inputs
        this.selectedHpoMatch.set(null);
        this.hpoInputString = '';
    }
    deleteHit(request) {
        this.localSentences.update(sentences => sentences.map(sentence => {
            if (sentence.start !== request.sentenceStart) {
                return sentence;
            }
            return {
                ...sentence,
                segments: sentence.segments.map(segment => {
                    if (segment.kind === 'hit' &&
                        segment.hit.span.start === request.hit.span.start &&
                        segment.hit.span.end === request.hit.span.end) {
                        return {
                            kind: 'text',
                            text: segment.text,
                            span: { ...segment.hit.span }
                        };
                    }
                    return segment;
                })
            };
        }));
    }
    /* This is called as a result of manual editing of a text segment that did not get a correct HPO */
    onSegmentsReplaced(event) {
        // Update local display state directly — the one-shot init effect above
        // won't pick this up since `hasInitialized` is already true by this point.
        this.localSentences.update(sentences => sentences.map(s => {
            if (s.start !== event.sentence.start)
                return s;
            const uiNewSegments = event.newSegments.map((seg, i) => {
                if (seg.kind === 'text')
                    return seg;
                const trackingId = `hit-${s.start}-${event.segmentIndex}-${i}-${seg.hit.termId}`;
                return { kind: 'hit', text: seg.text, hit: ui_from_fenominal(seg.hit, trackingId) };
            });
            return {
                ...s,
                segments: [
                    ...s.segments.slice(0, event.segmentIndex),
                    ...uiNewSegments,
                    ...s.segments.slice(event.segmentIndex + 1),
                ],
            };
        }));
        this.segmentsReplaced.emit(event);
    }
    saveAndFinish() {
        this.complete.emit(this.uniqueTableAnnotations());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoPolishingWorkspaceComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: HpoPolishingWorkspaceComponent, isStandalone: true, selector: "hpo-polishing-workspace", inputs: { sentences: { classPropertyName: "sentences", publicName: "sentences", isSignal: true, isRequired: false, transformFunction: null }, availableModifiers: { classPropertyName: "availableModifiers", publicName: "availableModifiers", isSignal: true, isRequired: false, transformFunction: null }, hierarchyProvider: { classPropertyName: "hierarchyProvider", publicName: "hierarchyProvider", isSignal: true, isRequired: true, transformFunction: null }, autocompleteProvider: { classPropertyName: "autocompleteProvider", publicName: "autocompleteProvider", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { segmentsReplaced: "segmentsReplaced", complete: "complete", cancel: "cancel", badgeMoved: "badgeMoved" }, ngImport: i0, template: "<div class=\"workspace-layout\">\n  <div class=\"document-preview-pane\">\n    <div class=\"document-preview-pane\">\n    <hpo-text-mining-container\n      [sentences]=\"localSentences()\"\n      (deleteHitRequested)=\"deleteHit($event)\"\n      [autocompleteProvider]=\"autocompleteProvider()\"\n      (segmentsReplaced)=\"onSegmentsReplaced($event)\"\n      >\n    </hpo-text-mining-container>\n</div>\n  </div>\n\n  <div class=\"table-viewport\">\n    <table class=\"data-table\">\n      <thead>\n        <tr>\n          <th class=\"col-id\">Ontology ID</th>\n          <th class=\"col-label\">Phenotypic Term Label</th>\n          <th class=\"col-status\">Status</th>\n          <th class=\"col-onset\">Onset</th>\n          <th class=\"col-modifiers\">Clinical Modifiers</th>\n          <th class=\"col-actions\">Actions</th>\n        </tr>\n      </thead>\n      <tbody>\n        @for (rowItem of uniqueTableAnnotations(); track rowItem.termId) {\n          <tr \n            hpo-polisher-row\n            [annotation]=\"rowItem\"\n            [hierarchyProvider]=\"hierarchyProvider()\"\n            [availableModifiers]=\"availableModifiers()\"\n            (updated)=\"handleAnnotationUpdate(rowItem, $event)\"\n            (deleteRequested)=\"deleteAnnotationEverywhere(rowItem.termId)\">\n          </tr>\n        } @empty {\n          <tr>\n            <td colspan=\"6\" class=\"empty-table-state\">\n              No clinical features currently parsed inside this annotation scope.\n            </td>\n          </tr>\n        }\n      </tbody>\n    </table>\n  </div>\n\n  <div class=\"workspace-footer\">\n    @if (autocompleteProvider(); as provider) {\n      <div class=\"autocomplete-injection-box\">\n        <hpo-ontology-autocomplete\n          [inputString]=\"hpoInputString\"\n          [autocompleteProvider]=\"provider\"\n          [requireConfirmation]=\"true\"\n          (selected)=\"handleAutocompleteSelection($event)\">\n        </hpo-ontology-autocomplete>\n      </div>\n    }\n    \n    <div class=\"action-btn-cluster\">\n      <button class=\"btn-outline-cancel\" (click)=\"cancel.emit()\">Discard</button>\n      <button class=\"btn-outline-primary\" (click)=\"saveAndFinish()\">Commit Curation Changes</button>\n    </div>\n  </div>\n\n</div>", styles: [".workspace-layout{display:flex;flex-direction:column;gap:20px;height:100%;font-family:system-ui,-apple-system,sans-serif}.document-preview-pane{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;max-height:200px;overflow-y:auto}.sentence-flow-line{margin-bottom:6px;line-height:1.5}.plain-text{color:#334155}.highlight-token{background:#e0f2fe;color:#0369a1;font-weight:500;padding:1px 4px;border-radius:4px}.highlight-token.is-excluded{background:#fee2e2;color:#b91c1c;text-decoration:line-through}.table-viewport{flex:1;border:1px solid #e2e8f0;border-radius:8px;overflow:auto}.data-table{width:100%;border-collapse:collapse;text-align:left;font-size:.8rem}.data-table th{background:#f1f5f9;color:#475569;padding:6px 10px;font-weight:600;font-size:.7rem;position:sticky;text-transform:uppercase;letter-spacing:.03em;top:0;z-index:5}.data-table td{padding:4px 10px;border-bottom:1px solid #e2e8f0;vertical-align:middle;line-height:1.3}.dropdown-trigger-span{color:#0f172a;cursor:pointer;font-weight:500;border-bottom:1px dashed #cbd5e1}.dropdown-trigger-span:hover{color:#2563eb;border-color:#2563eb}.dropdown-trigger-span .caret-icon{font-size:.7rem;color:#64748b}.badge{font-size:.68rem;font-weight:700;padding:1px 6px;border-radius:10px}.badge.badge-green{background:#dcfce7;color:#15803d}.badge.badge-red{background:#fee2e2;color:#b91c1c}.action-group-layout{display:flex;gap:4px}.btn-table-action{display:inline-flex;align-items:center;gap:3px;background:#fff;border:1px solid #cbd5e1;padding:2px 6px;border-radius:4px;font-size:.72rem;cursor:pointer}.btn-table-action mat-icon{font-size:.85rem;width:14px;height:14px}.btn-table-action:hover{background:#f8fafc;color:#2563eb}.btn-table-action.btn-delete:hover{color:#dc2626;border-color:#fca5a5;background:#fff5f5}.workspace-footer{display:flex;justify-content:space-between;align-items:center;padding-top:14px;border-top:1px solid #e2e8f0}.autocomplete-injection-box{display:flex;align-items:center;gap:12px;flex:1;max-width:600px}.action-btn-cluster{display:flex;justify-content:flex-end;align-items:center;gap:4px}.ontology-context-menu{position:fixed;background:#fff;border:1px solid #cbd5e1;border-radius:8px;box-shadow:0 10px 15px -3px #0000001a;width:280px;z-index:2000;max-height:300px;overflow-y:auto}.menu-section-title{background:#f8fafc;padding:6px 12px;font-size:.7rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e2e8f0}.menu-list{list-style:none;padding:0;margin:0}.menu-item-row{padding:8px 12px;font-size:.85rem;color:#334155;cursor:pointer}.menu-item-row .sub-id{color:#94a3b8;font-size:.75rem}.menu-item-row:hover{background:#f1f5f9;color:#2563eb}.menu-item-empty{padding:8px 12px;font-size:.8rem;color:#94a3b8;font-style:italic}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "component", type: OntologyAutocompleteComponent, selector: "hpo-ontology-autocomplete", inputs: ["placeholder", "inputString", "autocompleteProvider", "requireConfirmation", "confirmPosition"], outputs: ["selected"] }, { kind: "component", type: HpoPolishRowComponent, selector: "tr[hpo-polisher-row]", inputs: ["annotation", "hierarchyProvider", "availableModifiers"], outputs: ["annotationChange", "updated", "deleteRequested", "termClick"] }, { kind: "component", type: TextMiningContainerComponent, selector: "hpo-text-mining-container", inputs: ["sentences", "autocompleteProvider"], outputs: ["deleteHitRequested", "segmentsReplaced"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoPolishingWorkspaceComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hpo-polishing-workspace', standalone: true, imports: [
                        CommonModule,
                        FormsModule,
                        OntologyAutocompleteComponent,
                        HpoPolishRowComponent,
                        TextMiningContainerComponent
                    ], template: "<div class=\"workspace-layout\">\n  <div class=\"document-preview-pane\">\n    <div class=\"document-preview-pane\">\n    <hpo-text-mining-container\n      [sentences]=\"localSentences()\"\n      (deleteHitRequested)=\"deleteHit($event)\"\n      [autocompleteProvider]=\"autocompleteProvider()\"\n      (segmentsReplaced)=\"onSegmentsReplaced($event)\"\n      >\n    </hpo-text-mining-container>\n</div>\n  </div>\n\n  <div class=\"table-viewport\">\n    <table class=\"data-table\">\n      <thead>\n        <tr>\n          <th class=\"col-id\">Ontology ID</th>\n          <th class=\"col-label\">Phenotypic Term Label</th>\n          <th class=\"col-status\">Status</th>\n          <th class=\"col-onset\">Onset</th>\n          <th class=\"col-modifiers\">Clinical Modifiers</th>\n          <th class=\"col-actions\">Actions</th>\n        </tr>\n      </thead>\n      <tbody>\n        @for (rowItem of uniqueTableAnnotations(); track rowItem.termId) {\n          <tr \n            hpo-polisher-row\n            [annotation]=\"rowItem\"\n            [hierarchyProvider]=\"hierarchyProvider()\"\n            [availableModifiers]=\"availableModifiers()\"\n            (updated)=\"handleAnnotationUpdate(rowItem, $event)\"\n            (deleteRequested)=\"deleteAnnotationEverywhere(rowItem.termId)\">\n          </tr>\n        } @empty {\n          <tr>\n            <td colspan=\"6\" class=\"empty-table-state\">\n              No clinical features currently parsed inside this annotation scope.\n            </td>\n          </tr>\n        }\n      </tbody>\n    </table>\n  </div>\n\n  <div class=\"workspace-footer\">\n    @if (autocompleteProvider(); as provider) {\n      <div class=\"autocomplete-injection-box\">\n        <hpo-ontology-autocomplete\n          [inputString]=\"hpoInputString\"\n          [autocompleteProvider]=\"provider\"\n          [requireConfirmation]=\"true\"\n          (selected)=\"handleAutocompleteSelection($event)\">\n        </hpo-ontology-autocomplete>\n      </div>\n    }\n    \n    <div class=\"action-btn-cluster\">\n      <button class=\"btn-outline-cancel\" (click)=\"cancel.emit()\">Discard</button>\n      <button class=\"btn-outline-primary\" (click)=\"saveAndFinish()\">Commit Curation Changes</button>\n    </div>\n  </div>\n\n</div>", styles: [".workspace-layout{display:flex;flex-direction:column;gap:20px;height:100%;font-family:system-ui,-apple-system,sans-serif}.document-preview-pane{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;max-height:200px;overflow-y:auto}.sentence-flow-line{margin-bottom:6px;line-height:1.5}.plain-text{color:#334155}.highlight-token{background:#e0f2fe;color:#0369a1;font-weight:500;padding:1px 4px;border-radius:4px}.highlight-token.is-excluded{background:#fee2e2;color:#b91c1c;text-decoration:line-through}.table-viewport{flex:1;border:1px solid #e2e8f0;border-radius:8px;overflow:auto}.data-table{width:100%;border-collapse:collapse;text-align:left;font-size:.8rem}.data-table th{background:#f1f5f9;color:#475569;padding:6px 10px;font-weight:600;font-size:.7rem;position:sticky;text-transform:uppercase;letter-spacing:.03em;top:0;z-index:5}.data-table td{padding:4px 10px;border-bottom:1px solid #e2e8f0;vertical-align:middle;line-height:1.3}.dropdown-trigger-span{color:#0f172a;cursor:pointer;font-weight:500;border-bottom:1px dashed #cbd5e1}.dropdown-trigger-span:hover{color:#2563eb;border-color:#2563eb}.dropdown-trigger-span .caret-icon{font-size:.7rem;color:#64748b}.badge{font-size:.68rem;font-weight:700;padding:1px 6px;border-radius:10px}.badge.badge-green{background:#dcfce7;color:#15803d}.badge.badge-red{background:#fee2e2;color:#b91c1c}.action-group-layout{display:flex;gap:4px}.btn-table-action{display:inline-flex;align-items:center;gap:3px;background:#fff;border:1px solid #cbd5e1;padding:2px 6px;border-radius:4px;font-size:.72rem;cursor:pointer}.btn-table-action mat-icon{font-size:.85rem;width:14px;height:14px}.btn-table-action:hover{background:#f8fafc;color:#2563eb}.btn-table-action.btn-delete:hover{color:#dc2626;border-color:#fca5a5;background:#fff5f5}.workspace-footer{display:flex;justify-content:space-between;align-items:center;padding-top:14px;border-top:1px solid #e2e8f0}.autocomplete-injection-box{display:flex;align-items:center;gap:12px;flex:1;max-width:600px}.action-btn-cluster{display:flex;justify-content:flex-end;align-items:center;gap:4px}.ontology-context-menu{position:fixed;background:#fff;border:1px solid #cbd5e1;border-radius:8px;box-shadow:0 10px 15px -3px #0000001a;width:280px;z-index:2000;max-height:300px;overflow-y:auto}.menu-section-title{background:#f8fafc;padding:6px 12px;font-size:.7rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e2e8f0}.menu-list{list-style:none;padding:0;margin:0}.menu-item-row{padding:8px 12px;font-size:.85rem;color:#334155;cursor:pointer}.menu-item-row .sub-id{color:#94a3b8;font-size:.75rem}.menu-item-row:hover{background:#f1f5f9;color:#2563eb}.menu-item-empty{padding:8px 12px;font-size:.8rem;color:#94a3b8;font-style:italic}\n"] }]
        }], ctorParameters: () => [], propDecorators: { sentences: [{ type: i0.Input, args: [{ isSignal: true, alias: "sentences", required: false }] }], segmentsReplaced: [{ type: i0.Output, args: ["segmentsReplaced"] }], availableModifiers: [{ type: i0.Input, args: [{ isSignal: true, alias: "availableModifiers", required: false }] }], hierarchyProvider: [{ type: i0.Input, args: [{ isSignal: true, alias: "hierarchyProvider", required: true }] }], autocompleteProvider: [{ type: i0.Input, args: [{ isSignal: true, alias: "autocompleteProvider", required: true }] }], complete: [{ type: i0.Output, args: ["complete"] }], cancel: [{ type: i0.Output, args: ["cancel"] }], badgeMoved: [{ type: i0.Output, args: ["badgeMoved"] }] } });

class HpoMiningComponent {
    pastedText = '';
    isMining = signal(false, ...(ngDevMode ? [{ debugName: "isMining" }] : /* istanbul ignore next */ []));
    success = output();
    error = output();
    cancel = output();
    // output that delegates the actual HTTP call to the host application
    miningRequested = output();
    /**
     * Triggers the text mining pipeline by handing the text off to the host application
     */
    runTextMining() {
        if (!this.pastedText.trim())
            return;
        this.isMining.set(true);
        // Delegate the async operation to the app layer
        this.miningRequested.emit({
            text: this.pastedText,
            callback: (result) => {
                this.isMining.set(false);
                if (typeof result === 'string') {
                    this.error.emit(result);
                }
                else {
                    this.success.emit(result);
                }
            }
        });
    }
    loadExampleText() {
        // from PMID:28775536
        this.pastedText = `Physical examination revealed short stature (149 Cm), low set ears, ptosis, antimongoloid palpebral slant, high arched palate and pectus excavatum. Pulse, blood pressure and jugular venous pressure were normal. There was no pallor, cyanosis, clubbing or pedal edema. Apex beat was palpable in the left fourth intercostal space in the midclavicular line, normal in the character.`;
    }
    onCancel() {
        this.cancel.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoMiningComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.17", type: HpoMiningComponent, isStandalone: true, selector: "hpo-mining-workspace", outputs: { success: "success", error: "error", cancel: "cancel", miningRequested: "miningRequested" }, ngImport: i0, template: "<div class=\"clinical-text-container\">\n  <label for=\"clinical-text\" class=\"hpo-label\">Paste clinical text</label>\n  <div class=\"input-section\">\n    <textarea\n      id=\"clinical-text\"\n      [(ngModel)]=\"pastedText\"\n      rows=\"15\"\n      placeholder=\"Paste here with ctrl-V...\"\n      class=\"clinical-textarea\"\n      [disabled]=\"isMining()\"\n    ></textarea>\n    <a \n      href=\"javascript:void(0)\" \n      (click)=\"!isMining() && loadExampleText()\" \n      class=\"example-text-link\"\n      [class.disabled]=\"isMining()\">\n      Load Example Text\n    </a>\n    \n    <div class=\"actions-footer\">\n      <button \n        (click)=\"runTextMining()\"  \n        class=\"btn-outline-primary\"\n        [disabled]=\"isMining() || !pastedText.trim()\">\n        {{ isMining() ? 'Processing Text...' : 'Run HPO Text Mining' }}\n      </button>\n      <button \n        class=\"btn-outline-cancel\" \n        (click)=\"onCancel()\"\n        [disabled]=\"isMining()\">\n        Cancel\n      </button>\n    </div>\n  </div>\n</div>", styles: ["*{box-sizing:border-box}:host{display:flex;flex-direction:column;width:100%;height:100%}.clinical-text-container{width:100%;display:flex;flex-direction:column;flex:1;gap:1rem}.hpo-label{font-family:var(--hpo-font-sans);font-size:12px;font-weight:600;color:#334155;text-transform:uppercase;letter-spacing:.5px}.input-section{display:flex;flex-direction:column;align-items:stretch;flex:1;width:100%;position:relative}.clinical-textarea{display:block;width:100%;min-height:450px;font-family:Fira Code,monospace;padding:1rem;border:2px solid #d1d5db;border-radius:8px}.example-text-link{position:absolute;right:8px;bottom:8px;font-size:11px;color:#999;text-decoration:none;opacity:.7;transition:opacity .15s ease,color .15s ease}.example-text-link:hover{opacity:1;color:#666;text-decoration:underline}.example-text-link.disabled{pointer-events:none;opacity:.3}.actions-footer{display:flex;justify-content:flex-start;align-items:center;gap:8px;margin-top:8px}.btn-cluster{display:flex;gap:8px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoMiningComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hpo-mining-workspace', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"clinical-text-container\">\n  <label for=\"clinical-text\" class=\"hpo-label\">Paste clinical text</label>\n  <div class=\"input-section\">\n    <textarea\n      id=\"clinical-text\"\n      [(ngModel)]=\"pastedText\"\n      rows=\"15\"\n      placeholder=\"Paste here with ctrl-V...\"\n      class=\"clinical-textarea\"\n      [disabled]=\"isMining()\"\n    ></textarea>\n    <a \n      href=\"javascript:void(0)\" \n      (click)=\"!isMining() && loadExampleText()\" \n      class=\"example-text-link\"\n      [class.disabled]=\"isMining()\">\n      Load Example Text\n    </a>\n    \n    <div class=\"actions-footer\">\n      <button \n        (click)=\"runTextMining()\"  \n        class=\"btn-outline-primary\"\n        [disabled]=\"isMining() || !pastedText.trim()\">\n        {{ isMining() ? 'Processing Text...' : 'Run HPO Text Mining' }}\n      </button>\n      <button \n        class=\"btn-outline-cancel\" \n        (click)=\"onCancel()\"\n        [disabled]=\"isMining()\">\n        Cancel\n      </button>\n    </div>\n  </div>\n</div>", styles: ["*{box-sizing:border-box}:host{display:flex;flex-direction:column;width:100%;height:100%}.clinical-text-container{width:100%;display:flex;flex-direction:column;flex:1;gap:1rem}.hpo-label{font-family:var(--hpo-font-sans);font-size:12px;font-weight:600;color:#334155;text-transform:uppercase;letter-spacing:.5px}.input-section{display:flex;flex-direction:column;align-items:stretch;flex:1;width:100%;position:relative}.clinical-textarea{display:block;width:100%;min-height:450px;font-family:Fira Code,monospace;padding:1rem;border:2px solid #d1d5db;border-radius:8px}.example-text-link{position:absolute;right:8px;bottom:8px;font-size:11px;color:#999;text-decoration:none;opacity:.7;transition:opacity .15s ease,color .15s ease}.example-text-link:hover{opacity:1;color:#666;text-decoration:underline}.example-text-link.disabled{pointer-events:none;opacity:.3}.actions-footer{display:flex;justify-content:flex-start;align-items:center;gap:8px;margin-top:8px}.btn-cluster{display:flex;gap:8px}\n"] }]
        }], propDecorators: { success: [{ type: i0.Output, args: ["success"] }], error: [{ type: i0.Output, args: ["error"] }], cancel: [{ type: i0.Output, args: ["cancel"] }], miningRequested: [{ type: i0.Output, args: ["miningRequested"] }] } });

// Fixed severity term IDs — these three are stable, well-known HPO terms
const SEVERITY_TERM_IDS = new Set([
    'HP:0012825', // Mild
    'HP:0012826', // Moderate
    'HP:0012828', // Severe
]);
class HpoModifierComponent {
    availableModifiers = input.required(...(ngDevMode ? [{ debugName: "availableModifiers" }] : /* istanbul ignore next */ []));
    selectedModifiers = model([], ...(ngDevMode ? [{ debugName: "selectedModifiers" }] : /* istanbul ignore next */ []));
    placeholder = input('Search modifiers...', ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    modifierToggled = output();
    menuClosed = output();
    // Mild, Moderate, Severe -- we always will display these terms
    quickModifiers = computed(() => this.availableModifiers().filter(t => SEVERITY_TERM_IDS.has(t.termId)), ...(ngDevMode ? [{ debugName: "quickModifiers" }] : /* istanbul ignore next */ []));
    control = new FormControl('', {
        validators: [this.mustBeKnownTerm.bind(this)]
    });
    searchQuery = signal('', ...(ngDevMode ? [{ debugName: "searchQuery" }] : /* istanbul ignore next */ []));
    filteredOptions = computed(() => {
        const query = this.searchQuery().trim().toLowerCase();
        const all = this.availableModifiers();
        if (!query)
            return all;
        return all.filter(t => t.label.toLowerCase().includes(query) || t.termId.toLowerCase().includes(query));
    }, ...(ngDevMode ? [{ debugName: "filteredOptions" }] : /* istanbul ignore next */ []));
    constructor() {
        this.control.valueChanges.subscribe(value => {
            const query = typeof value === 'string' ? value : value?.label ?? '';
            this.searchQuery.set(query);
        });
    }
    mustBeKnownTerm(ctrl) {
        const value = ctrl.value;
        if (!value)
            return null;
        return typeof value === 'string' ? { invalidSelection: true } : null;
    }
    isSelected(term) {
        return this.selectedModifiers().some(t => t.termId === term.termId);
    }
    selectQuickModifier(mod) {
        this.addModifier(mod);
    }
    onOptionSelected(event) {
        this.addModifier(event.option.value);
        this.clear();
    }
    removeModifier(term) {
        this.selectedModifiers.set(this.selectedModifiers().filter(t => t.termId !== term.termId));
        this.modifierToggled.emit({ modifier: term, selected: false });
    }
    addModifier(term) {
        if (this.isSelected(term))
            return;
        this.selectedModifiers.set([...this.selectedModifiers(), term]);
        this.modifierToggled.emit({ modifier: term, selected: true });
    }
    displayFn(option) {
        return option ? option.label : '';
    }
    clear() {
        this.control.setValue('');
    }
    closeMenu() {
        this.menuClosed.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoModifierComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: HpoModifierComponent, isStandalone: true, selector: "hpo-modifier", inputs: { availableModifiers: { classPropertyName: "availableModifiers", publicName: "availableModifiers", isSignal: true, isRequired: true, transformFunction: null }, selectedModifiers: { classPropertyName: "selectedModifiers", publicName: "selectedModifiers", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { selectedModifiers: "selectedModifiersChange", modifierToggled: "modifierToggled", menuClosed: "menuClosed" }, ngImport: i0, template: "<div class=\"modifier-menu-card\">\n\n  @if (quickModifiers().length) {\n    <label class=\"section-label\">Severity</label>\n    <div class=\"quick-select-row\">\n      @for (mod of quickModifiers(); track mod.termId) {\n        <button\n          mat-stroked-button\n          color=\"primary\"\n          class=\"btn-small\"\n          [class.is-selected]=\"isSelected(mod)\"\n          (click)=\"selectQuickModifier(mod)\">\n          {{ mod.label }}\n        </button>\n      }\n    </div>\n  }\n\n  @if (selectedModifiers().length) {\n    <div class=\"selected-chips-row\">\n      @for (mod of selectedModifiers(); track mod.termId) {\n        <span class=\"modifier-chip\">\n          {{ mod.label }}\n          <button type=\"button\" class=\"chip-remove-btn\" (click)=\"removeModifier(mod)\" aria-label=\"Remove modifier\">\n            <mat-icon>close</mat-icon>\n          </button>\n        </span>\n      }\n    </div>\n  }\n\n  <div class=\"inline-modifier-header\">\n    <span class=\"inline-label\">Modifiers</span>\n\n    <mat-form-field class=\"compact-form-field\" appearance=\"outline\">\n      <input type=\"text\"\n        #hpoInput\n        [placeholder]=\"placeholder()\"\n        matInput\n        [formControl]=\"control\"\n        [matAutocomplete]=\"auto\"\n        (blur)=\"control.markAsTouched()\"\n        spellcheck=\"false\"\n        autocomplete=\"off\">\n\n      @if (control.value) {\n        <button matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"clear()\">\n          <mat-icon>close</mat-icon>\n        </button>\n      }\n\n      <mat-autocomplete\n        #auto=\"matAutocomplete\"\n        [displayWith]=\"displayFn\"\n        (optionSelected)=\"onOptionSelected($event)\">\n        @for (option of filteredOptions(); track option.termId) {\n          <mat-option [value]=\"option\">\n            <div class=\"option-container\">\n              <span class=\"option-matched-text\">{{ option.label }}</span>\n              <small class=\"option-id\"> ({{ option.termId }})</small>\n            </div>\n          </mat-option>\n        }\n      </mat-autocomplete>\n    </mat-form-field>\n  </div>\n\n  @if (control.hasError('invalidSelection') && control.touched) {\n    <div class=\"error-text-fallback\">Please select a term from the list</div>\n  }\n\n  <div class=\"modifier-menu-footer\">\n    <button type=\"button\" class=\"btn-close-menu\" (click)=\"closeMenu()\">Done</button>\n  </div>\n\n</div>", styles: [".modifier-menu-card{display:flex;flex-direction:column;gap:1rem;padding:1.25rem;background-color:#fff;font-size:.9rem}.section-label{display:block;font-size:.8rem;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:.03em;margin-bottom:.5rem}.quick-select-row{display:flex;gap:.5rem;flex-wrap:wrap}.btn-small{font-size:.8rem;line-height:1.2;padding:0 .75rem;min-width:0}.btn-small.is-selected{background-color:#eff6ff;border-color:#2563eb;color:#2563eb}.selected-chips-row{display:flex;flex-wrap:wrap;gap:.4rem}.modifier-chip{display:inline-flex;align-items:center;gap:.3rem;padding:.25rem .4rem .25rem .65rem;background-color:#f0f9ff;border:1px solid #bae6fd;border-radius:999px;color:#0369a1;font-size:.8rem;line-height:1.2}.chip-remove-btn{display:inline-flex;align-items:center;justify-content:center;width:1.1rem;height:1.1rem;padding:0;border:none;background:transparent;color:#0369a1;cursor:pointer;border-radius:50%}.chip-remove-btn mat-icon{font-size:.95rem;width:.95rem;height:.95rem}.chip-remove-btn:hover{background-color:#bae6fd}.inline-modifier-header{display:flex;flex-direction:column;gap:.4rem}.inline-label{font-size:.8rem;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:.03em}.compact-form-field{width:100%}.compact-form-field ::ng-deep .mat-mdc-text-field-wrapper{padding:0 .5rem}.compact-form-field ::ng-deep .mat-mdc-form-field-infix{min-height:2.25rem;padding-top:.5rem;padding-bottom:.5rem}.option-container{display:flex;align-items:baseline;gap:.4rem}.option-matched-text{color:#0f172a}.option-id{color:#94a3b8;font-family:monospace;font-size:.75rem}.error-text-fallback{color:#991b1b;font-size:.8rem;margin-top:-.5rem}.modifier-menu-footer{display:flex;justify-content:flex-end;padding-top:.5rem;border-top:1px solid #e2e8f0}.btn-close-menu{padding:.5rem 1.25rem;background-color:#0f172a;color:#fff;border:none;border-radius:6px;font-size:.9rem;cursor:pointer}.btn-close-menu:hover{background-color:#1e293b}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i3.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i3.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3$1.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "ngmodule", type: MatAutocompleteModule }, { kind: "component", type: i4.MatAutocomplete, selector: "mat-autocomplete", inputs: ["aria-label", "aria-labelledby", "displayWith", "autoActiveFirstOption", "autoSelectActiveOption", "requireSelection", "panelWidth", "disableRipple", "class", "hideSingleSelectionIndicator"], outputs: ["optionSelected", "opened", "closed", "optionActivated"], exportAs: ["matAutocomplete"] }, { kind: "component", type: i4.MatOption, selector: "mat-option", inputs: ["value", "id", "disabled"], outputs: ["onSelectionChange"], exportAs: ["matOption"] }, { kind: "directive", type: i4.MatAutocompleteTrigger, selector: "input[matAutocomplete], textarea[matAutocomplete]", inputs: ["matAutocomplete", "matAutocompletePosition", "matAutocompleteConnectedTo", "autocomplete", "matAutocompleteDisabled"], exportAs: ["matAutocompleteTrigger"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i5.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i6.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i6.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoModifierComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hpo-modifier', standalone: true, imports: [
                        CommonModule, ReactiveFormsModule, MatFormFieldModule,
                        MatInputModule, MatAutocompleteModule, MatIconModule, MatButtonModule
                    ], template: "<div class=\"modifier-menu-card\">\n\n  @if (quickModifiers().length) {\n    <label class=\"section-label\">Severity</label>\n    <div class=\"quick-select-row\">\n      @for (mod of quickModifiers(); track mod.termId) {\n        <button\n          mat-stroked-button\n          color=\"primary\"\n          class=\"btn-small\"\n          [class.is-selected]=\"isSelected(mod)\"\n          (click)=\"selectQuickModifier(mod)\">\n          {{ mod.label }}\n        </button>\n      }\n    </div>\n  }\n\n  @if (selectedModifiers().length) {\n    <div class=\"selected-chips-row\">\n      @for (mod of selectedModifiers(); track mod.termId) {\n        <span class=\"modifier-chip\">\n          {{ mod.label }}\n          <button type=\"button\" class=\"chip-remove-btn\" (click)=\"removeModifier(mod)\" aria-label=\"Remove modifier\">\n            <mat-icon>close</mat-icon>\n          </button>\n        </span>\n      }\n    </div>\n  }\n\n  <div class=\"inline-modifier-header\">\n    <span class=\"inline-label\">Modifiers</span>\n\n    <mat-form-field class=\"compact-form-field\" appearance=\"outline\">\n      <input type=\"text\"\n        #hpoInput\n        [placeholder]=\"placeholder()\"\n        matInput\n        [formControl]=\"control\"\n        [matAutocomplete]=\"auto\"\n        (blur)=\"control.markAsTouched()\"\n        spellcheck=\"false\"\n        autocomplete=\"off\">\n\n      @if (control.value) {\n        <button matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"clear()\">\n          <mat-icon>close</mat-icon>\n        </button>\n      }\n\n      <mat-autocomplete\n        #auto=\"matAutocomplete\"\n        [displayWith]=\"displayFn\"\n        (optionSelected)=\"onOptionSelected($event)\">\n        @for (option of filteredOptions(); track option.termId) {\n          <mat-option [value]=\"option\">\n            <div class=\"option-container\">\n              <span class=\"option-matched-text\">{{ option.label }}</span>\n              <small class=\"option-id\"> ({{ option.termId }})</small>\n            </div>\n          </mat-option>\n        }\n      </mat-autocomplete>\n    </mat-form-field>\n  </div>\n\n  @if (control.hasError('invalidSelection') && control.touched) {\n    <div class=\"error-text-fallback\">Please select a term from the list</div>\n  }\n\n  <div class=\"modifier-menu-footer\">\n    <button type=\"button\" class=\"btn-close-menu\" (click)=\"closeMenu()\">Done</button>\n  </div>\n\n</div>", styles: [".modifier-menu-card{display:flex;flex-direction:column;gap:1rem;padding:1.25rem;background-color:#fff;font-size:.9rem}.section-label{display:block;font-size:.8rem;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:.03em;margin-bottom:.5rem}.quick-select-row{display:flex;gap:.5rem;flex-wrap:wrap}.btn-small{font-size:.8rem;line-height:1.2;padding:0 .75rem;min-width:0}.btn-small.is-selected{background-color:#eff6ff;border-color:#2563eb;color:#2563eb}.selected-chips-row{display:flex;flex-wrap:wrap;gap:.4rem}.modifier-chip{display:inline-flex;align-items:center;gap:.3rem;padding:.25rem .4rem .25rem .65rem;background-color:#f0f9ff;border:1px solid #bae6fd;border-radius:999px;color:#0369a1;font-size:.8rem;line-height:1.2}.chip-remove-btn{display:inline-flex;align-items:center;justify-content:center;width:1.1rem;height:1.1rem;padding:0;border:none;background:transparent;color:#0369a1;cursor:pointer;border-radius:50%}.chip-remove-btn mat-icon{font-size:.95rem;width:.95rem;height:.95rem}.chip-remove-btn:hover{background-color:#bae6fd}.inline-modifier-header{display:flex;flex-direction:column;gap:.4rem}.inline-label{font-size:.8rem;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:.03em}.compact-form-field{width:100%}.compact-form-field ::ng-deep .mat-mdc-text-field-wrapper{padding:0 .5rem}.compact-form-field ::ng-deep .mat-mdc-form-field-infix{min-height:2.25rem;padding-top:.5rem;padding-bottom:.5rem}.option-container{display:flex;align-items:baseline;gap:.4rem}.option-matched-text{color:#0f172a}.option-id{color:#94a3b8;font-family:monospace;font-size:.75rem}.error-text-fallback{color:#991b1b;font-size:.8rem;margin-top:-.5rem}.modifier-menu-footer{display:flex;justify-content:flex-end;padding-top:.5rem;border-top:1px solid #e2e8f0}.btn-close-menu{padding:.5rem 1.25rem;background-color:#0f172a;color:#fff;border:none;border-radius:6px;font-size:.9rem;cursor:pointer}.btn-close-menu:hover{background-color:#1e293b}\n"] }]
        }], ctorParameters: () => [], propDecorators: { availableModifiers: [{ type: i0.Input, args: [{ isSignal: true, alias: "availableModifiers", required: true }] }], selectedModifiers: [{ type: i0.Input, args: [{ isSignal: true, alias: "selectedModifiers", required: false }] }, { type: i0.Output, args: ["selectedModifiersChange"] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], modifierToggled: [{ type: i0.Output, args: ["modifierToggled"] }], menuClosed: [{ type: i0.Output, args: ["menuClosed"] }] } });

class LoadOntologyComponent {
    label = input.required(...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ [])); // e.g., "HPO" or "MAxO"
    isLoading = input.required(...(ngDevMode ? [{ debugName: "isLoading" }] : /* istanbul ignore next */ []));
    isLoaded = input.required(...(ngDevMode ? [{ debugName: "isLoaded" }] : /* istanbul ignore next */ []));
    statusMessage = input.required(...(ngDevMode ? [{ debugName: "statusMessage" }] : /* istanbul ignore next */ []));
    termCount = input(undefined, ...(ngDevMode ? [{ debugName: "termCount" }] : /* istanbul ignore next */ []));
    helpUrl = input('https://p2gx.github.io/phenoboard/help/start.html', ...(ngDevMode ? [{ debugName: "helpUrl" }] : /* istanbul ignore next */ []));
    helpLines = input(['Select the ontology file.'], ...(ngDevMode ? [{ debugName: "helpLines" }] : /* istanbul ignore next */ []));
    onLoad = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: LoadOntologyComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: LoadOntologyComponent, isStandalone: true, selector: "ui-load-ontology", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, isLoading: { classPropertyName: "isLoading", publicName: "isLoading", isSignal: true, isRequired: true, transformFunction: null }, isLoaded: { classPropertyName: "isLoaded", publicName: "isLoaded", isSignal: true, isRequired: true, transformFunction: null }, statusMessage: { classPropertyName: "statusMessage", publicName: "statusMessage", isSignal: true, isRequired: true, transformFunction: null }, termCount: { classPropertyName: "termCount", publicName: "termCount", isSignal: true, isRequired: false, transformFunction: null }, helpUrl: { classPropertyName: "helpUrl", publicName: "helpUrl", isSignal: true, isRequired: false, transformFunction: null }, helpLines: { classPropertyName: "helpLines", publicName: "helpLines", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { onLoad: "onLoad" }, ngImport: i0, template: "<div class=\"home-card__row\">\n    <div class=\"action-with-help\">\n        <button (click)=\"onLoad.emit()\" [disabled]=\"isLoading()\" class=\"btn-outline-primary home-card__action-btn\">\n            @if (isLoading()) {\n                <mat-spinner diameter=\"15\"></mat-spinner>\n                <span>Loading...</span>\n            } @else {\n                <span>Load {{ label() }}</span>\n            }\n        </button>\n        \n        <hpo-help-button \n            [title]=\"'Loading the ' + label()\" \n            [lines]=\"helpLines()\" \n            [helpUrl]=\"helpUrl()\" />\n    </div>\n    \n    <div class=\"ontology-status\">\n        <span [ngClass]=\"{\n            'ontology-status__text--loading': isLoading(), \n            'ontology-status__text--loaded': isLoaded()}\" \n            class=\"ontology-status__text\">\n            @if(isLoaded()) {\n                <mat-icon class=\"ontology-status__icon\">check_circle</mat-icon> \n                {{ statusMessage() }}\n                <span class=\"ontology-status__terms\">{{ termCount() }} terms available</span>\n            }\n        </span>\n    </div>\n</div>", styles: [".home-card__section-label{font-size:1.1rem;font-weight:600;margin-bottom:12px;color:#333}.home-card__row{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 0}.action-with-help{display:flex;align-items:center;gap:8px}.action-with-help .home-card__action-btn{display:inline-flex;align-items:center;gap:8px;min-width:120px;justify-content:center}.ontology-status{display:flex;flex-direction:column;align-items:flex-end;gap:4px}.ontology-status__text{display:flex;align-items:center;gap:6px;font-size:.9rem;color:#666}.ontology-status__text--loading{color:#0288d1}.ontology-status__text--loaded{color:#388e3c;font-weight:500}.ontology-status__icon{font-size:18px;width:18px;height:18px}.ontology-status__terms{font-size:.8rem;color:#757575}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "ngmodule", type: MatProgressSpinnerModule }, { kind: "component", type: i2$1.MatProgressSpinner, selector: "mat-progress-spinner, mat-spinner", inputs: ["color", "mode", "value", "diameter", "strokeWidth"], exportAs: ["matProgressSpinner"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i5.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: HelpButtonComponent, selector: "hpo-help-button", inputs: ["title", "lines", "helpUrl"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: LoadOntologyComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-load-ontology', standalone: true, imports: [
                        CommonModule,
                        MatProgressSpinnerModule,
                        MatIconModule,
                        HelpButtonComponent
                    ], template: "<div class=\"home-card__row\">\n    <div class=\"action-with-help\">\n        <button (click)=\"onLoad.emit()\" [disabled]=\"isLoading()\" class=\"btn-outline-primary home-card__action-btn\">\n            @if (isLoading()) {\n                <mat-spinner diameter=\"15\"></mat-spinner>\n                <span>Loading...</span>\n            } @else {\n                <span>Load {{ label() }}</span>\n            }\n        </button>\n        \n        <hpo-help-button \n            [title]=\"'Loading the ' + label()\" \n            [lines]=\"helpLines()\" \n            [helpUrl]=\"helpUrl()\" />\n    </div>\n    \n    <div class=\"ontology-status\">\n        <span [ngClass]=\"{\n            'ontology-status__text--loading': isLoading(), \n            'ontology-status__text--loaded': isLoaded()}\" \n            class=\"ontology-status__text\">\n            @if(isLoaded()) {\n                <mat-icon class=\"ontology-status__icon\">check_circle</mat-icon> \n                {{ statusMessage() }}\n                <span class=\"ontology-status__terms\">{{ termCount() }} terms available</span>\n            }\n        </span>\n    </div>\n</div>", styles: [".home-card__section-label{font-size:1.1rem;font-weight:600;margin-bottom:12px;color:#333}.home-card__row{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 0}.action-with-help{display:flex;align-items:center;gap:8px}.action-with-help .home-card__action-btn{display:inline-flex;align-items:center;gap:8px;min-width:120px;justify-content:center}.ontology-status{display:flex;flex-direction:column;align-items:flex-end;gap:4px}.ontology-status__text{display:flex;align-items:center;gap:6px;font-size:.9rem;color:#666}.ontology-status__text--loading{color:#0288d1}.ontology-status__text--loaded{color:#388e3c;font-weight:500}.ontology-status__icon{font-size:18px;width:18px;height:18px}.ontology-status__terms{font-size:.8rem;color:#757575}\n"] }]
        }], propDecorators: { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: true }] }], isLoading: [{ type: i0.Input, args: [{ isSignal: true, alias: "isLoading", required: true }] }], isLoaded: [{ type: i0.Input, args: [{ isSignal: true, alias: "isLoaded", required: true }] }], statusMessage: [{ type: i0.Input, args: [{ isSignal: true, alias: "statusMessage", required: true }] }], termCount: [{ type: i0.Input, args: [{ isSignal: true, alias: "termCount", required: false }] }], helpUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "helpUrl", required: false }] }], helpLines: [{ type: i0.Input, args: [{ isSignal: true, alias: "helpLines", required: false }] }], onLoad: [{ type: i0.Output, args: ["onLoad"] }] } });

class OrcidDialogComponent {
    fb = inject(FormBuilder);
    dialogRef = inject((MatDialogRef));
    data = inject(MAT_DIALOG_DATA);
    externalLinkClicked = output();
    orcidForm = this.fb.group({
        orcid: [
            this.data?.currentOrcid || '',
            [
                Validators.required,
                Validators.pattern(/^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/)
            ]
        ]
    });
    ngAfterViewInit() {
        const control = this.orcidForm.get('orcid');
        if (control?.invalid) {
            control.markAsTouched();
            control.updateValueAndValidity();
        }
    }
    onLinkClick(event) {
        event.preventDefault();
        this.externalLinkClicked.emit('https://orcid.org/');
    }
    onCancel() {
        this.dialogRef.close();
    }
    onSave() {
        if (this.orcidForm.valid) {
            this.dialogRef.close(this.orcidForm.value.orcid);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: OrcidDialogComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: OrcidDialogComponent, isStandalone: true, selector: "hpo-orcid-dialog", outputs: { externalLinkClicked: "externalLinkClicked" }, ngImport: i0, template: "<h2 mat-dialog-title class=\"dialog-title\">Enter ORCID researcher identifier</h2>\n\n<mat-dialog-content class=\"dialog-content\">\n  <form [formGroup]=\"orcidForm\" class=\"orcid-form\">\n    <mat-form-field appearance=\"outline\" class=\"form-field-full\" subscriptSizing=\"fixed\">\n      <mat-icon matPrefix class=\"input-icon-prefix\">fingerprint</mat-icon>\n      <input matInput\n             formControlName=\"orcid\"\n             placeholder=\"0000-0000-0000-0000\"\n             maxlength=\"19\"\n             class=\"orcid-input-field\">\n      <mat-hint class=\"custom-hint\">Format: 0000-0000-0000-0000</mat-hint>\n      \n      @if (orcidForm.get('orcid')?.hasError('required')) {\n        <mat-error>ORCID is required</mat-error>\n      }\n      @if (orcidForm.get('orcid')?.hasError('pattern')) {\n        <mat-error>Invalid ORCID format</mat-error>\n      }\n    </mat-form-field>\n  </form>\n\n  <div class=\"orcid-info\">\n  <mat-icon class=\"info-icon\" \n            matTooltip=\"ORCID helps distinguish you from every other researcher with a matching name.\" \n            matTooltipPosition=\"above\"\n            style=\"cursor: help;\">\n    info\n  </mat-icon>\n  <span>\n  ORCID provides a persistent digital identifier for researchers.\n  <a href=\"https://orcid.org/\" (click)=\"onLinkClick($event)\" class=\"orcid-link\">Learn more</a>\n</span>\n</div>\n</mat-dialog-content>\n\n<div class=\"dialog-actions\">\n  <button type=\"button\"\n          (click)=\"onCancel()\"\n          class=\"btn-outline-cancel\">\n    Cancel\n  </button>\n  <button type=\"button\"\n          (click)=\"onSave()\"\n          [disabled]=\"orcidForm.invalid\"\n          class=\"btn-outline-primary\">\n    Save\n  </button>\n</div>", styles: [":host{display:block;font-family:var(--hpo-ui-font-family, system-ui, sans-serif);--mdc-dialog-container-shape: 12px}.dialog-title{margin:0!important;padding:24px 24px 10px!important;border-bottom:none!important;font-size:1.25rem;font-weight:600;margin-bottom:1rem!important}mat-dialog-content.dialog-content{min-width:400px;overflow:hidden!important;display:block!important;border-top:none!important;border-bottom:none!important;padding-top:12px!important}.orcid-form{margin-top:.5rem}.orcid-form .form-field-full{width:100%}.orcid-form .form-field-full input.mat-mdc-input-element{padding-left:8px!important}.input-icon-prefix{color:var(--hpo-ui-text-muted, #94a3b8);margin-right:12px!important;font-size:20px;width:20px;height:20px}.orcid-info{background:var(--hpo-ui-bg-light, #f8f9fa);padding:12px;border-radius:6px;margin-top:20px;font-size:13px;display:flex;align-items:center;gap:10px;color:var(--hpo-ui-text-muted, #4b5563);border:1px solid var(--hpo-ui-border-light, #e5e7eb)}.orcid-info .orcid-link{color:var(--hpo-ui-link-color, #2563eb);text-decoration:underline}.dialog-actions{padding:16px;display:flex;justify-content:flex-end;gap:12px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: MatDialogModule }, { kind: "directive", type: i1$2.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i1$2.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3$1.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "component", type: i3.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i3.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { kind: "directive", type: i3.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "directive", type: i3.MatPrefix, selector: "[matPrefix], [matIconPrefix], [matTextPrefix]", inputs: ["matTextPrefix"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i5.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatTooltipModule }, { kind: "directive", type: i5$1.MatTooltip, selector: "[matTooltip]", inputs: ["matTooltipPosition", "matTooltipPositionAtOrigin", "matTooltipDisabled", "matTooltipShowDelay", "matTooltipHideDelay", "matTooltipTouchGestures", "matTooltip", "matTooltipClass"], exportAs: ["matTooltip"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],[formArray],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: OrcidDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hpo-orcid-dialog', standalone: true, imports: [
                        CommonModule,
                        MatDialogModule,
                        MatInputModule,
                        MatIconModule,
                        MatTooltipModule,
                        ReactiveFormsModule
                    ], template: "<h2 mat-dialog-title class=\"dialog-title\">Enter ORCID researcher identifier</h2>\n\n<mat-dialog-content class=\"dialog-content\">\n  <form [formGroup]=\"orcidForm\" class=\"orcid-form\">\n    <mat-form-field appearance=\"outline\" class=\"form-field-full\" subscriptSizing=\"fixed\">\n      <mat-icon matPrefix class=\"input-icon-prefix\">fingerprint</mat-icon>\n      <input matInput\n             formControlName=\"orcid\"\n             placeholder=\"0000-0000-0000-0000\"\n             maxlength=\"19\"\n             class=\"orcid-input-field\">\n      <mat-hint class=\"custom-hint\">Format: 0000-0000-0000-0000</mat-hint>\n      \n      @if (orcidForm.get('orcid')?.hasError('required')) {\n        <mat-error>ORCID is required</mat-error>\n      }\n      @if (orcidForm.get('orcid')?.hasError('pattern')) {\n        <mat-error>Invalid ORCID format</mat-error>\n      }\n    </mat-form-field>\n  </form>\n\n  <div class=\"orcid-info\">\n  <mat-icon class=\"info-icon\" \n            matTooltip=\"ORCID helps distinguish you from every other researcher with a matching name.\" \n            matTooltipPosition=\"above\"\n            style=\"cursor: help;\">\n    info\n  </mat-icon>\n  <span>\n  ORCID provides a persistent digital identifier for researchers.\n  <a href=\"https://orcid.org/\" (click)=\"onLinkClick($event)\" class=\"orcid-link\">Learn more</a>\n</span>\n</div>\n</mat-dialog-content>\n\n<div class=\"dialog-actions\">\n  <button type=\"button\"\n          (click)=\"onCancel()\"\n          class=\"btn-outline-cancel\">\n    Cancel\n  </button>\n  <button type=\"button\"\n          (click)=\"onSave()\"\n          [disabled]=\"orcidForm.invalid\"\n          class=\"btn-outline-primary\">\n    Save\n  </button>\n</div>", styles: [":host{display:block;font-family:var(--hpo-ui-font-family, system-ui, sans-serif);--mdc-dialog-container-shape: 12px}.dialog-title{margin:0!important;padding:24px 24px 10px!important;border-bottom:none!important;font-size:1.25rem;font-weight:600;margin-bottom:1rem!important}mat-dialog-content.dialog-content{min-width:400px;overflow:hidden!important;display:block!important;border-top:none!important;border-bottom:none!important;padding-top:12px!important}.orcid-form{margin-top:.5rem}.orcid-form .form-field-full{width:100%}.orcid-form .form-field-full input.mat-mdc-input-element{padding-left:8px!important}.input-icon-prefix{color:var(--hpo-ui-text-muted, #94a3b8);margin-right:12px!important;font-size:20px;width:20px;height:20px}.orcid-info{background:var(--hpo-ui-bg-light, #f8f9fa);padding:12px;border-radius:6px;margin-top:20px;font-size:13px;display:flex;align-items:center;gap:10px;color:var(--hpo-ui-text-muted, #4b5563);border:1px solid var(--hpo-ui-border-light, #e5e7eb)}.orcid-info .orcid-link{color:var(--hpo-ui-link-color, #2563eb);text-decoration:underline}.dialog-actions{padding:16px;display:flex;justify-content:flex-end;gap:12px}\n"] }]
        }], propDecorators: { externalLinkClicked: [{ type: i0.Output, args: ["externalLinkClicked"] }] } });

// phenopacket-loader.component.ts
class PhenopacketLoaderComponent {
    onIngest = input.required(...(ngDevMode ? [{ debugName: "onIngest" }] : /* istanbul ignore next */ []));
    isDragging = signal(false, ...(ngDevMode ? [{ debugName: "isDragging" }] : /* istanbul ignore next */ []));
    fileName = signal(null, ...(ngDevMode ? [{ debugName: "fileName" }] : /* istanbul ignore next */ []));
    errorMessage = signal(null, ...(ngDevMode ? [{ debugName: "errorMessage" }] : /* istanbul ignore next */ []));
    phenopacketIngested = output();
    ingestError = output();
    onFileSelected(event) {
        const inputElement = event.target;
        if (inputElement.files && inputElement.files[0]) {
            this.processFile(inputElement.files[0]);
        }
    }
    onDragOver(event) {
        event.preventDefault();
        this.isDragging.set(true);
    }
    onDragLeave() {
        this.isDragging.set(false);
    }
    onDrop(event) {
        event.preventDefault();
        this.isDragging.set(false);
        if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
            this.processFile(event.dataTransfer.files[0]);
        }
    }
    processFile(file) {
        if (!file.name.endsWith('.json')) {
            this.errorMessage.set('Invalid file type. Please upload a JSON phenopacket.');
            return;
        }
        this.fileName.set(file.name.toLowerCase());
        this.errorMessage.set(null);
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const jsonString = e.target?.result;
                // Quick local syntax validation sanity check
                JSON.parse(jsonString);
                // Execute the decoupled application callback handler seamlessly
                await this.onIngest()(jsonString);
            }
            catch (err) {
                this.errorMessage.set('Failed to process file contents. Verify structural validity.');
                this.fileName.set(null);
            }
        };
        reader.readAsText(file);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: PhenopacketLoaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: PhenopacketLoaderComponent, isStandalone: true, selector: "hpo-phenopacket-loader", inputs: { onIngest: { classPropertyName: "onIngest", publicName: "onIngest", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { phenopacketIngested: "phenopacketIngested", ingestError: "ingestError" }, ngImport: i0, template: "<div \n  class=\"drop-container\"\n  [class.drop-container--active]=\"isDragging()\"\n  (dragover)=\"onDragOver($event)\"\n  (dragleave)=\"onDragLeave()\"\n  (drop)=\"onDrop($event)\"\n>\n  <div class=\"drop-illustration\">\n    <i class=\"upload-icon\">\uD83D\uDCC4</i>\n    @if (fileName()) {\n      <p class=\"file-status\">Loaded: <code>{{ fileName() }}</code></p>\n    } @else {\n      <p>Drag and drop a Phenopacket file here, or click to browse.</p>\n    }\n  </div>\n\n  <button type=\"button\" (click)=\"fileInput.click()\">\n    Select Phenopacket Profile\n  </button>\n  \n  <input \n    #fileInput \n    type=\"file\" \n    accept=\".json\" \n    (change)=\"onFileSelected($event)\" \n    hidden \n  />\n</div>", styles: [".drop-container{--loader-bg: #ffffff;--loader-border-color: #cbd5e1;--loader-border-active: #3b82f6;--loader-text-primary: #1e293b;--loader-text-secondary: #64748b;--loader-success-bg: #f0fdf4;--loader-success-border: #4ade80;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2.5rem 2rem;border:2px dashed var(--loader-border-color);border-radius:12px;background-color:var(--loader-bg);cursor:pointer;transition:all .2s ease-in-out;text-align:center;min-height:200px;position:relative}.drop-container:hover{border-color:var(--loader-text-secondary);background-color:#f8fafc}.drop-container--active{border-color:var(--loader-border-active);background-color:#eff6ff;transform:scale(1.01)}.drop-container--active .upload-icon{transform:translateY(-4px);color:var(--loader-border-active)}.drop-container .drop-illustration{display:flex;flex-direction:column;align-items:center;gap:.75rem;margin-bottom:1.5rem;pointer-events:none}.drop-container .drop-illustration .upload-icon{font-size:2.5rem;transition:transform .2s ease}.drop-container .drop-illustration p{margin:0;font-size:1rem;color:var(--loader-text-primary);font-weight:500}.drop-container .drop-illustration .file-status{color:#16a34a}.drop-container .drop-illustration .file-status code{background-color:#e2e8f0;padding:.2rem .4rem;border-radius:4px;font-family:monospace;font-size:.9rem}.drop-container button{background-color:#3b82f6;color:#fff;border:none;padding:.625rem 1.25rem;font-size:.9rem;font-weight:600;border-radius:6px;cursor:pointer;transition:background-color .15s ease;box-shadow:0 1px 2px #0000000d}.drop-container button:hover{background-color:#2563eb}.drop-container button:active{background-color:#1d4ed8}.error-message{margin-top:1rem;padding:.75rem 1rem;background-color:#fef2f2;border:1px solid #fee2e2;border-radius:6px;color:#dc2626;font-size:.875rem;font-weight:500;text-align:left;width:100%;box-sizing:border-box}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: PhenopacketLoaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hpo-phenopacket-loader', standalone: true, imports: [CommonModule], template: "<div \n  class=\"drop-container\"\n  [class.drop-container--active]=\"isDragging()\"\n  (dragover)=\"onDragOver($event)\"\n  (dragleave)=\"onDragLeave()\"\n  (drop)=\"onDrop($event)\"\n>\n  <div class=\"drop-illustration\">\n    <i class=\"upload-icon\">\uD83D\uDCC4</i>\n    @if (fileName()) {\n      <p class=\"file-status\">Loaded: <code>{{ fileName() }}</code></p>\n    } @else {\n      <p>Drag and drop a Phenopacket file here, or click to browse.</p>\n    }\n  </div>\n\n  <button type=\"button\" (click)=\"fileInput.click()\">\n    Select Phenopacket Profile\n  </button>\n  \n  <input \n    #fileInput \n    type=\"file\" \n    accept=\".json\" \n    (change)=\"onFileSelected($event)\" \n    hidden \n  />\n</div>", styles: [".drop-container{--loader-bg: #ffffff;--loader-border-color: #cbd5e1;--loader-border-active: #3b82f6;--loader-text-primary: #1e293b;--loader-text-secondary: #64748b;--loader-success-bg: #f0fdf4;--loader-success-border: #4ade80;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2.5rem 2rem;border:2px dashed var(--loader-border-color);border-radius:12px;background-color:var(--loader-bg);cursor:pointer;transition:all .2s ease-in-out;text-align:center;min-height:200px;position:relative}.drop-container:hover{border-color:var(--loader-text-secondary);background-color:#f8fafc}.drop-container--active{border-color:var(--loader-border-active);background-color:#eff6ff;transform:scale(1.01)}.drop-container--active .upload-icon{transform:translateY(-4px);color:var(--loader-border-active)}.drop-container .drop-illustration{display:flex;flex-direction:column;align-items:center;gap:.75rem;margin-bottom:1.5rem;pointer-events:none}.drop-container .drop-illustration .upload-icon{font-size:2.5rem;transition:transform .2s ease}.drop-container .drop-illustration p{margin:0;font-size:1rem;color:var(--loader-text-primary);font-weight:500}.drop-container .drop-illustration .file-status{color:#16a34a}.drop-container .drop-illustration .file-status code{background-color:#e2e8f0;padding:.2rem .4rem;border-radius:4px;font-family:monospace;font-size:.9rem}.drop-container button{background-color:#3b82f6;color:#fff;border:none;padding:.625rem 1.25rem;font-size:.9rem;font-weight:600;border-radius:6px;cursor:pointer;transition:background-color .15s ease;box-shadow:0 1px 2px #0000000d}.drop-container button:hover{background-color:#2563eb}.drop-container button:active{background-color:#1d4ed8}.error-message{margin-top:1rem;padding:.75rem 1rem;background-color:#fef2f2;border:1px solid #fee2e2;border-radius:6px;color:#dc2626;font-size:.875rem;font-weight:500;text-align:left;width:100%;box-sizing:border-box}\n"] }]
        }], propDecorators: { onIngest: [{ type: i0.Input, args: [{ isSignal: true, alias: "onIngest", required: true }] }], phenopacketIngested: [{ type: i0.Output, args: ["phenopacketIngested"] }], ingestError: [{ type: i0.Output, args: ["ingestError"] }] } });

class HpoTwostepMiningComponent {
    config = input.required(...(ngDevMode ? [{ debugName: "config" }] : /* istanbul ignore next */ []));
    notificationService = inject(NotificationService);
    // Internal component state using signals
    currentStep = signal(1, ...(ngDevMode ? [{ debugName: "currentStep" }] : /* istanbul ignore next */ []));
    curatedSentences = signal([], ...(ngDevMode ? [{ debugName: "curatedSentences" }] : /* istanbul ignore next */ []));
    availableModifiers = signal([], ...(ngDevMode ? [{ debugName: "availableModifiers" }] : /* istanbul ignore next */ []));
    // Modern Outputs (Observable-like emitters without RxJS overhead)
    curationComplete = output();
    cancelled = output();
    errorOccurred = output();
    successOccurred = output();
    ngOnInit() {
        // Resolve modifiers on initialization using the input configuration
        this.config().availableModifiers()
            .then(modifiers => this.availableModifiers.set(modifiers))
            .catch(err => this.errorOccurred.emit(`Failed to load modifiers: ${err}`));
    }
    /**
     * Step 1 Callback: Ingests raw text annotations from the parser engine
     */
    handleMiningRequest(event) {
        this.config().mineTextProvider(event.text)
            .then((sentences) => event.callback(sentences))
            .catch((error) => event.callback(error?.message || 'Text mining execution failed.'));
    }
    onTextMiningSuccess(parsedSentences) {
        this.successOccurred.emit(`Parsed sentences: n=${parsedSentences.length}`);
        this.curatedSentences.set(parsedSentences);
        this.currentStep.set(2);
    }
    onTextMiningError(message) {
        this.errorOccurred.emit(`Ontology text mining parsing pipeline failed: ${message}.`);
    }
    /**
     * Step 2 Callback: Ingests final curated tokens to return to the backend database
     */
    onCurationComplete(finalSentences) {
        this.curationComplete.emit(finalSentences);
    }
    onSegmentsReplaced(event) {
        this.curatedSentences.update(all => all.map(s => s.start !== event.sentence.start
            ? s
            : {
                ...s,
                segments: [
                    ...s.segments.slice(0, event.segmentIndex),
                    ...event.newSegments,
                    ...s.segments.slice(event.segmentIndex + 1),
                ],
            }));
    }
    close() {
        this.cancelled.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoTwostepMiningComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: HpoTwostepMiningComponent, isStandalone: true, selector: "lib-hpo-twostep-mining", inputs: { config: { classPropertyName: "config", publicName: "config", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { curationComplete: "curationComplete", cancelled: "cancelled", errorOccurred: "errorOccurred", successOccurred: "successOccurred" }, ngImport: i0, template: "<div class=\"hpo-twostep-container\">\n  @if (currentStep() === 1) {\n    <hpo-mining-workspace\n      (miningRequested)=\"handleMiningRequest($event)\"\n      (success)=\"onTextMiningSuccess($event)\"\n      (error)=\"onTextMiningError($event)\"\n      (cancel)=\"close()\">\n    </hpo-mining-workspace>\n  } @else if (currentStep() === 2) {\n     <hpo-polishing-workspace\n          [sentences]=\"curatedSentences()\"\n          [autocompleteProvider]=\"config().autocompleteProvider\"\n          [hierarchyProvider]=\"config().hierarchyProvider\"\n          [availableModifiers]=\"availableModifiers()\"\n          (segmentsReplaced)=\"onSegmentsReplaced($event)\"\n          (complete)=\"onCurationComplete($event)\"\n          (cancel)=\"close()\">\n        </hpo-polishing-workspace>\n  }\n</div>", styles: [".native-modal-backdrop{position:fixed;inset:0;background-color:#0009;display:flex;justify-content:center;align-items:center;z-index:9999;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.native-modal-container{background:#fff;width:950px;max-width:95vw;height:85vh;border-radius:12px;border:1px solid #e2e8f0;border-top:3px solid #3f51b5;box-shadow:0 20px 25px -5px #0003;display:flex;flex-direction:column;overflow:hidden}.modal-header{padding:1.25rem;border-bottom:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center}.modal-body{flex:1;overflow-y:auto;padding:2rem;display:flex;flex-direction:column}.modal-footer{padding:1rem 1.5rem;background:#f9fafb;border-top:1px solid #e5e7eb;display:flex;justify-content:flex-end;gap:12px}app-hpomining,app-hpopolishing{display:block;width:100%;flex:1}\n"], dependencies: [{ kind: "component", type: HpoMiningComponent, selector: "hpo-mining-workspace", outputs: ["success", "error", "cancel", "miningRequested"] }, { kind: "component", type: HpoPolishingWorkspaceComponent, selector: "hpo-polishing-workspace", inputs: ["sentences", "availableModifiers", "hierarchyProvider", "autocompleteProvider"], outputs: ["segmentsReplaced", "complete", "cancel", "badgeMoved"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoTwostepMiningComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-hpo-twostep-mining', standalone: true, imports: [
                        HpoMiningComponent,
                        HpoPolishingWorkspaceComponent,
                    ], template: "<div class=\"hpo-twostep-container\">\n  @if (currentStep() === 1) {\n    <hpo-mining-workspace\n      (miningRequested)=\"handleMiningRequest($event)\"\n      (success)=\"onTextMiningSuccess($event)\"\n      (error)=\"onTextMiningError($event)\"\n      (cancel)=\"close()\">\n    </hpo-mining-workspace>\n  } @else if (currentStep() === 2) {\n     <hpo-polishing-workspace\n          [sentences]=\"curatedSentences()\"\n          [autocompleteProvider]=\"config().autocompleteProvider\"\n          [hierarchyProvider]=\"config().hierarchyProvider\"\n          [availableModifiers]=\"availableModifiers()\"\n          (segmentsReplaced)=\"onSegmentsReplaced($event)\"\n          (complete)=\"onCurationComplete($event)\"\n          (cancel)=\"close()\">\n        </hpo-polishing-workspace>\n  }\n</div>", styles: [".native-modal-backdrop{position:fixed;inset:0;background-color:#0009;display:flex;justify-content:center;align-items:center;z-index:9999;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.native-modal-container{background:#fff;width:950px;max-width:95vw;height:85vh;border-radius:12px;border:1px solid #e2e8f0;border-top:3px solid #3f51b5;box-shadow:0 20px 25px -5px #0003;display:flex;flex-direction:column;overflow:hidden}.modal-header{padding:1.25rem;border-bottom:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center}.modal-body{flex:1;overflow-y:auto;padding:2rem;display:flex;flex-direction:column}.modal-footer{padding:1rem 1.5rem;background:#f9fafb;border-top:1px solid #e5e7eb;display:flex;justify-content:flex-end;gap:12px}app-hpomining,app-hpopolishing{display:block;width:100%;flex:1}\n"] }]
        }], propDecorators: { config: [{ type: i0.Input, args: [{ isSignal: true, alias: "config", required: true }] }], curationComplete: [{ type: i0.Output, args: ["curationComplete"] }], cancelled: [{ type: i0.Output, args: ["cancelled"] }], errorOccurred: [{ type: i0.Output, args: ["errorOccurred"] }], successOccurred: [{ type: i0.Output, args: ["successOccurred"] }] } });

/*
 * Public API Surface of ng-hpo-uikit
 */
/* export * from './lib/ng-hpo-uikit'; */
/* services */

/**
 * Generated bundle index. Do not edit.
 */

export { FooterComponent, HelpButtonComponent, HpoAgeSelectorComponent, HpoMiningComponent, HpoModifierComponent, HpoPolishRowComponent, HpoPolishingWorkspaceComponent, HpoTwostepMiningComponent, LoadOntologyComponent, ModifierSelectorComponent, NotificationService, OntologyAutocompleteComponent, OrcidDialogComponent, PhenopacketLoaderComponent, TextMiningContainerComponent, ui_from_fenominal };
//# sourceMappingURL=ng-hpo-uikit.mjs.map
