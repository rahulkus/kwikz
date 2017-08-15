import { KwikzzPage } from './app.po';

describe('kwikzz App', () => {
  let page: KwikzzPage;

  beforeEach(() => {
    page = new KwikzzPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
