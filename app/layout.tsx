import type { Metadata } from "next";
import { Nunito, Baloo_2 } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"] });
const baloo = Baloo_2({ variable: "--font-baloo", subsets: ["latin"] });
const metaPixelId = "1188304399132903";

const metaPixelCode = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${metaPixelId}');
fbq('track','PageView');`;

export const metadata: Metadata = {
  title: "DestravaTexto | Mapas de Interpretação",
  description: "120 mapas mentais infantis de interpretação de texto prontos para imprimir.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head><script dangerouslySetInnerHTML={{ __html: metaPixelCode }} /></head>
      <body className={`${nunito.variable} ${baloo.variable}`}>
        <noscript><img height="1" width="1" style={{ display: "none" }} src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`} alt="" /></noscript>
        {children}
      </body>
    </html>
  );
}
