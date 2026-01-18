import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Metrics from "./pages/Metrics";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="metrics" element={<Metrics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
