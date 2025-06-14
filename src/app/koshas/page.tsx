
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, Wind, BrainCircuit, BookOpenText, Sparkles, Layers, Star, Goal, CheckCircle, ExternalLink, BookMarked } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'The Pancha Koshas: Guide to the Five Sheaths of Existence | Kosha Explorer',
  description: 'Explore the Pancha Koshas (Annamaya, Pranamaya, Manomaya, Vijnanamaya, Anandamaya) - the five layers of being in yogic philosophy. Learn their characteristics, functions, and practices for holistic well-being and spiritual growth on Kosha Explorer.',
  keywords: ['Pancha Koshas Explained', 'Five Sheaths of Yoga Philosophy', 'Yogic Layers of Being', 'Annamaya Kosha (Physical Body)', 'Pranamaya Kosha (Energy Body)', 'Manomaya Kosha (Mental Body)', 'Vijnanamaya Kosha (Wisdom Body)', 'Anandamaya Kosha (Bliss Body)', 'Holistic Well-being Model', 'Spiritual Growth Path Vedanta', 'Self-Realization Layers'],
  openGraph: {
    title: 'Understanding the Pancha Koshas: The Five Layers of Being | Kosha Explorer',
    description: 'A comprehensive guide to the Annamaya, Pranamaya, Manomaya, Vijnanamaya, and Anandamaya Koshas. Discover practices for holistic health and spiritual self-discovery.',
    url: `${siteBaseUrl}/koshas`,
    type: 'article',
    images: [
      {
        url: `https://placehold.co/1200x630.png?text=The+Five+Koshas+Explained`,
        width: 1200,
        height: 630,
        alt: 'Visual representation of the Five Koshas - Layers of Being',
      },
    ],
    article: {
      publishedTime: "2024-01-01T00:00:00.000Z",
      modifiedTime: new Date().toISOString(),
      authors: [`${siteBaseUrl}/about`],
      section: "Yoga Philosophy",
      tags: ['Pancha Koshas', 'Yoga', 'Vedanta', 'Spirituality', 'Holistic Health'],
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pancha Koshas: Your Guide to the Five Sheaths of Existence | Kosha Explorer',
    description: 'Explore the Annamaya, Pranamaya, Manomaya, Vijnanamaya, and Anandamaya Koshas. Learn practices for holistic well-being and spiritual insight on Kosha Explorer.',
    images: [`https://placehold.co/1200x630.png?text=The+Five+Koshas+Explained`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface KoshaInfo {
  name: string;
  sanskritName: string;
  generalDescription: string;
  icon: React.ElementType;
  color: string;
  detailsLink?: string;
  meaningLiteral: string;
  functionDesc: string;
  characteristics: string;
  practices: string; 
}

const koshasData: KoshaInfo[] = [
  {
    name: "Annamaya Kosha",
    sanskritName: "अन्नमय कोश",
    generalDescription: "The physical body, nourished by food. It's the most tangible layer, encompassing muscles, bones, skin, and organs. Understanding this sheath is key to physical health.",
    icon: Utensils,
    practices: "Proper Ayurvedic diet, asana (yoga postures), physical exercise, adequate rest, hydration.",
    color: "text-primary",
    detailsLink: "/physical-body",
    meaningLiteral: "Literally \"food sheath\" (Anna = food, Maya = made of/filled with). This is the gross, tangible body sustained by nourishment.",
    functionDesc: "Enables physical movement, actions, sensory perception (sight, sound, touch, taste, smell), and interaction with the external world.",
    characteristics: "Subject to birth, growth, change, decay, disease, and eventual death. It is the densest of the five koshas, forming the foundation of our worldly experience.",
  },
  {
    name: "Pranamaya Kosha",
    sanskritName: "प्राणमय कोश",
    generalDescription: "The energy body or vital life force sheath. It circulates Prana (life energy) through nadis (energy channels) and chakras, linking body and mind.",
    icon: Wind,
    practices: "Pranayama (yogic breathing techniques), acupuncture, energy healing modalities (like Reiki), spending time in nature, mindful movement to enhance vitality.",
    color: "text-secondary",
    detailsLink: "/pranamaya/breath-awareness", 
    meaningLiteral: "\"Vital energy sheath\" (Prāṇa = vital life force/breath, Maya = made of/filled with). This sheath animates the physical body.",
    functionDesc: "Governs all physiological processes: breathing, circulation, digestion, metabolism, nerve impulses, and overall vitality. It is the bridge between the physical body and the mind, vital for life.",
    characteristics: "Composed of the five pranas (Prana, Apana, Samana, Udana, Vyana). It flows through energy channels (nadis) and centers (chakras). An imbalanced Pranamaya Kosha can manifest as fatigue or illness; without prana, the physical body is inert.",
  },
  {
    name: "Manomaya Kosha",
    sanskritName: "मनोमय कोश",
    generalDescription: "The mental and emotional body. This is where thoughts, feelings, emotions, and sensory perceptions arise. It processes our daily experiences.",
    icon: BrainCircuit,
    practices: "Meditation (dhyana), mindfulness practices, mantra japa (repetition), journaling, emotional processing techniques (like therapy or self-reflection), karma yoga (selfless service).",
    color: "text-yellow-500", 
    meaningLiteral: "\"Mental sheath\" (Manas = mind, Maya = made of/filled with). This layer processes thoughts and emotions.",
    functionDesc: "Responsible for thinking, feeling, doubting, imagining, memory, and processing sensory input from the Pranamaya Kosha. It is the seat of the ego (ahamkara) and the reactive mind.",
    characteristics: "Constantly active with thoughts and emotions. Influences behavior, moods, habits, and personal identity. It can be easily disturbed by external stimuli or internal conflicts. Balancing this kosha is key to mental peace.",
  },
  {
    name: "Vijnanamaya Kosha",
    sanskritName: "विज्ञानमय कोश",
    generalDescription: "The wisdom or intellect body. This layer is associated with higher intellect, intuition, discernment (viveka), and inner knowing.",
    icon: BookOpenText,
    practices: "Self-inquiry (Atma Vichara), study of scriptures and philosophical texts (Svadhyaya), contemplation (manana), developing intuition, seeking wisdom from enlightened teachers, moral and ethical living.",
    color: "text-purple-500", 
    meaningLiteral: "\"Wisdom sheath\" (Vijnāna = discernment/intellect/wisdom, Maya = made of/filled with). This is the sheath of higher intellect and intuitive knowledge.",
    functionDesc: "Facilitates discernment, discrimination (viveka), decision-making, willpower, and provides a moral compass. It is where intuition and inner wisdom arise, allowing for deeper understanding beyond the reactive mind.",
    characteristics: "Less reactive and more contemplative than the Manomaya Kosha. It's associated with awareness, insight, and the ability to distinguish between the real and unreal, permanent and impermanent. Spiritual insight and a sense of purpose often develop here.",
  },
  {
    name: "Anandamaya Kosha",
    sanskritName: "आनन्दमय कोश",
    generalDescription: "The bliss body, the deepest and most subtle layer. It represents pure consciousness, unconditional joy, love, and peace—our true nature.",
    icon: Sparkles,
    practices: "Deep meditation leading to Samādhi (absorption), devotion (bhakti yoga), selfless service (seva) without attachment, experiencing states of flow and profound connection, surrender to a higher power.",
    color: "text-pink-500", 
    meaningLiteral: "\"Bliss sheath\" (Ānanda = bliss/joy, Maya = made of/filled with). This is the causal body and the most subtle layer, closest to the true Self (Ātman).",
    functionDesc: "The experience of pure, unconditional joy, peace, love, and unity. It is not pleasure derived from external objects but an inherent state of being.",
    characteristics: "Still, radiant, and characterized by non-dual awareness. It's the source of inner peace and contentment. This sheath is experienced most profoundly in deep, dreamless sleep and in states of deep meditation (Samādhi). It is the final veil before realizing the Ātman.",
  },
];

interface KoshaInfoCardProps {
  kosha: KoshaInfo;
}

function KoshaInfoCard({ kosha }: KoshaInfoCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card/70 hover:bg-card">
      <CardHeader>
        <div className="flex items-center space-x-4 mb-3">
          <kosha.icon className={`h-12 w-12 ${kosha.color} flex-shrink-0`} />
          <div>
            <CardTitle className={`text-3xl ${kosha.color}`}>{kosha.name}</CardTitle>
            <p className="text-md text-muted-foreground">{kosha.sanskritName}</p>
          </div>
        </div>
         <p className="text-muted-foreground leading-relaxed text-sm italic">{kosha.generalDescription}</p>
      </CardHeader>
      <CardContent className="flex-grow space-y-5">
        <div className="space-y-3 pt-2">
          <div>
            <h3 className="font-semibold text-foreground text-md mb-1">Meaning:</h3>
            <p className="text-sm text-muted-foreground leading-normal">{kosha.meaningLiteral}</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-md mb-1">Function:</h3>
            <p className="text-sm text-muted-foreground leading-normal">{kosha.functionDesc}</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-md mb-1">Characteristics:</h3>
            <p className="text-sm text-muted-foreground leading-normal">{kosha.characteristics}</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-md mb-1">Practices for Balance/Realization:</h3>
            <p className="text-sm text-muted-foreground leading-normal">{kosha.practices}</p>
          </div>
        </div>

        {kosha.detailsLink && (
          <Button variant="outline" asChild className="w-full mt-4 border-accent text-accent hover:bg-accent/10 hover:text-accent-foreground">
            <Link href={kosha.detailsLink}>
              Explore {kosha.name} Further <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

const koshaOverviewData = [
  { id: "1", kosha: "1. Annamaya Kosha", meaning: "\"Food Sheath\"", aspect: "Physical Body", composition: "Flesh, bones, organs, skin", element: "Earth (Prithvi)" },
  { id: "2", kosha: "2. Pranamaya Kosha", meaning: "\"Vital Energy Sheath\"", aspect: "Life Force (Prāṇa)", composition: "Breath, circulation, nadis, chakras", element: "Water/Air (Ap/Vayu)" },
  { id: "3", kosha: "3. Manomaya Kosha", meaning: "\"Mental Sheath\"", aspect: "Mind and Emotions", composition: "Thoughts, feelings, sensory input, ego", element: "Fire (Agni)" },
  { id: "4", kosha: "4. Vijnanamaya Kosha", meaning: "\"Wisdom Sheath\"", aspect: "Intellect, Intuition, Discernment", composition: "Discrimination (Viveka), inner wisdom, values", element: "Air/Ether (Vayu/Akasha)" },
  { id: "5", kosha: "5. Anandamaya Kosha", meaning: "\"Bliss Sheath\"", aspect: "Causal Body / Pure Joy & Peace", composition: "Unconditional love, bliss, unity, equanimity", element: "Ether (Ākāśa)" },
];

const keyInsightsData = [
    { title: "Holistic Health Model", description: "The Pancha Koshas integrate physical, energetic, emotional, intellectual, and spiritual dimensions of our being.", icon: Layers },
    { title: "Yoga and Self-Healing", description: "Provides a roadmap for yogic healing—yoga aims to purify and balance each sheath for comprehensive well-being and self-awareness.", icon: CheckCircle },
    { title: "Spiritual Growth Journey", description: "Represents a progression from the gross material body to the subtle spiritual Self (Atman), aiding in self-inquiry and liberation (moksha).", icon: Star },
    { title: "Balance and Integration in Life", description: "Harmony and true health arise from nourishing and integrating all five koshas. Neglecting any kosha can lead to imbalance and dis-ease.", icon: Utensils }
];


export default function KoshasPage() {
  const pageUrl = `${siteBaseUrl}/koshas`;
  const pageTitle = (metadata.title as { default: string }).default || metadata.title as string;
  const pageDescription = metadata.description as string;
  const imageUrl = (metadata.openGraph?.images as any)?.[0]?.url;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    },
    "headline": pageTitle,
    "description": pageDescription,
    "image": imageUrl,
    "author": {
      "@type": "Organization",
      "name": "Kosha Explorer"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kosha Explorer",
      "logo": {
        "@type": "ImageObject",
        "url": `https://placehold.co/200x60.png?text=Kosha+Explorer+Logo`
      }
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "articleSection": "Yoga Philosophy",
    "keywords": (metadata.keywords as string[]).join(", ")
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": siteBaseUrl
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Pancha Koshas",
      "item": pageUrl
    }]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="space-y-16">
        <section className="text-center">
          <Layers className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-primary mb-6">The Pancha Koshas: Five Sheaths of Existence in Yogic Philosophy</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Yogic philosophy describes human existence through five layers or sheaths, known as the Pancha Koshas. These layers range from the gross physical body to the most subtle spiritual essence, providing a profound map for holistic well-being, self-understanding, and spiritual growth.
          </p>
        </section>

        <section>
          <Card className="shadow-2xl border-primary/30 bg-card/90">
            <CardHeader className="items-center pb-6 text-center">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <Star className="h-12 w-12 text-accent" />
                <CardTitle className="text-4xl text-primary">Overview of the Five Koshas</CardTitle>
              </div>
              <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">A concise summary of the five sheaths (Annamaya, Pranamaya, Manomaya, Vijnanamaya, Anandamaya) and their fundamental characteristics within the yogic framework.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-xl border-2 border-border shadow-inner">
                <Table className="min-w-full divide-y divide-border">
                  <TableHeader className="bg-muted/60">
                    <TableRow>
                      <TableHead className="py-4 pl-6 pr-3 text-left text-sm font-semibold text-foreground w-[220px]">Kosha Name</TableHead>
                      <TableHead className="px-3 py-4 text-left text-sm font-semibold text-foreground">Literal Meaning</TableHead>
                      <TableHead className="px-3 py-4 text-left text-sm font-semibold text-foreground">Aspect of Being</TableHead>
                      <TableHead className="px-3 py-4 text-left text-sm font-semibold text-foreground">Primary Composition</TableHead>
                      <TableHead className="px-3 py-4 text-left text-sm font-semibold text-foreground sm:pr-6">Dominant Element(s)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-border bg-background">
                    {koshaOverviewData.map((item) => (
                      <TableRow key={item.id} className="hover:bg-muted/40 transition-colors duration-200">
                        <TableCell className="whitespace-nowrap py-5 pl-6 pr-3 text-sm font-medium text-foreground">{item.kosha}</TableCell>
                        <TableCell className="px-3 py-5 text-sm text-muted-foreground">{item.meaning}</TableCell>
                        <TableCell className="px-3 py-5 text-sm text-muted-foreground">{item.aspect}</TableCell>
                        <TableCell className="px-3 py-5 text-sm text-muted-foreground">{item.composition}</TableCell>
                        <TableCell className="whitespace-nowrap px-3 py-5 text-sm text-muted-foreground sm:pr-6">{item.element}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="text-center mb-12">
            <Layers className="h-16 w-16 text-accent mx-auto mb-4" />
            <h2 className="text-4xl font-semibold text-foreground">Detailed Explanation of Each Kosha</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-3">Dive deeper into the individual characteristics, functions, and practices associated with each of the five sheaths for comprehensive self-understanding.</p>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-12">
            {koshasData.map((kosha) => (
              <KoshaInfoCard key={kosha.name} kosha={kosha} />
            ))}
          </div>
        </section>

        <section>
          <Card className="shadow-xl bg-card/80 border-primary/20">
            <CardHeader className="text-center">
              <Goal className="h-16 w-16 text-primary mx-auto mb-4" />
              <CardTitle className="text-3xl text-primary">The Goal: Realizing the Ātman (True Self)</CardTitle>
            </CardHeader>
            <CardContent className="text-center max-w-2xl mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Pancha Koshas are often likened to layers veiling the innermost Self (Ātman). True self-realization, the ultimate aim of yogic and Vedantic paths, occurs when the seeker transcends all five koshas. This transcendence leads to the profound realization of one's true identity as Brahman—pure, undifferentiated consciousness, existing beyond the limitations of body, energy, mind, intellect, and ego.
              </p>
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="text-center mb-10">
              <BookMarked className="h-16 w-16 text-accent mx-auto mb-4" />
              <h2 className="text-4xl font-semibold text-foreground">Key Insights on the Pancha Kosha Model</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-3">Understanding the Koshas offers valuable perspectives for a balanced, conscious life and spiritual evolution.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
              {keyInsightsData.map((insight) => (
              <Card key={insight.title} className="shadow-lg hover:shadow-xl transition-shadow bg-card/50">
                  <CardHeader className="flex flex-row items-center space-x-4 pb-3">
                  <insight.icon className="h-10 w-10 text-primary flex-shrink-0" />
                  <CardTitle className="text-2xl text-primary">{insight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{insight.description}</p>
                  </CardContent>
              </Card>
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
