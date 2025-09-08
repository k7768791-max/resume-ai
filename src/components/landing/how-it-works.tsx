import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bot, Download, FilePlus } from 'lucide-react';

const steps = [
  {
    step: 1,
    icon: <FilePlus className="h-10 w-10 text-primary" />,
    title: 'Create Resume',
    description: 'Choose a professional template and fill in your details with our easy-to-use editor.',
  },
  {
    step: 2,
    icon: <Bot className="h-10 w-10 text-accent" />,
    title: 'AI Optimization',
    description: 'Our AI analyzes your content, suggests improvements, and tailors it to your target job.',
  },
  {
    step: 3,
    icon: <Download className="h-10 w-10 text-primary" />,
    title: 'Export & Apply',
    description: 'Download your optimized resume as a PDF or DOCX and start applying with confidence.',
  },
];

export function HowItWorks() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">How It Works - 3 Simple Steps</h2>
          <p className="text-muted-foreground md:text-lg mb-16">
            From creation to application, our streamlined process makes resume building effortless and effective.
          </p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0">
            {steps.map((step, index) => (
              <div key={step.step} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-card border-2 border-primary mb-6">
                  {step.icon}
                </div>
                <h3 className="font-headline text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground max-w-xs">{step.description}</p>
                {index < steps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-1/2 left-full -translate-x-1/2 -translate-y-[60px] w-12 h-12 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-16">
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/auth/signup">Get Started Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
