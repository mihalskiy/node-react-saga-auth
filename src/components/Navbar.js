import React from 'react';
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import UserIcon from '@material-ui/icons/Face';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {userCreate, userCreateSuccess} from "../redux/auth/auth.action";

const styles = theme =>  ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        '&:hover': {
            background: 'none',
            color: 'white'
        }
    },
    icon: {
        margin: theme.spacing.unit * 2,
        fill: 'white'
    },
    avatar: {
        color: 'white'
    }
});

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

function RenderPropsMenu(classes) {
    return (
        <WithState>
            {({ anchorEl, updateAnchorEl }) => {
                const open = Boolean(anchorEl);
                const handleClose = () => {
                    updateAnchorEl(null);
                };
                const handleLogout = () => {
                    localStorage.clear()
                    window.location.replace( '/login');
                };

                const User = props => <RouterLink to="/user" {...props} />;

                return (
                    <React.Fragment>
                        <Button
                            aria-owns={open ? 'render-props-menu' : undefined}
                            aria-haspopup="true"
                            color={'white'}
                            className={classes.avatar}
                            onClick={event => {
                                updateAnchorEl(event.currentTarget);
                            }}
                        >
                            <UserIcon color="white" className={classes.icon} fontSize="large" />
                        </Button>
                        <Menu id="render-props-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem component={User}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </React.Fragment>
                );
            }}
        </WithState>
    );
}

const mapDispatchToProps = dispatch => bindActionCreators({
    userCreateSuccess,
    userCreate,
}, dispatch);

class Navbar extends React.Component {
    render() {
        const { classes, isAuth } = this.props;
        const Register = props => <RouterLink to="/register" {...props} />;
        const Login = props => <RouterLink to="/login" {...props} />;
        const Home = props => <RouterLink to="/" {...props} />;
        const Product = props => <RouterLink to="/product" {...props} />;

    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.grow} component={Home}>
                        <HomeIcon color="disabled" className={classes.icon} fontSize="large"/>
                    </Typography>
                    {!isAuth &&
                    <React.Fragment>
                        <Button color="inherit" className={classes.menuButton} component={Login}>
                            Login
                        </Button>
                        <Button color="inherit" className={classes.menuButton} component={Register}>
                            Register
                        </Button>
                    </React.Fragment>
                    }
                    { isAuth &&
                    <React.Fragment>
                        <Button color="inherit" className={classes.menuButton} component={Product}>
                            Product
                        </Button>
                        <RenderPropsMenu classes={classes}/>
                    </React.Fragment>
                    }
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )}

}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = function (state) {
    console.log(localStorage.getItem('isAuth'))
    return {
        isAuth: state.auth.isAuth
    }
};

export default compose(
    withStyles(styles, {
        name: 'AppFrame',
    }),
    connect(mapStateToProps, mapDispatchToProps),
)(Navbar);
