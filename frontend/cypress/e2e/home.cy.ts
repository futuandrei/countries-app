describe("Countries Application", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Displays the navigation bar correctly", () => {
    cy.findByRole("banner").should("exist");
    cy.findByRole("link", { name: "Home" }).should("exist");
    cy.findByRole("link", { name: "Test" }).should("exist");
    cy.findByRole("link", { name: "Countries" }).should("exist");
    cy.findByRole("link", { name: "Protected data" }).should("exist");
  });
  it("Shows a list of countries", () => {
    cy.findByRole("link", { name: "Countries" }).click();
  });
  it("More than 200 countries are displayed", () => {
    cy.findByRole("link", { name: "Countries" }).click();
    cy.get(".MuiCard-root").should("have.length.greaterThan", 200);
  });
  //   it("Can find Grenada", () => {
  //     cy.findByValue("Grenada").should("exist");
  //   });
});
