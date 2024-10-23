import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./components/common/Layout";
import LoginPage from "./pages/LoginPage";
import ProducerMasterPage from "./pages/ProducerMasterPage";
import ProducerEditPage from "./pages/ProducerEditPage";
import ProducerCreatePage from "./pages/ProducerCreatePage";
import MapPage from "./pages/MapPage";
import PerformancePage from "./pages/PerformancePage";
import ActivityPage from "./pages/ActivityPage";
import ChartPage from "./pages/ChartPage";
import SalesDocsPage from "./pages/SalesDocsPage";
import ActivityDetail from "./pages/ActivityDetail";
import Home from "./pages/Home";
import AnnouncementCreatePage from "./pages/AnnouncementCreatePage"; // 新規登録ページをインポート

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
          }
        >
          <Route index element={<Home />} />
          <Route path="producer-master" element={<ProducerMasterPage />} />
          <Route
            path="producer-master/create"
            element={<ProducerCreatePage />}
          />
          <Route
            path="producer-master/edit/:id"
            element={<ProducerEditPage />}
          />
          <Route path="map" element={<MapPage />} />
          <Route path="performance" element={<PerformancePage />} />
          <Route path="activity-history" element={<ActivityPage />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
          <Route
            path="/announcements/create"
            element={<AnnouncementCreatePage />}
          />
          <Route path="sales-documents" element={<SalesDocsPage />} />
          <Route path="chart" element={<ChartPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
