describe('Microservices Demo Frontend', () => {
    it('should be up and running', () => {
      cy.request(Cypress.env('ROOST_SVC_URL')).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include('Sock Shop');
      });
    });
  });