
import { useState } from 'react';
import { ArrowLeft, Film, Edit3, Sparkles, RefreshCw, Image, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface SceneCreationProps {
  onNavigate: (view: string) => void;
  currentStory: any;
}

type Scene = {
    id: number;
    title: string;
    script: string;
    transitionImages: Array<{ id: number; type: string; description: string }>;
    isExpanded: boolean;
}

export const SceneCreation = ({ onNavigate, currentStory }: SceneCreationProps) => {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingScene, setEditingScene] = useState(null);
  const [generatingImages, setGeneratingImages] = useState<Record<number, boolean>>({});

  const handleGenerateScenes = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generatedScenes = Array.from({ length: currentStory?.scenes || 5 }, (_, i) => ({
        id: i + 1,
        title: `Scene ${i + 1}`,
        script: `A compelling scene showing the progression of the story. Characters face new challenges while the plot advances toward the climax. The scene includes dynamic action, emotional depth, and visual storytelling elements that work perfectly with Google Veo.`,
        transitionImages: [],
        isExpanded: false
      }));
      setScenes(generatedScenes);
      setIsGenerating(false);
    }, 3000);
  };

  const handleGenerateTransitionImages = async (sceneId: number) => {
    setGeneratingImages(prev => ({ ...prev, [sceneId]: true }));
    
    setTimeout(() => {
      const images = [
        { id: 1, type: 'opening', description: 'Scene opening shot' },
        { id: 2, type: 'mid', description: 'Mid-scene action' },
        { id: 3, type: 'climax', description: 'Scene climax moment' },
        { id: 4, type: 'transition', description: 'Transition to next scene' }
      ];
      
      setScenes(prev => prev.map(scene => 
        scene.id === sceneId 
          ? { ...scene, transitionImages: images }
          : scene
      ));
      
      setGeneratingImages(prev => ({ ...prev, [sceneId]: false }));
    }, 2000);
  };

  const updateSceneScript = (sceneId: number, script: string) => {
    setScenes(prev => prev.map(scene => 
      scene.id === sceneId ? { ...scene, script } : scene
    ));
  };

  const toggleSceneExpanded = (sceneId: number) => {
    setScenes(prev => prev.map(scene => 
      scene.id === sceneId ? { ...scene, isExpanded: !scene.isExpanded } : scene
    ));
  };

  return (
    <div className="h-full overflow-auto bg-slate-950">
      <div className="p-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('character-generation')}
          className="text-slate-400 hover:text-white hover:bg-slate-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Characters
        </Button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Scene Creation</h1>
          <p className="text-slate-400">Create video scenes for "{currentStory?.title}"</p>
        </div>

        <div className="max-w-6xl mx-auto">
          {!scenes.length ? (
            <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-xs">
              <CardContent className="p-12 text-center">
                <Film className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Create Scenes</h3>
                <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                  Generate {currentStory?.scenes} scenes with character-integrated scripts optimized for Google Veo video generation.
                </p>
                <Button
                  onClick={handleGenerateScenes}
                  disabled={isGenerating}
                  size="lg"
                  className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Generating Scenes...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Scenes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {scenes.map((scene) => (
                <Card key={scene.id} className="border border-slate-800 bg-slate-900/50 backdrop-blur-xs">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-white">
                      <span className="flex items-center gap-2">
                        <Film className="w-5 h-5 text-emerald-400" />
                        {scene.title}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleSceneExpanded(scene.id)}
                          className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleGenerateTransitionImages(scene.id)}
                          disabled={generatingImages[scene.id]}
                          className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          {generatingImages[scene.id] ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <Image className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {scene.isExpanded ? (
                      <div>
                        <label className="text-sm font-medium text-slate-300">Scene Script (Google Veo Optimized)</label>
                        <Textarea
                          value={scene.script}
                          onChange={(e) => updateSceneScript(scene.id, e.target.value)}
                          className="mt-2 min-h-[120px] bg-slate-800 border-slate-700 text-white"
                        />
                      </div>
                    ) : (
                      <p className="text-slate-400 text-sm line-clamp-3">{scene.script}</p>
                    )}

                    {scene.transitionImages.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-slate-300 mb-3">Transition Images</h4>
                        <div className="grid grid-cols-4 gap-4">
                          {scene.transitionImages.map((image) => (
                            <div key={image.id} className="space-y-2">
                              <div className="aspect-square bg-linear-to-br from-slate-700 to-slate-800 rounded-lg border border-slate-700 flex items-center justify-center">
                                <div className="text-center text-slate-400">
                                  <Image className="w-6 h-6 mx-auto mb-1" />
                                  <p className="text-xs">{image.type}</p>
                                </div>
                              </div>
                              <p className="text-xs text-slate-400 text-center">{image.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Generate Video
                      </Button>
                      {!scene.transitionImages.length && (
                        <Button
                          size="sm"
                          onClick={() => handleGenerateTransitionImages(scene.id)}
                          disabled={generatingImages[scene.id]}
                          className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          Generate Images
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
