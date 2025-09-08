'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, PlayCircle, Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';

const headlines = [
  'Create ATS-Optimized Resumes',
  'Build a Standout Career Profile',
  'Land Your Dream Job with AI',
];

export function Hero() {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = headlines[currentHeadline];
      if (isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
      }

      if (!isDeleting && displayedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
        setTypingSpeed(100);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setCurrentHeadline((prev) => (prev + 1) % headlines.length);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentHeadline, typingSpeed]);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 "></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-accent to-rose-400"></div>
      </div>
      <div className="relative container text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 h-20 md:h-24">
            <span className="text-primary">🎯 </span>
            {displayedText}
            <span className="animate-ping">|</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Build professional resumes that pass ATS screening and impress hiring managers. Our AI analyzes job descriptions and optimizes your resume for maximum impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/auth/signup">
                <Rocket className="mr-2 h-5 w-5" /> Start Building Free
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#">
                <PlayCircle className="mr-2 h-5 w-5" /> Watch Demo
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" /> 95% ATS Pass Rate
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" /> 10+ Professional Templates
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" /> AI-Powered Content
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
