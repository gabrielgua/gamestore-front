import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Animations } from '../../animations/animations';

@Component({
selector: 'app-header',
templateUrl: './header.component.html',
styleUrls: ['./header.component.css'],
animations: [Animations]
})
export class HeaderComponent implements AfterViewInit {

	@ViewChild('header') header!: ElementRef;

	constructor( private changeDetector: ChangeDetectorRef ) {}


	breakToMobileWidth = 800;
	mobile: boolean = false;
	showMobileMenu: boolean = false;

	ngAfterViewInit(): void {
		this.manageScreenSize(this.header.nativeElement.offsetWidth);
		this.changeDetector.detectChanges();
	}

	

	

	manageScreenSize(width: number): void {
		const isMobile = width <= this.breakToMobileWidth;
		this.mobile = isMobile;   
		this.showMobileMenu = this.showMobileMenu && !isMobile ? false : this.showMobileMenu;
	}


	

	

	


}
