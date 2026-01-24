import React from 'react';
import InvitationCard from './components/InvitationCard';
import invitationData from './data/invitation.json';

function App() {
  return (
    <div className="App">
      <InvitationCard data={invitationData} />
    </div>
  );
}

export default App;
