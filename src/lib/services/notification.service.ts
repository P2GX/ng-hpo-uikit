import { Injectable, signal } from '@angular/core';

export type ToastKind = 'error' | 'success' | 'warning';

export interface Toast {
  id: number;
  message: string;
  kind: ToastKind;
  dismissLabel: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private nextId = 0;
  readonly toasts = signal<Toast[]>([]);

  showError(message: string, duration = 8000) {
    this.push(message, 'error', 'Dismiss', duration);
  }

  showSuccess(message: string, duration = 4000) {
    this.push(message, 'success', 'OK', duration);
  }

  showWarning(message: string, duration = 6000) {
    this.push(message, 'warning', 'Close', duration);
  }

  dismiss(id: number) {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }

  private push(message: string, kind: ToastKind, dismissLabel: string, duration: number) {
    const id = this.nextId++;
    this.toasts.update(list => [...list, { id, message, kind, dismissLabel }]);
    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
  }
}