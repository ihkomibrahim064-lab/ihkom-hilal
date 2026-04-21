import { useNavigate } from 'react-router-dom';
import { Award, CheckCircle, Home } from 'lucide-react';

export default function ExamResult() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden text-center">
        <div className="bg-primary-600 p-8 text-white flex justify-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Award className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <div className="p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">90</h1>
          <p className="text-slate-500 font-medium uppercase tracking-wider text-xs mb-6">Nilai Akhir Anda</p>
          
          <div className="space-y-3 mb-8">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-600 text-sm">Status</span>
              <span className="text-green-600 font-bold text-sm bg-green-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Lulus
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-600 text-sm">Benar</span>
              <span className="text-slate-800 font-medium text-sm">18 Soal</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-600 text-sm">Salah</span>
              <span className="text-slate-800 font-medium text-sm">2 Soal</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/app')}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
