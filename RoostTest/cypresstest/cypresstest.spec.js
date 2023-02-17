describe('Microservices Demo Frontend', () => {
    it('should be up and running', () => {
      cy.request('http://localhost:8080/').then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include('Sock Shop');
      });
    });
  });