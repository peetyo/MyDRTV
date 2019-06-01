import { AppPage } from './app.po';
import { browser, logging, by, element, $$ } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Should display default page', () => {
    page.navigateTo();
    browser.pause();
    expect(page.getTitleText()).toEqual('Log in');
  });
  
  it('Login button should be disabled when form is invalid', () => {
    page.getEmailTextbox().sendKeys('');
    page.getPasswordTextbox().sendKeys('');
    let button = page.getLoginButton().isEnabled()
    expect(button).toEqual(false);
  });

  it('Login form should be valid', () => {
    page.getEmailTextbox().sendKeys('test@gmail.com');
    page.getPasswordTextbox().sendKeys('123456');
    let form = page.getLoginForm().getAttribute('class');
    expect(form).toContain('ng-valid');
  });


  it('Login should redirect to home page', () => {
    page.getEmailTextbox().clear();
    page.getPasswordTextbox().clear();
    page.getEmailTextbox().sendKeys('test@gmail.com');
    page.getPasswordTextbox().sendKeys('123456');
    page.getLoginButton().click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl+'/#/portal/home');
    // expect(page.getHomePageSliderName()).toEqual('NEW SHOWS');
  });

  it('Thumbnail should redirect to movie page', () => {
    browser.sleep(1000)
    page.getHomePageThumb().click()
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl+'/#/portal/movies/WMd2xcZZiUoHB4pylyBc');
  });

  it('Movie page should show Casino Royal', () => {
    browser.sleep(500)
    expect(page.getMovieTitle()).toEqual('CASINO ROYALE')
  });
  
  it('Movie page should show reviews', () => {
    expect(page.getMovieReview()).toEqual('A Great Actor As Bond')
  });

  it('Review submission should be disabled when form is invalid', () => {
    page.selectReviewRating()
    page.getReviewHeadline().sendKeys('');
    page.getReviewContent().sendKeys('abc');
    let button = page.getLoginButton().isEnabled()
    expect(button).toEqual(false);
  });

  it('Review form should be valid', () => {
    page.selectReviewRating()
    page.getReviewHeadline().sendKeys('Worth the watch!');
    page.getReviewContent().sendKeys('This is a good descriptive review');
    let form = page.getReviewForm().getAttribute('class');
    expect(form).toContain('ng-valid');
  });
  
  it('Should add a review ', () => {
      browser.ignoreSynchronization= true;
    $$('.review-container').then( (elements) => {
      let numberBefore = elements.length;

      element(by.css('#reviewForm button')).click();

      $$('.review-container').then((elements) => {
        expect(elements.length - numberBefore).toEqual(1);
      })

    });
  });

  it('Should logout user', () => {
    element(by.css('.dropdown-toggle')).click();
    element(by.cssContainingText('.dropdown-menu li a','Logout')).click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl+'/#/login');
  });
  
  
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
