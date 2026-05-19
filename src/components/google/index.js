import { GetGoogleUserDetails } from "@/service/storageService";
import { GoogleOAuthProvider, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { localStorageManager } from "@/util/common";
import { FcGoogle } from "react-icons/fc";

const Google = ({ props }) => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {

      if (codeResponse.access_token) {
        const token = `?accessToken=${codeResponse.access_token}`;

        try {
          const userDetails = await GetGoogleUserDetails(token);
          const data = userDetails?.success?.data;


          // localStorageManager.setValue(
          //   "userDetails",
          //   JSON.stringify(userDetails.success.data)
          // );

          const { firstName, lastName, email, userId, phoneNumber, isPhoneNumberVerified } = data;
          const callback = props?.callback
          if (phoneNumber === null) {
            router.push({
              pathname: "/signup",
              query: { firstName, lastName, email, userId,callback },
            });
          } else if (isPhoneNumberVerified === false) {
            router.push({
              pathname: "/login",
              query: { phoneNumber },
            });
          } else if (isPhoneNumberVerified === true) {
            localStorageManager.setValue("userDetails", JSON.stringify(data));

            // const { callback } = router.query;
            // if (callback) router.push("/" + callback);

            props?.setLoginModal(false);

            if (props?.packersMovers) {
              props?.packerMoverSave();
            }

            if (props?.p2p) {
              props?.saveBooking();
            }

            if (props?.easyStorage) {
              props?.saveStorage();
            }else{
              router.push("/")
            }
          }

          // else {
          //   const { callback } = router.query;
          //   if (callback) router.push("/" + callback);
          //   else router.push("/");
          // }

        } catch (error) {
          console.error("Failed to fetch user details:", error);
        }
      }
    },
  });


  return (
    <>
      <button className=" flex items-center gap-2 text-center " onClick={() => login()}> <span className="text-[20px]"><FcGoogle /></span> Log in with Google </button>
    </>
  )
}


const GoogleLogin = ({ props }) => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [userData, setUserData] = useState();
  return (
    <>
      <GoogleOAuthProvider clientId="246610207093-id7uo049ukgh655jt1uht579mpkacbhu.apps.googleusercontent.com">

        <Google setIsSignupOpen={setIsSignupOpen} setUserData={setUserData} props={props} />
      </GoogleOAuthProvider>
    </>
  )
}

export default GoogleLogin;