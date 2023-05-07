import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LanguageService} from "../../language.service";

@Component({
  selector: 'eth-angular-dapp-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss']
})
export class ManualComponent {

  constructor(
    private route: Router,
    public language: LanguageService
  ) {
  }

  goBack() {
    this.route.navigate(['/'])
  }
}
