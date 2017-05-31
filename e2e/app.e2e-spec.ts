import { Fukuno2012CatalogPage } from './app.po';

describe('fukuno2012-catalog App', () => {
  let page: Fukuno2012CatalogPage;

  beforeEach(() => {
    page = new Fukuno2012CatalogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
