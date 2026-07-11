import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FenominalSentence } from '../models/fenominal-models';

@Component({
  selector: 'hpo-mining-workspace',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hpo-mining.component.html',
  styleUrl: './hpo-mining.component.scss'
})
export class HpoMiningComponent {
  pastedText = '';
  isMining = signal<boolean>(false); 
  
  
  success = output<FenominalSentence[]>();
  error = output<string>();
  cancel = output<void>();

  // A brand new output that delegates the actual HTTP call to the host application
  miningRequested = output<{ 
    text: string, 
    callback: (result: FenominalSentence[] | string) => void 
  }>();

  /**
   * Triggers the text mining pipeline by handing the text off to the host application
   */
  runTextMining(): void {
    console.log("runTextMining")
    if (!this.pastedText.trim()) return;

    this.isMining.set(true);

    // Delegate the async operation to the app layer
    this.miningRequested.emit({
      text: this.pastedText,
      callback: (result) => {
        this.isMining.set(false);
        if (typeof result === 'string') {
          this.error.emit(result);
        } else {
          this.success.emit(result);
        }
      }
    });
  }

  loadExampleText(): void {
    // from PMID:28775536
    this.pastedText = `Physical examination revealed short stature (149 Cm), low set ears, ptosis, antimongoloid palpebral slant, high arched palate and pectus excavatum. Pulse, blood pressure and jugular venous pressure were normal. There was no pallor, cyanosis, clubbing or pedal edema. Apex beat was palpable in the left fourth intercostal space in the midclavicular line, normal in the character.`;
  }

  onCancel(): void {
    this.cancel.emit();
  }
}