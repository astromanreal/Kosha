
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { asanas, type AsanaInfo } from './asanasData';
import { ArrowRight, Filter, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getIconComponent } from '@/lib/icon-map';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const YogaIcon = getIconComponent('Yoga');

export default function YogaLibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [filteredAsanas, setFilteredAsanas] = useState<AsanaInfo[]>(asanas);

  const uniqueCategories = [...new Set(asanas.map(a => a.category))].sort();
  const uniqueDifficulties = [...new Set(asanas.map(a => a.difficulty))].sort();

  useEffect(() => {
    let tempAsanas = asanas;
    if (selectedCategory) {
      tempAsanas = tempAsanas.filter(a => a.category === selectedCategory);
    }
    if (selectedDifficulty) {
      tempAsanas = tempAsanas.filter(a => a.difficulty === selectedDifficulty);
    }
    setFilteredAsanas(tempAsanas);
  }, [selectedCategory, selectedDifficulty]);

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedDifficulty('');
  };

  const handleCategoryChange = (value: string) => {
    if (value === "all-categories") {
      setSelectedCategory('');
    } else {
      setSelectedCategory(value);
    }
  };

  const handleDifficultyChange = (value: string) => {
    if (value === "all-difficulties") {
      setSelectedDifficulty('');
    } else {
      setSelectedDifficulty(value);
    }
  };


  return (
    <div className="space-y-12">
      <section className="text-center">
        {YogaIcon && <YogaIcon className="h-20 w-20 text-primary mx-auto mb-6" />}
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Yoga Asana Library</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore a collection of yoga asanas (poses) with detailed instructions, benefits, and considerations for your practice. Deepen your understanding and enhance your journey on the mat.
        </p>
      </section>

      <Card className="shadow-lg border-border bg-card/50">
        <CardHeader>
          <CardTitle className="text-xl text-foreground flex items-center">
            <Filter className="mr-2 h-5 w-5 text-accent" /> Filter Asanas
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="w-full sm:w-auto flex-grow">
            <Label htmlFor="category-filter" className="text-sm font-medium">Category</Label>
            <Select value={selectedCategory || "all-categories"} onValueChange={handleCategoryChange}>
              <SelectTrigger id="category-filter" className="w-full mt-1">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">All Categories</SelectItem>
                {uniqueCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-auto flex-grow">
            <Label htmlFor="difficulty-filter" className="text-sm font-medium">Difficulty</Label>
            <Select value={selectedDifficulty || "all-difficulties"} onValueChange={handleDifficultyChange}>
              <SelectTrigger id="difficulty-filter" className="w-full mt-1">
                <SelectValue placeholder="All Difficulties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-difficulties">All Difficulties</SelectItem>
                {uniqueDifficulties.map(diff => <SelectItem key={diff} value={diff}>{diff}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={resetFilters} className="w-full sm:w-auto">
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-3xl font-semibold text-center mb-8 text-foreground">Discover Yoga Asanas</h2>
        {filteredAsanas.length === 0 ? (
          <p className="text-muted-foreground text-center py-8 text-lg">
            No asanas match your current filter criteria. Try adjusting your filters or view all asanas.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredAsanas.map((asana: AsanaInfo) => (
              <Link key={asana.id} href={`/yoga/${asana.slug}`} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl">
                <Card className="h-full flex flex-col overflow-hidden shadow-lg transform transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-2xl group-hover:-translate-y-1 bg-card hover:bg-muted/50 border border-border group-hover:border-primary/50">
                  <div className="relative w-full h-56">
                    <Image
                      src={asana.image}
                      alt={`${asana.englishName} (${asana.name}) - Yoga Pose`}
                      fill
                      className="object-cover"
                      data-ai-hint={asana.imageHint || asana.englishName.toLowerCase().replace(' pose', '')}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-xl font-semibold text-primary group-hover:text-primary/90 transition-colors leading-tight">
                      {asana.name} <span className="text-lg font-normal text-muted-foreground">({asana.englishName})</span>
                    </CardTitle>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        <Badge variant="secondary" className="text-xs">Category: {asana.category}</Badge>
                        <Badge variant="outline" className="text-xs">Difficulty: {asana.difficulty}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow px-4 pb-4">
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      Key benefits: {asana.benefits[0]}{asana.benefits.length > 1 ? `, ${asana.benefits[1].toLowerCase()}` : ''}...
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-2">
                    <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      View Details <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="text-center mt-16 pt-8 border-t border-border">
        <h2 className="text-3xl font-semibold text-foreground mb-4">More Asanas & Yoga Sequences Coming Soon!</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          We are continuously expanding our Asana Library to support your yoga journey. Stay tuned for more poses, guided sequences, and detailed insights into yoga philosophy.
        </p>
      </section>
    </div>
  );
}
