import { useEffect } from 'react';
import Script from 'next/script';
import { facebookLogin } from '@/service/authService';
import { useRouter } from 'next/router';
import { FaFacebook } from "react-icons/fa";
import { localStorageManager } from '@/util/common';


const FacebookLogin = () => {
  const router = useRouter();
  useEffect(() => {
    // Initialize Facebook SDK once the script is loaded
    window.fbAsyncInit = function () {
      FB.init({
        appId: '1081893350140450', // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: 'v17.0', // Use the latest Facebook API version
      });
      FB.AppEvents.logPageView();
    };
  }, []);

  const loginProceed = async(fbToken)=>{
    const args = `?accessToken=${fbToken}`;
    console.log("args", args);
    const userDetails = await facebookLogin(args);
    console.log('Logged in successfully', userDetails);
    if(userDetails.success){
      console.log('Logged in successfully', userDetails.success);
      // Redirect to the desired page after successful login
      // window.location.href = '/profile';

      const { firstName, lastName, email, userId, phoneNumber } = userDetails.success.data;
              if (userDetails.success.data?.phoneNumber === null) {
                router.push({
                  pathname: "/signup",
                  query: { firstName, lastName, email, userId },
                });
              }if(userDetails.success.data.isPhoneNumberVerified === false && userDetails.success.data?.phoneNumber !== null){
                router.push({
                  pathname: "/login",
                  query: {phoneNumber},
                })
              }
              if(userDetails.success.data.isPhoneNumberVerified === true){
                localStorageManager.setValue(
                "userDetails",
                JSON.stringify(userDetails.success.data)
              );
              const { callback } = router.query;
              if (callback) router.push("/" + callback);
              else router.push("/");
              }
    }
  }

  const handleLogin = async() => {
    FB.login(
      (response) => {
        if (response.authResponse) {
          
        
          console.log('Welcome! Fetching your information...', response.authResponse);
          loginProceed(response.authResponse.accessToken);
           
        
          FB.api('/me', { fields: 'name,email' }, (userInfo) => {
            console.log('Good to see you,', userInfo);
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      },
      { scope: 'public_profile,email' }
    );
  };

  return (
    <>
      {/* Load Facebook SDK */}
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload" // Load only when the page is idle
        onLoad={() => console.log('Facebook SDK loaded successfully')}
      />
      <button className=" flex items-center gap-2 text-center" onClick={() => handleLogin()}> <span className="text-[20px]"><FaFacebook /></span> Log in with Facebook </button>

    </>
  );
};

export default FacebookLogin;
