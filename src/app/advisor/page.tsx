import type { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';
import KoshaQuiz from '@/components/kosha-explorer/kosha-quiz';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'Knowledge Quiz | Test Your Wellness Wisdom | Kosha Explorer',
  description: 'Test your understanding of Koshas, anatomy, and holistic wellness with our interactive quiz. Earn points and deepen your knowledge!',
  keywords: ['Wellness Quiz', 'Kosha Quiz', 'Anatomy Quiz', 'Holistic Health Knowledge', 'Spiritual Quiz', 'Ayurveda Quiz'],
  openGraph: {
    title: 'Knowledge Quiz | Test Your Wellness Wisdom | Kosha Explorer',
    description: 'Challenge your understanding of holistic wellness, Pancha Koshas, and human anatomy with our interactive quiz.',
    url: `${siteBaseUrl}/advisor`,
    type: 'website', // Or 'article' if you consider it a piece of content
    images: [
      {
        url: `https://picsum.photos/seed/wellness-quiz-og/1200/630`,
        width: 1200,
        height: 630,
        alt: 'Kosha Explorer Wellness Knowledge Quiz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Knowledge Quiz | Test Your Wellness Wisdom | Kosha Explorer',
    description: 'Test your knowledge on Koshas, anatomy, and holistic wellness. Earn points and deepen your understanding!',
    images: [`https://picsum.photos/seed/wellness-quiz-twitter/1200/630`],
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
  return (
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
  );
}
