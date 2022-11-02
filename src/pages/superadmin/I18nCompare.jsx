import { useRef, useEffect, useState  } from "react";
import EE from "../../i18n/ee.json"
import EN from "../../i18n/en.json"
import "./i18nCompare.css"

function I18nCompare() {
    const [keeled, setKeeled] = useState({});
    const [mess, setMess] = useState("alglaadimine");
    const idRef = useRef();
    
    const teeMidagi =()=> setMess("üks");
    const teeVeel   =()=> {setMess("kaks");console.log(keeled)}

    const kirjutaKeel = keel =>{
        let kirjutatavKeel = {"translation":{}}
        for (let key in keeled){
            kirjutatavKeel.translation[key] = keeled[key][keel];
        }
        //console.log(kirjutatavKeel);
        //*
        const file = new Blob([JSON.stringify(kirjutatavKeel)], {type: 'text/plain'});
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = keel.toLowerCase()+".json";
        document.body.appendChild(element);
        element.click();
        // */
    }
    
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
        setKeeled(structuredClone(keeled));
        console.log(keeled);
    }
    const muuda = (keel,voti ) =>{
        idRef.current = {keel,voti};
        const el = document.getElementById(keel+voti);
        if(!el) {
           console.log(keel+voti+ " ei leitud");
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
            console.log(keel+voti+ " ei leitud");
            return;
        }
        el.contentEditable = false;
        el.removeEventListener("blur", kinni);
        keeled[voti][keel]=el.innerHTML;
        setKeeled(structuredClone(keeled));
    }

    useEffect (()=>{
        teeKeel();
        },[]   
    );

    return (  
        <>
        <h1>Keeled</h1>
        <button onClick={teeMidagi}>Lihtsalt üks nupp</button>
        <button onClick={teeVeel}>Lihtsalt veel üks nupp</button> {mess}<br /><hr />
        Laadi alla: 
        <button onClick={()=>kirjutaKeel("EE")}>EE</button>
        <button onClick={()=>kirjutaKeel("EN")}>EN</button>

        {Object.entries(keeled).map(obj =>
            <div key={obj[0]}>
                <span>{obj[0]}</span>
                <span 
                    onClick={ ()=>{muuda("EE", obj[0]);}} // onClick="muuda(this)"
                    id={"EE"+obj[0]} 
                    className={!obj[1].EE ? " tyhi":""}
                >{obj[1].EE}</span>
                <span 
                    onClick={ ()=>{muuda("EN", obj[0]);}} 
                    className={!obj[1].EN ? " tyhi":""}
                    id={"EN"+obj[0]}
                >{obj[1].EN}</span>
            </div>
        )}
        </>
    );
}

export default I18nCompare;