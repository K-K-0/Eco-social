import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/Authcontext"
import Home from "./pages/home"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import LogoutButton from "./pages/Logout"
import CreatePost from "./pages/createPost"
import OrgForm from "./components/orgRegistrationForm"
import SetLocation from "./components/setLocation"
import Protected from "./components/ProtectRoute"
import Profile from "./pages/profilePage"
import Feed from "./pages/feed"
import { Signup } from "./components/SignUp"


function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="/logout" element={<LogoutButton />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/addOrg" element={<OrgForm/>} />
          <Route path="/Hello" element={<SetLocation />} />
          <Route path="/posts" element={<Protected><Feed /></Protected>} />
          <Route path="/profile" element={<Protected><Profile /></Protected>} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
