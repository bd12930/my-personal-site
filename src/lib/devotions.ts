import type { Lang } from './i18n';

export interface Devotion {
  id: number;
  title: string;
  passage: string;
  scriptureText: string;
  reflection: string;
  prayer: string;
}

export const REFORMED_DEVOTIONS_MULTI: Record<Lang, Devotion[]> = {
  en: [
    {
      id: 1,
      title: "God's Sovereign Care in Ordinary Days",
      passage: "Romans 8:28",
      scriptureText: "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
      reflection: "In the Reformed faith, we rest in the sweet truth of divine providence. God does not merely observe our family from afar; He actively and lovingly governs every detail of our lives—our joys, our quiet moments, and our unseen struggles. Nothing that touches you today is an accident or beyond His gracious purpose. You can step forward with peace, knowing the Sovereign Lord of heaven and earth is working all things for your ultimate good and His glory.",
      prayer: "Heavenly Father, anchor my heart in Your sovereign wisdom today. Teach our family to trust Your hand even when we cannot trace Your ways, knowing that in Christ, we are held securely forever. Amen."
    },
    {
      id: 2,
      title: "Unshakable Union with Christ",
      passage: "John 15:5",
      scriptureText: "I am the vine; you are the branches. Whoever abides in me and I in him, he it is that bears much fruit, for apart from me you can do nothing.",
      reflection: "Our acceptance and strength before God do not rise and fall with how successful or energetic we feel today. Through the Holy Spirit, we are united to Jesus Christ—a bond stronger than any hardship or weakness. When you feel tired or anxious, remember that the righteous life of Christ is credited to you, and His resurrected life supplies all the strength you need to love and serve your family today.",
      prayer: "Lord Jesus, thank You that my life is hidden with You in God. Help me abide in Your grace, draw strength from Your fullness, and reflect Your gentle love to my loved ones throughout this day. Amen."
    },
    {
      id: 3,
      title: "The Tender Providence of Our Father",
      passage: "Heidelberg Catechism Q&A 27 & Matthew 10:29-31",
      scriptureText: "Fear not, therefore; you are of more value than many sparrows.",
      reflection: "The Heidelberg Catechism beautifully reminds us of providence: 'The almighty and everywhere present power of God, whereby He upholds and governs heaven, earth, and all creatures; so that herbs and grass, rain and drought, fruitful and barren years, food and drink, health and sickness, riches and poverty, yea, and all things come, not by chance, but by His fatherly hand.' Whatever your schedule holds today, remember you are watched over by a Father who numbers every hair on your head.",
      prayer: "Almighty God and tender Father, thank You that our family's times are in Your hands. Grant us gratitude in prosperity, patience in adversity, and unwavering trust for tomorrow. Amen."
    },
    {
      id: 4,
      title: "Grace Greater Than All Our Weakness",
      passage: "2 Corinthians 12:9",
      scriptureText: "My grace is sufficient for you, for my power is made perfect in weakness.",
      reflection: "We often feel the need to appear self-sufficient, but the gospel teaches us that God delights to display His power through our frailty. If you are carrying a hidden burden, feeling weary, or struggling with patience, do not hide from the Lord. Confess your need openly. Christ's grace is not merely enough to get by—it is boundless, inexhaustible, and ready to meet you right where you are.",
      prayer: "Gracious Savior, when my strength is small, remind me that Your grace is boundless. Teach me to boast in my weakness so that Your power may rest upon me and bless my household. Amen."
    },
    {
      id: 5,
      title: "The Covenant Faithfulness of God",
      passage: "Lamentations 3:22-23",
      scriptureText: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness.",
      reflection: "Because of God's everlasting covenant sealed by the blood of Christ, His steadfast love toward our family will never fail. Every morning brings a fresh supply of His mercies tailored for the challenges of this specific day. You do not have to live on yesterday's strength or borrow tomorrow's worries. Today has its own gift of God's faithful presence.",
      prayer: "Lord God of our fathers, great is Your faithfulness! Thank You for mercies that greet us fresh each dawn. Guard our family in body and soul, and keep our eyes fixed on Your promises. Amen."
    },
    {
      id: 6,
      title: "Resting in the Finished Work",
      passage: "Hebrews 4:9-10 & Matthew 11:28",
      scriptureText: "Come to me, all who labor and are heavy laden, and I will give you rest.",
      reflection: "Religion tells us to strive constantly to earn God's favor; the Reformed gospel proclaims the joyful good news that Christ has accomplished everything necessary for our salvation. We do not work to gain God's approval—we work from the secure foundation of being His beloved children. Take a deep breath today and rest in His completed righteousness on your behalf.",
      prayer: "Lord Jesus, I cast my heavy burdens at Your feet. Thank You for the true Sabbath rest found in Your finished work on the cross. Give my heart peace as I go about today's tasks. Amen."
    },
    {
      id: 7,
      title: "Walking by Faith in Daily Vocations",
      passage: "Colossians 3:23-24",
      scriptureText: "Whatever you do, work heartily, as for the Lord and not for men, knowing that from the Lord you will receive the inheritance as your reward. You are serving the Lord Christ.",
      reflection: "The Reformers recovered the sacred dignity of every lawful calling. Whether you are studying, working at a job, caring for family members, preparing a meal, or resting, you are doing holy work when done in faith. God sees every quiet act of service in our home and counts it precious. Offer your daily routine as a joyful sacrifice of praise to Christ.",
      prayer: "Father in heaven, consecrate every task of my hands today. May my labor, words, and quiet patience serve my family and bring honor to Your holy name. Amen."
    }
  ],

  id: [
    {
      id: 1,
      title: "Pemeliharaan Allah yang Berdaulat di Setiap Hari Biasa",
      passage: "Roma 8:28",
      scriptureText: "Kita tahu sekarang, bahwa Allah turut bekerja dalam segala sesuatu untuk mendatangkan kebaikan bagi mereka yang mengasihi Dia, yaitu bagi mereka yang terpanggil sesuai dengan rencana Allah.",
      reflection: "Dalam iman Reformed, kita beristirahat dalam manisnya kebenaran providensia ilahi. Allah tidak sekadar mengamati keluarga kita dari kejauhan; Dia secara aktif dan penuh kasih mengatur setiap segi kehidupan kita—sukacita, saat-saat hening, serta pergumulan tersembunyi kita. Tidak ada hal yang menyentuh hidupmu hari ini yang merupakan suatu kebetulan. Melangkahlah dengan damai, mengetahui bahwa Tuhan yang berdaulat atas langit dan bumi sedang mengerjakan segalanya demi kebaikanmu dan kemuliaan-Nya.",
      prayer: "Bapa di Surga, sauhkanlah hatiku dalam hikmat kedaulatan-Mu hari ini. Ajarlah keluarga kami untuk mempercayai tangan-Mu sekalipun kami belum memahami jalan-Mu, karena di dalam Kristus kami dipegang teguh selamanya. Amin."
    },
    {
      id: 2,
      title: "Persatuan yang Tak Tergoyahkan dengan Kristus",
      passage: "Yohanes 15:5",
      scriptureText: "Akulah pokok anggur dan kamulah ranting-rantingnya. Barangsiapa tinggal di dalam Aku dan Aku di dalam dia, ia berbuah banyak, sebab di luar Aku kamu tidak dapat berbuat apa-apa.",
      reflection: "Penerimaan dan kekuatan kita di hadapan Allah tidak naik turun berdasarkan perasaan atau keberhasilan kita hari ini. Melalui Roh Kudus, kita dipersatukan dengan Yesus Kristus—ikatan yang lebih kuat daripada kelemahan apa pun. Saat lelah atau cemas, ingatlah bahwa kebenaran Kristus telah diperhitungkan bagimu, dan kuasa kebangkitan-Nya menyediakan segala kekuatan yang kau butuhkan untuk mengasihi dan melayani keluargamu hari ini.",
      prayer: "Tuhan Yesus, terima kasih bahwa hidupku tersembunyi bersama-Mu di dalam Allah. Tolonglah aku untuk tinggal di dalam anugerah-Mu dan memancarkan kasih-Mu yang lembut kepada seluruh anggota keluarga hari ini. Amin."
    },
    {
      id: 3,
      title: "Pemeliharaan Bapa yang Lembut dan Nyata",
      passage: "Katekismus Heidelberg No. 27 & Matius 10:29-31",
      scriptureText: "Sebab itu janganlah kamu takut, karena kamu lebih berharga dari pada banyak burung pipit.",
      reflection: "Katekismus Heidelberg dengan indah merangkum providensia: 'Kekuatan Allah yang mahakuasa dan hadir di mana-mana, yang menopang serta memelihara langit, bumi, dan segala ciptaan; sehingga segala sesuatu datang bukan karena kebetulan, melainkan dari tangan Bapa kita yang pengasih.' Apa pun agendamu hari ini, ingatlah bahwa engkau dijaga oleh Bapa yang bahkan menghitung setiap helai rambut di kepalamu.",
      prayer: "Allah yang Mahakuasa dan Bapa yang penuh kelembutan, terima kasih bahwa waktu keluarga kami ada dalam genggaman tangan-Mu. Karuniakanlah rasa syukur di kala kelimpahan, kesabaran di kala kesukaran, dan iman teguh untuk hari esok. Amin."
    },
    {
      id: 4,
      title: "Anugerah yang Melampaui Segala Kelemahan",
      passage: "2 Korintus 12:9",
      scriptureText: "Cukuplah kasih karunia-Ku bagimu, sebab justru dalam kelemahanlah kuasa-Ku menjadi sempurna.",
      reflection: "Dunia menuntut kita untuk selalu tampak kuat, tetapi Injil mengajarkan bahwa Allah berkenan menyatakan kuasa-Nya justru di dalam kelemahan kita. Jika engkau sedang memikul beban berat, merasa letih, atau bergumul dengan kesabaran, janganlah bersembunyi dari Tuhan. Akuilah kebutuhanmu dengan jujur. Kasih karunia Kristus melimpah tanpa batas dan siap menyambutmu.",
      prayer: "Juruselamat yang penuh kemurahan, saat kekuatanku kecil, ingatkanlah bahwa anugerah-Mu tak bertepi. Biarlah kuasa-Mu diam di atasku dan memberkati rumah tangga kami. Amin."
    },
    {
      id: 5,
      title: "Kesetiaan Perjanjian Allah yang Kekal",
      passage: "Ratapan 3:22-23",
      scriptureText: "Tak berkesudahan kasih setia TUHAN, tak habis-habisnya rahmat-Nya, selalu baru tiap pagi; besar kesetiaan-Mu!",
      reflection: "Oleh karena perjanjian kekal yang dimeteraikan dengan darah Kristus, kasih setia Allah kepada keluarga kita tidak akan pernah goyah. Setiap fajar membawa persediaan rahmat baru yang dirancang khusus untuk tantangan hari ini. Engkau tidak perlu hidup memakai tenaga kemarin atau meminjam kekhawatiran esok hari. Nikmatilah hadirat Allah hari ini.",
      prayer: "Tuhan Allah kami, sungguh besar kesetiaan-Mu! Terima kasih atas rahmat-Mu yang senantiasa baru menyambut kami setiap pagi. Jagalah keluarga kami lahir dan batin. Amin."
    },
    {
      id: 6,
      title: "Beristirahat dalam Karya Kristus yang Sempurna",
      passage: "Ibrani 4:9-10 & Matius 11:28",
      scriptureText: "Marilah kepada-Ku, semua yang letih lesu dan berbeban berat, Aku akan memberi kelegaan kepadamu.",
      reflection: "Agama menuntut kita bekerja tanpa henti demi meraih perkenanan Allah; namun Injil Reformed memberitakan kabar sukacita bahwa Kristus telah menuntaskan segalanya bagi keselamatan kita. Kita tidak bekerja untuk mencari perkenanan, melainkan kita melayani dari rasa aman sebagai anak-anak Allah yang dikasihi. Tariklah napas lega dan beristirahatlah di dalam kebenaran Kristus.",
      prayer: "Tuhan Yesus, aku serahkan segala beban berat di bawah kaki-Mu. Terima kasih atas perhentian sejati dalam karya salib-Mu yang telah genap. Karuniakanlah damai sejahtera dalam hatiku hari ini. Amin."
    },
    {
      id: 7,
      title: "Berjalan dalam Iman Melalui Tugas Sehari-hari",
      passage: "Kolose 3:23-24",
      scriptureText: "Apapun juga yang kamu perbuat, perbuatlah dengan segenap hatimu seperti untuk Tuhan dan bukan untuk manusia. Kamu tahu, bahwa dari Tuhanlah kamu akan menerima bagian yang ditentukan bagimu sebagai upah. Kristus adalah tuan dan kamu hamba-Nya.",
      reflection: "Para Reformator mengembalikan martabat kudus dari setiap panggilan hidup sehari-hari. Baik engkau sedang belajar, bekerja di kantor, merawat anggota keluarga, memasak, maupun beristirahat—semuanya adalah ibadah kudus bila dikerjakan dalam iman. Allah melihat setiap pelayanan hening di rumah kita. Persembahkanlah rutinitas harimu sebagai korban syukur yang harum bagi Kristus.",
      prayer: "Bapa di Surga, kuduskanlah setiap pekerjaan tanganku hari ini. Kiranya setiap langkah, tutur kata, dan kesabaran kami menjadi berkat bagi keluarga dan memuliakan nama-Mu. Amin."
    }
  ],

  zh: [
    {
      id: 1,
      title: "上帝在寻常日子中的主权看顾",
      passage: "罗马书 8:28",
      scriptureText: "我们晓得万事都互相效力，叫爱上帝的人得益处，就是按他旨意被召的人。",
      reflection: "在归正信仰中，我们安歇在神圣护理的甜美真理之中。上帝绝非在遥远处冷眼旁观我们的家庭；祂亲切而满有爱心地掌管着我们生命的每一个细节——我们的喜乐、安静的时刻，以及不为人知的挣扎。今天临到你身上的任何事，绝非偶然，都在祂恩典的美意之中。你可以心存平安向前行，深知天地的主权之主正使万事互相效力，成就你的益处与祂的荣耀。",
      prayer: "天父，求祢今天将我的心锚定在祢主权的智慧中。教导我们的家庭，即便看不清前路，依然信靠祢慈爱的大手，深知在基督里我们永远稳妥。阿们。"
    },
    {
      id: 2,
      title: "与基督不可动摇的联合",
      passage: "约翰福音 15:5",
      scriptureText: "我是葡萄树，你们是枝子。常在我里面的，我也常在他里面，这人就多结果子；因为离了我，你们就不能做什么。",
      reflection: "我们在神面前的接纳与力量，并不随着我们今天的成败或感觉而起伏。藉着圣灵，我们与耶稣基督紧密联合——这纽带坚不可摧。当你感到疲倦或焦虑时，请记住，基督公义的生命已经归算给你，祂复活的大能必赐给你今天爱护家人所需的一切力量。",
      prayer: "主耶稣，感谢祢使我的生命与祢一同藏在上帝里面。求祢帮助我常住在祢的恩典中，从祢的丰盛里支取力量，在今天向家人流露祢温柔的爱。阿们。"
    },
    {
      id: 3,
      title: "天父温柔而真实的护理",
      passage: "海德堡要理问答第27问 & 马太福音 10:29-31",
      scriptureText: "所以，不要惧怕，你们比许多麻雀还贵重！",
      reflection: "海德堡要理问答优美地阐述了护理之工：“上帝无所不能、无所不在的能力，托住并掌管天地万物；以致草木、雨露、丰年、荒年、饮食、健康、疾病、富足、贫穷，这一切都不是出于偶然，而是出于天父慈爱的双亲之手。”无论你今天的日程如何，请记住，数过你头发的天父时刻在看顾着你。",
      prayer: "全能全善的天父，感谢祢将我们全家的光阴全然托在手中。赐我们在丰足中感恩，在逆境中间耐，对明天满怀无悔的信靠。阿们。"
    },
    {
      id: 4,
      title: "大过一切软弱的恩典",
      passage: "哥林多后书 12:9",
      scriptureText: "我的恩典够你用的，因为我的能力是在人的软弱上显得完全。",
      reflection: "世俗常教我们逞强自立，但福音教导我们，上帝乐意在我们的人性软弱中彰显祂的大能。如果你正承担重担、深感疲惫或缺乏耐心，切勿向主隐藏。坦然向祂祈求吧！基督的恩典绝非勉强糊口，而是丰盛无尽，时刻准备好在你的处境中扶持你。",
      prayer: "恩慈的救主，当我力不能胜时，求祢提醒我祢的恩典无边无际。愿祢的大能覆庇我，成为我们全家的祝福。阿们。"
    },
    {
      id: 5,
      title: "上帝永约的信实",
      passage: "耶利米哀歌 3:22-23",
      scriptureText: "我们不至消灭，是出于耶和华诸般的慈爱；是因他的怜悯不至断绝。每早晨，这都是新的；你的诚实极其广大！",
      reflection: "因着基督宝血所立定的永约，上帝对我们家庭坚定的爱永不止息。每个早晨都带来一份崭新的怜悯，专门应对今日的难处。你不必靠着昨天的力量度日，也不必透支明天的忧虑。欢喜领受上帝今天信实的同在吧。",
      prayer: "我们祖宗的上帝，祢的信实何其广大！感谢祢每个早晨用崭新的怜悯迎接我们。守护我们全家的身心灵，使我们定睛在祢的应许上。阿们。"
    },
    {
      id: 6,
      title: "安息在基督已完成的大工中",
      passage: "希伯来书 4:9-10 & 马太福音 11:28",
      scriptureText: "凡劳苦担重担的人可以到我这里来，我就使你们得安息。",
      reflection: "宗教教导我们不断苦修来换取上帝的悦纳；归正福音却宣告大喜的信息：基督已为我们的救赎成就了一切。我们不是为了博取神的喜悦而拼命，而是带着蒙爱儿女的尊贵身份坦然生活。深吸一口气，安息在基督为你完成的纯全公义中吧。",
      prayer: "主耶稣，我把一切沉重的负担卸在祢脚前。感谢祢在十字架上完成的大工，赐给我们真正的安息。求祢赐平安掌管我的心。阿们。"
    },
    {
      id: 7,
      title: "在日常天职中因信而行",
      passage: "歌罗西书 3:23-24",
      scriptureText: "无论做什么，都要从心里做，像是给主做的，不是给人做的，因你们知道从主那里必得着基业为赏赐；你们所事奉的乃是主基督。",
      reflection: "宗教改革重新恢复了每一项正当世俗职业的神圣尊严。无论你是学习、工作、料理家务、准备餐食还是休息，只要出于信心，都是圣洁的事奉。上帝看顾我们在家中所做每一个微小的付出。将你今天平淡的日常，作为喜乐的感恩祭献给基督。",
      prayer: "天上的父，求祢圣化我今天双手所做的一切工。愿我们的劳碌、言语与安静的耐心，服事身边的家人，荣耀祢的圣名。阿们。"
    }
  ]
};

export function getDailyDevotion(date: Date = new Date(), lang: Lang = 'en'): Devotion {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const list = REFORMED_DEVOTIONS_MULTI[lang] || REFORMED_DEVOTIONS_MULTI.en;
  const index = Math.abs(dayOfYear) % list.length;
  return list[index];
}
