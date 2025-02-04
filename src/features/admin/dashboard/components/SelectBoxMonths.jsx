import React, { useState, useEffect } from "react";
import moment from "moment";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../../auth/authSlice";

const MonthSelector = ({onSaleKpiList,selectedMonth,setSelectedMonth}) => {

    const currentMonth = moment().month() + 1; // Tháng trong Moment.js tính từ 0-11
    const curentUser = useSelector(selectCurrentUser)

  //  const [selectedMonth, setSelectedMonth] = useState(currentMonth);


    const getStartAndEndDay = (month) => {
        const year = moment().year(); // Lấy năm hiện tại
       // const year = 2024;
        const startDay = moment(`${year}-${month}`, "YYYY-M").startOf("month").format("YYYY-MM-DD");
        const endDay = moment(`${year}-${month}`, "YYYY-M").endOf("month").format("YYYY-MM-DD");
        return { startDay, endDay };
    };

    // Khi tháng thay đổi
    const handleChange = async (event) => {
        const month = parseInt(event.target.value);
        setSelectedMonth(month);
        const { startDay, endDay } = getStartAndEndDay(month);

        let configKpiArray = [];
        try {
            if(curentUser.config_kpi === null || curentUser.config_kpi === '') return;
            console.log('curentUser.config_kpi',curentUser.config_kpi)
            configKpiArray =  JSON.parse(curentUser.config_kpi);
            await onSaleKpiList(configKpiArray,startDay,endDay);
        } catch (error) {
            console.error("Invalid JSON string:", error);
        }
    };

   /* useEffect(() => {
        // Khi component load, log tháng hiện tại
        const { startDay, endDay } = getStartAndEndDay(currentMonth);
        console.log("Start Day (Current Month):", startDay);
        console.log("End Day (Current Month):", endDay);
    }, [currentMonth]);*/

    return (
        <div>

            <select
                id="month-selector"
                value={selectedMonth}
                onChange={handleChange}
            >
                {Array.from({ length: 12 }, (_, index) => {
                    const month = index + 1;
                    return (
                        <option key={month} value={month}>
                            Tháng {month}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default MonthSelector;
