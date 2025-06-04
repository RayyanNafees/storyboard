
import { useState } from 'react';
import { ArrowLeft, BookOpen, Plus, Sparkles, RefreshCw, Film } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface StoryDevelopmentProps {
  onNavigate: (view: string) => void;
  currentStory: any;
}

type Scene = {
    id: number;
    title: string;
    description: string;
    script: string;
    imageGenerated: boolean;
}

export const StoryDevelopment = ({ onNavigate, currentStory }: StoryDevelopmentProps) => {
  const [storyTitle, setStoryTitle] = useState(currentStory?.title || '');
  const [storyConcept, setStoryConcept] = useState('');
  const [sceneCount, setSceneCount] = useState(5);
  const [generatedStory, setGeneratedStory] = useState('');
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateStory = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedStory(`Enhanced Story: ${storyTitle}\n\nA compelling narrative that explores ${storyConcept}. The story unfolds across ${sceneCount} carefully crafted scenes, each building upon the previous to create a cohesive and engaging experience. Character development and plot progression are balanced to maintain audience engagement throughout.`);
      setIsGenerating(false);
    }, 2000);
  };

  const handleGenerateScenes = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generatedScenes = Array.from({ length: sceneCount }, (_, i) => ({
        id: i + 1,
        title: `Scene ${i + 1}`,
        description: `A pivotal moment in the story where characters face challenges and the plot advances.`,
        script: `Detailed script for scene ${i + 1} with character actions, dialogue, and visual descriptions.`,
        imageGenerated: false
      }));
      setScenes(generatedScenes);
      setIsGenerating(false);
    }, 3000);
  };

  const storyTemplates = [
    "A hero's journey through unknown lands",
    "A mystery that unfolds in a small town",
    "A futuristic adventure in space",
    "A romance that bridges two worlds"
  ];

  return (
    <div className="h-full overflow-auto">
      <div className="p-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('dashboard')}
            className="text-slate-600 hover:text-slate-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Story Development</h1>
            <p className="text-slate-600">Craft compelling narratives with AI assistance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-xs">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  Story Foundation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="storyTitle">Story Title</Label>
                  <Input
                    id="storyTitle"
                    value={storyTitle}
                    onChange={(e) => setStoryTitle(e.target.value)}
                    placeholder="Enter your story title..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="storyConcept">Story Concept</Label>
                  <Textarea
                    id="storyConcept"
                    value={storyConcept}
                    onChange={(e) => setStoryConcept(e.target.value)}
                    placeholder="Describe your story concept, themes, and main plot points..."
                    className="mt-1 min-h-[120px]"
                  />
                </div>

                <div>
                  <Label htmlFor="sceneCount">Number of Scenes</Label>
                  <Input
                    id="sceneCount"
                    type="number"
                    min="3"
                    max="20"
                    value={sceneCount}
                    onChange={(e) => setSceneCount(parseInt(e.target.value) || 5)}
                    className="mt-1"
                  />
                </div>

                <Button
                  onClick={handleGenerateStory}
                  disabled={!storyConcept.trim() || isGenerating}
                  className="w-full bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Developing Story...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Develop Story with AI
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {generatedStory && (
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-xs">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Enhanced Story
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleGenerateStory}
                      disabled={isGenerating}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={generatedStory}
                    onChange={(e) => setGeneratedStory(e.target.value)}
                    className="min-h-[150px] mb-4"
                  />
                  <Button
                    onClick={handleGenerateScenes}
                    disabled={isGenerating}
                    className="w-full bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating Scenes...
                      </>
                    ) : (
                      <>
                        <Film className="w-4 h-4 mr-2" />
                        Generate Scene Breakdown
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {scenes.length > 0 && (
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-xs">
                <CardHeader>
                  <CardTitle>Scene Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scenes.map((scene, index) => (
                      <div key={scene.id} className="border border-slate-200 rounded-lg p-4 bg-white/50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-slate-800">{scene.title}</h4>
                          <Button size="sm" variant="outline">
                            Edit Script
                          </Button>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">{scene.description}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            Generate Image
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            View Script
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-xs">
              <CardHeader>
                <CardTitle>Story Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {storyTemplates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => setStoryConcept(template)}
                      className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-transparent transition-all duration-200 text-sm"
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-xs">
              <CardHeader>
                <CardTitle>Story Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Concept</span>
                  <span className="font-semibold text-emerald-600">✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Story Development</span>
                  <span className="font-semibold text-slate-400">○</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Scene Breakdown</span>
                  <span className="font-semibold text-slate-400">○</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Visual Generation</span>
                  <span className="font-semibold text-slate-400">○</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
