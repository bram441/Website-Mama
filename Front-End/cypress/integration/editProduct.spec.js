describe("edit product", () => {
  beforeEach(() => {
    cy.login("bram.decoster1@gmail.com", "poes123");
  });
  it("edit product test", () => {
    cy.visit("http://localhost:3000/#/Producten");

    cy.get("[data-cy=product_edit_button]").eq(0).click();
    cy.get("[data-cy=editProduct_naam_input]").clear();
    cy.get("[data-cy=editProduct_naam_input]").type("productTest1");

    cy.get("[data-cy=submit_edit_product]").click();
    cy.get("[data-cy=product_naam]").eq(0).contains("productTest1");
  });
  it("change back", () => {
    cy.visit("http://localhost:3000/#/Producten");

    cy.get("[data-cy=product_edit_button]").eq(0).click();
    cy.get("[data-cy=editProduct_naam_input]").clear();
    cy.get("[data-cy=editProduct_naam_input]").type("Product1");

    cy.get("[data-cy=submit_edit_product]").click();
    cy.get("[data-cy=product_naam]").eq(0).contains("Product1");
  });

  it("in use name", () => {
    cy.visit("http://localhost:3000/#/Producten");

    cy.get("[data-cy=product_edit_button]").eq(0).click();
    cy.get("[data-cy=editProduct_naam_input]").clear();
    cy.get("[data-cy=editProduct_naam_input]").type("Product2");

    cy.get("[data-cy=submit_edit_product]").click();
    cy.get("[data-cy=editProduct_error").should("be.visible");
    cy.get("[data-cy=editProduct_error").eq(0).contains("aanpassen mislukt");
  });
});
