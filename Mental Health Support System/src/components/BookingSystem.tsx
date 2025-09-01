import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  MapPin, 
  Video, 
  Phone,
  CheckCircle,
  Star,
  Shield,
  BookOpen,
  Heart
} from "lucide-react";

interface Counselor {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  rating: number;
  experience: string;
  languages: string[];
  availability: string[];
  imageUrl?: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
  counselor?: string;
}

const counselors: Counselor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    title: 'Licensed Clinical Psychologist',
    specializations: ['Anxiety', 'Depression', 'Academic Stress', 'Cultural Identity'],
    rating: 4.9,
    experience: '8 years',
    languages: ['English', 'Mandarin', 'Hindi'],
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday']
  },
  {
    id: '2',
    name: 'Dr. Michael Rodriguez',
    title: 'Licensed Mental Health Counselor',
    specializations: ['ADHD', 'Relationship Issues', 'Social Anxiety', 'LGBTQ+ Support'],
    rating: 4.8,
    experience: '6 years',
    languages: ['English', 'Spanish'],
    availability: ['Tuesday', 'Wednesday', 'Thursday', 'Friday']
  },
  {
    id: '3',
    name: 'Dr. Priya Patel',
    title: 'Trauma Specialist & Counselor',
    specializations: ['Trauma Recovery', 'PTSD', 'Grief Counseling', 'Mindfulness'],
    rating: 4.9,
    experience: '10 years',
    languages: ['English', 'Hindi', 'Gujarati'],
    availability: ['Monday', 'Wednesday', 'Thursday', 'Saturday']
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    title: 'Behavioral Health Specialist',
    specializations: ['Substance Abuse', 'Behavioral Issues', 'Crisis Intervention'],
    rating: 4.7,
    experience: '12 years',
    languages: ['English'],
    availability: ['Monday', 'Tuesday', 'Thursday', 'Friday']
  }
];

const timeSlots: TimeSlot[] = [
  { time: '9:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '1:00 PM', available: true },
  { time: '2:00 PM', available: true },
  { time: '3:00 PM', available: false },
  { time: '4:00 PM', available: true },
  { time: '5:00 PM', available: true }
];

export function BookingSystem() {
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [sessionType, setSessionType] = useState<string>("");
  const [urgency, setUrgency] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [studentName, setStudentName] = useState<string>("");
  const [studentEmail, setStudentEmail] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = () => {
    if (selectedCounselor && selectedDate && selectedTime && sessionType && studentName && studentEmail) {
      // In a real app, this would make an API call
      setIsBooked(true);
    }
  };

  if (isBooked) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-semibold text-slate-700 mb-2">Booking Confirmed! ✅</h1>
          <p className="text-lg text-slate-500">Your counseling session has been successfully scheduled</p>
        </div>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Session Scheduled</h3>
                <p className="text-slate-600">You'll receive a confirmation email shortly with session details.</p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-sm text-slate-500">Counselor</p>
                    <p className="font-medium text-slate-700">{selectedCounselor?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Date & Time</p>
                    <p className="font-medium text-slate-700">
                      {selectedDate?.toDateString()} at {selectedTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Session Type</p>
                    <p className="font-medium text-slate-700">{sessionType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Duration</p>
                    <p className="font-medium text-slate-700">50 minutes</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => setIsBooked(false)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl px-6"
                >
                  Book Another Session
                </Button>
                <Button 
                  variant="outline"
                  className="rounded-xl border-slate-200"
                >
                  Add to Calendar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold text-slate-700 mb-2">Book Counseling Session 📅</h1>
        <p className="text-lg text-slate-500">
          Schedule a confidential appointment with our licensed mental health professionals
        </p>
      </div>

      <Tabs defaultValue="counselors" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border-0 shadow-sm rounded-2xl p-2">
          <TabsTrigger 
            value="counselors" 
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-medium py-3"
          >
            Choose Counselor
          </TabsTrigger>
          <TabsTrigger 
            value="schedule"
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-medium py-3"
          >
            Select Date & Time
          </TabsTrigger>
          <TabsTrigger 
            value="details"
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-medium py-3"
          >
            Session Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="counselors" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {counselors.map((counselor) => (
              <Card 
                key={counselor.id}
                className={`border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl cursor-pointer transition-all duration-200 ${
                  selectedCounselor?.id === counselor.id 
                    ? 'ring-2 ring-blue-500 shadow-md' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedCounselor(counselor)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-slate-700 mb-1">{counselor.name}</CardTitle>
                      <p className="text-sm text-slate-500">{counselor.title}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{counselor.rating}</span>
                        </div>
                        <span className="text-sm text-slate-500">• {counselor.experience}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">Specializations</p>
                    <div className="flex flex-wrap gap-2">
                      {counselor.specializations.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 rounded-full text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">Languages</p>
                    <div className="flex gap-2">
                      {counselor.languages.map((lang, index) => (
                        <Badge key={index} variant="outline" className="border-slate-200 text-slate-600 rounded-full text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <CalendarIcon className="h-5 w-5" />
                  Select Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="rounded-md border-0"
                />
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Clock className="h-5 w-5" />
                  Available Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot, index) => (
                    <Button
                      key={index}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`rounded-xl transition-all duration-200 ${
                        selectedTime === slot.time
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : slot.available
                            ? 'border-slate-200 hover:bg-slate-50'
                            : 'opacity-50 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
                {selectedDate && (
                  <div className="mt-6 p-4 bg-blue-50/50 rounded-xl">
                    <p className="text-sm text-slate-600">
                      <strong>Selected:</strong> {selectedDate.toDateString()}
                      {selectedTime && ` at ${selectedTime}`}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-slate-700">Session Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="session-type">Session Type</Label>
                  <Select value={sessionType} onValueChange={setSessionType}>
                    <SelectTrigger className="rounded-xl border-slate-200">
                      <SelectValue placeholder="Choose session type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-person">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          In-Person Session
                        </div>
                      </SelectItem>
                      <SelectItem value="video">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          Video Call
                        </div>
                      </SelectItem>
                      <SelectItem value="phone">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Call
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger className="rounded-xl border-slate-200">
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="routine">Routine Check-in</SelectItem>
                      <SelectItem value="moderate">Moderate Concern</SelectItem>
                      <SelectItem value="urgent">Urgent (within 24-48 hours)</SelectItem>
                      <SelectItem value="crisis">Crisis (immediate attention)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Visit (Optional)</Label>
                  <Textarea
                    id="reason"
                    placeholder="Brief description of what you'd like to discuss..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="rounded-xl border-slate-200 resize-none"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-slate-700">Student Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-name">Full Name</Label>
                  <Input
                    id="student-name"
                    placeholder="Enter your full name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="rounded-xl border-slate-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="student-email">Email Address</Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="your.email@university.edu"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className="rounded-xl border-slate-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="student-id">Student ID</Label>
                  <Input
                    id="student-id"
                    placeholder="Enter your student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="rounded-xl border-slate-200"
                  />
                </div>

                <div className="p-4 bg-blue-50/50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Confidentiality Notice</p>
                      <p>All counseling sessions are completely confidential and protected under HIPAA guidelines.</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleBooking}
                  disabled={!selectedCounselor || !selectedDate || !selectedTime || !sessionType || !studentName || !studentEmail}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium shadow-sm"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Confirm Booking
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}