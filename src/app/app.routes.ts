import { EditCharacterComponent } from './components/characterCRUD/edit-character/edit-character.component';
import { DetailsCharacterComponent } from './components/characterCRUD/details-character/details-character.component';
import { Routes } from '@angular/router';
import { StartComponent } from './components/layout/start/start.component';
import { CampaignComponent } from './components/campaignCRUD/campaign/campaign.component';
import { CharacterComponent } from './components/characterCRUD/character/character.component';
import { CreateCampaignComponent } from './components/campaignCRUD/create-campaign/create-campaign.component';
import { CreateCharacterComponent } from './components/characterCRUD/create-character/create-character.component';
import { DetailCampaignComponent } from './components/campaignCRUD/detail-campaign/detail-campaign.component';
import { EditCampaignComponent } from './components/campaignCRUD/edit-campaign/edit-campaign.component';

export const routes: Routes = [
  {path:"", component: StartComponent },
  //campaings routes
  {path:"campaigns", component: CampaignComponent },
  {path:"campaigns/new", component: CreateCampaignComponent },
  {path:"campaigns/edit/:id", component: EditCampaignComponent},
  {path:"campaigns/:id", component: DetailCampaignComponent},

  //character Routes
  {path:"characters", component: CharacterComponent },
  {path:"characters/new", component: CreateCharacterComponent },
  {path:"characters/edit/:id", component: EditCharacterComponent},
  {path:"characters/:id", component: DetailsCharacterComponent}
];
