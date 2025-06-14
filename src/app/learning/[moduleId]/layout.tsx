
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getLearningModuleBySlug } from '../learningModulesData';

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export async function generateMetadata({ params }: { params: { moduleId: string } }): Promise<Metadata> {
  const module = getLearningModuleBySlug(params.moduleId);

  if (!module) {
    return {
      title: 'Learning Module Not Found | Kosha Explorer',
      description: 'The learning module you are looking for could not be found.',
      robots: { index: false, follow: false }
    };
  }

  const pageTitle = `${module.title} | ${module.category} Course | Kosha Explorer`;
  const pageDescription = module.longDescription || `Explore the ${module.title} learning module on Kosha Explorer. A ${module.difficulty} course covering ${module.category}. Estimated duration: ${module.durationEstimate}.`;
  const pageKeywords = [
    module.title, 
    module.category, 
    module.difficulty, 
    "Online Course", 
    "Learning Module", 
    "Kosha Explorer Education",
    ...module.description.split(" ").slice(0,5)
  ].slice(0,15);

  const imageUrl = module.coverImage.startsWith('http') ? module.coverImage : `https://placehold.co/1200x630.png?text=${encodeURIComponent(module.title)}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteBaseUrl}/learning/${module.slug}`,
      type: 'article', // Course is a type of article
      images: [
        {
          url: imageUrl,
          width: 1200, // Assuming placeholder or known dimensions
          height: 630,
          alt: `Cover image for the ${module.title} learning module on Kosha Explorer`,
        },
      ],
      article: { // More specific for Course or Article
        publishedTime: "2024-01-01T00:00:00.000Z", // Generic
        modifiedTime: new Date().toISOString(),
        authors: [`${siteBaseUrl}/about`],
        section: module.category,
        tags: pageKeywords,
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: `Start the ${module.title} learning module on Kosha Explorer: ${module.description.substring(0,100)}...`,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function LearningModuleDetailLayout({ 
  children,
  params 
}: { 
  children: ReactNode,
  params: { moduleId: string }
}) {
  const module = getLearningModuleBySlug(params.moduleId);
  
  const pageUrl = `${siteBaseUrl}/learning/${params.moduleId}`;
  const pageTitle = module ? `${module.title} | ${module.category} Course | Kosha Explorer` : 'Learning Module | Kosha Explorer';
  const pageDescription = module ? (module.longDescription || module.description) : 'Explore learning modules on Kosha Explorer.';
  const imageUrl = module ? (module.coverImage.startsWith('http') ? module.coverImage : `https://placehold.co/1200x630.png?text=${encodeURIComponent(module.title)}`) : `https://placehold.co/1200x630.png?text=Learning+Module`;

  const courseSchema = module ? {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": module.title,
    "description": module.longDescription || module.description,
    "provider": {
      "@type": "Organization",
      "name": "Kosha Explorer",
      "sameAs": siteBaseUrl
    },
    "timeRequired": module.durationEstimate, // Could be parsed to ISO 8601 duration if more precise
    "learningResourceType": "Course instance", // or "Learning module"
    "keywords": [module.title, module.category, module.difficulty].join(", "),
    "image": imageUrl,
    "url": pageUrl,
    "hasCourseInstance" : [{ // Example of how you might list course instances if applicable
        "@type":"CourseInstance",
        "courseMode":"online",
        "courseWorkload": module.durationEstimate,
        "instructor": {
            "@type": "Organization",
            "name": "Kosha Explorer"
        }
    }]
  } : null;

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
      "name": "Learning Modules",
      "item": `${siteBaseUrl}/learning`
    },{
      "@type": "ListItem",
      "position": 3,
      "name": module?.title || "Module",
      "item": pageUrl
    }]
  };

  return (
    <>
      {courseSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
