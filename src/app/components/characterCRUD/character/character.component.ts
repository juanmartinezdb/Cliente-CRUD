import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharacterService } from '../../../service/character.service';
import { Character } from '../../../model/character';
import { CampaignService } from '../../../service/campaign.service';

@Component({
  selector: 'app-character',
  imports: [RouterLink],
  templateUrl: './character.component.html',
  styleUrl:'./character.component.css'
})
export class CharacterComponent implements OnInit {
charService = inject(CharacterService);
campService = inject(CampaignService);
characters: Character[] = [];


ngOnInit(): void {
  this.charService.characters$.subscribe(chars => this.characters= chars);
}

}
