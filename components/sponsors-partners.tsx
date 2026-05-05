"use client"

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { goldSponsors, silverSponsors, bronzeSponsors, partners, Sponsor } from '@/lib/sponsors';

interface LogoCardProps {
    sponsor: Sponsor;
    width: string;
    height: string;
    index: number;
    sizes: string;
}

const LogoCard = ({ sponsor, width, height, index, sizes }: LogoCardProps) => {
    const Tag = (sponsor.website ? motion.a : motion.div) as React.ElementType;
    const anchorProps = sponsor.website
        ? { href: sponsor.website, target: "_blank", rel: "noopener noreferrer" }
        : {};

    return (
        <Tag
            {...anchorProps}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center"
        >
            <div className={`relative ${width} ${height}`}>
                <Image src={sponsor.logo} alt={sponsor.name} fill sizes={sizes} className="object-contain" />
            </div>
        </Tag>
    );
};

const SponsorsPartners = () => {
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
                </motion.div>

                {goldSponsors.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-center mb-8 text-yellow-600">Gold Sponsors</h3>
                        <div className="flex flex-wrap justify-center gap-8">
                            {goldSponsors.map((s, i) => (
                                <LogoCard key={s.name} sponsor={s} width="w-64" height="h-32" index={i} sizes="256px" />
                            ))}
                        </div>
                    </div>
                )}

                {silverSponsors.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-center mb-8 text-gray-400">Silver Sponsors</h3>
                        <div className="flex flex-wrap justify-center gap-8">
                            {silverSponsors.map((s, i) => (
                                <LogoCard key={s.name} sponsor={s} width="w-48" height="h-24" index={i} sizes="192px" />
                            ))}
                        </div>
                    </div>
                )}

                {bronzeSponsors.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-center mb-8 text-orange-600">Bronze Sponsors</h3>
                        <div className="flex flex-wrap justify-center gap-8">
                            {bronzeSponsors.map((s, i) => (
                                <LogoCard key={s.name} sponsor={s} width="w-32" height="h-16" index={i} sizes="128px" />
                            ))}
                        </div>
                    </div>
                )}

                {hasPartners && (
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-center mb-8 text-gray-600">Partners</h3>
                        <div className="flex flex-wrap justify-center gap-8">
                            {partners.map((s, i) => (
                                <LogoCard key={s.name} sponsor={s} width="w-48" height="h-24" index={i} sizes="192px" />
                            ))}
                        </div>
                    </div>
                )}

                <div className="text-center mt-12">
                    <a
                        href="mailto:info@griotandgrits.org?subject=Sponsorship%20Inquiry%20%E2%80%94%20Griot%20%26%20Grits&body=Hello%2C%0A%0AI%20am%20interested%20in%20learning%20more%20about%20sponsorship%20opportunities%20with%20Griot%20%26%20Grits.%20Could%20you%20please%20share%20your%20sponsorship%20prospectus%20and%20details%20about%20the%20program%2C%20including%20available%20tiers%20and%20benefits%3F%0A%0AThank%20you%2C"
                        className="inline-flex items-center gap-2 bg-[#AE2D24] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#282420] transition-colors"
                    >
                        Interested in Sponsoring? Get in Touch
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default SponsorsPartners;
