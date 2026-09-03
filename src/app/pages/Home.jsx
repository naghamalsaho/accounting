'use client';

import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';

// مكون لتعديل النص وحفظه في sessionStorage
function EditableText({ id, initialText, className, tag = 'span' }) {
  const storageKey = `text_${id || initialText}`;
  
  const [text, setText] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(storageKey) || initialText;
    }
    return initialText;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(text);
  const timerRef = useRef(null);

  const handleMouseDown = () => {
    timerRef.current = setTimeout(() => {
      setIsEditing(true);
      setTempText(text);
    }, 600);
  };

  const handleMouseUp = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleSave = () => {
    setText(tempText);
    setIsEditing(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(storageKey, tempText);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const Tag = tag;

  if (isEditing) {
    return (
      <input
        type="text"
        value={tempText}
        onChange={(e) => setTempText(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        autoFocus
        className={`bg-amber-50 border-2 border-amber-500 rounded px-1.5 py-0.5 text-inherit font-inherit outline-none shadow-md ${className || ''}`}
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  return (
    <Tag
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      title="اضغط مطولاً لتعديل النص"
      className={`cursor-pointer select-none transition-all hover:bg-amber-100/60 hover:ring-1 hover:ring-amber-400 rounded px-0.5 ${className || ''}`}
    >
      {text}
    </Tag>
  );
}

// مكون لتعديل الصور وتحويلها إلى Base64 لحفظها في sessionStorage
function EditableImage({ id, initialSrc, alt, className = '', imgClassName = '' }) {
  const storageKey = `img_${id || alt || initialSrc}`;
  
  const [src, setSrc] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(storageKey) || initialSrc;
    }
    return initialSrc;
  });

  const fileInputRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setSrc(base64Image);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(storageKey, base64Image);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className={`relative group/img cursor-pointer overflow-hidden ${className}`} 
      onClick={handleClick}
      title="انقر لتغيير الصورة من جهازك"
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <img src={src} alt={alt} className={imgClassName} loading="lazy" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-20">
        <span className="bg-amber-500 text-gray-900 text-[11px] font-black px-2.5 py-1 rounded-md shadow-md">
          📷 تغيير الصورة
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const [showBanner, setShowBanner] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { locale, toggleLanguage } = useLanguage();

  const [billingCycle, setBillingCycle] = useState('annual');
  const [openFaq, setOpenFaq] = useState(null);

  const dragProps = {
    drag: true,
    dragConstraints: containerRef,
    dragElastic: 0.1,
    whileDrag: { scale: 1.03, zIndex: 50, cursor: 'grabbing' },
    whileHover: { cursor: 'grab' }
  };

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

  const pricingPlans = [
    {
      name: 'الانطلاقة',
      desc: 'فواتير أسهل للمستقلين والمشاريع الناشئة.',
      priceMonthly: 'مجاني',
      priceAnnual: 'مجاني',
      saveText: 'مجاني للأبد',
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
      desc: 'حلول متتقدمة للشركات المتوسطة مع المخزون والتجارة الإلكترونية.',
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

  const faqs = [
    { q: 'أي خطة تناسب نشاطي التجاري؟', a: 'تعتمد على حجم عملك؛ الانطلاقة للمشاريع الناشئة، الأساسية والمتقدمة للشركات الصغيرة والمتوسطة، والشاملة للشركات الكبرى التي تحتاج لإدارة مخصصة.' },
    { q: 'هل هناك نسخة مجانية أو تجربة مجانية؟', a: 'نعم، نوفر باقة "الانطلاقة" المجانية للأبد، بالإضافة إلى تجربة مجانية مدتها 14 يوماً للخطط المدفوعة.' },
    { q: 'هل أحتاج إلى إدخال بيانات بطاقة ائتمان لبدء التجربة المجانية؟', a: 'لا، لست بحاجة لأي بطاقة ائتمان لبدء تجربتك المجانية على الإطلاق.' },
    { q: 'هل الأسعار المعروضة تشمل الضريبة (ضريبة القيمة المضافة) أم لا؟', a: 'جميع الأسعار بالدرهم الإماراتي وغير شاملة لضريبة القيمة المضافة.' },
    { q: 'ما طرق الدفع المتاحة؟', a: 'نقبل البطاقات الائتمانية الرئيسية (Visa, MasterCard) والتحويلات البنكية الآمنة.' },
    { q: 'هل يمكنني ترقية أو تخفيض خطتي في أي وقت؟', a: 'نعم، يمكنك تغيير خطتك في أي وقت بسهولة من لوحة التحكم الخاصة بك.' }
  ];

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
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
      imageAlt: 'الفوترة الإلكترونية والدفع الذكي',
      imagePosition: 'right'
    }
  ];

  const partnerLogos = [
    { id: 'partner_1', name: "مؤسسة محمد بن راشد", role: "Dubai SME", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&auto=format&fit=crop&q=80" },
    { id: 'partner_2', name: "د. سارة المنصوري", role: "دائرة التنمية الاقتصادية", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80" },
    { id: 'partner_3', name: "Supy Tech", role: "حلول البرمجة الذكية", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&auto=format&fit=crop&q=80" },
    { id: 'partner_4', name: "م. أحمد الفاسي", role: "Meydan Free Zone", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80" },
    { id: 'partner_5', name: "Stripe Payments", role: "أنظمة المدفوعات", image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&auto=format&fit=crop&q=80" },
    { id: 'partner_6', name: "ليلى الهاشمي", role: "Hub71 Innovation", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80" }
  ];

  const tickerItems = [...partnerLogos, ...partnerLogos];

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-gray-900 font-sans selection:bg-amber-500 selection:text-white relative overflow-x-hidden" dir="rtl">
      
      {/* 1. Top Announcement Bar */}
      {showBanner && (
        <div className="bg-gray-900 text-white text-xs md:text-sm py-2.5 px-3 md:px-6 shadow-sm relative z-50 border-b border-gray-800 transition-all">
          <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center justify-center gap-2 mx-auto text-center font-medium">
              <motion.span {...dragProps} className="bg-amber-500 text-gray-900 px-2.5 py-0.5 rounded-full text-xs font-bold border border-amber-400 cursor-grab active:cursor-grabbing">
                <EditableText id="banner_tag" initialText="عرض خاص 🎁" />
              </motion.span>
              <motion.span {...dragProps} className="cursor-grab active:cursor-grabbing">
                <EditableText id="banner_desc" initialText="احصل على خصم 50% على سنتك الأولى في مزيد!" />
              </motion.span>
              <motion.a {...dragProps} href="#pricing" className="underline font-bold text-amber-400 hover:text-amber-300 transition-colors mr-1 cursor-grab active:cursor-grabbing">
                <EditableText id="banner_link" initialText="احصل على العرض الآن ←" />
              </motion.a>
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
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          <motion.div {...dragProps} className="flex items-center gap-3 group cursor-grab active:cursor-grabbing">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900 font-bold text-white shadow-md group-hover:bg-amber-500 group-hover:text-gray-900 transition-colors">
              BE
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-gray-900 leading-none tracking-wide"><EditableText id="logo_txt_1" initialText="ACCOUNTING" /></span>
              <span className="text-[10px] font-bold text-amber-600 tracking-widest uppercase mt-0.5"><EditableText id="logo_txt_2" initialText="SERVICES" /></span>
            </div>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-700">
            <motion.a {...dragProps} href="#features" className="hover:text-amber-600 transition-colors cursor-grab active:cursor-grabbing"><EditableText id="nav_feat" initialText="المميزات" /></motion.a>
            <motion.a {...dragProps} href="#why-choose-us" className="hover:text-amber-600 transition-colors cursor-grab active:cursor-grabbing"><EditableText id="nav_why" initialText="لماذا مزيد؟" /></motion.a>
            <motion.a {...dragProps} href="#advisory" className="hover:text-amber-600 transition-colors cursor-grab active:cursor-grabbing"><EditableText id="nav_advisors" initialText="المستشارون" /></motion.a>
            <motion.a {...dragProps} href="#mobile-app" className="hover:text-amber-600 transition-colors cursor-grab active:cursor-grabbing"><EditableText id="nav_app" initialText="التطبيق" /></motion.a>
            <motion.a {...dragProps} href="#pricing" className="hover:text-amber-600 transition-colors cursor-grab active:cursor-grabbing"><EditableText id="nav_pricing" initialText="الأسعار" /></motion.a>
            <motion.a {...dragProps} href="#faq" className="hover:text-amber-600 transition-colors cursor-grab active:cursor-grabbing"><EditableText id="nav_faq" initialText="الأسئلة الشائعة" /></motion.a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <motion.button 
              {...dragProps}
              onClick={toggleLanguage}
              className="text-xs font-semibold text-gray-600 hover:text-gray-900 p-2 border border-gray-200 rounded-lg transition-colors flex items-center gap-1 cursor-grab active:cursor-grabbing"
            >
              🌐 {locale.toUpperCase()}
            </motion.button>

            <motion.div {...dragProps} className="cursor-grab active:cursor-grabbing">
              <Link 
                to="/login" 
                className="text-sm font-semibold text-gray-700 hover:text-amber-600 px-3 py-2 transition-colors"
              >
                <EditableText id="btn_login" initialText="تسجيل الدخول" />
              </Link>
            </motion.div>

            <motion.div {...dragProps} className="cursor-grab active:cursor-grabbing">
              <Link 
                to="/register" 
                className="bg-gray-900 hover:bg-black text-white font-semibold text-xs px-5 py-2.5 rounded-xl border border-gray-900 shadow-sm transition-all transform hover:-translate-y-0.5 inline-block"
              >
                <EditableText id="btn_trial" initialText="ابدأ تجربة مجانية" />
              </Link>
            </motion.div>
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
            <a href="#advisory" className="block py-2 text-gray-700 hover:text-amber-600">المستشارون</a>
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

        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-6 text-right relative z-10">
              <motion.div 
                {...dragProps}
                className="inline-flex items-center gap-2 bg-gray-100 border border-gray-300 text-gray-800 px-4 py-2 rounded-full text-xs font-bold shadow-sm cursor-grab active:cursor-grabbing"
              >
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                </span>
                <EditableText id="hero_badge" initialText="الملاءمة المثالية للأعمال في الإمارات العربية المتحدة" />
              </motion.div>

              <motion.h1 {...dragProps} className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.3] tracking-tight cursor-grab active:cursor-grabbing">
                <EditableText id="hero_title_1" initialText="برنامج محاسبة ذكي مصمم لك" /> <br />
                <span className="text-gray-900 relative inline-block mt-2">
                  <EditableText id="hero_title_2" initialText="بخبرة محلية ومعايير عالمية" />
                  <svg className="absolute -bottom-2 right-0 w-full h-3 text-amber-500" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>
              </motion.h1>

              <motion.p {...dragProps} className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed max-w-xl cursor-grab active:cursor-grabbing">
                <EditableText id="hero_desc" initialText="جاهزية كاملة للفوترة الإلكترونية والامتثال الضريبي بدون عناء. ركّز على نمو عملك واترك الأرقام لنا." />
              </motion.p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <motion.a 
                  {...dragProps}
                  href="/register" 
                  className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold text-sm px-7 py-3.5 rounded-xl shadow-sm transition-all cursor-grab active:cursor-grabbing"
                >
                  <EditableText id="hero_cta_start" initialText="ابدأ تجربة مجانية" />
                </motion.a>
                <motion.a 
                  {...dragProps}
                  href="#pricing" 
                  className="bg-white border border-gray-300 hover:border-gray-900 text-gray-800 font-bold text-sm px-7 py-3.5 rounded-xl shadow-sm transition-all cursor-grab active:cursor-grabbing"
                >
                  <EditableText id="hero_cta_price" initialText="اطلع على الأسعار" />
                </motion.a>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-gray-500 pt-2">
                <motion.span {...dragProps} className="flex items-center gap-1.5 cursor-grab active:cursor-grabbing"><span className="text-emerald-600 font-bold">✓</span> <EditableText id="hero_check_1" initialText="14 يوم تجربة مجانية" /></motion.span>
                <motion.span {...dragProps} className="flex items-center gap-1.5 cursor-grab active:cursor-grabbing"><span className="text-emerald-600 font-bold">✓</span> <EditableText id="hero_check_2" initialText="لا حاجة لبطاقة ائتمان" /></motion.span>
                <motion.span {...dragProps} className="flex items-center gap-1.5 cursor-grab active:cursor-grabbing"><span className="text-emerald-600 font-bold">✓</span> <EditableText id="hero_check_3" initialText="دعم فوري بالإمارات" /></motion.span>
              </div>
            </div>

            {/* Dashboard Visual */}
            <motion.div 
              {...dragProps}
              className="lg:col-span-6 relative flex justify-center items-center cursor-grab active:cursor-grabbing z-0"
            >
              <div className="relative w-full max-w-lg aspect-[16/10] bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 flex items-center justify-center">
                
                <div className="absolute -top-3 -right-3 z-10 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 border border-slate-700">
                  <span className="bg-amber-500 text-slate-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded">AE</span>
                  <EditableText id="hero_img_badge" initialText="معتمد من FTA" />
                </div>

                <div className="w-full h-full rounded-xl overflow-hidden bg-slate-50 relative">
                  <EditableImage 
                    id="hero_dashboard_img"
                    initialSrc="/path-to-your-image.png" 
                    alt="لوحة تحكم مزيد المالية"
                    className="w-full h-full"
                    imgClassName="w-full h-full object-cover object-top"
                  />
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. SECTION: لماذا تختار مزيد؟ */}
      <section id="why-choose-us" className="py-24 bg-gradient-to-b from-white via-amber-50/20 to-slate-50 relative overflow-hidden">
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-slate-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <motion.div 
              {...dragProps}
              className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-800 px-4 py-1.5 rounded-full text-xs font-black shadow-sm cursor-grab active:cursor-grabbing"
            >
              <span><EditableText id="why_badge" initialText="🇦🇪 مصمم خصيصاً للسوق الإماراتي" /></span>
            </motion.div>

            <motion.h2 
              {...dragProps}
              className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight cursor-grab active:cursor-grabbing"
            >
              <EditableText id="why_title_1" initialText="لماذا تختار" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700"><EditableText id="why_title_2" initialText="مزيد؟" /></span>
            </motion.h2>

            <motion.p 
              {...dragProps}
              className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed cursor-grab active:cursor-grabbing"
            >
              <EditableText id="why_desc" initialText="الملائمة المثالية للأعمال والشركات في دولة الإمارات العربية المتحدة، بتوافق تام مع التشريعات والمعايير المحلية." />
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <motion.div 
              {...dragProps}
              className="bg-white border border-gray-200/90 hover:border-amber-400 p-7 rounded-2xl shadow-sm hover:shadow-xl transition-colors duration-300 relative group flex flex-col justify-between cursor-grab active:cursor-grabbing z-10"
            >
              <div className="space-y-4 text-right">
                <motion.div {...dragProps} className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center text-2xl shadow-md shadow-amber-500/20 cursor-grab active:cursor-grabbing">
                  ⚡
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-base font-black text-gray-900 group-hover:text-amber-700 transition-colors">
                    <EditableText id="why_card1_title" initialText="جاهزية كاملة للفوترة الإلكترونية" />
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    <EditableText id="why_card1_desc" initialText="مزيد جاهز تماماً لمتطلبات الفوترة الإلكترونية في الإمارات، لتبقى دائماً متوافقاً وفي المقدمة." />
                  </p>
                </div>
              </div>
              <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-amber-700">
                <span><EditableText id="why_card1_tag" initialText="متوافق مع E-Invoicing" /></span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              {...dragProps}
              className="bg-white border border-gray-200/90 hover:border-emerald-400 p-7 rounded-2xl shadow-sm hover:shadow-xl transition-colors duration-300 relative group flex flex-col justify-between cursor-grab active:cursor-grabbing z-10"
            >
              <div className="space-y-4 text-right">
                <motion.div {...dragProps} className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center text-2xl shadow-md shadow-emerald-500/20 cursor-grab active:cursor-grabbing">
                  🛡️
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-base font-black text-gray-900 group-hover:text-emerald-700 transition-colors">
                    <EditableText id="why_card2_title" initialText="الامتثال الضريبي بدون عناء" />
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    <EditableText id="why_card2_desc" initialText="من التسجيل إلى الإقرار، إدارة ضريبة القيمة المضافة والشركات بامتثال كامل لمعايير الهيئة الاتحادية للضرائب (FTA)." />
                  </p>
                </div>
              </div>
              <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-emerald-700">
                <span><EditableText id="why_card2_tag" initialText="معتمد لمعايير FTA" /></span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              {...dragProps}
              className="bg-white border border-gray-200/90 hover:border-blue-400 p-7 rounded-2xl shadow-sm hover:shadow-xl transition-colors duration-300 relative group flex flex-col justify-between cursor-grab active:cursor-grabbing z-10"
            >
              <div className="space-y-4 text-right">
                <motion.div {...dragProps} className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-md shadow-blue-500/20 cursor-grab active:cursor-grabbing">
                  📊
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-base font-black text-gray-900 group-hover:text-blue-700 transition-colors">
                    <EditableText id="why_card3_title" initialText="تقارير مالية فورية" />
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    <EditableText id="why_card3_desc" initialText="ابق على اطلاع بأرقامك لحظة بلحظة مع تقارير مالية مخصصة ومحدّثة تساعدك في اتخاذ قرارات أكثر ذكاءً." />
                  </p>
                </div>
              </div>
              <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-blue-700">
                <span><EditableText id="why_card3_tag" initialText="تحديثات مباشرة 100%" /></span>
                <span className="w-2 h-2 rounded-full bg-blue-500" />
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div 
              {...dragProps}
              className="bg-white border border-gray-200/90 hover:border-purple-400 p-7 rounded-2xl shadow-sm hover:shadow-xl transition-colors duration-300 relative group flex flex-col justify-between cursor-grab active:cursor-grabbing z-10"
            >
              <div className="space-y-4 text-right">
                <motion.div {...dragProps} className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-amber-600 text-white flex items-center justify-center text-xl font-black shadow-md shadow-purple-500/20 cursor-grab active:cursor-grabbing">
                  🇦🇪
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-base font-black text-gray-900 group-hover:text-purple-700 transition-colors">
                    <EditableText id="why_card4_title" initialText="دعم محلي داخل الإمارات" />
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    <EditableText id="why_card4_desc" initialText="احصل على مساعدة سريعة من خبراء في الإمارات يفهمون طبيعة أعمالك ويتحدثون لغتك بوضوح." />
                  </p>
                </div>
              </div>
              <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-purple-700">
                <span><EditableText id="why_card4_tag" initialText="فريق متخصص متاح" /></span>
                <span className="w-2 h-2 rounded-full bg-purple-500" />
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 5. Integrated System Section */}
      <section id="features" className="py-16 bg-white relative overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <motion.span {...dragProps} className="text-amber-600 font-bold text-xs uppercase tracking-widest inline-block cursor-grab active:cursor-grabbing">
              <EditableText id="feat_sec_badge" initialText="كل ما تحتاجه، في مكان واحد" />
            </motion.span>
            <motion.h2 {...dragProps} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight cursor-grab active:cursor-grabbing">
              <EditableText id="feat_sec_title" initialText="ميزات محاسبية ذكية مصممة لتساعدك على تطوير أعمالك" />
            </motion.h2>
            <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full" />
          </div>

          <div className="space-y-8 lg:space-y-10">
           {integratedFeatures.map((feature) => {
            const isLeftImage = feature.imagePosition === 'left';
            
            return (
              <div
                key={feature.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border border-gray-200 p-6 sm:p-8 rounded-2xl bg-gray-50/50 shadow-sm relative overflow-hidden"
              >
                <motion.div 
                  {...dragProps}
                  className={`lg:col-span-6 space-y-4 text-right relative z-10 cursor-grab active:cursor-grabbing ${isLeftImage ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}
                >
                  <div className="flex items-center gap-3">
                    <motion.div {...dragProps} className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 cursor-grab active:cursor-grabbing">
                      {feature.badgeIcon}
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                      <EditableText id={`feat_${feature.id}_title`} initialText={feature.title} />
                    </h3>
                  </div>
                  <div className="w-8 h-0.5 bg-amber-500 rounded-full" />
                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                    <EditableText id={`feat_${feature.id}_desc`} initialText={feature.description} />
                  </p>
                  <div className="space-y-2 pt-1">
                    {feature.bullets.map((bullet, i) => (
                      <motion.div key={i} {...dragProps} className="flex items-center gap-2.5 text-xs font-bold text-gray-800 cursor-grab active:cursor-grabbing">
                        <span className="w-4 h-4 rounded bg-gray-900 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
                        <span><EditableText id={`feat_${feature.id}_b_${i}`} initialText={bullet} /></span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <div className={`lg:col-span-6 relative z-0 ${isLeftImage ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
                  <motion.div 
                    {...dragProps} 
                    className="relative rounded-xl p-2 bg-white border border-gray-200 shadow-sm overflow-hidden cursor-grab active:cursor-grabbing"
                  >
                    <div className="relative rounded-lg overflow-hidden shadow-inner bg-white aspect-[16/10] flex items-center justify-center border border-gray-100">
                      <EditableImage 
                        id={`feat_${feature.id}_img`}
                        initialSrc={feature.image} 
                        alt={feature.imageAlt} 
                        className="w-full h-full"
                        imgClassName="w-full h-full object-cover select-none pointer-events-none" 
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
          </div>

        </div>
      </section>

      {/* 6. SECTION: الترحيل الفوري ونقل البيانات */}
      <section id="migration" className="py-20 bg-gradient-to-b from-slate-50 via-amber-50/40 to-white relative overflow-hidden border-y border-amber-100/60">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-amber-300/20 via-orange-200/20 to-amber-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            
            <motion.div 
              {...dragProps}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-5 py-2 rounded-full text-xs font-black shadow-lg shadow-amber-500/20 cursor-grab active:cursor-grabbing"
            >
              <span><EditableText id="mig_badge" initialText="⚡ الترحيل الفوري والآمن" /></span>
            </motion.div>

            <motion.div {...dragProps} className="space-y-4 cursor-grab active:cursor-grabbing">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
                <EditableText id="mig_title_1" initialText="التحويل إلى" /> <span className="text-amber-600 relative">
                  <EditableText id="mig_title_2" initialText="مزيد" />
                  <svg className="absolute -bottom-2 right-0 w-full h-2 text-amber-400/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="6" fill="transparent" strokeLinecap="round" />
                  </svg>
                </span> <EditableText id="mig_title_3" initialText="أسهل وأسرع مما تتخيل!" />
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
                <EditableText id="mig_desc" initialText="انقل كل بياناتك المحاسبية والعملاء والفواتير بضغطة زر واحدة بدون إدخال يدوي، وابدأ العمل اليوم بآمان تام." />
              </p>
            </motion.div>

            <motion.div 
              {...dragProps}
              className="bg-white/85 backdrop-blur-md border border-amber-200/80 p-6 sm:p-8 rounded-2xl shadow-xl my-8 relative cursor-grab active:cursor-grabbing z-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                
                <div className="flex flex-wrap md:flex-col items-center justify-center gap-3">
                  <span className="text-xs font-extrabold text-gray-400 w-full text-center md:text-right"><EditableText id="mig_src_head" initialText="أنظمتك الحالية:" /></span>
                  <motion.div {...dragProps} className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 shadow-sm hover:scale-105 transition-transform cursor-grab active:cursor-grabbing">
                    <span className="text-emerald-600 text-base">📊</span> <EditableText id="mig_src_excel" initialText="ملفات Excel & CSV" />
                  </motion.div>
                  <motion.div {...dragProps} className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 shadow-sm hover:scale-105 transition-transform cursor-grab active:cursor-grabbing">
                    <span className="text-blue-600 text-base">📁</span> <EditableText id="mig_src_pdf" initialText="فواتير PDF" />
                  </motion.div>
                  <motion.div {...dragProps} className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 shadow-sm hover:scale-105 transition-transform cursor-grab active:cursor-grabbing">
                    <span className="text-purple-600 text-base">🔄</span> <EditableText id="mig_src_other" initialText="البرامج المحاسبية الأخرى" />
                  </motion.div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-2 py-4 md:py-0">
                  <div className="w-full bg-amber-100 h-1.5 rounded-full relative overflow-hidden max-w-[180px]">
                    <motion.div 
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                      className="w-1/2 h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                    />
                  </div>
                  <motion.span {...dragProps} className="text-[11px] font-black text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300/50 cursor-grab active:cursor-grabbing">
                    <EditableText id="mig_status_pill" initialText="نقل وتطابق آلي 100%" />
                  </motion.span>
                </div>

                <motion.div {...dragProps} className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-5 rounded-xl shadow-lg border border-amber-400/50 text-center space-y-2 cursor-grab active:cursor-grabbing">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center text-xl font-black">
                    M
                  </div>
                  <h4 className="font-extrabold text-sm"><EditableText id="mig_target_head" initialText="منصة مزيد الموحدة" /></h4>
                  <p className="text-[11px] text-amber-100"><EditableText id="mig_target_sub" initialText="جاهزة للاستخدام التلقائي فوراً" /></p>
                </motion.div>

              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <motion.div 
                {...dragProps}
                className="bg-white border border-gray-200/90 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-amber-400 transition-all text-right space-y-2 cursor-grab active:cursor-grabbing z-10"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 font-bold flex items-center justify-center text-lg">
                  🛡️
                </div>
                <h4 className="font-extrabold text-gray-900 text-sm"><EditableText id="mig_feat1_title" initialText="استيراد بيانات آمن" /></h4>
                <p className="text-xs text-gray-500 leading-relaxed"><EditableText id="mig_feat1_desc" initialText="تشفير كامل لبياناتك المالية دون أي ريسك أو احتمالية لفقدان البيانات." /></p>
              </motion.div>

              <motion.div 
                {...dragProps}
                className="bg-white border border-gray-200/90 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-amber-400 transition-all text-right space-y-2 cursor-grab active:cursor-grabbing z-10"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center text-lg">
                  ⚡
                </div>
                <h4 className="font-extrabold text-gray-900 text-sm"><EditableText id="mig_feat2_title" initialText="جاهزية من اليوم الأول" /></h4>
                <p className="text-xs text-gray-500 leading-relaxed"><EditableText id="mig_feat2_desc" initialText="لا حاجة لفترات تهيئة طويلة، يمكنك إظهار التقارير وإصدار الفواتير فوراً." /></p>
              </motion.div>

              <motion.div 
                {...dragProps}
                className="bg-white border border-gray-200/90 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-amber-400 transition-all text-right space-y-2 cursor-grab active:cursor-grabbing z-10"
              >
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 font-bold flex items-center justify-center text-lg">
                  🚫
                </div>
                <h4 className="font-extrabold text-gray-900 text-sm"><EditableText id="mig_feat3_title" initialText="بدون إدخال يدوي" /></h4>
                <p className="text-xs text-gray-500 leading-relaxed"><EditableText id="mig_feat3_desc" initialText="نظام مطابقة الخانات ذكياً يتعرف على أنواع البيانات ويوزعها في مكانها." /></p>
              </motion.div>
            </div>

            <div className="pt-4">
              <motion.a 
                {...dragProps}
                href="/register" 
                className="inline-flex items-center gap-3 bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-extrabold text-sm shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 cursor-grab active:cursor-grabbing"
              >
                <span><EditableText id="mig_cta_btn" initialText="جرب أداة الترحيل الذكي مجاناً" /></span>
                <span className="text-amber-400">←</span>
              </motion.a>
            </div>

          </div>
        </div>
      </section>

      {/* 7. SECTION: تطبيق الهاتف (Mobile App) */}
      <section id="mobile-app" className="py-24 bg-gradient-to-b from-white via-amber-50/30 to-white overflow-hidden relative">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-slate-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-8 text-right relative z-10">
              <motion.div {...dragProps} className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-800 px-4 py-1.5 rounded-full text-xs font-extrabold shadow-sm cursor-grab active:cursor-grabbing">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <EditableText id="app_badge" initialText="✨ تطبيق مزيد الذكي • معزز بالذكاء الاصطناعي" />
              </motion.div>

              <motion.h2 {...dragProps} className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight cursor-grab active:cursor-grabbing">
                <EditableText id="app_title_1" initialText="أعمالك بين يديك،" /> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
                  <EditableText id="app_title_2" initialText="بذكاء أعلى وسرعة فائقة" />
                </span>
              </motion.h2>

              <motion.p {...dragProps} className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed cursor-grab active:cursor-grabbing">
                <EditableText id="app_desc" initialText="لا داعي للإدخال اليدوي المجهد. التقط صور الفواتير، ودع القارئ الذكي (AI OCR) يستخرج البيانات، يصنّف المصروفات، ويسجل المدفوعات فورياً في حساباتك." />
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <motion.div {...dragProps} className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all cursor-grab active:cursor-grabbing">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-xl mb-3">
                    🤖
                  </div>
                  <h4 className="font-extrabold text-gray-900 text-sm mb-1"><EditableText id="app_feat1_title" initialText="مسح ذكي للفواتير (AI)" /></h4>
                  <p className="text-xs text-gray-500 leading-relaxed"><EditableText id="app_feat1_desc" initialText="قراءة المبالغ، التواريخ، والضرائب تلقائياً بدقة تصل إلى 99.8%." /></p>
                </motion.div>

                <motion.div {...dragProps} className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all cursor-grab active:cursor-grabbing">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xl mb-3">
                    ⚡
                  </div>
                  <h4 className="font-extrabold text-gray-900 text-sm mb-1"><EditableText id="app_feat2_title" initialText="تنسيق وتحديث لحظي" /></h4>
                  <p className="text-xs text-gray-500 leading-relaxed"><EditableText id="app_feat2_desc" initialText="مزامنة فورية بين هاتفك ولوحة التحكم الرئيسية دون أي تأخير." /></p>
                </motion.div>

                <motion.div {...dragProps} className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all sm:col-span-2 cursor-grab active:cursor-grabbing">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xl shrink-0">
                      🔔
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 text-sm"><EditableText id="app_feat3_title" initialText="التنبيهات الاستباقية Smart Alerts" /></h4>
                      <p className="text-xs text-gray-500 mt-0.5"><EditableText id="app_feat3_desc" initialText="تنبيهك قبل استحقاق الفواتير وإشعارك بالمدفوعات المتأخرة أولاً بأول." /></p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <motion.a {...dragProps} href="#" className="bg-gray-900 hover:bg-black text-white px-6 py-3.5 rounded-2xl font-bold text-xs flex items-center gap-3 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-grab active:cursor-grabbing">
                  <span className="text-xl"></span>
                  <div className="text-right leading-tight">
                    <span className="block text-[9px] text-gray-400 uppercase tracking-wider">حمّل من</span>
                    <span className="text-sm font-extrabold">App Store</span>
                  </div>
                </motion.a>

                <motion.a {...dragProps} href="#" className="bg-gray-900 hover:bg-black text-white px-6 py-3.5 rounded-2xl font-bold text-xs flex items-center gap-3 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-grab active:cursor-grabbing">
                  <span className="text-xl">▶</span>
                  <div className="text-right leading-tight">
                    <span className="block text-[9px] text-gray-400 uppercase tracking-wider">حمّل من</span>
                    <span className="text-sm font-extrabold">Google Play</span>
                  </div>
                </motion.a>
              </div>
            </div>

            {/* مجسم التطبيق */}
            <motion.div 
              {...dragProps}
              className="lg:col-span-6 relative flex justify-center py-6 cursor-grab active:cursor-grabbing z-0"
            >
              <motion.div 
                {...dragProps}
                className="absolute -top-2 -right-2 sm:right-4 z-20 bg-white/90 backdrop-blur-md text-gray-900 font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow-xl border border-amber-200/80 flex items-center gap-2.5 cursor-grab active:cursor-grabbing"
              >
                <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <span><EditableText id="app_mock_badge" initialText="القارئ الذكي AI OCR نشط" /></span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md">99.8%</span>
              </motion.div>

              <motion.div 
                {...dragProps}
                className="absolute -bottom-4 -left-2 sm:left-4 z-20 bg-white/95 backdrop-blur-md text-gray-800 font-bold text-xs p-3 rounded-2xl shadow-xl border border-gray-200 flex items-center gap-3 cursor-grab active:cursor-grabbing"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center text-lg">
                  ✓
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-medium"><EditableText id="app_mock_invoice_label" initialText="تم تحليل فاتورة جديدة" /></p>
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
                      <span className="text-xs font-extrabold text-gray-900"><EditableText id="app_mock_head" initialText="مزيد لمسح الفواتير" /></span>
                    </div>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      <EditableText id="app_mock_cam" initialText="كاميرا AI" />
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
                      <span className="text-emerald-400 font-mono"><EditableText id="app_mock_status" initialText="جارِ القراءة..." /></span>
                    </div>

                    <div className="z-10 my-auto text-center space-y-1">
                      <p className="text-xs text-amber-300 font-bold"><EditableText id="app_mock_vendor" initialText="مؤسسة الأمل للتجارة" /></p>
                      <p className="text-xl font-black text-white tracking-wider">AED 3,450.00</p>
                    </div>

                    <div className="z-10 flex justify-between items-center text-[9px] text-gray-300 bg-slate-800/80 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                      <span>الضريبة: AED 172.50</span>
                      <span className="text-amber-400 font-bold"><EditableText id="app_mock_done" initialText="محللة 100%" /></span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <motion.div {...dragProps} className="p-3 rounded-xl bg-white border border-gray-200/80 shadow-sm flex items-center justify-between cursor-grab active:cursor-grabbing">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                          📊
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold"><EditableText id="app_stat_sales_lbl" initialText="المبيعات اليومية" /></p>
                          <p className="text-xs font-black text-gray-900">AED 14,230.00</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+12.4%</span>
                    </motion.div>

                    <motion.div {...dragProps} className="p-3 rounded-xl bg-white border border-gray-200/80 shadow-sm flex items-center justify-between cursor-grab active:cursor-grabbing">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                          ⚡
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold"><EditableText id="app_stat_ai_lbl" initialText="الفواتير المعالجة بالذكاء" /></p>
                          <p className="text-xs font-black text-gray-900"><EditableText id="app_stat_ai_val" initialText="142 فاتورة هذا الشهر" /></p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 8. SECTION: من يستفيد من مزيد؟ */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="max-w-3xl mx-auto space-y-3">
            <motion.h2 {...dragProps} className="text-3xl font-black text-gray-900 cursor-grab active:cursor-grabbing"><EditableText id="persona_sec_title" initialText="من يستفيد من مزيد؟" /></motion.h2>
            <motion.p {...dragProps} className="text-gray-600 text-sm sm:text-base cursor-grab active:cursor-grabbing"><EditableText id="persona_sec_desc" initialText="حلول مخصصة لااحتياجاتك المختلفة" /></motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {personas.map((p, idx) => (
              <motion.div 
                key={idx} 
                {...dragProps}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4 text-right cursor-grab active:cursor-grabbing z-10"
              >
                <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full"><EditableText id={`persona_tag_${idx}`} initialText={p.tag} /></span>
                <h3 className="text-xl font-bold text-gray-900"><EditableText id={`persona_title_${idx}`} initialText={p.title} /></h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed"><EditableText id={`persona_desc_${idx}`} initialText={p.desc} /></p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SECTION: مستشارو مزيد */}
      <section id="advisory" className="py-20 bg-white border-t border-gray-200">
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div {...dragProps} className="bg-gradient-to-br from-slate-900 via-slate-900 to-gray-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl border border-gray-800 relative overflow-hidden cursor-grab active:cursor-grabbing">
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-4 max-w-xl text-right relative z-10">
              <span className="bg-amber-500 text-gray-900 text-xs font-black px-3.5 py-1.5 rounded-full inline-block shadow-sm">
                <EditableText id="adv_badge" initialText="مستشارو مزيد" />
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                <EditableText id="adv_title" initialText="احصل على خبراء ماليين، وليس مجرد برامج" />
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-medium">
                <EditableText id="adv_desc" initialText="تجنّب الغرامات واضمن امتثال كامل مع محاسبين ومستشارين ضريبيين معتمدين جاهزين لخدمتك عند الطلب" />
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-bold text-amber-400">
                <span className="flex items-center gap-1.5">✓ <EditableText id="adv_check_1" initialText="مستشارون معتمدون من FTA" /></span>
                <span className="flex items-center gap-1.5">✓ <EditableText id="adv_check_2" initialText="استجابة فورية" /></span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full lg:w-auto">
              <a 
                href="#pricing" 
                className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-extrabold px-8 py-4 rounded-2xl text-center text-sm shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
              >
                <EditableText id="adv_cta_book" initialText="احجز استشارة مجانية" />
              </a>
              <a 
                href="#faq" 
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-4 rounded-2xl text-center text-sm transition-all backdrop-blur-sm"
              >
                <EditableText id="adv_cta_more" initialText="تعرف على المزيد" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. SECTION: آلاف الشركات تثق في مزيد */}
      <section className="w-full py-20 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 border-y border-amber-100/60">
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <motion.h2 {...dragProps} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight cursor-grab active:cursor-grabbing">
              <EditableText id="trust_title_1" initialText="آلاف الشركات تثق في" /> <span className="text-amber-600"><EditableText id="trust_title_2" initialText="مزيد" /></span>
            </motion.h2>
            <motion.p {...dragProps} className="text-sm font-medium text-gray-600 cursor-grab active:cursor-grabbing">
              <EditableText id="trust_desc" initialText="أرقام تعكس التزامنا بالتميز ودعم نمو الأعمال والشركات في الإمارات" />
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            <motion.div 
              {...dragProps}
              className="w-full bg-white p-8 rounded-2xl border border-gray-200/90 shadow-sm hover:border-amber-400 hover:shadow-md transition-all text-center space-y-2 cursor-grab active:cursor-grabbing z-10"
            >
              <span className="text-3xl sm:text-4xl font-black text-amber-600 tracking-tight block dir-ltr">
                +4,000
              </span>
              <p className="text-sm font-bold text-gray-800"><EditableText id="stat_1_label" initialText="شركة تم خدمتها" /></p>
            </motion.div>

            <motion.div 
              {...dragProps}
              className="w-full bg-white p-8 rounded-2xl border border-gray-200/90 shadow-sm hover:border-amber-400 hover:shadow-md transition-all text-center space-y-2 cursor-grab active:cursor-grabbing z-10"
            >
              <span className="text-3xl sm:text-4xl font-black text-amber-600 tracking-tight block dir-ltr">
                +2 مليون
              </span>
              <p className="text-sm font-bold text-gray-800"><EditableText id="stat_2_label" initialText="معاملة شهرية" /></p>
            </motion.div>

            <motion.div 
              {...dragProps}
              className="w-full bg-white p-8 rounded-2xl border border-gray-200/90 shadow-sm hover:border-amber-400 hover:shadow-md transition-all text-center space-y-2 sm:col-span-2 lg:col-span-1 cursor-grab active:cursor-grabbing z-10"
            >
              <div className="flex items-center justify-center gap-1.5 dir-ltr">
                <span className="text-3xl sm:text-4xl font-black text-amber-600">4.7</span>
                <span className="text-amber-400 text-2xl">★</span>
              </div>
              <p className="text-sm font-bold text-gray-800"><EditableText id="stat_3_label" initialText="تقييم عملاء ممتاز" /></p>
            </motion.div>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-8">
              <EditableText id="partners_head" initialText="شعار بعض الشركات والمؤسسات التي نخدمها" />
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-75 hover:opacity-100 transition-opacity">
              <motion.div {...dragProps} className="h-10 px-4 py-2 bg-gray-100/80 rounded-xl text-gray-700 font-extrabold text-xs sm:text-sm flex items-center justify-center border border-gray-200 cursor-grab active:cursor-grabbing">
                🏢 Dubai SME
              </motion.div>
              <motion.div {...dragProps} className="h-10 px-4 py-2 bg-gray-100/80 rounded-xl text-gray-700 font-extrabold text-xs sm:text-sm flex items-center justify-center border border-gray-200 cursor-grab active:cursor-grabbing">
                ⚡ Meydan Free Zone
              </motion.div>
              <motion.div {...dragProps} className="h-10 px-4 py-2 bg-gray-100/80 rounded-xl text-gray-700 font-extrabold text-xs sm:text-sm flex items-center justify-center border border-gray-200 cursor-grab active:cursor-grabbing">
                🚀 Hub71
              </motion.div>
              <motion.div {...dragProps} className="h-10 px-4 py-2 bg-gray-100/80 rounded-xl text-gray-700 font-extrabold text-xs sm:text-sm flex items-center justify-center border border-gray-200 cursor-grab active:cursor-grabbing">
                🌐 Supy Tech
              </motion.div>
              <motion.div {...dragProps} className="h-10 px-4 py-2 bg-gray-100/80 rounded-xl text-gray-700 font-extrabold text-xs sm:text-sm flex items-center justify-center border border-gray-200 cursor-grab active:cursor-grabbing">
                💳 Stripe Partner
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* 11. SECTION: الضرائب أسهل وأذكى */}
      <section id="tax-features" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <motion.div 
              {...dragProps}
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-black shadow-sm cursor-grab active:cursor-grabbing"
            >
              <span><EditableText id="tax_badge" initialText="🛡️ الامتثال الضريبي الكامل في الإمارات" /></span>
            </motion.div>

            <motion.h2 
              {...dragProps}
              className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight cursor-grab active:cursor-grabbing"
            >
              <EditableText id="tax_title_1" initialText="الضرائب" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700"><EditableText id="tax_title_2" initialText="أسهل وأذكى" /></span>
            </motion.h2>

            <motion.p 
              {...dragProps}
              className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed cursor-grab active:cursor-grabbing"
            >
              <EditableText id="tax_desc" initialText="كل أدوات الامتثال الضريبي في مكان واحد. كل ما تحتاجه للامتثال لضريبة القيمة المضافة وضريبة الشركات في الإمارات، تجده في برنامج مزيد." />
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              {...dragProps}
              className="bg-slate-50/70 border border-gray-200 hover:border-emerald-500 p-7 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 space-y-4 text-right group cursor-grab active:cursor-grabbing z-10"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                🧮
              </div>
              <h3 className="text-base font-black text-gray-900 group-hover:text-emerald-700 transition-colors">
                <EditableText id="tax_card1_title" initialText="حساب سلس للضرائب" />
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                <EditableText id="tax_card1_desc" initialText="تطبيق سريع لضريبة القيمة المضافة وضريبة الشركات على كل معاملة دون إعداد يدوي." />
              </p>
            </motion.div>

            <motion.div 
              {...dragProps}
              className="bg-slate-50/70 border border-gray-200 hover:border-emerald-500 p-7 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 space-y-4 text-right group cursor-grab active:cursor-grabbing z-10"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-2xl group-hover:bg-teal-600 group-hover:text-white transition-colors">
                📈
              </div>
              <h3 className="text-base font-black text-gray-900 group-hover:text-teal-700 transition-colors">
                <EditableText id="tax_card2_title" initialText="متابعة الضرائب" />
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                <EditableText id="tax_card2_desc" initialText="راقب التزامات ضريبة القيمة المضافة والشركات لحظة بلحظة مع فئات الخصم الجاهزة." />
              </p>
            </motion.div>

            <motion.div 
              {...dragProps}
              className="bg-slate-50/70 border border-gray-200 hover:border-emerald-500 p-7 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 space-y-4 text-right group cursor-grab active:cursor-grabbing z-10"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-2xl group-hover:bg-amber-500 group-hover:text-white transition-colors">
                📄
              </div>
              <h3 className="text-base font-black text-gray-900 group-hover:text-amber-700 transition-colors">
                <EditableText id="tax_card3_title" initialText="تقارير جاهزة للهيئة الاتحادية للضرائب" />
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                <EditableText id="tax_card3_desc" initialText="أنشئ إقرارات وملخصات ضريبة القيمة المضافة وضريبة الشركات بالتنسيق المطلوب رسمياً من الهيئة." />
              </p>
            </motion.div>

            <motion.div 
              {...dragProps}
              className="bg-slate-50/70 border border-gray-200 hover:border-emerald-500 p-7 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 space-y-4 text-right group cursor-grab active:cursor-grabbing z-10"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
                🔔
              </div>
              <h3 className="text-base font-black text-gray-900 group-hover:text-purple-700 transition-colors">
                <EditableText id="tax_card4_title" initialText="متابعة المدفوعات الضريبية" />
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                <EditableText id="tax_card4_desc" initialText="شاهد المبالغ المستحقة ومواعيد الدفع القادمة مع مؤشرات حالة واضحة وتنبيهات مبكرة." />
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 12. Social Proof & Partners */}
      <section className="py-20 bg-gray-50 border-t border-gray-200 overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl font-black text-gray-900"><EditableText id="proof_sec_title" initialText="شركاء النجاح" /></h2>
            <p className="text-sm font-bold text-gray-500"><EditableText id="proof_sec_desc" initialText="قصص حقيقية ونتائج ملموسة" /></p>
          </div>

          <motion.div {...dragProps} className="max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mb-16 text-center space-y-4 cursor-grab active:cursor-grabbing">
            <p className="text-base sm:text-lg italic text-gray-700 font-medium leading-relaxed">
              &quot;<EditableText id="testimonial_quote" initialText="تحميل السجلات المالية أمر سهل للغاية مع مزيد. يتم تخزين جميع البيانات بشكل آمن رقميًا، مما يلغي الحاجة للأعمال الورقية. خدمة سريعة وبسيطة تساعدنا على توفير الوقت والجهد." />&quot;
            </p>
            <div>
              <h4 className="font-extrabold text-gray-900 text-sm"><EditableText id="testimonial_author" initialText="نوران البناي" /></h4>
              <p className="text-xs text-amber-600 font-semibold">Coffee Architecture</p>
            </div>
          </motion.div>

          <div className="relative w-full overflow-hidden py-4 dir-ltr" dir="ltr">
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

            <motion.div 
              className="flex items-center gap-8 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
              {tickerItems.map((partner, idx) => (
                <motion.div 
                  key={idx} 
                  {...dragProps}
                  className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm min-w-[170px] text-center cursor-grab active:cursor-grabbing z-10"
                >
                  <EditableImage 
                    id={`partner_img_${partner.id}_${idx}`}
                    initialSrc={partner.image} 
                    alt={partner.name} 
                    className="w-16 h-16 rounded-full overflow-hidden mb-3 border border-gray-200 shadow-sm"
                    imgClassName="w-full h-full object-cover select-none pointer-events-none" 
                  />
                  <span className="text-xs font-bold text-gray-900 line-clamp-1">{partner.name}</span>
                  <span className="text-[10px] font-medium text-gray-500 mt-0.5 line-clamp-1">{partner.role}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      {/* 13. SECTION: تسعير واضح (Pricing) */}
      <section id="pricing" className="py-24 bg-white border-t border-gray-200">
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <motion.h2 {...dragProps} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight cursor-grab active:cursor-grabbing">
              <EditableText id="price_sec_title" initialText="تسعير واضح قيمة حقيقية" />
            </motion.h2>
            <motion.p {...dragProps} className="text-gray-600 text-sm sm:text-base cursor-grab active:cursor-grabbing"><EditableText id="price_sec_desc" initialText="باقات تناسب كل مرحلة من نمو مشروعك" /></motion.p>
            
            <motion.div {...dragProps} className="inline-flex items-center bg-gray-100 p-1.5 rounded-xl border border-gray-200 cursor-grab active:cursor-grabbing">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${billingCycle === 'monthly' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <EditableText id="price_cycle_m" initialText="شهري" />
              </button>
              <button 
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${billingCycle === 'annual' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <EditableText id="price_cycle_a" initialText="سنوي" /> <span className="text-amber-400 mr-1"><EditableText id="price_cycle_disc" initialText="خصم 50%" /></span>
              </button>
            </motion.div>
            
            <p className="text-xs font-bold text-amber-600"><EditableText id="price_sub_banner" initialText="احصل على خصم 50% على سنتك الأولى." /></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {pricingPlans.map((plan, idx) => (
              <motion.div 
                key={idx} 
                {...dragProps}
                className={`bg-white rounded-2xl p-8 border flex flex-col justify-between transition-all relative cursor-grab active:cursor-grabbing z-10 ${plan.popular ? 'border-amber-500 shadow-xl ring-2 ring-amber-500/20' : 'border-gray-200 shadow-sm'}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 right-6 bg-amber-500 text-gray-900 text-[10px] font-black px-3 py-1 rounded-full shadow-sm">
                    <EditableText id="plan_popular_tag" initialText="الأكثر شيوعًا" />
                  </span>
                )}
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900"><EditableText id={`plan_name_${idx}`} initialText={plan.name} /></h3>
                    <p className="text-xs text-gray-500 mt-1 min-h-[32px]"><EditableText id={`plan_desc_${idx}`} initialText={plan.desc} /></p>
                  </div>

                  <div className="py-4 border-y border-gray-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-black text-gray-900">
                        {typeof plan.priceMonthly === 'number' 
                          ? (billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly) 
                          : plan.priceMonthly}
                      </span>
                      {typeof plan.priceMonthly === 'number' && <span className="text-xs font-bold text-gray-500"><EditableText id="plan_unit" initialText="درهم / شهري" /></span>}
                    </div>
                    <p className="text-[10px] font-bold text-emerald-600 mt-1"><EditableText id={`plan_save_${idx}`} initialText={plan.saveText} /></p>
                  </div>

                  <ul className="space-y-3 text-xs font-semibold text-gray-700">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span><EditableText id={`plan_feat_${idx}_${i}`} initialText={feat} /></span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Link to="/register" className={`w-full py-3.5 rounded-xl font-bold text-xs text-center block transition-all shadow-sm ${plan.popular ? 'bg-amber-500 hover:bg-amber-600 text-gray-900' : 'bg-gray-900 hover:bg-black text-white'}`}>
                    <EditableText id={`plan_cta_${idx}`} initialText={plan.cta} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center text-xs text-gray-500 space-y-1">
            <p><EditableText id="price_disclaimer" initialText="جميع الأسعار بالدرهم الإماراتي وغير شاملة لضريبة القيمة المضافة. تنطبق الأسعار الترويجية على الاشتراكات الجديدة فقط." /></p>
            <a href="#" className="underline font-bold text-gray-900"><EditableText id="price_compare_link" initialText="مقارنة كاملة بين الخطط" /></a>
          </div>

        </div>
      </section>

      {/* 14. SECTION: الأسئلة الشائعة (FAQ Accordion) */}
      <section id="faq" className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <motion.h2 {...dragProps} className="text-3xl sm:text-4xl font-black text-gray-900 cursor-grab active:cursor-grabbing"><EditableText id="faq_sec_title" initialText="الأسئلة الشائعة" /></motion.h2>
            <motion.p {...dragProps} className="text-gray-600 text-sm sm:text-base cursor-grab active:cursor-grabbing"><EditableText id="faq_sec_desc" initialText="إجابات سريعة لأكثر الاستفسارات شيوعًا" /></motion.p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div key={idx} {...dragProps} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm cursor-grab active:cursor-grabbing">
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-right flex justify-between items-center font-bold text-gray-900 text-sm sm:text-base hover:text-amber-600 transition-colors"
                  >
                    <span><EditableText id={`faq_q_${idx}`} initialText={faq.q} /></span>
                    <span className="transform transition-transform duration-300 font-black text-amber-500 text-lg">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-6 pb-6 text-xs sm:text-sm text-gray-600 font-medium leading-relaxed border-t border-gray-100 pt-4"
                      >
                        <EditableText id={`faq_a_${idx}`} initialText={faq.a} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
     
      {/* 15. SECTION: النشرة الإخبارية والفوتر (Newsletter & Full Footer) */}
      <footer
        dir="rtl"
        className="border-t border-white/10 bg-slate-950 text-slate-400"
      >
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-16">

          {/* Newsletter */}
          <motion.div {...dragProps} className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-amber-500 via-amber-600 to-orange-600 p-6 shadow-2xl sm:p-8 lg:p-10 cursor-grab active:cursor-grabbing">

            <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-orange-300/10 blur-3xl" />

            <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_520px]">

              <div className="max-w-2xl text-right">
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                  <span className="ml-2">✉</span>
                  <EditableText initialText="النشرة الإخبارية" />
                </span>

                <h3 className="mt-4 text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">
                  <EditableText initialText="اشترك في النشرة الإخبارية" />
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-7 text-amber-50 sm:text-base">
                  <EditableText initialText="واكب آخر مستجدات عالم الأعمال والمال، مع أفكار عملية تساعدك على اتخاذ قرارات مدروسة بثقة." />
                </p>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-md"
              >
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    className="min-w-0 flex-1 rounded-lg border-0 bg-white px-4 py-3.5 text-right text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none ring-0 transition focus:ring-2 focus:ring-white/60"
                  />

                  <button
                    type="submit"
                    className="shrink-0 rounded-lg bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-black active:scale-[0.98]"
                  >
                    <EditableText initialText="اشترك الآن" />
                  </button>
                </div>
              </form>

            </div>
          </motion.div>

          {/* Footer Main */}
          <div className="mt-16 border-b border-white/10 pb-12">

            <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(4,minmax(0,1fr))]">

              <div className="min-w-0">
                <motion.div {...dragProps} className="flex items-center gap-3 cursor-grab active:cursor-grabbing">
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
                </motion.div>

                <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
                  <EditableText initialText="برنامج المحاسبة والامتثال الضريبي الأذكى المخصص للأعمال والشركات في دولة الإمارات العربية المتحدة." />
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <motion.a {...dragProps} href="#" className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-bold text-slate-300 transition-all hover:border-amber-400/30 hover:bg-amber-500 hover:text-slate-950 cursor-grab active:cursor-grabbing">LinkedIn</motion.a>
                  <motion.a {...dragProps} href="#" className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-bold text-slate-300 transition-all hover:border-amber-400/30 hover:bg-amber-500 hover:text-slate-950 cursor-grab active:cursor-grabbing">Twitter (X)</motion.a>
                  <motion.a {...dragProps} href="#" className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-bold text-slate-300 transition-all hover:border-amber-400/30 hover:bg-amber-500 hover:text-slate-950 cursor-grab active:cursor-grabbing">Instagram</motion.a>
                </div>
              </div>

              {/* Links Sections */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white"><EditableText initialText="المنتج" /></h4>
                <ul className="mt-4 space-y-2.5 text-xs">
                  <li><a href="#features" className="hover:text-amber-400 transition-colors"><EditableText initialText="المميزات" /></a></li>
                  <li><a href="#pricing" className="hover:text-amber-400 transition-colors"><EditableText initialText="الأسعار" /></a></li>
                  <li><a href="#mobile-app" className="hover:text-amber-400 transition-colors"><EditableText initialText="تطبيق الهاتف" /></a></li>
                  <li><a href="#migration" className="hover:text-amber-400 transition-colors"><EditableText initialText="الترحيل الذكي" /></a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white"><EditableText initialText="الشركات" /></h4>
                <ul className="mt-4 space-y-2.5 text-xs">
                  <li><a href="#why-choose-us" className="hover:text-amber-400 transition-colors"><EditableText initialText="لماذا مزيد؟" /></a></li>
                  <li><a href="#advisory" className="hover:text-amber-400 transition-colors"><EditableText initialText="المستشارون" /></a></li>
                  <li><a href="#faq" className="hover:text-amber-400 transition-colors"><EditableText initialText="الأسئلة الشائعة" /></a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white"><EditableText initialText="الامتثال" /></h4>
                <ul className="mt-4 space-y-2.5 text-xs">
                  <li><a href="#tax-features" className="hover:text-amber-400 transition-colors"><EditableText initialText="ضريبة القيمة المضافة" /></a></li>
                  <li><a href="#tax-features" className="hover:text-amber-400 transition-colors"><EditableText initialText="ضريبة الشركات" /></a></li>
                  <li><a href="#tax-features" className="hover:text-amber-400 transition-colors"><EditableText initialText="الفوترة الإلكترونية" /></a></li>
                </ul>
              </div>

            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
            <p>© {new Date().getFullYear()} MAZEED ACCOUNTING. جميع الحقوق محفوظة.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-300">سياسة الخصوصية</a>
              <a href="#" className="hover:text-slate-300">شروط الخدمة</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

   