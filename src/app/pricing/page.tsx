'use client';
import { useState } from 'react';
import { LandingHeader } from '@/components/layout/landing-header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, Users, Building } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FAQ } from '@/components/pricing/faq';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const monthlyPlans = [
  { name: 'Free', price: 0, cta: 'Get Started', ctaLink: '/auth/signup', variant: 'secondary' as const },
  { name: 'Premium', price: 9.99, cta: 'Start Free Trial', ctaLink: '/auth/signup', isPopular: true, variant: 'default' as const },
  { name: 'Enterprise', price: null, cta: 'Contact Sales', ctaLink: '#', variant: 'outline' as const },
];

const annualPlans = [
  { name: 'Free', price: 0, cta: 'Get Started', ctaLink: '/auth/signup', variant: 'secondary' as const },
  { name: 'Premium', price: 8.33, originalPrice: 99, cta: 'Start Free Trial', ctaLink: '/auth/signup', isPopular: true, variant: 'default' as const },
  { name: 'Enterprise', price: null, cta: 'Contact Sales', ctaLink: '#', variant: 'outline' as const },
];

const features = [
    { feature: 'Resume Templates', free: '3', premium: '20+', enterprise: '20+' },
    { feature: 'PDF/DOCX Export', free: true, premium: true, enterprise: true },
    { feature: 'ATS Score Analysis', free: 'Basic', premium: 'Advanced', enterprise: 'Advanced' },
    { feature: 'AI Content Optimization', free: false, premium: true, enterprise: true },
    { feature: 'Job Description Matching', free: false, premium: true, enterprise: true },
    { feature: 'LinkedIn Profile Tools', free: false, premium: true, enterprise: true },
    { feature: 'Resume Tailoring', free: false, premium: true, enterprise: true },
    { feature: 'Multiple Resume Versions', free: '1', premium: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'Priority Customer Support', free: false, premium: true, enterprise: true },
    { feature: 'Team Collaboration', free: false, premium: false, enterprise: true },
    { feature: 'Analytics Dashboard', free: false, premium: false, enterprise: true },
    { feature: 'API Access', free: false, premium: false, enterprise: true },
];

const FeatureCheck = ({ included }: { included: boolean | string }) => {
    if (typeof included === 'boolean') {
        return included ? <Check className="h-5 w-5 text-primary" /> : <X className="h-5 w-5 text-muted-foreground" />;
    }
    return <span className="text-foreground font-medium">{included}</span>;
};


export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const plans = isAnnual ? annualPlans : monthlyPlans;

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-grow">
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h1>
              <p className="text-muted-foreground md:text-lg mb-8">Unlock your career potential today. Simple, transparent pricing.</p>
              <div className="flex items-center justify-center space-x-2">
                <Label htmlFor="billing-cycle">Monthly</Label>
                <Switch id="billing-cycle" checked={isAnnual} onCheckedChange={setIsAnnual} />
                <Label htmlFor="billing-cycle">Annual (Save 20%)</Label>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <Card key={plan.name} className={cn(`relative flex flex-col`, plan.isPopular ? 'border-2 border-primary shadow-2xl shadow-primary/10' : 'border-border/50')}>
                   {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-sm font-bold px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
                    <div className="h-20">
                    {plan.price !== null ? (
                      <div>
                        <span className="text-5xl font-bold">${plan.price.toFixed(2)}</span>
                        <span className="text-muted-foreground">/{isAnnual ? 'year' : 'mo'}</span>
                        {isAnnual && plan.originalPrice && (
                             <p className="text-sm text-muted-foreground">Billed as ${plan.originalPrice}/year</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-2xl font-semibold mt-4">Custom Pricing</p>
                    )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-center text-muted-foreground mb-6 h-10">
                        {plan.name === "Free" && "Everything you need to get started."}
                        {plan.name === "Premium" && "For professionals who want to stand out."}
                        {plan.name === "Enterprise" && "For teams, universities, and career coaches."}
                    </p>
                    <ul className="space-y-4">
                        {features.slice(0, 6).map(f => (
                            <li key={f.feature} className="flex items-start gap-3">
                                <FeatureCheck included={f[plan.name.toLowerCase() as keyof typeof f]} />
                                <span>{f.feature}</span>
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

        <section className="py-20 md:py-28 bg-card">
            <div className="container max-w-6xl">
                <div className="text-center">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Feature Comparison</h2>
                    <p className="text-muted-foreground md:text-lg mb-12">Find the perfect plan with a detailed feature breakdown.</p>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[300px]">Feature</TableHead>
                        <TableHead className="text-center">Free</TableHead>
                        <TableHead className="text-center">Premium</TableHead>
                        <TableHead className="text-center">Enterprise</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {features.map((f) => (
                        <TableRow key={f.feature}>
                            <TableCell className="font-medium">{f.feature}</TableCell>
                            <TableCell className="text-center"><FeatureCheck included={f.free} /></TableCell>
                            <TableCell className="text-center"><FeatureCheck included={f.premium} /></TableCell>
                            <TableCell className="text-center"><FeatureCheck included={f.enterprise} /></TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
        
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
