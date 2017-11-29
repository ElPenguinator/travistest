// Test for US5

describe('Creating a user account', function() {

    it('The test should be successful if the user is created and redirected to the dashboard', function() {

        //Go to login page
        browser.get('http://localhost:8080/');

        //Hit sign up button
        element(by.name('signup')).click();

        browser.wait(function() {
            return element(by.name('createaccount')).isPresent();
        }, 5000);

        //Fill the sign up form and submit it
        element(by.name('name')).sendKeys('Amine');
        element(by.name('surname')).sendKeys('Amn');
        element(by.name('email')).sendKeys('amine@email.com');
        element(by.name('password1')).sendKeys('123');
        element(by.name('password2')).sendKeys('123');

        element(by.name('createaccount')).click();

        browser.sleep(1000);

        //Should be redirected to the dashboard !
        expect(browser.getCurrentUrl()).toEqual("http://localhost:8080/#/dashboard/newproject");

        //Click to logout
        element(by.name('logout')).click();

    });
});
