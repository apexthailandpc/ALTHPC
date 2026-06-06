import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PartnersSection = ({ t }) => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3001/api/partners');
        const data = await response.json();
        setPartners(data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };
    fetchPartners();
  }, []);

  const getPlatformIcon = (url) => {
    const className = "w-6 h-6 object-contain";
    if (url.includes('facebook.com')) return <img src="/รูป/fb.webp" alt="FB" className={className} />;
    if (url.includes('instagram.com')) return <img src="/รูป/ig.png" alt="IG" className={className} />;
    if (url.includes('tiktok.com')) return <img src="/รูป/tiktok.png" alt="TikTok" className={className} />;
    if (url.includes('youtube.com') || url.includes('youtu.be')) return <img src="/รูป/yt.png" alt="YT" className={className} />;
    if (url.includes('discord.com') || url.includes('discord.gg')) return <img src="/รูป/discord.png" alt="Discord" className={className} />;
    return null;
  };

  const renderSocialLinks = (socialsList) => {
    const links = [];
    if (!socialsList || !Array.isArray(socialsList)) return null;
    
    // Process list - assuming socialsList is a flat array of URLs
    socialsList.forEach(url => {
      const trimmedUrl = url.trim();
      if(trimmedUrl) {
        const icon = getPlatformIcon(trimmedUrl);
        if (icon) {
          links.push({ url: trimmedUrl, icon });
        }
      }
    });
    
    return links.map((link, i) => (
      <motion.a 
        key={i} 
        href={link.url.startsWith('http') ? link.url : `https://${link.url}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-xl p-2 rounded-full bg-white/5 hover:bg-apex-red text-white transition-colors flex items-center justify-center"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        {link.icon}
      </motion.a>
    ));
  };

  return (
    <section id="partners" className="py-20 bg-apex-dark border-b border-apex-red/20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-apex-red/5 blur-[120px] -z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-black italic tracking-tighter text-white text-center mb-12"
        >
          {t.partners.title}
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, borderColor: '#FF4E1D' }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 flex flex-col items-center gap-4 hover:shadow-[0_0_20px_rgba(255,78,29,0.3)] transition-all duration-300 group"
            >
              <div className="overflow-hidden rounded-lg w-full h-32">
                <img 
                  src={partner.image} 
                  alt={partner.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <h3 className="text-white font-bold text-lg group-hover:text-apex-red transition-colors">{partner.name}</h3>
              <div className="flex gap-2">
                {renderSocialLinks(partner.socialsList)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
