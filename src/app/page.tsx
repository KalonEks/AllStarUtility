import { HomePage } from "@/components/home-page";
import { LocalBusinessJsonLd } from "@/components/json-ld";

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd />
      <HomePage />
    </>
  );
}
