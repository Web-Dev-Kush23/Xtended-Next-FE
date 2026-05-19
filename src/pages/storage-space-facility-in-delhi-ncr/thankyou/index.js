import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

const Thankyou = () => {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/easy-storage"); 
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);


  return (
    <div className="packerWrapper">
      <section className="thanks">
        <div className="thanks-img">
          <img src="/images/thank-you.webp" alt="Thank You" />
        </div>
        <h2>Thank you for showing interest in Xtended Space!</h2>
        <p>
         We’ve received your request and our team will reach out to you shortly to discuss your storage needs.
        </p>
        <Link className="thanks-btn" href="/easy-storage">Book Space By Yourself</Link>

        <p>
          If you have any issues{" "}
          <span>
            <Link
              className="whatsapp"
              href="https://api.whatsapp.com/send?phone=919009000798&text=Hello"
            >
              Contact Us
            </Link>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Thankyou;
