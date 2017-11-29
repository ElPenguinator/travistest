// Test for US2

describe('Creating a project', function() {

    it("The test should be successful if the user creates a project and he's redirected to this project overview", function() {

        browser.get('http://localhost:8080/');

        //Fill the email and password fields and submit
        element(by.name('email')).sendKeys('amine@email.com');
        element(by.name('password')).sendKeys('123');

        element(by.name('login')).click();

        //Waiting form to appear
        browser.wait(function() {
            return element(by.name('newproject')).isPresent();
        }, 5000);

        element(by.name('newproject')).click();

        browser.wait(function() {
            return element(by.name('addproject')).isPresent();
        }, 5000);

        // Fill the project info form
        element(by.name('project-name')).sendKeys('ProjetTest');
        element(by.name('datedebut')).sendKeys('17112017');
        element(by.name('nbSprints')).sendKeys('3');
        element(by.name('nbDurationSprint')).sendKeys('2');
        element(by.name('description')).sendKeys('This is a test project');

        element(by.name('addproject')).click();

        browser.sleep(3000);

        //Expect to go the project overview page
        expect(browser.getCurrentUrl()).toEqual("http://localhost:8080/#/dashboard/projects/ProjetTest/overview");

        browser.sleep(3000);

        //Click to logout
        element(by.name('logout')).click();
    });
});
