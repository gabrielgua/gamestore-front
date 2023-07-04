import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Fade } from '../animations/animations';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [Fade]
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild('header') header!: ElementRef;

  constructor(private changeDetector: ChangeDetectorRef, private router: Router) {}

  search = new FormControl('');
  

  breakToMobileWidth = 800;
  mobile: boolean = false;
  showMobileMenu: boolean = false;

  ngAfterViewInit(): void {
    this.manageScreenSize(this.header.nativeElement.offsetWidth);
    this.changeDetector.detectChanges();
  }

  manageScreenSize(width: number): void {
    const isMobile = width <= this.breakToMobileWidth;
    this.mobile = isMobile ? true : false;   

    this.showMobileMenu = this.showMobileMenu && !isMobile ? false : this.showMobileMenu;
  }

  handleSearch(): void {
    if (this.search.value) {
      localStorage.setItem('search', this.search.value);
      this.search = new FormControl('');
      this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => {
        this.router.navigate(['/jogos']);
      });
      return;
    } 

    this.router.navigate(['/jogos']);
  }
}
