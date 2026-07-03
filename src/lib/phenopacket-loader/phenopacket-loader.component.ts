// phenopacket-loader.component.ts
import { Component, signal, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hpo-phenopacket-loader',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./phenopacket-loader.component.scss'],
  templateUrl: './phenopacket-loader.component.html'
})
export class PhenopacketLoaderComponent {
  readonly onIngest = input.required<(payload: string) => Promise<void> | void>();
  readonly isDragging = signal<boolean>(false);
  readonly fileName = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);

  readonly phenopacketIngested = output<any>();
  readonly ingestError = output<string>();

  
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      this.processFile(inputElement.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(): void {
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    
    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  private processFile(file: File): void {
    if (!file.name.endsWith('.json')) {
      this.errorMessage.set('Invalid file type. Please upload a JSON phenopacket.');
      return;
    }

    this.fileName.set(file.name.toLowerCase());
    this.errorMessage.set(null);
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const jsonString = e.target?.result as string;
        
        // Quick local syntax validation sanity check
        JSON.parse(jsonString); 
        
        // Execute the decoupled application callback handler seamlessly
        await this.onIngest()(jsonString);
        
      } catch (err) {
        this.errorMessage.set('Failed to process file contents. Verify structural validity.');
        this.fileName.set(null);
      }
    };

    reader.readAsText(file);
  }
}