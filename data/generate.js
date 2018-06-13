function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = () => {
  const data = {
    customers: [],
    accounts: []
  };
  const faker = require('faker');
  for (let customer = 0; customer < 100; customer++) {
    const id = data.customers.length + 1;
    data.customers.push({
      id,
      name: faker.company.companyName(),
      catchPhrase: faker.company.catchPhrase()
    });
    for (let account = 0; account < getRandomInt(3) + 1; account++) {
      data.accounts.push({
        id: data.accounts.length + 1,
        customer_id: id,
        accountNumber: faker.finance.account(),
        name: faker.finance.accountName(),
        amount: faker.finance.amount()
      });
    }
  }

  return data;
};
