import { trigger, style, transition, animate, stagger, query } from "@angular/animations";

export const FadeFromTop = [
  trigger('fadeIn', [ 
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-10%)' }),
      animate('150ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
    ]),

    transition(':leave', [
      style({ opacity: 1, transform: 'translateY(0%)' }),
      animate('150ms ease', style({ opacity: 0, transform: 'translateY(-10%)' })),
    ]),
  ]),
]

export const FadeFromBottom = [
  trigger('fadeIn', [ 
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(10%)' }),
      animate('150ms ease', style({ opacity: 1, transform: 'translateX(0)' })),
    ]),

    transition(':leave', [
      style({ opacity: 1, transform: 'translateX(0%)' }),
      animate('0ms', style({ opacity: 0, })),
    ]),
  ]),
]