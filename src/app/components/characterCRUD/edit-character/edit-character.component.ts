import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CharacterService } from '../../../service/character.service';
import { CampaignService } from '../../../service/campaign.service';
import { Character } from '../../../model/character';
import { Campaign } from '../../../model/campaign';

@Component({
  selector: 'app-edit-character',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './edit-character.component.html'
})
export class EditCharacterComponent implements OnInit {
formu!: FormGroup;
charService = inject(CharacterService);
campService = inject(CampaignService)
fb = inject(FormBuilder);
character: Character | null = null;
campaigns: Campaign[] = [];
route = inject(ActivatedRoute);
private router = inject(Router);

ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.charService.characters$.subscribe( characters => {
      this.character = characters.find(c=> c.id= id)||null;
    })
    this.campService.campaigns$.subscribe(c => this.campaigns = c);
// console.log(this.campaigns);

    this.formu = this.fb.group({
       name: [this.character?.name,[Validators.required]],
       race: [this.character?.race,[Validators.required]],
       class: [this.character?.class,[Validators.required]],
       level: [this.character?.level,[Validators.required]],
       player: [this.character?.player,[Validators.required]],
       creation_date: [this.character?.creation_date,[Validators.required]],
       experience: [this.character?.experience,[Validators.required]],
      campaign_id: [this.character?.campaign_id,[Validators.required]],
    })

}

submit() {
  if (this.formu.valid){
    this.character!.name= this.formu.value.name;
    this.character!.race= this.formu.value.race;
    this.character!.class= this.formu.value.class;
    this.character!.level= this.formu.value.level;
    this.character!.player= this.formu.value.player;
    this.character!.creation_date= this.formu.value.creation_date;
    this.character!.experience= this.formu.value.experience;
    this.character!.campaign_id= this.formu.value.campaign_id;
    this.charService.update(this.character!)
    this.router.navigate(['/characters']);
  } else {
    alert('formulario no valido');
  }

  }
}
