import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { Animations } from '../../animations/animations';
import { DOCUMENT } from '@angular/common';

@Component({
selector: 'app-header',
templateUrl: './header.component.html',
styleUrls: ['./header.component.css'],
animations: [Animations]
})
export class HeaderComponent implements AfterViewInit {

	@ViewChild('header') header!: ElementRef;

	constructor( private changeDetector: ChangeDetectorRef, @Inject(DOCUMENT) private document: Document) {}

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
		if (!isMobile) {
			this.closeMobileMenu();
		}
	}

	openMobileMenu(): void {
		this.showMobileMenu = true;		
		window.scroll({
			top: 0,
			left: 0
		})
		this.document.body.classList.add('disable-scroll');
	}

	closeMobileMenu(): void {
		this.showMobileMenu = false;
		this.document.body.classList.remove('disable-scroll');
	}
}
