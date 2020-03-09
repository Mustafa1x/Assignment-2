const uuid = require('uuid');

const {
    
    getAllCustomers,
    getCustomerByCustomerId
} = require('../../services/customer-service');
const {

    selectCustomers,
    selectCustomerByCustomerId

} = require('../../customer-repository');

jest.mock('../../customer-repository');

describe('getAllCustomers', () => {

    let expectedFirstCustomer,
        expectedFirstCustomerId;

    beforeEach(() => {
        expectedFirstCustomerId = uuid.v4();

        expectedFirstCustomer = {

            customerId: expectedFirstCustomerId,

        };

        selectCustomers.ReturnValue({
            rows: [{

                'customer_id': expectedFirstCustomerId

            }]
        });

        selectCustomerByCustomerId.ReturnValue({
            rows: [{

                'customer_id': expectedFirstCustomerId

            }]
        });
    });

    it('should return all customers', () => {
        const actualCustomers = getAllCustomers();

        expect(selectCustomers).toHaveBeenCalledTimes(1);

        expect(actualCustomers).toEqual([

            expectedFirstCustomer

        ]);
    });

    it('should return customer by customerId', () => {

        const actualCustomers = getCustomerByCustomerId(expectedFirstCustomerId);

        expect(selectCustomerByCustomerId).toHaveBeenCalledTimes(1);
        expect(selectCustomerByCustomerId).toHaveBeenCalledWith(expectedFirstCustomerId);

        expect(actualCustomers).toEqual(expectedFirstCustomer);
    });
});