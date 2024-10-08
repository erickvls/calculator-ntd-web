import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CalculateIcon from '@mui/icons-material/Calculate';
import Link from 'next/link';
import PersonIcon from '@mui/icons-material/Person';
import WalletIcon from '@mui/icons-material/Wallet';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCredits } from '../hooks/useCredits';
import { useUserContext } from '../context/UserContext';
import { useUser } from '../hooks/useUser';

const pages = [
    { name: 'Calculator', path: '/home' },
    { name: 'Records', path: '/records' },
];

export default function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [initialBalanceLoaded, setInitialBalanceLoaded] = React.useState(false);
    const [accountInfo, setAccountInfo] = React.useState<{ email: string; balance: string } | null>(null);
    const { getCredits } = useCredits();
    const { balance, setBalance } = useUserContext();
    const [isMounted, setIsMounted] = React.useState(false);
    const { logout } = useUser();
    React.useEffect(() => {
        if (!isMounted) {
            setIsMounted(true);

            const fetchCredits = async () => {
                try {
                    const response = await getCredits();
                    setAccountInfo(response);
                    setBalance(response.balance);
                    setInitialBalanceLoaded(true);
                } catch (error) {
                    console.error("Erro fetching account information", error);
                }
            };

            fetchCredits();
        }

    }, [getCredits, setBalance, isMounted]);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const getUsername = (email: string) => {
        return email.split('@')[0];
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <CalculateIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        APP
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Link href={page.path} passHref legacyBehavior>
                                        <Typography sx={{ textAlign: 'center', color: 'inherit' }}>
                                            {page.name}
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        APP
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link href={page.path} passHref key={page.name} legacyBehavior>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    {initialBalanceLoaded && accountInfo && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <PersonIcon sx={{ mr: 1 }} />
                                <Typography sx={{ textAlign: 'center', color: 'inherit' }}>
                                    {getUsername(accountInfo.email)}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <WalletIcon sx={{ mr: 1 }} />
                                <Typography sx={{ textAlign: 'center', color: 'inherit' }}>
                                    ${balance}
                                </Typography>
                            </Box>
                            <Box>
                                <Button
                                    onClick={handleLogout}
                                    sx={{ my: 2, color: 'white', display: 'flex', alignItems: 'center' }}
                                    startIcon={<LogoutIcon />}
                                >
                                    Logout
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
