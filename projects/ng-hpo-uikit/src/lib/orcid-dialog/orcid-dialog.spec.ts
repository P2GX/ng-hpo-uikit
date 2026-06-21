import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcidDialog } from './orcid-dialog';

describe('OrcidDialog', () => {
  let component: OrcidDialog;
  let fixture: ComponentFixture<OrcidDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrcidDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(OrcidDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
