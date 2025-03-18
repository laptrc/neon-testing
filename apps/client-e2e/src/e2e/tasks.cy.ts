import { getGreeting, getRandomString } from '../support/app.po';

describe('client-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains(/To-do/);
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
    const initialTitle = `Task ${getRandomString(5)}`;
    const updatedTitle = `Updated Task ${getRandomString(5)}`;

    // Create a new task
    cy.get('button').contains('Add').click();
    cy.get('input[formControlName="title"]').type(initialTitle);
    cy.get('textarea[formControlName="description"]').type(
      `This is description for ${initialTitle}`
    );
    cy.get('input[formControlName="dueDate"]').type('2023-12-31');
    cy.get('mat-select[formControlName="userId"]')
      .click()
      .get('mat-option')
      .contains('1')
      .click();
    cy.get('button').contains('Create').click();

    // Verify that the new task appears in the task list
    cy.get('[data-cy="task-row"]').should('contain', initialTitle);

    // Find the newly created task row and update it
    cy.get('[data-cy="task-row"]')
      .contains(initialTitle)
      .parent()
      .within(() => {
        cy.get('button[mat-icon-button]').click();
      });
    cy.get('button[mat-menu-item]').contains('Update').click();

    // Fill in the updated task details
    cy.get('input[formControlName="title"]').clear().type(updatedTitle);
    cy.get('textarea[formControlName="description"]')
      .clear()
      .type(`This is description for ${updatedTitle}`);
    cy.get('input[formControlName="dueDate"]').clear().type('2023-12-31');
    cy.get('mat-select[formControlName="userId"]')
      .click()
      .get('mat-option')
      .contains('1')
      .click();
    cy.get('button').contains('Save').click();

    // Verify that the updated task appears in the task list
    cy.get('[data-cy="task-row"]').should('contain', updatedTitle);
  });

  it('should delete task success', () => {
    const title = `Task ${getRandomString(5)}`;

    // Create a new task
    cy.get('button').contains('Add').click();
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
    cy.get('button').contains('Create').click();

    // Verify that the new task appears in the task list
    cy.get('[data-cy="task-row"]').should('contain', title);

    // Delete the newly created task
    cy.get('[data-cy="task-row"]')
      .contains(title)
      .parent()
      .within(() => {
        cy.get('button[mat-icon-button]').click();
      });
    cy.get('button[mat-menu-item]').contains('Delete').click();
    cy.get('button').contains('Yes, delete').click();

    // Verify that the task is removed from the task list
    cy.get('[data-cy="task-row"]').should('not.contain', title);
  });
});
