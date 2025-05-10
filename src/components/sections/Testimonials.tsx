
import TestimonialSlider from "@/components/TestimonialSlider";

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  position: string;
  avatar: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="text-accent font-mono">05.</span> Отзывы
        </h2>
        <div className="max-w-4xl mx-auto">
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
