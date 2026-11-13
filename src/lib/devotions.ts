export interface Devotion {
  id: number;
  title: string;
  passage: string;
  scriptureText: string;
  reflection: string;
  prayer: string;
}

export const REFORMED_DEVOTIONS: Devotion[] = [
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
];

export function getDailyDevotion(date: Date = new Date()): Devotion {
  // Use day of year to deterministically cycle through devotions so all family members share the same devotion on a given date
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const index = Math.abs(dayOfYear) % REFORMED_DEVOTIONS.length;
  return REFORMED_DEVOTIONS[index];
}
