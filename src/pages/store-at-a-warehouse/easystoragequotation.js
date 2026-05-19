import { useSearchParams } from "next/navigation";

export default function PdfViewer() {
    const searchParams = useSearchParams();
    const link = searchParams.get("link");
    return(
        <>
       
      <iframe src={link} style={{height:"100vh"}} width="100%" height="100vh"></iframe>
   
        </>
    )
}