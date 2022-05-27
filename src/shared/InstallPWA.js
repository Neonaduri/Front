import React, { useEffect, useState } from "react";

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  // if (!supportsPWA) {
  //   return null;
  // }
  return (
    <div>
      <span>너나들이를 더욱 편하게 즐기는 방법!</span>
      <span>앱으로 만들기</span>
      <button
        className="link-button"
        id="setup_button"
        aria-label="Install app"
        title="Install app"
        onClick={onClick}
      >
        설치하기
      </button>
    </div>
  );
};

export default InstallPWA;
