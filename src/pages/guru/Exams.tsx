export default function GuruExams() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Kelola Ujian</h1>
          <p className="text-slate-500 text-sm mt-1">Buat ujian baru dan lihat hasil dari ujian yang telah berlalu</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm">
          Buat Ujian Baru
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
        <p className="text-slate-500">Daftar ujian akan muncul di sini.</p>
      </div>
    </div>
  );
}
