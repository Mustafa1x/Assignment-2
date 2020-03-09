const uuid = require('uuid');

const {

    selectCustomers,
    selectCustomerByCustomerId
} = require('../../customer-repository');

describe('customer repository', () => {
    
    let firstCustomerId,
        secondCustomerId,
        expectedCustomerId,
        expectedFirstCustomer,
        expectedSecondCustomer;

    beforeEach(() => {

        firstCustomerId = 'def5cd03-7bf4-49e9-8f0b-380f90c86ec1';
        secondCustomerId = '504550bc-d21e-43c3-8767-0c1bd59a173c';

        expectedFirstCustomer = {
            'customer_id': firstCustomerId,

        };
        expectedSecondCustomer = {
            'customer_id': secondCustomerId,
        };
    });

    describe('selectCustomers', () => {
        it('should return all customers', () => {

            const actualCustomers = selectCustomers();
            const [actualFirstCustomer, actualSecondCustomer] = actualCustomers.rows;

            expect(actualFirstCustomer).toEqual(expectedFirstCustomer);
            expect(actualSecondCustomer).toEqual(expectedSecondCustomer);

        });
    });

    describe('selectCustomerByCustomerId', () => {

        it('should return a customer by customerId', () => {

            const actualFirstCustomer = selectCustomerByCustomerId(firstCustomerId);

            expect(actualFirstCustomer).toEqual({
                'customer_id': expectedCustomerId
            });

            const actualSecondCustomer = selectCustomerByCustomerId(secondCustomerId);

            expect(actualSecondCustomer).toEqual({
                'customer_id': expectedCustomerId

            });
        });
    });
});