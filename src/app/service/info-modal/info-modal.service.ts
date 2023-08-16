import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoModalService {

  private modalNotifier?: Subject<string>;

  constructor() { }
}
