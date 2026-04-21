import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
}

// Dummy data
const dummyQuestions: Question[] = [
  { id: '1', question: 'Apa ibukota Indonesia?', option_a: 'Bandung', option_b: 'Surabaya', option_c: 'Jakarta', option_d: 'Medan' },
  { id: '2', question: 'Siapa penemu lampu bohlam?', option_a: 'Thomas Edison', option_b: 'Nikola Tesla', option_c: 'Albert Einstein', option_d: 'Isaac Newton' },
  { id: '3', question: 'Apa warna bendera Indonesia?', option_a: 'Merah Putih', option_b: 'Biru Putih', option_c: 'Merah Kuning', option_d: 'Putih Merah' },
];

export default function TakeExam() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [questions] = useState<Question[]>(dummyQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 mins
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Basic timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSelectOption = (questionId: string, optionKey: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionKey }));
  };

  const currentQ = questions[currentIndex];

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    // Simulate API call to save results
    setTimeout(() => {
      navigate(`/exam/${id}/result`);
    }, 1500);
  };

  const confirmSubmit = () => {
    const unansweredCount = questions.length - Object.keys(answers).length;
    if (unansweredCount > 0) {
      if (!window.confirm(`Masih ada ${unansweredCount} soal yang belum dijawab. Yakin ingin mengakhiri ujian?`)) {
        return;
      }
    } else {
      if (!window.confirm('Yakin ingin mengakhiri ujian sekarang?')) {
        return;
      }
    }
    handleSubmit();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10 shadow-sm">
        <div className="font-bold text-slate-800 hidden sm:block">Ujian CBT Prima | Matematika Dasar</div>
        <div className="font-bold text-slate-800 sm:hidden">CBT Prima</div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            <Clock className="w-4 h-4 text-slate-600" />
            <span className={`font-mono font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-slate-800'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <button 
            onClick={confirmSubmit}
            disabled={isSubmitting}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
          >
            Selesai
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 flex flex-col md:flex-row gap-6">
        
        {/* Left column - Question */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex-1">
            <h2 className="text-lg font-medium text-slate-800 mb-6 flex gap-3">
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-sm font-bold w-fit h-fit border border-slate-200">
                Soal {currentIndex + 1}
              </span>
              <span className="mt-0.5 leading-relaxed">{currentQ.question}</span>
            </h2>

            <div className="space-y-3">
              {(['option_a', 'option_b', 'option_c', 'option_d'] as const).map((key, i) => {
                const isSelected = answers[currentQ.id] === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleSelectOption(currentQ.id, key)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 ${
                      isSelected 
                        ? 'border-primary-500 bg-primary-50/50' 
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected ? 'border-primary-600 border-[6px]' : 'border-slate-300'
                    }`} />
                    <span className="text-slate-700 leading-relaxed">{currentQ[key]}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex justify-between items-center">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
              className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Soal Sebelumnya
            </button>
            <button
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="px-4 py-2 font-medium text-white bg-slate-800 hover:bg-slate-900 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Soal Selanjutnya
            </button>
          </div>
        </div>

        {/* Right column - Navigation Panel */}
        <div className="w-full md:w-80 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sticky top-20">
            <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-3">Navigasi Soal</h3>
            
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isAnswered = !!answers[q.id];
                const isActive = currentIndex === idx;
                
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 rounded-lg font-medium text-sm transition-colors border ${
                      isActive 
                        ? 'bg-primary-600 text-white border-primary-700 ring-2 ring-primary-200 ring-offset-1' 
                        : isAnswered
                          ? 'bg-slate-800 text-white border-slate-800'
                          : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {idx + 1}
                  </button>
                )
              })}
            </div>

            <div className="mt-8 space-y-2">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="w-4 h-4 rounded bg-slate-800 border border-slate-800"></div>
                <span>Sudah Dijawab ({Object.keys(answers).length})</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="w-4 h-4 rounded bg-white border border-slate-300"></div>
                <span>Belum Dijawab ({questions.length - Object.keys(answers).length})</span>
              </div>
            </div>
            
            {isSubmitting && (
              <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium text-slate-700">Menyimpan jawaban...</span>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
