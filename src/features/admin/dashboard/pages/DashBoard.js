import React from 'react';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import CardItem from 'components/Common/CardItem';
import { useTheme } from '@emotion/react';



const DashBoard = () => {
    const theme = useTheme();

    return (

        <Box padding={3}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <CardItem title="0" subTitle="Nhà cung cấp" />
                        </Grid>
                        <Grid item xs={4}>
                            <CardItem bgColor={theme.palette.secondary.main} bgColorSub={theme.palette.secondary.light} title="0" subTitle="Khách hàng" />
                        </Grid>
                        <Grid item xs={4}>
                            <CardItem bgColor={theme.palette.third.main} bgColorSub={theme.palette.third.light} title="0" subTitle="PAKD" />
                        </Grid>
                    </Grid>
                </Grid>


            </Grid>
        </Box>
    );

}

export default DashBoard;