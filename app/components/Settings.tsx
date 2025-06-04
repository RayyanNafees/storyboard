
import { useState } from 'react';
import { ArrowLeft, Key, Save, Eye, EyeOff, Shield, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface SettingsProps {
  onNavigate: (view: string) => void;
}

export const Settings = ({ onNavigate }: SettingsProps) => {
  const [geminiKey, setGeminiKey] = useState('');
  const [imagen3Key, setImagen3Key] = useState('');
  const [veoKey, setVeoKey] = useState('');
  const [youtubeKey, setYoutubeKey] = useState('');
  const [showKeys, setShowKeys] = useState({
    gemini: false,
    imagen3: false,
    veo: false,
    youtube: false
  });

  const handleSave = () => {
    // Save API keys to localStorage or secure storage
    console.log('Saving API keys...');
  };

  const toggleKeyVisibility = (keyType: keyof typeof showKeys) => {
    setShowKeys(prev => ({
      ...prev,
      [keyType]: !prev[keyType]
    }));
  };

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
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-slate-400">Configure your AI integrations and preferences</p>
        </div>

        <div className="max-w-2xl">
          <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-xs mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Key className="w-5 h-5 text-indigo-400" />
                Google AI API Keys
              </CardTitle>
              <p className="text-sm text-slate-400">
                Securely store your API keys to enable AI-powered features
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-300">Security Notice</p>
                    <p className="text-xs text-blue-400 mt-1">
                      Your API keys are stored locally and never transmitted to our servers. 
                      Only you have access to your credentials.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="geminiKey" className="flex items-center gap-2 text-slate-300">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    Gemini API Key
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="geminiKey"
                      type={showKeys.gemini ? 'text' : 'password'}
                      value={geminiKey}
                      onChange={(e) => setGeminiKey(e.target.value)}
                      placeholder="Enter your Gemini API key..."
                      className="pr-10 bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => toggleKeyVisibility('gemini')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    >
                      {showKeys.gemini ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Used for story development and script generation
                  </p>
                </div>

                <Separator className="bg-slate-700" />

                <div>
                  <Label htmlFor="imagen3Key" className="flex items-center gap-2 text-slate-300">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Imagen 3 API Key
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="imagen3Key"
                      type={showKeys.imagen3 ? 'text' : 'password'}
                      value={imagen3Key}
                      onChange={(e) => setImagen3Key(e.target.value)}
                      placeholder="Enter your Imagen 3 API key..."
                      className="pr-10 bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => toggleKeyVisibility('imagen3')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    >
                      {showKeys.imagen3 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Used for character and scene image generation
                  </p>
                </div>

                <Separator className="bg-slate-700" />

                <div>
                  <Label htmlFor="veoKey" className="flex items-center gap-2 text-slate-300">
                    <Sparkles className="w-4 h-4 text-pink-400" />
                    Google Veo API Key
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="veoKey"
                      type={showKeys.veo ? 'text' : 'password'}
                      value={veoKey}
                      onChange={(e) => setVeoKey(e.target.value)}
                      placeholder="Enter your Google Veo API key..."
                      className="pr-10 bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => toggleKeyVisibility('veo')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    >
                      {showKeys.veo ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Used for video generation from scene scripts
                  </p>
                </div>

                <Separator className="bg-slate-700" />

                <div>
                  <Label htmlFor="youtubeKey" className="flex items-center gap-2 text-slate-300">
                    <Sparkles className="w-4 h-4 text-red-400" />
                    YouTube API Key
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="youtubeKey"
                      type={showKeys.youtube ? 'text' : 'password'}
                      value={youtubeKey}
                      onChange={(e) => setYoutubeKey(e.target.value)}
                      placeholder="Enter your YouTube API key..."
                      className="pr-10 bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => toggleKeyVisibility('youtube')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    >
                      {showKeys.youtube ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Used for uploading generated videos to YouTube
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSave}
                className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save API Keys
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-xs">
            <CardHeader>
              <CardTitle className="text-white">How to Get Your API Keys</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <h4 className="font-medium text-slate-200 mb-1">Gemini API</h4>
                  <p className="text-sm text-slate-400">
                    Visit Google AI Studio and create a new API key for Gemini models.
                  </p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <h4 className="font-medium text-slate-200 mb-1">Imagen 3 API</h4>
                  <p className="text-sm text-slate-400">
                    Access through Google Cloud Console under Vertex AI APIs.
                  </p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <h4 className="font-medium text-slate-200 mb-1">Google Veo API</h4>
                  <p className="text-sm text-slate-400">
                    Available through Google's experimental AI platform.
                  </p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <h4 className="font-medium text-slate-200 mb-1">YouTube API</h4>
                  <p className="text-sm text-slate-400">
                    Get from Google Cloud Console under YouTube Data API v3.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
