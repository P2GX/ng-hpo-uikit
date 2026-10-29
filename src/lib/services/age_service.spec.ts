import { AgeService } from './age_service';

describe('AgeService.validateAgeInput', () => {
  let service: AgeService;

  beforeEach(() => {
    service = new AgeService(); // a fresh service for every test
  });

  it('accepts an HPO onset label', () => {
    expect(service.validateAgeInput('Infantile onset')).toBe(true);
  });

  // A table of cases: one test per row, named after the input.
  it.each(['P1Y', 'P1Y6M', 'P10D', 'P0D', 'G20w', 'G20w3d', 'na'])('accepts %s', input => {
    expect(service.validateAgeInput(input)).toBe(true);
  });

  it.each(['P', 'xyz', '', 'G20w7d'])('rejects "%s"', input => {
    expect(service.validateAgeInput(input)).toBe(false);
  });
});