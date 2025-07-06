
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/logo";
import { CheckCircle, Users, Clock, Calendar } from "lucide-react";

const welcomeSlides = [
  {
    title: "Welcome to anotherday",
    description: "Transform your business operations with our intelligent task management platform designed for modern teams.",
    icon: <CheckCircle className="w-24 h-24 text-anotherday-mint" />,
  },
  {
    title: "Streamline Team Tasks",
    description: "Create, assign, and track tasks across departments with real-time collaboration and progress monitoring.",
    icon: <Users className="w-24 h-24 text-anotherday-mint" />,
  },
  {
    title: "Smart Scheduling",
    description: "Organize shifts, manage schedules, and ensure seamless handoffs between opening and closing operations.",
    icon: <Clock className="w-24 h-24 text-anotherday-mint" />,
  },
  {
    title: "Stay Organized",
    description: "Keep your team aligned with customizable checklists, deadline reminders, and department-specific workflows.",
    icon: <Calendar className="w-24 h-24 text-anotherday-mint" />,
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
                    <div className="w-full h-48 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br from-anotherday-gray to-white">
                      {slide.icon}
                    </div>
                    <h2 className="text-xl font-bold text-center mb-2 text-anotherday-dark">{slide.title}</h2>
                    <p className="text-gray-600 text-center leading-relaxed">{slide.description}</p>
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
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
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
            className="w-full py-6 bg-anotherday-mint hover:bg-anotherday-mint/90 text-anotherday-dark font-medium"
            onClick={() => handleNavigate('/signup')}
          >
            Get Started with anotherday
          </Button>
          <Button 
            variant="outline" 
            className="w-full py-6 text-anotherday-dark border-anotherday-dark hover:bg-anotherday-mint/10 font-medium"
            onClick={() => handleNavigate('/login')}
          >
            Sign In to Your Account
          </Button>
        </div>
      </div>

      <div className="text-center pb-6 text-sm text-gray-500">
        <p>Trusted by teams worldwide to streamline operations</p>
      </div>
    </div>
  );
};

export default Welcome;
