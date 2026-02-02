"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { SiGithub, SiFacebook, SiX, SiInstagram, SiYoutube } from '@icons-pack/react-simple-icons';

const ContactSection: React.FC = () => {
    const socialLinks = [
        { Icon: SiFacebook, link: 'https://www.facebook.com/profile.php?id=61571179057798' },
        { Icon: SiX, link: 'https://x.com/GriotandGrits' },
        { Icon: SiInstagram, link: 'https://www.instagram.com/griotngrits/' },
        { Icon: SiYoutube, link: 'https://www.youtube.com/@GriotandGrits' }
    ];

    return (
        <section className="relative bg-black/90 text-white pt-24 pb-6 px-4">
            {/* Black overlay with reduced opacity */}
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="container mx-auto max-w-4xl text-left relative z-10">
                {/* Get In Touch Section */}
                <div id="contact" className='max-w-md mx-auto'>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <h3 className="text-[#a94728] text-xl uppercase tracking-widest font-semibold mb-8">/ Get In Touch</h3>

                        {/* Email */}
                        <div className="mb-6">
                            <a
                                href="mailto:info@griotandgrits.org"
                                className="text-2xl md:text-3xl font-light hover:text-[#a94728] transition-colors inline-block"
                                target="_blank"
                            >
                                info@griotandgrits.org
                            </a>
                        </div>

                        {/* GitHub */}
                        <div className="mb-6">
                            <a
                                href="https://github.com/griot-and-grits/griot-and-grits"
                                className="text-xl md:text-2xl font-light hover:text-[#a94728] transition-colors inline-flex items-center gap-2"
                                target="_blank"
                            >
                                <SiGithub size={28} />
                                <span>Contribute on GitHub</span>
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Follow Us Section */}
                <div className='max-w-md mx-auto'>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-[#a94728] text-xl uppercase tracking-widest font-semibold mb-8">/ Follow Us</h3>

                        {/* Social Media Links */}
                        <div className="flex justify-center space-x-4">
                            {socialLinks.map(({ Icon: IconComponent, link }, index) => (
                                <a
                                    key={index}
                                    href={link}
                                    target='_blank'
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <IconComponent size={28} />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-xs text-gray-400 mt-16"
                >
                    <p>
                        © {new Date().getFullYear()} All rights reserved
                    </p>
                </motion.div>
            </div>

            {/* Back to Top */}
            <motion.a 
                href="#home"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="fixed bottom-8 right-8 bg-[#a94728] text-white w-12 h-12 rounded-full flex items-center justify-center hover:opacity-70 duration-300 transition-all"
            >
                ↑
            </motion.a>
        </section>
    );
};

export default ContactSection;