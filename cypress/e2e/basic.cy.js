describe('testing page is ready', () => {
  it('is opened in localhost', () => {
    cy.visit('http://127.0.0.1:5501/tests/')
  })
  it('has elements to drag', () => {
    cy.get('.drag')
  })
})

describe('simple drags work', () => {
  it('receives and removes dragging tag', () => {
    cy.get('.drag').first()
      .trigger('mousedown', {position: 'topLeft'})
      .should('have.attr', 'dragging')
    cy.get('.drag').first() 
      .trigger('mouseup')
      .should('not.have.attr', 'dragging')
  })
  it('visually drags', () => {
    cy.get('.drag').first()
      .trigger('mousedown', {position: 'topLeft'})
      .trigger('mousemove', {clientX: 50, clientY: 0})
      .trigger('mouseup')
    cy.get('.drag').first()
      .should('have.css', 'left', '50px')
  })
})

describe('collisions work', () => {
  it('checks collisions', () => {
    cy.get('.drag').first()
      .trigger('mousedown', {position: 'topLeft'})
      .trigger('mousemove', {clientX: 170, clientY: 170})
      .trigger('mouseup')
    cy.get('.drag').last()
      .should('have.attr', 'colliding')
  })
})