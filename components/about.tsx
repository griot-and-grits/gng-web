"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { Play, ArrowRight } from 'lucide-react';

const About = () => {
    const processItems = [
        {
        number: '1',
        title: 'Record',
        description: 'Help families digitize and catalog interviews, family photos, videos, and important historical documents.'
        },
        {
        number: '2',
        title: 'Collect',
        description: 'Generate metadata to create a comprehensive, searchable library of recorded stories of the lives of Black people.'
        },
        {
        number: '3',
        title: 'Improve',
        description: 'Recreate a documentary-like view of individual stories with the assistance of AI to augment key events with additional relevant background information, photos and videos.'
        },
        {
        number: '4',
        title: 'Display',
        description: 'Build referencable family chapters containing AI-enhanced content for individuals to find out more about their unique family history along with others.'
        }
    ];

    return (
        <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
            {/* Call to Action for Collections */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
            >
                <div className="bg-gradient-to-r from-[#a94728] to-[#8b3a1f] rounded-xl p-8 text-white text-center shadow-xl">
                    <div className="flex items-center justify-center mb-4">
                        <Play className="w-8 h-8 mr-3" />
                        <h4 className="text-2xl font-bold">Explore Our Oral History Collection</h4>
                    </div>
                    <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                        Discover powerful stories, voices, and experiences from our community. 
                        Browse, filter, and watch our growing archive of oral history videos.
                    </p>
                    <Link href="/collection">
                        <button className="bg-white text-[#a94728] font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto text-lg shadow-lg">
                            View Our Collection
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </Link>
                </div>
            </motion.div>
            
            {/* Header */}
            <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
            >
            <h3 className="text-[#a94728] tracking-widest font-semibold text-xl mt-6 mb-4 uppercase">/ Our Purpose</h3>            
            <p className="text-xl font-bold text-neutral-800 max-w-2xl mx-auto">
                Our mission is to preserve the history of the black experience, one voice at a time, through the use of AI and other advanced technologies.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 py-10">
                <div className="flex items-center">
                    <div className="space-y-3 text-left text-xl w-full text-black dark:text-neutral-800">
                        <p>
                            <strong>Griot:</strong> a member of a hereditary caste among the peoples of western Africa whose function is to keep an oral history of the tribe or village and to entertain with stories, poems, songs, dances, etc.  
                            <br />
                            <br />
                            <strong>Grits:</strong> a dish of coarsely ground corn kernels boiled with water or milk and then sometimes fried, eaten as a breakfast dish or as a side dish with meat. A staple in Southern cooking.
                        </p>
                    </div>
                </div>
                <div>
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards, Autoplay]}
                        autoplay={{
                            delay: 1000,
                            disableOnInteraction: false,
                        }}
                        className="max-w-[180px] sm:max-w-[280px]"
                    >
                        <SwiperSlide>
                            <Image
                                src="https://res.cloudinary.com/ducxigdil/image/upload/v1739464588/about-3_iin3fu.png"
                                width={250}
                                height={350}
                                className='object-cover h-[320px] sm:h-[400px] w-[280px] rounded-2xl'
                                alt="About Us Image"
                    
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                            src="https://res.cloudinary.com/ducxigdil/image/upload/v1739464588/about-2_kecd9x.png"
                            width={250}
                            height={350}
                            className='object-cover h-[320px] sm:h-[400px] w-[280px] rounded-2xl'
                            alt="About Us Image"
                            
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                            src="https://res.cloudinary.com/ducxigdil/image/upload/v1738772015/photo-1531384441138-2736e62e0919_u0qhau.jpg"
                            width={250}
                            height={350}
                            className='object-cover h-[320px] sm:h-[400px] w-[280px] rounded-2xl'
                            alt="About Us Image"                        
                        />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                src="https://res.cloudinary.com/ducxigdil/image/upload/v1739464588/about-5_y1c2hw.png"
                                width={250}
                                height={350}
                                className='object-cover h-[320px] sm:h-[400px] w-[280px] rounded-2xl'
                                alt="About Us Image"
                    
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                src="https://res.cloudinary.com/ducxigdil/image/upload/v1738771857/photo-1617551307538-c9cdb9d71289_flqy5x.jpg"
                                width={250}
                                height={350}
                                className='object-cover h-[320px] sm:h-[400px] w-[280px] rounded-2xl'
                                alt="About Us Image"
                    
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                src="https://res.cloudinary.com/ducxigdil/image/upload/v1738772206/photo-1604095087269-e7289837cf40_gobij2.jpg"
                                width={250}
                                height={350}
                                className='object-cover h-[320px] sm:h-[400px] w-[280px] rounded-2xl'
                                alt="About Us Image"
                    
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                            src="https://res.cloudinary.com/ducxigdil/image/upload/v1738771924/photo-1529245019870-59b249281fd3_htrgci.jpg"
                            width={250}
                            height={350}
                            className='object-cover h-[320px] sm:h-[400px] w-[280px] rounded-2xl'
                            alt="About Us Image"
                            
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                            src="https://res.cloudinary.com/ducxigdil/image/upload/v1739464588/about-8_jwajbx.png"
                            width={250}
                            height={350}
                            className='object-cover h-[320px] sm:h-[400px] w-[280px] rounded-2xl'
                            alt="About Us Image"                        
                        />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            </motion.div>

            {/* Process Grid */}
            <div className="grid md:grid-cols-2 gap-8">
            {processItems.map((item, index) => (
                <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 rounded-lg p-6 relative border border-[#a94728]"
                >
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#a94728] rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-white">{item.number}</span>
                    </div>
                    <div>
                    <h4 className="text-xl font-bold text-neutral-800 mb-2">{item.title}</h4>
                    <p className="text-gray-500">{item.description}</p>
                    </div>
                </div>
                </motion.div>
            ))}
            </div>
        </div>
        </section>
    );
};

export default About;
