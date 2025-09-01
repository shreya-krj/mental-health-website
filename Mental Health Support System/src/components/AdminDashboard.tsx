import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  Brain,
  Heart,
  MessageSquare,
  Shield,
  Download,
  Filter,
  Eye,
  Clock,
  UserCheck,
  Activity
} from "lucide-react";

// Mock data for analytics
const monthlyUsageData = [
  { month: 'Jan', sessions: 145, users: 89, crisisReports: 3 },
  { month: 'Feb', sessions: 198, users: 112, crisisReports: 5 },
  { month: 'Mar', sessions: 234, users: 134, crisisReports: 2 },
  { month: 'Apr', sessions: 276, users: 156, crisisReports: 4 },
  { month: 'May', sessions: 312, users: 178, crisisReports: 6 },
  { month: 'Jun', sessions: 298, users: 165, crisisReports: 3 }
];

const moodTrendsData = [
  { week: 'Week 1', average: 6.2, stress: 7.1, anxiety: 6.8, depression: 5.9 },
  { week: 'Week 2', average: 6.5, stress: 6.8, anxiety: 6.5, depression: 6.2 },
  { week: 'Week 3', average: 5.8, stress: 7.8, anxiety: 7.2, depression: 6.5 },
  { week: 'Week 4', average: 6.1, stress: 7.2, anxiety: 6.9, depression: 6.0 },
  { week: 'Week 5', average: 6.7, stress: 6.5, anxiety: 6.2, depression: 5.8 },
  { week: 'Week 6', average: 6.3, stress: 6.9, anxiety: 6.4, depression: 6.1 }
];

const topConcernsData = [
  { concern: 'Academic Stress', count: 178, color: '#3B82F6' },
  { concern: 'Anxiety', count: 156, color: '#EF4444' },
  { concern: 'Sleep Issues', count: 134, color: '#10B981' },
  { concern: 'Social Isolation', count: 98, color: '#F59E0B' },
  { concern: 'Depression', count: 87, color: '#8B5CF6' },
  { concern: 'Relationship Issues', count: 76, color: '#EC4899' }
];

const demographicsData = [
  { name: 'Freshman', value: 28, color: '#3B82F6' },
  { name: 'Sophomore', value: 24, color: '#10B981' },
  { name: 'Junior', value: 26, color: '#F59E0B' },
  { name: 'Senior', value: 18, color: '#EF4444' },
  { name: 'Graduate', value: 4, color: '#8B5CF6' }
];

const interventionSuccessData = [
  { intervention: 'AI Chat Support', sessions: 324, satisfaction: 4.2, followUp: 78 },
  { intervention: 'Peer Support', sessions: 189, satisfaction: 4.6, followUp: 85 },
  { intervention: 'Professional Counseling', sessions: 156, satisfaction: 4.8, followUp: 92 },
  { intervention: 'Group Therapy', sessions: 98, satisfaction: 4.4, followUp: 88 },
  { intervention: 'Crisis Intervention', sessions: 23, satisfaction: 4.7, followUp: 96 }
];

export function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('last-30-days');
  const [selectedMetric, setSelectedMetric] = useState('all');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-slate-700 mb-2">Admin Dashboard 📊</h1>
          <p className="text-lg text-slate-500">
            Analytics and insights for institutional mental health oversight
          </p>
        </div>
        
        <div className="flex gap-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700"
          >
            <option value="last-7-days">Last 7 Days</option>
            <option value="last-30-days">Last 30 Days</option>
            <option value="last-90-days">Last 90 Days</option>
            <option value="last-year">Last Year</option>
          </select>
          
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Total Active Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-700 mb-1">1,234</div>
            <p className="text-sm text-green-600 font-medium">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Sessions This Month</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-700 mb-1">2,847</div>
            <p className="text-sm text-green-600 font-medium">+18.2% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Crisis Interventions</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-700 mb-1">23</div>
            <p className="text-sm text-amber-600 font-medium">6 pending follow-ups</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Avg. Well-being Score</CardTitle>
            <Heart className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-700 mb-1">6.4</div>
            <p className="text-sm text-green-600 font-medium">+0.3 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm border-0 shadow-sm rounded-2xl p-2">
          <TabsTrigger 
            value="overview" 
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-medium py-3"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="usage"
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-medium py-3"
          >
            Usage Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="wellbeing"
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-medium py-3"
          >
            Well-being Trends
          </TabsTrigger>
          <TabsTrigger 
            value="interventions"
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-medium py-3"
          >
            Interventions
          </TabsTrigger>
          <TabsTrigger 
            value="reports"
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-medium py-3"
          >
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-slate-700">Monthly Platform Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="sessions" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} />
                    <Area type="monotone" dataKey="users" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-slate-700">Top Mental Health Concerns</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={topConcernsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {topConcernsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {topConcernsData.map((concern, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: concern.color }}
                        ></div>
                        <span className="text-sm text-slate-600">{concern.concern}</span>
                      </div>
                      <span className="text-sm font-medium text-slate-700">{concern.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-slate-700">Student Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demographicsData.map((demo, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">{demo.name}</span>
                        <span className="text-sm font-medium text-slate-700">{demo.value}%</span>
                      </div>
                      <Progress value={demo.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-red-800">High-risk user identified</p>
                      <p className="text-red-600">Student ID: ****7834 - Requires immediate follow-up</p>
                      <p className="text-xs text-red-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-amber-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-amber-800">Counselor capacity at 90%</p>
                      <p className="text-amber-600">Consider scheduling additional availability</p>
                      <p className="text-xs text-amber-500 mt-1">4 hours ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-800">Usage spike detected</p>
                      <p className="text-blue-600">40% increase in mood tracker usage</p>
                      <p className="text-xs text-blue-500 mt-1">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Activity className="h-5 w-5 text-green-500" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Platform Uptime</span>
                    <Badge className="bg-green-100 text-green-700 border-green-200">99.9%</Badge>
                  </div>
                  <Progress value={99.9} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">AI Response Time</span>
                    <Badge className="bg-green-100 text-green-700 border-green-200">1.2s avg</Badge>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">User Satisfaction</span>
                    <Badge className="bg-green-100 text-green-700 border-green-200">4.6/5</Badge>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Data Security</span>
                    <Badge className="bg-green-100 text-green-700 border-green-200">Secure</Badge>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-slate-700">Platform Usage Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sessions" stroke="#3B82F6" strokeWidth={3} />
                  <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={3} />
                  <Line type="monotone" dataKey="crisisReports" stroke="#EF4444" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wellbeing" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-slate-700">Mental Health Trends Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={moodTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[1, 10]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="average" stroke="#3B82F6" strokeWidth={3} name="Overall Average" />
                  <Line type="monotone" dataKey="stress" stroke="#EF4444" strokeWidth={2} name="Stress Levels" />
                  <Line type="monotone" dataKey="anxiety" stroke="#F59E0B" strokeWidth={2} name="Anxiety Levels" />
                  <Line type="monotone" dataKey="depression" stroke="#8B5CF6" strokeWidth={2} name="Depression Indicators" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interventions" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-slate-700">Intervention Effectiveness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interventionSuccessData.map((intervention, index) => (
                  <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50/50 border border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-slate-700">{intervention.intervention}</h4>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                        {intervention.sessions} sessions
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-slate-500">Satisfaction</p>
                        <p className="text-lg font-semibold text-slate-700">{intervention.satisfaction}/5</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Follow-up Rate</p>
                        <p className="text-lg font-semibold text-slate-700">{intervention.followUp}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Success Rate</p>
                        <Progress value={intervention.followUp} className="h-2 mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-slate-700">Generate Custom Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">Report Type</label>
                  <select className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700">
                    <option>Monthly Summary</option>
                    <option>Crisis Intervention Report</option>
                    <option>Usage Analytics</option>
                    <option>Well-being Trends</option>
                    <option>Demographic Analysis</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">Date Range</label>
                  <select className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700">
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                    <option>Current Semester</option>
                    <option>Academic Year</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">Format</label>
                  <select className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700">
                    <option>PDF Report</option>
                    <option>Excel Spreadsheet</option>
                    <option>PowerPoint Presentation</option>
                    <option>CSV Data</option>
                  </select>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <Download className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-slate-700">Scheduled Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-700">Weekly Usage Summary</p>
                      <p className="text-sm text-slate-500">Every Monday at 9:00 AM</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
                  </div>
                </div>
                
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-700">Monthly Wellness Report</p>
                      <p className="text-sm text-slate-500">First of each month</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
                  </div>
                </div>
                
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-700">Crisis Intervention Log</p>
                      <p className="text-sm text-slate-500">Real-time alerts</p>
                    </div>
                    <Badge className="bg-red-100 text-red-700 border-red-200">Priority</Badge>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full rounded-xl border-slate-200">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Privacy Notice */}
      <Card className="border-amber-200 bg-amber-50/50 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Privacy & Compliance Notice</p>
              <p>
                All data presented in this dashboard is anonymized and aggregated to protect student privacy. 
                Individual user information is not accessible through this interface. Reports comply with FERPA, 
                HIPAA, and institutional data governance policies.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}