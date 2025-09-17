import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Footer from "./components/Footer";
import Task from "./pages/Task";

const App = () => {
  const location = useLocation();

  // List of routes where Navbar should be hidden
  const hideNavbarRoutes = ["/chat"];
  const hideFooterRoutes = ["/chat"];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#191a1a] via-[#222223] to-[#302f30]">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/task" element={<Task />} />
      </Routes>
      
      {!hideFooterRoutes.includes(location.pathname)&& <Footer />}
    </div>
  );
};

export default App;
