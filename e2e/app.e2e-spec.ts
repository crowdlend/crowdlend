import { AngularTrufflePage } from './app.po';

describe('angular-truffle App', () => {
  let page: AngularTrufflePage;

  beforeEach(() => {
    page = new AngularTrufflePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Metacoin ~ Angular4 + Truffle Starter Dapp');
  });
});
