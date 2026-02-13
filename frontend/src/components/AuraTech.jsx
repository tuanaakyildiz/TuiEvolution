import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MessageCircle, X, Bot, ChevronRight, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuraTech = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Başlangıç mesajı
  const initialMessages = [
    { 
      id: 1, 
      sender: 'bot', 
      text: "Merhaba! Ben AuraTech 👋 Size nasıl yardımcı olabilirim?", 
      options: [
        { label: "Projeleriniz neler?", value: "projects" },
        { label: "Ekip hakkında bilgi ver", value: "team" },
        { label: "İletişime geçmek istiyorum", value: "contact" }
      ]
    }
  ];

  const [messages, setMessages] = useState(initialMessages);
  
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Helper: Başlığı URL uyumlu slug'a çevirir (Projects.jsx ile aynı mantık)
  // Örnek: "TuiEvolution AI" -> "TuiEvolution_AI"
  const getProjectSlug = (title) => title ? title.trim().replace(/\s+/g, '_') : '';

  // 1. Veritabanından Projeleri Çekme
  useEffect(() => {
    axios.get('https://tuievolution-backend.onrender.com')
      .then(res => setProjects(res.data))
      .catch(err => console.error("Projeler yüklenemedi:", err));
  }, []);

  // Mesaj geldiğinde otomatik aşağı kaydır
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // SIFIRLAMA VE KAPATMA FONKSİYONU
  const closeAndReset = () => {
    setIsOpen(false);
    setTimeout(() => {
      setMessages(initialMessages);
    }, 300);
  };

  // Yönlendirme ve Sıfırlama Yardımcısı
  const handleNavigation = (path) => {
    navigate(path);
    closeAndReset();
  };

  // Seçeneklere Tıklama Mantığı
  const handleOptionClick = (option) => {
    const userMessage = { id: Date.now(), sender: 'user', text: option.label };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = { id: Date.now() + 1, sender: 'bot', text: "", options: [] };

      switch (option.value) {
        case 'projects':
          botResponse.text = "Şu anda geliştirdiğimiz harika projelerimiz var! Hangisi hakkında detay istersiniz?";
          botResponse.options = projects.map(p => ({
            label: p.title,
            value: `project_detail_${p.id}`,
            projectData: p
          }));
          break;

        case 'team':
          botResponse.text = "Ekibimiz, modern teknolojileri kullanan yetenekli geliştiricilerden oluşuyor. Detaylı bilgi sayfasına gitmek ister misiniz?";
          botResponse.options = [
            { label: "Evet, Hakkımızda'ya git", value: "navigate_about" },
            { label: "Ana Menüye Dön", value: "menu" }
          ];
          break;

        case 'contact':
          botResponse.text = "Bize info.tuievolution@gmail.com adresinden ulaşabilirsiniz. İletişim sayfasına yönlendirmemi ister misiniz?";
          botResponse.options = [
            { label: "Evet, yönlendir", value: "navigate_contact" },
            { label: "Hayır, teşekkürler", value: "end_chat" }
          ];
          break;

        case 'navigate_about':
          handleNavigation('/about');
          return;

        case 'navigate_contact':
          handleNavigation('/contact');
          return;
        
        case 'menu':
          botResponse.text = "Başka nasıl yardımcı olabilirim?";
          botResponse.options = initialMessages[0].options;
          break;
        
        case 'end_chat':
          botResponse.text = "Peki, iyi günler dilerim! 👋 Sohbeti kapatıyorum.";
          setTimeout(() => closeAndReset(), 1500);
          break;

        default:
          if (option.value.startsWith('project_detail_')) {
            const project = option.projectData;
            botResponse.text = `${project.title}: ${project.description || "Bu proje modern teknolojilerle geliştirildi."} \n\nBu projeye gitmek ister misiniz?`;
            
            // GÜNCELLEME: Proje ID'si yerine Slug ID kullanmak için veriyi saklıyoruz
            botResponse.options = [
              { label: "Projeye Git", value: `go_project`, projectData: project },
              { label: "Diğer Projeler", value: "projects" }
            ];
          } 
          // GÜNCELLEME: Projeye Git butonu tıklandığında doğru Slug ile yönlendirme
          else if (option.value === 'go_project') {
            const project = option.projectData; // Proje verisini al
            const slug = getProjectSlug(project.title); // Slug oluştur (Örn: TuiEvolution_AI)
            
            handleNavigation(`/projects#${slug}`); // Yönlendir ve Sıfırla
            return;
          }
      }

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans flex flex-col items-end">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[350px] h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/20 backdrop-blur-md"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          >
            <div 
              className="p-4 flex justify-between items-center border-b border-white/10 text-white dark:text-[#1A0B2E]" 
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <div className="flex items-center gap-2">
                <Bot size={24} />
                <div>
                  <h3 className="font-bold text-md">AuraTech</h3>
                  <span className="text-xs opacity-80 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse border border-white/50"></span> Çevrimiçi
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button onClick={() => setMessages(initialMessages)} title="Sohbeti Sıfırla" className="hover:opacity-70 transition-opacity">
                    <RefreshCw size={18} />
                </button>
                <button onClick={closeAndReset} title="Kapat" className="hover:opacity-70 transition-opacity">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div 
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-white/40 text-right rounded-tr-none border border-white/30' 
                        : 'bg-black/5 dark:bg-black/20 text-left rounded-tl-none border border-black/5'
                    }`}
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {msg.text}
                  </div>
                  
                  {msg.sender === 'bot' && msg.options && (
                    <div className="flex flex-col gap-2 mt-2 w-full max-w-[85%]">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(opt)}
                          className="text-xs px-4 py-3 rounded-xl border hover:scale-[1.02] transition-all active:scale-95 text-left flex justify-between items-center group shadow-sm"
                          style={{ 
                            backgroundColor: 'var(--bg-primary)', 
                            color: 'var(--text-primary)',
                            borderColor: 'var(--accent)'
                          }}
                        >
                          {opt.label}
                          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent)' }}/>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-center gap-1 text-xs opacity-50 ml-2" style={{ color: 'var(--text-primary)' }}>
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce delay-200"></span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 text-center text-[10px] opacity-50 border-t border-white/10" style={{ color: 'var(--text-primary)' }}>
              Powered by TuiEvolution AI
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => isOpen ? closeAndReset() : setIsOpen(true)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20 transition-colors"
        style={{ backgroundColor: 'var(--accent)', color: 'white' }}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>
    </div>
  );
};

export default AuraTech;