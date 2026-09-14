import type { DemoScenario, ResourceItem, CaseRecord } from '@/types';

export const demoScenarios: DemoScenario[] = [
  {
    id: 'employment',
    label: 'Employment & Training',
    description: 'A young person seeking job training and employment support',
    request_text:
      "My name is Ravi Kumar. I am 24 years old and I live in East Delhi. I completed my 12th grade but could not afford college. I am looking for any job training program or employment opportunity nearby. I can work in retail, delivery, or as a helper. I speak Hindi and understand basic English. Please help me find something so I can support my family.",
    language: 'English',
    source: 'Web',
    response: {
      status: 'success',
      case_id: 'CASE-DEMO-1',
      category: 'Employment & Training',
      urgency: 'Normal',
      confidence: 0.94,
      summary:
        'Ravi Kumar, a 24-year-old resident of East Delhi with a 12th-grade education, is seeking job training or employment. He is open to retail, delivery, or helper roles and speaks Hindi with basic English comprehension. His situation requires livelihood support and skill development guidance.',
      extracted_information: {
        need: 'Job training program or employment opportunity',
        location: 'East Delhi',
        preferred_language: 'Hindi',
        additional_context:
          '24 years old, completed 12th grade, unable to afford college, willing to work in retail/delivery/helper roles, needs to support family',
      },
      recommended_resources: [
        {
          name: 'Skill India Training Program',
          description:
            'Government-backed vocational training program offering short-term courses in retail, logistics, and customer service.',
          reason:
            'Matches Ravi\'s interest in retail and delivery work, and provides certified skill training for 12th-pass youth.',
          category: 'Employment & Training',
          eligibility: '18-35 years, 10th pass or equivalent',
          contact: 'Helpline: 1800-123-4567',
          source: 'Demo Resource',
        },
        {
          name: 'Local Employment Exchange — East Delhi',
          description:
            'District employment office that registers job seekers and connects them with nearby employers hiring for entry-level roles.',
          reason:
            'Directly relevant to Ravi\'s location and his openness to helper/delivery positions.',
          category: 'Employment & Training',
          eligibility: 'Residents of Delhi, 18+ years',
          contact: 'Office: Vikas Marg, Laxmi Nagar',
          source: 'Demo Resource',
        },
        {
          name: 'Livelihood Support Helpline',
          description:
            'A community helpline that provides guidance on nearby job fairs, skill workshops, and employer referrals.',
          reason:
            'Offers immediate next steps and connects Ravi with local hiring events.',
          category: 'Community Support',
          eligibility: 'Open to all',
          contact: 'Phone: 14567',
          source: 'Demo Resource',
        },
      ],
      recommended_actions: [
        {
          action: 'Register Ravi at the East Delhi Employment Exchange',
          priority: 'High',
          reason:
            'Immediate step to connect him with local employers hiring for entry-level roles.',
        },
        {
          action: 'Enroll Ravi in a 3-month Skill India retail/delivery training batch',
          priority: 'High',
          reason:
            'Builds certified skills that improve employability and earning potential.',
        },
        {
          action: 'Share upcoming local job fair schedule with Ravi',
          priority: 'Normal',
          reason:
            'Provides direct access to employers currently hiring in his area.',
        },
        {
          action: 'Follow up in 2 weeks to confirm registration and training enrollment',
          priority: 'Low',
          reason:
            'Ensures the support chain is working and identifies any blockers early.',
        },
      ],
      human_review_required: true,
    },
  },
  {
    id: 'education',
    label: 'Education Support',
    description: 'A parent seeking educational support for their child',
    request_text:
      "I am Sunita Devi from Kolkata. My daughter Priya is 14 years old and she is good at studies but we cannot afford books and school fees. She wants to become a doctor. I am looking for any scholarship or free education support so she can continue studying. We speak Bengali at home. Please help us find support.",
    language: 'Bengali',
    source: 'Voice',
    response: {
      status: 'success',
      case_id: 'CASE-DEMO-2',
      category: 'Education',
      urgency: 'High',
      confidence: 0.91,
      summary:
        'Sunita Devi from Kolkata is seeking educational financial support for her 14-year-old daughter Priya, an academically strong student aspiring to become a doctor. The family cannot afford books and school fees and speaks Bengali at home. Urgent intervention is needed to prevent disruption of education.',
      extracted_information: {
        need: 'Scholarship or free education support for school fees and books',
        location: 'Kolkata',
        preferred_language: 'Bengali',
        additional_context:
          'Daughter Priya is 14 years old, academically strong, aspires to become a doctor, family cannot afford fees and books',
      },
      recommended_resources: [
        {
          name: 'National Scholarship Portal',
          description:
            'Central government portal listing scholarships for school students from economically weaker sections.',
          reason:
            'Directly addresses the financial barrier for Priya\'s school education.',
          category: 'Education',
          eligibility: 'Students from EWS category, class 9-12',
          contact: 'Website: scholarships.gov.in',
          source: 'Demo Resource',
        },
        {
          name: 'Kolkata Free Education Aid Program',
          description:
            'A municipal program providing free textbooks and partial fee waivers for meritorious students from low-income families.',
          reason:
            'Matches Priya\'s location and academic merit, covers both books and fees.',
          category: 'Education',
          eligibility: 'Kolkata residents, family income below threshold',
          contact: 'Office: Kolkata Municipal Corporation',
          source: 'Demo Resource',
        },
        {
          name: 'Bengali Medium Learning Support Center',
          description:
            'Community learning center offering free after-school tutoring and mentoring in Bengali.',
          reason:
            'Provides ongoing academic support in Priya\'s preferred language.',
          category: 'Education',
          eligibility: 'School students, free of cost',
          contact: 'Phone: 98765-43210 (Demo)',
          source: 'Demo Resource',
        },
      ],
      recommended_actions: [
        {
          action: 'Help Sunita register Priya on the National Scholarship Portal',
          priority: 'High',
          reason:
            'Time-sensitive — scholarship application windows have deadlines.',
        },
        {
          action: 'Connect Sunita with the Kolkata Free Education Aid Program',
          priority: 'High',
          reason:
            'Immediate fee waiver and book support to prevent disruption of studies.',
        },
        {
          action: 'Assign a mentor from the Bengali Learning Support Center',
          priority: 'Normal',
          reason:
            'Long-term academic guidance to keep Priya on track toward her medical aspiration.',
        },
        {
          action: 'Follow up within 1 week to confirm scholarship application status',
          priority: 'High',
          reason:
            'Given the urgency, early confirmation ensures no deadline is missed.',
        },
      ],
      human_review_required: true,
    },
  },
  {
    id: 'documentation',
    label: 'Documentation Assistance',
    description: 'An elderly person needing help with identity documents',
    request_text:
      "I am Abdul Rahman, I am 68 years old and I live in Hyderabad. I lost my Aadhaar card and I do not have a voter ID. Because of this I cannot get my pension and ration. My neighbor is helping me write this. I need help to apply for new documents. I cannot walk far. Please help.",
    language: 'English',
    source: 'Form',
    response: {
      status: 'success',
      case_id: 'CASE-DEMO-3',
      category: 'Documentation',
      urgency: 'Critical',
      confidence: 0.97,
      summary:
        'Abdul Rahman, a 68-year-old resident of Hyderabad, has lost his Aadhaar card and lacks a voter ID, which has blocked his access to pension and ration benefits. He has limited mobility and is receiving help from a neighbor. Immediate documentation assistance is critical to restore his welfare access.',
      extracted_information: {
        need: 'Replacement Aadhaar card and new voter ID application',
        location: 'Hyderabad',
        preferred_language: 'English',
        additional_context:
          '68 years old, lost Aadhaar, no voter ID, cannot access pension or ration, limited mobility, neighbor assisting',
      },
      recommended_resources: [
        {
          name: 'Aadhaar Enrollment/Update Center — Hyderabad',
          description:
            'Official UIDAI center for Aadhaar card replacement and biometric updates.',
          reason:
            'Directly addresses the lost Aadhaar card, which is blocking pension and ration access.',
          category: 'Documentation',
          eligibility: 'All residents of India',
          contact: 'UIDAI Helpline: 1947',
          source: 'Demo Resource',
        },
        {
          name: 'Home-Based Document Assistance Service',
          description:
            'A community service that helps elderly and mobility-limited residents with document applications through home visits.',
          reason:
            'Abdul Rahman has limited mobility and cannot visit offices easily.',
          category: 'Community Support',
          eligibility: 'Elderly and persons with disabilities',
          contact: 'Helpline: 1800-111-222 (Demo)',
          source: 'Demo Resource',
        },
        {
          name: 'Pension and Ration Restoration Desk',
          description:
            'A welfare office that helps restore suspended pension and ration benefits once identity documents are reissued.',
          reason:
            'Once documents are restored, Abdul Rahman needs immediate reactivation of his benefits.',
          category: 'Documentation',
          eligibility: 'Existing beneficiaries with lapsed documentation',
          contact: 'Office: GHMC, Hyderabad',
          source: 'Demo Resource',
        },
      ],
      recommended_actions: [
        {
          action: 'Arrange a home visit for Aadhaar biometric re-enrollment',
          priority: 'Critical',
          reason:
            'Abdul Rahman cannot walk far; a home visit is the only viable path to restore his Aadhaar.',
        },
        {
          action: 'Initiate voter ID application through the Home-Based Assistance Service',
          priority: 'High',
          reason:
            'Second document needed to restore full welfare access; can be done during the same home visit.',
        },
        {
          action: 'Flag pension and ration accounts for temporary hold',
          priority: 'Critical',
          reason:
            'Prevents permanent cancellation while documents are being reissued.',
        },
        {
          action: 'Follow up within 3 days to confirm Aadhaar application is submitted',
          priority: 'High',
          reason:
            'Given the critical urgency, close monitoring is needed to prevent prolonged benefit loss.',
        },
      ],
      human_review_required: true,
    },
  },
];

export const demoResources: ResourceItem[] = [
  {
    id: 'res-1',
    name: 'Skill India Training Program',
    description:
      'Government-backed vocational training offering short-term certified courses in retail, logistics, customer service, and IT.',
    category: 'Employment & Training',
    eligibility: 'Ages 18-35, 10th pass or equivalent',
    contact: 'Helpline: 1800-123-4567 (Demo)',
    source: 'Demo Resource',
    isDemo: true,
  },
  {
    id: 'res-2',
    name: 'Local Employment Exchange — East Delhi',
    description:
      'District employment office that registers job seekers and connects them with nearby employers for entry-level roles.',
    category: 'Employment & Training',
    eligibility: 'Residents of Delhi, 18+ years',
    contact: 'Office: Vikas Marg, Laxmi Nagar (Demo)',
    source: 'Demo Resource',
    isDemo: true,
  },
  {
    id: 'res-3',
    name: 'National Scholarship Portal',
    description:
      'Central government portal listing scholarships for school students from economically weaker sections.',
    category: 'Education',
    eligibility: 'Students from EWS category, class 9-12',
    contact: 'Website: scholarships.gov.in (Demo)',
    source: 'Demo Resource',
    isDemo: true,
  },
  {
    id: 'res-4',
    name: 'Kolkata Free Education Aid Program',
    description:
      'Municipal program providing free textbooks and partial fee waivers for meritorious students from low-income families.',
    category: 'Education',
    eligibility: 'Kolkata residents, family income below threshold',
    contact: 'Office: Kolkata Municipal Corporation (Demo)',
    source: 'Demo Resource',
    isDemo: true,
  },
  {
    id: 'res-5',
    name: 'Bengali Medium Learning Support Center',
    description:
      'Community learning center offering free after-school tutoring and mentoring in Bengali.',
    category: 'Education',
    eligibility: 'School students, free of cost',
    contact: 'Phone: 98765-43210 (Demo)',
    source: 'Demo Resource',
    isDemo: true,
  },
  {
    id: 'res-6',
    name: 'Aadhaar Enrollment/Update Center — Hyderabad',
    description:
      'Official UIDAI center for Aadhaar card replacement and biometric updates.',
    category: 'Documentation',
    eligibility: 'All residents of India',
    contact: 'UIDAI Helpline: 1947 (Demo)',
    source: 'Demo Resource',
    isDemo: true,
  },
  {
    id: 'res-7',
    name: 'Home-Based Document Assistance Service',
    description:
      'Community service helping elderly and mobility-limited residents with document applications through home visits.',
    category: 'Documentation',
    eligibility: 'Elderly and persons with disabilities',
    contact: 'Helpline: 1800-111-222 (Demo)',
    source: 'Demo Resource',
    isDemo: true,
  },
  {
    id: 'res-8',
    name: 'Pension and Ration Restoration Desk',
    description:
      'Welfare office that helps restore suspended pension and ration benefits once identity documents are reissued.',
    category: 'Documentation',
    eligibility: 'Existing beneficiaries with lapsed documentation',
    contact: 'Office: GHMC, Hyderabad (Demo)',
    source: 'Demo Resource',
    isDemo: true,
  },
  {
    id: 'res-9',
    name: 'Livelihood Support Helpline',
    description:
      'Community helpline providing guidance on nearby job fairs, skill workshops, and employer referrals.',
    category: 'Community Support',
    eligibility: 'Open to all',
    contact: 'Phone: 14567 (Demo)',
    source: 'Demo Resource',
    isDemo: true,
  },
  {
    id: 'res-10',
    name: 'Community Welfare Support Center',
    description:
      'Multi-service community center offering food, clothing, and emergency support referrals.',
    category: 'Community Support',
    eligibility: 'Open to all residents',
    contact: 'Walk-in or phone (Demo)',
    source: 'Demo Resource',
    isDemo: true,
  },
  {
    id: 'res-11',
    name: 'Digital Literacy Training Center',
    description:
      'Free weekend workshops on basic computer skills, internet usage, and online form filling.',
    category: 'Employment & Training',
    eligibility: 'Ages 16+, no prior experience needed',
    contact: 'Community centers across cities (Demo)',
    source: 'Demo Resource',
    isDemo: true,
  },
  {
    id: 'res-12',
    name: 'Women\'s Skill Development Program',
    description:
      'Tailoring, handicraft, and micro-enterprise training for women seeking self-employment opportunities.',
    category: 'Employment & Training',
    eligibility: 'Women aged 18-50',
    contact: 'NGO partner centers (Demo)',
    source: 'Demo Resource',
    isDemo: true,
  },
];

export const demoCases: CaseRecord[] = [
  {
    case_id: 'CASE-1001',
    request_text:
      'I need help finding a job. I am 22 and have finished 10th standard.',
    language: 'English',
    source: 'Web',
    submitted_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'Needs Review',
    analysis: {
      status: 'success',
      case_id: 'CASE-1001',
      category: 'Employment & Training',
      urgency: 'Normal',
      confidence: 0.89,
      summary:
        'A 22-year-old with 10th-grade education is seeking employment assistance.',
      extracted_information: {
        need: 'Job placement assistance',
        location: 'Not specified',
        preferred_language: 'English',
        additional_context: '22 years old, 10th standard completed',
      },
      recommended_resources: [
        {
          name: 'Skill India Training Program',
          description: 'Vocational training for youth.',
          reason: 'Matches the applicant\'s education level and age.',
        },
      ],
      recommended_actions: [
        {
          action: 'Register at local employment exchange',
          priority: 'High',
          reason: 'Immediate step for job placement.',
        },
      ],
      human_review_required: true,
    },
  },
  {
    case_id: 'CASE-1002',
    request_text:
      'My son needs school books. We cannot afford them. He is in 8th grade.',
    language: 'Hindi',
    source: 'Voice',
    submitted_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    status: 'In Progress',
    analysis: {
      status: 'success',
      case_id: 'CASE-1002',
      category: 'Education',
      urgency: 'High',
      confidence: 0.92,
      summary:
        'A parent is seeking free textbooks for their 8th-grade son due to financial constraints.',
      extracted_information: {
        need: 'Free school books',
        location: 'Not specified',
        preferred_language: 'Hindi',
        additional_context: 'Son in 8th grade, family cannot afford books',
      },
      recommended_resources: [
        {
          name: 'National Scholarship Portal',
          description: 'Scholarships for EWS students.',
          reason: 'Addresses financial barrier for education.',
        },
      ],
      recommended_actions: [
        {
          action: 'Connect family with free textbook program',
          priority: 'High',
          reason: 'Books needed before academic term begins.',
        },
      ],
      human_review_required: true,
    },
  },
  {
    case_id: 'CASE-1003',
    request_text:
      'I lost my Aadhaar card and need a new one. I am 70 years old.',
    language: 'English',
    source: 'Form',
    submitted_at: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    status: 'Resolved',
    analysis: {
      status: 'success',
      case_id: 'CASE-1003',
      category: 'Documentation',
      urgency: 'Critical',
      confidence: 0.96,
      summary:
        'A 70-year-old has lost their Aadhaar card and needs a replacement.',
      extracted_information: {
        need: 'Aadhaar card replacement',
        location: 'Not specified',
        preferred_language: 'English',
        additional_context: '70 years old, lost Aadhaar card',
      },
      recommended_resources: [
        {
          name: 'Aadhaar Enrollment Center',
          description: 'Official UIDAI center for replacements.',
          reason: 'Directly addresses the lost card.',
        },
      ],
      recommended_actions: [
        {
          action: 'Book appointment at nearest Aadhaar center',
          priority: 'Critical',
          reason: 'Needed to restore identity documentation.',
        },
      ],
      human_review_required: true,
    },
  },
  {
    case_id: 'CASE-1004',
    request_text:
      'We need help with food supplies. Our family of five has no income right now.',
    language: 'Bengali',
    source: 'Web',
    submitted_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    status: 'Needs Review',
    analysis: {
      status: 'success',
      case_id: 'CASE-1004',
      category: 'Community Support',
      urgency: 'High',
      confidence: 0.88,
      summary:
        'A family of five with no current income needs emergency food supplies.',
      extracted_information: {
        need: 'Emergency food supplies',
        location: 'Not specified',
        preferred_language: 'Bengali',
        additional_context: 'Family of five, no income',
      },
      recommended_resources: [
        {
          name: 'Community Welfare Support Center',
          description: 'Food and emergency support.',
          reason: 'Immediate food assistance available.',
        },
      ],
      recommended_actions: [
        {
          action: 'Connect family with community food program',
          priority: 'High',
          reason: 'Urgent food security need.',
        },
      ],
      human_review_required: true,
    },
  },
  {
    case_id: 'CASE-1005',
    request_text:
      'I want to learn computer skills so I can get a better job.',
    language: 'English',
    source: 'Web',
    submitted_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    status: 'In Progress',
    analysis: {
      status: 'success',
      case_id: 'CASE-1005',
      category: 'Employment & Training',
      urgency: 'Normal',
      confidence: 0.90,
      summary:
        'An individual wants to learn computer skills to improve employment prospects.',
      extracted_information: {
        need: 'Computer skills training',
        location: 'Not specified',
        preferred_language: 'English',
        additional_context: 'Seeking better job through digital literacy',
      },
      recommended_resources: [
        {
          name: 'Digital Literacy Training Center',
          description: 'Free weekend computer workshops.',
          reason: 'Directly matches the training request.',
        },
      ],
      recommended_actions: [
        {
          action: 'Enroll in weekend digital literacy workshop',
          priority: 'Normal',
          reason: 'Builds skills for better employment.',
        },
      ],
      human_review_required: true,
    },
  },
  {
    case_id: 'CASE-1006',
    request_text:
      'My daughter wants to study science but our school does not have a lab.',
    language: 'Hindi',
    source: 'Voice',
    submitted_at: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
    status: 'Resolved',
    analysis: {
      status: 'success',
      case_id: 'CASE-1006',
      category: 'Education',
      urgency: 'Normal',
      confidence: 0.85,
      summary:
        'A parent is seeking science education support for their daughter whose school lacks a lab.',
      extracted_information: {
        need: 'Science education support',
        location: 'Not specified',
        preferred_language: 'Hindi',
        additional_context: 'Daughter wants to study science, school has no lab',
      },
      recommended_resources: [
        {
          name: 'Bengali Medium Learning Support Center',
          description: 'After-school tutoring and mentoring.',
          reason: 'Provides supplementary science education.',
        },
      ],
      recommended_actions: [
        {
          action: 'Connect student with online science learning resources',
          priority: 'Normal',
          reason: 'Compensates for lack of school lab facilities.',
        },
      ],
      human_review_required: true,
    },
  },
];
