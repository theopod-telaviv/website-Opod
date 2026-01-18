"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { buildSimpleBookingUrl, trackBookingEvent } from "@/lib/simplebooking";
import { toast } from "sonner";

interface BookingWidgetProps {
  locale: 'he' | 'en' | 'fr';
  capsuleSlug?: string;
}

export function BookingWidget({ locale, capsuleSlug }: BookingWidgetProps) {
  const t = useTranslations('booking');
  const [checkin, setCheckin] = useState<Date>();
  const [checkout, setCheckout] = useState<Date>();
  const [adults, setAdults] = useState<string>("1");
  const [children, setChildren] = useState<string>("0");
  const [rooms, setRooms] = useState<string>("1");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkinOpen, setCheckinOpen] = useState(false);

  const handleCheckinSelect = (date: Date | undefined) => {
    setCheckin(date);
    if (date) {
      // Close checkin popover and open checkout popover
      setCheckinOpen(false);
      setTimeout(() => {
        setCheckoutOpen(true);
      }, 100);
    }
  };

  const handleBooking = () => {
    const criteria = {
      locale,
      checkin: checkin ? format(checkin, 'yyyy-MM-dd') : undefined,
      checkout: checkout ? format(checkout, 'yyyy-MM-dd') : undefined,
      adults: parseInt(adults),
      children: parseInt(children),
      rooms: parseInt(rooms),
      roomType: capsuleSlug,
    };

    trackBookingEvent('begin_checkout', criteria);

    const bookingUrl = buildSimpleBookingUrl(criteria);

    trackBookingEvent('outbound_click', criteria);

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('lastBookingCriteria', JSON.stringify(criteria));
    }

    toast.info(t('redirect'));

    setTimeout(() => {
      window.open(bookingUrl, '_blank', 'noopener,noreferrer');
    }, 500);
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-lg">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* CHECKIN (qui est maintenant "Départ/Check-out" dans les traductions) EN PREMIER */}
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              {t('checkin')}
            </label>
            <Popover open={checkinOpen} onOpenChange={setCheckinOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkin ? format(checkin, 'PP') : <span className="text-neutral-500">{t('pickDate')}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkin}
                  onSelect={handleCheckinSelect}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* CHECKOUT (qui est maintenant "Arrivée/Check-in" dans les traductions) EN DEUXIÈME */}
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              {t('checkout')}
            </label>
            <Popover open={checkoutOpen} onOpenChange={setCheckoutOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkout ? format(checkout, 'PP') : <span className="text-neutral-500">{t('pickDate')}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkout}
                  onSelect={(date) => {
                    setCheckout(date);
                    setCheckoutOpen(false);
                  }}
                  disabled={(date) => date < (checkin || new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              <Users className="inline h-4 w-4 mr-1" />
              {t('adults')}
            </label>
            <Select value={adults} onValueChange={setAdults}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4].map((n) => (
                  <SelectItem key={n} value={n.toString()}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              {t('children')}
            </label>
            <Select value={children} onValueChange={setChildren}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3].map((n) => (
                  <SelectItem key={n} value={n.toString()}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              {t('rooms')}
            </label>
            <Select value={rooms} onValueChange={setRooms}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4].map((n) => (
                  <SelectItem key={n} value={n.toString()}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleBooking}
          className="w-full bg-[#2EC4B6] hover:bg-[#28b0a3] text-white"
          size="lg"
        >
          {t('bookNow')}
        </Button>
      </div>
    </div>
  );
}
