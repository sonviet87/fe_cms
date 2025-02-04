import { useTheme } from '@emotion/react';
import {Box, CardContent, Grid, Typography} from '@mui/material';
import React from 'react';
import { CardWrapperStyled } from './SlytedComponent/Card';


function CardItem({ bgColor, bgColorSub, title, data }) {
    const theme = useTheme();
    return (
        <CardWrapperStyled bgColor={bgColor} bgColorSub={bgColorSub}>
            <CardContent>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container alignItems="center">
                            <Grid item>
                                <Typography sx={{ fontSize: '1.4rem', fontWeight: 500, mr: 1, mt: 0, mb: 0.75,color:'#060a7e' }}>
                                    {title ? title : ''}
                                </Typography>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item sx={{ mb: 1.25 ,display:'flex',alignItems:'center'}}>
                        {data.length>0 && data.map((item,index) =>(
                            <Box sx={{mr:'20px'}} key={index}>
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: '#81828c'
                                    }}
                                >
                                    {item.name}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '1.2rem',
                                        fontWeight: 700,
                                        color: '#454652',
                                        textAlign:'center'
                                    }}
                                >
                                    {item.value}
                                </Typography>
                            </Box>
                        ))}



                    </Grid>
                </Grid>
            </CardContent>
        </CardWrapperStyled>);
}

export default CardItem;