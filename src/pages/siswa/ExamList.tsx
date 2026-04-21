import { useNavigate } from 'react-router-dom';

export default function ExamList() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Daftar Ujian</h1>
        <p className="text-slate-500 text-sm mt-1">Pilih ujian yang tersedia untuk Anda kerjakan</p>
      </div>

      <div className="space-y-4">
        {/* Placeholder / Demo Exam Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between shadow-sm">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <div>
              <h5 className="font-bold text-slate-800">Ujian Dummy (Demo)</h5>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1 font-medium bg-slate-100 px-2 py-0.5 rounded">3 Soal</span>
                <span className="flex items-center gap-1 font-medium bg-slate-100 px-2 py-0.5 rounded">60 Menit</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/exam/dummy')}
            className="px-6 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-bold hover:bg-primary-700 shadow-md shadow-primary-100 transition-all"
          >
            Kerjakan Ujian
          </button>
        </div>
      </div>
    </div>
  );
}
