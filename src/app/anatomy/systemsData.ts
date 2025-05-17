
import type { LucideIcon } from "lucide-react";
import { Bone, Move, Heart, AirVent, Droplets, Brain as BrainIcon, Zap, Filter, Users, Shield, Layers, Link as LinkIcon, GitFork, Activity, ListChecks, Wind as WindIcon, Utensils, FlaskConical, Clock, SplitSquareVertical, Cog, Network, ShieldCheck as ShieldCheckIcon, UsersRound as UsersRoundIcon } from "lucide-react"; // Added BrainIcon alias, Utensils, FlaskConical, Clock, SplitSquareVertical, Cog, Network, ShieldCheckIcon, UsersRoundIcon

export interface ComponentDetail {
  name: string;
  description: string;
  subtypes?: ComponentDetail[];
  location?: string; 
  function?: string; 
}

export interface MuscleGroup {
  group: string;
  examples: string[];
}

export interface MuscleType {
  type: string;
  control: string;
  appearance: string;
  location: string;
}

export interface EnzymeHormoneDetail {
    name: string;
    source: string;
    function: string;
}

export interface GlandDetail {
  name: string;
  location?: string;
  hormones?: string[];
  function: string;
}

export interface HormoneDetail {
  name: string;
  function: string;
  producedBy?: string;
}

// New interfaces for Lymphatic/Immune System details
export interface TCellTypes {
  "Helper T Cells (CD4+)": string;
  "Cytotoxic T Cells (CD8+)": string;
  "Regulatory T Cells": string;
}
export interface BCellDetails {
  description: string;
  plasmaCells: string;
}
export interface NKCellDetails {
  description: string;
}
export interface LymphocyteDetails {
  TCells: { types: TCellTypes };
  BCells: BCellDetails;
  NaturalKillerCells: NKCellDetails;
}
export interface PhagocyteDetails {
  Macrophages: string;
  DendriticCells: string;
  Neutrophils: string;
}
export interface ImmuneCells {
  Lymphocytes: LymphocyteDetails;
  Phagocytes: PhagocyteDetails;
}

export interface DefenseMechanism {
  description: string;
  components?: string[]; // For Innate
  features?: string[];   // For Adaptive
}
export interface DefenseMechanisms {
  InnateImmunity: DefenseMechanism;
  AdaptiveImmunity: DefenseMechanism;
}


export interface SystemInfo {
  name: string;
  icon: LucideIcon;
  description: string; 
  color: string;
  slug?: string;
  details: {
    overview: string; 
    imageHint: string;
    sanskritName?: string;
    illustrationCaption?: { 
      title: string;
      description: string;
    };
    keyOrgans?: ComponentDetail[]; 
    keyComponents?: ComponentDetail[];
    functions?: ComponentDetail[]; 
    primaryFunctions?: ComponentDetail[];
    
    healthTips?: string[]; 
    healthAndWellness?: { 
      tips: string[];
      preventiveCare?: string[];
    };

    skeletalDivisions?: ComponentDetail[]; 
    boneTypes?: string[]; 
    muscleGroups?: MuscleGroup[]; 
    muscleTypes?: MuscleType[]; 
    typesOfCirculation?: ComponentDetail[]; 
    typesOfBreathing?: ComponentDetail[]; 
    
    digestionPhases?: ComponentDetail[];
    enzymesAndHormones?: EnzymeHormoneDetail[];

    divisions?: ComponentDetail[];
    keyProcesses?: ComponentDetail[];
    neurotransmitters?: ComponentDetail[]; 
    
    majorGlands?: GlandDetail[];
    keyHormones?: HormoneDetail[];

    urineFormationStages?: ComponentDetail[];
    
    // Lymphatic/Immune System specific
    lymphNodeDetails?: {
        description: string;
        locations: string[];
        functions: string[];
        structure: {
            capsule: string;
            cortex: string;
            medulla: string;
            afferentVessels: string;
            efferentVessel: string; // Sticking to prompt, singular
        };
    };
    immuneCells?: ImmuneCells;
    defenseMechanisms?: DefenseMechanisms;
    // End Lymphatic/Immune specific
    
    commonDisorders?: ComponentDetail[];
    interestingFacts?: string[];
    relatedSystems?: string[]; 
    externalResources?: Array<{ title: string; url: string }>;
  };
}

export const systems: SystemInfo[] = [
  {
    name: "Skeletal System",
    icon: Bone,
    description: "Bones, joints, structure, support.", 
    color: "text-gray-500",
    details: {
      sanskritName: "अस्थि तंत्र (Asthi Tantra)",
      overview: "The skeletal system is the body's internal framework, composed of bones and connective tissues. It provides structure, enables movement, protects vital organs, stores essential minerals, and produces blood cells through the process of hematopoiesis.",
      imageHint: "human skeleton",
      illustrationCaption: {
        title: "Skeletal System Illustration",
        description: "A conceptual representation of the major bones and joints of the human skeleton."
      },
      keyComponents: [
        { name: "Bones", description: "Rigid organs made of collagen and calcium phosphate. Humans have 206 bones in adulthood. They provide structure, protect organs, and act as levers for muscles." },
        { name: "Cartilage", description: "Flexible connective tissue found in joints, the rib cage, ear, nose, and respiratory tract. It cushions bones and allows smooth movement." },
        { name: "Ligaments", description: "Tough, fibrous tissues that connect bones to other bones, stabilizing joints and preventing excessive movement." },
        { name: "Joints", description: "Points where two or more bones meet. They enable varying types of movement depending on their classification (e.g., hinge, ball-and-socket, pivot)." }
      ],
      primaryFunctions: [
        { name: "Support and Shape", description: "Provides the physical framework that supports the body’s shape and form." },
        { name: "Protection of Organs", description: "Bones like the skull and rib cage shield vital organs such as the brain, heart, and lungs." },
        { name: "Movement Facilitation", description: "Works with the muscular system to enable voluntary and involuntary movements." },
        { name: "Mineral Storage", description: "Stores essential minerals like calcium and phosphorus, releasing them into the bloodstream as needed." },
        { name: "Blood Cell Production (Hematopoiesis)", description: "The bone marrow, especially in long bones, produces red blood cells, white blood cells, and platelets." }
      ],
      skeletalDivisions: [
        { name: "Axial Skeleton", description: "Consists of 80 bones including the skull, vertebral column, and thoracic cage. It supports the central axis of the body." },
        { name: "Appendicular Skeleton", description: "Includes 126 bones of the limbs and girdles. It facilitates movement and interaction with the environment." }
      ],
      boneTypes: [
        "Long Bones (e.g., femur)",
        "Short Bones (e.g., carpals)",
        "Flat Bones (e.g., sternum)",
        "Irregular Bones (e.g., vertebrae)",
        "Sesamoid Bones (e.g., patella)"
      ],
      healthAndWellness: {
        tips: [
          "Consume calcium-rich foods like dairy, leafy greens, and almonds.",
          "Ensure adequate vitamin D intake for calcium absorption.",
          "Engage in regular weight-bearing and resistance exercises.",
          "Maintain proper posture during daily activities.",
          "Avoid smoking and excessive alcohol consumption."
        ],
        preventiveCare: [
          "Regular bone density tests for at-risk individuals (especially postmenopausal women).",
          "Fall prevention strategies in elderly to avoid fractures.",
          "Consult a healthcare provider for any persistent bone or joint pain."
        ]
      },
      commonDisorders: [
        { name: "Osteoporosis", description: "A condition characterized by weak and brittle bones, increasing the risk of fractures." },
        { name: "Arthritis", description: "Inflammation of joints causing pain, stiffness, and reduced mobility." },
        { name: "Fractures", description: "Breaks in bones due to trauma, stress, or underlying diseases." },
        { name: "Rickets", description: "Bone softening in children due to vitamin D deficiency, leading to deformities." },
        { name: "Paget’s Disease", description: "A chronic disorder that disrupts bone remodeling, leading to enlarged and misshapen bones." }
      ],
      interestingFacts: [
        "The femur is the longest and strongest bone in the human body.",
        "Bones are living tissues that can grow and repair themselves.",
        "At birth, humans have around 270 bones, some of which fuse to form 206 bones in adults.",
        "The hyoid bone in the neck is the only bone not connected to another bone."
      ],
      relatedSystems: [ 
        "Muscular System (for movement)",
        "Circulatory System (blood cell production)",
        "Endocrine System (regulates bone metabolism via hormones like parathyroid hormone and calcitonin)"
      ],
      externalResources: [
        { title: "NIH - Skeletal System Overview", url: "https://www.ncbi.nlm.nih.gov/books/NBK538510/" },
        { title: "Visible Body - Skeletal Anatomy", url: "https://www.visiblebody.com/learn/skeletal" },
        { title: "Khan Academy - Skeletal System", url: "https://www.khanacademy.org/science/health-and-medicine/human-anatomy-and-physiology" }
      ]
    }
  },
  {
    name: "Muscular System",
    icon: Move,
    description: "Movement, posture, muscle groups.",
    color: "text-red-600",
    details: {
      sanskritName: "मांसपेशीय तंत्र (Māṁsapeśīya Tantra)",
      overview: "The muscular system consists of specialized tissues that enable the body to move, maintain posture, and produce heat. It works in coordination with the skeletal and nervous systems to facilitate voluntary and involuntary movements.",
      imageHint: "muscle anatomy",
      illustrationCaption: {
        title: "Muscular System Illustration",
        description: "A diagram showing major muscle groups in the human body including skeletal, smooth, and cardiac muscles."
      },
      keyComponents: [
        { name: "Skeletal Muscles", description: "Voluntary muscles attached to bones. They are responsible for body movement and posture. These muscles are striated and under conscious control." },
        { name: "Smooth Muscles", description: "Involuntary muscles found in walls of internal organs like the stomach, intestines, and blood vessels. They control automatic functions like digestion and blood flow." },
        { name: "Cardiac Muscle", description: "Involuntary muscle found only in the heart. It is striated like skeletal muscle but works automatically to pump blood throughout the body." },
        { name: "Tendons", description: "Strong connective tissues that attach muscles to bones, transmitting force for movement." }
      ],
      muscleGroups: [
        { group: "Head & Neck", examples: ["Frontalis", "Masseter", "Sternocleidomastoid"] },
        { group: "Torso", examples: ["Pectoralis Major", "Rectus Abdominis", "Latissimus Dorsi", "Trapezius"] },
        { group: "Upper Limbs", examples: ["Deltoid", "Biceps Brachii", "Triceps Brachii", "Forearm Flexors"] },
        { group: "Lower Limbs", examples: ["Gluteus Maximus", "Quadriceps", "Hamstrings", "Gastrocnemius"] }
      ],
      primaryFunctions: [
        { name: "Movement", description: "Muscles work with bones to enable movement through contraction and relaxation." },
        { name: "Posture and Stability", description: "Continuous muscle tension maintains posture and body position against gravity." },
        { name: "Heat Production", description: "Muscle activity produces heat, helping regulate body temperature (thermogenesis)." },
        { name: "Circulation", description: "The cardiac muscle pumps blood, while smooth muscles in vessels aid circulation." },
        { name: "Digestion & Other Involuntary Functions", description: "Smooth muscles in organs control digestion, respiration, urination, etc." }
      ],
      muscleTypes: [
        { type: "Skeletal", control: "Voluntary", appearance: "Striated", location: "Attached to bones" },
        { type: "Smooth", control: "Involuntary", appearance: "Non-striated", location: "Walls of internal organs" },
        { type: "Cardiac", control: "Involuntary", appearance: "Striated", location: "Heart" }
      ],
      healthAndWellness: {
        tips: [
          "Stay active with regular exercise to strengthen and maintain muscle mass.",
          "Maintain a protein-rich diet to support muscle repair and growth.",
          "Stretch regularly to improve flexibility and reduce injury risk.",
          "Stay hydrated to prevent muscle cramps.",
          "Warm up before and cool down after physical activity."
        ],
        preventiveCare: [
          "Avoid overexertion to reduce strain and injury.",
          "Practice good ergonomics during daily tasks.",
          "Address muscle pain and stiffness with proper rest and therapy.",
          "Regular check-ups for muscle disorders in case of persistent symptoms."
        ]
      },
      commonDisorders: [
        { name: "Muscle Strain", description: "Injury caused by overstretching or tearing of muscle fibers." },
        { name: "Muscular Dystrophy", description: "Genetic diseases causing progressive muscle weakness and degeneration." },
        { name: "Tendinitis", description: "Inflammation of tendons due to repetitive strain or injury." },
        { name: "Myasthenia Gravis", description: "Autoimmune disorder affecting nerve-muscle communication, leading to weakness." },
        { name: "Cramps & Spasms", description: "Involuntary and often painful muscle contractions caused by fatigue, dehydration, or imbalance." }
      ],
      interestingFacts: [
        "The human body has over 600 muscles.",
        "The strongest muscle by size is the masseter (jaw muscle).",
        "The heart beats about 100,000 times a day using cardiac muscle.",
        "Skeletal muscles can contract voluntarily in less than 0.1 seconds."
      ],
      relatedSystems: [
        "Skeletal System (for movement)",
        "Nervous System (for control and coordination)",
        "Circulatory System (for oxygen and nutrient delivery)"
      ],
      externalResources: [
        { title: "NIH - Muscular System Overview", url: "https://www.ncbi.nlm.nih.gov/books/NBK538276/" },
        { title: "Visible Body - Muscular System", url: "https://www.visiblebody.com/learn/muscular" },
        { title: "Khan Academy - Muscular System", url: "https://www.khanacademy.org/science/health-and-medicine/human-anatomy-and-physiology" }
      ]
    }
  },
  {
    name: "Circulatory System",
    icon: Heart,
    description: "Heart, blood vessels, oxygen transport.",
    color: "text-red-500",
    details: {
        sanskritName: "रक्तसंचार तंत्र (Raktasañchāra Tantra)",
        overview: "The circulatory system is responsible for the transport of blood, oxygen, nutrients, hormones, and waste products throughout the body. It consists of the heart, blood, and a vast network of blood vessels that ensure the body’s tissues receive vital substances for survival and proper function.",
        imageHint: "human heart circulatory",
        illustrationCaption: {
            title: "Circulatory System Diagram",
            description: "Illustration showing the heart, arteries, veins, and capillaries in systemic and pulmonary circulation."
        },
        keyComponents: [
            { name: "Heart", description: "A muscular organ that pumps blood through rhythmic contractions. It has four chambers: right atrium, right ventricle, left atrium, and left ventricle." },
            { 
              name: "Blood Vessels", 
              description: "Network of tubes that transport blood.",
              subtypes: [ 
                { name: "Arteries", description: "Carry oxygen-rich blood away from the heart to the body." },
                { name: "Veins", description: "Carry oxygen-poor blood back to the heart." },
                { name: "Capillaries", description: "Microscopic vessels where exchange of gases, nutrients, and waste occurs between blood and tissues." }
              ]
            },
            { name: "Blood", description: "A connective tissue composed of red blood cells, white blood cells, platelets, and plasma. It transports oxygen, nutrients, and removes waste." }
        ],
        typesOfCirculation: [
            { name: "Systemic Circulation", description: "Carries oxygenated blood from the left side of the heart to the body and returns deoxygenated blood to the right side." },
            { name: "Pulmonary Circulation", description: "Carries deoxygenated blood from the right side of the heart to the lungs and returns oxygenated blood to the left side." },
            { name: "Coronary Circulation", description: "Provides blood supply to the heart muscle itself." }
        ],
        primaryFunctions: [
            { name: "Transport of Oxygen and Nutrients", description: "Delivers oxygen and nutrients from the lungs and digestive tract to tissues." },
            { name: "Removal of Waste", description: "Carries carbon dioxide and metabolic waste to the lungs and kidneys for excretion." },
            { name: "Hormone Delivery", description: "Transports hormones from endocrine glands to target organs." },
            { name: "Temperature Regulation", description: "Maintains body temperature through regulation of blood flow." },
            { name: "Immune Defense", description: "White blood cells and lymph are transported to fight infections." }
        ],
        healthAndWellness: {
            tips: [
                "Maintain a heart-healthy diet low in saturated fats and high in fruits and vegetables.",
                "Exercise regularly (at least 30 minutes a day).",
                "Avoid smoking and limit alcohol consumption.",
                "Monitor blood pressure, cholesterol, and blood sugar levels.",
                "Stay hydrated to ensure smooth blood flow."
            ],
            preventiveCare: [
                "Get regular cardiovascular check-ups.",
                "Manage stress to reduce strain on the heart.",
                "Follow prescribed treatments for hypertension or cholesterol.",
                "Be aware of family history related to heart disease."
            ]
        },
        commonDisorders: [
            { name: "Hypertension", description: "High blood pressure that strains the heart and damages blood vessels." },
            { name: "Atherosclerosis", description: "Buildup of plaque in arteries, reducing blood flow and increasing risk of heart attack or stroke." },
            { name: "Heart Attack (Myocardial Infarction)", description: "Occurs when blood flow to the heart muscle is blocked." },
            { name: "Stroke", description: "Disruption in blood supply to the brain, leading to cell death." },
            { name: "Arrhythmia", description: "Irregular heartbeat that affects circulation efficiency." },
            { name: "Anemia", description: "Condition where there are insufficient red blood cells or hemoglobin to carry adequate oxygen." }
        ],
        interestingFacts: [
            "The human heart beats around 100,000 times per day.",
            "An adult has about 100,000 kilometers (60,000 miles) of blood vessels.",
            "Blood makes up about 7-8% of a person’s body weight.",
            "Red blood cells take about 60 seconds to make a complete circuit of the body."
        ],
        relatedSystems: [
            "Respiratory System (for oxygen exchange)",
            "Lymphatic System (for immune response and fluid balance)",
            "Digestive System (for nutrient absorption)"
        ],
        externalResources: [
            { title: "American Heart Association – Circulatory Health", url: "https://www.heart.org/" },
            { title: "Khan Academy – Circulatory System", url: "https://www.khanacademy.org/science/health-and-medicine/circulatory-system" },
            { title: "Visible Body – Circulatory System", url: "https://www.visiblebody.com/learn/circulatory" }
        ]
    }
  },
  {
    name: "Respiratory System",
    icon: AirVent,
    description: "Lungs, airways, gas exchange.",
    color: "text-green-500",
    details: {
        sanskritName: "श्वसन तंत्र (Śvasana Tantra)",
        overview: "The respiratory system is responsible for the intake of oxygen and the expulsion of carbon dioxide through a series of organs and tissues. It plays a crucial role in cellular respiration and maintaining the acid-base balance of the body.",
        imageHint: "human lungs",
        illustrationCaption: {
            title: "Respiratory System Diagram",
            description: "Illustration showing lungs, trachea, bronchi, bronchioles, and alveoli involved in gas exchange."
        },
        keyComponents: [
            { name: "Nasal Cavity", description: "Warms, moistens, and filters incoming air; detects odors through olfactory receptors." },
            { name: "Pharynx (Throat)", description: "Passageway for air and food; connects the nasal cavity to the larynx." },
            { name: "Larynx (Voice Box)", description: "Houses the vocal cords and routes air into the trachea while preventing food from entering the airway." },
            { name: "Trachea (Windpipe)", description: "A tube that transports air to the bronchi; lined with cilia and mucus to trap particles." },
            { name: "Bronchi", description: "Two main branches from the trachea leading into each lung; subdivide into smaller bronchioles." },
            { name: "Bronchioles", description: "Smaller airways that lead to alveolar ducts and alveoli." },
            { name: "Alveoli", description: "Tiny air sacs where gas exchange occurs; surrounded by capillaries that allow oxygen and carbon dioxide to diffuse." },
            { name: "Lungs", description: "Main respiratory organs that house bronchi, bronchioles, and alveoli. They facilitate gas exchange and are protected by the rib cage." },
            { name: "Diaphragm", description: "Primary muscle of respiration; contracts and flattens to draw air into the lungs." }
        ],
        primaryFunctions: [
           { name: "Gas Exchange", description: "Exchanges oxygen and carbon dioxide between the air and the bloodstream through alveoli." },
           { name: "Regulation of Blood pH", description: "Maintains acid-base balance by controlling the levels of carbon dioxide in the blood." },
           { name: "Vocalization", description: "Produces sound via the larynx during exhalation." },
           { name: "Olfaction", description: "Sense of smell is facilitated by olfactory receptors in the nasal cavity." },
           { name: "Protection", description: "Filters dust, microbes, and pollutants via mucus and cilia in the nasal cavity and trachea." }
        ],
        typesOfBreathing: [
            { name: "External Respiration", description: "Gas exchange between the alveoli and the blood in pulmonary capillaries." },
            { name: "Internal Respiration", description: "Gas exchange between blood and body tissues." },
            { name: "Cellular Respiration", description: "The use of oxygen by cells to produce ATP (energy)." }
        ],
        healthAndWellness: {
           tips: [
                "Avoid smoking and exposure to pollutants.",
                "Practice deep breathing exercises and yoga.",
                "Stay physically active to strengthen lung capacity.",
                "Maintain indoor air quality with plants or purifiers.",
                "Stay hydrated to keep mucous membranes moist."
            ],
           preventiveCare: [
                "Regular check-ups and lung function tests.",
                "Vaccinations (e.g., flu and pneumonia shots).",
                "Monitor air quality, especially if you have asthma.",
                "Treat respiratory infections promptly.",
                "Manage allergies to reduce inflammation."
            ]
        },
        commonDisorders: [
            { name: "Asthma", description: "Chronic inflammation and narrowing of airways causing wheezing and difficulty in breathing." },
            { name: "Chronic Obstructive Pulmonary Disease (COPD)", description: "A group of lung conditions including emphysema and chronic bronchitis that obstruct airflow." },
            { name: "Pneumonia", description: "Infection that inflames the air sacs in one or both lungs, potentially filling them with fluid." },
            { name: "Tuberculosis (TB)", description: "Bacterial infection affecting lungs and sometimes other organs; highly contagious." },
            { name: "Lung Cancer", description: "Uncontrolled cell growth in the lung tissue, often linked to smoking or environmental toxins." }
        ],
        interestingFacts: [
            "The average adult breathes in about 11,000 liters of air each day.",
            "There are over 300 million alveoli in the human lungs.",
            "Right lung has 3 lobes, left lung has 2 (to accommodate the heart).",
            "The lungs can float on water due to air in the alveoli."
        ],
        relatedSystems: [
            "Circulatory System (for gas transport)",
            "Nervous System (to control breathing rate)",
            "Muscular System (for diaphragm and intercostal movement)"
        ],
        externalResources: [
            { title: "American Lung Association", url: "https://www.lung.org/" },
            { title: "Khan Academy – Respiratory System", url: "https://www.khanacademy.org/science/biology/human-biology/respiratory-system" },
            { title: "Visible Body – Respiratory System", url: "https://www.visiblebody.com/learn/respiratory" }
        ]
    }
  },
  {
    name: "Digestive System",
    icon: Utensils, 
    description: "Stomach, intestines, nutrient absorption.",
    color: "text-orange-500",
    details: {
        sanskritName: "पाचन तंत्र (Pācana Tantra)",
        overview: "The digestive system is responsible for breaking down food into nutrients, absorbing these nutrients into the bloodstream, and eliminating waste. It includes a complex series of organs working together for ingestion, digestion, absorption, and excretion.",
        imageHint: "digestive organs",
        illustrationCaption: {
            title: "Digestive System Diagram",
            description: "Anatomical illustration of the digestive tract including the stomach, intestines, liver, pancreas, and accessory organs."
        },
        keyComponents: [
            { name: "Mouth", description: "Beginning of the digestive tract; mechanical digestion via chewing and chemical digestion via saliva." },
            { name: "Pharynx", description: "Passageway for food from the mouth to the esophagus." },
            { name: "Esophagus", description: "Muscular tube that transports food from the pharynx to the stomach via peristalsis." },
            { name: "Stomach", description: "Secretes acid and enzymes to chemically break down food; churns food into chyme." },
            { name: "Small Intestine", description: "Major site of digestion and nutrient absorption; divided into duodenum, jejunum, and ileum." },
            { name: "Large Intestine", description: "Absorbs water and electrolytes; forms and expels feces. Includes colon, rectum, and anus." },
            { name: "Liver", description: "Produces bile to aid in fat digestion; detoxifies blood and processes nutrients." },
            { name: "Gallbladder", description: "Stores and releases bile into the small intestine." },
            { name: "Pancreas", description: "Secretes digestive enzymes and bicarbonate into the duodenum; regulates blood sugar via insulin and glucagon." },
            { name: "Anus", description: "Final part of the digestive tract; controls the expulsion of feces." }
        ],
        primaryFunctions: [
            { name: "Ingestion", description: "The process of consuming food through the mouth." },
            { name: "Mechanical and Chemical Digestion", description: "Breaking down food physically (chewing, churning) and chemically (enzymes, acids)." },
            { name: "Absorption", description: "Nutrient molecules pass through the wall of the digestive system into the blood." },
            { name: "Elimination", description: "Removal of indigestible substances and waste products as feces." }
        ],
        digestionPhases: [
          // The JSON provided `digestionPhases` as an array of objects with "phase" and "description".
          // Mapping to ComponentDetail:
            { name: "Cephalic Phase", description: "Triggered by the sight, smell, or thought of food; prepares digestive organs for activity." },
            { name: "Gastric Phase", description: "Begins when food reaches the stomach; stimulates acid and enzyme secretion." },
            { name: "Intestinal Phase", description: "Controls the rate of chyme entry into the small intestine and regulates digestive activity." }
        ],
        enzymesAndHormones: [
            { name: "Amylase", source: "Saliva, Pancreas", function: "Breaks down carbohydrates into simple sugars." },
            { name: "Pepsin", source: "Stomach", function: "Breaks down proteins into peptides." },
            { name: "Lipase", source: "Pancreas", function: "Breaks down fats into fatty acids and glycerol." },
            { name: "Gastrin", source: "Stomach", function: "Stimulates secretion of gastric acid." },
            { name: "Secretin", source: "Small Intestine", function: "Stimulates pancreas to release bicarbonate to neutralize stomach acid." },
            { name: "Cholecystokinin (CCK)", source: "Small Intestine", function: "Stimulates release of bile and pancreatic enzymes." }
        ],
        healthAndWellness: {
            tips: [
                "Eat a balanced diet rich in fiber, fruits, and vegetables.",
                "Stay hydrated to aid digestion and prevent constipation.",
                "Avoid overeating and eat at regular intervals.",
                "Chew food thoroughly to initiate proper digestion.",
                "Manage stress, which can negatively affect gut health."
            ],
            preventiveCare: [
                "Get screened for colon cancer as recommended.",
                "Limit intake of processed and high-fat foods.",
                "Monitor for symptoms like bloating, reflux, or irregular bowel movements.",
                "Use probiotics to support gut microbiota if necessary."
            ]
        },
        commonDisorders: [
            { name: "Gastroesophageal Reflux Disease (GERD)", description: "A chronic condition where stomach acid flows back into the esophagus causing heartburn and discomfort." },
            { name: "Irritable Bowel Syndrome (IBS)", description: "A functional gastrointestinal disorder causing cramping, abdominal pain, bloating, gas, and diarrhea or constipation." },
            { name: "Ulcers", description: "Sores that develop on the lining of the stomach or upper small intestine, often due to H. pylori or NSAID use." },
            { name: "Celiac Disease", description: "Autoimmune disorder triggered by gluten ingestion, leading to damage in the small intestine." },
            { name: "Crohn’s Disease", description: "A type of inflammatory bowel disease that can affect any part of the digestive tract." }
        ],
        interestingFacts: [
            "The small intestine is about 6 meters (20 feet) long.",
            "The digestive system can process around 1 ton of food annually.",
            "The liver has over 500 vital functions, including aiding in digestion.",
            "Digestive enzymes can start breaking down food in under 5 seconds."
        ],
        relatedSystems: [
            "Circulatory System (to transport absorbed nutrients)",
            "Endocrine System (regulates digestion through hormones)",
            "Nervous System (controls appetite, hunger, and muscle contractions)"
        ],
         externalResources: [
            { title: "National Institute of Diabetes and Digestive and Kidney Diseases", url: "https://www.niddk.nih.gov/" },
            { title: "Khan Academy – Digestive System", url: "https://www.khanacademy.org/science/biology/human-biology/digestive-system" },
            { title: "Visible Body – Digestive System", url: "https://www.visiblebody.com/learn/digestive" }
        ]
    }
  },
  {
    name: "Nervous System",
    icon: BrainIcon,
    description: "Brain, spinal cord, nerve communication.",
    color: "text-blue-500",
    details: {
        sanskritName: "तंत्रिका तंत्र (Tantrikā Tantra)",
        overview: "The nervous system is the body's complex communication network. It coordinates actions, processes sensory information, enables cognition, and controls bodily functions through electrical and chemical signals.",
        imageHint: "human brain nerves",
        illustrationCaption: {
            title: "Nervous System Diagram",
            description: "Diagram showing the brain, spinal cord, and peripheral nerves branching throughout the body."
        },
        keyComponents: [ // From new data, mapping subparts into description or subtypes if ComponentDetail supports it.
            { 
                name: "Brain", 
                description: "The control center. Subparts: Cerebrum, Cerebellum, Brainstem, Hypothalamus, Thalamus.",
                // Or more structured:
                // description: "The control center of the body that processes sensory input, regulates functions, and enables consciousness and cognition.",
                // subtypes: [ 
                //     { name: "Cerebrum", description: "Largest part, responsible for higher functions like thought, language, and voluntary movement." },
                //     { name: "Cerebellum", description: "Coordinates voluntary movements, posture, balance, and speech." },
                //     { name: "Brainstem", description: "Connects cerebrum and cerebellum to spinal cord; controls vital functions like breathing and heartbeat." },
                //     { name: "Hypothalamus", description: "Regulates body temperature, hunger, thirst, sleep, and emotional activity." },
                //     { name: "Thalamus", description: "Relays sensory and motor signals to the cerebral cortex and regulates consciousness, sleep, and alertness." }
                // ]
            },
            { name: "Spinal Cord", description: "A long, thin tubular structure that extends from the brainstem, facilitating signal transmission between brain and body." },
            { name: "Nerves", description: "Bundles of axons that carry electrical signals to and from the central nervous system." },
            { name: "Neurons", description: "Specialized cells that transmit nerve impulses. Consist of dendrites, axons, and synapses." },
            { name: "Glial Cells", description: "Support cells that nourish, protect, and maintain neurons." }
        ],
        divisions: [ // From new data
            { name: "Central Nervous System (CNS)", description: "Comprises the brain and spinal cord. Processes and integrates information and directs responses." },
            { name: "Peripheral Nervous System (PNS)", description: "Consists of sensory and motor neurons that connect the CNS to the limbs and organs." },
            { name: "Somatic Nervous System", description: "Controls voluntary muscle movements and relays sensory information." },
            { name: "Autonomic Nervous System (ANS)", description: "Regulates involuntary bodily functions like heartbeat, digestion, and breathing. Subdivided into sympathetic and parasympathetic systems." },
            { name: "Sympathetic Nervous System", description: "Prepares the body for stress-related activities (fight or flight)." },
            { name: "Parasympathetic Nervous System", description: "Calms the body down and conserves energy (rest and digest)." }
        ],
        primaryFunctions: [ // From new data
            { name: "Sensory Input", description: "Detects changes in the internal and external environment using receptors." },
            { name: "Integration", description: "Processes sensory input and determines the appropriate response." },
            { name: "Motor Output", description: "Activates effectors (muscles/glands) to respond to stimuli." },
            { name: "Cognition and Emotion", description: "Enables thought, memory, learning, emotions, and decision-making." },
            { name: "Homeostasis", description: "Maintains internal balance through regulation of body processes." }
        ],
        keyProcesses: [ // From new data
            { name: "Synaptic Transmission", description: "The transfer of electrical or chemical signals between neurons at synapses." },
            { name: "Neuroplasticity", description: "The brain's ability to reorganize and form new connections in response to learning or injury." },
            { name: "Reflex Arc", description: "Automatic responses mediated by the spinal cord without brain involvement." }
        ],
        neurotransmitters: [  // From new data, mapping function to description for ComponentDetail
            { name: "Dopamine", description: "Controls movement, emotion, and the reward system." },
            { name: "Serotonin", description: "Regulates mood, appetite, and sleep." },
            { name: "Acetylcholine", description: "Enables muscle action, learning, and memory." },
            { name: "Norepinephrine", description: "Influences alertness, arousal, and the stress response." },
            { name: "GABA (Gamma-Aminobutyric Acid)", description: "Acts as the primary inhibitory neurotransmitter in the brain, reducing neuronal excitability." }
        ],
        healthAndWellness: { // From new data
            tips: [
                "Engage in regular mental stimulation and learning.",
                "Maintain a balanced diet rich in omega-3 fatty acids.",
                "Stay physically active to support neurogenesis.",
                "Practice mindfulness or meditation to reduce stress.",
                "Get sufficient sleep for memory and nervous system repair."
            ],
            preventiveCare: [
                "Avoid head injuries by wearing helmets when necessary.",
                "Limit alcohol and avoid neurotoxic substances.",
                "Treat high blood pressure and diabetes, which can affect nerves.",
                "Monitor for signs of neurological conditions like memory loss or tremors."
            ]
        },
        commonDisorders: [ // From new data
            { name: "Alzheimer’s Disease", description: "A degenerative brain disorder causing memory loss and cognitive decline." },
            { name: "Parkinson’s Disease", description: "A neurological condition affecting movement and coordination due to dopamine deficiency." },
            { name: "Multiple Sclerosis (MS)", description: "An autoimmune disease that damages the myelin sheath around nerves." },
            { name: "Epilepsy", description: "A disorder characterized by recurrent seizures due to abnormal electrical activity in the brain." },
            { name: "Neuropathy", description: "Nerve damage causing pain, numbness, and weakness, often in the hands and feet." }
        ],
        interestingFacts: [ // From new data
            "The human brain contains around 86 billion neurons.",
            "Nerve impulses can travel at speeds up to 120 m/s (268 mph).",
            "The brain uses about 20% of the body’s total energy.",
            "The spinal cord is about 45 cm (18 inches) long in adults."
        ],
        relatedSystems: [ // From new data
            "Endocrine System (closely interacts via hypothalamus and hormone regulation)",
            "Muscular System (receives motor commands)",
            "Sensory Organs (linked for input)"
        ],
         externalResources: [ // From new data
            { title: "National Institute of Neurological Disorders and Stroke", url: "https://www.ninds.nih.gov/" },
            { title: "Harvard Brain Science Initiative", url: "https://brain.harvard.edu/" }, 
            { title: "Khan Academy – Nervous System", url: "https://www.khanacademy.org/science/biology/human-biology/neuron-nervous-system" }
        ]
    }
  },
  {
    name: "Endocrine System",
    icon: Zap,
    description: "Hormones, glands, regulation.",
    color: "text-purple-500",
    details: {
        sanskritName: "अंतःस्रावी तंत्र (Antaḥsrāvī Tantra)",
        overview: "The endocrine system is a network of glands that produce and secrete hormones to regulate various bodily functions such as metabolism, growth, mood, reproduction, and homeostasis.",
        imageHint: "endocrine glands",
        illustrationCaption: {
            title: "Endocrine System Diagram",
            description: "Major endocrine glands including pituitary, thyroid, adrenal, pancreas, ovaries, and testes."
        },
        primaryFunctions: [ // From new data
            { name: "Hormone Production", description: "Secretes hormones that regulate bodily functions." },
            { name: "Metabolism Regulation", description: "Controls the body's energy usage and storage." },
            { name: "Growth and Development", description: "Regulates cellular growth and physical development." },
            { name: "Homeostasis", description: "Maintains internal balance including temperature, hydration, and blood pressure." },
            { name: "Reproduction", description: "Regulates sexual development, reproductive cycles, and pregnancy." },
            { name: "Mood and Stress Response", description: "Influences emotional well-being and response to stress." }
        ],
        majorGlands: [ // From new data, fits GlandDetail structure
            { name: "Hypothalamus", location: "Brain", hormones: ["Releasing Hormones (TRH, CRH, GnRH)", "Inhibiting Hormones"], function: "Links the nervous and endocrine systems. Regulates the pituitary gland and maintains homeostasis." },
            { name: "Pituitary Gland", location: "Base of the brain", hormones: ["GH", "ACTH", "TSH", "LH", "FSH", "Prolactin", "ADH", "Oxytocin"], function: "The master gland. Controls other endocrine glands and influences growth, metabolism, and reproduction." },
            { name: "Pineal Gland", location: "Brain", hormones: ["Melatonin"], function: "Regulates sleep-wake cycles (circadian rhythm)." },
            { name: "Thyroid Gland", location: "Neck", hormones: ["T3", "T4", "Calcitonin"], function: "Regulates metabolism, energy levels, and calcium balance." },
            { name: "Parathyroid Glands", location: "Behind the thyroid", hormones: ["Parathyroid Hormone (PTH)"], function: "Regulates calcium and phosphate balance in the blood and bones." },
            { name: "Adrenal Glands", location: "Above the kidneys", hormones: ["Cortisol", "Aldosterone", "Adrenaline", "Noradrenaline"], function: "Manages stress, metabolism, blood pressure, and salt balance." },
            { name: "Pancreas (Endocrine portion)", location: "Abdomen behind the stomach", hormones: ["Insulin", "Glucagon", "Somatostatin"], function: "Regulates blood sugar levels and digestion." },
            { name: "Ovaries", location: "Female pelvic cavity", hormones: ["Estrogen", "Progesterone"], function: "Regulates menstrual cycle, pregnancy, and female secondary sexual characteristics." },
            { name: "Testes", location: "Male scrotum", hormones: ["Testosterone"], function: "Regulates sperm production and male secondary sexual characteristics." },
            { name: "Thymus", location: "Upper chest behind the sternum", hormones: ["Thymosin"], function: "Supports immune function by aiding T-cell maturation in early life." }
        ],
        keyHormones: [ // From new data, fits HormoneDetail structure
            { name: "Insulin", function: "Lowers blood glucose by promoting cellular uptake.", producedBy: "Pancreas" },
            { name: "Cortisol", function: "Regulates metabolism and stress response.", producedBy: "Adrenal Cortex" },
            { name: "Thyroxine (T4)", function: "Increases metabolic rate.", producedBy: "Thyroid" },
            { name: "Growth Hormone (GH)", function: "Stimulates growth and cell reproduction.", producedBy: "Pituitary" },
            { name: "Estrogen", function: "Regulates the menstrual cycle and develops female sex characteristics.", producedBy: "Ovaries" },
            { name: "Testosterone", function: "Stimulates sperm production and male traits.", producedBy: "Testes" },
            { name: "Adrenaline", function: "Prepares the body for 'fight or flight' in stress situations.", producedBy: "Adrenal Medulla" }
        ],
        healthAndWellness: { // From new data
            tips: ["Consume a balanced diet rich in iodine, zinc, and essential fatty acids.", "Get regular physical activity to balance hormone production.", "Manage stress through mindfulness, yoga, or breathing techniques.", "Get adequate sleep to maintain hormonal balance.", "Limit processed sugar and caffeine, which may disrupt hormone cycles."],
            preventiveCare: ["Regular blood tests for thyroid, glucose,and hormone levels.", "Screenings for diabetes, PCOS, and thyroid disorders.", "Avoid exposure to endocrine-disrupting chemicals (EDCs) in plastics, pesticides, etc."]
        },
        commonDisorders: [ // From new data
            { name: "Diabetes Mellitus", description: "A metabolic disorder characterized by high blood sugar due to insufficient insulin (Type 1) or resistance to insulin (Type 2)." },
            { name: "Hypothyroidism", description: "Underactive thyroid resulting in fatigue, weight gain, and cold sensitivity." },
            { name: "Hyperthyroidism", description: "Overactive thyroid causing weight loss, heat intolerance, and anxiety." },
            { name: "Cushing's Syndrome", description: "Excess cortisol leading to weight gain, skin changes, and high blood pressure." },
            { name: "Polycystic Ovary Syndrome (PCOS)", description: "A hormonal imbalance in women affecting menstruation, fertility, and metabolism." },
            { name: "Addison’s Disease", description: "Insufficient adrenal hormones causing fatigue, weight loss, and low blood pressure." }
        ],
        interestingFacts: [ // From new data
            "Hormones act as chemical messengers and can affect cells far from their site of release.",
            "The pituitary gland is about the size of a pea but controls most endocrine functions.",
            "Melatonin levels rise in darkness to promote sleep.",
            "Insulin was the first hormone to be artificially synthesized."
        ],
        relatedSystems: [ // From new data
            "Nervous System (interacts via hypothalamus and pituitary control)",
            "Digestive System (influences metabolism)",
            "Reproductive System (regulation of sex hormones)"
        ],
        externalResources: [ // From new data
            { title: "Endocrine Society", url: "https://www.endocrine.org/" },
            { title: "Hormone Health Network", url: "https://www.hormone.org/" },
            { title: "Khan Academy – Endocrine System", url: "https://www.khanacademy.org/science/biology/human-biology/endocrine-system" }
        ]
    }
  },
  {
    name: "Urinary System",
    icon: Filter,
    description: "Kidneys, bladder, waste elimination.",
    color: "text-yellow-600",
    details: {
        sanskritName: "मूत्रोत्सर्ग तंत्र (Mūtrotsarga Tantra)",
        overview: "The urinary system is responsible for filtering blood to remove waste products and excess substances, maintaining fluid and electrolyte balance, and excreting urine from the body.",
        imageHint: "kidney anatomy",
        illustrationCaption: {
            title: "Urinary System Diagram",
            description: "Organs of the urinary system: kidneys, ureters, bladder, and urethra."
        },
        keyOrgans: [ // Mapped from keyOrgansAndComponents to fit existing structure
            { name: "Kidneys", description: "Filters blood, produces urine, and regulates electrolyte balance.", location: "Retroperitoneal space of the abdomen" },
            { name: "Ureters", description: "Transport urine from the kidneys to the bladder via peristalsis.", location: "Connect kidneys to bladder" },
            { name: "Urinary Bladder", description: "Stores urine until it is voluntarily expelled.", location: "Pelvic cavity" },
            { name: "Urethra", description: "Conducts urine from the bladder to the exterior during urination.", location: "Exits the bladder to outside the body" },
            { name: "Nephrons", description: "Microscopic structures that perform filtration, reabsorption, and secretion.", location: "Functional units within kidneys" }
        ],
        primaryFunctions: [ // From new data
            { name: "Waste Elimination", description: "Removes nitrogenous waste products like urea, uric acid, and creatinine from the blood." },
            { name: "Fluid Balance", description: "Maintains homeostasis of water and electrolytes in the body." },
            { name: "Blood Filtration", description: "Filters around 50 gallons of blood daily to produce about 1.5 liters of urine." },
            { name: "Blood Pressure Regulation", description: "Regulates blood volume and pressure through the renin-angiotensin system." },
            { name: "pH Balance", description: "Maintains acid-base balance by excreting hydrogen ions and reabsorbing bicarbonate." },
            { name: "Hormone Production", description: "Produces hormones like erythropoietin (stimulates red blood cell production) and calcitriol (active vitamin D)." }
        ],
        urineFormationStages: [ // From new data, needs mapping to ComponentDetail[]
            { name: "Filtration", description: "Initial filtering of blood in the kidney's glomerulus." },
            { name: "Reabsorption", description: "Essential substances are reabsorbed back into the blood in the proximal and distal tubules." },
            { name: "Secretion", description: "Waste products are actively secreted into kidney tubules." },
            { name: "Excretion", description: "Final elimination of urine from the body through ureters to bladder and urethra." }
        ],
         healthAndWellness: { // From new data
            tips: [
                "Drink plenty of water (6–8 glasses a day) to help flush out toxins.",
                "Limit salt, caffeine, and sugar intake to reduce kidney strain.",
                "Avoid excessive use of over-the-counter painkillers (e.g., NSAIDs).",
                "Maintain a balanced diet rich in fruits and vegetables.",
                "Practice good hygiene to prevent urinary tract infections (UTIs)."
            ],
            preventiveCare: [
                "Routine kidney function tests (e.g., blood urea nitrogen, creatinine levels).",
                "Urinalysis for infections and abnormalities.",
                "Regular blood pressure monitoring (as hypertension affects kidneys).",
                "Diabetic screening to prevent diabetic nephropathy."
            ]
        },
        commonDisorders: [ // From new data
            { name: "Urinary Tract Infection (UTI)", description: "Infection of any part of the urinary system, most commonly the bladder or urethra." },
            { name: "Kidney Stones (Nephrolithiasis)", description: "Hard deposits of minerals and salts that form in the kidneys and may cause severe pain." },
            { name: "Chronic Kidney Disease (CKD)", description: "Progressive loss of kidney function over time; may lead to kidney failure." },
            { name: "Acute Kidney Injury (AKI)", description: "Sudden decrease in kidney function due to trauma, drugs, or illness." },
            { name: "Incontinence", description: "Loss of bladder control, leading to accidental urine leakage." },
            { name: "Glomerulonephritis", description: "Inflammation of the glomeruli in the kidneys, often autoimmune or post-infection." },
            { name: "Polycystic Kidney Disease (PKD)", description: "Genetic disorder leading to fluid-filled cysts in the kidneys and reduced function." }
        ],
        interestingFacts: [ // From new data
            "Each kidney contains about 1 million nephrons.",
            "The kidneys filter approximately 180 liters of blood each day.",
            "Urine is typically composed of 95% water and 5% waste products.",
            "The bladder can hold up to 500 mL of urine comfortably."
        ],
        relatedSystems: [ // From new data
            "Circulatory System (blood supply to kidneys)",
            "Endocrine System (hormone regulation via ADH and aldosterone)",
            "Nervous System (bladder control and urination signals)"
        ],
        externalResources: [ // From new data
            { title: "National Kidney Foundation", url: "https://www.kidney.org/" },
            { title: "Mayo Clinic – Urinary System", url: "https://www.mayoclinic.org/diseases-conditions/kidney-disease" },
            { title: "Khan Academy – Urinary System", url: "https://www.khanacademy.org/science/biology/human-biology/excretory-system" }
        ]
    }
  },
   {
    name: "Reproductive System",
    icon: Users,
    description: "Sexual organs, reproduction.",
    color: "text-pink-500",
    details: {
        sanskritName: "प्रजनन तंत्र (Prajanana Tantra)",
        overview: "The reproductive system is responsible for the production of offspring, ensuring the continuation of the species. It includes both male and female organs, each with specialized functions for reproduction.",
        imageHint: "reproductive organs",
        illustrationCaption: {
            title: "Reproductive System Diagrams",
            description: "Separate diagrams for male and female reproductive organs."
        },
        keyComponents: [ // Mapped from keyOrgansAndComponents in new data
            {
                name: "Male Reproductive System",
                description: "Consists of organs responsible for producing and delivering sperm.",
                subtypes: [
                    { name: "Testes", location: "Scrotum", description: "Produce sperm and testosterone, the male sex hormone." },
                    { name: "Vas Deferens", location: "Between the testes and the urethra", description: "Transports sperm from the testes to the urethra." },
                    { name: "Seminal Vesicles", location: "Near the bladder", description: "Secrete fluid that nourishes and helps transport sperm." },
                    { name: "Prostate Gland", location: "Below the bladder", description: "Secretes a fluid that is part of semen and helps sperm mobility." },
                    { name: "Penis", location: "External organ", description: "Delivers sperm to the female reproductive tract." }
                ]
            },
            {
                name: "Female Reproductive System",
                description: "Consists of organs responsible for producing eggs, gestating a fetus, and childbirth.",
                subtypes: [
                    { name: "Ovaries", location: "Pelvic cavity", description: "Produce eggs (ova) and secrete hormones like estrogen and progesterone." },
                    { name: "Fallopian Tubes", location: "Between the ovaries and the uterus", description: "Carry eggs from the ovaries to the uterus; fertilization typically occurs here." },
                    { name: "Uterus", location: "Pelvic cavity", description: "Houses and nourishes the developing fetus during pregnancy." },
                    { name: "Vagina", location: "External canal", description: "Acts as the passage for childbirth and the exit for menstrual blood." },
                    { name: "Cervix", location: "Between the uterus and vagina", description: "Serves as a barrier that protects the uterus and helps in labor." }
                ]
            }
        ],
        primaryFunctions: [ // From new data
            { name: "Production of Gametes", description: "The male and female reproductive systems produce gametes (sperm and eggs), which are essential for fertilization and reproduction." },
            { name: "Fertilization", description: "The fusion of sperm from the male and egg from the female to form a zygote, beginning the process of pregnancy." },
            { name: "Gestation (in females)", description: "Development of the fertilized egg (zygote) into a fetus within the uterus until birth." },
            { name: "Hormonal Regulation", description: "Both male and female reproductive systems are regulated by hormones such as estrogen, progesterone, testosterone, and others." },
            { name: "Sexual Reproduction", description: "Involves the physical act of intercourse leading to fertilization, followed by pregnancy and birth in females." }
        ],
        keyProcesses: [ // Mapped from sexualReproductionProcess in new data
            { name: "Fertilization", description: "The sperm from the male fertilizes the egg from the female, forming a zygote." },
            { name: "Implantation", description: "The fertilized egg (zygote) attaches to the uterine wall for development." },
            { name: "Pregnancy", description: "The development of the zygote into an embryo and fetus, culminating in birth." },
            { name: "Birth", description: "The process by which the fetus is delivered through the vaginal canal or by cesarean section." }
        ],
        healthAndWellness: { // From new data
            tips: ["Maintain a healthy diet and exercise regimen to support hormone regulation.","Avoid smoking, excessive alcohol, and illicit drugs as they can affect fertility.","Practice safe sex to prevent sexually transmitted infections (STIs).","Get regular check-ups and screenings, such as pap smears and prostate exams, for early detection of issues.","Stay hydrated and manage stress to support overall reproductive health."],
            preventiveCare: ["Routine gynecological exams for women, including mammograms and pelvic exams.","Annual prostate exams and testosterone checks for men over 50.","Fertility testing and counseling if planning pregnancy or struggling with infertility."]
        },
        commonDisorders: [ // From new data
            { name: "Infertility", description: "The inability to conceive after one year of trying, affecting both men and women." },
            { name: "Polycystic Ovary Syndrome (PCOS)", description: "A hormonal disorder in women that can cause irregular periods, excess hair growth, and infertility." },
            { name: "Endometriosis", description: "A painful condition where tissue similar to the uterine lining grows outside the uterus, affecting fertility." },
            { name: "Erectile Dysfunction", description: "The inability to achieve or maintain an erection for satisfactory sexual performance." },
            { name: "Prostate Cancer", description: "A type of cancer that affects the prostate gland in men." },
            { name: "STIs (Sexually Transmitted Infections)", description: "Infections passed through sexual contact, such as chlamydia, gonorrhea, HIV, and syphilis." },
            { name: "Menopause", description: "The natural cessation of menstruation in women, marking the end of reproductive years." }
        ],
        interestingFacts: [ // From new data
            "The average time for sperm to reach the egg after ejaculation is about 1-2 hours.",
            "Women are born with all the eggs they will ever have, approximately 1-2 million eggs.",
            "Men produce about 1,500 sperm per second.",
            "The uterus can stretch up to 500 times its normal size during pregnancy."
        ],
        relatedSystems: [ // From new data
            "Endocrine System (hormones like estrogen and testosterone regulate reproductive processes)",
            "Nervous System (controls sexual arousal and responses)",
            "Circulatory System (supports blood flow during pregnancy and sexual arousal)"
        ],
        externalResources: [ // From new data
            { title: "American Pregnancy Association", url: "https://americanpregnancy.org/" },
            { title: "Mayo Clinic – Reproductive Health", url: "https://www.mayoclinic.org/healthy-lifestyle" },
            { title: "Planned Parenthood", url: "https://www.plannedparenthood.org/" }
        ]
    }
  },
  {
    name: "Lymphatic/Immune System",
    icon: Shield,
    description: "Defense against pathogens, fluid balance, lymph nodes.",
    color: "text-teal-500",
    slug: "lymphatic-immune-system",
    details: {
      sanskritName: "लसीका/प्रतिरक्षा प्रणाली (Lasīkā/Pratirakṣā Praṇālī)",
      overview: "The lymphatic system is a part of the immune system that helps the body defend against infection and maintain fluid balance. It consists of a network of lymphatic vessels, lymph nodes, and lymphoid organs. The immune system includes various cells and mechanisms that identify and destroy pathogens, cancer cells, and other foreign bodies.",
      imageHint: "lymph nodes immune",
      illustrationCaption: {
        title: "Lymphatic and Immune System Components",
        description: "Diagram showing lymph nodes, lymphatic vessels, spleen, thymus, tonsils, and bone marrow."
      },
      primaryFunctions: [
        { name: "Fluid Balance", description: "Maintaining fluid balance by returning interstitial fluid to the bloodstream" },
        { name: "Lipid Transport", description: "Transporting dietary lipids from the digestive tract" },
        { name: "Lymph Filtration", description: "Filtering lymph to remove pathogens and debris" },
        { name: "Lymphocyte Production/Housing", description: "Producing and housing lymphocytes (T cells and B cells)" },
        { name: "Pathogen Defense", description: "Defending the body against infectious agents and abnormal cells" }
      ],
      keyComponents: [
        { name: "Lymph", description: "A clear, watery fluid derived from interstitial fluid that circulates through the lymphatic system, transporting immune cells, waste, and foreign particles." },
        { name: "Lymphatic Vessels", description: "Thin-walled vessels that carry lymph from tissues to lymph nodes and eventually to the bloodstream." },
        { name: "Thymus", description: "A bilobed organ located in the upper chest where T lymphocytes mature. Function: Educates and matures T cells; active mostly during childhood." },
        { name: "Bone Marrow", description: "Soft tissue inside bones where all blood cells, including B lymphocytes, originate. Function: Site of B cell development and hematopoiesis." },
        { name: "Spleen", description: "An organ near the stomach that filters blood, removes old red blood cells, and responds to blood-borne pathogens." },
        { name: "Tonsils & Adenoids", description: "Lymphoid tissues in the pharynx that protect against inhaled and ingested pathogens." },
        { name: "Peyer's Patches", description: "Lymphoid nodules in the small intestine (especially ileum) that monitor intestinal bacteria and generate immune responses." },
        { name: "Mucosa-Associated Lymphoid Tissue (MALT)", description: "Diffuse lymphoid tissues in mucosal surfaces like the respiratory and digestive tracts." }
      ],
      lymphNodeDetails: {
        description: "Small, bean-shaped structures that filter lymph and store immune cells. They are key sites for immune response activation.",
        locations: [
          "Cervical (neck)", "Axillary (armpits)", "Inguinal (groin)",
          "Abdominal", "Thoracic (chest)"
        ],
        functions: [
          "Filter harmful substances such as bacteria, viruses, and cancer cells",
          "House lymphocytes and macrophages",
          "Trigger immune responses"
        ],
        structure: {
          capsule: "A fibrous outer covering",
          cortex: "Outer region containing lymphoid follicles",
          medulla: "Inner region with medullary cords and sinuses",
          afferentVessels: "Vessels that bring lymph into the node",
          efferentVessel: "Single vessel that carries filtered lymph out"
        }
      },
      immuneCells: {
        Lymphocytes: {
          TCells: {
            types: {
              "Helper T Cells (CD4+)": "Coordinate immune response by signaling other immune cells",
              "Cytotoxic T Cells (CD8+)": "Kill virus-infected and tumor cells",
              "Regulatory T Cells": "Suppress excessive immune responses to maintain tolerance"
            }
          },
          BCells: {
            description: "Produce antibodies against specific antigens",
            plasmaCells: "Activated B cells that secrete antibodies"
          },
          NaturalKillerCells: { description: "Destroy infected and cancerous cells without antigen specificity" }
        },
        Phagocytes: {
          Macrophages: "Engulf and digest pathogens and dead cells",
          DendriticCells: "Present antigens to T cells to initiate adaptive immunity",
          Neutrophils: "First responders that engulf microbes at infection sites"
        }
      },
      defenseMechanisms: {
        InnateImmunity: {
          description: "Non-specific defense mechanisms present from birth",
          components: [
            "Physical barriers (skin, mucosa)",
            "Phagocytic cells (macrophages, neutrophils)",
            "Inflammation",
            "Complement system",
            "Natural killer cells"
          ]
        },
        AdaptiveImmunity: {
          description: "Specific immune response that adapts to new pathogens",
          features: [
            "Antigen-specific",
            "Has memory",
            "Includes humoral (B cell-mediated) and cellular (T cell-mediated) responses"
          ]
        }
      },
      healthAndWellness: {
        tips: ["Maintain a healthy diet rich in fruits, vegetables, and antioxidants to support immune function.", "Get adequate sleep, as it's crucial for immune system repair and function.", "Manage stress, as chronic stress can weaken the immune system.", "Practice good hygiene (handwashing) to prevent infections."],
        preventiveCare: ["Vaccinations to protect against specific diseases.", "Regular health check-ups.", "Avoid smoking and excessive alcohol consumption."]
      },
      commonDisorders: [
        { name: "Lymphedema", description: "Swelling caused by lymph accumulation due to lymphatic obstruction or damage." },
        { name: "Lymphadenopathy", description: "Enlargement of lymph nodes due to infection, inflammation, or malignancy." },
        { name: "Autoimmune Diseases", description: "Conditions where the immune system attacks the body's own tissues (e.g., lupus, rheumatoid arthritis)." },
        { name: "Immunodeficiency", description: "Weakened immune response due to genetic disorders, HIV infection, or chemotherapy." },
        { name: "Lymphoma", description: "Cancer of lymphatic tissue (e.g., Hodgkin and non-Hodgkin lymphoma)." }
      ],
      interestingFacts: [
            "The lymphatic system does not have its own pump like the circulatory system (heart); it relies on muscle contractions and body movement.",
            "The spleen is the largest lymphatic organ.",
            "Memory cells in the immune system 'remember' past infections, allowing for a faster response if exposed again."
      ],
      relatedSystems: [
        "Circulatory System",
        "Endocrine System",
        "Integumentary System"
      ],
      externalResources: [
        { title: "NIH - Immune System Overview", url: "https://www.nih.gov/" },
        { title: "Khan Academy - Lymphatic System", url: "https://www.khanacademy.org/science/health-and-medicine/human-anatomy-and-physiology/lymphatic-system" },
        { title: "Mayo Clinic - Lymph Nodes", url: "https://www.mayoclinic.org/" }
      ]
    }
  },
  {
    name: "Integumentary System",
    icon: Layers,
    description: "Skin, hair, nails, protection.",
    color: "text-indigo-500",
    details: {
        sanskritName: "त्वचा प्रणाली (Tvachā Praṇālī)",
        overview: "The integumentary system consists of the skin, hair, nails, and associated glands. It acts as a protective barrier, regulates body temperature, and provides sensory information.",
        imageHint: "skin layers",
        illustrationCaption: {
            title: "Integumentary System Layers",
            description: "Cross-section of the skin showing epidermis, dermis, hypodermis, hair follicles, sweat glands, and sebaceous glands."
        },
        keyComponents: [
            { name: "Skin", description: "The largest organ, composed of three layers: Epidermis (outer protective layer), Dermis (contains blood vessels, nerves, hair follicles, glands), and Hypodermis (subcutaneous fat layer)." },
            { name: "Hair Follicles", description: "Structures in the dermis from which hairs grow. Hair provides minor protection and insulation." },
            { name: "Nails", description: "Hard plates made of keratin that protect the tips of fingers and toes." },
            { name: "Sweat Glands (Sudoriferous glands)", description: "Produce sweat to help regulate body temperature through evaporation." },
            { name: "Sebaceous Glands", description: "Produce sebum (oil) to lubricate and waterproof the skin and hair." }
        ],
        primaryFunctions: [
            { name: "Protection", description: "Acts as a physical barrier against pathogens, UV radiation, chemicals, and dehydration." },
            { name: "Temperature Regulation", description: "Sweating cools the body; blood vessel constriction/dilation conserves or releases heat." },
            { name: "Sensation", description: "Contains sensory receptors for touch, pressure, pain, and temperature." },
            { name: "Vitamin D Synthesis", description: "Skin produces Vitamin D when exposed to UV radiation from sunlight." },
            { name: "Excretion", description: "Minor excretion of waste products like urea and salts through sweat." }
        ],
        healthAndWellness: {
            tips: ["Protect skin from excessive sun exposure by using sunscreen and protective clothing.", "Keep skin clean and moisturized to maintain its barrier function.", "Eat a diet rich in vitamins and minerals (especially Vitamin C, E, and Zinc) for healthy skin, hair, and nails.", "Stay hydrated for skin elasticity."],
            preventiveCare: ["Regular skin checks for moles or suspicious changes.", "Prompt treatment of skin infections or conditions.", "Avoid harsh soaps and chemicals that can irritate the skin."]
        },
        commonDisorders: [
            { name: "Acne", description: "A skin condition that occurs when hair follicles become clogged with oil and dead skin cells." },
            { name: "Eczema (Atopic Dermatitis)", description: "A condition that makes your skin red and itchy." },
            { name: "Psoriasis", description: "A chronic autoimmune condition that causes the rapid buildup of skin cells, leading to scaling on the skin's surface." },
            { name: "Skin Cancer", description: "Abnormal growth of skin cells, often caused by sun exposure." }
        ],
        interestingFacts: [
            "Skin renews itself approximately every 28 days.",
            "Fingerprints are unique patterns formed by ridges in the epidermis.",
            "Hair grows about 1 cm per month on average."
        ],
        relatedSystems: [
            "Immune System (skin provides a barrier; immune cells reside in skin)",
            "Nervous System (sensory receptors in skin)",
            "Circulatory System (blood vessels in dermis supply nutrients and regulate temperature)"
        ],
        externalResources: [
            { title: "American Academy of Dermatology (AAD)", url: "https://www.aad.org/" },
            { title: "NIH - Skin Conditions", url: "https://www.niams.nih.gov/health-topics/skin-diseases" }
        ]
    }
  },
];

export const slugify = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

systems.forEach(system => {
  system.slug = slugify(system.name);
});

// Helper to get system data by slug (used in page.tsx)
export const getSystemBySlug = (slug: string) => {
  return systems.find(s => s.slug === slug);
}
