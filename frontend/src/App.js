import { Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Shop from "./pages/shop/Shop";
import NavBar from "./pages/bar/NavBar";
import Detail from "./pages/shop/Detail";
import LoginMain from './pages/login/LoginMain';
import ELogin from './pages/login/ELogin';
import EJoin from './pages/login/EJoin';
import EPhone from './pages/login/EPhone';
import FinElogin from './pages/login/FinElogin';
import Main from './pages/main/Main';
import Check from './pages/main/Check';
import Checking from './pages/main/Checking';





function App() {
  const location = useLocation();
  const excludedPaths = ['/', '/detail'];

  const shouldExcludeNavBar = excludedPaths.includes(location.pathname);

  return (
    <div className="App">
      {/* {!shouldExcludeNavBar && <NavBar />} */}
      <main>
        <Routes>
          <Route path="/shop" element={ <Shop/> } />
          <Route path="/detail" element={ <Detail/> } />
          <Route path="/" element={<LoginMain/>} />
          <Route path="/ejoin" element={<EJoin/>} />
          <Route path="/elogin" element={<ELogin/>} />
          <Route path="/ephone" element={<EPhone/>} />
          <Route path="/finelogin" element={<FinElogin/>} />
          <Route path="/main" element={<Main/>} />
          <Route path="/check" element={<Check/>} />
          <Route path="/checking" element={<Checking/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
