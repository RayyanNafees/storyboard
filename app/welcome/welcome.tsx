
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { StoryCreation } from '@/components/StoryCreation';
import { CharacterGeneration } from '@/components/CharacterGeneration';
import { SceneCreation } from '@/components/SceneCreation';
import { MyStories } from '@/components/MyStories';
import { VideoEditor } from '@/components/VideoEditor';
import { Settings } from '@/components/Settings';

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [currentStory, setCurrentStory] = useState(null);
  const [storyStep, setStoryStep] = useState(1); // 1: story, 2: characters, 3: scenes

  const renderMainContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveView} currentStory={currentStory} setCurrentStory={setCurrentStory} />;
      case 'story-creation':
        return <StoryCreation onNavigate={setActiveView} currentStory={currentStory} setCurrentStory={setCurrentStory} storyStep={storyStep} setStoryStep={setStoryStep} />;
      case 'character-generation':
        return <CharacterGeneration onNavigate={setActiveView} currentStory={currentStory} setStoryStep={setStoryStep} />;
      case 'scene-creation':
        return <SceneCreation onNavigate={setActiveView} currentStory={currentStory} />;
      case 'my-stories':
        return <MyStories onNavigate={setActiveView} currentStory={currentStory} />;
      case 'video-editor':
        return <VideoEditor onNavigate={setActiveView} />;
      case 'settings':
        return <Settings onNavigate={setActiveView} />;
      default:
        return <Dashboard onNavigate={setActiveView} currentStory={currentStory} setCurrentStory={setCurrentStory} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex dark">
      <Sidebar 
        activeView={activeView} 
        onNavigate={setActiveView}
        currentStory={currentStory}
        setCurrentStory={setCurrentStory}
      />
      <main className="flex-1 overflow-hidden">
        {renderMainContent()}
      </main>
    </div>
  );
};

export default Index;
