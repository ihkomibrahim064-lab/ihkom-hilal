import { useAuth } from '../../store/auth';

export default function SiswaDashboard() {
  const { user } = useAuth();
  
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl p-8 text-white relative overflow-hidden shadow-sm">
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">Selamat Datang, {user?.email || 'Siswa'}!</h1>
          <p className="opacity-90 max-w-md">Persiapkan dirimu untuk mengikuti ujian dengan baik. Pastikan koneksi internet stabil sebelum memulai ujian.</p>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
          <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z"/></svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-slate-700">Ringkasan Ujian</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col">
              <h3 className="text-slate-500 font-medium text-sm">Ujian Tersedia</h3>
              <div className="text-3xl font-bold text-slate-800 mt-2">0</div>
              <p className="text-xs text-slate-400 mt-2">Menunggu untuk dikerjakan</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col">
              <h3 className="text-slate-500 font-medium text-sm">Ujian Selesai</h3>
              <div className="text-3xl font-bold text-slate-800 mt-2">0</div>
              <p className="text-xs text-slate-400 mt-2">Telah dikerjakan</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-slate-700 mb-2">Informasi Penting</h4>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800 shadow-sm">
             <div className="flex gap-2 mb-2">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
               <span className="font-bold text-sm">Petunjuk</span>
             </div>
             <p className="text-xs leading-relaxed opacity-90">
               Sistem akan secara otomatis melakukan submit jika waktu ujian habis. Nilai akhir akan langsung dikalkulasikan.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
