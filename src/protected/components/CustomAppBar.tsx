import { AppBar, Avatar, ClassNameMap, IconButton, Menu, MenuItem, Theme, Toolbar, Typography } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { startLogout } from '../../store/auth/thunks';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    space: {
      flexGrow: 1
    },
    homeButton: {
      cursor: 'pointer'
    }
  }),
);

export default function CustomAppBar() {
  const classes: ClassNameMap = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { status, displayName, photoURL } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<any>()
  const navigate = useNavigate()
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch( startLogout() )
  }

  return (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Typography 
              variant="h6" 
              className={ classes.homeButton }
              onClick={ () => navigate('/') }
            >
              {
                ( status === 'authenticated')
                ? displayName
                : 'App'
              }
            </Typography>
            <div className={classes.space} ></div>
            {
                ( status === 'authenticated')
                && (
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={ handleMenu }
                            color="inherit"
                        >
                            <Avatar
                                src={ photoURL ? photoURL : 'not-found' }
                                alt={ displayName! }
                            />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={ open }
                            onClose={ handleClose }
                        >
                            <MenuItem onClick={ () => navigate('/edit') }>Edit Profile</MenuItem>
                            <MenuItem onClick={ logout }>Logout</MenuItem>
                        </Menu>
                    </div>
                )
            }
            </Toolbar>
        </AppBar>
    </div>
  );
}
