import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  Phone, 
  MessageSquare, 
  Globe, 
  Clock, 
  AlertTriangle, 
  Heart,
  Shield,
  Users,
  MapPin
} from "lucide-react";

export function CrisisSupport() {
  const emergencyContacts = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 free and confidential support for people in distress",
      type: "Crisis Line",
      availability: "24/7"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free, 24/7 crisis support via text message",
      type: "Text Support",
      availability: "24/7"
    },
    {
      name: "Campus Emergency Services",
      number: "(555) 123-4567",
      description: "Immediate emergency response on campus",
      type: "Campus Security",
      availability: "24/7"
    },
    {
      name: "Student Counseling Center",
      number: "(555) 123-4568",
      description: "Professional counseling services for students",
      type: "Counseling",
      availability: "Mon-Fri 8AM-5PM"
    }
  ];

  const immediateHelp = [
    {
      title: "Feeling Suicidal",
      description: "If you're having thoughts of suicide or self-harm",
      action: "Call 988 immediately",
      color: "destructive"
    },
    {
      title: "Panic Attack",
      description: "If you're experiencing a panic attack right now",
      action: "Try breathing exercises",
      color: "warning"
    },
    {
      title: "Severe Anxiety",
      description: "If you're feeling overwhelmed and can't cope",
      action: "Contact counseling center",
      color: "warning"
    },
    {
      title: "Substance Crisis",
      description: "If you're in a substance-related emergency",
      action: "Call emergency services",
      color: "destructive"
    }
  ];

  const selfCareStrategies = [
    {
      title: "Grounding Technique (5-4-3-2-1)",
      description: "Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste",
      icon: <Shield className="h-5 w-5" />
    },
    {
      title: "Deep Breathing",
      description: "Breathe in for 4 counts, hold for 4, breathe out for 6",
      icon: <Heart className="h-5 w-5" />
    },
    {
      title: "Reach Out",
      description: "Call a friend, family member, or trusted person",
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Safe Space",
      description: "Go to a place where you feel safe and comfortable",
      icon: <MapPin className="h-5 w-5" />
    }
  ];

  const onlineResources = [
    {
      name: "Crisis Chat",
      url: "crisischat.org",
      description: "Online crisis chat support",
      type: "Chat Support"
    },
    {
      name: "SAMHSA Treatment Locator",
      url: "findtreatment.samhsa.gov",
      description: "Find mental health and substance abuse treatment",
      type: "Treatment Finder"
    },
    {
      name: "Mental Health America",
      url: "mhanational.org",
      description: "Mental health resources and screening tools",
      type: "Resource Hub"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold text-red-600 mb-2">Crisis Support 🆘</h1>
        <p className="text-lg text-slate-500">
          Immediate help and resources for mental health emergencies
        </p>
      </div>

      {/* Emergency Warning */}
      <Card className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200">
                If you are in immediate danger
              </h3>
              <p className="text-red-700 dark:text-red-300 mt-1">
                Call 911 or go to your nearest emergency room immediately. 
                If you're having thoughts of suicide, call 988 for the Suicide & Crisis Lifeline.
              </p>
              <div className="flex gap-3 mt-4">
                <Button variant="destructive" size="sm">
                  <Phone className="mr-2 h-4 w-4" />
                  Call 911
                </Button>
                <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                  <Phone className="mr-2 h-4 w-4" />
                  Call 988
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Immediate Help Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            I Need Help Right Now
          </CardTitle>
          <CardDescription>Choose what best describes your situation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {immediateHelp.map((help, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  help.color === "destructive" 
                    ? "border-red-200 bg-red-50 dark:bg-red-900/20" 
                    : "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20"
                }`}
              >
                <h4 className="font-semibold">{help.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{help.description}</p>
                <Button 
                  size="sm" 
                  className="mt-3"
                  variant={help.color === "destructive" ? "destructive" : "default"}
                >
                  {help.action}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Emergency Contacts
          </CardTitle>
          <CardDescription>24/7 crisis support and emergency resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{contact.name}</h4>
                      <Badge variant="secondary">{contact.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {contact.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-4 w-4" />
                        {contact.availability}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Phone className="mr-2 h-4 w-4" />
                      {contact.number}
                    </Button>
                  </div>
                </div>
                {index < emergencyContacts.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Self-Care Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Immediate Self-Care Strategies
          </CardTitle>
          <CardDescription>Things you can do right now to help yourself</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {selfCareStrategies.map((strategy, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <div className="text-primary mt-1">{strategy.icon}</div>
                <div>
                  <h4 className="font-semibold">{strategy.title}</h4>
                  <p className="text-sm text-muted-foreground">{strategy.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Online Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Online Crisis Resources
          </CardTitle>
          <CardDescription>Additional support available online</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {onlineResources.map((resource, index) => (
              <div key={index}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{resource.name}</h4>
                      <Badge variant="outline">{resource.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {resource.description}
                    </p>
                    <p className="text-sm text-blue-600 mt-1">{resource.url}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Globe className="mr-2 h-4 w-4" />
                    Visit Site
                  </Button>
                </div>
                {index < onlineResources.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Safety Planning */}
      <Card>
        <CardHeader>
          <CardTitle>Create a Safety Plan</CardTitle>
          <CardDescription>Having a plan can help you stay safe during difficult times</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm">
              A safety plan includes warning signs, coping strategies, people you can contact, 
              and ways to make your environment safer. It's a personalized plan to help you 
              through crisis situations.
            </p>
            <Button className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              Create My Safety Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}