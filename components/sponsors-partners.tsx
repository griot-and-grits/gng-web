"use client"

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { goldSponsors, silverSponsors, bronzeSponsors, partners, Sponsor } from '@/lib/sponsors';

const logoCard = (sponsor: Sponsor, width: string, height: string, index: number) => (
    <motion.a
        key={sponsor.name}
        href={sponsor.website}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center"
    >
        <div className={`relative ${width} ${height}`}>
            <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain" />
        </div>
    </motion.a>
);

const SponsorsPartners = () => {
    const hasSponsors = goldSponsors.length > 0 || silverSponsors.length > 0 || bronzeSponsors.length > 0;
    const hasPartners = partners.length > 0;

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
                        Thank You to Our Sponsors &amp; Partners
                    </h2>

                    {goldSponsors.length > 0 && (
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-center mb-8 text-yellow-600">Gold Sponsors</h3>
                            <div className="flex flex-wrap justify-center gap-8">
                                {goldSponsors.map((s, i) => logoCard(s, "w-64", "h-32", i))}
                            </div>
                        </div>
                    )}

                    {silverSponsors.length > 0 && (
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-center mb-8 text-gray-400">Silver Sponsors</h3>
                            <div className="flex flex-wrap justify-center gap-8">
                                {silverSponsors.map((s, i) => logoCard(s, "w-48", "h-24", i))}
                            </div>
                        </div>
                    )}

                    {bronzeSponsors.length > 0 && (
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-center mb-8 text-orange-600">Bronze Sponsors</h3>
                            <div className="flex flex-wrap justify-center gap-8">
                                {bronzeSponsors.map((s, i) => logoCard(s, "w-32", "h-16", i))}
                            </div>
                        </div>
                    )}

                    {hasSponsors && hasPartners && (
                        <div className="border-t border-gray-200 my-12" />
                    )}

                    {hasPartners && (
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-center mb-8 text-gray-600">Our Partners</h3>
                            <div className="flex flex-wrap justify-center gap-8">
                                {partners.map((s, i) => logoCard(s, "w-48", "h-24", i))}
                            </div>
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <a
                            href="/#contact"
                            className="inline-block border-2 border-[#AE2D24] text-[#AE2D24] px-8 py-3 rounded-lg font-semibold hover:bg-[#AE2D24] hover:text-white transition-colors duration-200"
                        >
                            Interested in sponsoring? Get in touch →
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SponsorsPartners;
