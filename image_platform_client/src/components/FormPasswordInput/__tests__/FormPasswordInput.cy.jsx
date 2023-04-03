import React from 'react';
import FormPasswordInput from '../FormPasswordInput';

const testingText = 'test password';

const containerId = '[data-testid="password-input-container"]';
const labelId = '[data-testid="password-input-label"]';
const inputId = '[data-testid="password-input"]';
const iconContainerId = '[data-testid="password-input-icon-container"]';
const visibleIconId = '[data-testid="password-input-icon-visible"]';
const nonVisibleIconId = '[data-testid="password-input-icon-non-visible"]';
const errorId = '[data-testid="password-input-error"]';

describe('FormInput component:', () => {
  it('* renders successfully', () => {
    cy.mount(<FormPasswordInput value={testingText} />);

    cy.get(containerId).should('exist');
    cy.get(labelId).should('exist');
    cy.get(inputId).should('exist').should('have.prop', 'value', testingText);

    cy.get(iconContainerId).should('exist');

    cy.get(nonVisibleIconId).should('not.exist');

    cy.get(visibleIconId).should('exist');

    cy.get(errorId).should('not.exist');
  });

  it('* accepts and applies attributes', () => {
    cy.mount(
      <FormPasswordInput
        className="custom-password-class-name"
        id="test-p1"
        label="Test Password"
        value="test_password"
        error={{ message: 'Password error test label' }}
      />,
    );

    cy.get(containerId)
      .should('have.class', 'form-password-input')
      .should('have.class', 'custom-password-class-name');
    cy.get(labelId).should('contains.text', 'Test Password');
    cy.get(inputId).should('have.prop', 'value', 'test_password');

    cy.get(iconContainerId).should('exist');

    cy.get(nonVisibleIconId).should('not.exist');

    cy.get(visibleIconId).should('exist');

    cy.get(errorId).should('contains.text', 'Password error test label');
  });

  it('* changes type of field on icon click', async () => {
    cy.mount(<FormPasswordInput value="password" />);

    cy.get(inputId).should('have.prop', 'type', 'password');
    cy.get(visibleIconId).should('exist');
    cy.get(nonVisibleIconId).should('not.exist');

    cy.get(iconContainerId).click();

    cy.get(inputId).should('have.prop', 'type', 'text');
    cy.get(visibleIconId).should('not.exist');
    cy.get(nonVisibleIconId).should('exist');

    cy.get(iconContainerId).click();

    cy.get(inputId).should('have.prop', 'type', 'password');
    cy.get(visibleIconId).should('exist');
    cy.get(nonVisibleIconId).should('not.exist');
  });
});
