import Image from "next/image";

export function HangingLamp() {
  return (
    <div className="hanging-lamp" data-component="hanging-lamp" aria-hidden="true">
      <Image src="/pendent_off.svg" alt="" width={90} height={216} priority />
    </div>
  );
}
