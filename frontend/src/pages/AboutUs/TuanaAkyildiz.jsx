import React from 'react';

export const TuanaAkyildiz = () => {
  return (
    <div className="pt-32 container mx-auto px-6">
      <div className="glass p-10 rounded-[2.5rem] max-w-4xl mx-auto shadow-2xl border-pink-300/20">
        <h1 className="text-4xl font-bold text-accent mb-6">Tuana Akyıldız</h1>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold opacity-90">Frontend Developer & Designer</h2>
            <p className="opacity-80 leading-relaxed">
              Modern UI/UX prensiplerini kodla birleştiren, kullanıcı odaklı ve estetik arayüzler tasarlayan bir geliştirici.
            </p>
          </div>
          <div className="bg-accent/5 p-6 rounded-3xl border border-accent/10">
            <h3 className="font-bold mb-4">Expertise</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>React & Tailwind CSS</li>
              <li>UI/UX Design Systems</li>
              <li>Motion Graphics (Framer Motion)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TuanaAkyildiz;