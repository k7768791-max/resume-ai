import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/forever',
    description: 'For getting started',
    features: [
      { text: '1 Resume', included: true },
      { text: 'Basic Templates', included: true },
      { text: 'PDF Export', included: true },
      { text: 'ATS Analysis', included: false },
      { text: 'AI Optimization', included: false },
      { text: 'Job Matching', included: false },
      { text: 'LinkedIn Tools', included: false },
    ],
    cta: 'Get Started',
    ctaLink: '/auth/signup',
    variant: 'secondary' as const,
  },
  {
    name: 'Premium',
    price: '$9.99',
    period: '/mo',
    description: 'Most Popular',
    isPopular: true,
    features: [
      { text: 'Unlimited Resumes', included: true },
      { text: 'Premium Templates', included: true },
      { text: 'ATS Analysis', included: true },
      { text: 'AI Optimization', included: true },
      { text: 'Job Matching', included: true },
      { text: 'LinkedIn Tools', included: true },
    ],
    cta: 'Start Free Trial',
    ctaLink: '/auth/signup',
    variant: 'default' as const,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-muted-foreground md:text-lg mb-12">
            Simple, transparent pricing. Cancel anytime.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative flex flex-col ${plan.isPopular ? 'border-primary shadow-lg' : 'border-border/50'}`}>
              {plan.isPopular && (
                <div className="absolute -top-4 right-6 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div>
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                      <span className={!feature.included ? 'text-muted-foreground' : ''}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant={plan.variant}>
                  <Link href={plan.ctaLink}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
