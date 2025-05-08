import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="bg-[#FFFACD] shadow px-6 py-10 flex justify-between items-center fixed w-full left-0 top-0 z-50">
            <div className="text-3xl font-bold  py-2 text-[#002d1f]">
                <a href="http://localhost:5173/dashboard">VanaEcho</a>
            </div>
            <div className="space-x-5">
                <Link to="/posts" className="text-2xl rounded-3xl text-center px-8 py-2 text-1xl ">Posts</Link>
                <Link to="/profile" className="text-2xl rounded-3xl text-center px-8 py-2 text-1xl">Profile</Link>
                <Link to="/addOrg" className="text-2xl rounded-3xl px-8 text-center py-2 text-1xl">Organization</Link>
                <Link to="/" className="text-2xl rounded-3xl px-8 text-center py-2 text-1xl">Map</Link>
                <Link to="/signup" className=" text-2xl rounded-3xl px-8 text-center py-2 text-1xl">Signup</Link>
                <Link to="/logout" className=" text-2xl hover:bg-red-500 hover:text-white rounded-3xl px-8 text-center py-3 text-1xl">Logout</Link>
            </div>

        </nav>
    )
}

export default NavBar