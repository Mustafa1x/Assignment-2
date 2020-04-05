const Hapi = require('@hapi/hapi');
const uuid = require('uuid');
const {when} = require('jest-when');

const {initCartControllers} = require('../../controllers/cart-controller');
const {getAllCarts, getCartByCartId, getCartsByCustomerId} = require('../../services/cart-service');

jest.mock('../../services/cart-service');

describe('Cart Controller', () => {
	let fakeServer,
        expectedCustomerId,
        expectedCart,
		expectedCartId,
		expectedCarts;

	beforeAll(() => {
		fakeServer = Hapi.server({
			host: 'localhost',
			port: 3000
		});

		expectedCustomerId = uuid.v4();
        expectedCart = {cartId: expectedCartId};
        expectedCartId = uuid.v4();
		expectedCarts = [expectedCartId, uuid.v4()];

		getAllCarts.mockReturnValue(expectedCarts);

		when(getCartByCartId).calledWith(expectedCartId).mockReturnValue(expectedCart);

		initCartControllers(fakeServer);
	});

	it('Should return all carts', async () => {
		const response = await fakeServer.inject({
			method: 'GET',
			url: '/carts'
		});

		expect(response.statusCode).toEqual(200);
		expect(response.result).toEqual(expectedCarts);
	});

	it('Should return carts by customerId', async () => {
        const response = await fakeServer.inject({
            method: 'GET',
            url: `/carts/${expectedCustomerId}`
        });

		expect(getCartsByCustomerId).toHaveBeenCalledWith(expectedCustomerId);
        expect(response.statusCode).toEqual(200);
        expect(response.result).toEqual(expectedCarts)
	});

	it('Should return NOT FOUND if a cart does not exist', async () => {
		const randomCartId = uuid.v4();

		const response = await fakeServer.inject({
			method: 'GET',
			url: '/carts/${randomCartId}'
		});

		expect(getCartByCartId).toHaveBeenCalledWith(randomCartId);
		expect(response.statusCode).toEqual(404);
	});

	it('Should return carts for a customer id', async () => {
		const response = await fakeServer.inject({
			method: 'GET',
			url: '/customers/${expectedCustomerId}/carts'
		});

		expect(response.statusCode).toEqual(200);
		expect(response.result).toEqual(expectedCarts);
	});

	it('Should return NOT FOUND if a customer does not exist looking for their carts', async () => {
		const randomCustomerId = uuid.v4();

		const response = await fakeServer.inject({
			method: 'GET',
			url: '/customers/${randomCustomerId}/carts'
		});

		expect(response.statusCode).toEqual(404);
	});

});