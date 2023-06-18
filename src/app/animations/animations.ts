import { trigger, state, style, transition, animate, stagger, query } from "@angular/animations";

export const FadeInOut = [
    trigger('fadeIn', [ 
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10%)' }),
        animate('150ms ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),

      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0%)' }),
        animate('150ms ease-out', style({ opacity: 0, transform: 'translateY(-10%)' })),
      ]),
    ]),
  ]