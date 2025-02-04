import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import CardItem from "../../../../components/Common/CardItem";
import {useTheme} from "@emotion/react";
import moment from "moment";
function ItemCount({ list }) {
    const theme = useTheme();
    const [data, setData] = useState({});
    const currentYear =   moment().year();
    const transformedData = {
        debts: [
            {
                name: "Chưa thanh toán NCC",
                value: list?.debts?.unpaid_supplier || 0,
            },
            {
                name: "Khách hàng chưa thanh toán",
                value: list?.debts?.unpaid_debts || 0,
            },
        ],
        chances: [
            {
                name: "Cơ hội mới",
                value: list?.chances?.total || 0,
            },
            {
                name: "Đang treo",
                value: list?.chances?.in_progress || 0,
            },
            {
                name: "Đang tiến hành",
                value: list?.chances?.progress_success || 0,
            },
            {
                name: "Thất bại",
                value: list?.chances?.progress_failed || 0,
            },
        ],
        fp: [
            {
                name: "Tổng PAKD",
                value: list?.fp?.total_fp || 0,
            },
            {
                name: "PAKD Mới ",
                value: list?.fp?.status_new || 0,
            },
            {
                name: "Duyệt PAKD",
                value: list?.fp?.status_pakd || 0,
            },
            {
                name: "Duyệt Hợp đồng",
                value: list?.fp?.status_contract || 0,
            },
        ],
        customer: [
            {
                name: "Tổng Khách hàng",
                value:  list?.customer?.total || 0,
            },
            {
                name: "KH có hợp đồng "+ currentYear,
                value:  list?.customer?.old_account || 0,
            },
            {
                name: "KH  mới chưa có hợp đồng "+currentYear,
                value:  list?.customer?.new_account || 0,
            },

        ],
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <CardItem
                    bgColor="theme.palette.common.white"
                    title="Công nợ"
                    data={transformedData.debts}
                />
            </Grid>
            <Grid item xs={6}>
                <CardItem
                    bgColor="theme.palette.common.white"
                    bgColorSub={'#c19f38'}
                    title="Cơ hội kinh doanh"
                    data={transformedData.chances}
                />
            </Grid>
            <Grid item xs={6}>
                <CardItem
                    bgColor={theme.palette.common.white}
                    bgColorSub={theme.palette.third.light}
                    title="PAKD"
                    data={transformedData.fp}
                />
            </Grid>
            <Grid item xs={6}>
                <CardItem
                    bgColor={theme.palette.common.white}
                    bgColorSub={theme.palette.secondary.light}
                    title="Khách hàng"
                    subTitle="Khách hàng"
                    data={transformedData.customer} // Thêm data khách hàng nếu cần
                />
            </Grid>
        </Grid>
    );
}
export default ItemCount;