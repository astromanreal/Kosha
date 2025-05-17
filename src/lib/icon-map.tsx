

import type { LucideIcon } from 'lucide-react';
import {
  PersonStanding,
  Percent,
  Flame,
  Droplets,
  NotebookText,
  BedDouble,
  Dumbbell,
  Ratio,
  Wind,
  Sparkles,
  Zap,
  BrainCircuit,
  Smile as SmileIcon,
  Webcam, 
  BookText,
  PenLine,
  Library,
  HeartHandshake,
  Gift,
  Timer as TimerIcon,
  VolumeX,
  Lightbulb,
  CalendarDays,
  ListChecks,
  PlayCircle,
  BarChart3,
  Goal,
  PlusCircle,
  RefreshCw,
  MoonStar,
  FileText,
  LineChart,
  Settings2,
  Trophy, 
  CheckCircle,
  Palette, 
  Mic, 
  Edit3,
  History, 
  BookOpenCheck,
  ThumbsUp, 
  Anchor,
  Waves,
  Sun,
  Moon, 
  Heart,
  Mic2,
  Eye,
  Crown,
  FileQuestion,
  ShieldAlert,
  HelpCircle, 
  Calculator,
  Scan, 
  Layers, 
  Leaf, // Added Leaf here
  Salad, 
  WandSparkles, 
  ScrollText, 
  Users, 
  Activity,
  GraduationCap,
  BarChart2, 
  BookOpen, 
  CalendarCheck, 
  Coffee, 
  Utensils, 
  CloudDrizzle, 
  Snowflake 
} from 'lucide-react';

// Define YogaIcon as an inline SVG component
const YogaIcon = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12c0-4.42 3.58-8 8-8s8 3.58 8 8c0 4.42-3.58 8-8 8"/>
    <path d="M12 12v8"/>
    <path d="M12 12a4 4 0 1 0-8 0 4 4 0 1 0 8 0z"/>
    <path d="M12 20a4 4 0 0 0 4-4h4"/>
    <path d="M12 4a4 4 0 0 0 4 4V4"/>
    <path d="M12 12a4 4 0 0 1 4-4"/>
  </svg>
);


export function getIconComponent(iconName: string): LucideIcon {
  switch (iconName) {
    case 'PersonStanding': return PersonStanding;
    case 'Percent': return Percent;
    case 'Flame': return Flame;
    case 'Droplets': return Droplets;
    case 'NotebookText': return NotebookText;
    case 'BedDouble': return BedDouble;
    case 'Dumbbell': return Dumbbell;
    case 'Ratio': return Ratio;
    case 'Wind': return Wind;
    case 'Sparkles': return Sparkles;
    case 'Zap': return Zap;
    case 'BrainCircuit': return BrainCircuit;
    case 'SmileIcon': return SmileIcon;
    case 'Webcam': return Webcam;
    case 'BookText': return BookText;
    case 'PenLine': return PenLine;
    case 'Library': return Library;
    case 'HeartHandshake': return HeartHandshake;
    case 'Gift': return Gift;
    case 'TimerIcon': return TimerIcon;
    case 'VolumeX': return VolumeX;
    case 'Lightbulb': return Lightbulb;
    case 'CalendarDays': return CalendarDays;
    case 'ListChecks': return ListChecks;
    case 'PlayCircle': return PlayCircle;
    case 'BarChart3': return BarChart3;
    case 'Goal': return Goal;
    case 'PlusCircle': return PlusCircle;
    case 'RefreshCw': return RefreshCw;
    case 'MoonStar': return MoonStar;
    case 'Moon': return Moon;
    case 'FileText': return FileText;
    case 'LineChart': return LineChart;
    case 'Settings2': return Settings2;
    case 'Trophy': return Trophy;
    case 'CheckCircle': return CheckCircle;
    case 'Palette': return Palette;
    case 'Mic': return Mic;
    case 'Edit3': return Edit3;
    case 'History': return History;
    case 'BookOpenCheck': return BookOpenCheck;
    case 'ThumbsUp': return ThumbsUp;
    case 'Anchor': return Anchor;
    case 'Waves': return Waves;
    case 'Sun': return Sun;
    case 'Sunrise': return Sunrise;
    case 'Heart': return Heart;
    case 'Mic2': return Mic2;
    case 'Eye': return Eye;
    case 'Crown': return Crown;
    case 'FileQuestion': return FileQuestion;
    case 'ShieldAlert': return ShieldAlert;
    case 'Calculator': return Calculator; 
    case 'Scan': return Scan;
    case 'Layers': return Layers;
    case 'Leaf': return Leaf;
    case 'Yoga': return YogaIcon as LucideIcon; 
    case 'Salad': return Salad;
    case 'WandSparkles': return WandSparkles; 
    case 'ScrollText': return ScrollText;
    case 'Users': return Users;
    case 'Activity': return Activity;
    case 'GraduationCap': return GraduationCap;
    case 'BarChart2': return BarChart2;
    case 'BookOpen': return BookOpen;
    case 'CalendarCheck': return CalendarCheck;
    case 'Coffee': return Coffee;
    case 'Utensils': return Utensils;
    case 'CloudDrizzle': return CloudDrizzle;
    case 'Snowflake': return Snowflake;
    default: return HelpCircle; 
  }
}

    
