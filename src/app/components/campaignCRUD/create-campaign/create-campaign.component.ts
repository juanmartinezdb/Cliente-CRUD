import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Campaign } from '../../../model/campaign';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CampaignService } from '../../../service/campaign.service';
import { MapComponent } from '../../map/map.component';

@Component({
  selector: 'app-create-campaign',
  imports: [RouterLink, ReactiveFormsModule, MapComponent],
  templateUrl: './create-campaign.component.html'
})
export class CreateCampaignComponent implements OnInit {
campaign: Campaign;
formu!: FormGroup;
fb = inject(FormBuilder);
campService = inject(CampaignService);
maxID: number = 0;

constructor () {
  this.campaign = {
    id: 0,
    name: '',
    system: '',
    description: '',
    start_date: new Date(),
    active: true,
    characters_ids: [],
    difficulty: 1,
    latitude: 0,
    longitude: 0,
    place: ""
  };
}
ngOnInit(): void {
  this.formu = this.fb.group({
     name: ['',[Validators.required]],
     system: ['',[Validators.required]],
     description: ['',[Validators.required]],
     start_date: ['',[Validators.required]],
     active: ['',[]],
     difficulty: ['',[Validators.required]],
     place: '',
     latitude: [36.7213, [Validators.required]],  
     longitude: [-4.4213, [Validators.required]]
   });

   this.campService.campaigns$.subscribe(campaigns => {
    this.maxID = (campaigns.length>0)? Math.max(...campaigns.map(c=> c.id)) : 0;
   })
}
updateLocation(event: { latitude: number; longitude: number }) {
  this.formu.patchValue({ latitude: event.latitude, longitude: event.longitude });
}


submit(){
  if (this.formu.valid){
    this.campaign!.id= ++this.maxID;
    this.campaign!.name= this.formu.value.name;
    this.campaign!.system= this.formu.value.system;
    this.campaign!.description= this.formu.value.description;
    this.campaign!.start_date= this.formu.value.start_date;
    this.campaign!.active= Boolean(this.formu.value.active);
    this.campaign!.difficulty= this.formu.value.difficulty;
console.log(this.campaign);

      this.campService.add(this.campaign!);
  } else {
    alert("formulario invalido");

  }
  }
}
