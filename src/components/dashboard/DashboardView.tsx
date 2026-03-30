"use client";

import { MenuHeader } from "./MenuHeader";
import { MenuGrid } from "./MenuGrid";
import { OrderHeader } from "./OrderHeader";
import { OrderList } from "./OrderList";
import { OrderSummary } from "./OrderSummary";

export function DashboardView() {
  return (
    <main className="flex h-screen w-full bg-zinc-50 dark:bg-zinc-950 overflow-hidden font-sans main-dashboard-app">
      <section className="flex-1 flex flex-col h-full overflow-hidden border-r border-zinc-200 dark:border-zinc-800">
        <MenuHeader />
        <MenuGrid />
      </section>

      <aside className="w-[28rem] flex flex-col h-full bg-white dark:bg-zinc-900 shadow-2xl relative z-10 border-l border-zinc-200 dark:border-zinc-800">
        <OrderHeader />
        <OrderList />
        <OrderSummary />
      </aside>

      <div className="fixed top-0 right-0 w-1/3 h-full bg-amber-500/5 blur-[150px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/5 blur-[150px] -z-10 pointer-events-none" />
    </main>
  );
}
