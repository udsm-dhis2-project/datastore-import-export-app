import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription'; 

@Injectable({
  providedIn: 'root'
})
export class EventEmmiterService {

  reloadNamespaces = new EventEmitter();    
  subsVar: Subscription;    
    
  constructor() { }    
    
  onNameKeyAdded() {    
    this.reloadNamespaces.emit();    
  }  
}
