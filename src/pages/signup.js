
// import Register from "./login/register"
// const SignUp = ()=>{
    
//     return(
//         <>
//         <Register />
//         </>
//     )
// }

// export default SignUp
import React from "react";
import { useRouter } from "next/router";
import Register from "./login/register";

const SignUp = () => {
  const router = useRouter();
  const { phone, firstName, lastName, email,userId,callback } = router.query;
  return (
    <div>
         <Register 
        phoneNumber={phone}
        firstName={firstName} 
        lastName={lastName} 
        email={email} 
        userId={userId}
        callback={callback}
      />

    </div>
  );
};

export default SignUp;
