
import { useState } from 'react';
import { ArrowLeft, Sparkles, RefreshCw, Download, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CharacterCreationProps {
  onNavigate: (view: string) => void;
  currentStory: any;
}

export const CharacterCreation = ({ onNavigate, currentStory }: CharacterCreationProps) => {
  const [characterName, setCharacterName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string|null>(null);

  const handleGeneratePrompt = async () => {
    setIsGenerating(true);
    // Simulate AI prompt generation
    setTimeout(() => {
      setGeneratedPrompt(`A detailed portrait of ${characterName || 'a character'}, ${prompt}. Professional studio lighting, high quality, photorealistic, 8K resolution, detailed facial features, expressive eyes.`);
      setIsGenerating(false);
    }, 2000);
  };

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    // Simulate image generation
    setTimeout(() => {
      setGeneratedImage('/api/placeholder/400/400');
      setIsGenerating(false);
    }, 3000);
  };

  const predefinedPrompts = [
    "A wise elderly wizard with flowing silver beard and mystical robes",
    "A brave young warrior with armor gleaming in sunlight",
    "A mysterious space explorer in futuristic suit",
    "A kind-hearted healer with gentle eyes and herb pouch"
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
            <h1 className="text-3xl font-bold text-slate-800">Character Creation</h1>
            <p className="text-slate-600">Bring your characters to life with AI</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-xs">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-indigo-600" />
                  Character Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="characterName">Character Name</Label>
                  <Input
                    id="characterName"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    placeholder="Enter character name..."
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="prompt">Character Description</Label>
                  <Textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your character's appearance, personality, and traits..."
                    className="mt-1 min-h-[120px]"
                  />
                </div>

                <Button
                  onClick={handleGeneratePrompt}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating AI Prompt...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate AI Prompt
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-xs">
              <CardHeader>
                <CardTitle>Quick Character Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {predefinedPrompts.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(template)}
                      className="text-left p-3 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-transparent transition-all duration-200 text-sm"
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {generatedPrompt && (
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-xs">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    AI-Generated Prompt
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleGeneratePrompt}
                      disabled={isGenerating}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={generatedPrompt}
                    onChange={(e) => setGeneratedPrompt(e.target.value)}
                    className="min-h-[100px] mb-4"
                  />
                  <Button
                    onClick={handleGenerateImage}
                    disabled={isGenerating}
                    className="w-full bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating Character...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Character Image
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {generatedImage && (
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-xs">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Generated Character
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-linear-to-br from-indigo-400 to-purple-600 rounded-xl overflow-hidden shadow-lg">
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <Sparkles className="w-12 h-12 mx-auto mb-2" />
                        <p className="font-medium">{characterName || 'Character'}</p>
                        <p className="text-sm opacity-80">AI Generated</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button className="flex-1 bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                      Save Character
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Regenerate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
