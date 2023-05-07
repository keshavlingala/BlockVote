import {Component, Inject} from '@angular/core';
import {LanguageService} from "../../../../language.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'voting-dapp-share-campaign-modal',
  templateUrl: './share-campaign-modal.component.html',
  styleUrls: ['./share-campaign-modal.component.scss'],
})
export class ShareCampaignModalComponent {
  shareText: string

  constructor(
    public language: LanguageService,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<ShareCampaignModalComponent>,
  ) {
    this.shareText = data;
  }

  copyShare() {
    const el = document.createElement('textarea');
    el.value = this.shareText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.dialogRef.close()
  }
}
