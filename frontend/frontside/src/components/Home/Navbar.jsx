// import Logo from '../assets/Logo.png'
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
      <header className="bg-white shadow-md py-4 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between rounded-b-lg">
        <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-0">
          <div className="flex items-center mb-2">
            {/* <img src="" alt="logo" className="h-10 w-auto mr-3 rounded-md" /> */}
            <h1 className="text-blue-800 font-bold text-lg">FYS</h1>
          </div>
        </div>
  
        <nav className="mt-4 sm:mt-0 flex flex-row justify-center items-center" >
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-semibold text-lg transition duration-200">Home</Link>
            </li>
            <li>
              <Link to="services" href="#services" className="text-gray-700 hover:text-blue-600 font-semibold text-lg transition duration-200">Services</Link>
            </li>
            <li>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-semibold text-lg transition duration-200">Contact</a>
            </li>
          </ul>
          <button className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-1 px-4 ml-6 rounded-s-xs shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          SignIn
        </button>
        </nav>
      </header>
    );
  };
  
  export default Navbar;