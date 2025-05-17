
import type { LucideIcon } from 'lucide-react';
import { BookOpen, Wind, Flame, GraduationCap, ClipboardList, CheckCircle, Edit3, BrainCircuit, Vegan, Yoga as YogaIconLucide, Lightbulb, Sparkles } from 'lucide-react'; // Added Sparkles

export interface ModuleDay {
  dayNumber: number;
  title: string;
  content: string; // Markdown-like content
  practiceSuggestion?: string;
  reflectionPrompt?: string;
}

export interface LearningModuleInfo {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  iconName: string;
  category: string; // e.g., Pranayama, Ayurveda, Koshas, Yoga Philosophy
  durationEstimate: string; // e.g., "7 Days", "3 Hours"
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels' | 'Beginner-Friendly';
  coverImage: string; // URL for placeholder image
  imageHint: string;
  days: ModuleDay[];
}

export const slugify = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const learningModulesSourceData: Omit<LearningModuleInfo, 'slug'>[] = [
  {
    title: "7-Day Introduction to Pranayama",
    description: "Learn foundational pranayama techniques to enhance vitality and calm the mind over seven days.",
    longDescription: "Embark on a week-long journey to explore the power of your breath. This module introduces fundamental pranayama (yogic breathing) techniques, guiding you daily to understand their benefits, practice them safely, and integrate them into your routine for increased energy, mental clarity, and emotional balance. Perfect for beginners or those looking to deepen their breath awareness.",
    iconName: "Wind",
    category: "Pranayama",
    durationEstimate: "7 Days (15-20 mins/day)",
    difficulty: "Beginner",
    coverImage: "https://i.pinimg.com/736x/76/cc/69/76cc69943ebb25cd2cec4b07e40841ff.jpg",
    imageHint: "meditation pranayama yoga",
    days: [
      {
        dayNumber: 1,
        title: "Understanding Prana & Conscious Breathing",
        content: "Welcome! Today we explore Prana, the vital life force. Learn about the importance of breath in yogic philosophy and begin with simple diaphragmatic breathing. \n\n**What is Prana?**\nPrana is more than just breath; it's the fundamental energy that sustains all life. It flows through channels called nadis and is concentrated in energy centers called chakras.\n\n**Diaphragmatic Breathing (Belly Breathing):**\n1. Sit or lie comfortably.\n2. Place one hand on your chest and the other on your belly.\n3. Inhale slowly through your nose, feeling your belly expand while your chest remains relatively still.\n4. Exhale slowly, feeling your belly contract.\n5. Repeat for 5-10 minutes.",
        practiceSuggestion: "Practice diaphragmatic breathing for 5 minutes, twice today.",
        reflectionPrompt: "How did focusing on your belly breath make you feel?"
      },
      {
        dayNumber: 2,
        title: "Nadi Shodhana (Alternate Nostril Breathing) - Part 1",
        content: "Today, we introduce Nadi Shodhana, a powerful balancing pranayama. It helps purify energy channels and calm the nervous system.\n\n**Technique (Simplified):**\n1. Sit comfortably with a straight spine.\n2. Close your right nostril with your right thumb. Inhale slowly and deeply through your left nostril.\n3. Close your left nostril with your ring finger, release the thumb, and exhale slowly through your right nostril.\n4. Inhale through your right nostril.\n5. Close your right nostril, release the left, and exhale through your left nostril. This completes one round.\n6. Repeat for 3-5 rounds.",
        practiceSuggestion: "Practice 3-5 rounds of Nadi Shodhana. Focus on smooth, even breaths.",
        reflectionPrompt: "Did you notice any difference between breathing through your left and right nostrils?"
      },
      {
        dayNumber: 3,
        title: "Ujjayi Pranayama (Victorious Breath)",
        content: "Discover Ujjayi, the 'ocean breath,' known for its calming and warming effects. It's often used during asana practice.\n\n**Technique:**\n1. Sit tall. Gently constrict the back of your throat (like fogging a mirror, but with mouth closed).\n2. Inhale and exhale slowly through your nose, creating a soft, audible 'ocean' sound in your throat.\n3. Keep the sound smooth and consistent on both inhale and exhale.\n4. Practice for 5-10 minutes.",
        practiceSuggestion: "Try Ujjayi breath for 5 minutes. Notice the sound and sensation.",
        reflectionPrompt: "How did the Ujjayi breath affect your state of mind?"
      },
      {
        dayNumber: 4,
        title: "Integrating Pranayama with Awareness",
        content: "Today's focus is on bringing mindful awareness to your breath throughout the day, not just during formal practice. \n\n**Tips:**\n- Set reminders to check in with your breath.\n- Notice how emotions affect your breathing pattern.\n- Use a few conscious breaths to center yourself during stressful moments.",
        practiceSuggestion: "Set 3 alarms today. When an alarm goes off, pause and take 5 conscious diaphragmatic breaths.",
        reflectionPrompt: "What did you observe when you consciously checked in with your breath today?"
      },
      {
        dayNumber: 5,
        title: "Bhramari Pranayama (Bee Breath)",
        content: "Explore Bhramari, a calming pranayama that soothes the nervous system and can relieve stress and anxiety.\n\n**Technique:**\n1. Sit comfortably. Close your eyes gently.\n2. Place your index fingers on your ear cartilage, gently pressing to close the ears.\n3. Inhale deeply through your nose.\n4. As you exhale, make a soft, continuous humming sound like a bee, keeping your mouth closed.\n5. Continue for 5-7 rounds.",
        practiceSuggestion: "Practice 5-7 rounds of Bhramari. Feel the vibrations.",
        reflectionPrompt: "How did the humming sound of Bhramari make you feel?"
      },
      {
        dayNumber: 6,
        title: "Review and Extended Nadi Shodhana",
        content: "Let's revisit Nadi Shodhana and extend the practice.\n\n**Review Nadi Shodhana Technique.**\nAim for smooth, longer breaths. You can try a count for inhale and exhale (e.g., inhale for 4, exhale for 6).\n\n**Practice:**\nPerform 7-10 rounds of Nadi Shodhana.",
        practiceSuggestion: "Practice 7-10 rounds of Nadi Shodhana, focusing on a steady rhythm.",
        reflectionPrompt: "How has your experience with Nadi Shodhana changed since Day 2?"
      },
      {
        dayNumber: 7,
        title: "Creating a Personal Pranayama Routine",
        content: "Congratulations on completing the 7-day introduction! Today, reflect on the techniques you've learned and consider how you can incorporate them into a sustainable personal practice.\n\n**Reflection:**\n- Which pranayama techniques resonated most with you?\n- When is the best time for you to practice?\n- How can you make pranayama a regular part of your wellness routine?",
        practiceSuggestion: "Choose your favorite pranayama technique from this week and practice it for 10 minutes.",
        reflectionPrompt: "What is one commitment you can make to continue your pranayama practice?"
      }
    ]
  },
  {
    title: "Understanding Your Pitta Dosha",
    description: "Explore the characteristics of Pitta dosha and learn Ayurvedic principles for maintaining balance.",
    longDescription: "This module provides a comprehensive overview of Pitta dosha, one of the three fundamental bio-energies in Ayurveda. Learn to identify Pitta characteristics in yourself and others, understand common imbalances, and discover dietary, lifestyle, and herbal strategies to pacify excess Pitta and promote harmony. Ideal for those seeking to understand their Ayurvedic constitution better.",
    iconName: "Flame",
    category: "Ayurveda",
    durationEstimate: "5 Days (15-20 mins/day)",
    difficulty: "All Levels",
    coverImage: "https://i.pinimg.com/736x/24/6d/3a/246d3a9dddc837be383e820e9eaac9e0.jpg",
    imageHint: "ayurveda fire pitta",
    days: [
      {
        dayNumber: 1,
        title: "Introduction to Pitta Dosha",
        content: "Pitta dosha is composed of the fire and water elements. It governs metabolism, digestion, and transformation in the body and mind.\n\n**Qualities of Pitta:**\n- Hot, sharp, light, oily, liquid, spreading.\n\n**Physical Characteristics (when dominant):**\n- Medium build, warm body temperature, reddish complexion, sharp features, strong appetite and digestion.",
        practiceSuggestion: "Observe your own physical and mental traits. Do any align with Pitta?",
        reflectionPrompt: "Which Pitta qualities do you recognize in yourself or others?"
      },
      {
        dayNumber: 2,
        title: "Signs of Pitta Imbalance",
        content: "When Pitta is aggravated, it can manifest in various ways:\n\n**Physical Imbalances:**\n- Skin inflammation (acne, rashes), heartburn, acid reflux, ulcers, excessive hunger/thirst, early graying or hair loss.\n\n**Mental/Emotional Imbalances:**\n- Irritability, anger, impatience, criticism, judgment, perfectionism, burnout.",
        practiceSuggestion: "Reflect on times you've felt 'fiery' or overheated, physically or emotionally.",
        reflectionPrompt: "Have you experienced any signs of Pitta imbalance recently? What were the triggers?"
      },
      {
        dayNumber: 3,
        title: "Pitta-Pacifying Diet",
        content: "To balance Pitta, favor foods that are cooling, sweet, bitter, and astringent.\n\n**Foods to Favor:**\n- Sweet fruits (melons, grapes, pears), cooling vegetables (cucumber, cilantro, leafy greens), grains like rice and oats, dairy (milk, ghee).\n\n**Foods to Reduce/Avoid:**\n- Spicy, sour, salty foods, fermented foods, red meat, alcohol, caffeine, oily/fried foods.",
        practiceSuggestion: "Incorporate one Pitta-pacifying food into your next meal.",
        reflectionPrompt: "How do spicy or sour foods typically make you feel?"
      },
      {
        dayNumber: 4,
        title: "Lifestyle for Pitta Balance",
        content: "Lifestyle choices play a crucial role in managing Pitta.\n\n**Recommendations:**\n- Maintain a regular routine, but allow for some spontaneity.\n- Spend time in nature, especially near water.\n- Practice moderation in work and exercise.\n- Engage in cooling activities (swimming, leisurely walks in moonlight).\n- Cultivate compassion, patience, and forgiveness.",
        practiceSuggestion: "Schedule a 15-minute break today for a calm, cooling activity.",
        reflectionPrompt: "What is one lifestyle change you could make to cool down excess Pitta?"
      },
      {
        dayNumber: 5,
        title: "Herbs & Practices for Pitta",
        content: "Certain herbs and practices can further support Pitta balance.\n\n**Helpful Herbs (consult a practitioner):**\n- Amla, Brahmi, Shatavari, Neem, Rose, Sandalwood.\n\n**Yoga & Meditation:**\n- Cooling pranayama like Sheetali or Sheetkari.\n- Gentle, non-competitive yoga.\n- Meditation focused on compassion or loving-kindness.",
        practiceSuggestion: "Try a short compassion meditation today.",
        reflectionPrompt: "How can you bring more coolness and calmness into your daily life?"
      }
    ]
  },
  {
    title: "Yogic Psychology",
    description: "Understand the layers of the mind, emotions, and thoughts. Learn tools like mindfulness, affirmations, and yogic reflection to bring clarity and inner peace.",
    longDescription: "Dive into the fascinating world of Yogic Psychology. This module explores the traditional yogic understanding of the mind (Manas), intellect (Buddhi), ego (Ahamkara), and consciousness (Chitta). Discover how these inner faculties shape your experiences and learn practical techniques to cultivate mental clarity, emotional balance, and profound self-awareness. Ideal for anyone looking to understand their inner world from a yogic perspective and foster greater psychological well-being.",
    iconName: "BrainCircuit",
    category: "Yoga Philosophy",
    durationEstimate: "6 Days (20 mins/day)",
    difficulty: "All Levels",
    coverImage: "https://placehold.co/600x400.png",
    imageHint: "yogic psychology mind",
    days: [
      {
        dayNumber: 1,
        title: "Introduction to Yogic Psychology & Manas (The Mind)",
        content: "**What is Yogic Psychology?**\nIt's the ancient yogic science of the mind and consciousness, offering profound insights into our inner workings and pathways to self-realization.\n\n**Manas (The Sensory/Emotional Mind):**\nManas is the part of the mind that receives sensory input, processes emotions, and generates thoughts. It's often restless and reactive.\n\n- Functions: Perception, feeling, doubting, imagining.\n- Tendencies: Can be swayed by likes/dislikes (Raga/Dvesha) and past impressions (Samskaras).\n\nToday, we'll start by observing the nature of Manas.",
        practiceSuggestion: "For 5-10 minutes today, sit quietly and observe your thoughts as they arise and pass, without judgment. Notice their content and frequency.",
        reflectionPrompt: "What kind of thoughts (e.g., planning, worrying, remembering, judging) were most predominant during your observation of Manas?"
      },
      {
        dayNumber: 2,
        title: "Buddhi - The Discerning Intellect",
        content: "**Understanding Buddhi:**\nBuddhi is the higher aspect of the mind, responsible for discernment (Viveka), decision-making, judgment, and willpower. It's the faculty that can differentiate between the real and unreal, beneficial and harmful.\n\n- Role: To analyze information from Manas, make choices aligned with wisdom, and guide actions.\n- Strengthening Buddhi: Through practices like self-study (Svadhyaya), contemplation (Manana), and meditation.\n\nBuddhi, when clear and strong, helps us navigate life with wisdom.",
        practiceSuggestion: "Before making one or two minor decisions today (e.g., what to eat, how to respond to an email), consciously pause. Ask yourself: 'What is the wisest choice here? What aligns with my deeper values?' Notice the process.",
        reflectionPrompt: "How did bringing Buddhi's discerning quality to your decisions, even small ones, change your approach or outcome?"
      },
      {
        dayNumber: 3,
        title: "Ahamkara - The Ego Sense ('I-Maker')",
        content: "**Exploring Ahamkara:**\nAhamkara is the sense of 'I' or ego, the faculty that creates our individual identity. It helps us function in the world by giving us a sense of self.\n\n- Function: Creates 'I-ness' and 'my-ness', leading to identification with body, thoughts, roles, possessions.\n- Challenge: While necessary, an over-identified or rigid Ahamkara can lead to suffering (e.g., attachment, pride, insecurity).\n- Yogic Goal: Not to destroy Ahamkara, but to purify it and understand its relative nature, seeing beyond it to the true Self (Atman).",
        practiceSuggestion: "Identify one role or label you strongly identify with (e.g., 'a student,' 'a parent,' 'an artist,' 'a professional'). Observe how this identity influences your thoughts, feelings, and actions throughout the day.",
        reflectionPrompt: "What did you learn about your identification with this role today? Did it empower you or limit you in any way?"
      },
      {
        dayNumber: 4,
        title: "Chitta - The Storehouse of Consciousness",
        content: "**Introduction to Chitta:**\nChitta is often translated as the 'mind-stuff' or the subconscious field of consciousness. It's the vast reservoir where all our experiences, memories, and deep-seated impressions (Samskaras) are stored.\n\n- Function: Memory, storage of Samskaras and Vasanas (latent tendencies), the basis of our habitual patterns.\n- Impact: Chitta influences our perceptions, reactions, and the overall quality of our consciousness.\n- Yogic Aim: To purify Chitta (Chitta Shuddhi) and quiet its fluctuations (Chitta Vritti Nirodha, as per Yoga Sutras) to reveal the underlying stillness of the Self.",
        practiceSuggestion: "Take a few moments to recall a vivid positive memory from your past. Notice the feelings, sensations, and any subtle thoughts associated with it. Just observe how Chitta brings forth this memory.",
        reflectionPrompt: "How do you think past memories and impressions (Samskaras stored in Chitta) might be influencing your present thoughts or reactions, even in subtle ways?"
      },
      {
        dayNumber: 5,
        title: "Managing the Kleshas - Afflictions of the Mind",
        content: "**Understanding the Kleshas:**\nPatanjali's Yoga Sutras outline five Kleshas, or primary afflictions, that are the root causes of suffering. Understanding them is key to mental well-being.\n\n1.  **Avidya (Ignorance):** Mistaking the impermanent for permanent, impure for pure, suffering for happiness, non-Self for Self.\n2.  **Asmita (Egoism):** Identifying the power of seeing (consciousness) with the instrument of seeing (mind/body).\n3.  **Raga (Attachment):** Craving for pleasant experiences.\n4.  **Dvesha (Aversion):** Aversion to unpleasant experiences.\n5.  **Abhinivesha (Fear of Death/Clinging to Life):** The deep-seated will to live, even in the wise.",
        practiceSuggestion: "Choose one Klesha (e.g., Raga or Dvesha). Throughout the day, try to observe instances where this affliction might be subtly influencing your thoughts, feelings, or actions. Don's judge, just notice.",
        reflectionPrompt: "What insights did you gain from observing this Klesha in action today? How did it make you feel?"
      },
      {
        dayNumber: 6,
        title: "Cultivating Positive Mental States - Pratipaksha Bhavana",
        content: "**The Power of Pratipaksha Bhavana:**\nThis is a yogic technique from Patanjali's Yoga Sutras (YS II.33) which means 'cultivating the opposite thought or feeling' to overcome negative or unhelpful mental patterns (Vitarkas).\n\n- How it works: When disturbed by negative thoughts (e.g., anger, jealousy, harmful intent), one should consciously cultivate thoughts of the opposite nature (e.g., compassion, contentment, harmlessness).\n- Tools for Cultivation: Mindfulness, affirmations, and focused contemplation can support this practice.\n\n**Integration:**\nReflect on how these yogic concepts of mind can be integrated for a more peaceful and aware life.",
        practiceSuggestion: "Today, when you notice a negative or unhelpful thought arising (e.g., self-criticism, irritation), consciously try to introduce its opposite or a more constructive thought. For example, if self-criticism arises, counter it with a thought of self-compassion or acknowledgment of effort.",
        reflectionPrompt: "How did practicing Pratipaksha Bhavana feel? Was it challenging to cultivate the opposite thought, or did you find it helpful in shifting your mental state?"
      }
    ]
  },
  {
    title: "Healing Through Food: A Guide to Sattvic Eating",
    description: "Discover the power of sattvic foods to purify the body and mind. Includes recipes, meal plans, and insights into the subtle effects of food on consciousness.",
    longDescription: "This module explores the Ayurvedic concept of Sattvic eating – a diet that promotes purity, clarity, and tranquility. Learn how to choose foods that nourish not just your physical body, but also your mind and spirit. We'll cover the principles of Sattva, identify key Sattvic foods, understand Rajasic and Tamasic influences, and provide practical tips, sample meal ideas, and recipes to help you incorporate this life-enhancing dietary approach.",
    iconName: "Vegan",
    category: "Ayurvedic Nutrition",
    durationEstimate: "8 Lessons (Approx 3-4 hours total)",
    difficulty: "All Levels",
    coverImage: "https://placehold.co/600x400.png",
    imageHint: "sattvic food healthy eating",
    days: [
      {
        dayNumber: 1,
        title: "What is Sattvic Food? Principles and Philosophy",
        content: "Introduction to the concept of Sattva as one of the three Gunas (qualities of nature).\n- Core principles of a Sattvic diet: fresh, pure, light, easy to digest, promoting calmness and clarity.\n- How Sattvic food impacts consciousness and spiritual practice.",
        practiceSuggestion: "Reflect on your current diet. Identify 1-2 foods you eat that might be considered Sattvic and 1-2 that might be Rajasic or Tamasic. Notice how they make you feel.",
        reflectionPrompt: "What does 'eating for clarity' mean to you personally?"
      },
      {
        dayNumber: 2,
        title: "The Three Gunas: Sattva, Rajas, Tamas and Their Influence",
        content: "Detailed exploration of Sattva (purity, harmony), Rajas (activity, passion), and Tamas (inertia, darkness).\n- Characteristics of foods associated with each Guna.\n- How to identify the predominant Guna in your diet and its effects on your well-being.",
        practiceSuggestion: "Observe your energy levels and mood after eating different types of meals today (e.g., a light salad vs. a heavy, spicy meal). Try to correlate them with the Gunas.",
        reflectionPrompt: "Which Guna do you feel is most dominant in your typical daily diet, and how does this manifest in your energy or mood?"
      },
      {
        dayNumber: 3,
        title: "Key Sattvic Foods: Grains, Fruits, Vegetables, Dairy",
        content: "- **Grains:** Whole grains like rice, wheat, oats, barley when freshly cooked.\n- **Fruits:** Most sweet, fresh fruits like apples, bananas, berries, grapes, melons.\n- **Vegetables:** Mild, easily digestible vegetables like leafy greens, squash, sweet potatoes, cucumbers.\n- **Dairy:** Fresh milk, ghee, homemade yogurt/lassi (from well-cared-for cows, if consumed).\n- **Nuts & Seeds:** Almonds, walnuts, sesame seeds (in moderation).\n- **Sweeteners:** Honey, jaggery (in moderation).",
        practiceSuggestion: "Incorporate at least three different types of Sattvic foods into your meals today.",
        reflectionPrompt: "Which Sattvic foods are already a regular part of your diet? Which new ones could you try?"
      },
      {
        dayNumber: 4,
        title: "Foods to Reduce or Avoid (Rajasic & Tamasic)",
        content: "- **Rajasic Foods (stimulate, can cause agitation):**\n  - Spicy foods, chilies, onions, garlic, coffee, tea, chocolate, overly salty or sour foods.\n- **Tamasic Foods (cause dullness, heaviness):**\n  - Stale, leftover, processed, fermented foods, meat, alcohol, preserved foods, overripe or underripe foods.",
        practiceSuggestion: "Identify one Rajasic or Tamasic food you consume regularly and consider reducing its intake for a day or two. Notice any changes.",
        reflectionPrompt: "How do you feel physically and mentally after consuming predominantly Rajasic or Tamasic foods?"
      },
      {
        dayNumber: 5,
        title: "Sattvic Cooking Methods and Preparation",
        content: "- Emphasize fresh preparation; avoid reheating multiple times.\n- Gentle cooking methods: steaming, baking, light sautéing.\n- Using fresh, high-quality ingredients.\n- Cooking with love and positive intention (the subtle energy matters).",
        practiceSuggestion: "Prepare one meal today using Sattvic cooking principles. Focus on the freshness and the intention behind your cooking.",
        reflectionPrompt: "Did you notice a difference in the taste or your feeling about the food when prepared with Sattvic methods and intention?"
      },
      {
        dayNumber: 6,
        title: "Sample Sattvic Meal Plan & Simple Recipes",
        content: "- **Breakfast:** Cooked oatmeal with fruits and nuts, or a fruit smoothie with fresh yogurt.\n- **Lunch:** Kitchari (rice and moong dal), steamed vegetables with ghee, a simple chapati.\n- **Dinner:** Light vegetable soup, quinoa with steamed greens.\n- **Snacks:** Fresh fruits, soaked almonds.\n\n**Simple Recipe: Sattvic Kitchari**\n(Details would be provided for a simple recipe)",
        practiceSuggestion: "Try preparing one simple Sattvic recipe from the suggestions or find one online.",
        reflectionPrompt: "How did you feel after eating a fully Sattvic meal? Was it satisfying and light?"
      },
      {
        dayNumber: 7,
        title: "Sattvic Lifestyle: Beyond Just Food",
        content: "- The importance of a Sattvic environment: clean, calm, and harmonious spaces.\n- Sattvic activities: engaging in activities that promote peace, wisdom, and joy (e.g., meditation, study of scriptures, spending time in nature, gentle yoga).\n- Sattvic company (Satsang): associating with positive, spiritually-minded people.",
        practiceSuggestion: "Engage in one Sattvic activity today that is not food-related (e.g., 10 minutes of quiet meditation, a walk in nature).",
        reflectionPrompt: "How does your environment and the company you keep influence your overall sense of Sattva?"
      },
      {
        dayNumber: 8,
        title: "Integrating Sattvic Principles into Daily Life",
        content: "- Making gradual changes: start small and be consistent.\n- Listening to your body: Ayurveda emphasizes individual needs.\n- The role of mindfulness in eating and living Sattvically.\n- Long-term benefits of a Sattvic lifestyle for physical, mental, and spiritual well-being.",
        practiceSuggestion: "Identify one Sattvic principle (food or lifestyle) you want to integrate more consistently this week. Make a simple plan.",
        reflectionPrompt: "What is the biggest challenge and the biggest potential benefit for you in adopting a more Sattvic lifestyle?"
      }
    ]
  },
  {
    title: "Exploring the Annamaya Kosha: The Physical Body",
    description: "Learn about the structure and care of the physical body through asana practice, daily movement rituals, and basic anatomical insights.",
    longDescription: "This module provides a beginner-friendly exploration of the Annamaya Kosha (Physical Sheath). Understand its connection to your overall well-being through basic anatomical concepts, gentle yoga asanas, mindful movement, and principles of physical nourishment and rest. Discover how caring for your physical body is the first step towards deeper self-awareness and holistic health.",
    iconName: "Yoga",
    category: "Yoga & Anatomy",
    durationEstimate: "7 Days (15 mins/day)",
    difficulty: "Beginner-Friendly",
    coverImage: "https://placehold.co/600x400.png",
    imageHint: "yoga anatomy physical body",
    days: [
      {
        dayNumber: 1,
        title: "Meet Your Annamaya Kosha: The Foundation",
        content: "**What is the Annamaya Kosha?**\nIt's your physical body – bones, muscles, organs, skin. It's nourished by 'Anna' (food) and is the most tangible of the five Koshas.\n\n**Why Care for It?**\nA healthy Annamaya Kosha is the foundation for a healthy mind and spirit. It's the temple for your inner Self.",
        practiceSuggestion: "Sit or stand comfortably. Gently scan your body from toes to head, noticing any sensations without judgment for 3-5 minutes.",
        reflectionPrompt: "What sensations did you notice in your body today? Were there any areas of comfort or discomfort?"
      },
      {
        dayNumber: 2,
        title: "Basic Skeletal Awareness: Your Inner Frame",
        content: "**Understanding Your Bones:**\nYour skeleton provides structure, support, and protection. Healthy bones are vital for movement and stability.\n\n**Practice: Tadasana (Mountain Pose) Exploration**\n1. Stand tall, feet hip-width apart.\n2. Feel the connection of your feet to the ground.\n3. Imagine a line of energy from your feet, up your legs, through your spine, to the crown of your head.\n4. Gently engage your leg muscles. Relax your shoulders.",
        practiceSuggestion: "Practice Tadasana for 2-3 minutes, focusing on the feeling of grounding and alignment.",
        reflectionPrompt: "How did focusing on your skeletal alignment in Tadasana make you feel?"
      },
      {
        dayNumber: 3,
        title: "Muscles in Movement: Gentle Activation",
        content: "**Your Muscles:**\nMuscles enable movement, maintain posture, and generate heat. Keeping them flexible and strong is key.\n\n**Practice: Gentle Stretches**\n- Neck Rolls: Slowly drop chin to chest, then roll head gently from side to side.\n- Shoulder Rolls: Inhale, shrug shoulders up to ears; exhale, roll them back and down. Repeat.\n- Cat-Cow Stretch (on hands and knees): Inhale, arch back, drop belly (Cow); exhale, round spine, tuck chin (Cat).",
        practiceSuggestion: "Perform 5-7 repetitions of each gentle stretch, moving with your breath.",
        reflectionPrompt: "Which muscle groups felt most in need of stretching today?"
      },
      {
        dayNumber: 4,
        title: "The Physical Breath: Connecting Body and Energy",
        content: "**Breath and the Annamaya Kosha:**\nWhile Prana is the energy, the physical act of breathing deeply impacts the Annamaya Kosha by oxygenating tissues and calming the nervous system.\n\n**Practice: Diaphragmatic Breathing Awareness**\n1. Lie down comfortably, one hand on your chest, one on your belly.\n2. Inhale slowly through your nose, feeling your belly rise more than your chest.\n3. Exhale slowly, feeling your belly fall.",
        practiceSuggestion: "Practice diaphragmatic breathing for 5 minutes, focusing on the physical movement of your abdomen.",
        reflectionPrompt: "How did conscious diaphragmatic breathing affect any physical tension you were holding?"
      },
      {
        dayNumber: 5,
        title: "Nourishing Your Temple: Food Basics",
        content: "**Food as Fuel for Annamaya Kosha:**\nThe quality of food directly impacts the health of your physical body.\n\n**Principles:**\n- Eat fresh, whole foods (fruits, vegetables, grains, proteins).\n- Hydrate adequately with water.\n- Eat mindfully, paying attention to hunger and fullness cues.",
        practiceSuggestion: "For one meal today, eat slowly and without distractions. Pay attention to the taste, texture, and smell of your food.",
        reflectionPrompt: "What did you notice when you ate mindfully today?"
      },
      {
        dayNumber: 6,
        title: "The Importance of Rest: Repair and Rejuvenation",
        content: "**Sleep and the Physical Body:**\nDuring sleep, your body repairs tissues, consolidates memories, and balances hormones. Quality rest is crucial for Annamaya Kosha health.\n\n**Practice: Simple Relaxation Technique**\n1. Lie down in Savasana (Corpse Pose).\n2. Close your eyes and consciously relax each part of your body, starting from your toes and moving up to your head.\n3. Rest for 5-10 minutes.",
        practiceSuggestion: "Try this simple relaxation technique before sleep or during a break today.",
        reflectionPrompt: "How did your body feel after the relaxation practice?"
      },
      {
        dayNumber: 7,
        title: "Integrating Physical Awareness into Daily Life",
        content: "**Mindful Movement & Posture:**\nBring awareness to how you sit, stand, and walk throughout your day. Make small adjustments for better posture.\n\n**Recap & Commitment:**\nReview what you've learned about your Annamaya Kosha. How can you continue to care for your physical body in a mindful way?",
        practiceSuggestion: "Choose one practice from this week that resonated with you and commit to doing it 3 times next week.",
        reflectionPrompt: "What is one small, sustainable change you can make to better honor your Annamaya Kosha moving forward?"
      }
    ]
  },
  {
    title: "Balancing Agni: Digestive Fire & Inner Radiance",
    description: "Learn how to nurture your digestive fire (Agni) using herbs, eating habits, and detox routines. Supports weight balance, energy, and mental clarity.",
    longDescription: "This module delves into the Ayurvedic concept of Agni, the digestive and metabolic fire. Understanding and balancing Agni is crucial for optimal health, vitality, and mental clarity. You'll learn about the types of Agni, signs of balanced and imbalanced Agni, and practical ways to nurture your inner flame through diet, lifestyle, herbs, and simple detox practices. Strengthen your Agni to improve digestion, boost energy, and enhance overall well-being.",
    iconName: "Flame",
    category: "Ayurveda",
    durationEstimate: "5 Lessons (Approx 2 hours)",
    difficulty: "All Levels",
    coverImage: "https://placehold.co/600x400.png",
    imageHint: "agni ayurveda digestion fire",
    days: [
      {
        dayNumber: 1,
        title: "Understanding Agni: The Digestive Fire",
        content: "Welcome to 'Balancing Agni'! Agni, in Ayurveda, is the sacred digestive and metabolic fire within us. It governs transformation – not just of food, but also of thoughts and experiences. There are many types of Agni, with Jatharagni (the main digestive fire in the stomach and small intestine) being primary. Balanced Agni leads to health, vitality, and clarity. Imbalanced Agni can manifest as indigestion, fatigue, Ama (toxin) buildup, and poor immunity. Signs of balanced Agni include good appetite, smooth digestion, clear mind, and vibrant energy. Signs of imbalance can be bloating, gas, acidity, constipation, sluggishness, or feeling heavy after meals.",
        practiceSuggestion: "Today, pay attention to your hunger cues. Eat only when you feel genuinely hungry and stop when you are comfortably full, not stuffed.",
        reflectionPrompt: "How would you describe your appetite and digestion today? Did you notice any signs of balanced or imbalanced Agni?"
      },
      {
        dayNumber: 2,
        title: "Diet for Agni: Nourishing Your Inner Flame",
        content: "The food we eat directly impacts Agni. Ayurveda emphasizes eating foods that are easy to digest and support our digestive fire. Favor warm, freshly cooked, and moist foods. Include all six tastes (sweet, sour, salty, pungent, bitter, astringent) in moderation for balanced nutrition. Avoid or reduce very cold foods/drinks, heavy, oily, processed, stale, or raw foods in excess (especially if Agni is weak). Mindful eating is key: eat in a calm environment, chew thoroughly, and savor your food.",
        practiceSuggestion: "For one meal today, consciously include at least 3-4 of the six tastes. Eat slowly and mindfully, paying attention to how your body feels.",
        reflectionPrompt: "What types of food make you feel light and energized? What foods tend to make you feel heavy or sluggish?"
      },
      {
        dayNumber: 3,
        title: "Lifestyle for Agni: Daily Rhythms",
        content: "Our daily habits significantly influence Agni. Try to eat your meals at regular times each day, with the main meal ideally around midday when Agni is strongest. Avoid eating late at night. Chronic stress and poor sleep can dampen Agni. Prioritize restful sleep and incorporate stress-reducing practices like meditation or gentle walks. Regular, moderate exercise also supports healthy digestion by improving circulation and metabolism.",
        practiceSuggestion: "If possible, try to have your largest meal between 10 AM and 2 PM today. Avoid snacking between meals if you're not truly hungry.",
        reflectionPrompt: "How does your stress level or sleep quality seem to affect your digestion?"
      },
      {
        dayNumber: 4,
        title: "Ayurvedic Herbs & Spices for Digestion",
        content: "Many common kitchen spices are powerful digestive aids in Ayurveda. Ginger (fresh or dry) kindles Agni and burns Ama. Cumin, coriander, and fennel (often used together as CCF tea) are tridoshic and support digestion and reduce gas. Turmeric is anti-inflammatory and aids metabolism. Black pepper enhances nutrient absorption and stimulates Agni. Asafoetida (Hing) is excellent for reducing Vata-related bloating. (Always use herbs and spices in moderation and consult a practitioner for specific conditions).",
        practiceSuggestion: "Try making a simple CCF tea: Boil 1/2 tsp each of cumin, coriander, and fennel seeds in 2 cups of water for 5-10 minutes. Strain and sip warm.",
        reflectionPrompt: "Have you used any of these spices for digestion before? Did you notice any effect from the CCF tea?"
      },
      {
        dayNumber: 5,
        title: "Maintaining Agni & Simple Detox",
        content: "Maintaining balanced Agni is an ongoing practice. Ama (undigested metabolic waste) can accumulate when Agni is weak, leading to various health issues. Simple ways to support Agni and reduce Ama include sipping warm water throughout the day, having a light dinner, and occasionally giving your digestion a rest (e.g., by having a very light meal like kitchari or soup). Consistency in healthy eating and lifestyle habits is key. Listen to your body; it often tells you what it needs for optimal Agni.",
        practiceSuggestion: "Sip warm water throughout the day today. Notice if it feels different from your usual beverage choices.",
        reflectionPrompt: "What is one small, consistent change you can make to your diet or lifestyle this week to support your Agni?"
      }
    ]
  },
  {
    title: "Prana and the Subtle Body: Vital Energy Mastery",
    description: "Dive deeper into the Pranamaya Kosha with advanced breathing, bandhas, and energy awareness practices to activate your life force.",
    longDescription: "Unlock the profound potential of your vital life force with this 10-day intermediate module. Journey beyond basic pranayama into the intricate workings of the Pranamaya Kosha. Explore advanced breathing techniques, the subtle power of bandhas (energy locks), and cultivate heightened awareness of your energetic body. This course is designed for those with some pranayama experience looking to deepen their practice, enhance vitality, and awaken higher levels of consciousness.",
    iconName: "Wind",
    category: "Pranayama + Subtle Energetics",
    durationEstimate: "10 Days (15-20 mins/day)",
    difficulty: "Intermediate",
    coverImage: "https://placehold.co/600x400.png",
    imageHint: "prana subtle energy meditation",
    days: [
      {
        dayNumber: 1,
        title: "Revisiting Prana & Nadis",
        content: "Deep dive into the five Prana Vayus (Prana, Apana, Samana, Udana, Vyana) and their functions. Understanding the major Nadis: Ida, Pingala, and Sushumna. The importance of Nadi purification.",
        practiceSuggestion: "Practice diaphragmatic breathing focusing on the natural flow. Visualize energy moving up with inhale (Ida/Pingala) and down with exhale (Apana).",
        reflectionPrompt: "Can you sense different energetic movements or qualities within your body as you breathe?"
      },
      {
        dayNumber: 2,
        title: "Advanced Nadi Shodhana: Ratios & Retention",
        content: "Exploring Nadi Shodhana with breath ratios (e.g., 1:1:1, 1:2:1, 1:1:2 for inhale:hold:exhale or inhale:exhale:hold). Introduction to Antar (internal) and Bahir (external) Kumbhaka (breath retention). Safety and progressive practice.",
        practiceSuggestion: "Practice Nadi Shodhana with a comfortable ratio, e.g., inhale 4, hold 4, exhale 4. Gradually explore longer exhales or gentle retentions if comfortable.",
        reflectionPrompt: "How did adding ratios or brief retentions change your Nadi Shodhana experience?"
      },
      {
        dayNumber: 3,
        title: "Kapalabhati Kriya: Skull Shining Breath",
        content: "Detailed technique of Kapalabhati: passive inhale, active/forceful exhale. Benefits for cleansing sinuses, energizing the mind, and stimulating Agni. Contraindications.",
        practiceSuggestion: "Perform 1-3 rounds of Kapalabhati (20-30 expulsions per round). Focus on the sharp exhale and relaxed inhale.",
        reflectionPrompt: "What sensations (physical or energetic) did you notice after Kapalabhati?"
      },
      {
        dayNumber: 4,
        title: "Bhastrika Pranayama: Bellows Breath Variations",
        content: "Understanding Bhastrika: forceful, rapid, and equal inhale and exhale. Exploring variations in speed and intensity. Benefits for increasing prana, clearing blockages, and preparing for meditation.",
        practiceSuggestion: "Try a slow-paced Bhastrika (10-15 breaths), then a slightly faster pace if comfortable. Notice the difference in energy.",
        reflectionPrompt: "How did Bhastrika affect your energy levels and mental state compared to Kapalabhati?"
      },
      {
        dayNumber: 5,
        title: "Introduction to Bandhas: Mula Bandha",
        content: "What are Bandhas (energy locks)? Their purpose in pranayama and yoga. Detailed instruction on Mula Bandha (Root Lock): engaging the perineal muscles. Benefits for grounding and upward movement of prana.",
        practiceSuggestion: "Practice engaging Mula Bandha gently during the exhale of your regular breathing for a few minutes.",
        reflectionPrompt: "Describe the sensation of engaging Mula Bandha. Was it easy to isolate?"
      },
      {
        dayNumber: 6,
        title: "Uddiyana Bandha: The Abdominal Lock",
        content: "Exploring Uddiyana Bandha (Abdominal Lock), performed on external breath retention (Bahir Kumbhaka). Technique, benefits for digestion, detoxification, and Pranic upliftment. Contraindications.",
        practiceSuggestion: "After a full exhalation, practice gently drawing the abdomen in and up. Hold for a few seconds. Release before inhaling. (Attempt with caution and empty stomach).",
        reflectionPrompt: "What challenges or sensations did you encounter with Uddiyana Bandha?"
      },
      {
        dayNumber: 7,
        title: "Jalandhara Bandha: The Throat Lock",
        content: "Understanding Jalandhara Bandha (Throat Lock): chin to chest, elongating the neck. Typically practiced during internal breath retention (Antar Kumbhaka). Benefits for thyroid, prana regulation, and calming the mind.",
        practiceSuggestion: "During a gentle breath retention after an inhale, practice Jalandhara Bandha. Feel the subtle pressure and energy shift.",
        reflectionPrompt: "How did Jalandhara Bandha affect your sense of inner stillness or energy flow in the head and neck?"
      },
      {
        dayNumber: 8,
        title: "Maha Bandha: The Great Lock",
        content: "Integrating all three main bandhas (Mula, Uddiyana, Jalandhara) simultaneously, usually during external retention. Profound effects on prana, kundalini, and consciousness. Requires careful practice.",
        practiceSuggestion: "If comfortable with individual bandhas, try engaging Maha Bandha gently during a brief external retention. Focus on the combined effect.",
        reflectionPrompt: "Describe the energetic experience of Maha Bandha, even if subtle."
      },
      {
        dayNumber: 9,
        title: "Pranic Awareness Meditation",
        content: "Techniques to cultivate direct awareness of prana. Visualizing energy flow through nadis, sensing prana in different body parts, or feeling the breath as an energetic current.",
        practiceSuggestion: "Sit for meditation. Visualize breath as light entering and circulating. Try to feel the subtle energy in your hands or along your spine.",
        reflectionPrompt: "Were you able to perceive or visualize prana today? Describe your experience."
      },
      {
        dayNumber: 10,
        title: "Integrating Energy Practices for Mastery",
        content: "Review of techniques learned. How to create a balanced personal practice incorporating advanced pranayama and bandhas safely. The role of consistency and patience in subtle energy mastery.",
        practiceSuggestion: "Design a short (10-15 min) personal practice incorporating 2-3 techniques from this module that resonated with you.",
        reflectionPrompt: "What is your biggest takeaway from this 10-day journey into subtle energy mastery? How will you continue to explore?"
      }
    ]
  },
  {
    title: "Vijnanamaya Kosha: Awakening Intuition & Inner Wisdom",
    description: "Access your inner guidance through meditation, journaling prompts, and yogic wisdom teachings.",
    longDescription: "This module guides you to explore and awaken the Vijnanamaya Kosha, the sheath of wisdom and intuition. Through practices like meditation, focused self-inquiry, and contemplation of yogic philosophy, you'll learn to access deeper levels of inner knowing, cultivate discernment, and align your life with your truest values and purpose. Suitable for those looking to move beyond intellectual understanding to embodied wisdom.",
    iconName: "Lightbulb",
    category: "Meditation & Introspection",
    durationEstimate: "7 Days (10-15 mins/day)",
    difficulty: "Intermediate/Advanced",
    coverImage: "https://placehold.co/600x400.png",
    imageHint: "wisdom intuition meditation",
    days: [
      {
        dayNumber: 1,
        title: "Understanding Vijnanamaya Kosha: The Wisdom Sheath",
        content: "Introduction to Vijnanamaya Kosha as the layer of higher intellect, discernment (Viveka), and intuition. It's the faculty that helps us understand, judge, and make decisions based on inner wisdom rather than mere instinct or emotion.\n\n- **Characteristics:** Clarity, insight, conviction, moral awareness, connection to purpose.",
        practiceSuggestion: "Reflect on a recent decision you made. Did it come from a place of deep knowing/wisdom or more from habit/emotion? Journal your thoughts.",
        reflectionPrompt: "What does 'inner wisdom' mean to you? How do you recognize its presence?"
      },
      {
        dayNumber: 2,
        title: "Cultivating Viveka: The Power of Discernment",
        content: "Viveka is the ability to discriminate between the real and unreal, permanent and impermanent, Self and non-Self. It's a key function of a developed Vijnanamaya Kosha.\n\n- **Developing Viveka:** Through mindfulness, observing thoughts without attachment, and contemplating the nature of reality.",
        practiceSuggestion: "Today, practice noticing your thoughts. Label them (e.g., 'planning,' 'worrying,' 'judging') without getting carried away by them. Observe the transient nature of thoughts.",
        reflectionPrompt: "What helps you distinguish between a reactive thought and a wise insight?"
      },
      {
        dayNumber: 3,
        title: "Listening to Your Intuition: The Inner Guide",
        content: "Intuition is the subtle voice of the Vijnanamaya Kosha. Learning to recognize and trust it is crucial for accessing inner wisdom.\n\n- **Accessing Intuition:** Through stillness, meditation, spending time in nature, and paying attention to subtle feelings or 'gut instincts'.",
        practiceSuggestion: "Find 5-10 minutes for quiet sitting. Ask an inner question (e.g., 'What is one step I can take towards my well-being today?'). Listen for any subtle feelings, images, or words that arise.",
        reflectionPrompt: "Can you recall a time you followed your intuition? What was the outcome? When did you ignore it, and what happened?"
      },
      {
        dayNumber: 4,
        title: "Exploring Beliefs and Mental Constructs",
        content: "Our beliefs shape our reality. The Vijnanamaya Kosha helps us examine our core beliefs, identify limiting ones, and align with those that support our growth and truth.\n\n- **Self-Reflection:** Questioning assumptions and deeply ingrained patterns of thinking.",
        practiceSuggestion: "Identify one belief you hold about yourself or the world. Journal about where this belief came from and whether it truly serves you now.",
        reflectionPrompt: "What is one belief you are ready to question or let go of?"
      },
      {
        dayNumber: 5,
        title: "The Practice of Self-Inquiry (Atma Vichara)",
        content: "Atma Vichara, or Self-inquiry (famously taught by Ramana Maharshi), is a direct method to explore the nature of the 'I'-thought and realize the true Self. It involves persistently asking 'Who am I?'.\n\n- **Deepening Awareness:** This practice cuts through superficial layers of identity linked to the lower koshas.",
        practiceSuggestion: "Sit quietly for 10 minutes. Whenever a thought or feeling arises, gently inquire, 'To whom does this thought/feeling come?' Trace it back to the 'I'. If the 'I' arises, ask, 'Who am I?' Rest in the inquiry without seeking an intellectual answer.",
        reflectionPrompt: "What sensations or shifts in awareness, however subtle, did you experience during the self-inquiry practice?"
      },
      {
        dayNumber: 6,
        title: "Connecting with Inner Guidance and Purpose",
        content: "The Vijnanamaya Kosha connects us to our deeper purpose (Dharma) and inner guidance. When this sheath is clear, we live with a sense of direction and meaning.\n\n- **Aligning with Values:** Living in accordance with our deepest values strengthens this kosha.",
        practiceSuggestion: "Reflect on what truly matters to you. List 3-5 core values. Consider how you can express one of these values more fully in your life today.",
        reflectionPrompt: "When do you feel most aligned with your sense of purpose?"
      },
      {
        dayNumber: 7,
        title: "Integrating Wisdom into Daily Life",
        content: "Awakening the Vijnanamaya Kosha is not just about inner experiences; it's about bringing wisdom, clarity, and compassionate action into our everyday lives.\n\n- **Embodied Wisdom:** Making choices and interacting with the world from a place of inner knowing and integrity.",
        practiceSuggestion: "Choose one insight you've gained this week. Consciously apply it to a situation you encounter today. Observe the difference it makes.",
        reflectionPrompt: "What is one way you can commit to nurturing your Vijnanamaya Kosha regularly (e.g., daily quiet time, journaling, studying wisdom texts)?"
      }
    ]
  },
  {
    title: "Anandamaya Kosha: The Bliss Body",
    description: "Experience states of joy and inner bliss through bhakti yoga, mantra chanting, and sacred silence. Discover the essence of spiritual fulfillment.",
    longDescription: "Journey into the Anandamaya Kosha, the sheath of bliss, your deepest layer of being. This module explores practices that cultivate unconditional joy, profound peace, and a sense of unity with all existence. Learn about Bhakti Yoga (the path of devotion), the power of mantra chanting, the transformative effects of sacred silence, and how to integrate these blissful states into your daily life. Suitable for all levels seeking spiritual enrichment and a deeper connection to their true, joyful nature.",
    iconName: "Sparkles",
    category: "Spiritual Practices",
    durationEstimate: "5 Lessons (Approx 1.5 hours total)",
    difficulty: "All Levels",
    coverImage: "https://placehold.co/600x400.png",
    imageHint: "bliss meditation spiritual joy",
    days: [
      {
        dayNumber: 1,
        title: "Understanding Anandamaya Kosha: The Bliss Sheath",
        content: "**What is the Anandamaya Kosha?**\nIt is the innermost and most subtle of the five sheaths, often translated as the 'bliss body' or 'causal body.' It's not mere emotional happiness, but a profound state of causeless joy, peace, and contentment that is our inherent nature.\n\n- **Characteristics:** Pure joy (Ananda), profound peace, love, unity, connection to the Self (Atman).\n- **Experiences:** Most directly experienced in deep, dreamless sleep (Sushupti) and in states of deep meditation (Samadhi), though its reflection can be felt in moments of pure, unadulterated joy.",
        practiceSuggestion: "Sit quietly for 5-10 minutes. Recall a moment when you felt pure, uncaused joy or deep peace. Try to reconnect with that feeling in your body and heart.",
        reflectionPrompt: "What does 'bliss' mean to you personally, beyond fleeting happiness or pleasure?"
      },
      {
        dayNumber: 2,
        title: "Bhakti Yoga: The Path of Devotion & Love",
        content: "**Introduction to Bhakti Yoga:**\nBhakti Yoga is the path of love and devotion, a direct way to connect with the Anandamaya Kosha. It involves channeling emotions towards a higher ideal, be it a deity, a Guru, nature, or the divine principle within all.\n\n- **Forms of Bhakti:** Kirtan (devotional singing), Japa (mantra repetition with devotion), Puja (ritual worship), Seva (selfless service offered with love), Ishvara Pranidhana (surrender to the Divine).\n- **Benefits:** Purifies the heart, dissolves the ego, leads to experiences of profound love and unity.",
        practiceSuggestion: "Choose one form of devotional expression that resonates with you (e.g., listen to uplifting spiritual music, offer a heartfelt prayer of gratitude, perform a small act of selfless kindness without expectation) for 10-15 minutes.",
        reflectionPrompt: "How did engaging in a devotional act make you feel? Did you sense a connection to something larger or more profound than yourself?"
      },
      {
        dayNumber: 3,
        title: "Mantra Chanting: Sound Vibration for Inner Joy",
        content: "**The Power of Sacred Sound:**\nMantras are sacred sounds or syllables that carry specific vibrations. Repetitive chanting (Japa) can calm the mind, purify the consciousness, and awaken inner joy, connecting us to the Anandamaya Kosha.\n\n- **Examples:** 'Om' (the primordial sound), 'So-Hum' (I am That), simple affirmations chanted with feeling.\n- **How it Works:** The vibrations of mantras can alter brainwave patterns, reduce stress, and create a positive energetic field.",
        practiceSuggestion: "Choose a simple mantra (like 'Om' or 'Peace'). Sit comfortably and chant it aloud or silently for 5-10 minutes. Focus on the sound, the vibration, and the feeling it evokes.",
        reflectionPrompt: "What sensations or shifts in your inner state (e.g., calmness, joy, spaciousness) did you notice during or after chanting?"
      },
      {
        dayNumber: 4,
        title: "Sacred Silence & Stillness: Connecting to Inner Peace",
        content: "**The Depth of Silence (Mauna):**\nIntentional silence, or Mauna, is a powerful practice for experiencing the Anandamaya Kosha. It goes beyond mere absence of external noise; it's about cultivating inner stillness where the mind becomes quiet and receptive to deeper states of being.\n\n- **Benefits:** Reduces mental chatter, enhances self-awareness, allows for profound rest and rejuvenation, opens space for intuitive insights and the experience of bliss.",
        practiceSuggestion: "Find 10-15 minutes for complete silence. Turn off devices, sit comfortably, close your eyes, and simply be present with the silence. Allow thoughts to pass without engagement, gently returning your awareness to the stillness.",
        reflectionPrompt: "What was your experience of intentional silence like today? Was it easy or challenging? What did you observe or feel within the quiet?"
      },
      {
        dayNumber: 5,
        title: "Living from Bliss: Integrating Anandamaya Kosha",
        content: "**Bringing Bliss into Daily Life:**\nThe Anandamaya Kosha is not a state to be experienced only in meditation; its qualities can be integrated into our everyday lives. This involves cultivating an attitude of gratitude, contentment (Santosha), living with purpose, and recognizing the divine spark in all beings and experiences.\n\n- **Practices:** Mindful appreciation of small joys, selfless service, spending time in nature, connecting with loved ones from a place of heart-centered awareness, regular spiritual practice.",
        practiceSuggestion: "Throughout your day, consciously try to bring a sense of inner peace or joy to mundane tasks. Look for moments of beauty or connection, however small, and acknowledge them with gratitude.",
        reflectionPrompt: "What is one small way you can cultivate or express more joy, peace, or love in your daily life, starting today?"
      }
    ]
  }
];

export const learningModules: LearningModuleInfo[] = learningModulesSourceData.map(module => ({
  ...module,
  slug: slugify(module.title),
}));

export const getLearningModuleBySlug = (slug: string): LearningModuleInfo | undefined => {
  return learningModules.find(module => module.slug === slug);
};

    
