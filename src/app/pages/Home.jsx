'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [showBanner, setShowBanner] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('ar');
  
  // حالة تبديل الأسعار (شهري / سنوي)
  const [billingCycle, setBillingCycle] = useState('annual');

  // حالة الأسئلة الشائعة (FAQ Accordion)
  const [openFaq, setOpenFaq] = useState(null);

  // بيانات قسم "من يستفيد من مزيد"
  const personas = [
    {
      title: 'رجل أعمال',
      desc: 'ركز على نمو عملك ودع مزيد تدير الدورة المحاسبية بالكامل من أجلك.',
      tag: 'نمو وتفرغ'
    },
    {
      title: 'محاسب / فريلانسر',
      desc: 'تخلص من المهام المتكررة وقلل الأخطاء المحاسبية وزد كفاءة أعمالك.',
      tag: 'دقة وسرعة'
    },
    {
      title: 'شركة محاسبة',
      desc: 'طور فريق المحاسبين الخاص بك وقلل التكاليف، ووفر مزيدًا من الوقت للمزيد من العملاء.',
      tag: 'إدارة شاملة'
    }
  ];

  // بيانات الأسعار
  const pricingPlans = [
    {
      name: 'الانطلاقة',
      desc: 'فواتير أسهل للمستقلين والمشاريع الناشئة.',
      priceMonthly: 'مجاني',
      priceAnnual: 'مجاني',
      badge: 'مجاني للأبد',
      features: ['مستخدم واحد', 'إدارة المبيعات', 'المنتجات والخدمات', 'مخططات حسابات قابلة للتخصيص', 'تقارير المبيعات الأساسية'],
      cta: 'ابدأ مجانًا',
      popular: false
    },
    {
      name: 'الأساسية',
      desc: 'أدوات فوترة وامتثال مبسّطة للشركات الصغيرة.',
      priceMonthly: 99,
      priceAnnual: 49.50,
      saveText: 'وفّر 594 درهم في السنة الأولى',
      features: ['كل شيء في الانطلاقة بالإضافة إلى:', '3 مستخدمين', 'مستودع واحد', 'فواتير متوافقة مع الأنظمة', 'إدارة المشتريات', 'جلسة تدريب لمدة ساعة'],
      cta: 'الاستمرار مع الأساسية',
      popular: false
    },
    {
      name: 'المتقدمة',
      desc: 'حلول متقدمة للشركات المتوسطة مع المخزون والتجارة الإلكترونية.',
      priceMonthly: 170,
      priceAnnual: 85,
      saveText: 'وفّر 1020 درهم في السنة الأولى',
      features: ['كل شيء في الأساسية بالإضافة إلى:', 'مستخدمون بلا حدود', 'مستودعان', 'إدارة المخزون', 'مراكز التكلفة', 'جلسة تدريب لمدة ساعتين'],
      cta: 'الاستمرار مع المتقدمة',
      popular: true
    },
    {
      name: 'الشاملة',
      desc: 'إدارة مالية شاملة للأعمال الكبرى.',
      priceMonthly: 'تواصل معنا',
      priceAnnual: 'تواصل معنا',
      saveText: 'تسعير مخصص',
      features: ['كل شيء في المتقدمة بالإضافة إلى:', 'مدير حساب مخصص', 'قاعدة بيانات عالية الأداء', 'خبراء مسك الدفاتر عند الطلب', 'خدمات الضرائب والتدقيق', 'استشارات المدير المالي'],
      cta: 'اتصل بالمبيعات',
      popular: false
    }
  ];

  // الأسئلة الشائعة
  const faqs = [
    { q: 'أي خطة تناسب نشاطي التجاري؟', a: 'تعتمد على حجم عملك؛ الانطلاقة للمشاريع الناشئة، الأساسية والمتقدمة للشركات الصغيرة والمتوسطة، والشاملة للشركات الكبرى التي تحتاج لإدارة مخصصة.' },
    { q: 'هل هناك نسخة مجانية أو تجربة مجانية؟', a: 'نعم، نوفر باقة "الانطلاقة" المجانية للأبد، بالإضافة إلى تجربة مجانية مدتها 14 يوماً للخطط المدفوعة.' },
    { q: 'هل أحتاج إلى إدخال بيانات بطاقة ائتمان لبدء التجربة المجانية؟', a: 'لا، لست بحاجة لأي بطاقة ائتمان لبدء تجربتك المجانية على الإطلاق.' },
    { q: 'هل الأسعار المعروضة تشمل الضريبة (ضريبة القيمة المضافة) أم لا؟', a: 'جميع الأسعار بالدرهم الإماراتي وغير شاملة لضريبة القيمة المضافة.' },
    { q: 'ما طرق الدفع المتاحة؟', a: 'نقبل البطاقات الائتمانية الرئيسية (Visa, MasterCard) والتحويلات البنكية الآمنة.' },
    { q: 'هل يمكنني ترقية أو تخفيض خطتي في أي وقت؟', a: 'نعم، يمكنك تغيير خطتك في أي وقت بسهولة من لوحة التحكم الخاصة بك.' }
  ];

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
      description: 'بسّط عملية الإقرارات الضريبية. سجّل وصنّف نفقاتك تلقائيًا من خلال الربط المباشر مع حساباتك البنكية، وتأكد من امتثالك للقوانين الضريبية.',
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
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-amber-500 selection:text-white relative overflow-x-hidden" dir="rtl">
      
      {/* 1. Top Announcement Bar */}
      {showBanner && (
        <div className="bg-gray-900 text-white text-xs md:text-sm py-2.5 px-4 shadow-sm relative z-50 border-b border-gray-800 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center justify-center gap-2 mx-auto text-center font-medium">
              <span className="bg-amber-500 text-gray-900 px-2.5 py-0.5 rounded-full text-xs font-bold border border-amber-400">
                عرض خاص 🎁
              </span>
              <span>احصل على خصم 50% على سنتك الأولى في مزيد!</span>
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
          
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900 font-bold text-white shadow-md group-hover:bg-amber-500 group-hover:text-gray-900 transition-colors">
              BE
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-gray-900 leading-none tracking-wide">ACCOUNTING</span>
              <span className="text-[10px] font-bold text-amber-600 tracking-widest uppercase mt-0.5">SERVICES</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-700">
            <a href="#features" className="hover:text-amber-600 transition-colors">المميزات</a>
            <a href="#why-choose-us" className="hover:text-amber-600 transition-colors">لماذا مزيد؟</a>
            <a href="#mobile-app" className="hover:text-amber-600 transition-colors">التطبيق</a>
            <a href="#pricing" className="hover:text-amber-600 transition-colors">الأسعار</a>
            <a href="#faq" className="hover:text-amber-600 transition-colors">الأسئلة الشائعة</a>
          </nav>

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
              تسجيل الدخول
            </Link>

            <Link 
              to="/register" 
              className="bg-gray-900 hover:bg-black text-white font-semibold text-xs px-5 py-2.5 rounded-xl border border-gray-900 shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              ابدأ تجربة مجانية
            </Link>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-4 space-y-3 font-semibold text-sm shadow-xl">
            <a href="#features" className="block py-2 text-gray-700 hover:text-amber-600">المميزات</a>
            <a href="#why-choose-us" className="block py-2 text-gray-700 hover:text-amber-600">لماذا مزيد؟</a>
            <a href="#mobile-app" className="block py-2 text-gray-700 hover:text-amber-600">التطبيق</a>
            <a href="#pricing" className="block py-2 text-gray-700 hover:text-amber-600">الأسعار</a>
            <a href="#faq" className="block py-2 text-gray-700 hover:text-amber-600">الأسئلة الشائعة</a>
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <Link to="/login" className="text-center py-2.5 border border-gray-200 rounded-xl text-gray-700">تسجيل الدخول</Link>
              <Link to="/register" className="text-center py-2.5 bg-gray-900 text-white rounded-xl">ابدأ تجربة مجانية</Link>
            </div>
          </div>
        )}
      </header>

      {/* 3. Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-36 overflow-hidden bg-white border-b border-gray-200" dir="rtl">
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gray-200/50 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-6 text-right"
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
                الملاءمة المثالية للأعمال في الإمارات العربية المتحدة
              </motion.div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.3] tracking-tight">
                برنامج محاسبة ذكي مصمم لك <br />
                <span className="text-gray-900 relative inline-block mt-2">
                  بخبرة محلية ومعايير عالمية
                  <svg className="absolute -bottom-2 right-0 w-full h-3 text-amber-500" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>
              </h1>

              <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed max-w-xl">
                جاهزية كاملة للفوترة الإلكترونية والامتثال الضريبي بدون عناء. ركّز على نمو عملك واترك الأرقام لنا.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <motion.a 
                  whileHover={{ scale: 1.03, translateY: -2 }}
                  whileTap={{ scale: 0.96 }}
                  href="/register" 
                  className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold text-sm px-7 py-3.5 rounded-xl shadow-sm transition-all"
                >
                  ابدأ تجربة مجانية
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.03, translateY: -2 }}
                  whileTap={{ scale: 0.96 }}
                  href="#pricing" 
                  className="bg-white border border-gray-300 hover:border-gray-900 text-gray-800 font-bold text-sm px-7 py-3.5 rounded-xl shadow-sm transition-all"
                >
                  اطلع على الأسعار
                </motion.a>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-gray-500 pt-2">
                <span className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">✓</span> 14 يوم تجربة مجانية</span>
                <span className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">✓</span> لا حاجة لبطاقة ائتمان</span>
                <span className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">✓</span> دعم فوري بالإمارات</span>
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
                <span>معتمد من FTA</span>
                <span className="text-amber-400 text-base">🇦🇪</span>
              </motion.div>

              <div className="relative rounded-3xl p-4 bg-gray-100 border border-gray-300 shadow-sm transition-all duration-500">
                <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 text-right">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      لوحة تحكم مزيد المالية - الإمارات
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
                        <p className="text-sm font-black text-gray-900 mt-1">AED 124,500</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-[10px] text-gray-500 font-bold">الفواتير المستحقة</p>
                        <p className="text-sm font-black text-gray-900 mt-1">18 فاتورة</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-[10px] text-gray-500 font-bold">الامتثال الضريبي</p>
                        <p className="text-sm font-black text-emerald-600 mt-1">100%</p>
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-gray-800">حركة الإيرادات والضرائب</span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">متوافق مع الهيئة</span>
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

      {/* 4. SECTION: لماذا تختار مزيد؟ (Why Choose Mazeed) */}
      <section id="why-choose-us" className="py-24 bg-gradient-to-b from-white via-amber-50/20 to-slate-50 relative overflow-hidden">
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-slate-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-800 px-4 py-1.5 rounded-full text-xs font-black shadow-sm"
            >
              <span>🇦🇪 مصمم خصيصاً للسوق الإماراتي</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight"
            >
              لماذا تختار <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">مزيد؟</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed"
            >
              الملائمة المثالية للأعمال والشركات في دولة الإمارات العربية المتحدة، بتوافق تام مع التشريعات والمعايير المحلية.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: E-Invoicing */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white border border-gray-200/80 hover:border-amber-400 p-7 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div className="space-y-4 text-right">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center text-2xl shadow-md shadow-amber-500/20 group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-black text-gray-900 group-hover:text-amber-700 transition-colors">
                    جاهزية كاملة للفوترة الإلكترونية
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    مزيد جاهز تماماً لمتطلبات الفوترة الإلكترونية في الإمارات، لتبقى دائماً متوافقاً وفي المقدمة.
                  </p>
                </div>
              </div>
              <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-amber-700">
                <span>متوافق مع E-Invoicing</span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              </div>
            </motion.div>

            {/* Card 2: FTA Tax Compliance */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="bg-white border border-gray-200/80 hover:border-emerald-400 p-7 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div className="space-y-4 text-right">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center text-2xl shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  🛡️
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-black text-gray-900 group-hover:text-emerald-700 transition-colors">
                    الامتثال الضريبي بدون عناء
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    من التسجيل إلى الإقرار، إدارة ضريبة القيمة المضافة والشركات بامتثال كامل لمعايير الهيئة الاتحادية للضرائب (FTA).
                  </p>
                </div>
              </div>
              <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-emerald-700">
                <span>معتمد لمعايير FTA</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </motion.div>

            {/* Card 3: Financial Reports */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -8 }}
              className="bg-white border border-gray-200/80 hover:border-blue-400 p-7 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div className="space-y-4 text-right">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  📊
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-black text-gray-900 group-hover:text-blue-700 transition-colors">
                    تقارير مالية فورية
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    ابق على اطلاع بأرقامك لحظة بلحظة مع تقارير مالية مخصصة ومحدّثة تساعدك في اتخاذ قرارات أكثر ذكاءً.
                  </p>
                </div>
              </div>
              <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-blue-700">
                <span>تحديثات مباشرة 100%</span>
                <span className="w-2 h-2 rounded-full bg-blue-500" />
              </div>
            </motion.div>

            {/* Card 4: Local UAE Support */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -8 }}
              className="bg-white border border-gray-200/80 hover:border-purple-400 p-7 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div className="space-y-4 text-right">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-amber-600 text-white flex items-center justify-center text-xl font-black shadow-md shadow-purple-500/20 group-hover:scale-110 transition-transform">
                  🇦🇪
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-black text-gray-900 group-hover:text-purple-700 transition-colors">
                    دعم محلي داخل الإمارات
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    احصل على مساعدة سريعة من خبراء في الإمارات يفهمون طبيعة أعمالك ويتحدثون لغتك بوضوح.
                  </p>
                </div>
              </div>
              <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-purple-700">
                <span>فريق متخصص متاح</span>
                <span className="w-2 h-2 rounded-full bg-purple-500" />
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 5. Integrated System Section (الميزات الأساسية) */}
      <section id="features" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">كل ما تحتاجه، في مكان واحد</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              ميزات محاسبية ذكية مصممة لتساعدك على تطوير أعمالك
            </h2>
            <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full" />
          </div>

          <div className="space-y-16 lg:space-y-20">
            {integratedFeatures.map((feature) => {
              const isLeftImage = feature.imagePosition === 'left';
              
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border border-gray-200 p-8 sm:p-12 rounded-3xl bg-gray-50/50"
                >
                  <div className={`lg:col-span-6 space-y-6 text-right ${isLeftImage ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-gray-900 text-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                        {feature.badgeIcon}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                        {feature.title}
                      </h3>
                    </div>
                    <div className="w-10 h-0.5 bg-amber-500 rounded-full" />
                    <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="space-y-3 pt-2">
                      {feature.bullets.map((bullet, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-800">
                          <span className="w-5 h-5 rounded bg-gray-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`lg:col-span-6 ${isLeftImage ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-2xl p-3 bg-white border border-gray-200 shadow-sm overflow-hidden">
                      <div className="relative rounded-xl overflow-hidden shadow-inner bg-white aspect-[4/3] flex items-center justify-center border border-gray-100">
                        <img src={feature.image} alt={feature.imageAlt} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. SECTION: الترحيل الفوري ونقل البيانات (Data Migration Section) */}
      <section id="migration" className="py-20 bg-gradient-to-b from-slate-50 via-amber-50/40 to-white relative overflow-hidden border-y border-amber-100/60">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-amber-300/20 via-orange-200/20 to-amber-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-5 py-2 rounded-full text-xs font-black shadow-lg shadow-amber-500/20"
            >
              <span>⚡ الترحيل الفوري والآمن</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
                التحويل إلى <span className="text-amber-600 relative">
                  مزيد
                  <svg className="absolute -bottom-2 right-0 w-full h-2 text-amber-400/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="6" fill="transparent" strokeLinecap="round" />
                  </svg>
                </span> أسهل وأسرع مما تتخيل!
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
                انقل كل بياناتك المحاسبية والعملاء والفواتير بضغطة زر واحدة بدون إدخال يدوي، وابدأ العمل اليوم بآمان تام.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 backdrop-blur-md border border-amber-200/70 p-6 sm:p-8 rounded-3xl shadow-xl my-8 relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                
                <div className="flex flex-wrap md:flex-col items-center justify-center gap-3">
                  <span className="text-xs font-extrabold text-gray-400 w-full text-center md:text-right">أنظمتك الحالية:</span>
                  <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 shadow-sm hover:scale-105 transition-transform">
                    <span className="text-emerald-600 text-base">📊</span> ملفات Excel & CSV
                  </div>
                  <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 shadow-sm hover:scale-105 transition-transform">
                    <span className="text-blue-600 text-base">📁</span> فواتير PDF
                  </div>
                  <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 shadow-sm hover:scale-105 transition-transform">
                    <span className="text-purple-600 text-base">🔄</span> البرامج المحاسبية الأخرى
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-2 py-4 md:py-0">
                  <div className="w-full bg-amber-100 h-1.5 rounded-full relative overflow-hidden max-w-[180px]">
                    <motion.div 
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                      className="w-1/2 h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                    />
                  </div>
                  <span className="text-[11px] font-black text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300/50">
                    نقل وتطابق آلي 100%
                  </span>
                </div>

                <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-5 rounded-2xl shadow-lg border border-amber-400/50 text-center space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center text-xl font-black">
                    M
                  </div>
                  <h4 className="font-extrabold text-sm">منصة مزيد الموحدة</h4>
                  <p className="text-[11px] text-amber-100">جاهزة للاستخدام التلقائي فوراً</p>
                </div>

              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-amber-400 transition-all text-right space-y-2"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 font-bold flex items-center justify-center text-lg">
                  🛡️
                </div>
                <h4 className="font-extrabold text-gray-900 text-sm">استيراد بيانات آمن</h4>
                <p className="text-xs text-gray-500 leading-relaxed">تشفير كامل لبياناتك المالية دون أي ريسك أو احتمالية لفقدان البيانات.</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-amber-400 transition-all text-right space-y-2"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center text-lg">
                  ⚡
                </div>
                <h4 className="font-extrabold text-gray-900 text-sm">جاهزية من اليوم الأول</h4>
                <p className="text-xs text-gray-500 leading-relaxed">لا حاجة لفترات تهيئة طويلة، يمكنك إظهار التقارير وإصدار الفواتير فوراً.</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-amber-400 transition-all text-right space-y-2"
              >
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 font-bold flex items-center justify-center text-lg">
                  🚫
                </div>
                <h4 className="font-extrabold text-gray-900 text-sm">بدون إدخال يدوي</h4>
                <p className="text-xs text-gray-500 leading-relaxed">نظام مطابقة الخانات ذكياً يتعرف على أنواع البيانات ويوزعها في مكانها.</p>
              </motion.div>
            </div>

            <div className="pt-4">
              <a 
                href="/register" 
                className="inline-flex items-center gap-3 bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-extrabold text-sm shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
              >
                <span>جرب أداة الترحيل الذكي مجاناً</span>
                <span className="text-amber-400">←</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 7. SECTION: تطبيق الهاتف (Mobile App) */}
      <section id="mobile-app" className="py-24 bg-gradient-to-b from-white via-amber-50/30 to-white overflow-hidden relative">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-slate-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 space-y-8 text-right"
            >
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-800 px-4 py-1.5 rounded-full text-xs font-extrabold shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                ✨ تطبيق مزيد الذكي • معزز بالذكاء الاصطناعي
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
                أعمالك بين يديك، <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
                  بذكاء أعلى وسرعة فائقة
                </span>
              </h2>

              <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
                لا داعي للإدخال اليدوي المجهد. التقط صور الفواتير، ودع القارئ الذكي (AI OCR) يستخرج البيانات، يصنّف المصروفات، ويسجل المدفوعات فورياً في حساباتك.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-xl mb-3">
                    🤖
                  </div>
                  <h4 className="font-extrabold text-gray-900 text-sm mb-1">مسح ذكي للفواتير (AI)</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">قراءة المبالغ، التواريخ، والضرائب تلقائياً بدقة تصل إلى 99.8%.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xl mb-3">
                    ⚡
                  </div>
                  <h4 className="font-extrabold text-gray-900 text-sm mb-1">تنسيق وتحديث لحظي</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">مزامنة فورية بين هاتفك ولوحة التحكم الرئيسية دون أي تأخير.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all sm:col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xl shrink-0">
                      🔔
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 text-sm">التنبيهات الاستباقية Smart Alerts</h4>
                      <p className="text-xs text-gray-500 mt-0.5">تنبيهك قبل استحقاق الفواتير وإشعارك بالمدفوعات المتأخرة أولاً بأول.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a href="#" className="bg-gray-900 hover:bg-black text-white px-6 py-3.5 rounded-2xl font-bold text-xs flex items-center gap-3 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                  <span className="text-xl"></span>
                  <div className="text-right leading-tight">
                    <span className="block text-[9px] text-gray-400 uppercase tracking-wider">حمّل من</span>
                    <span className="text-sm font-extrabold">App Store</span>
                  </div>
                </a>

                <a href="#" className="bg-gray-900 hover:bg-black text-white px-6 py-3.5 rounded-2xl font-bold text-xs flex items-center gap-3 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                  <span className="text-xl">▶</span>
                  <div className="text-right leading-tight">
                    <span className="block text-[9px] text-gray-400 uppercase tracking-wider">حمّل من</span>
                    <span className="text-sm font-extrabold">Google Play</span>
                  </div>
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-6 relative flex justify-center py-6"
            >
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="absolute -top-2 -right-2 sm:right-4 z-20 bg-white/90 backdrop-blur-md text-gray-900 font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow-xl border border-amber-200/80 flex items-center gap-2.5"
              >
                <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <span>القارئ الذكي AI OCR نشط</span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md">99.8%</span>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-2 sm:left-4 z-20 bg-white/95 backdrop-blur-md text-gray-800 font-bold text-xs p-3 rounded-2xl shadow-xl border border-gray-200 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center text-lg">
                  ✓
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-medium">تم تحليل فاتورة جديدة</p>
                  <p className="text-xs font-black text-gray-900">AED 1,850.00 • ضريبة 5%</p>
                </div>
              </motion.div>

              <div className="w-full max-w-[340px] bg-white rounded-[2.8rem] p-3 shadow-2xl border-4 border-slate-100 ring-1 ring-gray-200/80 relative">
                
                <div className="w-28 h-5 bg-slate-900 rounded-full mx-auto mb-3 flex items-center justify-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <div className="w-2 h-2 rounded-full bg-blue-900/60" />
                </div>

                <div className="bg-gradient-to-b from-amber-50/40 via-white to-slate-50 rounded-[2.2rem] p-4 border border-gray-100 overflow-hidden relative space-y-4">
                  
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500 text-gray-900 font-black text-xs flex items-center justify-center shadow-sm">
                        M
                      </div>
                      <span className="text-xs font-extrabold text-gray-900">مزيد لمسح الفواتير</span>
                    </div>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      كاميرا AI
                    </span>
                  </div>

                  <div className="relative rounded-2xl bg-slate-900 p-4 border border-slate-800 overflow-hidden text-white shadow-inner aspect-[4/3] flex flex-col justify-between">
                    <motion.div 
                      animate={{ top: ['5%', '85%', '5%'] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                      className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_#f59e0b]"
                    />

                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400 rounded-tr" />
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400 rounded-tl" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400 rounded-br" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400 rounded-bl" />

                    <div className="flex justify-between items-center text-[10px] text-gray-400 z-10">
                      <span>فاتورة #INV-9042</span>
                      <span className="text-emerald-400 font-mono">جارِ القراءة...</span>
                    </div>

                    <div className="z-10 my-auto text-center space-y-1">
                      <p className="text-xs text-amber-300 font-bold">مؤسسة الأمل للتجارة</p>
                      <p className="text-xl font-black text-white tracking-wider">AED 3,450.00</p>
                    </div>

                    <div className="z-10 flex justify-between items-center text-[9px] text-gray-300 bg-slate-800/80 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                      <span>الضريبة: AED 172.50</span>
                      <span className="text-amber-400 font-bold">محللة 100%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-white border border-gray-200/80 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                          📊
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold">المبيعات اليومية</p>
                          <p className="text-xs font-black text-gray-900">AED 14,230.00</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+12.4%</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-gray-200/80 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                          ⚡
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold">الفواتير المعالجة بالذكاء</p>
                          <p className="text-xs font-black text-gray-900">142 فاتورة هذا الشهر</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 8. SECTION: من يستفيد من مزيد؟ (Personas) */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl font-black text-gray-900">من يستفيد من مزيد؟</h2>
            <p className="text-gray-600 text-sm sm:text-base">حلول مخصصة لاحتياجاتك المختلفة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {personas.map((p, idx) => (
              <motion.div key={idx} whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4 text-right">
                <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full">{p.tag}</span>
                <h3 className="text-xl font-bold text-gray-900">{p.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SECTION: مستشارو مزيد (Advisory) */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-4 max-w-xl text-right">
              <span className="bg-amber-500 text-gray-900 text-xs font-black px-3 py-1 rounded-full">خبراء معتمدون</span>
              <h2 className="text-2xl sm:text-3xl font-black">مستشارو مزيد: احصل على خبراء ماليين، وليس مجرد برامج</h2>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">تجنّب الغرامات واضمن امتثالاً كاملًا مع محاسبين ومستشارين ضريبيين معتمدين جاهزين لخدمتك عند الطلب.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#pricing" className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-6 py-3.5 rounded-xl text-center text-sm transition-colors">
                احجز استشارة مجانية
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. SECTION: آلاف الشركات تثق في مزيد (Trust & Stats) */}
      <section className="py-16 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 border-y border-amber-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              آلاف الشركات تثق في <span className="text-amber-600">مزيد</span>
            </h2>
            <p className="text-sm font-medium text-gray-600">
              أرقام تعكس التزامنا بالتميز ودعم نمو الأعمال والشركات في الإمارات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-7 rounded-3xl border border-gray-200/80 shadow-sm hover:border-amber-400 hover:shadow-md transition-all text-center space-y-2"
            >
              <span className="text-3xl sm:text-4xl font-black text-amber-600 tracking-tight block dir-ltr">
                +4,000
              </span>
              <p className="text-sm font-bold text-gray-800">شركة تم خدمتها</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-7 rounded-3xl border border-gray-200/80 shadow-sm hover:border-amber-400 hover:shadow-md transition-all text-center space-y-2"
            >
              <span className="text-3xl sm:text-4xl font-black text-amber-600 tracking-tight block dir-ltr">
                +2 مليون
              </span>
              <p className="text-sm font-bold text-gray-800">معاملة شهرية</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-7 rounded-3xl border border-gray-200/80 shadow-sm hover:border-amber-400 hover:shadow-md transition-all text-center space-y-2"
            >
              <div className="flex items-center justify-center gap-1.5 dir-ltr">
                <span className="text-3xl sm:text-4xl font-black text-amber-600">4.7</span>
                <span className="text-amber-400 text-2xl">★</span>
              </div>
              <p className="text-sm font-bold text-gray-800">تقييم عملاء ممتاز</p>
            </motion.div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
              شعار بعض الشركات والمؤسسات التي نخدمها
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-75 hover:opacity-100 transition-opacity">
              <div className="h-10 px-4 py-2 bg-gray-100/80 rounded-xl text-gray-700 font-extrabold text-xs sm:text-sm flex items-center justify-center border border-gray-200">
                🏢 Dubai SME
              </div>
              <div className="h-10 px-4 py-2 bg-gray-100/80 rounded-xl text-gray-700 font-extrabold text-xs sm:text-sm flex items-center justify-center border border-gray-200">
                ⚡ Meydan Free Zone
              </div>
              <div className="h-10 px-4 py-2 bg-gray-100/80 rounded-xl text-gray-700 font-extrabold text-xs sm:text-sm flex items-center justify-center border border-gray-200">
                🚀 Hub71
              </div>
              <div className="h-10 px-4 py-2 bg-gray-100/80 rounded-xl text-gray-700 font-extrabold text-xs sm:text-sm flex items-center justify-center border border-gray-200">
                🌐 Supy Tech
              </div>
              <div className="h-10 px-4 py-2 bg-gray-100/80 rounded-xl text-gray-700 font-extrabold text-xs sm:text-sm flex items-center justify-center border border-gray-200">
                💳 Stripe Partner
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 11. SECTION: الضرائب أسهل وأذكى (Tax Features Section) */}
      <section id="tax-features" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-black shadow-sm"
            >
              <span>🛡️ الامتثال الضريبي الكامل في الإمارات</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight"
            >
              الضرائب <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">أسهل وأذكى</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed"
            >
              كل أدوات الامتثال الضريبي في مكان واحد. كل ما تحتاجه للامتثال لضريبة القيمة المضافة وضريبة الشركات في الإمارات، تجده في برنامج مزيد.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-slate-50/70 border border-gray-200 hover:border-emerald-500 p-7 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 space-y-4 text-right group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                🧮
              </div>
              <h3 className="text-base font-black text-gray-900 group-hover:text-emerald-700 transition-colors">
                حساب سلس للضرائب
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                تطبيق سريع لضريبة القيمة المضافة وضريبة الشركات على كل معاملة دون إعداد يدوي.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-slate-50/70 border border-gray-200 hover:border-emerald-500 p-7 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 space-y-4 text-right group"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-2xl group-hover:bg-teal-600 group-hover:text-white transition-colors">
                📈
              </div>
              <h3 className="text-base font-black text-gray-900 group-hover:text-teal-700 transition-colors">
                متابعة الضرائب
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                راقب التزامات ضريبة القيمة المضافة والشركات لحظة بلحظة مع فئات الخصم الجاهزة.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-slate-50/70 border border-gray-200 hover:border-emerald-500 p-7 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 space-y-4 text-right group"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-2xl group-hover:bg-amber-500 group-hover:text-white transition-colors">
                📄
              </div>
              <h3 className="text-base font-black text-gray-900 group-hover:text-amber-700 transition-colors">
                تقارير جاهزة للهيئة الاتحادية للضرائب
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                أنشئ إقرارات وملخصات ضريبة القيمة المضافة وضريبة الشركات بالتنسيق المطلوب رسمياً من الهيئة.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-slate-50/70 border border-gray-200 hover:border-emerald-500 p-7 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 space-y-4 text-right group"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
                🔔
              </div>
              <h3 className="text-base font-black text-gray-900 group-hover:text-purple-700 transition-colors">
                متابعة المدفوعات الضريبية
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                شاهد المبالغ المستحقة ومواعيد الدفع القادمة مع مؤشرات حالة واضحة وتنبيهات مبكرة.
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 12. Social Proof & Partners */}
      <section className="py-20 bg-gray-50 border-t border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl font-black text-gray-900">شركاء النجاح</h2>
            <p className="text-sm font-bold text-gray-500">قصص حقيقية ونتائج ملموسة</p>
          </div>

          <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl border border-gray-200 shadow-sm mb-16 text-center space-y-4">
            <p className="text-base sm:text-lg italic text-gray-700 font-medium leading-relaxed">
              &quot;تحميل السجلات المالية أمر سهل للغاية مع مزيد. يتم تخزين جميع البيانات بشكل آمن رقميًا، مما يلغي الحاجة للأعمال الورقية. خدمة سريعة وبسيطة تساعدنا على توفير الوقت والجهد.&quot;
            </p>
            <div>
              <h4 className="font-extrabold text-gray-900 text-sm">نوران البناي</h4>
              <p className="text-xs text-amber-600 font-semibold">Coffee Architecture</p>
            </div>
          </div>

          <div className="relative w-full overflow-hidden py-4 dir-ltr" dir="ltr">
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

            <motion.div 
              className="flex items-center gap-8 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
              {tickerItems.map((partner, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-2xl shadow-sm min-w-[170px] text-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border border-gray-200 shadow-sm">
                    <img src={partner.image} alt={partner.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <span className="text-xs font-bold text-gray-900 line-clamp-1">{partner.name}</span>
                  <span className="text-[10px] font-medium text-gray-500 mt-0.5 line-clamp-1">{partner.role}</span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      {/* 13. SECTION: تسعير واضح (Pricing) */}
      <section id="pricing" className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              تسعير واضح قيمة حقيقية.
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">باقات تناسب كل مرحلة من نمو مشروعك</p>
            
            <div className="inline-flex items-center bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${billingCycle === 'monthly' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                شهري
              </button>
              <button 
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${billingCycle === 'annual' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                سنوي <span className="text-amber-400 mr-1">خصم 50%</span>
              </button>
            </div>
            
            <p className="text-xs font-bold text-amber-600">احصل على خصم 50% على سنتك الأولى.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {pricingPlans.map((plan, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-3xl p-8 border flex flex-col justify-between transition-all relative ${plan.popular ? 'border-amber-500 shadow-xl ring-2 ring-amber-500/20' : 'border-gray-200 shadow-sm'}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 right-6 bg-amber-500 text-gray-900 text-[10px] font-black px-3 py-1 rounded-full shadow-sm">
                    الأكثر شيوعًا
                  </span>
                )}
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 min-h-[32px]">{plan.desc}</p>
                  </div>

                  <div className="py-4 border-y border-gray-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-black text-gray-900">
                        {typeof plan.priceMonthly === 'number' 
                          ? (billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly) 
                          : plan.priceMonthly}
                      </span>
                      {typeof plan.priceMonthly === 'number' && <span className="text-xs font-bold text-gray-500">درهم / شهري</span>}
                    </div>
                    <p className="text-[10px] font-bold text-emerald-600 mt-1">{plan.saveText}</p>
                  </div>

                  <ul className="space-y-3 text-xs font-semibold text-gray-700">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Link to="/register" className={`w-full py-3.5 rounded-xl font-bold text-xs text-center block transition-all shadow-sm ${plan.popular ? 'bg-amber-500 hover:bg-amber-600 text-gray-900' : 'bg-gray-900 hover:bg-black text-white'}`}>
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-xs text-gray-500 space-y-1">
            <p>جميع الأسعار بالدرهم الإماراتي وغير شاملة لضريبة القيمة المضافة. تنطبق الأسعار الترويجية على الاشتراكات الجديدة فقط.</p>
            <a href="#" className="underline font-bold text-gray-900">مقارنة كاملة بين الخطط</a>
          </div>

        </div>
      </section>

      {/* 14. SECTION: الأسئلة الشائعة (FAQ Accordion) */}
      <section id="faq" className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">الأسئلة الشائعة</h2>
            <p className="text-gray-600 text-sm sm:text-base">إجابات سريعة لأكثر الاستفسارات شيوعًا</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-right flex justify-between items-center font-bold text-gray-900 text-sm sm:text-base hover:text-amber-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="transform transition-transform duration-300 font-black text-amber-500 text-lg">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 15. SECTION: النشرة الإخبارية والفوتر (Newsletter & Full Footer) */}
     {/* 15. SECTION: النشرة الإخبارية والفوتر */}
<footer
  dir="rtl"
  className="border-t border-white/10 bg-slate-950 text-slate-400"
>
  <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

    {/* ================= Newsletter ================= */}
    <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-l from-amber-500 via-amber-600 to-orange-600 p-6 shadow-2xl sm:p-8 lg:p-10">

      {/* Decorative shapes */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-orange-300/10 blur-3xl" />

      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_520px]">

        {/* Newsletter text */}
        <div className="max-w-2xl text-right">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
            <span className="ml-2">✉</span>
            النشرة الإخبارية
          </span>

          <h3 className="mt-4 text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">
            اشترك في النشرة الإخبارية
          </h3>

          <p className="mt-3 max-w-xl text-sm leading-7 text-amber-50 sm:text-base">
            واكب آخر مستجدات عالم الأعمال والمال، مع أفكار عملية تساعدك على اتخاذ
            قرارات مدروسة بثقة.
          </p>
        </div>

        {/* Newsletter form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-md"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="min-w-0 flex-1 rounded-xl border-0 bg-white px-4 py-3.5 text-right text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none ring-0 transition focus:ring-2 focus:ring-white/60"
            />

            <button
              type="submit"
              className="shrink-0 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-black active:scale-[0.98]"
            >
              اشترك الآن
            </button>
          </div>
        </form>

      </div>
    </div>

    {/* ================= Footer Main ================= */}
    <div className="mt-16 border-b border-white/10 pb-12">

      <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(4,minmax(0,1fr))]">

        {/* Brand */}
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-sm font-black text-slate-950 shadow-lg shadow-amber-500/20">
              BE
            </div>

            <div>
              <div className="text-xl font-black tracking-wide text-white">
                MAZEED
              </div>
              <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-400">
                ACCOUNTING
              </div>
            </div>
          </div>

          <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
            برنامج المحاسبة والامتثال الضريبي الأذكى المخصص للأعمال والشركات في
            دولة الإمارات العربية المتحدة.
          </p>

          {/* Social links */}
          <div className="mt-6 flex flex-wrap gap-2.5">

            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-bold text-slate-300 transition-all hover:border-amber-400/30 hover:bg-amber-500 hover:text-slate-950"
            >
              LinkedIn
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-bold text-slate-300 transition-all hover:border-amber-400/30 hover:bg-amber-500 hover:text-slate-950"
            >
              Facebook
            </a>

            <a
              href="#"
              aria-label="YouTube"
              className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-bold text-slate-300 transition-all hover:border-amber-400/30 hover:bg-amber-500 hover:text-slate-950"
            >
              YouTube
            </a>

            <a
              href="#"
              aria-label="X"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-slate-300 transition-all hover:border-amber-400/30 hover:bg-amber-500 hover:text-slate-950"
            >
              X
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-bold text-slate-300 transition-all hover:border-amber-400/30 hover:bg-amber-500 hover:text-slate-950"
            >
              Instagram
            </a>

          </div>
        </div>

        {/* Features */}
        <div>
          <h4 className="text-sm font-extrabold text-white">
            الميزات
          </h4>

          <ul className="mt-5 space-y-3.5 text-sm">
            <li>
              <a href="#" className="transition-colors hover:text-amber-400">
                الفواتير
              </a>
            </li>

            <li>
              <a href="#" className="transition-colors hover:text-amber-400">
                الضرائب
              </a>
            </li>

            <li>
              <a href="#" className="transition-colors hover:text-amber-400">
                المخزون
              </a>
            </li>

            <li>
              <a href="#" className="transition-colors hover:text-amber-400">
                المحاسبة
              </a>
            </li>

            <li>
              <a href="#" className="transition-colors hover:text-amber-400">
                التقارير
              </a>
            </li>

            <li>
              <a href="#" className="transition-colors hover:text-amber-400">
                التسوية
              </a>
            </li>

            <li>
              <a href="#" className="transition-colors hover:text-amber-400">
                مسك الدفاتر
              </a>
            </li>

            <li>
              <a href="#" className="transition-colors hover:text-amber-400">
                المصاريف
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-sm font-extrabold text-white">
            الخدمات
          </h4>

          <ul className="mt-5 space-y-3.5 text-sm">
            <li>
              <a href="#" className="leading-6 transition-colors hover:text-amber-400">
                مستشارو مزيد
              </a>
            </li>

            <li>
              <a href="#" className="leading-6 transition-colors hover:text-amber-400">
                خدمات الضرائب
              </a>
            </li>

            <li>
              <a href="#" className="leading-6 transition-colors hover:text-amber-400">
                خدمات المدير المالي
              </a>
            </li>

            <li>
              <a href="#" className="leading-6 transition-colors hover:text-amber-400">
                خدمات المحاسبة ومسك الدفاتر
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-sm font-extrabold text-white">
            المساعدة والدعم
          </h4>

          <ul className="mt-5 space-y-3.5 text-sm">
            <li>
              <a href="#" className="transition-colors hover:text-amber-400">
                مركز المساعدة
              </a>
            </li>

            <li>
              <a href="#" className="transition-colors hover:text-amber-400">
                أكاديمية مزيد
              </a>
            </li>

            <li>
              <a href="#" className="transition-colors hover:text-amber-400">
                المدونات
              </a>
            </li>

            <li>
              <a href="#faq" className="transition-colors hover:text-amber-400">
                الأسئلة الشائعة
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-extrabold text-white">
            الشركة
          </h4>

          <ul className="mt-5 space-y-3.5 text-sm">
            <li>
              <a href="#" className="transition-colors hover:text-amber-400">
                من نحن
              </a>
            </li>

            <li>
              <a href="#pricing" className="transition-colors hover:text-amber-400">
                الأسعار
              </a>
            </li>

            <li>
              <a href="#" className="transition-colors hover:text-amber-400">
                اتصل بنا
              </a>
            </li>
          </ul>
        </div>

      </div>
    </div>

    {/* ================= Footer Bottom ================= */}
    <div className="flex flex-col gap-5 pt-7 text-sm sm:flex-row sm:items-center sm:justify-between">

      <p className="text-center text-slate-500 sm:text-right">
        © mazeed 2025 جميع الحقوق محفوظة
      </p>

      <div className="flex items-center justify-center gap-6 text-slate-500">
        <a
          href="#"
          className="transition-colors hover:text-amber-400"
        >
          شروط الخدمة
        </a>

        <a
          href="#"
          className="transition-colors hover:text-amber-400"
        >
          سياسة الخصوصية
        </a>
      </div>

    </div>
  </div>
</footer>

{/* ================= Floating Live Chat ================= */}
<div className="fixed bottom-6 right-6 z-50">
  <button
    aria-label="Live chat"
    className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-white shadow-2xl shadow-black/30 transition-all hover:scale-105 hover:bg-slate-800 active:scale-95"
  >
    <svg
      className="h-6 w-6 transition-transform group-hover:scale-110"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
    </svg>

    <span className="absolute right-1 top-1 flex h-3.5 w-3.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
      <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-amber-500" />
    </span>
  </button>
</div>

    </div>
  );
}