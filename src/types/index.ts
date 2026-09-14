export type CaseStatus = 'Needs Review' | 'In Progress' | 'Resolved';
export type Priority = 'Critical' | 'High' | 'Normal' | 'Low';
export type InputSource = 'Web' | 'Voice' | 'Form' | 'Email';
export type Language = 'English' | 'Hindi' | 'Bengali';

export type Category =
  | 'Employment & Training'
  | 'Education'
  | 'Documentation'
  | 'Community Support'
  | 'Other';

export interface ExtractedInformation {
  need: string;
  location: string;
  preferred_language: string;
  additional_context: string;
}

export interface RecommendedResource {
  name: string;
  description: string;
  reason: string;
  category?: string;
  eligibility?: string;
  contact?: string;
  source?: string;
}

export interface RecommendedAction {
  action: string;
  priority: Priority;
  reason: string;
}

export interface WebhookResponse {
  status: string;
  case_id: string;
  category: Category;
  urgency: Priority;
  confidence: number;
  summary: string;
  extracted_information: ExtractedInformation;
  recommended_resources: RecommendedResource[];
  recommended_actions: RecommendedAction[];
  human_review_required: boolean;
}

export interface CaseRecord {
  case_id: string;
  request_text: string;
  language: Language;
  source: InputSource;
  submitted_at: string;
  status: CaseStatus;
  analysis?: WebhookResponse;
}

export interface DemoScenario {
  id: string;
  label: string;
  description: string;
  request_text: string;
  language: Language;
  source: InputSource;
  response: WebhookResponse;
}

export interface ResourceItem {
  id: string;
  name: string;
  description: string;
  category: Category;
  eligibility: string;
  contact: string;
  source: string;
  isDemo: boolean;
}
