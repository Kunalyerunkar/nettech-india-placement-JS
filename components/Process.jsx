import React from 'react';
import { PROCESS_STEPS } from '../constants';
import { QrCode, UserCheck, MonitorPlay, Briefcase } from 'lucide-react';

const icons = [QrCode, UserCheck, MonitorPlay, Briefcase];

const Process = () => {
  return (
    <section id="process" className="py-20 bg-gradient-to-b from-blue-900 to-indigo-900 dark:from-gray-900 dark:to-black text-white scroll-mt-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Pathway to Employment</h2>
          <p className="text-blue-200 dark:text-gray-400 max-w-2xl mx-auto">
            NetTech India offers a completely free placement support system. Follow our structured 4-step process to begin your job journey with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 reveal">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = icons[idx];
            return (
              <div key={step.id} className="relative group">
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-1 bg-blue-700 dark:bg-gray-700 -z-10 group-hover:bg-blue-600 dark:group-hover:bg-gray-600 transition-colors"></div>
                )}

                <div className="bg-blue-800 dark:bg-gray-800 rounded-xl p-6 h-full border border-blue-700 dark:border-gray-700 hover:border-blue-500 dark:hover:border-gray-500 transition-all duration-300 hover:-translate-y-2 shadow-xl">
                  <div className="w-16 h-16 bg-blue-600 dark:bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 shadow-inner mx-auto lg:mx-0">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Step {step.id}: {step.title}</h3>
                  <p className="text-blue-200 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  {step.details && (
                    <ul className="text-xs text-blue-300 dark:text-gray-400 space-y-1 bg-blue-900/50 dark:bg-gray-900/50 p-3 rounded-lg">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                  {step.id === 1 && (
                    <div className='static pl-10 w-10/12 justify-center'>
                      <a
                        href="https://forms.gle/Qn5vCbw1FsaLizeeA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform hover:scale-105 active:scale-95 inline-block"
                      >
                        <div className="mt-4 w-10/12 p-1.5 rounded-lg flex justify-center bg-white dark:bg-white shadow-lg">
                          <img src="/images/qr code/home qr.png" alt="Registration QR" className="rounded-lg p-1 bg-white" />
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center reveal">
          <a
            href="https://forms.gle/Qn5vCbw1FsaLizeeA"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-all transform hover:scale-110 active:scale-95 shadow-lg animate-pulse hover:animate-none overflow-hidden"
          >
            <span className="relative z-10">Register Now - It's Free!</span>
            <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12"></div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Process;