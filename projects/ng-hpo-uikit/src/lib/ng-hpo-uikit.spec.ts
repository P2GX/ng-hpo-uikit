import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgHpoUikit } from './ng-hpo-uikit';

describe('NgHpoUikit', () => {
  let component: NgHpoUikit;
  let fixture: ComponentFixture<NgHpoUikit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgHpoUikit],
    }).compileComponents();

    fixture = TestBed.createComponent(NgHpoUikit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
