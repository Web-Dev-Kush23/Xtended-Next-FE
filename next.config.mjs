import { withSentryConfig } from "@sentry/nextjs";
/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.BUILD_DIR || ".next",
  
  images: {
    domains: [
      "xtendedspace.s3.ap-south-1.amazonaws.com",
      "xtendedspacedev.blob.core.windows.net",
      "xtendedspace.blob.core.windows.net",
    ],
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=9999999999, must-revalidate",
          },
        ],
      },
      {
        source: "/~partytown/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/easystorage",
        destination: `/easy-storage`,
        permanent: false,
      },

      {
        source: "/bangalore",
        destination: "/storage-space/bangalore",
        permanent: false,
      },
      {
        source: "/delhi",
        destination: "/storage-space/delhi",
        permanent: false,
      },
      {
        source: "/self-storage-services-chennai",
        destination: "/storage-space/chennai",
        permanent: false,
      },
      {
        source: "/hyderabad",
        destination: "/storage-space/hyderabad",
        permanent: false,
      },

      {
        source: "/Faridabad",
        destination: "/storage-space/faridabad",
        permanent: false,
      },
      {
        source: "/Gurugram",
        destination: "/storage-space/gurugram",
        permanent: false,
      },
      {
        source: "/Register",
        destination: "/login",
        permanent: false,
      },
      {
        source: "/warehouse-rent/noida",
        destination: "/storage-space/noida",
        permanent: false,
      },

      {
        source: "/storagelisting",
        destination: "/affordable-storage",
        permanent: false,
      },
      {
        source: "/termsconditions",
        destination: "/terms_and_conditions",
        permanent: false,
      },
      {
        source: "/Host",
        destination: "/affordable-storage",
        permanent: false,
      },
      {
        source: "/doorstep-pickup-panipat",
        destination: "/",
        permanent: false,
      },
      {
        source: "/ListSpace",
        destination: "/affordable-storage",
        permanent: false,
      },

      {
        source: "/bikestorage",
        destination: "/",
        permanent: false,
      },
      {
        source: "/furniturestorage",
        destination: "/",
        permanent: false,
      },
      {
        source: "/household-storage-chennai",
        destination: "/storage-space/chennai",
        permanent: false,
      },

      {
        source: "/index",
        destination: "/",
        permanent: false,
      },
      {
        source: "/insurance-coverage-dehradun",
        destination: "/storage-space/dehradun",
        permanent: false,
      },
      {
        source: "/services/packers-movers-faridabad",
        destination: "/packers-and-movers/faridabad",
        permanent: false,
      },
      {
        source: "/business-storage-lucknow",
        destination: "/storage-space/lucknow",
        permanent: false,
      },
      {
        source: "/affordable-storage-mumbai",
        destination: "/storage-space/mumbai",
        permanent: false,
      },
      {
        source: "/business-storage-chennai",
        destination: "/storage-space/chennai",
        permanent: false,
      },
      {
        source: "/insurance-coverage-bhubaneshwar",
        destination: "/storage-space/bhubaneshwar",
        permanent: false,
      },
      // {
      //   source: '/packers-and-movers/Ghaziabad',
      //   destination: '/packers-and-movers/ghaziabad',
      //   permanent: false,
      // },

      {
        source: "/services/wheels-relocation",
        destination: "/",
        permanent: false,
      },
      {
        source: "/noida",
        destination: "/storage-space/noida",
        permanent: false,
      },
      {
        source: "/renter",
        destination: "/",
        permanent: false,
      },
      {
        source: "/services/budget-friendly-prices",
        destination: "/",
        permanent: false,
      },
      {
        source: "/packers-and-movers/calcutta",
        destination: "/packers-and-movers/kolkata",
        permanent: false,
      },
      {
        source: "/storage-space/calcutta",
        destination: "/storage-space/kolkata",
        permanent: false,
      },
      {
        source: "/others",
        destination: "/",
        permanent: false,
      },
      {
        source: "/carstorage",
        destination: "/",
        permanent: false,
      },
      {
        source: "/about",
        destination: "/about-us",
        permanent: false,
      },
      
      {
        source: "/services/door-to-door-pickup",
        destination: "/services/packers-and-movers",
        permanent: false,
      },
      {
        source: "/services/business-inventory-shifting",
        destination: "/services/packers-and-movers",
        permanent: false,
      },
      {
        source: "/storage-space/[city]",
        destination: "/storage-space/ludhiana",
        permanent: false,
      },
      {
        source: "/b2b-logistics",
        destination: "/services/b2b-logistics",
        permanent: false,
      },
      {
        source: "/doorstep-pickup",
        destination: "/services/packers-and-movers",
        permanent: false,
      },
      {
        source: "/business-storage",
        destination: "/services/business-storage",
        permanent: false,
      },
      {
        source: "/household-storage",
        destination: "/affordable-storage",
        permanent: false,
      },
      {
        source: "/insurance-coverage-ludhiana",
        destination: "/storage-space/ludhiana",
        permanent: false,
      },
      {
        source: "/self-storage-services-vadodara",
        destination: "/storage-space/vadodara",
        permanent: false,
      },
      {
        source: "/self-storage-services-ludhiana",
        destination: "/storage-space/ludhiana",
        permanent: false,
      },
      {
        source: "/business-storage-ludhiana",
        destination: "/storage-space/ludhiana",
        permanent: false,
      },
      {
        source: "/business-storage-guwahati",
        destination: "/storage-space/guwahati",
        permanent: false,
      },
      {
        source: "/affordable-storage-haridwar",
        destination: "/storage-space/haridwar",
        permanent: false,
      },
      {
        source: "/affordable-storage-vadodara",
        destination: "/storage-space/vadodara",
        permanent: false,
      },
      {
        source: "/affordable-storage-ludhiana",
        destination: "/storage-space/ludhiana",
        permanent: false,
      },
      {
        source: "/insurance-coverage-vadodara",
        destination: "/storage-space/vadodara",
        permanent: false,
      },
      {
        source: "/household-storage-ludhiana",
        destination: "/storage-space/ludhiana",
        permanent: false,
      },
      {
        source: "/self-storage-services-haridwar",
        destination: "/storage-space/haridwar",
        permanent: false,
      },
      {
        source: "/affordable-storage-bhubaneshwar",
        destination: "/storage-space/bhubaneshwar",
        permanent: false,
      },
      {
        source: "/household-storage-patna",
        destination: "/storage-space/patna",
        permanent: false,
      },
      {
        source: "/business-storage-patna",
        destination: "/storage-space/patna",
        permanent: false,
      },
      {
        source: "/doorstep-pickup-patna",
        destination: "/storage-space/patna",
        permanent: false,
      },
      {
        source: "/household-storage-haridwar",
        destination: "/storage-space/haridwar",
        permanent: false,
      },
      {
        source: "/affordable-storage-guwahati",
        destination: "/storage-space/guwahati",
        permanent: false,
      },
      {
        source: "/household-storage-guwahati",
        destination: "/storage-space/guwahati",
        permanent: false,
      },
      {
        source: "/insurance-coverage-haridwar",
        destination: "/storage-space/haridwar",
        permanent: false,
      },
     
      {
        source: "/self-storage-jaipur",
        destination: "/storage-space/jaipur",
        permanent: false,
      },
      {
        source: "/household-storage-jaipur",
        destination: "/storage-space/jaipur",
        permanent: false,
      },
      {
        source: "/affordable-storage-jaipur",
        destination: "/storage-space/jaipur",
        permanent: false,
      },
      {
        source: "/business-storage-indore",
        destination: "/storage-space/indore",
        permanent: false,
      },
      {
        source: "/self-storage-services-indore",
        destination: "/storage-space/indore",
        permanent: false,
      },
      {
        source: "/household-storage-indore",
        destination: "/storage-space/indore",
        permanent: false,
      },
      {
        source: "/insurance-coverage-indore",
        destination: "/storage-space/indore",
        permanent: false,
      },
      {
        source: "/household-storage-bhubaneshwar",
        destination: "/storage-space/bhubaneshwar",
        permanent: false,
      },
      {
        source: "/doorstep-pickup-bhubaneshwar",
        destination: "/storage-space/bhubaneshwar",
        permanent: false,
      },
      {
        source: "/business-storage-bhubaneshwar",
        destination: "/storage-space/bhubaneshwar",
        permanent: false,
      },
      {
        source: "/doorstep-pickup-indore",
        destination: "/storage-space/indore",
        permanent: false,
      },
      {
        source: "/insurance-coverage-guwahati",
        destination: "/storage-space/guwahati",
        permanent: false,
      },
      {
        source: "/doorstep-pickup-jaipur",
        destination: "/storage-space/jaipur",
        permanent: false,
      },
      {
        source: "/warehouse-rent-noida",
        destination: "/storage-space/noida",
        permanent: false,
      },
      {
        source: "/doorstep-pickup-chandigarh",
        destination: "/storage-space/chandigarh",
        permanent: false,
      },
      {
        source: "/household-storage-chandigarh",
        destination: "/storage-space/chandigarh",
        permanent: false,
      },
      {
        source: "/household-storage-ahmedabad",
        destination: "/storage-space/ahmedabad",
        permanent: false,
      },
      {
        source: "/affordable-storage-ahmedabad",
        destination: "/storage-space/ahmedabad",
        permanent: false,
      },
      {
        source: "/affordable-storage-chandigarh",
        destination: "/storage-space/chandigarh",
        permanent: false,
      },
      {
        source: "/self-storage-services-chandigarh",
        destination: "/storage-space/chandigarh",
        permanent: false,
      },

      {
        source: "/insurance-coverage-goa",
        destination: "/storage-space/goa",
        permanent: false,
      },
      {
        source: "/affordable-storage-ranchi",
        destination: "/storage-space/ranchi",
        permanent: false,
      },
      {
        source: "/business-storage-ahmedabad",
        destination: "/storage-space/ahmedabad",
        permanent: false,
      },
      {
        source: "/business-storage-panipat",
        destination: "/storage-space/panipat",
        permanent: false,
      },
      {
        source: "/affordable-storage-dehradun",
        destination: "/storage-space/dehradun",
        permanent: false,
      },
      {
        source: "/business-storage-vadodara",
        destination: "/storage-space/vadodara",
        permanent: false,
      },
      {
        source: "/doorstep-pickup-dehradun",
        destination: "/storage-space/dehradun",
        permanent: false,
      },
      {
        source: "/self-storage-services-dehradun",
        destination: "/storage-space/dehradun",
        permanent: false,
      },
      {
        source: "/doorstep-pickup-haridwar",
        destination: "/storage-space/haridwar",
        permanent: false,
      },
      {
        source: "/business-storage-jaipur",
        destination: "/storage-space/jaipur",
        permanent: false,
      },
      {
        source: "/household-storage-panipat",
        destination: "/storage-space/panipat",
        permanent: false,
      },
      // {
      //   source: '/warehouse-rent',
      //   destination: '/storage-space/ghaziabad',
      //   permanent: false,
      // },
      {
        source: "/self-storage-calcutta",
        destination: "/storage-space/kolkata",
        permanent: false,
      },
      {
        source: "/household-storage-vadodara",
        destination: "/storage-space/vadodara",
        permanent: false,
      },
      {
        source: "/business-storage-calcutta",
        destination: "/storage-space/kolkata",
        permanent: false,
      },
      {
        source: "/insurance-coverage-ahmedabad",
        destination: "/storage-space/ahmedabad",
        permanent: false,
      },
      {
        source: "/doorstep-pickup-ludhiana",
        destination: "/storage-space/ludhiana",
        permanent: false,
      },
      {
        source: "/insurance-coverage-calcutta",
        destination: "/storage-space/kolkata",
        permanent: false,
      },
      {
        source: "/business-storage-mumbai",
        destination: "/storage-space/mumbai",
        permanent: false,
      },
      {
        source: "/self-storage-patna",
        destination: "/storage-space/patna",
        permanent: false,
      },
      {
        source: "/self-storage-services-panipat",
        destination: "/storage-space/panipat",
        permanent: false,
      },
      {
        source: "/household-storage-mumbai",
        destination: "/storage-space/mumbai",
        permanent: false,
      },
      {
        source: "/affordable-storage-patna",
        destination: "/storage-space/patna",
        permanent: false,
      },
      {
        source: "/household-storage-ranchi",
        destination: "/storage-space/ranchi",
        permanent: false,
      },
      {
        source: "/affordable-storage-calcutta",
        destination: "/storage-space/kolkata",
        permanent: false,
      },
      {
        source: "/doorstep-pickup-vadodara",
        destination: "/storage-space/vadodara",
        permanent: false,
      },
      {
        source: "/affordable-storage-lucknow",
        destination: "/storage-space/lucknow",
        permanent: false,
      },
      {
        source: "/household-storage-calcutta",
        destination: "/storage-space/kolkata",
        permanent: false,
      },
      {
        source: "/insurance-coverage-panipat",
        destination: "/storage-space/panipat",
        permanent: false,
      },
      {
        source: "/self-storage-chandigarh",
        destination: "/storage-space/chandigarh",
        permanent: false,
      },
      {
        source: "/doorstep-pickup-mumbai",
        destination: "/storage-space/mumbai",
        permanent: false,
      },
      {
        source: "/insurance-coverage-jaipur",
        destination: "/storage-space/jaipur",
        permanent: false,
      },
      {
        source: "/insurance-coverage-patna",
        destination: "/storage-space/patna",
        permanent: false,
      },
      {
        source: "/household-storage-goa",
        destination: "/storage-space/goa",
        permanent: false,
      },
      {
        source: "/affordable-storage-chennai",
        destination: "/storage-space/chennai",
        permanent: false,
      },
      {
        source: "/insurance-coverage-mumbai",
        destination: "/storage-space/mumbai",
        permanent: false,
      },
      {
        source: "/business-storage-haridwar",
        destination: "/storage-space/haridwar",
        permanent: false,
      },
      {
        source: "/doorstep-pickup-calcutta",
        destination: "/storage-space/kolkata",
        permanent: false,
      },
      {
        source: "/affordable-storage-panipat",
        destination: "/storage-space/panipat",
        permanent: false,
      },
      {
        source: "/affordable-storage-chandigarh",
        destination: "/storage-space/chandigarh",
        permanent: false,
      },
      {
        source: "/insurance-coverage-chandigarh",
        destination: "/storage-space/chandigarh",
        permanent: false,
      },
      {
        source: "/self-storage-services-bhubaneshwar",
        destination: "/storage-space/bhubaneshwar",
        permanent: false,
      },
      // {
      //   source: '/services/wheels-relocation-ghaziabad',
      //   destination: '/storage-space/ghaziabad',
      //   permanent: false,
      // },
      {
        source: "/business-storage-dehradun",
        destination: "/storage-space/dehradun",
        permanent: false,
      },
      {
        source: "/doorstep-pickup-goa",
        destination: "/storage-space/goa",
        permanent: false,
      },
      {
        source: "/doorstep-pickup-lucknow",
        destination: "/storage-space/lucknow",
        permanent: false,
      },
      // {
      //   source: '/self-storage-services',
      //   destination: '/storage-space/ghaziabad',
      //   permanent: false,
      // },
      {
        source: "/business-storage-ranchi",
        destination: "/storage-space/ranchi",
        permanent: false,
      },
      {
        source: "/self-storage-services-lucknow",
        destination: "/storage-space/lucknow",
        permanent: false,
      },
      {
        source: "/business-storage-goa",
        destination: "/storage-space/goa",
        permanent: false,
      },
      {
        source: "/self-storage-services-ranchi",
        destination: "/storage-space/ranchi",
        permanent: false,
      },
      {
        source: "/doorstep-pickup-ranchi",
        destination: "/storage-space/ranchi",
        permanent: false,
      },
      {
        source: "/insurance-coverage",
        destination: "/storage-space/ranchi",
        permanent: false,
      },
      {
        source: "/insurance-coverage-ranchi",
        destination: "/storage-space/ranchi",
        permanent: false,
      },
      {
        source: "/affordable-storage-goa",
        destination: "/storage-space/goa",
        permanent: false,
      },
      {
        source: "/insurance-coverage-lucknow",
        destination: "/storage-space/lucknow",
        permanent: true,
      },
      {
        source: "/household-storage-lucknow",
        destination: "/storage-space/lucknow",
        permanent: true,
      },
      { source: "/storage-solutions", destination: "/", permanent: false },
      {
        source: "/services/new-residence-relocation",
        destination: "/",
        permanent: false,
      },
      // { source: '/services/affordable-prices-ghaziabad', destination: '/storage-space/ghaziabad', permanent: true },
      { source: "/BusinessInventory", destination: "/", permanent: false },
      { source: "/findstorage", destination: "/", permanent: false },
      { source: "/Renter", destination: "/", permanent: false },
      { source: "/household-items", destination: "/", permanent: false },
      {
        source: "/packers-and-movers-services",
        destination: "/services/packers-and-movers",
        permanent: true,
      },
      { source: "/find-storage", destination: "/", permanent: false },
      {
        source: "/gurugram",
        destination: "/storage-space/gurugram",
        permanent: true,
      },
      // { source: '/ghaziabad', destination: '/storage-space/ghaziabad', permanent: true },
      {
        source: "/faridabad",
        destination: "/storage-space/faridabad",
        permanent: true,
      },
      { source: "/host", destination: "/", permanent: false },
      { source: "/HouseholdItems", destination: "/", permanent: false },
      {
        source: "/User/Listing/CreateListing/ListNewSpace",
        destination: "/",
        permanent: false,
      },
      { source: "/Others", destination: "/", permanent: false },
      { source: "/FindStorage", destination: "/", permanent: false },
      { source: "/TermsConditions", destination: "/", permanent: false },
      {
        source: "/Noida",
        destination: "/storage-space/noida",
        permanent: true,
      },
      // { source: '/Ghaziabad', destination: '/storage-space/ghaziabad', permanent: true },

      {
        source: "/demo1/dist/authentication/sign-in/basic.html",
        destination: "/",
        permanent: false,
      },
      {
        source: "/Mumbai",
        destination: "/storage-space/mumbai",
        permanent: true,
      },
      { source: "/cancellationpolicy", destination: "/", permanent: false },
      {
        source: "/Hyderabad",
        destination: "/storage-space/hyderabad",
        permanent: true,
      },
      { source: "/FurnitureStorage", destination: "/", permanent: false },
      {
        source: "/privacypolicy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/Gurgaon",
        destination: "/storage-space/gurugram",
        permanent: true,
      },
      { source: "/terms", destination: "/", permanent: false },
      { source: "/aboutus", destination: "/about-us", permanent: false },
      { source: "/privacy", destination: "/privacy-policy", permanent: false },
      { source: "/contact", destination: "/contact-us", permanent: false },
      {
        source: "/terms_and_conditions",
        destination: "/terms-and-conditions",
        permanent: false,
      },
      {
        source: "/easy-storage",
        destination: "/store-at-a-warehouse",
        permanent: false,
      },
      {
        source: "/easy-storage",
        destination: "/store-at-a-warehouse",
        permanent: false,
      },
      {
        source: "/affordable-storage",
        destination: "/store-with-a-host",
        permanent: false,
      },
      {
        source: "/storagedetails/:path*",
        destination: "/affordable-storage",
        permanent: true,
      },
      // {
      //   source: '/blog/:path*',
      //   destination: '/blogs',
      //   permanent: false,
      // },
      {
        source: "/blogs/:path*",
        destination: "/blog",
        permanent: false,
      },
      {
        source: "/user/booking/:path*",
        destination: "/easy-storage",
        permanent: false,
      },
      {
        source: "/EasyStorage/:path*",
        destination: "/easy-storage",
        permanent: false,
      },
      {
        source: "/login-pwd/:path*",
        destination: "/login",
        permanent: false,
      },
    ];
  },
  reactStrictMode: true,
  transpilePackages: [
    "rc-util",
    "@ant-design",
    "kitchen-flow-editor",
    "@ant-design/pro-editor",
    "zustand",
    "leva",
    "antd",
    "rc-pagination",
    "rc-picker",
  ],
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "xtendedspace",
  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
  sourcemaps: {
    disable: true,
  },
});
