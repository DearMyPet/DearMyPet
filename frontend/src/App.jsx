import { Routes, Route } from "react-router-dom";
import './App.css';
import Main from "./pages/main/Main"
import Shop from "./pages/shop/Shop";
import Detail from "./pages/shop/Detail";
import Order from "./pages/shop/Order"
import PaymentEnd from "./pages/shop/PaymentEnd";
import Cart from "./pages/shop/Cart";
import OrderDetails from "./pages/shop/OrderDetails";
import List from "./pages/shop/List";
import LoginMain from './pages/login/LoginMain';
import ELogin from './pages/login/ELogin';
import EJoin from './pages/login/EJoin';
import EPhone from './pages/login/EPhone';
import FinElogin from './pages/login/FinElogin';
import Check from './pages/main/Check';
import Checking from './pages/main/Checking';

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<LoginMain/>} />
          <Route path="/main" element={ <Main/> } />
          <Route path="/ejoin" element={<EJoin/>} />
          <Route path="/elogin" element={<ELogin/>} />
          <Route path="/ephone" element={<EPhone/>} />
          <Route path="/finelogin" element={<FinElogin/>} />
          <Route path="/main" element={<Main/>} />
          <Route path="/check" element={<Check/>} />
          <Route path="/checking" element={<Checking/>} />
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