import Link from "next/link";

export function CippLinkText({ text, disabled = false }: { text: string; disabled?: boolean }) {
  const parts = text.split(/(CIPP)/g);

  return (
    <>
      {parts.map((part, index) =>
        part === "CIPP" && !disabled ? (
          <Link key={`${part}-${index}`} href="/sewer-pipe-lining" className="font-black text-[#0b63ce] hover:text-[#d71920] hover:underline">
            CIPP
          </Link>
        ) : (
          part
        ),
      )}
    </>
  );
}
