import React, { useState } from 'react';
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


const SignUp = props => {
    const initialFormState = {
        name: '',
        email: '',
        password: '',
        s_password: '',
        validate:false,
        isRegister: false

    };

    const [
        signUp,
        setSignUp
    ] = useState(initialFormState);

    // componentWillReceiveProps(nextProps) {
    //
    //     if (nextProps.isRegister !== this.props.isRegister) {
    //         if (nextProps.isRegister.data){
    //             this.setState({
    //                 isRegister: nextProps.isRegister.data
    //             })
    //         }
    //     }
    // }

    function handleChange (event) {
        const { currentTarget } = event;
        const value = currentTarget.type === 'checkbox' ? currentTarget.checked : currentTarget.value;
        const { name } = currentTarget;
        setSignUp({
            ...signUp,
            [name]: value
        });
    }

    function submitForm(e) {
        e.preventDefault();
        if (!signUp.name || !signUp.email || !signUp.password) return;

        props.userCreate(signUp)
    }

    const {classes} = props;

    return (
        <main className={classes.main}>
            <CssBaseline />

            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                { !signUp.isRegister &&
                <React.Fragment>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <form className={classes.form} onSubmit={submitForm}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Name</InputLabel>
                            <Input
                                type="text"
                                name="name"
                                required={false}
                                autoComplete="off"
                                id="name"
                                placeholder="name"
                                value={ signUp.name }
                                onChange={handleChange}
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
                                value={ signUp.email }
                                onChange={handleChange}
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
                                value={ signUp.password }
                                onChange={ handleChange }
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
                                value={ signUp.s_password }
                                onChange={ handleChange }
                            />
                            { signUp.password !== signUp.s_password &&
                            <div>
                                Password need to mach
                            </div>
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
                </React.Fragment>
                }
                { signUp.isRegister &&
                <React.Fragment>
                    <Typography component="h1" variant="h5">
                        Register success
                    </Typography>
                    <Link to="/login"> Go to login </Link>
                </React.Fragment>
                }
            </Paper>
        </main>
    );


};

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = function (state) {
    return {
        isRegister: state.auth,
    }
};

export default compose(
    withStyles(styles, {
        name: 'AppFrame',
    }),
    connect(mapStateToProps, mapDispatchToProps),
)(SignUp);
