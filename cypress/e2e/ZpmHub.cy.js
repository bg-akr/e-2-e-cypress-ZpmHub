/// <reference types="Cypress" />

describe('ZpmHub official webpage', () => {
  beforeEach(() => {
    cy.visit('https://dev.zpmhub.com/home')
  })

  it('should navigate to the Home page when clicking on the Home menu tab', () => {
    cy.get('.header-box-nav > .ng-star-inserted > .mat-mdc-nav-list > :nth-child(2)').contains('Features').click()
    const expectedAddress = 'https://dev.zpmhub.com/home';
    cy.url().should('eq', 'https://dev.zpmhub.com/features');
    cy.contains('We are working on this!')
    cy.get('.header-box-nav > .ng-star-inserted > .mat-mdc-nav-list > :nth-child(1)').contains('Home').click()
    cy.url().should('eq', expectedAddress);
  })

  it('should navigate to the Features page when clicking on the Features menu tab', () => {
    cy.get('.header-box-nav > .ng-star-inserted > .mat-mdc-nav-list > :nth-child(2)').contains('Features').click();
    cy.url().should('eq', 'https://dev.zpmhub.com/features');
    cy.contains('We are working on this!')
  })

  it('should navigate to the GitHub repo when clicking on the Documentation menu tab', () => {
    cy.get('.header-box-nav > .ng-star-inserted > .mat-mdc-nav-list > :nth-child(3)')
      .should('have.attr', 'href')
      .should('contain', 'https://github.com/banksiaglobal/zpmhub')
  })

  it('should navigate to the Pricing page when clicking on the Pricing menu tab', () => {
    cy.get('.header-box-nav > .ng-star-inserted > .mat-mdc-nav-list > :nth-child(4)').contains('Pricing').click();
    cy.url().should('eq', 'https://dev.zpmhub.com/price');
  })

  it('should navigate to the About page when clicking on the About menu tab', () => {
    cy.get('.header-box-nav > .ng-star-inserted > .mat-mdc-nav-list > :nth-child(5)').contains('About').click();
    cy.url().should('eq', 'https://dev.zpmhub.com/about');
  })

  it('should navigate to the Registration page when clicking the Sign up button', () => {
    cy.get('.header-box > app-auth-registre-btns.ng-star-inserted > .mat-mdc-nav-list > :nth-child(1) > .mdc-button').contains('Sign up').click();
    cy.url().should('eq', 'https://dev.zpmhub.com/signup');
    cy.get('#registrationForm').should('be.visible')
  })

  it('should navigate to the Registration page when clicking the Sign up button', () => {
    cy.get('.header-box > app-auth-registre-btns.ng-star-inserted > .mat-mdc-nav-list > :nth-child(2) > .mdc-button').contains('Sign in').click();
    cy.url().should('eq', 'https://dev.zpmhub.com/signin');
    cy.get('#authForm').should('be.visible')
  })
})



describe('ZpmHub Signup Page Tests', () => {
  beforeEach(() => {
    cy.visit('https://dev.zpmhub.com/signup')
  })

  it('should display the signup form and Submit button should be disabled', () => {
    cy.get('#registrationForm').should('be.visible')

    cy.get('#btnSubmitSignupForm').should('be.disabled')
  })

  it('Sign in button forward to Sign in form', () => {
    cy.contains('Sign in').click()
    cy.url().should('include', '/signin')
    cy.get('#authForm').should('be.visible')
  })

// FULL NAME FIELD

  it('name field should be required', () => {
    cy.get('#name').should('have.attr', 'required')
  })

  it('should display an error message if full name field is empty', () => {
    cy.get('#name').click()
    cy.get('#email').click({force: true})
    cy.get('#name').should('have.class', 'ng-invalid')
    cy.get('#mat-mdc-error-0')
      .should('be.visible')
      .and('contain', 'Enter your name 1-50 letters')
  })

  it('should be highlighted in red if full name is invalid (only spaces)', () => {
    cy.get('#name').type('   ')
    cy.get('#email').click({force: true})
    cy.get('#name').should('have.class', 'ng-invalid')
    // cy.get('#mat-mdc-error-0')
    //   .should('be.visible')
    //   .and('contain', 'Enter your name 2-15 letters') // failed
  })

  it('should display an error message if full name is invalid (more than 50 symbols)', () => {
    cy.get('#name').type('Mister Johnathan Smith-Black Wonderful Second Junior')
    cy.get('#email').click({force: true})
    cy.get('#name').should('have.class', 'ng-invalid')
    cy.get('#mat-mdc-error-5')
      .should('be.visible')
      .and('contain', 'Make sure it\'s no more than 50 characters.')
  })

// EMAIL FIELD

  it('email field should be required', () => {
    cy.get('#email').should('have.attr', 'required')
  })

  it('should display an error message if email is invalid (plainaddress)', () => {
    cy.get('#email').click({force: true}).type('plainaddress')
    cy.get('#companyFullName').click({force: true})
    cy.get('#email').should('have.class', 'ng-invalid')
    cy.get('#mat-mdc-error-1')
      .should('be.visible')
      .and('contain', 'Invalid email (ex.: yourname@example.com)')
  })


// COMPANY FULL NAME FIELD

  it('Company Full Name field should be required', () => {
    cy.get('#companyFullName').should('have.attr', 'required')
  })

  it('should display an error message if Company Full Name field is empty', () => {
    cy.get('#companyFullName').click({force: true})
    cy.get('#companyShortName').click({force: true})
    cy.get('#companyFullName').should('have.class', 'ng-invalid')
    cy.get('#mat-mdc-error-2')
      .should('be.visible')
      .and('contain', 'Enter company\'s name')
  })


// COMPANY SHORT NAME FIELD

  it('Company Short Name field should be required', () => {
    cy.get('#companyShortName').should('have.attr', 'required')
  })

  it('should display an error message if Company Short Name field is empty', () => {
    cy.get('#companyShortName').click({force: true})
    cy.get('#password').click({force: true})
    cy.get('#companyShortName').should('have.class', 'ng-invalid')
    cy.get('#mat-mdc-error-3')
      .should('be.visible')
      .and('contain', 'Enter company\'s name (max 50 let)')
  })

  it('should dispaly the appropriate remaining characters count', () => {
    cy.get('#mat-mdc-hint-0').invoke('text').should('equal', '0/50 This will identify your organisation in URL ')
    cy.get('#companyShortName').click({force: true}).type('Nike')
    cy.get('#mat-mdc-hint-0').invoke('text').should('equal', '4/50 This will identify your organisation in URL ')
  })

// PASSWORD FIELD

  it('Password field should be required', () => {
    cy.get('#password').should('have.attr', 'required')
  })

  it('Password field should have type=password', () => {
    cy.get('#password').invoke('attr', 'type').should('contain', 'password')
  })

  it('shouldn\'t accept spaces', () => {
    cy.get('#password').type('1 2 3 4 5 6 7 8')
    // cy.get('#password').invoke('val').should('eq', '12345678') 
    cy.get('#companyShortName').click({force: true})
    cy.get('#password').should('have.class', 'ng-invalid')
    cy.get('#mat-mdc-error-6')
      .should('be.visible')
      .and('contain', 'Password should not contain spaces')
  })

  it('should display an error message if Password field is empty', () => {
    cy.get('#password').click({force: true})
    cy.get('#companyShortName').click({force: true})
    cy.get('#password').should('have.class', 'ng-invalid')
    cy.get('#mat-mdc-error-4')
      .should('be.visible')
      .and('contain', 'Enter your password.')
  })

  it('should display an error message if password is too short', () => {
    cy.get('#password').type('12345')
    cy.get('#companyShortName').click({force: true})
    cy.get('#password').should('have.class', 'ng-invalid')
    cy.get('#mat-mdc-error-5')
      .should('be.visible')
      .and('contain', ' Make sure it\'s no more than 15 characters AND at least 8 characters.')
  })

  it('should display an error message if password is too long', () => {
    cy.get('#password').type('ThisIsALongPassword')
    cy.get('#companyShortName').click({force: true})
    cy.get('#password').should('have.class', 'ng-invalid')
    cy.get('#mat-mdc-error-6')
      .should('be.visible')
      .and('contain', ' Make sure it\'s no more than 15 characters AND at least 8 characters.')
  })

  it('eye icon should toggle password visibility', () => {
    cy.get('#password').type('12345678')
    cy.get('.mat-mdc-form-field-icon-suffix').click()
    cy.get('#password').invoke('attr', 'type').should('contain', 'text')
  })


// CHECKBOX

  it('should be unchecked by default', () => {
    cy.get('#chkAgreements-input').invoke('attr', 'aria-checked').should('contain', 'false')
  })

  it('should be checked/unchecked by ckicking', () => {
    cy.get('#chkAgreements-input').click()
    cy.get('#chkAgreements-input').invoke('attr', 'aria-checked').should('contain', 'true')

    cy.get('#chkAgreements-input').click()
    cy.get('#chkAgreements-input').invoke('attr', 'aria-checked').should('contain', 'false')
  })


// USER SCENARIOS

  it('shouldn\'t sign up a new user when at least one mandatory field (Full name) is empty', () => {
    const email = 'test@example.com'
    const companyFullName = 'Apple  Inc.'
    const companyShortName = 'Apple'
    const password = 'password'

    cy.get('#email').click({force: true}).type(email)
    cy.get('#companyFullName').click({force: true}).type(companyFullName)
    cy.get('#companyShortName').click({force: true}).type(companyShortName)
    cy.get('#password').type(password)

    cy.get('#chkAgreements-input').click()
    cy.get('#btnSubmitSignupForm').should('be.disabled')
  })

  it('shouldn\'t sign up a new user when at least one mandatory field (Email) is empty', () => {
    const name = 'Jack Black'
    const companyFullName = 'Apple Inc.'
    const companyShortName = 'Apple'
    const password = 'password'
  
    cy.get('#name').type(name)
    cy.get('#companyFullName').click({force: true}).type(companyFullName)
    cy.get('#companyShortName').click({force: true}).type(companyShortName)
    cy.get('#password').type(password)
  
    cy.get('#chkAgreements-input').click()
    cy.get('#btnSubmitSignupForm').should('be.disabled')
  })

  it('shouldn\'t sign up a new user when at least one mandatory field (Company Full Name) is empty', () => {
    const name = 'Jack Black'
    const email = 'test@example.com'
    const companyShortName = 'Apple'
    const password = 'password'
  
    cy.get('#name').type(name)
    cy.get('#email').click({force: true}).type(email)
    cy.get('#companyShortName').click({force: true}).type(companyShortName)
    cy.get('#password').type(password)
  
    cy.get('#chkAgreements-input').click()
    cy.get('#btnSubmitSignupForm').should('be.disabled')
  })

  it('shouldn\'t sign up a new user when at least one mandatory field (Company Short Name) is empty', () => {
    const name = 'Jack Black'
    const email = 'test@example.com'
    const companyFullName = 'Apple Inc.'
    const password = 'password'
  
    cy.get('#name').type(name)
    cy.get('#email').click({force: true}).type(email)
    cy.get('#companyFullName').click({force: true}).type(companyFullName)
    cy.get('#password').type(password)
  
    cy.get('#chkAgreements-input').click()
    cy.get('#btnSubmitSignupForm').should('be.disabled')
  })

  it('shouldn\'t sign up a new user when at least one mandatory field (Password) is empty', () => {
    const name = 'Jack Black'
    const email = 'test@example.com'
    const companyFullName = 'Apple Inc.'
    const companyShortName = 'Apple'
    
  
    cy.get('#name').type(name)
    cy.get('#email').click({force: true}).type(email)
    cy.get('#companyFullName').click({force: true}).type(companyFullName)
    cy.get('#companyShortName').click({force: true}).type(companyShortName)
  
    cy.get('#chkAgreements-input').click()
    cy.get('#btnSubmitSignupForm').should('be.disabled')
  })

  it('shouldn\'t sign up a new user when all fields are filled with valid input and the agreement checkbox is unchecked', () => {
    const name = 'Jack Black'
    const email = 'test@example.com'
    const companyFullName = 'Apple Inc.'
    const companyShortName = 'Apple'
    const password = 'password'
    
  
    cy.get('#name').type(name)
    cy.get('#email').click({force: true}).type(email)
    cy.get('#companyFullName').click({force: true}).type(companyFullName)
    cy.get('#companyShortName').click({force: true}).type(companyShortName)
    cy.get('#password').type(password)
  
    cy.get('#btnSubmitSignupForm').should('be.disabled')
  })

  // it('should sign up a new user with valid input', () => {
  //   const fullName = 'Jack Black'
  //   const email = 'test@example.com'
  //   const companyFullName = 'Google LLC'
  //   const companyShortName = 'Google'
  //   const password = 'password'

  //   cy.get('#name').type(fullName)
  //   cy.get('#email').click({force: true}).type(email)
  //   cy.get('#companyFullName').click({force: true}).type(companyFullName)
  //   cy.get('#companyShortName').click({force: true}).type(companyShortName)
  //   cy.get('#password').type(password)

  //   cy.get('#chkAgreements-input').click()
  //   cy.get('#btnSubmitSignupForm').click()

  //   cy.url().should('include', '/signin')
  //   cy.get('#authForm').should('be.visible') 
  // })

  it('shouldn\'t sign up a new user if the Company Short Name already exists', () => {
    const fullName = 'Jack Black'
    const email = 'test2@example.com'
    const companyFullName = 'Apple Inc.'
    const companyShortName = 'Kras'
    const password = 'password'

    cy.get('#name').type(fullName)
    cy.get('#email').click({force: true}).type(email)
    cy.get('#companyFullName').click({force: true}).type(companyFullName)
    cy.get('#companyShortName').click({force: true}).type(companyShortName)
    cy.get('#password').type(password)

    cy.get('#chkAgreements-input').click()
    cy.get('#btnSubmitSignupForm').click()

    cy.get('.warn')
    cy.url().should('include', '/signup')
  })
})

describe('ZpmHub Signin Page Tests', () => {
  beforeEach(() => {
    cy.visit('https://dev.zpmhub.com/signin')
  })

  it('should display the Signin form and Sign in button should be disabled', () => {
    cy.get('#authForm').should('be.visible')
    cy.get('#btnSubmitSigninForm').should('be.disabled')
  })

  it('the Email address field should be required', () => {
    cy.get('#email').should('have.attr', 'required')
  })

  it('the Password field should be required', () => {
    cy.get('#password').should('have.attr', 'required')
  })

  it('the Password field should have type=password', () => {
    cy.get('#password').invoke('attr', 'type').should('contain', 'password')
  })

  it('should be able to check the "Remember me" checkbox', () => {
    cy.get('#chkRememberUser-input').check();
    cy.get('#chkRememberUser-input').should('be.checked');
  });

  it('should be able to uncheck the "Remember me" checkbox', () => {
    cy.get('#chkRememberUser-input').check();
    cy.get('#chkRememberUser-input').uncheck();

    cy.get('#chkRememberUser-input').should('not.be.checked');
  });

  it('the “Sign in” button should be active when all fields are filled with valid data and the checkbox is unchecked', () => {
    const email = "pylkaya@ya.ru"
    const password = "pylkaya1"

    cy.get('#email').click({force: true}).type(email)
    cy.get('#password').type(password)

    cy.get('#chkRememberUser-input').should('not.be.checked');
    cy.get('#btnSubmitSigninForm').should('not.be.disabled')
  })

  it('the “Sign in” button should be active when all fields are filled with valid data and the checkbox is checked', () => {
    const email = "pylkaya@ya.ru"
    const password = "pylkaya1"

    cy.get('#email').click({force: true}).type(email)
    cy.get('#password').type(password)

    cy.get('#chkRememberUser-input').check();
    cy.get('#btnSubmitSigninForm').should('not.be.disabled')
  })

  it('should login a registered user successfuly', () => {
    const email = "pylkaya@ya.ru"
    const password = "pylkaya1"

    cy.get('#email').click({force: true}).type(email)
    cy.get('#password').type(password)
    cy.get('#btnSubmitSigninForm').click()

    cy.url().should('eq', 'https://dev.zpmhub.com/packages');
    cy.get('.packages-page').should('be.visible');
  })
})