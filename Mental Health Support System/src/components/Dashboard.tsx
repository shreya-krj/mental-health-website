import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Heart, Brain, MessageSquare, Calendar, TrendingUp, AlertCircle, MessageCircle } from "lucide-react";

interface DashboardProps {
  onNavigate: (section: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const quickStats = [
    { label: "Days Checked In", value: "12", trend: "+3 this week" },
    { label: "Mood Average", value: "7.2", trend: "Improving" },
    { label: "Goals Completed", value: "8/10", trend: "80%" },
    { label: "Resources Used", value: "24", trend: "+5 this week" }
  ];

  const recentMoods = [
    { date: "Today", mood: 8, note: "Feeling optimistic about exams" },
    { date: "Yesterday", mood: 6, note: "Moderate stress from assignments" },
    { date: "2 days ago", mood: 7, note: "Good day overall" }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-slate-700 mb-2">Welcome back, Alex! 👋</h1>
          <p className="text-lg text-slate-500">How are you feeling today?</p>
        </div>
        <Button 
          onClick={() => onNavigate('mood-check')} 
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-2xl px-6 py-3 shadow-sm text-white font-medium"
        >
          <Heart className="mr-2 h-5 w-5" />
          Quick Mood Check
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 pt-6">
              <CardTitle className="text-sm font-medium text-slate-600">{stat.label}</CardTitle>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="text-3xl font-bold text-slate-700 mb-1">{stat.value}</div>
              <p className="text-sm text-green-600 font-medium">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Recent Mood Entries */}
        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-slate-700">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center">
                <Heart className="h-5 w-5 text-pink-600" />
              </div>
              Recent Mood Entries
            </CardTitle>
            <CardDescription className="text-slate-500">Your mood tracking over the past few days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentMoods.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50/50 border border-slate-100">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-700">{entry.date}</span>
                    <Badge 
                      variant="secondary" 
                      className={`${
                        entry.mood >= 8 ? 'bg-green-100 text-green-700 border-green-200' :
                        entry.mood >= 6 ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                        'bg-orange-100 text-orange-700 border-orange-200'
                      } rounded-full px-3`}
                    >
                      {entry.mood}/10
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mt-2">{entry.note}</p>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-medium" 
              onClick={() => onNavigate('mood-history')}
            >
              View Full History
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-slate-700">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <Brain className="h-5 w-5 text-blue-600" />
              </div>
              Quick Actions
            </CardTitle>
            <CardDescription className="text-slate-500">Get help and support when you need it</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 rounded-xl border-slate-200 text-slate-600 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:border-green-200 transition-all duration-200" 
              onClick={() => onNavigate('ai-chat')}
            >
              <MessageSquare className="mr-3 h-5 w-5" />
              Chat with AI Support
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 rounded-xl border-slate-200 text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-200 transition-all duration-200" 
              onClick={() => onNavigate('assessment')}
            >
              <Brain className="mr-3 h-5 w-5" />
              Take Wellness Assessment
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 rounded-xl border-slate-200 text-slate-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-200 transition-all duration-200"
              onClick={() => onNavigate('peer-support')}
            >
              <MessageCircle className="mr-3 h-5 w-5" />
              Connect with Peers
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 rounded-xl border-slate-200 text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 hover:border-blue-200 transition-all duration-200"
              onClick={() => onNavigate('booking')}
            >
              <Calendar className="mr-3 h-5 w-5" />
              Book Counseling Session
            </Button>
            <Button 
              className="w-full justify-start h-12 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium shadow-sm transition-all duration-200"
              onClick={() => onNavigate('crisis')}
            >
              <AlertCircle className="mr-3 h-5 w-5" />
              Crisis Support
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Daily Goals */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-slate-700">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
              <Heart className="h-5 w-5 text-green-600" />
            </div>
            Today's Wellness Goals
          </CardTitle>
          <CardDescription className="text-slate-500">Track your daily mental health activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-green-50 to-blue-50/50 border border-green-100">
              <span className="text-slate-700 font-medium">Morning mindfulness (10 min)</span>
              <Badge className="bg-green-100 text-green-700 border-green-200 rounded-full px-3">✓ Completed</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-green-50 to-blue-50/50 border border-green-100">
              <span className="text-slate-700 font-medium">Physical activity (30 min)</span>
              <Badge className="bg-green-100 text-green-700 border-green-200 rounded-full px-3">✓ Completed</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50/30 border border-slate-200">
              <span className="text-slate-600 font-medium">Journal reflection</span>
              <Badge variant="outline" className="border-orange-200 text-orange-600 bg-orange-50 rounded-full px-3">Pending</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50/30 border border-slate-200">
              <span className="text-slate-600 font-medium">Connect with friend/family</span>
              <Badge variant="outline" className="border-orange-200 text-orange-600 bg-orange-50 rounded-full px-3">Pending</Badge>
            </div>
          </div>
          <div className="space-y-3 p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-purple-50/50 border border-blue-100">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-slate-600">Progress</span>
              <span className="text-blue-600">2/4 completed</span>
            </div>
            <Progress value={50} className="h-3 bg-blue-100" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}