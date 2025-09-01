import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { 
  Bot, 
  User, 
  Send, 
  Heart, 
  Brain, 
  AlertTriangle,
  Lightbulb,
  Shield,
  Clock,
  Sparkles
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestedActions?: string[];
  severity?: 'low' | 'medium' | 'high' | 'crisis';
}

const aiResponses = {
  greeting: "Hello! I'm here to provide support and guidance. How are you feeling today? 💙",
  stress: "I understand you're feeling stressed. Here are some immediate coping strategies: Take 5 deep breaths, try the 5-4-3-2-1 grounding technique (5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste), or step outside for fresh air.",
  anxiety: "Anxiety can feel overwhelming, but you're not alone. Try box breathing: breathe in for 4, hold for 4, out for 4, hold for 4. Focus on the present moment and remember that this feeling will pass.",
  depression: "I hear that you're struggling, and I want you to know that reaching out shows incredible strength. Would you like to talk to a counselor today? Your feelings are valid and support is available.",
  crisis: "⚠️ I'm concerned about your safety. Please reach out to someone immediately: Campus Crisis Line: (555) 123-HELP, National Suicide Prevention Lifeline: 988, or visit your nearest emergency room. You matter, and help is available.",
  sleep: "Sleep difficulties can affect your mental health significantly. Try establishing a bedtime routine, avoiding screens 1 hour before bed, and creating a cool, dark environment. Would you like guided sleep meditation resources?",
  academic: "Academic pressure is common among students. Break large tasks into smaller steps, use the Pomodoro technique (25 min work, 5 min break), and remember that seeking help from professors or tutors shows wisdom, not weakness.",
  relationships: "Relationship challenges can be emotionally taxing. Communication, setting healthy boundaries, and understanding that it's okay to prioritize your mental health are important. Would you like resources on healthy relationships?"
};

const copingStrategies = [
  "🧘‍♀️ 5-minute mindfulness meditation",
  "🌬️ Deep breathing exercises", 
  "🚶‍♂️ Take a brief walk outside",
  "📱 Call a trusted friend or family member",
  "📝 Write in a journal for 10 minutes",
  "🎵 Listen to calming music",
  "🛁 Take a warm shower or bath",
  "🫖 Make yourself a warm drink"
];

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: aiResponses.greeting,
      timestamp: new Date(),
      suggestedActions: ['I\'m feeling stressed', 'I\'m having trouble sleeping', 'I need crisis support']
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const analyzeMessage = (message: string): { response: string; severity: 'low' | 'medium' | 'high' | 'crisis'; suggestedActions?: string[] } => {
    const lowerMessage = message.toLowerCase();
    
    // Crisis detection
    if (lowerMessage.includes('suicide') || lowerMessage.includes('kill myself') || 
        lowerMessage.includes('end it all') || lowerMessage.includes('not worth living')) {
      return {
        response: aiResponses.crisis,
        severity: 'crisis',
        suggestedActions: ['Connect with Crisis Support', 'Call 988 Now', 'Find Campus Counselor']
      };
    }
    
    // High severity
    if (lowerMessage.includes('hopeless') || lowerMessage.includes('can\'t cope') || 
        lowerMessage.includes('overwhelming') || lowerMessage.includes('panic')) {
      return {
        response: aiResponses.depression,
        severity: 'high',
        suggestedActions: ['Book Counseling Session', 'Try Breathing Exercise', 'Contact Support Person']
      };
    }
    
    // Medium severity - specific issues
    if (lowerMessage.includes('stress') || lowerMessage.includes('pressure') || lowerMessage.includes('exam')) {
      return {
        response: aiResponses.stress,
        severity: 'medium',
        suggestedActions: ['Study Break Strategies', 'Academic Support Resources', 'Stress Management Tools']
      };
    }
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('worry') || lowerMessage.includes('nervous')) {
      return {
        response: aiResponses.anxiety,
        severity: 'medium',
        suggestedActions: ['Guided Breathing', 'Grounding Exercises', 'Anxiety Resources']
      };
    }
    
    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('insomnia')) {
      return {
        response: aiResponses.sleep,
        severity: 'medium',
        suggestedActions: ['Sleep Hygiene Tips', 'Relaxation Audio', 'Schedule Sleep Study']
      };
    }
    
    if (lowerMessage.includes('relationship') || lowerMessage.includes('friend') || lowerMessage.includes('family')) {
      return {
        response: aiResponses.relationships,
        severity: 'medium',
        suggestedActions: ['Communication Tips', 'Boundary Setting', 'Relationship Counseling']
      };
    }
    
    if (lowerMessage.includes('academic') || lowerMessage.includes('grades') || lowerMessage.includes('study')) {
      return {
        response: aiResponses.academic,
        severity: 'medium',
        suggestedActions: ['Study Strategies', 'Academic Advisor', 'Time Management']
      };
    }
    
    // Default supportive response
    return {
      response: "Thank you for sharing with me. It takes courage to reach out. Can you tell me more about what you're experiencing? I'm here to listen and provide support. 💙",
      severity: 'low',
      suggestedActions: ['Explore Coping Strategies', 'Browse Resources', 'Take Mood Assessment']
    };
  };

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || inputValue.trim();
    if (!content) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const aiAnalysis = analyzeMessage(content);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiAnalysis.response,
        timestamp: new Date(),
        suggestedActions: aiAnalysis.suggestedActions,
        severity: aiAnalysis.severity
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'crisis': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-semibold text-slate-700 mb-2">AI Support Chat 🤖</h1>
        <p className="text-lg text-slate-500">
          Get immediate guidance and coping strategies from our AI counselor
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl h-[600px] flex flex-col">
            <CardHeader className="pb-4 border-b border-slate-100">
              <CardTitle className="flex items-center gap-3 text-slate-700">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                AI Mental Health Assistant
                <Badge className="bg-green-100 text-green-700 border-green-200 rounded-full">
                  ● Online
                </Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'ai' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                      
                      <div className={`max-w-md ${message.type === 'user' ? 'order-2' : ''}`}>
                        <div
                          className={`p-4 rounded-2xl ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          <p className="leading-relaxed">{message.content}</p>
                        </div>
                        
                        {message.suggestedActions && (
                          <div className="mt-3 space-y-2">
                            <p className="text-sm text-slate-500">Suggested actions:</p>
                            <div className="flex flex-wrap gap-2">
                              {message.suggestedActions.map((action, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSendMessage(action)}
                                  className="text-xs rounded-full border-slate-200 hover:bg-slate-50"
                                >
                                  {action}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-slate-400">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                          {message.severity && message.type === 'ai' && (
                            <Badge className={`text-xs ${getSeverityColor(message.severity)}`}>
                              {message.severity}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {message.type === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-slate-100 text-slate-700 p-4 rounded-2xl">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>
              
              <div className="p-6 border-t border-slate-100">
                <div className="flex gap-3">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message here... I'm here to help 💙"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 rounded-xl border-slate-200"
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl px-6"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Resources */}
        <div className="space-y-6">
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-slate-700">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Quick Coping Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {copingStrategies.map((strategy, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left rounded-xl border-slate-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
                  onClick={() => handleSendMessage(`Tell me more about: ${strategy}`)}
                >
                  <span className="text-sm">{strategy}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-slate-700">
                <Shield className="h-5 w-5 text-green-500" />
                Crisis Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="destructive"
                className="w-full rounded-xl bg-gradient-to-r from-red-500 to-pink-500"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Crisis Chat
              </Button>
              <Button 
                variant="outline"
                className="w-full rounded-xl border-red-200 text-red-600 hover:bg-red-50"
              >
                📞 Call 988
              </Button>
              <Button 
                variant="outline"
                className="w-full rounded-xl border-slate-200 hover:bg-slate-50"
              >
                <Clock className="mr-2 h-4 w-4" />
                Campus Counseling
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Disclaimer */}
      <Card className="border-amber-200 bg-amber-50/50 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">AI Assistant Disclaimer</p>
              <p>
                This AI assistant provides general mental health information and coping strategies. 
                It is not a replacement for professional mental health care. If you're experiencing 
                a mental health crisis, please contact emergency services or a crisis hotline immediately.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}