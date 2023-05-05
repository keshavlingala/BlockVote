import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LanguageService} from "../../../../language.service";
import {MatDialogRef} from "@angular/material/dialog";
import {DatabaseService} from "../../../../database.service";
import {Web3AccountService} from "ng-web3";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'voting-dapp-id-verification-dialog',
  templateUrl: './id-verification-modal.component.html',
  styleUrls: ['./id-verification-modal.component.scss'],
})
export class IdVerificationModalComponent {

  voterId: FormControl = new FormControl('', Validators.required);
  ssn: FormControl = new FormControl('', Validators.required);
  formGroup: FormGroup = new FormGroup({
    voterId: this.voterId,
    ssn: this.ssn
  });

  constructor(
    public language: LanguageService,
    public database: DatabaseService,
    private account: Web3AccountService,
    private _snack: MatSnackBar,
    private dialogRef: MatDialogRef<IdVerificationModalComponent>,
  ) {
  }

  submit() {
    console.log('submitting')
    this.account.connectedAccount$.subscribe((connectedAccount) => {
      // console.log(connectedAccount)
      this.database.verifyVoter(this.voterId.value, this.ssn.value, connectedAccount).then((result) => {
        if (result) {
          console.log('verified')
          this.dialogRef.close(true);
        } else {
          console.log('not verified')
          this._snack.open(this.language.language['you_are_not_eligible_to_vote'], '', {duration: 3000})
          this.dialogRef.close(false);
        }
      });
    })

  }
}
