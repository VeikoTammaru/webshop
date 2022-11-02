import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function NavigationBar (){
    const { t, i18n } = useTranslation();
    const changeLang = newLang =>{
        i18n.changeLanguage(newLang);
        localStorage.setItem("language", newLang);
    }

    return ( <>
    
    <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/">Webshop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"admin/AdminHome"}>{t("Nav.admin")}</Nav.Link>
            <Nav.Link as={Link} to={"Shops"}>{t("Nav.shops")}</Nav.Link>
            <Nav.Link as={Link} to={"AboutUs"}>{t("Nav.about")}</Nav.Link>
            <Nav.Link as={Link} to="/Chart">{t("Nav.chart")}</Nav.Link>
          </Nav>
          <img onClick={() => changeLang("en")} src={require("../../images/en.png")} className="lang" alt="Eng"/>
          <img onClick={() => changeLang("ee")} src={require("../../images/ee.png")} className="lang" alt="Est"/>
        </Container>
      </Navbar>
    </> );
}

export default NavigationBar ;

/* 
      <Link to={"./"}>Home</Link>
      <Link to={"admin/AddProducts"}>admin/AddProducts </Link>
      <Link to={"admin/AdminHome"}> AdminHome     </Link>
      <Link to={"admin/EditProduct"}>EditProduct</Link>
      <Link to={"admin/MaintainCategories"}>MaintainCategories     </Link>
      <Link to={"admin/MaintainProducts"}>admin/MaintainProducts      </Link>
      <Link to={"admin/MaintainShops"}> admin/MaintainShops     </Link>
      <Link to={"AboutUs"}>AboutUs      </Link>
      <Link to={"Chart"}> Chart     </Link>
      <Link to={"Shops"}>Shops     </Link>
      <Link to={"SingleProducts"}>SingleProducts</Link>
      </div>
*/