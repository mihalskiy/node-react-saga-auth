import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import { Link } from "react-router-dom";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {userCreate, userCreateSuccess} from "../redux/auth/auth.action";

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
    userCreateSuccess,
    userCreate,
}, dispatch);

const SignUp = (props) => {

    const defaultValues = {
        name: '',
        email: '',
        password: '',
        s_password: '',
        isRegister: false,
        validatePassword: false,
    }

    const [value, setDefaultValues] = useState(defaultValues);

    useEffect(() => {
        if (props.auth.isRegister || props.auth.errorMessage) {
            setDefaultValues( prevState => ({
                ...prevState,
                isRegister: props.auth.isRegister,
                errorMessage: props.auth.errorMessage
            }))
        }
    }, [props.auth.isRegister]);

    const handleChange = (event) => {
        const { target } = event;
        const inputValue = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        setDefaultValues( prevState => ({
            ...prevState,
            [ name ]: inputValue,
            validatePassword:  (name === 'password' || name === 's_password') && (inputValue === value.s_password || inputValue === value.password)
        }));
    }

    const submitForm = (e) => {
        e.preventDefault();
        props.userCreate(value)
    }

    const { classes } = props;
    const { name, email, password, s_password, validatePassword, isRegister } = value;

    return (
        <main className={classes.main}>
            <CssBaseline />

            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                { !isRegister &&
                <React.Fragment>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <form className={classes.form} onSubmit={(event) => {submitForm(event)}}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Name</InputLabel>
                            <Input
                                type="text"
                                name="name"
                                required={false}
                                autoComplete="off"
                                id="name"
                                placeholder="name"
                                value={ name }
                                onChange={(event) => handleChange(event)}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input
                                type="text"
                                name="email"
                                required
                                autoComplete="off"
                                id="email"
                                placeholder="myemail@email.com"
                                value={ email }
                                onChange={(event) => handleChange(event)}
                            />

                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="********"
                                required
                                value={ password }
                                onChange={(event) => handleChange(event)}
                            />
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Confirm Password</InputLabel>
                            <Input
                                type="password"
                                name="s_password"
                                id="s_password"
                                placeholder="********"
                                required
                                value={ s_password }
                                onChange={(event) => handleChange(event)}
                            />
                            { !validatePassword && password &&
                            <div>
                                Password need to mach
                            </div>
                            }
                        </FormControl>
                        {props.auth && props.auth.errorMessage &&
                            <InputLabel error>{props.auth.errorMessage}</InputLabel>
                        }


                        <Button
                            type="submit"
                            fullWidth
                            disabled={!validatePassword}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign in
                        </Button>
                    </form>
                </React.Fragment>
                }
                { isRegister &&
                <React.Fragment>
                    <Typography component="h1" variant="h5">
                        Register success {isRegister}
                    </Typography>
                    <Link to="/login"> Go to login </Link>
                </React.Fragment>
                }
            </Paper>
        </main>
    );
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = function (state) {
    return {
        auth: state.auth,
    }
};

export default compose(
    withStyles(styles, {
        name: 'AppFrame',
    }),
    connect(mapStateToProps, mapDispatchToProps),
)(SignUp);
