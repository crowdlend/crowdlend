import {Component, ChangeDetectorRef, OnInit} from '@angular/core';
import {CrowdLendService} from './crowd-lend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  account: string;

  constructor(private _crowdLend: CrowdLendService) {
  }

  ngOnInit() {
    this._crowdLend.defaultAccount.subscribe((next) => {
      this.account = next
    });
    this._crowdLend.init();
  }

}
