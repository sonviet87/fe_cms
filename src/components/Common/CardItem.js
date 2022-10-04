import { useTheme } from '@emotion/react';
import { CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { CardWrapperStyled } from './SlytedComponent/Card';


function CardItem({ bgColor, bgColorSub, title, subTitle }) {
    const theme = useTheme();
    return (
        <CardWrapperStyled bgColor={bgColor} bgColorSub={bgColorSub}>
            <CardContent>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container alignItems="center">
                            <Grid item>
                                <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                    {title ? title : ''}
                                </Typography>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item sx={{ mb: 1.25 }}>
                        <Typography
                            sx={{
                                fontSize: '1rem',
                                fontWeight: 500,
                                color: theme.palette.secondary[200]
                            }}
                        >
                            {subTitle ? subTitle : ''}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </CardWrapperStyled>);
}

export default CardItem;