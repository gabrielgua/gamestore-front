import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { Animations } from 'src/app/animations/animations';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css'],
  animations: [Animations]
})
export class SearchModalComponent implements OnDestroy {

  @Output() closeEvent = new EventEmitter();

  constructor(private elementRef: ElementRef) {}
  
  @HostListener('document: keydown', ['$event'])
  handleSearchShortcut(event: KeyboardEvent) {  
    if (event.key.toLocaleLowerCase() === 'escape') {
      this.close();
    }
  }

  ngOnDestroy(): void {
    this.close();
  }

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

}
