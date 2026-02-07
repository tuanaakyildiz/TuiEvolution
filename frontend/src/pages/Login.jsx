import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth(); // Context'ten gelen login fonksiyonu
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basit doğrulama simülasyonu
    if (!email || !password) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    // Backend olmadığı için şimdilik mock login
    if (isLogin) {
      // GİRİŞ İŞLEMİ
      // Gerçekte burada: axios.post('/api/login', {email, password})
      if (email === "admin@test.com" && password === "123456") {
         login({ name: "Admin User", email: email });
         navigate('/profile'); // Başarılıysa profile git
      } else {
         setError("Hatalı e-posta veya şifre.");
      }
    } else {
      // KAYIT İŞLEMİ
      // Gerçekte burada: axios.post('/api/register', ...)
      if (email === "admin@test.com") {
        setError("Bu e-posta adresi zaten kayıtlı."); // Var olan hesap hatası
      } else {
        // Kayıt başarılı varsayalım ve giriş yaptıralım
        login({ name: "Yeni Kullanıcı", email: email });
        navigate('/profile');
      }
    }
  };

  return (
    <div className="min-h-screen pt-32 flex justify-center items-start">
      <div className="glass p-8 rounded-3xl w-full max-w-md mx-4">
        <h2 className="text-3xl font-bold text-accent dark:text-darkAccent mb-6 text-center">
          {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">E-Posta</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/50 dark:bg-black/20 border border-accent/20 focus:outline-none focus:border-accent"
              placeholder="ornek@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Şifre</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/50 dark:bg-black/20 border border-accent/20 focus:outline-none focus:border-accent"
              placeholder="******"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-accent hover:bg-opacity-90 text-white font-bold py-3 rounded-xl transition-all shadow-lg"
          >
            {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm opacity-80">
            {isLogin ? "Hesabınız yok mu?" : "Zaten bir hesabınız var mı?"}
          </p>
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-accent dark:text-darkAccent font-bold hover:underline mt-1"
          >
            {isLogin ? "Hemen Kayıt Ol" : "Giriş Yap"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;