import React from "react";
import { Facebook, Linkedin, Twitter, Github, Mail, Phone, MapPin } from "lucide-react";

function Footer() {
    return (
        <footer className="bg-gradient-to-r from-[#1f1f3a] to-[#2b145f] text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold text-white">Job<span className="text-[#6A38C2]">Portal</span></h2>
                    <p className="mt-4 text-sm leading-relaxed">
                        Find your dream job with confidence. We connect talent with top companies
                        across the globe.
                    </p>

                    <div className="flex gap-4 mt-6">
                        <a className="hover:text-white transition"><Facebook size={20} /></a>
                        <a className="hover:text-white transition"><Linkedin size={20} /></a>
                        <a className="hover:text-white transition"><Twitter size={20} /></a>
                        <a className="hover:text-white transition"><Github size={20} /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white cursor-pointer">Browse Jobs</li>
                        <li className="hover:text-white cursor-pointer">Companies</li>
                        <li className="hover:text-white cursor-pointer">Post a Job</li>
                        <li className="hover:text-white cursor-pointer">Career Advice</li>
                    </ul>
                </div>

                {/* Job Categories */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Top Categories</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Frontend Development</li>
                        <li>Backend Development</li>
                        <li>Data Science</li>
                        <li>UI / UX Design</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2">
                            <Mail size={16} /> support@jobportal.com
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone size={16} /> +977 9845692356
                        </li>
                        <li className="flex items-center gap-2">
                            <MapPin size={16} /> Kathmandu, Nepal
                        </li>
                    </ul>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 py-6 text-center text-sm">
                © {new Date().getFullYear()} JobPortal. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
