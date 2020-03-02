const {
  selectCustomers,
  selectCustomerByCustomerID
} = require('../repositories/customer-repository');

const mapToModel = (customer) => ({
  customerID: customer['customer_id'],
  firstName: customer['first_name'],
  lastName: customer['last_name'],
  email: customer['email']
});

const getAllCustomers = () => {
  const {rows} = selectCustomers();
  return rows.map(mapToModel);
};

const getCustomerByCustomerID = (customerID) => {
  const customer = selectCustomerByCustomerID(customerID);
  return mapToModel(customer);
};

module.exports = {
  getAllCustomers,
  getCustomerByCustomerID
};