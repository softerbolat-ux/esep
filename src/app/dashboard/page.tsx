"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Appointment = {
  id: number;
  time: string;
  client: string;
  phone: string;
  service: string;
  master: string;
  status: string;
};

function getNextStatus(currentStatus: string) {
  if (currentStatus === "Күтіп отыр" || currentStatus === "Күтуде") {
    return "Келмеді";
  }

  if (currentStatus === "Келмеді") {
    return "Келді";
  }

  return "Күтіп отыр";
}

function getStatusClass(status: string) {
  if (status === "Келді") return "arrived";
  if (status === "Келмеді") return "missed";
  return "waiting";
}

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [hiddenIds, setHiddenIds] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);

  async function loadAppointments() {
    setLoading(true);

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("time", { ascending: true });

    if (error) {
      alert("Dashboard оқу қатесі: " + error.message);
      setLoading(false);
      return;
    }

    setAppointments(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  const totalAppointments = appointments.length;

  const arrivedCount = appointments.filter((item) => item.status === "Келді").length;

  const waitingCount = appointments.filter(
    (item) => item.status === "Күтіп отыр" || item.status === "Күтуде"
  ).length;

  const missedCount = appointments.filter((item) => item.status === "Келмеді").length;

  const todayIncome = arrivedCount * 5000;

  const dashboardStats = [
    {
      label: "Бүгінгі жазылулар",
      value: totalAppointments,
      className: "stat-total",
    },
    {
      label: "Келген клиент",
      value: arrivedCount,
      className: "stat-arrived",
    },
    {
      label: "Күтіп отыр",
      value: waitingCount,
      className: "stat-waiting",
    },
    {
      label: "Келмеді",
      value: missedCount,
      className: "stat-missed",
    },
    {
      label: "Бүгінгі табыс",
      value: `${todayIncome.toLocaleString("ru-RU")} ₸`,
      className: "stat-income",
    },
  ];

  const visibleAppointments = appointments.filter(
    (item) => item.status !== "Келді" && !hiddenIds[item.id]
  );

  async function changeClientStatus(appointment: Appointment) {
    const nextStatus = getNextStatus(appointment.status);

    const { error } = await supabase
      .from("appointments")
      .update({ status: nextStatus })
      .eq("id", appointment.id);

    if (error) {
      alert("Статус сақтау қатесі: " + error.message);
      return;
    }

    setAppointments((oldAppointments) =>
      oldAppointments.map((item) =>
        item.id === appointment.id ? { ...item, status: nextStatus } : item
      )
    );

    if (nextStatus === "Келді") {
      setTimeout(() => {
        setHiddenIds((oldHiddenIds) => ({
          ...oldHiddenIds,
          [appointment.id]: true,
        }));
      }, 120000);
    }
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
          <Link href="/">Шығу</Link>
        </nav>
      </aside>

      <main className="content">
        <div className="topbar">
          <div>
            <h1>Шаштараз CRM</h1>
            <p>Бүгінгі жұмыс: клиенттер, жазылулар, табыс.</p>
          </div>

          <div className="badge">Оператор: demo@jisat.kz</div>
        </div>

        <section className="grid">
          {dashboardStats.map((item) => (
            <div className={`stat ${item.className}`} key={item.label}>
              <small>{item.label}</small>
              <strong>{item.value}</strong>
            </div>
          ))}
        </section>

        <section className="two-col">
          <div className="panel">
            <h2>Бүгінгі жазылулар</h2>

            {loading ? (
              <p>Жүктеліп жатыр...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Уақыты</th>
                    <th>Клиент</th>
                    <th>Қызмет</th>
                    <th>Мастер</th>
                    <th>Статус</th>
                  </tr>
                </thead>

                <tbody>
                  {visibleAppointments.map((item) => {
                    const statusClass = getStatusClass(item.status);

                    return (
                      <tr
                        key={item.id}
                        className={`clickable-row row-${statusClass}`}
                        onClick={() => changeClientStatus(item)}
                      >
                        <td>{item.time}</td>
                        <td>{item.client}</td>
                        <td>{item.service}</td>
                        <td>{item.master}</td>
                        <td>
                          <span className={`status status-${statusClass}`}>
                            {item.status === "Күтуде" ? "Күтіп отыр" : item.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}