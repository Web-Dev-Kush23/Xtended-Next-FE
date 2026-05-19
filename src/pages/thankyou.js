import HeaderMenu from "../components/header/header";
import Footer from "../components/footer";
import sticker from "../../public/images/storagelisting/birthday.png";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function Index() {
  const params = useSearchParams()
  return (
    <>
    <HeaderMenu/>
      <div className="h-[70vh] w-full flex flex-col items-center justify-center text-center">
        <Image src={sticker} alt="image" height={50} width={50} priority/>
        <h1 className="font-bold text-3xl text-blue-900 mt-2">Thankyou!</h1>
        {params.get("type")=="feedback"?
        < h3 className="text-2xl text-blue-700 my-4"> Thank you for Rate us! We appreciate you!</h3>:
          < h3 className="text-2xl text-blue-700 my-4"> Thank you for contacting us! Our Team will contact you
        soon!</h3>}
        <a  href="/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Go To Home</a>
      </div>
      <Footer />
    </>

  )
}
