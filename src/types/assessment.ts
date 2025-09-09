export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'technical';
  options?: string[];
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory: string;
}

export interface AssessmentResponse {
  questionId: string;
  value: number;
}

export interface AssessmentResult {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  insights: string[];
  nextSteps: string[];
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  duration: string;
}