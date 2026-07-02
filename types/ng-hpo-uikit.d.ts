import * as _angular_core from '@angular/core';
import { OnInit } from '@angular/core';
import * as _angular_platform_browser from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

declare class NgHpoUikit {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NgHpoUikit, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NgHpoUikit, "lib-ng-hpo-uikit", never, {}, {}, never, never, true, never>;
}

declare class FooterComponent {
    private sanitizer;
    appName: _angular_core.InputSignal<string>;
    appVersion: _angular_core.InputSignal<string>;
    gitHubIssuesUrl: _angular_core.InputSignal<string>;
    currentYear: _angular_core.InputSignal<number>;
    helpRequested: _angular_core.OutputEmitterRef<void>;
    protected sanitizedIssuesUrl: _angular_core.Signal<_angular_platform_browser.SafeUrl>;
    onHelpClick(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<FooterComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<FooterComponent, "lib-shared-footer", never, { "appName": { "alias": "appName"; "required": true; "isSignal": true; }; "appVersion": { "alias": "appVersion"; "required": true; "isSignal": true; }; "gitHubIssuesUrl": { "alias": "gitHubIssuesUrl"; "required": true; "isSignal": true; }; "currentYear": { "alias": "currentYear"; "required": false; "isSignal": true; }; }, { "helpRequested": "helpRequested"; }, never, never, true, never>;
}

declare class HelpButtonComponent {
    title: _angular_core.InputSignal<string>;
    lines: _angular_core.InputSignal<string[]>;
    helpUrl: _angular_core.InputSignal<string>;
    openDocs(): Promise<void>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HelpButtonComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HelpButtonComponent, "lib-help-button", never, { "title": { "alias": "title"; "required": true; "isSignal": true; }; "lines": { "alias": "lines"; "required": true; "isSignal": true; }; "helpUrl": { "alias": "helpUrl"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

interface HpoTermMinimal {
    termId: string;
    label: string;
}
interface HierarchyMapItem {
    currentTermId: string;
    parents: HpoTermMinimal[];
    children: HpoTermMinimal[];
}
interface PolishedHpoAnnotation {
    termId: string;
    label: string;
    isObserved: boolean;
    onsetString?: string;
    modifiers?: string[];
}

declare class HpoPolisherRowComponent {
    readonly annotation: _angular_core.ModelSignal<PolishedHpoAnnotation>;
    readonly hierarchy: _angular_core.InputSignal<HierarchyMapItem>;
    readonly availableOnsets: _angular_core.InputSignal<string[]>;
    readonly availableModifiers: _angular_core.InputSignal<string[]>;
    readonly updated: _angular_core.OutputEmitterRef<PolishedHpoAnnotation>;
    readonly deleteRequested: _angular_core.OutputEmitterRef<void>;
    readonly termClick: _angular_core.OutputEmitterRef<string>;
    createOnsetRequested: _angular_core.OutputEmitterRef<void>;
    modifierSearchQuery: _angular_core.WritableSignal<string>;
    onsetSearchQuery: _angular_core.WritableSignal<string>;
    readonly showHierarchyMenu: _angular_core.WritableSignal<boolean>;
    showModifierMenu: _angular_core.WritableSignal<boolean>;
    filteredModifiers: _angular_core.Signal<string[]>;
    filteredOnsets: _angular_core.Signal<string[]>;
    formattedModifierOptions: _angular_core.Signal<{
        id: string;
        label: string;
    }[]>;
    updateModifiers(updatedMods: string[]): void;
    toggleHierarchyMenu(): void;
    replaceTerm(target: HpoTermMinimal): void;
    toggleObserved(): void;
    changeOnset(newOnset: string): void;
    addModifier(event: Event): void;
    removeModifier(idx: number): void;
    onRequestNewOnset(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HpoPolisherRowComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HpoPolisherRowComponent, "tr[lib-hpo-polisher-row]", never, { "annotation": { "alias": "annotation"; "required": true; "isSignal": true; }; "hierarchy": { "alias": "hierarchy"; "required": false; "isSignal": true; }; "availableOnsets": { "alias": "availableOnsets"; "required": false; "isSignal": true; }; "availableModifiers": { "alias": "availableModifiers"; "required": false; "isSignal": true; }; }, { "annotation": "annotationChange"; "updated": "updated"; "deleteRequested": "deleteRequested"; "termClick": "termClick"; "createOnsetRequested": "createOnsetRequested"; }, never, never, true, never>;
}

type FenominalSegment = {
    kind: 'hit';
    text: string;
    hit: FenominalHit;
} | {
    kind: 'text';
    text: string;
    span: {
        start: number;
        end: number;
    };
};
interface FenominalHit {
    term_id: string;
    label: string;
    span: {
        start: number;
        end: number;
    };
    is_observed: boolean;
}
interface FenominalSentence {
    start: number;
    original_text: string;
    segments: FenominalSegment[];
}
interface UiFenominalHit {
    id: string;
    termId: string;
    label: string;
    span: {
        start: number;
        end: number;
    };
    isDragging?: boolean;
    isSelected?: boolean;
    modifiers: {
        severity?: string;
        onset?: string;
        excluded: boolean;
        modifiers: string[];
    };
}
type UiFenominalSegment = {
    kind: 'text';
    text: string;
    span: {
        start: number;
        end: number;
    };
} | {
    kind: 'hit';
    text: string;
    hit: UiFenominalHit;
};
interface UiFenominalSentence {
    start: number;
    original_text: string;
    segments: UiFenominalSegment[];
}

/**
 * Represents a standardized hit returned by an arbitrary ontology search provider.
 * * This model serves as the common data contract for generic autocomplete and UI lookup
 * elements within the component toolkit.
 * * @example
 * ```typescript
 * const hpoHit: OntologyMatch = {
 * id: 'HP:0001250',
 * label: 'Seizure',
 * matchedText: 'Epilepsy' // Matched on a synonym
 * };
 * ```
 */
interface OntologyMatch {
    /**
     * The unique alphanumeric identifier for the ontology term.
     * @example 'HP:0001250', 'GO:0008150'
     */
    id: string;
    /**
     * The canonical, primary clinical label designated to the term.
     */
    label: string;
    /**
     * The exact literal string matched during the query search execution.
     * This may differ from the primary `label` if the match occurred on an
     * alternative term synonym.
     */
    matchedText: string;
}

interface ParentChildDto {
    parents: FenominalHit[];
    children: FenominalHit[];
}
declare class HpoPolishingWorkspaceComponent implements OnInit {
    private notificationService;
    sentences: _angular_core.InputSignal<FenominalSentence[]>;
    availableOnsets: _angular_core.InputSignal<string[]>;
    availableModifiers: _angular_core.InputSignal<string[]>;
    hierarchyUpdate: _angular_core.InputSignal<HierarchyMapItem>;
    protected hierarchyCache: _angular_core.WritableSignal<Record<string, HierarchyMapItem>>;
    requestHierarchy: _angular_core.OutputEmitterRef<PolishedHpoAnnotation>;
    createOnsetRequested: _angular_core.OutputEmitterRef<PolishedHpoAnnotation>;
    complete: _angular_core.OutputEmitterRef<FenominalSentence[]>;
    cancel: _angular_core.OutputEmitterRef<void>;
    protected localSentences: _angular_core.WritableSignal<FenominalSentence[]>;
    protected hpoInputString: string;
    protected selectedHpoMatch: _angular_core.WritableSignal<OntologyMatch>;
    searchProvider: _angular_core.InputSignal<(query: string) => Observable<OntologyMatch[]>>;
    protected uniqueTableAnnotations: _angular_core.Signal<PolishedHpoAnnotation[]>;
    /** Emits when a badge is moved, passing the target element context and
     * the text window string to analyze */
    badgeMoved: _angular_core.OutputEmitterRef<{
        originalTermId: string;
        newTextWindow: string;
        newSpan: {
            start: number;
            end: number;
        };
    }>;
    protected handleBadgeMoved(originalTermId: string, textSnippet: string, newSpan: {
        start: number;
        end: number;
    }): void;
    constructor();
    ngOnInit(): void;
    /** This is called when the user moves a badge, which deletes the origal */
    protected handleBadgeUpdated(updatedRow: PolishedHpoAnnotation, originalTermId: string): void;
    protected deleteAnnotationEverywhere(termId: string): void;
    protected handleHierarchyRequest(annotation: PolishedHpoAnnotation): void;
    protected handleAutocompleteSelection(match: OntologyMatch): void;
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
    protected injectManualHpoToken(): void;
    protected saveAndFinish(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HpoPolishingWorkspaceComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HpoPolishingWorkspaceComponent, "lib-hpo-polishing-workspace", never, { "sentences": { "alias": "sentences"; "required": false; "isSignal": true; }; "availableOnsets": { "alias": "availableOnsets"; "required": false; "isSignal": true; }; "availableModifiers": { "alias": "availableModifiers"; "required": false; "isSignal": true; }; "hierarchyUpdate": { "alias": "hierarchyUpdate"; "required": false; "isSignal": true; }; "searchProvider": { "alias": "searchProvider"; "required": true; "isSignal": true; }; }, { "requestHierarchy": "requestHierarchy"; "createOnsetRequested": "createOnsetRequested"; "complete": "complete"; "cancel": "cancel"; "badgeMoved": "badgeMoved"; }, never, never, true, never>;
}

declare class HpoOnsetSelectorComponent {
    selectedOnset: _angular_core.ModelSignal<string>;
    availableOnsets: _angular_core.InputSignal<string[]>;
    requestNewOnset: _angular_core.OutputEmitterRef<void>;
    onsetChanged: _angular_core.OutputEmitterRef<string>;
    onOnsetSelect(value: string): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HpoOnsetSelectorComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HpoOnsetSelectorComponent, "lib-hpo-onset-selector", never, { "selectedOnset": { "alias": "selectedOnset"; "required": false; "isSignal": true; }; "availableOnsets": { "alias": "availableOnsets"; "required": true; "isSignal": true; }; }, { "selectedOnset": "selectedOnsetChange"; "requestNewOnset": "requestNewOnset"; "onsetChanged": "onsetChanged"; }, never, never, true, never>;
}

declare class HpoMiningComponent {
    pastedText: string;
    isMining: _angular_core.WritableSignal<boolean>;
    success: _angular_core.OutputEmitterRef<FenominalSentence[]>;
    error: _angular_core.OutputEmitterRef<string>;
    cancel: _angular_core.OutputEmitterRef<void>;
    miningRequested: _angular_core.OutputEmitterRef<{
        text: string;
        callback: (result: FenominalSentence[] | string) => void;
    }>;
    /**
     * Triggers the text mining pipeline by handing the text off to the host application
     */
    runTextMining(): void;
    onCancel(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HpoMiningComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HpoMiningComponent, "lib-hpo-mining", never, {}, { "success": "success"; "error": "error"; "cancel": "cancel"; "miningRequested": "miningRequested"; }, never, never, true, never>;
}

interface ModifierOption {
    id: string;
    label: string;
}
declare class HpoModifierMenuComponent {
    availableModifiers: _angular_core.InputSignal<ModifierOption[]>;
    selectedModifierIds: _angular_core.ModelSignal<string[]>;
    modifierToggled: _angular_core.OutputEmitterRef<{
        id: string;
        selected: boolean;
    }>;
    menuClosed: _angular_core.OutputEmitterRef<void>;
    /**
     * Checks if a given modifier ID is currently selected
     */
    isModifierSelected(id: string): boolean;
    /**
     * Handles the selection change from a checkbox/toggle item
     */
    onToggleModifier(id: string, isChecked: boolean): void;
    /**
     * Action to close the menu panel (e.g., clicking a 'Done' button or blur)
     */
    closeMenu(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HpoModifierMenuComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HpoModifierMenuComponent, "lib-hpo-modifier-menu", never, { "availableModifiers": { "alias": "availableModifiers"; "required": true; "isSignal": true; }; "selectedModifierIds": { "alias": "selectedModifierIds"; "required": false; "isSignal": true; }; }, { "selectedModifierIds": "selectedModifierIdsChange"; "modifierToggled": "modifierToggled"; "menuClosed": "menuClosed"; }, never, never, true, never>;
}

declare class LoadOntologyComponent {
    label: _angular_core.InputSignal<string>;
    isLoading: _angular_core.InputSignal<boolean>;
    isLoaded: _angular_core.InputSignal<boolean>;
    statusMessage: _angular_core.InputSignal<string>;
    termCount: _angular_core.InputSignal<number>;
    helpUrl: _angular_core.InputSignal<string>;
    helpLines: _angular_core.InputSignal<string[]>;
    onLoad: _angular_core.OutputEmitterRef<void>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<LoadOntologyComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<LoadOntologyComponent, "ui-load-ontology", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; "isLoading": { "alias": "isLoading"; "required": true; "isSignal": true; }; "isLoaded": { "alias": "isLoaded"; "required": true; "isSignal": true; }; "statusMessage": { "alias": "statusMessage"; "required": true; "isSignal": true; }; "termCount": { "alias": "termCount"; "required": false; "isSignal": true; }; "helpUrl": { "alias": "helpUrl"; "required": false; "isSignal": true; }; "helpLines": { "alias": "helpLines"; "required": false; "isSignal": true; }; }, { "onLoad": "onLoad"; }, never, never, true, never>;
}

interface OrcidDialogData {
    currentOrcid?: string;
}
declare class OrcidDialogComponent {
    private fb;
    private dialogRef;
    data: OrcidDialogData;
    externalLinkClicked: _angular_core.OutputEmitterRef<string>;
    orcidForm: FormGroup;
    onLinkClick(event: Event): void;
    onCancel(): void;
    onSave(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<OrcidDialogComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<OrcidDialogComponent, "lib-orcid-dialog", never, {}, { "externalLinkClicked": "externalLinkClicked"; }, never, never, true, never>;
}

declare class PhenopacketLoaderComponent {
    readonly onIngest: _angular_core.InputSignal<(payload: string) => Promise<void> | void>;
    readonly isDragging: _angular_core.WritableSignal<boolean>;
    readonly fileName: _angular_core.WritableSignal<string>;
    readonly errorMessage: _angular_core.WritableSignal<string>;
    readonly phenopacketIngested: _angular_core.OutputEmitterRef<any>;
    readonly ingestError: _angular_core.OutputEmitterRef<string>;
    onFileSelected(event: Event): void;
    onDragOver(event: DragEvent): void;
    onDragLeave(): void;
    onDrop(event: DragEvent): void;
    private processFile;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<PhenopacketLoaderComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<PhenopacketLoaderComponent, "lib-phenopacket-loader", never, { "onIngest": { "alias": "onIngest"; "required": true; "isSignal": true; }; }, { "phenopacketIngested": "phenopacketIngested"; "ingestError": "ingestError"; }, never, never, true, never>;
}

declare class NotificationService {
    private snackBar;
    showError(message: string, duration?: number): void;
    showSuccess(message: string, duration?: number): void;
    showWarning(message: string, duration?: number): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NotificationService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<NotificationService>;
}

export { FooterComponent, HelpButtonComponent, HpoMiningComponent, HpoModifierMenuComponent, HpoOnsetSelectorComponent, HpoPolisherRowComponent, HpoPolishingWorkspaceComponent, LoadOntologyComponent, NgHpoUikit, NotificationService, OrcidDialogComponent, PhenopacketLoaderComponent };
export type { FenominalHit, FenominalSegment, FenominalSentence, ModifierOption, OntologyMatch, OrcidDialogData, ParentChildDto, PolishedHpoAnnotation, UiFenominalHit, UiFenominalSegment, UiFenominalSentence };
