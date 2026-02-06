import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Anchor, ShoppingCart, Plus, Minus, X, Send, FileText, CheckCircle, Lock, Building, MapPin, User, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import emailjs from '@emailjs/browser';

// --- Sub-components ---

const ModelCard = ({ model, index, onAddToQuote }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Helper to get image source, handling both single string and array
  const images = Array.isArray(model.image) ? model.image : [model.image];
  const hasMultipleImages = images.length > 1;

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAdd = () => {
    onAddToQuote(model, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000); // Reset button state after 2s
  };

  return (
    <div 
      className="bg-navy-900/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-gold-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-300 group flex flex-col reveal-hidden"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative h-72 overflow-hidden bg-navy-950">
        <div 
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0 relative">
               <img 
                src={img} 
                alt={`${model.name} - View ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-60 pointer-events-none"></div>
            </div>
          ))}
        </div>
        
        {/* Slider Controls */}
        {hasMultipleImages && (
            <>
                <button 
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-gold-500 text-white hover:text-navy-900 p-1 rounded-full transition-colors z-20 backdrop-blur-sm"
                >
                    <ChevronLeft size={20} />
                </button>
                <button 
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-gold-500 text-white hover:text-navy-900 p-1 rounded-full transition-colors z-20 backdrop-blur-sm"
                >
                    <ChevronRight size={20} />
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
                    {images.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`w-1.5 h-1.5 rounded-full ${idx === currentImageIndex ? 'bg-gold-500' : 'bg-white/50'}`}
                        />
                    ))}
                </div>
            </>
        )}
      </div>
      
      <div className="p-8 flex-grow flex flex-col relative">
        <div className="absolute -top-10 right-8 w-16 h-16 bg-navy-800 rounded-full border-4 border-navy-900 flex items-center justify-center shadow-xl z-10 group-hover:scale-110 transition-transform duration-300">
             <Anchor className="text-gold-500 w-8 h-8" />
        </div>

        <div className="mb-2">
            <span className="text-gold-500 text-xs font-bold uppercase tracking-widest">{model.category}</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-6 group-hover:text-gold-400 transition-colors leading-tight min-h-[3.5rem]">{model.name}</h3>
        
        <div className="space-y-6 mb-8 flex-grow">
          <div>
            <span className="text-gray-500 text-xs uppercase font-bold block mb-1">Material</span>
            <span className="text-gray-300 text-sm block leading-snug">{model.material}</span>
          </div>
          
          <div className="pt-4 border-t border-white/5">
             <span className="text-gold-500 text-xs font-bold uppercase tracking-widest block mb-2">Technical Details</span>
             <p className="text-gray-300 text-sm leading-relaxed">{model.technicalDetails}</p>
          </div>
        </div>

        {/* Quantity and Add to Quote */}
        <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4 bg-navy-950/50 p-2 rounded-lg border border-white/5">
                <button onClick={handleDecrement} className="p-2 text-gold-500 hover:text-white transition-colors">
                    <Minus size={16} />
                </button>
                <span className="text-white font-mono font-bold w-8 text-center">{quantity}</span>
                <button onClick={handleIncrement} className="p-2 text-gold-500 hover:text-white transition-colors">
                    <Plus size={16} />
                </button>
            </div>
            
            <button 
                onClick={handleAdd}
                className={`w-full font-bold py-4 px-4 rounded-sm transition-all duration-300 uppercase tracking-widest text-sm flex items-center justify-center space-x-2 shadow-[0_4px_14px_0_rgba(212,175,55,0.39)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.23)] hover:-translate-y-1 ${isAdded ? 'bg-green-600 text-white' : 'bg-gold-500 text-navy-900 hover:bg-gold-400'}`}
            >
                <span>{isAdded ? 'Added' : 'Add to Project Brief'}</span>
                {!isAdded && <FileText size={16} />}
            </button>
        </div>
      </div>
    </div>
  );
};

const CartModal = ({ isOpen, onClose, cartItems, onRemove, onProceed }) => {
  if (!isOpen) return null;

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" onClick={onClose}></div>
        
        {/* Modal Content */}
        <div className="relative bg-navy-900 border border-gold-500/30 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh] animate-fade-in-up">
            {/* Header */}
            <div className="bg-navy-800 p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="text-gold-500" size={24} />
                    Project Brief
                </h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                    <X size={24} />
                </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-grow space-y-4">
                {cartItems.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">
                        Your project brief is empty.
                    </div>
                ) : (
                    cartItems.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-navy-950/50 p-4 rounded-lg border border-white/5">
                            <div>
                                <h4 className="font-bold text-white text-sm">{item.model.name}</h4>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-mono text-gray-300">x{item.quantity}</span>
                                <button onClick={() => onRemove(item.model.name)} className="text-red-400 hover:text-red-300 transition-colors p-1">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
                <div className="bg-navy-800 p-6 border-t border-white/10">
                    <div className="flex justify-between items-center mb-6 text-sm">
                        <span className="text-gray-400">Total Items:</span>
                        <span className="text-gold-500 font-bold font-mono text-lg">{totalItems}</span>
                    </div>
                    <button 
                        onClick={onProceed}
                        className="w-full bg-gold-500 text-navy-900 font-bold py-4 px-4 rounded hover:bg-gold-400 transition-colors duration-300 uppercase tracking-widest text-sm flex items-center justify-center space-x-2 shadow-lg"
                    >
                        <span>Proceed to Inquiry</span>
                        <ArrowLeft className="rotate-180" size={16} />
                    </button>
                </div>
            )}
        </div>
    </div>
  );
};

const InquiryForm = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        fullName: '',
        designation: '',
        companyName: '',
        industry: '',
        email: '',
        phone: '',
        location: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-md" onClick={onClose}></div>
            
            <div className="relative bg-navy-900 border border-gold-500/30 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up">
                <div className="bg-navy-800 p-6 border-b border-gold-500/20 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Lock className="text-gold-500" size={24} />
                        <div>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wider">Secure Document Portal</h2>
                            <p className="text-xs text-gray-400">Project Inquiry Submission</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Details */}
                        <div className="col-span-1 md:col-span-2">
                             <h3 className="text-gold-500 text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Officer Details</h3>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 uppercase font-bold">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-gold-500/50" size={18} />
                                <input 
                                    type="text" name="fullName" required 
                                    className="w-full bg-navy-800 border border-white/20 rounded p-3 pl-10 text-white placeholder-gray-400 focus:border-gold-500 focus:outline-none transition-colors"
                                    placeholder="e.g. John Doe"
                                    value={formData.fullName} onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 uppercase font-bold">Official Designation</label>
                            <div className="relative">
                                <input 
                                    type="text" name="designation" required 
                                    className="w-full bg-navy-800 border border-white/20 rounded p-3 text-white placeholder-gray-400 focus:border-gold-500 focus:outline-none transition-colors"
                                    placeholder="e.g. Procurement Manager"
                                    value={formData.designation} onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Company Details */}
                        <div className="col-span-1 md:col-span-2 mt-4">
                             <h3 className="text-gold-500 text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Company Information</h3>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 uppercase font-bold">Company Name</label>
                            <div className="relative">
                                <Building className="absolute left-3 top-3 text-gold-500/50" size={18} />
                                <input 
                                    type="text" name="companyName" required 
                                    className="w-full bg-navy-800 border border-white/20 rounded p-3 pl-10 text-white placeholder-gray-400 focus:border-gold-500 focus:outline-none transition-colors"
                                    placeholder="e.g. Global Maritime Logistics"
                                    value={formData.companyName} onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 uppercase font-bold">Industry Sector</label>
                            <input 
                                type="text" name="industry" required 
                                className="w-full bg-navy-800 border border-white/20 rounded p-3 text-white placeholder-gray-400 focus:border-gold-500 focus:outline-none transition-colors"
                                placeholder="e.g. Shipping / Oil & Gas"
                                value={formData.industry} onChange={handleChange}
                            />
                        </div>

                        {/* Contact Details */}
                        <div className="col-span-1 md:col-span-2 mt-4">
                             <h3 className="text-gold-500 text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Contact & Location</h3>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 uppercase font-bold">Professional Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-gold-500/50" size={18} />
                                <input 
                                    type="email" name="email" required 
                                    className="w-full bg-navy-800 border border-white/20 rounded p-3 pl-10 text-white placeholder-gray-400 focus:border-gold-500 focus:outline-none transition-colors"
                                    placeholder="name@company.com"
                                    value={formData.email} onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 uppercase font-bold">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 text-gold-500/50" size={18} />
                                <input 
                                    type="tel" name="phone" required 
                                    className="w-full bg-navy-800 border border-white/20 rounded p-3 pl-10 text-white placeholder-gray-400 focus:border-gold-500 focus:outline-none transition-colors"
                                    placeholder="+92 300 1234567"
                                    value={formData.phone} onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <label className="text-xs text-gray-400 uppercase font-bold">Project Location (Port/City)</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-gold-500/50" size={18} />
                                <input 
                                    type="text" name="location" required 
                                    className="w-full bg-navy-800 border border-white/20 rounded p-3 pl-10 text-white placeholder-gray-400 focus:border-gold-500 focus:outline-none transition-colors"
                                    placeholder="e.g. Port of Karachi / Dubai"
                                    value={formData.location} onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10">
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gold-500 text-navy-900 font-bold py-4 px-6 rounded hover:bg-gold-400 transition-all duration-300 uppercase tracking-widest text-sm flex items-center justify-center space-x-2 shadow-lg hover:shadow-gold-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <span>Processing Secure Submission...</span>
                            ) : (
                                <>
                                    <span>Submit Project Brief</span>
                                    <Lock size={16} />
                                </>
                            )}
                        </button>
                        <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                            <Lock size={12} />
                            Encrypted 256-bit SSL Connection
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

const SuccessView = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-navy-900">
             <div className="text-center max-w-2xl animate-fade-in-up">
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/30">
                    <CheckCircle className="text-green-500 w-12 h-12" />
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Request Received</h1>
                
                <div className="bg-navy-800 border border-gold-500/30 p-8 rounded-xl mb-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
                    <p className="text-gray-300 text-lg mb-4">
                        Your request has been sent! The team will review it and answer within 24 hours.
                    </p>
                </div>

                <Link 
                    to="/"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-transparent border border-white/20 hover:bg-white/10 hover:border-gold-500 uppercase tracking-widest rounded"
                >
                    Return to Home
                </Link>
             </div>
        </div>
    );
};

// --- Main Page Component ---

function Showcase() {
  useScrollReveal();
  const [cart, setCart] = useState([]);
  const [viewState, setViewState] = useState('showcase'); // 'showcase', 'cart', 'form', 'success'
  const [refId, setRefId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const models = [
    {
      name: "Naval Defense Class Aircraft Carrier Model",
      category: "Defense & Naval Engineering",
      material: "Hand-painted Resin & Acrylic",
      image: "/model1.jpeg",
      technicalDetails: "High-precision deck detailing featuring scale fighter jets and helicopters."
    },
    {
      name: "Heavy-Duty Container Reach Stacker",
      category: "Port Operations & Logistics",
      material: "Laser-cut Metal & Fiber",
      image: "/model2.jpeg",
      technicalDetails: "Industrial-grade scale model representing port logistics machinery with interlocking container units."
    },
    {
      name: "Ocean-Going Harbor Tugboat",
      category: "Maritime Vessels",
      material: "Marine-grade Wood & Brass components",
      image: "/model3.jpeg",
      technicalDetails: "Authentic hull design featuring a complete fender system and bridge instrumentation."
    },
    {
      name: "Post-Panamax Container Carrier (Norasia Series)",
      category: "Commercial Shipping & Global Logistics",
      material: "Carved Solid Wood/HDF Hull with Precision-Molded Resin Container Units",
      image: "/model4.jpeg",
      technicalDetails: "High-capacity hull design featuring a full deck load of scale-accurate ISO containers with authentic shipping line branding."
    },
    {
      name: "General Cargo Vessel with Internal Deck Cutaway",
      category: "Maritime Engineering & Educational Exhibits",
      material: "Laser-cut Acrylic transparent sections, Brass engine detailing, and High-Density Polyurethane",
      image: "/model5.jpeg",
      technicalDetails: "Advanced engineering model featuring a longitudinal cross-section to reveal internal storage holds, engine room layout, and structural bulkheads."
    },
    {
      name: "Heavy-Lift Multi-Purpose Logistics Ship",
      category: "Commercial Shipping & Specialized Transport",
      material: "Photo-etched Steel lattice work, Resin Superstructure, and Industrial-Grade Automotive Finish",
      image: "/model6.jpeg",
      technicalDetails: "Specialized vessel model focusing on onboard heavy-lift crane systems and versatile deck configurations for oversized cargo."
    },
    {
      name: "Geared Handysize Container Vessel (M.V. LOFTY Series)",
      category: "Commercial Shipping & Cargo Logistics",
      material: "Reinforced Resin Hull, Photo-etched Steel railings, and CNC-machined Brass propeller components",
      image: "/model7.jpeg",
      technicalDetails: "Comprehensive maritime model featuring a full propulsion array (propeller and rudder), elevated bridge instrumentation, and three independent functional-style deck cranes for self-loading operations."
    },
    {
      name: "Smart-Grid Integrated Port Terminal & Bulk Carrier",
      category: "Port Infrastructure & Automated Terminals",
      material: "Optic-fiber lighting components, Industrial-grade Resin, 3D-printed STS cranes, and custom-cured 'Deep-Water' Acrylic base",
      image: ["/model8_1.jpeg", "/model8_2.jpeg", "/model8_3.jpeg"],
      technicalDetails: "Comprehensive terminal simulation featuring active LED navigation lighting, automated Ship-to-Shore (STS) crane systems, and a high-fidelity bulk cargo vessel moored alongside an illuminated conveyor pier."
    }
  ];

  const addToCart = (model, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.model.name === model.name);
      if (existingItem) {
        return prevCart.map(item => 
          item.model.name === model.name 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { model, quantity }];
    });
  };

  const removeFromCart = (modelName) => {
    setCart(prevCart => prevCart.filter(item => item.model.name !== modelName));
  };

  const handleProceedToForm = () => {
    setViewState('form');
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    
    // Construct WhatsApp Message
    const itemsList = cart.map(item => `• ${item.quantity}x ${item.model.name}`).join('\n');
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    const message = `*NEW PROJECT INQUIRY*\n\n` +
                    `*Order Details:*\n` +
                    `${itemsList}\n` +
                    `Total Items: ${totalItems}\n\n` +
                    `*Customer Information:*\n` +
                    `Name: ${formData.fullName}\n` +
                    `Designation: ${formData.designation}\n` +
                    `Company: ${formData.companyName}\n` +
                    `Industry: ${formData.industry}\n` +
                    `Email: ${formData.email}\n` +
                    `Phone: ${formData.phone}\n` +
                    `Location: ${formData.location}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/923049266020?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Transition to Success View immediately
    setIsSubmitting(false);
    setViewState('success');
    setCart([]); // Clear cart
  };

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (viewState === 'success') {
      return <SuccessView isOpen={true} onClose={() => setViewState('showcase')} />;
  }

  return (
    <div className="min-h-screen bg-navy-900 text-white font-sans selection:bg-gold-500 selection:text-navy-900">
      
      {/* Simplified Header */}
      <nav className="fixed w-full z-50 bg-navy-900/90 backdrop-blur-sm border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
              <Anchor className="h-8 w-8 text-gold-500" />
              <Link to="/" className="text-xl font-bold tracking-wider text-white hover:text-gold-500 transition-colors">SHAKEEL ENTERPRISES</Link>
            </div>
            <Link to="/" className="flex items-center space-x-2 text-gold-500 hover:text-white transition-colors">
                <ArrowLeft size={20} />
                <span className="font-medium uppercase tracking-wider text-sm">Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Showcase</h1>
            <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                Explore our portfolio of precision-crafted maritime models. Each piece represents our dedication to accuracy and industrial artistry.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {models.map((model, index) => (
                <ModelCard 
                    key={index} 
                    model={model} 
                    index={index} 
                    onAddToQuote={addToCart} 
                />
            ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 p-12 bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl border border-gold-500/30 text-center relative overflow-hidden reveal-hidden shadow-2xl">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0"></div>
             <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Don't see what you're looking for?</h2>
                <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                    We specialize in bespoke commissions. If you have a blueprint or a vision, we can build it.
                </p>
                <a 
                    href="https://wa.me/923049266020?text=Hello,%20I%20have%20a%20custom%20project%20in%20mind."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gold-500 transition-all duration-200 bg-transparent border-2 border-gold-500 hover:bg-gold-500 hover:text-navy-900 uppercase tracking-widest rounded"
                >
                    Start a Custom Project
                </a>
             </div>
        </div>

      </div>

      {/* Floating Cart Icon */}
      {cartTotalItems > 0 && (
        <button 
          onClick={() => setViewState('cart')}
          className="fixed bottom-8 right-8 z-40 bg-gold-500 text-navy-900 p-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-white hover:text-navy-900 transition-all duration-300 hover:scale-110 group animate-float"
        >
          <div className="relative">
              <ShoppingCart size={28} />
              <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold h-6 w-6 flex items-center justify-center rounded-full border-2 border-navy-900">
                  {cartTotalItems}
              </span>
          </div>
        </button>
      )}

      {/* Modals */}
      <CartModal 
        isOpen={viewState === 'cart'} 
        onClose={() => setViewState('showcase')} 
        cartItems={cart} 
        onRemove={removeFromCart}
        onProceed={handleProceedToForm}
      />

      <InquiryForm 
        isOpen={viewState === 'form'}
        onClose={() => setViewState('showcase')}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />

    </div>
  );
}

export default Showcase;
