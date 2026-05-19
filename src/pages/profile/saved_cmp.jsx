import React from "react";
import Wishlist from "../store-with-a-host/wishlist";
export default function Index() {
    return (
        <React.Fragment>
            {/* <div className="flex items-center justify-start flex-wrap gap-3 lg:pl-10"> */}
                <Wishlist/>
            {/* </div> */}
        </React.Fragment>
    )
}