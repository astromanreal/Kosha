
import type { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';
import KoshaQuiz from '@/components/kosha-explorer/kosha-quiz';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'Knowledge Quiz | Test Your Wellness Wisdom | Kosha Explorer',
  description: 'Test your understanding of the Pancha Koshas, human anatomy, and holistic wellness principles with our interactive quiz. Deepen your knowledge on your journey to well-being and spiritual growth!',
  keywords: ['Wellness Quiz Online', 'Kosha Knowledge Test', 'Anatomy Quiz Human Body', 'Holistic Health Quiz', 'Spiritual Quiz Questions', 'Ayurveda Knowledge Test', 'Mind-Body Wellness Assessment', 'Yoga Philosophy Quiz', 'Health Literacy Test'],
  openGraph: {
    title: 'Holistic Wellness Knowledge Quiz | Test Your Wisdom | Kosha Explorer',
    description: 'Challenge your understanding of holistic wellness concepts, Pancha Koshas, and human anatomy with our interactive quiz. Deepen your knowledge and track your learning!',
    url: `${siteBaseUrl}/advisor`, 
    type: 'website', 
    images: [
      {
        url: `https://placehold.co/1200x630.png?text=Kosha+Explorer+Wellness+Quiz`,
        width: 1200,
        height: 630,
        alt: 'Kosha Explorer Wellness Knowledge Quiz Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test Your Wellness Wisdom: Kosha & Anatomy Quiz | Kosha Explorer',
    description: 'How well do you know the Pancha Koshas, human anatomy, and holistic health? Take our quiz to find out and deepen your understanding on Kosha Explorer!',
    images: [`https://placehold.co/1200x630.png?text=Kosha+Explorer+Wellness+Quiz`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const quizData = {
  "quiz": [
    {
      "topic": "Pancha Kosha",
      "question": "What does the term Pancha Kosha refer to in Hindu philosophy?",
      "options": [
        "Five layers of the human body",
        "Five stages of life",
        "Five elements of the universe",
        "Five main chakras in the body"
      ],
      "answer": "Five layers of the human body"
    },
    {
      "topic": "Pancha Kosha",
      "question": "Which of the following is the innermost sheath in the Pancha Kosha?",
      "options": [
        "Anandamaya Kosha",
        "Vijnanamaya Kosha",
        "Manomaya Kosha",
        "Pranamaya Kosha"
      ],
      "answer": "Anandamaya Kosha"
    },
    {
      "topic": "Pancha Kosha",
      "question": "Which of the following is the outermost sheath of the Pancha Kosha?",
      "options": [
        "Anandamaya Kosha",
        "Vijnanamaya Kosha",
        "Manomaya Kosha",
        "Annamaya Kosha"
      ],
      "answer": "Annamaya Kosha"
    },
    {
      "topic": "Pancha Kosha",
      "question": "What does the Pranamaya Kosha relate to?",
      "options": [
        "Physical body",
        "Mental body",
        "Energy body",
        "Intellectual body"
      ],
      "answer": "Energy body"
    },
    {
      "topic": "Anatomy",
      "question": "What is the largest organ in the human body?",
      "options": [
        "Brain",
        "Heart",
        "Skin",
        "Liver"
      ],
      "answer": "Skin"
    },
    {
      "topic": "Anatomy",
      "question": "Which part of the body is responsible for pumping blood?",
      "options": [
        "Lungs",
        "Brain",
        "Heart",
        "Stomach"
      ],
      "answer": "Heart"
    },
    {
      "topic": "Anatomy",
      "question": "Which bone is the longest in the human body?",
      "options": [
        "Humerus",
        "Femur",
        "Tibia",
        "Spine"
      ],
      "answer": "Femur"
    },
    {
      "topic": "Anatomy",
      "question": "What is the name of the muscle that helps with breathing?",
      "options": [
        "Biceps",
        "Triceps",
        "Diaphragm",
        "Deltoid"
      ],
      "answer": "Diaphragm"
    },
    {
      "topic": "Anatomy",
      "question": "Which part of the human brain is responsible for regulating basic functions like heartbeat and breathing?",
      "options": [
        "Cerebellum",
        "Medulla Oblongata",
        "Cerebrum",
        "Thalamus"
      ],
      "answer": "Medulla Oblongata"
    },
    {
      "topic": "Anatomy",
      "question": "What is the function of the kidneys in the human body?",
      "options": [
        "Regulate body temperature",
        "Filter and remove waste from the blood",
        "Produce red blood cells",
        "Help with digestion"
      ],
      "answer": "Filter and remove waste from the blood"
    }
  ]
};

export default function AdvisorPage() {
  const pageUrl = `${siteBaseUrl}/advisor`;
  const pageTitle = metadata.title as string;
  const pageDescription = metadata.description as string;
  const imageUrl = (metadata.openGraph?.images as any)?.[0]?.url;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": pageUrl,
    "name": pageTitle,
    "description": pageDescription,
    "isPartOf": {
      "@type": "WebSite",
      "url": siteBaseUrl,
      "name": "Kosha Explorer"
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": imageUrl
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
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
      "name": "Knowledge Quiz",
      "item": pageUrl
    }]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="space-y-8">
        <section className="text-center">
          <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-primary mb-4">Holistic Wellness Knowledge Quiz</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test your understanding of Koshas, human anatomy, and holistic wellness concepts. Earn points and deepen your knowledge on your journey to well-being!
          </p>
        </section>

        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Kosha Explorer Quiz: Anatomy & Wellness</CardTitle>
            <CardDescription>
              Answer the questions to the best of your ability. Good luck!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <KoshaQuiz quizData={quizData.quiz} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
