import About from '@/components/about'
import ContactSection from '@/components/contact'
import GoFundMe from '@/components/gofundme'
import Hero from '@/components/hero'
import MediaCoverage from '@/components/media-coverage'
import Nav from '@/components/nav'
import Services from '@/components/services'
import Testimonials from '@/components/testimonials'
import Works from '@/components/works'
import { loadVideoMetadata, loadFilterMetadata } from '@/lib/load-metadata'
import { getGoFundMeConfig } from '@/lib/feature-flags'
import React from 'react'

const page = () => {
    const videoMetadata = loadVideoMetadata();
    const filterMetadata = loadFilterMetadata();
    const goFundMeConfig = getGoFundMeConfig();

    return (
        <>
            {/* Fixed Donate Now Button */}
            <div className="fixed top-6 right-24 z-50 h-11 flex items-center">
                <a
                    href="#donate"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a94728] to-[#8b3a1f] text-white px-4 py-2 rounded-full font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                    Donate Now
                </a>
            </div>
            <Nav />
            <Hero />
            <About />
            <Services />
            <Works videos={videoMetadata.videos} filters={filterMetadata} />
            {/* <Stats /> */}
            {goFundMeConfig.enabled && goFundMeConfig.campaignId && (
                <GoFundMe
                    campaignId={goFundMeConfig.campaignId}
                    useEmbedded={goFundMeConfig.useEmbedded}
                />
            )}
            <MediaCoverage />
            <Testimonials />
            {/* <FAQ /> */}
            <ContactSection />
        </>
    )
}

export default page