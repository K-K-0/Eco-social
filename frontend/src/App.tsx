import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/Authcontext"
import Home from "./pages/home"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import LogoutButton from "./pages/Logout"
import CreatePost from "./pages/createPost"


function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<LogoutButton />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
