import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Modal from "@material-ui/core/Modal";
import AddIcon from '@material-ui/icons/Add';
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import {bindActionCreators, compose} from "redux";
import {editProduct, getProduct} from "../redux/product/product.action";
import {connect} from "react-redux";


function createData(id, name, email, phone, message, createdAt) {
    return { id, name, email, phone, message, createdAt };
}

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
    { id: 'phone', numeric: true, disablePadding: false, label: 'Phone' },
    { id: 'message', numeric: true, disablePadding: false, label: 'Message' },
    { id: 'createdAt', numeric: true, disablePadding: false, label: 'createdAt' },
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell>
                        Action
                    </TableCell>
                    {rows.map(
                        row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'right' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this,
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
    paper: {
        position: 'absolute',
        width: 'auto',
        backgroundColor: theme.palette.background.paper,
        //boxShadow: theme.shadows[5],
        padding: 0,
        outline: 'none',
    },
});

let EnhancedTableToolbar = props => {
    const { classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, classes.highlight)}>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                    <Tooltip title="Add Product">
                        <div>
                            <IconButton aria-label="Add Product" onClick={props.handleAddModal}>
                                <AddIcon color={'error'} />
                            </IconButton>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={props.isAdd}
                                onClose={props.closeModal}
                            >
                                <div style={getModalStyle()} className={classes.paper}>
                                    <AddProduct id={props.id} data={props.data} closeModal={props.closeModal}/>
                                </div>
                            </Modal>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={props.isEdit}
                                onClose={props.closeModal}
                            >
                                <div style={getModalStyle()} className={classes.paper}>
                                    <EditProduct id={props.id} dataById={props.dataById} closeModal={props.closeModal}/>
                                </div>
                            </Modal>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={props.isDelete}
                                onClose={props.closeDeleteModal}
                            >
                                <div style={getModalStyle()} className={classes.paper}>
                                    <DeleteProduct id={props.id} dataById={props.dataById} closeModal={props.closeModal}/>
                                </div>
                            </Modal>
                        </div>
                    </Tooltip>
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getProduct,
    editProduct
}, dispatch)

class DataTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'email',
        data: [],
        page: 0,
        rowsPerPage: 5,
        id: null,
        dataById: null,
        isAdd: false,
        isEdit: false,
        isDelete: false
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleClick = (event, id) => {

    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleAddModal = () => {
        this.setState({
            isAdd: true
        });
    };

    closeModal = () => {
        this.setState({
            isAdd: false,
            isEdit: false,
            isDelete: false
        });
    };

    editProduct = (e, id, data) => {
        this.setState({
            isEdit: true,
            id: id,
            dataById: data
        });
    };

    deleteProduct = (e, id, data) => {
        this.setState({
            isDelete: true,
            id: id,
            dataById: data
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data !== this.props.data) {
            this.state.data = [];
            nextProps.data.forEach((itm) => {
                this.state.data.push(
                    createData(
                        itm.id,
                        itm.name,
                        itm.email,
                        itm.phone,
                        itm.message,
                        itm.createdAt,
                    )
                )
            })

        }
    }


    render() {
        const { classes } = this.props;
        const { data, dataById, order, isAdd, orderBy, rowsPerPage, page, isEdit,isDelete, id } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar
                    isAdd={isAdd}
                    isEdit={isEdit}
                    isDelete={isDelete}
                    id={id}
                    data={data}
                    dataById={dataById}
                    closeModal={this.closeModal}
                    handleAddModal={this.handleAddModal} />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.id)}
                                            role="checkbox"
                                            key={n.id}
                                        >
                                            <TableCell padding="checkbox">
                                                <IconButton aria-label="Edit Product" onClick={event => this.editProduct(event, n.id, n)}>
                                                    <EditIcon color={'primary'} />
                                                </IconButton>


                                                <IconButton aria-label="Delete Product" onClick={event => this.deleteProduct(event, n.id, n)}>
                                                    <DeleteIcon color={'secondary'} />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">{n.name}</TableCell>
                                            <TableCell align="right">{n.email}</TableCell>
                                            <TableCell align="right">{n.phone}</TableCell>
                                            <TableCell align="right">{n.message}</TableCell>
                                            <TableCell align="right">{n.createdAt}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

DataTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = function (state) {
    return {
        data: state.product.result
    }
};

export default compose(
    withStyles(styles, {
        name: 'AppFrame',
    }),
    connect(mapStateToProps, mapDispatchToProps),
)(DataTable);
