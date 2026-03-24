import React, { useState, useEffect } from 'react';
import InvitationCard from './components/InvitationCard';
import invitationDataEn from './data/invitation.json';
import invitationDataVi from './data/invitation_vi.json';
import { LanguageProvider, getLangFromHash } from './i18n';

const dataByLang = { en: invitationDataEn, vi: invitationDataVi };

function App() {
  const [lang, setLang] = useState(getLangFromHash);

  useEffect(() => {
    const onHashChange = () => setLang(getLangFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  return (
    <LanguageProvider lang={lang}>
      <div className="App">
        <InvitationCard data={dataByLang[lang]} />
      </div>
    </LanguageProvider>
  );
}

export default App;
