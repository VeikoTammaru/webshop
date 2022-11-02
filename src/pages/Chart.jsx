import { useMemo } from "react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import productsFile from "../data/products.json"

function Chart() {
    const { t } = useTranslation();
    const [cart, setCart] = useState([]);
    const cartSS = useMemo(()=> JSON.parse(sessionStorage.getItem("cart")) || [], []);
 
    useEffect(() => {
        const cartWithProducts = cartSS.map(element => {
            return {
                  "product" : productsFile.find(product => product.id === element.id)
                , "quantitly": element.quantitly
            }
        });
        console.log(cartWithProducts);
        setCart(cartWithProducts);
    }, [cartSS]);

    const removeFromChart =ix =>{
        cartSS.splice(ix,1); 
        cart.splice(ix,1);
        setCart(cart.slice());
        sessionStorage.setItem("cart", JSON.stringify(cartSS));
    }

    const emptyCart = () => {
        setCart([]);
        sessionStorage.removeItem("chart");
    }
    
    const calculateCartSum =() =>{
        let cartSum = 0;
        for (let i=0;i<cart.length;i++ ){
            cartSum += Number(cart[i].product.price)*cart[i].quantitly;
        }
        return parseFloat(cartSum).toFixed(2);
    }
    const increaseQuantity = (index)=>{
        cartSS[index].quantitly = cartSS[index].quantitly+1;
        cart  [index].quantitly = cart[index].quantitly +1;
        
        setCart(cart.slice());
        sessionStorage.setItem("cart", JSON.stringify(cartSS));
    }
    
    const decreaseQuantity = (index)=>{
        cartSS[index].quantitly = cartSS[index].quantitly-1;
        cart  [index].quantitly = cart[index].quantitly -1;
        if (cartSS[index].quantitly<=0){
            removeFromChart(index);
        } else {
            setCart(cart.slice());
            sessionStorage.setItem("cart", JSON.stringify(cartSS));
        }
    }

    return (  
        <>
        {t("cart.total")} {calculateCartSum()}/ {t("cart.inChart")} {cart.length}
        <Button variant="outline-danger" style={{float:"right"}} onClick={emptyCart}>{t("button.empty")}</Button><br></br>
        {cart.map((el,ix)=>
            <div key={ix} className="chartBox">  
                <img src={el.product.image} alt=""/>
                <div>{el.product.name}</div>
                <div>{el.product.price}</div>
                <div>{(el.product.price*el.quantitly).toFixed(2)}</div>
                <Button 
                    onClick={()=>removeFromChart(ix)}
                    variant="outline-danger"
                    title="button.empty"
                >x</Button>
                <button onClick={()=>decreaseQuantity(ix)}>-</button>
                {el.quantitly}
                <button onClick={()=>increaseQuantity(ix)}>+</button>
            </div>
        )}
        </>
    );
}

export default Chart;