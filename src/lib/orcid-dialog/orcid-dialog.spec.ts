import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrcidDialogComponent, OrcidDialogData } from './orcid-dialog';
// Import the tokens we need to supply
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { vi } from 'vitest';


describe('OrcidDialogComponent', () => {
  let component: OrcidDialogComponent;
  let fixture: ComponentFixture<OrcidDialogComponent>;

  // 1. Create a mock object for MatDialogRef to handle close events
  const mockDialogRef = {
    close: vi.fn() // Using Vitest's mock function tracking
  };

  // 2. Set up dummy injection data matching the OrcidDialogData interface
  const mockDialogData: OrcidDialogData = {
    currentOrcid: '0000-0002-1825-0097'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrcidDialogComponent],
      // 3. Supply the missing tokens using explicit value maps
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrcidDialogComponent);
    component = fixture.componentInstance;
    
    // Explicitly run change detection to map mock initial state to template controls
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});