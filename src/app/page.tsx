"use client";

import { useState } from "react";
import Link from "next/link";

const translations = {
  kk: {
    title: "Құрметті КӘСІПКЕР",
    welcomeText: "Сізді JISATU веб-қосымшасын таңдағаныңыз үшін алғыс білдіреміз!",
    descriptionText: "Jisat — шаштаразға жазылуларды, клиенттерді, келді/келмеді статусын және күнделікті табысты бақылауға көмектесетін кіші CRM жүйесі.",
    loginText: "Кіру: CRM-ге Google аккаунт арқылы кіруге болады.",
    googleButtonText: "Google арқылы кіру"
  },
  ru: {
    title: "Уважаемый ПРЕДПРИНИМАТЕЛЬ",
    welcomeText: "Благодарим вас за выбор веб-приложения JISATU!",
    descriptionText: "Jisat — небольшая CRM для барбершопа или салона: записи, клиенты, статусы посещения и ежедневная выручка.",
    loginText: "Вход: в CRM можно войти через Google аккаунт.",
    googleButtonText: "Войти через Google"
  },
  en: {
    title: "Dear ENTREPRENEUR",
    welcomeText: "Thank you for choosing the JISATU web application!",
    descriptionText: "Jisat is a small CRM for barbershops: appointments, clients, visit statuses and daily revenue.",
    loginText: "Login: you can enter the CRM with a Google account.",
    googleButtonText: "Sign in with Google"
  }
};

type Lang = keyof typeof translations;

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("kk");
  const text = translations[lang];

  return (
    <main className="page-center">
      <div className="login-card">
        <header className="header">
          <div className="brand">
            <div className="logo-circle">₸</div>
            <div className="brand-name">Jisat</div>
          </div>
          <select className="language-select" value={lang} onChange={(e) => setLang(e.target.value as Lang)}>
            <option value="kk">Қазақша</option>
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </header>

        <section className="white-card">
          <h1 className="card-title">{text.title}</h1>
          <div className="card-text">
            <p><strong>{text.welcomeText}</strong></p>
            <p>{text.descriptionText}</p>
            <p>{text.loginText}</p>
          </div>
        </section>

        <section className="google-section">
          <Link className="google-btn" href="/dashboard">
            <span>G</span>
            <span>{text.googleButtonText}</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
