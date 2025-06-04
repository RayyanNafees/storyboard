
import { useState } from 'react';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, Settings, Download, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface VideoEditorProps {
  onNavigate: (view: string) => void;
}

export const VideoEditor = ({ onNavigate }: VideoEditorProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState([0]);
  const [volume, setVolume] = useState([50]);

  // Mock timeline data
  const timelineItems = [
    { id: 1, type: 'video', name: 'Scene 1', duration: 5, start: 0, color: 'bg-blue-500' },
    { id: 2, type: 'video', name: 'Scene 2', duration: 4, start: 5, color: 'bg-green-500' },
    { id: 3, type: 'video', name: 'Scene 3', duration: 6, start: 9, color: 'bg-purple-500' },
    { id: 4, type: 'audio', name: 'Background Music', duration: 15, start: 0, color: 'bg-yellow-500' },
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
          <h1 className="text-3xl font-bold text-white">Video Editor</h1>
          <p className="text-slate-400">Edit and compose your story scenes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Preview Panel */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-xs">
              <CardContent className="p-4">
                <div className="aspect-video bg-black rounded-lg border border-slate-700 flex items-center justify-center mb-4">
                  <div className="text-center text-slate-400">
                    <Play className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg">Video Preview</p>
                    <p className="text-sm">Your composed video will appear here</p>
                  </div>
                </div>
                
                {/* Video Controls */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                      <SkipForward className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex-1">
                      <Slider
                        value={currentTime}
                        onValueChange={setCurrentTime}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-slate-400" />
                      <Slider
                        value={volume}
                        onValueChange={setVolume}
                        max={100}
                        step={1}
                        className="w-20"
                      />
                    </div>
                  </div>
                  
                  <div className="text-sm text-slate-400">
                    00:00 / 15:00
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-xs">
              <CardHeader>
                <CardTitle className="text-white text-lg">Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['Video Track 1', 'Video Track 2', 'Audio Track'].map((track, index) => (
                    <div key={track} className="relative">
                      <div className="text-xs text-slate-400 mb-1">{track}</div>
                      <div className="h-12 bg-slate-800 rounded border border-slate-700 relative overflow-hidden">
                        {timelineItems
                          .filter(item => 
                            (index === 0 && item.type === 'video' && item.id <= 2) ||
                            (index === 1 && item.type === 'video' && item.id > 2) ||
                            (index === 2 && item.type === 'audio')
                          )
                          .map((item) => (
                            <div
                              key={item.id}
                              className={`absolute top-1 bottom-1 ${item.color} rounded text-xs text-white flex items-center justify-center cursor-pointer hover:opacity-80`}
                              style={{
                                left: `${(item.start / 15) * 100}%`,
                                width: `${(item.duration / 15) * 100}%`
                              }}
                            >
                              {item.name}
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Properties Panel */}
          <div className="space-y-4">
            <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-xs">
              <CardHeader>
                <CardTitle className="text-white text-lg">Project</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Scenes
                  </Button>
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-xs">
              <CardHeader>
                <CardTitle className="text-white text-lg">Scene Library</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className="p-2 bg-slate-800/50 rounded border border-slate-700 hover:bg-slate-700/50 cursor-pointer">
                      <div className="aspect-video bg-slate-700 rounded mb-2"></div>
                      <p className="text-xs text-slate-300">Scene {i + 1}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
