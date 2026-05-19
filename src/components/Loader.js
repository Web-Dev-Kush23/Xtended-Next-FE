  import React from 'react'

  const Loader = () => {
    return (
      <div className=''>
          <div className="w-full h-[100vh] z-50 flex justify-center top-0 left-0 items-center fixed bg-[#0004]">
        <div className="loader text-white"></div>
        </div>
      </div>
    )
  }

  export default Loader



// import React, { useEffect } from "react";

// const Loader = () => {
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-transparent backdrop-blur-sm">
//       <div className="relative w-12 h-12">
//         {Array.from({ length: 12 }).map((_, i) => (
//           <span
//             key={i}
//             className="absolute left-1/2 top-1/2 block w-1 h-4 rounded-full"
//             style={{
//               background: `#3B82F6`,
//               transformOrigin: "50% calc(50% - 20px)",
//               transform: `rotate(${i * 30}deg)`,
//               animation: `fade 1.2s linear infinite`,
//               animationDelay: `${i * 0.1}s`,
//               opacity: 0.25,
//             }}
//           ></span>
//         ))}
//       </div>
//        <p
//         className="mt-0 text-lg font-semibold text-center tracking-widest text-white animate-pulse text-gray-500"
//         style={{
//           textShadow: "0 0 10px #3B82F6, 0 0 20px #3B82F6, 0 0 30px #60A5FA",
          
//         }}
//       >
      
//       </p>

//       <style>{`
//         @keyframes fade {
//           0% { opacity: 1; }
//           100% { opacity: 0.25; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Loader;











