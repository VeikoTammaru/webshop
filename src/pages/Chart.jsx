import { useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function Chart() {
    const { t } = useTranslation();
    const [chart, setChart] = useState(JSON.parse(sessionStorage.getItem("chart"))||[]);

    const removeFromChart =ix =>{
        chart.splice(ix,1);
        setChart(chart.slice());
        sessionStorage.setItem("chart", JSON.stringify(chart));
    }

    const emptyCart = () => {
        setChart([]);
        sessionStorage.removeItem("chart");
    }
    
    const calculateCartSum =() =>{
        let chartSum = 0;
        for (let i=0;i<chart.length;i++ ){
            chartSum += Number(chart[i].price);
        }
        
        return parseFloat(chartSum).toFixed(2);
    }
    
    return (  
        <>
        {t("chart.total")} {calculateCartSum()}/ {t("chart.inChart")} {chart.length}
        <Button variant="outline-danger" style={{float:"right"}} onClick={emptyCart}>{t("button.empty")}</Button><br></br>
        
        {chart.map((el,ix)=>
            <div key={ix} className="chartBox">  
                <img src={el.image} alt=""/>
                <div>{el.name}</div>
                <div>{el.price}</div>
                <Button 
                    onClick={()=>removeFromChart(ix)}
                    variant="outline-danger"
                    title="button.empty"
                >x</Button>
            </div>
        )}
        
        
        </>
    );
}

export default Chart;