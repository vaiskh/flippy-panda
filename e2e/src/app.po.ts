import { browser, by, element } from 'protractor'

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>
  }

  getTitleText() {
    return element(by.css('#welcomeMsg')).getText() as Promise<string>
  }

  getMatRows() {
    return element.all(by.css('.mat-row'))
  }

  getTextFromMatCells() {
    return element.all(by.css('.mat-cell')).getText() as Promise<string>
  }

  // ----------
  // buttons
  // ----------

  getAddRealmBtn() {
    return element(by.css('#addRealmBtn'))
  }

  getRealmSelectionInitiatorBtn() {
    return element(by.css('#realmSelectionInitiatorBtn'))
  }

  getRealmFromPicklistBtns() {
    return element.all(by.css('.realmFromPicklistBtn'))
  }

  getAddDeckBtn() {
    return element(by.css('#addDeckBtn'))
  }

  getDeckFromPicklistBtns() {
    return element.all(by.css('.deckFromPicklistBtn'))
  }

  getAddCardBtn() {
    return element(by.css('#addCardBtn'))
  }

  // ----------
  // inputs
  // ----------

  getLeftInputFromDeckPage() {
    return element(by.css('#mat-input-0'))
  }

  getRightInputFromDeckPage() {
    return element(by.css('#mat-input-1'))
  }
}
