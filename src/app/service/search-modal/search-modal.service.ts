import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Injector, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchModalComponent } from 'src/app/components/header/search/search-modal/search-modal.component';
import { ModalComponent } from 'src/app/components/shared/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class SearchModalService {

  private modalNotifier?: Subject<string>;

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private injector: Injector) {}

  open(template: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    const contentViewRef = template.createEmbeddedView(template.elementRef.nativeElement);
    const component = viewContainerRef.createComponent(SearchModalComponent, {injector: this.injector, projectableNodes: [ contentViewRef.rootNodes ]})
    
    component.instance.closeEvent.subscribe(() => this.closeModal());
    
    component.hostView.detectChanges();

    this.document.body.appendChild(component.location.nativeElement);

    this.modalNotifier = new Subject();
    return this.modalNotifier?.asObservable();
  }

  closeModal() {
    this.modalNotifier?.next('close');
    this.modalNotifier?.complete();
  }
}
