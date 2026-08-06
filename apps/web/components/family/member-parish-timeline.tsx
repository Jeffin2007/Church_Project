'use client';

import React from 'react';
import { DetailedFamilyMember } from '@/context/family-context';

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  icon: string;
  description?: string;
  badgeColor: string;
}

export function generateMemberTimelineEvents(
  member: DetailedFamilyMember,
  houseBlessingDate?: string,
): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  // Birth
  if (member.dob) {
    events.push({
      id: `birth-${member.id}`,
      title: 'Born in Faith',
      date: member.dob,
      icon: '👶',
      description: `Born on ${member.dob}`,
      badgeColor: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
    });
  }

  // Baptism
  if (member.baptism?.completed && member.baptism.date) {
    events.push({
      id: `baptism-${member.id}`,
      title: 'Sacrament of Holy Baptism',
      date: member.baptism.date,
      icon: '✝',
      description: `Baptized at ${member.baptism.church || member.baptism.parish || 'Parish'}`,
      badgeColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    });
  }

  // First Holy Communion
  if (member.firstCommunion?.completed && member.firstCommunion.date) {
    events.push({
      id: `fc-${member.id}`,
      title: 'First Holy Communion',
      date: member.firstCommunion.date,
      icon: '🍞',
      description: `Received Holy Eucharist at ${member.firstCommunion.church || 'Parish Church'}`,
      badgeColor: 'border-gold-500/40 bg-gold-500/10 text-gold-300',
    });
  }

  // Confirmation
  if (member.confirmation?.completed && member.confirmation.date) {
    events.push({
      id: `confirmation-${member.id}`,
      title: 'Sacrament of Confirmation',
      date: member.confirmation.date,
      icon: '🕊',
      description: `Sealed with Holy Spirit at ${member.confirmation.church || 'Parish Church'}`,
      badgeColor: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-400',
    });
  }

  // Holy Matrimony
  if (member.marriage?.completed && member.marriage.date) {
    events.push({
      id: `marriage-${member.id}`,
      title: 'Sacrament of Holy Matrimony',
      date: member.marriage.date,
      icon: '💍',
      description: `United in Holy Matrimony ${
        member.marriage.spouseName ? `with ${member.marriage.spouseName}` : ''
      } at ${member.marriage.church || 'Catholic Church'}`,
      badgeColor: 'border-purple-500/40 bg-purple-500/10 text-purple-400',
    });
  }

  // Holy Orders / Religious Profession
  if (member.holyOrders && member.holyOrders.type !== 'NONE' && member.holyOrders.date) {
    events.push({
      id: `orders-${member.id}`,
      title: `Holy Orders: Ordained ${member.holyOrders.type}`,
      date: member.holyOrders.date,
      icon: '👑',
      description: `Ordained as Catholic ${member.holyOrders.type}`,
      badgeColor: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    });
  }

  // House Blessing (if head or spouse)
  if (houseBlessingDate && (member.relation === 'Head of Family' || member.relation === 'Spouse')) {
    events.push({
      id: `blessing-${member.id}`,
      title: 'Annual Family House Blessing',
      date: houseBlessingDate,
      icon: '🙏',
      description: `Parish priest completed annual house blessing`,
      badgeColor: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
    });
  }

  // Ministry Engagement
  if (
    member.isChoirMember ||
    member.isMinistryMember ||
    member.isLegionOfMary ||
    member.isVincentDePaul ||
    member.isAltarServer
  ) {
    events.push({
      id: `ministry-${member.id}`,
      title: 'Joined Parish Pastoral Ministry',
      date: member.dob ? `${member.dob.slice(0, 4)}-06-01` : '2020-01-01',
      icon: '🎉',
      description: `Active member of parish lay apostolate`,
      badgeColor: 'border-teal-500/40 bg-teal-500/10 text-teal-400',
    });
  }

  // Sort events chronologically
  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function MemberParishTimeline({
  member,
  houseBlessingDate,
}: {
  member: DetailedFamilyMember;
  houseBlessingDate?: string;
}) {
  const events = generateMemberTimelineEvents(member, houseBlessingDate);

  if (events.length === 0) {
    return (
      <div className="bg-muted/30 border-border/60 text-muted-foreground rounded-2xl border p-4 text-center text-xs">
        No parish milestone events recorded.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border-border/60 flex items-center gap-2 border-b pb-2">
        <span className="text-base">📜</span>
        <h4 className="font-heading text-foreground text-sm font-bold">
          Sacramental & Parish Milestone History
        </h4>
      </div>

      <div className="before:bg-border/60 relative space-y-4 pl-6 before:absolute before:bottom-2 before:left-2.5 before:top-2 before:w-0.5">
        {events.map((event) => (
          <div key={event.id} className="group relative">
            {/* Timeline Dot */}
            <div className="bg-card border-border absolute -left-6 top-1 flex h-5 w-5 items-center justify-center rounded-full border text-[10px] shadow">
              {event.icon}
            </div>

            <div
              className={`rounded-2xl border p-3.5 text-xs transition-all hover:scale-[1.01] ${event.badgeColor}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-1 font-bold">
                <span className="font-heading text-sm">{event.title}</span>
                <span className="text-[10px] opacity-80">{event.date}</span>
              </div>
              {event.description && (
                <p className="mt-1 text-[11px] opacity-90">{event.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
