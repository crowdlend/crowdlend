import {Component, AfterViewChecked} from '@angular/core';
import {CrowdLendService} from './crowd-lend.service';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  account: Observable<String>;
  status: string;

  constructor(private _crowdLend: CrowdLendService) {
    this.account = this._crowdLend.unlockedAccount;
  }

}
