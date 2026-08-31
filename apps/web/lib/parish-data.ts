/**
 * parish-data.ts
 * Single source of truth — all Queen of All Saints Church content
 * organised in one unified PARISH object.
 *
 * Usage:  import { PARISH } from '@/lib/parish-data'
 *         PARISH.contact.phone
 *         PARISH.massTimings
 *         PARISH.history.milestones
 */

export const PARISH = {
  // ─── Identity ──────────────────────────────────────────────────────────────
  identity: {
    name: 'Queen of All Saints Church',
    nameTa: 'அனைத்து புனிதர்களின் அரசி ஆலயம்',
    short: 'Queen of All Saints',
    shortTa: 'அனைத்து புனிதர்களின் அரசி',
    founded: 1977,
    diocese: 'Diocese of Tiruchirappalli',
    dioceseTa: 'திருச்சிராப்பள்ளி மறைமாவட்டம்',
    order: 'Norbertine Fathers (O.Praem)',
    orderTa: 'நார்பர்ட் அருட்தந்தையர்கள் (ஓப்ரேம்)',
    patroness: 'Queen of All Saints',
    patronessTa: 'அனைத்து புனிதர்களின் அரசி',
    tagline: 'A Parish Family United in Faith',
    taglineTa: 'நம்பிக்கையில் ஒன்றிணைந்த பங்கு குடும்பம்',
  },

  // ─── Contact ───────────────────────────────────────────────────────────────
  contact: {
    address: 'Amalapuram, K.K. Nagar, Tiruchirappalli – 620 021',
    addressTa: 'அமலாபுரம், கே.கே. நகர், திருச்சிராப்பள்ளி – 620 021',
    phone: '+91 94432 49671',
    email: 'queenofallsaintschurch@gmail.com',
    mapUrl: 'https://maps.google.com/?q=Queen+of+All+Saints+Church+KK+Nagar+Trichy',
    officeHours: 'Sunday – Saturday: 9:00 AM – 1:00 PM & 5:00 PM – 8:30 PM',
    officeHoursTa: 'ஞாயிறு – சனி: காலை 9:00 – பிற்பகல் 1:00 & மாலை 5:00 – இரவு 8:30',
  },

  // ─── Social Media ──────────────────────────────────────────────────────────
  social: {
    facebook: 'https://facebook.com/queenofallsaintschurch',
    youtube: 'https://youtube.com/@queenofallsaintschurch',
    instagram: '',
  },

  // ─── Statistics ────────────────────────────────────────────────────────────
  stats: [
    { value: '1977', label: 'Serving Since', labelTa: 'சேவை தொடங்கிய ஆண்டு', icon: 'church' },
    { value: '47+', label: 'Years of Faith', labelTa: 'நம்பிக்கையின் ஆண்டுகள்', icon: 'cross' },
    { value: '10', label: 'Parish Ministries', labelTa: 'பக்த சபைகள்', icon: 'users' },
    { value: '10', label: 'Anbiyams', labelTa: 'அன்பியங்கள்', icon: 'heart' },
    { value: '4', label: 'Sunday Masses', labelTa: 'ஞாயிறு திருப்பலிகள்', icon: 'calendar' },
    { value: '3', label: 'Feast Chariots', labelTa: 'திருவிழா தேர்கள்', icon: 'star' },
  ],

  // ─── Parish Notices ────────────────────────────────────────────────────────
  notices: [
    {
      text: 'Sunday English Mass at 6:15 AM — All are welcome',
      textTa: 'ஞாயிறு ஆங்கில திருப்பலி காலை 6:15 மணிக்கு',
    },
    { text: 'Sunday Tamil Mass at 7:30 AM', textTa: 'ஞாயிறு தமிழ் திருப்பலி காலை 7:30 மணிக்கு' },
    {
      text: 'Thursday: Infant Jesus Novena & Mass with Oil Anointing at 6 PM',
      textTa: 'வியாழன்: குழந்தை இயேசு நவநாள் & திருத்தைலம் மாலை 6 மணிக்கு',
    },
    {
      text: 'Friday: Sacred Heart Novena, Mass & Adoration at 6 PM',
      textTa: 'வெள்ளி: திருஇதய நவநாள், திருப்பலி & ஆராதனை மாலை 6 மணிக்கு',
    },
    {
      text: 'Saturday: Novena to Queen of All Saints & Mass at 6 PM',
      textTa: 'சனி: அனைத்து புனிதர்களின் அரசி நவநாள் & திருப்பலி மாலை 6 மணிக்கு',
    },
    {
      text: 'Annual Feast — 3rd Friday of August · Flag Hoisting & 10-Day Novena',
      textTa: 'ஆண்டு திருவிழா — ஆகஸ்ட் மூன்றாம் வெள்ளி · கொடி ஏற்றம் & 10 நாள் நவேனா',
    },
    {
      text: 'Contact: +91 94432 49671 · queenofallsaintschurch@gmail.com',
      textTa: 'தொடர்பு: +91 94432 49671 · queenofallsaintschurch@gmail.com',
    },
  ],

  // ─── Mass Timings ──────────────────────────────────────────────────────────
  massTimings: [
    {
      day: 'Sunday',
      dayTa: 'ஞாயிறு',
      dow: 0,
      masses: [
        { time: '6:15 AM', language: 'English', type: 'Holy Mass', typeTa: 'திருப்பலி' },
        { time: '7:30 AM', language: 'Tamil', type: 'Holy Mass', typeTa: 'திருப்பலி' },
        {
          time: '9:30 AM',
          language: 'Tamil',
          type: 'Gandhi Nagar Sub-station Mass',
          typeTa: 'காந்திநகர் திருப்பலி',
        },
        { time: '6:15 PM', language: 'Tamil', type: 'Evening Mass', typeTa: 'மாலை திருப்பலி' },
      ],
    },
    {
      day: 'Monday – Wednesday',
      dayTa: 'திங்கள் – புதன்',
      dow: [1, 2, 3],
      masses: [
        {
          time: '6:00 PM',
          language: 'Tamil',
          type: 'Novena Followed by Holy Mass',
          typeTa: 'நவநாள் தொடர்ந்து திருப்பலி',
        },
      ],
    },
    {
      day: 'Thursday',
      dayTa: 'வியாழன்',
      dow: 4,
      masses: [
        {
          time: '6:00 PM',
          language: 'Tamil',
          type: 'Infant Jesus Novena & Mass with Oil Anointing',
          typeTa: 'குழந்தை இயேசு நவநாள் — திருத்தைலம் பூசுதலுடன் திருப்பலி',
        },
      ],
    },
    {
      day: 'Friday',
      dayTa: 'வெள்ளி',
      dow: 5,
      masses: [
        {
          time: '6:00 PM',
          language: 'Tamil',
          type: 'Sacred Heart Novena, Mass & Eucharistic Adoration',
          typeTa: 'திருஇதய நவநாள், திருப்பலி & நற்கருணை ஆராதனை',
        },
      ],
    },
    {
      day: 'Saturday',
      dayTa: 'சனி',
      dow: 6,
      masses: [
        {
          time: '6:00 PM',
          language: 'Tamil',
          type: 'Novena to Queen of All Saints & Holy Mass',
          typeTa: 'அனைத்து புனிதர்களின் அரசி நவநாள் தொடர்ந்து திருப்பலி',
        },
      ],
    },
  ],

  // ─── Clergy ────────────────────────────────────────────────────────────────
  clergy: {
    current: {
      name: 'Rev. Fr. ArokiyaSwamy O.Praem',
      nameTa: 'அருட்பணி ஆரோக்கியசாமி ஓப்ரேம்',
      role: 'Parish Priest',
      roleTa: 'பங்குத் தந்தை',
      since: '2025',
      phone: '+91 94432 49671',
      email: 'queenofallsaintschurch@gmail.com',
      bio: 'Fr. ArokiyaSwamy O.Praem has served as Parish Priest of Queen of All Saints Church since 2025. He guides the parish in the Norbertine spirit of regular prayer, pastoral visits, and practical care for all families across the 13 Anbiyams.',
      bioTa:
        'அருட்பணி ஆரோக்கியசாமி ஓப்ரேம் 2025 ஆம் ஆண்டு முதல் அனைத்து புனிதர்களின் அரசி ஆலயத்தின் பங்குத் தந்தையாக உள்ளார். 1977 முதல் இந்த பங்கை வழிநடத்திய நார்பர்ட் அருட்தந்தையர்களின் பாரம்பரியத்தை தொடர்கிறார்.',
      quote:
        'Welcome to Queen of All Saints Parish. May this be a home where you encounter Christ, grow in faith, and experience the love of our Church family.',
      quoteTa:
        'அனைத்து புனிதர்களின் அரசி பங்கிற்கு உங்களை வரவேற்கிறோம். இது உங்கள் ஆன்மீக வீடாகவும், இயேசுவை சந்திக்கும் இடமாகவும் திகழட்டும்.',
      image: '/images/priest/fr-arokiyaswamy.jpg',
    },
    timeline: [
      {
        years: '1977 – 1980',
        name: 'Fr. Prakash O.Praem',
        role: 'Founding Parish Priest',
        note: "Established the first Norbertine mission in Trichy; celebrated Mass in Mrs. Stella's home from Oct 1977.",
      },
      {
        years: '1980 – 1988',
        name: 'Fr. Alfred Fernando O.Praem',
        role: 'Parish Priest',
        note: 'Served with great dedication during the formative years of the parish.',
      },
      {
        years: '1988 – 1990',
        name: 'Fr. Thiraviyam O.Praem & Team',
        role: 'Parish Priests',
        note: 'Fr. Fabian, Fr. Adaikkalaswamy, Fr. John Francis, Fr. Lourduraj, Br. Amalraj served together.',
      },
      {
        years: '1990 – 1994',
        name: 'Fr. Paul Gilbert O.Praem',
        role: 'Parish Priest',
        note: 'Oversaw school administration and the Norbertine residence; assisted by Fr. Mathew Olasil and Fr. John Francis.',
      },
      {
        years: '1995 – 1996',
        name: 'Fr. Benjamin O.Praem',
        role: 'Residential Priest',
        note: 'First residential priest appointed specifically for K.K. Nagar.',
      },
      {
        years: '1996 – 1998',
        name: 'Fr. Xavier Amirtham O.Praem',
        role: 'Residential Priest',
        note: 'Continued parish ministry as residential priest.',
      },
      {
        years: '1999 – 2002',
        name: 'Fr. Benedict Paul Raj O.Praem',
        role: 'First Independent Parish Priest',
        note: 'Led construction of the new church, consecrated 19 Sep 1999. Built sacristy, bell tower, and toilets.',
      },
      {
        years: '2002 – 2003',
        name: 'Fr. Lourduraj O.Praem',
        role: 'Parish Priest',
        note: 'Advanced many spiritual works among the faithful despite a short tenure.',
      },
      {
        years: '2003 – 2005',
        name: 'Fr. Adaikkalaswamy O.Praem',
        role: 'Parish Priest',
        note: 'Engaged the faithful deeply in spiritual activities.',
      },
      {
        years: '2005 – 2010',
        name: 'Fr. Mary Thiraviyam O.Praem',
        role: 'Parish Priest',
        note: 'Devoted himself to parish growth; known for warmth and pastoral friendship.',
      },
      {
        years: '2010 – 2012',
        name: 'Fr. Benedict Paul Raj O.Praem',
        role: 'Parish Priest (2nd term)',
        note: 'Completed pending projects; expanded the sacristy; guided families with spiritual wisdom.',
      },
      {
        years: '2012 – 2015',
        name: 'Fr. Arokkiyaselvan O.Praem',
        role: 'Parish Priest',
        note: 'Built Infant Jesus Grotto; erected the flagpost; renovated Gandhi Nagar sub-church.',
      },
      {
        years: '2015 – 2019',
        name: 'Fr. Adaikkalaswamy O.Praem',
        role: 'Parish Priest (2nd term)',
        note: 'Built the Eucharistic Chapel for perpetual adoration.',
      },
      {
        years: '2019 – 2025',
        name: 'Fr. Reddinraj O.Praem',
        role: 'Parish Priest',
        note: 'Revitalised all ministries; celebrated 30th feast & 25th Silver Jubilee; built compound wall; added two chariots.',
      },
      {
        years: '2025 – Present',
        name: 'Fr. ArokiyaSwamy O.Praem',
        role: 'Parish Priest',
        note: 'Continues the Norbertine tradition of pastoral excellence and community service.',
      },
    ],
  },

  // ─── Ministries ────────────────────────────────────────────────────────────
  ministries: [
    {
      name: 'Parish Pastoral Council',
      nameTa: 'பங்கு பேரவை',
      icon: 'users',
      desc: 'Guides the overall pastoral direction of the parish with the Parish Priest.',
      descTa: 'பங்குத் தந்தையுடன் இணைந்து பங்கின் ஆன்மீக திசையை வழிநடத்துகிறது.',
    },
    {
      name: 'Parish Finance Committee',
      nameTa: 'பங்கு நிதிக்குழு',
      icon: 'landmark',
      desc: 'Manages the responsible stewardship of parish finances and resources.',
      descTa: 'பங்கின் நிதி மற்றும் வளங்களை பொறுப்புடன் நிர்வகிக்கிறது.',
    },
    {
      name: 'Liturgy Team',
      nameTa: 'வழிபாட்டுக் குழு',
      icon: 'cross',
      desc: 'Prepares and enriches liturgical celebrations, ensuring reverent worship.',
      descTa: 'திருப்பலி மற்றும் வழிபாட்டு நிகழ்வுகளை பக்தியுடன் நடத்த ஏற்பாடு செய்கிறது.',
    },
    {
      name: 'Catechism',
      nameTa: 'மறைக்கல்வி மன்றம்',
      icon: 'book-open',
      desc: 'Teaches the Catholic faith to children, preparing them for the sacraments.',
      descTa: 'குழந்தைகளுக்கு மறைக்கல்வி கற்பித்து அருட்சாதனங்களுக்கு தயார்படுத்துகிறது.',
    },
    {
      name: 'Youth Movement',
      nameTa: 'இளையோர் இயக்கம்',
      icon: 'zap',
      desc: 'Energises young Catholics to live their faith with joy and bold commitment.',
      descTa: 'இளைஞர்களை கிறிஸ்தவ வாழ்வில் உற்சாகமாக பங்கேற்க ஊக்குவிக்கிறது.',
    },
    {
      name: "Women's Association",
      nameTa: 'பெண்கள் பணிக்குழு',
      icon: 'heart',
      desc: 'Unites the women of the parish in prayer, service, and spiritual growth.',
      descTa: 'பங்கின் பெண்களை ஜெபத்திலும் சேவையிலும் ஆன்மீக வளர்ச்சியிலும் ஒன்றிணைக்கிறது.',
    },
    {
      name: 'Society of St. Vincent De Paul',
      nameTa: 'வின்சென்ட் தே பால் சபை',
      icon: 'hand-heart',
      desc: 'Serves the poor, sick, and marginalised with practical charity and compassion.',
      descTa: 'ஏழைகளுக்கும் நோயாளிகளுக்கும் இரக்கத்துடன் உதவி செய்கிறது.',
    },
    {
      name: 'Legion of Mary',
      nameTa: 'மரியாயின் சேனை',
      icon: 'star',
      desc: 'Apostolic Marian association dedicated to prayer and parish outreach.',
      descTa: 'மரியாளின் பெயரால் ஜெபம் மற்றும் திருவை திட்டங்களில் ஈடுபடும் மரிய அமைப்பு.',
    },
    {
      name: 'Choir',
      nameTa: 'பாடகர் குழு',
      icon: 'music',
      desc: 'Glorifies God through sacred music, hymns, and liturgical song at every Mass.',
      descTa: 'ஒவ்வொரு திருப்பலியிலும் புனித இசை மூலம் இறைவனை மகிமைப்படுத்துகிறது.',
    },
    {
      name: 'Altar Servers',
      nameTa: 'பீடப்பணியாளர்கள்',
      icon: 'sparkles',
      desc: 'Young ministers who serve faithfully at the altar during Holy Mass.',
      descTa: 'திருப்பலியில் பீடத்தில் பக்தியுடன் சேவை செய்யும் இளம் ஊழியர்கள்.',
    },
  ],

  // ─── History ───────────────────────────────────────────────────────────────
  history: {
    milestones: [
      {
        year: '1970s',
        title: 'The Need for a Church',
        titleTa: 'ஆலயத்தின் தேவை',
        body: 'When K.K. Nagar was established in the 1970s, it was far from the city centre and the nearest Catholic church. Transport was scarce, and attending Sunday Mass was a great challenge. Mrs. Stella Selvaraj, a schoolteacher, felt deeply the need for a local church and became the driving force behind its founding.',
        bodyTa:
          'கிபி 1970களில் கேகே நகர் உருவான போது அது நகர மையத்திலிருந்து தொலைவில் இருந்தது. திருப்பலிக்கு செல்ல போக்குவரத்து வசதி இல்லை. பள்ளி ஆசிரியையான திருமதி ஸ்டெல்லா செல்வராஜ் ஒரு தேவாலயம் அமைக்க முன்வந்தார்.',
        image: '/images/history/img_1.webp',
      },
      {
        year: '1977',
        title: 'First Mass in a Home',
        titleTa: 'ஒரு வீட்டில் முதல் திருப்பலி',
        body: "In 1977, Fr. Prakash O.Praem arrived in Trichy at the Bishop's request to establish the first Norbertine mission. Catholic families led by Mrs. Stella approached him and requested Sunday Mass. From October 1977 to July 1979, Mass was celebrated every Sunday in Mrs. Stella's own home. The congregation grew week by week.",
        bodyTa:
          '1977 ஆம் ஆண்டு நார்பட் சபையை திருச்சியில் நிறுவ அருட்தந்தை பிரகாஷ் வந்தார். ஆசிரியை ஸ்டெல்லா உதவியுடன் அவரை சந்தித்து ஞாயிறு திருப்பலி கேட்டனர். 1977 அக்டோபர் முதல் 1979 ஜூலை வரை ஸ்டெல்லா வீட்டிலேயே திருப்பலி நடைபெற்றது.',
        image: '/images/history/img_2.webp',
      },
      {
        year: '1979',
        title: 'A Church is Built',
        titleTa: 'ஒரு ஆலயம் உருவானது',
        body: "Thanks to Mrs. Stella's tireless efforts, land was purchased and a tiled-roof building was constructed with Fr. John Van Adrichen O.Praem's assistance. Sunday Masses and the All Saints Academy nursery school began here. K.K. Nagar became part of the Sempattu parish mission.",
        bodyTa:
          'ஆசிரியை ஸ்டெல்லா முயற்சியால் இடம் வாங்கப்பட்டு ஓட்டுக் கட்டிடம் கட்டப்பட்டது. ஞாயிறு திருப்பலியும் All Saints Academy மழலையர் பள்ளியும் தொடங்கின. கேகேநகர் செம்பட்டு பங்கின் பகுதியாக ஆனது.',
        image: '/images/history/img_3.webp',
      },
      {
        year: '1994',
        title: 'Named Queen of All Saints',
        titleTa: 'அனைத்து புனிதர்களின் அரசி என பெயரிடப்பட்டது',
        body: 'From 1994, through the efforts of Fr. John Francis O.Praem, the church was officially named Queen of All Saints Church. The grand chariot festival began annually. Separate Tamil and English Masses were introduced, uniting the whole community.',
        bodyTa:
          '1994 முதல் அருட்தந்தை ஜான் பிரான்சிஸ் முயற்சியால் இந்த ஆலயம் அனைத்து புனிதர்களின் அரசி ஆலயமாக அறிவிக்கப்பட்டது. தேர் திருவிழா தொடங்கியது. தமிழ் மற்றும் ஆங்கில திருப்பலிகள் தனித்தனியே நடைபெறத் துவங்கின.',
        image: '/images/history/img_4.webp',
      },
      {
        year: '19 Sep 1999',
        title: 'Consecrated as an Independent Parish',
        titleTa: 'தனி பங்காக அர்ச்சிக்கப்பட்டது',
        body: 'On 19 September 1999, the new church was consecrated by Bishop Peter Fernando and established as an independent parish. Fr. Benedict Paul Raj O.Praem became the first Parish Priest.',
        bodyTa:
          '19 செப்டம்பர் 1999 அன்று ஆயர் பீட்டர் பெர்னாண்டோ அவர்களால் புதிய கட்டிடம் அர்ச்சிக்கப்பட்டு தனி பங்காக அறிவிக்கப்பட்டது. அந்த நாள் கேகேநகர் மக்களுக்கு என்றும் மறக்க முடியாத பொன்னான நாள்.',
        image: '/images/history/img_5.webp',
      },
      {
        year: 'Today',
        title: 'Our Parish Family',
        titleTa: 'செழிப்பான பங்கு குடும்பம்',
        body: 'Today, Queen of All Saints is home to Catholic families across K.K. Nagar and Crawford. With our Eucharistic Chapel, bell tower, and 10 active ministries, our parish family gathers weekly to worship God and care for one another.',
        bodyTa:
          'இன்று, அனைத்து புனிதர்களின் அரசி ஆலயம் கேகேநகரில் உயிரோட்டமான கத்தோலிக்க சமூகமாக திகழ்கிறது. நற்கருணை ஆலயம், மணிக்கூண்டு, சுற்று சுவர், மூன்று தேர்கள் — இவை நம்பிக்கையின் அடையாளங்கள்.',
        image: '/images/history/img_6.webp',
      },
    ],
  },

  // ─── Annual Feast ──────────────────────────────────────────────────────────
  feast: {
    title: 'Annual Feast of Queen of All Saints',
    titleTa: 'அனைத்து புனிதர்களின் அரசி ஆண்டு திருவிழா',
    /** Feast flag-hoisting: 3rd Friday of August. Feast duration: 10 days. */
    month: 8, // August (1-indexed)
    feastWeek: 3, // 3rd week
    feastDow: 5, // Friday
    durationDays: 10,
    schedule:
      'Every year, the Flag Hoisting takes place on the third Friday of August, opening 10 days of Novena. On the following Saturday evening, the grand chariot procession takes place through the neighbourhood streets, followed by the Solemn Feast Mass. On Sunday, the celebration concludes with the lowering of the flag.',
    scheduleTa:
      'ஒவ்வொரு ஆண்டும் ஆகஸ்ட் மாதம் மூன்றாவது வெள்ளிக்கிழமை கொடி ஏற்றம் நடைபெறும். 10 நாள் நவேனாவிற்கு பிறகு சனி மாலை தேர் பவனி எடுக்கப்பட்டு திருவிழா திருப்பலி நடைபெறும். மறுநாள் ஞாயிறு கொடி இறக்கப்படும்.',
    chariots: 'Three sacred chariots: Our Lady Queen of All Saints, St. Joseph, and St. Michael the Archangel',
    chariotsTa: 'மூன்று தேர்கள்: மாதா, புனித சூசையப்பர், புனித மைக்கேல் சம்மனசு',
    events: [
      {
        title: 'Flag Hoisting',
        titleTa: 'கொடி ஏற்றம்',
        desc: '3rd Friday of August (Opening of the 10-day Novena)',
        descTa: 'ஆகஸ்ட் மூன்றாம் வெள்ளி — 10 நாள் நவேனாவின் தொடக்கம்',
      },
      {
        title: '10-Day Novena',
        titleTa: '10 நாள் நவேனா',
        desc: 'Daily evening Mass and special novena prayers to Our Lady',
        descTa: 'தினசரி மாலை ஜெபம் மற்றும் மாதாவுக்கான சிறப்பு பக்தி',
      },
      {
        title: 'Grand Procession',
        titleTa: 'தேர் பவனி',
        desc: 'Saturday evening procession of three chariots through K.K. Nagar',
        descTa: 'சனி மாலை — மூன்று அழகிய தேர்கள் தெருக்களில் பவனி',
      },
      {
        title: 'Solemn Feast Mass',
        titleTa: 'திருவிழா திருப்பலி',
        desc: 'Saturday evening High Mass celebrated after the chariot procession',
        descTa: 'சனி மாலை — பவனியை தொடர்ந்து சிறப்பு திருப்பலி',
      },
      {
        title: 'Flag Lowering',
        titleTa: 'கொடி இறக்கம்',
        desc: 'Sunday morning thanksgiving Mass and lowering of the feast flag',
        descTa: 'ஞாயிறு காலை — திருவிழாவின் நிறைவு',
      },
    ],
  },

  // ─── Gallery ───────────────────────────────────────────────────────────────
  gallery: [
    {
      src: '/images/gallery/events/gallery-img-29.webp',
      alt: 'Parish Event',
      altTa: 'பங்கு நிகழ்வு',
      category: 'events' as const,
    },
    {
      src: '/images/gallery/events/gallery-img-30.webp',
      alt: 'Parish Gathering',
      altTa: 'பங்கு கூட்டம்',
      category: 'events' as const,
    },
    {
      src: '/images/gallery/events/gallery-img-31.webp',
      alt: 'Community Activity',
      altTa: 'சமூக நடவடிக்கை',
      category: 'community' as const,
    },
    {
      src: '/images/gallery/events/gallery-img-32.webp',
      alt: 'Parish Celebration',
      altTa: 'பங்கு கொண்டாட்டம்',
      category: 'events' as const,
    },
    {
      src: '/images/gallery/events/gallery-img-37.webp',
      alt: 'Special Event',
      altTa: 'சிறப்பு நிகழ்வு',
      category: 'events' as const,
    },
    {
      src: '/images/gallery/events/gallery-img-39.webp',
      alt: 'Parish Family',
      altTa: 'பங்கு குடும்பம்',
      category: 'community' as const,
    },
    {
      src: '/images/gallery/events/gallery-img-40.webp',
      alt: 'Church Activity',
      altTa: 'ஆலய செயல்பாடு',
      category: 'events' as const,
    },
  ],

  // ─── Anbiyams (Small Faith Communities) ──────────────────────────────────
  anbiyams: [
    {
      id: 'st-augustine',
      name: 'St. Augustine Anbiyam',
      nameTa: 'புனித ஆகுஸ்தினார் அன்பியம்',
      incharge: 'Mrs. Gracy',
      families: 54,
      image: '/images/anbiyams/st-augustine/logo.jpg',
    },
    {
      id: 'st-joseph',
      name: 'St. Joseph Anbiyam',
      nameTa: 'புனித சூசையப்பர் அன்பியம்',
      incharge: 'Mrs. Jecintha',
      families: 29,
      image: '/images/anbiyams/st-joseph/logo.jpg',
    },
    {
      id: 'st-john-de-britto',
      name: 'St. John De Britto Anbiyam',
      nameTa: 'புனித அருளாளந்தர் அன்பியம்',
      incharge: 'Mr. John',
      families: 43,
      image: '/images/anbiyams/st-john-de-britto/logo.jpg',
    },
    {
      id: 'jmj',
      name: 'Jesus Mary Joseph (JMJ) Anbiyam',
      nameTa: 'ஜே.எம்.ஜே அன்பியம்',
      incharge: 'Mr. ArokiyaRaj',
      families: 31,
      image: '/images/anbiyams/jmj/logo.avif',
    },
    {
      id: 'st-xavier',
      name: 'St. Xavier Anbiyam',
      nameTa: 'புனித சவேரியார் அன்பியம்',
      incharge: 'Mr. Vethapothagar',
      families: 19,
      image: '/images/anbiyams/st-xavier/logo.png',
    },
    {
      id: 'st-alphonsa',
      name: 'St. Alphonsa Anbiyam',
      nameTa: 'புனித அல்போன்சா அன்பியம்',
      incharge: 'Mr. E.P. Anthony',
      families: 14,
      image: '/images/anbiyams/st-alphonsa/logo.jpg',
    },
    {
      id: 'infant-jesus',
      name: 'Infant Jesus Anbiyam',
      nameTa: 'குழந்தையேசு அன்பியம்',
      incharge: 'Mr. Thomaiyar',
      families: 20,
      image: '/images/anbiyams/infant-jesus/logo.jpg',
    },
    {
      id: 'st-ceciliya',
      name: 'St. Ceciliya Anbiyam',
      nameTa: 'புனித செசிலியா அன்பியம்',
      incharge: 'Mrs. Shanthi',
      families: 27,
      image: '/images/anbiyams/st-ceciliya/logo.jpg',
    },
    {
      id: 'st-norbert',
      name: 'St. Norbert Anbiyam',
      nameTa: 'புனித நார்பர்ட் அன்பியம்',
      incharge: 'Mrs. Annie',
      families: 34,
      image: '/images/anbiyams/st-norbert/logo.jpg',
    },
    {
      id: 'st-antony',
      name: 'St. Antony Anbiyam',
      nameTa: 'புனித அந்தோனியார் அன்பியம்',
      incharge: 'Mr. I.M. Anthony',
      families: 33,
      image: '/images/anbiyams/st-antony/logo.jpg',
    },
    {
      id: 'st-theresa',
      name: 'St. Theresa Anbiyam',
      nameTa: 'புனித தெரசாள் அன்பியம்',
      incharge: 'Mr. PannerSelvam',
      families: 18,
      image: '/images/anbiyams/st-theresa/logo.jpg',
    },
    {
      id: 'anglo-indian',
      name: 'Anglo Indian Community',
      nameTa: 'ஆங்கிலோ இந்திய சமூகம்',
      incharge: 'Mr. Hector Pinto',
      families: 58,
      image: '/images/anbiyams/anglo-indian/logo.jpg',
    },
    {
      id: 'gandhi-nagar',
      name: 'Gandhi Nagar Sub-station',
      nameTa: 'புனித செபஸ்தியர் கிளைப்பங்கு',
      incharge: 'Mr. John De Britto',
      families: 71,
      image: '/images/anbiyams/gandhi-nagar/logo.jpg',
    },
  ],

  // ─── Parish Teams with Incharges ──────────────────────────────────────────
  teams: [
    {
      name: 'Parish Pastoral Council',
      nameTa: 'பங்கு பேரவை',
      incharge: 'Parish Priest',
      icon: 'users',
      joinEnabled: false,
      desc: 'Guides the overall pastoral direction of the parish.',
      descTa: 'பங்கின் ஆன்மீக திசையை வழிநடத்துகிறது.',
      image: '/images/teams/choir/cover.jpg',
    },
    {
      name: 'Parish Finance Committee',
      nameTa: 'பங்கு நிதிக்குழு',
      incharge: 'Mr. Robin',
      icon: 'landmark',
      joinEnabled: false,
      desc: 'Manages the responsible stewardship of parish finances.',
      descTa: 'பங்கின் நிதி வளங்களை பொறுப்புடன் நிர்வகிக்கிறது.',
      image: '/images/teams/choir/cover.jpg',
    },
    {
      name: 'Liturgy Team',
      nameTa: 'வழிபாட்டுக் குழு',
      incharge: 'Mr. I.M. Anthony',
      icon: 'cross',
      joinEnabled: false,
      desc: 'Prepares and enriches all liturgical celebrations.',
      descTa: 'வழிபாட்டு நிகழ்வுகளை பக்தியுடன் நடத்த ஏற்பாடு செய்கிறது.',
      image: '/images/teams/choir/cover.jpg',
    },
    {
      name: 'Catechism',
      nameTa: 'மறைக்கல்வி மன்றம்',
      incharge: 'Mr. Panner ArokiyaRaj',
      icon: 'book-open',
      joinEnabled: true,
      joinPath: '/join/catechism',
      desc: 'Teaches the Catholic faith to children preparing for sacraments.',
      descTa: 'குழந்தைகளுக்கு மறைக்கல்வி கற்பிக்கிறது.',
      image: '/images/teams/catechism/cover.jpg',
    },
    {
      name: 'Youth Movement',
      nameTa: 'இளையோர் இயக்கம்',
      incharge: 'Selvan. Christo',
      icon: 'zap',
      joinEnabled: true,
      joinPath: '/join/youth',
      desc: 'Energises young Catholics to live their faith with joy.',
      descTa: 'இளைஞர்களை கிறிஸ்தவ வாழ்வில் உற்சாகமாக ஊக்குவிக்கிறது.',
      image: '/images/teams/youth/cover.jpg',
    },
    {
      name: "Women's Association",
      nameTa: 'பெண்கள் பணிக்குழு',
      incharge: 'Mrs. DhanaBakiyam',
      icon: 'heart',
      joinEnabled: true,
      joinPath: '/join/women-association',
      desc: 'Unites the women of the parish in prayer, service, and growth.',
      descTa: 'பங்கின் பெண்களை ஜெபத்திலும் சேவையிலும் ஒன்றிணைக்கிறது.',
      image: '/images/teams/women-association/cover.jpg',
    },
    {
      name: 'Society of St. Vincent De Paul',
      nameTa: 'வின்சென்ட் தே பால் சபை',
      incharge: 'Mr. Ebin John',
      icon: 'hand-heart',
      joinEnabled: true,
      joinPath: '/join/vincent-de-paul',
      desc: 'Serves the poor and sick with practical charity and compassion.',
      descTa: 'ஏழைகளுக்கும் நோயாளிகளுக்கும் இரக்கத்துடன் உதவுகிறது.',
      image: '/images/teams/vincent-de-paul/cover.jpg',
    },
    {
      name: 'Legion of Mary',
      nameTa: 'மரியாயின் சேனை',
      incharge: 'Mrs. Victoriya',
      icon: 'star',
      joinEnabled: true,
      joinPath: '/join/legion-of-mary',
      desc: 'Apostolic Marian association dedicated to prayer and outreach.',
      descTa: 'மரியாளின் பெயரால் ஜெபம் மற்றும் திருவை திட்டங்களில் ஈடுபடுகிறது.',
      image: '/images/teams/legion-of-mary/cover.jpg',
    },
    {
      name: 'Choir',
      nameTa: 'பாடகர் குழு',
      incharge: 'Selvan Jeffin Josva S',
      icon: 'music',
      joinEnabled: true,
      joinPath: '/join/choir',
      desc: 'Glorifies God through sacred music and liturgical song.',
      descTa: 'புனித இசை மூலம் இறைவனை மகிமைப்படுத்துகிறது.',
      image: '/images/teams/choir/cover.jpg',
    },
    {
      name: 'Altar Servers',
      nameTa: 'பீடப்பணியாளர்கள்',
      incharge: 'Selvan Jeeva Joshua & Selvan Michael',
      icon: 'sparkles',
      joinEnabled: true,
      joinPath: '/join/altar-servers',
      desc: 'Young ministers who serve faithfully at the altar during Mass.',
      descTa: 'திருப்பலியில் பீடத்தில் பக்தியுடன் சேவை செய்யும் இளம் ஊழியர்கள்.',
      image: '/images/teams/altar-servers/cover.jpg',
    },
  ],

  // ─── Choir Sub-Teams ──────────────────────────────────────────────────────
  choirTeams: [
    {
      id: 'mother-mary',
      name: 'Mother Mary Choir Team',
      nameTa: 'மாதா பாடகர் குழு',
      incharge: 'Mrs. Gillus Feeliya',
      image: '/images/choir-teams/mother-mary/logo.jpg',
      desc: 'Leads worship with devotional hymns dedicated to Our Lady.',
      descTa: 'மாதாவுக்கு அர்ப்பணிக்கப்பட்ட பாடல்களால் வழிபாட்டை வழிநடத்துகிறது.',
      practiceDay: 'Friday evenings',
      massesServed: 'Sunday 6:15 AM English Mass',
    },
    {
      id: 'catechism',
      name: 'Catechism Choir Team',
      nameTa: 'மறைக்கல்வி பாடகர் குழு',
      incharge: 'Catechism Teachers',
      image: '/images/choir-teams/catechism/logo.jpg',
      desc: 'Children and teachers who sing with faith at Catechism Masses.',
      descTa: 'மறைக்கல்வி திருப்பலிகளில் நம்பிக்கையுடன் பாடும் குழந்தைகள்.',
      practiceDay: 'Saturday mornings',
      massesServed: 'Catechism & special Masses',
    },
    {
      id: 'youth',
      name: 'Youth Choir Team',
      nameTa: 'இளையோர் பாடகர் குழு',
      incharge: 'Selvan Christo',
      image: '/images/choir-teams/youth/logo.avif',
      desc: 'Young voices lifting praise with contemporary and traditional hymns.',
      descTa: 'இளைஞர்களின் குரல்களால் நவீன மற்றும் பாரம்பரிய பாடல்கள் ஒலிக்கின்றன.',
      practiceDay: 'Saturday evenings',
      massesServed: 'Sunday 7:30 AM Tamil Mass',
    },
    {
      id: 'women-association',
      name: "Women's Association Choir",
      nameTa: 'பெண்கள் பணிக்குழு பாடகர்',
      incharge: 'Mrs. Shanti & Mrs. DhanaBakiyam',
      image: '/images/choir-teams/women-association/logo.jpg',
      desc: 'Women of the parish who enrich liturgy with their sacred voices.',
      descTa: 'பங்கின் பெண்கள் புனித இசையால் வழிபாட்டை செழுமைப்படுத்துகின்றனர்.',
      practiceDay: 'Wednesday evenings',
      massesServed: 'Sunday 9:30 AM & weekday Masses',
    },
    {
      id: 'substation',
      name: 'Sub-Station Choir',
      nameTa: 'கிளைப்பங்கு பாடகர் குழு',
      incharge: 'Gandhi Nagar Community',
      image: '/images/choir-teams/substation/logo.jpg',
      desc: 'The faithful of Gandhi Nagar Sub-station who lead Sunday worship.',
      descTa: 'காந்திநகர் கிளைப்பங்கு மக்கள் ஞாயிறு வழிபாட்டை வழிநடத்துகின்றனர்.',
      practiceDay: 'Sunday mornings',
      massesServed: 'Sunday 9:30 AM Gandhi Nagar',
    },
    {
      id: 'anglo-indian',
      name: 'Anglo Indian Choir',
      nameTa: 'ஆங்கிலோ இந்திய பாடகர் குழு',
      incharge: 'English Speaking Community',
      image: '/images/choir-teams/anglo-indian/logo.webp',
      desc: 'The English-speaking community who lead worship at English Mass.',
      descTa: 'ஆங்கில திருப்பலியில் வழிபாட்டை வழிநடத்தும் ஆங்கிலம் பேசும் சமூகம்.',
      practiceDay: 'Saturday evenings',
      massesServed: 'Sunday 6:15 AM English Mass',
    },
  ],
} as const;

// ─── Derived type helpers ──────────────────────────────────────────────────────
export type GalleryCategory = 'all' | 'events' | 'community' | 'feast' | 'mass';
export type GalleryImage = (typeof PARISH.gallery)[number];
export type MassSlot = (typeof PARISH.massTimings)[number];
export type HistoryMilestone = (typeof PARISH.history.milestones)[number];
export type Ministry = (typeof PARISH.ministries)[number];
export type PriestRecord = (typeof PARISH.clergy.timeline)[number];
export type FeastEvent = (typeof PARISH.feast.events)[number];
export type ParishStat = (typeof PARISH.stats)[number];
export type Notice = (typeof PARISH.notices)[number];
export type Anbiyam = (typeof PARISH.anbiyams)[number];
export type Team = (typeof PARISH.teams)[number];
export type ChoirTeam = (typeof PARISH.choirTeams)[number];
