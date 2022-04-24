describe("login", () => {
  it("fout wachtwoord ", () => {
    cy.visit("http://localhost:3000/#/login");
    cy.get("[data-cy=email_input]").type("bram.decoster1@gmail.com");
    cy.get("[data-cy=password_input]").type("eenFoutPasswoord");
    cy.get("[data-cy=submit_login]").click();

    cy.get("[data-cy=login_incorrect").should("be.visible");
    cy.get("[data-cy=login_incorrect").eq(0).contains("Login incorrect");
  });

  it("empty input", () => {
    cy.visit("http://localhost:3000/#/login");
    cy.get("[data-cy=submit_login]").click();

    cy.get("[data-cy=email_input_error").should("be.visible");
    cy.get("[data-cy=email_input_error").eq(0).contains("email is required");

    cy.get("[data-cy=password_input_error").should("be.visible");
    cy.get("[data-cy=password_input_error")
      .eq(0)
      .contains("password is required");
  });
});
