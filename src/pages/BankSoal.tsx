import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../store/auth';
import { Plus, BookOpen, X, AlertCircle, Search, Trash2, Edit2, CheckCircle2 } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  created_by: string;
}

export default function BankSoal() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, role } = useAuth();
  
  // Form states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [questionText, setQuestionText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('option_a');
  
  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [successStatus, setSuccessStatus] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchQuestions();
    }
  }, [user]);

  const fetchQuestions = async () => {
    try {
      let query = supabase
        .from('questions')
        .select('*')
        .order('created_at', { ascending: false });
      
      // Admin sees everything. Guru sees only their own.
      if (role === 'guru') {
        query = query.eq('created_by', user?.id);
      }
        
      const { data, error } = await query;
        
      if (error) throw error;
      setQuestions(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (q?: Question) => {
    setErrorStatus(null);
    if (q) {
      setEditingId(q.id);
      setQuestionText(q.question);
      setOptionA(q.option_a);
      setOptionB(q.option_b);
      setOptionC(q.option_c);
      setOptionD(q.option_d);
      setCorrectAnswer(q.correct_answer);
    } else {
      setEditingId(null);
      setQuestionText('');
      setOptionA('');
      setOptionB('');
      setOptionC('');
      setOptionD('');
      setCorrectAnswer('option_a');
    }
    setIsModalOpen(true);
  };

  const handleCreateOrUpdateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    setErrorStatus(null);
    setSuccessStatus(null);
    
    const payload = {
      question: questionText,
      option_a: optionA,
      option_b: optionB,
      option_c: optionC,
      option_d: optionD,
      correct_answer: correctAnswer,
      created_by: user.id
    };

    try {
      if (editingId) {
        const { error } = await supabase.from('questions').update(payload).eq('id', editingId);
        if (error) throw error;
        showSuccess('Soal berhasil diperbarui!');
      } else {
        const { error } = await supabase.from('questions').insert(payload);
        if (error) throw error;
        showSuccess('Soal berhasil ditambahkan!');
      }
      
      setIsModalOpen(false);
      fetchQuestions();
    } catch (err: any) {
      console.error(err);
      setErrorStatus(err.message || 'Terjadi kesalahan saat menyimpan soal');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus soal ini? Data yang terhapus tidak dapat dikembalikan.")) return;
    
    setSuccessStatus(null);
    try {
      const { error } = await supabase.from('questions').delete().eq('id', id);
      if (error) throw error;
      showSuccess('Soal berhasil dihapus.');
      fetchQuestions();
    } catch (err: any) {
      alert("Gagal menghapus soal: " + err.message);
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessStatus(msg);
    setTimeout(() => setSuccessStatus(null), 3000);
  };

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Bank Soal</h1>
          <p className="text-slate-500 text-sm mt-1">Kelola daftar soal pilihan ganda Anda</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md shadow-primary-200 flex items-center gap-2 shrink-0"
        >
          <Plus className="w-5 h-5" />
          Tambah Soal
        </button>
      </div>

      {successStatus && (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 flex items-center gap-3 shadow-sm shrink-0">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-medium text-sm">{successStatus}</span>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col flex-1">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 shrink-0">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Cari pertanyaan soal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Memuat bank soal...</div>
          ) : questions.length === 0 ? (
            <div className="p-12 text-center text-slate-500 flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-lg font-medium text-slate-800">Belum ada soal</p>
              <p className="text-sm mt-1 mb-4">Mulai membuat soal pertama Anda untuk digunakan dalam ujian.</p>
              <button 
                onClick={() => handleOpenModal()}
                className="text-primary-600 font-bold hover:text-primary-800"
              >
                Buat Soal Baru
              </button>
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="p-8 text-center text-slate-500">Pencarian tidak menemukan hasil.</div>
          ) : (
            <ul className="divide-y divide-slate-200">
              {filteredQuestions.map((q, idx) => (
                <li key={q.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row gap-4 items-start justify-between">
                  <div>
                    <div className="flex gap-3 mb-2">
                      <span className="font-bold text-slate-400">{idx + 1}.</span>
                      <p className="text-slate-800 font-medium leading-relaxed">{q.question}</p>
                    </div>
                    <ul className="pl-6 space-y-1 text-sm text-slate-600">
                      <li className={q.correct_answer === 'option_a' ? 'text-green-600 font-medium flex items-center gap-1' : ''}>A. {q.option_a} {q.correct_answer === 'option_a' && <CheckCircle2 className="w-3 h-3"/>}</li>
                      <li className={q.correct_answer === 'option_b' ? 'text-green-600 font-medium flex items-center gap-1' : ''}>B. {q.option_b} {q.correct_answer === 'option_b' && <CheckCircle2 className="w-3 h-3"/>}</li>
                      <li className={q.correct_answer === 'option_c' ? 'text-green-600 font-medium flex items-center gap-1' : ''}>C. {q.option_c} {q.correct_answer === 'option_c' && <CheckCircle2 className="w-3 h-3"/>}</li>
                      <li className={q.correct_answer === 'option_d' ? 'text-green-600 font-medium flex items-center gap-1' : ''}>D. {q.option_d} {q.correct_answer === 'option_d' && <CheckCircle2 className="w-3 h-3"/>}</li>
                    </ul>
                  </div>
                  <div className="flex gap-2 shrink-0 sm:mt-0 mt-4">
                    <button onClick={() => handleOpenModal(q)} className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="Edit Soal">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(q.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus Soal">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modal Tambah/Edit Soal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
              <h2 className="text-xl font-bold text-slate-800">
                {editingId ? 'Edit Soal' : 'Tambah Soal Baru'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-1 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {errorStatus && (
                <div className="mb-6 bg-red-50 p-4 rounded-md flex items-start gap-3 border border-red-100">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600 font-medium">{errorStatus}</p>
                </div>
              )}
              
              <form id="createQuestionForm" onSubmit={handleCreateQuestion} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Pertanyaan</label>
                  <textarea 
                    required
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[120px] resize-y placeholder-slate-400"
                    placeholder="Tuliskan pertanyaan ujian di sini..."
                  />
                </div>
                
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-slate-700">Pilihan Jawaban</label>
                  
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-600 font-bold rounded-lg shrink-0 border border-slate-200">A</span>
                    <input type="text" required value={optionA} onChange={(e) => setOptionA(e.target.value)} className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Jawaban untuk pilihan A" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-600 font-bold rounded-lg shrink-0 border border-slate-200">B</span>
                    <input type="text" required value={optionB} onChange={(e) => setOptionB(e.target.value)} className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Jawaban untuk pilihan B" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-600 font-bold rounded-lg shrink-0 border border-slate-200">C</span>
                    <input type="text" required value={optionC} onChange={(e) => setOptionC(e.target.value)} className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Jawaban untuk pilihan C" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-600 font-bold rounded-lg shrink-0 border border-slate-200">D</span>
                    <input type="text" required value={optionD} onChange={(e) => setOptionD(e.target.value)} className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Jawaban untuk pilihan D" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 mt-2">Jawaban Benar</label>
                  <select 
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 font-medium text-slate-700"
                  >
                    <option value="option_a">A. Kunci Jawaban A</option>
                    <option value="option_b">B. Kunci Jawaban B</option>
                    <option value="option_c">C. Kunci Jawaban C</option>
                    <option value="option_d">D. Kunci Jawaban D</option>
                  </select>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0 rounded-b-2xl">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button 
                type="submit"
                form="createQuestionForm"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-md shadow-primary-200 disabled:opacity-70 flex items-center justify-center min-w-[140px]"
              >
                {isSubmitting ? 'Memproses...' : (editingId ? 'Update Soal' : 'Simpan Soal')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
