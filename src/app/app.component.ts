import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  
  title = 'gamestore';
  currentRoute: string = '';

  noHeaderUrls: string[] = ['/auth/register']

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
        .subscribe((event: any) => this.setCurrentRoute(event.url));
  }

  setCurrentRoute(url: string): void {
    this.currentRoute = url;
    
  }

  mostrarHeader(): boolean {
    return !this.noHeaderUrls.includes(this.currentRoute); 
  }
}
