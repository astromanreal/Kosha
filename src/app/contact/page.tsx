import type { Metadata } from 'next';
import { Mail, Phone, Twitter, Instagram, Github, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'Contact Kosha Explorer | Get In Touch',
  description: 'Reach out to the Kosha Explorer team. Contact us via email, phone, or connect on social media (Twitter, Instagram, GitHub). We welcome your questions and feedback.',
  keywords: ['Contact Us', 'Kosha Explorer Contact', 'Customer Support', 'Feedback', 'Holistic Health Support'],
  openGraph: {
    title: 'Contact Kosha Explorer | Get In Touch',
    description: 'Have questions or feedback? Reach out to the Kosha Explorer team via email, phone, or social media.',
    url: `${siteBaseUrl}/contact`,
    type: 'website',
    images: [
      {
        url: `https://picsum.photos/seed/contact-kosha-og/1200/630`,
        width: 1200,
        height: 630,
        alt: 'Contact Kosha Explorer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Kosha Explorer | Get In Touch',
    description: 'Connect with the Kosha Explorer team. We welcome your questions, feedback, and inquiries.',
    images: [`https://picsum.photos/seed/contact-kosha-twitter/1200/630`],
  },
};

const socialLinks = [
  {
    name: 'Twitter / X',
    href: 'https://twitter.com/Sathyamsarthak',
    handle: '@Sathyamsarthak',
    icon: Twitter,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/srishikharji',
    handle: '@srishikharji',
    icon: Instagram,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/astromanreal',
    handle: 'astromanreal',
    icon: Github,
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <Mail className="h-20 w-20 text-primary mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Get in Touch with Kosha Explorer</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          We&apos;d love to hear from you. Whether you have a question about the Pancha Koshas, Ayurveda, our tools, feedback, or just want to connect, feel free to reach out through any of the channels below.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center">
              <Phone className="h-6 w-6 mr-3 text-accent" />
              Direct Contact Information
            </CardTitle>
            <CardDescription>
              For direct inquiries, please use the email or phone details below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
              <div>
                <h2 className="font-semibold text-foreground">Email Us</h2>
                <a href="mailto:astroman6569@gmail.com" className="text-accent hover:underline break-all">
                  astroman6569@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
              <div>
                <h2 className="font-semibold text-foreground">Call Us</h2>
                <a href="tel:+918102116569" className="text-accent hover:underline">
                  +91 8102116569
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3 text-accent"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Connect with Us Online
            </CardTitle>
            <CardDescription>
              Follow Kosha Explorer and engage with our community on social media platforms.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {socialLinks.map((link) => (
              <Button
                key={link.name}
                variant="outline"
                className="w-full justify-start text-left group border-input hover:border-accent hover:bg-accent/10"
                asChild
              >
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <link.icon className="h-5 w-5 mr-3 text-muted-foreground group-hover:text-accent transition-colors" />
                  <div className="flex-grow">
                    <span className="font-medium text-foreground group-hover:text-accent transition-colors">{link.name}</span>
                    <p className="text-sm text-muted-foreground">{link.handle}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </a>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

       <section className="text-center mt-12">
         <p className="text-muted-foreground">
           We aim to respond to all inquiries within 24-48 business hours. Your feedback on Kosha Explorer is valuable to us!
         </p>
         <Button asChild size="lg" className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/">Back to Home</Link>
          </Button>
       </section>
    </div>
  );
}
