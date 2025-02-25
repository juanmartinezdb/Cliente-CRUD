import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharacterService } from '../../../service/character.service';
import { Character } from '../../../model/character';
import { CampaignService } from '../../../service/campaign.service';
import { Campaign } from '../../../model/campaign';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-character',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './character.component.html',
  styleUrl:'./character.component.css'
})
export class CharacterComponent implements OnInit {
charService = inject(CharacterService);
campService = inject(CampaignService);
characters: Character[] = [];
campaigns: Campaign[] = [];
campaignFilter = new FormControl('');


ngOnInit(): void {
  this.charService.characters$.subscribe(chars => this.characters= chars);
  this.campService.campaigns$.subscribe(camps=> this.campaigns= camps);
}
filterByCampaign() {
  const campaignId = Number(this.campaignFilter.value);
  this.characters = campaignId
    ? this.charService.getCharByCampaignId(campaignId)
    : this.charService.characterSubject.getValue();
}

}
