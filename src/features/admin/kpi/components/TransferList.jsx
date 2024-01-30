import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import {NumericFormat} from "react-number-format";

import TextFormik from "../../../../components/FormElement/TextFormik";


function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

export default function SelectAllTransferList({lists,setValue, seletedUser=[],isEdit,control}) {



    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([...lists]);
    const [right, setRight] = React.useState(seletedUser);

    const [sumSalary, setSumSalary] = React.useState(0);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };
    React.useEffect(() => {
        const diffResult = lists.filter(item => !seletedUser.some(otherItem => item.id === otherItem.id));
        setRight(seletedUser);
        setLeft(diffResult);

    }, [seletedUser]);
    React.useEffect(() => {
        setValue('users',right)
        setSumSalary(right.reduce((acc, item) => acc + parseInt(item.salary), 0));
    }, [right]);

    const customList = (title, items) => (
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={
                            numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{
                            'aria-label': 'tất cả thành viên đã chọn',
                        }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} đã chọn`}
            />
            <Divider />
            <List
                sx={{
                    height: 230,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value) => {
                    const labelId = `transfer-list-all-item-${value.id}-label`;

                    return (
                        <ListItem
                            key={value.id}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={ value.name } />
                        </ListItem>
                    );
                })}
            </List>
        </Card>
    );

    return (
        <>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item>{customList('Danh sách nhân viên', left)}</Grid>
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <Button
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedRight}
                            disabled={leftChecked.length === 0}
                            aria-label="move selected right"
                        >
                            &gt;
                        </Button>
                        <Button
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedLeft}
                            disabled={rightChecked.length === 0}
                            aria-label="move selected left"
                        >
                            &lt;
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>{customList('Nhân viên đã chọn', right)}</Grid>
            </Grid>
            <Grid item xs={12} md={12} textAlign="center" sx={{mt:3,fontWeight:'bold'}}>
               Tổng lương :
                <NumericFormat
                displayType="text"
                value={sumSalary}
                thousandSeparator=","
                renderText={(value) => <b>{value}</b>}
            />
            </Grid>
        </>
    );
}