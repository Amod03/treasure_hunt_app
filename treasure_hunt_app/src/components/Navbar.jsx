 import { useState } from "react";
// import { close, menu } from "../assets";
// import { navLinks } from "../constants";

// const Navbar = () => {
//   const [active, setActive] = useState("Home");
//   const [toggle, setToggle] = useState(false);

//   function onClick(){

//   }

//   return (
//     <nav className="w-full flex py-6 justify-between items-center navbar">

//       <ul className="list-none sm:flex hidden justify-end items-center flex-1">
//         {navLinks.map((nav, index) => (
//           <li
//             key={nav.id}
//             className={`font-poppins font-normal cursor-pointer text-[16px] ${
//               active === nav.title ? "text-white" : "text-dimWhite"
//             } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
//             onClick={() => setActive(nav.title)}
//           >
//             <a href={`#${nav.id}`}>{nav.title}</a>
//           </li>
//         ))}
//       </ul>

//       <div className="sm:hidden flex flex-1 justify-end items-center">
//         <img
//           src={toggle ? close : menu}
//           alt="menu"
//           className="w-[28px] h-[28px] object-contain"
//           onClick={() => setToggle(!toggle)}
//         />

//         <div
//           className={`${
//             !toggle ? "hidden" : "flex"
//           } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
//         >
//           <ul className="list-none flex justify-end items-start flex-1 flex-col">
//             {navLinks.map((nav, index) => (
//               <li
//                 key={nav.id}
//                 className={`font-poppins font-medium cursor-pointer text-[16px] ${
//                   active === nav.title ? "text-white" : "text-dimWhite"
//                 } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
//                 onClick={() => setActive(nav.title)}
//               >
//                 <a href={`#${nav.id}`}>{nav.title}</a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { Link } from "react-router-dom";
import React from "react";

function Navbar({ onLoginClick,value}) {
  return (
    <div className="rounded-2xl px-4 py-3 text-zinc-400 mx-auto flex items-center justify-center">
      {/* <Link to="/" className="text-5xl font-bolder px-10 p-2"> */}
        AMPED LEARNING
      {/* </Link> */}

      <div className="ml-auto flex gap-5 text-3xl font-primary">
        {/* <span className="rounded-xl bg-zinc-900 text-zinc-100 p-2">Projects</span>*/}
        {/* <Link to="/Login" className="rounded-xl bg-zinc-900 text-zinc-100 p-2"> */}
         <button onClick={onLoginClick}>{!value?"Login":"Register"}</button>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default Navbar;