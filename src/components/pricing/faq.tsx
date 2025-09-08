import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Can I cancel my subscription anytime?',
    answer:
      "Yes! You can cancel your Premium subscription at any time from your account settings. You'll retain access to Premium features until the end of your current billing period.",
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. All payments are processed securely through our payment partner, Stripe.',
  },
  {
    question: 'Is there a free trial for Premium features?',
    answer:
      'Yes! All new users get a 7-day free trial of all Premium features when they sign up. No credit card is required to start your trial.',
  },
  {
    question: 'How accurate is the ATS scoring?',
    answer:
      "Our ATS scoring algorithm is based on an analysis of over 100,000 resumes and direct feedback from over 500 hiring managers. While no system is perfect, our model is highly accurate in predicting how major ATS platforms will parse and rank your resume.",
  },
  {
    question: 'Can I export my resume in different formats?',
    answer:
      'Yes! Premium users can export their resumes in PDF, DOCX, and plain text formats. Our system ensures the formatting is preserved and optimized for each file type.',
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-card">
      <div className="container max-w-4xl">
        <div className="text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground md:text-lg mb-12">
            Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left text-lg hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
