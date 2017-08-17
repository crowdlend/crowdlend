import {Component, HostListener, NgZone} from '@angular/core';
import {canBeNumber} from '../util/validation';
import {CrowdLendService} from './crowd-lend.service';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  account: String;
  accounts: Observable<String[]>;

  balance: number;
  sendingAmount: number;
  recipientAddress: string;
  status: string;
  canBeNumber = canBeNumber;

  constructor(private _ngZone: NgZone, private _crowdLend: CrowdLendService) {
    this.accounts = this._crowdLend.accounts;
  }
}
