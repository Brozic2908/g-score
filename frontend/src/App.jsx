import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import SearchScoresPage from "./pages/SearchScoresPage";
import DashBoard from "./pages/DashBoard";
import TopStudents from "./pages/TopStudents";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="/search" element={<SearchScoresPage />} />
          <Route path="/topstudent" element={<TopStudents />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
