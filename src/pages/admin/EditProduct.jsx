import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import  productsFile from "../../data/products.json"
import { useTranslation } from "react-i18next";

function EditProduct () {
    const { t } = useTranslation();
    const params = useParams();
    const products = productsFile;
    const activeRef = useRef();
    const categoryRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const nameRef  = useRef();
    const priceRef = useRef();
    const idRef = useRef();
    const navigate = useNavigate();
    
    const productFound = products.find(el=>el.id=== Number(params.ProductID));
    const index = products.indexOf(productFound);
    
    const changeProduct = () =>{
        const NewProduct = {
            "id":Number(idRef.current.value),
            "name":nameRef.current.value,
            "price":Number(priceRef.current.value),
            "image":imageRef.current.value,
            "category":categoryRef.current.value,
            "description":descriptionRef.current.value,
            "active":activeRef.current.checked
        }
        products[index]=NewProduct;
        navigate("/admin/MaintainProducts");
    }

    return (  
        <>
        <ToastContainer />
        { productFound && <div>
        {params.ProductID}
        {productFound.id}{productFound.name}
        <div className="changeProduct">
            <div>
                <label>ID</label>
                <input ref={idRef} type="text" defaultValue={productFound.id}/>
            </div>
            <div>
                <label>{t("admin.editName")}</label>
                <input ref={nameRef} type="text" defaultValue={productFound.name}/>
            </div>
            <div>
                <label>{t("admin.editPrice")}</label>
                <input ref={priceRef} type="text" defaultValue={productFound.price}/>
            </div>
            <div>
                <label>{t("admin.editCategory")}</label>
                <input ref={categoryRef} type="text" defaultValue={productFound.category} />
            </div>
            <div>
                <label>{t("admin.editCategory")}</label>
                <input ref={descriptionRef} type="text" defaultValue={productFound.description}/>
            </div>
            <div>
                <label>{t("admin.editImage")}</label>
                <input ref={imageRef} type="text" defaultValue={productFound.image}/>
            </div>
            <div>
                <label>{t("admin.editActive")}</label>
                <input ref={activeRef} type="checkbox" defaultValue={productFound.active}/>
            </div>
        </div>
        <button onClick={changeProduct}>{t("button.change")}</button>
        </div>}
        { !productFound && <div>{t("admin.editNoFound")}</div>}
        </>
    );
}

export default EditProduct;

// siia lehele sattumine (App.js)
// urlis peab olema mutuja muuda/: ID kaudu
// Maintain products sees link
// 4 usee paramisi kaudu muutuja püüdmine
//5 võtamiekõik tooted (productsFile //localstoris.getitem / andmebaasi päring)
// 6O tsime kõikide toodete seest õige toote ülesse 


// sh addproduct
// 7,8. iga võtme kohta input ja ref
// nupp muutmisele
// 10 Muudatoodet 

// muudatootel on deafault value (active võti on boolean - defaultChecked)
//12 Default tuleb 6-s punktidleitud toodet
//13 Kontrollid peale , et 6 punkits on
// 14 suuname MainProducts lehele kui on muudetud.(useNaviugate)