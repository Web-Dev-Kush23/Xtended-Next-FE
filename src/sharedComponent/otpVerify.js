import { useState } from "react";

const Otpinput = ({className, otpvalue, setOtpvalue})=>{

 

  const handleChange = (event) => {
const {name, value} = event.target;
   setOtpvalue({...otpvalue, [name]:value});
  }
 

  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    }
    else {
     if(!elmnt.target.value) return
        const next = elmnt.target.tabIndex;
        if (next < 4) {
          elmnt.target.form.elements[next].focus()
        }
    }

  }


    return (
        <div className="otpContainer text-center">

          <input
            name="otp1"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otpvalue?.otp1 || ""}
            onChange={e => handleChange(e)}
            tabIndex="1" maxLength="1" onKeyUp={e => inputfocus(e)}

          />
          <input
            name="otp2"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otpvalue?.otp2 || ""}
            onChange={e => handleChange( e)}
            tabIndex="2" maxLength="1" onKeyUp={e => inputfocus(e)}

          />
          <input
            name="otp3"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otpvalue?.otp3 || ""}
            onChange={e => handleChange( e)}
            tabIndex="3" maxLength="1" onKeyUp={e => inputfocus(e)}

          />
          <input
            name="otp4"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otpvalue?.otp4 || ''}
            onChange={e => handleChange( e)}
            tabIndex="4" maxLength="1" onKeyUp={e => inputfocus(e)}
          />

         
        </div>
      
    );
  
}







export default Otpinput;
