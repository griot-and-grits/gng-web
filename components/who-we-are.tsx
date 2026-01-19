"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface TeamMember {
    name: string;
    title: string;
    photo: string;
    bio: string;
    linkedin?: string;
}

interface Sponsor {
    name: string;
    logo: string;
    website?: string;
}

const WhoWeAre = () => {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    const teamMembers: TeamMember[] = [
        {
            name: "Ty McDuffie",
            title: "Executive Director & Founder",
            photo: "/media/bio/T_McDuffie.jpg",
            bio: "Ty McDuffie is the founder of Griot and Grits, a non-profit organization dedicated to preserving Black family narratives through AI-enhanced video interviews. An Air Force veteran, Ty brings a disciplined, strategic approach to the urgent work of cultural preservation.\n\n​Driven by the realization that many Black families are losing their history to time and illness, Ty established Griot and Grits to bridge the gap between tradition and technology. His organization empowers families to secure their legacies, ensuring that the stories of the past remain accessible to inspire the future."
        },
        {
            name: "Sherard Griffin",
            title: "Board Chair",
            photo: "/media/bio/S_Griffin.jpg",
            bio: "Sherard Griffin leads the Griot and Grits Board, providing the vision, mission and strategic direction. He has over 25 years of experience architecting and developing large-scale enterprise data and AI solutions. He is currently Head of Engineering for OpenShift AI at Red Hat, an enterprise open-source Gen AI and MLOps platform.\n\nSherard serves on the Strategic Advisory Board of North Carolina State University's Computer Science Department. He is a passionate advocate for broadening participation in technology, mentoring emerging technologists, and promoting inclusive workforce development across the AI and open-source communities. His work reflects a holistic vision of technology as both a tool for innovation and a platform for empowerment.",
            linkedin: "https://www.linkedin.com/in/sherardgriffin"
        },
        {
            name: "Rickey Thomas Jr.",
            title: "Creative Executive Producer",
            photo: "/media/bio/R_Thomas.jpg",
            bio: "Rickey is an experienced media producer whose passion for film and television began early, running a studio camera at the age of 14 and directing live broadcasts by 16 through his church's television ministry. Those early opportunities nurtured his creative and technical skills across audio, directing, editing, and live production.\n\nHe went on to earn a B.A. in Mass Communications with a concentration in Film and Television from Shaw University, later joining the Inspiration Networks as an Associate Producer. Under the mentorship of seasoned industry professionals, he contributed to a wide range of programs including producing, directing and editing more than eighty episodes of \"A Muslim Journey to Hope\".\n\nRickey founded the creative banner Under the Sun Studios and has produced the feature film \"Young King\", the documentary \"Open Legs with a Closed Mind\", as well as commercials and music videos across multiple platforms. At Griot and Grits, he brings his production expertise to guide volunteers, capture oral histories, and ensure every story is recorded with care, creativity, and cultural respect."
        }
    ];

    const boardMembers: TeamMember[] = [
    ];

    const goldSponsors: Sponsor[] = [
        {
            name: "Resilient Ventures",
            logo: "/media/logo/RV Color Horizontal.jpg",
            website: "https://resilient-ventures.com"
        }
    ];

    const silverSponsors: Sponsor[] = [];

    const bronzeSponsors: Sponsor[] = [];

    const partners: Sponsor[] = [
        {
            name: "Mass Open Cloud",
            logo: "/media/logo/MOCwordmark_RGB_small.png",
            website: "https://massopen.cloud"
        }
    ];

    const MemberCard = ({ member, onClick }: { member: TeamMember; onClick: () => void }) => (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
            onClick={onClick}
        >
            <div className="relative w-full aspect-square">
                <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-contain bg-gray-100"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-[#a94728] font-medium text-sm">{member.title}</p>
            </div>
        </motion.div>
    );

    const BioModal = ({ member, onClose }: { member: TeamMember; onClose: () => void }) => (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-lg max-w-2xl w-full p-8 relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0 flex flex-col">
                            <div className="relative w-32 h-32">
                                <Image
                                    src={member.photo}
                                    alt={member.name}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            {member.linkedin && (
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 hover:opacity-80 transition-opacity"
                                    aria-label={`${member.name}'s LinkedIn profile`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 72 72"
                                    >
                                        <rect width="72" height="72" fill="#0077b5" rx="8"/>
                                        <path
                                            fill="white"
                                            d="M13.139 27.848h9.623V58.81h-9.623V27.848zm4.813-15.391c3.077 0 5.577 2.5 5.577 5.577 0 3.08-2.5 5.581-5.577 5.581a5.58 5.58 0 1 1 0-11.158zm10.846 15.39h9.23v4.231h.128c1.283-2.434 4.424-5 9.105-5 9.744 0 11.544 6.413 11.544 14.75V58.81h-9.617V43.753c0-3.59-.066-8.209-5-8.209-5.007 0-5.776 3.911-5.776 7.95V58.81h-9.615V27.848z"
                                        />
                                    </svg>
                                </a>
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h2>
                            <p className="text-[#a94728] font-medium mb-4">{member.title}</p>
                            <div className="text-gray-700 leading-relaxed space-y-4">
                                {member.bio.split('\n\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mission Section */}
            <section className="bg-gradient-to-r from-[#a94728] to-[#8b3a1f] text-white py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
                        <p className="text-xl md:text-2xl leading-relaxed">
                            Griot and Grits is a 501(c)(3) nonprofit organization dedicated to preserving
                            the oral histories of African American families through community-centered
                            storytelling and ethical uses of AI.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Team Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Our Team</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 px-20">
                            {teamMembers.map((member) => (
                                <MemberCard
                                    key={member.name}
                                    member={member}
                                    onClick={() => setSelectedMember(member)}
                                />
                            ))}
                        </div>

                        {/* Volunteers Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="mt-12 bg-white rounded-lg shadow-lg overflow-hidden mx-auto"
                            style={{ maxWidth: 'calc(100% - 10rem)' }}
                        >
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Griot & Grits Storykeeping Collective</h3>
                                <p className="text-gray-700 text-lg leading-relaxed text-center mb-8">
                                    Many dedicated volunteers who have contributed countless hours to preserving
                                    and sharing the stories that matter. Their passion and commitment make our mission possible.
                                </p>

                                {/* Creative collage - grid on desktop, vertical on mobile */}
                                <div className="flex flex-col md:relative md:w-full md:h-[500px] gap-4 md:gap-0">
                                    {/* Mobile: vertical stack, Desktop: grid layout */}
                                    <div className="flex flex-col md:relative md:w-full md:h-full gap-4 md:gap-0">
                                        {/* First image */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                            className="relative w-full h-64 md:absolute md:top-0 md:left-0 md:w-[45%] md:h-[45%] shadow-xl z-10"
                                        >
                                            <Image
                                                src="/media/img/2239728647962445031.jpg"
                                                alt="Volunteers at work"
                                                fill
                                                className="object-cover object-top rounded-lg"
                                            />
                                        </motion.div>

                                        {/* Second image */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: 0.4 }}
                                            className="relative w-full h-64 md:absolute md:top-0 md:right-0 md:w-[45%] md:h-[45%] shadow-xl z-10"
                                        >
                                            <Image
                                                src="/media/img/crew2.png"
                                                alt="Community engagement"
                                                fill
                                                className="object-cover object-top rounded-lg"
                                            />
                                        </motion.div>

                                        {/* Third image */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: 0.5 }}
                                            className="relative w-full h-64 md:absolute md:bottom-0 md:left-0 md:w-[45%] md:h-[45%] shadow-xl z-10"
                                        >
                                            <Image
                                                src="/media/img/3797497829222735602.jpg"
                                                alt="Storykeeping session"
                                                fill
                                                className="object-cover object-top rounded-lg"
                                            />
                                        </motion.div>

                                        {/* Fourth image */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: 0.6 }}
                                            className="relative w-full h-64 md:absolute md:bottom-0 md:right-0 md:w-[45%] md:h-[45%] shadow-xl z-10"
                                        >
                                            <Image
                                                src="/media/img/8348915442707023838.jpg"
                                                alt="Volunteer team"
                                                fill
                                                className="object-cover object-top rounded-lg"
                                            />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Board of Advisors Section */}
            {boardMembers.length > 0 && (
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Board of Advisors</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {boardMembers.map((member) => (
                                    <MemberCard
                                        key={member.name}
                                        member={member}
                                        onClick={() => setSelectedMember(member)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Sponsors Section */}
            {(goldSponsors.length > 0 || silverSponsors.length > 0 || bronzeSponsors.length > 0) && (
                <section className="py-20 bg-gray-100">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Our Sponsors</h2>

                        {/* Gold Sponsors */}
                        {goldSponsors.length > 0 && (
                            <div className="mb-16">
                                <h3 className="text-2xl font-bold text-center mb-8 text-yellow-600">Gold Sponsors</h3>
                                <div className="flex flex-wrap justify-center gap-12">
                                    {goldSponsors.map((sponsor) => (
                                        <motion.a
                                            key={sponsor.name}
                                            href={sponsor.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            className="bg-white p-8 rounded-lg shadow-lg"
                                        >
                                            <div className="relative w-64 h-32">
                                                <Image
                                                    src={sponsor.logo}
                                                    alt={sponsor.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Silver Sponsors */}
                        {silverSponsors.length > 0 && (
                            <div className="mb-16">
                                <h3 className="text-2xl font-bold text-center mb-8 text-gray-400">Silver Sponsors</h3>
                                <div className="flex flex-wrap justify-center gap-8">
                                    {silverSponsors.map((sponsor) => (
                                        <motion.a
                                            key={sponsor.name}
                                            href={sponsor.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            className="bg-white p-6 rounded-lg shadow-lg"
                                        >
                                            <div className="relative w-48 h-24">
                                                <Image
                                                    src={sponsor.logo}
                                                    alt={sponsor.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Bronze Sponsors */}
                        {bronzeSponsors.length > 0 && (
                            <div>
                                <h3 className="text-2xl font-bold text-center mb-8 text-orange-600">Bronze Sponsors</h3>
                                <div className="flex flex-wrap justify-center gap-6">
                                    {bronzeSponsors.map((sponsor) => (
                                        <motion.a
                                            key={sponsor.name}
                                            href={sponsor.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            className="bg-white p-4 rounded-lg shadow-lg"
                                        >
                                            <div className="relative w-32 h-16">
                                                <Image
                                                    src={sponsor.logo}
                                                    alt={sponsor.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        )}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Partners Section */}
            {partners.length > 0 && (
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Our Partners</h2>
                            <div className="flex flex-wrap justify-center gap-12">
                                {partners.map((partner) => (
                                    <motion.a
                                        key={partner.name}
                                        href={partner.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-gray-50 p-8 rounded-lg shadow-lg"
                                    >
                                        <div className="relative w-64 h-32">
                                            <Image
                                                src={partner.logo}
                                                alt={partner.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Bio Modal */}
            {selectedMember && (
                <BioModal
                    member={selectedMember}
                    onClose={() => setSelectedMember(null)}
                />
            )}
        </div>
    );
};

export default WhoWeAre;
