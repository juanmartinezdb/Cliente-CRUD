import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CharacterService } from '../../../service/character.service';
import { Character } from '../../../model/character';
import { Campaign } from '../../../model/campaign';
import { CampaignService } from '../../../service/campaign.service';

@Component({
  selector: 'app-create-character',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './create-character.component.html'
})
export class CreateCharacterComponent implements OnInit {
formu!: FormGroup;
charService = inject(CharacterService);
campService = inject(CampaignService)
fb = inject(FormBuilder);
character: Character | null = null;
campaigns: Campaign[] = [];
maxID: number = 0;
private router = inject(Router);

constructor () {
  this.character = {
    id: 0,
    name: "",
    race: "",
    class: "",
    level: 0,
    player: "",
    creation_date: new Date(),
    experience: 0,
    campaign_id: 0
  }
}

ngOnInit(): void {
this.formu = this.fb.group({
   name: ['',[Validators.required]],
   race: ['',[Validators.required]],
   class: ['',[Validators.required]],
   level: ['',[Validators.required]],
   player: ['',[Validators.required]],
   creation_date: ['',[Validators.required]],
   experience: ['',[Validators.required]],
  campaign_id: ['',[Validators.required]],

})

this.campService.campaigns$.subscribe(camps => {
  this.campaigns= camps;
})
this.charService.characters$.subscribe(characters => this.maxID = (characters.length>0)? Math.max(...this.campaigns.map(c=> c.id)):0 )
}
submit() {
if (this.formu.valid){
  this.character!.id= ++this.maxID;
  this.character!.name= this.formu.value.name;
  this.character!.race= this.formu.value.race;
  this.character!.class= this.formu.value.class;
  this.character!.level= this.formu.value.level;
  this.character!.player= this.formu.value.player;
  this.character!.creation_date= this.formu.value.creation_date;
  this.character!.experience= this.formu.value.experience;
  this.character!.campaign_id= this.formu.value.campaign_id;
  this.charService.add(this.character!)
  console.log(this.character);
  this.router.navigate(['/characters']);
  
} else {
  alert('formulario no valido');
}
}
}
