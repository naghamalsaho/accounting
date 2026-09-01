'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const [showBanner, setShowBanner] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('ar');

  // بيانات قسم "نظام متكامل"
  const integratedFeatures = [
    {
      id: 'inventory',
      title: 'إدارة المخزون الذكية',
      badgeIcon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      description: 'تتبع حرَكات المخزون بدقة متناهية وفي الوقت الفعلي. احصل على تنبيهات استباقية لانخفاض الكميات، وأدر علاقاتك مع الموردين من خلال منصة واحدة موثوقة.',
      bullets: ['تحديثات فورية للكميات', 'تقارير جرد مفصلة'],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
      imageAlt: 'إدارة المخزون والمستودعات',
      imagePosition: 'left'
    },
    {
      id: 'expenses',
      title: 'تتبع النفقات والضرائب',
      badgeIcon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l2 2 4-4m5-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'بسّط عملية الإقرارات الضريبية. سجّل وصنّف نفقاتك تلقائياً من خلال الربط المباشر مع حساباتك البنكية، وتأكد من امتثالك للقوانين الضريبية.',
      bullets: ['ربط بنكي آمن', 'تصنيف آلي للمصروفات'],
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
      imageAlt: 'تتبع النفقات والحسابات البنكية',
      imagePosition: 'right'
    },
    {
      id: 'performance',
      title: 'تعرف على أداء أعمالك',
      badgeIcon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      description: 'اتخذ قرارات مبنية على بيانات دقيقة. لوحات معلومات تفاعلية وتقارير مالية شاملة تمنحك رؤية واضحة لحالة عملك المالية واتجاهات النمو.',
      bullets: ['قوائم الدخل والميزانية', 'تحليل التدفق النقدي'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      imageAlt: 'تقارير أداء الأعمال والتحليلات',
      imagePosition: 'left'
    },
    {
      id: 'invoicing',
      title: 'الفوترة الذكية',
      badgeIcon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      description: 'أصدر فواتير احترافية تعكس هوية علامتك التجارية في ثوانٍ معدودة. متوافقة بالكامل مع متطلبات الضرائب المحلية، مع ميزات التذكير الآلي للمدفوعات المتأخرة.',
      bullets: ['تخصيص كامل للتصميم', 'روابط دفع إلكترونية'],
      image: 'https://images.unsplash.com/photo-1556742049-0a670fc8078a?w=800&auto=format&fit=crop&q=80',
      imageAlt: 'الفوترة الإلكترونية والدفع الذكي',
      imagePosition: 'right'
    }
  ];

  // قائمة الشركاء والعملاء
  const partnerLogos = [
    { 
      name: "مؤسسة محمد بن راشد", 
      role: "Dubai SME", 
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&auto=format&fit=crop&q=80" 
    },
    { 
      name: "د. سارة المنصوري", 
      role: "دائرة التنمية الاقتصادية", 
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80" 
    },
    { 
      name: "Supy Tech", 
      role: "حلول البرمجة الذكية", 
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&auto=format&fit=crop&q=80" 
    },
    { 
      name: "م. أحمد الفاسي", 
      role: "Meydan Free Zone", 
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80" 
    },
    { 
      name: "Stripe Payments", 
      role: "أنظمة المدفوعات", 
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&auto=format&fit=crop&q=80" 
    },
    { 
      name: "ليلى الهاشمي", 
      role: "Hub71 Innovation", 
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80" 
    }
  ];

  const tickerItems = [...partnerLogos, ...partnerLogos];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-amber-500 selection:text-white dir-rtl relative overflow-x-hidden" dir="rtl">
      
      {/* 1. Top Announcement Bar */}
      {showBanner && (
        <div className="bg-gray-900 text-white text-xs md:text-sm py-2.5 px-4 shadow-sm relative z-50 border-b border-gray-800 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 mx-auto text-center font-medium">
              <span className="bg-amber-500 text-gray-900 px-2.5 py-0.5 rounded-full text-xs font-bold border border-amber-400">
                عرض خاص 🎁
              </span>
              <span>احصل على خصم 80% على الخطط السنوية لفترة محدودة!</span>
              <a href="#pricing" className="underline font-bold text-amber-400 hover:text-amber-300 transition-colors mr-1">
                احصل على العرض الآن ←
              </a>
            </div>
            <button 
              onClick={() => setShowBanner(false)}
              className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-800 transition-colors"
              aria-label="إغلاق"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 2. Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo Matching Login / Register */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900 font-bold text-white shadow-md group-hover:bg-amber-500 group-hover:text-gray-900 transition-colors">
              BE
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-gray-900 leading-none tracking-wide">ACCOUNTING</span>
              <span className="text-[10px] font-bold text-amber-600 tracking-widest uppercase mt-0.5">SERVICES</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-700">
            <a href="#features" className="hover:text-amber-600 transition-colors">Features</a>
            <a href="#solutions" className="hover:text-amber-600 transition-colors">Solutions</a>
            <a href="#resources" className="hover:text-amber-600 transition-colors">Resources</a>
            <a href="#pricing" className="hover:text-amber-600 transition-colors">Pricing</a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="text-xs font-semibold text-gray-600 hover:text-gray-900 p-2 border border-gray-200 rounded-lg transition-colors flex items-center gap-1"
            >
              🌐 {lang.toUpperCase()}
            </button>

            <Link 
              to="/login" 
              className="text-sm font-semibold text-gray-700 hover:text-amber-600 px-3 py-2 transition-colors"
            >
              Login
            </Link>

            <Link 
              to="/register" 
              className="bg-gray-900 hover:bg-black text-white font-semibold text-xs px-5 py-2.5 rounded-xl border border-gray-900 shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-4 space-y-3 font-semibold text-sm shadow-xl">
            <a href="#features" className="block py-2 text-gray-700 hover:text-amber-600">Features</a>
            <a href="#solutions" className="block py-2 text-gray-700 hover:text-amber-600">Solutions</a>
            <a href="#pricing" className="block py-2 text-gray-700 hover:text-amber-600">Pricing</a>
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <Link to="/login" className="text-center py-2.5 border border-gray-200 rounded-xl text-gray-700">Login</Link>
              <Link to="/register" className="text-center py-2.5 bg-gray-900 text-white rounded-xl">Get Started</Link>
            </div>
          </div>
        )}
      </header>

      {/* 3. Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-36 overflow-hidden bg-white border-b border-gray-200" dir="rtl">
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gray-200/50 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-28 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-8 text-center lg:text-right"
            >
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gray-100 border border-gray-300 text-gray-800 px-4 py-2 rounded-full text-xs font-bold shadow-sm"
              >
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                </span>
                المنصة المحاسبية الأولى المعتمدة للأعمال
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.2] tracking-tight">
                برنامج محاسبة مصمّم <br />
                <span className="text-gray-900 relative inline-block mt-2">
                  للأعمال المتنامية
                  <svg className="absolute -bottom-3 right-0 w-full h-3 text-amber-500" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                تبسيط إدارة المحاسبة والمخزون والامتثال المحلي، ركّز على نمو عملك واترك الأرقام لنا.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <motion.a 
                  whileHover={{ scale: 1.03, translateY: -2 }}
                  whileTap={{ scale: 0.96 }}
                  href="#pricing" 
                  className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold text-base px-8 py-4 rounded-xl shadow-sm transition-all"
                >
                  احصل على الخصم
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.03, translateY: -2 }}
                  whileTap={{ scale: 0.96 }}
                  href="#pricing" 
                  className="bg-white border border-gray-300 hover:border-gray-900 text-gray-800 font-bold text-base px-8 py-4 rounded-xl shadow-sm transition-all"
                >
                  اطلع على الأسعار
                </motion.a>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-gray-500 pt-4">
                <span className="flex items-center gap-1.5"><span className="text-emerald-600 text-base font-bold">✓</span> 14 يوم تجربة مجانية</span>
                <span className="flex items-center gap-1.5"><span className="text-emerald-600 text-base font-bold">✓</span> لا حاجة لبطاقة ائتمان</span>
                <span className="flex items-center gap-1.5"><span className="text-emerald-600 text-base font-bold">✓</span> إلغاء في أي وقت</span>
              </div>
            </motion.div>

            {/* Dashboard Visual */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative group"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -right-4 z-20 bg-gray-900 text-white font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow-md border border-gray-800 flex items-center gap-2"
              >
                <span>سهل وسريع</span>
                <span className="text-amber-400 text-base">⚡</span>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-4 z-20 bg-white p-3.5 rounded-2xl shadow-lg border border-gray-200 flex items-center gap-3 hidden sm:flex"
              >
                <div className="w-9 h-9 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-lg font-bold">💰</div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 font-bold">دفعة جديدة واردة</p>
                  <p className="text-xs font-black text-gray-900">₪4,250.00 +</p>
                </div>
              </motion.div>

              <div className="relative rounded-3xl p-4 bg-gray-100 border border-gray-300 shadow-sm transition-all duration-500">
                <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 text-right">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      مزيد للمحاسبة - الصفحة الرئيسية الشاملة
                    </span>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                    </div>
                  </div>

                  <div className="p-5 space-y-5 bg-white">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-[10px] text-gray-500 font-bold">المبيعات الإجمالية</p>
                        <p className="text-sm font-black text-gray-900 mt-1">₪124,500</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-[10px] text-gray-500 font-bold">الفواتير المستحقة</p>
                        <p className="text-sm font-black text-gray-900 mt-1">18 فاتورة</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-[10px] text-gray-500 font-bold">الربح الصافي</p>
                        <p className="text-sm font-black text-emerald-600 mt-1">+24.5%</p>
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-gray-800">رسم الإيرادات والمصروفات</span>
                        <span className="text-[10px] bg-gray-100 text-gray-700 border border-gray-200 px-2.5 py-0.5 rounded-full font-bold">محدث مباشرة</span>
                      </div>
                      <div className="h-32 w-full flex items-end relative">
                        <svg className="w-full h-full text-amber-500" viewBox="0 0 300 100" fill="none">
                          <motion.path 
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.8, ease: "easeInOut" }}
                            d="M0,80 Q40,20 80,60 T160,30 T240,70 T300,10" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="3.5" 
                            strokeLinecap="round" 
                          />
                        </svg>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. Social Proof & Partners */}
      <section className="py-20 bg-gray-50 border-b border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 space-y-3">
            <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">
              موثوق بنا من قبل الآلاف من الشركات والشركاء
            </p>
          </div>

          {/* Stats Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center mb-16">
            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-2">
              <h4 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight">
                +4,000
              </h4>
              <p className="text-sm sm:text-base font-bold text-gray-500">
                شركة تم خدمتها
              </p>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-2">
              <h4 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight">
                +2 مليون
              </h4>
              <p className="text-sm sm:text-base font-bold text-gray-500">
                معاملة شهرية
              </p>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-2">
              <h4 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight flex items-center justify-center gap-1">
                4.7 <span className="text-amber-500 text-3xl sm:text-4xl">★</span>
              </h4>
              <p className="text-sm sm:text-base font-bold text-gray-500">
                تقييم عملاء ممتاز
              </p>
            </div>
          </div>

          {/* Continuous Marquee Carousel */}
          <div className="relative w-full overflow-hidden py-4 dir-ltr" dir="ltr">
            
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

            <motion.div 
              className="flex items-center gap-8 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                repeat: Infinity, 
                ease: "linear", 
                duration: 25 
              }}
            >
              {tickerItems.map((partner, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:border-gray-900 transition-all cursor-pointer min-w-[170px] group text-center"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border border-gray-200 shadow-sm">
                    <img 
                      src={partner.image} 
                      alt={partner.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-900 line-clamp-1">
                    {partner.name}
                  </span>
                  <span className="text-[10px] font-medium text-gray-500 mt-0.5 line-clamp-1">
                    {partner.role}
                  </span>
                  <div className="w-8 h-0.5 bg-amber-500 mt-2 rounded-full" />
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      {/* 5. Integrated System Section */}
      <section id="features" className="py-24 bg-white relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-20 space-y-3"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              نظام متكامل، لأعمال تنمو بلا حدود
            </h2>
            <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full" />
            <p className="text-base sm:text-lg font-semibold text-gray-500 pt-1">
              كل ما تحتاجه لإدارة عملياتك المالية بكفاءة عالية وإحترافية.
            </p>
          </motion.div>

          <div className="space-y-20 lg:space-y-28">
            {integratedFeatures.map((feature) => {
              const isLeftImage = feature.imagePosition === 'left';
              
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border border-gray-200 p-8 sm:p-12 rounded-3xl bg-gray-50/50"
                >
                  
                  <div className={`lg:col-span-6 space-y-6 text-right ${isLeftImage ? 'lg:order-1' : 'lg:order-2'}`}>
                    
                    <div className="flex items-center gap-3">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="w-11 h-11 bg-gray-900 text-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0"
                      >
                        {feature.badgeIcon}
                      </motion.div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
                        {feature.title}
                      </h3>
                    </div>

                    <div className="w-10 h-0.5 bg-amber-500 rounded-full" />

                    <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="space-y-3 pt-2">
                      {feature.bullets.map((bullet, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                          className="flex items-center gap-3 text-sm sm:text-base font-bold text-gray-800"
                        >
                          <span className="w-5 h-5 rounded bg-gray-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                            ✓
                          </span>
                          <span>{bullet}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className={`lg:col-span-6 ${isLeftImage ? 'lg:order-2' : 'lg:order-1'}`}>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative rounded-2xl p-3 bg-white border border-gray-200 shadow-sm group overflow-hidden"
                    >
                      <div className="relative rounded-xl overflow-hidden shadow-inner bg-white aspect-[4/3] flex items-center justify-center border border-gray-100">
                        <motion.img
                          initial={{ scale: 1.05 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2 }}
                          src={feature.image}
                          alt={feature.imageAlt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                      </div>
                    </motion.div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Footer Section */}
      <footer className="bg-gray-900 pt-16 pb-12 border-t border-gray-800 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-gray-800">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 font-bold text-gray-900 shadow-md text-xs">
                  BE
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-lg text-white leading-none">ACCOUNTING</span>
                  <span className="text-[9px] font-bold text-amber-500 tracking-widest uppercase mt-0.5">SERVICES</span>
                </div>
              </div>
              <p className="text-xs font-medium leading-relaxed text-gray-400">
                برنامج المحاسبة الأذكى للشركات الصغيرة والمتوسطة.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">الروابط</h4>
              <ul className="space-y-2 text-xs font-semibold text-gray-400">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Tax Laws</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">المساعدة</h4>
              <ul className="space-y-2 text-xs font-semibold text-gray-400">
                <li><a href="#" className="hover:text-amber-400 transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Careers</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 text-center text-[11px] font-semibold text-gray-500">
            Mazeed Accounting. All rights reserved. Built for Business Growth.
          </div>

        </div>
      </footer>

      {/* 7. Floating Live Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-gray-900 hover:bg-black border border-gray-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 group">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
        </button>
      </div>

    </div>
  );
}