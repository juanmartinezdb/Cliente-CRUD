import { Component, inject, OnInit } from '@angular/core';
import { Campaign } from '../../../model/campaign';
import { CampaignService } from '../../../service/campaign.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Character } from '../../../model/character';
import { CharacterService } from '../../../service/character.service';
import { MapComponent } from '../../map/map.component';

@Component({
  selector: 'app-detail-campaign',
  imports: [RouterLink, MapComponent],
  templateUrl: './detail-campaign.component.html'
})
export class DetailCampaignComponent implements OnInit {
campaign : Campaign | null = null;
private campService: CampaignService= inject(CampaignService);
private charService: CharacterService= inject(CharacterService);
private router = inject(Router);
private ruta = inject(ActivatedRoute);

characters: Character [] = [];

ngOnInit(): void {
  const id = Number(this.ruta.snapshot.paramMap.get('id'));

  this.campService.campaigns$.subscribe(campaigns => {
    this.campaign = campaigns.find(c => c.id == id) || null;
      this.loadCharacters();
  });
}

loadCharacters(): void {
    this.charService.characters$.subscribe(char => {
      this.characters = char.filter(c => c.campaign_id == this.campaign!.id);
    });
}

  deleteCampaign(): void {
    if(this.characters.length>0){
      if(confirm("Esta campaña tiene personajes, quieres moverlos a 'sin asignar' antes de borrar?")){
        this.charService.moveCharactersToUnassignedCampaign(this.campaign?.id!);
        } else {
          this.characters.forEach( c => this.charService.remove(c.id));
        }
    }
      this.campService.remove((this.campaign?.id)!.toString());
      this.router.navigate(['/campaigns']);
  }

}
