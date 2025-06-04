import { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, RefreshCw, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface StoryCreationProps {
  onNavigate: (view: string) => void;
  currentStory: any;
  setCurrentStory: (story: any) => void;
  storyStep: number;
  setStoryStep: (step: number) => void;
}

export const StoryCreation = ({ onNavigate, currentStory, setCurrentStory, storyStep, setStoryStep }: StoryCreationProps) => {
  const [storyTitle, setStoryTitle] = useState('');
  const [storyConcept, setStoryConcept] = useState('');
  const [sceneCount, setSceneCount] = useState(5);
  const [generatedStory, setGeneratedStory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateStory = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      const enhanced = `${storyTitle}\n\nA compelling narrative exploring ${storyConcept}. This story unfolds across ${sceneCount} carefully crafted scenes, building tension and character development while maintaining audience engagement throughout the journey.`;
      setGeneratedStory(enhanced);
      setIsGenerating(false);
    }, 2000);
  };

  const handleProceedToCharacters = () => {
    const newStory = {
      id: Date.now(),
      title: storyTitle,
      concept: storyConcept,
      enhancedStory: generatedStory,
      scenes: sceneCount,
      status: 'in-progress'
    };
    setCurrentStory(newStory);
    onNavigate('character-generation');
  };

  const storyTemplates = [
    "A space explorer discovers an ancient alien civilization",
    "A detective uncovers a conspiracy in a cyberpunk city",
    "A magical realm where time flows differently",
    "An underwater kingdom facing an environmental crisis"
  ];

  return (
    <div className="h-full overflow-auto bg-slate-950">
      <div className="p-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('dashboard')}
          className="text-slate-400 hover:text-white hover:bg-slate-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Create Your Story</h1>
          <p className="text-slate-400">Start with your story concept and let AI enhance it</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Story Foundation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="storyTitle" className="text-slate-300">Story Title</Label>
                  <Input
                    id="storyTitle"
                    value={storyTitle}
                    onChange={(e) => setStoryTitle(e.target.value)}
                    placeholder="Enter your story title..."
                    className="mt-1 bg-slate-800 border-slate-700 text-white placeholder-slate-400"
                  />
                </div>

                <div>
                  <Label htmlFor="sceneCount" className="text-slate-300">Number of Scenes</Label>
                  <Input
                    id="sceneCount"
                    type="number"
                    min="3"
                    max="12"
                    value={sceneCount}
                    onChange={(e) => setSceneCount(parseInt(e.target.value) || 5)}
                    className="mt-1 bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="storyConcept" className="text-slate-300">Story Concept</Label>
                <Textarea
                  id="storyConcept"
                  value={storyConcept}
                  onChange={(e) => setStoryConcept(e.target.value)}
                  placeholder="Describe your story concept, themes, and main plot points..."
                  className="mt-1 min-h-[120px] bg-slate-800 border-slate-700 text-white placeholder-slate-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={handleGenerateStory}
                  disabled={!storyConcept.trim() || isGenerating}
                  className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Enhancing Story...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Enhance with AI
                    </>
                  )}
                </Button>

                {generatedStory && (
                  <Button
                    onClick={handleProceedToCharacters}
                    className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                  >
                    Proceed to Characters
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>

              {generatedStory && (
                <div className="mt-6">
                  <Label className="text-slate-300">Enhanced Story</Label>
                  <Textarea
                    value={generatedStory}
                    onChange={(e) => setGeneratedStory(e.target.value)}
                    className="mt-1 min-h-[150px] bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {!generatedStory && (
            <Card className="mt-6 border border-slate-800 bg-slate-900/50 backdrop-blur-xs">
              <CardHeader>
                <CardTitle className="text-white">Story Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {storyTemplates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => setStoryConcept(template)}
                      className="text-left p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-slate-600 transition-all duration-200 text-slate-300"
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
