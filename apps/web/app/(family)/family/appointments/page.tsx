'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, CheckCircle2 } from 'lucide-react';
import { useFamily } from '@/context/family-context';

export default function FamilyAppointmentsPage() {
  const { appointments, addAppointment, family } = useFamily();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [priestName, setPriestName] = useState('Rev. Fr. Parish Priest');
  const [purpose, setPurpose] = useState('Pastoral Counseling');
  const [date, setDate] = useState('2026-08-15');
  const [timeSlot, setTimeSlot] = useState('10:00 AM – 10:30 AM');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAppointment({ priestName, purpose, date, timeSlot });
    setIsModalOpen(false);
  };

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <CalendarIcon className="h-4 w-4" /> Priest Appointments & Pastoral Care
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Priest Appointments
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Book and manage meetings, house blessings, and counseling with the parish priest.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>+ Book Appointment</span>
        </button>
      </div>

      {/* Appointment Schedule List */}
      <div className="space-y-4">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="border-border/80 bg-card hover:border-primary/60 flex flex-wrap items-center justify-between gap-4 rounded-3xl border-2 p-6 shadow-xl transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary rounded-md px-2.5 py-0.5 text-[10px] font-bold">
                  {apt.id}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> {apt.status}
                </span>
              </div>
              <h3 className="font-heading text-foreground text-lg font-bold">{apt.purpose}</h3>
              <p className="text-muted-foreground text-xs font-medium">
                Clergy: <span className="text-foreground font-bold">{apt.priestName}</span> ·
                Family: {family.name} ({family.familyNumber})
              </p>
            </div>

            <div className="bg-muted/40 border-border/60 rounded-2xl border p-4 text-right text-xs">
              <div className="text-foreground flex items-center justify-end gap-1 font-bold">
                <CalendarIcon className="text-primary h-3.5 w-3.5" /> {apt.date}
              </div>
              <div className="text-muted-foreground mt-1 flex items-center justify-end gap-1 text-[11px]">
                <Clock className="h-3.5 w-3.5" /> {apt.timeSlot}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Book Appointment Modal */}
      {isModalOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="border-gold-400/40 bg-card text-card-foreground w-full max-w-lg space-y-6 rounded-3xl border-2 p-6 shadow-2xl">
            <div className="border-border flex items-start justify-between border-b pb-4">
              <div>
                <h3 className="font-heading text-foreground text-xl font-bold">
                  Schedule Priest Appointment
                </h3>
                <p className="text-muted-foreground text-xs">
                  Book a formal pastoral meeting at the Parish Office
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full p-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-muted-foreground mb-1 block font-bold">
                  Select Priest *
                </label>
                <select
                  value={priestName}
                  onChange={(e) => setPriestName(e.target.value)}
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                >
                  <option value="Rev. Fr. Parish Priest">
                    Rev. Fr. Parish Priest (Main Office)
                  </option>
                  <option value="Rev. Fr. Assistant Priest">Rev. Fr. Assistant Priest</option>
                  <option value="Rev. Fr. Anbiyam Chaplain">Rev. Fr. Anbiyam Chaplain</option>
                </select>
              </div>

              <div>
                <label className="text-muted-foreground mb-1 block font-bold">
                  Meeting Purpose *
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                >
                  <option value="Pastoral Counseling">Pastoral Counseling</option>
                  <option value="House Blessing Scheduling">House Blessing Scheduling</option>
                  <option value="Marriage Preparation (Pre-Cana)">
                    Marriage Preparation (Pre-Cana)
                  </option>
                  <option value="Baptismal Consultation">Baptismal Consultation</option>
                  <option value="General Office Meeting">General Office Meeting</option>
                </select>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-muted-foreground mb-1 block font-bold">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
                  />
                </div>

                <div>
                  <label className="text-muted-foreground mb-1 block font-bold">Time Slot *</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                  >
                    <option value="09:30 AM – 10:00 AM">09:30 AM – 10:00 AM</option>
                    <option value="10:00 AM – 10:30 AM">10:00 AM – 10:30 AM</option>
                    <option value="11:00 AM – 11:30 AM">11:00 AM – 11:30 AM</option>
                    <option value="04:30 PM – 05:00 PM">04:30 PM – 05:00 PM</option>
                    <option value="05:30 PM – 06:00 PM">05:30 PM – 06:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="border-border flex justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border-border rounded-xl border px-4 py-2 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="from-gold-400 to-gold-600 rounded-xl bg-gradient-to-r px-5 py-2 font-black text-slate-950 shadow transition-all hover:scale-105"
                >
                  Confirm Appointment Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
