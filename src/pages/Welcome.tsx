
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/logo";

const welcomeSlides = [
  {
    title: "Welcome to anotherday",
    description: "Streamline your business operations with our powerful task management system.",
    image: "/placeholder.svg",
  },
  {
    title: "Manage Tasks Efficiently",
    description: "Create, assign, and track tasks across departments and shifts with ease.",
    image: "/placeholder.svg",
  },
  {
    title: "Role-Based Access Control",
    description: "Customize access and permissions for different team members based on their roles.",
    image: "/placeholder.svg",
  },
  {
    title: "Stay Organized",
    description: "Keep track of opening and closing tasks for each shift with customizable checklists.",
    image: "/placeholder.svg",
  }
];

const Welcome = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-anotherday-mint to-white">
      <div className="flex justify-center p-6 pt-10">
        <Logo className="w-64" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <Carousel
          className="w-full max-w-md"
          setApi={(api) => {
            api?.on("select", () => {
              setCurrentSlide(api.selectedScrollSnap());
            });
          }}
        >
          <CarouselContent>
            {welcomeSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      <img 
                        src={slide.image} 
                        alt={slide.title} 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <h2 className="text-xl font-bold text-center mb-2">{slide.title}</h2>
                    <p className="text-gray-600 text-center">{slide.description}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4 mb-4">
            <div className="flex gap-2">
              {welcomeSlides.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentSlide === index ? "bg-anotherday-mint" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <CarouselPrevious className="relative -left-0 translate-y-0" />
            <CarouselNext className="relative -right-0 translate-y-0" />
          </div>
        </Carousel>

        <div className="w-full max-w-md mt-8 flex flex-col gap-3">
          <Button 
            className="w-full py-6 bg-anotherday-mint hover:bg-anotherday-mint/90 text-anotherday-dark"
            onClick={() => handleNavigate('/signup')}
          >
            Get Started
          </Button>
          <Button 
            variant="outline" 
            className="w-full py-6 text-anotherday-dark border-anotherday-dark hover:bg-anotherday-mint/10"
            onClick={() => handleNavigate('/login')}
          >
            I already have an account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
