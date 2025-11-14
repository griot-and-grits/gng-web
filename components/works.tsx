"use client"

import type React from "react";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Play, Clock, User, Tag, Calendar, MapPin } from "lucide-react";
import VideoPlayer from './video-player';
import { Video, FilterMetadata } from '@/lib/video-metadata';

interface WorksProps {
  videos: Video[];
  filters: FilterMetadata;
}

// Calculate popularity score for a video based on tag and people popularity
function calculateVideoPopularity(video: Video, filters: FilterMetadata): number {
  let tagScore = 0;
  let peopleScore = 0;
  
  // Sum popularity scores for tags
  video.tags.forEach(tag => {
    const tagFilter = filters.tags.find(t => t.name === tag);
    if (tagFilter) {
      tagScore += tagFilter.popularity;
    }
  });
  
  // Sum popularity scores for people
  video.people.forEach(person => {
    const personFilter = filters.people.find(p => p.name === person);
    if (personFilter) {
      peopleScore += personFilter.popularity;
    }
  });
  
  // Calculate average score (tag score + people score) / total items
  const totalItems = video.tags.length + video.people.length;
  return totalItems > 0 ? (tagScore + peopleScore) / totalItems : 0;
}

const FeaturedStories: React.FC<WorksProps> = ({ videos, filters }) => {
  const controls = useAnimation()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [featuredVideos, setFeaturedVideos] = useState<Video[]>([]);
  const [expandedTags, setExpandedTags] = useState<{ [videoId: string]: boolean }>({});
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [videoId: string]: boolean }>({});

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  useEffect(() => {
    // Calculate popularity scores and get top 6 videos
    const videosWithPopularity = videos.map(video => ({
      ...video,
      popularityScore: calculateVideoPopularity(video, filters)
    }));
    
    // Sort by popularity score descending, then by creation date descending
    const sortedVideos = videosWithPopularity.sort((a, b) => {
      if (b.popularityScore !== a.popularityScore) {
        return b.popularityScore - a.popularityScore;
      }
      return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
    });
    
    // Take only top 6
    setFeaturedVideos(sortedVideos.slice(0, 6));
  }, [videos, filters]);

  const handleVideoPlay = (video: Video) => {
    if (video && video.videoUrl && video.videoUrl.trim() !== '') {
      setSelectedVideo(video);
      setIsVideoPlayerOpen(true);
    }
  };

  const handleVideoPlayerClose = () => {
    setIsVideoPlayerOpen(false);
    setSelectedVideo(null);
  };

  const toggleTagExpansion = (videoId: string) => {
    setExpandedTags(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  const toggleDescriptionExpansion = (videoId: string) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  return (
    <section className="pt-20 overflow-hidden">
      <div className="container mx-auto px-4">        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h3 className="text-[#a94728] tracking-widest font-semibold text-xl mt-6 mb-4 uppercase">/ Featured Stories</h3>
          <p className="text-xl font-bold text-neutral-800 max-w-2xl mx-auto">
            Discover and watch the rich tapestry of Black experiences
          </p>
        </motion.div>

        {/* Video Grid - Using Collection Page Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gray-100">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleVideoPlay(video)}
                    className="bg-white/90 rounded-full p-3 hover:bg-white transition-colors"
                    aria-label={`Play ${video.title}`}
                  >
                    <Play className="w-6 h-6 text-black ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {video.title}
                </h3>
                
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <User className="w-4 h-4 mr-2" />
                  <div className="flex flex-wrap gap-1">
                    {video.interviewees.map((interviewee, index) => (
                      <span key={interviewee}>
                        {interviewee}
                        {index < video.interviewees.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-gray-600 text-sm mb-4">
                  <p className={expandedDescriptions[video.id] ? '' : 'line-clamp-3'}>
                    {video.description}
                  </p>
                  {video.description.length > 150 && (
                    <button
                      onClick={() => toggleDescriptionExpansion(video.id)}
                      className="text-xs text-[#a94728] hover:text-[#8b3a1f] underline mt-1 cursor-pointer"
                    >
                      {expandedDescriptions[video.id] ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <div className="flex flex-wrap gap-1">
                    {video.locations.map((location, index) => (
                      <span key={location.name}>
                        {location.name}
                        {index < video.locations.length - 1 && '; '}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(video.createdDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(expandedTags[video.id] ? video.tags : video.tags.slice(0, 3)).map(tag => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                  {video.tags.length > 3 && (
                    <button
                      onClick={() => toggleTagExpansion(video.id)}
                      className="text-xs text-[#a94728] hover:text-[#8b3a1f] underline cursor-pointer"
                    >
                      {expandedTags[video.id] 
                        ? 'Show less' 
                        : `+${video.tags.length - 3} more`
                      }
                    </button>
                  )}
                </div>

                <button 
                  onClick={() => handleVideoPlay(video)}
                  className="w-full bg-[#a94728] text-white py-2 rounded-lg hover:bg-[#8b3a1f] transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Watch Video
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Player Modal */}
        <VideoPlayer
          isOpen={isVideoPlayerOpen}
          onClose={handleVideoPlayerClose}
          videoUrl={selectedVideo?.videoUrl || ''}
          title={selectedVideo?.title || ''}
        />
      </div>
    </section>
  )
}

export default FeaturedStories
