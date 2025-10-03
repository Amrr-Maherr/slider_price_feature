import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import PriceSlider from "@/Features/PriceSliderFeature/PriceSlider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} bg-white flex items-center justify-center h-screen`}
    >
      <PriceSlider/>
    </div>
  );
}
