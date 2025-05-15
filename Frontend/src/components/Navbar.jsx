// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion"; // 🚀 Import Framer Motion
// import { useUser } from '../context/UserContext';

// function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { logout, user } = useUser();

//   return (
//     <div className="top-0 py-1 lg:py-2 w-full bg-transparent lg:relative z-50 dark:bg-gray-900">
//       <nav className="z-10 sticky top-0 left-0 right-0 max-w-4xl xl:max-w-5xl mx-auto px-5 py-2.5 lg:border-none lg:py-4">
//         <div className="flex items-center justify-between">
//           <Link to="/">
//             <div className="flex items-center space-x-2">
//               <h2 className="text-black dark:text-white font-bold text-2xl">Company</h2>
//             </div>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden lg:block">
//             <ul className="flex space-x-10 text-base font-bold text-black/60 dark:text-white">
//               <li className="hover:underline hover:underline-offset-4 transition-all">
//                 <Link to="/">Home</Link>
//               </li>
//               <li className="hover:underline hover:underline-offset-4 transition-all">
//                 <Link to="/Services">Our Services</Link>
//               </li>
//               <li className="hover:underline hover:underline-offset-4 transition-all">
//                 <Link to="/About">About</Link>
//               </li>
//               <li className="hover:underline hover:underline-offset-4 transition-all">
//                 <Link to="/Contact">Contact</Link>
//               </li>
//               <li className="hover:underline hover:underline-offset-4 transition-all">
//                 <Link to="/Register">Register</Link>
//               </li>
//               <li className="hover:underline hover:underline-offset-4 transition-all">
//                 <Link to="/Login">Login</Link>
//               </li>
//               <li className="hover:underline hover:underline-offset-4 transition-all">
//                 <Link onClick={() => logout()} style={{ cursor: "pointer" }}>
//                   Logout
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="flex items-center justify-center lg:hidden">
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="focus:outline-none text-slate-200 dark:text-white"
//             >
//               <svg
//                 stroke="currentColor"
//                 fill="currentColor"
//                 strokeWidth="0"
//                 viewBox="0 0 20 20"
//                 aria-hidden="true"
//                 className="text-2xl text-slate-800 dark:text-white focus:outline-none active:scale-110 active:text-red-500"
//                 height="1em"
//                 width="1em"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 {menuOpen ? (
//                   // Close Icon
//                   <path
//                     fillRule="evenodd"
//                     d="M6 18L18 6M6 6l12 12"
//                     clipRule="evenodd"
//                   />
//                 ) : (
//                   // Hamburger Icon
//                   <path
//                     fillRule="evenodd"
//                     d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
//                     clipRule="evenodd"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu Animated */}
//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="lg:hidden mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-md py-4 overflow-hidden"
//             >
//               <ul className="flex flex-col items-center space-y-4 font-bold text-black/70 dark:text-white">
//                 <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
//                 <li><Link to="/Services" onClick={() => setMenuOpen(false)}>Our Services</Link></li>
//                 <li><Link to="/About" onClick={() => setMenuOpen(false)}>About</Link></li>
//                 <li><Link to="/Contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
//                 <li><Link to="/Register" onClick={() => setMenuOpen(false)}>Register</Link></li>
//                 <li><Link to="/Login" onClick={() => setMenuOpen(false)}>Login</Link></li>
//                 <li>
//   <button
//     onClick={() => {
//       logout();
//       setMenuOpen(false);
//     }}
//     className="text-red-500"
//   >
//     Logout
//   </button>
// </li>
//               </ul>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>
//     </div>
//   );
// }

// export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../context/UserContext"; // Adjust path based on your project structure

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="top-0 py-1 lg:py-2 w-full bg-transparent lg:relative z-50 dark:bg-gray-900">
      <nav className="z-10 sticky top-0 left-0 right-0 max-w-4xl xl:max-w-5xl mx-auto px-5 py-2.5 lg:border-none lg:py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center space-x-2">
              <h2 className="text-black dark:text-white font-bold text-2xl">Company</h2>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <ul className="flex space-x-10 text-base font-bold text-black/60 dark:text-white">
              <li className="hover:underline hover:underline-offset-4 transition-all">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:underline hover:underline-offset-4 transition-all">
                <Link to="/Services">Our Services</Link>
              </li>
              <li className="hover:underline hover:underline-offset-4 transition-all">
                <Link to="/About">About</Link>
              </li>
              <li className="hover:underline hover:underline-offset-4 transition-all">
                <Link to="/Contact">Contact</Link>
              </li>

              {!user && (
                <>
                  <li className="hover:underline hover:underline-offset-4 transition-all">
                    <Link to="/Register">Register</Link>
                  </li>
                  <li className="hover:underline hover:underline-offset-4 transition-all">
                    <Link to="/Login">Login</Link>
                  </li>
                </>
              )}

              {user && (
                <li className="hover:underline hover:underline-offset-4 transition-all text-red-500 cursor-pointer">
                  <span onClick={handleLogout}>Logout</span>
                </li>
              )}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center justify-center lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none text-slate-200 dark:text-white"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="text-2xl text-slate-800 dark:text-white"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path fillRule="evenodd" d="M6 18L18 6M6 6l12 12" clipRule="evenodd" />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-md py-4 overflow-hidden"
            >
              <ul className="flex flex-col items-center space-y-4 font-bold text-black/70 dark:text-white">
                <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                <li><Link to="/Services" onClick={() => setMenuOpen(false)}>Our Services</Link></li>
                <li><Link to="/About" onClick={() => setMenuOpen(false)}>About</Link></li>
                <li><Link to="/Contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>

                {!user && (
                  <>
                    <li><Link to="/Register" onClick={() => setMenuOpen(false)}>Register</Link></li>
                    <li><Link to="/Login" onClick={() => setMenuOpen(false)}>Login</Link></li>
                  </>
                )}

                {user && (
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="text-red-500"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}

export default Navbar;

