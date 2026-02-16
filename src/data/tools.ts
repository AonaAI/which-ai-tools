export type Category = 'Chatbots' | 'Code Assistants' | 'Image Gen' | 'Writing' | 'Data Analysis' | 'Other';
export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface AITool {
  name: string;
  slug: string;
  category: Category;
  description: string;
  logoUrl: string;
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=openai.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=anthropic.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=deepmind.google&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=deepseek.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=microsoft.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=github.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=cursor.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=tabnine.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=codeium.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=aws.amazon.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=replit.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=midjourney.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=openai.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=stability.ai&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=adobe.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=leonardo.ai&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=grammarly.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=jasper.ai&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=copy.ai&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=writesonic.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=notion.so&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=wordtune.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=quillbot.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=julius.ai&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=tableau.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=rows.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=datarobot.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=huggingface.co&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=runwayml.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=elevenlabs.io&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=character.ai&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=synthesia.io&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=descript.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=chatpdf.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=otter.ai&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=zapier.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=loom.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=fireflies.ai&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=gamma.app&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=tome.app&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=superhuman.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=mem.ai&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=lex.page&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=beautiful.ai&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=cleaned.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=hex.tech&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=scale.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=humata.ai&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=pictory.ai&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=play.ht&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=replicate.com&sz=128',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=stability.ai&sz=128',
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

// Database row type
interface AIToolRow {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  logo_url: string;
  risk_score: number;
  data_handling_storage: string;
  data_handling_retention: string;
  data_handling_training: string;
  compliance_soc2: boolean;
  compliance_gdpr: boolean;
  compliance_hipaa: boolean;
  risk_factors: string[];
  recommendations: string[];
  created_at: string;
  updated_at: string;
}

function mapRowToTool(row: AIToolRow): AITool {
  return {
    name: row.name,
    slug: row.slug,
    category: row.category as Category,
    description: row.description,
    logoUrl: row.logo_url,
    riskScore: row.risk_score,
    dataHandling: {
      storage: row.data_handling_storage,
      retention: row.data_handling_retention,
      training: row.data_handling_training,
    },
    compliance: {
      soc2: row.compliance_soc2,
      gdpr: row.compliance_gdpr,
      hipaa: row.compliance_hipaa,
    },
    riskFactors: row.risk_factors || [],
    recommendations: row.recommendations || [],
  };
}

export async function fetchTools(): Promise<AITool[]> {
  try {
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase
      .from('ai_tools')
      .select('*')
      .order('name');

    if (error) throw error;
    if (!data || data.length === 0) return tools;

    return (data as AIToolRow[]).map(mapRowToTool);
  } catch (e) {
    console.error('Failed to fetch tools from Supabase:', e);
    return tools;
  }
}

export async function fetchToolBySlug(slug: string): Promise<AITool | undefined> {
  try {
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase
      .from('ai_tools')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    if (!data) return tools.find(t => t.slug === slug);

    return mapRowToTool(data as AIToolRow);
  } catch (e) {
    console.error('Failed to fetch tool from Supabase:', e);
    return tools.find(t => t.slug === slug);
  }
}

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
