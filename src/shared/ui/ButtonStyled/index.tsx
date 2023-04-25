import React from 'react';
import {Button} from "@mui/material";
import styled from 'styled-components';


export const ButtonStyled = styled(Button)({
        background: 'linear-gradient(30deg, rgba(46,100,213,1) 0%, rgba(1,237,213,1) 100%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(46, 100, 213, .3)',
        color: 'white !important',
        height: 48,
        padding: '0 30px',
    '&:hover': {
        background: 'linear-gradient(30deg, rgba(1,237,213,1) 0%, rgba(46,100,213,1) 100%)',
    },
    '&:active': {
        boxShadow: 'none',
    },
    '&:focus': {
        boxShadow: '0 3px 5px 2px rgba(46, 100, 213, .5)',
    },
});
