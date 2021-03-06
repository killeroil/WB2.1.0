import React from "react";
import firebase from "../firebase/base";
import { SpellInput5800_agenda } from "./cis5800_add_agenda";
import {Button} from 'react-bootstrap';

function CisAgenda_5800() {
  const [spells, setSpells] = React.useState([]);
  const [newSpellName, setNewSpellName] = React.useState();

  React.useEffect(() => {
      const db = firebase.firestore();
      const unsubscribe = db.collection("cis5800_agenda").onSnapshot(snapshot => {
        const spellsData = [];
        snapshot.forEach(doc => spellsData.push({ ...doc.data(), id: doc.id }));
        setSpells(spellsData);
      });
    return unsubscribe
  }, []);

  const onCreate = () => {
    const db = firebase.firestore();
    db.collection("cis5800_agenda").add({ name: newSpellName });
  };

  return (
    <div>

      {spells.map(spell => (
        <div key={spell.name}>
          <SpellInput5800_agenda spell={spell}/>
        </div>
      ))}

      <textarea
        value={newSpellName}
        onChange={e => setNewSpellName(e.target.value)}
        className="inputwidth expand"
        placeholder="Enter here..."
      />

      <Button variant="primary" className="addwidth expand" onClick={onCreate}><strong>+</strong></Button>
      <br/>
    </div>

  );
}

export default CisAgenda_5800;