import { Component, EventEmitter, Input, Output, inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { IconComponent } from "../svg-icons/svg-icon.component";

export interface OrcidDialogData {
  currentOrcid?: string;
}

@Component({
  selector: 'app-orcid-dialog',
  templateUrl: './orcid-dialog.component.html',
  styleUrl: './orcid-dialog.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
})
export class OrcidDialogComponent implements AfterViewInit {
  private fb = inject(FormBuilder);

  @Input() currentOrcid?: string;
  @Output() closed = new EventEmitter<string | null>();

  @ViewChild('dialogEl') dialogEl!: ElementRef<HTMLDialogElement>;

  orcidForm: FormGroup = this.fb.group({
    orcid: [
      '',
      [Validators.required, Validators.pattern(/^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/)],
    ],
  });

  ngOnInit() {
    if (this.currentOrcid) {
      this.orcidForm.patchValue({ orcid: this.currentOrcid });
    }
  }

  ngAfterViewInit() {
    if (this.dialogEl?.nativeElement) {
      this.dialogEl.nativeElement.showModal();
    }
  }

  onCancel(): void {
    this.dialogEl?.nativeElement.close();
    this.closed.emit(null);
  }

  onSave(): void {
    if (this.orcidForm.valid) {
      this.dialogEl?.nativeElement.close();
      this.closed.emit(this.orcidForm.value.orcid);
    }
  }
}