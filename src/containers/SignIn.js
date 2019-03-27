import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {userCreateFailed, userEnter, userCreateSuccess} from "../redux/auth/auth.action";

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
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
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
    userEnter,
    userCreateSuccess,
    userCreateFailed
}, dispatch);

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'email': '',
            'password': '',
        };
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

    componentWillReceiveProps(nextProps, nextContext) {

        if(nextProps.successAuth !== nextContext.successAuth){
            const { token } = nextProps.successAuth.data;
            const { isAuth } = nextProps.successAuth.data;
            localStorage.setItem('token', token);
            localStorage.setItem('isAuth', isAuth);
            window.location.replace( '/product');
        }



    }

    submitForm(e) {
        e.preventDefault();
        this.props.userEnter(this.state)
    }

    render() {
        const { classes, err } = this.props;
        const { email, password } = this.state;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={ (e) => this.submitForm(e) }>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="myemail@email.com"
                                value={ email }
                                required
                                onChange={ (e) => {
                                    this.handleChange(e)
                                } }
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="********"
                                value={ password }
                                onChange={ (e) => this.handleChange(e) }
                            />
                            { err && err.e &&
                            <React.Fragment>
                                <h6 color={'primary'} >SOMETHING ERROR</h6>
                            </React.Fragment>
                            }
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign in
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = function (state) {
    return {
        err: state.auth.payload,
        successAuth: state.auth.payload,
    }
};

export default compose(
    withStyles(styles, {
        name: 'AppFrame',
    }),
    connect(mapStateToProps, mapDispatchToProps),
)(SignIn);
