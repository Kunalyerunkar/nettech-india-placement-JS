import React, { useEffect } from 'react';
import { Target, Eye, Shield, Briefcase, Award, Users, GraduationCap, Globe, Wrench } from 'lucide-react';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Hero Header */}
      <section className="bg-blue-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="images\web img\As a Parent Company.jpg" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center reveal active">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About NetTech India Placement</h1>
          <p className="text-xl md:text-2xl text-blue-200 italic font-medium max-w-3xl mx-auto">
            "Bridging the Gap Between Education and Employment."
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Company Overview - Parent & Daughter */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6 reveal">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-800 dark:text-blue-400">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">As a Parent Company</h2>
            </div>
            <div className="prose text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Comprising <strong>NetTech India</strong> and <strong>NetTech India Placement</strong>, we are your one-stop destination for skill
                development, career coaching, and job placement. Our purpose is to bridge the gap between education
                and employment through industry-focused training and structured career support.
              </p>
              <p>
                We deliver high-quality training and certification programs across IT, software development, networking,
                cybersecurity, data science, and more. Every program is led by certified trainers with real-world
                expertise, ensuring students gain practical, job-ready skills that align with today’s industry demands.
              </p>
            </div>
          </div>

          <div className="space-y-6 reveal">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-800 dark:text-green-400">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">As a Daughter Company</h2>
            </div>
            <div className="prose text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                <strong>NetTech India Placement</strong> is dedicated to connecting skilled students with top companies across
                multiple domains. We offer <strong>free placement services</strong> for both IT and non-IT students as well as working
                professionals seeking career opportunities.
              </p>
              <p>
                With a strong network of <strong>4,500+ hiring partners</strong>, we ensure seamless collaboration between skilled
                candidates and reputable employers. Our streamlined placement process, backed by a committed and
                experienced team, ensures that every candidate is matched with the right opportunity — efficiently,
                professionally, and transparently.
              </p>
            </div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-10 border-t-4 border-indigo-600 shadow-sm hover:shadow-md transition-all reveal">
            <div className="flex items-center mb-6">
              <Eye className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mr-4" />
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Our Vision</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              To establish a distinguished and industry-aligned placement framework that consistently connects
              qualified talent with reputable organizations. We are committed to delivering a structured, reliable, and
              high-quality placement ecosystem that enhances employability, strengthens industry collaboration, and
              supports long-term career progression.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-10 border-t-4 border-blue-600 shadow-sm hover:shadow-md transition-all reveal">
            <div className="flex items-center mb-6">
              <Target className="w-10 h-10 text-blue-600 dark:text-blue-400 mr-4" />
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              Our mission is to connect skilled talent with the right career opportunities by delivering reliable,
              industry-focused placement solutions. We are dedicated to identifying, preparing, and aligning
              candidates with organizational needs through rigorous skill development, expert mentoring, and strong
              industry networks.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Core Values</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              At NetTech India Placement, our values center on transparency, professionalism, and career-focused guidance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              { icon: Award, title: "Excellence & Innovation", desc: "Striving for the highest standards in training and placement." },
              { icon: GraduationCap, title: "Career-Focused Learning", desc: "Curriculum designed to meet real-world industry demands." },
              { icon: Shield, title: "Integrity & Transparency", desc: "Ethical processes with no hidden charges or false promises." },
              { icon: Wrench, title: "Practical & Hands On", desc: "Emphasis on practical skills and job-readiness." },
              { icon: Globe, title: "Global Vision, Local Impact", desc: "Connecting local talent with global opportunities." }
            ].map((val, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all text-center reveal">
                <div className="inline-block p-4 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 mb-4">
                  <val.icon className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{val.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team/Leadership Placeholder */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-12 text-center reveal">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Meet Our Leadership</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <img src={`https://randomuser.me/api/portraits/men/${40 + i}.jpg`} alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white dark:border-gray-700 shadow-md object-cover" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Executive Name</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">Director of Placement</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Dedicated to ensuring every student finds their right path.</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;