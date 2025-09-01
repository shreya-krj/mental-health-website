import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { CheckCircle, AlertTriangle, Info, Brain, Heart, Clock } from "lucide-react";

export function SelfAssessment() {
  const [currentAssessment, setCurrentAssessment] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [results, setResults] = useState<any>(null);

  const assessments = [
    {
      id: "depression",
      title: "Depression Screening (PHQ-9)",
      description: "A quick assessment to help identify symptoms of depression.",
      duration: "5-7 minutes",
      questions: 9,
      type: "Clinical Screening"
    },
    {
      id: "anxiety",
      title: "Anxiety Assessment (GAD-7)",
      description: "Evaluate anxiety levels and related symptoms.",
      duration: "3-5 minutes",
      questions: 7,
      type: "Clinical Screening"
    },
    {
      id: "stress",
      title: "Stress Level Assessment",
      description: "Measure your current stress levels and coping abilities.",
      duration: "8-10 minutes",
      questions: 12,
      type: "Wellness Check"
    },
    {
      id: "wellness",
      title: "Overall Wellness Check",
      description: "Comprehensive assessment of your mental and emotional well-being.",
      duration: "10-12 minutes",
      questions: 15,
      type: "Wellness Check"
    }
  ];

  const depressionQuestions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself or that you are a failure",
    "Trouble concentrating on things",
    "Moving or speaking slowly, or being fidgety or restless",
    "Thoughts that you would be better off dead"
  ];

  const anxietyQuestions = [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid as if something awful might happen"
  ];

  const responseOptions = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" }
  ];

  const getCurrentQuestions = () => {
    if (currentAssessment === "depression") return depressionQuestions;
    if (currentAssessment === "anxiety") return anxietyQuestions;
    return [];
  };

  const getCurrentAssessmentInfo = () => {
    return assessments.find(a => a.id === currentAssessment);
  };

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    const questions = getCurrentQuestions();
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const total = answers.reduce((sum, answer) => sum + answer, 0);
    let severity = "";
    let recommendations = [];

    if (currentAssessment === "depression") {
      if (total <= 4) {
        severity = "Minimal";
        recommendations = ["Continue self-care practices", "Maintain healthy routines"];
      } else if (total <= 9) {
        severity = "Mild";
        recommendations = ["Consider stress management techniques", "Monitor symptoms"];
      } else if (total <= 14) {
        severity = "Moderate";
        recommendations = ["Consider speaking with a counselor", "Implement coping strategies"];
      } else {
        severity = "Severe";
        recommendations = ["Seek professional help immediately", "Contact crisis support if needed"];
      }
    }

    setResults({ total, severity, recommendations });
    setCompleted(true);
  };

  const resetAssessment = () => {
    setCurrentAssessment(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setCompleted(false);
    setResults(null);
  };

  const startAssessment = (assessmentId: string) => {
    setCurrentAssessment(assessmentId);
    setCurrentQuestion(0);
    setAnswers([]);
    setCompleted(false);
    setResults(null);
  };

  if (completed && results) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Assessment Results</h1>
          <p className="text-muted-foreground">Your assessment has been completed</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              {getCurrentAssessmentInfo()?.title}
            </CardTitle>
            <CardDescription>
              Results based on your responses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold">{results.total}</div>
              <div className="text-lg">Total Score</div>
              <Badge 
                variant={results.severity === "Minimal" ? "secondary" : 
                        results.severity === "Mild" ? "default" :
                        results.severity === "Moderate" ? "default" : "destructive"}
                className="text-sm"
              >
                {results.severity} Level
              </Badge>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-semibold">Recommendations</h3>
              <ul className="space-y-2">
                {results.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">
                    Important Note
                  </p>
                  <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                    This assessment is not a diagnosis. If you're experiencing persistent symptoms 
                    or are in crisis, please contact a mental health professional or emergency services.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={resetAssessment} variant="outline" className="flex-1">
                Take Another Assessment
              </Button>
              <Button className="flex-1">
                Schedule Counseling
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentAssessment) {
    const questions = getCurrentQuestions();
    const assessmentInfo = getCurrentAssessmentInfo();
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{assessmentInfo?.title}</h1>
          <p className="text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</p>
        </div>

        <Card>
          <CardHeader>
            <div className="space-y-4">
              <Progress value={progress} className="h-2" />
              <div className="text-sm text-muted-foreground">
                {Math.round(progress)}% Complete
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Over the last 2 weeks, how often have you been bothered by the following problem?
              </h3>
              <p className="text-base">
                {questions[currentQuestion]}
              </p>
            </div>

            <RadioGroup 
              value={answers[currentQuestion]?.toString() || ""} 
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {responseOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                  <Label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button 
                onClick={handleNextQuestion}
                disabled={answers[currentQuestion] === undefined}
              >
                {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold text-slate-700 mb-2">Self-Assessment Tools 🧠</h1>
        <p className="text-lg text-slate-500">
          Take validated assessments to better understand your mental health
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-2">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-blue-800 dark:text-blue-200">
              Before You Begin
            </p>
            <p className="text-blue-700 dark:text-blue-300 mt-1">
              These assessments are screening tools and not substitutes for professional diagnosis. 
              All responses are confidential and can help you understand your mental health better.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {assessments.map((assessment) => (
          <Card key={assessment.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{assessment.type}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {assessment.duration}
                </div>
              </div>
              <CardTitle className="text-xl">{assessment.title}</CardTitle>
              <CardDescription>{assessment.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Questions: {assessment.questions}</span>
                  <span>Duration: {assessment.duration}</span>
                </div>
                <Button 
                  onClick={() => startAssessment(assessment.id)}
                  className="w-full"
                >
                  <Brain className="mr-2 h-4 w-4" />
                  Start Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}