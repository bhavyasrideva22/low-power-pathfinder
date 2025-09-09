import { useState, useCallback } from 'react';
import { AssessmentResponse, AssessmentResult } from '@/types/assessment';
import { correctAnswers } from '@/data/assessmentData';

export const useAssessment = () => {
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const addResponse = useCallback((questionId: string, value: number) => {
    setResponses(prev => {
      const existing = prev.find(r => r.questionId === questionId);
      if (existing) {
        return prev.map(r => r.questionId === questionId ? { ...r, value } : r);
      }
      return [...prev, { questionId, value }];
    });
  }, []);

  const calculateResults = useCallback((): AssessmentResult => {
    // Calculate psychometric score (average of likert responses in psychometric category)
    const psychometricResponses = responses.filter(r => r.questionId.startsWith('p'));
    const psychometricScore = psychometricResponses.length > 0 
      ? (psychometricResponses.reduce((sum, r) => sum + r.value, 0) / psychometricResponses.length) * 20
      : 0;

    // Calculate technical score (percentage correct)
    const technicalResponses = responses.filter(r => r.questionId.startsWith('t'));
    let correctCount = 0;
    technicalResponses.forEach(response => {
      if (correctAnswers[response.questionId] === response.value) {
        correctCount++;
      }
    });
    const technicalScore = technicalResponses.length > 0 
      ? (correctCount / technicalResponses.length) * 100
      : 0;

    // Calculate WISCAR scores
    const wiscarResponses = responses.filter(r => r.questionId.startsWith('w'));
    const wiscarScores = {
      will: (responses.find(r => r.questionId === 'w1')?.value || 0) * 20,
      interest: (responses.find(r => r.questionId === 'w2')?.value || 0) * 20,
      skill: (responses.find(r => r.questionId === 'w3')?.value || 0) * 20,
      cognitive: (responses.find(r => r.questionId === 'w4')?.value || 0) * 20,
      ability: (responses.find(r => r.questionId === 'w5')?.value || 0) * 20,
      realWorld: (responses.find(r => r.questionId === 'w6')?.value || 0) * 20
    };

    // Calculate overall score
    const overallScore = (psychometricScore * 0.3) + (technicalScore * 0.4) + 
      (Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6 * 0.3);

    // Determine recommendation
    let recommendation: 'yes' | 'maybe' | 'no' = 'no';
    if (overallScore >= 80) recommendation = 'yes';
    else if (overallScore >= 60) recommendation = 'maybe';

    // Generate insights
    const insights: string[] = [];
    if (psychometricScore >= 80) {
      insights.push('Your personality traits align well with low-power network engineering.');
    }
    if (technicalScore >= 70) {
      insights.push('You demonstrate strong technical aptitude for this field.');
    }
    if (wiscarScores.interest >= 80) {
      insights.push('Your genuine interest in IoT technology will drive your success.');
    }

    // Generate next steps
    const nextSteps: string[] = [];
    if (recommendation === 'yes') {
      nextSteps.push('Enroll in a LoRaWAN fundamentals course');
      nextSteps.push('Start building IoT projects with Arduino or ESP32');
      nextSteps.push('Join IoT and networking communities');
    } else if (recommendation === 'maybe') {
      nextSteps.push('Take an introductory IoT course to explore further');
      nextSteps.push('Build a simple sensor project to test your interest');
      nextSteps.push('Reassess after gaining hands-on experience');
    } else {
      nextSteps.push('Consider related roles like IoT Data Analyst');
      nextSteps.push('Explore foundational networking courses');
      nextSteps.push('Look into IoT product management roles');
    }

    return {
      psychometricScore,
      technicalScore,
      wiscarScores,
      overallScore,
      recommendation,
      insights,
      nextSteps
    };
  }, [responses]);

  const nextQuestion = useCallback(() => {
    // This will be implemented based on the current section and question logic
    setCurrentQuestion(prev => prev + 1);
  }, []);

  const nextSection = useCallback(() => {
    setCurrentSection(prev => prev + 1);
    setCurrentQuestion(0);
  }, []);

  const completeAssessment = useCallback(() => {
    setIsCompleted(true);
  }, []);

  return {
    responses,
    currentSection,
    currentQuestion,
    isCompleted,
    addResponse,
    nextQuestion,
    nextSection,
    completeAssessment,
    calculateResults
  };
};