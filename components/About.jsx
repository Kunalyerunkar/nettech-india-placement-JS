import React from 'react';
import { Target, Eye, Shield, Briefcase, Award, Users, GraduationCap, Globe, Wrench } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 scroll-mt-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header from Front Page */}
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            NetTech India Placement
          </h2>
          <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 italic font-medium">
            "Bridging the Gap Between Education and Employment."
          </p>
        </div>

        {/* Better Image as per instruction */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 reveal">
          <img
            src="images\web img\As a Parent Company.jpg"
            alt="NetTech India Team"
            className="w-full h-70 md:h-85 object-cover transform hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Company Structure */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 reveal">
            <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-4 flex items-center">
              <Users className="w-6 h-6 mr-2" />
              As a Parent Company
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Comprising <strong>NetTech India</strong> and <strong>NetTech India Placement</strong>, we are your one-stop destination for skill development, career coaching, and job placement. Our purpose is to bridge the gap between education and employment through industry-focused training and structured career support.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We deliver high-quality training and certification programs across IT, software development, networking, cybersecurity, data science, and more. Every program is led by certified trainers with real-world expertise, ensuring students gain practical, job-ready skills that align with today’s industry demands.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl border border-blue-100 dark:border-blue-900/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 reveal">
            <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-4 flex items-center">
              <Briefcase className="w-6 h-6 mr-2" />
              As a Daughter Company
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong>NetTech India Placement</strong> is dedicated to connecting skilled students with top companies across multiple domains. We offer <strong>free placement services</strong> for both IT and non-IT students as well as working professionals seeking career opportunities.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              With a strong network of <strong>4,500+ hiring partners</strong>, we ensure seamless collaboration between skilled candidates and reputable employers. Our streamlined placement process, backed by a committed and experienced team, ensures that every candidate is matched with the right opportunity — efficiently, professionally, and transparently.
            </p>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-xl bg-gradient-to-br from-indigo-900 to-blue-900 dark:from-gray-800 dark:to-indigo-950 text-white shadow-xl transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group reveal">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-white/10 rounded-full mr-4 group-hover:bg-white/20 transition-colors">
                <Eye className="w-8 h-8 text-blue-200" />
              </div>
              <h3 className="text-2xl font-bold">Vision</h3>
            </div>
            <p className="text-blue-100 leading-relaxed">
              To establish a distinguished and industry-aligned placement framework that consistently connects qualified talent with reputable organizations. We are committed to delivering a structured, reliable, and high-quality placement ecosystem that enhances employability, strengthens industry collaboration, and supports long-term career progression. Through data-driven processes, strategic partnerships, and unwavering professional standards, we aim to ensure that every candidate transitions seamlessly from learning to meaningful employment.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-700 dark:from-blue-900 dark:to-indigo-900 text-white shadow-xl transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group reveal">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-white/10 rounded-full mr-4 group-hover:bg-white/20 transition-colors">
                <Target className="w-8 h-8 text-blue-200" />
              </div>
              <h3 className="text-2xl font-bold">Mission</h3>
            </div>
            <p className="text-blue-100 leading-relaxed">
              Our mission is to connect skilled talent with the right career opportunities by delivering reliable, industry-focused placement solutions. We are dedicated to identifying, preparing, and aligning candidates with organizational needs through rigorous skill development, expert mentoring, and strong industry networks. By upholding professionalism, fostering continuous growth, and offering end-to-end career support, we strive to ensure every candidate secures meaningful employment — and every partner organization gains access to exceptional, job-ready talent.
            </p>
          </div>
        </div>

        {/* Values Text Block */}
        <div className="max-w-4xl mx-auto mb-20 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:border-gray-200 transition-colors reveal">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Values</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              At NetTech India Placement, we empower students and professionals by connecting them with genuine job opportunities across IT and non-IT sectors. Our values center on transparency, professionalism, and career-focused guidance.
            </p>
            <p>
              We work closely with over 4,500+ hiring partners to match candidates with roles that suit their skills, interests, and long-term career goals. Our approach focuses on real opportunities, ethical processes, and end-to-end support to ensure every candidate moves confidently into the workplace.
            </p>
            <p>
              Driven by integrity and a commitment to student success, we help individuals build job-ready profiles, understand industry expectations, and transition smoothly into meaningful employment. With a strong presence across Mumbai and Thane, we continue to create skilled, confident, and industry-ready professionals.
            </p>
          </div>
        </div>

        {/* Core Values Icons */}
        <div className="text-center max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">

            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 group reveal">
              <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-700 dark:text-purple-400 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <Award className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">Excellence & Innovation</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Striving for the highest standards in training and placement.</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 group reveal">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-400 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">Career-Focused Learning</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Curriculum designed to meet real-world industry demands.</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 group reveal">
              <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-400 mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                <Shield className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">Integrity & Transparency</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Ethical processes with no hidden charges or false promises.</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 group reveal">
              <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-700 dark:text-orange-400 mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                <Wrench className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">Practical & Hands On</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Emphasis on practical skills and job-readiness.</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 group reveal">
              <div className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-700 dark:text-indigo-400 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <Globe className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">Global Vision, Local Impact</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Connecting local talent with global opportunities.</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;