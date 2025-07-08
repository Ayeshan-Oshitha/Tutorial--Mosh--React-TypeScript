import { useState } from "react";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";

function App() {
  const [CartItems, setCartItems] = useState(["Product 1", "Product 2"]);

  return (
    <div>
      <NavBar cardItemsCount={CartItems.length} />
      <Cart cartItems={CartItems} onClear={() => setCartItems([])} />
    </div>
  );
}

export default App;
