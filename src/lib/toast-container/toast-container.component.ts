import { Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  template: `
    <div #popoverEl popover="manual" class="toast-stack">
      @for (toast of notificationService.toasts(); track toast.id) {
        <div class="toast" [class]="'toast-' + toast.kind">
          <span class="toast-message">{{ toast.message }}</span>
          <button class="toast-dismiss" (click)="notificationService.dismiss(toast.id)">
            {{ toast.dismissLabel }}
          </button>
        </div>
      }
    </div>
  `,
  styleUrl: './toast-container.component.scss',
})
export class ToastContainerComponent {
  protected notificationService = inject(NotificationService);
  private popoverEl = viewChild.required<ElementRef<HTMLElement>>('popoverEl');

  constructor() {
    effect(() => {
      const toasts = this.notificationService.toasts();
      const el = this.popoverEl()?.nativeElement as HTMLElement & {
        showPopover: () => void;
        hidePopover: () => void;
        matches: (s: string) => boolean;
      };
      if (!el || toasts.length === 0) return;

      // Re-showing moves this popover to the top of the top-layer stack,
      // so a toast fired while a modal <dialog> is open still renders above it.
      if (el.matches(':popover-open')) {
        el.hidePopover();
      }
      el.showPopover();
    });
  }
}