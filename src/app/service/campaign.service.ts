import { HttpClient } from '@angular/common/http';
import { Campaign } from './../model/campaign';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  http = inject(HttpClient);
  private campaingsSubject = new BehaviorSubject<Campaign[]>([]);
campaigns$ = this.campaingsSubject.asObservable();
url = 'http://localhost:3000/campaigns';

  constructor() {
this.load();
  }

load() {
this.http.get<Campaign[]>(this.url).subscribe({
  next: (data) => this.campaingsSubject.next(data),
  error: err => console.log("Error loading campaigns", err)
})
}

add(value: Campaign) {
  this.http.post(this.url, value).subscribe({
    next: () => {
      console.log("Campaign added succesfully");
      this.load();
    },
    error: (err) => console.error("Error adding campaign", err)

  })
}
remove(id: number) {
  this.http.delete(`${this.url}/${id}`).subscribe({
    next: () => {
      console.log(`Campaign with ID ${id} deleted`);
      this.load();
    },
    error: err => console.error("Error al eliminar la campaña:", err)
  });
}

update(value: Campaign){
  this.http.put(`${this.url}/${value.id}`, value).subscribe({
    next: () => {
      console.log(`Campaign with ID ${value.id} updated OK`);
      this.load();
    },
    error: (err) => console.error(`Error updating the campaign with ID ${value.id}:`, err)
  });
}

campaingById(id: number): Campaign {
  let campaign = null;
  this.campaigns$.subscribe( campaigns => {
    campaign = campaigns.find(c=> c.id==id);
  })
  return campaign!;
}


}
