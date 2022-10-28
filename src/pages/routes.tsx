import MaintenanceProvider from "../contexts/maintenanceContext";
import StageProvider from "../contexts/stageContext";
import UserProvider from '../contexts/userContext';
import { Routes, Route } from "react-router-dom";
import Footer from "../components/footer";
import PageNotFound from "../pages/notFound.tsx/pageNotFound";
import Login from "../pages/login/login";
import UserMaintenance from "../pages/maintenances";

function Router() {
    return (
        <UserProvider>
            <MaintenanceProvider>
                <StageProvider>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/UserMaintenance" element={<UserMaintenance />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                    <Footer />
                </StageProvider>
            </MaintenanceProvider>
        </UserProvider>
    )
}

export default Router