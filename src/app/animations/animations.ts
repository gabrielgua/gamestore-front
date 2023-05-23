import { trigger, state, style, transition, animate } from "@angular/animations";

export const Fade = [
    trigger('fadeInOut', [ 
      state('notVisible', style({ 
        opacity: 0,
        transform: 'translateX(50%)',
      })),
      state('isVisible', style({ 
        opacity: 1,
        transform: 'translateX(0%)'
      })),

    //   transition(':enter', [
    //     animate(250, style({ opacity: 1 }))
    //  ]),

      transition('* => isVisible', [
        animate(200)
      ]),

      transition('isVisible <=> notVisible', [
        animate(2500)
      ]),
    ]),
  ]