import React, { useState, useEffect } from 'react';
import { Anchor, MapPin, Menu, X, Ship, Boxes, Building2, ChevronRight, Mail, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

const heroImages = [
  "/b1.png",
  "/b2.png",
  "/b3.png"
];

const featuredModels = [
  {
      name: "Naval Defense Class Aircraft Carrier",
      category: "Defense & Naval Engineering",
      image: "/model1.jpeg",
      description: "Witness the pinnacle of precision engineering. Our naval models capture every intricate detail, from the flight deck markings to the hull plating, serving as the perfect centerpiece for defense expos and headquarters."
  },
  {
      name: "Smart-Grid Integrated Port Terminal",
      category: "Port Infrastructure",
      image: "/model8_1.jpeg",
      description: "Comprehensive terminal simulation featuring active LED navigation lighting, automated Ship-to-Shore (STS) crane systems, and a high-fidelity bulk cargo vessel moored alongside."
  },
  {
      name: "Post-Panamax Container Carrier",
      category: "Commercial Shipping",
      image: "/model4.jpeg",
      description: "High-capacity hull design featuring a full deck load of scale-accurate ISO containers with authentic shipping line branding, representing the future of global logistics."
  }
];

function Home({ hasSeenWelcome, onWelcomeComplete }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(!hasSeenWelcome);
  const [welcomeFading, setWelcomeFading] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const [legalSection, setLegalSection] = useState(null); // 'terms' or 'privacy'

  useScrollReveal();

  useEffect(() => {
    const interval = setInterval(() => {
        setActiveModelIndex((prev) => (prev + 1) % featuredModels.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Hero image rotation
    const imageTimer = setInterval(() => {
        setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(imageTimer);
  }, []);

  useEffect(() => {
    if (!showWelcome) return;

    // Start content fade-in slightly after mount
    const contentTimer = setTimeout(() => {
        setContentVisible(true);
    }, 100);

    // Start exit animation after 2.5 seconds (allowing for reading)
    const exitTimer = setTimeout(() => {
        handleSkip();
    }, 2500);

    return () => {
        clearTimeout(contentTimer);
        clearTimeout(exitTimer);
    };
  }, [showWelcome]);

  const handleSkip = () => {
      setWelcomeFading(true);
      setTimeout(() => {
          setShowWelcome(false);
          if (onWelcomeComplete) onWelcomeComplete();
      }, 500); // Wait for slide-up transition to finish
  };

  return (
    <div className="min-h-screen bg-navy-900 text-white font-sans selection:bg-gold-500 selection:text-navy-900 overflow-x-hidden">
      
      {/* Welcome Overlay */}
      {showWelcome && (
        <div 
            className={`fixed inset-0 z-[60] bg-navy-900 flex flex-col items-center justify-center transition-transform duration-500 ease-in-out ${welcomeFading ? '-translate-y-full' : 'translate-y-0'}`}
        >
            <div className={`text-center px-6 transition-opacity duration-500 ease-out ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
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
                <Link to="/showcase" className="hover:text-gold-500 transition-colors duration-300">Models</Link>
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
              <Link to="/showcase" className="block px-3 py-2 hover:bg-navy-800 text-gray-300 hover:text-white">Models</Link>
              <a href="#contact" className="block px-3 py-2 hover:bg-navy-800 text-gray-300 hover:text-white">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-charcoal-900 relative">
             <div className="absolute inset-0 bg-gradient-to-b from-navy-900/90 via-navy-900/40 to-navy-900/90 z-10"></div>
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,31,63,0.8)_100%)] z-10"></div>
             {/* Decorative Grid Overlay */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-10 mix-blend-overlay"></div>
             
             {heroImages.map((img, index) => (
                 <img 
                   key={index}
                   src={img}
                  onError={(e) => {e.target.onerror = null; e.target.src = "/workshop.png"}}
                  alt={`Port Infrastructure ${index + 1}`}
                   className={`absolute inset-0 w-full h-full object-cover transition-all duration-[700ms] ease-in-out transform ${index === currentHeroImage ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`}
                 />
             ))}
          </div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-6 py-2 border border-gold-500/30 rounded-full bg-navy-900/60 backdrop-blur-md animate-fade-in-up">
            <span className="text-gold-500 text-xs md:text-sm tracking-[0.3em] uppercase font-bold">Precision Scale Models</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-none text-white drop-shadow-2xl animate-fade-in-up [animation-delay:100ms]">
            Crafting the <br />
            <span className="relative inline-block mt-2">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 filter drop-shadow-lg">Global Trade</span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50"></div>
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl text-gray-200 font-light leading-relaxed drop-shadow-md animate-fade-in-up [animation-delay:200ms]">
            The architecture of the maritime industry, reimagined in miniature.
          </p>
          
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 animate-fade-in-up [animation-delay:300ms]">
            <a href="#contact" className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-navy-900 transition-all duration-300 bg-gold-500 rounded-sm font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 hover:bg-gold-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                <span className="relative uppercase tracking-widest">Request Consultation</span>
            </a>
            
            <a href="#services" className="px-8 py-4 text-base font-bold text-gold-500 transition-all duration-300 bg-transparent border border-gold-500 rounded-sm hover:bg-gold-500/10 hover:text-gold-400 uppercase tracking-widest hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                Explore Services
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
            <div className="w-6 h-10 border-2 border-gold-500/50 rounded-full flex justify-center p-1">
                <div className="w-1 h-2 bg-gold-500 rounded-full animate-[scroll_1.5s_infinite]"></div>
            </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-navy-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center reveal-hidden">
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
      <section id="team" className="py-24 bg-charcoal-900 border-t border-gold-500/10 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 reveal-hidden">
                <h2 className="text-gold-500 text-lg font-bold tracking-widest uppercase mb-2">Our Team</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-white">Meet Our Visionaries</h3>
            </div>
            
            {/* CEO Card */}
            <div className="flex justify-center mb-16 reveal-hidden">
                <div className="bg-navy-900/80 backdrop-blur-sm border-2 border-gold-500 p-8 rounded-xl w-full max-w-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-300 flex flex-col items-center text-center group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
                    <div className="w-32 h-32 rounded-full bg-navy-800 border-4 border-gold-500 mb-6 overflow-hidden relative shadow-lg group-hover:scale-105 transition-transform duration-500">
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
                    <h4 className="text-3xl font-bold text-white mb-2 group-hover:text-gold-500 transition-colors">Shakeel Ahmed</h4>
                    <p className="text-gold-500 text-lg uppercase tracking-widest font-bold mb-4">CEO & Founder</p>
                    <div className="h-px w-24 bg-gold-500/50 mb-4"></div>
                    <p className="text-gray-300 text-base italic leading-relaxed">
                        "Driving the vision of precision and excellence in every model we craft. Leading the industry with innovation and tradition."
                    </p>
                </div>
            </div>

            <h4 className="text-center text-xl text-gold-500/80 mb-10 font-light tracking-wide uppercase border-b border-gold-500/10 pb-4 max-w-md mx-auto reveal-hidden">Master Craftsmen</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {[
                    { 
                        name: "Pari Solangi", 
                        title: "Digital System Coordinator", 
                        focus: "Manage all Computer-Related operations and Digital workflows for the team.",
                        image: "/pari-avatar.jpeg"
                    },
                    { 
                        name: "Daniyal Solangi", 
                        title: "Color Expert & Surface Finish Specialist", 
                        focus: "Ensure every model has a professional finish and a perfect Aesthetic.",
                        image: "/daniyal-avatar.png"
                    },
                    { 
                        name: "Sami Solangi", 
                        title: "General Operations Manager", 
                        focus: "Oversee every stage of production to ensure the entire team stays on track.",
                        image: "/sami-avatar.png",
                        position: "object-top" 
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
                        name: "Sumair Ahmed", 
                        title: "Technical Lead & Web Developer", 
                        focus: "Handles all technical infrastructure, website development, and digital presence optimization.",
                        image: "/sumair-avatar.jpeg"
                    },
                    { 
                        name: "Habib", 
                        title: "Procurement and Logistics Coordinator", 
                        focus: "Managing all External Affairs and Material Sourcing.",
                        image: "/habib-avatar.png"
                    }
                ].map((member, index) => (
                    <div key={index} className="bg-navy-800/50 backdrop-blur-sm border border-gold-500/30 p-6 rounded-lg w-full max-w-sm hover:border-gold-500 hover:bg-navy-800 transition-all duration-300 flex flex-col items-center text-center group reveal-hidden hover:-translate-y-2">
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
                        <h4 className="text-xl font-bold text-white mb-1 group-hover:text-gold-400 transition-colors">{member.name}</h4>
                        <p className="text-gold-500 text-sm uppercase tracking-wider mb-3">{member.title}</p>
                        <div className="h-px w-12 bg-white/10 mb-3 group-hover:w-24 group-hover:bg-gold-500 transition-all duration-300"></div>
                        <p className="text-gray-400 text-sm italic">
                            "{member.focus}"
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-navy-900 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900 to-charcoal-900 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 reveal-hidden">
            <h2 className="text-gold-500 text-lg font-bold tracking-widest uppercase mb-2">Expertise</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">Specialized Maritime Solutions</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-navy-800/50 backdrop-blur-sm p-8 border border-white/5 hover:border-gold-500 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] reveal-hidden">
              <Boxes className="h-12 w-12 text-gold-500 mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-xl font-bold mb-4 text-white group-hover:text-gold-400 transition-colors">Container Terminals</h4>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Detailed layouts of container yards, gantry cranes, and logistics flows optimized for planning and display.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-navy-800/50 backdrop-blur-sm p-8 border border-white/5 hover:border-gold-500 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] reveal-hidden [transition-delay:100ms]">
              <Ship className="h-12 w-12 text-gold-500 mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-xl font-bold mb-4 text-white group-hover:text-gold-400 transition-colors">Shipping Vessels</h4>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Museum-quality replicas of cargo ships, tankers, and specialized maritime vessels.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-navy-800/50 backdrop-blur-sm p-8 border border-white/5 hover:border-gold-500 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] reveal-hidden [transition-delay:200ms]">
              <Building2 className="h-12 w-12 text-gold-500 mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-xl font-bold mb-4 text-white group-hover:text-gold-400 transition-colors">Port Infrastructure</h4>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Comprehensive models of harbors, jetties, and coastal industrial zones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Model Section */}
      <section className="py-24 bg-navy-800 relative overflow-hidden border-t border-gold-500/10">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-navy-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {featuredModels.map((model, index) => (
                <div 
                    key={index}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-opacity duration-500 absolute inset-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${index === activeModelIndex ? 'opacity-100 z-10 relative' : 'opacity-0 z-0 absolute top-0 left-0 w-full h-full pointer-events-none'}`}
                >
                    <div className="order-2 lg:order-1 reveal-hidden">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-gold-500 to-navy-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative rounded-lg overflow-hidden border border-gold-500/30 bg-navy-900 shadow-2xl aspect-[4/3]">
                                <img 
                                    src={model.image} 
                                    alt={model.name} 
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-navy-900 to-transparent p-6">
                                    <span className="text-gold-500 text-xs font-bold uppercase tracking-widest">{model.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="order-1 lg:order-2 reveal-hidden">
                        <div className="inline-block mb-4 px-4 py-1 border border-gold-500/30 rounded-full bg-navy-900/50 backdrop-blur-sm">
                            <span className="text-gold-500 text-xs tracking-widest uppercase font-bold">Featured Masterpiece</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight min-h-[3.5em] lg:min-h-[2.5em]">
                            {model.name.split(" ").slice(0, -2).join(" ")} <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                                {model.name.split(" ").slice(-2).join(" ")}
                            </span>
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed min-h-[6em]">
                            {model.description}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <Link 
                                to="/showcase" 
                                className="inline-flex items-center justify-center px-10 py-4 text-base font-bold text-navy-900 transition-all duration-300 bg-gold-500 rounded hover:bg-gold-400 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] group min-w-[200px]"
                            >
                                <span className="uppercase tracking-widest mr-2">Explore Collection</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            {/* Dot Indicators */}
                            <div className="flex gap-2 ml-4">
                                {featuredModels.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveModelIndex(idx)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeModelIndex ? 'bg-gold-500 w-8' : 'bg-navy-600 hover:bg-gold-500/50'}`}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Location/Footer Section */}
      <section id="contact" className="bg-charcoal-900 pt-20 pb-10 border-t border-gold-500/20 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 reveal-hidden">
                
                {/* Brand & Description */}
                <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                        <Anchor className="h-8 w-8 text-gold-500" />
                        <span className="text-2xl font-bold tracking-wider text-white">SHAKEEL ENTERPRISES</span>
                    </div>
                    <p className="text-gray-400 leading-relaxed max-w-sm">
                        Based in Karachi, the heart of regional maritime trade. We combine traditional craftsmanship with modern precision to bring the world's ports to your boardroom table.
                    </p>
                    <div className="pt-4">
                        <div className="bg-navy-900 p-6 border-l-4 border-gold-500 rounded-r-lg">
                            <p className="text-gray-300 italic font-light">
                                "Scanning the horizon for the next masterpiece."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div>
                    <h4 className="text-gold-500 text-sm font-bold uppercase tracking-widest mb-8">Get In Touch</h4>
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4 group">
                            <div className="p-3 bg-navy-800 rounded-lg group-hover:bg-gold-500/10 transition-colors duration-300">
                                <MapPin className="h-6 w-6 text-gold-500" />
                            </div>
                            <div>
                                <p className="text-white font-medium mb-1">Headquarters</p>
                                <p className="text-gray-400">Karachi, Pakistan</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-4 group">
                            <div className="p-3 bg-navy-800 rounded-lg group-hover:bg-gold-500/10 transition-colors duration-300">
                                <Mail className="h-6 w-6 text-gold-500" />
                            </div>
                            <div>
                                <p className="text-white font-medium mb-1">Email</p>
                                <a href="mailto:port.models06@gmail.com" className="text-gray-400 hover:text-gold-500 transition-colors duration-300">port.models06@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Connect / Socials */}
                <div>
                    <h4 className="text-gold-500 text-sm font-bold uppercase tracking-widest mb-8">Connect With Us</h4>
                    <p className="text-gray-400 mb-6">
                        Follow our latest projects and behind-the-scenes content on social media.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        {[
                            { icon: Facebook, label: "Facebook", href: "#" },
                            { icon: Instagram, label: "Instagram", href: "#" },
                            { icon: Linkedin, label: "LinkedIn", href: "#" },
                            { icon: Twitter, label: "Twitter", href: "#" }
                        ].map((social, index) => (
                            <a 
                                key={index}
                                href={social.href}
                                className="w-12 h-12 bg-navy-800 border border-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-gold-500 hover:border-gold-500 hover:scale-110 transition-all duration-300 group"
                                aria-label={social.label}
                            >
                                <social.icon className="h-5 w-5" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Shakeel Enterprises. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <button onClick={() => setLegalSection('privacy')} className="hover:text-gold-500 transition-colors duration-300">Privacy Policy</button>
                    <button onClick={() => setLegalSection('terms')} className="hover:text-gold-500 transition-colors duration-300">Terms of Service</button>
                </div>
            </div>
        </div>
      </section>

      {/* Legal Modal */}
      {legalSection && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-navy-900/90 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-navy-900 border border-gold-500 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto relative shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-fade-in-up">
            <button 
                onClick={() => setLegalSection(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
                <X size={24} />
            </button>
            
            <div className="p-8">
                <div className="text-center mb-8">
                    <div className="w-12 h-1 bg-gold-500 mx-auto mb-4"></div>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-widest">
                        {legalSection === 'terms' ? 'Terms of Services' : 'Privacy Policy'}
                    </h2>
                </div>

                <div className="space-y-6 text-gray-300 leading-relaxed text-left">
                    {legalSection === 'terms' ? (
                        <>
                            <div>
                                <h3 className="text-gold-500 font-bold uppercase text-sm mb-2">Customization</h3>
                                <p>All models are bespoke and manufactured based on client-provided specifications or approved CAD data.</p>
                            </div>
                            <div>
                                <h3 className="text-gold-500 font-bold uppercase text-sm mb-2">Intellectual Property</h3>
                                <p>Clients retain rights to their branding; Shakeel Enterprises retains rights to the engineering techniques used in the model construction.</p>
                            </div>
                            <div>
                                <h3 className="text-gold-500 font-bold uppercase text-sm mb-2">Lead Times</h3>
                                <p>Stated timelines are estimates. Formal project schedules will be provided upon the issuance of a Purchase Order (PO).</p>
                            </div>
                            <div>
                                <h3 className="text-gold-500 font-bold uppercase text-sm mb-2">Logistics</h3>
                                <p>International shipping is handled via specialized white-glove couriers to ensure the integrity of the model during transit.</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <h3 className="text-gold-500 font-bold uppercase text-sm mb-2">Data Collection</h3>
                                <p>We only collect information necessary to provide a technical quotation (Company Name, Email, Project Specs).</p>
                            </div>
                            <div>
                                <h3 className="text-gold-500 font-bold uppercase text-sm mb-2">No Third-Party Sharing</h3>
                                <p>Your data is never sold or shared. It is used exclusively for communication between your firm and our engineering team.</p>
                            </div>
                            <div>
                                <h3 className="text-gold-500 font-bold uppercase text-sm mb-2">Communication</h3>
                                <p>By submitting an inquiry, you agree to be contacted via Gmail or Business Phone for the purpose of this specific project brief.</p>
                            </div>
                        </>
                    )}
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <button 
                        onClick={() => setLegalSection(null)}
                        className="text-gold-500 hover:text-white text-sm uppercase tracking-widest transition-colors"
                    >
                        Close Document
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;
