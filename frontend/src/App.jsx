import { Routes, Route } from "react-router-dom";
import './App.css';
import Shop from "./pages/shop/Shop";
import Detail from "./pages/shop/Detail";
import Order from "./pages/shop/Order"
import PaymentEnd from "./pages/shop/PaymentEnd";
import Cart from "./pages/shop/Cart";
import OrderDetails from "./pages/shop/OrderDetails";
import List from "./pages/shop/List";
import Log from "./pages/log/Log"
import LogDetail from "./pages/log/LogDetail"
import DiseaseReport from "./pages/log/DiseaseReportList"
import MyPage from "./pages/myPage/MyPage";

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/logs" element={<Log/>} />
          <Route path="/logs/details" element={<LogDetail/>} />
          <Route path="/disease/reports" element={<DiseaseReport/>} />
          <Route path="/shop" element={ <Shop/> } />
          <Route path="/detail/:id" element={ <Detail/> } />
          <Route path="/order" element={ <Order/> } />
          <Route path="/payment" element={ <PaymentEnd/> } />
          <Route path="/cart" element={ <Cart/> } />
          <Route path="/orders" element={ <OrderDetails/> } />
          <Route path="/lists" element={<List/>} />
          <Route path="/mypage" element={<MyPage/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
