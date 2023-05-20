import { Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Main from "./pages/main/Main"
import Shop from "./pages/shop/Shop";
import Login from "./pages/login/Login";
import NavBar from "./pages/bar/NavBar";
import Detail from "./pages/shop/Detail";

function App() {
  const location = useLocation();
  const excludedPaths = ['/', '/detail'];

  const shouldExcludeNavBar = excludedPaths.includes(location.pathname);

  return (
    <div className="App">
      {!shouldExcludeNavBar && <NavBar />}
      <main>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/main" element={ <Main/> } />
          <Route path="/shop" element={ <Shop/> } />
          <Route path="/detail" element={ <Detail/> } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
