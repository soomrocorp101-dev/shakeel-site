import React, { useState, useEffect } from 'react';
import { Anchor, MapPin, Menu, X, Ship, Boxes, Building2, ChevronRight } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeFading, setWelcomeFading] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const heroImages = [
    "/b1.png",
    "/b2.png",
    "/b3.png"
  ];

  useEffect(() => {
    // Start content fade-in slightly after mount
    const contentTimer = setTimeout(() => {
        setContentVisible(true);
    }, 500);

    // Start exit animation after 2.5 seconds (allowing for reading)
    const exitTimer = setTimeout(() => {
        handleSkip();
    }, 3000);

    // Hero image rotation
    const imageTimer = setInterval(() => {
        setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => {
        clearTimeout(contentTimer);
        clearTimeout(exitTimer);
        clearInterval(imageTimer);
    };
  }, []);

  const handleSkip = () => {
      setWelcomeFading(true);
      setTimeout(() => {
          setShowWelcome(false);
      }, 1000); // Wait for slide-up transition to finish
  };

  return (
    <div className="min-h-screen bg-navy-900 text-white font-sans selection:bg-gold-500 selection:text-navy-900 overflow-x-hidden">
      
      {/* Welcome Overlay */}
      {showWelcome && (
        <div 
            className={`fixed inset-0 z-[60] bg-navy-900 flex flex-col items-center justify-center transition-transform duration-1000 ease-in-out ${welcomeFading ? '-translate-y-full' : 'translate-y-0'}`}
        >
            <div className={`text-center px-6 transition-opacity duration-1000 ease-out ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
                {/* Monogram */}
                <div className="w-24 h-24 mx-auto mb-8 border-2 border-gold-500 flex items-center justify-center rotate-45">
                    <div className="w-20 h-20 border border-gold-500/50 flex items-center justify-center">
                        <span className="text-4xl font-bold text-gold-500 -rotate-45 font-serif">SE</span>
                    </div>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold text-gold-500 mb-4 tracking-wide">
                    Welcome to the<br/>Shakeel Enterprises<br/>Digital Portal
                </h1>
                
                <div className="w-16 h-1 bg-gold-500 mx-auto mb-6"></div>
                
                <p className="text-gray-300 text-lg md:text-xl tracking-wider uppercase">
                    Exploring the precision of your custom port model
                </p>
            </div>

            {/* Skip Button */}
            <button 
                onClick={handleSkip}
                className={`absolute bottom-8 right-8 text-gold-500 hover:text-white transition-colors duration-300 flex items-center space-x-2 text-sm uppercase tracking-widest ${contentVisible ? 'opacity-100' : 'opacity-0'}`}
            >
                <span>Skip Intro</span>
                <ChevronRight size={16} />
            </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-navy-900/90 backdrop-blur-sm border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
              <Anchor className="h-8 w-8 text-gold-500" />
              <span className="text-xl font-bold tracking-wider text-white">SHAKEEL ENTERPRISES</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="hover:text-gold-500 transition-colors duration-300">Home</a>
                <a href="#about" className="hover:text-gold-500 transition-colors duration-300">About</a>
                <a href="#services" className="hover:text-gold-500 transition-colors duration-300">Services</a>
                <a href="#contact" className="hover:text-gold-500 transition-colors duration-300">Contact</a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gold-500 hover:text-white p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-navy-900 border-b border-gold-500/20">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#home" className="block px-3 py-2 hover:bg-navy-800 text-gold-500">Home</a>
              <a href="#about" className="block px-3 py-2 hover:bg-navy-800 text-gray-300 hover:text-white">About</a>
              <a href="#services" className="block px-3 py-2 hover:bg-navy-800 text-gray-300 hover:text-white">Services</a>
              <a href="#contact" className="block px-3 py-2 hover:bg-navy-800 text-gray-300 hover:text-white">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-charcoal-900 relative">
             <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/50 to-navy-900/40 z-10"></div>
             {/* Decorative Grid Overlay */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-10 mix-blend-overlay"></div>
             
             {heroImages.map((img, index) => (
                 <img 
                   key={index}
                   src={img}
                  onError={(e) => {e.target.onerror = null; e.target.src = "/workshop.png"}}
                  alt={`Port Infrastructure ${index + 1}`}
                   className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentHeroImage ? 'opacity-60 scale-105' : 'opacity-0 scale-100'}`}
                 />
             ))}
          </div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4 px-4 py-1 border border-gold-500/30 rounded-full bg-navy-900/50 backdrop-blur-sm animate-[fadeIn_1s_ease-out]">
            <span className="text-gold-500 text-xs md:text-sm tracking-[0.2em] uppercase font-bold">Precision Scale Models</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-none text-white drop-shadow-2xl">
            Crafting the <br />
            <span className="relative inline-block mt-2">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 filter drop-shadow-lg">Global Trade</span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50"></div>
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl text-gray-200 font-light leading-relaxed drop-shadow-md">
            The architecture of the maritime industry, reimagined in miniature.
          </p>
          
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="#contact" className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-navy-900 transition-all duration-200 bg-gold-500 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 hover:bg-gold-400">
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                <span className="relative uppercase tracking-widest">Request Consultation</span>
            </a>
            
            <a href="#services" className="px-8 py-4 text-base font-bold text-gold-500 transition-all duration-200 bg-transparent border border-gold-500 hover:bg-gold-500/10 uppercase tracking-widest">
                Explore Services
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
            <div className="w-6 h-10 border-2 border-gold-500/50 rounded-full flex justify-center p-1">
                <div className="w-1 h-2 bg-gold-500 rounded-full animate-[scroll_1.5s_infinite]"></div>
            </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-gold-500 text-lg font-bold tracking-widest uppercase mb-2">Our Craft</h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">Boutique Precision. Master Craftsmanship.</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                At Shakeel Enterprises, we are a dedicated team of 7 master craftsmen obsessed with the minute details of port infrastructure. 
                We don't just build models; we replicate the pulse of global logistics.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Using diverse materials tailored to each project—from high-grade acrylics to etched brass components—we ensure every container, 
                crane, and vessel is a masterpiece of industrial art.
              </p>
            </div>
            <div className="relative h-96 border border-gold-500/30 p-4">
                <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-gold-500"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-gold-500"></div>
                <img 
                    src="/workshop.png"
                    onError={(e) => {e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"}}
                    alt="Craftsman working on a model"
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-charcoal-900 border-t border-gold-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-gold-500 text-lg font-bold tracking-widest uppercase mb-2">Our Team</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-white">Meet Our Visionaries</h3>
            </div>
            
            {/* CEO Card */}
            <div className="flex justify-center mb-16">
                <div className="bg-navy-900 border-2 border-gold-500 p-8 rounded-xl w-full max-w-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-300 flex flex-col items-center text-center group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
                    <div className="w-32 h-32 rounded-full bg-navy-800 border-4 border-gold-500 mb-6 overflow-hidden relative shadow-lg">
                        <div className="absolute inset-0 flex items-center justify-center text-gold-500/20">
                            <span className="text-4xl font-bold">S</span>
                        </div>
                        <img 
                            src="/ceo-avatar.png" 
                            onError={(e) => {e.target.onerror = null; e.target.src = "https://ui-avatars.com/api/?name=Shakeel+Ahmed&background=001f3f&color=D4AF37&size=128&bold=true"}}
                            alt="Shakeel Ahmed" 
                            className="w-full h-full object-cover rounded-full object-[50%_25%]"
                        />
                    </div>
                    <h4 className="text-3xl font-bold text-white mb-2">Shakeel Ahmed</h4>
                    <p className="text-gold-500 text-lg uppercase tracking-widest font-bold mb-4">CEO & Founder</p>
                    <div className="h-px w-24 bg-gold-500/50 mb-4"></div>
                    <p className="text-gray-300 text-base italic leading-relaxed">
                        "Driving the vision of precision and excellence in every model we craft. Leading the industry with innovation and tradition."
                    </p>
                </div>
            </div>

            <h4 className="text-center text-xl text-gold-500/80 mb-10 font-light tracking-wide uppercase border-b border-gold-500/10 pb-4 max-w-md mx-auto">Master Craftsmen</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {[
                    { 
                        name: "Sami Solangi", 
                        title: "General Operations Manager", 
                        focus: "Oversee every stage of production to ensure the entire team stays on track.",
                        image: "/sami-avatar.png",
                        position: "object-top" 
                    },
                    { 
                        name: "Pari Solangi", 
                        title: "Digital System Coordinator", 
                        focus: "Manage all Computer-Related operations and Digital workflows for the team.",
                        image: "/pari-avatar.png"
                    },
                    { 
                        name: "Daniyal Solangi", 
                        title: "Color Expert & Surface Finish Specialist", 
                        focus: "Ensure every model has a professional finish and a perfect Aesthetic.",
                        image: "/daniyal-avatar.png"
                    },
                    { 
                        name: "Muskaan Solangi", 
                        title: "Lead Fabrication Technician", 
                        focus: "Responsible for the intricate assembly, pasting and making of the models.",
                        image: "/muskaan-avatar.png"
                    },
                    { 
                        name: "Asim Solangi", 
                        title: "Quality Control Engineer", 
                        focus: "Meticulously inspecting every detail to ensure it meets the company's standards.",
                        image: "/asim-avatar.png"
                    },
                    { 
                        name: "Habib", 
                        title: "Procurement and Logistics Coordinator", 
                        focus: "Managing all External Affairs and Material Sourcing.",
                        image: "/habib-avatar.png"
                    }
                ].map((member, index) => (
                    <div key={index} className="bg-navy-800 border border-gold-500/30 p-6 rounded-lg w-full max-w-sm hover:border-gold-500 transition-all duration-300 flex flex-col items-center text-center group">
                        <div className="w-24 h-24 rounded-full bg-navy-900 border-2 border-gold-500 mb-4 overflow-hidden relative">
                             {/* Placeholder for actual images */}
                             <div className="absolute inset-0 flex items-center justify-center text-gold-500/20">
                                <span className="text-2xl font-bold">{member.name.charAt(0)}</span>
                             </div>
                             <img 
                                src={member.image || `https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=001f3f&color=D4AF37&size=128`} 
                                onError={(e) => {
                                    if (member.image && e.target.src.endsWith(member.image)) {
                                        e.target.src = `https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=001f3f&color=D4AF37&size=128`;
                                    }
                                }}
                                alt={member.name} 
                                 style={{ transform: member.scale ? `scale(${member.scale})` : 'none' }}
                                 className={`w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity ${member.position || ''}`}
                              />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                        <p className="text-gold-500 text-sm uppercase tracking-wider mb-3">{member.title}</p>
                        <div className="h-px w-12 bg-white/10 mb-3"></div>
                        <p className="text-gray-400 text-sm italic">
                            "{member.focus}"
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gold-500 text-lg font-bold tracking-widest uppercase mb-2">Expertise</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">Specialized Maritime Solutions</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-navy-800 p-8 border border-white/5 hover:border-gold-500/50 transition-all duration-300 group">
              <Boxes className="h-12 w-12 text-gold-500 mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-xl font-bold mb-4 text-white">Container Terminals</h4>
              <p className="text-gray-400">
                Detailed layouts of container yards, gantry cranes, and logistics flows optimized for planning and display.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-navy-800 p-8 border border-white/5 hover:border-gold-500/50 transition-all duration-300 group">
              <Ship className="h-12 w-12 text-gold-500 mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-xl font-bold mb-4 text-white">Shipping Vessels</h4>
              <p className="text-gray-400">
                Museum-quality replicas of cargo ships, tankers, and specialized maritime vessels.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-navy-800 p-8 border border-white/5 hover:border-gold-500/50 transition-all duration-300 group">
              <Building2 className="h-12 w-12 text-gold-500 mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-xl font-bold mb-4 text-white">Port Infrastructure</h4>
              <p className="text-gray-400">
                Comprehensive models of harbors, jetties, and coastal industrial zones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location/Footer Section */}
      <section id="contact" className="bg-charcoal-900 pt-20 pb-10 border-t border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Shakeel Enterprises</h3>
                    <p className="text-gray-400 mb-6 max-w-md">
                        Based in Karachi, the heart of regional maritime trade. We bring the world's ports to your boardroom table.
                    </p>
                    <div className="flex items-center space-x-3 text-gold-500 mb-2">
                        <MapPin className="h-5 w-5" />
                        <span className="text-gray-300">Karachi, Pakistan</span>
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="bg-navy-900 p-6 border border-white/10 rounded-sm">
                        <p className="text-center text-gray-300 italic">
                            "Scanning the horizon for the next masterpiece."
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Shakeel Enterprises. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    {/* Social links placeholders */}
                </div>
            </div>
        </div>
      </section>

      {/* WhatsApp Floating Action Button */}
      <a 
        href="https://wa.me/923049266020?text=Hello%20Shakeel%20Enterprises,%20I%20want%20more%20details%20about%20your%20company."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-maritime-green hover:bg-opacity-90 text-white p-4 rounded-full shadow-lg animate-subtle-pulse transition-all duration-300 flex items-center justify-center group"
        aria-label="Contact us on WhatsApp"
      >
        <svg 
          viewBox="0 0 24 24" 
          width="32" 
          height="32" 
          fill="currentColor" 
          className="w-8 h-8"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </div>
  );
}

export default App;
