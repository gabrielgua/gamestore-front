import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  
  constructor(private changeDetector: ChangeDetectorRef) {}
  @ViewChild('container') container!: ElementRef;

  mobile: boolean = false;
  breakToMobileWidth: number = 800; //px 

  ngAfterViewInit(): void {
    this.manageScreenSize(this.container.nativeElement.offsetWidth);
    this.changeDetector.detectChanges();
  }

  manageScreenSize(screenWidth: number) {
    this.mobile = screenWidth <= this.breakToMobileWidth;
  }
}
