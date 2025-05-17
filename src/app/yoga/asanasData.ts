
import type { LucideIcon } from 'lucide-react'; // Not used directly here, but for potential future use.

export interface AsanaInfo {
  id: string;
  name: string;
  englishName: string;
  category: string;
  difficulty: string;
  benefits: string[];
  instructions: string[];
  modifications: string[];
  contraindications: string[];
  koshaImpact: string[];
  doshaImpact: {
    balances: string[];
    mayAggravate: string[];
  };
  duration: string;
  repetitions: string;
  image: string;
  video: string;
  slug: string;
  imageHint?: string;
}

// Helper function to slugify names for URLs
const slugify = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
};

const asanasSourceData: Omit<AsanaInfo, 'slug'>[] = [
  {
    id: "asana_001",
    name: "Tadasana",
    englishName: "Mountain Pose",
    category: "Standing",
    difficulty: "Beginner",
    benefits: [
      "Improves posture and body awareness",
      "Strengthens thighs, knees, and ankles",
      "Firms abdomen and buttocks",
      "Relieves sciatica",
      "Reduces flat feet",
      "Grounds and centers the mind"
    ],
    instructions: [
      "Stand tall with your big toes touching and heels slightly apart. If more comfortable, stand with feet hip-width apart.",
      "Ground down through all four corners of your feet. Lift your inner arches.",
      "Engage your thigh muscles by lifting your kneecaps.",
      "Keep your core slightly engaged. Tuck your tailbone slightly to lengthen your lower back.",
      "Broaden your collarbones. Relax your shoulders down and back, away from your ears.",
      "Align your head directly over your pelvis, with your chin parallel to the floor.",
      "Let your arms hang by your sides, palms facing your thighs or forward.",
      "Breathe evenly and calmly, feeling the stability and stillness of a mountain."
    ],
    modifications: [
      "Stand with feet hip-width apart for better balance.",
      "Use a wall behind for posture support and feedback.",
      "For a deeper stretch, interlace fingers, extend arms overhead, palms facing up."
    ],
    contraindications: [
      "Chronic headaches or migraines (practice with caution)",
      "Insomnia (practice with caution)",
      "Low blood pressure (practice with caution)",
      "Dizziness or vertigo"
    ],
    koshaImpact: [
      "Annamaya Kosha (Physical stability and alignment)",
      "Manomaya Kosha (Cultivates mental stillness and presence)"
    ],
    doshaImpact: {
      balances: ["Vata (grounding)", "Kapha (energizing if held with awareness)"],
      mayAggravate: []
    },
    duration: "30 seconds to 1 minute",
    repetitions: "1-3 times, or as a starting/ending pose",
    image: "https://i.pinimg.com/736x/0e/eb/26/0eeb267d65b2df75aa15a74b9bf3c60b.jpg",
    imageHint: "mountain pose yoga",
    video: "https://www.youtube.com/results?search_query=Tadasana+Mountain+Pose+yoga"
  },
  {
    id: "asana_002",
    name: "Bhujangasana",
    englishName: "Cobra Pose",
    category: "Backbend",
    difficulty: "Beginner",
    benefits: [
      "Strengthens the spine, chest, and abdomen",
      "Stretches shoulders and chest",
      "Increases flexibility of the back",
      "Stimulates abdominal organs, improving digestion",
      "Helps relieve stress and fatigue",
      "Opens the heart and lungs"
    ],
    instructions: [
      "Lie prone on the floor. Stretch your legs back, tops of the feet on the floor.",
      "Place your hands on the floor under your shoulders, fingers pointing forward.",
      "Hug your elbows back into your body.",
      "Press the tops of your feet, thighs, and pubic bone firmly into the floor.",
      "On an inhalation, begin to straighten the arms to lift the chest off the floor, going only to the height at which you can maintain a connection through your pubic bone to your legs.",
      "Keep your shoulders relaxed and away from your ears. Broaden your collarbones.",
      "Look straight ahead or slightly upward, ensuring not to compress the back of your neck.",
      "Hold the pose for 15 to 30 seconds, breathing easily."
    ],
    modifications: [
      "Sphinx Pose (Salamba Bhujangasana): Keep forearms on the floor for less intensity.",
      "Baby Cobra: Lift only a few inches, using back muscles more than arm strength.",
      "Use a folded blanket under the pelvis for support if you feel discomfort in the lower back."
    ],
    contraindications: [
      "Pregnancy",
      "Recent abdominal surgery",
      "Severe back injuries (e.g., herniated disc)",
      "Carpal tunnel syndrome",
      "Headache"
    ],
    koshaImpact: [
      "Annamaya Kosha (Strengthens back, opens chest)",
      "Pranamaya Kosha (Expands breath capacity, energizes)",
      "Manomaya Kosha (Can be uplifting, builds confidence)"
    ],
    doshaImpact: {
      balances: ["Kapha (reduces sluggishness)", "Vata (warms, but avoid over-arching)"],
      mayAggravate: ["Pitta (can increase heat if held too long or intensely)"]
    },
    duration: "15–30 seconds per repetition",
    repetitions: "2-3 times, with rest in between",
    image: "https://i.pinimg.com/736x/3b/35/5a/3b355ad6638e8b8bce82981a617c1b63.jpg",
    imageHint: "cobra pose yoga",
    video: "https://www.youtube.com/results?search_query=Bhujangasana+Cobra+Pose+yoga"
  },
  {
    id: "asana_003",
    name: "Trikonasana",
    englishName: "Triangle Pose",
    category: "Standing",
    difficulty: "Beginner to Intermediate",
    benefits: [
      "Stretches legs, hips, spine, and chest",
      "Improves digestion",
      "Relieves stress and anxiety"
    ],
    instructions: [
      "Stand with feet 3–4 feet apart.",
      "Turn right foot out 90°, left foot in slightly.",
      "Extend arms sideways at shoulder height.",
      "Inhale, then exhale and bend to the right, placing right hand on shin or floor.",
      "Lift left arm towards the ceiling, gaze up at the thumb."
    ],
    modifications: [
      "Use a block under the lower hand for support.",
      "Rest the back heel against a wall for stability."
    ],
    contraindications: [
      "Low blood pressure",
      "Diarrhea",
      "Neck issues (gaze forward or downward instead of upward)"
    ],
    koshaImpact: [
      "Annamaya Kosha",
      "Manomaya Kosha",
      "Pranamaya Kosha"
    ],
    doshaImpact: {
      balances: ["Kapha", "Vata"],
      mayAggravate: ["Pitta"]
    },
    duration: "30–60 seconds each side",
    repetitions: "1-2 rounds",
    image: "https://i.pinimg.com/736x/7a/de/9e/7ade9e0699e517fe43b3aa21e6aa13ee.jpg",
    imageHint: "triangle pose yoga",
    video: "https://www.youtube.com/results?search_query=Trikonasana+Triangle+Pose+yoga"
  },
  {
    id: "asana_004",
    name: "Padmasana",
    englishName: "Lotus Pose",
    category: "Seated / Meditative",
    difficulty: "Intermediate to Advanced",
    benefits: [
      "Calms the brain and increases awareness",
      "Stretches knees and ankles",
      "Facilitates meditation and pranayama"
    ],
    instructions: [
      "Sit on the floor with legs extended.",
      "Bend the right knee and place the foot on the left thigh.",
      "Bend the left knee and place the foot on the right thigh.",
      "Hands rest on knees in chin or jnana mudra.",
      "Spine erect, gaze softly ahead or eyes closed."
    ],
    modifications: [
      "Sit in Ardha Padmasana (Half Lotus) or Sukhasana.",
      "Use a cushion or folded blanket to elevate hips."
    ],
    contraindications: [
      "Knee or ankle injuries",
      "Severe hip tightness",
      "Sciatica"
    ],
    koshaImpact: [
      "Annamaya Kosha",
      "Manomaya Kosha",
      "Vijnanamaya Kosha"
    ],
    doshaImpact: {
      balances: ["Vata", "Pitta"],
      mayAggravate: ["Kapha"]
    },
    duration: "1–5 minutes or more",
    repetitions: "As needed for meditation",
    image: "https://i.pinimg.com/736x/e8/f3/49/e8f349614d571ffcaf94df764ffa2e15.jpg",
    imageHint: "lotus pose yoga",
    video: "https://www.youtube.com/results?search_query=Padmasana+Lotus+Pose+yoga"
  },
  {
    id: "asana_005",
    name: "Virabhadrasana I",
    englishName: "Warrior I Pose",
    category: "Standing",
    difficulty: "Intermediate",
    benefits: [
      "Strengthens the legs, arms, and core",
      "Stretches the chest and lungs",
      "Improves focus and balance"
    ],
    instructions: [
      "Stand with feet 3–4 feet apart.",
      "Turn the right foot out 90° and the left foot slightly in.",
      "Bend the right knee to 90°, ensuring the knee is directly above the ankle.",
      "Raise the arms overhead, keeping the palms facing inward.",
      "Gaze forward or slightly up."
    ],
    modifications: [
      "Lower the arms if they are too challenging or if shoulder discomfort arises.",
      "Use a block under the back heel for stability."
    ],
    contraindications: [
      "Knee injuries",
      "Shoulder issues",
      "Low back pain"
    ],
    koshaImpact: [
      "Annamaya Kosha",
      "Pranamaya Kosha",
      "Manomaya Kosha"
    ],
    doshaImpact: {
      balances: ["Kapha", "Vata"],
      mayAggravate: ["Pitta"]
    },
    duration: "30 seconds to 1 minute on each side",
    repetitions: "1-2 rounds",
    image: "https://i.pinimg.com/736x/0a/65/17/0a6517a89eb0d5188376357be4746b2f.jpg",
    imageHint: "warrior one yoga",
    video: "https://www.youtube.com/results?search_query=Virabhadrasana+I+Warrior+I+Pose+yoga"
  },
  {
    id: "asana_006",
    name: "Setu Bandhasana",
    englishName: "Bridge Pose",
    category: "Backbend",
    difficulty: "Beginner",
    benefits: [
      "Strengthens the back, glutes, and legs",
      "Opens the chest and heart",
      "Improves posture and reduces stress"
    ],
    instructions: [
      "Lie on your back with knees bent and feet flat on the floor, hip-width apart.",
      "Place arms alongside the body with palms facing down.",
      "Press into your feet and lift the hips toward the ceiling.",
      "Engage your core and squeeze the glutes.",
      "Hold the pose, keeping the thighs parallel."
    ],
    modifications: [
      "Use a block under the sacrum for support.",
      "Place a bolster under the upper back for restorative variation."
    ],
    contraindications: [
      "Neck injuries",
      "Shoulder injuries",
      "Spinal issues"
    ],
    koshaImpact: [
      "Annamaya Kosha",
      "Pranamaya Kosha"
    ],
    doshaImpact: {
      balances: ["Kapha"],
      mayAggravate: ["Vata", "Pitta"]
    },
    duration: "30 seconds to 1 minute",
    repetitions: "2-3 rounds",
    image: "https://i.pinimg.com/736x/71/35/b5/7135b5343d40d52a0f93ab18f55772ee.jpg",
    imageHint: "bridge pose yoga",
    video: "https://www.youtube.com/results?search_query=Setu+Bandhasana+Bridge+Pose+yoga"
  },
  {
    id: "asana_007",
    name: "Adho Mukha Svanasana",
    englishName: "Downward-Facing Dog Pose",
    category: "Inversion",
    difficulty: "Beginner",
    benefits: [
      "Stretches the hamstrings, calves, and spine",
      "Strengthens the arms, shoulders, and core",
      "Improves circulation and relieves stress"
    ],
    instructions: [
      "Start on hands and knees with wrists directly under shoulders and knees under hips.",
      "Press into your palms and lift your hips up and back, aiming to form an inverted 'V' shape.",
      "Keep feet hip-width apart and hands shoulder-width apart.",
      "Press the heels toward the floor and keep your head between your arms with the gaze towards your legs."
    ],
    modifications: [
      "Bend your knees if your hamstrings are tight.",
      "Use blocks under the hands if the floor feels too far away."
    ],
    contraindications: [
      "Neck pain",
      "Wrist injuries",
      "Glaucoma"
    ],
    koshaImpact: [
      "Annamaya Kosha",
      "Pranamaya Kosha"
    ],
    doshaImpact: {
      balances: ["Vata", "Pitta"],
      mayAggravate: ["Kapha"]
    },
    duration: "30 seconds to 1 minute",
    repetitions: "2-3 rounds",
    image: "https://i.pinimg.com/736x/d3/27/65/d32765e6131d59c354b4bb0f3437a8db.jpg",
    imageHint: "downward dog yoga",
    video: "https://www.youtube.com/results?search_query=Adho+Mukha+Svanasana+yoga"
  },
  {
    id: "asana_008",
    name: "Uttanasana",
    englishName: "Forward Fold Pose",
    category: "Standing / Forward Bend",
    difficulty: "Beginner",
    benefits: [
      "Stretches the hamstrings, calves, and spine",
      "Calms the nervous system",
      "Improves circulation to the brain"
    ],
    instructions: [
      "Stand with feet hip-width apart.",
      "Inhale and lengthen the spine, then exhale and fold forward from the hips.",
      "Keep your knees slightly bent if your hamstrings are tight.",
      "Let the head hang heavy, and hold onto the ankles, shins, or the floor."
    ],
    modifications: [
      "Bend the knees deeply to make the pose more accessible.",
      "Use blocks under the hands for additional support."
    ],
    contraindications: [
      "Back injuries",
      "Hamstring injuries",
      "Pregnancy (avoid deep folding)"
    ],
    koshaImpact: [
      "Annamaya Kosha",
      "Pranamaya Kosha",
      "Manomaya Kosha"
    ],
    doshaImpact: {
      balances: ["Vata", "Pitta"],
      mayAggravate: ["Kapha"]
    },
    duration: "30 seconds to 1 minute",
    repetitions: "2-3 rounds",
    image: "https://i.pinimg.com/736x/c6/36/ae/c636aee17f41b475ef758ead9c674f5e.jpg",
    imageHint: "forward fold yoga",
    video: "https://www.youtube.com/results?search_query=Uttanasana+Forward+Fold+Pose+yoga"
  },
  {
    id: "asana_009",
    name: "Halasana",
    englishName: "Plow Pose",
    category: "Backbend / Inversion",
    difficulty: "Intermediate",
    benefits: [
      "Stretches the back, shoulders, and spine",
      "Improves flexibility in the legs and hips",
      "Stimulates the thyroid gland"
    ],
    instructions: [
      "Lie on your back with your arms by your sides.",
      "Inhale and lift your legs up towards the ceiling.",
      "Exhale and slowly bring your legs overhead, touching the floor with your feet.",
      "Keep the arms firmly on the floor and the palms facing down.",
      "Engage the core and hold for a few breaths."
    ],
    modifications: [
      "Use a block under the lower back for extra support.",
      "If the feet don't touch the floor, keep the legs hovering above the ground."
    ],
    contraindications: [
      "Neck injuries",
      "Spine problems",
      "High blood pressure"
    ],
    koshaImpact: [
      "Annamaya Kosha",
      "Pranamaya Kosha",
      "Manomaya Kosha"
    ],
    doshaImpact: {
      balances: ["Vata"],
      mayAggravate: ["Kapha"]
    },
    duration: "30 seconds to 1 minute",
    repetitions: "2-3 rounds",
    image: "https://i.pinimg.com/736x/49/8e/9f/498e9f61377ff2bc443eba590764398f.jpg",
    imageHint: "plow pose yoga",
    video: "https://www.youtube.com/results?search_query=Halasana+Plow+Pose+yoga"
  },
  {
    id: "asana_010",
    name: "Dhanurasana",
    englishName: "Bow Pose",
    category: "Backbend",
    difficulty: "Intermediate",
    benefits: [
      "Strengthens the back, arms, and legs",
      "Opens the chest and improves posture",
      "Stimulates the abdominal organs"
    ],
    instructions: [
      "Lie on your stomach with your arms at your sides.",
      "Bend your knees and reach back with your hands to hold your ankles.",
      "Inhale and lift your chest and thighs off the floor, pulling your ankles towards your body.",
      "Lift your head and gaze forward, keeping the back extended."
    ],
    modifications: [
      "Use a strap around the ankles if it's difficult to reach them.",
      "If back pain is felt, keep the chest and legs lower to the floor."
    ],
    contraindications: [
      "Back injuries",
      "Neck pain",
      "Heart conditions"
    ],
    koshaImpact: [
      "Annamaya Kosha",
      "Pranamaya Kosha",
      "Manomaya Kosha"
    ],
    doshaImpact: {
      balances: ["Kapha", "Vata"],
      mayAggravate: ["Pitta"]
    },
    duration: "20-30 seconds",
    repetitions: "1-2 rounds",
    image: "https://i.pinimg.com/736x/62/85/31/628531058c76f329066d31bdbbf4edf2.jpg",
    imageHint: "bow pose yoga",
    video: "https://www.youtube.com/results?search_query=Dhanurasana+Bow+Pose+yoga"
  }
];

export const asanas: AsanaInfo[] = asanasSourceData.map(asana => ({
  ...asana,
  slug: slugify(asana.englishName),
  image: asana.image, // Directly use the provided URL
  video: asana.video.includes('example.com') || asana.video.includes('placeholder.mp4') 
    ? `https://www.youtube.com/results?search_query=${encodeURIComponent(asana.englishName + ' yoga pose')}` 
    : asana.video,
}));

export const getAsanaBySlug = (slug: string): AsanaInfo | undefined => {
  return asanas.find(asana => asana.slug === slug);
};
