import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    Popover,
    Divider,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { IconWrapper } from "../styles/StyledDashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import moment from "moment";
import kpiSetUpUserApi from "../../../../api/kpiSetUpUserAPI";
import { toast } from "react-toastify";
import userAPI from "../../../../api/userAPI";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../../auth/authSlice";

function PopupSetting({onSaleKpiList,selectedMonth}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [list, setList] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [isAllChecked, setIsAllChecked] = useState(false);
    const curentUser = useSelector(selectCurrentUser)
    const handleCheckAll = (event) => {
        const isChecked = event.target.checked;
        setIsAllChecked(isChecked);
        const updatedItems = list.reduce((acc, item) => {
            acc[item.id] = isChecked;
            return acc;
        }, {});
        setCheckedItems(updatedItems);
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        const id = parseInt(name, 10); // Convert name (id) to number
        setCheckedItems((prev) => {
            const updated = { ...prev, [id]: checked };
            const allChecked = list.every((item) => updated[item.id]);
            setIsAllChecked(allChecked);
            return updated;
        });
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSave = async () => {
        const selectedIds = Object.keys(checkedItems)
            .filter((key) => checkedItems[key])
            .map((id) => parseInt(id, 10));

        await userAPI.updateConfigKpi({'config': selectedIds})
        const { startDay, endDay } = getStartAndEndDay(selectedMonth);
        await onSaleKpiList(selectedIds,startDay,endDay);
        handleClose();
    };
    const getStartAndEndDay = (month) => {
        const year = moment().year(); // Lấy năm hiện tại
        const startDay = moment(`${year}-${month}`, "YYYY-M").startOf("month").format("YYYY-MM-DD");
        const endDay = moment(`${year}-${month}`, "YYYY-M").endOf("month").format("YYYY-MM-DD");
        return { startDay, endDay };
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    useEffect(() => {
        (async () => {
            try {
                const currentYear = moment().year();
                //const currentYear = 2024;
                const res = await kpiSetUpUserApi.getAll({ year: currentYear });
                if (res.status && res?.data?.status) {
                    setList(res.data.data);
                    let configKpiArray = [];
                    try {
                        configKpiArray = curentUser.config_kpi?  JSON.parse(curentUser.config_kpi): null;

                    } catch (error) {
                        console.error("Invalid JSON string:", error);
                    }

                    // Initialize checkedItems
                    const initialCheckedItems = res.data.data.reduce((acc, item) => {
                         acc[item.id] = configKpiArray!== null? configKpiArray.includes(item.id): false;
                        return acc;
                    }, {});
                    setCheckedItems(initialCheckedItems);
                } else {
                    toast.error(res?.data?.message);
                }
            } catch (error) {
                console.log("error", error);
            }
        })();
    }, []);

    return (
        <Box>
            <IconWrapper onClick={handleClick}>
                <SettingsIcon sx={{color:'#fff'}} />
            </IconWrapper>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <Box  sx={{
                    width: 300,
                    maxHeight: 300,
                    overflow: "auto",
                    p: 1.5,
                }}>
                    {/* Check All */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isAllChecked}
                                onChange={handleCheckAll}
                            />
                        }
                        label={
                            <Typography variant="body2" fontWeight="bold">
                                Chọn tất cả
                            </Typography>
                        }
                        sx={{ my: 0.5 }}
                    />
                    <Divider sx={{ my: 1 }} />
                    {/* Items */}
                    {list.map((item) => (
                        <FormControlLabel
                            key={item.id}
                            control={
                                <Checkbox
                                    checked={checkedItems[item.id] || false}
                                    onChange={handleCheckboxChange}
                                    name={`${item.id}`} // Convert id to string
                                    size="small"
                                />
                            }
                            label={
                                <Typography variant="body2">{item.name}</Typography>
                            }
                            sx={{ my: 0.5 }}
                        />
                    ))}
                    <Divider sx={{ my: 1 }} />
                    {/* Save Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSave}
                    >
                        Lưu
                    </Button>
                </Box>
            </Popover>
        </Box>
    );
}

export default PopupSetting;
