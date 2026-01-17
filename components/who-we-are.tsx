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
            photo: "/placeholder-team.jpg",
            bio: "Ty McDuffie oversees the operational strategy and community partnerships at Griot and Grits. With a background in nonprofit management and cultural programming, Ty ensures that our initiatives reach and serve the communities we aim to support."
        },
        {
            name: "Sherard Griffin",
            title: "Board Chair",
            photo: "/media/bio/S_Griffin.jpg",
            bio: "Sherard Griffin leads the Griot and Grits Board, providing the vision, mission and strategic direction. He has over 25 years of experience architecting and developing large-scale enterprise data and AI solutions. He is currently Head of Engineering for OpenShift AI at Red Hat, an enterprise open-source Gen AI and MLOps platform.\n\nSherard serves on the Strategic Advisory Board of North Carolina State University's Computer Science Department. He is a passionate advocate for broadening participation in technology, mentoring emerging technologists, and promoting inclusive workforce development across the AI and open-source communities. His work reflects a holistic vision of technology as both a tool for innovation and a platform for empowerment."
        },
        {
            name: "Rickey Thomas",
            title: "Director of Productions",
            photo: "/placeholder-team.jpg",
            bio: "Rickey Thomas leads the technical development and AI implementation at Griot and Grits. His expertise in machine learning and ethical AI practices ensures that our technology serves our community-centered mission while maintaining the highest standards of data privacy and respect."
        }
    ];

    const boardMembers: TeamMember[] = [
        {
            name: "Dr. Angela Martinez",
            title: "Advisory Board Member",
            photo: "/placeholder-board.jpg",
            bio: "Dr. Angela Martinez brings over 20 years of experience in cultural preservation and nonprofit governance. She has served on multiple boards dedicated to community empowerment and educational equity."
        },
        {
            name: "James Washington",
            title: "Advisory Board Member",
            photo: "/placeholder-board.jpg",
            bio: "James Washington is a seasoned technology executive with a passion for digital inclusion. He advises on strategic planning and technology infrastructure to ensure sustainable growth."
        },
        {
            name: "Patricia Chen",
            title: "Advisory Board Member",
            photo: "/placeholder-board.jpg",
            bio: "Patricia Chen is a certified public accountant specializing in nonprofit financial management. She ensures fiscal responsibility and transparent financial practices."
        },
        {
            name: "Rev. Marcus Thompson",
            title: "Advisory Board Member",
            photo: "/placeholder-board.jpg",
            bio: "Rev. Marcus Thompson has dedicated his life to community service and social justice. He provides spiritual guidance and community connection to the organization's mission."
        },
        {
            name: "Dr. Keisha Johnson",
            title: "Advisory Board Member",
            photo: "/placeholder-board.jpg",
            bio: "Dr. Keisha Johnson is a historian specializing in African American studies. Her scholarly expertise enriches our approach to oral history collection and preservation."
        },
        {
            name: "David Okonkwo",
            title: "Advisory Board Member",
            photo: "/placeholder-board.jpg",
            bio: "David Okonkwo is an entrepreneur and philanthropist committed to supporting grassroots initiatives that strengthen Black communities through technology and education."
        },
        {
            name: "Sandra Rivera",
            title: "Advisory Board Member",
            photo: "/placeholder-board.jpg",
            bio: "Sandra Rivera is a legal expert specializing in intellectual property and digital rights. She ensures our practices protect the stories and voices we preserve."
        },
        {
            name: "Michael Bradford",
            title: "Advisory Board Member",
            photo: "/placeholder-board.jpg",
            bio: "Michael Bradford is a media professional with extensive experience in documentary filmmaking and oral history projects. He guides our storytelling methodologies."
        },
        {
            name: "Dr. Tamara Wilson",
            title: "Advisory Board Member",
            photo: "/placeholder-board.jpg",
            bio: "Dr. Tamara Wilson is a sociologist researching intergenerational knowledge transfer in Black families. Her research informs our community engagement strategies."
        },
        {
            name: "Robert Jackson",
            title: "Advisory Board Member",
            photo: "/placeholder-board.jpg",
            bio: "Robert Jackson is a community organizer with deep roots in grassroots movements. He connects our work with community needs and ensures accessibility."
        }
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
            logo: "/moc-logo.png",
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
                        <div className="relative w-32 h-32 flex-shrink-0">
                            <Image
                                src={member.photo}
                                alt={member.name}
                                fill
                                className="object-cover rounded-lg"
                            />
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
                            className="mt-12 bg-white rounded-lg shadow-lg overflow-hidden"
                        >
                            <div className="md:flex">
                                <div className="md:w-1/2 relative h-64 md:h-auto">
                                    <Image
                                        src="/placeholder-volunteers.jpg"
                                        alt="Our dedicated volunteers"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Volunteers</h3>
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        ...and many dedicated volunteers who have contributed countless hours to preserving
                                        and sharing the stories that matter. Their passion and commitment make our mission possible.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Board of Advisors Section */}
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

            {/* Sponsors Section */}
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

            {/* Partners Section */}
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
