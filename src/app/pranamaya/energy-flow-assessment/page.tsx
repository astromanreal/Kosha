
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Lightbulb, ListOrdered, FileQuestion, SmartphoneNfc, BarChartHorizontalBig, ShieldCheck, AlertTriangle, Brain, Activity, Moon, Utensils } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'Energy Flow Assessment | Pranic Vitality & Subtle Body Analysis | Kosha Explorer',
  description: 'Assess your pranic energy (life force) with Kosha Explorer. Identify potential blocks or imbalances in your Pranamaya Kosha and receive suggestions for restoring vitality and well-being. Understand your subtle energy body.',
  keywords: ['Energy Flow Assessment Tool', 'Pranic Healing Guide', 'Vitality Check Online', 'Chakra Imbalance Test', 'Nadi Cleansing Practices', 'Pranamaya Kosha Analysis Tool', 'Subtle Body Energy Scan', 'Holistic Energy Evaluation', 'Aura Reading Insights', 'Life Force Energy Balance'],
  openGraph: {
    title: 'Pranic Energy Flow Assessment & Vitality Check | Kosha Explorer',
    description: 'Gauge your pranic energy (life force), identify blocks in your Pranamaya Kosha, and learn how to restore balance and vitality with our Energy Flow Assessment tool on Kosha Explorer.',
    url: `${siteBaseUrl}/pranamaya/energy-flow-assessment`,
    type: 'article', 
    images: [
      {
        url: `https://placehold.co/1200x630.png?text=Energy+Flow+Assessment`,
        width: 1200,
        height: 630,
        alt: 'Energy Flow Assessment for Pranamaya Kosha on Kosha Explorer',
      },
    ],
    article: {
      publishedTime: "2024-01-01T00:00:00.000Z",
      modifiedTime: new Date().toISOString(),
      authors: [`${siteBaseUrl}/about`],
      section: "Pranayama",
      tags: ['Energy Healing', 'Prana', 'Vitality', 'Subtle Body', 'Pranamaya Kosha'],
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Assess Your Energy Flow & Pranic Vitality | Kosha Explorer',
    description: 'Understand your Pranamaya Kosha. Assess your pranic energy, identify imbalances, and get suggestions for restoring vitality and balance with Kosha Explorer.',
    images: [`https://placehold.co/1200x630.png?text=Energy+Flow+Assessment`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const howItWorksSteps = [
  {
    title: "Take the Energy Survey",
    description: "Answer a series of thoughtful questions related to your current physical, mental, and emotional state.",
    icon: FileQuestion,
  },
  {
    title: "Connect a Sensor (Optional)",
    description: "If available, link a compatible wearable device for real-time data like HRV, breathing rate, and stress indicators to enhance the assessment.",
    icon: SmartphoneNfc,
  },
  {
    title: "View Your Energy Map",
    description: "The app will generate a snapshot of your energy flow, highlighting possible blockages or areas of depletion in your chakras or nadis.",
    icon: BarChartHorizontalBig,
  },
  {
    title: "Get Personalized Suggestions",
    description: "Based on the results, receive recommendations for pranayama techniques, meditations, or gentle movement practices to restore balance.",
    icon: Lightbulb,
  },
];

const questionnaireTopics = [
    { name: "Physical Symptoms", details: "Chronic fatigue, tension, irregular breath, pain points.", icon: Activity },
    { name: "Emotional Patterns", details: "Stress levels, mood swings, restlessness, anxiety, joy.", icon: Brain },
    { name: "Mental Clarity", details: "Focus, concentration, memory, mental fog, decision-making.", icon: Brain },
    { name: "Lifestyle Habits", details: "Sleep quality, dietary choices, daily routines, environmental factors.", icon: Utensils },
];


export default function EnergyFlowAssessmentPage() {
  const pageUrl = `${siteBaseUrl}/pranamaya/energy-flow-assessment`;
  const pageTitle = metadata.title as string;
  const pageDescription = metadata.description as string;
  const imageUrl = (metadata.openGraph?.images as any)?.[0]?.url;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article", // Or "HowTo" if it's more of a guided process
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
    "articleSection": "Pranayama",
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
      "item": `${siteBaseUrl}/koshas`
    },{
      "@type": "ListItem",
      "position": 3,
      "name": "Pranamaya Kosha",
      "item": `${siteBaseUrl}/koshas#pranamaya-kosha` 
    },{
      "@type": "ListItem",
      "position": 4,
      "name": "Energy Flow Assessment",
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
      <div className="space-y-12">
        <section className="text-center">
          <Zap className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Energy Flow Assessment</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Gauge your pranic energy (life force) by identifying blocks, imbalances, or fatigue within your subtle body. Gain insights into how energy flows through you and learn how to restore balance and vitality.
          </p>
        </section>

        <Card className="shadow-xl border-primary/20">
          <CardHeader>
            <CardTitle className="text-3xl text-primary flex items-center">
              <Lightbulb className="h-8 w-8 mr-3 text-accent" />
              Why It’s Important
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              When your prana (life energy) doesn’t flow freely, it can lead to physical fatigue, emotional imbalances, or lack of mental focus. This feature empowers you to understand subtle energy patterns within you and take informed steps—like breathwork, meditation, or lifestyle changes—to restore balance and vitality. A harmonious energy flow is crucial for overall well-being, connecting your physical health with your mental and spiritual peace.
            </p>
          </CardContent>
        </Card>

        <section>
          <div className="text-center mb-10">
            <ListOrdered className="h-16 w-16 text-accent mx-auto mb-4" />
            <h2 className="text-3xl font-semibold text-foreground">How It Works</h2>
            <p className="text-md text-muted-foreground max-w-xl mx-auto mt-2">
              Follow these steps to assess and understand your energy flow:
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((step, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow bg-card/70 h-full">
                <CardHeader className="items-center text-center">
                  <step.icon className="h-10 w-10 text-primary mb-3" />
                  <CardTitle className="text-xl text-primary">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="text-center mb-10">
            <Zap className="h-16 w-16 text-accent mx-auto mb-4" />
            <h2 className="text-3xl font-semibold text-foreground">Core Components of the Assessment</h2>
            <p className="text-md text-muted-foreground max-w-xl mx-auto mt-2">
              Our assessment uses a multi-faceted approach to understand your energy:
            </p>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center">
                  <FileQuestion className="h-7 w-7 mr-3 text-accent" />
                  Intuitive Questionnaires
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Reflective surveys based on yogic and Ayurvedic wisdom explore:
                </p>
                <ul className="space-y-3">
                  {questionnaireTopics.map(topic => (
                      <li key={topic.name} className="flex items-start">
                          <topic.icon className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                          <div>
                              <h4 className="font-semibold text-foreground">{topic.name}</h4>
                              <p className="text-xs text-muted-foreground">{topic.details}</p>
                          </div>
                      </li>
                  ))}
                </ul>
                <Alert variant="default" className="mt-6 bg-muted/50">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <AlertTitle>Coming Soon</AlertTitle>
                  <AlertDescription>
                    Interactive questionnaires will be available in a future update.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center">
                  <SmartphoneNfc className="h-7 w-7 mr-3 text-accent" />
                  Sensor Integration (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Enhance accuracy by (optionally) integrating data from compatible wearable health devices. This can include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Heart Rate Variability (HRV)</li>
                  <li>Breathing Rate & Patterns</li>
                  <li>Stress Level Indicators</li>
                  <li>Sleep Quality Metrics</li>
                </ul>
                <Alert variant="default" className="mt-6 bg-muted/50">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <AlertTitle>Future Feature</AlertTitle>
                  <AlertDescription>
                    Wearable device integration is planned for a future release.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center">
                  <BarChartHorizontalBig className="h-7 w-7 mr-3 text-accent" />
                  Energy Flow Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Based on your responses and (optional) sensor data, the app will provide a visual or textual energy map, indicating:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Activity levels of different chakras.</li>
                  <li>Potential blockages in nadis (energy channels).</li>
                  <li>Areas of pranic depletion or excess.</li>
                  <li>Overall energy balance.</li>
                </ul>
                <Alert variant="default" className="mt-6 bg-muted/50">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <AlertTitle>Coming Soon</AlertTitle>
                  <AlertDescription>
                    Personalized energy maps and detailed insights will be part of an upcoming update.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </section>

        <Card className="shadow-xl bg-primary/5 text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center justify-center">
              <ShieldCheck className="h-7 w-7 mr-3 text-accent" />
              Ready to Assess Your Energy Flow?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl mx-auto">
              This comprehensive Energy Flow Assessment feature is currently under development. Stay tuned for its release to gain deeper insights into your Pranamaya Kosha and learn how to cultivate vibrant energy!
            </p>
            <Button variant="outline" size="lg" disabled>
              Start Assessment (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
