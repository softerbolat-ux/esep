import Link from "next/link";
import { services } from "@/lib/demo-data";

export default function SettingsPage() {
  return (
    <div className="app-shell">
      <aside className="sidebar"><div className="brand-name">Jisat CRM</div><nav className="nav"><Link href="/dashboard">Dashboard</Link><Link href="/appointments">Жазылулар</Link><Link href="/clients">Клиенттер</Link><Link href="/settings">Қызметтер</Link></nav></aside>
      <main className="content">
        <div className="topbar"><h1>Қызметтер мен бағалар</h1><Link className="badge" href="/dashboard">Dashboard</Link></div>
        <section className="two-col">
          <div className="panel">
            <h2>Қызмет қосу</h2>
            <form className="form">
              <input placeholder="Қызмет атауы" />
              <input placeholder="Бағасы" />
              <input placeholder="Ұзақтығы" />
              <button className="primary" type="button">Сақтау</button>
            </form>
          </div>
          <div className="panel">
            <h2>Қазіргі қызметтер</h2>
            <table><thead><tr><th>Атауы</th><th>Баға</th><th>Уақыт</th></tr></thead><tbody>{services.map((s) => <tr key={s.name}><td>{s.name}</td><td>{s.price}</td><td>{s.duration}</td></tr>)}</tbody></table>
          </div>
        </section>
      </main>
    </div>
  );
}
