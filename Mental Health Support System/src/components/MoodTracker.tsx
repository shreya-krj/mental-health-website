import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { Calendar } from "./ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Heart, Smile, Meh, Frown, Calendar as CalendarIcon, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function MoodTracker() {
  const [currentMood, setCurrentMood] = useState([7]);
  const [moodNote, setMoodNote] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const moodHistory = [
    { date: "Mon", mood: 6, note: "Stressed about upcoming exam" },
    { date: "Tue", mood: 8, note: "Great day, felt productive" },
    { date: "Wed", mood: 5, note: "Feeling overwhelmed" },
    { date: "Thu", mood: 7, note: "Better after talking to counselor" },
    { date: "Fri", mood: 8, note: "Excited for weekend" },
    { date: "Sat", mood: 9, note: "Relaxing day with friends" },
    { date: "Sun", mood: 7, note: "Preparing for new week" }
  ];

  const chartData = [
    { day: "1", mood: 6 },
    { day: "2", mood: 8 },
    { day: "3", mood: 5 },
    { day: "4", mood: 7 },
    { day: "5", mood: 8 },
    { day: "6", mood: 9 },
    { day: "7", mood: 7 },
    { day: "8", mood: 6 },
    { day: "9", mood: 8 },
    { day: "10", mood: 7 },
  ];

  const getMoodIcon = (mood: number) => {
    if (mood >= 8) return <Smile className="h-5 w-5 text-green-500" />;
    if (mood >= 6) return <Meh className="h-5 w-5 text-yellow-500" />;
    return <Frown className="h-5 w-5 text-red-500" />;
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 8) return "bg-green-500";
    if (mood >= 6) return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleMoodSubmit = () => {
    // In a real app, this would save to backend
    console.log("Mood submitted:", { mood: currentMood[0], note: moodNote, date });
    setMoodNote("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold text-slate-700 mb-2">Mood Tracker 💙</h1>
        <p className="text-lg text-slate-500">Track your daily mood and emotional well-being</p>
      </div>

      <Tabs defaultValue="today" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border-0 shadow-sm rounded-2xl p-2">
          <TabsTrigger 
            value="today" 
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-sm font-medium py-3"
          >
            Today's Mood
          </TabsTrigger>
          <TabsTrigger 
            value="history"
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-sm font-medium py-3"
          >
            Mood History
          </TabsTrigger>
          <TabsTrigger 
            value="insights"
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-sm font-medium py-3"
          >
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-8">
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-slate-700 text-xl">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-pink-600" />
                </div>
                How are you feeling today?
              </CardTitle>
              <CardDescription className="text-slate-500 text-base">Rate your overall mood on a scale of 1-10</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pb-8">
              <div className="space-y-6 p-6 rounded-2xl bg-gradient-to-r from-blue-50/50 to-purple-50/50 border border-blue-100">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-slate-700">Mood Level</span>
                  <Badge 
                    variant="secondary" 
                    className={`text-xl px-4 py-2 rounded-full font-semibold ${
                      currentMood[0] >= 8 ? 'bg-green-100 text-green-700 border-green-200' :
                      currentMood[0] >= 6 ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                      currentMood[0] >= 4 ? 'bg-orange-100 text-orange-700 border-orange-200' :
                      'bg-red-100 text-red-700 border-red-200'
                    }`}
                  >
                    {currentMood[0]}/10
                  </Badge>
                </div>
                <Slider
                  value={currentMood}
                  onValueChange={setCurrentMood}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full py-4"
                />
                <div className="flex justify-between font-medium text-slate-600">
                  <span>😔 Very Low</span>
                  <span>😐 Neutral</span>
                  <span>😊 Very High</span>
                </div>
              </div>

              <div className="space-y-4">
                <label htmlFor="mood-note" className="text-lg font-medium text-slate-700">
                  What's influencing your mood today? 💭
                </label>
                <Textarea
                  id="mood-note"
                  placeholder="Share any thoughts, feelings, or events that are affecting your mood... Remember, this is a safe space to express yourself 🌱"
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                  rows={4}
                  className="rounded-xl border-slate-200 bg-white/50 backdrop-blur-sm resize-none text-base"
                />
              </div>

              <Button 
                onClick={handleMoodSubmit} 
                className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium shadow-sm"
              >
                Save Mood Entry ✨
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Entries</CardTitle>
                <CardDescription>Your mood entries from the past week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {moodHistory.map((entry, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    {getMoodIcon(entry.mood)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{entry.date}</span>
                        <Badge variant="secondary">{entry.mood}/10</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{entry.note}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Calendar View
                </CardTitle>
                <CardDescription>Select a date to view mood entries</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Mood Trends
              </CardTitle>
              <CardDescription>Your mood patterns over the past 10 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[1, 10]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Average Mood</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7.1/10</div>
                <p className="text-sm text-muted-foreground">This week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Best Day</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Saturday</div>
                <p className="text-sm text-muted-foreground">9/10 mood rating</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+0.8</div>
                <p className="text-sm text-muted-foreground">vs last week</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}