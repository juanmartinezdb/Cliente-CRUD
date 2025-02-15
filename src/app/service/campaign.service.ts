import { Campaign } from './../model/campaign';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageHandlerService } from './local-storage-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  //Servicios
  local: LocalStorageHandlerService = inject(LocalStorageHandlerService);

//Observables
  private campaingsSubject = new BehaviorSubject<Campaign[]>([]);
campaigns$ = this.campaingsSubject.asObservable();

  constructor() {
this.load();
  }

load() {
  const value = this.local.get('campaigns', []);
    this.campaingsSubject.next(value);
}

add(value: Campaign) {
  const newArray = [...this.campaingsSubject.getValue(), value];
  this.local.set('campaigns', newArray);
  this.campaingsSubject.next(newArray);
}
remove(value: Campaign) {
  this.local.remove('campaigns', value);
this.load();
}

update(value: Campaign) {
  const array = this.campaingsSubject.getValue().map(c => (c.id === value.id)? value : c );
  this.local.set('campaigns', array);
  this.campaingsSubject.next(array);
}
campaingById(id: number): Campaign {
  let campaign = null;
  this.campaigns$.subscribe( campaigns => {
    campaign = campaigns.find(c=> c.id==id);
  })
  return campaign!;
  // return this.local.get('campaigns', []).find(c => c.id==id)?.name;
}
}
