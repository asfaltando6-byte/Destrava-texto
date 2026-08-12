"use client";

import { useEffect, useMemo, useState } from "react";

type Activity = {
  visits30m: number;
  offerClicks24h: number;
};

type Notice = { id: string; icon: string; title: string; detail: string };

function plural(value: number, singular: string, pluralWord: string) {
  return value === 1 ? singular : pluralWord;
}

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

export function PurchaseNotifications() {
  const [activity, setActivity] = useState<Activity>({ visits30m: 0, offerClicks24h: 0 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const sessionId = sessionStorage.getItem("destrava-session") ?? makeId();
    sessionStorage.setItem("destrava-session", sessionId);

    async function send(kind: "visit" | "offer_click") {
      const id = kind === "visit" ? `${sessionId}:visit` : `${sessionId}:click:${makeId()}`;
      const response = await fetch("/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, sessionId, kind }),
      });
      if (response.ok && !cancelled) setActivity(await response.json() as Activity);
    }

    async function refresh() {
      try {
        const activityResponse = await fetch("/api/activity", { cache: "no-store" });
        if (cancelled) return;
        if (activityResponse.ok) setActivity(await activityResponse.json() as Activity);
      } catch {
        // Mantém o aviso oculto quando os dados reais não estão disponíveis.
      }
    }

    send("visit").catch(refresh);
    const clickHandler = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target?.closest("a.cta, a.buy-button")) send("offer_click").then(refresh).catch(() => {});
    };
    document.addEventListener("click", clickHandler);
    const poller = window.setInterval(() => {
      if (document.visibilityState === "visible") refresh();
    }, 30_000);
    return () => {
      cancelled = true;
      document.removeEventListener("click", clickHandler);
      window.clearInterval(poller);
    };
  }, []);

  const notices = useMemo<Notice[]>(() => {
    const items: Notice[] = [];
    if (activity.visits30m > 0) {
      const people = `${activity.visits30m} ${plural(activity.visits30m, "pessoa", "pessoas")}`;
      const visits = `${activity.visits30m} ${plural(activity.visits30m, "visita recente", "visitas recentes")}`;
      items.push(
        { id: "visits-1", icon: "👀", title: `${people} ${plural(activity.visits30m, "visitou", "visitaram")} esta página`, detail: "Nos últimos 30 minutos" },
        { id: "visits-2", icon: "⚡", title: `${visits} no DestravaTexto`, detail: "Movimento real desta página" },
        { id: "visits-3", icon: "🧠", title: `${people} ${plural(activity.visits30m, "conheceu", "conheceram")} os mapas`, detail: "Visitas registradas recentemente" },
        { id: "visits-4", icon: "✨", title: "Tem gente conhecendo o DestravaTexto", detail: `${visits} nos últimos 30 minutos` },
      );
    }
    if (activity.offerClicks24h > 0) {
      const people = `${activity.offerClicks24h} ${plural(activity.offerClicks24h, "pessoa", "pessoas")}`;
      const accesses = `${activity.offerClicks24h} ${plural(activity.offerClicks24h, "acesso", "acessos")}`;
      items.push(
        { id: "clicks-1", icon: "🔥", title: `${people} ${plural(activity.offerClicks24h, "abriu", "abriram")} a oferta`, detail: "Nas últimas 24 horas" },
        { id: "clicks-2", icon: "🎯", title: `${accesses} à oferta completa`, detail: "Interesse registrado nas últimas 24 horas" },
        { id: "clicks-3", icon: "📚", title: `${people} ${plural(activity.offerClicks24h, "chegou", "chegaram")} até a oferta`, detail: "Atividade real desta página" },
        { id: "clicks-4", icon: "💜", title: "A oferta do DestravaTexto está recebendo visitas", detail: `${accesses} nas últimas 24 horas` },
      );
    }
    return items;
  }, [activity]);

  useEffect(() => {
    if (notices.length < 2) return;
    const rotator = window.setInterval(
      () => setActive((current) => (current + 1) % notices.length),
      4_800,
    );
    return () => window.clearInterval(rotator);
  }, [notices.length]);

  if (!notices.length) return null;
  const notice = notices[active % notices.length];

  return (
    <aside key={notice.id} className="purchase-notice" aria-live="polite" aria-label="Atividade real da página">
      <b aria-hidden="true">{notice.icon}</b>
      <span><strong>{notice.title}</strong>{notice.detail}</span>
    </aside>
  );
}
