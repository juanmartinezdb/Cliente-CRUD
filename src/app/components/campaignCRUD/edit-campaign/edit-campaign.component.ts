import { Campaign } from './../../../model/campaign';
import { Component, inject, OnInit } from '@angular/core';
import { CampaignService } from '../../../service/campaign.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-campaign',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './edit-campaign.component.html'
})
export class EditCampaignComponent implements OnInit {
campService = inject(CampaignService);
route = inject(ActivatedRoute);
fb = inject(FormBuilder);
campaign: Campaign| null = null;
formu!: FormGroup;

constructor(){

}

ngOnInit(): void {

  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.campService.campaigns$.subscribe( campaigns=> {
    this.campaign = campaigns.find(c => id==c.id)||null;
  })
  this.formu = this.fb.group({
    name: [this.campaign?.name,[Validators.required]],
    system: [this.campaign?.system,[Validators.required]],
    description: [this.campaign?.description,[Validators.required]],
    start_date: [this.campaign?.start_date,[Validators.required]],
    active: [this.campaign?.active,[]],
    difficulty: [this.campaign?.difficulty,[Validators.required]]
  });

}
submit(){
if (this.formu.valid){
  this.campaign!.name= this.formu.value.name;
  this.campaign!.system= this.formu.value.system;
  this.campaign!.description= this.formu.value.description;
  this.campaign!.start_date= this.formu.value.start_date;
  this.campaign!.active= Boolean(this.formu.value.active);
  this.campaign!.difficulty= this.formu.value.difficulty;

    this.campService.update(this.campaign!);
} else {
  alert("formulario invalido");

}
}
}
