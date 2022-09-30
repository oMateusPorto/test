import Login from "./pages/login/login";
import { Routes, Route } from "react-router-dom";
import UserMaintenance from "./pages/maintenances";
import PageNotFound from "./pages/notFound.tsx/pageNotFound";
import Footer from "./components/footer";

function App() {

  return (
    <div>
      <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/UserMaintenance" element={<UserMaintenance />}/>
          <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
