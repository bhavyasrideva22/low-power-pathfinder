import { useState } from 'react';
import { AssessmentIntro } from './AssessmentIntro';
import { QuestionCard } from './QuestionCard';
import { ResultsPage } from './ResultsPage';
import { useAssessment } from '@/hooks/useAssessment';
import { assessmentSections } from '@/data/assessmentData';

export const AssessmentFlow = () => {
  const [currentView, setCurrentView] = useState<'intro' | 'assessment' | 'results'>('intro');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const {
    responses,
    addResponse,
    calculateResults
  } = useAssessment();

  const currentSection = assessmentSections[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  const totalQuestionsInSection = currentSection?.questions.length || 0;
  const currentQuestionNumber = currentQuestionIndex + 1;

  const handleStart = () => {
    setCurrentView('assessment');
  };

  const handleAnswer = (questionId: string, value: number) => {
    addResponse(questionId, value);
  };

  const handleNext = () => {
    // Check if this is the last question in the current section
    if (currentQuestionIndex === totalQuestionsInSection - 1) {
      // Check if this is the last section
      if (currentSectionIndex === assessmentSections.length - 1) {
        // Assessment complete, show results
        setCurrentView('results');
      } else {
        // Move to next section
        setCurrentSectionIndex(prev => prev + 1);
        setCurrentQuestionIndex(0);
      }
    } else {
      // Move to next question in current section
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentView('intro');
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
  };

  const isCurrentQuestionAnswered = () => {
    if (!currentQuestion) return false;
    return responses.some(r => r.questionId === currentQuestion.id);
  };

  if (currentView === 'intro') {
    return <AssessmentIntro onStart={handleStart} />;
  }

  if (currentView === 'results') {
    const results = calculateResults();
    return <ResultsPage results={results} onRestart={handleRestart} />;
  }

  if (currentView === 'assessment' && currentQuestion) {
    return (
      <QuestionCard
        question={currentQuestion}
        questionNumber={currentQuestionNumber}
        totalQuestions={totalQuestionsInSection}
        sectionTitle={currentSection.title}
        onAnswer={(value) => handleAnswer(currentQuestion.id, value)}
        onNext={handleNext}
        canProceed={isCurrentQuestionAnswered()}
      />
    );
  }

  return null;
};