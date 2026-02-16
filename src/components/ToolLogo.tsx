'use client';

export default function ToolLogo({ name, logoUrl, size = 32 }: { name: string; logoUrl: string; size?: number }) {
  return (
    <>
      <img
        src={logoUrl}
        alt={`${name} logo`}
        width={size}
        height={size}
        className={`rounded-full object-contain bg-gray-100 flex-shrink-0`}
        style={{ width: size, height: size }}
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = 'none';
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = 'flex';
        }}
      />
      <div
        className="rounded-full bg-brand-accent text-white items-center justify-center font-bold flex-shrink-0"
        style={{ display: 'none', width: size, height: size, fontSize: size * 0.4 }}
      >
        {name.charAt(0)}
      </div>
    </>
  );
}
