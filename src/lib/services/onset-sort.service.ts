import { Injectable } from '@angular/core';
import { PolishedHpoAnnotation } from '../models/hpo-annotation-models';

/** Gestational age at term birth, in days (40 weeks, LMP convention). */
const TERM_GESTATION_DAYS = 280;

const gestWeeksToRelativeDays = (weeks: number): number => weeks * 7 - TERM_GESTATION_DAYS;

/**
 * Representative "days relative to birth" for each categorical HPO onset term
 * (descendants of HP:0003674). Birth = 0, negative = prenatal, positive = postnatal.
 * Values are midpoints/typical points within each term's defined range — approximate
 * by construction, since a category is being collapsed to a single sortable point.
 */
const CATEGORICAL_ONSET_DAYS: Record<string, number> = {
  // Prenatal
  'hp:0030674': gestWeeksToRelativeDays(20), 'antenatal onset': gestWeeksToRelativeDays(20),
  'hp:0011460': gestWeeksToRelativeDays(4),  'embryonal onset': gestWeeksToRelativeDays(4),
  'hp:0011461': gestWeeksToRelativeDays(24), 'fetal onset': gestWeeksToRelativeDays(24),
  'hp:0034198': gestWeeksToRelativeDays(21), 'second trimester onset': gestWeeksToRelativeDays(21),
  'hp:0034199': gestWeeksToRelativeDays(34), 'third trimester onset': gestWeeksToRelativeDays(34),

  // Postnatal
  'hp:0003577': 0,          'congenital onset': 0,
  'hp:0003623': 14,         'neonatal onset': 14,
  'hp:0003593': 180,        'infantile onset': 180,
  'hp:0011463': 365 * 3,    'childhood onset': 365 * 3,
  'hp:0003621': 365 * 10,   'juvenile onset': 365 * 10,
  'hp:0003581': 365 * 25,   'adult onset': 365 * 25,
  'hp:0011462': 365 * 22,   'young adult onset': 365 * 22,
  'hp:0025708': 365 * 17.5, 'early young adult onset': 365 * 17.5,
  'hp:0025709': 365 * 22,   'intermediate young adult onset': 365 * 22,
  'hp:0025710': 365 * 32,   'late young adult onset': 365 * 32,
  'hp:0003596': 365 * 50,   'middle age onset': 365 * 50,
  'hp:0003584': 365 * 70,   'late onset': 365 * 70,
};

/** Parses ISO 8601 durations like "P32Y1M", "P2D" — always postnatal, always ≥ 0. */
function parseIsoDurationDays(raw: string): number | null {
  const m = /^P(?:(\d+(?:\.\d+)?)Y)?(?:(\d+(?:\.\d+)?)M)?(?:(\d+(?:\.\d+)?)W)?(?:(\d+(?:\.\d+)?)D)?$/i.exec(raw);
  if (!m || raw.toUpperCase() === 'P') return null;
  const [, y, mo, w, d] = m;
  if (!y && !mo && !w && !d) return null;
  const years = parseFloat(y ?? '0');
  const months = parseFloat(mo ?? '0');
  const weeks = parseFloat(w ?? '0');
  const days = parseFloat(d ?? '0');
  return years * 365.25 + months * 30.44 + weeks * 7 + days;
}

/** Parses gestational age strings like "G23w1d", "G23w" — always prenatal (negative). */
function parseGestationalAgeDays(raw: string): number | null {
  const m = /^G(\d+)W(?:(\d+)D)?$/i.exec(raw);
  if (!m) return null;
  const weeks = parseInt(m[1], 10);
  const days = m[2] ? parseInt(m[2], 10) : 0;
  return (weeks * 7 + days) - TERM_GESTATION_DAYS;
}

/** Resolves any of the three onset vocabularies to "days relative to birth", or null if unrecognized. */
function parseOnsetToDays(onset: string | null | undefined): number | null {
  if (onset == null) return null;
  const raw = onset.trim();
  if (isEmptyOnsetToken(raw)) return null;

  const categorical = CATEGORICAL_ONSET_DAYS[raw.toLowerCase()];
  if (categorical !== undefined) return categorical;

  const gestational = parseGestationalAgeDays(raw);
  if (gestational !== null) return gestational;

  return parseIsoDurationDays(raw);
}

function isEmptyOnsetToken(raw: string): boolean {
    if (! raw) return true;
    return raw === "na";
}


@Injectable({ providedIn: 'root' })
export class OnsetSortService {

  /** True if the onset string is any recognized form (categorical, ISO duration, or gestational age). */
  isKnown(onset: string | null | undefined): boolean {
    return parseOnsetToDays(onset) !== null;
  }

  /** Earliest onset first, then alphabetical by label. Unrecognized onset sorts last. */
  compare = (a: PolishedHpoAnnotation, b: PolishedHpoAnnotation): number => {
    const daysA = parseOnsetToDays(a.onsetString) ?? Number.POSITIVE_INFINITY;
    const daysB = parseOnsetToDays(b.onsetString) ?? Number.POSITIVE_INFINITY;
    if (daysA !== daysB) return daysA - daysB;

    const labelA = (a.label ?? a.termId).toLowerCase();
    const labelB = (b.label ?? b.termId).toLowerCase();
    return labelA.localeCompare(labelB);
  };


  sorted(annotations: PolishedHpoAnnotation[]): PolishedHpoAnnotation[] {
    return [...annotations].sort(this.compare);
  }
}