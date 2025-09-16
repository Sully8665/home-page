
export interface Experience
{
  role: string;
  company: string;
  location?: string;
  period: string;
  bullets: string[];
  year?: number;
}
export interface Education { degree: string; school: string; period?: string; }
export interface Testimonial { name: string; role: string; relation: string; date: string; text: string; }
export interface SkillDetail
{
  name: string;
  nameFa: string;
  experience: string;
  experienceFa: string;
  description: string;
  descriptionFa: string;
  projects?: string[];
  projectsFa?: string[];
}
export const NAME = 'Saleh Rezaei';
export const NAME_FA = 'صالح رضایی';
export const ROLE = 'Senior Software Engineer';
export const ROLE_FA = 'مهندس ارشد نرم‌افزار';
export const CONTACT_INTRO = "I'm available via the following channels:";
export const CONTACT_INTRO_FA = 'از راه‌های زیر در دسترس هستم:';

export interface ContactInfo
{
  type: 'email' | 'linkedin' | 'whatsapp' | 'github';
  label: string;
  labelFa: string;
  value: string;
  url: string;
  icon: string;
}


export const CONTACT_INFO: ContactInfo[] = [
  {
    type: 'email',
    label: 'Email',
    labelFa: 'ایمیل',
    value: 'saleh.rezaei[at]gmail.com',
    url: 'mailto:saleh.rezaei@gmail.com',
    icon: 'alternate_email'
  },
  {
    type: 'whatsapp',
    label: 'WhatsApp',
    labelFa: 'واتساپ',
    value: '+989108087461',
    url: 'https://wa.me/989108087461',
    icon: 'chat'
  },
  {
    type: 'linkedin',
    label: 'LinkedIn',
    labelFa: 'لینکدین',
    value: 'linkedin.com/in/salehrezaei',
    url: 'https://www.linkedin.com/in/salehrezaei/',
    icon: 'link'
  },
  // {
  //   type: 'github',
  //   label: 'GitHub',
  //   labelFa: 'گیت‌هاب',
  //   value: 'github.com/Sully8665',
  //   url: 'https://github.com/Sully8665/',
  //   icon: 'code'
  // }
];
export const NAV_LABELS = { about: 'About', skills: 'Skills', experience: 'Experience', education: 'Education', testimonials: 'Testimonials', blog: 'Blog', contact: 'Contact' };
export const NAV_LABELS_FA = { about: 'درباره', skills: 'مهارت‌ها', experience: 'تجربیات', education: 'تحصیلات', testimonials: 'توصیه‌نامه‌ها', blog: 'وبلاگ', contact: 'ارتباط' };
export const SECTION_TITLES = { about: 'About', skills: 'Skills', experience: 'Experience', education: 'Education', testimonials: 'Testimonials', blog: 'Blog', contact: 'Contact' };
export const SECTION_TITLES_FA = { about: 'درباره', skills: 'مهارت‌ها', experience: 'تجربیات', education: 'تحصیلات', testimonials: 'توصیه‌نامه‌ها', blog: 'وبلاگ', contact: 'ارتباط' };
export const SUMMARY = `Full-stack developer with a strong foundation in backend engineering and a focus on clean, scalable architecture. I specialize in building robust systems, optimizing complex SQL procedures, and maintaining high-performance applications across the stack. With a meticulous approach to refactoring and a deep understanding of system design, I bring both precision and long-term thinking to every project.

Driven by clarity, efficiency, and continuous improvement.

Currently seeking opportunities in the Netherlands or Germany with relocation and visa sponsorship support.`;
export const SUMMARY_FA = `توسعه‌دهنده فول‌استک با تمرکز بر معماری تمیز و مقیاس‌پذیر و پایه قوی در بک‌اند. در ساخت سیستم‌های پایدار، بهینه‌سازی رویه‌های پیچیده SQL و نگهداری برنامه‌های پرفورمنس بالا تخصص دارم. با رویکردی دقیق به بازطراحی و درک عمیق از طراحی سیستم، دقت و نگاه بلندمدت را به هر پروژه می‌آورم.

با انگیزه شفافیت، کارایی و بهبود مستمر.

به دنبال فرصت‌های شغلی در هلند یا آلمان همراه با پشتیبانی جابجایی و ویزا هستم.`;
export const SKILLS = ['C#', '.NET', '.NET Core', 'Angular', 'JavaScript', 'TypeScript', 'NodeJS', 'Express.js', 'Nest.js', 'RESTful APIs', 'WebSocket', 'Entity Framework', 'EF Core', 'SQL Server', 'Postgres', 'MongoDB', 'Redis', 'Git'];
export const SKILLS_FA = ['#C', 'دات‌نت', 'دات‌نت کور', 'انگولار', 'جاوااسکریپت', 'تایپ‌اسکریپت', 'نود جی‌اس', 'اکسپرس', 'نست‌جی‌اس', 'APIهای REST', 'وب‌سوکت', 'Entity Framework', 'EF Core', 'SQL Server', 'پستگرس', 'مانگو‌دی‌بی', 'ردیس', 'گیت'];

export const SKILL_DETAILS: SkillDetail[] = [
  {
    name: 'C#',
    nameFa: 'سی‌شارپ',
    experience: '10+ years',
    experienceFa: '۱۰+ سال',
    description: 'Extensive experience in building enterprise applications, ERP systems, and desktop applications. Strong background in object-oriented programming, LINQ, and async/await patterns.',
    descriptionFa: 'تجربه گسترده در ساخت برنامه‌های سازمانی، سیستم‌های ERP و برنامه‌های دسکتاپ. پایه قوی در برنامه‌نویسی شی‌گرا، LINQ و الگوهای async/await.',
    projects: ['ERP Modules', 'POS Systems', 'Desktop Applications'],
    projectsFa: ['ماژول‌های ERP', 'سیستم‌های POS', 'برنامه‌های دسکتاپ']
  },
  {
    name: '.NET',
    nameFa: 'دات‌نت',
    experience: '10+ years',
    experienceFa: '۱۰+ سال',
    description: 'Deep expertise in .NET Framework and .NET Core development. Experience with WPF, WinForms, and web applications. Strong knowledge of dependency injection, middleware, and configuration management.',
    descriptionFa: 'تخصص عمیق در توسعه .NET Framework و .NET Core. تجربه با WPF، WinForms و برنامه‌های وب. دانش قوی در dependency injection، middleware و مدیریت تنظیمات.',
    projects: ['Enterprise Applications', 'Web APIs', 'Desktop Tools'],
    projectsFa: ['برنامه‌های سازمانی', 'APIهای وب', 'ابزارهای دسکتاپ']
  },
  {
    name: '.NET Core',
    nameFa: 'دات‌نت کور',
    experience: '10+ years',
    experienceFa: '۱۰+ سال',
    description: 'Modern .NET development with cross-platform capabilities. Experience with microservices architecture, containerization, and cloud deployment. Strong focus on performance optimization and scalability.',
    descriptionFa: 'توسعه مدرن .NET با قابلیت‌های چندپلتفرمه. تجربه با معماری میکروسرویس، کانتینریزاسیون و استقرار ابری. تمرکز قوی بر بهینه‌سازی عملکرد و مقیاس‌پذیری.',
    projects: ['Microservices', 'Cloud Applications', 'High-Performance APIs'],
    projectsFa: ['میکروسرویس‌ها', 'برنامه‌های ابری', 'APIهای پرفورمنس']
  },
  {
    name: 'Angular',
    nameFa: 'انگولار',
    experience: '3+ years',
    experienceFa: '۳+ سال',
    description: 'Enterprise-level Angular development with focus on component architecture, reactive programming, and state management. Experience with Angular Material, RxJS, and performance optimization.',
    descriptionFa: 'توسعه انگولار در سطح سازمانی با تمرکز بر معماری کامپوننت، برنامه‌نویسی reactive و مدیریت state. تجربه با Angular Material، RxJS و بهینه‌سازی عملکرد.',
    projects: ['Enterprise Dashboards', 'Admin Panels', 'SPA Applications'],
    projectsFa: ['داشبوردهای سازمانی', 'پنل‌های مدیریت', 'برنامه‌های SPA']
  },
  {
    name: 'JavaScript',
    nameFa: 'جاوااسکریپت',
    experience: '8+ years',
    experienceFa: '۸+ سال',
    description: 'Comprehensive JavaScript development including ES6+, DOM manipulation, and modern frameworks. Strong understanding of asynchronous programming, closures, and functional programming concepts.',
    descriptionFa: 'توسعه جامع جاوااسکریپت شامل ES6+، دستکاری DOM و فریمورک‌های مدرن. درک قوی از برنامه‌نویسی asynchronous، closures و مفاهیم برنامه‌نویسی تابعی.',
    projects: ['Frontend Applications', 'Node.js Backends', 'Browser Extensions'],
    projectsFa: ['برنامه‌های فرانت‌اند', 'بک‌اندهای Node.js', 'اکستنشن‌های مرورگر']
  },
  {
    name: 'TypeScript',
    nameFa: 'تایپ‌اسکریپت',
    experience: '6+ years',
    experienceFa: '۶+ سال',
    description: 'Strong TypeScript expertise for large-scale applications. Experience with advanced type system features, generics, decorators, and strict type checking. Focus on maintainable and scalable code.',
    descriptionFa: 'تخصص قوی در TypeScript برای برنامه‌های بزرگ. تجربه با ویژگی‌های پیشرفته سیستم نوع، generics، decorators و بررسی دقیق نوع. تمرکز بر کد قابل‌نگهداری و مقیاس‌پذیر.',
    projects: ['Enterprise Applications', 'API Development', 'Frontend Frameworks'],
    projectsFa: ['برنامه‌های سازمانی', 'توسعه API', 'فریمورک‌های فرانت‌اند']
  },
  {
    name: 'NodeJS',
    nameFa: 'نود جی‌اس',
    experience: '3+ years',
    experienceFa: '۳+ سال',
    description: 'Server-side JavaScript development with Node.js. Experience with Express.js, NestJS, and various middleware. Strong knowledge of event-driven architecture and non-blocking I/O.',
    descriptionFa: 'توسعه جاوااسکریپت سمت سرور با Node.js. تجربه با Express.js، NestJS و middlewareهای مختلف. دانش قوی از معماری event-driven و I/O غیرمسدودکننده.',
    projects: ['REST APIs', 'Real-time Applications', 'Microservices'],
    projectsFa: ['APIهای REST', 'برنامه‌های Real-time', 'میکروسرویس‌ها']
  },
  {
    name: 'Express.js',
    nameFa: 'اکسپرس',
    experience: '3+ years',
    experienceFa: '۳+ سال',
    description: 'Rapid web application development with Express.js. Experience with middleware integration, routing, and API design. Strong focus on performance and security best practices.',
    descriptionFa: 'توسعه سریع برنامه‌های وب با Express.js. تجربه با ادغام middleware، routing و طراحی API. تمرکز قوی بر عملکرد و بهترین شیوه‌های امنیتی.',
    projects: ['Web APIs', 'Backend Services', 'RESTful Services'],
    projectsFa: ['APIهای وب', 'سرویس‌های بک‌اند', 'سرویس‌های RESTful']
  },
  {
    name: 'Nest.js',
    nameFa: 'نست‌جی‌اس',
    experience: '3+ years',
    experienceFa: '۳+ سال',
    description: 'Enterprise-grade Node.js framework development. Experience with decorators, dependency injection, and modular architecture. Strong knowledge of TypeScript integration and testing.',
    descriptionFa: 'توسعه فریمورک Node.js در سطح سازمانی. تجربه با decorators، dependency injection و معماری ماژولار. دانش قوی از ادغام TypeScript و تست.',
    projects: ['Enterprise APIs', 'Microservices', 'Scalable Backends'],
    projectsFa: ['APIهای سازمانی', 'میکروسرویس‌ها', 'بک‌اندهای مقیاس‌پذیر']
  },
  {
    name: 'RESTful APIs',
    nameFa: 'APIهای REST',
    experience: '8+ years',
    experienceFa: '۸+ سال',
    description: 'Design and implementation of RESTful web services. Experience with API versioning, authentication, rate limiting, and documentation. Strong focus on API security and performance optimization.',
    descriptionFa: 'طراحی و پیاده‌سازی سرویس‌های وب RESTful. تجربه با versioning API، احراز هویت، محدودیت نرخ و مستندسازی. تمرکز قوی بر امنیت API و بهینه‌سازی عملکرد.',
    projects: ['Enterprise APIs', 'Third-party Integrations', 'Mobile Backends'],
    projectsFa: ['APIهای سازمانی', 'ادغام‌های شخص ثالث', 'بک‌اندهای موبایل']
  },
  {
    name: 'WebSocket',
    nameFa: 'وب‌سوکت',
    experience: '4+ years',
    experienceFa: '۴+ سال',
    description: 'Real-time communication implementation using WebSocket technology. Experience with Socket.io, real-time data streaming, and bidirectional communication patterns.',
    descriptionFa: 'پیاده‌سازی ارتباط Real-time با استفاده از تکنولوژی WebSocket. تجربه با Socket.io، استریم داده‌های Real-time و الگوهای ارتباط دوطرفه.',
    projects: ['Real-time Chat', 'Live Dashboards', 'Gaming Applications'],
    projectsFa: ['چت Real-time', 'داشبوردهای زنده', 'برنامه‌های بازی']
  },
  {
    name: 'Entity Framework',
    nameFa: 'Entity Framework',
    experience: '8+ years',
    experienceFa: '۱۰+ سال',
    description: 'Object-relational mapping with Entity Framework. Experience with Code First, Database First approaches, migrations, and performance optimization. Strong knowledge of LINQ and query optimization.',
    descriptionFa: 'نگاشت شی‌-رابطه‌ای با Entity Framework. تجربه با رویکردهای Code First، Database First، migrations و بهینه‌سازی عملکرد. دانش قوی از LINQ و بهینه‌سازی کوئری.',
    projects: ['Data Access Layers', 'ORM Implementations', 'Database Migrations'],
    projectsFa: ['لایه‌های دسترسی داده', 'پیاده‌سازی‌های ORM', 'migrationهای دیتابیس']
  },
  {
    name: 'EF Core',
    nameFa: 'EF Core',
    experience: '5+ years',
    experienceFa: '۵+ سال',
    description: 'Modern Entity Framework Core development. Experience with cross-platform database access, performance improvements, and new features. Strong focus on async operations and query optimization.',
    descriptionFa: 'توسعه مدرن Entity Framework Core. تجربه با دسترسی چندپلتفرمه به دیتابیس، بهبودهای عملکرد و ویژگی‌های جدید. تمرکز قوی بر عملیات async و بهینه‌سازی کوئری.',
    projects: ['Cross-platform Apps', 'High-performance Queries', 'Modern Data Access'],
    projectsFa: ['برنامه‌های چندپلتفرمه', 'کوئری‌های پرفورمنس', 'دسترسی مدرن داده']
  },
  {
    name: 'SQL Server',
    nameFa: 'SQL Server',
    experience: '10+ years',
    experienceFa: '۱۰+ سال',
    description: 'Advanced SQL Server development and administration. Experience with stored procedures, functions, triggers, and performance tuning. Strong knowledge of indexing strategies and query optimization.',
    descriptionFa: 'توسعه و مدیریت پیشرفته SQL Server. تجربه با stored procedureها، functions، triggers و performance tuning. دانش قوی از استراتژی‌های indexing و بهینه‌سازی کوئری.',
    projects: ['Database Design', 'Performance Tuning', 'Stored Procedures'],
    projectsFa: ['طراحی دیتابیس', 'Performance Tuning', 'Stored Procedureها']
  },
  {
    name: 'Postgres',
    nameFa: 'پستگرس',
    experience: '4+ years',
    experienceFa: '۴+ سال',
    description: 'PostgreSQL development and optimization. Experience with advanced features, JSON support, and performance tuning. Strong knowledge of indexing and query optimization techniques.',
    descriptionFa: 'توسعه و بهینه‌سازی PostgreSQL. تجربه با ویژگی‌های پیشرفته، پشتیبانی JSON و performance tuning. دانش قوی از تکنیک‌های indexing و بهینه‌سازی کوئری.',
    projects: ['Web Applications', 'Data Analytics', 'JSON Storage'],
    projectsFa: ['برنامه‌های وب', 'تحلیل داده', 'ذخیره JSON']
  },
  {
    name: 'MongoDB',
    nameFa: 'مانگو‌دی‌بی',
    experience: '5+ years',
    experienceFa: '۵+ سال',
    description: 'NoSQL database development with MongoDB. Experience with document modeling, aggregation pipelines, and performance optimization. Strong knowledge of indexing strategies and sharding.',
    descriptionFa: 'توسعه دیتابیس NoSQL با MongoDB. تجربه با مدل‌سازی document، aggregation pipelineها و بهینه‌سازی عملکرد. دانش قوی از استراتژی‌های indexing و sharding.',
    projects: ['Document Stores', 'Real-time Applications', 'Scalable Backends'],
    projectsFa: ['ذخیره‌گاه‌های Document', 'برنامه‌های Real-time', 'بک‌اندهای مقیاس‌پذیر']
  },
  {
    name: 'Redis',
    nameFa: 'ردیس',
    experience: '4+ years',
    experienceFa: '۴+ سال',
    description: 'In-memory data structure store implementation. Experience with caching strategies, session management, and real-time features. Strong knowledge of Redis data types and performance optimization.',
    descriptionFa: 'پیاده‌سازی ذخیره‌گاه ساختار داده در حافظه. تجربه با استراتژی‌های caching، مدیریت session و ویژگی‌های Real-time. دانش قوی از انواع داده Redis و بهینه‌سازی عملکرد.',
    projects: ['Caching Systems', 'Session Stores', 'Real-time Features'],
    projectsFa: ['سیستم‌های Caching', 'ذخیره‌گاه‌های Session', 'ویژگی‌های Real-time']
  },
  {
    name: 'Git',
    nameFa: 'گیت',
    experience: '10+ years',
    experienceFa: '۱۰+ سال',
    description: 'Version control and collaboration with Git. Experience with branching strategies, merge conflicts resolution, and team workflows. Strong knowledge of Git hooks, rebasing, and advanced Git features.',
    descriptionFa: 'کنترل نسخه و همکاری با Git. تجربه با استراتژی‌های branching، حل تعارض merge و workflowهای تیمی. دانش قوی از Git hooks، rebasing و ویژگی‌های پیشرفته Git.',
    projects: ['Version Control', 'Team Collaboration', 'CI/CD Pipelines'],
    projectsFa: ['کنترل نسخه', 'همکاری تیمی', 'خطوط CI/CD']
  }
];
export const EXPERIENCES: Experience[] = [
  {
    role: 'Full-Stack Developer', company: 'Total E Integrated', location: 'Toronto, Canada', period: '10/2024 – Present', year: 2024, bullets: [
      'Develop & maintain ERP modules (F&B, Retail, Tee Sheet, Payment).',
      'Extend Angular components and .NET Core APIs with clean, scalable patterns.'
    ]
  },
  {
    role: 'Senior Software Engineer', company: 'arades GmbH', location: 'Frankfurt, Germany', period: '08/2023 – 07/2024', year: 2023, bullets: [
      'Designed high-performance APIs with .NET Core & Node.js.',
      'Integrated Microsoft Dynamics & Azure; built License Cost Calculator backend (~20% faster data flows).'
    ]
  },
  {
    role: 'Senior Software Engineer', company: 'Roma Parvaz', location: 'Tehran, Iran', period: '09/2022 – 08/2023', year: 2022, bullets: [
      'Built B2B flight reservation backends using NestJS + RabbitMQ, with Redis caching.'
    ]
  },
  {
    role: 'Full Stack Software Developer', company: 'Self-Employed', location: 'Tehran, Iran', period: '05/2020 – 05/2022', year: 2020, bullets: [
      'Delivered maintainable Node.js + MongoDB services; optimized NoSQL queries for performance.'
    ]
  },
  {
    role: 'Senior Software Engineer', company: 'GSS Int', location: 'Tehran, Iran', period: '08/2015 – 05/2020', year: 2015, bullets: [
      'Developed WPF/C#.NET apps; refactored legacy modules for maintainability & performance.',
      'Improved legacy cheque scanner QR reading speed by ~8×.'
    ]
  },
  {
    role: 'Software Engineer & Team Lead', company: 'Pishtazane Asre Kavosh', location: 'Tehran, Iran', period: '08/2009 – 07/2015', year: 2009, bullets: [
      'Led a team of 5 developers; analysis, design, and maintenance with C#.NET & SQL Server.'
    ]
  }
];
export const EDUCATION: Education[] = [
  { degree: 'B.Sc. in Software Engineering', school: 'Islamic Azad University', period: 'Graduated 09/2019' }
];
export const EXPERIENCES_FA: Experience[] = [
  {
    role: 'توسعه‌دهنده فول‌استک', company: 'Total E Integrated', location: 'تورنتو، کانادا', period: '۱۰/۲۰۲۴ – اکنون', year: 2024, bullets: [
      'توسعه و نگهداری ماژول‌های ERP (رستوران، خرده‌فروشی، رزرو، پرداخت).',
      'گسترش کامپوننت‌های انگولار و APIهای .NET Core با الگوهای تمیز و مقیاس‌پذیر.'
    ]
  },
  {
    role: 'مهندس ارشد نرم‌افزار', company: 'arades GmbH', location: 'فرانکفورت، آلمان', period: '۰۸/۲۰۲۳ – ۰۷/۲۰۲۴', year: 2023, bullets: [
      'طراحی APIهای پرفورمنس با .NET Core و Node.js.',
      'ادغام Dynamics و Azure؛ بهبود سرعت جریان داده در بک‌اند محاسبه هزینه لایسنس (~۲۰٪).'
    ]
  },
  {
    role: 'مهندس ارشد نرم‌افزار', company: 'Roma Parvaz', location: 'تهران، ایران', period: '۰۹/۲۰۲۲ – ۰۸/۲۰۲۳', year: 2022, bullets: [
      'ساخت بک‌اند رزرو پرواز B2B با NestJS + RabbitMQ و کش ردی‌س.'
    ]
  },
  {
    role: 'توسعه‌دهنده فول‌استک', company: 'خویش‌فرما', location: 'تهران، ایران', period: '۰۵/۲۰۲۰ – ۰۵/۲۰۲۲', year: 2020, bullets: [
      'تحویل سرویس‌های قابل‌نگهداری Node.js + MongoDB؛ بهینه‌سازی کوئری‌های NoSQL.'
    ]
  },
  {
    role: 'مهندس ارشد نرم‌افزار', company: 'GSS Int', location: 'تهران، ایران', period: '۰۸/۲۰۱۵ – ۰۵/۲۰۲۰', year: 2015, bullets: [
      'توسعه برنامه‌های WPF/C#.NET؛ بازطراحی ماژول‌های قدیمی برای نگهداشت‌پذیری و پرفورمنس.',
      'بهبود سرعت خواندن QR اسکنر چک قدیمی حدود ۸ برابر.'
    ]
  },
  {
    role: 'مهندس نرم‌افزار و سرپرست تیم', company: 'Pishtazane Asre Kavosh', location: 'تهران، ایران', period: '۰۸/۲۰۰۹ – ۰۷/۲۰۱۵', year: 2009, bullets: [
      'رهبری تیم ۵ نفره؛ تحلیل، طراحی و نگهداری با C#.NET و SQL Server.'
    ]
  }
];
export const EDUCATION_FA: Education[] = [
  { degree: 'کارشناسی مهندسی نرم‌افزار', school: 'دانشگاه آزاد اسلامی', period: 'فارغ‌التحصیل ۰۹/۲۰۱۹' }
];
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Keyvan Arj',
    role: 'GenAI, Machine Vision, Cryptography, Software Engineering',
    relation: 'Managed Saleh directly',
    date: 'Oct 15, 2021',
    text: "I've known Saleh for 13 years, when he was very young and started the software development. He tries to do his best and is a nice teammate collaborate with other team members to move forward. He always tries to experience new challenges with appreciated commitment. I really like him."
  },
  {
    name: 'Mohsen Saffari',
    role: 'Lead AI Engineer',
    relation: 'Worked with Saleh on the same team',
    date: 'Oct 14, 2021',
    text: 'I worked with Saleh for about 8 years at Kavosh and GSS company. He is smart, responsible, and a finisher in software development and industrial projects. He is a very good learner and his professional and nice manner in team works helps a company to progress continuously. He knows very well that how to finish software and develop a robust application. He tries to learn new development software and tools always and does his best by them. I definitely recommend Saleh as a Senior Software Developer.'
  },
  {
    name: 'Eric Akhlaghi',
    role: 'Senior Software Engineer',
    relation: 'Managed Saleh directly',
    date: 'Jul 27, 2021',
    text: 'Saleh has worked with me as a software developer on various projects for many years at Kavosh and GSS International. He is a rare example of an effective and collaborative software programmer and through the years, I was impressed by his manner of doing a great job. His expertise as a programmer is considerable and it helped our company to come up with more efficient solutions and develop innovative projects. In addition to his wonderful programming skill, what I appreciate most about him is how reliable and responsive he is. His energy to make things happen was contagious and it helped us achieve great goals. Saleh is a fast-learner and has the ability to work on multiple tasks and still be focused and deliver quality work. I am confident that he would be a great asset for any company he joins and I definitely would recommend Saleh as Senior Software Engineer.'
  }
];
export const TESTIMONIALS_FA: Testimonial[] = [
  {
    name: 'کیوان ارج',
    role: 'هوش مصنوعی مولد، بینایی ماشین، رمزنگاری، مهندسی نرم‌افزار',
    relation: 'مدیر مستقیم صالح',
    date: '۱۵ اکتبر ۲۰۲۱',
    text: 'من صالح را از ۱۳ سال پیش می‌شناسم، زمانی که خیلی جوان بود و برنامه‌نویسی را شروع کرده بود. او همیشه بهترین تلاش خود را می‌کند و هم‌تیمی خوبی است که با سایر اعضای تیم همکاری می‌کند تا پیش بروند. او همیشه سعی می‌کند چالش‌های جدید را با تعهد قابل‌تقدیری تجربه کند. من واقعاً او را دوست دارم.'
  },
  {
    name: 'محسن صفاری',
    role: 'مهندس ارشد هوش مصنوعی',
    relation: 'هم‌تیمی صالح',
    date: '۱۴ اکتبر ۲۰۲۱',
    text: 'من حدود ۸ سال در شرکت‌های کاوش و جی‌اس‌اس با صالح کار کردم. او باهوش، مسئولیت‌پذیر و تمام‌کننده پروژه‌های نرم‌افزاری و صنعتی است. یادگیرنده بسیار خوبی است و رفتار حرفه‌ای و خوشایندش در کار تیمی به پیشرفت مستمر شرکت کمک می‌کند. او خیلی خوب می‌داند چگونه نرم‌افزار را به سرانجام برساند و یک اپلیکیشن پایدار توسعه دهد. همیشه دنبال یادگیری ابزارها و فناوری‌های جدید است و بهترین عملکرد را با آنها ارائه می‌دهد. قطعاً صالح را به‌عنوان مهندس ارشد نرم‌افزار توصیه می‌کنم.'
  },
  {
    name: 'اریک اخلاقي',
    role: 'مهندس ارشد نرم‌افزار',
    relation: 'مدیر مستقیم صالح',
    date: '۲۷ ژوئیه ۲۰۲۱',
    text: 'صالح طی سال‌ها در کاوش و GSS به‌عنوان توسعه‌دهنده نرم‌افزار با من روی پروژه‌های مختلف کار کرده است. او نمونه نادری از یک برنامه‌نویس مؤثر و همکار است و در این سال‌ها از نحوه انجام کار عالی او تحت تأثیر قرار گرفته‌ام. تخصص او به ما کمک کرد راهکارهای کارآمدتری ارائه دهیم و پروژه‌های نوآورانه‌ای توسعه دهیم. علاوه بر مهارت عالی برنامه‌نویسی، بیش از همه قابل‌اعتماد و پاسخ‌گو بودن او را می‌پسندم. انرژی او برای به نتیجه رساندن کارها مسری بود و به ما کمک کرد به اهداف بزرگ برسیم. صالح یادگیرنده سریعی است و توانایی کار روی چند وظیفه به‌طور هم‌زمان را دارد و با تمرکز بالا کار باکیفیت تحویل می‌دهد. مطمئنم برای هر شرکتی که به آن بپیوندد دارایی ارزشمندی خواهد بود و قطعاً او را به‌عنوان مهندس ارشد نرم‌افزار توصیه می‌کنم.'
  }
];

