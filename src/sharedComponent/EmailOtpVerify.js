import { useState } from "react";

const EmailOtpinput = ({className, otpvalue, setOtpvalue})=>{

 

  const handleChange = (event) => {
const {name, value} = event.target;
   setOtpvalue({...otpvalue, [name]:value});
  }
 

  const inputfocus = (elmnt) => {
  
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > 3) {
        elmnt.target.form.elements[next].focus();
      }
    }
    else {
        const next = elmnt.target.tabIndex;
        if (next < 8 && next >4) {
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
            tabIndex="5" maxLength="1" onKeyUp={e => inputfocus(e)}

          />
          <input
            name="otp2"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otpvalue?.otp2 || ""}
            onChange={e => handleChange( e)}
            tabIndex="6" maxLength="1" onKeyUp={e => inputfocus(e)}

          />
          <input
            name="otp3"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otpvalue?.otp3 || ""}
            onChange={e => handleChange( e)}
            tabIndex="7" maxLength="1" onKeyUp={e => inputfocus(e)}

          />
          <input
            name="otp4"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otpvalue?.otp4 || ''}
            onChange={e => handleChange( e)}
            tabIndex="8" maxLength="1" onKeyUp={e => inputfocus(e)}
          />

         
        </div>
      
    );
  
}







export default EmailOtpinput;
