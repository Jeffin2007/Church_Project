'use client';

import { Video, FileText, Upload, Play } from 'lucide-react';

export default function AdminMediaPage() {
  const downloads = [
    {
      title: 'Weekly Parish Bulletin - August 2026',
      size: '2.4 MB',
      category: 'BULLETIN',
      count: 184,
    },
    { title: 'Catechism Registration Form 2026-27', size: '450 KB', category: 'FORM', count: 96 },
    {
      title: 'Parish Choir Songbook (Tamil & English)',
      size: '8.1 MB',
      category: 'CHOIR',
      count: 320,
    },
  ];

  return (
    <div className="animate-in fade-in space-y-8">
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Video className="h-4 w-4" /> Downloads & Digital Media
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Media, Bulletins & Livestreams
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Manage weekly PDF bulletins, liturgical downloads, Youtube livestream links, and
            document forms.
          </p>
        </div>

        <button
          type="button"
          className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-105"
        >
          <Upload className="h-4 w-4" />
          <span>Upload Bulletin / Document</span>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Livestream Card */}
        <div className="border-gold-400/40 bg-card space-y-4 rounded-2xl border-2 p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-foreground flex items-center gap-2 text-lg font-bold">
              <Play className="h-5 w-5 text-red-500" /> Sunday Mass Livestream Link
            </h3>
            <span className="rounded border border-red-500/40 bg-red-500/20 px-2 py-0.5 text-[10px] font-black uppercase text-red-400">
              Active Channel
            </span>
          </div>
          <p className="text-muted-foreground text-xs">
            YouTube live embed URL for sick, elderly, and NRI parishioners to tune into Sunday
            Eucharistic celebration.
          </p>
          <input
            type="text"
            readOnly
            value="https://youtube.com/live/queenofallsaints-sunday-mass"
            className="bg-muted text-foreground border-border w-full rounded-xl border p-2.5 font-mono text-xs"
          />
        </div>

        {/* Downloads List */}
        <div className="border-border/80 bg-card space-y-4 rounded-2xl border p-6 shadow-xl">
          <h3 className="font-heading text-foreground flex items-center gap-2 text-lg font-bold">
            <FileText className="text-primary h-5 w-5" /> Published Download Documents
          </h3>
          <div className="space-y-3">
            {downloads.map((d) => (
              <div
                key={d.title}
                className="bg-muted/40 border-border/60 flex items-center justify-between rounded-xl border p-3 text-xs"
              >
                <div>
                  <h4 className="text-foreground font-bold">{d.title}</h4>
                  <span className="text-muted-foreground text-[10px]">
                    {d.size} · {d.count} downloads
                  </span>
                </div>
                <span className="bg-primary/20 text-primary rounded px-2 py-1 text-[10px] font-bold">
                  {d.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
