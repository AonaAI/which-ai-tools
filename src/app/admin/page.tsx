'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

const ADMIN_PASSWORD = 'aona2026!admin';

interface ToolRow {
  id?: number;
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
}

const EMPTY_TOOL: ToolRow = {
  name: '',
  slug: '',
  category: 'Chatbots',
  description: '',
  logo_url: '',
  risk_score: 5,
  data_handling_storage: '',
  data_handling_retention: '',
  data_handling_training: '',
  compliance_soc2: false,
  compliance_gdpr: false,
  compliance_hipaa: false,
  risk_factors: [''],
  recommendations: [''],
};

const CATEGORIES = [
  'Chatbots', 'Code Assistants', 'Image Gen', 'Writing', 'Data Analysis',
  'Video Gen', 'Audio & Music', 'Productivity', 'Marketing', 'Design',
  'Research', 'Education', 'Healthcare', 'Legal', 'Finance', 'HR',
  'Customer Support', 'Sales', 'Translation', 'Other',
];

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [tools, setTools] = useState<ToolRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingTool, setEditingTool] = useState<ToolRow | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const fetchTools = useCallback(async () => {
    setLoading(true);
    const allRows: ToolRow[] = [];
    let from = 0;
    const pageSize = 1000;
    while (true) {
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*')
        .order('name')
        .range(from, from + pageSize - 1);
      if (error) { console.error(error); break; }
      if (!data || data.length === 0) break;
      allRows.push(...(data as ToolRow[]));
      if (data.length < pageSize) break;
      from += pageSize;
    }
    setTools(allRows);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) fetchTools();
  }, [authed, fetchTools]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
    } else {
      setMessage('Wrong password');
    }
  };

  const handleSave = async () => {
    if (!editingTool) return;
    setSaving(true);
    setMessage('');

    const payload = {
      name: editingTool.name,
      slug: editingTool.slug || slugify(editingTool.name),
      category: editingTool.category,
      description: editingTool.description,
      logo_url: editingTool.logo_url || `https://www.google.com/s2/favicons?domain=${editingTool.slug}.com&sz=128`,
      risk_score: editingTool.risk_score,
      data_handling_storage: editingTool.data_handling_storage,
      data_handling_retention: editingTool.data_handling_retention,
      data_handling_training: editingTool.data_handling_training,
      compliance_soc2: editingTool.compliance_soc2,
      compliance_gdpr: editingTool.compliance_gdpr,
      compliance_hipaa: editingTool.compliance_hipaa,
      risk_factors: editingTool.risk_factors.filter(f => f.trim()),
      recommendations: editingTool.recommendations.filter(r => r.trim()),
    };

    if (isNew) {
      const { error } = await supabase.from('ai_tools').insert(payload);
      if (error) { setMessage(`Error: ${error.message}`); setSaving(false); return; }
      setMessage('Tool created!');
    } else {
      const { error } = await supabase.from('ai_tools').update(payload).eq('id', editingTool.id);
      if (error) { setMessage(`Error: ${error.message}`); setSaving(false); return; }
      setMessage('Tool updated!');
    }

    setSaving(false);
    setEditingTool(null);
    setIsNew(false);
    fetchTools();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this tool?')) return;
    const { error } = await supabase.from('ai_tools').delete().eq('id', id);
    if (error) { setMessage(`Error: ${error.message}`); return; }
    setMessage('Tool deleted');
    fetchTools();
  };

  const filteredTools = tools.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 text-gray-900"
          />
          <button type="submit" className="w-full bg-brand-accent text-white py-3 rounded-lg font-bold hover:bg-emerald-600 transition">
            Login
          </button>
          {message && <p className="text-red-500 mt-3 text-sm">{message}</p>}
        </form>
      </main>
    );
  }

  if (editingTool) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'Add New Tool' : `Edit: ${editingTool.name}`}</h1>
            <button onClick={() => { setEditingTool(null); setIsNew(false); }} className="text-gray-500 hover:text-gray-700">
              ← Back to list
            </button>
          </div>

          {message && <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4">{message}</div>}

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                <input
                  value={editingTool.name}
                  onChange={e => setEditingTool({ ...editingTool, name: e.target.value, slug: isNew ? slugify(e.target.value) : editingTool.slug })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Slug</label>
                <input
                  value={editingTool.slug}
                  onChange={e => setEditingTool({ ...editingTool, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select
                  value={editingTool.category}
                  onChange={e => setEditingTool({ ...editingTool, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Risk Score (1-10)</label>
                <input
                  type="number" min={1} max={10}
                  value={editingTool.risk_score}
                  onChange={e => setEditingTool({ ...editingTool, risk_score: parseInt(e.target.value) || 5 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea
                rows={3}
                value={editingTool.description}
                onChange={e => setEditingTool({ ...editingTool, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Logo URL</label>
              <input
                value={editingTool.logo_url}
                onChange={e => setEditingTool({ ...editingTool, logo_url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                placeholder="https://www.google.com/s2/favicons?domain=example.com&sz=128"
              />
            </div>

            {/* Data Handling */}
            <h2 className="text-lg font-bold text-gray-900 pt-2">Data Handling</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Storage Location</label>
                <input value={editingTool.data_handling_storage} onChange={e => setEditingTool({ ...editingTool, data_handling_storage: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Retention Policy</label>
                <input value={editingTool.data_handling_retention} onChange={e => setEditingTool({ ...editingTool, data_handling_retention: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Training on User Data</label>
                <input value={editingTool.data_handling_training} onChange={e => setEditingTool({ ...editingTool, data_handling_training: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900" />
              </div>
            </div>

            {/* Compliance */}
            <h2 className="text-lg font-bold text-gray-900 pt-2">Compliance</h2>
            <div className="flex gap-6">
              {(['compliance_soc2', 'compliance_gdpr', 'compliance_hipaa'] as const).map(key => (
                <label key={key} className="flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    checked={editingTool[key]}
                    onChange={e => setEditingTool({ ...editingTool, [key]: e.target.checked })}
                    className="w-4 h-4"
                  />
                  {key.replace('compliance_', '').toUpperCase()}
                </label>
              ))}
            </div>

            {/* Risk Factors */}
            <h2 className="text-lg font-bold text-gray-900 pt-2">Risk Factors</h2>
            {editingTool.risk_factors.map((f, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={f}
                  onChange={e => {
                    const updated = [...editingTool.risk_factors];
                    updated[i] = e.target.value;
                    setEditingTool({ ...editingTool, risk_factors: updated });
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                  placeholder="Risk factor..."
                />
                <button onClick={() => {
                  const updated = editingTool.risk_factors.filter((_, j) => j !== i);
                  setEditingTool({ ...editingTool, risk_factors: updated.length ? updated : [''] });
                }} className="text-red-500 px-2">✕</button>
              </div>
            ))}
            <button onClick={() => setEditingTool({ ...editingTool, risk_factors: [...editingTool.risk_factors, ''] })} className="text-brand-accent text-sm font-semibold">+ Add risk factor</button>

            {/* Recommendations */}
            <h2 className="text-lg font-bold text-gray-900 pt-2">Recommendations</h2>
            {editingTool.recommendations.map((r, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={r}
                  onChange={e => {
                    const updated = [...editingTool.recommendations];
                    updated[i] = e.target.value;
                    setEditingTool({ ...editingTool, recommendations: updated });
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                  placeholder="Recommendation..."
                />
                <button onClick={() => {
                  const updated = editingTool.recommendations.filter((_, j) => j !== i);
                  setEditingTool({ ...editingTool, recommendations: updated.length ? updated : [''] });
                }} className="text-red-500 px-2">✕</button>
              </div>
            ))}
            <button onClick={() => setEditingTool({ ...editingTool, recommendations: [...editingTool.recommendations, ''] })} className="text-brand-accent text-sm font-semibold">+ Add recommendation</button>

            {/* Save */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSave}
                disabled={saving || !editingTool.name}
                className="bg-brand-accent text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-600 transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : isNew ? 'Create Tool' : 'Save Changes'}
              </button>
              <button onClick={() => { setEditingTool(null); setIsNew(false); }} className="px-8 py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin — AI Tools Directory</h1>
            <p className="text-gray-500">{tools.length} tools in database</p>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition">
              View Site →
            </Link>
            <button
              onClick={() => { setEditingTool({ ...EMPTY_TOOL }); setIsNew(true); setMessage(''); }}
              className="bg-brand-accent text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-600 transition"
            >
              + Add Tool
            </button>
          </div>
        </div>

        {message && <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4">{message}</div>}

        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search tools..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
          />
        </div>

        {loading ? (
          <p className="text-gray-500">Loading tools...</p>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Category</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Risk</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Compliance</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTools.slice(0, 100).map(tool => (
                  <tr key={tool.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{tool.name}</div>
                      <div className="text-xs text-gray-400">/tools/{tool.slug}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{tool.category}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${
                        tool.risk_score <= 3 ? 'bg-green-500' :
                        tool.risk_score <= 5 ? 'bg-yellow-500' :
                        tool.risk_score <= 7 ? 'bg-orange-500' : 'bg-red-500'
                      }`}>
                        {tool.risk_score}/10
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {tool.compliance_soc2 && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">SOC2</span>}
                        {tool.compliance_gdpr && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">GDPR</span>}
                        {tool.compliance_hipaa && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">HIPAA</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => { setEditingTool({ ...tool, risk_factors: tool.risk_factors || [''], recommendations: tool.recommendations || [''] }); setIsNew(false); setMessage(''); }}
                        className="text-brand-accent hover:underline text-sm mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(tool.id!)}
                        className="text-red-500 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredTools.length > 100 && (
              <div className="px-4 py-3 text-sm text-gray-500 border-t border-gray-100">
                Showing 100 of {filteredTools.length} tools. Use search to narrow down.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
