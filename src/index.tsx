import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import  UserProvider  from './contexts/userContext'
import MaintenanceProvider from "./contexts/maintenanceContext";
import StageProvider from "./contexts/stageContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <UserProvider>
      <MaintenanceProvider>
        <StageProvider>
          <App />
        </StageProvider>
      </MaintenanceProvider>
    </UserProvider>
  </Router>
);
