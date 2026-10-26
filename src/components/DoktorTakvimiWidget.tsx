import { useEffect, useRef } from "react";

const SCRIPT_ID = "zl-widget-s";
const SCRIPT_SRC = "https://platform.docplanner.com/js/widget.js";

type Props = {
  doctor: string;
  profileUrl: string;
};

// DoktorTakvimi (Docplanner) widget'ı.
// widget.js yüklendiği anda sayfadaki .zl-url linklerini bulup yerine bir iframe koyuyor ve
// başka bir başlatma fonksiyonu sunmuyor. Bu yüzden:
//  - linki React'in yönetmediği bir kutuya elle yazıyoruz (script onu sildiğinde React bozulmasın),
//  - bileşen her açıldığında script'i yeniden ekliyoruz ki sayfa geçişlerinden sonra da takvim çıksın.
export function DoktorTakvimiWidget({ doctor, profileUrl }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const link = document.createElement("a");
    link.id = "zl-url";
    link.className = "zl-url";
    link.href = profileUrl;
    link.rel = "nofollow";
    link.textContent = "Randevu al";
    link.dataset.zlwDoctor = doctor;
    link.dataset.zlwType = "big_with_calendar";
    link.dataset.zlwOpinion = "false";
    link.dataset.zlwHideBranding = "true";
    link.dataset.zlwSaasOnly = "true";
    link.dataset.zlwA11yTitle = "Doktor randevu widgeti";
    container.replaceChildren(link);

    document.getElementById(SCRIPT_ID)?.remove();
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      container.replaceChildren();
    };
  }, [doctor, profileUrl]);

  return <div ref={containerRef} className="w-full min-h-[480px]" />;
}
