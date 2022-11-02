import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import EE from "../../i18n/ee.json"
import EN from "../../i18n/en.json"
import "./i18nCompare.css"

const fs = require('fs');

function I18nCompare() {
//    console.log(EE);
    const [keeled, setKeeled] =useState({});
    const [mess, setMess] = useState("alglaadimine");
    const idRef = useRef();
    
    const teeMidagi =()=> {
        setMess("üks");
        const json = JSON.stringify(keeled);
     //   const fs = require('fs');
     //   fs.writeFile('myjsonfile.json', json, 'utf8'); //callback
    }
    const teeVeel   =()=> setMess("veel");
    
    const teeKeel = () => {
        Object.entries(EE.translation).forEach(obj =>{
            keeled[obj[0]] ={"EE":{}};
            keeled[obj[0]]["EE"]=obj[1];
        });
        Object.entries(EN.translation).forEach(obj =>{
            if(keeled[obj[0]]) {
                keeled[obj[0]]["EN"]={}
            } else {
                keeled[obj[0]]={"EN":{}}
            }
            keeled[obj[0]]["EN"]=obj[1];
        });
        console.log(keeled);
        setKeeled(keeled);
    }
    const muuda = (keel,voti ) =>{
        idRef.current = {keel,voti};
        const el = document.getElementById(keel+voti);
        if(!el) {
            toast.error(keel+voti+ " ei leitud");
            return;
        }
        el.focus();
        el.contentEditable= true;
        el.addEventListener("blur", kinni);
    }

    const kinni = () =>{
        const keel = idRef.current.keel;
        const voti = idRef.current.voti;
        const el=document.getElementById(keel+voti);
        if(!el) {
            toast.error(keel+voti+ " ei leitud");
            return;
        }
        el.contentEditable = false;
        el.removeEventListener("blur", kinni);
        const uusSisu = el.innerHTML;
        keeled[voti][keel]=uusSisu;
        teeKeel(Object.entries(keeled).slice());
    }

    useEffect (()=>{
        teeKeel(Object.entries(keeled).slice());
        },[]   
    );

    return (  
        <>
        <ToastContainer />
        <h1>Keeled</h1>

        <button onClick={teeMidagi}>Lihtsalt üks nupp</button>
        <button onClick={teeVeel}>Lihtsalt veel üks nupp</button> {mess}
        {Object.entries(keeled).map(obj =>
            <div key={obj[0]}>
                <span className="voti">{obj[0]}</span>
                <span 
                    onClick={ ()=>{muuda("EE", obj[0]);
                                 }
                            } 
                    id={"EE"+obj[0]} 
                    className={"EE"+(!obj[1].EE ? " tyhi":"")}
                >{obj[1].EE}</span>
                <span className={"EN"+(!obj[1].EN ? " tyhi":"")}>{obj[1].EN}</span>
            </div>
        )}
        </>
    );
}

export default I18nCompare;

// koosame objekti
// koostame väljatrüki
// koostame clik func
// koostame salvestuse
