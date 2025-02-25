import { Component, inject, OnInit } from '@angular/core';
import { Campaign } from '../../../model/campaign';
import { CampaignService } from '../../../service/campaign.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Character } from '../../../model/character';
import { CharacterService } from '../../../service/character.service';

@Component({
  selector: 'app-detail-campaign',
  imports: [RouterLink],
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
    this.campaign = campaigns.find(c => c.id === id) || null;

      this.loadCharacters();
  });
}

loadCharacters(): void {
    this.charService.characters$.subscribe(char => {
      this.characters = char.filter(c => c.campaign_id == this.campaign!.id);
    });
}

  deleteCampaign(): void {
      this.campService.remove(this.campaign!.id);
      this.router.navigate(['/campaigns']);
  }

}
