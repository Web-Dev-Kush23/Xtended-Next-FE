
import React, { useEffect, useState } from 'react';
import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import Link from 'next/link';
import Breadcrumbs from "../profile/Breadcrumb";

const index = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); 
        };

        handleResize();

       
        window.addEventListener('resize', handleResize);

       
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const marginTop = isMobile ? '25px' : '0';

    const data = {

        links: [


            {
                category: "Home Page",
                items: [{
                    name: "Home Page",
                    url: "/"
                }]
            },

            {
                category: "quickLinks",
                items: [
                    { name: "About Us", url: "https://xtendedspace.com/about-us" },
                    { name: "FAQs", url: "/faqs" },
                    { name: "Privacy Policy", url: "/privacy-policy" },
                    { name: "Terms and Conditions", url: "/terms-and-conditions" },
                    { name: "Contact Us", url: "/contact-us" },
                    { name: "Area Calculator", url: "/area-calculator" }
                ]
            },
            {
                category: "Service Pages",
                items: [
                    { name: "Store with a Host", url: "/store-with-a-host" },
                    { name: "Store at a Warehouse", url: "/store-at-a-warehouse" },
                    { name: "Business Storage", url: "/services/business-storage" },
                    { name: "Record and Information Management", url: "/record-and-information-management" },
                    { name: "Document Management System", url: "/document-management-system" },
                    { name: "Scanning and Digitization", url: "/scanning-and-digitization" },
                    { name: "Secure Documents Shredding", url: "/secure-documents-shredding" },
                    { name: "Packers and Movers", url: "/services/packers-and-movers" },
                    { name: "B2B Logistics", url: "/services/b2b-logistics" },
                    { name: "All Time Logistic", url: "/alltimelogistic" },
                    { name: "List Storage", url: "/list-storage" },
                    { name: "Alltimelogistic", url: "/alltimelogistic" }
                ]
            },

        ]


    };
    const storagespace = {
        internationalLocations: [
            { name: "Storage Space Delhi", url: "/storage-space/delhi" },
            { name: "Storage Space Mumbai", url: "/storage-space/mumbai" },
            { name: "Storage Space Bangalore", url: "/storage-space/bangalore" },
            { name: "Storage Space Chennai", url: "/storage-space/chennai" },
            { name: "Storage Space Hyderabad", url: "/storage-space/hyderabad" },
            { name: "Storage Space Pune", url: "/packers-and-movers/pune" },
            { name: "Storage Space Kolkata", url: "/storage-space/kolkata" },
            { name: "Storage Space Ahmedabad", url: "/storage-space/ahmedabad" },
            { name: "Storage Space Amritsar", url: "/storage-space/amritsar" },
            { name: "Storage Space Bhopal", url: "/storage-space/bhopal" },
            { name: "Storage Space Bhubaneswar", url: "/storage-space/bhubaneswar" },
            { name: "Storage Space Chandigarh", url: "/storage-space/chandigarh" },
            { name: "Storage Space Jaipur", url: "/storage-space/jaipur" },
            { name: "Storage Space Kochi", url: "/storage-space/kochi" },
            { name: "Storage Space Lucknow", url: "/storage-space/lucknow" },
            { name: "Storage Space Nagpur", url: "/storage-space/nagpur" },
            { name: "Storage Space Surat", url: "/storage-space/surat" },
            { name: "Storage Space Visakhapatnam", url: "/storage-space/visakhapatnam" },
            { name: "Storage Space Faridabad", url: "/storage-space/faridabad" },
            { name: "Storage Space Ghaziabad", url: "/storage-space/ghaziabad" },
            { name: "Storage Space Jamshedpur", url: "/storage-space/jamshedpur" },
            { name: "Storage Space Patna", url: "/storage-space/patna" },
            { name: "Storage Space Raipur", url: "/storage-space/raipur" },
            { name: "Storage Space Agra", url: "/storage-space/agra" },
            { name: "Storage Space Ajmer", url: "/storage-space/ajmer" },
            { name: "Storage Space Kanpur", url: "/storage-space/kanpur" },
            { name: "Storage Space Mysuru", url: "/storage-space/mysuru" },
            { name: "Storage Space Srinagar", url: "/storage-space/srinagar" },
            { name: "Storage Space Dehradun", url: "/storage-space/dehradun" },
            { name: "Storage Space Guwahati", url: "/storage-space/guwahati" },
            { name: "Storage Space Panipat", url: "/storage-space/panipat" },
            { name: "Storage Space Noida", url: "/storage-space/noida" },
            { name: "Storage Space Indore", url: "/storage-space/indore" },
            { name: "Storage Space Ludhiana", url: "/storage-space/ludhiana" },
            { name: "Storage Space Vadodara", url: "/storage-space/vadodara" },
            { name: "Storage Space Ranchi", url: "/storage-space/ranchi" },

            { name: "Storage Space Haridwar", url: "/storage-space/haridwar" },
            { name: "Storage Space Gurugram", url: "/storage-space/gurugram" },
            { name: "Storage Space Goa", url: "/storage-space/goa" },
            { name: "Storage Space Etawah", url: "/storage-space/etawah" },
            { name: "Storage Space Roorkee", url: "/storage-space/roorkee" },
            { name: "Storage Space Rajahmundry", url: "/storage-space/rajahmundry" },
            { name: "Storage Space Bhatinda", url: "/storage-space/bhatinda" },
            { name: "Storage Space Hajipur", url: "/storage-space/hajipur" },
            { name: "Storage Space Rohtak", url: "/storage-space/rohtak" },
            { name: "Storage Space Hosur", url: "/storage-space/hosur" },
            { name: "Storage Space Gandhinagar", url: "/storage-space/gandhinagar" },
            { name: "Storage Space Junagadh", url: "/storage-space/junagadh" },
            { name: "Storage Space Udaipur", url: "/storage-space/udaipur" },
            { name: "Storage Space Salem", url: "/storage-space/salem" },
            { name: "Storage Space Jhansi", url: "/storage-space/jhansi" },
            { name: "Storage Space Madurai", url: "/storage-space/madurai" },
            { name: "Storage Space Vijayawada", url: "/storage-space/vijayawada" },
            { name: "Storage Space Meerut", url: "/storage-space/meerut" },
            { name: "Storage Space Mathura", url: "/storage-space/mathura" },
            { name: "Storage Space Bikaner", url: "/storage-space/bikaner" },
            { name: "Storage Space Cuttack", url: "/storage-space/cuttack" },
            { name: "Storage Space Shimla", url: "/storage-space/shimla" },
            { name: "Storage Space Nashik", url: "/storage-space/nashik" }


        ]
    };
    const packersAndMovers = {
        internationalLocations: [
            { name: "Packers And Movers Delhi", url: "/packers-and-movers/delhi" },
            { name: "Packers And Movers Mumbai", url: "/packers-and-movers/mumbai" },
            { name: "Packers And Movers Bangalore", url: "/packers-and-movers/bangalore" },
            { name: "Packers And Movers Chennai", url: "/packers-and-movers/chennai" },
            { name: "Packers And Movers Hyderabad", url: "/packers-and-movers/hyderabad" },
            { name: "Packers And Movers Pune", url: "/packers-and-movers/pune" },
            { name: "Packers And Movers Calcutta", url: "/packers-and-movers/calcutta" },
            { name: "Packers And Movers Ahmedabad", url: "/packers-and-movers/ahmedabad" },
            { name: "Packers And Movers Amritsar", url: "/packers-and-movers/amritsar" },
            { name: "Packers And Movers Bhopal", url: "/packers-and-movers/bhopal" },
            { name: "Packers And Movers Bhubaneswar", url: "/packers-and-movers/bhubaneswar" },
            { name: "Packers And Movers Chandigarh", url: "/packers-and-movers/chandigarh" },
            { name: "Packers And Movers Jaipur", url: "/packers-and-movers/jaipur" },
            { name: "Packers And Movers Kochi", url: "/packers-and-movers/kochi" },
            { name: "Packers And Movers Lucknow", url: "/packers-and-movers/lucknow" },
            { name: "Packers And Movers Nagpur", url: "/packers-and-movers/nagpur" },
            { name: "Packers And Movers Surat", url: "/packers-and-movers/surat" },
            { name: "Packers And Movers Vishakhapatnam", url: "/packers-and-movers/vishakhapatnam" },
            { name: "Packers And Movers Faridabad", url: "/packers-and-movers/faridabad" },
            { name: "Packers And Movers Ghaziabad", url: "/packers-and-movers/ghaziabad" },
            { name: "Packers And Movers Jamshedpur", url: "/packers-and-movers/jamshedpur" },
            { name: "Packers And Movers Patna", url: "/packers-and-movers/patna" },
            { name: "Packers And Movers Raipur", url: "/packers-and-movers/raipur" },
            { name: "Packers And Movers Agra", url: "/packers-and-movers/agra" },
            { name: "Packers And Movers Ajmer", url: "/packers-and-movers/ajmer" },
            { name: "Packers And Movers Kanpur", url: "/packers-and-movers/kanpur" },
            { name: "Packers And Movers Mysuru", url: "/packers-and-movers/mysuru" },
            { name: "Packers And Movers Srinagar", url: "/packers-and-movers/srinagar" },

            { name: "Packers And Movers Dehradun", url: "/packers-and-movers/dehradun" },
            { name: "Packers And Movers Guwahati", url: "/packers-and-movers/guwahati" },
            { name: "Packers And Movers Panipat", url: "/packers-and-movers/panipat" },
            { name: "Packers And Movers Noida", url: "/packers-and-movers/noida" },
            { name: "Packers And Movers Indore", url: "/packers-and-movers/indore" },
            { name: "Packers And Movers Ludhiana", url: "/packers-and-movers/ludhiana" },
            { name: "Packers And Movers Vadodara", url: "/packers-and-movers/vadodara" },
            { name: "Packers And Movers Ranchi", url: "/packers-and-movers/ranchi" },
            { name: "Packers And Movers Haridwar", url: "/packers-and-movers/haridwar" },
            { name: "Packers And Movers Gurgaon", url: "/packers-and-movers/gurgaon" },
            { name: "Packers And Movers Goa", url: "/packers-and-movers/goa" },

            { name: "Packers And Movers Etawah", url: "/packers-and-movers/etawah" },
            { name: "Packers And Movers Roorkee", url: "/packers-and-movers/roorkee" },
            { name: "Packers And Movers Rajahmundry", url: "/packers-and-movers/rajahmundry" },
            { name: "Packers And Movers Bhatinda", url: "/packers-and-movers/bhatinda" },
            { name: "Packers And Movers Hajipur", url: "/packers-and-movers/hajipur" },
            { name: "Packers And Movers Rohtak", url: "/packers-and-movers/rohtak" },
            { name: "Packers And Movers Hosur", url: "/packers-and-movers/hosur" },
            { name: "Packers And Movers Gandhinagar", url: "/packers-and-movers/gandhinagar" },
            { name: "Packers And Movers Junagadh", url: "/packers-and-movers/junagadh" },
            { name: "Packers And Movers Udaipur", url: "/packers-and-movers/udaipur" },
            { name: "Packers And Movers Salem", url: "/packers-and-movers/salem" },
            { name: "Packers And Movers Jhansi", url: "/packers-and-movers/jhansi" },
            { name: "Packers And Movers Madurai", url: "/packers-and-movers/madurai" },
            { name: "Packers And Movers Vijayawada", url: "/packers-and-movers/vijayawada" },
            { name: "Packers And Movers Meerut", url: "/packers-and-movers/meerut" },
            { name: "Packers And Movers Mathura", url: "/packers-and-movers/mathura" },
            { name: "Packers And Movers Bikaner", url: "/packers-and-movers/bikaner" },
            { name: "Packers And Movers Cuttack", url: "/packers-and-movers/cuttack" },
            { name: "Packers And Movers Shimla", url: "/packers-and-movers/shimla" },
            { name: "Packers And Movers Nashik", url: "/packers-and-movers/nashik" },


        ]
    };



    const packersAndMoverssubcities = {
        subcities: [
            { name: "Packers And Movers Sahadra", url: "/packers-and-movers/delhi/shahdara" },
            { name: "Packers And Movers Rajouri Garden", url: "/packers-and-movers/delhi/rajouri-garden "},
            { name: "Packers And Movers  Kalkaji", url: "/packers-and-movers/delhi/kalkaji "},
            { name: "Packers And Movers  Pitampura", url: "/packers-and-movers/delhi/pitampura "},
            { name: "Packers And Movers  Preet-Vihar", url: "/packers-and-movers/delhi/preet-vihar "},
            { name: "Packers And Movers  Karol-Bagh", url: "/packers-and-movers/delhi/karol-bagh"},
            { name: "Packers And Movers  Rohini", url: "/packers-and-movers/delhi/rohini"},
            { name: "Packers And Movers  Janakpuri", url: "/packers-and-movers/delhi/janakpuri"},
            { name: "Packers And Movers  Uttam-Nagar", url: "/packers-and-movers/delhi/uttam-nagar"},
            { name: "Packers And Movers  Dwarka", url: "/packers-and-movers/delhi/dwarka"},
            { name: "Packers And Movers  Vasant-Kunj", url: "/packers-and-movers/delhi/vasant-kunj"},
            { name: "Packers And Movers  Lajpat-Nagar", url: "/packers-and-movers/delhi/lajpat-nagar"},
            { name: "Packers And Movers  Connaught-Place", url: "/packers-and-movers/delhi/connaught-clace"},
            { name: "Packers And Movers  Delhi-Cantt", url: "/packers-and-movers/delhi/delhi-cantt"},
            { name: "Packers And Movers  Greater-Kailash", url: "/packers-and-movers/delhi/greater-kailash"},
            { name: "Packers And Movers  Laxmi-Nagar", url: "/packers-and-movers/delhi/laxmi-nagar"},
            { name: "Packers And Movers  Paschim-Vihar", url: "/packers-and-movers/delhi/paschim-vihar"},
            { name: "Packers And Movers  Chattarpur", url: "/packers-and-movers/delhi/chattarpur"},
            { name: "Packers And Movers  Malviya-Nagar", url: "/packers-and-movers/delhi/malviya-nagar"},
            { name: "Packers And Movers  Saket", url: "/packers-and-movers/delhi/saket"},
            { name: "Packers And Movers  Najafgarh", url: "/packers-and-movers/delhi/najafgarh"},
            { name: "Packers And Movers  Patel-Nagar", url: "/packers-and-movers/delhi/patel-nagar"},
            { name: "Packers And Movers  Mahipalpur", url: "/packers-and-movers/delhi/mahipalpur"},
            { name: "Packers And Movers  Palam", url: "/packers-and-movers/delhi/palam"},
            { name: "Packers And Movers  Sarita-Vihar", url: "/packers-and-movers/delhi/sarita-vihar"},
            { name: "Packers And Movers  Okhla", url: "/packers-and-movers/delhi/okhla"},
            { name: "Packers And Movers  Hauz-Khas", url: "/packers-and-movers/delhi/hauz-khas"},
            { name: "Packers And Movers  Badarpur", url: "/packers-and-movers/delhi/badarpur"},
            { name: "Packers And Movers  Anand-Vihar", url: "/packers-and-movers/delhi/anand-vihar"},
            { name: "Packers And Movers  Mayur-Vihar", url: "/packers-and-movers/delhi/mayur-vihar"},
            { name: "Packers And Movers  Nehru-Place", url: "/packers-and-movers/delhi/nehru-place"},
            { name: "Packers And Movers  Govindpuri", url: "/packers-and-movers/delhi/govindpuri"},
            { name: "Packers And Movers  Nangloi", url: "/packers-and-movers/delhi/nangloi"},
            { name: "Packers And Movers  Tilak-Nagar", url: "/packers-and-movers/delhi/tilak-nagar"},
            { name: "Packers And Movers  Patparganj", url: "/packers-and-movers/delhi/patparganj"},
            { name: "Packers And Movers  Vikashpuri", url: "/packers-and-movers/delhi/vikashpuri"},
            { name: "Packers And Movers  Pahadganj", url: "/packers-and-movers/delhi/pahadganj"},
            { name: "Packers And Movers  Andheri", url: "/packers-and-movers/mumbai/andheri"},
            { name: "Packers And Movers  Bhandup", url: "/packers-and-movers/mumbai/bhandup"},
            { name: "Packers And Movers  Borivali", url: "/packers-and-movers/mumbai/borivali"},
            { name: "Packers And Movers  Bandra", url: "/packers-and-movers/mumbai/bandra"},
            { name: "Packers And Movers  Chembur", url: "/packers-and-movers/mumbai/chembur"},
            { name: "Packers And Movers  Colaba", url: "/packers-and-movers/mumbai/colaba"},
            { name: "Packers And Movers  Dadar", url: "/packers-and-movers/mumbai/dadar"},
            { name: "Packers And Movers  Dahisar", url: "/packers-and-movers/mumbai/dahisar"},
            { name: "Packers And Movers  Ghatkopar", url: "/packers-and-movers/mumbai/ghatkopar"},
            { name: "Packers And Movers  Goregaon", url: "/packers-and-movers/mumbai/goregaon"},
            { name: "Packers And Movers  Jogeshwari", url: "/packers-and-movers/mumbai/jogeshwari"},
            { name: "Packers And Movers  Jogeshwari", url: "/packers-and-movers/mumbai/jogeshwari"},
            { name: "Packers And Movers  Kalwa", url: "/packers-and-movers/mumbai/kalwa"},
            { name: "Packers And Movers  Kandivali", url: "/packers-and-movers/mumbai/kandivali"},
            { name: "Packers And Movers  Virar", url: "/packers-and-movers/mumbai/virar"},
            { name: "Packers And Movers  Kamothe", url: "/packers-and-movers/mumbai/kamothe"},
            {name: "Packers And Movers  Dharavi", url: "/packers-and-movers/mumbai/dharavi"},
            {name: "Packers And Movers  Vasai", url: "/packers-and-movers/mumbai/vasai"},
            {name: "Packers And Movers  Worli", url: "/packers-and-movers/mumbai/worli"},
            {name: "Packers And Movers  Mulund", url: "/packers-and-movers/mumbai/mulund"},
            {name: "Packers And Movers  Kanjurmarg", url: "/packers-and-movers/mumbai/kanjurmarg"},
            {name: "Packers And Movers  Kurla", url: "/packers-and-movers/mumbai/kurla"},
            {name: "Packers And Movers  Lower-Parel", url: "/packers-and-movers/mumbai/lower-parel"},
            {name: "Packers And Movers  Juhu", url: "/packers-and-movers/mumbai/juhu"},
            {name: "Packers And Movers  Vile-Parle-East", url: "/packers-and-movers/mumbai/vile-parle-east"},
            {name: "Packers And Movers  Virar-West", url: "/packers-and-movers/mumbai/virar-west"},
            {name: "Packers And Movers  Malad", url: "/packers-and-movers/mumbai/malad"},
            {name: "Packers And Movers  Matunga", url: "/packers-and-movers/mumbai/matunga"},
            {name: "Packers And Movers  Wadala", url: "/packers-and-movers/mumbai/wadala"},
            {name: "Packers And Movers  Powai", url: "/packers-and-movers/mumbai/powai"},
            {name: "Packers And Movers  Nahur", url: "/packers-and-movers/mumbai/nahur"},
            {name: "Packers And Movers  Thane", url: "/packers-and-movers/mumbai/thane"},
            {name: "Packers And Movers  Navi-Mumbai", url: "/packers-and-movers/mumbai/navi-mumbai"},
            {name: "Packers And Movers  Nalasopara", url: "/packers-and-movers/mumbai/nalasopara"},
            {name: "Packers And Movers  Sakinaka", url: "/packers-and-movers/mumbai/sakinaka"},
        ]
    };





    return (
        <>
            <HeaderMenu />
            <div className="bg-gray-50 py-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-gray-600 flex px-4 py-2">
                        <Link href="/" className="text-blue-500">Home</Link>/ Sitemap
                    </div>
                </div>
            </div>

            <div class="flex flex-wrap  text-[#393434] text-sm font-normal font-roboto max-w-8xl mx-auto p-4">
                <div class="w-full  lg:w-2/5 px-4">
                    <div class="space-y-6 ">
                        <div>
                            <h5 class="text-blue-500 text-lg font-semibold mb-4">Home Page</h5>
                            <ul class="mt-2  list-disc list-inside bg-gray-100 p-4 rounded-lg text-[10px] lg:text-[13px] text-[#1B1C57]">
                                <li><Link href="/" class="hover:text-blue-600">Home</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h5 class="text-blue-500 text-lg font-semibold mb-4">Quick Links</h5>
                            <ul class="mt-2  list-disc list-inside bg-gray-100 p-4 rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-2 lg:ml-2   text-[10px] lg:text-[13px] text-[#1B1C57]">
                                <li><Link href="/about-us" class="hover:text-blue-600">About Us</Link></li>
                                <li><Link href="/faqs" class="hover:text-blue-600">FAQs</Link></li>
                                <li><Link href="/privacy-policy" class="hover:text-blue-600">Privacy Policy</Link></li>
                                <li><Link href="/terms-and-conditions" class="hover:text-blue-600">Terms and Conditions</Link></li>
                                <li><Link href="/contact-us" class="hover:text-blue-600">Contact Us</Link></li>
                                <li><Link href="/area-calculator" class="hover:text-blue-600">Area Calculator</Link></li>
                                <li><Link href="/alltimelogistic" className="hover:text-blue-600">Track Shipment</Link></li>

                            </ul>
                        </div>

                    </div>
                </div>
                <div class="w-full lg:w-3/5 px-4 ">
                    <div class="space-y-6 ">

                        <div >
                            <h5 className="text-blue-500 text-lg font-semibold mb-4 " style={{ marginTop }}>Service Pages</h5>
                            <ul className="mt-2  list-disc list-inside bg-gray-100 p-4 rounded-lg grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2 lg:ml-2  text-[10px] lg:text-[13px] text-[#1B1C57]">
                                <li><Link href="/store-with-a-host" className="hover:text-blue-600">Store with a Host</Link></li>
                                <li><Link href="/store-at-a-warehouse" className="hover:text-blue-600">Store at a Warehouse</Link></li>
                                <li><Link href="/services/business-storage" className="hover:text-blue-600">Business Storage</Link></li>
                                <li><Link href="/record-and-information-management" className="hover:text-blue-600">Record and Information Management</Link></li>
                                <li><Link href="/document-management-system" className="hover:text-blue-600">Document Management System</Link></li>
                                <li><Link href="/scanning-and-digitization" className="hover:text-blue-600">Scanning and Digitization</Link></li>
                                <li><Link href="/secure-documents-shredding" className="hover:text-blue-600">Secure Documents Shredding</Link></li>
                                <li><Link href="/services/packers-and-movers" className="hover:text-blue-600">Packers and Movers</Link></li>
                                <li><Link href="/services/b2b-logistics" className="hover:text-blue-600">B2B Logistics</Link></li>
                                <li><Link href="/list-storage" className="hover:text-blue-600">List Storage</Link></li>
                                <li><Link href="/alltimelogistic" className="hover:text-blue-600">Alltimelogistic</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full  px-4 max-w-8xl">
                <div class="space-y-6">
                    <div>
                        <h5 class="text-blue-500 text-lg font-semibold mb-4 text-center">Storage Space in Multiple Cities		</h5>
                        <ul class="mt-2  list-disc list-inside bg-gray-100 p-4 rounded-lg grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:ml-2  text-[10px] lg:text-[13px] text-[#1B1C57]">
                            {storagespace.internationalLocations.map((location, index) => (
                                <li key={index} className="location-item">
                                    <Link
                                        href={location.url}
                                        rel="noopener noreferrer"
                                        className=" hover:text-blue-800"
                                    >
                                        {location.name}
                                    </Link>
                                </li>
                            ))}


                        </ul>
                    </div>
                </div>
                <div class="space-y-6 mt-4">
                    <div>
                        <h5 class="text-blue-500 text-lg font-semibold mb-4 text-center">Packers and Movers in Muliple Cities		</h5>
                        <ul class="mt-2  list-disc list-inside bg-gray-100 p-4 rounded-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:ml-2  text-[10px] lg:text-[13px] text-[#1B1C57]">
                            {packersAndMovers.internationalLocations.map((location, index) => (
                                <li key={index} className="location-item">
                                    <Link
                                        href={location.url}
                                        rel="noopener noreferrer"
                                        className=" hover:text-blue-800"
                                    >
                                        {location.name}
                                    </Link>
                                </li>
                            ))}


                        </ul>
                    </div>
                </div>



                <div class="space-y-6 mt-4">
                    <div>
                        <h5 class="text-blue-500 text-lg font-semibold mb-4 text-center">Packers and Movers in Muliple Sub Cities		</h5>
                        <ul class="mt-2  list-disc list-inside bg-gray-100 p-4 rounded-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:ml-2  text-[10px] lg:text-[13px] text-[#1B1C57]">
                            {packersAndMoverssubcities.subcities.map((location, index) => (
                                <li key={index} className="location-item">
                                    <Link
                                        href={location.url}
                                        rel="noopener noreferrer"
                                        className=" hover:text-blue-800"
                                    >
                                        {location.name}
                                    </Link>
                                </li>
                            ))}


                        </ul>
                    </div>
                </div>





            </div>

            <Footer />
        </>
    );
}

export default index;