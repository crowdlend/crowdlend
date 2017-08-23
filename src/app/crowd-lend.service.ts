import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import Web3 from 'web3';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

const contract = require('truffle-contract');
const metaincoinArtifacts = require('../../build/contracts/CrowdLend.json');
declare var window: any;

const BWeb3 = require('web3');

@Injectable()
export class CrowdLendService {

  CrowdLend = contract(metaincoinArtifacts);
  web3: Web3;

  private _accounts: BehaviorSubject<String[]> = new BehaviorSubject(String[0]);
  private _unlockedAccount: BehaviorSubject<String> = new BehaviorSubject('');

  private _defaultAccount: BehaviorSubject<string> = new BehaviorSubject('loading...');
  private initialized = false;

  constructor() {
  };


  init(): void {
    if (!this.initialized) {
      this.initialized = true;
      this.initWeb3();

      setTimeout(() => {
        this.initWeb3();
        this.loadAccounts();

        setInterval(() => {
          if (this._defaultAccount.getValue() !== this.web3.eth.defaultAccount && this.web3.eth.defaultAccount !== undefined) {
            this._defaultAccount.next(this.web3.eth.defaultAccount);
          }
        }, 250);

      }, 1000);
    }
  }

  private initWeb3() {
// Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.log(window.web3);
      console.warn('Using web3 detected from external source.');
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
      this.CrowdLend.setProvider(this.web3.currentProvider);
    } else if (environment.localWeb3Fallback) {
      console.warn('No web3 detected. Falling back to http://localhost:8545.');
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      const httpProvider = new BWeb3.providers.HttpProvider('http://localhost:8545');
      this.web3 = new BWeb3(httpProvider);
      this.CrowdLend.setProvider(this.web3.currentProvider);
    } else {
      console.error('No web3 detected.')
    }
  }

  private loadAccounts() {
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        console.error('There was an error fetching your accounts.');
        console.error(err);
        return;
      }

      if (accs.length === 0) {
        console.error(
          'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
        );
        return;
      }
      this._accounts.next(accs);
      this._unlockedAccount.next(accs[0]);
      this._defaultAccount.next(accs[0]);
    });
  }


  get accounts() {
    return this._accounts.asObservable();
  }

  get unlockedAccount() {
    return this._unlockedAccount.asObservable();
  }

  get defaultAccount() {
    return this._defaultAccount.asObservable();
  }

}
