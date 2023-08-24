import { ThemeProvider } from '@/components/theme-provider';
import { ReactNode } from 'react';

export default function Home({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  );
}
