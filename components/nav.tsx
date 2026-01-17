"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Github,
    Facebook, 
    Instagram, 
    Youtube, 
    X 
} from 'lucide-react';

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const socialLinks = [
        { Icon: Github, href: 'https://github.com/griot-and-grits/griot-and-grits' },
        { Icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61571179057798' },
        { Icon: X, href: 'https://x.com/GriotandGrits' },
        { Icon: Instagram, href: 'https://www.instagram.com/griotngrits/' },
        { Icon: Youtube, href: 'https://www.youtube.com/channel/uc2yrl_f5f1zcl36qalvj2og' }
    ];

    const navLinks = [
        { label: 'Home', href: '/#home' },
        { label: 'Our Collection', href: '/collection' },
        { label: 'Who We Are', href: '/who-we-are' },
        { label: 'Our Purpose', href: '/#about' },
        { label: 'Work of the Project', href: '/#services' },
        { label: 'Featured Stories', href: '/#works' },
        { label: 'Support Us', href: '/#donate' },
        { label: 'Contact Us', href: '/#contact' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100
        }
        },
        hover: {
        scale: 1.05,
        color: "#cc147f",
        transition: { duration: 0.3 }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
        opacity: 1, 
        x: 0,
        transition: { 
            type: "spring", 
            stiffness: 100 
        }
        }
    };

    return (
        <nav className="w-full z-50 bg-white shadow-md transition-all duration-300 sticky top-0">
        <div className="flex items-center justify-between px-10 py-4">
            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4"
            >
                <Link href="/#home" className="flex items-center gap-3">
                    <Image
                        src="./icon.png"
                        alt="Griot and Grits Logo"
                        width={600}
                        height={600}
                        className="w-20 md:w-28 h-auto"
                    />
                    <Image
                        src="./logo.png"
                        alt="Griot and Grits Logo"
                        width={600}
                        height={600}
                        className="w-28 md:w-40 h-auto"
                    />
                </Link>
            </motion.div>

            {/* Right side - Donate button and Menu toggle */}
            <div className="flex items-center gap-4">
                {/* Donate Now Button */}
                <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    href="#donate"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a94728] to-[#8b3a1f] text-white px-4 py-2 rounded-full font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                    Donate Now
                </motion.a>

                {/* Mobile Menu Toggle */}
                <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={toggleMenu}
                    className="rounded-full bg-black w-12 h-11 flex items-center justify-center group"
                >
                    <div className="relative w-[20px] h-[2px] bg-white transition-all duration-300 group-hover:bg-[#a94728]">
                        <div className="absolute -top-[9px] w-full h-full bg-inherit group-hover:bg-[#a94728]"></div>
                        <div className="absolute -bottom-[9px] w-full h-full bg-inherit group-hover:bg-[#a94728]"></div>
                    </div>
                </motion.button>
            </div>
        </div>

        {/* Navigation Drawer */}
        <AnimatePresence>
            {isMenuOpen && (
            <>
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={toggleMenu}
                    className="fixed inset-0 bg-black/50 z-[90]"
                />

                {/* Drawer */}
                <motion.nav
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "tween" }}
                    className="fixed top-0 right-0 w-[280px] h-full bg-black text-white transform z-[100]"
                >
                {/* Close Button */}
                <motion.button 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={toggleMenu}
                className="absolute top-9 right-8 w-8 h-8 bg-black/30 rounded flex items-center justify-center"
                >
                <X className="w-5 h-5 text-white" />
                </motion.button>

                <div className="p-10 overflow-y-auto h-full">
                <motion.h3 
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-xs uppercase tracking-widest text-[#a94728] mt-1 mb-12"
                >
                    Griot and Grits
                </motion.h3>

                {/* Navigation Links */}
                <motion.ul 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="border-y border-white/10"
                >
                    {navLinks.map((link, index) => (
                    <motion.li
                        key={index}
                        variants={itemVariants}
                        whileHover="hover"
                        className="border-b border-white/5 last:border-b-0"
                    >
                        <Link
                            href={link.href}
                            className="block py-4 text-lg text-white/50 hover:text-white transition-colors"
                            onClick={toggleMenu}
                        >
                        {link.label}
                        </Link>
                    </motion.li>
                    ))}
                </motion.ul>

                <motion.p 
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-sm text-white/50 my-8"
                >
                    <Image 
                        src="./icon.png" 
                        alt="Griot and Grits Logo" 
                        width={600} 
                        height={600} 
                        className="w-24 md:w-40 max-w-full h-auto"
                    />
                </motion.p>

                {/* Social Links */}
                <motion.ul 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex space-x-4 text-white/50"
                >
                    {socialLinks.map(({ Icon, href }) => (
                    <motion.li 
                        key={href}
                        variants={itemVariants}
                        whileHover="hover"
                    >
                        <Link 
                            href={href} 
                            className="hover:text-white transition-colors"
                        >
                        <Icon className="w-6 h-6" />
                        </Link>
                    </motion.li>
                    ))}
                </motion.ul>
                </div>
            </motion.nav>
            </>
            )}
        </AnimatePresence>
        </nav>
    );
};

export default Nav;