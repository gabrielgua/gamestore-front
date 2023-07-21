import { Component, HostListener, Injector, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from 'src/app/service/modal/modal.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { SearchModalService } from 'src/app/service/search-modal/search-modal.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  private modalOpened: boolean = false;
  @ViewChild('modalTemplate') template: TemplateRef<any> | undefined;

  constructor(private modalService: SearchModalService, private viewContainerRef: ViewContainerRef) {}

  


  @HostListener('document: keydown', ['$event'])
  handleSearchShortcut(event: KeyboardEvent) {  
    if (event.ctrlKey && event.key.toLocaleLowerCase() === 'b' && !this.modalOpened) {
      this.openModal(this.template!)
      this.modalOpened = true;
    }
  }


  openModal(template: TemplateRef<any>) {
    this.modalService
      .open(template, this.viewContainerRef )
      .subscribe(() => {            
        this.modalOpened = false;
      })
  }

}
