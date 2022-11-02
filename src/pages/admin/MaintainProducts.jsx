import { useState } from "react";
import { Button } from "react-bootstrap";
import productsFile from "../../data/products.json";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function MaintainProducts() {
    const { t } = useTranslation();
    const [products, setProducts] = useState(productsFile);
    const remove =ix =>{
        productsFile.splice(ix,1);
        setProducts(productsFile.slice());
        toast.error("Toode kustutatud!");
    }
    return (  
        <>
        <ToastContainer />
        {products.map((el,ix)=>
            <div key={ix} className="chartBox">
                    <img src={el.image} alt=""/>
                    <div>{el.name}</div>
                    <div>{el.price}</div>
                <Link to={`/admin/EditProduct/${el.id}`}>
                    <Button variant="warning">{t("button.change")}</Button>
                </Link>
                <Button variant="danger" onClick={()=>remove(ix)}>{t("button.erase")}</Button>
            </div>
        )}
        </>
    );
}

export default MaintainProducts;