import type { LucideIcon } from 'lucide-react';

export interface CalculatorInfo {
  slug: string;
  title: string;
  iconName: string; 
  kosha: string;
  status: 'available' | 'comingSoon';
  shortDescription: string;
  detailedDescription: string;
  whyImportant: string;
  howItWorksSteps?: Array<{ title: string; description: string; iconName?: string }>; 
  howItWorksSummary?: string;
  healthContext?: string;
}

export const calculatorDetailsList: CalculatorInfo[] = [
  // Annamaya Kosha
  {
    slug: 'bmi-calculator',
    title: 'BMI Calculator',
    iconName: 'PersonStanding',
    kosha: 'Annamaya Kosha',
    status: 'available',
    shortDescription: 'Calculate your Body Mass Index (BMI) to understand your weight status.',
    detailedDescription: 'Calculate your Body Mass Index (BMI), a general indicator of body fatness based on height and weight, to understand your weight category and potential health implications related to your Annamaya Kosha.',
    whyImportant: 'BMI is a widely used screening tool to identify potential weight problems for adults. It can help in assessing if your weight is appropriate for your height and can be an early indicator for discussions with healthcare providers about weight management and physical health.',
    howItWorksSummary: 'Enter your height in centimeters and weight in kilograms. The calculator uses the standard formula (weight / height² in meters) to determine your BMI, providing a quick assessment of your physical body status.',
    healthContext: 'BMI is a general indicator and does not distinguish between muscle and fat mass. Consult a healthcare professional for personalized health advice regarding your Annamaya Kosha.',
  },
  {
    slug: 'body-fat-percentage',
    title: 'Body Fat % Calculator',
    iconName: 'Percent',
    kosha: 'Annamaya Kosha',
    status: 'available',
    shortDescription: 'Estimate your body fat percentage using the U.S. Navy formula.',
    detailedDescription: 'Estimate your body fat percentage using the U.S. Navy formula for insights into your body composition, a key aspect of your Annamaya Kosha. This method uses measurements like neck, waist, and hip circumference along with height.',
    whyImportant: 'Body fat percentage can be a more accurate indicator of health than BMI, as it distinguishes between fat mass and lean mass. Understanding your body composition is crucial for tailoring fitness and nutrition plans for your physical well-being.',
    howItWorksSummary: 'Input your gender, age, height, weight, and circumference measurements (neck, waist, and hip for females). The calculator applies the U.S. Navy formula to estimate your body fat percentage, offering insights into your physical health.',
    healthContext: 'This is an estimate. For precise measurements and advice regarding your Annamaya Kosha, consult a healthcare or fitness professional. Ensure measurements are taken accurately as per standard guidelines.',
  },
  {
    slug: 'waist-hip-ratio',
    title: 'Waist-to-Hip Ratio',
    iconName: 'Ratio',
    kosha: 'Annamaya Kosha',
    status: 'available',
    shortDescription: 'Monitor your waist-to-hip ratio (WHR) to assess potential health risks.',
    detailedDescription: 'Calculate your waist-to-hip ratio (WHR) to assess body fat distribution, which can be an indicator of potential health risks such as cardiovascular disease and diabetes, impacting your Annamaya Kosha.',
    whyImportant: 'WHR provides insights into where your body stores fat. Higher WHR values (more abdominal fat) are associated with increased health risks, even if BMI is within a normal range. It is a valuable metric for physical health assessment.',
    howItWorksSummary: 'Measure your waist circumference at the narrowest point (usually above the belly button) and your hip circumference at the widest point. Enter these values along with your gender to get your WHR.',
    healthContext: 'WHR is a useful screening tool for assessing physical health. Consult a healthcare professional for a comprehensive health assessment related to your Annamaya Kosha.',
  },
  {
    slug: 'daily-caloric-needs',
    title: 'Daily Caloric Needs',
    iconName: 'Flame',
    kosha: 'Annamaya Kosha',
    status: 'available',
    shortDescription: 'Estimate BMR and TDEE for diet planning and Annamaya Kosha nourishment.',
    detailedDescription: 'Estimate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) to understand your daily caloric requirements for effective diet and fitness planning, essential for nourishing your Annamaya Kosha.',
    whyImportant: 'BMR is the number of calories your body needs at rest. TDEE accounts for your activity level, providing a more accurate estimate of daily calories needed to maintain, lose, or gain weight, supporting your physical body.',
    howItWorksSummary: 'Enter your gender, age, height, weight, and select your typical activity level. The calculator uses the Mifflin-St Jeor equation for BMR and then applies an activity multiplier for TDEE.',
    healthContext: 'These are estimates for your Annamaya Kosha. Individual metabolic rates can vary. For personalized nutrition plans, consult a registered dietitian or healthcare provider.',
  },
  {
    slug: 'hydration-tracker',
    title: 'Hydration Tracker',
    iconName: 'Droplets',
    kosha: 'Annamaya Kosha',
    status: 'available',
    shortDescription: 'Monitor daily water intake, set goals, and track progress for your physical body.',
    detailedDescription: 'Track your daily water consumption to ensure you stay adequately hydrated. Set a personal goal and log your intake throughout the day to maintain optimal hydration levels, which is crucial for the health of your Annamaya Kosha and overall well-being.',
    whyImportant: 'Proper hydration is essential for numerous bodily functions, including energy levels, digestion, cognitive function, and temperature regulation. Tracking intake helps prevent dehydration and supports overall physical health of the Annamaya Kosha.',
    howItWorksSteps: [
      { title: "Set Your Daily Hydration Goal", description: "Input your desired daily water intake in milliliters (ml), considering factors like weight and activity level.", iconName: 'Goal' },
      { title: "Log Water Intake Easily", description: "Use quick-add buttons for common amounts or enter custom values as you drink water throughout the day.", iconName: 'PlusCircle' },
      { title: "Monitor Your Hydration Progress", description: "Visually track your consumption against your daily goal with a progress bar and get insights into your hydration habits.", iconName: 'BarChart3' },
      { title: "Activity & Weather Adjustments (Future)", description: "Future updates will adjust hydration goals based on logged activities and local weather conditions for smarter hydration.", iconName: 'Settings2' },
      { title: "Reset Daily for Fresh Tracking", description: "Your progress is saved for the current day. Reset to start fresh each morning and maintain consistent hydration.", iconName: 'RefreshCw' }
    ],
    healthContext: 'Individual hydration needs vary. This tool is for general tracking for your Annamaya Kosha. Consult a healthcare professional for specific advice.',
  },
  {
    slug: 'nutrition-tracker-ayurveda',
    title: 'Ayurvedic Prakriti Quiz',
    iconName: 'NotebookText',
    kosha: 'Annamaya Kosha',
    status: 'available', 
    shortDescription: 'Discover your Ayurvedic Prakriti (Vata, Pitta, Kapha) for personalized wellness.',
    detailedDescription: 'Identify your Ayurvedic mind-body constitution (Prakriti) through a quiz. This helps in understanding food and lifestyle choices that promote balance for your Annamaya Kosha according to Ayurveda. Future updates will help track food intake based on Prakriti, Agni (digestive fire), and Ritu (seasonal needs).',
    whyImportant: 'Ayurveda emphasizes personalized nutrition based on individual constitution (Vata, Pitta, Kapha) to maintain health and prevent imbalances in the Annamaya Kosha. Understanding your Prakriti is the first step. Aligning food choices with Prakriti, Agni, and Ritu improves digestion, boosts immunity, and maintains well-being.',
    howItWorksSteps: [
        { title: "Answer Prakriti Quiz Questions", description: "Answer simple questions about your physical and mental tendencies to determine your mind-body type (Vata, Pitta, or Kapha).", iconName: 'FileQuestion' },
        { title: "Assess Your Agni (Future)", description: "Understand your digestive strength and get food suggestions that match your digestive capacity.", iconName: 'Flame'},
        { title: "Seasonal Food Suggestions (Future)", description: "Receive recommendations for foods ideal for the current Ritu (season) to maintain doshic balance.", iconName: 'CalendarDays'},
        { title: "Track and Adjust (Future)", description: "Log food intake and observe how your body feels, making adjustments as needed for optimal Annamaya Kosha health.", iconName: 'ListChecks'}
    ],
    healthContext: 'This quiz provides a preliminary insight into your Prakriti. For a comprehensive Ayurvedic assessment and dietary plan for your Annamaya Kosha, consult a qualified Ayurvedic practitioner.',
  },
  {
    slug: 'sleep-quality-tracker',
    title: 'Sleep Quality Tracker',
    iconName: 'BedDouble',
    kosha: 'Annamaya Kosha',
    status: 'available',
    shortDescription: 'Monitor sleep quality, analyze patterns, and get tips for better sleep hygiene to rejuvenate your Annamaya Kosha.',
    detailedDescription: 'This tool helps you track your sleep patterns by logging bedtime, wake-up time, and perceived quality. It calculates sleep duration and a simple sleep score, offering insights and tips to improve your sleep hygiene for better rest and recovery of your Annamaya Kosha (physical body).',
    whyImportant: 'Quality sleep is crucial for physical (Annamaya Kosha) and mental health. Understanding your sleep isn’t just about counting hours—it’s about knowing the quality of your rest. This tracker gives detailed insights and provides guidance on how to improve your nightly routine.',
    howItWorksSteps: [
      { title: "Log Your Sleep Details", description: "Enter the date, your bedtime, wake-up time, and rate your sleep quality. Optionally add notes or number of awakenings.", iconName: 'FileText' },
      { title: "View Sleep Insights & Score", description: "See your calculated sleep duration and a personalized sleep score. Future updates will include REM/cycle analysis.", iconName: 'MoonStar' },
      { title: "Track Sleep History & Patterns", description: "Review past sleep logs to identify patterns and understand how different factors affect your sleep quality over time.", iconName: 'LineChart' },
      { title: "Get Sleep Hygiene Tips", description: "Access general advice and actionable tips to improve your sleep habits and overall restfulness for better Annamaya Kosha health.", iconName: 'Lightbulb' }
    ],
    healthContext: 'This tracker provides general insights for your Annamaya Kosha and should not replace professional medical advice. For persistent sleep issues, consult a healthcare provider.',
  },
  {
    slug: 'exercise-log-suggestor',
    title: 'Exercise Log & Suggestor',
    iconName: 'Dumbbell',
    kosha: 'Annamaya Kosha',
    status: 'available',
    shortDescription: 'Track workouts and get exercise suggestions tailored to your body type and fitness goals for a healthy Annamaya Kosha.',
    detailedDescription: 'Log your physical activities, track your progress, and (in future updates) receive personalized exercise suggestions based on your fitness goals (strength, mobility, mindfulness like yoga), preferences, and Ayurvedic body type (Prakriti), supporting your Annamaya Kosha.',
    whyImportant: 'Consistent and appropriate exercise is key to physical health (Annamaya Kosha). This tool helps you log activities, monitor progress, and aims to help you find enjoyable and effective ways to stay active. Personalized suggestions ensure exercises align with your body’s needs and goals.',
    howItWorksSteps: [
        { title: "Set Fitness Goals (Future Feature)", description: "Indicate primary goals: strength, mobility, or mindfulness to tailor exercise suggestions.", iconName: 'Goal' },
        { title: "Identify Body Type (Future Feature)", description: "Input Ayurvedic body type (Prakriti) for tailored exercise suggestions aligned with your constitution.", iconName: 'PersonStanding' },
        { title: "Log Your Workouts Easily", description: "Record details like exercise type, duration, intensity, and any notes for each session to track your physical activity.", iconName: 'PlusCircle' },
        { title: "View Exercise History & Progress", description: "Review your past workouts to track consistency and progress over time, motivating your Annamaya Kosha fitness journey.", iconName: 'ListChecks' },
        { title: "Get Tailored Suggestions (Future Feature)", description: "Receive exercise recommendations based on your logs, goals, and body type for optimal physical health.", iconName: 'Settings2' },
    ],
    healthContext: 'This tool is for logging physical activity. Exercise suggestions are planned for future updates. Always consult a fitness professional or healthcare provider before starting a new exercise program, especially concerning your Annamaya Kosha.',
  },
  // Pranamaya Kosha
  {
    slug: 'breath-awareness-training',
    title: 'Breath Awareness Training',
    iconName: 'Wind', 
    kosha: 'Pranamaya Kosha',
    status: 'available', 
    shortDescription: 'Guided pranayama for energy balance, mental clarity, and Pranamaya Kosha vitality.',
    detailedDescription: 'Connect with your Pranamaya Kosha (energy body) through guided pranayama practices like Nadi Shodhana, Bhastrika, and Ujjayi. Master your breath to balance energy, calm your mind, and enhance vitality. The app guides inhale, exhale, and retention with visual/audio cues.',
    whyImportant: 'Your breath is the bridge between body and mind, vital for Pranamaya Kosha health. Pranayama improves mental clarity, emotional balance, vitality, and physical health by enhancing oxygen flow and reducing stress.',
    howItWorksSteps: [
      { title: "Choose a Pranayama Practice", description: "Select a pranayama technique (e.g., Nadi Shodhana, Bhastrika, Ujjayi) based on your current energy, emotion, or intention (calm, focus, energize).", iconName: 'ListChecks' },
      { title: "Follow Guided Breathing", description: "Use visual or audio cues to guide your breathing rhythm, including counts for inhale, exhale, and optional retention for effective pranayama.", iconName: 'PlayCircle' },
      { title: "Track Energy & Mood Shifts", description: "Reflect on how you feel post-session (centered, relaxed, alert). Log responses to find your ideal daily breathwork for Pranamaya Kosha balance.", iconName: 'BarChart3' },
      { title: "Create a Pranayama Routine", description: "Set reminders or build a pranayama schedule for morning, midday, or evening practice to foster consistency and energize your Pranamaya Kosha.", iconName: 'CalendarDays' }
    ],
    healthContext: 'Pranayama should be practiced gently. Consult a qualified yoga instructor if you have any respiratory conditions or health concerns, especially when working with your Pranamaya Kosha.',
  },
  {
    slug: 'energy-flow-assessment',
    title: 'Energy Flow Assessment',
    iconName: 'Zap', 
    kosha: 'Pranamaya Kosha',
    status: 'available', 
    shortDescription: 'Assess pranic energy, identify blocks in your Pranamaya Kosha, and get suggestions for balance.',
    detailedDescription: 'Gauge your pranic energy (life force) by identifying blocks, imbalances, or fatigue within your subtle body (Pranamaya Kosha). Gain insights into how energy flows through you via self-assessment surveys and (optional future) sensor data, and learn how to restore balance and vitality.',
    whyImportant: 'Blocked or imbalanced prana in the Pranamaya Kosha can lead to physical fatigue, emotional instability, or lack of mental focus. This feature helps you understand subtle energy patterns and take steps (breathwork, meditation, lifestyle changes) to restore balance.',
    howItWorksSteps: [
      { title: "Take the Energy Survey", description: "Answer thoughtful questions related to your current physical, mental, and emotional state based on yogic and Ayurvedic wisdom of Pranamaya Kosha.", iconName: 'NotebookText' },
      { title: "Connect a Sensor (Optional - Future)", description: "Link compatible wearables for real-time data (HRV, breathing rate) to enhance Pranamaya Kosha assessment accuracy.", iconName: 'Settings2' },
      { title: "View Your Energy Map (Future)", description: "Get a snapshot of your energy flow, highlighting chakra/nadi activity, blockages, or depletion in your Pranamaya Kosha.", iconName: 'BarChart3' },
      { title: "Get Personalized Suggestions for Energy Balance", description: "Receive recommendations for pranayama, meditation, or movement to restore balance in your Pranamaya Kosha based on results.", iconName: 'Lightbulb' }
    ],
    healthContext: 'This Pranamaya Kosha assessment provides insights, not medical diagnoses. Consult a healthcare professional for health concerns.',
  },
  {
    slug: 'chakra-checkin',
    title: 'Chakra Check-in',
    iconName: 'Sparkles', 
    kosha: 'Pranamaya Kosha',
    status: 'available', 
    shortDescription: 'Reflect on your emotional/energetic state for chakra imbalances and healing, nurturing your Pranamaya Kosha.',
    detailedDescription: 'This introspective tool helps you reflect on your emotional and energetic state, mapping it to the seven main chakras (Root, Sacral, Solar Plexus, Heart, Throat, Third Eye, Crown) to identify potential imbalances and receive suggestions for harmony. It supports emotional healing and energetic alignment within your Pranamaya Kosha.',
    whyImportant: 'Chakras, key components of the Pranamaya Kosha, influence physical, emotional, and mental well-being. Regular check-ins enhance self-awareness of your internal landscape and guide practices for energetic balance, emotional equilibrium, clarity, and vitality.',
     howItWorksSteps: [
      { title: "Answer a Quick Chakra Check-in", description: "Respond to questions about feelings and energy related to each chakra (e.g., safety, creativity, confidence, love, expression, intuition, connection) to assess your Pranamaya Kosha.", iconName: 'NotebookText' },
      { title: "View Chakra Insights & Balance", description: "The app maps responses to chakras, showing where energy might be balanced, underactive, or overactive within your Pranamaya Kosha.", iconName: 'BrainCircuit' },
      { title: "Receive Chakra Healing Tips", description: "Get simple, actionable tips like affirmations, journaling, breathwork, meditation, sound or color therapy tailored to your Pranamaya Kosha needs.", iconName: 'Lightbulb' },
      { title: "Track Your Chakra Journey", description: "Over time, observe patterns in your chakra energy and emotional health, empowering you to live more consciously and balance your Pranamaya Kosha.", iconName: 'CheckCircle' }
    ],
    healthContext: "This tool is for self-reflection on your Pranamaya Kosha. For serious concerns, consult a qualified professional."
  },
  // Manomaya Kosha
  {
    slug: 'mood-tracker',
    title: 'Mood Tracker',
    iconName: 'SmileIcon',
    kosha: 'Manomaya Kosha',
    status: 'available',
    shortDescription: 'Track daily emotions and mental states for greater emotional awareness and Manomaya Kosha balance.',
    detailedDescription: 'Log your daily emotions and mental states (using emojis/icons or short journal entries) to foster greater self-understanding and identify patterns or triggers affecting your mood. This tool supports the Manomaya Kosha (mind/emotional body) by encouraging mindful observation of your inner landscape. Optional prompts can guide reflection.',
    whyImportant: 'Understanding your emotional landscape is key to mental well-being and Manomaya Kosha health. Tracking moods helps manage stress, improve emotional regulation, and enhance overall quality of life. Your thoughts and emotions deeply influence your well-being. This habit supports mental clarity and balance.',
    howItWorksSteps: [
        { title: "Log Your Current Mood", description: "Use emojis, colors, or short notes to record how you feel. Optionally add a journal entry or respond to a prompt for deeper Manomaya Kosha insight.", iconName: 'SmileIcon' }, 
        { title: "Reflect with Journaling Prompts (Optional)", description: "Use guided prompts (e.g., “What made me feel good today?”) to deepen self-reflection on your Manomaya Kosha.", iconName: 'PenLine' },
        { title: "View Mood History & Patterns", description: "Review past entries to observe emotional patterns and triggers over time. View charts or summaries of emotional evolution within your Manomaya Kosha.", iconName: 'ListChecks' },
        { title: "Identify Emotional Patterns & Get Tips (Future)", description: "Recognize recurring moods or situations to better understand your emotional landscape and receive tips for Manomaya Kosha balance (future feature).", iconName: 'BarChart3' }
    ],
    healthContext: "This Manomaya Kosha tracker is for personal insight and not a replacement for professional mental health support."
  },
  {
    slug: 'stress-scanner',
    title: 'Stress Scanner',
    iconName: 'ShieldAlert', 
    kosha: 'Manomaya Kosha',
    status: 'available', 
    shortDescription: 'Detect and understand stress levels via self-assessment for Manomaya Kosha awareness.',
    detailedDescription: 'This tool helps you detect and understand your stress levels using a self-assessment questionnaire, providing immediate feedback on your mental-emotional state. It supports the Manomaya Kosha (mind/emotional body) by fostering self-awareness of stress triggers. (Future AI analysis of voice/facial cues planned).',
    whyImportant: 'Early detection of stress can help in taking proactive steps to manage it, preventing burnout and promoting emotional resilience within your Manomaya Kosha. Stress often shows up in our body and voice before we consciously realize it.',
    howItWorksSteps: [
        { title: "Take a Quick Stress Self-Assessment", description: "Answer reflective questions about your current mood, energy, physical sensations (e.g., tension, heart rate), and mental state to scan your Manomaya Kosha.", iconName: 'FileQuestion' }, 
        { title: "AI Analysis for Stress (Future Feature)", description: "Future updates may include optional voice tone or facial tension analysis via microphone/camera for deeper Manomaya Kosha insights.", iconName: 'Settings2' },
        { title: "View Your Stress Score & Level", description: "See a simple readout of your current stress level (e.g., low, moderate, high) based on your self-assessment of the Manomaya Kosha.", iconName: 'BarChart3' }, 
        { title: "Get Personalized Calming Tips", description: "Receive calming suggestions like guided breathing, mindfulness exercises, or short meditations to balance your Manomaya Kosha.", iconName: 'Lightbulb' }
    ],
    healthContext: "This tool provides general stress insights from self-assessment for your Manomaya Kosha. Consult a healthcare professional for persistent stress or anxiety. AI features are planned for the future."
  },
  {
    slug: 'meditation-journal',
    title: 'Meditation Journal',
    iconName: 'BookText',
    kosha: 'Manomaya Kosha',
    status: 'available',
    shortDescription: 'Combine guided meditations with personal reflection for Manomaya Kosha well-being.',
    detailedDescription: 'Integrate guided meditations (tailored to emotions like anxiety, sadness, joy) with a personal reflection space to deepen your practice, foster emotional healing, and enhance self-awareness related to your Manomaya Kosha (mind body). Track how meditations affect your mood and mental state.',
    whyImportant: 'Journaling after meditation solidifies insights, helps process emotions, and tracks progress in mindfulness, promoting mental clarity and emotional balance in the Manomaya Kosha. It aligns mental and emotional well-being, transforming meditation into an interactive journey.',
     howItWorksSteps: [
        { title: "Select How You Feel for Meditation", description: "Choose an emotional state (e.g., anxiety, sadness, joy) to get a matching guided meditation for your Manomaya Kosha.", iconName: 'Palette' }, 
        { title: "Practice Meditation with Presence", description: "Listen to a meditation based on your needs, focusing on your chosen emotional state to calm or uplift your Manomaya Kosha.", iconName: 'PlayCircle' },
        { title: "Reflect & Write in Your Journal", description: "Journal thoughts, feelings, or shifts in awareness experienced during the meditation, deepening your Manomaya Kosha understanding.", iconName: 'PenLine' },
        { title: "Track Emotional Growth & Clarity", description: "Browse entries to observe emotional patterns, healing progress, or deeper clarity within your Manomaya Kosha. See how meditations impact your mood over time.", iconName: 'BarChart3' } 
    ],
    healthContext: "This Manomaya Kosha journal is a tool for self-reflection, not a substitute for therapy if needed."
  },
  // Vijnanamaya Kosha
  {
    slug: 'self-inquiry-prompts',
    title: 'Self-Inquiry Prompts',
    iconName: 'PenLine',
    kosha: 'Vijnanamaya Kosha',
    status: 'available',
    shortDescription: 'Daily/weekly reflective questions to deepen connection with inner wisdom and Vijnanamaya Kosha.',
    detailedDescription: 'Engage with daily or weekly reflective questions (e.g., "Who am I beyond my roles?") designed to deepen your connection with inner wisdom, supporting the Vijnanamaya Kosha (wisdom body). Explore identity, beliefs, purpose, and intuition through a personal journal in the app. Optionally receive spiritual insights or quotes.',
    whyImportant: 'Self-inquiry cultivates discernment (viveka), reveals limiting patterns, awakens self-awareness, and aligns actions with values. It nourishes the Vijnanamaya Kosha by encouraging conscious inner dialogue on themes like identity, purpose, and intuition. This becomes a quiet companion on your inner journey.',
    howItWorksSteps: [
        { title: "Receive a Reflective Prompt", description: "Get a daily/weekly question focused on self-discovery (e.g., \"Who am I beyond my roles?\", \"What belief shapes my decision now?\") to engage your Vijnanamaya Kosha.", iconName: 'FileText' }, 
        { title: "Reflect & Write Your Insights", description: "Journal your thoughts, intuitions, or realizations in the app. The process is about honest exploration of your Vijnanamaya Kosha.", iconName: 'PenLine' },
        { title: "Explore Deeper Self-Awareness", description: "Revisit past reflections to see how your awareness and insights evolve over time. Discover patterns in your thinking and Vijnanamaya Kosha development.", iconName: 'Library' }, 
        { title: "Anchor Your Wisdom in Daily Life", description: "Use what you uncover to make more aligned, conscious choices in daily life. Optionally receive related spiritual quotes to nurture your Vijnanamaya Kosha.", iconName: 'Lightbulb' }
    ],
    healthContext: "These Vijnanamaya Kosha prompts are for personal growth. For deeper psychological exploration, consider professional guidance."
  },
  {
    slug: 'spiritual-book-tracker',
    title: 'Spiritual Book Tracker',
    iconName: 'Library',
    kosha: 'Vijnanamaya Kosha',
    status: 'available',
    shortDescription: 'Track study of sacred texts, reflect on wisdom, and nurture Vijnanamaya Kosha (wisdom body).',
    detailedDescription: 'Track your study of sacred or philosophical texts (e.g., Gita, Upanishads, Yoga Sutras), reflect on their wisdom with notes, and nurture your Vijnanamaya Kosha (wisdom body) through mindful learning. Set study reminders and bookmark favorite verses. Discover recommended texts.',
    whyImportant: 'Engaging with wisdom literature sharpens intellect and intuition (Vijnanamaya Kosha), deepens understanding of your true nature, and aligns life with universal principles. Tracking and reflecting on studies transforms reading into a spiritual practice, fostering inner assimilation of timeless truths.',
    howItWorksSteps: [
        { title: "Choose a Wisdom Text to Study", description: "Add a sacred or philosophical text to study from a curated list or by adding your own. View suggested texts from various traditions to enrich your Vijnanamaya Kosha.", iconName: 'BookOpenCheck' }, 
        { title: "Set a Study Pace & Reminders", description: "Decide how often to read and reflect (e.g., daily, weekly). Set study reminders to maintain consistency in your Vijnanamaya Kosha development.", iconName: 'Edit3' }, 
        { title: "Log Progress & Reflect on Teachings", description: "Track chapters/verses completed. Journal what each passage means to you or how it applies to life. Bookmark key insights for your Vijnanamaya Kosha.", iconName: 'Library' },
        { title: "Grow with Wisdom & Insights", description: "Over time, build a personal archive of insights. Revisit favorite verses or quotes for inspiration and clarity, nurturing your Vijnanamaya Kosha.", iconName: 'ThumbsUp' } 
    ],
     healthContext: "This Vijnanamaya Kosha tracker is a tool for personal study and reflection."
  },
  {
    slug: 'sankalpa-recorder',
    title: 'Sankalpa Recorder',
    iconName: 'HeartHandshake',
    kosha: 'Vijnanamaya Kosha',
    status: 'available',
    shortDescription: 'Define, record, and revisit your heartfelt spiritual intention (Sankalpa) to strengthen your Vijnanamaya Kosha.',
    detailedDescription: 'Define, record (text/voice), and revisit your Sankalpa—a heartfelt spiritual intention (e.g., "I live with compassion")—to guide conscious living and strengthen your Vijnanamaya Kosha (wisdom body). Includes reminders and a reflection journal.',
    whyImportant: 'A Sankalpa is a powerful, soul-aligned resolve that strengthens willpower and discernment (Vijnanamaya Kosha). Regularly connecting with it helps align actions with highest values and nourishes the wisdom body. It is more than a goal; it’s a vow.',
    howItWorksSteps: [
        { title: "Create Your Sankalpa (Heartfelt Intention)", description: "Craft a clear, positive, present-tense spiritual intention (e.g., \"I live with compassion and presence.\") aligned with your Vijnanamaya Kosha.", iconName: 'Edit3' }, 
        { title: "Record Your Intention (Text/Voice)", description: "Write or voice-record your Sankalpa, making it a powerful affirmation for your Vijnanamaya Kosha.", iconName: 'Mic' }, 
        { title: "Revisit & Reinforce Your Sankalpa", description: "Get daily/weekly reminders to reconnect with your Sankalpa. Listen or read it during meditation or for focus, strengthening your Vijnanamaya Kosha.", iconName: 'History' }, 
        { title: "Reflect on Its Impact on Your Life", description: "Journal how your Sankalpa shapes your life, decisions, or mindset over time. Track engagement with your Vijnanamaya Kosha intention.", iconName: 'Lightbulb' }
    ],
     healthContext: "Sankalpa practice is a personal tool for spiritual alignment and Vijnanamaya Kosha development."
  },
  // Anandamaya Kosha
  {
    slug: 'gratitude-log',
    title: 'Gratitude Log',
    iconName: 'Gift',
    kosha: 'Anandamaya Kosha',
    status: 'available',
    shortDescription: 'Cultivate daily gratitude to nourish your Anandamaya Kosha (bliss body) and foster an uplifted spirit.',
    detailedDescription: 'Cultivate a daily practice of gratitude by logging moments of thankfulness (big or small) to nourish your Anandamaya Kosha (bliss body). This practice fosters an uplifted spirit, a heart full of appreciation, and improves mental well-being. Optional prompts can inspire entries.',
    whyImportant: 'Gratitude shifts focus from scarcity to abundance, cultivates joy, deepens connection to life\'s inherent bliss, and elevates consciousness. It is a simple yet profound practice for emotional well-being and nourishing the Anandamaya Kosha.',
    howItWorksSteps: [
        { title: "Log Daily Gratitude Moments", description: "Write or voice-record something you're grateful for daily (e.g., sunshine, a kind word, a personal strength) to connect with your Anandamaya Kosha.", iconName: 'NotebookText' },
        { title: "Reflect on the Positives with Prompts", description: "Use reminders or optional prompts (e.g., \"What made you smile today?\") to inspire gratitude and nurture your Anandamaya Kosha.", iconName: 'SmileIcon' }, 
        { title: "Track Your Journey of Joy", description: "Review past entries to recognize patterns of joy and see how your perspective evolves, enhancing your Anandamaya Kosha experience.", iconName: 'BarChart3' }, 
        { title: "Feel the Shift Towards Bliss", description: "Regular practice increases positive emotions, transforming ordinary moments into sources of bliss and enriching your Anandamaya Kosha.", iconName: 'Sparkles' }
    ],
     healthContext: "Gratitude practice is a beneficial tool for enhancing well-being and connecting with your Anandamaya Kosha."
  },
  {
    slug: 'bhakti-timer',
    title: 'Bhakti Timer',
    iconName: 'TimerIcon',
    kosha: 'Anandamaya Kosha',
    status: 'available',
    shortDescription: 'Track devotional practices like chanting, singing, puja, and seva to nourish your Anandamaya Kosha.',
    detailedDescription: 'Track and enhance devotional practices such as chanting, singing, puja (rituals), and seva (selfless service) using a customizable timer. Cultivate spiritual fulfillment, foster consistency, and nourish your Anandamaya Kosha (bliss body). Reflect on the impact of your practice.',
    whyImportant: 'Devotional practices (Bhakti Yoga) foster a heart-centered connection with the Divine or one\'s spiritual ideals, leading to experiences of love, peace, and bliss, nourishing the Anandamaya Kosha and creating a sacred rhythm in life.',
    howItWorksSteps: [
        { title: "Begin Your Devotional Practice", description: "Start any devotional activity (chanting mantras, singing bhajans, puja, selfless service) to connect with your Anandamaya Kosha.", iconName: 'HeartHandshake' },
        { title: "Start the Bhakti Timer", description: "Track time spent in devotion with a customizable timer for specific activities or open-ended sessions, nurturing your Anandamaya Kosha.", iconName: 'TimerIcon' },
        { title: "Reflect on Your Experience (Optional)", description: "After your session, reflect on the emotional and spiritual impact of the activity on your Anandamaya Kosha. Note any insights.", iconName: 'Lightbulb' },
        { title: "Track Your Devotional Journey", description: "Review time spent on devotion over days/weeks. Set reminders to maintain consistency and deepen your Anandamaya Kosha connection.", iconName: 'CalendarDays' } 
    ],
    healthContext: "This timer supports personal devotional practices for Anandamaya Kosha enrichment."
  },
  {
    slug: 'silence-tracker',
    title: 'Silence Tracker',
    iconName: 'VolumeX',
    kosha: 'Anandamaya Kosha',
    status: 'available',
    shortDescription: 'Practice stillness and silence to cultivate inner peace and connect with your Anandamaya Kosha (blissful nature).',
    detailedDescription: 'Practice and track periods of stillness and silence (e.g., silent meditation, quiet reflection, moments of presence without distractions) to cultivate inner peace, deepen self-awareness, and connect with your Anandamaya Kosha (blissful nature). Use the timer or log manually and reflect on your experience.',
     howItWorksSteps: [
        { title: "Choose Your Silent Time", description: "Decide when and how long to practice silence daily. Use the built-in timer or log manually to nurture your Anandamaya Kosha.", iconName: 'CalendarDays' },
        { title: "Start the Timer / Practice Silence", description: "Engage in silence, whether meditation, mindful listening, or quiet reflection, connecting with your Anandamaya Kosha.", iconName: 'TimerIcon' },
        { title: "Reflect on Your Inner State", description: "Note shifts in mental or emotional state—peace, connection, clarity—after your session, observing your Anandamaya Kosha.", iconName: 'Lightbulb' },
        { title: "Track Your Silence Journey & Bliss", description: "Review progress over time to see how silence enhances connection to your Anandamaya Kosha (bliss body) and brings tranquility.", iconName: 'ListChecks' }
    ],
    whyImportant: "Intentional silence disconnects from external noise, allowing for profound inner awareness and connection to a state of blissful stillness (Anandamaya Kosha). It is a powerful tool for mental clarity, spiritual awakening, and nourishing the Anandamaya Kosha. It helps recharge and experience true peace.",
    healthContext: "Silence practice is a tool for self-awareness, relaxation, and connecting with your Anandamaya Kosha."
  },
];

// Helper function to get calculator details by slug
export const getCalculatorBySlug = (slug: string): CalculatorInfo | undefined => {
  return calculatorDetailsList.find(calc => calc.slug === slug);
};
