import React from 'react';
import { 
  Building2, 
  ShoppingBag, 
  FlaskConical, 
  FileText, 
  Phone, 
  ExternalLink,
  Award,
  Users,
  Layers,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface PortalBackdropProps {
  onOpenEmbedGuide: () => void;
  onAskQuestion: (question: string) => void;
}

export const PortalBackdrop: React.FC<PortalBackdropProps> = ({ 
  onOpenEmbedGuide,
  onAskQuestion
}) => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* 1. Official Government of India Top Bar */}
      <header className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-2.5 inline-block bg-gradient-to-b from-orange-500 via-white to-green-600 rounded-xs"></span>
              <span className="font-medium text-slate-200">भारत सरकार | Government of India</span>
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-300">
              Ministry of Development of North Eastern Region (MDoNER)
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <a 
              href="https://www.nehhdc.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 flex items-center gap-1 font-medium"
            >
              Official Website: nehhdc.com <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenEmbedGuide}
              className="text-amber-300 hover:text-amber-200 font-medium flex items-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-3 h-3" /> Webmaster Embed Guide
            </button>
          </div>
        </div>
      </header>

      {/* 2. NEHHDC Main Branding Banner */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-950 via-slate-900 to-teal-900 text-amber-300 flex items-center justify-center font-bold text-xl border-2 border-amber-400/30 shadow-md">
              NE
            </div>
            <div>
              <div className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                उत्तर पूर्वी हस्तशिल्प एवं हथकरघा विकास निगम लिमिटेड
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-blue-950 tracking-tight leading-tight">
                North Eastern Handicrafts and Handlooms Development Corporation Ltd.
              </h1>
              <div className="text-xs text-teal-800 font-medium flex items-center gap-2 mt-0.5">
                <span>(A Government of India Enterprise)</span>
                <span>•</span>
                <span>Under Ministry of DoNER</span>
                <span>•</span>
                <span>Est. 1977</span>
              </div>
            </div>
          </div>

          {/* Quick Contact & Purbashree Badge */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://www.purbashree.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-teal-50 border border-teal-200 text-teal-950 hover:bg-teal-100 transition text-xs font-semibold"
            >
              <ShoppingBag className="w-4 h-4 text-teal-700" />
              <span>Purbashree Online Store</span>
              <ExternalLink className="w-3 h-3 text-teal-600" />
            </a>

            <div className="text-right text-xs text-slate-600">
              <div className="font-semibold text-slate-900">Guwahati Corporate Office</div>
              <div className="text-[11px] text-slate-500">+91 361 2270000 / hradmin@nehhdc.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Navigation Bar */}
      <nav className="bg-blue-950 text-white text-xs font-medium px-4 sm:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto py-2.5">
          <div className="flex items-center gap-6 whitespace-nowrap">
            <a href="https://www.nehhdc.com/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition">About Us</a>
            <a href="https://www.nehhdc.com/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition">Artisan & Weaver Services</a>
            <a href="https://www.purbashree.com/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition">Purbashree Emporiums</a>
            <a href="https://www.nehhdc.com/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition">Textile Testing Lab</a>
            <a href="https://www.nehhdc.com/tenders/" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 transition font-semibold">Tenders & Procurement</a>
            <a href="https://www.nehhdc.com/contact-us" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition">Contact Us</a>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-teal-200 text-xs shrink-0 pl-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Virtual Assistant Ready at Bottom-Right</span>
          </div>
        </div>
      </nav>

      {/* 4. Live Portal Showcase Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-1 space-y-8 w-full">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-teal-950 text-white rounded-2xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              Empowering Northeast Artisans & Weavers Since 1977
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Promoting the Authentic Heritage of North Eastern Handlooms & Handicrafts
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              NEHHDC bridges the gap between grassroots master artisans of the 8 North Eastern states and national/global markets. Operating retail emporiums, testing labs, cluster schemes, and transparent public procurement.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://www.nehhdc.com/tenders/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg shadow-md transition flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                View Current Tenders
              </a>

              <a
                href="https://www.purbashree.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-teal-800/80 hover:bg-teal-700 text-white font-medium text-xs rounded-lg border border-teal-600 transition flex items-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                Explore Purbashree Catalog
              </a>

              <button
                onClick={onOpenEmbedGuide}
                className="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-lg border border-slate-600 transition"
              >
                Technical Integration Guide
              </button>
            </div>
          </div>
        </div>

        {/* Evaluation Test Questions Quick-Launcher */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                Test the Chatbot (8 Official Verification Questions)
              </h3>
              <p className="text-xs text-slate-500">
                Click any official test question below to send it directly into the 'Ask NEHHDC' assistant.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200 shrink-0 self-start sm:self-auto">
              Interactive Test Suite
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {[
              { q: 'What is NEHHDC?', tag: 'Org Info' },
              { q: 'When was NEHHDC established?', tag: 'History' },
              { q: 'What services does NEHHDC offer to artisans?', tag: 'Artisan Services' },
              { q: 'Does NEHHDC provide institutional sales services?', tag: 'B2B Services' },
              { q: 'Where can I find NEHHDC tenders?', tag: 'Tenders' },
              { q: 'How can I contact NEHHDC?', tag: 'Offices' },
              { q: 'Can NEHHDC guarantee me a job?', tag: 'Boundary Check' },
              { q: 'What is the latest tender deadline?', tag: 'Time-Sensitive' },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => onAskQuestion(item.q)}
                className="text-left p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-teal-50 hover:border-teal-400 hover:text-teal-950 transition text-xs group flex flex-col justify-between"
              >
                <span className="font-medium text-slate-800 group-hover:text-teal-900">{item.q}</span>
                <span className="mt-1 text-[10px] text-slate-500 group-hover:text-teal-700 font-mono self-start uppercase">
                  {item.tag}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 4 Pillars of NEHHDC Operations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
              <Users className="w-5 h-5 text-blue-900" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Artisan Capacity Building</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Skill development under SAMARTH, PMKVY, and PM-VIKAS. Modernizing loin loom, jacquard, and cane & bamboo craft.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-900 flex items-center justify-center font-bold">
              <FlaskConical className="w-5 h-5 text-teal-800" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Textile Testing Laboratory</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Accredited laboratory in Garchuk, Guwahati for yarn tensile strength, fabric GSM, fibre analysis, and colour fastness testing.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-900 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5 text-amber-800" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Raw Material & Yarn Mill</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Eri silk spinning mill in Baksa (Bodoland) and regional yarn depots providing certified, fair-priced raw materials to weavers.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-900 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5 text-emerald-800" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">B2B & Institutional Sales</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Corporate and VIP gifting, conference kits, GeM portal procurement, and customized handloom supply for government ministries.
            </p>
          </div>
        </div>

        {/* Official Contact & Corporate Details Footer Preview */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
          <div>
            <h5 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-teal-700" />
              Corporate Office (Guwahati)
            </h5>
            <p className="leading-relaxed">
              North Eastern Handicrafts and Handlooms Development Corporation Ltd.<br />
              Craft Promotion Center, Garchuk, Pamohi Road, Guwahati - 781035, Assam.<br />
              Phone: +91 361 2270000 / +91 70024 03723<br />
              Email: hradmin@nehhdc.com / purbashreeonline@gmail.com
            </p>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-teal-700" />
              Registered Office (Shillong)
            </h5>
            <p className="leading-relaxed">
              C/O Purbashree Emporium, NEHHDC Ltd.,<br />
              Police Bazar, Shillong - 793001, Meghalaya.<br />
              Phone/Fax: 0364-2224477<br />
              Email: secretariat@nehhdc.com / md.nehhdcl@gmail.com
            </p>
          </div>
        </div>
      </main>

      {/* Official Government Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-4 px-4 sm:px-8 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p>© {new Date().getFullYear()} North Eastern Handicrafts and Handlooms Development Corporation Ltd. (NEHHDC).</p>
          <p className="text-[11px] text-slate-500">
            A Central Public Sector Enterprise under Ministry of DoNER, Govt. of India.
          </p>
        </div>
      </footer>
    </div>
  );
};
