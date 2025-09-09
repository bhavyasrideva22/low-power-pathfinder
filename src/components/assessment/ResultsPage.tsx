import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AssessmentResult } from '@/types/assessment';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  BookOpen, 
  Target,
  Zap,
  Brain,
  Lightbulb
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ResultsPageProps {
  results: AssessmentResult;
  onRestart: () => void;
}

export const ResultsPage = ({ results, onRestart }: ResultsPageProps) => {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'yes':
        return <CheckCircle className="w-8 h-8 text-success-green" />;
      case 'maybe':
        return <AlertCircle className="w-8 h-8 text-warning-orange" />;
      case 'no':
        return <XCircle className="w-8 h-8 text-destructive" />;
    }
  };

  const getRecommendationText = () => {
    switch (results.recommendation) {
      case 'yes':
        return 'Highly Recommended';
      case 'maybe':
        return 'Worth Exploring';
      case 'no':
        return 'Consider Alternatives';
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'yes':
        return 'text-success-green';
      case 'maybe':
        return 'text-warning-orange';
      case 'no':
        return 'text-destructive';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success-green';
    if (score >= 60) return 'text-warning-orange';
    return 'text-destructive';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-success-green';
    if (score >= 60) return 'bg-warning-orange';
    return 'bg-destructive';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4">
      <div className="max-w-6xl mx-auto space-y-8 py-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            {getRecommendationIcon()}
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
            Assessment Complete
          </h1>
          <div className="space-y-2">
            <h2 className={`text-2xl font-semibold ${getRecommendationColor()}`}>
              {getRecommendationText()}
            </h2>
            <p className="text-lg text-muted-foreground">
              Low-Power Network Engineering Career Fit
            </p>
          </div>
        </div>

        {/* Overall Score */}
        <Card className="p-8 bg-gradient-to-r from-card/50 to-muted/50 backdrop-blur border-border/50">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
              <Target className="w-6 h-6 text-tech-blue" />
              Overall Confidence Score
            </h3>
            <div className="space-y-2">
              <div className={`text-5xl font-bold ${getScoreColor(results.overallScore)}`}>
                {Math.round(results.overallScore)}%
              </div>
              <Progress 
                value={results.overallScore} 
                className="h-4 bg-muted"
              />
            </div>
          </div>
        </Card>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-card/80 backdrop-blur border-border/50">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-tech-blue" />
                <h3 className="text-lg font-semibold">Personality Fit</h3>
              </div>
              <div className="space-y-2">
                <div className={`text-2xl font-bold ${getScoreColor(results.psychometricScore)}`}>
                  {Math.round(results.psychometricScore)}%
                </div>
                <Progress 
                  value={results.psychometricScore} 
                  className="h-3"
                />
                <p className="text-sm text-muted-foreground">
                  Psychological compatibility with the role
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur border-border/50">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-tech-purple" />
                <h3 className="text-lg font-semibold">Technical Readiness</h3>
              </div>
              <div className="space-y-2">
                <div className={`text-2xl font-bold ${getScoreColor(results.technicalScore)}`}>
                  {Math.round(results.technicalScore)}%
                </div>
                <Progress 
                  value={results.technicalScore} 
                  className="h-3"
                />
                <p className="text-sm text-muted-foreground">
                  Current technical knowledge and aptitude
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur border-border/50">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-success-green" />
                <h3 className="text-lg font-semibold">WISCAR Average</h3>
              </div>
              <div className="space-y-2">
                <div className={`text-2xl font-bold ${getScoreColor(Object.values(results.wiscarScores).reduce((a, b) => a + b, 0) / 6)}`}>
                  {Math.round(Object.values(results.wiscarScores).reduce((a, b) => a + b, 0) / 6)}%
                </div>
                <Progress 
                  value={Object.values(results.wiscarScores).reduce((a, b) => a + b, 0) / 6} 
                  className="h-3"
                />
                <p className="text-sm text-muted-foreground">
                  Comprehensive readiness assessment
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* WISCAR Breakdown */}
        <Card className="p-8 bg-card/80 backdrop-blur border-border/50">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-tech-blue" />
            WISCAR Framework Breakdown
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(results.wiscarScores).map(([key, score]) => (
              <div key={key} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">
                    {key === 'realWorld' ? 'Real World' : key}
                  </span>
                  <Badge variant="outline" className={getScoreColor(score)}>
                    {Math.round(score)}%
                  </Badge>
                </div>
                <Progress value={score} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Insights */}
        {results.insights.length > 0 && (
          <Card className="p-8 bg-card/80 backdrop-blur border-border/50">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-warning-orange" />
              Key Insights
            </h3>
            <div className="space-y-3">
              {results.insights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success-green mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{insight}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Next Steps */}
        <Card className="p-8 bg-card/80 backdrop-blur border-border/50">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-tech-purple" />
            Recommended Next Steps
          </h3>
          <div className="space-y-4">
            {results.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <div className="w-6 h-6 rounded-full bg-tech-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-semibold text-tech-blue">{index + 1}</span>
                </div>
                <p className="text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button 
            onClick={onRestart}
            variant="outline"
            size="lg"
            className="px-8"
          >
            Retake Assessment
          </Button>
          <Button 
            size="lg"
            className="px-8 bg-gradient-to-r from-tech-blue to-tech-purple hover:from-tech-blue/90 hover:to-tech-purple/90"
          >
            Explore Learning Paths
          </Button>
        </div>
      </div>
    </div>
  );
};