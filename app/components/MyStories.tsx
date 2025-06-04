
import { useState } from 'react';
import { ArrowLeft, Edit3, Users, Film, Image, Copy, Download, Upload, Video, RefreshCw, ChevronDown, ChevronUp, Play, Volume2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface MyStoriesProps {
  onNavigate: (view: string) => void;
  currentStory: any;
}

export const MyStories = ({ onNavigate, currentStory }: MyStoriesProps) => {
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedDialogs, setExpandedDialogs] = useState<{[key: number]: boolean}>({});
  const [characterModalOpen, setCharacterModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);

  // Mock data for characters
  const characters = [
    {
      id: 1,
      name: "Alex Chen",
      description: "A determined space explorer with cybernetic enhancements, wearing a sleek metallic suit. Short dark hair, piercing blue eyes, confident expression.",
      role: "Protagonist",
      voiceGenerated: true
    },
    {
      id: 2,
      name: "Dr. Elena Vasquez",
      description: "A brilliant scientist and researcher, mid-40s with silver-streaked brown hair, wearing a lab coat over futuristic attire. Wise and compassionate.",
      role: "Mentor",
      voiceGenerated: true
    },
    {
      id: 3,
      name: "Commander Zor",
      description: "An intimidating alien commander with scaled skin, towering height, and glowing red eyes. Wears ceremonial armor with ancient symbols.",
      role: "Antagonist",
      voiceGenerated: false
    }
  ];

  // Mock data for scene scripts with dialogs
  const sceneScripts = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    title: `Scene ${i + 1}`,
    prompt: `A compelling scene showing the progression of the story. Characters face new challenges while the plot advances toward the climax. The scene includes dynamic action, emotional depth, and visual storytelling elements that work perfectly with Google Veo.`,
    images: Array.from({ length: 4 }, (_, j) => ({
      id: j + 1,
      url: `/placeholder-scene-${i + 1}-${j + 1}.jpg`,
      description: `Scene ${i + 1} - Image ${j + 1}`
    })),
    dialogs: [
      {
        id: 1,
        character: "Narrator",
        type: "narration",
        text: "The space station hummed with activity as Alex prepared for the mission.",
        audioGenerated: true
      },
      {
        id: 2,
        character: "Alex Chen",
        type: "dialog",
        text: "Are you sure the coordinates are correct, Dr. Vasquez?",
        audioGenerated: true
      },
      {
        id: 3,
        character: "Dr. Elena Vasquez",
        type: "dialog",
        text: "I've checked them three times. This is our only chance.",
        audioGenerated: true
      },
      {
        id: 4,
        character: "Commander Zor",
        type: "dialog",
        text: "You humans are so naive. You walk into my trap willingly.",
        audioGenerated: false
      }
    ]
  }));

  const handleImageClick = (images: any[], index: number) => {
    setSelectedImages(images);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleDownload = (image: any) => {
    console.log('Downloading image:', image);
    // Simulate download
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleRegeneratePrompt = async (sceneId: number) => {
    console.log('Regenerating prompt for scene:', sceneId);
    // Simulate regeneration
  };

  const toggleDialogs = (sceneId: number) => {
    setExpandedDialogs(prev => ({
      ...prev,
      [sceneId]: !prev[sceneId]
    }));
  };

  const handleCharacterClick = (characterName: string) => {
    const character = characters.find(c => c.name === characterName);
    if (character) {
      setSelectedCharacter(character);
      setCharacterModalOpen(true);
    }
  };

  const generateCharacterVoice = (dialogId: number, sceneId: number) => {
    console.log('Generating voice for dialog:', dialogId, 'in scene:', sceneId);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % selectedImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + selectedImages.length) % selectedImages.length);
  };

  return (
    <div className="h-full overflow-auto bg-slate-950">
      <div className="p-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('dashboard')}
          className="text-slate-400 hover:text-white hover:bg-slate-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">{currentStory?.title}</h1>
          <p className="text-slate-400">Story details and scene management</p>
        </div>

        <div className="space-y-8">
          {/* Story Section */}
          <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white">
                <span className="flex items-center gap-2">
                  <Film className="w-5 h-5 text-blue-400" />
                  Story Overview
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Story
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-300 mb-2">Title</h4>
                  <p className="text-white">{currentStory?.title}</p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-300 mb-2">Description</h4>
                  <p className="text-slate-400">{currentStory?.description || currentStory?.concept}</p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <h4 className="font-medium text-slate-300 mb-1">Genre</h4>
                    <p className="text-slate-400">{currentStory?.genre}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-300 mb-1">Scenes</h4>
                    <p className="text-slate-400">{currentStory?.scenes}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-300 mb-1">Status</h4>
                    <p className="text-slate-400">{currentStory?.status}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Characters Section */}
          <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white">
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  Characters ({characters.length})
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Characters
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {characters.map((character) => (
                  <div key={character.id} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                    <div className="aspect-square bg-linear-to-br from-slate-700 to-slate-800 rounded-lg border border-slate-700 flex items-center justify-center mb-3">
                      <div className="text-center text-slate-400">
                        <Users className="w-8 h-8 mx-auto mb-1" />
                        <p className="text-xs">{character.name}</p>
                      </div>
                    </div>
                    <h4 className="font-medium text-white mb-1">{character.name}</h4>
                    <p className="text-xs text-blue-300 mb-2">{character.role}</p>
                    <p className="text-xs text-slate-400 line-clamp-3">{character.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Scene Scripts Section */}
          <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Film className="w-5 h-5 text-emerald-400" />
                Scene Scripts ({sceneScripts.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sceneScripts.map((scene) => (
                  <Card key={scene.id} className="border border-slate-700 bg-slate-800/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-sm flex items-center justify-between">
                        <span>{scene.title}</span>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(scene.prompt)}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 h-8 w-8 p-0"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRegeneratePrompt(scene.id)}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 h-8 w-8 p-0"
                          >
                            <RefreshCw className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-slate-400 text-xs line-clamp-3">{scene.prompt}</p>
                      
                      <div>
                        <h4 className="text-xs font-medium text-slate-300 mb-2">Scene Images ({scene.images.length})</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {scene.images.map((image, index) => (
                            <div
                              key={image.id}
                              onClick={() => handleImageClick(scene.images, index)}
                              className="relative aspect-square bg-linear-to-br from-slate-700 to-slate-800 rounded border border-slate-600 flex items-center justify-center cursor-pointer hover:bg-slate-600 transition-colors group"
                            >
                              <div className="text-center text-slate-400">
                                <Image className="w-4 h-4 mx-auto mb-1" />
                                <p className="text-xs">{image.id}</p>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDownload(image);
                                }}
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 hover:bg-slate-700"
                              >
                                <Download className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Dialogs Section */}
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleDialogs(scene.id)}
                            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 text-xs h-8"
                          >
                            <Volume2 className="w-3 h-3 mr-1" />
                            Dialogs ({scene.dialogs.length})
                            {expandedDialogs[scene.id] ? (
                              <ChevronUp className="w-3 h-3 ml-auto" />
                            ) : (
                              <ChevronDown className="w-3 h-3 ml-auto" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2">
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {scene.dialogs.map((dialog) => (
                              <div
                                key={dialog.id}
                                className={`p-2 rounded-lg ${
                                  dialog.type === 'narration' 
                                    ? 'bg-slate-700/30 border-l-2 border-blue-400' 
                                    : 'bg-slate-700/50'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <button
                                    onClick={() => handleCharacterClick(dialog.character)}
                                    className="text-xs font-medium text-blue-300 hover:text-blue-200 transition-colors"
                                  >
                                    {dialog.character}
                                  </button>
                                  <div className="flex gap-1">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => copyToClipboard(dialog.text)}
                                      className="h-5 w-5 p-0 text-slate-400 hover:text-white"
                                    >
                                      <Copy className="w-2 h-2" />
                                    </Button>
                                    {dialog.audioGenerated ? (
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-5 w-5 p-0 text-green-400 hover:text-green-300"
                                      >
                                        <Play className="w-2 h-2" />
                                      </Button>
                                    ) : (
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => generateCharacterVoice(dialog.id, scene.id)}
                                        className="h-5 w-5 p-0 text-slate-400 hover:text-white"
                                      >
                                        <Volume2 className="w-2 h-2" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                                <p className="text-xs text-slate-300">{dialog.text}</p>
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 text-xs h-8"
                        >
                          <Edit3 className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs h-8"
                        >
                          <Upload className="w-3 h-3 mr-1" />
                          Upload
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Video Editor Button */}
          <div className="flex justify-center">
            <Button
              onClick={() => onNavigate('video-editor')}
              size="lg"
              className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Video className="w-5 h-5 mr-2" />
              Edit with Video Editor
            </Button>
          </div>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {lightboxOpen && selectedImages.length > 0 && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-xl border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">
                  {selectedImages[currentImageIndex]?.description} ({currentImageIndex + 1} of {selectedImages.length})
                </h3>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDownload(selectedImages[currentImageIndex])}
                    className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    onClick={() => setLightboxOpen(false)}
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Close
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video bg-linear-to-br from-slate-700 to-slate-800 rounded-lg border border-slate-700 flex items-center justify-center">
                  <div className="text-center text-slate-400">
                    <Image className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-medium">{selectedImages[currentImageIndex]?.description}</p>
                    <p className="text-sm">High-resolution scene image</p>
                  </div>
                </div>
                {selectedImages.length > 1 && (
                  <>
                    <Button
                      onClick={prevImage}
                      variant="outline"
                      size="sm"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      ←
                    </Button>
                    <Button
                      onClick={nextImage}
                      variant="outline"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      →
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Character Modal */}
      {characterModalOpen && selectedCharacter && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-xl border border-slate-700 max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{selectedCharacter.name}</h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Character
                  </Button>
                  <Button
                    onClick={() => setCharacterModalOpen(false)}
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Close
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="aspect-square bg-linear-to-br from-slate-700 to-slate-800 rounded-lg border border-slate-700 flex items-center justify-center">
                  <div className="text-center text-slate-400">
                    <Users className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-medium">{selectedCharacter.name}</p>
                    <p className="text-sm">{selectedCharacter.role}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-300 mb-2">Role</h4>
                    <p className="text-blue-300">{selectedCharacter.role}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-300 mb-2">Description</h4>
                    <p className="text-slate-400 text-sm">{selectedCharacter.description}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-300 mb-2">Voice Status</h4>
                    <p className={`text-sm ${selectedCharacter.voiceGenerated ? 'text-green-400' : 'text-yellow-400'}`}>
                      {selectedCharacter.voiceGenerated ? 'Voice Generated' : 'Voice Pending'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
