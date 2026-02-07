import React from 'react';

export const EvrimAluc = () => {
  return (
    <div className="pt-32 container mx-auto px-6">
      <div className="glass p-10 rounded-[2.5rem] max-w-4xl mx-auto shadow-2xl">
        <h1 className="text-4xl font-bold text-accent mb-6">Evrim Aluç</h1>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold opacity-90">Full Stack Developer</h2>
            <p className="opacity-80 leading-relaxed">
              Java Spring Boot ve React mimarileri üzerine uzmanlaşmış, ölçeklenebilir backend sistemleri geliştiren bir yazılımcı.
            </p>
          </div>
          <div className="bg-accent/5 p-6 rounded-3xl border border-accent/10">
            <h3 className="font-bold mb-4">Core Skills</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Java & Spring Framework</li>
              <li>SQL & Database Management</li>
              <li>System Architecture</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EvrimAluc;