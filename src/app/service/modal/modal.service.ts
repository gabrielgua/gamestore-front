import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Injector, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalComponent } from 'src/app/components/shared/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalNotifier?: Subject<string>;

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private injector: Injector) {}

  open(template: TemplateRef<any>, viewContainerRef: ViewContainerRef, options?: {title?: string, actions?: boolean}) {

    const contentViewRef = template.createEmbeddedView(template.elementRef.nativeElement);
    const component = viewContainerRef.createComponent(ModalComponent, {injector: this.injector, projectableNodes: [ contentViewRef.rootNodes ]})
    
    component.instance.title = options?.title;
    component.instance.actions = options?.actions;
    component.instance.closeEvent.subscribe(() => this.closeModal());
    component.instance.submitEvent.subscribe(() => this.submitModal());
    
    component.hostView.detectChanges();

    this.document.body.appendChild(component.location.nativeElement);

    this.modalNotifier = new Subject();
    return this.modalNotifier?.asObservable();
  }

  completeModal() {
    this.modalNotifier?.complete();
  }
  
  closeModal() {
    this.modalNotifier?.next('close');
    this.completeModal();
  }

  submitModal() {
    this.modalNotifier?.next('confirm');
    this.completeModal();
  }
}
