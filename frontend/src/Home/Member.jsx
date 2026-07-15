import React from 'react';
import { Mail, Briefcase, Instagram, Facebook } from 'lucide-react';

const Member = () => {
    const data = [
        {
            name: "Rakesh Sir",
            designation: "Director & Physics Teacher",
            experience: "25+ Years Experience",
            email: "rakeshphysicsreply@gmail.com",
            imgURL: "https://res.cloudinary.com/dkt7ksipv/image/upload/v1784041388/IMG_20260120_130106_qv00ea.png",
            socials: { 
                instagram: "https://www.instagram.com/rakeshpysics/", 
                facebook: "https://www.facebook.com/rakeshkumarjha86" 
            }
        },
        {
            name: "Prince Kumar",
            designation: "Managing Director",
            experience: "8+ Years Experience",
            email: "rakeshphysicsreply@gmail.com",
            imgURL: "https://res.cloudinary.com/dkt7ksipv/image/upload/v1784041387/Prince_aaglaf.png",
            socials: { 
                instagram: "https://www.instagram.com/pkr_princekumarraj/", 
                facebook: "https://www.facebook.com/rakeshkumarjha86" 
            }
        }
    ];

    return (
        <section className="bg-black text-white py-16 px-4 min-h-screen flex flex-col justify-center items-center">
            {/* Header section */}
            <div className="max-w-5xl w-full text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black tracking-wider text-white uppercase mb-4">
                    Our <span className="text-blue-600 drop-shadow-[0_0_15px_rgba(37,99,235,0.6)]">Leadership</span>
                </h2>
                <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mt-2"></div>
            </div>

            {/* Members Grid */}
            <div className="grid gap-8 md:grid-cols-2 max-w-5xl w-full">
                {data.map((member, index) => (
                    <div 
                        key={index} 
                        className="card card-side bg-zinc-950 rounded-none border-2 border-blue-600/30 hover:border-blue-500 shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all duration-300 group"
                    >
                        {/* Image section */}
                        <figure className="w-2/5 relative border-r border-blue-600/20 bg-zinc-900">
                            <img 
                                src={member.imgURL} 
                                alt={member.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        </figure>

                        {/* Content section */}
                        <div className="card-body w-3/5 p-6 justify-between bg-black">
                            <div>
                                <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-blue-500 transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mt-1">
                                    {member.designation}
                                </p>

                                <div className="space-y-3 mt-6">
                                    <div className="flex items-center gap-3 text-sm text-zinc-400">
                                        <Briefcase className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                        <span>{member.experience}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-zinc-400 truncate">
                                        <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                        <span className="truncate">{member.email}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer / Socials */}
                            <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-900">
                                <div className="flex gap-4">
                                    {member.socials.instagram && (
                                        <a target='_blank' href={member.socials.instagram} className="text-zinc-500 hover:text-blue-500 transition-colors" aria-label="Instagram">
                                            <Instagram className="w-5 h-5" />
                                        </a>
                                    )}
                                    {member.socials.facebook && (
                                        <a target='_balnk' href={member.socials.facebook} className="text-zinc-500 hover:text-blue-500 transition-colors" aria-label="Facebook">
                                            <Facebook className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Member;