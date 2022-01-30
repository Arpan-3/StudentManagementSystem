import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import StudentManagement from "./pages/StudentManagement";
import Error from "./components/ErrorView";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/student" replace />} />
        <Route path="/student" element={<StudentManagement />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
