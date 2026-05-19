import { useEffect, useState } from "react";

const OTPCounter = ({onClick})=>{
    const [count, setCount] = useState(30);
    useEffect(() => {
        const timer = setTimeout(() => {
          if (count > 0) {
            setCount(count - 1);
          }
        }, 1000); 
    
        return () => clearTimeout(timer);
      }, [count]);
    return(
        <>
       {count ? <p className="text-center">Didn't received ? <span className="font-semibold" style={{color:"#8dc63f"}}>{count}Sec</span></p>:
       <p  className="text-center cursor-pointer" onClick={()=>{onClick(); setCount(30)}}>Resend</p>}
    </>
)
}

export default OTPCounter;