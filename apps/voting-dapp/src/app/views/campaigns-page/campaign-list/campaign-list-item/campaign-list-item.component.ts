import {Component, Input} from '@angular/core';
import {CampaignListItem} from '../campaign-list.service';
import {LanguageService} from "../../../../language.service";

@Component({
  selector: 'voting-dapp-campaign-list-item',
  templateUrl: './campaign-list-item.component.html',
  styleUrls: ['./campaign-list-item.component.scss'],
})
export class CampaignListItemComponent {
  @Input()
  campaign?: CampaignListItem;

  constructor(
    public language: LanguageService
  ) {
  }
}
