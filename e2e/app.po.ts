import { browser, by, element } from 'protractor';

export class Fukuno2012CatalogPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
