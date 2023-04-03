import React from 'react';
import FormInput from '../FormInput';

const testingText = 'test text';
const containerId = '[data-testid="form-input-container"]';
const labelId = '[data-testid="form-input-label"]';
const inputId = '[data-testid="form-input"]';
const errorId = '[data-testid="form-input-error"]';

describe('FormInput component:', () => {
  it('* renders successfully', () => {
    cy.mount(<FormInput value={testingText} />);

    cy.get(containerId).should('exist');
    cy.get(labelId).should('exist');
    cy.get(inputId).should('exist').should('have.prop', 'value', testingText);
    cy.get(errorId).should('not.exist');
  });

  it('* accepts and applies attributes', () => {
    cy.mount(
      <FormInput
        className="custom-class-name"
        id="test-1"
        label="Test Input"
        type="password"
        value=""
        error={{
          message: 'Field is required',
        }}
      />,
    );

    cy.get(containerId)
      .should('have.class', 'form-input')
      .should('have.class', 'custom-class-name');

    cy.get(labelId).should('contains.text', 'Test Input');

    cy.get(inputId).should('have.prop', 'type', 'password');

    cy.get(errorId).should('contains.text', 'Field is required');
  });

  it('* triggers onChange function', async () => {
    cy.mount(
      <FormInput
        className="custom-class-name"
        id="test-1"
        label="Test Input"
        type="text"
        onChange={cy.stub().as('type')}
      />,
    );

    cy.get(inputId).type('New value here');

    cy.get('@type').should('have.been.called');
  });
});
