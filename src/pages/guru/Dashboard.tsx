import { useAuth } from '../../store/auth';

export default function GuruDashboard() {
  const { user } = useAuth();
  
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl p-8 text-white relative overflow-hidden shadow-sm">
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">Selamat Datang, Guru {user?.email}!</h1>
          <p className="opacity-90 max-w-md">Kelola bank soal, buat ujian, dan pantau hasil siswa secara real-time.</p>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
          <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z"/></svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <h3 className="text-slate-500 font-medium text-sm">Total Soal Anda</h3>
          <div className="text-3xl font-bold text-slate-800 mt-2">0</div>
          <p className="text-xs text-slate-400 mt-2">Dalam bank soal</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <h3 className="text-slate-500 font-medium text-sm">Ujian Aktif</h3>
          <div className="text-3xl font-bold text-slate-800 mt-2">0</div>
          <p className="text-xs text-slate-400 mt-2">Sedang berlangsung</p>
        </div>
      </div>
    </div>
  );
}
