import React, {useEffect} from 'react';
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {getProduct} from "../redux/product/product.action";
import DataTable from "../components/DataTable";

const mapDispatchToProps = dispatch => bindActionCreators({
    getProduct,
}, dispatch)
const ProductTable = (props) => {

    useEffect(()=> {
        props.getProduct();
    },[])

    return (
        <React.Fragment>
            <DataTable />
        </React.Fragment>
    );
}

const mapStateToProps =  (state) => {
    return {data: state.product.result}
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(ProductTable);
