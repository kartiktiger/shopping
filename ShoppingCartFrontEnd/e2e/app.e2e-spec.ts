import { CertPage } from './app.po';

describe('cert App', () => {
  let page: CertPage;

  beforeEach(() => {
    page = new CertPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
