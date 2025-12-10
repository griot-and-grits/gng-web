"use client"

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Github, Facebook, Youtube, Instagram, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
        // Animate main content
        gsap.from(contentRef.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });

        // Animate side links
        gsap.from(".side-link", {
            x: -50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.5
        });

        // Animate social links
        gsap.from(".social-link", {
            x: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.8
        });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section 
            ref={sectionRef}
            id="home" 
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        <video autoPlay muted className="w-full h-full object-cover absolute top-0 left-0 z-0" playsInline loop preload="none">
            <source src="/media/vid/website_background_video.mp4" type="video/mp4" />
            <track
            src="/path/to/captions.vtt"
            kind="subtitles"
            srcLang="en"
            label="English"
            />
            Your browser does not support the video tag.
        </video>

        {/* Main Content */}
        <div ref={contentRef} className="relative z-10 container mx-auto px-6 text-white">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl uppercase mx-auto text-center"
            >
            <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8">
                Welcome to the Griot and Grits Project
            </h1>
            <p className='text-xs md:text-xl'>
                Black Voices Worth Remembering, Black History Worth Sharing
            </p>
            </motion.div>
        </div>

        {/* Side Links */}
        <nav className="hidden lg:block absolute left-0 p-2 top-1/2 z-10 bg-neutral-800 bg-opacity-40 -translate-y-1/2 space-y-4">
            {[
            { href: "/collection", title: "Our Collection", subtitle: "oral history" },
            { href: "#about", title: "Our purpose", subtitle: "who we are" },
            { href: "#services", title: "Work of the Project", subtitle: "what we do" },
            { href: "#donate", title: "Support Us", subtitle: "make a donation" },
            { href: "#contact", title: "Contact", subtitle: "get in touch" }
            ].map((link, index) => (
            <motion.a
                key={index}
                href={link.href}
                className="block text-white hover:text-gray-300 transition-colors"
                whileHover={{ x: 10 }} 
            >
                <div className="text-sm font-medium uppercase">{link.title}</div>
                <div className="text-xs text-gray-200">{link.subtitle}</div>
            </motion.a>
            ))}
        </nav>

        {/* Social Links */}
        <div className="hidden lg:block text-sm absolute right-0 p-2 top-1/2 z-10 bg-neutral-800 bg-opacity-40 -translate-y-1/2 space-y-4 text-white">
            <div className="mb-4 font-medium">Follow Us</div>
            <div className="space-y-4">
            {[
                { Icon: Github, label: "GitHub", link: 'https://github.com/griot-and-grits/griot-and-grits' },
                { Icon: Facebook, label: "Facebook", link: 'https://www.facebook.com/profile.php?id=61571179057798' },
                { Icon: X, label: "X", link: 'https://x.com/GriotandGrits' },
                { Icon: Instagram, label: "Instagram", link: 'https://www.instagram.com/griotngrits/' },
                { Icon: Youtube, label: "YouTube", link: 'https://www.youtube.com/@GriotandGrits' }
            ].map(({ Icon, label, link }, index) => (
                <motion.a
                key={index}
                href={link}
                target='blank'
                className="social-link flex items-center gap-2 hover:text-gray-300 transition-colors"
                whileHover={{ x: -10 }}
                >
                <Icon className='text-[#a94728] mt-1' size={14} />
                <span >{label}</span>
                </motion.a>
            ))}
            </div>
        </div>

        <div className="block text-lg lg:hidden absolute bottom-0 -translate-y-1/2 text-white">
            <div className="mb-4 text-center font-medium">Follow Us</div>
            <div className="flex flex-row space-x-4">
            {[
                { Icon: Github, link: 'https://github.com/griot-and-grits/griot-and-grits' },
                { Icon: Facebook, label: "Facebook", link: 'https://www.facebook.com/profile.php?id=61571179057798' },
                { Icon: X, label: "X", link: 'https://x.com/GriotandGrits' },
                { Icon: Instagram, label: "Instagra,", link: 'https://www.instagram.com/griotngrits/' },
                { Icon: Youtube, label: "Youtube", link: 'https://www.youtube.com/@GriotandGrits' }
            ].map(({ Icon, link }, index) => (
                <motion.a
                    key={index}
                    href={link}
                    target='blank'
                    className="social-link flex items-center gap-2 hover:text-gray-300 transition-colors"
                    whileHover={{ x: -10 }}
                >
                    <Icon size={20} />
                </motion.a>
            ))}
            </div>
        </div>

        {/* Scroll Down */}
        <motion.a
            href="#about"
            className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
        >
            <span className="block mb-2">Scroll Down</span>
            <motion.div 
            className="w-6 h-10 border-2 border-white rounded-full mx-auto"
            whileHover={{ scale: 1.1 }}
            >
            <motion.div
                className="w-1 h-2 bg-[#a94728] mx-auto mt-2 rounded-full"
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            />
            </motion.div>
        </motion.a>
        </section>
    );
};

export default Hero;