"use client"

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Github,
    Facebook, 
    Instagram,
    Youtube,
    X 
} from 'lucide-react';
import LoadingDots from './loading-dots';

const ContactSection: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch(`api/subscribe`, {
        body: JSON.stringify({
            email: inputRef.current!.value
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
        });

        const { error } = await res.json();

        if (error) {
        setMessage(error);
        setLoading(false);

        return;
        }

        inputRef.current!.value = '';
        setMessage('You are now subscribed to our newsletter!');
        setLoading(false);
    };

    const socialLinks = [
        { icon: Facebook, link: 'https://www.facebook.com/profile.php?id=61571179057798' },
        { icon: X, link: 'https://x.com/GriotandGrits' },
        { icon: Instagram, link: 'https://www.instagram.com/griotngrits/' },
        { icon: Youtube, link: 'https://www.youtube.com/@GriotandGrits' }
    ];

    return (
        <section id="contact" className="relative bg-black/90 text-white pt-24 pb-6 px-4">
            {/* Black overlay with reduced opacity */}
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="container mx-auto max-w-4xl text-left relative z-10">
                {/* Get In Touch Section */}
                <div className='max-w-md mx-auto'>
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
                                <Github size={28} />
                                <span>Contribute on GitHub</span>
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Newsletter Section */}
                <div className='max-w-md mx-auto'>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-[#a94728] text-xl uppercase tracking-widest font-semibold mb-8">/ Follow Us</h3>
                        <p className="text-gray-300 mb-4">Subscribe to our newsletter to stay updated on our latest news and events.</p>

                        <form onSubmit={subscribe} className="relative">
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                placeholder="Enter your email"
                                ref={inputRef}
                                className="w-full bg-white/10 px-4 py-3 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a94728]"
                            />
                            <button
                                type="submit"
                                className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#a94728] text-white p-2 rounded-full hover:opacity-70 duration-300 transition-all"
                            >
                                {loading ? <LoadingDots className="mb-3 bg-[#a94728]" /> : <p>Subscribe</p>}
                            </button>
                        </form>

                        <p className="mt-2 text-center text-white">{message ? message : ``}</p>

                        {/* Social Media Links */}
                        <div className="flex justify-center space-x-4 mt-8">
                            {socialLinks.map(({ icon: Icon, link }, index) => (
                                <a
                                    key={index}
                                    href={link}
                                    target='_blank'
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <Icon size={28} />
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