export const getGreeting = () => cy.get('h1');
export const getRandomString = (length: number) =>
  Math.random()
    .toString(36)
    .substring(2, 2 + length);
