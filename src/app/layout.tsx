import './i18n/i18n';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vehicle Valuation App',
  description: 'Get an instant valuation for your vehicle',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
