import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ArrowRight, ShieldCheck, Heart, UserCheck, 
  Stethoscope, Home, Building2, Users, FileText, 
  Briefcase, Lightbulb, Mail, Phone, MapPin, CheckCircle2,
  ExternalLink, GraduationCap, Award, ClipboardCheck,
  Building, BookOpen, Search, Target, Zap, Activity,
  Settings, MessageSquare, ShieldAlert, Monitor, Clock, 
  UserPlus, BarChart3, Fingerprint, Coffee, ShoppingCart, 
  Moon, Calendar, Key, PieChart, Brain, Microscope
} from 'lucide-react';

// BRAND COLORS
const COLORS = {
  primaryRuby: '#A10F18',
  deepRuby: '#2E1113',
  platinumNeutral: '#D4CDC1',
  charcoalText: '#706562',
  offWhite: '#F6F6F5',
  rubyTint: 'rgba(161, 15, 24, 0.05)',
};

// --- COMPONENTS ---

const Navbar = ({ activePage, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'domiciliary', label: 'Domiciliary Care' },
    { id: 'supported', label: 'Supported Living' },
    { id: 'consulting', label: 'Consulting' },
    { id: 'referrals', label: 'Referrals' },
    { id: 'careers', label: 'Careers' },
    { id: 'insights', label: 'Insights' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setPage('home')}>
            <span style={{ color: COLORS.deepRuby }} className="text-xl md:text-2xl font-serif font-bold tracking-tight uppercase">
              Platinum <span style={{ color: COLORS.primaryRuby }}>Ruby Care</span>
            </span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`text-sm font-bold tracking-wide transition-colors hover:text-[#A10F18] ${activePage === item.id ? 'text-[#A10F18]' : 'text-[#706562]'}`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => setPage('referrals')}
              className="bg-[#A10F18] text-white px-6 py-2.5 rounded-sm text-sm font-bold hover:bg-[#2E1113] transition-all shadow-md"
            >
              Make a Referral
            </button>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#2E1113]">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 px-4 py-8 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setPage(item.id); setIsOpen(false); }}
                className="block w-full text-left text-lg font-bold py-3 border-b border-gray-50 text-[#706562] hover:text-[#A10F18]"
              >
                {item.label}
              </button>
            ))}
          </div>
          <button 
            onClick={() => { setPage('referrals'); setIsOpen(false); }}
            className="w-full mt-8 bg-[#A10F18] text-white py-4 rounded-sm font-bold text-lg"
          >
            Make a Referral
          </button>
        </div>
      )}
    </nav>
  );
};

const Footer = ({ setPage }) => (
  <footer style={{ backgroundColor: COLORS.deepRuby }} className="text-white pt-20 pb-10 px-4">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-16">
      <div>
        <h3 className="text-xl font-serif font-bold mb-6 uppercase tracking-wider text-white">Platinum Ruby Care</h3>
        <p className="text-white/70 text-sm leading-relaxed mb-6">
          Specialist nurse-led mental health support delivering clinical excellence 
          in the community. Registered and aligned with CQC standards.
        </p>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-all">
            <ExternalLink size={18} />
          </div>
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-6">Quick Links</h4>
        <ul className="space-y-4 text-white/70 text-sm">
          <li><button onClick={() => setPage('about')} className="hover:text-white">Our Story</button></li>
          <li><button onClick={() => setPage('domiciliary')} className="hover:text-white">Domiciliary Care</button></li>
          <li><button onClick={() => setPage('supported')} className="hover:text-white">Supported Living</button></li>
          <li><button onClick={() => setPage('careers')} className="hover:text-white">Join the Team</button></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6">Clinical Integrity</h4>
        <ul className="space-y-4 text-white/70 text-sm">
          <li><button onClick={() => setPage('referrals')} className="hover:text-white">Referral Portal</button></li>
          <li><button onClick={() => setPage('consulting')} className="hover:text-white">Consulting Services</button></li>
          <li><button onClick={() => setPage('about')} className="hover:text-white">Clinical Governance</button></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6">Contact Us</h4>
        <ul className="space-y-4 text-sm">
          <li className="flex items-start">
            <MapPin size={18} className="mr-3 text-[#A10F18] shrink-0" />
            <span className="text-white/70">Central London Office, London, UK</span>
          </li>
          <li className="flex items-center">
            <Phone size={18} className="mr-3 text-[#A10F18] shrink-0" />
            <span className="text-white/70">07837 773754</span>
          </li>
          <li className="flex items-center">
            <Mail size={18} className="mr-3 text-[#A10F18] shrink-0" />
            <span className="text-white/70">KeashaJasmin@gmail.com</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
      <p>© 2024 Platinum Ruby Care Ltd. Registered in England & Wales.</p>
    </div>
  </footer>
);

// --- PAGE COMPONENTS ---

const HomeView = ({ setPage }) => (
  <div className="animate-in fade-in duration-700">
    {/* HERO SECTION - RE-ENGINEERED TO PREVENT OVERLAP AND FIX IMAGE */}
    <section className="relative min-h-[95vh] flex items-center pt-40 lg:pt-52 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        {/* Lighter, more sophisticated gradient to reveal face better */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10 lg:via-white/60" />
        {/* object-position adjusted to 20% from top to keep head clearly in frame */}
        <img 
          src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=2000" 
          alt="Healthcare Leadership" 
          className="w-full h-full object-cover object-[50%_20%]" 
        />
      </div>
      <div className="relative z-20 max-w-7xl mx-auto px-4 w-full pb-40">
        <div className="max-w-2xl">
          {/* Tagline sits tighter to the headline now */}
          <div className="flex items-center space-x-3 text-[#A10F18] mb-6 font-bold tracking-[0.2em] text-xs uppercase">
            <div className="w-10 h-[2px] bg-[#A10F18]" />
            <span>Nurse-Led Mental Health Specialist</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-[#2E1113] leading-[1.05] mb-8">
            Clinically Informed <br />
            <span className="text-[#A10F18]">Pathways to </span> <br />
            Independence.
          </h1>
          <p className="text-xl text-[#706562] mb-12 leading-relaxed max-w-lg font-medium">
            Specialist support for young adults, delivering hospital-standard 
            clinical rigour in a community setting.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <button 
              onClick={() => setPage('referrals')} 
              className="bg-[#A10F18] text-white px-10 py-5 rounded-sm font-bold flex items-center justify-center hover:bg-[#2E1113] transition-all shadow-xl shadow-red-900/20"
            >
              Request Support <ArrowRight className="ml-3" size={20} />
            </button>
            <button 
              onClick={() => setPage('about')} 
              className="bg-white/40 backdrop-blur-sm border border-[#D4CDC1] text-[#2E1113] px-10 py-5 rounded-sm font-bold hover:bg-white transition-all shadow-sm"
            >
              Our Clinical Story
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* AUDIENCE PATHWAYS - MOVED TO COMFORTABLE POSITION */}
    <section className="py-24 bg-white relative z-30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Gentle overlap for desktop depth, but clear on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:-mt-24">
          {[
            { title: "Families & Young People", desc: "Expert care that respects dignity and fosters independence.", icon: Heart },
            { title: "Professionals & Referrers", desc: "Streamlined clinical assessments and robust risk management.", icon: Stethoscope },
            { title: "Commissioners & Partners", desc: "Outcomes-focused housing and high-acuity support solutions.", icon: ShieldCheck },
            { title: "Careers in Care", desc: "Build a clinical career in a supportive, nurse-led culture.", icon: Users },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-10 shadow-2xl hover:translate-y-[-10px] transition-all border-b-4 border-[#A10F18] group cursor-pointer ring-1 ring-gray-100">
              <item.icon className="text-[#A10F18] mb-8 group-hover:scale-110 transition-transform" size={36} />
              <h3 className="text-xl font-bold text-[#2E1113] mb-4 group-hover:text-[#A10F18] transition-colors">{item.title}</h3>
              <p className="text-[#706562] text-sm leading-relaxed mb-8">{item.desc}</p>
              <span className="text-xs font-bold uppercase tracking-widest text-[#A10F18] flex items-center">
                Learn More <ArrowRight className="ml-2" size={14} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 bg-[#F6F6F5]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#2E1113] mb-10 leading-tight">The Ruby Model: <br />Where Safety Meets Growth.</h2>
          <div className="space-y-10">
            {[
              { title: "Trauma-Informed Practice", desc: "Recognising the impact of history while building a future." },
              { title: "Nurse-Led Governance", desc: "All support overseen by a Specialist Registered Mental Health Nurse." },
              { title: "CBT-Integrated Support", desc: "Incorporating therapeutic techniques into everyday life coaching." },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-md"><CheckCircle2 className="text-[#A10F18]" size={28} /></div>
                <div>
                  <h4 className="font-bold text-xl text-[#2E1113] mb-2">{item.title}</h4>
                  <p className="text-[#706562] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#D4CDC1]/30 rounded-full blur-3xl" />
          <img src="https://images.unsplash.com/photo-1573497620053-ea5310f94a17?auto=format&fit=crop&q=80&w=1000" alt="Colleagues collaborating" className="relative z-10 rounded-sm shadow-2xl" />
        </div>
      </div>
    </section>
  </div>
);

const AboutView = () => (
  <div className="animate-in fade-in duration-700 pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        <div>
          <span className="text-[#A10F18] font-bold tracking-widest uppercase text-sm mb-4 block">Our Heritage</span>
          <h1 className="text-5xl font-serif font-bold text-[#2E1113] mb-8 leading-tight">Clinical Rigour. <br/>Community Compassion.</h1>
          <p className="text-xl text-[#706562] mb-6 leading-relaxed">Platinum Ruby Care was born from the intersection of high-stakes mental health nursing and specialist housing management.</p>
          <p className="text-[#706562] leading-relaxed mb-8">Our founder, <strong>Keasha Jasmin Isaac-Maja</strong>, recognized that clinical excellence in hospitals often failed to translate into community stability. By combining her 15+ years of NHS Senior Practice with her expertise in property development, she created a service that provides both a safe home and a therapeutic pathway.</p>
          <div className="grid grid-cols-2 gap-6">
            <div className="border-l-2 border-[#A10F18] pl-6 py-2">
              <h4 className="text-3xl font-bold text-[#2E1113] mb-1">NELFT</h4>
              <p className="text-xs uppercase font-bold text-[#706562]">Senior Practitioner Lead</p>
            </div>
            <div className="border-l-2 border-[#A10F18] pl-6 py-2">
              <h4 className="text-3xl font-bold text-[#2E1113] mb-1">KLOE</h4>
              <p className="text-xs uppercase font-bold text-[#706562]">CQC Standards Excellence</p>
            </div>
          </div>
        </div>
        <div className="bg-[#D4CDC1] aspect-[4/5] rounded-lg overflow-hidden relative shadow-2xl">
          <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800" alt="Keasha Jasmin Isaac-Maja" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-[#2E1113] p-10 text-white">
            <p className="font-serif text-3xl font-bold mb-1">Keasha Jasmin Isaac-Maja</p>
            <p className="text-[#A10F18] font-bold text-sm uppercase tracking-widest">Specialist RMN | Founder & Clinical Director</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DomiciliaryView = () => (
  <div className="animate-in fade-in duration-700 pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-4">
      <div className="max-w-3xl mb-20">
        <div className="flex items-center space-x-2 text-[#A10F18] mb-6 font-bold tracking-widest uppercase text-sm">
          <div className="w-8 h-[2px] bg-[#A10F18]" />
          <span>Home-Based Specialist Support</span>
        </div>
        <h1 className="text-5xl lg:text-6xl font-serif font-bold text-[#2E1113] mb-8 leading-tight">Nurse-Led Care, <br/><span className="text-[#A10F18]">In the Place You Call Home.</span></h1>
        <p className="text-xl text-[#706562] leading-relaxed">Platinum Ruby Care provides specialist domiciliary care with profound mental health expertise. We support you to remain safely in your own home while maintaining independence and dignity.</p>
      </div>

      <div className="mb-32">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#2E1113] mb-4">What Support Includes</h2>
          <p className="text-[#706562]">We provide a range of practical and emotional support activities tailored to your daily life.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: UserCheck, title: "Personal Care", desc: "Dignified assistance with washing, dressing, and toileting." },
            { icon: ClipboardCheck, title: "Medication Support", desc: "Precise medication prompting or administration." },
            { icon: Coffee, title: "Nutrition", desc: "Assistance with meal preparation and healthy eating." },
            { icon: Activity, title: "Mobility", desc: "Support with moving safely around your home." },
            { icon: Heart, title: "Companionship", desc: "Consistent emotional support and wellbeing check-ins." },
            { icon: ShoppingCart, title: "Household Tasks", desc: "Help with light cleaning, laundry, and grocery shopping." },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 border border-[#D4CDC1]/30 hover:border-[#A10F18] transition-colors shadow-sm">
              <item.icon className="text-[#A10F18] mb-4" size={24} />
              <h4 className="font-bold text-[#2E1113] mb-2">{item.title}</h4>
              <p className="text-sm text-[#706562] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SupportedLivingView = () => (
  <div className="animate-in fade-in duration-700 pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-4">
      <div className="max-w-7xl mx-auto relative mb-20 min-h-[450px] flex items-center">
        <div className="absolute top-0 right-0 w-full lg:w-3/4 h-full pointer-events-none z-0">
          <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200" alt="Community kitchen" className="w-full h-full object-cover opacity-[0.08] grayscale-[60%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F6F6F5] via-transparent to-transparent" />
        </div>
        <div className="max-w-3xl relative z-10">
          <div className="flex items-center space-x-2 text-[#A10F18] mb-6 font-bold tracking-widest uppercase text-sm">
            <div className="w-8 h-[2px] bg-[#A10F18]" />
            <span>Tailored Supported Living</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-[#2E1113] mb-8 leading-tight">A Foundation for <br/><span className="text-[#A10F18]">Recovery & Autonomy.</span></h1>
          <p className="text-xl text-[#706562] leading-relaxed max-w-2xl">Platinum Ruby Care provides nurse-led supported living specifically designed for young adults transitioning into independent adulthood.</p>
        </div>
      </div>
    </div>
  </div>
);

const ConsultingView = () => (
  <div className="animate-in fade-in duration-700 pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-4">
      <div className="max-w-4xl mb-20">
        <div className="flex items-center space-x-2 text-[#A10F18] mb-6 font-bold tracking-widest uppercase text-sm">
          <div className="w-8 h-[2px] bg-[#A10F18]" />
          <span>Professional Clinical Advisory</span>
        </div>
        <h1 className="text-5xl lg:text-6xl font-serif font-bold text-[#2E1113] mb-8 leading-tight">Expert Mental Health <br/><span className="text-[#A10F18]">Consulting Services.</span></h1>
        <p className="text-xl text-[#706562] leading-relaxed">Strategic clinical services led by <strong>Keasha Jasmin Isaac-Maja</strong>. We provide individuals, families, and organizations with high-level psychiatric expertise to manage complex cases and improve care standards.</p>
      </div>

      <div className="mb-24">
        <h2 className="text-4xl font-serif font-bold text-[#2E1113] mb-12 border-b border-[#D4CDC1] pb-6">Specialist Consulting Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Brain,
              title: "Holistic Mental Health Assessments",
              desc: "Comprehensive clinical evaluations to deeply understand an individual's needs, risks, and specific support requirements."
            },
            {
              icon: Microscope,
              title: "Substance Use Assessments",
              desc: "Specialist screening and evaluation for substance misuse within a mental health framework to guide treatment pathways."
            },
            {
              icon: Users,
              title: "Collaborative Care Planning",
              desc: "Working alongside service users and carers to define clear goals, evidenced treatments, and measurable review points."
            },
            {
              icon: Lightbulb,
              title: "Psychoeducation",
              desc: "Explaining conditions, treatments, and coping strategies to individuals and families to empower recovery planning."
            },
            {
              icon: GraduationCap,
              title: "Staff Training & Education",
              desc: "Leading professional development for care teams in best-practice mental health care and clinical safety."
            },
            {
              icon: UserPlus,
              title: "Clinical Supervision & Mentoring",
              desc: "High-level professional supervision and mentoring for junior nurses and multidisciplinary clinical teams."
            }
          ].map((pkg, idx) => (
            <div key={idx} className="bg-white p-10 border border-gray-100 shadow-lg hover:shadow-xl transition-all border-t-4 border-[#A10F18]">
              <pkg.icon className="text-[#A10F18] mb-8" size={36} />
              <h3 className="text-xl font-bold text-[#2E1113] mb-4 min-h-[56px] leading-tight">{pkg.title}</h3>
              <p className="text-sm text-[#706562] leading-relaxed mb-6">{pkg.desc}</p>
              <div className="flex items-center text-[#A10F18] font-bold text-xs uppercase tracking-widest">
                <span>Clinically Governed</span>
                <div className="w-6 h-[1px] bg-[#A10F18] ml-2" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-24">
        <div className="bg-white border-y-8 border-[#A10F18] p-12 lg:p-20 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4CDC1]/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center space-x-2 border-l-4 border-[#A10F18] bg-[#F6F6F5] px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase mb-8 text-[#2E1113]"><Fingerprint size={16} className="text-[#A10F18]" /><span>The Distinction</span></div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#2E1113] mb-8 leading-tight">Grounded in NHS <br/> Senior Practice.</h2>
              <p className="text-[#706562] text-lg leading-relaxed mb-10">All consulting services are personally overseen by Keasha Jasmin Isaac-Maja, leveraging 15+ years of Band 7 level leadership within the NHS.</p>
              <div className="flex items-center space-x-4 p-6 bg-[#F6F6F5] border-l-4 border-[#A10F18]"><div className="text-3xl font-serif font-bold text-[#A10F18]">15+</div><div className="text-xs uppercase font-bold tracking-widest text-[#2E1113]">Years of Clinical <br/> Frontline Expertise</div></div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
              {[
                { icon: Stethoscope, title: "Frontline NHS Acuity", desc: "Direct experience in Section 136 triage and high-intensity crisis management." },
                { icon: BarChart3, title: "Validated Outcomes", desc: "Proven track record in service transformation across healthcare teams." },
                { icon: Building, title: "Housing Intersection", desc: "Unique background in healthcare property development and tenancy stability." },
                { icon: ShieldCheck, title: "CQC Integrity", desc: "Deep fluency in CQC Key Lines of Enquiry (KLOEs) and clinical governance." }
              ].map((pill, i) => (
                <div key={i} className="group border-b border-[#D4CDC1]/40 pb-6 hover:border-[#A10F18] transition-colors"><pill.icon className="text-[#A10F18] mb-4" size={28} /><h4 className="text-lg font-bold text-[#2E1113] mb-3">{pill.title}</h4><p className="text-sm text-[#706562] leading-relaxed">{pill.desc}</p></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F6F6F5] border border-[#D4CDC1]/50 p-16 text-center shadow-sm mb-24">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#2E1113] mb-6">Support your team to support others.</h2>
        <button onClick={() => setPage('contact')} className="bg-[#A10F18] text-white px-14 py-6 font-bold flex items-center justify-center mx-auto hover:bg-[#2E1113] transition-all group shadow-2xl">
          Book an Initial Discussion 
          <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
        </button>
      </div>
    </div>
  </div>
);

const ReferralsView = () => (
  <div className="animate-in fade-in duration-700 pt-40 pb-24">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div>
          <h1 className="text-5xl font-serif font-bold text-[#2E1113] mb-8 leading-tight">Professional Referrals</h1>
          <p className="text-xl text-[#706562] mb-12">Platinum Ruby Care provides a high-acuity bridge for individuals transitioning from NHS services.</p>
          <div className="space-y-8">
            <div className="bg-white p-8 border-l-4 border-[#A10F18] shadow-lg">
              <h3 className="font-bold text-[#2E1113] mb-2 text-xl">CQC Excellence</h3>
              <p className="text-[#706562]">All referrals are triaged by our Specialist RMN within 24 hours.</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-12 shadow-2xl border-t-8 border-[#A10F18]">
          <h2 className="text-2xl font-serif font-bold text-[#2E1113] mb-8">Secure Referral Form</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6"><input type="text" placeholder="Your Name" className="col-span-1 border-b-2 border-[#D4CDC1] py-3 text-sm focus:outline-none focus:border-[#A10F18]" /><input type="text" placeholder="Professional Role" className="col-span-1 border-b-2 border-[#D4CDC1] py-3 text-sm focus:outline-none focus:border-[#A10F18]" /></div>
            <input type="text" placeholder="Organisation/NHS Trust" className="w-full border-b-2 border-[#D4CDC1] py-3 text-sm focus:outline-none focus:border-[#A10F18]" />
            <textarea rows="4" placeholder="Service User Profile (Brief)" className="w-full border border-[#D4CDC1] p-4 focus:outline-none focus:border-[#A10F18] text-sm"></textarea>
            <button className="w-full bg-[#A10F18] text-white py-5 font-bold text-lg hover:bg-[#2E1113] transition-all">Submit Initial Inquiry</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

const ContactView = () => (
  <div className="animate-in fade-in duration-700 pt-40 pb-24">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20">
      <div>
        <h1 className="text-5xl font-serif font-bold text-[#2E1113] mb-8 leading-tight underline decoration-[#A10F18] decoration-4">Contact Our <br/>Clinical Team.</h1>
        <div className="space-y-10 mt-12">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-[#F6F6F5] flex items-center justify-center rounded-full text-[#A10F18] shadow-md"><Phone size={28} /></div>
            <div><p className="text-xs font-bold text-[#706562] uppercase tracking-widest mb-1">Direct Line</p><p className="text-2xl font-bold text-[#2E1113]">07837 773754</p></div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-[#F6F6F5] flex items-center justify-center rounded-full text-[#A10F18] shadow-md"><Mail size={28} /></div>
            <div><p className="text-xs font-bold text-[#706562] uppercase tracking-widest mb-1">Email Correspondence</p><p className="text-2xl font-bold text-[#2E1113]">KeashaJasmin@gmail.com</p></div>
          </div>
        </div>
      </div>
      <div className="bg-white p-12 shadow-2xl border border-[#D4CDC1]/30">
        <h2 className="text-2xl font-serif font-bold text-[#2E1113] mb-8">Enquiry Form</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6"><input type="text" placeholder="First Name" className="col-span-1 border-b-2 border-[#D4CDC1] py-4 text-sm focus:outline-none focus:border-[#A10F18]" /><input type="text" placeholder="Last Name" className="col-span-1 border-b-2 border-[#D4CDC1] py-4 text-sm focus:outline-none focus:border-[#A10F18]" /></div>
          <input type="email" placeholder="Email Address" className="w-full border-b-2 border-[#D4CDC1] py-4 text-sm focus:outline-none focus:border-[#A10F18]" />
          <textarea rows="5" placeholder="How can our clinical team help?" className="w-full border border-[#D4CDC1] p-5 text-sm focus:outline-none focus:border-[#A10F18]"></textarea>
          <button className="w-full bg-[#A10F18] text-white py-5 font-bold hover:bg-[#2E1113] transition-all uppercase tracking-widest text-lg shadow-lg">Send Message</button>
        </form>
      </div>
    </div>
  </div>
);

// --- MAIN APP ---

export default function App() {
  const [page, setPage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const renderPage = () => {
    switch(page) {
      case 'home': return <HomeView setPage={setPage} />;
      case 'about': return <AboutView />;
      case 'domiciliary': return <DomiciliaryView />;
      case 'supported': return <SupportedLivingView />;
      case 'consulting': return <ConsultingView />;
      case 'referrals': return <ReferralsView />;
      case 'careers': return <CareersView setPage={setPage} />;
      case 'insights': return <InsightsView />;
      case 'contact': return <ContactView />;
      default: return <HomeView setPage={setPage} />;
    }
  };

  return (
    <div style={{ backgroundColor: COLORS.offWhite }} className="min-h-screen font-sans text-[#706562]">
      <Navbar activePage={page} setPage={setPage} />
      <main className="transition-opacity duration-500">
        {renderPage()}
      </main>
      <Footer setPage={setPage} />
    </div>
  );
}