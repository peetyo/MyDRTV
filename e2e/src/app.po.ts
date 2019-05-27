import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root app-login div h2')).getText() as Promise<string>;
  }
  
  getEmailTextbox() {
    return element(by.css('[formcontrolname="email"]'));
  }

  getPasswordTextbox() {
    return element(by.css('[formcontrolname="password"]'));
  }

  getLoginForm(){
    return element(by.css('#loginForm'));
  }

  getLoginButton(){
    return element(by.css('button[type="submit"]'));
  }

  getHomePageSliderName(){
    return element(by.css('.show-section h3')).getText() as Promise<string>;
  }

  getHomePageThumb(){
    return element(by.css('a[ng-reflect-router-link="../movies/WMd2xcZZiUoHB4pylyBc"]'))
  }
  
  getMovieTitle(){
    return element(by.css('.featured-title h1 #title')).getText() as Promise<string>;
  }
  
  getMovieReview(){
    return element(by.css('div#qBfZldUPXPcDc4KzpOVT h4')).getText() as Promise<string>;
  }

  getReviewForm(){
    return element(by.css('form#reviewForm'));
  }

  selectReviewRating(){
    return element(by.cssContainingText('form#reviewForm option', '5')).click();
  }

  getReviewHeadline(){
    return element(by.css('form #reviewHeadline'));
  }
  
  getReviewContent(){
    return element(by.css('form #reviewContent'));
  }

  getReviewButton(){
    return element(by.css('form#reviewForm button'));
  }

  getNumberOfReviews(){
    return element.all(by.css('#allReviews .review-container'));
  }
}
