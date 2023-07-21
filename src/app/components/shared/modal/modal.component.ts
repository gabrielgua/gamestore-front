import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Animations } from 'src/app/animations/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [Animations]
})
export class ModalComponent {

  @Input() title? = 'Title';
  @Input() actions?: boolean = true;

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit(): void {
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit(); 
  }
  

}
