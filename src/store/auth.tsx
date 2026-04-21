import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export type UserRole = 'admin' | 'guru' | 'siswa' | null;

interface AuthContextType {
  session: Session | null;
  user: User | null;
  role: UserRole;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  role: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserRole(session.user.id);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setLoading(false);
      }
    };

    getInitialSession();

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserRole(session.user.id);
      } else {
        setRole(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      // First check if table exists and user is there
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.warn("Could not fetch user role, possibly missing 'users' table.", error.message);
        // Fallback for UI testing if table doesn't exist
        setRole('siswa'); 
      } else if (data) {
        setRole(data.role as UserRole);
      } else {
        // If user not in table, maybe we default to admin if first user?
        // The prompt says "User pertama di Supabase otomatis menjadi admin"
        // Let's implement a check: if users table is empty, become admin.
        const { count } = await supabase.from('users').select('*', { count: 'exact', head: true });
        
        const newRole: UserRole = count === 0 ? 'admin' : 'siswa';
        
        // Try inserting into users table
        const { error: insertErr } = await supabase.from('users').insert({
          id: userId,
          name: user?.email?.split('@')[0] || 'Unknown',
          role: newRole
        });
        
        if (insertErr) {
            console.warn("Failed inserting into users table:", insertErr.message);
        }
        setRole(newRole);
      }
    } catch (e) {
      console.error(e);
      setRole('siswa'); // Fallback purely so UI can be viewed
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, user, role, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
