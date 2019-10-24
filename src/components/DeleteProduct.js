import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {deleteProduct} from "../redux/product/product.action";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    closeIcon: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'right',
        width: '100%',
        justifyContent: 'right'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

const mapDispatchToProps = dispatch => bindActionCreators({
    deleteProduct
}, dispatch);

class DeleteProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            message: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        await this.setState({
            [ name ]: value,
        });
    }

    componentWillMount() {
        const { dataById } = this.props;
        this.setState({
            name: dataById.name,
            email: dataById.email,
            phone: dataById.phone,
            postAddress: dataById.postAddress,
            message: dataById.message,
        })
    }

    submitForm(e) {
        e.preventDefault();
        this.props.deleteProduct(this.props.id)
        this.props.closeModal();
    }

    render() {
        const { classes } = this.props;
        const { name, email, phone, postAddress, message } = this.state;
        return (
            <main className={classes.main}>
                <Grid className={classes.closeIcon}  alignItems="flex-end">
                    <IconButton aria-label="Delete" onClick={this.props.closeModal}>
                        <SvgIcon width={'100'}>
                            <svg viewBox="0 0 475.2 475.2">
                                <g>
                                    <path d="M405.6,69.6C360.7,24.7,301.1,0,237.6,0s-123.1,24.7-168,69.6S0,174.1,0,237.6s24.7,123.1,69.6,168s104.5,69.6,168,69.6
                                    s123.1-24.7,168-69.6s69.6-104.5,69.6-168S450.5,114.5,405.6,69.6z M386.5,386.5c-39.8,39.8-92.7,61.7-148.9,61.7
                                    s-109.1-21.9-148.9-61.7c-82.1-82.1-82.1-215.7,0-297.8C128.5,48.9,181.4,27,237.6,27s109.1,21.9,148.9,61.7
                                    C468.6,170.8,468.6,304.4,386.5,386.5z"/>
                                    <path d="M342.3,132.9c-5.3-5.3-13.8-5.3-19.1,0l-85.6,85.6L152,132.9c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1
                                    l85.6,85.6l-85.6,85.6c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.6-85.6l85.6,85.6c2.6,2.6,6.1,4,9.5,4
                                    c3.5,0,6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1l-85.4-85.6l85.6-85.6C347.6,146.7,347.6,138.2,342.3,132.9z"/>
                                </g>
                            </svg>
                        </SvgIcon>
                    </IconButton>
                </Grid>


                <Paper className={classes.paper}>
                    <Typography color={'secondary'} component="h3" variant="h5">
                        Are you sure you want to delete this product?
                    </Typography>
                    <form className={classes.form} onSubmit={ (e) => this.submitForm(e) }>
                        <FormControl margin="normal" disabled={true} fullWidth>
                            <InputLabel htmlFor="email">Name</InputLabel>
                            <Input
                                type="text"
                                name="name"
                                required={false}
                                autoComplete="off"
                                id="name"
                                placeholder="name"
                                disabled
                                value={ name }
                                onChange={ (e) => {
                                    this.handleChange(e)
                                } }
                            />
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input
                                type="text"
                                name="email"
                                required={false}
                                autoComplete="off"
                                id="exampleEmail"
                                disabled
                                placeholder="myemail@email.com"
                                value={ email }
                                onChange={ (e) => {
                                    this.handleChange(e)
                                } }
                            />

                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="password">Phone</InputLabel>
                            <Input
                                type="number"
                                name="phone"
                                id="phone"
                                disabled
                                placeholder="phone"
                                value={ phone }
                                onChange={ (e) => this.handleChange(e) }
                            />
                        </FormControl>

                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="password">Post Address</InputLabel>
                            <Input
                                type="text"
                                name="postAddress"
                                id="postAddress"
                                placeholder="postAddress"
                                disabled
                                value={ postAddress }
                                onChange={ (e) => this.handleChange(e) }
                            />
                        </FormControl>

                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="password">Message</InputLabel>
                            <Input
                                type="text"
                                name="message"
                                id="message"
                                placeholder="message"
                                disabled
                                value={ message }
                                onChange={ (e) => this.handleChange(e) }
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                        >
                            Delete
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }


}

DeleteProduct.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = function (state) {
    return {
        //data: state.product.result.data,
    }
};

export default compose(
    withStyles(styles, {
        name: 'AppFrame',
    }),
    connect(mapStateToProps, mapDispatchToProps),
)(DeleteProduct);
