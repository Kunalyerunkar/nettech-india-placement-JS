
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';

const CustomDropdown = ({
    label,
    options,
    value,
    onChange,
    placeholder = "Select an option",
    icon: Icon,
    searchable = false,
    error = null
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = options.filter(opt =>
        opt.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
        setSearchTerm('');
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {label && (
                <label className="block text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 mb-3 ml-1 tracking-[0.25em]">
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-[1.5rem] border-2 transition-all duration-300 font-bold text-sm
          ${isOpen
                        ? 'bg-white dark:bg-gray-800 border-blue-500 shadow-xl ring-4 ring-blue-500/5 scale-[1.01]'
                        : error
                            ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/50'
                            : 'bg-gray-50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800 hover:border-blue-400/50 hover:bg-white dark:hover:bg-gray-800 shadow-sm'
                    }`}
            >
                <div className="flex items-center gap-4 overflow-hidden">
                    {Icon && (
                        <div className={`${isOpen ? 'text-blue-500 scale-110' : 'text-gray-400'} transition-all`}>
                            <Icon className="w-5 h-5" />
                        </div>
                    )}
                    <span className={`truncate ${value ? 'text-gray-900 dark:text-white font-black' : 'text-gray-400 font-bold'}`}>
                        {value || placeholder}
                    </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-blue-500 transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>

            {isOpen && (
                <div className="absolute z-[100] mt-3 w-full bg-white/98 dark:bg-gray-900/98 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_30px_90px_rgba(0,0,0,0.25)] border border-gray-100 dark:border-gray-800 py-4 animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300 overflow-hidden">

                    {searchable && (
                        <div className="px-6 mb-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    autoFocus
                                    type="text"
                                    className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-2xl py-3 pl-12 pr-6 text-xs font-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    placeholder="Filter options..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>
                    )}

                    <div className="max-h-64 overflow-y-auto custom-scrollbar px-3 space-y-1.5">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleSelect(option)}
                                    className={`w-full text-left px-5 py-3.5 text-sm font-bold transition-all flex items-center justify-between rounded-2xl group/item
                    ${value === option
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400'}`}
                                >
                                    <span className="truncate">{option}</span>
                                    {value === option && <Check className="w-4 h-4 text-white animate-in zoom-in" />}
                                </button>
                            ))
                        ) : (
                            <div className="py-10 text-center text-gray-400 text-[10px] font-black italic uppercase tracking-widest">
                                No Results Found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
