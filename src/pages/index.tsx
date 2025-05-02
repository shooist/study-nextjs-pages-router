import App250417 from "@/components/250417";
import TanStackSample from "@/components/TanStackSample";
import TanStackSampleValibot from "@/components/TanStackSampleValibot";
// import { PeoplePage } from "@/components/People/People";
// import TanStackSplitSample from "@/components/TanStackSplitSample";
import localFont from "next/font/local";
// import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="">hoge</div>
        {/* <TanStackSample /> */}
        <TanStackSampleValibot />
        {/* <TanStackSplitSample /> */}
        {/* <Suspense fallback={<p>Loading...</p>}>
          <PeoplePage />
        </Suspense> */}
        {/* <App250417 /> */}
      </main>
    </div>
  );
}
