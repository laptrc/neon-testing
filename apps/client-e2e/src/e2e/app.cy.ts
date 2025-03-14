import { getGreeting, getRandomString } from '../support/app.po';

describe('client-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains(/Tasks/);
  });

  it('should display table', () => {
    cy.get('[data-cy="task-row"]').its('length').should('be.gt', 0);
  });

  it('should create task success', () => {
    const title = `Task ${getRandomString(5)}`;

    // Open the task form
    cy.get('button').contains('Add').click();

    // Fill in the task details
    cy.get('input[formControlName="title"]').type(title);
    cy.get('textarea[formControlName="description"]').type(
      `This is description for ${title}`
    );
    cy.get('input[formControlName="dueDate"]').type('2023-12-31');
    cy.get('mat-select[formControlName="userId"]')
      .click()
      .get('mat-option')
      .contains('1')
      .click();

    // Submit the form
    cy.get('button').contains('Create').click();

    // Verify that the new task appears in the task list
    cy.get('[data-cy="task-row"]').should('contain', title);
  });

  it('should update task success', () => {
    const title = `Task ${getRandomString(5)}`;

    // Open the task form
    cy.get('button[mat-icon-button]').first().click();
    cy.get('button[mat-menu-item]').contains('Update').click();

    // Fill in the task details
    cy.get('input[formControlName="title"]').clear().type(title);
    cy.get('textarea[formControlName="description"]')
      .clear()
      .type(`This is description for ${title}`);
    cy.get('input[formControlName="dueDate"]').clear().type('2023-12-31');
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('mat-select[formControlName="userId"]')
      .click()
      .get('mat-option')
      .contains('1')
      .click();

    // Submit the form
    cy.get('button').contains('Save').click();

    // Verify that the updated task appears in the task list
    cy.get('[data-cy="task-row"]').should('contain', title);
  });

  it('should delete task success', () => {
    cy.get('[data-cy="task-row"]')
      .its('length')
      .then((length) => {
        // Open the task menu
        cy.get('button[mat-icon-button]').first().click();
        cy.get('button[mat-menu-item]').contains('Delete').click();

        // Confirm the deletion
        cy.get('button').contains('Yes, delete').click();

        // Verify that the task is removed from the task list
        cy.get('[data-cy="task-row"]')
          .its('length')
          .should('eq', length - 1);
      });
  });
});
