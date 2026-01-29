import React from 'react';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return(
        <Stack direction="row" spacing={2}>
            <Link to ='/'>
                {/* <img /> */}
                <h2>TuiEvoulution</h2>
            </Link>
            <Link to='/AboutUs' >
                <h4>AboutUs</h4>
            </Link>
            <Link to='/Projects'>
                <h4>Projects</h4>
            </Link>
        </Stack>
    )
};

export default NavBar;