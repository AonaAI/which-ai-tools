# Tool Generation Task

Generate AI tools for the WhichAITools directory. Each tool needs:
- name, slug, category, description, logoUrl, riskScore (1-10)
- dataHandling: { storage, retention, training }
- compliance: { soc2, gdpr, hipaa }
- riskFactors: string[]
- recommendations: string[]

Logo URL format: https://www.google.com/s2/favicons?domain=DOMAIN&sz=128

Categories expanded:
'Chatbots' | 'Code Assistants' | 'Image Gen' | 'Writing' | 'Data Analysis' | 'Video' | 'Audio' | 'Design' | 'Marketing' | 'Sales' | 'HR' | 'Legal' | 'Finance' | 'Education' | 'Healthcare' | 'Productivity' | 'Search' | 'Translation' | 'Customer Support' | 'DevOps' | 'Security' | 'Research' | 'Other'
