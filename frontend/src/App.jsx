import { Routes, Route } from "react-router-dom";
import './App.css';
import Main from "./pages/main/Main"
import Shop from "./pages/shop/Shop";
import Login from "./pages/login/Login";
import Detail from "./pages/shop/Detail";
import Order from "./pages/shop/Order"
import PaymentEnd from "./pages/shop/PaymentEnd";
import Cart from "./pages/shop/Cart";
import OrderDetails from "./pages/shop/OrderDetails";
import List from "./pages/shop/List";

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/main" element={ <Main/> } />
          <Route path="/shop" element={ <Shop/> } />
          <Route path="/detail/:id" element={ <Detail/> } />
          <Route path="/order" element={ <Order/> } />
          <Route path="/payment" element={ <PaymentEnd/> } />
          <Route path="/cart" element={ <Cart/> } />
          <Route path="/orders" element={ <OrderDetails/> } />
          <Route path="/lists" element={<List/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
