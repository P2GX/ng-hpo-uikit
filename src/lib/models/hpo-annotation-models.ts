import { Observable } from 'rxjs';
import { OntologyMatch } from "./ontology-dto";
import { FenominalHit } from './fenominal-models';

export interface HpoTermMinimal {
  termId: string;
  label: string;
}

/* This is useful for the menu that allows to use to navegate to the parents or children of the current term. */
export interface HierarchyMapItem {
  currentTermId: string;
  parents: HpoTermMinimal[];
  children: HpoTermMinimal[];
}

export interface PolishedHpoAnnotation {
  termId: string;
  label: string;
  excluded: boolean;
  onsetString?: string;
  modifiers: HpoTermMinimal[];
}

/* Records what changes when a user moves a badge in our textmining component */
export interface HitSpanPatch {
  action: 'SPAN_BOUNDARIES_CHANGED' | 'SPAN_POSITION_SHIFTED';
  sentenceStart: number;
  segmentIndex: number;
  span: { start: number; end: number };
}


export type OntologyAutocompleteProvider = (query: string) => Observable<OntologyMatch[]>;

/* This is used if we delete an erroneous hit from the HPO text mining window */
export interface DeleteHitRequest {
    sentenceStart: number;
    hit: FenominalHit;
}
