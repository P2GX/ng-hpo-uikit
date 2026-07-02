import * as i0 from '@angular/core';
import { Component, inject, input, output, computed, ViewEncapsulation, model, signal, Injectable, viewChild, effect } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as i1 from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import * as i2 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i3 from '@angular/material/icon';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from '@angular/forms';
import { FormsModule, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import * as i3$1 from '@angular/material/autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import * as i2$1 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, startWith, debounceTime, switchMap, of } from 'rxjs';
import { MatOptionModule } from '@angular/material/core';
import { toSignal } from '@angular/core/rxjs-interop';
import * as i2$2 from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as i1$2 from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import * as i4 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';

class NgHpoUikit {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: NgHpoUikit, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.17", type: NgHpoUikit, isStandalone: true, selector: "lib-ng-hpo-uikit", ngImport: i0, template: ` <p>ng-hpo-uikit works!</p> `, isInline: true, styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: NgHpoUikit, decorators: [{
            type: Component,
            args: [{ selector: 'lib-ng-hpo-uikit', imports: [], template: ` <p>ng-hpo-uikit works!</p> ` }]
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.17", type: FooterComponent, isStandalone: true, selector: "lib-shared-footer", inputs: { appName: { classPropertyName: "appName", publicName: "appName", isSignal: true, isRequired: true, transformFunction: null }, appVersion: { classPropertyName: "appVersion", publicName: "appVersion", isSignal: true, isRequired: true, transformFunction: null }, gitHubIssuesUrl: { classPropertyName: "gitHubIssuesUrl", publicName: "gitHubIssuesUrl", isSignal: true, isRequired: true, transformFunction: null }, currentYear: { classPropertyName: "currentYear", publicName: "currentYear", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { helpRequested: "helpRequested" }, ngImport: i0, template: "<!-- Inside your UI library: shared-footer.component.html -->\n<footer class=\"site-footer\">\n  <div class=\"footer-content\">\n    <p>&copy; {{ currentYear() }} {{ appName() }} v{{ appVersion() }}</p>\n    \n    <button \n      (click)=\"onHelpClick()\"\n      class=\"footer-link\"\n      title=\"Open help documentation\"\n    >\n      <span>Help</span>\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-4 w-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />\n      </svg>\n    </button>\n\n    <!-- The link now uses a reactive input bound to href -->\n    <a\n      [href]=\"sanitizedIssuesUrl()\"\n      target=\"_blank\"\n      rel=\"noopener noreferrer\"\n      class=\"footer-link\"\n      title=\"Report a bug or problem on GitHub\"\n    >\n      <span>Report bug</span>\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-4 w-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 8l1.5-1.5M5 8L3.5 6.5M12 1v2M12 5a4 4 0 00-4 4v2H8 a4 4 0 008 0h0V9a4 4 0 00-4-4zM4 13h16M4 17h16M12 21v2\" />\n      </svg>\n    </a>\n  </div>\n</footer>", styles: [".site-footer{background-color:#f3f4f6;text-align:center;padding:1rem 0;font-size:14px;color:#4b5563;box-shadow:inset 0 2px 4px #0000000d}.footer-content{display:flex;align-items:center;justify-content:center;gap:16px}.footer-link{display:flex;align-items:center;gap:4px;color:#2563eb;text-decoration:underline;background:none;border:none;padding:0;cursor:pointer;font-size:inherit;transition:color .2s ease}.footer-link:hover{color:#1e40af}.site-footer .icon{height:16px;width:16px}@media(max-width:480px){.footer-content{flex-direction:column;gap:8px}}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: FooterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-shared-footer', standalone: true, template: "<!-- Inside your UI library: shared-footer.component.html -->\n<footer class=\"site-footer\">\n  <div class=\"footer-content\">\n    <p>&copy; {{ currentYear() }} {{ appName() }} v{{ appVersion() }}</p>\n    \n    <button \n      (click)=\"onHelpClick()\"\n      class=\"footer-link\"\n      title=\"Open help documentation\"\n    >\n      <span>Help</span>\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-4 w-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />\n      </svg>\n    </button>\n\n    <!-- The link now uses a reactive input bound to href -->\n    <a\n      [href]=\"sanitizedIssuesUrl()\"\n      target=\"_blank\"\n      rel=\"noopener noreferrer\"\n      class=\"footer-link\"\n      title=\"Report a bug or problem on GitHub\"\n    >\n      <span>Report bug</span>\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-4 w-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 8l1.5-1.5M5 8L3.5 6.5M12 1v2M12 5a4 4 0 00-4 4v2H8 a4 4 0 008 0h0V9a4 4 0 00-4-4zM4 13h16M4 17h16M12 21v2\" />\n      </svg>\n    </a>\n  </div>\n</footer>", styles: [".site-footer{background-color:#f3f4f6;text-align:center;padding:1rem 0;font-size:14px;color:#4b5563;box-shadow:inset 0 2px 4px #0000000d}.footer-content{display:flex;align-items:center;justify-content:center;gap:16px}.footer-link{display:flex;align-items:center;gap:4px;color:#2563eb;text-decoration:underline;background:none;border:none;padding:0;cursor:pointer;font-size:inherit;transition:color .2s ease}.footer-link:hover{color:#1e40af}.site-footer .icon{height:16px;width:16px}@media(max-width:480px){.footer-content{flex-direction:column;gap:8px}}\n"] }]
        }], propDecorators: { appName: [{ type: i0.Input, args: [{ isSignal: true, alias: "appName", required: true }] }], appVersion: [{ type: i0.Input, args: [{ isSignal: true, alias: "appVersion", required: true }] }], gitHubIssuesUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "gitHubIssuesUrl", required: true }] }], currentYear: [{ type: i0.Input, args: [{ isSignal: true, alias: "currentYear", required: false }] }], helpRequested: [{ type: i0.Output, args: ["helpRequested"] }] } });

class HelpButtonComponent {
    title = input.required(...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    lines = input.required(...(ngDevMode ? [{ debugName: "lines" }] : /* istanbul ignore next */ []));
    helpUrl = input(...(ngDevMode ? [undefined, { debugName: "helpUrl" }] : /* istanbul ignore next */ []));
    /* Open page safely in system browser via Tauri opener, or a new tab otherwise */
    async openDocs() {
        const url = this.helpUrl();
        if (!url) {
            return;
        }
        try {
            // Use the tauri opener if available in the application, but do not import it in this library
            // requires that @tauri-apps/plugin-opener be declared optional in package.json
            if ('__TAURI_INTERNALS__' in window) {
                const { openUrl } = await import('@tauri-apps/plugin-opener');
                await openUrl(url);
            }
            else {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        }
        catch (err) {
            console.error('Failed to open documentation:', err);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HelpButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: HelpButtonComponent, isStandalone: true, selector: "lib-help-button", inputs: { title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: true, transformFunction: null }, lines: { classPropertyName: "lines", publicName: "lines", isSignal: true, isRequired: true, transformFunction: null }, helpUrl: { classPropertyName: "helpUrl", publicName: "helpUrl", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<button mat-icon-button [matMenuTriggerFor]=\"helpMenu\" class=\"help-trigger\" type=\"button\">\n  <mat-icon>help_outline</mat-icon>\n</button>\n\n<mat-menu #helpMenu=\"matMenu\" panelClass=\"help-bubble-menu\">\n  <div class=\"help-content\" (click)=\"$event.stopPropagation()\">\n    <h3 class=\"help-title\">{{ title() }}</h3>\n    \n    @for (line of lines(); track line) {\n      <p class=\"help-text\" [innerHTML]=\"line\"></p>\n    }\n\n    @if (helpUrl()) {\n      <hr class=\"help-divider\">\n      <button class=\"btn-docs\" (click)=\"openDocs()\">\n        <mat-icon>open_in_new</mat-icon>\n        <span>Learn more</span>\n      </button>\n    }\n  </div>\n</mat-menu>", styles: [".help-bubble-menu{max-width:280px!important;border-radius:8px!important;background-color:#fff;box-shadow:0 4px 12px #00000026}.help-bubble-menu .help-content{padding:12px 16px}.help-bubble-menu .help-content .help-title{margin:0 0 8px;font-size:.95rem;font-weight:600;color:#333}.help-bubble-menu .help-content .help-text{margin:0 0 6px;font-size:.85rem;line-height:1.4;color:#555}.help-bubble-menu .help-content .help-text:last-of-type{margin-bottom:0}.help-bubble-menu .help-content .help-divider{border:0;border-top:1px solid #eef0f2;margin:10px 0}.help-bubble-menu .help-content .btn-docs{display:flex;align-items:center;gap:6px;background:none;border:none;color:#0288d1;font-size:.85rem;font-weight:500;cursor:pointer;padding:4px 0;width:100%;text-align:left}.help-bubble-menu .help-content .btn-docs mat-icon{font-size:16px;width:16px;height:16px}.help-bubble-menu .help-content .btn-docs:hover{color:#01579b;text-decoration:underline}\n"], dependencies: [{ kind: "ngmodule", type: MatMenuModule }, { kind: "component", type: i1.MatMenu, selector: "mat-menu", inputs: ["backdropClass", "aria-label", "aria-labelledby", "aria-describedby", "xPosition", "yPosition", "overlapTrigger", "hasBackdrop", "class", "classList"], outputs: ["closed", "close"], exportAs: ["matMenu"] }, { kind: "directive", type: i1.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", inputs: ["mat-menu-trigger-for", "matMenuTriggerFor", "matMenuTriggerData", "matMenuTriggerRestoreFocus"], outputs: ["menuOpened", "onMenuOpen", "menuClosed", "onMenuClose"], exportAs: ["matMenuTrigger"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i2.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HelpButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-help-button', standalone: true, imports: [MatMenuModule, MatButtonModule, MatIconModule], encapsulation: ViewEncapsulation.None, template: "<button mat-icon-button [matMenuTriggerFor]=\"helpMenu\" class=\"help-trigger\" type=\"button\">\n  <mat-icon>help_outline</mat-icon>\n</button>\n\n<mat-menu #helpMenu=\"matMenu\" panelClass=\"help-bubble-menu\">\n  <div class=\"help-content\" (click)=\"$event.stopPropagation()\">\n    <h3 class=\"help-title\">{{ title() }}</h3>\n    \n    @for (line of lines(); track line) {\n      <p class=\"help-text\" [innerHTML]=\"line\"></p>\n    }\n\n    @if (helpUrl()) {\n      <hr class=\"help-divider\">\n      <button class=\"btn-docs\" (click)=\"openDocs()\">\n        <mat-icon>open_in_new</mat-icon>\n        <span>Learn more</span>\n      </button>\n    }\n  </div>\n</mat-menu>", styles: [".help-bubble-menu{max-width:280px!important;border-radius:8px!important;background-color:#fff;box-shadow:0 4px 12px #00000026}.help-bubble-menu .help-content{padding:12px 16px}.help-bubble-menu .help-content .help-title{margin:0 0 8px;font-size:.95rem;font-weight:600;color:#333}.help-bubble-menu .help-content .help-text{margin:0 0 6px;font-size:.85rem;line-height:1.4;color:#555}.help-bubble-menu .help-content .help-text:last-of-type{margin-bottom:0}.help-bubble-menu .help-content .help-divider{border:0;border-top:1px solid #eef0f2;margin:10px 0}.help-bubble-menu .help-content .btn-docs{display:flex;align-items:center;gap:6px;background:none;border:none;color:#0288d1;font-size:.85rem;font-weight:500;cursor:pointer;padding:4px 0;width:100%;text-align:left}.help-bubble-menu .help-content .btn-docs mat-icon{font-size:16px;width:16px;height:16px}.help-bubble-menu .help-content .btn-docs:hover{color:#01579b;text-decoration:underline}\n"] }]
        }], propDecorators: { title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: true }] }], lines: [{ type: i0.Input, args: [{ isSignal: true, alias: "lines", required: true }] }], helpUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "helpUrl", required: false }] }] } });

class HpoOnsetSelectorComponent {
    selectedOnset = model(...(ngDevMode ? [undefined, { debugName: "selectedOnset" }] : /* istanbul ignore next */ []));
    availableOnsets = input.required(...(ngDevMode ? [{ debugName: "availableOnsets" }] : /* istanbul ignore next */ []));
    requestNewOnset = output();
    onsetChanged = output();
    onOnsetSelect(value) {
        this.selectedOnset.set(value);
        this.onsetChanged.emit(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoOnsetSelectorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.17", type: HpoOnsetSelectorComponent, isStandalone: true, selector: "lib-hpo-onset-selector", inputs: { selectedOnset: { classPropertyName: "selectedOnset", publicName: "selectedOnset", isSignal: true, isRequired: false, transformFunction: null }, availableOnsets: { classPropertyName: "availableOnsets", publicName: "availableOnsets", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { selectedOnset: "selectedOnsetChange", requestNewOnset: "requestNewOnset", onsetChanged: "onsetChanged" }, ngImport: i0, template: " <div class=\"onset-select-container\">\n  <div class=\"onset-input-row\">\n    <select \n      [ngModel]=\"selectedOnset()\"\n      (ngModelChange)=\"onOnsetSelect($event)\"\n      class=\"onset-select\">\n      <option value=\"\" disabled selected hidden>Select onset age...</option>\n      <option *ngFor=\"let option of availableOnsets()\" [value]=\"option\">\n        {{ option }}\n      </option>\n    </select>\n\n    <button \n      type=\"button\" \n      class=\"btn-add-onset\" \n      (click)=\"requestNewOnset.emit()\" \n      title=\"Create new age term\">\n      + New\n    </button>\n  </div>\n</div>", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i5.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i5.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i5.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoOnsetSelectorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-hpo-onset-selector', standalone: true, imports: [CommonModule, FormsModule], template: " <div class=\"onset-select-container\">\n  <div class=\"onset-input-row\">\n    <select \n      [ngModel]=\"selectedOnset()\"\n      (ngModelChange)=\"onOnsetSelect($event)\"\n      class=\"onset-select\">\n      <option value=\"\" disabled selected hidden>Select onset age...</option>\n      <option *ngFor=\"let option of availableOnsets()\" [value]=\"option\">\n        {{ option }}\n      </option>\n    </select>\n\n    <button \n      type=\"button\" \n      class=\"btn-add-onset\" \n      (click)=\"requestNewOnset.emit()\" \n      title=\"Create new age term\">\n      + New\n    </button>\n  </div>\n</div>" }]
        }], propDecorators: { selectedOnset: [{ type: i0.Input, args: [{ isSignal: true, alias: "selectedOnset", required: false }] }, { type: i0.Output, args: ["selectedOnsetChange"] }], availableOnsets: [{ type: i0.Input, args: [{ isSignal: true, alias: "availableOnsets", required: true }] }], requestNewOnset: [{ type: i0.Output, args: ["requestNewOnset"] }], onsetChanged: [{ type: i0.Output, args: ["onsetChanged"] }] } });

class HpoModifierMenuComponent {
    // Inputs & Models using modern Signal APIs
    availableModifiers = input.required(...(ngDevMode ? [{ debugName: "availableModifiers" }] : /* istanbul ignore next */ []));
    selectedModifierIds = model([], ...(ngDevMode ? [{ debugName: "selectedModifierIds" }] : /* istanbul ignore next */ []));
    // Outputs
    modifierToggled = output();
    menuClosed = output();
    /**
     * Checks if a given modifier ID is currently selected
     */
    isModifierSelected(id) {
        return this.selectedModifierIds().includes(id);
    }
    /**
     * Handles the selection change from a checkbox/toggle item
     */
    onToggleModifier(id, isChecked) {
        const currentIds = this.selectedModifierIds();
        let updatedIds;
        if (isChecked) {
            updatedIds = [...currentIds, id];
        }
        else {
            updatedIds = currentIds.filter(item => item !== id);
        }
        // Update the model signal (triggers two-way binding)
        this.selectedModifierIds.set(updatedIds);
        // Emit granular change event
        this.modifierToggled.emit({ id, selected: isChecked });
    }
    /**
     * Action to close the menu panel (e.g., clicking a 'Done' button or blur)
     */
    closeMenu() {
        this.menuClosed.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoModifierMenuComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: HpoModifierMenuComponent, isStandalone: true, selector: "lib-hpo-modifier-menu", inputs: { availableModifiers: { classPropertyName: "availableModifiers", publicName: "availableModifiers", isSignal: true, isRequired: true, transformFunction: null }, selectedModifierIds: { classPropertyName: "selectedModifierIds", publicName: "selectedModifierIds", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { selectedModifierIds: "selectedModifierIdsChange", modifierToggled: "modifierToggled", menuClosed: "menuClosed" }, ngImport: i0, template: "<div class=\"modifier-menu-container\">\n  <div class=\"modifier-menu-header\">\n    <span>Select Modifiers</span>\n  </div>\n\n  <div class=\"modifier-options-list\">\n  @for (option of availableModifiers(); track option.id) {\n    <label class=\"modifier-option-item\">\n      <input \n        type=\"checkbox\"\n        [checked]=\"isModifierSelected(option.id)\"\n        (change)=\"onToggleModifier(option.id, $any($event.target).checked)\"\n        class=\"modifier-checkbox\" />\n      <span class=\"modifier-label\">{{ option.label }}</span>\n      <span class=\"modifier-id-badge\">{{ option.id }}</span>\n    </label>\n  } @empty {\n    <span class=\"no-modifiers-placeholder\">No modifiers available.</span>\n  }\n</div>\n\n  <div class=\"modifier-menu-footer\">\n    <button \n      type=\"button\" \n      class=\"btn-close-menu\" \n      (click)=\"closeMenu()\">\n      Done\n    </button>\n  </div>\n</div>", styles: [".onset-select-container{display:inline-block;width:100%;box-sizing:border-box}.onset-select-container .onset-input-row{display:flex;align-items:center;gap:8px;width:100%}.onset-select-container .onset-select{flex:1;padding:6px 12px;font-size:14px;line-height:1.5;color:#333;background-color:#fff;border:1px solid #cccccc;border-radius:4px;height:36px;transition:border-color .15s ease-in-out}.onset-select-container .onset-select:focus{outline:none;border-color:#4a90e2}.onset-select-container .onset-select:disabled{background-color:#f5f5f5;color:#999;cursor:not-allowed}.onset-select-container .btn-add-onset{display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;padding:6px 12px;font-size:14px;font-weight:500;height:36px;color:#4a90e2;background-color:transparent;border:1px dashed #4a90e2;border-radius:4px;cursor:pointer;transition:all .2s ease}.onset-select-container .btn-add-onset:hover{background-color:#4a90e214;border-style:solid}.onset-select-container .btn-add-onset:active{background-color:#4a90e226}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoModifierMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-hpo-modifier-menu', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"modifier-menu-container\">\n  <div class=\"modifier-menu-header\">\n    <span>Select Modifiers</span>\n  </div>\n\n  <div class=\"modifier-options-list\">\n  @for (option of availableModifiers(); track option.id) {\n    <label class=\"modifier-option-item\">\n      <input \n        type=\"checkbox\"\n        [checked]=\"isModifierSelected(option.id)\"\n        (change)=\"onToggleModifier(option.id, $any($event.target).checked)\"\n        class=\"modifier-checkbox\" />\n      <span class=\"modifier-label\">{{ option.label }}</span>\n      <span class=\"modifier-id-badge\">{{ option.id }}</span>\n    </label>\n  } @empty {\n    <span class=\"no-modifiers-placeholder\">No modifiers available.</span>\n  }\n</div>\n\n  <div class=\"modifier-menu-footer\">\n    <button \n      type=\"button\" \n      class=\"btn-close-menu\" \n      (click)=\"closeMenu()\">\n      Done\n    </button>\n  </div>\n</div>", styles: [".onset-select-container{display:inline-block;width:100%;box-sizing:border-box}.onset-select-container .onset-input-row{display:flex;align-items:center;gap:8px;width:100%}.onset-select-container .onset-select{flex:1;padding:6px 12px;font-size:14px;line-height:1.5;color:#333;background-color:#fff;border:1px solid #cccccc;border-radius:4px;height:36px;transition:border-color .15s ease-in-out}.onset-select-container .onset-select:focus{outline:none;border-color:#4a90e2}.onset-select-container .onset-select:disabled{background-color:#f5f5f5;color:#999;cursor:not-allowed}.onset-select-container .btn-add-onset{display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;padding:6px 12px;font-size:14px;font-weight:500;height:36px;color:#4a90e2;background-color:transparent;border:1px dashed #4a90e2;border-radius:4px;cursor:pointer;transition:all .2s ease}.onset-select-container .btn-add-onset:hover{background-color:#4a90e214;border-style:solid}.onset-select-container .btn-add-onset:active{background-color:#4a90e226}\n"] }]
        }], propDecorators: { availableModifiers: [{ type: i0.Input, args: [{ isSignal: true, alias: "availableModifiers", required: true }] }], selectedModifierIds: [{ type: i0.Input, args: [{ isSignal: true, alias: "selectedModifierIds", required: false }] }, { type: i0.Output, args: ["selectedModifierIdsChange"] }], modifierToggled: [{ type: i0.Output, args: ["modifierToggled"] }], menuClosed: [{ type: i0.Output, args: ["menuClosed"] }] } });

class HpoPolisherRowComponent {
    annotation = model.required(...(ngDevMode ? [{ debugName: "annotation" }] : /* istanbul ignore next */ []));
    hierarchy = input(null, ...(ngDevMode ? [{ debugName: "hierarchy" }] : /* istanbul ignore next */ []));
    availableOnsets = input([], ...(ngDevMode ? [{ debugName: "availableOnsets" }] : /* istanbul ignore next */ []));
    availableModifiers = input([], ...(ngDevMode ? [{ debugName: "availableModifiers" }] : /* istanbul ignore next */ []));
    updated = output();
    deleteRequested = output();
    termClick = output();
    createOnsetRequested = output();
    // Local autocomplete search inputs
    modifierSearchQuery = signal('', ...(ngDevMode ? [{ debugName: "modifierSearchQuery" }] : /* istanbul ignore next */ []));
    onsetSearchQuery = signal('', ...(ngDevMode ? [{ debugName: "onsetSearchQuery" }] : /* istanbul ignore next */ []));
    showHierarchyMenu = signal(false, ...(ngDevMode ? [{ debugName: "showHierarchyMenu" }] : /* istanbul ignore next */ []));
    showModifierMenu = signal(false, ...(ngDevMode ? [{ debugName: "showModifierMenu" }] : /* istanbul ignore next */ []));
    filteredModifiers = computed(() => {
        const query = this.modifierSearchQuery().toLowerCase().trim();
        const available = this.availableModifiers();
        const currentSelected = this.annotation().modifiers || [];
        return available.filter(mod => !currentSelected.includes(mod) &&
            mod.toLowerCase().includes(query));
    }, ...(ngDevMode ? [{ debugName: "filteredModifiers" }] : /* istanbul ignore next */ []));
    filteredOnsets = computed(() => {
        const query = this.onsetSearchQuery().toLowerCase().trim();
        return this.availableOnsets().filter(onset => onset.toLowerCase().includes(query));
    }, ...(ngDevMode ? [{ debugName: "filteredOnsets" }] : /* istanbul ignore next */ []));
    formattedModifierOptions = computed(() => {
        return this.availableModifiers().map(m => ({ id: m, label: m }));
    }, ...(ngDevMode ? [{ debugName: "formattedModifierOptions" }] : /* istanbul ignore next */ []));
    updateModifiers(updatedMods) {
        const updatedAnnotation = {
            ...this.annotation(),
            modifiers: updatedMods
        };
        this.annotation.set(updatedAnnotation); // Update local signal view
        this.updated.emit(updatedAnnotation); // Inform parent/backend pipeline
    }
    toggleHierarchyMenu() {
        this.showHierarchyMenu.update(v => !v);
    }
    replaceTerm(target) {
        const updatedAnnotation = {
            ...this.annotation(),
            termId: target.termId,
            label: target.label
        };
        this.annotation.set(updatedAnnotation);
        this.updated.emit(updatedAnnotation);
        this.showHierarchyMenu.set(false);
    }
    toggleObserved() {
        const updatedAnnotation = {
            ...this.annotation(),
            isObserved: !this.annotation().isObserved
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
    addModifier(event) {
        const select = event.target;
        const value = select.value;
        if (!value)
            return;
        const currentMods = this.annotation().modifiers || [];
        if (!currentMods.includes(value)) {
            const updatedAnnotation = {
                ...this.annotation(),
                modifiers: [...currentMods, value]
            };
            this.annotation.set(updatedAnnotation); // Update local view
            this.updated.emit(updatedAnnotation);
        }
        select.value = ''; // Reset select tag view line
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
    onRequestNewOnset() {
        this.createOnsetRequested.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoPolisherRowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: HpoPolisherRowComponent, isStandalone: true, selector: "tr[lib-hpo-polisher-row]", inputs: { annotation: { classPropertyName: "annotation", publicName: "annotation", isSignal: true, isRequired: true, transformFunction: null }, hierarchy: { classPropertyName: "hierarchy", publicName: "hierarchy", isSignal: true, isRequired: false, transformFunction: null }, availableOnsets: { classPropertyName: "availableOnsets", publicName: "availableOnsets", isSignal: true, isRequired: false, transformFunction: null }, availableModifiers: { classPropertyName: "availableModifiers", publicName: "availableModifiers", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { annotation: "annotationChange", updated: "updated", deleteRequested: "deleteRequested", termClick: "termClick", createOnsetRequested: "createOnsetRequested" }, ngImport: i0, template: "<td class=\"font-mono\">\n    <a (click)=\"termClick.emit(annotation().termId)\" class=\"link-text\">\n    {{ annotation().termId }}\n    </a>\n</td>\n\n<td class=\"label-cell\">\n    <div class=\"dropdown-wrapper\">\n    <span (click)=\"toggleHierarchyMenu()\" class=\"dropdown-trigger\">\n        {{ annotation().label }} <span class=\"caret\">\u25BC</span>\n    </span>\n\n    @if (showHierarchyMenu()) {\n        <div class=\"local-context-menu\" (mouseleave)=\"showHierarchyMenu.set(false)\">\n        @if (hierarchy()?.parents?.length) {\n            <div class=\"menu-section-title\">Parents</div>\n            <ul>\n            @for (p of hierarchy()?.parents; track p.termId) {\n                <li (click)=\"replaceTerm(p)\" class=\"menu-item\">{{ p.label }} ({{ p.termId }})</li>\n            }\n            </ul>\n        }\n        @if (hierarchy()?.children?.length) {\n            <div class=\"menu-section-title\">Children</div>\n            <ul>\n            @for (c of hierarchy()?.children; track c.termId) {\n                <li (click)=\"replaceTerm(c)\" class=\"menu-item\">{{ c.label }} ({{ c.termId }})</li>\n            }\n            </ul>\n        }\n        </div>\n    }\n    </div>\n</td>\n\n<td>\n    <span class=\"badge\" [ngClass]=\"annotation().isObserved ? 'badge-green' : 'badge-red'\">\n    {{ annotation().isObserved ? 'OBS' : 'EXC' }}\n    </span>\n</td>\n\n<td class=\"onset-cell\">\n  <lib-hpo-onset-selector\n    [selectedOnset]=\"annotation().onsetString\"\n    [availableOnsets]=\"availableOnsets()\"\n    (onsetChanged)=\"changeOnset($event)\"\n    (requestNewOnset)=\"onRequestNewOnset()\"\n  />\n</td>\n\n<td class=\"modifier-cell\">\n  <div class=\"modifier-menu-wrapper\">\n    \n    <div class=\"active-modifiers-preview\" (click)=\"showModifierMenu.set(!showModifierMenu())\">\n      @for (mod of annotation().modifiers || []; track mod) {\n        <span class=\"modifier-chip\">{{ mod }}</span>\n      } @empty {\n        <span class=\"placeholder-text\">+ Add Modifier</span>\n      }\n    </div>\n\n    @if (showModifierMenu()) {\n      <div class=\"modifier-overlay\" (mouseleave)=\"showModifierMenu.set(false)\">\n        <lib-hpo-modifier-menu\n          [availableModifiers]=\"formattedModifierOptions()\"\n          [selectedModifierIds]=\"annotation().modifiers || []\"\n          (selectedModifierIdsChange)=\"updateModifiers($event)\"\n          (menuClosed)=\"showModifierMenu.set(false)\"\n        />\n      </div>\n    }\n    \n  </div>\n</td>\n\n<td class=\"action-cell\">\n    <div class=\"action-group\">\n    <button (click)=\"toggleObserved()\" class=\"btn-icon\">\n        <mat-icon>swap_horiz</mat-icon>Toggle\n    </button>\n    <button (click)=\"deleteRequested.emit()\" class=\"btn-icon btn-delete\">\n        <mat-icon>delete</mat-icon>Delete\n    </button>\n    </div>\n</td>", styles: [":host{display:table-row;--border-color: #e5e7eb;--bg-gray-light: #f9fafb;--text-gray-dark: #374151;--text-gray-muted: #6b7280;--green-bg: #dcfce7;--green-text: #15803d;--red-bg: #fee2e2;--red-text: #b91c1c;--blue-primary: #2563eb;--blue-hover: #1d4ed8;--shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)}.label-cell{position:relative}.dropdown-wrapper{position:relative;display:inline-block}.dropdown-trigger{cursor:pointer;color:#0d6efd;font-weight:500}.dropdown-trigger:hover{text-decoration:underline}.local-context-menu{position:absolute;top:100%;left:0;z-index:1000;background:#fff;border:1px solid #ced4da;border-radius:6px;box-shadow:0 4px 12px #0000001a;min-width:260px;max-height:300px;overflow-y:auto}.menu-section-title{background:#f8f9fa;padding:6px 12px;font-weight:700;font-size:11px;text-transform:uppercase;color:#6c757d}.menu-item{padding:8px 12px;font-size:13px;cursor:pointer;list-style:none}.menu-item:hover{background-color:#f1f3f5}.modifiers-container{display:flex;flex-wrap:wrap;gap:4px;align-items:center}.modifier-chip{background:#e9ecef;border-radius:12px;padding:2px 8px;font-size:11px;display:inline-flex;align-items:center;gap:4px}.remove-mod-btn{border:none;background:transparent;cursor:pointer;font-weight:700;color:#dc3545}.modifier-select,.onset-select{padding:4px;border-radius:4px;border:1px solid #ced4da;font-size:12px}.badge{padding:.125rem .375rem;border-radius:9999px;font-size:12px;font-weight:700}.badge.badge-green{background:var(--green-bg);color:var(--green-text)}.badge.badge-red{background:var(--red-bg);color:var(--red-text)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: MatChipsModule }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatAutocompleteModule }, { kind: "ngmodule", type: MatInputModule }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: HpoOnsetSelectorComponent, selector: "lib-hpo-onset-selector", inputs: ["selectedOnset", "availableOnsets"], outputs: ["selectedOnsetChange", "requestNewOnset", "onsetChanged"] }, { kind: "component", type: HpoModifierMenuComponent, selector: "lib-hpo-modifier-menu", inputs: ["availableModifiers", "selectedModifierIds"], outputs: ["selectedModifierIdsChange", "modifierToggled", "menuClosed"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoPolisherRowComponent, decorators: [{
            type: Component,
            args: [{ selector: 'tr[lib-hpo-polisher-row]', standalone: true, imports: [
                        CommonModule,
                        FormsModule,
                        MatChipsModule,
                        MatIconModule,
                        MatAutocompleteModule,
                        MatInputModule,
                        MatFormFieldModule,
                        HpoOnsetSelectorComponent,
                        HpoModifierMenuComponent
                    ], template: "<td class=\"font-mono\">\n    <a (click)=\"termClick.emit(annotation().termId)\" class=\"link-text\">\n    {{ annotation().termId }}\n    </a>\n</td>\n\n<td class=\"label-cell\">\n    <div class=\"dropdown-wrapper\">\n    <span (click)=\"toggleHierarchyMenu()\" class=\"dropdown-trigger\">\n        {{ annotation().label }} <span class=\"caret\">\u25BC</span>\n    </span>\n\n    @if (showHierarchyMenu()) {\n        <div class=\"local-context-menu\" (mouseleave)=\"showHierarchyMenu.set(false)\">\n        @if (hierarchy()?.parents?.length) {\n            <div class=\"menu-section-title\">Parents</div>\n            <ul>\n            @for (p of hierarchy()?.parents; track p.termId) {\n                <li (click)=\"replaceTerm(p)\" class=\"menu-item\">{{ p.label }} ({{ p.termId }})</li>\n            }\n            </ul>\n        }\n        @if (hierarchy()?.children?.length) {\n            <div class=\"menu-section-title\">Children</div>\n            <ul>\n            @for (c of hierarchy()?.children; track c.termId) {\n                <li (click)=\"replaceTerm(c)\" class=\"menu-item\">{{ c.label }} ({{ c.termId }})</li>\n            }\n            </ul>\n        }\n        </div>\n    }\n    </div>\n</td>\n\n<td>\n    <span class=\"badge\" [ngClass]=\"annotation().isObserved ? 'badge-green' : 'badge-red'\">\n    {{ annotation().isObserved ? 'OBS' : 'EXC' }}\n    </span>\n</td>\n\n<td class=\"onset-cell\">\n  <lib-hpo-onset-selector\n    [selectedOnset]=\"annotation().onsetString\"\n    [availableOnsets]=\"availableOnsets()\"\n    (onsetChanged)=\"changeOnset($event)\"\n    (requestNewOnset)=\"onRequestNewOnset()\"\n  />\n</td>\n\n<td class=\"modifier-cell\">\n  <div class=\"modifier-menu-wrapper\">\n    \n    <div class=\"active-modifiers-preview\" (click)=\"showModifierMenu.set(!showModifierMenu())\">\n      @for (mod of annotation().modifiers || []; track mod) {\n        <span class=\"modifier-chip\">{{ mod }}</span>\n      } @empty {\n        <span class=\"placeholder-text\">+ Add Modifier</span>\n      }\n    </div>\n\n    @if (showModifierMenu()) {\n      <div class=\"modifier-overlay\" (mouseleave)=\"showModifierMenu.set(false)\">\n        <lib-hpo-modifier-menu\n          [availableModifiers]=\"formattedModifierOptions()\"\n          [selectedModifierIds]=\"annotation().modifiers || []\"\n          (selectedModifierIdsChange)=\"updateModifiers($event)\"\n          (menuClosed)=\"showModifierMenu.set(false)\"\n        />\n      </div>\n    }\n    \n  </div>\n</td>\n\n<td class=\"action-cell\">\n    <div class=\"action-group\">\n    <button (click)=\"toggleObserved()\" class=\"btn-icon\">\n        <mat-icon>swap_horiz</mat-icon>Toggle\n    </button>\n    <button (click)=\"deleteRequested.emit()\" class=\"btn-icon btn-delete\">\n        <mat-icon>delete</mat-icon>Delete\n    </button>\n    </div>\n</td>", styles: [":host{display:table-row;--border-color: #e5e7eb;--bg-gray-light: #f9fafb;--text-gray-dark: #374151;--text-gray-muted: #6b7280;--green-bg: #dcfce7;--green-text: #15803d;--red-bg: #fee2e2;--red-text: #b91c1c;--blue-primary: #2563eb;--blue-hover: #1d4ed8;--shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)}.label-cell{position:relative}.dropdown-wrapper{position:relative;display:inline-block}.dropdown-trigger{cursor:pointer;color:#0d6efd;font-weight:500}.dropdown-trigger:hover{text-decoration:underline}.local-context-menu{position:absolute;top:100%;left:0;z-index:1000;background:#fff;border:1px solid #ced4da;border-radius:6px;box-shadow:0 4px 12px #0000001a;min-width:260px;max-height:300px;overflow-y:auto}.menu-section-title{background:#f8f9fa;padding:6px 12px;font-weight:700;font-size:11px;text-transform:uppercase;color:#6c757d}.menu-item{padding:8px 12px;font-size:13px;cursor:pointer;list-style:none}.menu-item:hover{background-color:#f1f3f5}.modifiers-container{display:flex;flex-wrap:wrap;gap:4px;align-items:center}.modifier-chip{background:#e9ecef;border-radius:12px;padding:2px 8px;font-size:11px;display:inline-flex;align-items:center;gap:4px}.remove-mod-btn{border:none;background:transparent;cursor:pointer;font-weight:700;color:#dc3545}.modifier-select,.onset-select{padding:4px;border-radius:4px;border:1px solid #ced4da;font-size:12px}.badge{padding:.125rem .375rem;border-radius:9999px;font-size:12px;font-weight:700}.badge.badge-green{background:var(--green-bg);color:var(--green-text)}.badge.badge-red{background:var(--red-bg);color:var(--red-text)}\n"] }]
        }], propDecorators: { annotation: [{ type: i0.Input, args: [{ isSignal: true, alias: "annotation", required: true }] }, { type: i0.Output, args: ["annotationChange"] }], hierarchy: [{ type: i0.Input, args: [{ isSignal: true, alias: "hierarchy", required: false }] }], availableOnsets: [{ type: i0.Input, args: [{ isSignal: true, alias: "availableOnsets", required: false }] }], availableModifiers: [{ type: i0.Input, args: [{ isSignal: true, alias: "availableModifiers", required: false }] }], updated: [{ type: i0.Output, args: ["updated"] }], deleteRequested: [{ type: i0.Output, args: ["deleteRequested"] }], termClick: [{ type: i0.Output, args: ["termClick"] }], createOnsetRequested: [{ type: i0.Output, args: ["createOnsetRequested"] }] } });

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

function ontologyMatchValidator() {
    return (control) => {
        const value = control.value;
        if (typeof value === 'string' && value.length > 0) {
            return { 'invalidSelection': true };
        }
        return null;
    };
}
class OntologyAutocompleteComponent {
    placeholder = input('Search ontology term...', ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    inputString = input('', ...(ngDevMode ? [{ debugName: "inputString" }] : /* istanbul ignore next */ []));
    // Provide the query function dynamically from the parent
    searchProvider = input.required(...(ngDevMode ? [{ debugName: "searchProvider" }] : /* istanbul ignore next */ []));
    selected = output();
    inputElement = viewChild('ontologyInput', ...(ngDevMode ? [{ debugName: "inputElement" }] : /* istanbul ignore next */ []));
    control = new FormControl('', [ontologyMatchValidator()]);
    isValid = toSignal(this.control.statusChanges.pipe(map(status => status === 'VALID')), { initialValue: false });
    options = toSignal(this.control.valueChanges.pipe(startWith(this.control.value), debounceTime(300), switchMap((value) => {
        const query = typeof value === 'string' ? value : value?.label;
        if (query && query.length > 2) {
            // Execute the dynamic search provider instead of a hardcoded service
            return this.searchProvider()(query);
        }
        return of([]);
    })), { initialValue: [] });
    constructor() {
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
    }
    displayFn(option) {
        if (!option)
            return '';
        return typeof option === 'string' ? option : option.label;
    }
    onOptionSelected(event) {
        const selection = event.option.value;
        this.selected.emit(selection);
    }
    clear() {
        this.control.setValue('');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: OntologyAutocompleteComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: OntologyAutocompleteComponent, isStandalone: true, selector: "ui-ontology-autocomplete", inputs: { placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, inputString: { classPropertyName: "inputString", publicName: "inputString", isSignal: true, isRequired: false, transformFunction: null }, searchProvider: { classPropertyName: "searchProvider", publicName: "searchProvider", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { selected: "selected" }, viewQueries: [{ propertyName: "inputElement", first: true, predicate: ["ontologyInput"], descendants: true, isSignal: true }], ngImport: i0, template: "<mat-form-field class=\"full-width-field\" appearance=\"outline\">\n  <input type=\"text\"\n    #ontologyInput\n    [placeholder]=\"placeholder()\"\n    matInput\n    [formControl]=\"control\"\n    [matAutocomplete]=\"auto\"\n    spellcheck=\"false\"\n    autocomplete=\"off\">\n\n  @if (control.value) {\n    <button matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"clear()\">\n      <mat-icon>close</mat-icon>\n    </button>\n  }\n  \n  <mat-autocomplete \n    #auto=\"matAutocomplete\" \n    [displayWith]=\"displayFn\" \n    (optionSelected)=\"onOptionSelected($event)\">\n    @for (option of options(); track option.id) {\n      <mat-option [value]=\"option\">\n        <div class=\"option-container\">\n          <span class=\"option-matched-text\">{{ option.matchedText }}</span>\n          @if (option.matchedText !== option.label) {\n            <small class=\"option-primary-label\">Primary: {{ option.label }}</small>\n          }\n          <small class=\"option-id\">{{ option.id }}</small>\n        </div>\n      </mat-option>\n    }\n  </mat-autocomplete>\n  @if (control.hasError('invalidSelection') && control.touched) {\n    <mat-error>Please select a term from the list</mat-error>\n  }\n</mat-form-field>\n", styles: [":host{display:block;width:100%}.full-width-field{width:100%}.option-container{display:flex;flex-direction:column;line-height:1.2;padding:4px 0}.option-matched-text{font-size:.875rem;font-weight:500}.option-primary-label{opacity:.7;font-style:italic;font-size:.75rem}.option-id{color:#2563eb;font-size:.75rem}::ng-deep .mat-mdc-option{line-height:normal!important;height:auto!important;min-height:48px;padding-top:8px!important;padding-bottom:8px!important}\n"], dependencies: [{ kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i2$1.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i2$1.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "directive", type: i2$1.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i2$1.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "ngmodule", type: MatAutocompleteModule }, { kind: "component", type: i3$1.MatAutocomplete, selector: "mat-autocomplete", inputs: ["aria-label", "aria-labelledby", "displayWith", "autoActiveFirstOption", "autoSelectActiveOption", "requireSelection", "panelWidth", "disableRipple", "class", "hideSingleSelectionIndicator"], outputs: ["optionSelected", "opened", "closed", "optionActivated"], exportAs: ["matAutocomplete"] }, { kind: "component", type: i3$1.MatOption, selector: "mat-option", inputs: ["value", "id", "disabled"], outputs: ["onSelectionChange"], exportAs: ["matOption"] }, { kind: "directive", type: i3$1.MatAutocompleteTrigger, selector: "input[matAutocomplete], textarea[matAutocomplete]", inputs: ["matAutocomplete", "matAutocompletePosition", "matAutocompleteConnectedTo", "autocomplete", "matAutocompleteDisabled"], exportAs: ["matAutocompleteTrigger"] }, { kind: "ngmodule", type: MatOptionModule }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: OntologyAutocompleteComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-ontology-autocomplete', standalone: true, imports: [
                        ReactiveFormsModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatAutocompleteModule,
                        MatOptionModule,
                        MatIconModule
                    ], template: "<mat-form-field class=\"full-width-field\" appearance=\"outline\">\n  <input type=\"text\"\n    #ontologyInput\n    [placeholder]=\"placeholder()\"\n    matInput\n    [formControl]=\"control\"\n    [matAutocomplete]=\"auto\"\n    spellcheck=\"false\"\n    autocomplete=\"off\">\n\n  @if (control.value) {\n    <button matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"clear()\">\n      <mat-icon>close</mat-icon>\n    </button>\n  }\n  \n  <mat-autocomplete \n    #auto=\"matAutocomplete\" \n    [displayWith]=\"displayFn\" \n    (optionSelected)=\"onOptionSelected($event)\">\n    @for (option of options(); track option.id) {\n      <mat-option [value]=\"option\">\n        <div class=\"option-container\">\n          <span class=\"option-matched-text\">{{ option.matchedText }}</span>\n          @if (option.matchedText !== option.label) {\n            <small class=\"option-primary-label\">Primary: {{ option.label }}</small>\n          }\n          <small class=\"option-id\">{{ option.id }}</small>\n        </div>\n      </mat-option>\n    }\n  </mat-autocomplete>\n  @if (control.hasError('invalidSelection') && control.touched) {\n    <mat-error>Please select a term from the list</mat-error>\n  }\n</mat-form-field>\n", styles: [":host{display:block;width:100%}.full-width-field{width:100%}.option-container{display:flex;flex-direction:column;line-height:1.2;padding:4px 0}.option-matched-text{font-size:.875rem;font-weight:500}.option-primary-label{opacity:.7;font-style:italic;font-size:.75rem}.option-id{color:#2563eb;font-size:.75rem}::ng-deep .mat-mdc-option{line-height:normal!important;height:auto!important;min-height:48px;padding-top:8px!important;padding-bottom:8px!important}\n"] }]
        }], ctorParameters: () => [], propDecorators: { placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], inputString: [{ type: i0.Input, args: [{ isSignal: true, alias: "inputString", required: false }] }], searchProvider: [{ type: i0.Input, args: [{ isSignal: true, alias: "searchProvider", required: true }] }], selected: [{ type: i0.Output, args: ["selected"] }], inputElement: [{ type: i0.ViewChild, args: ['ontologyInput', { isSignal: true }] }] } });

class HpoPolishingWorkspaceComponent {
    notificationService = inject(NotificationService);
    sentences = input([], ...(ngDevMode ? [{ debugName: "sentences" }] : /* istanbul ignore next */ []));
    availableOnsets = input([], ...(ngDevMode ? [{ debugName: "availableOnsets" }] : /* istanbul ignore next */ []));
    availableModifiers = input([], ...(ngDevMode ? [{ debugName: "availableModifiers" }] : /* istanbul ignore next */ []));
    hierarchyUpdate = input(null, ...(ngDevMode ? [{ debugName: "hierarchyUpdate" }] : /* istanbul ignore next */ []));
    hierarchyCache = signal({}, ...(ngDevMode ? [{ debugName: "hierarchyCache" }] : /* istanbul ignore next */ []));
    requestHierarchy = output();
    createOnsetRequested = output();
    complete = output();
    cancel = output();
    localSentences = signal([], ...(ngDevMode ? [{ debugName: "localSentences" }] : /* istanbul ignore next */ []));
    // Autocomplete variables
    hpoInputString = '';
    selectedHpoMatch = signal(null, ...(ngDevMode ? [{ debugName: "selectedHpoMatch" }] : /* istanbul ignore next */ []));
    searchProvider = input.required(...(ngDevMode ? [{ debugName: "searchProvider" }] : /* istanbul ignore next */ []));
    // Computed state to extract unique table annotations dynamically from sentence arrays
    uniqueTableAnnotations = computed(() => {
        const uniqueMap = new Map();
        for (const sentence of this.localSentences()) {
            for (const segment of sentence.segments) {
                if (segment.kind === 'hit') {
                    const hit = segment.hit;
                    // Intersection type lets TS know this runtime object might carry UI modifiers
                    const uiHit = hit;
                    if (!uniqueMap.has(uiHit.term_id)) {
                        uniqueMap.set(uiHit.term_id, {
                            termId: uiHit.term_id,
                            label: uiHit.label,
                            isObserved: uiHit.is_observed ?? true,
                            onsetString: uiHit.clinical_modifiers?.onset,
                            modifiers: uiHit.clinical_modifiers?.modifiers || []
                        });
                    }
                }
            }
        }
        return Array.from(uniqueMap.values());
    }, ...(ngDevMode ? [{ debugName: "uniqueTableAnnotations" }] : /* istanbul ignore next */ []));
    /** Emits when a badge is moved, passing the target element context and
     * the text window string to analyze */
    badgeMoved = output();
    handleBadgeMoved(originalTermId, textSnippet, newSpan) {
        // 1. strip the old HPO classification out of local state
        this.localSentences.update(sentences => sentences.map(s => ({
            ...s,
            segments: s.segments.map(seg => {
                if (seg.kind === 'hit' && seg.hit.term_id === originalTermId) {
                    // Convert it to a temporary placeholder asset or plain text while waiting
                    return {
                        kind: 'text',
                        text: textSnippet,
                        span: newSpan
                    };
                }
                return seg;
            })
        })));
        // 2. Notify shell to dispatch the backend extraction call
        this.badgeMoved.emit({
            originalTermId,
            newTextWindow: textSnippet,
            newSpan
        });
    }
    constructor() {
        // Intercept active async hierarchy updates dynamically using an active Reactive Effect context
        effect(() => {
            const update = this.hierarchyUpdate();
            if (update) {
                this.hierarchyCache.update(cache => ({
                    ...cache,
                    [update.currentTermId]: update
                }));
            }
        });
    }
    ngOnInit() {
        // Protect parent state context references via complete structural detachment
        this.localSentences.set(JSON.parse(JSON.stringify(this.sentences())));
    }
    /** This is called when the user moves a badge, which deletes the origal */
    handleBadgeUpdated(updatedRow, originalTermId) {
        this.localSentences.update(sentences => sentences.map(s => ({
            ...s,
            segments: s.segments.map(seg => {
                if (seg.kind === 'hit' && seg.hit.term_id === originalTermId) {
                    return {
                        ...seg,
                        text: updatedRow.label,
                        hit: {
                            term_id: updatedRow.termId,
                            label: updatedRow.label,
                            is_observed: true,
                            span: { ...seg.hit.span },
                            clinical_modifiers: {
                                onset: undefined,
                                modifiers: []
                            }
                        }
                    };
                }
                return seg;
            })
        })));
    }
    deleteAnnotationEverywhere(termId) {
        this.localSentences.update(sentences => sentences.map(s => ({
            ...s,
            segments: s.segments.filter(seg => seg.kind !== 'hit' || seg.hit.term_id !== termId)
        })));
    }
    handleHierarchyRequest(annotation) {
        if (!this.hierarchyCache()[annotation.termId]) {
            this.requestHierarchy.emit(annotation);
        }
    }
    handleAutocompleteSelection(match) {
        this.selectedHpoMatch.set(match);
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
        const newHit = {
            term_id: match.id,
            label: match.label,
            is_observed: true,
            span: { start: 0, end: match.label.length },
            clinical_modifiers: {
                onset: undefined,
                modifiers: []
            }
        }; // Cast safely past your backend contract wrapper
        // Append a synthetic sentence block to display the new manual inject token
        this.localSentences.update(list => [
            ...list,
            {
                start: Date.now(),
                original_text: match.label,
                segments: [{ kind: 'hit', text: match.label, hit: newHit }]
            }
        ]);
        // Reset autocomplete inputs
        this.selectedHpoMatch.set(null);
        this.hpoInputString = '';
    }
    saveAndFinish() {
        this.complete.emit(this.localSentences());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoPolishingWorkspaceComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: HpoPolishingWorkspaceComponent, isStandalone: true, selector: "lib-hpo-polishing-workspace", inputs: { sentences: { classPropertyName: "sentences", publicName: "sentences", isSignal: true, isRequired: false, transformFunction: null }, availableOnsets: { classPropertyName: "availableOnsets", publicName: "availableOnsets", isSignal: true, isRequired: false, transformFunction: null }, availableModifiers: { classPropertyName: "availableModifiers", publicName: "availableModifiers", isSignal: true, isRequired: false, transformFunction: null }, hierarchyUpdate: { classPropertyName: "hierarchyUpdate", publicName: "hierarchyUpdate", isSignal: true, isRequired: false, transformFunction: null }, searchProvider: { classPropertyName: "searchProvider", publicName: "searchProvider", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { requestHierarchy: "requestHierarchy", createOnsetRequested: "createOnsetRequested", complete: "complete", cancel: "cancel", badgeMoved: "badgeMoved" }, ngImport: i0, template: "<div class=\"workspace-layout\">\n  \n  <div class=\"document-preview-pane\">\n    <div class=\"annotation-text-wrapper\">\n      @for (sentence of localSentences(); track sentence.start) {\n        <p class=\"sentence-flow-line\">\n          @for (seg of sentence.segments; track $index) {\n            @if (seg.kind === 'text') {\n              <span class=\"plain-text\">{{ seg.text }}</span>\n            } @else if (seg.kind === 'hit') {\n              <span class=\"highlight-token\" [class.is-excluded]=\"!seg.hit.is_observed\">\n                {{ seg.text }}\n              </span>\n            }\n          }\n        </p>\n      }\n    </div>\n  </div>\n\n  <div class=\"table-viewport\">\n    <table class=\"data-table\">\n      <thead>\n        <tr>\n          <th class=\"col-id\">Ontology ID</th>\n          <th class=\"col-label\">Phenotypic Term Label</th>\n          <th class=\"col-status\">Status</th>\n          <th class=\"col-onset\">Onset</th>\n          <th class=\"col-modifiers\">Clinical Modifiers</th>\n          <th class=\"col-actions\">Actions</th>\n        </tr>\n      </thead>\n      <tbody>\n        @for (rowItem of uniqueTableAnnotations(); track rowItem.termId) {\n          <tr \n            lib-hpo-polisher-row\n            [annotation]=\"rowItem\"\n            [hierarchy]=\"hierarchyCache()[rowItem.termId] || null\"\n            [availableOnsets]=\"availableOnsets()\"\n            [availableModifiers]=\"availableModifiers()\"\n            (termClick)=\"handleHierarchyRequest(rowItem)\"\n            (updated)=\"handleBadgeUpdated($event, rowItem.termId)\"\n            (createOnsetRequested)=\"createOnsetRequested.emit(rowItem)\"\n            (deleteRequested)=\"deleteAnnotationEverywhere(rowItem.termId)\">\n          </tr>\n        } @empty {\n          <tr>\n            <td colspan=\"6\" class=\"empty-table-state\">\n              No clinical features currently parsed inside this annotation scope.\n            </td>\n          </tr>\n        }\n      </tbody>\n    </table>\n  </div>\n\n  <div class=\"workspace-footer\">\n    <div class=\"autocomplete-injection-box\">\n      <ui-ontology-autocomplete\n        [inputString]=\"hpoInputString\"\n        [searchProvider]=\"searchProvider()\"\n        (selected)=\"handleAutocompleteSelection($event)\">\n      </ui-ontology-autocomplete>\n      <button \n        (click)=\"injectManualHpoToken()\"\n        [disabled]=\"!selectedHpoMatch()\"\n        class=\"btn-workspace-add\">\n        <mat-icon>add</mat-icon> Inject Term\n      </button>\n    </div>\n    \n    <div class=\"action-btn-cluster\">\n      <button class=\"btn-workspace-cancel\" (click)=\"cancel.emit()\">Discard</button>\n      <button class=\"btn-workspace-finish\" (click)=\"saveAndFinish()\">Commit Curation Changes</button>\n    </div>\n  </div>\n\n</div>", styles: [".workspace-layout{display:flex;flex-direction:column;gap:20px;height:100%;font-family:system-ui,-apple-system,sans-serif}.document-preview-pane{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;max-height:200px;overflow-y:auto}.sentence-flow-line{margin-bottom:6px;line-height:1.5}.plain-text{color:#334155}.highlight-token{background:#e0f2fe;color:#0369a1;font-weight:500;padding:1px 4px;border-radius:4px}.highlight-token.is-excluded{background:#fee2e2;color:#b91c1c;text-decoration:line-through}.table-viewport{flex:1;border:1px solid #e2e8f0;border-radius:8px;overflow:auto}.data-table{width:100%;border-collapse:collapse;text-align:left;font-size:.9rem}.data-table th{background:#f1f5f9;color:#475569;padding:10px 14px;font-weight:600;position:sticky;top:0;z-index:5}.data-table td{padding:10px 14px;border-bottom:1px solid #e2e8f0;vertical-align:middle}.dropdown-trigger-span{color:#0f172a;cursor:pointer;font-weight:500;border-bottom:1px dashed #cbd5e1}.dropdown-trigger-span:hover{color:#2563eb;border-color:#2563eb}.dropdown-trigger-span .caret-icon{font-size:.7rem;color:#64748b}.badge{font-size:.75rem;font-weight:700;padding:2px 8px;border-radius:12px}.badge.badge-green{background:#dcfce7;color:#15803d}.badge.badge-red{background:#fee2e2;color:#b91c1c}.action-group-layout{display:flex;gap:8px}.btn-table-action{display:inline-flex;align-items:center;gap:4px;background:#fff;border:1px solid #cbd5e1;padding:4px 8px;border-radius:4px;font-size:.8rem;cursor:pointer}.btn-table-action mat-icon{font-size:1rem;width:16px;height:16px}.btn-table-action:hover{background:#f8fafc;color:#2563eb}.btn-table-action.btn-delete:hover{color:#dc2626;border-color:#fca5a5;background:#fff5f5}.workspace-footer{display:flex;justify-content:space-between;align-items:center;padding-top:14px;border-top:1px solid #e2e8f0}.autocomplete-injection-box{display:flex;align-items:center;gap:12px;flex:1;max-width:600px}.btn-workspace-add{display:inline-flex;align-items:center;gap:4px;background:#f1f5f9;border:1px solid #cbd5e1;color:#475569;padding:8px 14px;border-radius:6px;font-weight:500;cursor:pointer;white-space:nowrap}.btn-workspace-add:hover:not(:disabled){background:#e2e8f0;color:#0f172a}.btn-workspace-finish{background:#2563eb;color:#fff;border:none;padding:8px 18px;border-radius:6px;font-weight:600;cursor:pointer}.btn-workspace-finish:hover{background:#1d4ed8}.ontology-context-menu{position:fixed;background:#fff;border:1px solid #cbd5e1;border-radius:8px;box-shadow:0 10px 15px -3px #0000001a;width:280px;z-index:2000;max-height:300px;overflow-y:auto}.menu-section-title{background:#f8fafc;padding:6px 12px;font-size:.7rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e2e8f0}.menu-list{list-style:none;padding:0;margin:0}.menu-item-row{padding:8px 12px;font-size:.85rem;color:#334155;cursor:pointer}.menu-item-row .sub-id{color:#94a3b8;font-size:.75rem}.menu-item-row:hover{background:#f1f5f9;color:#2563eb}.menu-item-empty{padding:8px 12px;font-size:.8rem;color:#94a3b8;font-style:italic}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "component", type: MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: OntologyAutocompleteComponent, selector: "ui-ontology-autocomplete", inputs: ["placeholder", "inputString", "searchProvider"], outputs: ["selected"] }, { kind: "component", type: HpoPolisherRowComponent, selector: "tr[lib-hpo-polisher-row]", inputs: ["annotation", "hierarchy", "availableOnsets", "availableModifiers"], outputs: ["annotationChange", "updated", "deleteRequested", "termClick", "createOnsetRequested"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoPolishingWorkspaceComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-hpo-polishing-workspace', standalone: true, imports: [
                        CommonModule,
                        FormsModule,
                        MatIcon,
                        OntologyAutocompleteComponent,
                        HpoPolisherRowComponent
                    ], template: "<div class=\"workspace-layout\">\n  \n  <div class=\"document-preview-pane\">\n    <div class=\"annotation-text-wrapper\">\n      @for (sentence of localSentences(); track sentence.start) {\n        <p class=\"sentence-flow-line\">\n          @for (seg of sentence.segments; track $index) {\n            @if (seg.kind === 'text') {\n              <span class=\"plain-text\">{{ seg.text }}</span>\n            } @else if (seg.kind === 'hit') {\n              <span class=\"highlight-token\" [class.is-excluded]=\"!seg.hit.is_observed\">\n                {{ seg.text }}\n              </span>\n            }\n          }\n        </p>\n      }\n    </div>\n  </div>\n\n  <div class=\"table-viewport\">\n    <table class=\"data-table\">\n      <thead>\n        <tr>\n          <th class=\"col-id\">Ontology ID</th>\n          <th class=\"col-label\">Phenotypic Term Label</th>\n          <th class=\"col-status\">Status</th>\n          <th class=\"col-onset\">Onset</th>\n          <th class=\"col-modifiers\">Clinical Modifiers</th>\n          <th class=\"col-actions\">Actions</th>\n        </tr>\n      </thead>\n      <tbody>\n        @for (rowItem of uniqueTableAnnotations(); track rowItem.termId) {\n          <tr \n            lib-hpo-polisher-row\n            [annotation]=\"rowItem\"\n            [hierarchy]=\"hierarchyCache()[rowItem.termId] || null\"\n            [availableOnsets]=\"availableOnsets()\"\n            [availableModifiers]=\"availableModifiers()\"\n            (termClick)=\"handleHierarchyRequest(rowItem)\"\n            (updated)=\"handleBadgeUpdated($event, rowItem.termId)\"\n            (createOnsetRequested)=\"createOnsetRequested.emit(rowItem)\"\n            (deleteRequested)=\"deleteAnnotationEverywhere(rowItem.termId)\">\n          </tr>\n        } @empty {\n          <tr>\n            <td colspan=\"6\" class=\"empty-table-state\">\n              No clinical features currently parsed inside this annotation scope.\n            </td>\n          </tr>\n        }\n      </tbody>\n    </table>\n  </div>\n\n  <div class=\"workspace-footer\">\n    <div class=\"autocomplete-injection-box\">\n      <ui-ontology-autocomplete\n        [inputString]=\"hpoInputString\"\n        [searchProvider]=\"searchProvider()\"\n        (selected)=\"handleAutocompleteSelection($event)\">\n      </ui-ontology-autocomplete>\n      <button \n        (click)=\"injectManualHpoToken()\"\n        [disabled]=\"!selectedHpoMatch()\"\n        class=\"btn-workspace-add\">\n        <mat-icon>add</mat-icon> Inject Term\n      </button>\n    </div>\n    \n    <div class=\"action-btn-cluster\">\n      <button class=\"btn-workspace-cancel\" (click)=\"cancel.emit()\">Discard</button>\n      <button class=\"btn-workspace-finish\" (click)=\"saveAndFinish()\">Commit Curation Changes</button>\n    </div>\n  </div>\n\n</div>", styles: [".workspace-layout{display:flex;flex-direction:column;gap:20px;height:100%;font-family:system-ui,-apple-system,sans-serif}.document-preview-pane{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;max-height:200px;overflow-y:auto}.sentence-flow-line{margin-bottom:6px;line-height:1.5}.plain-text{color:#334155}.highlight-token{background:#e0f2fe;color:#0369a1;font-weight:500;padding:1px 4px;border-radius:4px}.highlight-token.is-excluded{background:#fee2e2;color:#b91c1c;text-decoration:line-through}.table-viewport{flex:1;border:1px solid #e2e8f0;border-radius:8px;overflow:auto}.data-table{width:100%;border-collapse:collapse;text-align:left;font-size:.9rem}.data-table th{background:#f1f5f9;color:#475569;padding:10px 14px;font-weight:600;position:sticky;top:0;z-index:5}.data-table td{padding:10px 14px;border-bottom:1px solid #e2e8f0;vertical-align:middle}.dropdown-trigger-span{color:#0f172a;cursor:pointer;font-weight:500;border-bottom:1px dashed #cbd5e1}.dropdown-trigger-span:hover{color:#2563eb;border-color:#2563eb}.dropdown-trigger-span .caret-icon{font-size:.7rem;color:#64748b}.badge{font-size:.75rem;font-weight:700;padding:2px 8px;border-radius:12px}.badge.badge-green{background:#dcfce7;color:#15803d}.badge.badge-red{background:#fee2e2;color:#b91c1c}.action-group-layout{display:flex;gap:8px}.btn-table-action{display:inline-flex;align-items:center;gap:4px;background:#fff;border:1px solid #cbd5e1;padding:4px 8px;border-radius:4px;font-size:.8rem;cursor:pointer}.btn-table-action mat-icon{font-size:1rem;width:16px;height:16px}.btn-table-action:hover{background:#f8fafc;color:#2563eb}.btn-table-action.btn-delete:hover{color:#dc2626;border-color:#fca5a5;background:#fff5f5}.workspace-footer{display:flex;justify-content:space-between;align-items:center;padding-top:14px;border-top:1px solid #e2e8f0}.autocomplete-injection-box{display:flex;align-items:center;gap:12px;flex:1;max-width:600px}.btn-workspace-add{display:inline-flex;align-items:center;gap:4px;background:#f1f5f9;border:1px solid #cbd5e1;color:#475569;padding:8px 14px;border-radius:6px;font-weight:500;cursor:pointer;white-space:nowrap}.btn-workspace-add:hover:not(:disabled){background:#e2e8f0;color:#0f172a}.btn-workspace-finish{background:#2563eb;color:#fff;border:none;padding:8px 18px;border-radius:6px;font-weight:600;cursor:pointer}.btn-workspace-finish:hover{background:#1d4ed8}.ontology-context-menu{position:fixed;background:#fff;border:1px solid #cbd5e1;border-radius:8px;box-shadow:0 10px 15px -3px #0000001a;width:280px;z-index:2000;max-height:300px;overflow-y:auto}.menu-section-title{background:#f8fafc;padding:6px 12px;font-size:.7rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e2e8f0}.menu-list{list-style:none;padding:0;margin:0}.menu-item-row{padding:8px 12px;font-size:.85rem;color:#334155;cursor:pointer}.menu-item-row .sub-id{color:#94a3b8;font-size:.75rem}.menu-item-row:hover{background:#f1f5f9;color:#2563eb}.menu-item-empty{padding:8px 12px;font-size:.8rem;color:#94a3b8;font-style:italic}\n"] }]
        }], ctorParameters: () => [], propDecorators: { sentences: [{ type: i0.Input, args: [{ isSignal: true, alias: "sentences", required: false }] }], availableOnsets: [{ type: i0.Input, args: [{ isSignal: true, alias: "availableOnsets", required: false }] }], availableModifiers: [{ type: i0.Input, args: [{ isSignal: true, alias: "availableModifiers", required: false }] }], hierarchyUpdate: [{ type: i0.Input, args: [{ isSignal: true, alias: "hierarchyUpdate", required: false }] }], requestHierarchy: [{ type: i0.Output, args: ["requestHierarchy"] }], createOnsetRequested: [{ type: i0.Output, args: ["createOnsetRequested"] }], complete: [{ type: i0.Output, args: ["complete"] }], cancel: [{ type: i0.Output, args: ["cancel"] }], searchProvider: [{ type: i0.Input, args: [{ isSignal: true, alias: "searchProvider", required: true }] }], badgeMoved: [{ type: i0.Output, args: ["badgeMoved"] }] } });

class HpoMiningComponent {
    pastedText = '';
    isMining = signal(false, ...(ngDevMode ? [{ debugName: "isMining" }] : /* istanbul ignore next */ []));
    success = output();
    error = output();
    cancel = output();
    // A brand new output that delegates the actual HTTP call to the host application
    miningRequested = output();
    /**
     * Triggers the text mining pipeline by handing the text off to the host application
     */
    runTextMining() {
        console.log("runTextMining");
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
    onCancel() {
        this.cancel.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoMiningComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.17", type: HpoMiningComponent, isStandalone: true, selector: "lib-hpo-mining", outputs: { success: "success", error: "error", cancel: "cancel", miningRequested: "miningRequested" }, ngImport: i0, template: "<div class=\"clinical-text-container\">\n  <label for=\"clinical-text\" class=\"hpo-label\">Paste clinical text</label>\n  <div class=\"input-section\">\n    <textarea\n      id=\"clinical-text\"\n      [(ngModel)]=\"pastedText\"\n      rows=\"15\"\n      placeholder=\"Paste here with ctrl-V...\"\n      class=\"clinical-textarea\"\n      [disabled]=\"isMining()\"\n    ></textarea>\n    \n    <div class=\"actions-footer\">\n      <button \n        (click)=\"runTextMining()\"  \n        class=\"btn-outline-primary\"\n        [disabled]=\"isMining() || !pastedText.trim()\">\n        {{ isMining() ? 'Processing Text...' : 'Run HPO Text Mining' }}\n      </button>\n      <button \n        class=\"btn-outline-cancel\" \n        (click)=\"onCancel()\"\n        [disabled]=\"isMining()\">\n        Cancel\n      </button>\n    </div>\n  </div>\n</div>", styles: ["*{box-sizing:border-box}:host{display:flex;flex-direction:column;width:100%;height:100%;box-sizing:border-box}:host ::ng-deep .clinical-textarea{display:block;box-sizing:border-box;width:90%;min-height:450px;font-family:Fira Code,monospace;padding:1rem;border:2px solid #d1d5db;border-radius:8px}:host ::ng-deep .input-section{display:flex;flex-direction:column;align-items:stretch;flex:1;width:100%}.clinical-text-container{width:100%!important;min-width:100%!important;flex-direction:column;gap:1rem;display:flex;flex:1;box-sizing:border-box}.hpo-label{font-family:var(--hpo-font-sans);font-size:14px;font-weight:600;color:#334155;text-transform:uppercase;letter-spacing:.5px;font-size:12px}.actions-footer{display:flex;align-items:center;gap:4px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HpoMiningComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-hpo-mining', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"clinical-text-container\">\n  <label for=\"clinical-text\" class=\"hpo-label\">Paste clinical text</label>\n  <div class=\"input-section\">\n    <textarea\n      id=\"clinical-text\"\n      [(ngModel)]=\"pastedText\"\n      rows=\"15\"\n      placeholder=\"Paste here with ctrl-V...\"\n      class=\"clinical-textarea\"\n      [disabled]=\"isMining()\"\n    ></textarea>\n    \n    <div class=\"actions-footer\">\n      <button \n        (click)=\"runTextMining()\"  \n        class=\"btn-outline-primary\"\n        [disabled]=\"isMining() || !pastedText.trim()\">\n        {{ isMining() ? 'Processing Text...' : 'Run HPO Text Mining' }}\n      </button>\n      <button \n        class=\"btn-outline-cancel\" \n        (click)=\"onCancel()\"\n        [disabled]=\"isMining()\">\n        Cancel\n      </button>\n    </div>\n  </div>\n</div>", styles: ["*{box-sizing:border-box}:host{display:flex;flex-direction:column;width:100%;height:100%;box-sizing:border-box}:host ::ng-deep .clinical-textarea{display:block;box-sizing:border-box;width:90%;min-height:450px;font-family:Fira Code,monospace;padding:1rem;border:2px solid #d1d5db;border-radius:8px}:host ::ng-deep .input-section{display:flex;flex-direction:column;align-items:stretch;flex:1;width:100%}.clinical-text-container{width:100%!important;min-width:100%!important;flex-direction:column;gap:1rem;display:flex;flex:1;box-sizing:border-box}.hpo-label{font-family:var(--hpo-font-sans);font-size:14px;font-weight:600;color:#334155;text-transform:uppercase;letter-spacing:.5px;font-size:12px}.actions-footer{display:flex;align-items:center;gap:4px}\n"] }]
        }], propDecorators: { success: [{ type: i0.Output, args: ["success"] }], error: [{ type: i0.Output, args: ["error"] }], cancel: [{ type: i0.Output, args: ["cancel"] }], miningRequested: [{ type: i0.Output, args: ["miningRequested"] }] } });

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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: LoadOntologyComponent, isStandalone: true, selector: "ui-load-ontology", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, isLoading: { classPropertyName: "isLoading", publicName: "isLoading", isSignal: true, isRequired: true, transformFunction: null }, isLoaded: { classPropertyName: "isLoaded", publicName: "isLoaded", isSignal: true, isRequired: true, transformFunction: null }, statusMessage: { classPropertyName: "statusMessage", publicName: "statusMessage", isSignal: true, isRequired: true, transformFunction: null }, termCount: { classPropertyName: "termCount", publicName: "termCount", isSignal: true, isRequired: false, transformFunction: null }, helpUrl: { classPropertyName: "helpUrl", publicName: "helpUrl", isSignal: true, isRequired: false, transformFunction: null }, helpLines: { classPropertyName: "helpLines", publicName: "helpLines", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { onLoad: "onLoad" }, ngImport: i0, template: "<div class=\"home-card__row\">\n    <div class=\"action-with-help\">\n        <button (click)=\"onLoad.emit()\" [disabled]=\"isLoading()\" class=\"btn-outline-primary home-card__action-btn\">\n            @if (isLoading()) {\n                <mat-spinner diameter=\"15\"></mat-spinner>\n                <span>Loading...</span>\n            } @else {\n                <span>Load {{ label() }}</span>\n            }\n        </button>\n        \n        <lib-help-button \n            [title]=\"'Loading the ' + label()\" \n            [lines]=\"helpLines()\" \n            [helpUrl]=\"helpUrl()\" />\n    </div>\n    \n    <div class=\"ontology-status\">\n        <span [ngClass]=\"{\n            'ontology-status__text--loading': isLoading(), \n            'ontology-status__text--loaded': isLoaded()}\" \n            class=\"ontology-status__text\">\n            @if(isLoaded()) {\n                <mat-icon class=\"ontology-status__icon\">check_circle</mat-icon> \n                {{ statusMessage() }}\n                <span class=\"ontology-status__terms\">{{ termCount() }} terms available</span>\n            }\n        </span>\n    </div>\n</div>", styles: [".home-card__section-label{font-size:1.1rem;font-weight:600;margin-bottom:12px;color:#333}.home-card__row{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 0}.action-with-help{display:flex;align-items:center;gap:8px}.action-with-help .home-card__action-btn{display:inline-flex;align-items:center;gap:8px;min-width:120px;justify-content:center}.ontology-status{display:flex;flex-direction:column;align-items:flex-end;gap:4px}.ontology-status__text{display:flex;align-items:center;gap:6px;font-size:.9rem;color:#666}.ontology-status__text--loading{color:#0288d1}.ontology-status__text--loaded{color:#388e3c;font-weight:500}.ontology-status__icon{font-size:18px;width:18px;height:18px}.ontology-status__terms{font-size:.8rem;color:#757575}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "ngmodule", type: MatProgressSpinnerModule }, { kind: "component", type: i2$2.MatProgressSpinner, selector: "mat-progress-spinner, mat-spinner", inputs: ["color", "mode", "value", "diameter", "strokeWidth"], exportAs: ["matProgressSpinner"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: HelpButtonComponent, selector: "lib-help-button", inputs: ["title", "lines", "helpUrl"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: LoadOntologyComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-load-ontology', standalone: true, imports: [
                        CommonModule,
                        MatProgressSpinnerModule,
                        MatIconModule,
                        HelpButtonComponent
                    ], template: "<div class=\"home-card__row\">\n    <div class=\"action-with-help\">\n        <button (click)=\"onLoad.emit()\" [disabled]=\"isLoading()\" class=\"btn-outline-primary home-card__action-btn\">\n            @if (isLoading()) {\n                <mat-spinner diameter=\"15\"></mat-spinner>\n                <span>Loading...</span>\n            } @else {\n                <span>Load {{ label() }}</span>\n            }\n        </button>\n        \n        <lib-help-button \n            [title]=\"'Loading the ' + label()\" \n            [lines]=\"helpLines()\" \n            [helpUrl]=\"helpUrl()\" />\n    </div>\n    \n    <div class=\"ontology-status\">\n        <span [ngClass]=\"{\n            'ontology-status__text--loading': isLoading(), \n            'ontology-status__text--loaded': isLoaded()}\" \n            class=\"ontology-status__text\">\n            @if(isLoaded()) {\n                <mat-icon class=\"ontology-status__icon\">check_circle</mat-icon> \n                {{ statusMessage() }}\n                <span class=\"ontology-status__terms\">{{ termCount() }} terms available</span>\n            }\n        </span>\n    </div>\n</div>", styles: [".home-card__section-label{font-size:1.1rem;font-weight:600;margin-bottom:12px;color:#333}.home-card__row{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 0}.action-with-help{display:flex;align-items:center;gap:8px}.action-with-help .home-card__action-btn{display:inline-flex;align-items:center;gap:8px;min-width:120px;justify-content:center}.ontology-status{display:flex;flex-direction:column;align-items:flex-end;gap:4px}.ontology-status__text{display:flex;align-items:center;gap:6px;font-size:.9rem;color:#666}.ontology-status__text--loading{color:#0288d1}.ontology-status__text--loaded{color:#388e3c;font-weight:500}.ontology-status__icon{font-size:18px;width:18px;height:18px}.ontology-status__terms{font-size:.8rem;color:#757575}\n"] }]
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: OrcidDialogComponent, isStandalone: true, selector: "lib-orcid-dialog", outputs: { externalLinkClicked: "externalLinkClicked" }, ngImport: i0, template: "<h2 mat-dialog-title class=\"dialog-title\">Enter ORCID researcher identifier</h2>\n\n<mat-dialog-content class=\"dialog-content\">\n  <form [formGroup]=\"orcidForm\" class=\"orcid-form\">\n    <mat-form-field appearance=\"outline\" class=\"form-field-full\" subscriptSizing=\"fixed\">\n      <mat-icon matPrefix class=\"input-icon-prefix\">fingerprint</mat-icon>\n      <input matInput\n             formControlName=\"orcid\"\n             placeholder=\"0000-0000-0000-0000\"\n             maxlength=\"19\"\n             class=\"orcid-input-field\">\n      <mat-hint class=\"custom-hint\">Format: 0000-0000-0000-0000</mat-hint>\n      \n      @if (orcidForm.get('orcid')?.hasError('required')) {\n        <mat-error>ORCID is required</mat-error>\n      }\n      @if (orcidForm.get('orcid')?.hasError('pattern')) {\n        <mat-error>Invalid ORCID format</mat-error>\n      }\n    </mat-form-field>\n  </form>\n\n  <div class=\"orcid-info\">\n  <!-- Adding matTooltip makes this icon fully interactive out of the box -->\n  <mat-icon class=\"info-icon\" \n            matTooltip=\"ORCID helps distinguish you from every other researcher with a matching name.\" \n            matTooltipPosition=\"above\"\n            style=\"cursor: help;\">\n    info\n  </mat-icon>\n  <span>\n  ORCID provides a persistent digital identifier for researchers.\n  <a href=\"https://orcid.org/\" (click)=\"onLinkClick($event)\" class=\"orcid-link\">Learn more</a>\n</span>\n</div>\n</mat-dialog-content>\n\n<div class=\"dialog-actions\">\n  <button type=\"button\"\n          (click)=\"onCancel()\"\n          class=\"btn-outline-cancel\">\n    Cancel\n  </button>\n  <button type=\"button\"\n          (click)=\"onSave()\"\n          [disabled]=\"orcidForm.invalid\"\n          class=\"btn-outline-primary\">\n    Save\n  </button>\n</div>", styles: [":host{display:block;font-family:var(--hpo-ui-font-family, system-ui, sans-serif);--mdc-dialog-container-shape: 12px}.dialog-title{margin:0!important;padding:24px 24px 10px!important;border-bottom:none!important;font-size:1.25rem;font-weight:600;margin-bottom:1rem!important}mat-dialog-content.dialog-content{min-width:400px;overflow:hidden!important;display:block!important;border-top:none!important;border-bottom:none!important;padding-top:12px!important}.orcid-form{margin-top:.5rem}.orcid-form .form-field-full{width:100%}.orcid-form .form-field-full input.mat-mdc-input-element{padding-left:8px!important}.input-icon-prefix{color:var(--hpo-ui-text-muted, #94a3b8);margin-right:12px!important;font-size:20px;width:20px;height:20px}.orcid-info{background:var(--hpo-ui-bg-light, #f8f9fa);padding:12px;border-radius:6px;margin-top:20px;font-size:13px;display:flex;align-items:center;gap:10px;color:var(--hpo-ui-text-muted, #4b5563);border:1px solid var(--hpo-ui-border-light, #e5e7eb)}.orcid-info .orcid-link{color:var(--hpo-ui-link-color, #2563eb);text-decoration:underline}.dialog-actions{padding:16px;display:flex;justify-content:flex-end;gap:12px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: MatDialogModule }, { kind: "directive", type: i1$2.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i1$2.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i2$1.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "component", type: i2$1.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i2$1.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { kind: "directive", type: i2$1.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "directive", type: i2$1.MatPrefix, selector: "[matPrefix], [matIconPrefix], [matTextPrefix]", inputs: ["matTextPrefix"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatTooltipModule }, { kind: "directive", type: i4.MatTooltip, selector: "[matTooltip]", inputs: ["matTooltipPosition", "matTooltipPositionAtOrigin", "matTooltipDisabled", "matTooltipShowDelay", "matTooltipHideDelay", "matTooltipTouchGestures", "matTooltip", "matTooltipClass"], exportAs: ["matTooltip"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],[formArray],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i5.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i5.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i5.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: OrcidDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-orcid-dialog', standalone: true, imports: [
                        CommonModule,
                        MatDialogModule,
                        MatInputModule,
                        MatIconModule,
                        MatTooltipModule,
                        ReactiveFormsModule
                    ], template: "<h2 mat-dialog-title class=\"dialog-title\">Enter ORCID researcher identifier</h2>\n\n<mat-dialog-content class=\"dialog-content\">\n  <form [formGroup]=\"orcidForm\" class=\"orcid-form\">\n    <mat-form-field appearance=\"outline\" class=\"form-field-full\" subscriptSizing=\"fixed\">\n      <mat-icon matPrefix class=\"input-icon-prefix\">fingerprint</mat-icon>\n      <input matInput\n             formControlName=\"orcid\"\n             placeholder=\"0000-0000-0000-0000\"\n             maxlength=\"19\"\n             class=\"orcid-input-field\">\n      <mat-hint class=\"custom-hint\">Format: 0000-0000-0000-0000</mat-hint>\n      \n      @if (orcidForm.get('orcid')?.hasError('required')) {\n        <mat-error>ORCID is required</mat-error>\n      }\n      @if (orcidForm.get('orcid')?.hasError('pattern')) {\n        <mat-error>Invalid ORCID format</mat-error>\n      }\n    </mat-form-field>\n  </form>\n\n  <div class=\"orcid-info\">\n  <!-- Adding matTooltip makes this icon fully interactive out of the box -->\n  <mat-icon class=\"info-icon\" \n            matTooltip=\"ORCID helps distinguish you from every other researcher with a matching name.\" \n            matTooltipPosition=\"above\"\n            style=\"cursor: help;\">\n    info\n  </mat-icon>\n  <span>\n  ORCID provides a persistent digital identifier for researchers.\n  <a href=\"https://orcid.org/\" (click)=\"onLinkClick($event)\" class=\"orcid-link\">Learn more</a>\n</span>\n</div>\n</mat-dialog-content>\n\n<div class=\"dialog-actions\">\n  <button type=\"button\"\n          (click)=\"onCancel()\"\n          class=\"btn-outline-cancel\">\n    Cancel\n  </button>\n  <button type=\"button\"\n          (click)=\"onSave()\"\n          [disabled]=\"orcidForm.invalid\"\n          class=\"btn-outline-primary\">\n    Save\n  </button>\n</div>", styles: [":host{display:block;font-family:var(--hpo-ui-font-family, system-ui, sans-serif);--mdc-dialog-container-shape: 12px}.dialog-title{margin:0!important;padding:24px 24px 10px!important;border-bottom:none!important;font-size:1.25rem;font-weight:600;margin-bottom:1rem!important}mat-dialog-content.dialog-content{min-width:400px;overflow:hidden!important;display:block!important;border-top:none!important;border-bottom:none!important;padding-top:12px!important}.orcid-form{margin-top:.5rem}.orcid-form .form-field-full{width:100%}.orcid-form .form-field-full input.mat-mdc-input-element{padding-left:8px!important}.input-icon-prefix{color:var(--hpo-ui-text-muted, #94a3b8);margin-right:12px!important;font-size:20px;width:20px;height:20px}.orcid-info{background:var(--hpo-ui-bg-light, #f8f9fa);padding:12px;border-radius:6px;margin-top:20px;font-size:13px;display:flex;align-items:center;gap:10px;color:var(--hpo-ui-text-muted, #4b5563);border:1px solid var(--hpo-ui-border-light, #e5e7eb)}.orcid-info .orcid-link{color:var(--hpo-ui-link-color, #2563eb);text-decoration:underline}.dialog-actions{padding:16px;display:flex;justify-content:flex-end;gap:12px}\n"] }]
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: PhenopacketLoaderComponent, isStandalone: true, selector: "lib-phenopacket-loader", inputs: { onIngest: { classPropertyName: "onIngest", publicName: "onIngest", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { phenopacketIngested: "phenopacketIngested", ingestError: "ingestError" }, ngImport: i0, template: "<div \n  class=\"drop-container\"\n  [class.drop-container--active]=\"isDragging()\"\n  (dragover)=\"onDragOver($event)\"\n  (dragleave)=\"onDragLeave()\"\n  (drop)=\"onDrop($event)\"\n>\n  <div class=\"drop-illustration\">\n    <i class=\"upload-icon\">\uD83D\uDCC4</i>\n    @if (fileName()) {\n      <p class=\"file-status\">Loaded: <code>{{ fileName() }}</code></p>\n    } @else {\n      <p>Drag and drop a Phenopacket file here, or click to browse.</p>\n    }\n  </div>\n\n  <button type=\"button\" (click)=\"fileInput.click()\">\n    Select Phenopacket Profile\n  </button>\n  \n  <input \n    #fileInput \n    type=\"file\" \n    accept=\".json\" \n    (change)=\"onFileSelected($event)\" \n    hidden \n  />\n</div>", styles: [".drop-container{--loader-bg: #ffffff;--loader-border-color: #cbd5e1;--loader-border-active: #3b82f6;--loader-text-primary: #1e293b;--loader-text-secondary: #64748b;--loader-success-bg: #f0fdf4;--loader-success-border: #4ade80;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2.5rem 2rem;border:2px dashed var(--loader-border-color);border-radius:12px;background-color:var(--loader-bg);cursor:pointer;transition:all .2s ease-in-out;text-align:center;min-height:200px;position:relative}.drop-container:hover{border-color:var(--loader-text-secondary);background-color:#f8fafc}.drop-container--active{border-color:var(--loader-border-active);background-color:#eff6ff;transform:scale(1.01)}.drop-container--active .upload-icon{transform:translateY(-4px);color:var(--loader-border-active)}.drop-container .drop-illustration{display:flex;flex-direction:column;align-items:center;gap:.75rem;margin-bottom:1.5rem;pointer-events:none}.drop-container .drop-illustration .upload-icon{font-size:2.5rem;transition:transform .2s ease}.drop-container .drop-illustration p{margin:0;font-size:1rem;color:var(--loader-text-primary);font-weight:500}.drop-container .drop-illustration .file-status{color:#16a34a}.drop-container .drop-illustration .file-status code{background-color:#e2e8f0;padding:.2rem .4rem;border-radius:4px;font-family:monospace;font-size:.9rem}.drop-container button{background-color:#3b82f6;color:#fff;border:none;padding:.625rem 1.25rem;font-size:.9rem;font-weight:600;border-radius:6px;cursor:pointer;transition:background-color .15s ease;box-shadow:0 1px 2px #0000000d}.drop-container button:hover{background-color:#2563eb}.drop-container button:active{background-color:#1d4ed8}.error-message{margin-top:1rem;padding:.75rem 1rem;background-color:#fef2f2;border:1px solid #fee2e2;border-radius:6px;color:#dc2626;font-size:.875rem;font-weight:500;text-align:left;width:100%;box-sizing:border-box}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: PhenopacketLoaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-phenopacket-loader', standalone: true, imports: [CommonModule], template: "<div \n  class=\"drop-container\"\n  [class.drop-container--active]=\"isDragging()\"\n  (dragover)=\"onDragOver($event)\"\n  (dragleave)=\"onDragLeave()\"\n  (drop)=\"onDrop($event)\"\n>\n  <div class=\"drop-illustration\">\n    <i class=\"upload-icon\">\uD83D\uDCC4</i>\n    @if (fileName()) {\n      <p class=\"file-status\">Loaded: <code>{{ fileName() }}</code></p>\n    } @else {\n      <p>Drag and drop a Phenopacket file here, or click to browse.</p>\n    }\n  </div>\n\n  <button type=\"button\" (click)=\"fileInput.click()\">\n    Select Phenopacket Profile\n  </button>\n  \n  <input \n    #fileInput \n    type=\"file\" \n    accept=\".json\" \n    (change)=\"onFileSelected($event)\" \n    hidden \n  />\n</div>", styles: [".drop-container{--loader-bg: #ffffff;--loader-border-color: #cbd5e1;--loader-border-active: #3b82f6;--loader-text-primary: #1e293b;--loader-text-secondary: #64748b;--loader-success-bg: #f0fdf4;--loader-success-border: #4ade80;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2.5rem 2rem;border:2px dashed var(--loader-border-color);border-radius:12px;background-color:var(--loader-bg);cursor:pointer;transition:all .2s ease-in-out;text-align:center;min-height:200px;position:relative}.drop-container:hover{border-color:var(--loader-text-secondary);background-color:#f8fafc}.drop-container--active{border-color:var(--loader-border-active);background-color:#eff6ff;transform:scale(1.01)}.drop-container--active .upload-icon{transform:translateY(-4px);color:var(--loader-border-active)}.drop-container .drop-illustration{display:flex;flex-direction:column;align-items:center;gap:.75rem;margin-bottom:1.5rem;pointer-events:none}.drop-container .drop-illustration .upload-icon{font-size:2.5rem;transition:transform .2s ease}.drop-container .drop-illustration p{margin:0;font-size:1rem;color:var(--loader-text-primary);font-weight:500}.drop-container .drop-illustration .file-status{color:#16a34a}.drop-container .drop-illustration .file-status code{background-color:#e2e8f0;padding:.2rem .4rem;border-radius:4px;font-family:monospace;font-size:.9rem}.drop-container button{background-color:#3b82f6;color:#fff;border:none;padding:.625rem 1.25rem;font-size:.9rem;font-weight:600;border-radius:6px;cursor:pointer;transition:background-color .15s ease;box-shadow:0 1px 2px #0000000d}.drop-container button:hover{background-color:#2563eb}.drop-container button:active{background-color:#1d4ed8}.error-message{margin-top:1rem;padding:.75rem 1rem;background-color:#fef2f2;border:1px solid #fee2e2;border-radius:6px;color:#dc2626;font-size:.875rem;font-weight:500;text-align:left;width:100%;box-sizing:border-box}\n"] }]
        }], propDecorators: { onIngest: [{ type: i0.Input, args: [{ isSignal: true, alias: "onIngest", required: true }] }], phenopacketIngested: [{ type: i0.Output, args: ["phenopacketIngested"] }], ingestError: [{ type: i0.Output, args: ["ingestError"] }] } });

/*
 * Public API Surface of ng-hpo-uikit
 */

/**
 * Generated bundle index. Do not edit.
 */

export { FooterComponent, HelpButtonComponent, HpoMiningComponent, HpoModifierMenuComponent, HpoOnsetSelectorComponent, HpoPolisherRowComponent, HpoPolishingWorkspaceComponent, LoadOntologyComponent, NgHpoUikit, NotificationService, OrcidDialogComponent, PhenopacketLoaderComponent };
//# sourceMappingURL=ng-hpo-uikit.mjs.map
