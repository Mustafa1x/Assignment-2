import Link from "next/link";

export default function Index() {
	
	return (
		<div> 
			<p>Drake University</p>
			<ul>
				<li>
					<Link href="/items">																										
						<a>Items!</a>
					</Link>
				</li>
				<li>
					<Link href="/cart">																										
						<a title = "Cart">Cart</a>
					</Link>
				</li>
			</ul>
		</div>
	);
} 