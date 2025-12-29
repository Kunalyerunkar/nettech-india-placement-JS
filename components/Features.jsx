import React from 'react';
import { CheckCircle2, AlertCircle, ArrowRightCircle } from 'lucide-react';
import { WHY_CHOOSE_US, CHALLENGES } from '../constants';

const Features = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Why Choose Us */}
        <div className="mb-24 reveal">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img
                src="images\web img\Why Choose Us.svg"
                alt="Students succeeding"
                className="rounded-2xl shadow-xl w-full bg-white object-cover h-[490px] hover:shadow-2xl transition-shadow duration-300"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Why Choose Us?</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {WHY_CHOOSE_US.map((item, idx) => (
                  <div key={idx} className="flex items-start group p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors duration-300">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-green-800 dark:group-hover:text-green-300 transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Challenges vs Solutions Tree Diagram Style */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-inner reveal border border-gray-100 dark:border-gray-700">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Challenges vs Solutions</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">How we transform your career trajectory</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 relative">
            {/* The Tree Connector (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <ArrowRightCircle className="w-12 h-12 text-blue-600 bg-white dark:bg-gray-700 rounded-full shadow-lg animate-pulse" />
            </div>

            {/* Problems */}
            <div className="md:w-1/2 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border-l-4 border-red-400 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-red-600 mb-6 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2" />
                Common Challenges
              </h3>
              <ul className="space-y-4">
                {CHALLENGES.map((challenge, idx) => (
                  <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-700 dark:hover:text-red-400 transition-colors">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution */}
            <div className="md:w-1/2 bg-blue-700 p-8 rounded-2xl shadow-lg text-white border-l-4 border-yellow-400 transform hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <CheckCircle2 className="w-6 h-6 mr-2 text-yellow-400" />
                Our Tailored Solution
              </h3>
              <p className="text-blue-100 leading-relaxed text-lg">
                Our tailored placement solutions connect students directly with the right companies based on their skills and interests.
                With access to <strong className="text-white">4,500+ partner organizations</strong>, we match each candidate to suitable job roles, ensuring faster hiring, genuine opportunities, and successful career beginnings across both IT and Non-IT sectors.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;