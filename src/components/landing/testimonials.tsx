import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    title: 'Software Developer',
    image: 'https://picsum.photos/100/100',
    quote: 'ResumeAI helped me land 3 interviews in just 2 weeks! The ATS optimization really works and the templates are fantastic.',
    rating: 5,
  },
  {
    name: 'Michael Rodriguez',
    title: 'Product Manager',
    image: 'https://picsum.photos/101/101',
    quote: 'The job matching feature is a game-changer. It saved me hours of searching and helped me find roles I was actually a great fit for.',
    rating: 5,
  },
  {
    name: 'Emily Carter',
    title: 'UX Designer',
    image: 'https://picsum.photos/102/102',
    quote: 'As a creative, I loved the template options. I could build a professional, ATS-friendly resume without sacrificing design.',
    rating: 5,
  },
  {
    name: 'David Lee',
    title: 'Data Analyst',
    image: 'https://picsum.photos/103/103',
    quote: 'The detailed analysis from the ATS checker was incredibly insightful. I made a few small changes and my response rate skyrocketed.',
    rating: 5,
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
      />
    ))}
  </div>
);

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground md:text-lg mb-12">
            Thousands of professionals have transformed their job search with ResumeAI.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <div className="p-1">
                  <Card className="h-full bg-background border-border/50">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="rounded-full mb-4"
                        data-ai-hint="person headshot"
                      />
                      <p className="italic text-muted-foreground mb-4">"{testimonial.quote}"</p>
                      <div className="flex-grow"></div>
                      <StarRating rating={testimonial.rating} />
                      <h3 className="font-headline font-semibold mt-4">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
