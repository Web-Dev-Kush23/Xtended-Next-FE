import Link from "next/link";
import React, { useRef, useState, useEffect } from 'react';
import Footer from "@/components/footer";
import HeaderMenu from "@/components/header/header";
import Head from "next/head";
import { MdDoubleArrow } from "react-icons/md";
import { DecryptUserId } from "@/service/storageService"
import { localStorageManager } from "@/util/common";

export default function Home() {
  const [activeLink, setActiveLink] = useState("#1"); // Default active link
  const [userId, setUserId] = useState("")

  const handleLinkClick = (id) => {
    setActiveLink(id); // Update the active link
  };
  useEffect(() => {
    const fetchUserData = async () => {
        if (typeof window !== "undefined") {
            const queryUserId = new URLSearchParams(window.location.search).get("userId");

            if (queryUserId) {
                setUserId(queryUserId);
                try {
                    const response = await DecryptUserId(`?userId=${queryUserId}`);
                    if (response?.success) {
                        localStorageManager?.setValue("userDetails", JSON.stringify(response.success.data));
                        const userData = JSON.parse(localStorageManager?.getValue("userDetails") || "{}");
                        setUserId(userData?.userId);
                    } else {
                        console.error("Error decrypting User ID:", response?.error);
                    }
                } catch (error) {
                    console.error("Error in DecryptUser Id API call:", error);
                }
            } else {
                const userData = JSON.parse(localStorageManager?.getValue("userDetails") || "{}");
                setUserId(userData?.userId);
            }
        }
    };

    fetchUserData();
}, []);
  const links = [
    { id: "#1", label: "Key Terms" },
    { id: "#2", label: "Terms Relating to Service" },
    { id: "#3", label: "Booking and Financial Terms" },
    { id: "#4", label: "Payment Terms and Refund Policy" },
    { id: "#5", label: "Damage to Property Terms" },
    { id: "#6", label: "Risk of Personal Injury Due to Host’s Negligence" },
    { id: "#7", label: "Host and Xtended Space Cooperation" },
    { id: "#8", label: "Disclaimers" },
  ];
  const data = {
    sections: [
      {
        title: "Key Terms",
        id: "1",
        content: [
          {
            type: "paragraph",
            text: "“Xtended Space”, “we”, “us”, or “our” hereafter referred to as Xtended Space Technology Private Limited, an online platform that connects Hosts who rent Space to Renters (collectively, the “Services”)."
          },
          {
            type: "paragraph",
            text: "The terms “Service” or “Services” refer to any services we offer, including all Xtended Space web applications, mobile applications, and other software, helpdesk services, beta versions, and the website accessible at www.xtendedspace.com and its associated content (collectively, the “Site”) as well as any and all marketing channels where collective content may be disseminated in Xtended Space’s sole discretion. The terms “you” or “your” refer to the users of the Xtended Space Service."
          },
          {
            type: "paragraph",
            text: "The terms “Host” or “Hosting” refer to the person engaged in the act of storing or agreeing to store the stored items, and the act of storing or agreeing to store the stored items, respectively, in accordance with these Terms and any separate rental agreement entered into between Hosts and Renters, if any."
          },
          {
            type: "paragraph",
            text: "The terms “Renter” or “Renting” refer to the person engaging in a temporary lease of the Host’s Space, and the act of engaging in a temporary lease of the Host’s Space, respectively, in accordance with the terms of the rental agreement as described herein. The term “Space” refers to the area of the Host’s property rented or offered for rental by a Host."
          }
        ]
      },
      
      {
        title: "Terms Relating to Service",
        id: "2",
        content: [
          {
            type: "paragraph",
            text: "Xtended Space makes available a platform or marketplace with related technology for Renters and Hosts to meet online and arrange for Bookings of storage including, but not limited to, unused/partly used rooms, basements, garages, closets, sheds, storage units, parking spaces or any other Space. Xtended Space is not an owner or operator of properties, nor is it a real estate broker. Xtended Space does not own, sell, resell, furnish, provide, rent, re-rent, manage and/or control properties."
          },
          {
            type: "paragraph",
            text: "Xtended Space’s responsibilities are limited to: (i) facilitating the availability of the Site, Services and its platform, and (ii) serving as the limited agent of each Host for the purpose of accepting payments from Renters on behalf of the Host and, in limited circumstances, to assist in remedying a Renter's Default."
          }
        ]
      },
      {
        title: "Eligibility",
        id: "eligibility",
        content: [
          {
            type: "paragraph",
            text: "You may view Listings as an unregistered visitor to the Site; however, if you wish to book a Space or create a Listing, you must first become a Member by registering to create a Xtended Space Account (defined below). Both unregistered visitors and Members agree to be bound by all of the terms and conditions set forth herein."
          },
          {
            type: "paragraph",
            text: "The Site is intended solely for persons who are 18 years of age or older. Any access to or use of the Site or Services by anyone under 18 years of age is expressly prohibited. By accessing or using the Site or Services, you confirm that you are 18 years of age or older."
          }
        ]
      },
      {
        title: "Non-discrimination Policy",
        id: "non-discrimination",
        content: [
          {
            type: "paragraph",
            text: "Xtended Space is, at its core, an open community dedicated to connecting people to improve storage accessibility. Xtended Space welcomes and services an incredibly diverse community, drawing together individuals of different cultures, values, and norms. To remain a Member, you are required to comply with all Applicable Laws, whether federal, state, or local, including those relating to diversity and non-discrimination. In addition, Members must comply with the following requirements:"
          },
          {
            type: "list",
            "items": [
              "Xtended Space HOSTS MAY NOT:",
              "Decline a Renter based on race, color, ethnicity, national origin, religion, sexual orientation, gender identity, or marital status.",
              "Impose any different terms or conditions based on race, color, ethnicity, national origin, religion, sexual orientation, gender identity, or marital status.",
              "Post any listing or make any statement that discourages or indicates a preference for or against any Renter on account of race, color, ethnicity, national origin, religion, sexual orientation, gender identity, or marital status.",
              "Decline to store a Renter’s items based on gender unless the Host shares living spaces (for example, bathroom, kitchen, or common areas) with the Renter.",
              "Impose any different terms or conditions based on gender unless the Host shares living spaces with the Renter.",
              "Post any Listing or make any statement that discourages or indicates a preference for or against any Renter on account of gender, unless the Host shares living spaces with the Renter.",
              "Decline a Renter based on any actual or perceived disability.",
              "Impose any different terms or conditions based on the fact that the Renter has a disability.",
              "Substitute their own judgment about whether a unit meets the needs of a Renter with a disability for that of the prospective Renter.",
              "Inquire about the existence or severity of a Renter’s disability, or the means used to accommodate any disability. If, however, a potential Renter raises its disability, a Host may, and should, discuss with the potential Renter whether the Listing meets the potential Renter’s needs.",
              "Prohibit or limit the use of mobility devices.",
              "Charge more in storage fees or other fees for Renters with disabilities.",
              "Post any listing or make any statement that discourages or indicates a preference for or against any Renter on account of the fact that the Renter has a disability.",
              "Refuse to communicate with Renters through accessible means that are available, including relay operators (for people with hearing impairments) and e-mail (for people with vision impairments using screen readers).",
              "Refuse to provide reasonable accommodations, including flexibility when Renters with disabilities request modest changes in your house rules, such as bringing an assistance animal that is necessary because of the disability, or using an available parking space near the unit. When a Renter requests such an accommodation, the Host and the Renter should engage in a dialogue to explore mutually agreeable ways to ensure the unit meets the Renter’s needs."
            ]
          }
        ]
      },
      {
        title: "Booking and Financial Terms",
        id: "3",
        content: [
          {
            type: "subheading",
            text: "1. Hosts"
          },
          {
            type: "paragraph",
            text: "If you are a Host and a Booking is requested for your Space via the Site or Services, you will be required to either approve or decline the Booking within 24 hours of when the Booking is requested (as determined by Xtended Space in its sole discretion) or the Booking request will be automatically declined."
          },
          {
            type: "paragraph",
            text: "When a Booking is requested via the Site or Services, we will share with you (i) the last name of the Renter who has requested the Booking, (ii) a disclosure of the items that the Renter wishes to store, and (iii) the start and end dates of the requested Booking period (as determined by Xtended Space in its sole discretion)."
          },
          {
            type: "paragraph",
            text: "When you confirm a Booking requested by a Renter, Xtended Space will send you an email or text message or other method of notification confirming such Booking, depending on the selections you make via the Site and Services."
          },
          {
            type: "paragraph",
            text: "The fees displayed in each Listing are comprised of the Space Fees (defined below), the Service Fees (defined below), and the Platform Fees (defined below)."
          },
          {
            type: "paragraph",
            text: "Where applicable, taxes may be charged in addition to the Space Fees, Service Fees, and Platform Fees. The Space Fees, the Service Fees, the Platform Fees and applicable taxes are collectively referred to in these Terms as the 'Total Fees'."
          },
          {
            type: "paragraph",
            text: "The amounts due and payable by a Renter solely relating to a Host's Space are the 'Space Fees'. Please note that it is the Host and not Xtended Space, which determines the Space Fees. Space Fees may also include applicable taxes."
          },
          {
            type: "paragraph",
            text: "The Host will be responsible for paying the Platform Fees in full. You authorize Xtended Space to deduct a sum from the Space Fees to cover the Platform Fees. You also authorize Xtended Space to deduct a sum from the Space Fee or bill your account in the event of damage or theft of Stored Items as contemplated under 'Damage to Stored Items' and 'Theft of Stored Items' below, if applicable."
          },
            {
              "type": "subheading",
              "text": "Billing Policy"
            },
            {
              "type": "paragraph",
              "text": "XtendedSpace will charge users only for the actual space utilized at the Host’s property. The billing will follow the rates pre-determined with the Host during the property onboarding process."
            },
            {
              "type": "subheading",
              "text": "No Leasing Agreement"
            },
            {
              "type": "paragraph",
              "text": "XtendedSpace will not lease or sublease the listed property. The ownership and control of the property will remain solely with the Host."
            },
            {
              "type": "subheading",
              "text": "Shared Usage Model"
            },
            {
              "type": "paragraph",
              "text": "All properties listed on XtendedSpace will operate on a sharing model, enabling multiple users to utilize the space as required."
            },
            {
              "type": "subheading",
              "text": "Space Utilization Review"
            },
            {
              "type": "paragraph",
              "text": "The space utilization will be regularly reviewed to ensure accurate billing and compliance with agreed terms. Any discrepancies will be resolved amicably."
            },
            {
              "type": "subheading",
              "text": "Host's Obligation"
            },
            {
              "type": "paragraph",
              "text": "The Host is responsible for maintaining the property in a usable and secure condition as agreed upon during onboarding."
            },
          {
            type: "subheading",
            text: "2. Renters"
          },
          {
            type: "paragraph",
            text: "You agree to pay Xtended Space the Total Fees for any Booking requested in connection with your Xtended Space Account if the applicable Host confirms such requested Bookings. In order to establish a Booking pending the applicable Host's confirmation of your requested Booking, you understand and agree that Xtended Space, on behalf of the Host, reserves the right, in its sole discretion, to (i) obtain a pre-authorization via your payment method for the Total Fees or (ii) charge your payment method a nominal amount, not to exceed INR 1, to verify you."
          },
          {
            type: "paragraph",
            text: "Once Xtended Space receives confirmation of your Booking from the applicable Host, Xtended Space will collect the Total Fees in accordance with these Terms and the pricing terms set forth in the applicable Listing. You also authorize Xtended Space to collect additional fees in the event of damage to the Host's property or Space or Renter default as contemplated under 'Damage to Host's Property or Space' and 'Renter Default' below, if applicable."
          },
          {
            type: "paragraph",
            text: "Please note that Xtended Space cannot control any fees that may be charged to a Renter by its bank related to Xtended Space's collection of the Total Fees, and Xtended Space disclaims all liability in this regard."
          },
          {
            type: "paragraph",
            text: "You agree to disclose the items you wish to store upon requesting a Booking. You further agree to disclose the name and contact information of any person or entity that has a lien or other security interest in the items you wish to store. If you wish to store additional items or remove items after completing a Booking, you agree to disclose those changes via the Site or Services, including changes related to any person or entity holding a lien or other security interest in the Stored Items ."
          },
          {
            type: "paragraph",
            text: "You acknowledge and agree that both Xtended Space and the Host are not liable for undisclosed items and you accept liability for any damages caused to the Host's space or property by any undisclosed items."
          },
          {
            type: "paragraph",
            text: "In connection with your requested Booking, you will be asked to provide customary billing information such as name, billing address and payment information either to Xtended Space or its third party payment processor. You agree to pay Xtended Space for any Bookings made in connection with your Xtended Space Account in accordance with these Terms by one of the methods described on the Site or Services. You hereby authorize the collection of such amounts by charging the payment method provided as part of requesting the Booking, either directly by Xtended Space or indirectly, via a third party online payment processor or by one of the payment methods described on the Site or Services. You also authorize Xtended Space to charge your payment method in the event of damage caused at a Space as contemplated under 'Damage to Space' below, if applicable. If you are directed to Xtended Space's third party payment processor, you may be subject to terms and conditions governing use of that third party's service and that third party's personal information collection practices. Please review such terms and conditions and privacy policy before using such services. Once your Booking transaction is complete, you will receive a confirmation email summarizing your Booking."
          },
          {
            type: "subheading",
            text: "3. Renter Access to Space"
          },
          {
            type: "paragraph",
            text: "In the Listing the Host agrees to provide the times that the Renter may access Stored Items. In some cases, Host may provide Renter with means for unlimited access. Renter must contact Host at least 24 hours in advance to request access unless otherwise specified in written agreement between the Host and Renter. Unless otherwise noted in the Listing, the Host must provide reasonable access to the Space upon request from the Renter and communicate with the Renter in a timely manner."
          },
          {
            type: "paragraph",
            text: "The Host is not required to transport or otherwise handle the Stored Items. If a Host transports or handles the Stored Items, the Host does so at its own risk. Renters should not leave keys to their vehicle/storage items with the Host. If keys to a Renter's vehicle are provided to the Host, the Renter does so at its own risk."
          },
          {
            type: "subheading",
            text: "4. Space Move-Out Duties"
          },
          {
            type: "paragraph",
            text: "At or before the end of the Booking period for the Space, Renter must vacate the Space completely. Renter must remove all contents and debris. Renter must leave the Space in good 'broom clean' condition. Renter may be subject to additional costs and fees as detailed in the Collection section below if Renter fails to leave the Space in good condition. Except as otherwise detailed in these Terms, once the Renter has removed all Stored Items and left the Space in the condition required, and its Booking has been cancelled, Renter no longer has any right to access or take possession of the Space. The Renter can also avail such services available on Xtended storage via Site or Services. Xtended Space is just a facilitator and not responsible otherwise."
          },
          {
            type: "subheading",
            text: "5. Host Space Fee Collection"
          },
          {
            type: "paragraph",
            text: "Hosts acknowledge that Space Fees will be directly deposited into their bank accounts, net of Service Fees, Platform Fees and Taxes. Furthermore, Hosts acknowledge that they are required to provide correct bank account information in order to receive payment. and filing any applicable state or parking or storages related taxes or government taxes. Xtended Space is neither responsible nor liable for notifying, collecting or paying any such taxes."
          },
          {
            type: "paragraph",
            text: "Hosts agree to never insist, ask, or insinuate to a Renter that he or she pay any or all of the Space Fees directly to Host, and Host agrees to never accept payment made directly to Host with a check, cash, or any payment method other than by payment through Xtended Space. Renters also agree to never ask a Host to receive any or all of the Space Fees directly, and Renter agrees to never make payment directly to Host. If a Host or Renter violates this prohibition, Xtended Space may immediately cancel the Host or Renter's account, they will remain liable for the Space Fees, and they authorize Xtended Space to deduct a sum from the Space Fee or bill their account for INR 3,000 to partially compensate for administrative costs and not as a penalty and such deduction shall not limit Xtended Space from pursuing any other remedy to which it is entitled hereunder or pursuant to Applicable Law. Any dispute and/or litigation between Renters and Hosts regarding direct payments in violation of this section shall be between Hosts and Renters exclusively and shall not name Xtended Space."
          },
          {
            type: "subheading",
            text: "6. Fees"
          },
          {
            type: "paragraph",
            text: "Xtended Space charges a fee to Renters based upon a percentage of applicable Space Fees, which are referred to herein as 'Service Fees'. The standard Service Fee is set forth in the documentation communicated to Renters at the time they receive a confirmed Booking and may change from time to time after notice to Renters. The Service Fees are added to the Space Fees to calculate the Total Fees. Except as otherwise provided herein, Service Fees are non-refundable."
          },
          {
            type: "paragraph",
            text: "Platform Fees are to cover the merchant services and direct deposit or other processing charges that Xtended Space uses to process payments."
          },
          {
            type: "paragraph",
            text: "Xtended Space will collect from Renter the Total Fees at the time of Booking confirmation (i.e. when the Host confirms the Booking within 24 hours of the Booking request). Additional fees may be charged for Renter’s delayed removal of Stored Items."
          },
          {
            type: "paragraph",
            text: "Xtended Space will collect Total Fees and initiate payment of Space Fees net of Platform Fees, taxes to Host at the end of the applicable rental period (i.e., each month). By placing a reservation through the Services, a Renter agrees that all charges processed through this Site are deemed in accordance with these Terms. Notwithstanding the foregoing, Renter may dispute any charges for a period of thirty (30) days after a charge is made. Any such dispute must be in writing. If a Renter does not dispute a charge within thirty (30) days, said Renter waives any argument that a charge was made in error or in violation of these Terms. Renter must clearly and convincingly prove that any disputed charge is in error or otherwise in violation of these Terms. If Xtended Space or a Host continue to challenge a timely disputed charge, a Renter may seek available legal remedies pursuant to the Arbitration section below."
          },
          // {
          //   type: "subheading",
          //   text: "7. Cancellations and Refunds"
          // },
          // {
          //   type: "paragraph",
          //   text: "In order to prevent future charges, it is the responsibility of the renter to cancel a reservation. Renters must visit their Rentals page to cancel their Booking."
          // },
          // {
          //   type: "paragraph",
          //   text: "In addition, the following provisions apply to cancellation by a Renter before start date:"
          // },
          // {
          //   type: "table",
          //   headers: ["Cancellation Terms", "Rental Refund", "Service Fees Refund"],
          //   rows: [
          //     ["Within 24 hours of payment by Renter", "100%", "70%"],
          //     ["72 hours before Start date", "100%", "0%"],
          //     ["24 hours before Start date", "70%", "0%"]
          //   ]
          // },
          // {
          //   type: "paragraph",
          //   text: "If the renter wants to cancel after start date, following provisions will apply:"
          // },
          // {
          //   type: "subheading",
          //   text: "In case booking is more than or equal to 30 days"
          // },
          // {
          //   type: "table",
          //   headers: ["Cancellation Terms", "Penalty Charges", "Service Fees Refund"],
          //   rows: [
          //     ["No Notice or Less than 15 days Notice", "Next 30 days rental", "0%"],
          //     ["Short Notice (15-30 days)", "Next 15 days rental", "0%"],
          //     ["30 days Notice", "0%", "0%"]
          //   ]
          // },
          // {
          //   type: "subheading",
          //   text: "In case booking is for less than 30 days:"
          // },
          // {
          //   type: "paragraph",
          //   text: "No refund of rental paid and service charges."
          // },
          // {
          //   type: "paragraph",
          //   text: "The cancellation request has to be submitted on the portal with date of eviction."
          // },
          // {
          //   type: "list",
          //   items: [
          //     "Goods to be removed on or before the day of eviction. Penalty of Rs 1,000/- per day if not removed in next 24 hours from the eviction date.",
          //     "Xtended Space will not be responsible for any liability and damage to goods after the date of eviction, and it would be treated as Renter's default.",
          //     "The Balance Payment (Post Adjusting above penalties, rentals, or any other charges) if any, will be refunded only after successful removal of goods and cancellation request being approved on the portal.",
          //     "Xtended Space will be at sole discretion to decide the charges, waiver and party at default.",
          //     "Cancellation policy of third party shall apply in case of Packaging, delivery or any other ancillary services opted."
          //   ]
          // },
          // {
          //   type: "subheading",
          //   text: "Host Cancellation"
          // },
          // {
          //   type: "paragraph",
          //   text: "When hosts receive a reservation request, they can decline the request or cancel anytime before the start date with the following provisions:"
          // },
          // {
          //   type: "table",
          //   headers: ["Cancellation Terms", "Rental Refund (Renter)", "Service Fees Refund", "Penalty for Host"],
          //   rows: [
          //     ["Within 24 hours of start Date", "100%", "100%", "15 days of rental income"],
          //     ["72 hours before the start Date", "100%", "100%", "Nil"],
          //     ["24 hours before the start Date", "100%", "100%", "10 days of rental income"]
          //   ]
          // },
          // {
          //   type: "paragraph",
          //   text: "Hosts who repeatedly cancel bookings, avoid paying additional charges, penalties, may result in removal from the Xtended Space Community and suspension of use of the Site and Services."
          // },
          // {
          //   type: "paragraph",
          //   text: "If the host wants to cancel after Start date, following provisions will apply:"
          // },
          // {
          //   type: "table",
          //   headers: ["Cancellation Terms", "Penalty charges (Host)"],
          //   rows: [
          //     ["No notice or Less than 30 days Notice", "30 days of rental income"],
          //     ["30 days Notice", "Nil"]
          //   ]
          // },
          // {
          //   type: "subheading",
          //   text: "In case booking is for less than 30 days:"
          // },
          // {
          //   type: "paragraph",
          //   text: "Full tenure Penalty charges on the host and refund of rental along with service charges to the renter."
          // },
          // {
          //   type: "paragraph",
          //   text: "If the Host proves the negligence or found Renter's Default, the payment will be forfeited by XtendedSpace and not to be refunded to the renter."
          // },
          // {
          //   type: "paragraph",
          //   text: "Xtended Space will be at sole discretion to decide the charges, waiver and party at default."
          // },
          // {
          //   type: "paragraph",
          //   text: "The cancellation request has to be submitted on the portal with date of eviction."
          // },
          // {
          //   type: "paragraph",
          //   text: "Renter needs to take custody of goods back on or before the date of eviction, otherwise penalty provisions in case of eviction by renter detailed above will apply."
          // },
          // {
          //   type: "paragraph",
          //   text: "In case host wants Xtended Space support for eviction of goods, the Host needs to pay Rs 3000 (Apart from above charges)."
          // },
          {
            type: "subheading",
            text: "7. Taxes"
          },
          {
            type: "paragraph",
            text: "You understand and agree that you are solely responsible for determining your applicable tax reporting requirements in consultation with your tax advisors. Xtended Space cannot and does not offer tax-related advice to any Members of the Site and Services. Additionally, please note that each Host is responsible for determining local indirect taxes and for including any applicable taxes to be collected or obligations relating to applicable taxes in Listings."
          },
          {
            type: "subheading",
            text: "8. Contractual Lien"
          },
          {
            type: "paragraph",
            text: "Any Renter accessing the Site, utilizing the Services, and completing any Booking for a Listing to place Stored Items in a Space, agrees and consents to the creation of a lien on the Stored Items and any other personal property stored in the Space in favor of Xtended Space and the applicable Host ('Lien'). The Lien attaches to the Stored Items and all personal property stored in the Space the moment you place or otherwise move the Stored Items and said personal property to the Space and stays attached to the Stored Items and all personal property stored at the Space until the Booking is terminated, and Renter has fully paid the Total Fees and any other fees associated with the Booking. You acknowledge that the purpose of this Lien is to secure payment of all debts associated with the Booking and the storage of Stored Items and all personal property in the Space, including but not limited to the Total Fees."
          },
          {
            type: "paragraph",
            text: "Xtended Space may, in its sole discretion, enforce the Lien by taking any action listed in the Xtended Space's Remedies section below."
          }
        ]
      },
      {
        title: "Payment Terms and Refund Policy",
        id: "4",
        content: [
          {
            type: "subheading",
            text: "For Storage - Payment Terms"
          },
          {
            type: "list",
            items: [
              "Rs 1000 will be paid as booking amount and will be taken by sales.",
              "If availing Logistics, complete logistics payment as mentioned in quotation will be taken by ops team (one day prior) for confirmation of movement.",
              "On transaction day, actual storage rental payment would be taken by ops team. Also increased logistics would be taken (if any)."
            ]
          },
          {
            type: "subheading",
            text: "For Storage - Cancellation and Refund Policy"
          },
          {
            type: "list",
            items: [
              "With regard to the logistics or any other services provided, customer is not eligible for refund in case of any changes made less than 24 hours prior to the scheduled date.",
              "If the team reaches the customer location and customer cancels the transaction, in that case logistics amount would not be refunded."
            ]
          },
          {
            type: "subheading",
            text: "For Relocation / Packers and Movers - Payment Terms"
          },
          {
            type: "list",
            items: [
              "Rs 1000 will be paid as booking amount.",
              "60% payment collection one day prior for confirmation of transaction.",
              "Remaining payment will be collected at drop location before unloading of goods."
            ]
          },
          {
            type: "subheading",
            text: "For Relocation / Packers and Movers - Cancellation and Refund Policy"
          },
          {
            type: "list",
            items: [
              "With regard to the logistics or any other services provided, customer is not eligible for refund in case of any changes made less than 24 hours prior to the scheduled date.",
              "If the team reaches the customer location and customer cancels the transaction, in that case logistics amount would not be refunded."
            ]
          }
        ]
      }
      
    ]
  }
  
const additionalContent = {
  sections: [
    {
      title: "Damage to Property Terms",
      id: "5",
      content: [
        {
          type: "paragraph",
          text: "Renters and Hosts are solely responsible for the contractual relationship between them, if any, outside of these Terms, and they agree not to involve Xtended Space in any dispute between them, except as these Terms expressly require Xtended Space to be involved."
        },
        {
          type: "paragraph",
          text: "In addition, they are responsible to provide their own insurance to cover damages that may occur to the Host’s property or to the Stored Items the Renter stores with the Host."
        },
        {
          type: "subheading",
          text: "Theft of Stored Items"
        },
        {
          type: "paragraph",
          text: "After a formal claim is submitted by the Renter to Xtended Space with a copy of a filed police report, the Host agrees to compensate the Renter for lost or stolen Stored Items, unless a (i) police report is filed and the police determine that there is evidence of forcible or unlawful entry into the Host’s Space; or (ii) the Renter is found to have made unauthorized visits to the Space or unauthorized changes to the Stored Items, resulting in lost or stolen items. Except in the above outlined cases, the Host authorizes Xtended Space to determine the amount to be charged to the Host, if any, except in cases exceeding Ten thousand rupees (INR 10,000) in damages (as determined by Xtended Space), which will then be determined by professional arbitration (see “Arbitration” below) between the Host and Renter. The Host agrees to pay associated arbitration fees in the event of lost or stolen Stored Items except in the cases outlined above."
        },
        {
          type: "subheading",
          text: "No Endorsement"
        },
        {
          type: "paragraph",
          text: "Xtended Space does not endorse any Members or any Space. You are responsible for determining the suitability of others who you contact or contact you via the Site and Services. Xtended Space will not be responsible for any damage or harm resulting from your interactions with other Members."
        },
        {
          type: "paragraph",
          text: "By using the Site or Services, you agree that any legal remedy or liability that you seek to obtain for actions or omissions of other Members or other third parties will be limited to a claim against the particular Members or other third parties who caused you harm and you agree not to attempt to impose liability on, or seek any legal remedy from Xtended Space with respect to such actions or omissions. Accordingly, we encourage you to communicate directly with other Members on the Site and/or Services regarding any Bookings or Listings made by you."
        },
        {
          type: "subheading",
          text: "Use of Space and Prohibited Items"
        },
        {
          type: "paragraph",
          text: "RENTER AGREES NOT TO USE THE SPACE FOR ANY UNLAWFUL PURPOSE. THE SPACE IS TO BE USED BY RENTER ONLY FOR STORAGE OF PERSONAL PROPERTY. USE OF THE SPACE FOR ANY PURPOSE OTHER THAN FOR LAWFUL STORAGE OF PERSONAL ITEMS IS EXPRESSLY PROHIBITED. STORAGE OF THE FOLLOWING ITEMS IS EXPRESSLY PROHIBITED (EACH IS A “PROHIBITED ITEM”):"
        },
        {
          type: "list",
          items: [
            "explosives, fuel, hazardous or flammable materials",
            "pesticides or other toxic chemicals",
            "waste of any kind",
            "firearms or ammunition",
            "drugs or any illegal substances or goods",
            "stolen goods or other contraband",
            "perishable food items, spoiled food, living or deceased animals, infested items, or moldy items",
            "any item that emits fumes or a strong odor",
            "any other items specifically identified by the host on the listing as expressly prohibited",
            "any other items, the possession, usage, transport or storage of which may violate in any way applicable laws, rules, or regulations",
            "in addition to the above, smoking in or around the space is expressly prohibited. living or working by renter in or around the space, including but not limited to, performing maintenance or work on any stored items (i.e. vehicles) is expressly prohibited. renters may not mail items to the rented space, or use the rented space as renter's mailing address."
          ]
        },
        {
          type: "paragraph",
          text: "Upon breach , or Host’s reasonable suspicion of breach, of these Terms, the Renter agrees that the Host has the right to immediately terminate the Booking and to ask Renter to remove the Stored Items from the Host’s premises. Host shall provide reasonable notice and opportunity for Renter to cure such breach or otherwise remove such Stored Items. If Renter does not cure its breach or remove such Stored Items upon reasonable notice and opportunity to cure, Host may take all legally permissible actions, in its reasonable discretion, which actions may include, without limitation, forfeiture and disposal of the Stored Items pursuant to applicable law and the provisions of these Terms. Host may also contact law enforcement or other authorities to report illegal activities of Renter. If Host reasonably suspects the storage of items in breach of the above prohibitions, or other illegal activities, the Renter hereby gives permission for authorities to search the Stored Items without a warrant. Renter agrees to release, indemnify, and hold Host and Xtended Space harmless from and against any and all liability arising from or relating to the removal or forfeiture of stored property pursuant to these Terms, or the Renter’s breach, including any allegations or investigations relating thereto. Xtended Space shall forfeit all Space Fees and Service Fees and Platform Fees paid up to the date of termination hereunder."
        },
      ]},
        {
          
          title: "Risk of Personal Injury Due to Host’s Negligence",
          id: "6",
          content: [
       
        {
          type: "paragraph",
          text: "Renter agrees that the use of the Space is at Renter’s sole risk. Renter agrees that, without limiting any duties of the Host to take reasonable steps to protect Stored Items, Host shall have no liability to Renter or Renter’s invitees for any personal or bodily injury except in the event of Host’s gross negligence or willful misconduct. Renter hereby waives and disclaims any and all claims or causes of action Renter may have against Host, in the event of personal or bodily injury to Renter or Renter’s invitees, except as a result of Host’s gross negligence or willful misconduct."
        },
        {
          type: "subheading",
          text: "Host Rules"
        },
        {
          type: "paragraph",
          text: "The Renter, Renter’s employees, agent, family, guests and other invitees agree to comply with Host’s rules and policies and any other rules which are contained in the Listing or otherwise agreed to by Renter. Failure to comply with such rules may result in (i) the Renter being held in Default (as described in the Section “Default by Renter” below) and (ii) the Renter being held liable for damages to the Host’s property or Space."
        },
        {
          type: "subheading",
          text: "Default by Host"
        },
        {
          type: "paragraph",
          text: "In addition to the other rights and remedies detailed in these Terms, if Xtended Space determines, in its sole discretion, that a Host has or is reasonably believed to have violated these Terms, Xtended Space may halt or withhold payouts to such Host until such time that (a) Host has cured the default, or (b) it is determined by clear and convincing evidence that Host was not in violation of these Terms. Xtended Space shall give written notice to a Host of an actual or perceived violation of these Terms ('Violation Notice'). Xtended Space and Host agree to cooperate and work together in good faith to resolve any such dispute for a period of at least sixty (60) days after the Violation Notice ('Dispute Period'). A Host shall not bring any legal proceeding or enforcement of these Terms under the Arbitration section below until the Dispute Period."
        },
        {
          type: "subheading",
          text: "Default by Renter"
        },
        {
          type: "paragraph",
          text: "Renter will be in “Default” if:"
        },
        {
          type: "list",
          items: [
            "Renter has failed to pay any sum due under the Listing, or",
            "Renter has failed to notify Host and Xtended Space of a change in Renter’s address, e-mail address, or phone number as required in these terms; or",
            "Renter has provided false or incorrect information to Host or to Xtended Space;",
            "Renter has failed to vacate the Space by:",
            {
              type: "list",
              items: [
                "the end of its Booking period,",
                "the date on which Renter is to vacate as required by the Host, or",
                "the date on which Renter and Host have agreed Renter will vacate the Space;"
              ]
            },
            "Renter has failed to comply, or upon reasonable suspicion has failed to comply with any other provision of these Terms, or any supplemental rules in the Listing or provided by Host;",
            "Renter has violated, or upon reasonable suspicion has violated health, safety or criminal laws on the Host’s property, regardless of whether arrest or conviction has occurred. Failure of Xtended Space or Host to enforce any of these Terms shall not constitute waiver of such Term(s)."
          ]
        },
        {
          type: "subheading",
          text: "Xtended Space's Remedies"
        },
        {
          type: "paragraph",
          text: "If Renter is in Default, Xtended Space shall take reasonable steps to notify Renter of such Default and provide Renter a reasonable opportunity to cure such Default. If Renter fails to cure such Default, after receiving such notice and opportunity to cure, Xtended Space may, in addition to any other remedies it may have at law or in equity, exercise one or more of the following remedies:"
        },
        {
          type: "list",
          items: [
            "A. Deny Renter access to the Space or Renter’s property until such default is cured;",
            "B. Terminate Renter’s Booking with an immediate notice to vacate; and if Renter fails to vacate and Xtended Space files an eviction lawsuit, Renter will pay Xtended Space’s attorneys’ fees and court costs plus a reasonable judicial eviction charge for Xtended Space’s time, inconvenience, and overhead for filing the eviction suit;",
            "C. Collect charges as appropriate and exercise any other remedy allowed by law;",
            "D. Enforce any lien, whether such lien is statutory or contractual, including the Lien described herein, held by Host or Xtended Space by seizure and disposal (including but not limited to a sale) of all Stored Items in the Space, pursuant to these Terms, or applicable laws, rules, and regulations, by nonjudicial foreclosure under the Host's local and state codes, when a Renter has failed to comply with notice from Host to vacate the space after 60 days or any other period prescribed by applicable law. If the Stored Items include one or more vehicles, Renter hereby agrees that Host may, pursuant to applicable laws, rules, and regulations, (i) sell such vehicle, or (ii) tow such vehicles or have such vehicles towed by a third party chosen in Xtended Space's sole discretion off of Host’s property. Sale of the Stored Items in the Space may be accomplished using an online storage auction, and Renter waives any claims, statutory or otherwise, arising out of any allegation that the online storage auction was contrary to any statutory or common law provision related to disposition of the Stored Items.",
            "E. After seizure, any attempt to reclaim the seized property by Renter without paying in full the sums due Host, including applicable fees, may result in Host pursuing prosecution for such act."
          ]
        }
      ]
    }
  ]
}
const lastdata = {
  sections: [
    {
      title: "Host and Xtended Space Cooperation",
      id: "7",
      content: [
        {
          type: "paragraph",
          text: "In the event of a Default by a Renter, the Host may not communicate with the Renter or take any action other than to restrict access to the Space. Host must cooperate with Xtended Space in any eviction, sale, auction, or other proceeding against a Renter and must provide requested information (e.g., photos of the items) to Xtended Space in a timely manner upon request. The Host must also provide access to the Space as requested by Xtended Space for the new owner of any contents that have been auctioned to a third party. If the Host fails to comply with these requirements and the failure continues after notice from Xtended Space, Host shall be responsible for any eviction, and Xtended Space’s obligation with respect to the other things to Host shall be void."
        }
      ]
    },
    {
      title: "Eviction",
      id: "",
      content: [
        {
          type: "paragraph",
          text: "Xtended Space may choose to evict the Renter in cases of “default” as described above in “Default by Renter”. If Xtended Space chooses to evict a Renter, Xtended Space may follow the procedure as outlined in “Xtended Space’s Remedies” above and may charge a Rs 3000 eviction fee once Renter fails to cure."
        }
      ]
    },
    {
      title: "Collection",
      id: "",
      content: [
        {
          type: "paragraph",
          text: "If Renter fails to make any applicable payment hereunder, or such payment is denied, returned, refunded, charged-back or invalidated, Xtended Space may impose and charge a fee of Rs 2000 for each such failed payment and, in addition to such fee, interest will accrue on all such failed and late amounts at a rate of 18% per annum until paid in full (1.5% per month). Xtended Space may, in its sole discretion and in accordance with applicable law, refer any collection efforts, including efforts resulting from a violation of the Terms, to a third-party collection agency."
        },
        {
          type: "paragraph",
          text: "In the event of any collection efforts, proceedings or suits related to the collection of any unpaid balance, the Renter further agrees to pay all other (a) costs of collection, (b) costs of removal or disposal of Stored Items, (c) costs of cleaning to restore the Space to its original condition, (d) costs to repair damages made to the Space, (e) court costs and reasonable attorney fees and (f) fees associated with a third-party collection agency, in addition to, the collection fee. The terms of this paragraph shall apply to all amount(s) incurred by Xtended Space."
        },
        {
          type: "paragraph",
          text: "Renter has provided Xtended Space certain contact information, including, but not limited to a cell phone number and email address. Renter hereby gives its express consent to Xtended Space and its affiliates, agents and service providers to use written, electronic or verbal means to contact Renter. This consent includes, but is not limited to, contact by manual calling methods, pre-recorded or artificial voice messages, text messages, emails and/or automatic telephone dialing systems about current or future services available to Renter. Renter may revoke its consent to Xtended Space to contact Renter by any of the above-described methods or otherwise restrict permissions as provided in this form by contacting Xtended Space by email at support@XtendedSpace.com."
        }
      ]
    },
    {
      title: "User  Liability",
      id: "",
      content: [
        {
          type: "paragraph",
          text: "YOU UNDERSTAND AND AGREE THAT YOU ARE SOLELY RESPONSIBLE FOR COMPLIANCE WITH ANY AND ALL LAWS, RULES, REGULATIONS, AND TAX OBLIGATIONS THAT MAY APPLY TO YOUR USE OF THE SITE, SERVICES AND CONTENT."
        },
        {
          type: "subheading",
          text: "In connection with your use of our Site and Services, you may not and you agree that you will not:"
        },
        {
          type: "list",
          items: [
            "Violate any local, state, provincial, national, or other law or regulation, or any order of a court, including, without limitation, zoning restrictions and tax regulations;",
            "Use manual or automated software, devices, scripts robots, other means or processes to access, “scrape”, “crawl” or “spider” any web pages or other services contained in the Site, Services or Content;",
            "Use the Site or Services for any commercial or other purposes that are not expressly permitted by these Terms;",
            "Copy, store or otherwise access any information contained on the Site, Services or Content for purposes not expressly permitted by these Terms;",
            "Infringe the rights of any person or entity, including without limitation, its intellectual property, privacy, publicity or contractual rights;",
            "Interfere with or damage our Site or Services, including, without limitation, through the use of viruses, cancel bots, Trojan horses, harmful code, flood pings, denial-of-service attacks, packet or IP spoofing, forged routing or electronic mail address information or similar methods or technology;",
            "Use our Site or Services to transmit, distribute, post or submit any information concerning any other person or entity, including without limitation, photographs of others without its permission, personal contact information or credit, debit, calling card or account numbers;",
            "Use our Site or Services in connection with the distribution of unsolicited commercial email (“spam”) or advertisements;",
            "“Stalk” or harass any other user of our Site, or Services or collect or store any personally identifiable information about any other user other than for purposes of transacting as a Xtended Space Renter or Host;",
            "Offer, as a Host, any Space that you do not yourself own or have permission to rent (without limiting the foregoing, you will not list Space as a Host if you are serving in the capacity of a rental agent or listing agent for a third party);",
            "Offer, as a Host, any accommodation that may not be rented or subleased pursuant to the terms and conditions of an agreement with a third party, including, but not limited to, a property rental agreement;",
            "Register for more than one Xtended Space Account or register for a Xtended Space Account on behalf of an individual other than yourself;",
            "Contact a Host for any purpose other than asking a question related to a Booking, such Host’s Space or Listings;",
            "Contact a Renter for any purpose other than asking a question related to a Booking or such Renter’s use of the Site and/or Services;",
            "When acting as a Renter or otherwise, recruit or otherwise solicit any Host or other Member to join third party services or websites that are competitive to Xtended Space, without Xtended Space’s prior written approval;",
            "Impersonate any person or entity, or falsify or otherwise misrepresent yourself or your affiliation with any person or entity;",
            "Use automated scripts to collect information or otherwise interact with the Site or Services;",
            "Use the Site and Services to find a Host or Renter and then complete a Booking of a Space transaction independent of the Site or Services in order to circumvent the obligation to pay any Service Fees and Platform Fees related to Xtended Space’s provision of the Services;",
            "As a Host, submit any Listing with a false or misleading price information, or submit any Listing with a price that you do not intend to honor;",
            "Post, upload, publish, submit or transmit any Content that:",
            {
              type: "list",
              items: [
                "Infringes, misappropriates or violates a third party’s patent, copyright, trademark, trade secret, moral rights or other intellectual property rights, or rights of publicity or privacy;",
                "Violates, or encourages any conduct that would violate, any applicable law or regulation or would give rise to civil liability;",
                "Is fraudulent, false, misleading or deceptive;",
                "Is defamatory, obscene, pornographic, vulgar or offensive;",
                "Promotes discrimination, bigotry, racism, hatred, harassment or harm against any individual or group;",
                "Is violent or threatening or promotes violence or actions that are threatening to any other person;",
                "Promotes illegal or harmful activities or substances;"
              ]
            },
            "Systematically retrieve data or other content from our Site or Services to create or compile, directly or indirectly, in single or multiple downloads, a collection, compilation, database, directory or the like, whether by manual methods, through the use of bots, crawlers, or spiders, or otherwise;",
            "Use, display, mirror or frame the Site, or any individual element within the Site or Services, Xtended Space’s name, logo or other proprietary information, or the layout and design of any page or form contained on a page, without Xtended Space’s express written consent;",
            "Access, tamper with, or use non-public areas of the Site Xtended Space’s computer systems, or the technical delivery systems of Xtended Space’s providers;",
            "Attempt to probe, scan, or test the vulnerability of any Xtended Space system or network or breach any security or authentication measures;",
            "Avoid, bypass, remove, deactivate, impair, descramble, or otherwise circumvent any technological measure implemented by Xtended Space or any of Xtended Space’s providers or any other third party (including another user) to protect the Site, Services or Collective Content;",
            "Forge any TCP/IP packet header or any part of the header information in any email or newsgroup posting, or in any way use the Site, App, Services or Collective Content to send altered, deceptive or false source-identifying information;",
            "Attempt to decipher, decompile, disassemble or reverse engineer any of the software used to provide the Site, Services or Collective Content; or advocate, encourage, or assist any third party in doing any of the foregoing."
          ]
        }
      ]
    },
    {
      title: "Reporting Misconduct",
      id: "",
      content: [
        {
          type: "paragraph",
          text: "If you rent Space to anyone who you feel is acting or has acted inappropriately, including but not limited to, anyone who:"
        },
        {
          type: "list",
          items: [
            "Engages in offensive, violent or sexually inappropriate behaviour,",
            "You suspect of stealing from you, or",
            "Engages in any other disturbing conduct,"
          ]
        },
        {
          type: "paragraph",
          text: "you should immediately report such person to the appropriate authorities and to Xtended Space by contacting us with your police station and report number at support@xtendedspace.com; provided that your report will not obligate us to take any action beyond that required by law (if any) or cause us to incur any liability to you."
        }
      ]
    },
    {
      title: "Termination and Account Cancellation",
      id: "",
      content: [
        {
          type: "paragraph",
          text: "We may, in our discretion and without liability to you, with or without cause, with or without prior notice and at any time:"
        },
        {
          type: "list",
          items: [
            "Terminate these Terms or your access to our Site and Services, and",
            "Deactivate or cancel your Xtended Space Account."
          ]
        },
        {
          type: "paragraph",
          text: "Upon termination we will promptly pay you any amounts we reasonably determine we owe you in our discretion, which we are legally obligated to pay you. In the event Xtended Space terminates these Terms, or your access to our Site and Services or deactivates or cancels your Xtended Space Account you will remain liable for all amounts due under these Terms as of the date of termination."
        }
      ]
    },
    {
      title: "Disclaimers",
      id: "8",
      content: [
        {
          type: "paragraph",
          text: "If you choose to use the site and services, you do so at your sole risk. You acknowledge and agree that Xtended Space does not have an obligation to conduct background checks on any member but may conduct such background checks in its sole discretion. The site and services and all content are provided “as is,” without warranty of any kind, either express or implied. Without limiting the foregoing, Xtended Space explicitly disclaims any warranties of merchantability, fitness for a particular purpose, quiet enjoyment, or non-infringement, and any warranties arising out of course of dealing or usage of trade."
        },
        {
          type: "paragraph",
          text: "Xtended Space makes no warranty that the site, services, collective content, including, but not limited to, the listings or any space will meet your requirements or be available on an uninterrupted, secure, virus-free, or error-free basis. Xtended Space makes no warranty regarding the quality of any listings, space, the services or collective content or the accuracy, timeliness, truthfulness, completeness, or reliability of any collective content obtained through the site, or services."
        },
        {
          type: "paragraph",
          text: "You are solely responsible for all of your communications and interactions with other users of the site or services and with other persons with whom you communicate or interact as a result of your use of the site or services, including, but not limited to, any hosts or renters. You understand that Xtended Space does not make any attempt to verify the statements of users of the site or services or to review or visit any space."
        }
      ]
    },
    {
      title: "Limitations of Liability",
      id: "13",
      content: [
        {
          type: "paragraph",
          text: "You acknowledge and agree that, to the maximum extent permitted by law, the entire risk arising out of your access to and use of the site, services and collective content, your listing or booking of any space via the site and services, and any contact you have with other users of Xtended Space whether in person or online remains with you. Neither Xtended Space nor any other party involved in creating, producing, or delivering the site, services, or collective content will be liable for any incidental, special, exemplary or consequential damages, including lost profits, loss of data or loss of goodwill, service interruption, computer damage or system failure or the cost of substitute products or services, or for any damages for personal or bodily injury or emotional distress arising out of or in connection with these terms, from the use of or inability to use the site, services or collective content, from any communications, interactions or meetings with other users of the site, or services or other persons with whom you communicate or interact as a result of your use of the site, services or from your listing or booking of any space via the site and services, whether based on warranty, contract, tort (including negligence), product liability or any other legal theory, and whether or not Xtended Space has been informed of the possibility of such damage, even if a limited remedy set forth herein is found to have failed of its essential purpose."
        },
        {
          type: "paragraph",
          text: "Except for our obligations to pay amounts to applicable hosts pursuant to these terms or an approved payment request under the Xtended Space host guarantee, in no event will Xtended Space’s aggregate liability arising out of or in connection with these terms and your use of the site or services including, but not limited to, from your listing or booking of any space via the site and services, or from the use of or inability to use the site, services, or collective content and in connection with any space or interactions with any other members, exceed the amounts you have paid or owe for bookings via the site and services as a renter in the twelve (12) month period prior to the event giving rise to the liability, or if you are a host, the amounts paid by Xtended Space to you in the twelve (12) month period prior to the event giving rise to the liability, or one hundred dollars ($100), if no such payments have been made, as applicable. The limitations of damages set forth above are fundamental elements of the basis of the bargain between Xtended Space and you. Some jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages, so the above limitation may not apply to you."
        }
      ]
    },
    {
      title: "Indemnification",
      id: "14",
      content: [
        {
          type: "paragraph",
          text: "You agree to release, defend, indemnify, and hold Xtended Space and its affiliates and subsidiaries, and their officers, directors, employees and agents, harmless from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with:"
        },
        {
          type: "list",
          items: [
            "your access to or use of the Site, Services, or Collective Content or your violation or breach of these Terms;",
            "your Member Content;",
            "any injury occurring to any person or property as a result of the use, occupancy, travel to or from, or the entry or exit from, any Space by you;",
            "your (i) interaction with any Member, (ii) Booking of a Space, (iii) creation of a Listing or (iv) the use, condition or rental of a Space by you, including, but not limited to any injuries, losses, or damages (compensatory, direct, incidental, consequential or otherwise) of any kind arising in connection with or as a result of a rental, Booking or use of a Space;",
            "any dispute between you and another user of the Site or Services; and",
            "any infringement or misappropriation of the third party’s rights."
          ]
        }
      ]
    },
    {
      title: "Member Content",
      id: "15",
      content: [
        {
          type: "paragraph",
          text: "We may, in our sole discretion, permit Members to post, upload, publish, submit or transmit Member Content. By making available any Member Content on or through the Site and Services, you hereby grant to Xtended Space a worldwide, irrevocable, perpetual, non-exclusive, transferable, royalty-free license, with the right to sublicense, to use, view, copy, adapt, modify, distribute, license, sell, transfer, publicly display, publicly perform, transmit, stream, broadcast, access, view, and otherwise exploit such Member Content on, through, or by means of the Site and Services."
        },
        {
          type: "paragraph",
          text: "You acknowledge and agree that you are solely responsible for all Member Content that you make available through the Site and/or Services. Accordingly, you represent and warrant that: (i) you either are the sole and exclusive owner of all Member Content that you make available through the Site and Services or you have all rights, licenses, consents and releases that are necessary to grant to Xtended Space the rights in such Member Content, as contemplated under these Terms; and (ii) neither the Member Content nor your posting, uploading, publication, submission or transmittal of the Member Content or Xtended Space’s use of the Member Content (or any portion thereof) on, through or by means of the Site and the Services will infringe, misappropriate or violate a third party’s patent, copyright, trademark, trade secret, moral rights or other proprietary or intellectual property rights, or rights of publicity or privacy, or result in the violation of any applicable law or regulation."
        }
      ]
    },
    {
      title: "Links",
      id: "16",
      content: [
        {
          type: "paragraph",
          text: "The Site and Services may contain links to third-party websites or resources. You acknowledge and agree that Xtended Space is not responsible or liable for: (i) the availability or accuracy of such websites or resources; or (ii) the content, products, or services on or available from such websites or resources. Links to such websites or resources do not imply any endorsement by Xtended Space of such websites or resources or the content, products, or services available from such websites or resources. You acknowledge sole responsibility for and assume all risk arising from your use of any such websites or resources or the Content, products or services on or available from such websites or resources."
        },
        {
          type: "paragraph",
          text: "Some portions of the Xtended Space Site, Services and/or platform implement Google Maps/Earth mapping services, including Google Maps API(s). Your use of Google Maps/Earth is subject to Google’s terms of use, located at, https://www.google.com/intl/en_us/help/terms_maps."
        }
      ]
    },
    {
      title: "Arbitration",
      id: "17",
      content: [
        {
          type: "paragraph",
          text: "You and Xtended Space mutually agree and acknowledge that all claims and disputes arising under or relating to these Terms and Conditions, or the breach, termination, enforcement, or interpretation or validity thereof are to be settled by binding arbitration in New Delhi, India, and not in a court of law. Such arbitration will occur only after you and Xtended Space have taken good faith efforts to resolve the dispute and such dispute has failed to be resolved."
        },
        {
          type: "paragraph",
          text: "You and Xtended Space both waive the right to trial by jury in all arbitrable disputes. You and Xtended Space also both acknowledge and agree that we are each waiving the right to participating as a plaintiff or class member in any purported class action or representative proceeding in all such disputes. Further, unless You and Xtended Space otherwise agree in writing, any arbitration will be conducted on an individual basis and not in a class, collective, consolidated, or representative proceeding."
        },
        {
          type: "paragraph",
          text: "Any decision or award as a result of any such arbitration proceeding shall be in writing and shall provide an explanation for all conclusions of law and fact and shall include the assessment of costs, expenses, and reasonable attorneys’ fees. Any such arbitration shall be conducted by an arbitrator experienced in the “Sharing Economy,” and shall include a written record of the arbitration hearing. The parties reserve the right to object to any individual who shall be employed by or affiliated with a competing organization or entity. An award of arbitration may be confirmed in a court of competent jurisdiction. The parties shall endeavor to settle any such dispute via good faith negotiation prior to initiating any arbitration proceeding."
        },
        {
          type: "paragraph",
          text: "Exceptions to this arbitration provision include (i) any claim related to actual or threatened infringement, misappropriation, or violation of a party’s copyrights, trademarks, trade secrets, patents or other intellectual property rights; or (ii) any claim seeking emergency injunctive relief based on exigent circumstances. Any claim in exception to the above agreement to arbitration shall be brought into judicial proceeding in a court of competent jurisdiction in New Delhi, India."
        },
        {
          type: "paragraph",
          text: "If any portion of this arbitration provision is found to be unenforceable or unlawful, those unenforceable or unlawful portions shall be severed from these terms. The severance of unenforceable or unlawful portions of this arbitration provision shall not have any impact on the remainder of the arbitration provision, which shall be given full force and effect."
        }
      ]
    },
    {
      title: "Modification",
      id: "18",
      content: [
        {
          type: "paragraph",
          text: "Xtended Space reserves the right, in its sole discretion, to modify the Site or Services or to modify these Terms, including the fees due hereunder at any time and without prior notice. If we modify these Terms, we will post the modification on the Site. By continuing to access or use the Site or Services after we have posted a modification on the Site, you are indicating that you agree to be bound (or continue to be bound) by the modified Terms. If the modified Terms are not acceptable to you, your only recourse is to cease using the Site and Services within 30 days."
        }
      ]
    },
    {
      title: "Copyright Dispute Policy",
      id: "19",
      content: [
        {
          type: "paragraph",
          text: "Xtended Space respects copyright law and expects its users to do the same. It is Xtended Spaces’s policy to terminate in appropriate circumstances the Xtended Space Accounts of Members or other account holders who repeatedly infringe or are believed to be repeatedly infringing the rights of third-party copyright holders. If you are a copyright owner, or are authorized to act on behalf of one, please report alleged copyright infringement by submitting the following information to support@xtendedspace.com along with an electronic or physical signature."
        },
        {
          type: "paragraph",
          text: "Identify the copyrighted work that you claim has been infringed, or - if multiple copyrighted works are covered by this Notice - provide a comprehensive list of the copyrighted works that you claim have been infringed. Identify the material that you claim is infringing and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material, including at a minimum, the URL of the link shown where such material may be found. Provide your full name, mailing address, telephone number, and, if available, email address."
        },
        {
          type: "paragraph",
          text: "Include both of the following statements in the body of the Notice:"
        },
        {
          type: "list",
          items: [
            "“I hereby state that I have a good faith belief that the disputed use of the copyrighted material is not authorized by the copyright owner, its agent, or the law (e.g., as a fair use).”",
            "“I hereby state that the information in this Notice is accurate and, under penalty of perjury, that I am the owner, or authorized to act on behalf of the owner, of the copyright or of an exclusive right under the copyright that is allegedly infringed.”"
          ]
        }
      ]
    }
  ]
};
  
  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%] ">
        <Head>
        <link
          rel="shortcut icon"
          href="https://xtendedspace.s3.ap-south-1.amazonaws.com/home/Xtended+Space+(1)+1.png"
          type="image/x-icon"
        />
        <title>Terms & Conditions | Xtended Space - Storage & Packer Mover</title>
        <meta name="description" content="Understand the terms and conditions for using Xtended Space's storage services and packer and mover solutions, ensuring clarity and trust in every interaction."/>
        <meta name="author" content="Xtended Space" />
        {/* <meta name="keywords" content="Secure storage, Packers and movers, Relocation services, Storage solutions, Moving services, Affordable storage, Household storage, Business storage, B2B storage, Storage India, Movers India, Safe storage, Professional packers, Reliable movers, Nationwide relocation"/> */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.xtendedspace.com/terms-and-conditions" />
        <link rel="alternate" href="https://www.xtendedspace.com/terms-and-conditions" hreflang="en-in" />
       <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:alt" content="Xtended Space Logo"/>
        <meta property="og:site_name" content="Xtended Space" />
        <meta property="og:type" content="website"/>
<meta property="og:title" content="Terms & Conditions | Xtended Space - Storage & Packer Mover"/>
<meta property="og:url" content="https://www.xtendedspace.com/terms-and-conditions"/>
<meta property="og:image" content="https://web.xtendedspace.com/images/logo.png"/>
<meta property="og:description" content="Understand the terms and conditions for using Xtended Space's storage services and packer and mover solutions, ensuring clarity and trust in every interaction."/>
<meta name="twitter:card" content="summary"/>
<meta name="twitter:title" content="Terms & Conditions | Xtended Space - Storage & Packer Mover"/>
<meta name="twitter:site" content="@https://www.xtendedspace.com/terms-and-conditions"/>
<meta name="twitter:description" content="Understand the terms and conditions for using Xtended Space's storage services and packer and mover solutions, ensuring clarity and trust in every interaction."/>
<meta name="twitter:image" content="https://web.xtendedspace.com/images/logo.png"/>
<meta name="twitter:image:alt" content="Xtended Space Logo"/>
      </Head>
      <HeaderMenu />
      <div class="bg-white py-4 pl-[50px] items-center flex-wrap hidden lg:flex">
  <ul class="flex items-center">
	<li class="inline-flex items-center">
	  <Link href="/" class="text-gray-600 hover:text-blue-500 ">
		Home
	  </Link>
      <div className="w-5 h-auto fill-current mx-2 text-gray-400"><MdDoubleArrow /></div>
	  </li>
	<li class="inline-flex items-center">
	  <Link href="" class="text-gray-600 hover:text-blue-500">
		Terms & Conditions
	  </Link>
	 </li>
  </ul>
</div>
      <section className="about flex-col md:flex-row flex p-4 ">
  <div>
    <div className=" md:sticky top-[60px] md:top-[100px]  md:py-0 z-10 bg-white w-full md:w-[350px]">
    <ul id="tocList" className="category my-0 hidden md:block">
        {links.map((link) => (
          <li className="mb-2" key={link.id}>
            <a
              href={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`toc-link text-[14px] md:text-[18px] font-semibold ${
                activeLink === link.id ? "text-[#1B1C57]" : "text-gray-500"
              } hover:text-[#1B1C57]`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

    </div>
  </div>

  <div className="aboutright w-full lg:pr-[200px]  md:mt-0">
    <h1 className="text-[22px] md:text-[42px] font-semibold mb-6 text-[#1B1C57]">
      Terms & Conditions
    </h1>
   
      {/* {data.sections.map((section) => (
        <div key={section.id}>
          <h2 className="text-[16px] md:text-[24px] font-semibold mb-6 text-[#1B1C57]" id={section.id}>
            {section.title}
          </h2>
          {section.content.map((item, index) => {
            if (item.type === "paragraph") {
              return (
                <p key={index} className="text-[10px] md:text-[16px] mb-6 text-gray-500">
                  {item.text}
                </p>
              );
            } else if (item.type === "list") {
              return (
                <ul key={index} className="list-disc pl-6 mb-6 text-gray-500 text-[10px] md:text-[16px]">
                  {item.items.map((listItem, listIndex) => (
                    <li key={listIndex}>{listItem}</li>
                  ))}
                </ul>
              );
            }
            return null;
          })}
        </div>
      ))} */}
      

      {data
      .sections.map((section) => (
        <div key={section.id}>
          <h2 className="text-[16px] md:text-[24px] font-semibold mb-6 text-[#1B1C57]" id={section.id}>
            {section.title}
          </h2>
          {section.content.map((item, index) => {
            if (item.type === "paragraph") {
              return (
                <p key={index} className="text-[10px] md:text-[16px] mb-6 text-gray-500">
                  {item.text}
                </p>
              );
            } else if (item.type === "subheading") {
              return (
                <h3 key={index} className="text-[12px] md:text-[18px] font-semibold my-4 text-[#1B1C57]">
                  {item.text}
                </h3>
              );
            } else if (item.type === "list") {
              return (
                <ul key={index} className="list-disc pl-6 mb-6 text-gray-500 text-[10px] md:text-[16px]">
                  {item.items.map((listItem, listIndex) => (
                    <li key={listIndex}>{listItem}</li>
                  ))}
                </ul>
              );
            } else if (item.type === "table") {
              return (
                <table key={index} className="min-w-full border border-border mt-4">
                  <thead>
                    <tr className="text-[#1B1C57]">
                      {item.headers.map((header, headerIndex) => (
                        <th key={headerIndex} className="border border-border p-2 text-[10px] md:text-[16px] mb-6">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {item.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="border border-border p-2 text-[10px] md:text-[16px] mb-6 text-gray-500">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            }
            return null;
          })}
        </div>
      ))}
   
  
      {additionalContent.sections.map((section) => (
        <div key={section.id}>
          <h3 className="text-[12px] md:text-[18px] font-semibold my-4 text-[#1B1C57]" id={section.id}>
            {section.title}
          </h3>
          {section.content.map((item, index) => {
            if (item.type === "paragraph") {
              return (
                <p key={index} className="text-[10px] md:text-[16px] mb-6 text-gray-500">
                  {item.text}
                </p>
              );
            } else if (item.type === "subheading") {
              return (
                <h4 key={index} className="text-[12px] md:text-[16px] font-semibold my-4 text-[#1B1C57]">
                  {item.text}
                </h4>
              );
            } else if (item.type === "list") {
              return (
                <ul key={index} className="list-disc pl-6 mb-6 text-gray-500 text-[10px] md:text-[16px]">
                  {item.items.map((listItem, listIndex) => (
                    typeof listItem === 'string' ? (
                      <li key={listIndex}>{listItem}</li>
                    ) : (
                      <li key={listIndex}>
                        {listItem.text}
                        {listItem.items && (
                          <ul className="list-inside list-decimal pl-6 mt-1">
                            {listItem.items.map((subItem, subIndex) => (
                              <li key={subIndex}>{subItem}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  ))}
                </ul>
              );
            }
            return null;
          })}
        </div>
      ))}
       
      {lastdata.sections.map((section) => (
        <div key={section.id}>
          <h2 className="text-[16px] md:text-[24px] font-semibold mb-6 text-[#1B1C57]" id={section.id}>
            {section.title}
          </h2>
          {section.content.map((item, index) => {
            if (item.type === "paragraph") {
              return (
                <p key={index} className="text-[10px] md:text-[16px] mb-6 text-gray-500">
                  {item.text}
                </p>
              );
            } else if (item.type === "subheading") {
              return (
                <h3 key={index} className="text-[12px] md:text-[18px] font-semibold my-4 text-[#1B1C57]">
                  {item.text}
                </h3>
              );
            } else if (item.type === "list") {
              return (
                <ul key={index} className="list-disc pl-6 mb-6 text-gray-500 text-[10px] md:text-[16px]">
                  {item.items.map((listItem, listIndex) => (
                    typeof listItem === 'string' ? (
                      <li key={listIndex}>{listItem}</li>
                    ) : (
                      <li key={listIndex}>
                        {listItem.text}
                        {listItem.items && (
                          <ul className="list-inside list-decimal pl-6 mt-1">
                            {listItem.items.map((subItem, subIndex) => (
                              <li key={subIndex}>{subItem}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  ))}
                </ul>
              );
            }
            return null;
          })}
        </div>
      ))}
   


  </div>
</section>

      <Footer />
    </div>
  );
}
