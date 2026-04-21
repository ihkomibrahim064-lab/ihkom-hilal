import { useAuth } from '../../store/auth';

export default function AdminDashboard() {
  const { user } = useAuth();
  
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl p-8 text-white relative overflow-hidden shadow-sm">
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">Selamat Datang, Admin {user?.email}!</h1>
          <p className="opacity-90 max-w-md">Kelola sistem, pengguna, dan pantau ujian di SMK Prima Unggul.</p>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
          <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z"/></svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Total Siswa', value: '0', label: 'Terdaftar di sistem' },
          { title: 'Total Guru', value: '0', label: 'Aktif mengajar' },
          { title: 'Ujian Aktif', value: '0', label: 'Sedang berlangsung' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <h3 className="text-slate-500 font-medium text-sm">{stat.title}</h3>
            <div className="text-3xl font-bold text-slate-800 mt-2">{stat.value}</div>
            <p className="text-xs text-slate-400 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Informasi Sistem</h2>
        <p className="text-slate-600 text-sm">
          Untuk mengaktifkan manajemen penuh, pastikan Anda telah mengatur konfigurasi Supabase di file <code className="bg-slate-100 px-1 py-0.5 rounded text-primary-600">.env</code> dan menjalankan migrations SQL.
        </p>
      </div>
    </div>
  );
}
