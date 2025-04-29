import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon, CalendarIcon, MapPinIcon, HomeIcon, UserGroupIcon, PhotoIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInvitation, setShowInvitation] = useState(true);
  const audioRef = useRef(null);

  const weddingDate = useMemo(() => new Date('2025-12-31T18:00:00'), []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  const handleRSVP = (e) => {
    e.preventDefault();
    alert('Thank you for your RSVP!');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleOpenInvitation = () => {
    setShowInvitation(false);
    audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen">
      {/* Audio Player */}
      <audio 
        ref={audioRef} 
        src="/music/wedding-song.mp3" 
        loop 
      />

      {/* Invitation Popup */}
      <AnimatePresence>
        {showInvitation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-wedding-cream/90 backdrop-blur-sm z-[100] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4 text-center"
            >
              <h2 className="text-3xl font-playfair text-wedding-charcoal mb-4">Undangan Pernikahan</h2>
              <p className="text-wedding-taupe mb-6">Kami mengundang Anda untuk hadir dalam pernikahan kami</p>
              <motion.button
                onClick={handleOpenInvitation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-wedding-gold text-white px-6 py-3 rounded-full font-medium"
              >
                Buka Undangan
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Control */}
      <motion.button
        onClick={toggleMusic}
        className="fixed z-50 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg md:bottom-4 md:right-4 bottom-20 right-4"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
          className="relative"
        >
          {/* Piringan Hitam */}
          <div className="w-8 h-8 rounded-full bg-wedding-charcoal flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-wedding-gold"></div>
          </div>
          {/* Efek Cahaya */}
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-wedding-gold"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>
      </motion.button>

      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-wedding-taupe hover:text-wedding-gold transition-colors">Home</button>
            <button onClick={() => scrollToSection('couple')} className="text-wedding-taupe hover:text-wedding-gold transition-colors">Couple</button>
            <button onClick={() => scrollToSection('event')} className="text-wedding-taupe hover:text-wedding-gold transition-colors">Event</button>
            <button onClick={() => scrollToSection('gallery')} className="text-wedding-taupe hover:text-wedding-gold transition-colors">Gallery</button>
            <button onClick={() => scrollToSection('rsvp')} className="text-wedding-taupe hover:text-wedding-gold transition-colors">RSVP</button>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed bottom-4 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <div className="flex justify-around">
              <button onClick={() => scrollToSection('home')} className="p-2 text-wedding-taupe hover:text-wedding-gold">
                <HomeIcon className="w-6 h-6" />
              </button>
              <button onClick={() => scrollToSection('couple')} className="p-2 text-wedding-taupe hover:text-wedding-gold">
                <UserGroupIcon className="w-6 h-6" />
              </button>
              <button onClick={() => scrollToSection('event')} className="p-2 text-wedding-taupe hover:text-wedding-gold">
                <CalendarIcon className="w-6 h-6" />
              </button>
              <button onClick={() => scrollToSection('gallery')} className="p-2 text-wedding-taupe hover:text-wedding-gold">
                <PhotoIcon className="w-6 h-6" />
              </button>
              <button onClick={() => scrollToSection('rsvp')} className="p-2 text-wedding-taupe hover:text-wedding-gold">
                <EnvelopeIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-playfair mb-4 text-wedding-charcoal">John & Jane</h1>
          <p className="text-xl md:text-2xl font-montserrat text-wedding-taupe">We're getting married!</p>
          <p className="text-lg md:text-xl font-montserrat mt-2 text-wedding-taupe">December 31, 2025</p>
        </motion.div>
      </section>

      {/* Countdown Section */}
      <section className="py-16 bg-wedding-cream">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Countdown to Our Special Day</h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="card bg-white p-4 md:p-6">
                  <span className="text-2xl md:text-3xl font-bold text-wedding-gold">{value}</span>
                  <p className="text-sm md:text-base mt-2 text-wedding-taupe">{unit}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Couple Section */}
      <section id="couple" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">The Happy Couple</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                alt="Groom" 
                className="w-64 h-64 object-cover rounded-full mx-auto mb-4 border-4 border-wedding-gold" 
              />
              <h3 className="text-2xl font-playfair text-wedding-charcoal">John Doe</h3>
              <p className="text-wedding-taupe">The Groom</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                alt="Bride" 
                className="w-64 h-64 object-cover rounded-full mx-auto mb-4 border-4 border-wedding-gold" 
              />
              <h3 className="text-2xl font-playfair text-wedding-charcoal">Jane Smith</h3>
              <p className="text-wedding-taupe">The Bride</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section id="event" className="py-16 bg-wedding-cream">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Event Details</h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <div className="card bg-white">
              <div className="flex items-center">
                <CalendarIcon className="w-8 h-8 mr-4 text-wedding-gold" />
                <div>
                  <h3 className="text-xl font-playfair text-wedding-charcoal">Date & Time</h3>
                  <p className="text-wedding-taupe">December 31, 2025</p>
                  <p className="text-wedding-taupe">6:00 PM</p>
                </div>
              </div>
            </div>
            <div className="card bg-white">
              <div className="flex items-center">
                <MapPinIcon className="w-8 h-8 mr-4 text-wedding-gold" />
                <div>
                  <h3 className="text-xl font-playfair text-wedding-charcoal">Venue</h3>
                  <p className="text-wedding-taupe">Grand Ballroom</p>
                  <p className="text-wedding-taupe">123 Wedding Street, City</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Our Gallery</h2>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-6 md:grid-cols-3 gap-2 md:gap-4"
          >
            {/* Mobile Featured Image */}
            <motion.div 
              className="col-span-6 row-span-2 md:hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                alt="Featured Gallery"
                className="w-full h-full object-cover rounded-lg shadow-md aspect-[4/3]"
              />
            </motion.div>

            {/* Desktop Featured Image */}
            <motion.div 
              className="hidden md:block md:col-span-2 md:row-span-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                alt="Featured Gallery"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </motion.div>
            
            {/* Smaller Images */}
            {[
              {
                src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                className: "col-span-3 row-span-2 md:col-span-1 md:row-span-1",
                aspect: "aspect-[4/4]"
              },
              {
                src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                className: "col-span-3 row-span-2 md:col-span-1 md:row-span-1",
                aspect: "aspect-[4/3]"
              },
              {
                src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                className: "col-span-6 row-span-2 md:col-span-1 md:row-span-1",
                aspect: "aspect-[16/10]"
              },
              {
                src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                className: "col-span-3 row-span-2 md:col-span-1 md:row-span-1",
                aspect: "aspect-[3/3]"
              },
              {
                src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                className: "col-span-3 row-span-2 md:col-span-1 md:row-span-1",
                aspect: "aspect-[5/5]"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className={`${item.aspect} ${item.className}`}
              >
                <img
                  src={item.src}
                  alt={`Gallery ${index + 2}`}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-16 bg-wedding-cream">
        <div className="container mx-auto px-4">
          <h2 className="section-title">RSVP</h2>
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onSubmit={handleRSVP} 
            className="max-w-md mx-auto card bg-white"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text text-wedding-taupe">Name</span>
              </label>
              <input type="text" placeholder="Your name" className="input input-bordered" required />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-wedding-taupe">Number of Guests</span>
              </label>
              <input type="number" min="1" placeholder="Number of guests" className="input input-bordered" required />
            </div>
            <button type="submit" className="btn btn-primary w-full mt-6">
              Submit RSVP
            </button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-wedding-cream">
        <p className="text-wedding-taupe">Made with <HeartIcon className="w-4 h-4 inline-block text-wedding-gold" /> for you</p>
      </footer>
    </div>
  );
}

export default App;
