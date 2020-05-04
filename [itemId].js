import fetch from 'isomorphic-unfetch';
import uuid from 'uuid';
import Link from "next/link";
import {getCustomersCart} from "../../services/cart-item-service";

const AddItemToCart = async (itemId) => {

    const customerResponse = await fetch(  `http://localhost:5555/customers`);
    const [customer] = await customerResponse.json();

    const cartResponse = await fetch(`http://localhost:5555/customers/${customer.customerId}/carts`);
    const [cart] = await cartResponse.json();

    await fetch(`http://localhost:5555/cart-items`,{
        method: 'POST',
        body: JSON.stringify({
            cartItemId: uuid.v4(),
            cartId: cart.cartId,
            itemId,
            quantity: 1
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
};

const Index = props => (
    <section>
        <h1>Items Detail</h1>
        <img src={props.item.image}></img>
        <p>Description: {props.item.description}</p>
        <p>Price: ${props.item.price}</p>
        <button type = 'button' onClick={() => AddItemToCart(props.item.itemId)}>
            Add To Cart
        </button>
        <p>Number of times in The Cart: {props.TimesInCart}</p>
        <Link href="/cart">
            <a title="View Cart">View Cart</a>
        </Link>
    </section>
);

Index.getInitialProps = async function(context) {
    const {itemId} = context.query;
    const res = await fetch(  `http://localhost:5555/item/${itemId}`);
    const item = await res.json();
    TimesInCart = cartItems.filter((cartItem) => cartItem.itemId === itemId).length;
    const {cartItems} = await getCustomersCart();
    

    return {

        item,

        cartItems,
        
        TimesInCart
    };
};

export default Index; 