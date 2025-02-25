import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../model/character';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
   http = inject(HttpClient);
  characterSubject = new BehaviorSubject<Character[]>([]);
  characters$ = this.characterSubject.asObservable();
  url = 'http://localhost:3000/characters';

    constructor() {
  this.load();
    }

  load() {
  this.http.get<Character[]>(this.url).subscribe({
    next: (data) => this.characterSubject.next(data),
    error: err => console.log("Error loading character", err)
  })
  }

  add(value: Character) {
    this.http.post(this.url, value).subscribe({
      next: () => {
        console.log("Character added succesfully");
        this.load();
      },
      error: (err) => console.error("Error adding character", err)

    })
  }
  remove(id: number) {
    this.http.delete(`${this.url}/${id}`).subscribe({
      next: () => {
        console.log(`Character with ID ${id} deleted`);
        this.load();
      },
      error: err => console.error("Error deleting character:", err)
    });
  }

  update(value: Character){
    this.http.put(`${this.url}/${value.id}`, value).subscribe({
      next: () => {
        console.log(`Character with ID ${value.id} updated OK`);
        this.load();
      },
      error: (err) => console.error(`Error updating the character with ID ${value.id}:`, err)
    });
  }

  moveCharactersToUnassignedCampaign(campaignId: number) {
let chars = this.getCharByCampaignId(campaignId);
for (let char of chars){
char.campaign_id=-1;
this.update(char)
}
this.load();
  }


getCharByCampaignId(value: number){
  return this.characterSubject.getValue().filter(c=> c.campaign_id==value);
}
}
