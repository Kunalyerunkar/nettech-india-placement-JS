import React, { useState } from 'react';
import { JOB_DOMAINS } from '../constants';
import { Search, ArrowRight, BookOpen, Briefcase, Code2, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Modal from './Modal';

const Domains = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const filteredDomains = JOB_DOMAINS.filter(domain => {
    const term = searchTerm.toLowerCase();
    if (domain.title.toLowerCase().includes(term)) return true;
    if (domain.skills.some(skill => skill.toLowerCase().includes(term))) return true;
    return domain.roles.some(role =>
      role.title.toLowerCase().includes(term) ||
      role.skills.some(skill => skill.toLowerCase().includes(term))
    );
  });

  const displayedDomains = searchTerm ? filteredDomains : JOB_DOMAINS.slice(0, 6);

  const handleOpenDomain = (domain) => {
    setSelectedDomain(domain);
    setSelectedRole(null);
  };

  const handleOpenRole = (role) => {
    setSelectedRole(role);
  };

  const closeModals = () => {
    setSelectedDomain(null);
    setSelectedRole(null);
  };

  const closeRoleModal = () => {
    setSelectedRole(null);
  };

  const getRelatedRoles = (currentRole, allDomains) => {
    const related = [];
    const currentSkills = new Set(currentRole.skills.map(s => s.toLowerCase()));

    allDomains.forEach(d => {
      d.roles.forEach(r => {
        if (r.title === currentRole.title) return;
        const overlap = r.skills.filter(s => currentSkills.has(s.toLowerCase())).length;
        if (overlap >= 1) {
          related.push({ role: r, domainTitle: d.title });
        }
      });
    });
    return related.slice(0, 4);
  };

  return (
    <section id="domains" className="py-20 bg-gray-50 dark:bg-gray-800 scroll-mt-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What’s Your Domain?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Choose from the career paths below. We place you where you belong.
          </p>

          <div className="max-w-md mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search job roles, domains, or skills..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-full leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-all hover:shadow-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedDomains.map((domain, index) => (
            <div
              key={domain.id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700 hover:-translate-y-2 animate-fade-in-up reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{domain.title}</h3>
                  <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
                    {domain.roles.length} Roles
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3">
                  {domain.description}
                </p>
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Key Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {domain.skills.slice(0, 4).map((skill, idx) => (
                      <span key={idx} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded border border-gray-100 dark:border-gray-700">
                        {skill}
                      </span>
                    ))}
                    {domain.skills.length > 4 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">+{domain.skills.length - 4} more</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 rounded-b-xl">
                <button
                  onClick={() => handleOpenDomain(domain)}
                  className="w-full flex items-center justify-center bg-white dark:bg-gray-700 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition-all duration-300 group active:scale-95"
                >
                  View Career Path
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center reveal">
          <Link
            to="/domains"
            className="group relative inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-700 hover:bg-blue-800 md:text-lg transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              View All Domains
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12"></div>
          </Link>
        </div>
      </div>

      <Modal isOpen={!!selectedDomain && !selectedRole} onClose={closeModals} title={selectedDomain?.title}>
        {selectedDomain && (
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                Overview
              </h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-blue-50 dark:bg-gray-800/60 p-4 rounded-lg border border-blue-100 dark:border-gray-700">
                {selectedDomain.description}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <Code2 className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                Core Skills Required
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedDomain.skills.map((skill, idx) => (
                  <span key={idx} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                Available Job Roles
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {selectedDomain.roles.map((role, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOpenRole(role)}
                    className="text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all bg-white dark:bg-gray-800 group active:scale-[0.98]"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h5 className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">{role.title}</h5>
                      <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{role.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {selectedDomain.relatedDomainIds && selectedDomain.relatedDomainIds.length > 0 && (
              <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Related Career Paths</h4>
                <div className="flex flex-wrap gap-4">
                  {JOB_DOMAINS.filter(d => selectedDomain.relatedDomainIds?.includes(d.id)).map(related => (
                    <button
                      key={related.id}
                      onClick={() => handleOpenDomain(related)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium hover:underline transition-colors active:scale-95"
                    >
                      {related.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal isOpen={!!selectedRole} onClose={closeRoleModal} title={selectedRole?.title}>
        {selectedRole && (
          <div className="space-y-8">
            <button
              onClick={closeRoleModal}
              className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-2 transition-colors active:translate-x-[-4px]"
            >
              ← Back to {selectedDomain?.title || 'Domain'}
            </button>

            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800/40">
              <h4 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2">Role Overview</h4>
              <p className="text-indigo-800 dark:text-indigo-200 leading-relaxed">
                {selectedRole.description}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Skills You Need</h4>
              <ul className="grid sm:grid-cols-2 gap-3">
                {selectedRole.skills.map((skill, idx) => (
                  <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="font-medium">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Alternative Roles (Based on similar skills)</h4>
              <div className="flex flex-col space-y-3">
                {getRelatedRoles(selectedRole, JOB_DOMAINS).length > 0 ? (
                  getRelatedRoles(selectedRole, JOB_DOMAINS).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{item.role.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Domain: {item.domainTitle}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (selectedDomain?.title === item.domainTitle) {
                            handleOpenRole(item.role);
                          } else {
                            const newDomain = JOB_DOMAINS.find(d => d.title === item.domainTitle);
                            if (newDomain) handleOpenDomain(newDomain);
                          }
                        }}
                        className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline active:scale-95"
                      >
                        {selectedDomain?.title === item.domainTitle ? 'View Details' : 'Switch Domain'}
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">No direct alternative roles found.</p>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
              <a
                href="https://forms.gle/Qn5vCbw1FsaLizeeA"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">Apply for this Role</span>
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12"></div>
              </a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Domains;