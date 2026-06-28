export interface HpoTermMinimal {
  termId: string;
  label: string;
}

export interface HierarchyMapItem {
  parents: HpoTermMinimal[];
  children: HpoTermMinimal[];
}

export interface PolishedHpoAnnotation {
  termId: string;
  label: string;
  isObserved: boolean;
  onsetString?: string;
  modifiers?: string[];
}