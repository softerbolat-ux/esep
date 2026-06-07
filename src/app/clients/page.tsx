import Link from "next/link";
import { clients } from "@/lib/demo-data";

export default function ClientsPage() {
  return (
    <div className="app-shell">
      <aside className="sidebar"><div className="brand-name">Jisat CRM</div><nav className="nav"><Link href="/dashboard">Dashboard</Link><Link href="/appointments">Жазылулар</Link><Link href="/clients">Клиенттер</Link><Link href="/settings">Қызметтер</Link></nav></aside>
      <main className="content">
        <div className="topbar"><h1>Клиенттер базасы</h1><span className="badge">{clients.length} клиент</span></div>
        <div className="panel">
          <table>
            <thead><tr><th>Аты</th><th>Телефон</th><th>Келу саны</th><th>Соңғы келуі</th><th>Жалпы төлем</th></tr></thead>
            <tbody>{clients.map((c) => <tr key={c.phone}><td>{c.name}</td><td>{c.phone}</td><td>{c.visits}</td><td>{c.lastVisit}</td><td>{c.total}</td></tr>)}</tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
