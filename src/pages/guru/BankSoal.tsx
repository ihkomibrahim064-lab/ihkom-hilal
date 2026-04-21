import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../store/auth';
import { Plus } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  created_by: string;
}

export default function BankSoal() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchQuestions();
    }
  }, [user]);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('created_by', user?.id)
        .order('id', { ascending: false });
        
      if (error) throw error;
      setQuestions(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Bank Soal</h1>
          <p className="text-slate-500 text-sm mt-1">Kelola daftar soal pilihan ganda Anda</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Soal
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Memuat bank soal...</div>
        ) : questions.length === 0 ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-lg font-medium text-slate-800">Belum ada soal</p>
            <p className="text-sm mt-1 mb-4">Mulai membuat soal pertama Anda untuk digunakan dalam ujian.</p>
            <button className="text-primary-600 font-medium hover:text-primary-800">Buat Soal Baru</button>
          </div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {questions.map(q => (
              <li key={q.id} className="p-6 hover:bg-slate-50 transition-colors">
                <p className="text-slate-800 font-medium">{q.question}</p>
                <div className="mt-4 flex gap-3 text-sm">
                  <button className="text-primary-600 font-medium hover:text-primary-800">Edit</button>
                  <button className="text-red-600 font-medium hover:text-red-800">Hapus</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Quick hack for lucide icon
import { BookOpen } from 'lucide-react';
