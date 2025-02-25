import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CharacterService } from '../../../service/character.service';
import { CampaignService } from '../../../service/campaign.service';
import { Character } from '../../../model/character';
import { Campaign } from '../../../model/campaign';

@Component({
  selector: 'app-details-character',
  imports: [RouterLink],
  templateUrl: './details-character.component.html'
})
export class DetailsCharacterComponent implements OnInit {
charService = inject(CharacterService);
campService = inject(CampaignService);
character: Character |null = null;
campaign: Campaign| null = null;
private router = inject(Router);
private ruta = inject(ActivatedRoute);

ngOnInit(): void {
    const id = Number(this.ruta.snapshot.paramMap.get('id'));
    this.charService.characters$.subscribe(characters => {
      this.character = characters.find(c=> c.id==id)|| null;
    });
    if (this.character){
      this.campaign = this.campService.campaingById(this.character.campaign_id);
    }
}

deleteCharacter() {

    this.charService.remove(this.character!.id);

  this.router.navigate(['/characters']);
}

}
