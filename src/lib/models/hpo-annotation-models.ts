import { Observable } from 'rxjs';
import { OntologyMatch } from "./ontology-dto";
import { FenominalHit  } from './fenominal-models';

/** An HPO term. Matches ga4ghphetools HpoTermDuplet (camelCase on the wire). */
export interface HpoTermDuplet {
  hpoLabel: string;
  hpoId: string;
}

/* This is useful for the menu that allows to use to navigate to the parents or children of the current term. */
export interface HierarchyMapItem {
  currentTermId: string;
  parents: HpoTermDuplet[];
  children: HpoTermDuplet[];
}

export interface PolishedHpoAnnotation {
  termId: string;
  label: string;
  excluded: boolean;
  onsetString?: string;
  modifiers: HpoTermDuplet[];
}

/* Records what changes when a user moves a badge in our text mining component */
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

