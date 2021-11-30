import React from 'react';
import '../JlBokingComp';

export default function Om() {
    return (
        <div className="MainBokingDiv">
             <h1 className="h1_header">Om programmet</h1>
             <p>
             Den här appen är gjord som ett test för att bygga början på ett bokningssystem i React. 
             Programmet baseras på ett bokningssystem jag gjorde i Java för ca 9 år sedan och som jag själv använt sen dess. 
             </p>
             <p>
             Nu vill jag göra ett moln baserat bokningssystem och de här är resultatet hit tills, 
             självklart så måste en backend med databas och en inlogning kopplas till programmet senare. 
             Just nu används webbläsaren LocalStorage för att lagra bokningar och simulera en databas.

             </p>
        </div>
    )
}
