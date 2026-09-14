import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { CaseRecord, WebhookResponse } from '@/types';
import { demoCases } from '@/data/demoData';
import { isWebhookConfigured } from '@/services/makeWebhook';

interface AppContextValue {
  cases: CaseRecord[];
  addCase: (record: CaseRecord) => void;
  updateCaseAnalysis: (caseId: string, analysis: WebhookResponse) => void;
  updateCaseStatus: (caseId: string, status: CaseRecord['status']) => void;
  demoMode: boolean;
  setDemoMode: (val: boolean) => void;
  webhookConnected: boolean;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const webhookReady = isWebhookConfigured();
  const [cases, setCases] = useState<CaseRecord[]>(demoCases);
  const [demoMode, setDemoMode] = useState(!webhookReady);

  const addCase = useCallback((record: CaseRecord) => {
    setCases((prev) => [record, ...prev]);
  }, []);

  const updateCaseAnalysis = useCallback(
    (caseId: string, analysis: WebhookResponse) => {
      setCases((prev) =>
        prev.map((c) =>
          c.case_id === caseId
            ? { ...c, analysis: { ...analysis, case_id: caseId } }
            : c,
        ),
      );
    },
    [],
  );

  const updateCaseStatus = useCallback(
    (caseId: string, status: CaseRecord['status']) => {
      setCases((prev) =>
        prev.map((c) => (c.case_id === caseId ? { ...c, status } : c)),
      );
    },
    [],
  );

  return (
    <AppContext.Provider
      value={{
        cases,
        addCase,
        updateCaseAnalysis,
        updateCaseStatus,
        demoMode,
        setDemoMode,
        webhookConnected: webhookReady,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
