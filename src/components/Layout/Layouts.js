import React, { Fragment } from "react";
import ContainerNav from "../Nav/Navbar";
import { Outlet } from "react-router-dom";
import ContainerFooter from "../PartFooter/Footer";
import SearchBar from '../ModealSearch/ModealSearch';
import GoToTopButton from '../buttonGoToTop/ButtonGoToTop';
const Layouts = () => {
    return(
        <Fragment>
            <ContainerNav/>
            <main style={{paddingTop:'70px'}}>
                <Outlet/>
            </main>
            <ContainerFooter/>
            <SearchBar/>
            <GoToTopButton/>
        </Fragment>
    );
}

export default Layouts;