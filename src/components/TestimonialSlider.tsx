import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  id: number;
  text: string;
  author: string;
  position: string;
  avatar: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

const TestimonialSlider = ({ testimonials }: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left
        nextSlide();
      } else {
        // Swipe right
        prevSlide();
      }
    }
  };

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div
      className="relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      ref={sliderRef}
    >
      <div className="overflow-hidden relative rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="w-full flex-shrink-0 border border-border/50 bg-card/80 backdrop-blur-sm"
            >
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-16 w-16 sm:h-20 sm:w-20 mb-4 border-2 border-accent/30">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.author}
                    />
                    <AvatarFallback>
                      {getInitials(testimonial.author)}
                    </AvatarFallback>
                  </Avatar>

                  <blockquote className="mb-4 sm:mb-6 text-base sm:text-lg italic relative">
                    <span className="text-3xl sm:text-4xl text-accent/30 absolute -top-4 sm:-top-6 -left-2">
                      "
                    </span>
                    {testimonial.text}
                    <span className="text-3xl sm:text-4xl text-accent/30 absolute -bottom-8 sm:-bottom-10 -right-2">
                      "
                    </span>
                  </blockquote>

                  <footer>
                    <div className="font-bold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.position}
                    </div>
                  </footer>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 px-2 sm:px-4">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-primary"
          onClick={prevSlide}
        >
          <Icon name="ChevronLeft" className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-primary"
          onClick={nextSlide}
        >
          <Icon name="ChevronRight" className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-3 sm:mt-4 gap-1 sm:gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-accent sm:w-6"
                : "bg-muted hover:bg-muted-foreground"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
