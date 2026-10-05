import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="relative w-full bg-bg px-4 py-3 flex items-start select-none">
      <div className="flex-1 border-t border-fg/40 mt-6.5" />
      <svg 
        className="w-8 h-8 text-fg/40 shrink-0 stroke-current fill-none mx-[-0.5px] mt-4.25" 
        viewBox="0 0 32 32"
      >
        <path d="M 0 10 L 32 32" strokeWidth="1.5" />
      </svg>
      <div className="border-b border-fg/40 px-8 pt-2 pb-3 -mt-1 flex items-center gap-10 shrink-0">
        <button className="bg-white/10 backdrop-blur-2xl border-white/30 border border-solid rounded-md px-3 py-1 text-sm font-bold pointer hover:bg-white/20 transition-all hover:-translate-y-0.5 shine" onClick={() => navigate('/auth?isLogin=true')}>
          Login
        </button>
        
        <h2 className="text-2xl font-black tracking-[0.2em] bg-linear-to-r from-accent-dark via-accent-light to-accent-dark bg-clip-text text-transparent">
          NIQAT
        </h2>

        <button className="bg-white/10 backdrop-blur-2xl border-white/30 border border-solid rounded-md px-3 py-1 text-sm font-bold pointer hover:bg-white/20 transition-all hover:-translate-y-0.5 shine" onClick={() => navigate('/auth')}>
          Sign Up
        </button>
      </div>
      <svg 
        className="w-8 h-8 text-fg/40 shrink-0 stroke-current fill-none mx-[-0.5px] mt-4.25" 
        viewBox="0 0 32 32"
      >
        <path d="M 0 32 L 32 10" strokeWidth="1.5" />
      </svg>
      <div className="flex-1 border-t border-fg/40 mt-6.5" />
    </header>
  );
}