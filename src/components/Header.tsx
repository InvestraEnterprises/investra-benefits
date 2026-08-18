'use client';

export default function Header() {
  return (
    <div className="flex flex-col items-center justify-center py-6 bg-[#103B56] shadow-md">
      <img 
        src="/1680098193895.jpg" 
        alt="INVESTRA ENTERPRISES LTD" 
        className="h-24 object-contain"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          document.getElementById('fallback-logo')!.style.display = 'block';
        }}
      />
      <div id="fallback-logo" className="hidden text-2xl font-bold tracking-widest text-white uppercase">
        INVESTRA
      </div>
      <div className="text-[10px] tracking-widest text-[#D2B06A] uppercase font-bold mt-2">
        Guest Benefits
      </div>
    </div>
  );
}
