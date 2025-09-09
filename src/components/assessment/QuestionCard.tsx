import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Question } from '@/types/assessment';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  sectionTitle: string;
  onAnswer: (value: number) => void;
  onNext: () => void;
  canProceed: boolean;
}

export const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  sectionTitle,
  onAnswer,
  onNext,
  canProceed
}: QuestionCardProps) => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  
  const progressPercentage = (questionNumber / totalQuestions) * 100;

  const handleAnswerChange = (value: string) => {
    setSelectedValue(value);
    onAnswer(parseInt(value));
  };

  const renderLikertScale = () => {
    const options = [
      { value: '1', label: 'Strongly Disagree' },
      { value: '2', label: 'Disagree' },
      { value: '3', label: 'Neutral' },
      { value: '4', label: 'Agree' },
      { value: '5', label: 'Strongly Agree' }
    ];

    return (
      <RadioGroup value={selectedValue} onValueChange={handleAnswerChange}>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {options.map((option) => (
            <div key={option.value} className="flex flex-col items-center space-y-2">
              <RadioGroupItem 
                value={option.value} 
                id={option.value}
                className="w-6 h-6"
              />
              <Label 
                htmlFor={option.value} 
                className="text-sm text-center cursor-pointer hover:text-primary transition-colors"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    );
  };

  const renderMultipleChoice = () => {
    if (!question.options) return null;

    return (
      <RadioGroup value={selectedValue} onValueChange={handleAnswerChange}>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3">
              <RadioGroupItem 
                value={index.toString()} 
                id={`option-${index}`}
                className="w-5 h-5"
              />
              <Label 
                htmlFor={`option-${index}`} 
                className="text-sm cursor-pointer hover:text-primary transition-colors flex-1 py-2"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-tech-blue">{sectionTitle}</h2>
            <span className="text-sm text-muted-foreground">
              {questionNumber} of {totalQuestions}
            </span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2 bg-muted"
          />
        </div>

        {/* Question Card */}
        <Card className="p-8 bg-card/80 backdrop-blur border-border/50">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium mb-6 leading-relaxed">
                {question.text}
              </h3>
              
              <div className="space-y-6">
                {question.type === 'likert' && renderLikertScale()}
                {question.type === 'multiple-choice' && renderMultipleChoice()}
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-border/50">
              <div className="text-sm text-muted-foreground">
                {question.type === 'likert' ? 'Rate your agreement with this statement' : 'Select the best answer'}
              </div>
              
              <Button 
                onClick={onNext}
                disabled={!canProceed}
                className="px-8 bg-gradient-to-r from-tech-blue to-tech-purple hover:from-tech-blue/90 hover:to-tech-purple/90 disabled:opacity-50"
              >
                {questionNumber === totalQuestions ? 'Complete Section' : 'Next Question'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Helper Text */}
        <p className="text-center text-sm text-muted-foreground">
          Answer honestly for the most accurate assessment results
        </p>
      </div>
    </div>
  );
};