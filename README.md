# Jisat CRM — шаштаразға арналған кіші CRM

Бұл жоба HTML landing page негізінде Next.js App Router форматына көшірілді.

## Не бар?

- `/` — Google арқылы кіру беті, әзірге demo режимінде `/dashboard` бетіне өткізеді
- `/dashboard` — негізгі CRM панелі
- `/appointments` — жазылулар беті
- `/clients` — клиенттер базасы
- `/settings` — қызметтер мен бағалар
- `supabase/schema.sql` — Supabase үшін бастапқы кестелер

## Іске қосу

```bash
npm install
npm run dev
```

Сосын браузерде ашыңыз:

```bash
http://localhost:3000
```

## Supabase қосу

1. Supabase-та жаңа project жасаңыз.
2. SQL Editor ішіне `supabase/schema.sql` кодын қойып, Run басыңыз.
3. `.env.example` файлын `.env.local` деп көшіріңіз.
4. `NEXT_PUBLIC_SUPABASE_URL` және `NEXT_PUBLIC_SUPABASE_ANON_KEY` мәндерін қойыңыз.
5. Google Auth provider қосыңыз.

## Келесі қадам

Келесі итерацияда demo data орнына Supabase-тен нақты клиенттер мен жазылуларды оқимыз.
