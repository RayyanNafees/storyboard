
import { Plus, Sparkles, BookOpen, Users, Film, Play, Edit3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DashboardProps {
  onNavigate: (view: string) => void;
  currentStory: any;
  setCurrentStory: (story: any) => void;
}

export const Dashboard = ({ onNavigate, currentStory, setCurrentStory }: DashboardProps) => {
  const recentProjects = [
    { 
      id: 1,
      type: 'story', 
      title: 'The Last Explorer', 
      description: 'A space explorer discovers an ancient alien civilization',
      scenes: 8, 
      status: 'complete',
      genre: 'Sci-Fi'
    },
    { 
      id: 2,
      type: 'story', 
      title: 'Cyber Revolution', 
      description: 'A detective uncovers a conspiracy in a cyberpunk city',
      scenes: 6, 
      status: 'in-progress',
      genre: 'Cyberpunk'
    },
    { 
      id: 3,
      type: 'story', 
      title: 'Ocean Mysteries', 
      description: 'An underwater kingdom facing an environmental crisis',
      scenes: 4, 
      status: 'draft',
      genre: 'Fantasy'
    },
  ];

  const handleStoryClick = (story: any) => {
    setCurrentStory(story);
    onNavigate('my-stories');
  };

  return (
    <div className="h-full overflow-auto bg-slate-950">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to your Creative Studio
          </h1>
          <p className="text-xl text-slate-400">
            Transform your stories into stunning videos with AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-xs">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-white">Quick Start</CardTitle>
                  <Button
                    onClick={() => onNavigate('story-creation')}
                    className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Story
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 text-center">
                    <BookOpen className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-white mb-2">1. Create Story</h3>
                    <p className="text-sm text-slate-400">Start with your story concept</p>
                  </div>
                  <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 text-center">
                    <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-white mb-2">2. Generate Characters</h3>
                    <p className="text-sm text-slate-400">AI creates your characters</p>
                  </div>
                  <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 text-center">
                    <Film className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-white mb-2">3. Create Scenes</h3>
                    <p className="text-sm text-slate-400">Generate video scenes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6 border border-slate-800 bg-slate-900/50 backdrop-blur-xs">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-white">Recent Stories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentProjects.map((story) => (
                    <div 
                      key={story.id} 
                      onClick={() => handleStoryClick(story)}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700 hover:bg-slate-800/50 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{story.title}</p>
                          <p className="text-sm text-slate-400">{story.genre} • {story.scenes} scenes • {story.status}</p>
                          <p className="text-xs text-slate-500">{story.description}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-xs">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-white">Platform Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Stories Created</span>
                  <span className="font-semibold text-white">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Characters Generated</span>
                  <span className="font-semibold text-white">48</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Scenes Produced</span>
                  <span className="font-semibold text-white">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Videos Rendered</span>
                  <span className="font-semibold text-white">24</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
