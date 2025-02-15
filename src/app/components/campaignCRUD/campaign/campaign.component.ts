import { Component, inject, OnInit } from '@angular/core';
import { CampaignService } from '../../../service/campaign.service';
import { Campaign } from '../../../model/campaign';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-campaign',
  imports: [RouterLink],
  templateUrl: './campaign.component.html'
})
export class CampaignComponent implements OnInit {
//servicios
  campService: CampaignService = inject(CampaignService);

//
campaigns: Campaign[] = [];

constructor() {

}

ngOnInit(): void {
    this.campService.campaigns$.subscribe(c => this.campaigns= c);
    console.log(this.campaigns);
}


}
