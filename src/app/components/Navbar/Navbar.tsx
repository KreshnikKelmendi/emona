import EmonaBrandLogo from "../SvgIcons/EmonaBrandLogo";
import CajiZemresLogo from "../SvgIcons/CajiZemresLogo";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar flex flex-col items-center">
      <div className="navbar-brand flex flex-col items-center">
        <EmonaBrandLogo />
        <div className="pt-6">
        <CajiZemresLogo />
        </div>
        <p className="text-center text-[30px] font-anton mt-4 text-[#FFE0B2]">Luaj me Çajin e Zemrës!</p>
        <p className="text-center text-[13px] font-bwseidoround-thin mt-2 w-[268px] pb-6 lg:w-3/4 text-[#FFE0B2]">Merr pjesë në lojën shpërblyese dhe përjeto dashurinë që vjen me çdo gllënjkë  </p>
        
      </div>
    </nav>
  );
}
