import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Zap, Wifi, Clock, Target } from 'lucide-react';

interface AssessmentIntroProps {
  onStart: () => void;
}

export const AssessmentIntro = ({ onStart }: AssessmentIntroProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-gradient-to-r from-tech-blue to-tech-purple shadow-[var(--shadow-glow)]">
              <Zap className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
            Is Low-Power Network Engineering Right for Me?
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover if your personality, skills, and interests align with a career in 
            IoT communication protocols and energy-efficient networking.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 my-12">
          <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-300">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 rounded-full bg-tech-blue/20">
                <Target className="w-6 h-6 text-tech-blue" />
              </div>
              <h3 className="text-lg font-semibold">Personality Assessment</h3>
              <p className="text-sm text-muted-foreground text-center">
                Evaluate psychological compatibility and work style preferences
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-300">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 rounded-full bg-tech-purple/20">
                <Wifi className="w-6 h-6 text-tech-purple" />
              </div>
              <h3 className="text-lg font-semibold">Technical Aptitude</h3>
              <p className="text-sm text-muted-foreground text-center">
                Test knowledge of IoT protocols, programming, and networking
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-300">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 rounded-full bg-success-green/20">
                <Clock className="w-6 h-6 text-success-green" />
              </div>
              <h3 className="text-lg font-semibold">WISCAR Framework</h3>
              <p className="text-sm text-muted-foreground text-center">
                Comprehensive readiness evaluation across six key dimensions
              </p>
            </div>
          </Card>
        </div>

        {/* What You'll Learn */}
        <Card className="p-8 bg-gradient-to-r from-card/50 to-muted/50 backdrop-blur border-border/50">
          <h2 className="text-2xl font-bold mb-6">What Is Low-Power Network Engineering?</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="font-semibold mb-2 text-tech-blue">Core Focus</h3>
              <p className="text-sm text-muted-foreground">
                Specialization in IoT communication protocols (LoRaWAN, Zigbee, NB-IoT) 
                for energy-efficient devices like sensors, wearables, and smart infrastructure.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-tech-purple">Applications</h3>
              <p className="text-sm text-muted-foreground">
                Agriculture monitoring, smart cities, healthcare devices, asset tracking, 
                and environmental sensing networks.
              </p>
            </div>
          </div>
        </Card>

        {/* Assessment Details */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>25-30 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>3 comprehensive sections</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>Personalized results</span>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-8">
          <Button 
            onClick={onStart}
            size="lg"
            className="px-12 py-4 text-lg bg-gradient-to-r from-tech-blue to-tech-purple hover:from-tech-blue/90 hover:to-tech-purple/90 shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow)] transform hover:scale-105 transition-all duration-300"
          >
            Start Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};