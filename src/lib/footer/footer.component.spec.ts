import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
// 1. Import the 'vi' utility from vitest
import { vi } from 'vitest';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it('should create the footer component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should render application branding and version data correctly', () => {
    fixture.componentRef.setInput('appName', 'TestApp');
    fixture.componentRef.setInput('appVersion', '1.0.0');
    fixture.componentRef.setInput('gitHubIssuesUrl', 'https://github.com/test/issues');
    fixture.componentRef.setInput('currentYear', 2026);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const copyrightText = compiled.querySelector('p')?.textContent;
    
    expect(copyrightText).toContain('© 2026 TestApp v1.0.0');
  });

  it('should emit helpRequested when the help button is clicked', () => {
    // 2. Spy on the signal-driven output emitter using Vitest syntax
    const emitSpy = vi.spyOn(component.helpRequested, 'emit');

    const compiled = fixture.nativeElement as HTMLElement;
    const helpButton = compiled.querySelector('button.footer-link') as HTMLButtonElement;

    helpButton.click();

    // 3. Vitest uses the standard 'toHaveBeenCalledTimes' matcher
    expect(emitSpy).toHaveBeenCalledTimes(1);
    
    // Clean up the spy tracking when finished
    emitSpy.mockRestore();
  });
});