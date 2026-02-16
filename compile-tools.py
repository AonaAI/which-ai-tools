#!/usr/bin/env python3
"""Compile all generated batch JSON files + existing tools into a single tools.ts"""
import json, glob, os, re

GEN_DIR = os.path.join(os.path.dirname(__file__), 'generated')
TOOLS_TS = os.path.join(os.path.dirname(__file__), 'src', 'data', 'tools.ts')

# Load existing tools from tools.ts (extract the JSON-like array)
with open(TOOLS_TS) as f:
    content = f.read()

# Collect all tools from valid batch files + salvaged files
all_tools = []
seen_slugs = set()

# Load from batch files (prefer salvaged if original is corrupt)
for path in sorted(glob.glob(os.path.join(GEN_DIR, 'batch-*.json'))):
    basename = os.path.basename(path)
    if '-salvaged' in basename:
        continue  # handled separately
    salvaged = path.replace('.json', '-salvaged.json')
    use_path = path
    try:
        with open(path) as f:
            tools = json.load(f)
    except json.JSONDecodeError:
        if os.path.exists(salvaged):
            with open(salvaged) as f:
                tools = json.load(f)
            use_path = salvaged
        else:
            print(f"SKIP {basename}: corrupt and no salvaged version")
            continue
    
    added = 0
    for t in tools:
        slug = t.get('slug', '')
        if slug and slug not in seen_slugs:
            seen_slugs.add(slug)
            # Normalize category names (remove "Part 2" etc)
            cat = t.get('category', 'Other')
            cat = re.sub(r'\s*\(Part \d+\)', '', cat)
            t['category'] = cat
            all_tools.append(t)
            added += 1
    print(f"Loaded {added} tools from {os.path.basename(use_path)}")

# Extract all unique categories
categories = sorted(set(t['category'] for t in all_tools))
print(f"\nTotal unique tools: {len(all_tools)}")
print(f"Categories ({len(categories)}): {categories}")

# Generate the TypeScript file
category_type = " | ".join(f"'{c}'" for c in categories)

ts_output = f"""export type Category = {category_type};
export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface AITool {{
  name: string;
  slug: string;
  category: Category;
  description: string;
  logoUrl: string;
  riskScore: number;
  dataHandling: {{
    storage: string;
    retention: string;
    training: string;
  }};
  compliance: {{
    soc2: boolean;
    gdpr: boolean;
    hipaa: boolean;
  }};
  riskFactors: string[];
  recommendations: string[];
}}

export function getRiskLevel(score: number): RiskLevel {{
  if (score <= 3) return 'Low';
  if (score <= 5) return 'Medium';
  if (score <= 7) return 'High';
  return 'Critical';
}}

export function getRiskColor(level: RiskLevel): string {{
  switch (level) {{
    case 'Low': return 'text-green-400';
    case 'Medium': return 'text-yellow-400';
    case 'High': return 'text-orange-400';
    case 'Critical': return 'text-red-400';
  }}
}}

export function getCategories(): Category[] {{
  return {json.dumps(categories)};
}}

export const tools: AITool[] = {json.dumps(all_tools, indent=2)};
"""

with open(TOOLS_TS, 'w') as f:
    f.write(ts_output)

print(f"\nWrote {len(all_tools)} tools to {TOOLS_TS}")
