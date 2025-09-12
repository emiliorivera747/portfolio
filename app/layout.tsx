import "../styles/globals.css";
import Script from "next/script";

export const metadata = {
  icons:{
    icon: '/favicon.png'
  },
  title: "Home | Emilio Rivera's Portfolio",
  description:
    "Welcome to Emilio Rivera's Portfolio, a Software Engineer based in San Jose, CA. specializing in React.js, Next.js, and Node.js.",
};

/**
 *
 * The root layout for all of the pages
 *
 * @param children - the child componeent in this case woul be the page.tsx
 * @returns root layout
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-R0GTFSV0LN"
        ></Script>
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-R0GTFSV0LN');`}
        </Script>
      </head>
      <body>

        {children}
      </body>
    </html>
  );
}
