import { Box, Button, Typography } from '@mui/material';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import CardMedia from '@mui/material/CardMedia';
import './navBarCss/navBar.css'
import { useNavigate } from 'react-router-dom';
import Try from './VideoCakes.js'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, red } from '@mui/material/colors';
import CakeIcon from '@mui/icons-material/Cake';
import CottageIcon from '@mui/icons-material/Cottage';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { userOut } from '../user/userSlice.js';
import LogoutIcon from '@mui/icons-material/Logout';
import { emptyOrder } from '../order/orderSlice.js';
import PostAddIcon from '@mui/icons-material/PostAdd';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 2,
    top: 1,
    border: `2px solid ${theme.palette.background.paper}`,
    background: `${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
const NavBar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  let basket = useSelector(state => state.order.basket);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    user != null && <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => {
        navigate('/login');
        dispatch(userOut());
      }}>יציאה</MenuItem>

      <MenuItem onClick={() => {
        navigate('/profile')
        handleMenuClose();
      }}>פרופיל</MenuItem>

    </Menu>

  );
  ///תפריט מוקטן
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      {/* <MenuItem> 
         <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem> */}
      <MenuItem onClick={() => {
        navigate('/');
        handleMenuClose();
      }} >
        <IconButton
          size="large"
          aria-label="show "
          color="inherit"
        >
          <CakeIcon />
        </IconButton>
        <p>כל המוצרים</p>
      </MenuItem>

      {user == null
        &&
        <MenuItem onClick={() => {
          navigate("/logIn");
          handleMenuClose();
        }}>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <CottageIcon />
          </IconButton>
          <p>כניסה</p>
        </MenuItem>
      }

      {user == null
        &&
        <MenuItem onClick={() => {
          navigate("/signUp");
          handleMenuClose();
        }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <EditNoteIcon />
          </IconButton>
          <p>הרשמה</p>
        </MenuItem>
      }

      {(user == null || user.role === "user") && <MenuItem onClick={() => {
        navigate('/basket');
        handleMenuClose();
      }} >
        <IconButton
          size="large"
          aria-label="show "
          color="inherit"
        >
          <StyledBadge badgeContent={basket.length} >

            {/* <Badge badgeContent={basket.length} color="error"> */}
            <ShoppingCartIcon />
          </StyledBadge>

          {/* </Badge> */}
        </IconButton>
        <p>סל הקניות שלי</p>
      </MenuItem>}

      {user !== null && user.role === "user" &&
        <MenuItem onClick={() => {
          navigate("/profile");
          handleMenuClose();
        }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>פרופיל</p>
        </MenuItem>}

      {user !== null && user.role === 'admin' &&

        <MenuItem onClick={() => {
          navigate('/addProduct');
          handleMenuClose();
        }} >
          <IconButton
            size="large"
            aria-label="show "
            color="inherit"
          >
            <PostAddIcon />
          </IconButton>

          <p>הוספת מוצר</p>
        </MenuItem>}

      {user !== null &&
        <MenuItem onClick={() => {
          navigate("/login");
          handleMenuClose();
          dispatch(userOut());
        }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"

          >
            <LogoutIcon />
          </IconButton>

          <p>התנתקות</p>
        </MenuItem>}
    </Menu>
  );

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: '#ff8a80',
        width: "23px",
        height: "23px",


      },
      children: `${user.userName.split(' ')[0][0]}`,
    };
  }
  return (<>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className='navBarStyle' position="static">

        <Toolbar>
          <img src={'https://kenzisserver.onrender.com/png/kenzisLogo.png'} alt='logo' style={{ width: "4%" }} />

          {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}

          {/* <Search>
            <SearchIconWrapper sx={{ alignItems: "center", mr: "80%" }}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="חפש מוצר"
              inputProps={{ 'aria-label': 'search' }}
            />

          </Search> */}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error" >
                <MailIcon />
              </Badge>
            </IconButton> */}

            <Button
              sx={{ height: "30%", mt: 1, ml: 1 }}
              onClick={() => navigate("/")}
              color='secondary'

            >כל המוצרים</Button>

            {user !== null &&
              <Button
                color='secondary'
                sx={{ height: "30%", mt: 1, ml: 1 }}
                onClick={() => {
                  navigate("/logIn");
                  dispatch(userOut());
                  dispatch(emptyOrder());
                }
                }
              >התנתקות</Button>
            }

            {user == null
              && <>
                <Button
                  sx={{ height: "30%", mt: 1, ml: 1 }}
                  onClick={() => navigate("/logIn")}
                  color='secondary'
                >כניסה</Button>

                <Button
                  sx={{ height: "30%", mt: 1, ml: 1 }}
                  onClick={() => navigate("/signUp")}
                  color='secondary'
                >הרשמה</Button>

              </>}
            {user !== null && user.role === 'admin' &&
              <Button
                sx={{ height: "30%", mt: 1, ml: 1 }}
                onClick={() => navigate("/addProduct")}
                color='secondary'
              >הוספת מוצר</Button>
            }



            {(user == null || user.role === "user") &&
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <StyledBadge badgeContent={basket.length} >

                  {/* <Badge badgeContent={basket.length} color="default"> */}
                  <ShoppingCartIcon onClick={() => navigate('/basket')} />
                  {/* </Badge> */}
                </StyledBadge>
              </IconButton>}

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {user == null && <AccountCircle />}
              {user != null && <Avatar style={{ fontSize: "12pt", textAlign: "center" }} {...stringAvatar()} />}



            </IconButton>
            {user == null && <Typography ml={1} mt={1.5}>שלום אורח</Typography>}
            {user != null && <Typography ml={1} mt={1.5}>שלום {user.userName}</Typography>}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

    </Box>


  </>
  );
}

export default NavBar;




