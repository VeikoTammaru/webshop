import { useRef } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import  productsFile from "../../data/products.json"

function AddProducts() {
    const { t } = useTranslation();
    const products = productsFile;
    const activeRef = useRef();
    const categoryRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const nameRef  = useRef();
    const priceRef = useRef();
    const idRef = useRef();
    const navigate = useNavigate();

    const aadProduct = () =>{
        const newProduct = {
              "active": activeRef.current.value
            , "category" : categoryRef.current.value
            , "description": descriptionRef.current.value
            , "image": imageRef.current.value
            , "name": nameRef.current.value
            , "price": priceRef.current.value
            , "id":idRef.current.value
        }
        products.unshift( newProduct);
        navigate("/admin/MaintainProducts");
    }

    return (  
        <div>
            <h1>Lisa toode</h1>
            <div className="changeProduct">
            <div>
                <label>ID</label>
                <input ref={idRef} type="text" />
            </div>
            <div>
                <label>{t("admin.editName")}</label>
                <input ref={nameRef} type="text" />
            </div>
            <div>
                <label>{t("admin.editPrice")}</label>
                <input ref={priceRef} type="text" />
            </div>
            <div>
                <label>{t("admin.editCategory")}</label>
                <input ref={categoryRef} type="text"  />
            </div>
            <div>
                <label>{t("admin.editDescription")}</label>
                <input ref={descriptionRef} type="text" />
            </div>
            <div>
                <label>{t("admin.editImage")}</label>
                <input ref={imageRef} type="text" />
            </div>
            <div>
                <label>{t("admin.editActive")}</label>
                <input ref={activeRef} type="checkbox" />
            </div>
        </div>
        <Button onClick={aadProduct}>{t("button.add")}</Button>
        </div>
    );
}

export default AddProducts;