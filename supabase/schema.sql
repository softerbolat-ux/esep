-- Шаштараз CRM үшін бастапқы Supabase кестелері

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  notes text,
  created_at timestamptz default now()
);

create table if not exists public.masters (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price integer not null,
  duration_minutes integer not null default 40,
  created_at timestamptz default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  master_id uuid references public.masters(id),
  service_id uuid references public.services(id),
  starts_at timestamptz not null,
  status text not null default 'waiting',
  payment_amount integer default 0,
  comment text,
  created_at timestamptz default now()
);

insert into public.services (name, price, duration_minutes) values
  ('Шаш қию', 6000, 40),
  ('Сақал реттеу', 4000, 25),
  ('Бояу', 18000, 120),
  ('Укладка', 10000, 60)
on conflict do nothing;
