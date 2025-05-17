'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { FormLabel } from '@/components/ui/form'; // Replaced with standard label
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackQuizCompletion } from '@/lib/activity-tracker';

interface QuizQuestion {
  topic: string;
  question: string;
  options: string[];
  answer: string;
}

interface KoshaQuizProps {
  quizData: QuizQuestion[];
}

const POINTS_PER_CORRECT_ANSWER = 10;

export default function KoshaQuiz({ quizData }: KoshaQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const { toast } = useToast();

  const currentQuestion = quizData[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(answer);
  };

  const checkAnswer = () => {
    if (!selectedAnswer) {
        toast({
            title: "No Answer Selected",
            description: "Please select an answer before checking.",
            variant: "destructive"
        });
        return;
    }
    const correct = selectedAnswer === currentQuestion.answer;
    setIsCorrect(correct);
    if (correct) {
      setScore((prevScore) => prevScore + POINTS_PER_CORRECT_ANSWER);
    }
    setIsAnswerChecked(true);
  };

  const handleNextQuestion = () => {
    if (!isAnswerChecked) {
        toast({
            title: "Check Your Answer",
            description: "Please check your current answer before proceeding.",
            variant: "destructive"
        });
        return;
    }

    setIsAnswerChecked(false);
    setIsCorrect(null);
    setSelectedAnswer(null);

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowResults(true);
      trackQuizCompletion("KoshaExplorerMainQuiz", score, quizData.length * POINTS_PER_CORRECT_ANSWER);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
    setIsAnswerChecked(false);
    setIsCorrect(null);
    toast({
        title: "Quiz Restarted",
        description: "Good luck on your new attempt!",
    });
  };

  if (showResults) {
    return (
      <Card className="text-center p-6 border-primary shadow-lg">
        <CardHeader>
          <Award className="h-16 w-16 text-accent mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-primary">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xl text-foreground">
            Your final score is: <span className="font-bold text-accent">{score}</span> out of {quizData.length * POINTS_PER_CORRECT_ANSWER}
          </p>
          <p className="text-muted-foreground">
            You answered {score / POINTS_PER_CORRECT_ANSWER} out of {quizData.length} questions correctly.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleRestartQuiz} className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" /> Restart Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const progressValue = ((currentQuestionIndex + 1) / quizData.length) * 100;

  return (
    <div className="space-y-6">
      <Progress value={progressValue} className="w-full h-2" />
      <p className="text-sm text-muted-foreground text-center">
        Question {currentQuestionIndex + 1} of {quizData.length} (Topic: {currentQuestion.topic})
      </p>
      
      <Card className="shadow-md border-border">
        <CardHeader>
          <CardTitle className="text-xl text-foreground">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswer || ''}
            onValueChange={handleAnswerSelect}
            className="space-y-2"
            disabled={isAnswerChecked}
          >
            {currentQuestion.options.map((option, index) => (
              <label // Replaced FormLabel with standard label
                key={index}
                htmlFor={`option-${index}`}
                className={`flex items-center space-x-3 p-3 rounded-md border cursor-pointer transition-all 
                  ${isAnswerChecked && option === currentQuestion.answer ? 'border-green-500 bg-green-500/10 ring-2 ring-green-500' : ''}
                  ${isAnswerChecked && option === selectedAnswer && option !== currentQuestion.answer ? 'border-red-500 bg-red-500/10 ring-2 ring-red-500' : ''}
                  ${!isAnswerChecked && selectedAnswer === option ? 'border-primary bg-primary/10' : 'border-input hover:bg-muted/50'}
                  ${isAnswerChecked ? 'cursor-not-allowed opacity-70' : ''}
                `}
              >
                <RadioGroupItem value={option} id={`option-${index}`} disabled={isAnswerChecked} />
                <span className="text-sm text-foreground">{option}</span>
                {isAnswerChecked && option === currentQuestion.answer && <CheckCircle className="ml-auto h-5 w-5 text-green-500" />}
                {isAnswerChecked && option === selectedAnswer && option !== currentQuestion.answer && <XCircle className="ml-auto h-5 w-5 text-red-500" />}
              </label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {isAnswerChecked && isCorrect !== null && (
        <div className={`p-3 rounded-md text-sm font-medium text-center ${isCorrect ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700'}`}>
          {isCorrect ? 'Correct!' : `Incorrect. The correct answer is: ${currentQuestion.answer}`}
        </div>
      )}

      <div className="flex justify-end space-x-3">
        {!isAnswerChecked ? (
            <Button onClick={checkAnswer} variant="outline" disabled={!selectedAnswer}>
                Check Answer
            </Button>
        ) : (
            <Button onClick={handleNextQuestion}>
            {currentQuestionIndex < quizData.length - 1 ? 'Next Question' : 'Show Results'}
            <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        )}
      </div>
    </div>
  );
}
