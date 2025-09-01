import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  BookOpen, 
  Video, 
  Headphones, 
  Search, 
  Star, 
  Clock, 
  Users,
  Heart,
  Brain,
  Zap
} from "lucide-react";

export function ResourceLibrary() {
  const [searchTerm, setSearchTerm] = useState("");

  const articles = [
    {
      id: 1,
      title: "Managing Academic Stress: A Student's Guide",
      description: "Learn effective strategies to cope with exam anxiety and academic pressure.",
      category: "Stress Management",
      readTime: "8 min read",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1623863568368-69e4cbe6cc0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwd2VsbGJlaW5nfGVufDF8fHx8MTc1NjcyMjg5MHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 2,
      title: "Building Healthy Sleep Habits in College",
      description: "Discover how proper sleep can improve your mental health and academic performance.",
      category: "Sleep Health",
      readTime: "6 min read",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1679014844834-e86723f36c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjBtZWRpdGF0aW9uJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzU2NzIyODg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 3,
      title: "Understanding and Managing Social Anxiety",
      description: "Practical tips for overcoming social anxiety in university settings.",
      category: "Anxiety",
      readTime: "10 min read",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1623863568368-69e4cbe6cc0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwd2VsbGJlaW5nfGVufDF8fHx8MTc1NjcyMjg5MHww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const videos = [
    {
      id: 1,
      title: "5-Minute Mindfulness for Students",
      description: "Quick mindfulness exercises you can do between classes.",
      duration: "5:23",
      category: "Mindfulness",
      views: "12.5k views"
    },
    {
      id: 2,
      title: "Breathing Techniques for Exam Anxiety",
      description: "Learn calming breathing exercises to manage test anxiety.",
      duration: "8:15",
      category: "Anxiety Relief",
      views: "8.2k views"
    },
    {
      id: 3,
      title: "Progressive Muscle Relaxation",
      description: "A guided session to release physical tension and stress.",
      duration: "12:40",
      category: "Relaxation",
      views: "15.1k views"
    }
  ];

  const exercises = [
    {
      id: 1,
      title: "4-7-8 Breathing Exercise",
      description: "A simple breathing technique to reduce anxiety and promote calm.",
      duration: "3 minutes",
      difficulty: "Beginner",
      category: "Breathing"
    },
    {
      id: 2,
      title: "Gratitude Journaling",
      description: "Daily practice to shift focus toward positive experiences.",
      duration: "10 minutes",
      difficulty: "Beginner",
      category: "Mindfulness"
    },
    {
      id: 3,
      title: "Body Scan Meditation",
      description: "Increase body awareness and release physical tension.",
      duration: "15 minutes",
      difficulty: "Intermediate",
      category: "Meditation"
    }
  ];

  const quickTips = [
    {
      icon: <Brain className="h-5 w-5" />,
      title: "Take Study Breaks",
      description: "Take a 5-10 minute break every hour to prevent mental fatigue."
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Connect with Others",
      description: "Maintain social connections to support your emotional well-being."
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Stay Active",
      description: "Regular exercise can significantly improve mood and reduce stress."
    }
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold text-slate-700 mb-2">Resource Library 📚</h1>
        <p className="text-lg text-slate-500">
          Discover helpful resources for mental health and well-being
        </p>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
        <CardContent className="pt-6 pb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search articles, videos, and exercises... 🔍"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 rounded-xl border-slate-200 bg-white/50 backdrop-blur-sm text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Wellness Tips</CardTitle>
          <CardDescription>Simple strategies you can use right now</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {quickTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <div className="mt-1 text-primary">{tip.icon}</div>
                <div>
                  <h4 className="font-medium">{tip.title}</h4>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{article.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span className="text-sm">{article.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {article.readTime}
                    </div>
                    <Button variant="outline" size="sm">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Read
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <Card key={video.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <div className="aspect-video relative overflow-hidden rounded-t-lg bg-muted/50 flex items-center justify-center">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1507120410856-1f35574c3b45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxicmVhdGhpbmclMjBleGVyY2lzZSUyMGNhbG0lMjBuYXR1cmV8ZW58MXx8fHwxNzU2NzIyODk0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt={video.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Video className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{video.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {video.views}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                  <CardDescription>{video.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Video className="mr-2 h-4 w-4" />
                    Watch Video
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="exercises" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {exercises.map((exercise) => (
              <Card key={exercise.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{exercise.category}</Badge>
                    <Badge variant="outline">{exercise.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-lg">{exercise.title}</CardTitle>
                  <CardDescription>{exercise.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {exercise.duration}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Headphones className="mr-2 h-4 w-4" />
                    Start Exercise
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}