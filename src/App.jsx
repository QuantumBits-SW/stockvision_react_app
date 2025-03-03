import Navbar from "./components/common/Navbar";
import Layout from "./components/auth/Layout";
import StockDashboard from "./components/dashboard/StockDashboard";
import Holdings from "./components/dashboard/Holdings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Layout/>
      <Routes>
        <Route path="/" element={<StockDashboard />} />
        <Route path="/holdings" element={ <PrivateRoute element={<Holdings />}/>} />
        <Route path="/stocks" element={ <PrivateRoute element={<StockDashboard />}/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
