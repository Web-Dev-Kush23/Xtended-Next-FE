import React from "react";
import { useRouter } from "next/router";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Link from "next/link";


const Breadcrumbs = ({packer}) => {
    const router = useRouter();
    const pathnames = router.pathname.split('/').filter((x) => x);
    
    return (
        <React.Fragment>
            <div className="flex items-center justify-start">
                {pathnames.map((pathname, index) => {
                    const href = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = (index === pathnames.length-1);
                    return (
                        <li key={index} className="flex items-center justify-start">
                            <span className="mx-1"><MdKeyboardDoubleArrowRight size={25} /></span>
                            <Link  href={href} legacyBehavior>
                                <a className={`${isLast && packer && `text-white` || isLast && `text-[#328AFE] text-[13px] md:text-[16px]`}`}>{pathname.charAt(0).toUpperCase() + pathname.slice(1).replace(/-/g, ' ')}</a>
                            </Link>
                        </li>
                    );
                })}
            </div>
        </React.Fragment>
    );
};

export default Breadcrumbs;
