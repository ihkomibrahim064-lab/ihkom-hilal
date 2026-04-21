import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './store/auth';
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';

import AdminDashboard from './pages/admin/Dashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageExamsAdmin from './pages/admin/ManageExams';

import GuruDashboard from './pages/guru/Dashboard';
import BankSoal from './pages/guru/BankSoal';
import GuruExams from './pages/guru/Exams';

import SiswaDashboard from './pages/siswa/Dashboard';
import ExamList from './pages/siswa/ExamList';
import TakeExam from './pages/siswa/TakeExam';
import ExamResult from './pages/siswa/ExamResult';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-primary-600 font-medium">Memuat data...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
}

function DashboardDecider() {
  const { role } = useAuth();
  
  if (role === 'admin') return <AdminDashboard />;
  if (role === 'guru') return <GuruDashboard />;
  return <SiswaDashboard />; // default to siswa
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/app" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardDecider />} />
            
            {/* Admin Routes */}
            <Route path="admin/users" element={<ProtectedRoute allowedRoles={['admin']}><ManageUsers /></ProtectedRoute>} />
            <Route path="admin/exams" element={<ProtectedRoute allowedRoles={['admin']}><ManageExamsAdmin /></ProtectedRoute>} />
            
            {/* Guru Routes */}
            <Route path="guru/bank-soal" element={<ProtectedRoute allowedRoles={['guru']}><BankSoal /></ProtectedRoute>} />
            <Route path="guru/exams" element={<ProtectedRoute allowedRoles={['guru']}><GuruExams /></ProtectedRoute>} />

            {/* Siswa Routes */}
            <Route path="siswa/exams" element={<ProtectedRoute allowedRoles={['siswa']}><ExamList /></ProtectedRoute>} />
          </Route>
          
          {/* Exam Taking Routes - No Sidebar Layout */}
          <Route path="/exam/:id" element={
            <ProtectedRoute allowedRoles={['siswa']}>
              <TakeExam />
            </ProtectedRoute>
          } />
          
          <Route path="/exam/:id/result" element={
            <ProtectedRoute>
              <ExamResult />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
