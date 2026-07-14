import Link from 'next/link'
import { ChevronRight, MapPin, Phone } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { Footer } from '@/components/Footer'
import { BottomNav } from '@/components/navigation/BottomNav'
import { HamburgerMenu } from '@/components/navigation/HamburgerMenu'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative py-24 md:py-48 flex flex-col items-center justify-center p-6 text-center bg-[#1A0A00]">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/restaurant-interior.png" 
                    alt="Express Aryan Rail Coach Restaurant Interior" 
                    className="w-full h-full object-cover opacity-30" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A00]/80 via-transparent to-[#1A0A00]"></div>
            </div>

            {/* Top Bar for Mobile */}
            <div className="absolute top-6 left-0 right-0 px-4 z-30 flex justify-start items-center md:hidden">
                <HamburgerMenu />
            </div>

            {/* Logo - Fixed at top, left on desktop, centered on mobile */}
            <div className="absolute top-6 md:top-8 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 z-20 pointer-events-none">
                <Logo width={55} height={55} className="md:w-[70px] md:h-[70px] pointer-events-auto" />
            </div>

            <div className="z-10 flex flex-col items-center max-w-sm md:max-w-xl mx-auto w-full px-4">
                {/* Title */}
                <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 font-playfair tracking-tight leading-tight">
                    EXPRESS ARYAN <span className="italic text-[#F4A261]">RAIL COACH</span><br/><span className="text-3xl sm:text-5xl">RESTAURANT</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-base text-gray-300 mb-12 font-poppins font-light leading-relaxed px-4">
                    Experience delicious meals at Gole ka Mandir, Gwalior. <br/> 
                    <span className="font-medium text-white/90">A journey of authentic flavors awaits you.</span>
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col w-full gap-4">
                    <Link 
                        href="/menu" 
                        className="group relative flex items-center justify-center w-full px-8 py-5 bg-gradient-to-r from-primary to-[#D4622D] text-white rounded-2xl font-poppins font-semibold shadow-[0_10px_30px_rgba(181,69,27,0.4)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative z-10 flex items-center gap-2 text-lg">
                            View Digital Menu
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                    
                    <Link 
                        href="/auth/login" 
                        className="flex items-center justify-center w-full px-8 py-5 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 rounded-2xl font-poppins font-medium hover:bg-white/10 hover:text-white transition-all duration-300"
                    >
                        Staff Login
                    </Link>
                </div>
            </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="relative order-2 md:order-1">
                    <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
                        <img src="/family-dining.png" alt="Family Dining at Express Aryan Rail Coach Restaurant" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                    </div>
                    <div className="absolute -bottom-8 -right-8 bg-primary p-8 rounded-[2rem] text-white shadow-xl hidden lg:block">
                        <p className="text-4xl font-bold font-playfair mb-1">4+</p>
                        <p className="text-xs uppercase tracking-widest font-bold opacity-80">Years of Excellence</p>
                    </div>
                </div>
                <div className="order-1 md:order-2">
                    <h2 className="text-4xl md:text-5xl font-bold font-playfair text-primary mb-6">Our Story</h2>
                    <p className="text-lg text-text-secondary leading-relaxed mb-6 font-poppins">
                        Express Aryan Rail Coach Restaurant began with a simple mission: to bring authentic and delicious meals to Gwalior. 
                        We believe that food is more than just sustenance; it's a way to connect with our heritage and share love with our community.
                    </p>
                    <p className="text-lg text-text-secondary leading-relaxed font-poppins">
                        Every dish we serve is prepared with the finest ingredients, traditional spices, and a commitment to purity that defines our vegetarian kitchen. 
                        Whether you're here for a quick snack or a full family meal, we promise an experience that feels like home.
                    </p>
                </div>
            </div>
        </section>

        {/* Contact Section Preview */}
        <section id="contact" className="py-24 bg-[#FFF8F0]">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold font-playfair text-primary mb-6">Visit Us</h2>
                <p className="text-lg text-text-secondary mb-12 font-poppins">
                    We are located in the heart of Gwalior, ready to serve you with warmth and hospitality.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-border">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <h4 className="font-bold mb-2">Location</h4>
                        <p className="text-sm text-text-secondary">Gole ka Mandir, Gwalior</p>
                    </div>
                    <a href="tel:+919977623769" className="bg-white p-8 rounded-[2rem] shadow-sm border border-border hover:border-primary transition-colors group">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                            <Phone className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <h4 className="font-bold mb-2">Call Us</h4>
                        <p className="text-sm text-text-secondary">+91 99776 23769</p>
                    </a>
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-border">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Logo width={24} height={24} />
                        </div>
                        <h4 className="font-bold mb-2">Since</h4>
                        <p className="text-sm text-text-secondary">EST. 2020</p>
                    </div>
                </div>
            </div>
        </section>
        
        <Footer />
        <div className="md:hidden h-16"></div> {/* Spacer for BottomNav */}
      </main>
      <BottomNav />
    </div>
  )
}
