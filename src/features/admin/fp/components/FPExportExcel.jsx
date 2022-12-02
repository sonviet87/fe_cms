import { Button } from '@mui/material';
import React from 'react';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const FPExportExcel = ({ data, id, fps }) => {
    const myBase64Image =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAABhCAYAAABRe6o8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjM3QzQyOUQ3MTVEMTFFRDhFRUU5RjdEMzdBNDAyMTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjM3QzQyOUU3MTVEMTFFRDhFRUU5RjdEMzdBNDAyMTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MzdDNDI5QjcxNUQxMUVEOEVFRTlGN0QzN0E0MDIxOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MzdDNDI5QzcxNUQxMUVEOEVFRTlGN0QzN0E0MDIxOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpmDYPwAABtlSURBVHja7F0HeFzV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';


    const exportToExcel = async (fileName, sheetName) => {
        if (!data || data.length === 0) {
            console.error('Chưa có data');
            return;
        }

        const wb = new ExcelJS.Workbook();
        const wsQuatation = wb.addWorksheet("Báo giá", { views: [{ zoomScale: 80, zoomScaleNormal: 80 }] });
        const wsPAKD = wb.addWorksheet(sheetName, { views: [{ zoomScale: 80, zoomScaleNormal: 80 }] });



        createSheetPAKD(wb, wsPAKD);


        const buf = await wb.xlsx.writeBuffer();
        saveAs(new Blob([buf]), `${fileName}.xlsx`);
    };

    const createSheetPAKD = (wb, ws) => {
        const headers = ['No', 'Sản phẩm', 'Mô tả', 'Số lượng', 'Giá mua \r\n (VNĐ)', 'Tổng giá mua \r\n (VNĐ)', 'Giá bán \r\n (VNĐ)', 'Tổng giá bán \r\n (VNĐ)', 'Lợi nhuận', 'Nhà cung cấp'];

        const columns = headers?.length;
        const widths = [
            { width: 10 },
            { width: 30 },
            { width: 50 },
            { width: 10 },
            { width: 25 },
            { width: 30 },
            { width: 25 },
            { width: 30 },
            { width: 20 },
            { width: 50 },
        ]
        const title = {
            border: false,
            money: false,
            // height: 100,
            font: {
                name: 'Tahoma',
                size: 20,
                bold: true, //color: { argb: 'FFFFFF' }
            },
            alignment: { horizontal: 'center', vertical: 'middle' },
        };
        const header = {
            border: true,
            money: false,
            //height: 70,
            font: {
                size: 12,
                bold: true, //color: { argb: 'FFFFFF' }
            },
            alignment: { horizontal: 'center', vertical: 'middle', wrapText: true },
            fill: {
                type: 'pattern',
                pattern: 'solid', //darkVertical
                fgColor: {
                    argb: 'FFFFFF',
                },
            },
        };
        const item = {
            border: true,
            money: true,
            height: 0,
            font: { size: 12, bold: false, color: { argb: '000000' } },
            alignment: { horizontal: 'center', vertical: 'middle', wrapText: true },
            fill: null,
        };

        const totalAttrbg = {
            border: true,
            font: {
                size: 12,
                bold: true,
            },
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {
                    argb: '04b2f7',
                },
            },
            alignment: { horizontal: 'right', vertical: 'middle' },
            money: true
        }

        const totalAttr = {
            border: true,
            font: {
                size: 12,
                bold: false,
            },
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {
                    argb: 'ffffff',
                },
            },
            alignment: { horizontal: 'right', vertical: 'middle' },
            money: true
        }

        if (widths && widths.length > 0) {
            ws.columns = widths;
        }
        //add logo
        const logo1 = wb.addImage({
            base64: myBase64Image,
            extension: 'png',
        });

        ws.addImage(logo1, {
            tl: { col: 0.5, row: 0.5 },
            br: { col: 1.5, row: 3 }
        });
        //start from row four
        ws.getRow(4).values = '';

        let row = addRow(ws, ['PHƯƠNG ÁN KINH DOANH'], title);

        mergeCells(ws, row, 1, columns);

        //add code fp
        const dateObj = new Date();
        const month = dateObj.getUTCMonth() + 1; //months from 1-12
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        const codeFP = 'PAKD /' + id + '-' + day + month + year;
        let row1 = addRow(ws, [codeFP], {
            border: false,
            font: {
                size: 10,
                bold: false,
            },
            alignment: { horizontal: 'center', vertical: 'middle' },
        });
        mergeCells(ws, row1, 1, columns);
        // account name
        let rowAccount = addRow(ws, ["Gửi tới: ", fps.account, "", "", "", "", "", "", "", day + "/" + month + "/" + year]);
        rowAccount.getCell(10).alignment = { horizontal: 'right' }
        mergeCells(ws, rowAccount, 2, 3);
        //add empty row
        addRow(ws, ' ');
        addRow(ws, Object.values(headers), header);
        let rowbg = addRow(ws, [" "], {
            border: true,
            fill: {
                type: 'pattern',
                pattern: 'solid', //darkVertical
                fgColor: {
                    argb: '04b2f7',
                },
            },
        });
        mergeCells(ws, rowbg, 1, columns);
        //raw details
        let totalSell = 0;
        let totalBuy = 0;
        data.forEach((r) => {
            const row = addRow(ws, [
                r.id, r.category?.name, r.category?.descriptions, r.qty, parseInt(r.price_buy), parseInt(r.total_buy), parseInt(r.price_sell), parseInt(r.total_sell), r.profit + "%", r.supplier.company
            ], item);
            //set style
            row.getCell(3).alignment = { horizontal: 'left', wrapText: true };
            // row.getCell(5).numFmt = '#,##0';
            // row.getCell(6).numFmt = '#,##0';
            // row.getCell(7).numFmt = '#,##0';
            // row.getCell(8).numFmt = '#,##0';
            totalSell += parseInt(r.total_sell);
            totalBuy += parseInt(r.total_buy);

        });
        //add row total
        let rowtotal = addRow(ws, ["TỔNG GIÁ  (MUA/BÁN):", " ", " ", " ", " ", parseInt(totalBuy), " ", parseInt(totalSell), " ", " "], totalAttrbg);
        // rowtotal.getCell(1).alignment = { horizontal: 'left', };
        mergeCells(ws, rowtotal, 1, 3);
        //add empty row
        ws.addRow(' ');

        //add row total
        const percentTotal = (((totalSell - totalBuy) / totalSell) * 100).toFixed(2);
        const totalPrice = parseInt(totalSell) - parseInt(totalBuy);
        const totalBids = totalPrice - fps.shipping_charges - fps.guest_costs - fps.deployment_costs - fps.interest - fps.commission - fps.tax - fps.bids_cost;
        const totalPercent = ((parseInt(totalBids) / parseInt(totalSell)) * 100).toFixed(2)

        mergeCells(ws, addRow(ws, [null, null, null, "LÃI GỘP = TỔNG BÁN - TỔNG MUA:", "", "", totalPrice, percentTotal + "%"], totalAttrbg), 4, 6);
        mergeCells(ws, addRow(ws, [null, null, null, "Chi phí Vận chuyển:", "", "", parseInt(fps.shipping_charges), fps.shipping_charges_percent + "%"], totalAttr), 4, 6);
        mergeCells(ws, addRow(ws, [null, null, null, "Chi phí tiếp khách:", "", "", parseInt(fps.guest_costs), fps.guest_costs_percent + "%"], totalAttr), 4, 6);
        mergeCells(ws, addRow(ws, [null, null, null, "Chi phí triển khai:", "", "", parseInt(fps.deployment_costs), fps.deployment_costs_percent + "%"], totalAttr), 4, 6);
        mergeCells(ws, addRow(ws, [null, null, null, "Lãi vay/(" + fps.interest_percent + " tháng):", "", "", parseInt(fps.interest), fps.interest_percent + "%"], totalAttr), 4, 6);
        mergeCells(ws, addRow(ws, [null, null, null, "Chi phí HH:", "", "", parseInt(fps.commission), fps.commission_percent + "%"], totalAttr), 4, 6);
        mergeCells(ws, addRow(ws, [null, null, null, "Thuế thu nhập 20%:", "", "", parseInt(fps.tax), "20%"], totalAttr), 4, 6);
        mergeCells(ws, addRow(ws, [null, null, null, "Chi phí đấu thầu", "", "", parseInt(fps.bids_cost), fps.bids_cost_percent + "%"], totalAttr), 4, 6);
        mergeCells(ws, addRow(ws, [null, null, null, "LÃI", "", "", parseInt(totalBids), totalPercent + "%"], totalAttrbg), 4, 6);

        return ws;
    }

    const addRow = (ws, data, section) => {
        const borderStyles = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        const row = ws.addRow(data);
        row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
            if (section?.border) {
                cell.border = borderStyles;
                if (section?.money && typeof cell.value === 'number') {
                    cell.alignment = { horizontal: 'right', vertical: 'middle' };
                    cell.numFmt = '#,##0';
                }
            }
            if (section?.alignment) {
                cell.alignment = section.alignment;
            } else {
                cell.alignment = { vertical: 'middle' };
            }
            if (section?.font) {
                cell.font = section.font;
            }
            if (section?.fill) {
                cell.fill = section.fill;
            }
        });
        if (section?.height > 0) {
            row.height = section.height;
        }

        return row;
    };

    const mergeCells = (ws, row, from, to) => {
        ws.mergeCells(`${row.getCell(from)._address}: ${row.getCell(to)._address}`);
    };

    return (
        <Button
            color="third"
            variant="contained"
            startIcon={<LocalPrintshopIcon />}
            sx={{ mb: 2 }}
            size="small"
            onClick={() => {
                exportToExcel('testExecl', 'PAKD');
            }}
        >
            {' '}
            Xuất Excel
        </Button>
    );
};

export default FPExportExcel;
