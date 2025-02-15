import { inject, Injectable } from '@angular/core';
import { LocalStorageHandlerService } from './local-storage-handler.service';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../model/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  //Servicios
  local: LocalStorageHandlerService = inject(LocalStorageHandlerService);

//Observables
private charactersSubject = new BehaviorSubject<Character[]>(this.local.get('characters', []));
characters$ = this.charactersSubject.asObservable();

constructor() {
  this.load();
 }

load() {
  const value = this.local.get('characters', []);
  this.charactersSubject.next(value);
}
add(value: Character) {
  const newArray = [...this.charactersSubject.getValue(), value];
  this.local.set('characters', newArray);
  this.charactersSubject.next(newArray);
}

remove(value: Character){
  this.local.remove('characters', value);
  this.load();
}

update(value: Character){
const array = this.charactersSubject.getValue().map(c=> (c.id==value.id)?value:c);
this.local.set('characters', array);
this.charactersSubject.next(array);
}

getCharByCampaignId(value: number){
  return this.charactersSubject.getValue().filter(c=> c.campaign_id==value);
}
}
