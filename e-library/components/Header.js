import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { HiSun, HiMoon } from "react-icons/hi";

const Header = () => {
  const {theme, setTheme} = useTheme ();
  const [mounted, setMounted] = useState(false);
    
  useEffect(() =>{
    setMounted(true);
  },[]);

  return (
    <header>
      <div className="px-4 py-4 flex justify-end items-center" style={{marginRight: `3.5rem`}}>
        { mounted && (
          theme ==="dark" ?
            <HiSun className="w-10 h-10 text-yellow-500" role="button" onClick={() => setTheme('light')} />
          : 
            <HiMoon className="w-10 h-10 text-gray-900" role="button" onClick={() => setTheme('dark')} />
        )}
      </div>
    </header>
  );
};

export default Header;