import {Component} from '@angular/core';
import {CampaignModel, CampaignPreviewService, CampaignResults,} from './campaign-preview.service';
import {ActivatedRoute} from '@angular/router';
import {AddCandidateModalComponent} from '../modals';
import {filter, mergeMap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Web3AccountService} from 'ng-web3';
import {LanguageService} from "../../../language.service";
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import {IdVerificationModalComponent} from "../modals/id-verification-modal/id-verification-modal.component";
import {ShareCampaignModalComponent} from "../modals/share-campaign-modal/share-campaign-modal.component";

@Component({
  selector: 'voting-dapp-campaign-preview',
  templateUrl: './campaign-preview.component.html',
  styleUrls: ['./campaign-preview.component.scss'],
})
export class CampaignPreviewComponent {
  campaignModel?: CampaignModel;
  results: CampaignResults;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _snackBar: MatSnackBar,
    private readonly _web3AccountService: Web3AccountService,
    private readonly _campaignPreviewService: CampaignPreviewService,
    public readonly language: LanguageService
  ) {
    _campaignPreviewService.initializeContract(
      _activatedRoute.snapshot.paramMap.get('id') || ''
    );
    _campaignPreviewService
      .getCampaign$()
      .subscribe((campaignModel: CampaignModel) => {
        this.campaignModel = campaignModel;
        if (!this.campaignModel.isActive) {
          this._campaignPreviewService
            .getResults$()
            .subscribe((results) => {
              this.results = results;
            });
        }
      });

    _campaignPreviewService.candidateCreated$().subscribe((candidate) => {
      this.campaignModel.candidates.push(candidate);
    });

  }

  onAddCandidateClicked(): void {
    this._dialog
      .open(AddCandidateModalComponent, {width: '250px'})
      .afterClosed()
      .pipe(
        filter((candidateName: string) => !!candidateName),
        mergeMap((candidateName: string) =>
          this._web3AccountService.connectedAccount$.pipe(
            mergeMap((connectedAccount: string) =>
              this._campaignPreviewService.addCandidate$(candidateName, {
                from: connectedAccount,
              })
            )
          )
        )
      )
      .subscribe(() => {
        this._snackBar.open('Candidate successfully added.', 'Ok');
      });
  }

  onVoteClicked(candidateAddress: string) {
    this._dialog.open(IdVerificationModalComponent, {}).afterClosed().subscribe((eligible: boolean) => {
      if (!eligible) return;
      this._web3AccountService.connectedAccount$
        .pipe(
          mergeMap((connectedAccount: string) =>
            this._campaignPreviewService.voteForCandidate$(candidateAddress, {
              from: connectedAccount,
              value: '1000000000000000000',
            })
          )
        )
        .subscribe(() => {
          this._snackBar.open('Vote successfully added.', 'Ok');
        });
      console.log('Eligible')
    })
  }

  endCampaign() {
    this._web3AccountService.connectedAccount$
      .pipe(
        mergeMap((connectedAccount: string) =>
          this._campaignPreviewService.endCampaign({
            from: connectedAccount,
          })
        )
      )
      .subscribe(() => {
        this._snackBar.open('Campaign successfully ended.', 'Ok');
        location.reload()
      });
  }

  async getResults() {
    const doc = new jsPDF.jsPDF();
    const table = await Promise.all(this.campaignModel.candidates.map(async (candidate) => {
      const name = await candidate.name$.toPromise();
      return [name, candidate.address, this.results.results[candidate.address].voteCount.toString()];
    }))
    const data = [
      ['Candidate Name', 'BlockChain Address', 'Votes'],
      ...table
    ];
    (doc as any).autoTable({
      head: [data[0]],
      body: data.slice(1),
    });
    doc.save(`${this.campaignModel.name}-Results-${new Date().toLocaleDateString()}.pdf`);
  }

  shareClicked() {
    this._dialog.open(ShareCampaignModalComponent, {
      width: '400px',
      data: `${this.language.language['share_text']} \n http://localhost:4200/campaign/${this._activatedRoute.snapshot.paramMap.get('id')}`
    }).afterClosed().subscribe(() => {
      this._snackBar.open(this.language.language['copied_to_clipboard'], '');
    });
  }
}
