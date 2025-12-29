import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PLACED_STUDENTS } from '../data/successData';

const PlacedStudents = () => {
  // Only show the 10 most recent placements (first 10 in the array)
  const recentStudents = PLACED_STUDENTS.slice(0, 10);

  // Create rows for the scrolling marquee using the 10 students
  const row1 = [...recentStudents, ...recentStudents]; // Duplicate for smooth looping

  const StudentCard = ({ student }) => (
    <div className="bg-[#1e3a8a] dark:bg-[#1a2e63] text-white rounded-lg overflow-hidden shadow-xl flex flex-col items-center p-4 relative w-64 md:w-80 flex-shrink-0 mx-3 md:mx-6 border-4 border-white/5 dark:border-white/10">
      <div className="w-full text-center mb-1 border-b border-blue-800 dark:border-blue-900 pb-2">
        <div className="bg-white rounded p-1 inline-block mb-1">
          <img src="/images/logo/NetTech India logo.png" alt="NetTech" className="h-6 object-contain" />
        </div>
        <p className="text-[10px] leading-tight text-blue-100 mt-1">
          NetTech India is glad to announce<br />the placement of our students.
        </p>
      </div>
      <h3 className="font-cursive text-3xl md:text-4xl text-yellow-400 mb-4 transform -rotate-2">Congratulation</h3>
      <div className="relative mb-4">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-yellow-200/60 z-10 rotate-1"></div>
        <div className="bg-white p-2 shadow-lg transform rotate-1">
          <div className="bg-red-600 p-0 w-32 h-40 md:w-40 md:h-48 overflow-hidden relative">
            <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute bottom-2 -right-4 w-16 h-16 md:w-20 md:h-20 bg-blue-900/10 border-4 border-blue-900 dark:border-blue-950 rounded-full flex items-center justify-center transform -rotate-12 backdrop-blur-[1px]">
          <div className="w-12 h-12 md:w-16 md:h-16 border border-blue-900 dark:border-blue-950 rounded-full flex items-center justify-center">
            <span className="text-blue-900 dark:text-blue-950 font-black text-[8px] md:text-[10px] uppercase">Placed</span>
          </div>
        </div>
      </div>
      <h2 className="text-xl md:text-2xl font-bold mb-3">{student.name}</h2>
      <div className="w-full bg-white py-2 mb-3 text-center transform -skew-x-6">
        <p className="text-gray-900 font-bold text-xs md:text-sm uppercase tracking-wide transform skew-x-6">{student.role}</p>
      </div>
      <h4 className="text-lg md:text-xl font-bold text-yellow-400 mt-auto">{student.company}</h4>
    </div>
  );

  return (
    <section id="placements" className="py-20 bg-gray-50 dark:bg-gray-900 scroll-mt-24 overflow-hidden transition-colors duration-300">
      <style>{`
        @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll-left { animation: scroll-left 40s linear infinite; }
        .animate-scroll-left:hover { animation-play-state: paused; }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Recent Placements</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">See the latest students who have secured their dream roles through our network.</p>
        </div>
      </div>

      <div className="relative reveal">
        <div className="absolute top-0 left-0 h-full w-24 md:w-48 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-24 md:w-48 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-20 pointer-events-none"></div>

        <div className="w-full overflow-hidden">
          <div className="flex w-max animate-scroll-left py-4">
            {row1.map((student, idx) => <StudentCard key={`${student.id}-${idx}`} student={student} />)}
          </div>
        </div>
      </div>

      <div className="text-center mt-12 reveal">
        <Link to="/success-stories" className="inline-flex items-center text-blue-700 dark:text-blue-400 font-semibold hover:text-blue-900 dark:hover:text-blue-300 group text-lg">
          View Hall of Fame ({PLACED_STUDENTS.length} Placed)
          <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default PlacedStudents;