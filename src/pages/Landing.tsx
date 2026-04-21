import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, MonitorPlay, Users, ShieldCheck } from 'lucide-react';
import { useAuth } from '../store/auth';
import { useEffect } from 'react';

export default function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/app');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary-600 font-bold text-xl tracking-tight">
            <MonitorPlay className="w-6 h-6" />
            <span>CBT Prima</span>
          </div>
          <Link
            to="/login"
            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-colors"
          >
            Login Sistem
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="bg-white py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              Sistem Ujian Online<br />
              <span className="text-primary-600">SMK Prima Unggul</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Platform Computer Based Test (CBT) modern, cepat, dan handal untuk mengevaluasi kompetensi siswa secara komprehensif.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold text-lg transition-colors shadow-sm shadow-primary-500/30"
              >
                Mulai Ujian
              </Link>
            </div>
          </div>
        </section>

        {/* Jurusan */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Program Keahlian</h2>
              <p className="text-slate-500">Pilihan program keahlian di SMK Prima Unggul</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 'tkj', name: 'Teknik Komputer & Jaringan', icon: <MonitorPlay className="w-6 h-6 text-blue-500" /> },
                { id: 'dkv', name: 'Desain Komunikasi Visual', icon: <BookOpen className="w-6 h-6 text-purple-500" /> },
                { id: 'ak', name: 'Akuntansi & Keuangan', icon: <ShieldCheck className="w-6 h-6 text-green-500" /> },
                { id: 'bc', name: 'Broadcasting', icon: <Users className="w-6 h-6 text-orange-500" /> },
                { id: 'mplb', name: 'Manajemen Perkantoran', icon: <BookOpen className="w-6 h-6 text-teal-500" /> },
                { id: 'bd', name: 'Bisnis Digital', icon: <MonitorPlay className="w-6 h-6 text-primary-500" /> },
              ].map((jurusan) => (
                <div key={jurusan.id} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-50 transition-colors">
                    {jurusan.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{jurusan.name}</h3>
                  <p className="text-slate-500 font-medium uppercase text-sm mt-1 mb-0">{jurusan.id}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center border-t border-slate-800">
        <p>© {new Date().getFullYear()} SMK Prima Unggul. All rights reserved.</p>
      </footer>
    </div>
  );
}
