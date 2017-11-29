// Test for US1

describe('Creating a user account', function() {
    it('The test should be successful is the user is created', function() {

        //Open the app
        browser.get('http://localhost:8080/');

        //Fill the email and password fields
        element(by.name('email')).sendKeys('amine@email.com');
        element(by.name('password')).sendKeys('123');

        //Click on login
        element(by.name('login')).click();

        browser.sleep(1000);
        //Click on logout
        element(by.name('logout')).click();

        browser.sleep(1000);

    });
});
