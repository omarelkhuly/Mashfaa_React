// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "siteTitle": "MASHFAA",
      // Navbar
      home: "Home",
      pages: "Pages",
      services: "Services",
      blogs: "Blogs",
      contact: "Contact Us",
      about: "About Us",
      team: "Our Team",
      booking: "Booking",
      login: "Login",
      register: "Register",

      // Footer
      footerDesc: "Lorem ipsum is dolor sit amet, consectetur adipiscing elit.",
      contactUs: "Contact Us",
      quickLinks: "Quick Links",
      ourTeam: "Our Team",
      ourServices: "Our Services",
      serviceDental: "Dental Care",
      serviceSurgeon: "Special Surgeon",
      serviceSkin: "Skin Surgeon",
      serviceHealth: "Understand Health",
      serviceDentist: "Dentist Regularly",
      subscribe: "Subscribe",
      subscribeNow: "Subscribe Now",
      emailAddress: "Email Address",

      // Login
      loginTitle: "Login",
      email: "Email Address",
      password: "Password",
      loginButton: "Login",
      createAccount: "Create New Account",
      loginRequired: "Please enter email and password",
      "selectCountry": "Select Country",
      "selectCity": "Select City",
      loginSuccess: "Login successful ✅",
      loginFail: "Login failed ❌",
      noAccount: "Don't have an account?",

      // index
      headerSubtitle: "We Provide All Health Care Solution",
      headerTitle: "Protect Your Health And Take Care Of Your Health",
      readMore: "Read More",

      // workingProcess
      workingProcess: "Working Process",
      howItWorks: "How we works?",
      step1Title: "Make Appointment",
      step2Title: "Take Treatment",
      step3Title: "Registration",
      stepDesc: "It is a long established fact that a reader will be distracted by the readable content of.",
      viewMore: "View More",

      // Services Section
      servicesTitle: "We Cover A Big Variety Of Medical Services",
      servicesDesc: "We provide the special tips and advice’s of health care treatment and high level of best.",
      allServices: "All Services",
      diagnostics: "Diagnostics",
      treatment: "Treatment",
      surgery: "Surgery",
      vaccine: "Vaccine",
      emergency: "Emergency",
      desc: "Phasellus venenatis porta rhoncus. Integer et viverra felis.",

      // Services page
      qualifiedDoctors: "Qualified Doctors",

      // Ratings
      yearsWithYou: "Years With You",
      yearsDesc: "Etiam ante ante, molestie vitae cursus ac, pharetra euismod libero.",
      awards: "Awards",
      awardsDesc: "Etiam ante ante, molestie vitae cursus ac, pharetra euismod libero.",
      doctors: "Doctors",
      doctorsDesc: "Etiam ante ante, molestie vitae cursus ac, pharetra euismod libero.",
      satisfiedClients: "Satisfied Clients",
      clientsDesc: "Etiam ante ante, molestie vitae cursus ac, pharetra euismod libero.",

      // Team
      dentist: "Dentist",
      chiropractor: "Chiropractor",
      cardiologist: "Cardiologist",
      sectionSubTitle: "Our Doctor",
      sectionTitle: "Meet Best Doctors",
      dentist: "Dentist",
      chiropractor: "Chiropractor",
      cardiologist: "Cardiologist",

      // Blogs
      blogTitle1: "Dental Care for Women is very important",
      blogTitle2: "In this hospital there are special surgeons",
      blogTitle3: "Why Is Skin Surgeon Considered Underrated",
      blogTitle4: "Understand Health Before You Regret",

      // testimonial
      testimonial_title: "Testimonial",
      testimonial_text: "See What Are The Patients Saying About Us",
      testimonial_review_1: "Dr. John was amazing!",
      testimonial_review_2: "Very professional service.",
      testimonial_review_3: "Highly recommend the clinic.",
      testimonial_review_4: "Friendly staff and great care.",
      testimonial_review_5: "Efficient and attentive doctor.",
      testimonial_review_6: "Excellent experience overall.",

      // faq
      faq: "Frequently Asked Questions",
      loading: "Loading...",
      back: "Back To Home",
      noFaq: "No questions available",

      // Contact
      getInTouch: "Get in Touch",
      name: "Name",
      email: "Email",
      message: "Message",
      sendMessage: "Send Message",
      sending: "Sending...",
      successMessage: "Message sent successfully!",
      errorGeneral: "Something went wrong. Please try again.",
      errorName: "Please enter a valid name.",
      errorEmail: "Please enter a valid email.",
      errorMessage: "Message cannot be empty.",
      contactTitle: "Get in Touch",
      contactInfoTitle: "Contact Us For Any Informations",
      location: "Location",
      emailPhone: "Email & Phone",
      followUs: "Follow Us",
      contactNumber: "Contact Number",
      emailAddress: "Email Address",
      address: "Address",

      // about us
      titleSmall: "About Us",
      title: "The Great Place Of Medical Hospital Center",
      description: "We provide special tips and advice of health care treatment using advanced medical technology.",
      experience: "Year Experience",
      emergency: "Emergency Help",
      doctors: "Qualified Doctors",
      professionals: "Best Professionals",
      treatment: "Medical Treatment",

      // Booking form
      selectDepartment: "Select Department",
      changeDepartment: "Change Department",
      selectDoctor: "Select Doctor",
      changeDoctor: "Change Doctor",
      yourName: "Your Name",
      phoneNumbers: "Phone Numbers",
      selectDate: "Select Date",
      appointmentNow: "Appointment Now",
      nameError: "Please enter a valid name (only letters, 3 or more characters).",
      phoneError: "Please enter a valid phone number."
    }
  },
  ar: {
    translation: {
      "siteTitle": "مشفى",
      // Navbar
      home: "الرئيسية",
      pages: "الصفحات",
      services: "الخدمات",
      blogs: "المدونة",
      contact: "تواصل معنا",
      about: "من نحن",
      team: "فريق العمل",
      booking: "الحجز",
      login: "تسجيل الدخول",
      register: "إنشاء حساب",

      // Footer
      footerDesc: "نقدم أفضل خدمات الرعاية الصحية بأعلى جودة.",
      contactUs: "تواصل معنا",
      quickLinks: "روابط سريعة",
      ourTeam: "فريقنا",
      ourServices: "خدماتنا",
      serviceDental: "العناية بالأسنان",
      serviceSurgeon: "جراح متخصص",
      serviceSkin: "جراح الجلد",
      serviceHealth: "فهم الصحة",
      serviceDentist: "زيارة طبيب الأسنان",
      subscribe: "اشترك",
      subscribeNow: "اشترك الآن",
      emailAddress: "البريد الإلكتروني",

      // Login
      loginTitle: "تسجيل الدخول",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      loginButton: "تسجيل الدخول",
      createAccount: "إنشاء حساب جديد",
      loginRequired: "الرجاء إدخال البريد وكلمة المرور",
      "selectCountry": "اختر الدولة",
      "selectCity": "اختر المدينة",
      loginSuccess: "تم تسجيل الدخول بنجاح ✅",
      loginFail: "فشل تسجيل الدخول ❌",
      noAccount: "ليس لديك حساب؟",

      // Register
      registerTitle: "Create Account",
      registerButton: "Register Now",
      haveAccount: "Already have an account? Login",
      name: "Full Name",
      email: "Email Address",
      password: "Password",
      confirmPassword: "Confirm Password",
      phone: "Phone Number",
      countryId: "Country ID",
      cityId: "City ID",
      requiredField: "Please enter",
      passwordMismatch: "Password and confirmation do not match ❌",
      registerSuccess: "Account created successfully 🎉",
      registerFail: "Registration failed",
      registerError: "An error occurred during registration ❌",

      // Register
      registerTitle: "تسجيل جديد",
      registerButton: "سجل الآن",
      haveAccount: "لديك حساب؟ تسجيل الدخول",
      name: "الاسم",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      phone: "رقم الهاتف",
      countryId: "كود الدولة",
      cityId: "كود المدينة",
      requiredField: "الرجاء إدخال",
      passwordMismatch: "كلمة المرور وتأكيد كلمة المرور غير متطابقين ❌",
      registerSuccess: "تم إنشاء الحساب بنجاح 🎉",
      registerFail: "فشل إنشاء الحساب",
      registerError: "حدث خطأ أثناء التسجيل ❌",

      // index
      headerSubtitle: "نقدم جميع حلول الرعاية الصحية",
      headerTitle: "احمِ صحتك واهتم بها",
      readMore: "اقرأ المزيد",

      // workingProcess
      workingProcess: "خطوات العمل",
      howItWorks: "كيف نعمل؟",
      step1Title: "احجز موعد",
      step2Title: "الحصول على العلاج",
      step3Title: "التسجيل",
      stepDesc: "من المعروف أن القارئ سيتشتت بالاطلاع على المحتوى القابل للقراءة.",
      viewMore: "عرض المزيد",

      // Services Section
      services: "الخدمات",
      servicesTitle: "نغطي مجموعة واسعة من الخدمات الطبية",
      servicesDesc: "نقدم أفضل النصائح الطبية وخدمات الرعاية الصحية باستخدام أعلى مستوى من التقنية.",
      allServices: "جميع الخدمات",
      diagnostics: "التشخيص",
      treatment: "العلاج",
      surgery: "الجراحة",
      vaccine: "التطعيم",
      emergency: "طوارئ",
      desc: "من المعروف أن القارئ سيتشتت بالاطلاع على المحتوى القابل للقراءة.",

      // Services page
      qualifiedDoctors: "أطباء مؤهلون",

      // Ratings
      yearsWithYou: "سنوات معكم",
      yearsDesc: "من المعروف أن القارئ سيتشتت بالاطلاع على المحتوى القابل للقراءة.",
      awards: "الجوائز",
      awardsDesc: "من المعروف أن القارئ سيتشتت بالاطلاع على المحتوى القابل للقراءة.",
      doctors: "الأطباء",
      doctorsDesc: "من المعروف أن القارئ سيتشتت بالاطلاع على المحتوى القابل للقراءة.",
      satisfiedClients: "عملاء راضون",
      clientsDesc: "من المعروف أن القارئ سيتشتت بالاطلاع على المحتوى القابل للقراءة.",

      // Team
      dentist: "طبيب أسنان",
      chiropractor: "تقويم العمود الفقري",
      cardiologist: "طبيب قلب",
      sectionSubTitle: "أطباؤنا",
      sectionTitle: "تعرف على أفضل الأطباء",
      dentist: "طبيب أسنان",
      chiropractor: "تقويم العمود الفقري",
      cardiologist: "طبيب قلب",

      // Blogs
      blogTitle1: "العناية بالأسنان للنساء مهمة جدًا",
      blogTitle2: "يوجد في هذا المستشفى جراحون متخصصون",
      blogTitle3: "لماذا يُعتبر جراح الجلد أقل تقديرًا",
      blogTitle4: "افهم صحتك قبل أن تندم",

      // faq
      faq: "الأسئلة الشائعة",
      loading: "جاري التحميل...",
      back: "العودة للرئيسية",
      noFaq: "لا توجد أسئلة متاحة",

      // testimonial
      testimonial_title: "شهادات المرضى",
      testimonial_text: "اكتشف ماذا يقول المرضى عنا",
      testimonial_review_1: "الدكتور جون كان رائعاً!",
      testimonial_review_2: "خدمة احترافية جداً.",
      testimonial_review_3: "أنصح بالعيادة بشدة.",
      testimonial_review_4: "طاقم ودود ورعاية ممتازة.",
      testimonial_review_5: "دكتور فعال ومهتم.",
      testimonial_review_6: "تجربة ممتازة بشكل عام.",

      // Contact Form
      getInTouch: "تواصل معنا",
      name: "الاسم",
      email: "البريد الإلكتروني",
      message: "الرسالة",
      sendMessage: "إرسال الرسالة",
      sending: "جاري الإرسال...",
      successMessage: "تم إرسال الرسالة بنجاح!",
      errorGeneral: "حدث خطأ ما، حاول مرة أخرى.",
      errorName: "من فضلك أدخل اسمًا صحيحًا.",
      errorEmail: "من فضلك أدخل بريدًا إلكترونيًا صحيحًا.",
      errorMessage: "لا يمكن ترك الرسالة فارغة.",
      contactTitle: "تواصل معنا",
      contactInfoTitle: "تواصل معنا لأي استفسارات",
      location: "الموقع",
      emailPhone: "البريد الإلكتروني والهاتف",
      followUs: "تابعنا",
      contactNumber: "رقم التواصل",
      emailAddress: "البريد الإلكتروني",
      address: "العنوان",

      // about us
      titleSmall: "من نحن",
      title: "أفضل مركز طبي للعلاج والرعاية الصحية",
      description: "نقدم أفضل النصائح الطبية وخدمات الرعاية الصحية باستخدام أحدث التقنيات.",
      experience: "سنة خبرة",
      emergency: "مساعدة طارئة",
      doctors: "أطباء مؤهلون",
      professionals: "أفضل المتخصصين",
      treatment: "العلاج الطبي",

      // Booking form
      selectDepartment: "اختر القسم",
      changeDepartment: "تغيير القسم",
      selectDoctor: "اختر الطبيب",
      changeDoctor: "تغيير الطبيب",
      yourName: "الاسم",
      phoneNumbers: "رقم الهاتف",
      selectDate: "اختر التاريخ",
      appointmentNow: "احجز الآن",
      nameError: "من فضلك أدخل اسمًا صحيحًا (أحرف فقط، 3 أحرف أو أكثر).",
      phoneError: "من فضلك أدخل رقم هاتف صحيح."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
