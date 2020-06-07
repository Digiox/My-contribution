import React from 'react';
import "./errors.css"
import errorIMG from "../assets/imgs/undraw_page_not_found_su7k.svg"
import { Title, Img } from "../atoms/index"

const PageNotFoundMain = () => {
    return (
      <div className="page_not_Found_main">
           <Img src={errorIMG} alt="wrongPage" />
           <Title type="h2">OUPS ! La page que tu recherche n'existe pas !</Title>
      </div>
    );
}

export default PageNotFoundMain;