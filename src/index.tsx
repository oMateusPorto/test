import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./pages/routes"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Router/>
  </BrowserRouter>
);
