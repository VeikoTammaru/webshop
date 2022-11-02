import { useState } from "react";
import productsFile from "../data/products.json"
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";



function HomePage() {
    const [products, setProducts] = useState(productsFile)
    
    const categoris = [...new Set (productsFile.map (el => el.category))];
    const { t } = useTranslation();

    const sortAZ =() =>{
        products.sort((a,b)=>a.name.localeCompare(b.name));
        setProducts(products.slice());
    }
    const sortZA = () =>{
        products.sort((a,b)=>b.name.localeCompare(a.name));
        setProducts(products.slice());
    }
    const sortPriceAsc =() => {
        products.sort((a,b)=>a.price - b.price);
        setProducts(products.slice());
    }
    const sortPriceDesc =() => {
        products.sort((a,b)=>b.price - a.price);
        setProducts(products.slice());
    }
    const filterByCategory = (catCliked) =>{
        const res = productsFile.filter(el => el.category === catCliked);
        setProducts(res);
    }
    const addToChart  = prodClicked =>{
        const chart =JSON.parse(sessionStorage.getItem("chart"))||[];
        
        chart.push (products[prodClicked]);
        sessionStorage.setItem("chart", JSON.stringify(chart));
        toast(`🦄 Lisatud ${prodClicked.name} ostukorvi lisatud!` , {
            position: "top-right",
            autoClose: 15000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

    }

    return ( 
        <>  
            <ToastContainer />
            <div>{products.length} tk</div>
            <div>
                {categoris.map((el,ix)=><Button key={ix} onClick={()=>filterByCategory(el)}>{t(el)}</Button>)}
            </div>
            <hr />
            <div>
                <Button onClick={sortAZ}>sort AZ</Button>
                <Button onClick={sortZA}>sort ZA</Button>
                <Button onClick={sortPriceAsc}>odavamast</Button>
                <Button onClick={sortPriceDesc}>kallimast</Button>
                
            </div>
            {products.map((el,ix)=>
                <div key={ix} className="chartBox">  
                    <img src={el.image} alt="!"/>
                    <div>{el.name}</div>
                    <div>{el.price}</div>
                    <Button onClick={()=>addToChart(ix)}>+</Button>
                </div>
             )}
        </>
     );
}

export default HomePage;