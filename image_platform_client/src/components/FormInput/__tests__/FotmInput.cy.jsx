import React from 'react';
import FormInput from '../FormInput';

const testingText = 'test text';

describe('FormInput component:', () => {
  it('* renders successfully', () => {
    cy.mount(<FormInput value={testingText} />);

    cy.get('[data-testid="form-input-container"]').should('exist');
    cy.get('[data-testid="form-input-label"]').should('exist');
    cy.get('[data-testid="form-input"]')
      .should('exist')
      .should('have.prop', 'value', testingText);
    cy.get('[data-testid="form-input-error"]').should('not.exist');
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

    cy.get('[data-testid="form-input-container"]')
      .should('have.class', 'form-input')
      .should('have.class', 'custom-class-name');

    cy.get('[data-testid="form-input-label"]').should(
      'contains.text',
      'Test Input',
    );

    cy.get('[data-testid="form-input"]').should(
      'have.prop',
      'type',
      'password',
    );

    cy.get('[data-testid="form-input-error"]').should(
      'contains.text',
      'Field is required',
    );
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

    cy.get('[data-testid="form-input"]').type('New value here');

    cy.get('@click').should('have.been.called');
  });
});
