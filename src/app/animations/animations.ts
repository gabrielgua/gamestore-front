import { trigger, state, style, transition, animate, stagger, query } from "@angular/animations";

export const Fade = [
    trigger('fadeIn', [ 
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10%)' }),
        animate('250ms ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
     ]),
    ]),
  ]