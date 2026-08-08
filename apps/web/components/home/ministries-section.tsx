'use client';

import { Card } from '@/components/ui/card';
import { buttonClassName } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { PARISH } from '@/lib/parish-data';
import {
  Users,
  Landmark,
  Cross,
  BookOpen,
  Zap,
  Heart,
  HandHeart,
  Star,
  Music,
  Sparkles,
  UserPlus,
  ChevronRight,
} from 'lucide-react';
import { SafeImage } from '@/components/ui/safe-image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  users: Users,
  landmark: Landmark,
  cross: Cross,
  'book-open': BookOpen,
  zap: Zap,
  heart: Heart,
  'hand-heart': HandHeart,
  star: Star,
  music: Music,
  sparkles: Sparkles,
};

const ACCENT = [
  'primary',
  'gold',
  'burgundy',
  'primary',
  'gold',
  'burgundy',
  'primary',
  'gold',
  'primary',
  'burgundy',
] as const;
type Accent = (typeof ACCENT)[number];

const BORDER: Record<Accent, string> = {
  primary: 'hover:border-primary',
  gold: 'hover:border-gold-500',
  burgundy: 'hover:border-burgundy-600',
};
const ICON_BG: Record<Accent, string> = {
  primary: 'bg-primary group-hover:bg-primary',
  gold: 'bg-gold-500 group-hover:bg-gold-600',
  burgundy: 'bg-burgundy-600 group-hover:bg-burgundy-700',
};

export function MinistriesSection() {
  const joinable = PARISH.teams.filter((t) => t.joinEnabled);
  const all = PARISH.teams;

  return (
    <section id="ministries" className="section-padding bg-background">
      <div className="container-sacred">
        {/* ── Header ── */}
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="text-primary mb-4 text-sm font-bold uppercase tracking-[0.2em]">
              Serve Together · ஒன்றாக சேவை செய்வோம்
            </p>
            <h2 className="font-display mb-4 text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl lg:text-6xl">
              <span className="text-secondary font-black">Parish</span>{' '}
              <span className="text-primary font-black">Ministries</span>
            </h2>
            <p className="text-lg font-bold text-slate-950">
              Ten vibrant teams — join one and serve God and community
            </p>
            <p
              className="mt-1 text-sm font-bold text-slate-950"
              lang="ta"
              style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
            >
              பத்து உயிரோட்டமான அமைப்புகள் — ஒன்றில் சேர்ந்து சேவை செய்யுங்கள்
            </p>
          </div>
        </ScrollReveal>

        {/* ── Team cards — 1 col mobile, 2 tablet, 3 desktop ── */}
        <div className="mx-auto mb-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {all.map((team, i) => {
            const Icon = ICON_MAP[team.icon] ?? Users;
            const accent = ACCENT[i % ACCENT.length];

            return (
              <ScrollReveal key={team.name} animation="fade-in-up" delay={i * 60} threshold={0.08}>
                <Card
                  className={`card-sacred group h-full p-0 hover:-translate-y-1 hover:shadow-2xl ${BORDER[accent]}`}
                >
                  {/* Cover image */}
                  <div className="bg-muted relative aspect-[16/10] overflow-hidden">
                    <SafeImage
                      src={team.image}
                      alt={team.name}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholderClassName="absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

                    {/* Icon badge */}
                    <div
                      className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105 ${ICON_BG[accent]}`}
                    >
                      <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>

                    {/* Name overlay */}
                    <div className="absolute bottom-4 left-5 right-5">
                      <h3 className="font-display text-xl font-bold leading-tight text-white drop-shadow-md md:text-2xl">
                        {team.name}
                      </h3>
                      <p
                        className="text-gold-300 mt-1 text-xs font-semibold drop-shadow"
                        lang="ta"
                        style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                      >
                        {team.nameTa}
                      </p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col gap-4 p-5 md:p-6">
                    <p className="text-sm font-semibold leading-relaxed text-slate-900 dark:text-slate-100">
                      {team.desc}
                    </p>
                    <p
                      className="text-xs font-semibold leading-loose text-slate-800 dark:text-slate-200"
                      lang="ta"
                      style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                    >
                      {team.descTa}
                    </p>

                    {/* Incharge */}
                    <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-100/90 px-3.5 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800/90">
                      <Users
                        className="text-primary dark:text-gold-400 h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                          Incharge:{' '}
                        </span>
                        <span className="text-xs font-bold text-slate-950 dark:text-white">
                          {team.incharge}
                        </span>
                      </div>
                    </div>

                    {/* Join button — only for joinable teams */}
                    {'joinPath' in team && team.joinEnabled ? (
                      <Link
                        href={team.joinPath as string}
                        className="border-primary/40 bg-primary/10 text-primary dark:bg-primary/20 dark:border-primary/50 hover:bg-primary dark:hover:bg-primary flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-2.5 text-xs font-extrabold shadow-sm transition-all duration-300 hover:text-white dark:text-slate-100"
                      >
                        <UserPlus className="h-3.5 w-3.5" aria-hidden="true" />
                        Request to Join
                        <ChevronRight
                          className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </Link>
                    ) : (
                      <p className="text-center text-[11px] font-bold italic text-slate-700 dark:text-slate-300">
                        Appointed by Parish Priest
                      </p>
                    )}
                  </div>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ── Join CTA banner — Ready to Serve ── */}
        <ScrollReveal animation="fade-in-up" delay={200}>
          <Card className="border-primary/30 from-primary/10 via-gold-500/10 to-primary/5 rounded-2xl border-2 bg-gradient-to-br p-0 shadow-xl">
            <div className="flex flex-col items-center justify-between gap-6 p-8 text-center sm:flex-row sm:p-10 sm:text-left">
              <div>
                <h3 className="font-display mb-2 text-2xl font-black text-slate-950 md:text-3xl dark:text-white">
                  Ready to Serve?
                </h3>
                <p className="text-sm font-semibold text-slate-800 md:text-base dark:text-slate-200">
                  {joinable.length} ministries are open for new members — pick one and begin your
                  journey of service.
                </p>
              </div>
              <Link
                href="/ministries"
                className={buttonClassName(
                  'primary',
                  'lg',
                  'h-12 shrink-0 px-8 font-extrabold shadow-xl',
                )}
              >
                Explore All Ministries
              </Link>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
