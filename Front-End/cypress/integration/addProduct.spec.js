describe("add product", () => {
  beforeEach(() => {
    cy.login("bram.decoster1@gmail.com", "poes123");
  });

  it("add product test", () => {
    cy.visit("http://localhost:3000/#/Producten");

    cy.get("[data-cy=button_addForm]").click();
    cy.get("[data-cy=input_product_naam]").type("productTest1");
    cy.get("[data-cy=input_product_verkoperId]").select("verkoper1");
    cy.get("[data-cy=input_product_prijs]").type("15");
    cy.get("[data-cy=input_product_aantal]").type("200");
    cy.get("[data-cy=input_product_beschrijving]").type(
      "dit is een test beschrijving"
    );
    cy.get("[data-cy=addProduct_submit]").click();
    cy.get("[data-cy=cancel_addProduct]").click();

    cy.get("[data-cy=product]").should("have.length", 4);
    cy.get("[data-cy=product_naam]").eq(3).contains("productTest1");
  });

  it("remove again", () => {
    cy.visit("http://localhost:3000/#/Producten");
    cy.get("[data-cy=product_delete_button]").eq(3).click();
    cy.get("[data-cy=product]").should("have.length", 3);
  });

  it("empty input", () => {
    cy.visit("http://localhost:3000/#/Producten");

    cy.get("[data-cy=button_addForm]").click();
    cy.get("[data-cy=input_product_verkoperId]").select("verkoper1");
    cy.get("[data-cy=input_product_prijs]").type("15");
    cy.get("[data-cy=input_product_aantal]").type("200");
    cy.get("[data-cy=input_product_beschrijving]").type(
      "dit is een test beschrijving"
    );
    cy.get("[data-cy=addProduct_submit]").click();
    cy.get("[data-cy=input-error").should("be.visible");
    cy.get("[data-cy=input-error").eq(0).contains("naam is required");
  });
});
