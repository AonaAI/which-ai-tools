# Generated Tool Batches

Each JSON file contains an array of tool objects matching the AITool interface.
These get compiled into `src/data/tools.ts` by the compile script.

## Tool Interface
```typescript
{
  name: string;
  slug: string;           // lowercase, hyphens, unique
  category: Category;
  description: string;
  logoUrl: string;         // https://www.google.com/s2/favicons?domain=DOMAIN&sz=128
  riskScore: number;       // 1-10
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
  riskFactors: string[];       // 3-5 items
  recommendations: string[];   // 3-5 items
}
```

## Categories
Chatbots, Code Assistants, Image Gen, Writing, Data Analysis, Marketing, Sales, HR, Legal, Education, Healthcare, Design, Video, Audio, Productivity, Customer Support, DevOps, Security, Finance, Research, Translation, Recruiting, Project Management, Presentation, Email, Social Media, E-Commerce, Real Estate, Supply Chain, Agriculture
