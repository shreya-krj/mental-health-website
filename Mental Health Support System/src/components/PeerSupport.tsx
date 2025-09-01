import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Users, 
  MessageSquare, 
  Heart, 
  ThumbsUp,
  Clock,
  Shield,
  Star,
  Plus,
  Search,
  Filter,
  Bookmark,
  AlertCircle,
  CheckCircle,
  UserCheck
} from "lucide-react";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: 'student' | 'volunteer' | 'moderator';
  category: string;
  timestamp: Date;
  likes: number;
  replies: number;
  isAnonymous: boolean;
  tags: string[];
  isResolved?: boolean;
}

interface PeerVolunteer {
  id: string;
  name: string;
  year: string;
  major: string;
  specialties: string[];
  rating: number;
  sessionsCompleted: number;
  languages: string[];
  isOnline: boolean;
  bio: string;
}

const forumPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Dealing with exam anxiety - any tips?',
    content: 'I have my finals coming up next week and I\'m feeling really overwhelmed. The anxiety is making it hard to focus on studying. Has anyone found effective ways to manage this?',
    author: 'Anonymous Student',
    authorRole: 'student',
    category: 'Academic Stress',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 12,
    replies: 8,
    isAnonymous: true,
    tags: ['anxiety', 'exams', 'studying'],
    isResolved: false
  },
  {
    id: '2',
    title: 'Mindfulness techniques that actually work',
    content: 'After struggling with stress for months, I\'ve found some mindfulness techniques that really help. Happy to share what worked for me and hear about your experiences too!',
    author: 'Sarah M.',
    authorRole: 'volunteer',
    category: 'Coping Strategies',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    likes: 24,
    replies: 15,
    isAnonymous: false,
    tags: ['mindfulness', 'stress relief', 'meditation'],
    isResolved: true
  },
  {
    id: '3',
    title: 'International students - feeling isolated?',
    content: 'I\'m an international student and sometimes feel disconnected from campus life. Anyone else experience this? Would love to connect with others who understand.',
    author: 'Alex K.',
    authorRole: 'student',
    category: 'Social Connection',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    likes: 18,
    replies: 12,
    isAnonymous: false,
    tags: ['international students', 'social connection', 'campus life'],
    isResolved: false
  },
  {
    id: '4',
    title: 'Sleep schedule completely messed up',
    content: 'My sleep has been terrible lately - staying up until 3-4 AM and then feeling exhausted during the day. Anyone have tips for getting back on track?',
    author: 'Night Owl',
    authorRole: 'student',
    category: 'Sleep & Wellness',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    likes: 9,
    replies: 6,
    isAnonymous: true,
    tags: ['sleep', 'wellness', 'daily routine'],
    isResolved: false
  }
];

const peerVolunteers: PeerVolunteer[] = [
  {
    id: '1',
    name: 'Maya Chen',
    year: 'Senior',
    major: 'Psychology',
    specialties: ['Academic Stress', 'Time Management', 'Cultural Adjustment'],
    rating: 4.9,
    sessionsCompleted: 47,
    languages: ['English', 'Mandarin'],
    isOnline: true,
    bio: 'I understand the pressures of academic life and am here to listen and support fellow students.'
  },
  {
    id: '2',
    name: 'David Rodriguez',
    year: 'Graduate',
    major: 'Social Work',
    specialties: ['Social Anxiety', 'LGBTQ+ Support', 'Family Issues'],
    rating: 4.8,
    sessionsCompleted: 62,
    languages: ['English', 'Spanish'],
    isOnline: false,
    bio: 'Passionate about creating safe spaces for all students to share their experiences and find support.'
  },
  {
    id: '3',
    name: 'Aisha Patel',
    year: 'Junior',
    major: 'Neuroscience',
    specialties: ['Depression Support', 'Study Motivation', 'Mindfulness'],
    rating: 4.9,
    sessionsCompleted: 35,
    languages: ['English', 'Hindi', 'Gujarati'],
    isOnline: true,
    bio: 'Combining my studies in neuroscience with personal experience to help others navigate mental health challenges.'
  }
];

const categories = [
  'Academic Stress',
  'Social Connection', 
  'Coping Strategies',
  'Sleep & Wellness',
  'Relationship Issues',
  'Financial Stress',
  'Career Anxiety',
  'Mental Health'
];

export function PeerSupport() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleNewPost = () => {
    if (newPostTitle && newPostContent && newPostCategory) {
      // In a real app, this would make an API call
      const newPost: ForumPost = {
        id: Date.now().toString(),
        title: newPostTitle,
        content: newPostContent,
        author: isAnonymous ? 'Anonymous Student' : 'Alex Student',
        authorRole: 'student',
        category: newPostCategory,
        timestamp: new Date(),
        likes: 0,
        replies: 0,
        isAnonymous,
        tags: [],
        isResolved: false
      };
      
      // Reset form
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostCategory('');
      setShowNewPostForm(false);
    }
  };

  const getAuthorColor = (role: string) => {
    switch (role) {
      case 'volunteer': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'moderator': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold text-slate-700 mb-2">Peer Support Community 🤝</h1>
        <p className="text-lg text-slate-500">
          Connect with fellow students and trained peer volunteers for support and guidance
        </p>
      </div>

      <Tabs defaultValue="forum" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border-0 shadow-sm rounded-2xl p-2">
          <TabsTrigger 
            value="forum" 
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-medium py-3"
          >
            Discussion Forum
          </TabsTrigger>
          <TabsTrigger 
            value="volunteers"
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-medium py-3"
          >
            Peer Volunteers
          </TabsTrigger>
          <TabsTrigger 
            value="resources"
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-medium py-3"
          >
            Support Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="forum" className="space-y-6">
          {/* Forum Controls */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl border-slate-200 w-72"
                />
              </div>
              
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <Button
              onClick={() => setShowNewPostForm(!showNewPostForm)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl px-6"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Discussion
            </Button>
          </div>

          {/* New Post Form */}
          {showNewPostForm && (
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-slate-700">Start a New Discussion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Discussion title..."
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="rounded-xl border-slate-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <select 
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 w-full"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Textarea
                    placeholder="Share your thoughts, ask questions, or offer support..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="rounded-xl border-slate-200 resize-none"
                    rows={4}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="anonymous" className="text-sm text-slate-600">
                    Post anonymously
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleNewPost}
                    disabled={!newPostTitle || !newPostContent || !newPostCategory}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl"
                  >
                    Post Discussion
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewPostForm(false)}
                    className="rounded-xl border-slate-200"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Forum Posts */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                        {post.isAnonymous ? '?' : post.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-slate-700 mb-1">{post.title}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-slate-500">{post.author}</span>
                            <Badge className={`text-xs rounded-full ${getAuthorColor(post.authorRole)}`}>
                              {post.authorRole === 'volunteer' ? '🎓 Peer Volunteer' : 
                               post.authorRole === 'moderator' ? '🛡️ Moderator' : '👤 Student'}
                            </Badge>
                            <Badge variant="outline" className="text-xs rounded-full border-slate-200">
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-500">
                            {Math.floor((Date.now() - post.timestamp.getTime()) / (1000 * 60 * 60))}h ago
                          </span>
                          {post.isResolved && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </div>
                      
                      <p className="text-slate-600 mb-4 leading-relaxed">{post.content}</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-600 border-blue-200 rounded-full">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600">
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600">
                            <MessageSquare className="mr-1 h-4 w-4" />
                            {post.replies} replies
                          </Button>
                          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl">
                          Join Discussion
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="volunteers" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {peerVolunteers.map((volunteer) => (
              <Card key={volunteer.id} className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-medium">
                          {volunteer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {volunteer.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-slate-700">{volunteer.name}</CardTitle>
                      <p className="text-sm text-slate-500">{volunteer.year} • {volunteer.major}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{volunteer.rating}</span>
                        <span className="text-sm text-slate-500">• {volunteer.sessionsCompleted} sessions</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600 leading-relaxed">{volunteer.bio}</p>
                  
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">Specialties</p>
                    <div className="flex flex-wrap gap-2">
                      {volunteer.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-700 border-green-200 rounded-full text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">Languages</p>
                    <div className="flex gap-2">
                      {volunteer.languages.map((lang, index) => (
                        <Badge key={index} variant="outline" className="border-slate-200 text-slate-600 rounded-full text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full rounded-xl ${
                      volunteer.isOnline
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
                        : 'bg-slate-300 text-slate-600 cursor-not-allowed'
                    }`}
                    disabled={!volunteer.isOnline}
                  >
                    {volunteer.isOnline ? (
                      <>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Start Chat
                      </>
                    ) : (
                      'Currently Offline'
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Shield className="h-5 w-5 text-green-500" />
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-700">Be Respectful & Kind</p>
                      <p className="text-sm text-slate-600">Treat all community members with respect and empathy</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-700">Maintain Confidentiality</p>
                      <p className="text-sm text-slate-600">Keep personal information shared in discussions private</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-700">No Medical Advice</p>
                      <p className="text-sm text-slate-600">Share experiences and support, not medical or therapeutic advice</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-700">Report Concerns</p>
                      <p className="text-sm text-slate-600">Alert moderators about harmful or inappropriate content</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <UserCheck className="h-5 w-5 text-blue-500" />
                  Become a Peer Volunteer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">Help other students by becoming a trained peer volunteer. Requirements:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-slate-600">Junior or Senior standing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-slate-600">Complete 20-hour training program</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-slate-600">Commitment to 4 hours/week for one semester</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-slate-600">Background check and references</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl">
                  Apply to Volunteer
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="border-amber-200 bg-amber-50/50 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">Important Notice</p>
                  <p>
                    Peer support is not a substitute for professional mental health care. 
                    If you're experiencing a mental health crisis or need immediate support, 
                    please contact campus counseling services or emergency services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}