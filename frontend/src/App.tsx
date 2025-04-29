import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/Authcontext"
import Home from "./pages/home"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import LogoutButton from "./pages/Logout"


function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<LogoutButton />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
