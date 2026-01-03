
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { ChevronDown, RefreshCcw, Send, Play, ChevronLeft, ChevronRight, Sparkles, Calendar, Pause } from 'lucide-react';
import { PLACED_STUDENTS } from '../data/successData';

const SUCCESS_REELS = [
  { id: 'v1', url: "/images/video/0_Presentation_Meeting_1080x1920.mp4", title: "Career Kickstart", tag: "Strategy" },
  { id: 'v2', url: "/images/video/1097610_Electronics_Circuit_1080x1920.mp4", title: "Technical Mastery", tag: "Innovation" },
  { id: 'v3', url: "/images/video/6918191_Motion_Graphics_Motion_Graphic_1080x1920.mp4", title: "Placement Drive", tag: "Industry" },
  { id: 'v4', url: "/images/video/7048907_Animation_Motion_Graphic_1080x1920.mp4", title: "Future Ready", tag: "Success" },
  { id: 'v5', url: "/images/video/0_Presentation_Meeting_1080x1920.mp4", title: "New Horizons", tag: "Goals" },
  { id: 'v6', url: "/images/video/1097610_Electronics_Circuit_1080x1920.mp4", title: "Global Opportunities", tag: "MNC" },
  { id: 'v7', url: "/images/video/6918191_Motion_Graphics_Motion_Graphic_1080x1920.mp4", title: "Skill Upgrade", tag: "Growth" },
  { id: 'v8', url: "/images/video/7048907_Animation_Motion_Graphic_1080x1920.mp4", title: "Dream Job", tag: "Hired" },
];

const SuccessStories = () => {
  const [visibleCount, setVisibleCount] = useState(20);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const loadMore = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 20, PLACED_STUDENTS.length));
      setIsAnimating(false);
    }, 400);
  };

  // Carousel logic for Desktop (Chunky scrolling)
  const reelChunks = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < SUCCESS_REELS.length; i += 4) {
      chunks.push(SUCCESS_REELS.slice(i, i + 4));
    }
    return chunks;
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev === reelChunks.length - 1 ? 0 : prev + 1));
  }, [reelChunks.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev === 0 ? reelChunks.length - 1 : prev - 1));
  }, [reelChunks.length]);

  // Video Management Logic
  const togglePlay = (id, videoElement) => {
    if (playingVideoId === id) {
      videoElement.pause();
      setPlayingVideoId(null);
    } else {
      // Pause all other videos if needed (though usually only one is visible/active)
      const allVideos = document.querySelectorAll('video');
      allVideos.forEach(v => {
        if (v !== videoElement) {
          v.pause();
          v.currentTime = 0;
        }
      });
      videoElement.play().catch(() => { });
      setPlayingVideoId(id);
    }
  };

  const handleVideoHover = (id, e) => {
    if (isMobile) return;
    const video = e.currentTarget.querySelector('video');
    if (video) {
      video.muted = false;
      video.play().catch(() => { });
      setPlayingVideoId(id);
    }
  };

  const handleVideoLeave = (e) => {
    if (isMobile) return;
    const video = e.currentTarget.querySelector('video');
    if (video) {
      video.pause();
      video.currentTime = 0;
      setPlayingVideoId(null);
    }
  };

  const handleVideoClick = (id, e) => {
    const video = e.currentTarget.querySelector('video');
    if (video) {
      togglePlay(id, video);
    }
  };

  const visibleStudents = PLACED_STUDENTS.slice(0, visibleCount);
  const hasMore = visibleCount < PLACED_STUDENTS.length;

  const StudentCard = ({ student, idx }) => {
    const cardRef = useRef(null);
    const handleMouseMove = (e) => {
      const card = cardRef.current;
      if (!card) return;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / 12;
      const rotateY = (centerX - x) / 12;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };
    const handleMouseLeave = () => {
      if (cardRef.current) cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        key={`${student.id}-${idx}`}
        className="bg-[#1e3a8a] dark:bg-[#1a2e63] text-white rounded-lg overflow-hidden shadow-xl flex flex-col items-center p-4 relative border-4 border-white/5 dark:border-white/10 transition-all duration-200 ease-out cursor-pointer preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="w-full text-center mb-1 border-b border-blue-800 dark:border-blue-900 pb-2" style={{ transform: 'translateZ(20px)' }}>
          <div className="bg-white rounded p-1 inline-block mb-1">
            <img src="/images/logo/NetTech India logo.png" alt="NetTech" className="h-6 object-contain" />
          </div>
          <p className="text-[10px] leading-tight text-blue-100 mt-1">NetTech India is glad to announce<br />the placement of our students.</p>
        </div>
        <h3 className="font-cursive text-4xl text-yellow-400 mb-4 transform -rotate-2" style={{ transform: 'translateZ(50px) rotate(-2deg)' }}>Congratulation</h3>
        <div className="relative mb-4" style={{ transform: 'translateZ(40px)' }}>
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-yellow-200/60 z-10 rotate-1"></div>
          <div className="bg-white p-2 shadow-lg transform rotate-1">
            <div className="bg-gray-100 p-0 w-40 h-48 overflow-hidden relative">
              <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="absolute bottom-2 -right-4 w-20 h-20 bg-blue-900/10 border-4 border-blue-900 dark:border-blue-950 rounded-full flex items-center justify-center transform -rotate-12 backdrop-blur-[1px]" style={{ transform: 'translateZ(60px) rotate(-12deg)' }}>
            <div className="w-16 h-16 border border-blue-900 dark:border-blue-950 rounded-full flex items-center justify-center">
              <span className="text-blue-900 dark:text-blue-950 font-black text-[10px] uppercase">Placed</span>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-3" style={{ transform: 'translateZ(30px)' }}>{student.name}</h2>
        <div className="w-full bg-white py-2 mb-2 text-center transform -skew-x-6 shadow-sm" style={{ transform: 'translateZ(25px) skewX(-6deg)' }}>
          <p className="text-gray-900 font-bold text-sm uppercase tracking-wide transform skew-x-6">{student.role}</p>
        </div>
        <h4 className="text-xl font-bold text-yellow-400" style={{ transform: 'translateZ(20px)' }}>{student.company}</h4>

        <div className="mt-4 flex items-center gap-1.5 opacity-80" style={{ transform: 'translateZ(15px)' }}>
          <Calendar className="w-3.5 h-3.5 text-blue-200" />
          <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">Selected on: {student.selectionDate}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-20 transition-colors duration-300 overflow-x-hidden">
      <section className="bg-blue-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Hall of Fame</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Celebrating the milestones of our {PLACED_STUDENTS.length}+ students who have transformed their lives through NetTech India.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
              <span className="text-blue-200 font-bold">{PLACED_STUDENTS.length}+</span> <span className="text-white text-sm">Placements</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
              <span className="text-blue-200 font-bold">4500+</span> <span className="text-white text-sm">Partners</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {visibleStudents.map((student, idx) => (
            <StudentCard key={idx} student={student} idx={idx} />
          ))}
        </div>
        {hasMore && (
          <div className="mt-16 text-center">
            <button
              onClick={loadMore}
              disabled={isAnimating}
              className="group relative inline-flex items-center justify-center px-10 py-4 bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-400 font-bold rounded-full border-2 border-blue-700 dark:border-blue-500 hover:bg-blue-700 dark:hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg"
            >
              {isAnimating ? <RefreshCcw className="w-6 h-6 animate-spin mr-2" /> : <ChevronDown className="w-6 h-6 mr-2" />}
              {isAnimating ? 'Loading More...' : `Show More Success Stories (${PLACED_STUDENTS.length - visibleCount} remaining)`}
            </button>
          </div>
        )}
      </section>

      {/* SUCCESS REELS SLIDESHOW - MOBILE NATIVE SCROLL FIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-40">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
            <Sparkles className="w-4 h-4 fill-current" /> Success Highlights
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">Success <span className="text-blue-600">Reels</span></h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium text-sm md:text-base">Watch how we bridge the gap. Each reel tells a story of transformation and achievement.</p>
        </div>

        <div className="relative">
          {/* Mobile: Scroll Snap Container | Desktop: Carousel Logic Wrapper */}
          <div className="overflow-hidden md:rounded-[2.5rem] bg-transparent md:bg-white md:dark:bg-gray-800 md:p-8 md:shadow-2xl md:border md:border-gray-100 md:dark:border-gray-700 transition-all duration-500">

            {/* Scrollable Area */}
            <div
              ref={scrollRef}
              className={`flex transition-transform duration-700 ease-in-out scrollbar-hide ${isMobile ? 'overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-8' : 'w-full'}`}
              style={!isMobile ? { transform: `translateX(-${currentSlide * 100}%)` } : {}}
            >
              {isMobile ? (
                // MOBILE VIEW: Simple map of all reels with horizontal scroll
                SUCCESS_REELS.map((reel) => (
                  <div
                    key={reel.id}
                    onClick={(e) => handleVideoClick(reel.id, e)}
                    className="flex-shrink-0 w-[75vw] aspect-[9/16] snap-center group relative bg-gray-950 rounded-[2rem] overflow-hidden shadow-xl"
                  >
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      src={reel.url}
                      loop playsInline muted
                    />

                    {/* Play Button Overlay */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${playingVideoId === reel.id ? 'opacity-0 scale-150' : 'opacity-100 scale-100'}`}>
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40 shadow-2xl">
                        <Play className="w-10 h-10 fill-current ml-1" />
                      </div>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                      <span className="text-[10px] font-black text-blue-400 drop-shadow-md uppercase tracking-widest mb-1 block">{reel.tag}</span>
                      <h4 className="text-xl font-bold text-white leading-tight drop-shadow-lg">{reel.title}</h4>
                    </div>
                  </div>
                ))
              ) : (
                // DESKTOP VIEW: Chunked Carousel for layout control
                reelChunks.map((chunk, chunkIdx) => (
                  <div key={chunkIdx} className="w-full flex-shrink-0 grid grid-cols-4 gap-6 px-3">
                    {chunk.map((reel) => (
                      <div
                        key={reel.id}
                        onMouseEnter={(e) => handleVideoHover(reel.id, e)}
                        onMouseLeave={handleVideoLeave}
                        className="group relative aspect-[9/16] bg-gray-950 rounded-[2rem] overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                      >
                        <video
                          className="absolute inset-0 w-full h-full object-cover"
                          src={reel.url}
                          loop playsInline muted
                        />

                        {/* Play Button Overlay */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${playingVideoId === reel.id ? 'opacity-0 scale-150' : 'opacity-100 scale-100'}`}>
                          <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40 shadow-2xl">
                            <Play className="w-8 h-8 fill-current ml-1" />
                          </div>
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                          <span className="text-[10px] font-black text-blue-400 drop-shadow-md uppercase tracking-widest mb-1 block">{reel.tag}</span>
                          <h4 className="text-xl font-bold text-white leading-tight drop-shadow-lg">{reel.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Navigation Controls (Desktop Only) */}
          {!isMobile && reelChunks.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 p-4 bg-white dark:bg-gray-800 rounded-full shadow-2xl border border-gray-100 dark:border-gray-700 hover:bg-blue-600 hover:text-white transition-all z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 p-4 bg-white dark:bg-gray-800 rounded-full shadow-2xl border border-gray-100 dark:border-gray-700 hover:bg-blue-600 hover:text-white transition-all z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Pagination dots (Desktop Only) */}
          {!isMobile && (
            <div className="flex justify-center mt-8 gap-2">
              {reelChunks.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${currentSlide === idx ? 'bg-blue-600 w-8' : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-40 text-center">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-8 md:p-12 rounded-[2rem] md:rounded-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">Want to be featured here?</h2>
            <p className="text-blue-100 mb-8 md:mb-10 text-base md:text-lg max-w-xl mx-auto">
              Your dream job is just one step away. Join our free placement cell and start your journey to a top MNC today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/register"
                className="group relative bg-yellow-400 text-blue-900 font-bold py-4 px-8 md:px-10 rounded-xl hover:bg-yellow-300 transition-all shadow-lg hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Apply for Placement
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12"></div>
              </a>
              <a
                href="/contact"
                className="bg-transparent border-2 border-white/50 text-white font-bold py-4 px-8 md:px-10 rounded-xl hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
              >
                Inquire Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default SuccessStories;
