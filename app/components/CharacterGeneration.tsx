
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, RefreshCw, Users, Edit3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface CharacterGenerationProps {
  onNavigate: (view: string) => void;
  currentStory: any;
  setStoryStep: (step: number) => void;
}

type Character = {
    id: number;
    name: string;
    description: string;
    role: string;
}

export const CharacterGeneration = ({ onNavigate, currentStory, setStoryStep }: CharacterGenerationProps) => {
  const [generatedCharacters, setGeneratedCharacters] = useState<Character[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCharacters = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      const characters = [
        {
          id: 1,
          name: "Alex Chen",
          description: "A determined space explorer with cybernetic enhancements, wearing a sleek metallic suit. Short dark hair, piercing blue eyes, confident expression.",
          role: "Protagonist"
        },
        {
          id: 2,
          name: "Dr. Elena Vasquez",
          description: "A brilliant scientist and researcher, mid-40s with silver-streaked brown hair, wearing a lab coat over futuristic attire. Wise and compassionate.",
          role: "Mentor"
        },
        {
          id: 3,
          name: "Commander Zor",
          description: "An intimidating alien commander with scaled skin, towering height, and glowing red eyes. Wears ceremonial armor with ancient symbols.",
          role: "Antagonist"
        }
      ];
      setGeneratedCharacters(characters);
      setIsGenerating(false);
    }, 3000);
  };

  const handleProceedToScenes = () => {
    setStoryStep(3);
    onNavigate('scene-creation');
  };

  const updateCharacterDescription = (id: number, description: string) => {
    setGeneratedCharacters(prev => 
      prev.map(char => char.id === id ? { ...char, description } : char)
    );
  };

  return (
    <div className="h-full overflow-auto bg-slate-950">
      <div className="p-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('story-creation')}
          className="text-slate-400 hover:text-white hover:bg-slate-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Story
        </Button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Generate Characters</h1>
          <p className="text-slate-400">AI-generated characters for "{currentStory?.title}"</p>
        </div>

        <div className="max-w-6xl mx-auto">
          {!generatedCharacters.length ? (
            <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-xs">
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Generate Characters</h3>
                <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                  Based on your story "{currentStory?.title}", AI will create compelling characters with detailed descriptions for image generation.
                </p>
                <Button
                  onClick={handleGenerateCharacters}
                  disabled={isGenerating}
                  size="lg"
                  className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Generating Characters...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Characters
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {generatedCharacters.map((character) => (
                  <Card key={character.id} className="border border-slate-800 bg-slate-900/50 backdrop-blur-xs">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-white">
                        <span>{character.name}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-900/50 text-blue-300">
                          {character.role}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="aspect-square bg-linear-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
                        <div className="text-center text-slate-400">
                          <Users className="w-12 h-12 mx-auto mb-2" />
                          <p className="text-sm">Character Image</p>
                          <p className="text-xs">Will be generated</p>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-slate-300 text-sm font-medium">Character Description</Label>
                        <Textarea
                          value={character.description}
                          onChange={(e) => updateCharacterDescription(character.id, e.target.value)}
                          className="mt-2 min-h-[100px] bg-slate-800 border-slate-700 text-white text-sm"
                        />
                      </div>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Image
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleProceedToScenes}
                  size="lg"
                  className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                >
                  Proceed to Scene Creation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
