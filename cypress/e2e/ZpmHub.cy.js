/// <reference types="Cypress" />

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

  it('should display an error message if full name is invalid (less than 2 symbols)', () => {
    cy.get('#name').type('a')
    cy.get('#email').click({force: true})
    cy.get('#name').should('have.class', 'ng-invalid')
    cy.get('#mat-mdc-error-0')
      .should('be.visible')
      .and('contain', 'Enter your name 2-15 letters')
  })

  it('should display an error message if full name is invalid (only spaces)', () => {
    cy.get('#name').type('   ')
    cy.get('#email').click({force: true})
    cy.get('#name').should('have.class', 'ng-invalid')
    cy.get('#mat-mdc-error-0')
      .should('be.visible')
      .and('contain', 'Enter your name 2-15 letters') // failed
  })

  it('should display an error message if full name is invalid (more than 15 symbols)', () => {
    cy.get('#name').type('Alena Krasinskiene')
    cy.get('#email').click({force: true})
    cy.get('#name').should('have.class', 'ng-invalid')
    cy.get('#mat-mdc-error-5')
      .should('be.visible')
      .and('contain', 'Enter your name 2-15 letters')
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
      .and('contain', 'Invalid email')
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
    cy.get('#password').type(' 1 2 3 4 5 6 7 8 ')
    cy.get('#password').invoke('val').should('eq', '12345678') // failed
  })

  it('should display an error message if Password field is empty', () => {
    cy.get('#password').click({force: true})
    cy.get('#companyShortName').click({force: true})
    cy.get('#password').should('have.class', 'ng-invalid')
    cy.get('#mat-mdc-error-4')
      .should('be.visible')
      .and('contain', ' Make sure it\'s no more 15 characters OR at least 8 characters')
  })

  it('should display an error message if password is too short', () => {
    cy.get('#password').type('12345')
    cy.get('#companyShortName').click({force: true})
    cy.get('#password').should('have.class', 'ng-invalid')
    cy.get('#mat-mdc-error-4')
      .should('be.visible')
      .and('contain', ' Make sure it\'s no more 15 characters OR at least 8 characters')
  })

  it('should display an error message if password is too long', () => {
    cy.get('#password').type('ThisIsALongPassword')
    cy.get('#companyShortName').click({force: true})
    cy.get('#password').should('have.class', 'ng-invalid')
    cy.get('#mat-mdc-error-5')
      .should('be.visible')
      .and('contain', ' Make sure it\'s no more 15 characters OR at least 8 characters')
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

  it('should sign up a new user with valid input', () => {
    const fullName = 'Jack Black'
    const email = 'test@example.com'
    const companyFullName = 'Google LLC'
    const companyShortName = 'Google'
    const password = 'password'

    cy.get('#name').type(fullName)
    cy.get('#email').click({force: true}).type(email)
    cy.get('#companyFullName').click({force: true}).type(companyFullName)
    cy.get('#companyShortName').click({force: true}).type(companyShortName)
    cy.get('#password').type(password)

    cy.get('#chkAgreements-input').click()
    cy.get('#btnSubmitSignupForm').click()

    cy.url().should('include', '/signin')
    cy.get('#authForm').should('be.visible') 
  })

  it('shouldn\'t sign up a new user if the Company Short Name already exists', () => {
    const fullName = 'Jack Black'
    const email = 'test@example.com'
    const companyFullName = 'Apple Inc.'
    const companyShortName = 'Apple'
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