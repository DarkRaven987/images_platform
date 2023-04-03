import React from 'react';
import Button from '../Button';

const testLabel = 'Test Button';

describe('Button component:', () => {
  it('* renders successfully', () => {
    cy.mount(<Button>{testLabel}</Button>);
    cy.get('button').should('contains.text', testLabel);
  });

  it('* accepts custom classes', () => {
    const customClassName = 'custom-button';
    cy.mount(<Button className={customClassName}>{testLabel}</Button>);
    cy.get('button').should('have.class', customClassName);
  });

  it('* accepts button type attribute', () => {
    cy.mount(<Button type="submit">{testLabel}</Button>);
    cy.get('button').should('have.prop', 'type', 'submit');
  });

  it('* accepts custom properties', () => {
    cy.mount(
      <Button type="button" data-attr1="attr-1" data-attr2="attr-2">
        {testLabel}
      </Button>,
    );
    const btn = cy.get('button');
    btn.should('have.attr', 'data-attr1', 'attr-1');
    btn.should('have.attr', 'data-attr2', 'attr-2');
    btn.should('have.prop', 'type', 'button');
  });

  it('* button is clickable', () => {
    cy.mount(
      <Button
        type="button"
        data-attr1="attr-1"
        data-attr2="attr-2"
        onClick={cy.stub().as('click')}
      >
        {testLabel}
      </Button>,
    );
    const btn = cy.get('button');

    btn.click();
    cy.get('@click').should('have.been.called');
  });

  it('* button is disabled and not clickable', () => {
    cy.mount(
      <Button
        type="submit"
        className="snapshot-btn-class"
        onClick={cy.stub().as('click')}
        disabled={true}
      >
        {testLabel}
      </Button>,
    );
    const btn = cy.get('button');

    btn.click({ force: true });
    cy.get('@click').should('not.have.been.called');
  });
});
