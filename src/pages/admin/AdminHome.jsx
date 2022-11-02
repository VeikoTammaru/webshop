import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


function AdminHome() {
    const { t } = useTranslation();
    return (  
        <div>
            <Link to="/admin/AddProducts">
                <Button>{t("admin.addProduct")}</Button>
            </Link>
            <Link to="/admin/MaintainProducts">
                <Button>{t("admin.maintainProduct")}</Button>
            </Link>
            <Link to={"/superadmin"}>
                <Button>Superadmin</Button>
            </Link>
        </div>
    );
}

export default AdminHome;