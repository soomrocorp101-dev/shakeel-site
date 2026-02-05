import React, { useState, useEffect } from 'react';
import { Anchor, MapPin, Menu, X, Ship, Boxes, Building2, ChevronRight } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeFading, setWelcomeFading] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Start content fade-in slightly after mount
    const contentTimer = setTimeout(() => {
        setContentVisible(true);
    }, 500);

    // Start exit animation after 2.5 seconds (allowing for reading)
    const exitTimer = setTimeout(() => {
        handleSkip();
    }, 3000);

    return () => {
        clearTimeout(contentTimer);
        clearTimeout(exitTimer);
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
             {/* Placeholder for Macro Shot */}
             <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 to-navy-900/90 z-10"></div>
             <img 
               src="https://images.unsplash.com/photo-1494412574643-35d324698422?q=80&w=2074&auto=format&fit=crop" 
               alt="Container Terminal Model Macro Shot" 
               className="w-full h-full object-cover opacity-40"
             />
          </div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
            Crafting the Architecture of <br />
            <span className="text-gold-500">Global Trade</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
            Precision scale models for the maritime industry.
          </p>
          <div className="mt-10">
            <a href="#contact" className="inline-block bg-gold-500 text-navy-900 font-bold py-4 px-8 rounded-none hover:bg-gold-400 transition-colors duration-300 uppercase tracking-widest border border-gold-500">
              Request Consultation
            </a>
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
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
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
                    { name: "Bilal Hameed", title: "Electrical Lead", focus: "Lighting & Motorized Components" },
                    { name: "Rafiq Yusuf", title: "Assembly Master", focus: "Component Integration & Rigging" },
                    { name: "Noman Ali", title: "Detailing Artist", focus: "Miniature Props & Decals" }
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
