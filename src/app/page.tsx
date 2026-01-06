import Image from "next/image";
import IntroAnimation from "./components/IntroAnimation";
import PageTransition from "./components/PageTransition";

export default function Home() {
  return (
    <IntroAnimation>
      <PageTransition>
        <div className="flex min-h-screen items-center justify-center font-sans pt-20">
          Hi
        </div>
      </PageTransition>
    </IntroAnimation>
  );
}
