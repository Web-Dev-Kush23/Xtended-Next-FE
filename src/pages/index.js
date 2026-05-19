import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";
const HomePage = dynamic(() => import("./home"));

function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Affordable Storage Solutions in Delhi NCR!</title>
        <meta
          name="keywords"
          content="storage space,storage services,storage solutions"
        />
        <meta
          name="description"
          content="Discover easy and budget-friendly storage solutions at Xtended Space. Affordable warehouse storage space in Delhi NCR. Your ideal storage partner for a clutter-free life!"
        />
      </Head>
      <HomePage />
    </>
  );
}

export default Home;
