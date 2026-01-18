"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const locales = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
];

interface LocaleSwitcherProps {
  locale: string;
}

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLocaleChange = (newLocale: string) => {
    // Remove the current locale from pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
    // Build new path with new locale
    const newPath = `/${newLocale}${pathWithoutLocale || ''}`;

    // Force a hard navigation to reload all content
    window.location.href = newPath;
  };

  const currentLocale = locales.find((l) => l.code === locale) || locales[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLocale.name}</span>
          <span className="sm:hidden">{currentLocale.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc.code}
            onClick={() => handleLocaleChange(loc.code)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span>{loc.flag}</span>
            <span>{loc.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
