import React from 'react';
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {getProduct} from "../redux/product/product.action";
import DataTable from "../components/DataTable";

const mapDispatchToProps = dispatch => bindActionCreators({
    getProduct,
}, dispatch)
class ProductTable extends React.Component {
    componentWillMount() {
        this.props.getProduct();
    }

    render() {
        const { data } = this.props;

        return (

            <div>

                <DataTable />

            </div>

        );
    }
}

const mapStateToProps = function (state) {
    debugger
    return {
        data: state.product.result
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(ProductTable);
