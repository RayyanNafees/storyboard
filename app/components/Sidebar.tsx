
import { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Settings as SettingsIcon, Home, BookOpen, Users, Film, Video, Edit } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  currentStory: any;
  setCurrentStory: (story: any) => void;
}

export const Sidebar = ({ activeView, onNavigate, currentStory, setCurrentStory }: SidebarProps) => {
  const [storiesExpanded, setStoriesExpanded] = useState(false);
  const [stories] = useState([
    { id: 1, title: "The Space Adventure", scenes: 5, status: "complete" },
    { id: 2, title: "Medieval Quest", scenes: 8, status: "in-progress" },
    { id: 3, title: "Cyberpunk Chronicles", scenes: 6, status: "draft" }
  ]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'story-creation', label: 'Create Story', icon: BookOpen },
    { id: 'video-editor', label: 'Video Editor', icon: Video },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="w-80 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 shadow-2xl">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            AI Storyboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">Video Synthesis Platform</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeView === item.id
                  ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                activeView === item.id ? 'text-white' : 'text-slate-400'
              }`} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8">
          <button
            onClick={() => setStoriesExpanded(!storiesExpanded)}
            className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:bg-slate-800/60 hover:text-white rounded-xl transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <Film className="w-5 h-5 text-slate-400" />
              <span className="font-medium">My Stories</span>
            </div>
            {storiesExpanded ? (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {storiesExpanded && (
            <div className="mt-2 space-y-1 animate-fade-in">
              {stories.map((story) => (
                <button
                  key={story.id}
                  onClick={() => {
                    setCurrentStory(story);
                    onNavigate('my-stories');
                  }}
                  className={`w-full px-8 py-2 text-left text-sm rounded-lg transition-all duration-200 ${
                    currentStory?.id === story.id
                      ? 'bg-blue-900/50 text-blue-300 border-l-2 border-blue-500'
                      : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-300'
                  }`}
                >
                  <div className="truncate font-medium">{story.title}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span>{story.scenes} scenes</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      story.status === 'complete' ? 'bg-emerald-900/50 text-emerald-300' :
                      story.status === 'in-progress' ? 'bg-yellow-900/50 text-yellow-300' :
                      'bg-slate-700/50 text-slate-400'
                    }`}>
                      {story.status}
                    </span>
                  </div>
                </button>
              ))}
              <button className="w-full px-8 py-2 text-left text-sm text-blue-400 hover:bg-slate-800/40 rounded-lg transition-all duration-200 flex items-center gap-2">
                <Plus className="w-3 h-3" />
                New Story
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
