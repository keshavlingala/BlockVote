import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CampaignListItem, CampaignListService} from './campaign-list.service';
import {filter, mergeMap} from 'rxjs/operators';
import {CreateCampaignModalComponent} from '../modals';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LanguageService} from "../../../language.service";

@Component({
  selector: 'voting-dapp-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss'],
})
export class CampaignListComponent implements OnInit {
  campaignListItems: CampaignListItem[] = [];
  currentFilter = '';

  constructor(
    private readonly campaignListService: CampaignListService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    public readonly language: LanguageService
  ) {
  }

  ngOnInit(): void {
    this.campaignListService.getCampaignsList$().subscribe((campaigns) => {
      this.campaignListItems = [...this.campaignListItems, ...campaigns];
    });

    this.campaignListService
      .campaignCreatedEvent$()
      .subscribe((newCampaign) => {
        this.campaignListItems = [...this.campaignListItems, newCampaign];
      });
  }

  onCreateCampaignClicked(): void {
    this.dialog
      .open(CreateCampaignModalComponent, {width: '250px'})
      .afterClosed()
      .pipe(
        filter((campaignName: string) => !!campaignName),
        mergeMap((campaignName: string) =>
          this.campaignListService.createCampaign$(campaignName)
        )
      )
      .subscribe(() => {
        this.snackBar.open('Campaign successfully created.', 'Ok');
      });
  }

  applyFilter(filter: string) {
    if(this.currentFilter === filter) {
      this.currentFilter = '';
      return;
    }
    this.currentFilter = filter;
  }

  get getFilteredItems() {
    if (this.currentFilter === '') {
      return this.campaignListItems;
    }
    if (this.currentFilter === 'active') {
      return this.campaignListItems.filter(item => item.isActive);
    }
    if (this.currentFilter === 'inactive') {
      return this.campaignListItems.filter(item => !item.isActive);
    }
    if (this.currentFilter == 'candidates') {
      return this.campaignListItems.filter(item => item.hasCandidates);
    }
    if (this.currentFilter == 'no-candidates') {
      return this.campaignListItems.filter(item => !item.hasCandidates);
    }
  }
}
