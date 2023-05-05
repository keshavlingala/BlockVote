import {Component} from '@angular/core';
import {DatabaseService} from "../../database.service";
import {LanguageService} from "../../language.service";
import {FormControl, FormGroup} from "@angular/forms";

export interface User {
  voterId: string;
  ssn: string;
  address: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'eth-angular-dapp-dbadmin',
  templateUrl: './dbadmin.component.html',
  styleUrls: ['./dbadmin.component.scss']
})
export class DbadminComponent {
  allowedUsers: User[] = [];
  voterId: FormControl = new FormControl('');
  ssn: FormControl = new FormControl('');
  address: FormControl = new FormControl('');
  formGroup: FormGroup = new FormGroup({
    voterId: this.voterId,
    ssn: this.ssn,
    address: this.address
  })

  constructor(
    private database: DatabaseService,
    public language: LanguageService
  ) {
    this.refreshDB();
  }

  refreshDB() {
    this.database.queryData().then((result) => {
      this.allowedUsers = result;
    });
  }

  submit() {
    console.log(this.formGroup.value);
    this.database.insertData(this.formGroup.value);
    this.refreshDB();
  }

  delete(voterId: string) {
    this.database.deleteByVoterId(voterId).then((result) => {
      if (result) {
        this.refreshDB();
      }
    })
  }
}
