"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Appointment = {
  id?: number;
  time: string;
  client: string;
  phone: string;
  service: string;
  master: string;
  status: string;
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const [client, setClient] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Шаш қию");
  const [time, setTime] = useState("");
  const [master, setMaster] = useState("Арман");

  async function loadAppointments() {
    setLoading(true);

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("time", { ascending: true });

    if (error) {
      alert("Supabase оқу қатесі: " + error.message);
      setLoading(false);
      return;
    }

    setAppointments(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  async function addAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!client.trim()) {
      alert("Клиент атын жазыңыз");
      return;
    }

    if (!phone.trim()) {
      alert("Телефон нөмірін жазыңыз");
      return;
    }

    if (!time) {
      alert("Уақытты таңдаңыз");
      return;
    }

    const newAppointment = {
      client: client.trim(),
      phone: phone.trim(),
      service,
      master,
      time,
      status: "Күтуде",
    };

    const { error } = await supabase
      .from("appointments")
      .insert([newAppointment]);

    if (error) {
      alert("Supabase сақтау қатесі: " + error.message);
      return;
    }

    setClient("");
    setPhone("");
    setService("Шаш қию");
    setTime("");
    setMaster("Арман");

    await loadAppointments();
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-name">Jisat CRM</div>

        <nav className="nav">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/appointments">Жазылулар</Link>
          <Link href="/clients">Клиенттер</Link>
          <Link href="/settings">Қызметтер</Link>
        </nav>
      </aside>

      <main className="content">
        <div className="topbar">
          <div>
            <h1>Жазылулар</h1>
          </div>

          <Link className="badge" href="/dashboard">
            Артқа
          </Link>
        </div>

        <section className="panel">
          <h2>Жаңа жазылу қосу</h2>

          <form className="form" onSubmit={addAppointment}>
            <input
              value={client}
              onChange={(event) => setClient(event.target.value)}
              placeholder="Клиент аты"
            />

            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Телефон"
            />

            <select
              value={service}
              onChange={(event) => setService(event.target.value)}
            >
              <option value="Шаш қию">Шаш қию</option>
              <option value="Бояу">Бояу</option>
              <option value="Сақал реттеу">Сақал реттеу</option>
              <option value="Укладка">Укладка</option>
            </select>

            <input
              value={time}
              onChange={(event) => setTime(event.target.value)}
              type="time"
            />

            <select
              value={master}
              onChange={(event) => setMaster(event.target.value)}
            >
              <option value="Арман">Арман</option>
              <option value="Дина">Дина</option>
              <option value="Ержан">Ержан</option>
              <option value="Айгүл">Айгүл</option>
            </select>

            <button className="primary" type="submit">
              Қосу
            </button>
          </form>
        </section>

        <section className="panel">
          <h2>Тізім</h2>

          {loading ? (
            <p>Жүктеліп жатыр...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Уақыт</th>
                  <th>Клиент</th>
                  <th>Телефон</th>
                  <th>Қызмет</th>
                  <th>Мастер</th>
                  <th>Статус</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((item) => (
                  <tr key={item.id}>
                    <td>{item.time}</td>
                    <td>{item.client}</td>
                    <td>{item.phone}</td>
                    <td>{item.service}</td>
                    <td>{item.master}</td>
                    <td>
                      <span className="status status-waiting">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}