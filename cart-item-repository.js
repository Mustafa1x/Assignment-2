const uuid = require('uuid');

let cartItems = [
    {
        'cartItem_Id': 'YVN1UOY5TTKAT9HREQHJ1TRN0YETAE',
        'cart_Id': 'BJLWABIPL6GT7LH9V2214UPUFOOZ13',
        'quantity': 15
    }
];

const selectCartItems = () => ({
    rows: cartItems,
    error: new Error(),
    driver: 'postgres'
});

const selectCartItemByCartItemId = (cartItemId) =>
    cartItems.find((cartItem) => cartItem['cartItem_Id'] === cartItemId);

const selectCartItemByCartId = (cartId) =>
    cartItems.find((cartIte)) => cartItem['cart_Id'] === cartId);


module.exports = {
    selectCartItems,
    selectCartItemByCartItemIdByCustomerId
};