import * as _angular_core from '@angular/core';
import { ElementRef, OnInit, AfterViewInit } from '@angular/core';
import * as _angular_platform_browser from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

declare class NotificationService {
    private snackBar;
    showError(message: string, duration?: number): void;
    showSuccess(message: string, duration?: number): void;
    showWarning(message: string, duration?: number): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NotificationService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<NotificationService>;
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
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<FooterComponent, "hpo-shared-footer", never, { "appName": { "alias": "appName"; "required": true; "isSignal": true; }; "appVersion": { "alias": "appVersion"; "required": true; "isSignal": true; }; "gitHubIssuesUrl": { "alias": "gitHubIssuesUrl"; "required": true; "isSignal": true; }; "currentYear": { "alias": "currentYear"; "required": false; "isSignal": true; }; }, { "helpRequested": "helpRequested"; }, never, never, true, never>;
}

declare class HelpButtonComponent {
    title: _angular_core.InputSignal<string>;
    lines: _angular_core.InputSignal<string[]>;
    helpUrl: _angular_core.InputSignal<string>;
    private popoverEl;
    toggle(): void;
    openDocs(): Promise<void>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HelpButtonComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HelpButtonComponent, "hpo-help-button", never, { "title": { "alias": "title"; "required": true; "isSignal": true; }; "lines": { "alias": "lines"; "required": true; "isSignal": true; }; "helpUrl": { "alias": "helpUrl"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Mirrors Rust's `std::ops::Range<usize>`, which serde serializes as `{ start, end }`. */
interface Span {
    start: number;
    end: number;
}
/** A named entity identified by text mining. */
interface FenominalHit {
    termId: string;
    label: string;
    span: Span;
    excluded: boolean;
}
/** A contiguous piece of a sentence: either a recognized entity or plain text. */
type FenominalSegment = {
    kind: 'hit';
    text: string;
    hit: FenominalHit;
} | {
    kind: 'text';
    text: string;
    span: Span;
};
/** A sentence of the original text. */
interface FenominalSentence {
    start: number;
    originalText: string;
    segments: FenominalSegment[];
}
interface UiFenominalHit {
    id: string;
    termId: string;
    label: string;
    span: Span;
    isDragging?: boolean;
    isSelected?: boolean;
    severity?: string;
    onset?: string;
    excluded: boolean;
    modifiers: HpoTermMinimal[];
}
declare function ui_from_fenominal(hit: FenominalHit, id: string): UiFenominalHit;
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
    originalText: string;
    segments: UiFenominalSegment[];
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
    excluded: boolean;
    onsetString?: string;
    modifiers: HpoTermMinimal[];
}
interface HitSpanPatch {
    action: 'SPAN_BOUNDARIES_CHANGED' | 'SPAN_POSITION_SHIFTED';
    sentenceStart: number;
    segmentIndex: number;
    span: {
        start: number;
        end: number;
    };
}
type OntologyAutocompleteProvider = (query: string) => Observable<OntologyMatch[]>;
interface DeleteHitRequest {
    sentenceStart: number;
    hit: FenominalHit;
}

declare class HpoPolishRowComponent {
    readonly isModifierDialogOpen: _angular_core.WritableSignal<boolean>;
    readonly annotation: _angular_core.ModelSignal<PolishedHpoAnnotation>;
    readonly hierarchy: _angular_core.WritableSignal<HierarchyMapItem>;
    hierarchyProvider: _angular_core.InputSignal<(termId: string) => Promise<HierarchyMapItem>>;
    readonly availableModifiers: _angular_core.InputSignal<HpoTermMinimal[]>;
    readonly updated: _angular_core.OutputEmitterRef<PolishedHpoAnnotation>;
    readonly deleteRequested: _angular_core.OutputEmitterRef<void>;
    readonly termClick: _angular_core.OutputEmitterRef<string>;
    modifierSearchQuery: _angular_core.WritableSignal<string>;
    readonly showHierarchyMenu: _angular_core.WritableSignal<boolean>;
    showModifierMenu: _angular_core.WritableSignal<boolean>;
    filteredModifiers: _angular_core.Signal<HpoTermMinimal[]>;
    formattedModifierOptions: _angular_core.Signal<{
        id: HpoTermMinimal;
        label: HpoTermMinimal;
    }[]>;
    readonly remainingModifierLabels: _angular_core.Signal<string>;
    modifierButtonText: _angular_core.Signal<"+Add modifier" | "Edit">;
    updateModifiers(updatedMods: HpoTermMinimal[]): void;
    toggleModifierModal(): void;
    toggleHierarchyMenu(): void;
    openHierarchyMenu(): Promise<void>;
    replaceTerm(target: HpoTermMinimal): Promise<void>;
    toggleObserved(): void;
    removeModifier(idx: number): void;
    changeOnset(newOnset: string): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HpoPolishRowComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HpoPolishRowComponent, "tr[hpo-polisher-row]", never, { "annotation": { "alias": "annotation"; "required": true; "isSignal": true; }; "hierarchyProvider": { "alias": "hierarchyProvider"; "required": true; "isSignal": true; }; "availableModifiers": { "alias": "availableModifiers"; "required": false; "isSignal": true; }; }, { "annotation": "annotationChange"; "updated": "updated"; "deleteRequested": "deleteRequested"; "termClick": "termClick"; }, never, never, true, never>;
}

declare class ModifierSelectorComponent {
    availableModifiers: _angular_core.InputSignal<HpoTermMinimal[]>;
    selectedModifiers: _angular_core.InputSignal<HpoTermMinimal[]>;
    selectionChanged: _angular_core.OutputEmitterRef<HpoTermMinimal[]>;
    close: _angular_core.OutputEmitterRef<void>;
    select(mod: HpoTermMinimal): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ModifierSelectorComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ModifierSelectorComponent, "app-modifier-selector", never, { "availableModifiers": { "alias": "availableModifiers"; "required": true; "isSignal": true; }; "selectedModifiers": { "alias": "selectedModifiers"; "required": true; "isSignal": true; }; }, { "selectionChanged": "selectionChanged"; "close": "close"; }, never, never, true, never>;
}

declare class OntologyAutocompleteComponent {
    private elRef;
    placeholder: _angular_core.InputSignal<string>;
    inputString: _angular_core.InputSignal<string>;
    autocompleteProvider: _angular_core.InputSignal<OntologyAutocompleteProvider>;
    requireConfirmation: _angular_core.InputSignal<boolean>;
    confirmPosition: _angular_core.InputSignal<"right" | "bottom">;
    selected: _angular_core.OutputEmitterRef<OntologyMatch>;
    inputElement: _angular_core.Signal<ElementRef<HTMLInputElement>>;
    control: FormControl<string>;
    isOpen: _angular_core.WritableSignal<boolean>;
    activeHighlightIndex: _angular_core.WritableSignal<number>;
    activeSelection: _angular_core.WritableSignal<OntologyMatch>;
    hasValidSelection: _angular_core.Signal<boolean>;
    constructor(elRef: ElementRef);
    isValid: _angular_core.Signal<boolean>;
    hasError: _angular_core.Signal<boolean>;
    options: _angular_core.Signal<any[] | OntologyMatch[]>;
    onDocumentClick(event: MouseEvent): void;
    truncatedSelectionLabel: _angular_core.Signal<string>;
    showDropdown(): void;
    hideDropdown(): void;
    selectOption(option: OntologyMatch): void;
    confirmSelection(): void;
    onKeyDown(event: KeyboardEvent): void;
    clear(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<OntologyAutocompleteComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<OntologyAutocompleteComponent, "hpo-ontology-autocomplete", never, { "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "inputString": { "alias": "inputString"; "required": false; "isSignal": true; }; "autocompleteProvider": { "alias": "autocompleteProvider"; "required": true; "isSignal": true; }; "requireConfirmation": { "alias": "requireConfirmation"; "required": true; "isSignal": true; }; "confirmPosition": { "alias": "confirmPosition"; "required": false; "isSignal": true; }; }, { "selected": "selected"; }, never, never, true, never>;
}

declare class HpoPolishingWorkspaceComponent {
    private notificationService;
    sentences: _angular_core.InputSignal<FenominalSentence[]>;
    readonly segmentsReplaced: _angular_core.OutputEmitterRef<{
        sentence: FenominalSentence;
        segmentIndex: number;
        newSegments: FenominalSegment[];
    }>;
    availableModifiers: _angular_core.InputSignal<HpoTermMinimal[]>;
    hierarchyProvider: _angular_core.InputSignal<(termId: string) => Promise<HierarchyMapItem>>;
    autocompleteProvider: _angular_core.InputSignal<OntologyAutocompleteProvider>;
    protected activeTermId: _angular_core.WritableSignal<string>;
    complete: _angular_core.OutputEmitterRef<PolishedHpoAnnotation[]>;
    cancel: _angular_core.OutputEmitterRef<void>;
    badgeMoved: _angular_core.OutputEmitterRef<{
        originalTermId: string;
        newTextWindow: string;
        newSpan: {
            start: number;
            end: number;
        };
    }>;
    protected localSentences: _angular_core.WritableSignal<UiFenominalSentence[]>;
    protected hpoInputString: string;
    protected selectedHpoMatch: _angular_core.WritableSignal<OntologyMatch>;
    protected uniqueTableAnnotations: _angular_core.Signal<PolishedHpoAnnotation[]>;
    private hasInitialized;
    constructor();
    handleAnnotationUpdate(oldItem: PolishedHpoAnnotation, newItem: PolishedHpoAnnotation): void;
    protected deleteAnnotationEverywhere(termId: string): void;
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
    protected deleteHit(request: DeleteHitRequest): void;
    onSegmentsReplaced(event: {
        sentence: FenominalSentence;
        segmentIndex: number;
        newSegments: FenominalSegment[];
    }): void;
    protected saveAndFinish(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HpoPolishingWorkspaceComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HpoPolishingWorkspaceComponent, "hpo-polishing-workspace", never, { "sentences": { "alias": "sentences"; "required": false; "isSignal": true; }; "availableModifiers": { "alias": "availableModifiers"; "required": false; "isSignal": true; }; "hierarchyProvider": { "alias": "hierarchyProvider"; "required": true; "isSignal": true; }; "autocompleteProvider": { "alias": "autocompleteProvider"; "required": true; "isSignal": true; }; }, { "segmentsReplaced": "segmentsReplaced"; "complete": "complete"; "cancel": "cancel"; "badgeMoved": "badgeMoved"; }, never, never, true, never>;
}

declare class HpoAgeSelectorDialogComponent implements OnInit {
    dialogRef: ElementRef<HTMLDialogElement>;
    currentSelection: _angular_core.InputSignal<string>;
    selected: _angular_core.OutputEmitterRef<string>;
    dismissed: _angular_core.OutputEmitterRef<void>;
    private ageService;
    private notificationService;
    customAge: _angular_core.WritableSignal<string>;
    showSuggestions: _angular_core.WritableSignal<boolean>;
    existingAgeStrings: _angular_core.Signal<string[]>;
    filteredTerms: _angular_core.Signal<string[]>;
    ngOnInit(): void;
    open(): void;
    close(): void;
    onInputChange(value: string): void;
    onSelectExisting(term: string): void;
    onSubmitCustom(): void;
    onCancel(): void;
    onBackdropClick(event: MouseEvent): void;
    onDocumentClick(event: MouseEvent): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HpoAgeSelectorDialogComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HpoAgeSelectorDialogComponent, "hpo-age-selector-dialog", never, { "currentSelection": { "alias": "currentSelection"; "required": false; "isSignal": true; }; }, { "selected": "selected"; "dismissed": "dismissed"; }, never, never, true, never>;
}

declare class HpoAgeSelectorComponent {
    dialogComponent: HpoAgeSelectorDialogComponent;
    selectedOnset: _angular_core.InputSignal<string>;
    size: _angular_core.InputSignal<"small" | "normal">;
    onsetChanged: _angular_core.OutputEmitterRef<string>;
    openSelectorDialog(): void;
    onDialogSelected(result: string): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HpoAgeSelectorComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HpoAgeSelectorComponent, "hpo-age-selector", never, { "selectedOnset": { "alias": "selectedOnset"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; }, { "onsetChanged": "onsetChanged"; }, never, never, true, never>;
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
    loadExampleText(): void;
    onCancel(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HpoMiningComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HpoMiningComponent, "hpo-mining-workspace", never, {}, { "success": "success"; "error": "error"; "cancel": "cancel"; "miningRequested": "miningRequested"; }, never, never, true, never>;
}

declare class HpoModifierComponent {
    availableModifiers: _angular_core.InputSignal<HpoTermMinimal[]>;
    selectedModifiers: _angular_core.ModelSignal<HpoTermMinimal[]>;
    placeholder: _angular_core.InputSignal<string>;
    modifierToggled: _angular_core.OutputEmitterRef<{
        modifier: HpoTermMinimal;
        selected: boolean;
    }>;
    menuClosed: _angular_core.OutputEmitterRef<void>;
    protected quickModifiers: _angular_core.Signal<HpoTermMinimal[]>;
    protected control: FormControl<string | HpoTermMinimal>;
    private searchQuery;
    protected filteredOptions: _angular_core.Signal<HpoTermMinimal[]>;
    constructor();
    private mustBeKnownTerm;
    protected isSelected(term: HpoTermMinimal): boolean;
    protected selectQuickModifier(mod: HpoTermMinimal): void;
    protected onOptionSelected(event: MatAutocompleteSelectedEvent): void;
    protected removeModifier(term: HpoTermMinimal): void;
    private addModifier;
    protected displayFn(option: HpoTermMinimal | null): string;
    protected clear(): void;
    protected closeMenu(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HpoModifierComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HpoModifierComponent, "hpo-modifier", never, { "availableModifiers": { "alias": "availableModifiers"; "required": true; "isSignal": true; }; "selectedModifiers": { "alias": "selectedModifiers"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; }, { "selectedModifiers": "selectedModifiersChange"; "modifierToggled": "modifierToggled"; "menuClosed": "menuClosed"; }, never, never, true, never>;
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
declare class OrcidDialogComponent implements AfterViewInit {
    private fb;
    private dialogRef;
    data: OrcidDialogData;
    externalLinkClicked: _angular_core.OutputEmitterRef<string>;
    orcidForm: FormGroup;
    ngAfterViewInit(): void;
    onLinkClick(event: Event): void;
    onCancel(): void;
    onSave(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<OrcidDialogComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<OrcidDialogComponent, "hpo-orcid-dialog", never, {}, { "externalLinkClicked": "externalLinkClicked"; }, never, never, true, never>;
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
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<PhenopacketLoaderComponent, "hpo-phenopacket-loader", never, { "onIngest": { "alias": "onIngest"; "required": true; "isSignal": true; }; }, { "phenopacketIngested": "phenopacketIngested"; "ingestError": "ingestError"; }, never, never, true, never>;
}

declare class TextMiningContainerComponent {
    dialogRef: ElementRef<HTMLDialogElement>;
    private notificationService;
    selectedSentence: _angular_core.WritableSignal<FenominalSentence>;
    selectedSegment: _angular_core.WritableSignal<FenominalSegment>;
    selectedIndex: _angular_core.WritableSignal<number>;
    sentences: _angular_core.InputSignal<FenominalSentence[]>;
    deleteHitRequested: _angular_core.OutputEmitterRef<DeleteHitRequest>;
    readonly autocompleteProvider: _angular_core.InputSignal<OntologyAutocompleteProvider>;
    readonly segmentsReplaced: _angular_core.OutputEmitterRef<{
        sentence: FenominalSentence;
        segmentIndex: number;
        newSegments: FenominalSegment[];
    }>;
    protected collapsedUntilIndex: _angular_core.WritableSignal<number>;
    protected collapseUpTo(sentenceStart: number): void;
    /** Resets layout back to the full text mapping */
    protected resetCollapse(): void;
    protected isSentenceCollapsed(sentenceStart: number): boolean;
    protected deleteHit(sentence: FenominalSentence, hit: FenominalHit): void;
    openManualAnnotationDialog(sentence: FenominalSentence, segmentIndex: number): void;
    handleDialogResult(result: FenominalSegment[] | null): void;
    private readonly punctuationOnlyPattern;
    isPunctuationOnly(text: string): boolean;
    protected getTooltipText(hit: FenominalHit): string;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TextMiningContainerComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<TextMiningContainerComponent, "hpo-text-mining-container", never, { "sentences": { "alias": "sentences"; "required": false; "isSignal": true; }; "autocompleteProvider": { "alias": "autocompleteProvider"; "required": true; "isSignal": true; }; }, { "deleteHitRequested": "deleteHitRequested"; "segmentsReplaced": "segmentsReplaced"; }, never, never, true, never>;
}

interface HpoTwostepData {
    mineTextProvider: (text: string) => Promise<FenominalSentence[]>;
    hierarchyProvider: (termId: string) => Promise<HierarchyMapItem>;
    availableModifiers: () => Promise<HpoTermMinimal[]>;
    autocompleteProvider: (query: string) => Observable<OntologyMatch[]>;
}
declare class HpoTwostepMiningComponent implements OnInit {
    config: _angular_core.InputSignal<HpoTwostepData>;
    private readonly notificationService;
    protected currentStep: _angular_core.WritableSignal<1 | 2>;
    protected curatedSentences: _angular_core.WritableSignal<FenominalSentence[]>;
    protected readonly availableModifiers: _angular_core.WritableSignal<HpoTermMinimal[]>;
    curationComplete: _angular_core.OutputEmitterRef<PolishedHpoAnnotation[]>;
    cancelled: _angular_core.OutputEmitterRef<void>;
    errorOccurred: _angular_core.OutputEmitterRef<string>;
    successOccurred: _angular_core.OutputEmitterRef<string>;
    ngOnInit(): void;
    /**
     * Step 1 Callback: Ingests raw text annotations from the parser engine
     */
    protected handleMiningRequest(event: {
        text: string;
        callback: (result: FenominalSentence[] | string) => void;
    }): void;
    protected onTextMiningSuccess(parsedSentences: FenominalSentence[]): void;
    protected onTextMiningError(message: string): void;
    /**
     * Step 2 Callback: Ingests final curated tokens to return to the backend database
     */
    protected onCurationComplete(finalSentences: PolishedHpoAnnotation[]): void;
    protected onSegmentsReplaced(event: {
        sentence: FenominalSentence;
        segmentIndex: number;
        newSegments: FenominalSegment[];
    }): void;
    protected close(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HpoTwostepMiningComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HpoTwostepMiningComponent, "lib-hpo-twostep-mining", never, { "config": { "alias": "config"; "required": true; "isSignal": true; }; }, { "curationComplete": "curationComplete"; "cancelled": "cancelled"; "errorOccurred": "errorOccurred"; "successOccurred": "successOccurred"; }, never, never, true, never>;
}

export { FooterComponent, HelpButtonComponent, HpoAgeSelectorComponent, HpoMiningComponent, HpoModifierComponent, HpoPolishRowComponent, HpoPolishingWorkspaceComponent, HpoTwostepMiningComponent, LoadOntologyComponent, ModifierSelectorComponent, NotificationService, OntologyAutocompleteComponent, OrcidDialogComponent, PhenopacketLoaderComponent, TextMiningContainerComponent, ui_from_fenominal };
export type { DeleteHitRequest, FenominalHit, FenominalSegment, FenominalSentence, HierarchyMapItem, HitSpanPatch, HpoTermMinimal, HpoTwostepData, OntologyAutocompleteProvider, OntologyMatch, OrcidDialogData, PolishedHpoAnnotation, Span, UiFenominalHit, UiFenominalSegment, UiFenominalSentence };
