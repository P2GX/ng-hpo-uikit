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
export interface OntologyMatch {
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


