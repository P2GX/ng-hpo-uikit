import { Component, ElementRef, input, viewChild } from '@angular/core';
import { openExternalUrl } from "../services/open-external-url";


@Component({
  selector: 'hpo-help-button',
  standalone: true,
  templateUrl: './help-button.component.html',
  styleUrl: './help-button.component.scss'
})
export class HelpButtonComponent {
  title = input.required<string>();
  lines = input.required<string[]>();
  helpUrl = input<string>();

  private popoverEl = viewChild.required<ElementRef<HTMLElement>>('popoverEl');

  toggle() {
    const el = this.popoverEl().nativeElement;
    if (el.matches(':popover-open')) {
      el.hidePopover();
    } else {
      el.showPopover();
    }
  }

  
  async openDocs() {
    const url = this.helpUrl();
    if (url) await openExternalUrl(url);
  }
}