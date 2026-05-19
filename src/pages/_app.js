import '@/styles/globals.css'

import '@/styles/main.css'
import '@/styles/login.css'
import '@/styles/profile.css'
import '@/styles/calculator.css'
import '@/styles/storagelisting.css'
import '@/styles/otheritems.css'
import '@/styles/householditems.css'
import '@/styles/home.css'
import '@/styles/recordManagement.css'
import '@/styles/easystorage.css'
import '@/styles/liststorage.css'
import '@/styles/marketing.css'
import '@/styles/contact.css'
import '@/styles/faq.css'
import '@/styles/enroll.css'
import '@/styles/relocation.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; 
const Layout = dynamic(() => import('../components/layout'));
const HeaderMenu = dynamic(() => import('@/components/header/header'));
const Explore = dynamic(() => import('@/components/explore'));
const Popupform = dynamic(() => import('@/pages/popupform'));
import "../styles/globals.css";
import "../styles/common.scss";
import { getApiToken } from '@/service/authService';
import { localStorageManager, utmSaveSession } from '@/util/common';
import { STORAGE_KEY } from '@/util/constant';
import axios from "axios";
import { route } from '@/service/route';
import Head from 'next/head';
import { Providers } from '@/app/globalRedux/provider';
import Script from 'next/script';


// export default function MyApp({ Component, pageProps }) {
//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   )
// }



export default function MyApp({ Component, pageProps }) {
  const [showExplore, setShowExplore] = useState(true);
  const router = useRouter();
  const [isMenuShow, setIsMenuShow] = useState();
  // const hidePopupRoutes = [
  //   '/pack-move-store',
  //   '/login',
  //   '/signup',

  
  // ];

  // Check if the current route is in the hide list
  // const shouldHidePopup = hidePopupRoutes.some((routePath) =>
  //   router.pathname === routePath
  // );

  useEffect(()=>{
    const menucheck = window.location.href.includes("login") || window.location.href.includes("signup") || window.location.href.includes("register");
    setIsMenuShow(menucheck);
    const hideExploreOnPages = ["warehouse-storage-service-in-mumbai", "warehouse-storage-services-in-delhi-ncr", "storage-space-services-in-india", "storage-space-facility-in-delhi-ncr", "storage-space-facilities-in-mumbai", "packers-and-movers-in-mumbai", "packers-and-movers-in-india", "packers-and-movers-in-delhi-ncr"];
    const shouldHideExplore = hideExploreOnPages.some(page => window.location.href.includes(page));
    setShowExplore(!shouldHideExplore);
  
      (async()=>{
        const newToken = await getApiToken();
        if (newToken?.success) {
          localStorageManager.setValue(
            STORAGE_KEY.JWT_TOKEN,
            newToken.success.token
          );
        
        } else {
          // console.log("newToken.error", newToken.error);
        } 
      })()
    
   
  },[]) 
  useEffect(() => {
    // Check if the script is already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      document.head.appendChild(script);
    }
    utmSaveSession()
  }, []);


  return (
   <>
   <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': 
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MN9B3XPB');
          `,
        }}
      />
      
   <Head>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = {true} />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet"></link>
<link href="https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&display=swap" rel="stylesheet"/>
<link rel="icon" type="image/webp" href="https://xtendedspace.s3.ap-south-1.amazonaws.com/logo/xtendedspace-watermark.png" />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Xtended Space",
          "url": "https://xtendedspace.com/",
          "logo": "https://www.xtendedspace.com/images/logo/XtendedSpace.webp",
          "description": "Xtended Space offers reliable packers and movers services along with secure storage solutions in multiple cities across India.",
          "keywords": "packers and movers, storage services, relocation services, moving services, secure storage, India",
          "founder": {
            "@type": "Person",
            "name": "Ritesh Suneja"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-9009000798",
            "contactType": "Customer Service",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi"]
          },
          "sameAs": [
            "https://www.facebook.com/xtendedspace",
            "https://www.twitter.com/xtendedspace",
            "https://www.linkedin.com/company/xtended-space"
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "A-96 , 3rd Floor, Sector -63 Noida-201301, A Block, Sector 63, Noida",
            "addressLocality": "Noida",
            "addressRegion": "Uttar Pradesh",
            "postalCode": "201307",
            "addressCountry": "IN"
          },
          "makesOffer": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Packers and Movers Services",
                "serviceType": [
                  "Residential Relocation",
                  "Business Inventory  Relocation",
                  "Car Transportation"
                ]
              },
              "areaServed": {
                "@type": "Place",
                "name": [
                  "Delhi", "Noida", "Faridabad", "Ghaziabad", "Gurugram", "Bangalore", 
                  "Mumbai", "Hyderabad", "Pune", "Patna", "Calcutta", "Chandigarh", 
                  "Jaipur", "Haridwar", "Lucknow", "Dehradun", "Indore", "Vadodara", 
                  "Ahmedabad", "Goa", "Guwahati", "Kochi", "Ranchi", "Bhubaneswar", 
                  "Chennai", "Panipat", "Ludhiana"
                ]
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Storage Services",
                "serviceType": [
                  "Short-term Storage",
                  "Long-term Storage",
                  "Secure Storage Solutions"
                ]
              },
              "areaServed": {
                "@type": "Place",
                "name": [
                  "Delhi", "Noida", "Faridabad", "Ghaziabad", "Gurugram", "Bangalore", 
                  "Mumbai", "Hyderabad", "Calcutta", "Pune"
                ]
              }
            }
          ]
        })}} />


</Head>
<div className="md:hidden">{showExplore && <Explore/>}</div>
{/* <Popupform /> */}
{/* {!shouldHidePopup && <Popupform />} */}
     {/* {!isMenuShow && <HeaderMenu /> } */}
  
     <Providers><Component {...pageProps} /></Providers> 
      </>
 
  )
}