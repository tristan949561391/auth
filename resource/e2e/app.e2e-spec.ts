import { AuthWebStaticPage } from './app.po';

describe('auth-web-static App', function() {
  let page: AuthWebStaticPage;

  beforeEach(() => {
    page = new AuthWebStaticPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
