import Link from "next/link";
import fetch from "isomorphic-unfetch";

const Index = props => (
    <section>
      <h1>Details</h1>
      <img src={props.item.image} />
      <p>Description: {props.item.description}</p>
      <p>Price: {props.item.price}</p>
    </section>
  );

Index.getInitialProps = async function(context) {
  const {itemId} = context.query;
  const res = await fetch('http://localhost:5555/items/${itemId}');
  const item = await res.json();

  return {
      item
  };
};

export default Index;