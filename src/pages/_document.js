import { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script';
import { useEffect } from "react";

export default function Document() {
  useEffect(() => {
    // Initialize the GTM dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'gtm.js',
      'gtm.start': new Date().getTime(),
    });
  }, []);
  return (
    <Html lang="en">
      <Head>
      <script
          src="/~partytown/partytown.js"
          async
        >


        </script>
        
{/* <Script
 id="gtm"
 strategy="worker"
 data-partytown="true"

          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MN9B3XPB');
            `,
          }}
        /> */}
         {/* ✅ Hotjar Tracking Code */}
      <script
        id="hotjar-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6501250,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
        }}
      />
<script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "qet28v0hoz");
            `,
          }}
        />



</Head>
      <body>
      <noscript>
        {/* <iframe
          src={`https://www.googletagmanager.com/ns.html?id=GTM-MN9B3XPB`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe> */}
      </noscript>
      <noscript>
            <iframe
              src="https://www.clarity.ms/tag/qet28v0hoz"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
