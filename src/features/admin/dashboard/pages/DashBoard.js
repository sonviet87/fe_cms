import React, {useEffect, useState} from 'react';
import { Box } from '@mui/system';
import {Grid} from '@mui/material';
import {WrapperBox} from "../styles/StyledDashboard";

import PopupSetting from "../components/PopupSetting";
import moment from "moment";
import kpiSaleAPI from "../../../../api/kpiSaleAPI";
import {toast} from "react-toastify";

import KpiSaleDashboard from "../components/KpiSaleDashboard";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../../auth/authSlice";
import ItemCount from "../components/ItemCount";
import dashboardAPI from "../../../../api/dashboardAPI";
import kpiSetUpUserAPI from "../../../../api/kpiSetUpUserAPI";


const DashBoard = () => {

    const [list, setList] = useState([]);
    const [listDashboard, setListDashboard] = useState([]);
    const curentUser = useSelector(selectCurrentUser);
    const [selectedMonth, setSelectedMonth] = useState( new Date().getMonth() + 1);

    const handleSaleKpiList = async (arrSettingKpi,startDay,endDay) =>{

        arrSettingKpi = arrSettingKpi || [];
        const res = await kpiSaleAPI.getListKpiSale({
            'startDay':startDay,
            'endDay':endDay,
            'listKpi':arrSettingKpi.join(", "),
            'type': 1
        })
        if (res.status) {
            if (res.data.status) {

                setList(res.data.data.sale_kpi);
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }

        } else {
            toast.error(res.message);
        }
    }
    useEffect(() => {
        (async () => {
            let configKpiArray = [];
            try {
                const startDay = moment().startOf("month").utcOffset(0, true).format("YYYY-MM-DD");
                const endDay = moment().endOf("month").utcOffset(0, true).format("YYYY-MM-DD");
                configKpiArray = curentUser.config_kpi?  JSON.parse(curentUser.config_kpi): null;

                if(configKpiArray === null){
                    //get data if config null
                   const rs = await kpiSetUpUserAPI.getIDByUser({'user_id':curentUser.id,'year':moment().year()});
                   if(rs.status && rs.data.status)  {
                       configKpiArray = [rs.data.data.id];
                   }
                }else {
                    //check kpi if not in current year will remove
                    const queryString = JSON.stringify(configKpiArray);
                    const rs = await kpiSetUpUserAPI.checkKpiIDUser({'arrID':queryString});
                    if(rs.status)  {
                        configKpiArray = [rs.data.data];
                    }
                }
                await handleSaleKpiList(configKpiArray,startDay,endDay);

                const rsDashboard = await dashboardAPI.getAll({'startDay':startDay,'endDay':endDay});

                if(rsDashboard.status && rsDashboard.data.status){
                    setListDashboard(rsDashboard.data.data);
                }


            } catch (error) {
                console.error("error:", error);
            }

        })();
    }, []);


    return (
        <>

        <Box padding={3}>

            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12}>
                    <ItemCount list={listDashboard} />
                </Grid>


            </Grid>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12}>
                    <WrapperBox padding={3}>

                        <KpiSaleDashboard list={list} onSaleKpiList={handleSaleKpiList} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
                        <PopupSetting onSaleKpiList={handleSaleKpiList} selectedMonth={selectedMonth} />
                    </WrapperBox>
                </Grid>
            </Grid>
        </Box>


        </>
    );

}

export default DashBoard;