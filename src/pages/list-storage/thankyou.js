
import React from 'react';
import { motion } from 'framer-motion';
import HeaderMenu from '@/components/header/header';
import Footer from '@/components/footer/index';

const ThankYou = () => {
    return (
        <>
            <HeaderMenu />
            <section className="w-full mt-10 flex flex-col items-center px-6 md:px-0 pb-[20px]">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="max-w-3xl text-center"
                >
                    {/* Animated Checkbox (EXACT like Image) */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="flex justify-center"
                    >
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="rgb(59 130 246)"  // Bright Blue Color
                            strokeWidth="3"   // Bold Stroke to Match Image
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-24 md:w-32"
                        >
                            {/* Circular Outline */}
                            <motion.circle
                                cx="12" cy="12" r="10"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                            />
                            {/* Checkmark */}
                            <motion.polyline
                                points="8 12 11 15 17 9"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
                            />
                        </motion.svg>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-[#1B1C57] font-bold text-3xl md:text-4xl mt-4"
                    >
                        Thank You for Listing Your Property!
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-[#374151] text-base md:text-lg leading-relaxed mt-4"
                    >
                       Your property has been submitted for approval. We will review it and notify you via email once it’s approved or if any changes required. If it doesn’t meet our guidelines, you will be informed.
                    </motion.p>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="bg-[#5eb3fe2e] rounded-lg px-6 py-4 mt-6 flex flex-col md:flex-row items-center justify-center text-[#106BE0] text-sm md:text-lg shadow-sm"
                    >
                        <p className="text-center md:text-left">
                        If you have any questions, feel free to contact us at 
                        <span className="block md:inline">
        <a href="tel:+919009000798" className="font-semibold"> 📞 +91 900 900 0798</a>
    </span>.
                        </p>
                    </motion.div>

                    {/* <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        className="text-[#374151] text-base md:text-lg leading-relaxed mt-6"
                    >
                        We appreciate your trust and look forward to making your move hassle-free!
                    </motion.p> */}
                </motion.div>
            </section>
            <Footer />
        </>
    );
};

export default ThankYou;

