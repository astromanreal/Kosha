
import type { LucideIcon } from "lucide-react";
import { BookOpen, Brain, Sun, Layers3D, HelpCircle, BookCopy, Zap, Users, Edit, GitBranch, Palette, BarChart3 } from "lucide-react"; // Added more icons

interface Quote {
  sanskrit: string;
  translation: string;
  context?: string; // Make context optional as some entries might not have it
  verse?: number | string; // Add verse number for Vivekachudamani and Varaha
  chapter?: number | string; // Add chapter for Varaha
}

interface ExternalResource {
  title: string;
  url: string;
}

interface KoshaSheath {
  name: string;
  translation: string;
  layer: number;
  description:string;
  attributes: string[];
}

interface PanchaKoshaInfo {
  description: string;
  sheaths: KoshaSheath[];
}

// Specific structure for Modern Yoga Literature's Pancha Kosha Application
interface KoshaApplicationDetail {
  description: string;
  modernPractices: string[];
}
interface PanchaKoshaApplication {
  AnnamayaKosha?: KoshaApplicationDetail;
  PranamayaKosha?: KoshaApplicationDetail;
  ManomayaKosha?: KoshaApplicationDetail;
  VijnanamayaKosha?: KoshaApplicationDetail;
  AnandamayaKosha?: KoshaApplicationDetail;
}

// For Vivekachudamani's specific structure
interface FourfoldQualifications {
  description: string;
  components: string[];
}
interface NatureOfSelf {
  description: string;
  attributes: string[];
}
interface JnanaYogaMethod {
  path: string;
  steps: string[];
}
interface VivekaCoreTeachings {
  fourfoldQualifications?: FourfoldQualifications;
  natureOfSelf?: NatureOfSelf;
  method?: JnanaYogaMethod;
  goal?: string;
}
interface TeacherAndStudentInfo {
  dialogueFormat?: boolean;
  teacher?: string;
  student?: string;
  symbolism?: string;
}

// For Varaha Upanishad's specific structure
interface VarahaStructure {
  chapters: number;
  dialogue: string;
}
interface VarahaKeyTeachings {
  natureOfReality?: { Brahman: string; Atman: string; Jagat: string; };
  stateOfLiberation?: { description: string; characteristics: string[]; };
  yogicIntegration?: { description: string; recommendedPractices: string[]; };
  roleOfGuru?: { importance: string; quote?: string; }; // Made quote optional
}
interface CosmicContext {
  deity: string;
  symbolism: string;
  receiver: string;
}
interface MetaphysicalInsights {
  illusion: string;
  freedom: string;
  nonDuality: string;
}


export interface TextInfo {
  slug: string; 
  title: string;
  icon: LucideIcon;
  description: string; 
  category: string;
  imageHint: string;
  origin: string;
  associatedVeda?: string;
  sections?: string[];
  purpose?: string;
  keyConcepts: string[];
  significance: string; 
  panchaKosha?: PanchaKoshaInfo;
  panchaKoshaDetails?: Record<string, string>; // Fallback
  panchaKoshaApplication?: PanchaKoshaApplication; // For Modern Yoga
  realizationPath?: { from: string; to: string; culminatesIn: string };
  relatedConcepts?: string[];
  quotes?: Quote[];
  externalResources?: ExternalResource[];
  structureDetails?: string;
  philosophicalSchool?: string;

  // Vivekachudamani specific
  translation?: string;
  author?: string;
  philosophy?: string;
  language?: string;
  verses?: number;
  primaryGoal?: string;
  coreTeachings?: VivekaCoreTeachings;
  teacherAndStudent?: TeacherAndStudentInfo;
  recommendedPractices?: string[]; // Also for Varaha

  // Varaha specific
  structure?: VarahaStructure; // Replaces structureDetails for Varaha
  coreThemes?: string[];
  keyTeachings?: VarahaKeyTeachings;
  cosmicContext?: CosmicContext;
  metaphysicalInsights?: MetaphysicalInsights;

  // Modern Yoga Literature specific
  majorContributors?: string[];
  philosophicalBase?: string;
  therapeuticApplications?: {
    yogaTherapy?: { description: string; uses: string[]; };
    ayurvedicIntegration?: { description: string; methods: string[]; };
  };
  teachingMethods?: {
    settings?: string[];
    media?: string[];
  };
  recommendedResourcesList?: { // Renamed to avoid conflict with externalResources
    books?: string[];
    organizations?: string[];
  };
  visualIllustration?: {
    concept?: string;
    layers?: string[];
    usage?: string;
  };
}


const slugify = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const textsSourceData: Array<Partial<TextInfo> & {title: string; origin: string; category: string; significance: string; keyConcepts: string[], imageHint: string; icon: LucideIcon; externalLinks?: Record<string, string>; selectedVerses?: Array<Partial<Quote> & {sanskrit: string; translation: string}> }> = [
  {
    title: "Taittiriya Upanishad",
    icon: Sun, 
    category: "Vedic Scripture",
    imageHint: "ancient script vedas",
    origin: "Krishna Yajurveda", 
    associatedVeda: "Krishna Yajurveda",
    sections: [
      "Shiksha Valli (Section on Instruction)",
      "Ananda Valli (Section on Bliss)",
      "Bhrigu Valli (Section on Bhrigu's Realization)"
    ],
    purpose: "To guide the seeker from gross to subtle realization of the Atman through progressive self-inquiry and understanding of the five sheaths (Pancha Koshas).",
    keyConcepts: [
      "Pancha Kosha framework as layers of existence",
      "Detailed description of the five sheaths in Ananda Valli",
      "Path to Atman (Self) realization by transcending the koshas",
      "Importance of food (Anna) and vital energy (Prana)",
      "Nature of Brahman as Satya (Truth), Jnana (Knowledge), Ananta (Infinite)"
    ],
    significance: "The Taittiriya Upanishad is a seminal text in Vedanta philosophy, renowned for its profound exposition of the Pancha Kosha theory. It meticulously guides the aspirant on an inward journey, peeling back layers of identification from the gross physical body (Annamaya) to the most subtle sheath of bliss (Anandamaya), ultimately revealing the true Self (Atman) as Brahman – pure, undifferentiated consciousness. Its teachings are crucial for understanding the layered nature of human existence and the Vedantic path to liberation (Moksha).",
    panchaKosha: {
      description: "The concept of Pancha Kosha (five sheaths) is central to the Taittiriya Upanishad, particularly in the Ananda Valli. It illustrates the progressive layers of human existence, from the gross physical body to the subtlest experience of bliss, ultimately leading to the Atman (true Self).",
      sheaths: [
        { name: "Annamaya Kosha", translation: "Sheath of Food", layer: 1, description: "The physical body, sustained by food. It includes the skin, bones, flesh, and all anatomical structures.", attributes: ["Gross body (Sthula Sharira)", "Subject to birth, growth, decay, and death", "Nourished by food (Anna) and elements", "Vehicle for interaction with the external world"] },
        { name: "Pranamaya Kosha", translation: "Sheath of Vital Energy", layer: 2, description: "The energy body made of prana (life force) that governs physiological functions such as respiration, circulation, and digestion. It animates the physical body.", attributes: ["Part of the subtle body (Sukshma Sharira)", "Composed of the five pranas (Prana, Apana, Vyana, Udana, Samana)", "Enables action and physiological processes", "Bridge between Annamaya and Manomaya Koshas"] },
        { name: "Manomaya Kosha", translation: "Sheath of Mind", layer: 3, description: "The mental layer composed of thoughts, emotions, memories, and sensory processing. It includes the instinctive and reactive mind.", attributes: ["Part of the subtle body (Sukshma Sharira)", "Seat of the senses (Indriyas) and desires (Kama)", "Source of thoughts, feelings, doubts, and imagination", "Associated with dualities (like/dislike, joy/sorrow)", "Forms identity and ego sense (Ahamkara)"] },
        { name: "Vijnanamaya Kosha", translation: "Sheath of Intellect/Wisdom", layer: 4, description: "The sheath of wisdom, intellect, and discrimination (Viveka). Responsible for insight, judgment, decision-making, and spiritual discernment.", attributes: ["Part of the subtle body (Sukshma Sharira)", "Facilitates inner clarity and discrimination", "Enables deeper understanding and intuitive knowledge", "Governs will (Sankalpa), ethics, and higher reasoning", "Bridge between the mind and the experience of bliss"] },
        { name: "Anandamaya Kosha", translation: "Sheath of Bliss", layer: 5, description: "The subtlest sheath, associated with bliss, peace, and pure joy. It envelops the Atman and is experienced most clearly in deep sleep and Samadhi (deep meditation).", attributes: ["Causal body (Karana Sharira)", "Closest to the Atman (Self)", "Experienced as causeless joy, love, and contentment", "Free from duality and active thought", "Still a veil, as it contains individuality until true Self-realization"] }
      ]
    },
    realizationPath: { from: "Gross physical identification (Annamaya Kosha)", to: "Subtle experience of bliss (Anandamaya Kosha)", culminatesIn: "Realization of Atman, the unchanging, eternal Self, as Brahman" },
    relatedConcepts: ["Atman (Individual Self)", "Brahman (Supreme Reality/Absolute Consciousness)", "Self-inquiry (Atma Vichara)", "Vedantic psychology and cosmology", "The nature of consciousness", "Moksha (Liberation)"],
    selectedVerses: [ // Mapped to quotes
      { sanskrit: "ब्रह्मविदाप्नोति परम् । तदेषाऽभ्युक्ता । सत्यं ज्ञानमनन्तं ब्रह्म ।", translation: "The knower of Brahman attains the Supreme. Regarding this, it has been declared: Brahman is Truth, Knowledge, Infinity.", context: "Ananda Valli, introducing the nature of Brahman." },
      { sanskrit: "आनन्दो ब्रह्मेति व्यजानात् । आनन्दाद्ध्येव खल्विमानि भूतानि जायन्ते । आनन्देन जातानि जीवन्ति । आनन्दं प्रयन्त्यभिसंविशन्तीति ।", translation: "He knew Bliss as Brahman. For, indeed, from Bliss, truly, are these beings born. By Bliss, when born, do they live. Into Bliss (on departing) do they enter.", context: "Bhrigu Valli, Bhrigu's ultimate realization about Brahman." },
      { sanskrit: "स यो ह वै तदन्यतर आत्मा आनन्दमयः", translation: "This indeed is the Self consisting of bliss (Anandamaya Atma).", context: "From Ananda Valli, identifying the deepest sheath enveloping the Self." }
    ],
    externalLinks: { // Mapped to externalResources
        "Sacred Texts - Taittiriya Upanishad": "https://www.sacred-texts.com/hin/upanishads/taittiriya.htm",
        "Swami Krishnananda - Commentary": "https://www.swami-krishnananda.org/taittiriya/index.html",
        "Wikipedia - Taittiriya Upanishad": "https://en.wikipedia.org/wiki/Taittiriya_Upanishad"
    }
  },
  {
    title: "Vivekachudamani",
    icon: BookOpen,
    category: "Advaita Vedanta Treatise",
    imageHint: "philosophy scroll adi shankaracharya",
    origin: "Adi Shankaracharya",
    author: "Adi Shankaracharya",
    translation: "Crest-Jewel of Discrimination",
    philosophy: "Advaita Vedanta",
    language: "Sanskrit",
    verses: 580,
    primaryGoal: "To guide the aspirant toward Self-realization through discrimination (viveka) and renunciation (vairagya).",
    keyConcepts: ["Viveka: Discrimination between the eternal (Atman/Brahman) and non-eternal (phenomenal world).", "Vairagya: Detachment from ephemeral worldly pleasures and attachments.", "Shatsampatti: Cultivation of six-fold inner wealth (śama, dama, uparati, titikṣā, śraddhā, samādhāna).", "Mumukshutva: Intense longing and aspiration for liberation (Moksha).", "Self-realization as identical with Brahman (non-dual consciousness).", "Importance of a Guru and direct experience (Anubhava) for liberation.", "Nature of Self (Atman) as pure, eternal, self-luminous, and witness to the three states.", "Method of Jnana Yoga: Shravana (listening), Manana (reflection), Nididhyasana (meditation)."],
    significance: "A step-by-step spiritual manual emphasizing inner purification, philosophical inquiry, and direct realization of the non-dual Self (Atman = Brahman). Vivekachudamani systematically expounds the path to Self-realization. It meticulously differentiates the eternal Self (Atman) from the non-Self (Anatman), which includes the five koshas. The text emphasizes that true liberation comes from recognizing one's identity with Brahman, transcending the illusory superimpositions of the body, mind, and ego. It is a dialogue between a Guru and a disciple, detailing the qualifications required for a seeker and the nature of reality.",
    panchaKoshaDetails: { "Introduction": "The Vivekachudamani elaborates on the Pancha Koshas as layers of ignorance (Avidya) that veil the Atman.", "Annamaya Kosha (Food Sheath)": "Described as the gross body, a product of food, and perishable.", "Pranamaya Kosha (Vital Air Sheath)": "The vital force that animates the body, associated with the five Pranas and organs of action.", "Manomaya Kosha (Mental Sheath)": "Comprises the mind (Manas) and organs of perception, responsible for thoughts, desires, and emotions.", "Vijnanamaya Kosha (Intellectual Sheath)": "The sheath of intellect (Buddhi) and agency, associated with discrimination and decision-making.", "Anandamaya Kosha (Bliss Sheath)": "The causal body, reflecting a conditioned form of bliss derived from good deeds; it is still a covering over the true, unconditioned Bliss of Atman.", "Transcending the Koshas": "The text asserts that the Atman is the witness (Sakshi) of all five koshas and is untainted by them. True wisdom lies in negating these sheaths (Neti Neti - 'not this, not this') to realize the Self." },
    relatedConcepts: ["Viveka (Discrimination)", "Vairagya (Detachment)", "Shatsampatti (Six Virtues)", "Mumukshutva (Desire for Liberation)", "Atman/Brahman", "Maya (Illusion)", "Moksha (Liberation)", "Jnana Yoga", "Guru", "Sakshi (Witness Consciousness)"],
    selectedVerses: [ // Mapped to quotes
      { verse: 11, sanskrit: "दुर्लभं त्रयमेवैतद्दैवानुग्रहहेतुकम्। मनुष्यत्वं मुमुक्षुत्वं महापुरुषसंश्रयः॥", translation: "Three things are indeed rare and attained only by the grace of God: human birth, intense desire for liberation, and the guidance of a realized teacher.", context: "Verse 11, highlighting requisites for spiritual path." },
      { verse: 23, sanskrit: "मुक्त्यै प्रयत्नो विधेयः", translation: "One must make deliberate effort for liberation.", context: "Verse 23, emphasizing self-effort." },
      { verse: 254, sanskrit: "ब्रह्म सत्यं जगन्मिथ्या जीवो ब्रह्मैव नापरः।", translation: "Brahman is real; the world is an illusion; the individual soul is not different from Brahman.", context: "Verse 254, summarizing Advaita Vedanta's core tenet." },
      { verse: 276, sanskrit: "आत्मा चिदानन्दरूपः", translation: "The Self is of the nature of pure consciousness and bliss.", context: "Verse 276, describing the nature of Atman." }
    ],
    externalLinks: { // Mapped to externalResources
      "Sacred Texts - Vivekachudamani": "https://www.sacred-texts.com/hin/vch/index.htm",
      "Swami Krishnananda - Vivekachudamani Commentary": "https://www.swami-krishnananda.org/vivekachudamani/vc_1.html",
      "Wikipedia - Vivekachudamani": "https://en.wikipedia.org/wiki/Vivekachudamani"
    },
    structureDetails: "A poetic work of 580 verses, structured as a dialogue between a Guru (Realized Master) and a Mumukshu (Seeker of Liberation).",
    philosophicalSchool: "Advaita Vedanta",
    coreTeachings: {
      fourfoldQualifications: { description: "Essential qualities (Sādhana Chatuṣṭaya) required for Self-inquiry", components: ["Viveka: Discrimination between the eternal (nitya) and non-eternal (anitya)", "Vairagya: Renunciation of pleasures of this and other worlds", "Shatsampatti: Six virtues (śama, dama, uparati, titikṣā, śraddhā, samādhāna)", "Mumukshutva: Intense longing for liberation (moksha)"] },
      natureOfSelf: { description: "The Self (Atman) is pure, eternal, self-luminous, and identical with Brahman. Realization of this Self is the goal of human life.", attributes: ["Not the body, senses, mind, or intellect", "Witness of the three states (waking, dreaming, deep sleep)", "Ever-free, unattached, non-dual"] },
      method: { path: "Jnana Yoga (Path of Knowledge)", steps: ["Shravana (listening to scriptural teachings)", "Manana (reflecting upon them)", "Nididhyasana (deep meditation on the truth)"] },
      goal: "Liberation (Moksha) through Self-knowledge and dissolution of the ego."
    },
    teacherAndStudent: { dialogueFormat: true, teacher: "Guru (Realized Master)", student: "Mumukshu (Seeker of Liberation)", symbolism: "The dialogue represents the transmission of Advaitic wisdom from teacher to disciple." },
    recommendedPractices: ["Daily reflection on the Self", "Detachment from sensory pleasures", "Association with the wise (satsang)", "Meditation on Brahman"]
  },
  {
    title: "Varaha Upanishad",
    icon: BookCopy,
    category: "Minor Upanishad (Vaishnava, Yoga)",
    imageHint: "vedic text varaha boar",
    origin: "Krishna Yajurveda, Vaishnava tradition",
    associatedVeda: "Krishna Yajurveda",
    purpose: "To elucidate the path to liberation (Moksha) through a synthesis of Advaita Vedanta and Yogic practices, focusing on the nature of the Self (Atman) and its identity with Brahman.",
    keyConcepts: ["Nature of the Self (Atman) as identical to Brahman (Non-duality)", "Yoga (Jnana, Raja, elements of Bhakti) as a path to liberation", "Illusion of duality (Maya) and its transcendence", "Role of Guru in spiritual progress", "Achieving the state of Jivanmukta (liberated while living)", "Brahman as the one, non-dual, unchanging reality", "Atman as the inner Self, identical with Brahman", "Jagat (World) as a temporary, illusory projection due to ignorance (avidya)", "Liberation (moksha) is realizing Atman-Brahman identity", "Freedom from desires and ego in liberation", "Meditation on the formless Brahman and silence (Mauna)", "Renunciation of worldly attachments", "Company of enlightened beings (Satsang)", "Importance of Guru for Self-realization", "Metaphysics of Maya and freedom through knowledge", "Varaha symbolism: divine power lifting soul from ignorance"],
    significance: "The Varaha Upanishad, a minor Upanishad associated with the Krishna Yajurveda, uniquely fuses Vedantic metaphysics with yogic discipline. Presented as a dialogue between Lord Varaha (Vishnu's boar avatar) and Sage Ribhu, it offers practical and philosophical teachings for attaining Self-realization. It explores the non-dual nature of reality (Brahman), the identity of the individual Self (Atman) with Brahman, and the illusory nature of the phenomenal world (Maya). The text details various yogic practices, including pranayama and meditation on Om, as means to purify the mind and realize the Self. It also emphasizes the importance of a Guru and the characteristics of a Jivanmukta (one liberated while living).",
    panchaKoshaDetails: { "Implied Layering": "While not using the exact Pancha Kosha terminology, the Upanishad discusses the physical body's composition (e.g., skin, blood, flesh) and the vital airs (Pranas), which aligns with the concepts of Annamaya and Pranamaya koshas.", "Yogic Purification": "The text emphasizes yogic practices for purifying the body and mind, which is essential for transcending identification with the lower koshas and realizing higher states of consciousness." },
    selectedVerses: [ // Mapped to quotes
      { chapter: 1, sanskrit: "यदा सर्वे प्रमुच्यन्ते कामा येऽस्य हृदि श्रिताः। अथ मर्त्योऽमृतो भवति अत्र ब्रह्म समश्नुते॥", translation: "When all desires dwelling in the heart fall away, then the mortal becomes immortal and attains Brahman.", context: "Chapter 1, on liberation through desirelessness." },
      { chapter: 3, sanskrit: "ज्ञात्वा ब्रह्म ततः पश्येत् सर्वं ब्रह्ममयं जगत्।", translation: "Having realized Brahman, one sees the entire world as filled with Brahman.", context: "Chapter 3, on the vision of a realized soul." }
    ],
    externalLinks: { // Mapped to externalResources
      "Varaha Upanishad Text (Wisdomlib)": "https://www.wisdomlib.org/hinduism/book/varaha-upanishad",
      "Swami Krishnananda - Varaha Commentary": "https://www.swami-krishnananda.org/varaha/varaha_01.html"
    },
    structure: { chapters: 5, dialogue: "Lord Varaha and Sage Ribhu" },
    philosophicalSchool: "Advaita Vedanta with Yogic Integration (Vaishnava influence)",
    coreThemes: ["Nature of the Self (Atman)", "Yoga as a path to liberation", "Illusion of duality (Maya)", "Role of Guru in spiritual progress", "Unity of Brahman and Atman"],
    keyTeachings: { natureOfReality: { Brahman: "The one, non-dual, unchanging reality, beyond time and causality.", Atman: "The inner Self, identical with Brahman.", Jagat: "A temporary, illusory projection due to ignorance (avidya)." }, stateOfLiberation: { description: "Liberation (moksha) is the realization of the identity of Atman and Brahman, resulting in freedom from birth-death cycles.", characteristics: ["Freedom from desires and ego", "Oneness with cosmic consciousness", "Unshakable bliss and peace"] }, yogicIntegration: { description: "The text integrates Jnana Yoga (knowledge), Raja Yoga (meditation), and some elements of Bhakti Yoga.", recommendedPractices: ["Meditation on the formless Brahman", "Silence and inner absorption (Mauna and Samadhi)", "Renunciation of worldly attachments", "Company of enlightened beings"] }, roleOfGuru: { importance: "The Guru is essential for imparting knowledge that leads to Self-realization.", quote: "Only through the grace of the Guru can one cross the ocean of delusion." } },
    cosmicContext: { deity: "Lord Varaha (the Boar incarnation of Vishnu)", symbolism: "Varaha symbolizes the divine power that lifts the soul out of ignorance (earth from cosmic waters).", receiver: "Sage Ribhu, representing the awakened intellect and spiritual maturity." },
    metaphysicalInsights: { illusion: "The Upanishad explains how Maya veils the truth and causes one to identify with body and ego.", freedom: "Freedom is attained not through rituals but through right knowledge and detachment.", nonDuality: "There is no real multiplicity; all is Brahman alone." }
  },
  {
    title: "Modern Yoga Literature",
    icon: Brain, 
    category: "Contemporary Yoga & Ayurveda",
    imageHint: "yoga books modern",
    origin: "Works by 20th and 21st-century Yoga and Ayurveda masters (e.g., Swami Sivananda, B.K.S. Iyengar, Swami Rama, Dr. Vasant Lad).",
    keyConcepts: ["Practical application of Pancha Kosha theory to holistic health and well-being.", "Integration of physical, energetic, mental, intellectual, and spiritual dimensions in therapy and personal development.", "Koshas as a map for understanding health, disease, and the path to balance.", "Specific practices (asana, pranayama, meditation, diet, lifestyle) tailored to each kosha."],
    significance: "Modern yoga and Ayurveda literature has made the ancient Pancha Kosha framework accessible and highly relevant for contemporary life. These teachings translate profound philosophical concepts into practical tools for self-healing, stress management, emotional balance, and spiritual growth. They emphasize that true well-being arises from nurturing and harmonizing all five layers of our existence, offering a holistic alternative or complement to purely physical or psychological approaches to health.",
    panchaKoshaApplication: { 
      AnnamayaKosha: { description: "Physical sheath sustained by food and physical activity.", modernPractices: ["Balanced diet based on Ayurvedic principles", "Asana practice tailored to body type and conditions", "Daily routine (Dinacharya) and seasonal regimens (Ritucharya)"] },
      PranamayaKosha: { description: "Energy sheath managing prana (vital life force).", modernPractices: ["Pranayama techniques (e.g., Nadi Shodhana, Bhramari)", "Kriyas (e.g., Kapalabhati, Trataka) for purification", "Ayurvedic breath-balancing techniques and herbs"] },
      ManomayaKosha: { description: "Mind sheath related to thoughts, emotions, and sensory input.", modernPractices: ["Mindfulness meditation (Vipassana, Yoga Nidra)", "Mantra chanting for emotional balance", "Journaling and emotional intelligence techniques"] },
      VijnanamayaKosha: { description: "Wisdom sheath connected to intellect, discernment, and values.", modernPractices: ["Scriptural studies (e.g., Gita, Upanishads)", "Self-inquiry (Atma-vichara as taught by Ramana Maharshi)", "Cognitive restructuring and yogic ethics (Yama-Niyama)"] },
      AnandamayaKosha: { description: "Bliss sheath — the deepest, most subtle layer of being.", modernPractices: ["Devotional practices (Bhakti Yoga)", "Deep meditation (Dhyana and Samadhi)", "Seva (selfless service) and gratitude cultivation"] }
    },
    relatedConcepts: ["Holistic Health", "Yoga Therapy", "Mind-Body Medicine", "Stress Management", "Mindfulness", "Spiritual Psychology", "Ayurvedic Lifestyle"],
    majorContributors: ["Swami Sivananda", "B.K.S. Iyengar", "T.K.V. Desikachar", "Swami Satyananda Saraswati", "Dr. Vasant Lad"],
    philosophicalBase: "Pancha Kosha Model from Taittiriya Upanishad",
    therapeuticApplications: { yogaTherapy: { description: "Modern yoga therapists assess imbalances in koshas and apply practices accordingly.", uses: ["Stress and anxiety reduction", "Chronic pain and illness management", "Psychospiritual growth and trauma healing"] }, ayurvedicIntegration: { description: "Combines kosha-based yoga practices with Ayurvedic dosha balancing.", methods: ["Herbal remedies", "Lifestyle alignment with Prakriti (constitution)", "Diet and detoxification (Panchakarma)"] } },
    teachingMethods: { settings: ["Wellness centers", "Yoga teacher training programs", "Clinical therapy environments", "Online spiritual coaching"], media: ["Books and manuals", "Multimedia courses", "Workshops and retreats", "Medical-yogic integrative platforms"] },
    recommendedResourcesList: { books: ["The Science of Yoga by Swami Sivananda", "Light on Yoga by B.K.S. Iyengar", "Yoga and Ayurveda by Dr. David Frawley", "Asana Pranayama Mudra Bandha by Swami Satyananda Saraswati"], organizations: ["Bihar School of Yoga", "Krishnamacharya Yoga Mandiram", "Iyengar Yoga Institutes", "Ayurveda Institute (USA)"] },
    visualIllustration: { concept: "Modern Kosha Wheel", layers: ["Outer ring: Annamaya — Physical well-being", "Second ring: Pranamaya — Breath and vitality", "Middle ring: Manomaya — Mind and emotions", "Inner ring: Vijnanamaya — Intellect and values", "Center: Anandamaya — Bliss and spiritual essence"], usage: "Used in yoga therapy sessions and teaching to visually map healing across dimensions" },
    externalResources: [ // Example, actual external links can be added here
        { title: "Yogapedia - Kosha", url: "https://www.yogapedia.com/definition/5219/kosha" },
        { title: "Himalayan Institute - The Five Koshas", url: "https://www.himalayaninstitute.org/yoga-international-magazine/wisdom-traditions/the-five-koshas/" }
    ]
  }
];

export const texts: TextInfo[] = textsSourceData.map(item => {
  const slug = slugify(item.title);
  let shortDesc = item.significance || "Explore the wisdom of this ancient text.";
  if (shortDesc.length > 180) { 
    shortDesc = shortDesc.substring(0, 177) + "...";
  }

  // Convert externalLinks to externalResources format
  const externalResources: ExternalResource[] = [];
  if (item.externalLinks) {
    for (const [title, url] of Object.entries(item.externalLinks)) {
      externalResources.push({ title, url });
    }
  }
  // Also add any existing item.externalResources
  if (item.externalResources) {
    externalResources.push(...item.externalResources);
  }
  

  // Convert selectedVerses to quotes format
  const quotes: Quote[] = [];
  if (item.selectedVerses) {
    item.selectedVerses.forEach(verse => {
      quotes.push({
        sanskrit: verse.sanskrit,
        translation: verse.translation,
        context: verse.context,
        verse: verse.verse, // Assuming selectedVerses can have verse/chapter
        chapter: verse.chapter,
      });
    });
  }


  return {
    ...item,
    slug,
    description: shortDesc,
    externalResources: externalResources.length > 0 ? externalResources : undefined,
    quotes: quotes.length > 0 ? quotes : undefined,
  } as TextInfo; // Cast to TextInfo to satisfy TypeScript
});

export const getTextBySlug = (slug: string): TextInfo | undefined => {
  return texts.find(text => text.slug === slug);
};
