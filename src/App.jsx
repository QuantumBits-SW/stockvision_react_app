import Navbar from "./components/common/Navbar";
import Layout from "./components/auth/Layout";
import StockDashboard from "./components/dashboard/StockDashboard";
import Portfolio from "./components/dashboard/Portfolio";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import OrderHistory from "./components/dashboard/OrderHistory";

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Layout/>
      <Routes>
        <Route path="/" element={<StockDashboard />} />
        <Route path="/portfolio" element={ <PrivateRoute element={<Portfolio />}/>} />
        <Route path="/stocks" element={ <PrivateRoute element={<StockDashboard />}/>} />
        <Route path="/orders" element={ <PrivateRoute element={<OrderHistory />}/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
