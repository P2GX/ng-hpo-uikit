// Used to report the results of loading an ontology (hp.json, etc.) to the front end
// Corresponds to the Rust struct OntologyLoadEvent in ga4ghphetools
export interface OntologyLoadEvent {
    status: 'loading' | 'success' | 'error' | 'cancel';
    payload?: {
        version?: string;
        termCount?: number;
        errorMessage?: string;
    };
}