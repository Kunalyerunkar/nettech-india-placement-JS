import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, RefreshCcw, Send, CheckCircle2 } from 'lucide-react';
import { PLACED_STUDENTS } from '../data/successData';

const SuccessStories = () => {
  const [visibleCount, setVisibleCount] = useState(20);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadMore = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 20, PLACED_STUDENTS.length));
      setIsAnimating(false);
    }, 400);
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
      const card = cardRef.current;
      if (!card) return;
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        key={`${student.id}-${idx}`}
        className="bg-[#1e3a8a] dark:bg-[#1a2e63] text-white rounded-lg overflow-hidden shadow-xl flex flex-col items-center p-4 relative border-4 border-white/5 dark:border-white/10 reveal animate-fade-in-up transition-all duration-200 ease-out cursor-pointer preserve-3d"
        style={{
          animationDelay: `${(idx % 8) * 50}ms`,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="w-full text-center mb-1 border-b border-blue-800 dark:border-blue-900 pb-2" style={{ transform: 'translateZ(20px)' }}>
          <div className="bg-white rounded p-1 inline-block mb-1">
            <img src="/images/logo/NetTech India logo.png" alt="NetTech" className="h-6 object-contain" />
          </div>
          <p className="text-[10px] leading-tight text-blue-100 mt-1">
            NetTech India is glad to announce<br />the placement of our students.
          </p>
        </div>
        <h3 className="font-cursive text-4xl text-yellow-400 mb-4 transform -rotate-2" style={{ transform: 'translateZ(50px) rotate(-2deg)' }}>Congratulation</h3>
        <div className="relative mb-4" style={{ transform: 'translateZ(40px)' }}>
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-yellow-200/60 z-10 rotate-1"></div>
          <div className="bg-white p-2 shadow-lg transform rotate-1">
            <div className="bg-red-600 p-0 w-40 h-48 overflow-hidden relative">
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
        <div className="w-full bg-white py-2 mb-3 text-center transform -skew-x-6 shadow-sm" style={{ transform: 'translateZ(25px) skewX(-6deg)' }}>
          <p className="text-gray-900 font-bold text-sm uppercase tracking-wide transform skew-x-6">{student.role}</p>
        </div>
        <h4 className="text-xl font-bold text-yellow-400 mt-auto" style={{ transform: 'translateZ(20px)' }}>{student.company}</h4>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-20 transition-colors duration-300">
      <section className="bg-blue-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 reveal active">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Hall of Fame</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Celebrating the milestones of our {PLACED_STUDENTS.length}+ students who have transformed their lives through NetTech India.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all cursor-default group">
              <span className="text-blue-200 font-bold group-hover:text-white transition-colors">{PLACED_STUDENTS.length}+</span> <span className="text-white text-sm">Placements</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all cursor-default group">
              <span className="text-blue-200 font-bold group-hover:text-white transition-colors">4500+</span> <span className="text-white text-sm">Partners</span>
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
              className="group relative inline-flex items-center justify-center px-10 py-4 bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-400 font-bold rounded-full border-2 border-blue-700 dark:border-blue-500 hover:bg-blue-700 dark:hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                {isAnimating ? <RefreshCcw className="w-6 h-6 animate-spin mr-2" /> : <ChevronDown className="w-6 h-6 mr-2 group-hover:translate-y-1 transition-transform" />}
                {isAnimating ? 'Loading More...' : `Show More Success Stories (${PLACED_STUDENTS.length - visibleCount} remaining)`}
              </span>
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12"></div>
            </button>
          </div>
        )}
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center reveal">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-12 rounded-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Want to be featured here?</h2>
            <p className="text-blue-100 mb-10 text-lg max-w-xl mx-auto">
              Your dream job is just one step away. Join our free placement cell and start your journey to a top MNC today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/register"
                className="group relative bg-yellow-400 text-blue-900 font-bold py-4 px-10 rounded-xl hover:bg-yellow-300 transition-all shadow-lg hover:scale-110 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Apply for Placement
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12"></div>
              </a>
              <a
                href="/contact"
                className="bg-transparent border-2 border-white/50 text-white font-bold py-4 px-10 rounded-xl hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
              >
                Inquire Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;