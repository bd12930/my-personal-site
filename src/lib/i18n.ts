export type Lang = 'en' | 'id' | 'zh';

export const SUPPORTED_LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'zh', label: '简体中文', flag: '🇨🇳' },
];

export const translations = {
  en: {
    // Navigation & Common
    appName: 'Brand New Everyday',
    familyCheckIn: 'Family Check-In',
    checkIn: 'Check-In',
    newCheckIn: 'New Check-In',
    history: 'History',
    guide: 'Guide',
    admin: 'Admin',
    logout: 'Logout',
    dashboard: 'Dashboard',
    you: 'You',
    cancel: 'Cancel',
    saveChanges: 'Save Changes',
    loadingDate: 'Loading date...',
    draftSaved: 'Draft saved ✓',
    defaultsRestored: 'Defaults restored',

    // Welcome & Purpose
    welcomeBack: 'Welcome back',
    welcomeSubtitle: 'A peaceful place for our family to stay connected, encourage one another, and grow in Christ.',
    howToUse: 'How to Use',
    hideGuide: 'Hide Guide',
    familyPurposeTitle: 'Our Family Purpose',
    familyPurposeText: 'We check in so everyone knows each other is safe, cared for, and doing well. There is no pressure to write long essays—a simple 30-second check-in using the friendly defaults is more than enough!',
    viewFullGuide: 'View Detailed Family Guide',

    // Guide 4 Quick Steps on Dashboard
    step1Title: '1. Check Mood:',
    step1Desc: 'Select how your state of mind is today (defaults to Pleasant).',
    step2Title: '2. Share Freely:',
    step2Desc: 'Edit or keep default notes on Struggle, Blessing, or Prayer.',
    step3Title: '3. Daily Devotion:',
    step3Desc: "Read today's Reformed reflection on God's providence and care.",
    step4Title: '4. Auto-Save & Security:',
    step4Desc: 'Drafts save as you type; logs out after 10m of inactivity for privacy.',

    // Check-In Form
    dailyCheckInTitle: 'Daily Family Check-In',
    dailyCheckInSubtitle: 'Take a moment to record your heart and mind today.',
    stateOfMindLabel: 'State of Mind',
    stateOfMindHint: '(how are you feeling today?)',
    defaultPrefix: 'Default',
    
    // 7 Moods
    moodVeryUnpleasant: 'Very Unpleasant',
    moodUnpleasant: 'Unpleasant',
    moodSlightlyUnpleasant: 'Slightly Unpleasant',
    moodNeutral: 'Neutral',
    moodSlightlyPleasant: 'Slightly Pleasant',
    moodPleasant: 'Pleasant',
    moodVeryPleasant: 'Very Pleasant',

    // 4 Fields
    struggleLabel: 'Struggle',
    struggleDefault: 'None',
    strugglePlaceholder: "Share any difficulty or hardship, or keep as 'None'...",
    
    blessingLabel: 'Count Blessing',
    blessingDefault: "I'm loved by God",
    blessingPlaceholder: 'What are you thankful for today?',

    prayerLabel: 'Prayer Request',
    prayerDefault: "Lord's Prayer",
    prayerPlaceholder: 'How can your family pray for you today?',

    aobLabel: 'Any Other Business',
    aobOptional: '(Optional)',
    aobPlaceholder: 'Family schedule, shoutouts, or any extra notes...',

    // Devotion
    dailyDevotionBadge: 'Daily Reformed Devotion',
    prayerBadge: 'Prayer',

    // Buttons
    resetDefaults: 'Reset to Defaults',
    submitCheckIn: 'Check In',
    submitting: 'Submitting...',
    viewInHistory: 'View in History →',
    checkInSuccess: 'Your check-in has been recorded! Thank you for sharing with the family.',

    // History Page
    historyTitle: 'Family Check-In History',
    historySubtitle: 'Browse updates, celebrate answers to prayer, and encourage one another.',
    addCheckInBtn: '+ Add Check-In',
    noCheckInsTitle: 'No Family Check-Ins Yet',
    noCheckInsDesc: 'Be the very first to share your heart today! It takes just a few seconds to let your family know how you are doing.',
    postFirstCheckIn: 'Post First Check-In',
    devotionAccordion: 'Devotion',
    edit: 'Edit',
    delete: 'Delete',
    deleteConfirm: 'Are you sure you want to delete this check-in entry?',
    deleteSuccess: 'Check-in entry deleted successfully.',

    // Edit Page
    editEntryTitle: 'Edit Your Check-In',
    editEntrySubtitle: 'Updating check-in for',
    recordedOn: 'recorded on',

    // Admin Page
    adminPanelTitle: 'Brand New Everyday - Admin Panel',
    websiteSettings: 'Website Settings',
    comingSoon: 'Coming Soon',
    addUserTitle: 'Add New User',
    addUserDesc: 'Create a new user account with custom credentials and default language.',
    username: 'Username',
    password: 'Password',
    makeAdmin: 'Make Admin',
    defaultLanguage: 'Default Language',
    addUserBtn: 'Add User',
    userManagementTitle: 'User Management',
    userManagementDesc: 'Manage user IDs, preferred language, usernames, passwords, or delete users.',
    role: 'Role',
    changeUsername: 'Change Username',
    resetPassword: 'Reset Password',
    preferredLang: 'Language',
    change: 'Change',
    reset: 'Reset',
    saveLang: 'Save',
    actions: 'Actions',

    // Inactivity Message
    loggedOutInactivity: 'Logged out due to 10 minutes of inactivity',
  },

  id: {
    // Navigation & Common
    appName: 'Brand New Everyday',
    familyCheckIn: 'Check-In Keluarga',
    checkIn: 'Check-In',
    newCheckIn: 'Check-In Baru',
    history: 'Riwayat',
    guide: 'Panduan',
    admin: 'Admin',
    logout: 'Keluar',
    dashboard: 'Beranda',
    you: 'Anda',
    cancel: 'Batal',
    saveChanges: 'Simpan Perubahan',
    loadingDate: 'Memuat tanggal...',
    draftSaved: 'Draf tersimpan ✓',
    defaultsRestored: 'Nilai awal dipulihkan',

    // Welcome & Purpose
    welcomeBack: 'Selamat datang kembali',
    welcomeSubtitle: 'Tempat teduh bagi keluarga kita untuk saling terhubung, menguatkan, dan bertumbuh dalam Kristus.',
    howToUse: 'Cara Penggunaan',
    hideGuide: 'Sembunyikan Panduan',
    familyPurposeTitle: 'Tujuan Keluarga Kita',
    familyPurposeText: 'Kita saling check-in agar semua tahu bahwa kita aman, diperhatikan, dan dalam keadaan baik. Tidak ada keharusan menulis panjang—check-in singkat 30 detik sudah sangat membahagiakan!',
    viewFullGuide: 'Lihat Panduan Lengkap Keluarga',

    // Guide 4 Quick Steps on Dashboard
    step1Title: '1. Pilih Suasana Hati:',
    step1Desc: 'Pilih bagaimana perasaan Anda hari ini (bawaan: Baik).',
    step2Title: '2. Bagikan Kabar:',
    step2Desc: 'Ubah atau biarkan catatan bawaan pada Pergumulan, Berkat, atau Doa.',
    step3Title: '3. Renungan Harian:',
    step3Desc: 'Baca renungan Reformed hari ini tentang pemeliharaan dan kasih Allah.',
    step4Title: '4. Simpan Otomatis & Keamanan:',
    step4Desc: 'Draf tersimpan saat mengetik; otomatis keluar setelah 10 menit hening demi privasi.',

    // Check-In Form
    dailyCheckInTitle: 'Check-In Harian Keluarga',
    dailyCheckInSubtitle: 'Luangkan sejenak untuk membagikan isi hati dan pikiran hari ini.',
    stateOfMindLabel: 'Kondisi Hati & Pikiran',
    stateOfMindHint: '(bagaimana perasaanmu hari ini?)',
    defaultPrefix: 'Bawaan',

    // 7 Moods
    moodVeryUnpleasant: 'Sangat Buruk',
    moodUnpleasant: 'Buruk',
    moodSlightlyUnpleasant: 'Agak Buruk',
    moodNeutral: 'Netral',
    moodSlightlyPleasant: 'Cukup Baik',
    moodPleasant: 'Baik',
    moodVeryPleasant: 'Sangat Baik',

    // 4 Fields
    struggleLabel: 'Pergumulan',
    struggleDefault: 'Tidak ada',
    strugglePlaceholder: "Tuliskan kesulitan atau beban yang dihadapi, atau biarkan 'Tidak ada'...",
    
    blessingLabel: 'Hitung Berkat',
    blessingDefault: 'Aku dikasihi Tuhan',
    blessingPlaceholder: 'Apa yang kamu syukuri hari ini?',

    prayerLabel: 'Pokok Doa',
    prayerDefault: 'Doa Bapa Kami',
    prayerPlaceholder: 'Bagaimana keluarga bisa mendoakanmu hari ini?',

    aobLabel: 'Hal Lain / AOB',
    aobOptional: '(Opsional)',
    aobPlaceholder: 'Jadwal keluarga, salam hangat, atau catatan tambahan...',

    // Devotion
    dailyDevotionBadge: 'Renungan Harian Reformed',
    prayerBadge: 'Doa',

    // Buttons
    resetDefaults: 'Kembalikan Bawaan',
    submitCheckIn: 'Kirim Check-In',
    submitting: 'Mengirim...',
    viewInHistory: 'Lihat di Riwayat →',
    checkInSuccess: 'Check-in Anda telah tercatat! Terima kasih telah berbagi bersama keluarga.',

    // History Page
    historyTitle: 'Riwayat Check-In Keluarga',
    historySubtitle: 'Lihat kabar keluarga, syukuri jawaban doa, dan saling menguatkan.',
    addCheckInBtn: '+ Tambah Check-In',
    noCheckInsTitle: 'Belum Ada Check-In Keluarga',
    noCheckInsDesc: 'Jadilah yang pertama membagikan kabar hari ini! Hanya butuh beberapa detik untuk menyapa keluarga.',
    postFirstCheckIn: 'Kirim Check-In Pertama',
    devotionAccordion: 'Renungan',
    edit: 'Ubah',
    delete: 'Hapus',
    deleteConfirm: 'Apakah Anda yakin ingin menghapus catatan check-in ini?',
    deleteSuccess: 'Catatan check-in berhasil dihapus.',

    // Edit Page
    editEntryTitle: 'Ubah Check-In Anda',
    editEntrySubtitle: 'Memperbarui check-in milik',
    recordedOn: 'tercatat pada',

    // Admin Page
    adminPanelTitle: 'Brand New Everyday - Panel Admin',
    websiteSettings: 'Pengaturan Situs Web',
    comingSoon: 'Segera Hadir',
    addUserTitle: 'Tambah Pengguna Baru',
    addUserDesc: 'Buat akun keluarga baru dengan kredensial dan bahasa bawaan.',
    username: 'Nama Pengguna',
    password: 'Kata Sandi',
    makeAdmin: 'Jadikan Admin',
    defaultLanguage: 'Bahasa Bawaan',
    addUserBtn: 'Tambah Pengguna',
    userManagementTitle: 'Manajemen Pengguna',
    userManagementDesc: 'Kelola ID, bahasa pilihan, nama pengguna, kata sandi, atau hapus pengguna.',
    role: 'Peran',
    changeUsername: 'Ubah Username',
    resetPassword: 'Atur Ulang Sandi',
    preferredLang: 'Bahasa',
    change: 'Ubah',
    reset: 'Atur Ulang',
    saveLang: 'Simpan',
    actions: 'Aksi',

    // Inactivity Message
    loggedOutInactivity: 'Otomatis keluar karena tidak ada aktivitas selama 10 menit',
  },

  zh: {
    // Navigation & Common
    appName: 'Brand New Everyday',
    familyCheckIn: '家庭每日签到',
    checkIn: '签到',
    newCheckIn: '发布签到',
    history: '历史记录',
    guide: '使用指南',
    admin: '管理面板',
    logout: '退出登录',
    dashboard: '首页',
    you: '您',
    cancel: '取消',
    saveChanges: '保存更改',
    loadingDate: '加载时间中...',
    draftSaved: '草稿已保存 ✓',
    defaultsRestored: '已恢复默认值',

    // Welcome & Purpose
    welcomeBack: '欢迎回来',
    welcomeSubtitle: '让我们家庭彼此联系、在主里互相勉励与成长的温馨港湾。',
    howToUse: '使用说明',
    hideGuide: '隐藏说明',
    familyPurposeTitle: '我们的家庭初心',
    familyPurposeText: '我们每天签到，是为了让彼此知道大家都平平安安、蒙神看顾。完全没有写长篇大论的压力——只需30秒使用默认值快速签到，就足以让家人感到温暖安心！',
    viewFullGuide: '查看家庭详细指南',

    // Guide 4 Quick Steps on Dashboard
    step1Title: '1. 记录心境：',
    step1Desc: '选择您今天的心情状态（系统默认设置为“愉快”）。',
    step2Title: '2. 轻松分享：',
    step2Desc: '更新或保留难处、数算恩典或代祷事项的贴心默认内容。',
    step3Title: '3. 每日灵修：',
    step3Desc: '静心阅读今日关于神主权护理与恩典的归正神学简短灵修。',
    step4Title: '4. 自动保存与隐私：',
    step4Desc: '边写边自动保存草稿；离开或闲置10分钟后自动安全退出。',

    // Check-In Form
    dailyCheckInTitle: '家庭每日签到',
    dailyCheckInSubtitle: '静下心来，记录今天的心境与生活点滴。',
    stateOfMindLabel: '心境状态',
    stateOfMindHint: '（您今天感觉如何？）',
    defaultPrefix: '默认',

    // 7 Moods
    moodVeryUnpleasant: '非常不悦',
    moodUnpleasant: '不悦',
    moodSlightlyUnpleasant: '略微不悦',
    moodNeutral: '平常',
    moodSlightlyPleasant: '略微愉快',
    moodPleasant: '愉快',
    moodVeryPleasant: '非常愉快',

    // 4 Fields
    struggleLabel: '难处与挣扎',
    struggleDefault: '无',
    strugglePlaceholder: '分享遇到的困难，或者保留为“无”...',

    blessingLabel: '数算恩典',
    blessingDefault: '我蒙上帝所爱',
    blessingPlaceholder: '今天有什么让您心存感激的事？',

    prayerLabel: '代祷事项',
    prayerDefault: '主祷文',
    prayerPlaceholder: '今天家人可以如何为您祷告？',

    aobLabel: '其他事项',
    aobOptional: '（选填）',
    aobPlaceholder: '家庭行程、问候或备忘事项...',

    // Devotion
    dailyDevotionBadge: '每日归正灵修',
    prayerBadge: '祷告',

    // Buttons
    resetDefaults: '恢复默认值',
    submitCheckIn: '立即签到',
    submitting: '提交中...',
    viewInHistory: '前往历史记录查看 →',
    checkInSuccess: '您的签到已记录成功！感谢您与家人的分享。',

    // History Page
    historyTitle: '家庭签到历史',
    historySubtitle: '浏览家人的点滴分享，同心感恩并彼此代祷鼓励。',
    addCheckInBtn: '+ 发布签到',
    noCheckInsTitle: '暂无家庭签到记录',
    noCheckInsDesc: '成为今天第一个分享心声的家人吧！只需几秒钟即可让全家安心。',
    postFirstCheckIn: '发布第一条签到',
    devotionAccordion: '灵修摘录',
    edit: '编辑',
    delete: '删除',
    deleteConfirm: '您确定要删除这条签到记录吗？',
    deleteSuccess: '签到记录已成功删除。',

    // Edit Page
    editEntryTitle: '编辑您的签到',
    editEntrySubtitle: '正在编辑签到者',
    recordedOn: '记录于',

    // Admin Page
    adminPanelTitle: 'Brand New Everyday - 管理员面板',
    websiteSettings: '网站设置',
    comingSoon: '敬请期待',
    addUserTitle: '添加新用户',
    addUserDesc: '为家人创建新账户，配置密码及默认语言。',
    username: '用户名',
    password: '密码',
    makeAdmin: '设为管理员',
    defaultLanguage: '默认语言',
    addUserBtn: '添加用户',
    userManagementTitle: '用户管理',
    userManagementDesc: '管理用户ID、首选语言、用户名、密码或删除用户。',
    role: '角色',
    changeUsername: '更改用户名',
    resetPassword: '重置密码',
    preferredLang: '语言设置',
    change: '更改',
    reset: '重置',
    saveLang: '保存',
    actions: '操作',

    // Inactivity Message
    loggedOutInactivity: '因闲置达10分钟已为您自动安全退出登录',
  },
};

export function resolveLang(cookies: any, userPreferred?: string | null): Lang {
  // 1. Check cookie 'site_lang'
  const cookieLang = cookies?.get ? cookies.get('site_lang')?.value : cookies?.site_lang;
  if (cookieLang === 'en' || cookieLang === 'id' || cookieLang === 'zh') {
    return cookieLang as Lang;
  }

  // 2. Check user's preferred language from DB
  if (userPreferred === 'en' || userPreferred === 'id' || userPreferred === 'zh') {
    return userPreferred as Lang;
  }

  // 3. Fallback to English
  return 'en';
}

export function getTranslations(lang: Lang) {
  return translations[lang] || translations.en;
}
