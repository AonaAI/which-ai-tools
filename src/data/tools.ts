export type Category = 'Chatbots' | 'Code Assistants' | 'Image Gen' | 'Writing' | 'Data Analysis' | 'Other';
export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface AITool {
  name: string;
  slug: string;
  category: Category;
  description: string;
  riskScore: number; // 1-10
  dataHandling: {
    storage: string;
    retention: string;
    training: string;
  };
  compliance: {
    soc2: boolean;
    gdpr: boolean;
    hipaa: boolean;
  };
  riskFactors: string[];
  recommendations: string[];
}

export const tools: AITool[] = [
  // CHATBOTS
  {
    name: 'ChatGPT',
    slug: 'chatgpt',
    category: 'Chatbots',
    description: 'OpenAI\'s conversational AI assistant for general-purpose tasks',
    riskScore: 6,
    dataHandling: {
      storage: 'US-based servers (OpenAI)',
      retention: '30 days default, can opt-out',
      training: 'Uses data for training unless opted out',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Default training on user inputs',
      'Data retention for model improvement',
      'No HIPAA compliance',
      'Potential for sensitive data exposure',
    ],
    recommendations: [
      'Disable chat history and training',
      'Avoid sharing proprietary or sensitive data',
      'Use enterprise plan for better controls',
      'Implement DLP policies',
    ],
  },
  {
    name: 'Claude',
    slug: 'claude',
    category: 'Chatbots',
    description: 'Anthropic\'s AI assistant focused on helpful, harmless, and honest interactions',
    riskScore: 4,
    dataHandling: {
      storage: 'US-based servers (AWS)',
      retention: 'Not used for training by default',
      training: 'Does not train on user conversations',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: true,
    },
    riskFactors: [
      'Third-party cloud infrastructure',
      'Limited data residency options',
    ],
    recommendations: [
      'Preferred for sensitive conversations',
      'Still avoid PII and confidential data',
      'Use Claude for Enterprise for compliance needs',
    ],
  },
  {
    name: 'Google Gemini',
    slug: 'google-gemini',
    category: 'Chatbots',
    description: 'Google\'s multimodal AI model integrated with Google services',
    riskScore: 7,
    dataHandling: {
      storage: 'Google Cloud (global)',
      retention: 'Up to 18 months for improvements',
      training: 'May use data for model training',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Integration with Google ecosystem',
      'Long data retention periods',
      'Training on user data by default',
      'Extensive data collection',
    ],
    recommendations: [
      'Review Google Workspace policies',
      'Disable activity logging where possible',
      'Avoid confidential business data',
    ],
  },
  {
    name: 'Perplexity AI',
    slug: 'perplexity',
    category: 'Chatbots',
    description: 'AI-powered search and answer engine with citations',
    riskScore: 5,
    dataHandling: {
      storage: 'US-based servers',
      retention: 'Search history stored indefinitely',
      training: 'May use queries for improvements',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'No SOC 2 certification',
      'Search history retention',
      'Limited enterprise controls',
    ],
    recommendations: [
      'Use for research, not sensitive queries',
      'Regularly clear search history',
      'Avoid company-specific searches',
    ],
  },
  {
    name: 'DeepSeek',
    slug: 'deepseek',
    category: 'Chatbots',
    description: 'Chinese AI chatbot and coding assistant',
    riskScore: 9,
    dataHandling: {
      storage: 'China-based servers',
      retention: 'Indefinite retention',
      training: 'Uses all data for training',
    },
    compliance: {
      soc2: false,
      gdpr: false,
      hipaa: false,
    },
    riskFactors: [
      'Data stored in China',
      'Subject to Chinese data laws',
      'No western compliance certifications',
      'High data security concerns',
      'Unclear privacy policies',
    ],
    recommendations: [
      'Avoid for enterprise use',
      'Do not share any business data',
      'Block at organizational level',
    ],
  },
  {
    name: 'Microsoft Copilot',
    slug: 'microsoft-copilot',
    category: 'Chatbots',
    description: 'Microsoft\'s AI assistant integrated with Microsoft 365',
    riskScore: 3,
    dataHandling: {
      storage: 'Microsoft Cloud (regional)',
      retention: 'Follows M365 retention policies',
      training: 'Does not train on tenant data',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: true,
    },
    riskFactors: [
      'Requires Microsoft 365 integration',
      'Permissions inherit from M365',
    ],
    recommendations: [
      'Best option for Microsoft shops',
      'Configure data governance policies',
      'Monitor usage through M365 admin',
    ],
  },

  // CODE ASSISTANTS
  {
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    category: 'Code Assistants',
    description: 'AI pair programmer from GitHub and OpenAI',
    riskScore: 5,
    dataHandling: {
      storage: 'GitHub/Microsoft servers',
      retention: 'Code snippets for telemetry',
      training: 'Does not train on Business/Enterprise',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Sends code snippets to cloud',
      'Potential IP leakage',
      'License compliance questions',
    ],
    recommendations: [
      'Use Business or Enterprise plan',
      'Disable telemetry',
      'Review generated code licenses',
      'Block in high-security repos',
    ],
  },
  {
    name: 'Cursor',
    slug: 'cursor',
    category: 'Code Assistants',
    description: 'AI-first code editor built on VS Code',
    riskScore: 6,
    dataHandling: {
      storage: 'Third-party cloud providers',
      retention: 'Code context for sessions',
      training: 'Privacy mode available',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Entire codebase context sent to cloud',
      'No SOC 2 certification yet',
      'Third-party AI models',
    ],
    recommendations: [
      'Enable privacy mode',
      'Avoid on proprietary codebases',
      'Use for personal projects only',
    ],
  },
  {
    name: 'Tabnine',
    slug: 'tabnine',
    category: 'Code Assistants',
    description: 'AI code completion with on-premise options',
    riskScore: 3,
    dataHandling: {
      storage: 'On-premise or cloud options',
      retention: 'Configurable retention',
      training: 'Can train on your code privately',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Cloud version sends code snippets',
      'Requires configuration for security',
    ],
    recommendations: [
      'Use self-hosted deployment',
      'Best for security-conscious teams',
      'Configure private model training',
    ],
  },
  {
    name: 'Codeium',
    slug: 'codeium',
    category: 'Code Assistants',
    description: 'Free AI code completion and chat',
    riskScore: 7,
    dataHandling: {
      storage: 'Cloud-based',
      retention: 'May retain code for improvements',
      training: 'Free tier may use data',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Free model raises monetization questions',
      'Limited enterprise controls',
      'No SOC 2 certification',
    ],
    recommendations: [
      'Avoid for commercial code',
      'Use only for learning/personal projects',
      'Review terms carefully',
    ],
  },
  {
    name: 'Amazon CodeWhisperer',
    slug: 'amazon-codewhisperer',
    category: 'Code Assistants',
    description: 'AWS\'s AI coding companion',
    riskScore: 4,
    dataHandling: {
      storage: 'AWS infrastructure',
      retention: 'Follows AWS data policies',
      training: 'Does not train on customer code',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: true,
    },
    riskFactors: [
      'Requires AWS account',
      'Limited to AWS ecosystem',
    ],
    recommendations: [
      'Good for AWS shops',
      'Configure IAM policies',
      'Enable security scanning features',
    ],
  },
  {
    name: 'Replit AI',
    slug: 'replit-ai',
    category: 'Code Assistants',
    description: 'AI assistant built into Replit IDE',
    riskScore: 8,
    dataHandling: {
      storage: 'Replit cloud servers',
      retention: 'All code stored on platform',
      training: 'May use public repls for training',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'All code hosted on Replit',
      'Public repls are fully exposed',
      'Limited enterprise features',
    ],
    recommendations: [
      'Use for prototypes only',
      'Never use for proprietary code',
      'Suitable for education/learning',
    ],
  },

  // IMAGE GENERATION
  {
    name: 'Midjourney',
    slug: 'midjourney',
    category: 'Image Gen',
    description: 'AI art generator via Discord',
    riskScore: 7,
    dataHandling: {
      storage: 'Cloud servers, Discord',
      retention: 'All images public by default',
      training: 'Uses all images for training',
    },
    compliance: {
      soc2: false,
      gdpr: false,
      hipaa: false,
    },
    riskFactors: [
      'All images public unless on premium plan',
      'Discord-based workflow',
      'No enterprise compliance',
      'Copyright questions',
    ],
    recommendations: [
      'Never generate images with sensitive content',
      'Use private mode (paid plan)',
      'Assume all prompts are visible',
    ],
  },
  {
    name: 'DALL-E',
    slug: 'dall-e',
    category: 'Image Gen',
    description: 'OpenAI\'s image generation model',
    riskScore: 5,
    dataHandling: {
      storage: 'OpenAI servers',
      retention: '30 days, then may be used for training',
      training: 'May use for model improvements',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Images may be used for training',
      'Content policy restrictions',
      'Limited commercial use clarity',
    ],
    recommendations: [
      'Review OpenAI usage policies',
      'Avoid generating branded content',
      'Use API for better control',
    ],
  },
  {
    name: 'Stable Diffusion',
    slug: 'stable-diffusion',
    category: 'Image Gen',
    description: 'Open-source image generation model',
    riskScore: 2,
    dataHandling: {
      storage: 'Self-hosted or third-party',
      retention: 'Depends on deployment',
      training: 'Model is open-source',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Third-party hosts vary in security',
      'Self-hosting requires infrastructure',
    ],
    recommendations: [
      'Self-host for sensitive use',
      'Best for creative control',
      'Verify third-party host security',
    ],
  },
  {
    name: 'Adobe Firefly',
    slug: 'adobe-firefly',
    category: 'Image Gen',
    description: 'Adobe\'s AI image generator for creative workflows',
    riskScore: 3,
    dataHandling: {
      storage: 'Adobe Cloud',
      retention: 'Follows Adobe Creative Cloud policies',
      training: 'Trained on Adobe Stock and licensed content',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Adobe Creative Cloud dependency',
      'Subscription required',
    ],
    recommendations: [
      'Best for Adobe users',
      'Commercial use safe',
      'Good copyright protection',
    ],
  },
  {
    name: 'Leonardo AI',
    slug: 'leonardo-ai',
    category: 'Image Gen',
    description: 'AI art platform for game assets and creative work',
    riskScore: 6,
    dataHandling: {
      storage: 'Cloud-based',
      retention: 'Images stored indefinitely',
      training: 'Public images may be used',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'No enterprise compliance',
      'Public gallery exposure',
    ],
    recommendations: [
      'Use private generation mode',
      'Review licensing for commercial use',
    ],
  },

  // WRITING TOOLS
  {
    name: 'Grammarly',
    slug: 'grammarly',
    category: 'Writing',
    description: 'AI writing assistant and grammar checker',
    riskScore: 5,
    dataHandling: {
      storage: 'US-based cloud',
      retention: 'Stores all typed content',
      training: 'Uses data for improvements',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Captures all typed text',
      'Browser extension has broad permissions',
      'No HIPAA compliance',
    ],
    recommendations: [
      'Use Business plan for better controls',
      'Disable on sensitive documents',
      'Review data retention policies',
    ],
  },
  {
    name: 'Jasper',
    slug: 'jasper',
    category: 'Writing',
    description: 'AI content generation platform for marketing',
    riskScore: 4,
    dataHandling: {
      storage: 'AWS cloud',
      retention: 'Indefinite content storage',
      training: 'Does not train on customer content',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Stores all generated content',
      'Third-party AI models',
    ],
    recommendations: [
      'Good for marketing teams',
      'Review output for accuracy',
      'Use brand voice features',
    ],
  },
  {
    name: 'Copy.ai',
    slug: 'copy-ai',
    category: 'Writing',
    description: 'AI copywriting tool for marketing and sales',
    riskScore: 5,
    dataHandling: {
      storage: 'Cloud-based',
      retention: 'Stores inputs and outputs',
      training: 'May use data for improvements',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'No SOC 2 certification',
      'Limited enterprise features',
    ],
    recommendations: [
      'Use for marketing copy only',
      'Avoid proprietary information',
      'Review generated content',
    ],
  },
  {
    name: 'Writesonic',
    slug: 'writesonic',
    category: 'Writing',
    description: 'AI writing tool for content creation',
    riskScore: 6,
    dataHandling: {
      storage: 'Third-party cloud',
      retention: 'Indefinite storage',
      training: 'May use for model training',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'No major compliance certifications',
      'Limited transparency',
    ],
    recommendations: [
      'Use for non-sensitive content',
      'Review terms of service',
    ],
  },
  {
    name: 'Notion AI',
    slug: 'notion-ai',
    category: 'Writing',
    description: 'AI assistant built into Notion workspace',
    riskScore: 4,
    dataHandling: {
      storage: 'Notion cloud (AWS)',
      retention: 'Follows Notion data policies',
      training: 'Does not train on customer data',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Access to entire Notion workspace',
      'Requires Notion subscription',
    ],
    recommendations: [
      'Good for teams already using Notion',
      'Configure workspace permissions',
      'Use Enterprise for compliance',
    ],
  },
  {
    name: 'Wordtune',
    slug: 'wordtune',
    category: 'Writing',
    description: 'AI writing companion for rewriting and rephrasing',
    riskScore: 5,
    dataHandling: {
      storage: 'Cloud-based',
      retention: 'Stores usage data',
      training: 'May use for improvements',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Browser extension permissions',
      'Limited enterprise controls',
    ],
    recommendations: [
      'Use for personal writing',
      'Avoid on confidential documents',
    ],
  },
  {
    name: 'QuillBot',
    slug: 'quillbot',
    category: 'Writing',
    description: 'AI paraphrasing and writing tool',
    riskScore: 6,
    dataHandling: {
      storage: 'Cloud servers',
      retention: 'Stores all inputs',
      training: 'May use for model training',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'No enterprise compliance',
      'Popular in academic settings (plagiarism concerns)',
    ],
    recommendations: [
      'Avoid for business use',
      'Review academic integrity policies',
    ],
  },

  // DATA ANALYSIS
  {
    name: 'Julius AI',
    slug: 'julius-ai',
    category: 'Data Analysis',
    description: 'AI data analyst for spreadsheets and visualization',
    riskScore: 7,
    dataHandling: {
      storage: 'Cloud-based',
      retention: 'Uploads stored indefinitely',
      training: 'May use data for improvements',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'All data uploaded to cloud',
      'No enterprise security certifications',
      'Limited access controls',
    ],
    recommendations: [
      'Never upload sensitive datasets',
      'Use only with anonymized data',
      'Consider alternatives for production use',
    ],
  },
  {
    name: 'Tableau AI',
    slug: 'tableau-ai',
    category: 'Data Analysis',
    description: 'AI features in Tableau for data insights',
    riskScore: 3,
    dataHandling: {
      storage: 'Salesforce cloud',
      retention: 'Follows Tableau data policies',
      training: 'Does not train on customer data',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: true,
    },
    riskFactors: [
      'Requires Tableau license',
      'Salesforce ecosystem',
    ],
    recommendations: [
      'Best for enterprise BI',
      'Configure data governance',
      'Use with Salesforce security',
    ],
  },
  {
    name: 'Rows AI',
    slug: 'rows-ai',
    category: 'Data Analysis',
    description: 'Spreadsheet with built-in AI analyst',
    riskScore: 6,
    dataHandling: {
      storage: 'Cloud spreadsheets',
      retention: 'All data stored online',
      training: 'May use for improvements',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'All spreadsheet data in cloud',
      'Limited enterprise features',
    ],
    recommendations: [
      'Use for non-sensitive data only',
      'Avoid financial or personal data',
    ],
  },
  {
    name: 'DataRobot',
    slug: 'datarobot',
    category: 'Data Analysis',
    description: 'Enterprise AI platform for predictive analytics',
    riskScore: 2,
    dataHandling: {
      storage: 'On-premise or private cloud',
      retention: 'Customer-controlled',
      training: 'Customer data isolated',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: true,
    },
    riskFactors: [
      'Complex platform requires training',
      'High cost',
    ],
    recommendations: [
      'Excellent for enterprise ML',
      'Strong compliance posture',
      'Deploy on-premise for sensitive data',
    ],
  },

  // OTHER TOOLS
  {
    name: 'HuggingFace',
    slug: 'huggingface',
    category: 'Other',
    description: 'Platform for sharing and using AI models',
    riskScore: 5,
    dataHandling: {
      storage: 'Various (depends on model)',
      retention: 'Varies by model and deployment',
      training: 'Public models may use inputs',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Third-party models vary in security',
      'No unified compliance',
      'Self-hosting recommended',
    ],
    recommendations: [
      'Vet each model individually',
      'Self-host sensitive applications',
      'Use enterprise hub for teams',
    ],
  },
  {
    name: 'Runway ML',
    slug: 'runway-ml',
    category: 'Image Gen',
    description: 'AI video and image generation platform',
    riskScore: 6,
    dataHandling: {
      storage: 'Cloud-based',
      retention: 'All uploads and generations stored',
      training: 'May use public content',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Video uploads to cloud',
      'Limited enterprise features',
    ],
    recommendations: [
      'Use for creative projects',
      'Avoid proprietary video content',
    ],
  },
  {
    name: 'ElevenLabs',
    slug: 'elevenlabs',
    category: 'Other',
    description: 'AI voice generation and cloning',
    riskScore: 8,
    dataHandling: {
      storage: 'Cloud servers',
      retention: 'Voice samples stored indefinitely',
      training: 'Voice data may be used for training',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Voice cloning risks',
      'Deepfake potential',
      'No enterprise compliance',
      'Biometric data concerns',
    ],
    recommendations: [
      'Obtain consent for voice cloning',
      'Avoid for sensitive communications',
      'Use watermarking features',
    ],
  },
  {
    name: 'Character.AI',
    slug: 'character-ai',
    category: 'Chatbots',
    description: 'Platform for AI character chatbots',
    riskScore: 8,
    dataHandling: {
      storage: 'Cloud-based',
      retention: 'All conversations stored',
      training: 'Uses conversations for training',
    },
    compliance: {
      soc2: false,
      gdpr: false,
      hipaa: false,
    },
    riskFactors: [
      'All chats used for training',
      'No enterprise features',
      'Consumer-focused, not business',
      'Privacy concerns',
    ],
    recommendations: [
      'Block for enterprise use',
      'Never share business information',
      'Consumer entertainment only',
    ],
  },
  {
    name: 'Synthesia',
    slug: 'synthesia',
    category: 'Other',
    description: 'AI video generation with avatars',
    riskScore: 5,
    dataHandling: {
      storage: 'Cloud servers',
      retention: 'Videos and scripts stored',
      training: 'Custom avatars require uploads',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Deepfake/avatar creation',
      'Video content uploaded to cloud',
    ],
    recommendations: [
      'Good for training videos',
      'Obtain consent for avatar creation',
      'Use Enterprise plan for compliance',
    ],
  },
  {
    name: 'Descript',
    slug: 'descript',
    category: 'Other',
    description: 'AI-powered audio and video editing',
    riskScore: 4,
    dataHandling: {
      storage: 'Cloud-based editing',
      retention: 'Projects stored in cloud',
      training: 'Does not train on customer content',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'All media uploaded to cloud',
      'Voice cloning features',
    ],
    recommendations: [
      'Good for content teams',
      'Use Business plan for team controls',
      'Review voice cloning policies',
    ],
  },
  {
    name: 'ChatPDF',
    slug: 'chatpdf',
    category: 'Data Analysis',
    description: 'AI tool to chat with PDF documents',
    riskScore: 8,
    dataHandling: {
      storage: 'Cloud servers',
      retention: 'PDFs uploaded and stored',
      training: 'May use documents for training',
    },
    compliance: {
      soc2: false,
      gdpr: false,
      hipaa: false,
    },
    riskFactors: [
      'All PDFs uploaded to third-party',
      'No enterprise compliance',
      'Potential document leakage',
      'No data residency controls',
    ],
    recommendations: [
      'Never upload confidential PDFs',
      'Use only for public documents',
      'Consider Claude or ChatGPT for PDF analysis instead',
    ],
  },
  {
    name: 'Otter.ai',
    slug: 'otter-ai',
    category: 'Other',
    description: 'AI meeting transcription and notes',
    riskScore: 5,
    dataHandling: {
      storage: 'Cloud-based',
      retention: 'All recordings and transcripts stored',
      training: 'May use for model improvements',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Records all meeting audio',
      'Transcripts stored in cloud',
      'Participant consent required',
    ],
    recommendations: [
      'Notify all meeting participants',
      'Use Business plan for controls',
      'Review for confidential meetings',
    ],
  },
  {
    name: 'Zapier AI',
    slug: 'zapier-ai',
    category: 'Other',
    description: 'AI automation features in Zapier',
    riskScore: 6,
    dataHandling: {
      storage: 'Zapier cloud',
      retention: 'Workflow data stored',
      training: 'May use for improvements',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Access to multiple connected apps',
      'Broad permissions across services',
      'Automated data flows',
    ],
    recommendations: [
      'Audit connected app permissions',
      'Use for low-sensitivity workflows',
      'Review data access regularly',
    ],
  },
  {
    name: 'Loom AI',
    slug: 'loom-ai',
    category: 'Other',
    description: 'AI features in Loom video messaging',
    riskScore: 4,
    dataHandling: {
      storage: 'Cloud-based video storage',
      retention: 'Videos stored per plan',
      training: 'Does not train on customer videos',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'All videos uploaded to cloud',
      'Screen recordings may capture sensitive data',
    ],
    recommendations: [
      'Good for team communication',
      'Avoid recording sensitive screens',
      'Use Business plan for controls',
    ],
  },
  {
    name: 'Fireflies.ai',
    slug: 'fireflies-ai',
    category: 'Other',
    description: 'AI meeting assistant and transcription',
    riskScore: 6,
    dataHandling: {
      storage: 'Cloud servers',
      retention: 'All meeting recordings stored',
      training: 'May use for improvements',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Bot joins all meetings automatically',
      'Records without explicit consent',
      'Broad meeting access',
    ],
    recommendations: [
      'Configure opt-in for meetings',
      'Notify all participants',
      'Review access permissions',
    ],
  },
  {
    name: 'Gamma AI',
    slug: 'gamma-ai',
    category: 'Writing',
    description: 'AI-powered presentation creation',
    riskScore: 5,
    dataHandling: {
      storage: 'Cloud-based',
      retention: 'Presentations stored indefinitely',
      training: 'May use content for improvements',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'All presentation content uploaded',
      'Limited enterprise features',
    ],
    recommendations: [
      'Use for public-facing presentations',
      'Avoid confidential business data',
    ],
  },
  {
    name: 'Tome',
    slug: 'tome',
    category: 'Writing',
    description: 'AI storytelling and presentation tool',
    riskScore: 5,
    dataHandling: {
      storage: 'Cloud-based',
      retention: 'Stories and presentations stored',
      training: 'May use for model training',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Content stored in cloud',
      'Limited privacy controls',
    ],
    recommendations: [
      'Use for marketing content',
      'Avoid sensitive business information',
    ],
  },
  {
    name: 'Superhuman AI',
    slug: 'superhuman-ai',
    category: 'Writing',
    description: 'AI features in Superhuman email client',
    riskScore: 7,
    dataHandling: {
      storage: 'Cloud servers',
      retention: 'Email content processed',
      training: 'May use for improvements',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Access to all email content',
      'Read receipts and tracking',
      'Email content sent to AI',
    ],
    recommendations: [
      'Review privacy implications',
      'Disable AI on sensitive emails',
      'Consider email confidentiality',
    ],
  },
  {
    name: 'Mem',
    slug: 'mem',
    category: 'Writing',
    description: 'AI-powered note-taking and knowledge base',
    riskScore: 5,
    dataHandling: {
      storage: 'Cloud-based',
      retention: 'All notes stored indefinitely',
      training: 'May use for personalization',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'All notes uploaded to cloud',
      'AI processes all content',
    ],
    recommendations: [
      'Use for personal notes',
      'Avoid company confidential information',
    ],
  },
  {
    name: 'Lex',
    slug: 'lex',
    category: 'Writing',
    description: 'AI-powered word processor',
    riskScore: 6,
    dataHandling: {
      storage: 'Cloud-based documents',
      retention: 'All documents stored',
      training: 'May use for improvements',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'All document content in cloud',
      'Limited enterprise features',
    ],
    recommendations: [
      'Use for drafts and personal writing',
      'Avoid for final documents with sensitive data',
    ],
  },
  {
    name: 'Beautiful.ai',
    slug: 'beautiful-ai',
    category: 'Writing',
    description: 'AI presentation design platform',
    riskScore: 4,
    dataHandling: {
      storage: 'Cloud-based',
      retention: 'Presentations stored per plan',
      training: 'Does not train on customer content',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Presentation content uploaded',
      'Requires subscription',
    ],
    recommendations: [
      'Good for business presentations',
      'Use Team plan for collaboration',
      'Review sharing settings',
    ],
  },
  {
    name: 'Cleaned',
    slug: 'cleaned',
    category: 'Data Analysis',
    description: 'AI data cleaning and preparation',
    riskScore: 7,
    dataHandling: {
      storage: 'Cloud-based',
      retention: 'All uploaded datasets stored',
      training: 'May use for improvements',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'All data uploaded to third-party',
      'No enterprise compliance',
    ],
    recommendations: [
      'Never upload PII or sensitive data',
      'Use only with anonymized datasets',
    ],
  },
  {
    name: 'Hex',
    slug: 'hex',
    category: 'Data Analysis',
    description: 'AI-powered data workspace for analytics',
    riskScore: 4,
    dataHandling: {
      storage: 'Cloud or customer VPC',
      retention: 'Customer-controlled',
      training: 'Does not train on customer data',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: true,
    },
    riskFactors: [
      'Requires data connection setup',
      'Cloud-first architecture',
    ],
    recommendations: [
      'Excellent for data teams',
      'Use VPC deployment for sensitive data',
      'Configure SSO and permissions',
    ],
  },
  {
    name: 'Scale AI',
    slug: 'scale-ai',
    category: 'Data Analysis',
    description: 'AI data labeling and training platform',
    riskScore: 5,
    dataHandling: {
      storage: 'Scale cloud or customer environment',
      retention: 'Configurable',
      training: 'Customer data isolated',
    },
    compliance: {
      soc2: true,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Data labeling involves human reviewers',
      'Third-party workforce access',
    ],
    recommendations: [
      'Use for AI training workflows',
      'Anonymize data before upload',
      'Use enterprise agreements',
    ],
  },
  {
    name: 'Humata AI',
    slug: 'humata-ai',
    category: 'Data Analysis',
    description: 'AI for document analysis and Q&A',
    riskScore: 7,
    dataHandling: {
      storage: 'Cloud servers',
      retention: 'Documents uploaded and stored',
      training: 'May use for improvements',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'All documents uploaded to third-party',
      'No major compliance certifications',
    ],
    recommendations: [
      'Avoid uploading confidential documents',
      'Use for public or non-sensitive files only',
    ],
  },
  {
    name: 'Pictory',
    slug: 'pictory',
    category: 'Other',
    description: 'AI video creation from text',
    riskScore: 5,
    dataHandling: {
      storage: 'Cloud-based',
      retention: 'Videos and scripts stored',
      training: 'May use for improvements',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Content uploaded to cloud',
      'Limited enterprise features',
    ],
    recommendations: [
      'Good for marketing videos',
      'Avoid proprietary content',
    ],
  },
  {
    name: 'Play.ht',
    slug: 'play-ht',
    category: 'Other',
    description: 'AI text-to-speech and voice generation',
    riskScore: 6,
    dataHandling: {
      storage: 'Cloud servers',
      retention: 'Text and audio stored',
      training: 'May use for voice improvements',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Voice cloning capabilities',
      'Content stored in cloud',
    ],
    recommendations: [
      'Obtain consent for voice cloning',
      'Use for content creation',
    ],
  },
  {
    name: 'Replicate',
    slug: 'replicate',
    category: 'Other',
    description: 'Platform to run open-source AI models',
    riskScore: 5,
    dataHandling: {
      storage: 'Varies by model',
      retention: 'Inputs may be logged',
      training: 'Depends on model',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'Third-party model hosting',
      'Variable security by model',
    ],
    recommendations: [
      'Review each model individually',
      'Use for experimentation',
      'Self-host for production',
    ],
  },
  {
    name: 'Stability AI',
    slug: 'stability-ai',
    category: 'Image Gen',
    description: 'Company behind Stable Diffusion, offers API',
    riskScore: 4,
    dataHandling: {
      storage: 'API inputs logged temporarily',
      retention: 'Configurable via API',
      training: 'API data not used for training',
    },
    compliance: {
      soc2: false,
      gdpr: true,
      hipaa: false,
    },
    riskFactors: [
      'API security depends on implementation',
      'Self-hosting recommended for sensitive use',
    ],
    recommendations: [
      'Use API for production',
      'Self-host models when possible',
      'Review API terms',
    ],
  },
];

export function getRiskLevel(score: number): RiskLevel {
  if (score <= 3) return 'Low';
  if (score <= 5) return 'Medium';
  if (score <= 7) return 'High';
  return 'Critical';
}

export function getRiskColor(score: number): string {
  if (score <= 3) return 'bg-green-500';
  if (score <= 5) return 'bg-yellow-500';
  if (score <= 7) return 'bg-orange-500';
  return 'bg-red-500';
}

export function getCategories(): Category[] {
  return ['Chatbots', 'Code Assistants', 'Image Gen', 'Writing', 'Data Analysis', 'Other'];
}
