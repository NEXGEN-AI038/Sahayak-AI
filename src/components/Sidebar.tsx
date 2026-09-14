import {
  LayoutDashboard,
  FilePlus2,
  BrainCircuit,
  FolderOpen,
  BookOpen,
  Workflow,
  BarChart3,
  Settings,
  HeartHandshake,
} from 'lucide-react';

export type PageId =
  | 'dashboard'
  | 'submit'
  | 'analysis'
  | 'cases'
  | 'resources'
  | 'automation'
  | 'impact'
  | 'settings';

interface NavItem {
  id: PageId;
  label: string;
  icon: typeof LayoutDashboard;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'submit', label: 'Submit Request', icon: FilePlus2 },
  { id: 'analysis', label: 'AI Case Analysis', icon: BrainCircuit },
  { id: 'cases', label: 'Cases', icon: FolderOpen },
  { id: 'resources', label: 'Resources', icon: BookOpen },
  { id: 'automation', label: 'Automation', icon: Workflow },
  { id: 'impact', label: 'Impact', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({
  current,
  onNavigate,
  demoMode,
  webhookConnected,
}: {
  current: PageId;
  onNavigate: (page: PageId) => void;
  demoMode: boolean;
  webhookConnected: boolean;
}) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-brand-600 text-white flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 leading-tight">
              Sahayak AI
            </h1>
            <p className="text-[11px] text-gray-500 leading-tight">
              Turning requests into support
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = current === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon
                    className={`w-4.5 h-4.5 ${active ? 'text-brand-600' : 'text-gray-400'}`}
                    style={{ width: 18, height: 18 }}
                  />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-4 py-3 border-t border-gray-100 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Webhook</span>
          <span
            className={`flex items-center gap-1.5 font-medium ${webhookConnected ? 'text-accent-600' : 'text-gray-400'}`}
          >
            <span
              className={`w-2 h-2 rounded-full ${webhookConnected ? 'bg-accent-500' : 'bg-gray-300'}`}
            />
            {webhookConnected ? 'Connected' : 'Not set'}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Demo Mode</span>
          <span
            className={`flex items-center gap-1.5 font-medium ${demoMode ? 'text-warning-600' : 'text-gray-400'}`}
          >
            <span
              className={`w-2 h-2 rounded-full ${demoMode ? 'bg-warning-500' : 'bg-gray-300'}`}
            />
            {demoMode ? 'Active' : 'Off'}
          </span>
        </div>
      </div>
    </aside>
  );
}
