import { useState } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { Sidebar, type PageId } from '@/components/Sidebar';
import { Dashboard } from '@/pages/Dashboard';
import { SubmitRequest } from '@/pages/SubmitRequest';
import { CaseAnalysis } from '@/pages/CaseAnalysis';
import { Cases } from '@/pages/Cases';
import { Resources } from '@/pages/Resources';
import { Automation } from '@/pages/Automation';
import { Impact } from '@/pages/Impact';
import { Settings } from '@/pages/Settings';

function AppContent() {
  const [page, setPage] = useState<PageId>('dashboard');
  const { demoMode, webhookConnected } = useApp();

  const navigate = (p: PageId) => setPage(p);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        current={page}
        onNavigate={navigate}
        demoMode={demoMode}
        webhookConnected={webhookConnected}
      />
      <main className="flex-1 overflow-x-hidden">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {page === 'dashboard' && <Dashboard onNavigate={navigate} />}
          {page === 'submit' && <SubmitRequest onNavigate={navigate} />}
          {page === 'analysis' && <CaseAnalysis onNavigate={navigate} />}
          {page === 'cases' && <Cases onNavigate={navigate} />}
          {page === 'resources' && <Resources />}
          {page === 'automation' && <Automation />}
          {page === 'impact' && <Impact />}
          {page === 'settings' && <Settings />}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
