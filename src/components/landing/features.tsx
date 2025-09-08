import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, FileText, Goal, Linkedin, Sparkles, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    title: 'ATS Analyzer',
    description: 'Get instant ATS compatibility scores and detailed feedback to ensure your resume passes automated screening systems.',
  },
  {
    icon: <Sparkles className="h-8 w-8 text-accent" />,
    title: 'AI Optimizer',
    description: 'Our AI enhances your resume content, improves formatting, and suggests powerful action verbs for maximum impact.',
  },
  {
    icon: <Goal className="h-8 w-8 text-primary" />,
    title: 'Job Matching',
    description: 'Match your tailored resume to specific job descriptions and identify any missing keywords or qualifications.',
  },
  {
    icon: <FileText className="h-8 w-8 text-accent" />,
    title: 'Professional Templates',
    description: 'Choose from a gallery of professionally designed, ATS-friendly templates that are proven to get results.',
  },
  {
    icon: <Linkedin className="h-8 w-8 text-primary" />,
    title: 'LinkedIn Tools',
    description: 'Generate compelling LinkedIn headlines and summaries directly from your resume to build a consistent professional brand.',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-accent" />,
    title: 'Success Tracking',
    description: 'Track your application success rates, interview callbacks, and job offers to see the real-world impact of your optimized resumes.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Why Choose ResumeAI?</h2>
          <p className="text-muted-foreground md:text-lg mb-12">
            We provide a comprehensive suite of tools designed to navigate the complexities of modern job applications and help you succeed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-background border-border/50 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                {feature.icon}
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
