import { trigger, style, transition, animate, stagger, query } from "@angular/animations";

export const Fade = [
  trigger('fromTopToTop', [ 
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-10%)' }),
      animate('150ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
    ]),

    transition(':leave', [
      style({ opacity: 1, transform: 'translateY(0%)' }),
      animate('150ms ease', style({ opacity: 0, transform: 'translateY(-10%)' })),
    ]),
  ]),

  trigger('fromBottomToBottom', [ 
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(10%)' }),
      animate('150ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
    ]),

    transition(':leave', [
      style({ opacity: 1, transform: 'translateY(0%)' }),
      animate('150ms ease', style({ opacity: 0, transform: 'translateY(10%)' })),
    ]),
  ]),

  trigger('fromRightToRight', [ 
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(10%)' }),
      animate('150ms ease', style({ opacity: 1, transform: 'translateX(0)' })),
    ]),

    transition(':leave', [
      style({ opacity: 1, transform: 'translateX(0%)' }),
      animate('150ms ease', style({ opacity: 0, transform: 'translateX(10%)' })),
    ]),
  ]),

  trigger('fromLeftToLeft', [ 
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(-10%)' }),
      animate('150ms 100ms ease', style({ opacity: 1, transform: 'translateX(0)' })),
    ]),

    transition(':leave', [
      style({ opacity: 1, transform: 'translateX(0%)' }),
      animate('100ms ease', style({ opacity: 0, transform: 'translateX(-10%)'})),
    ]),
  ]),
]
