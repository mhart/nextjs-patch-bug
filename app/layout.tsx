import { ReactNode } from 'react';

export const runtime = 'edge';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <link rel="icon" href="data:;base64,="></link>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
