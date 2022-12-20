import { Button } from '@mui/material';
import React from 'react';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useState } from 'react';

const FPExportExcel = ({ data, id, fps, status }) => {
    //const [statusButton, setStatusButton] = useState(0);

    const fontFamily = 'Times New Roman';
    const myBase64Image =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAABmCAYAAADcbeNLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUY5QkJEOTA3NDU1MTFFRDhGNDY5MDY3OUNEODA0REQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUY5QkJEOTE3NDU1MTFFRDhGNDY5MDY3OUNEODA0REQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1RjlCQkQ4RTc0NTUxMUVEOEY0NjkwNjc5Q0Q4MDRERCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1RjlCQkQ4Rjc0NTUxMUVEOEY0NjkwNjc5Q0Q4MDRERCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuN+TwUAABcySURBVHja7F0HVBRX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';

    // React.useEffect(() => {
    //     setStatusButton(status)

    // }, [status])
    const exportToExcel = async (fileName, sheetName) => {
        if (!data || data.length === 0) {
            console.error('Chưa có data');
            return;
        }

        const wb = new ExcelJS.Workbook();
        if (parseInt(status) !== 0) {
            const wsQuatation = wb.addWorksheet("Báo giá", {
                views: [{ zoomScale: 80, zoomScaleNormal: 80, }],
                pageSetup: { paperSize: 9, fitToPage: true },
                margins: {
                    left: 0.45, right: 0.45,
                    top: 0.5, bottom: 0.5,
                    header: 0.3, footer: 0.3
                }
            });
            createQuotation(wb, wsQuatation)
        }


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
            br: { col: 1.8, row: 3.5 }
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

    const createQuotation = (wb, ws) => {
        const headers = ['STT', 'Tên sản phẩm', 'Mô tả sản phẩm', 'Số lượng', 'Đơn giá', 'Thành tiền', 'VAT', 'Tổng '];

        const columns = headers?.length;
        const widths = [
            { width: 5 },
            { width: 20 },
            { width: 50 },
            { width: 10 },
            { width: 20 },
            { width: 25 },
            { width: 20 },
            { width: 25 },

        ]

        if (widths && widths.length > 0) {
            ws.columns = widths;
        }
        //add logo
        const logo1 = wb.addImage({
            base64: myBase64Image,
            extension: 'png',
        });

        ws.addImage(logo1, {
            tl: { col: 0, row: 0 },
            br: { col: 2, row: 5 }
        });
        const header = {
            border: true,
            money: false,
            height: 40,
            font: {
                size: 12,
                bold: true,
                name: fontFamily,
            },
            alignment: { horizontal: 'center', vertical: 'middle' },
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {
                    argb: 'FFFFFF',
                },
            },
        };
        const title = {
            border: false,
            money: false,
            // height: 100,
            font: {
                name: fontFamily,
                size: 20,
                bold: true, //color: { argb: 'FFFFFF' }
            },
            alignment: { horizontal: 'center', vertical: 'middle' },
        };
        const item = {
            border: true,
            money: true,
            font: { size: 12, bold: false, color: { argb: '000000' }, name: fontFamily, },
            alignment: { horizontal: 'center', vertical: 'middle', wrapText: true },
            fill: null,
        };
        const info = {
            font: {
                name: fontFamily,
                bold: true,
            },
        }
        const totalSytle = {
            border: true,
            money: true,
            font: {
                name: fontFamily,
                bold: true,
                color: 'ffffff'
            },
            height: 40,
            alignment: { horizontal: 'center', vertical: 'middle', wrapText: true },
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {
                    argb: '04b2f7',
                },
            },
        }
        const footerTitle = {
            font: {
                name: fontFamily,
                bold: true,
            },
        }
        const footerText = {
            font: {
                name: fontFamily,
            },
        }

        const signText = {
            font: {
                name: fontFamily,
                bold: true,
            },
            alignment: { horizontal: 'center', vertical: 'middle', },
        }
        // addRow(ws, ['Số 132/70A Đường Bình Đông, P14, Quận 8,TP. Hồ Chí Minh. '], header);
        ws.getRow(1).getCell(8).value = 'Số 132/70A Đường Bình Đông, P14, Quận 8,TP. Hồ Chí Minh.';
        ws.getRow(1).getCell(8).alignment = { horizontal: 'right', vertical: 'middle' };
        ws.getRow(1).getCell(8).font = { size: 12, bold: true, name: fontFamily }
        ws.getRow(2).getCell(8).value = 'Website : mvtech.vn';
        ws.getRow(2).getCell(8).alignment = { horizontal: 'right', vertical: 'middle' };
        ws.getRow(2).getCell(8).font = { size: 12, bold: true, name: fontFamily }
        ws.getRow(3).getCell(8).value = 'Tel: 028 39515979';
        ws.getRow(3).getCell(8).alignment = { horizontal: 'right', vertical: 'middle' };
        ws.getRow(3).getCell(8).font = { size: 12, bold: true, name: fontFamily }
        //start from row 6
        ws.getRow(6).values = '';
        //add title 
        mergeCells(ws, addRow(ws, ['BẢNG CHÀO GIÁ'], title), 1, columns);
        ws.addRow('');
        mergeCells(ws, addRow(ws, ['Kính gửi', '', fps.account.toString().toUpperCase()], info), 1, 2);
        mergeCells(ws, addRow(ws, ['Người nhận', '', fps?.contact], info), 1, 2);
        mergeCells(ws, addRow(ws, ['Đơn vị cung cấp ', '', 'CÔNG TY MVTECH'], info), 1, 2);
        mergeCells(ws, addRow(ws, ['Địa chỉ', '', 'Số 132/70A Đường Bình Đông, P14, Quận 8, TP. Hồ Chí Minh.'], info), 1, 2);
        let rowUser = addRow(ws, ['Người gửi', '', fps?.user_assign_name + ' - ĐT: ' + fps?.phone], info);
        const dateObj = new Date();
        const month = dateObj.getUTCMonth() + 1; //months from 1-12
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        rowUser.getCell(8).value = day + '/' + month + '/' + year;
        rowUser.getCell(8).font = { size: 12, bold: true, name: fontFamily }
        rowUser.getCell(8).alignment = { horizontal: 'right', vertical: 'middle' }
        mergeCells(ws, rowUser, 1, 2);
        ws.addRow('');
        //create header

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
        //create details
        let totalSell = 0;
        let totalVat = 0;
        let totalFinal = 0;
        data.forEach((r, index) => {
            const vat = parseInt(r.total_sell) * (parseInt(r.category?.tax_percent.toString().replace(/%/g, '')) / 100);
            const tt = parseInt(r.total_sell) + vat;
            const row = addRow(ws, [
                index + 1, r.category?.name, r.category?.descriptions, r.qty, parseInt(r.price_sell), parseInt(r.total_sell), vat, tt
            ], item);
            //set style
            row.getCell(2).alignment = { horizontal: 'left', wrapText: true, vertical: 'middle' };
            row.getCell(3).alignment = { horizontal: 'left', wrapText: true, vertical: 'middle' };
            totalSell += parseInt(r.total_sell);
            totalVat += vat;
            totalFinal += tt;
        });
        let totalRow = addRow(ws, ['Tổng Thành Tiền:', '', '', '', '', totalSell, totalVat, totalFinal], totalSytle)
        mergeCells(ws, totalRow, 1, 5);
        ws.addRow('');
        addRow(ws, ['Điều khoản liên quan:'], footerTitle);
        addRow(ws, ['1. Giá trên là giá giao hàng tại TP. HCM, đã bao gồm các chi phí vận chuyển đến nơi lắp đặt,  thuế giá trị gia tăng, các loại phí ,bảo hiểm rủi ro, chi phí bảo hành'], footerTitle);
        ws.addRow('');
        addRow(ws, ['2. Phương thức thanh toán: Chuyển khoản'], footerTitle);

        mergeCells(ws, addRow(ws, ['Điều kiện thanh toán', '', 'Lần 01: Thanh toán 100% giá trị hợp đồng trong vòng 07 ngày sau khi ký kết hợp đồng'], footerText), 1, 2);
        ws.addRow('');
        addRow(ws, ['3. Thông tin tài khoản ngân hàng:'], footerTitle);
        addRow(ws, ['', '', 'CÔNG TY MVTECH'], footerText);
        addRow(ws, ['', '', 'Số 132/70A Đường Bình Đông, P14, Quận 8, TP. Hồ Chí Minh.'], footerText);
        addRow(ws, ['', '', 'Số TK: 0171003484872, tại Ngân hàng Vietcombank – CN Tây Sài Gòn, TP.HCM'], footerText);
        ws.addRow('');
        addRow(ws, ['4. Bảo hành: theo quy định của Nhà sản xuất tại Việt Nam'], footerTitle);
        ws.addRow('');
        addRow(ws, ['5. Thời gian thực hiện dịch vụ :'], footerTitle);
        addRow(ws, ['Dịch vụ sẽ kích hoạt kể từ ngày ký PO hoặc hợp đồng'], footerText);
        ws.addRow('');
        addRow(ws, ['6. Bảng giá có hiệu lực trong vòng 30 ngày, kể từ này thông báo.'], footerTitle);
        ws.addRow('');

        mergeCells(ws, addRow(ws, ['Đại Điện MVTECH', '', '', '', '', '', 'Đại Điện Khách Hàng'], signText), 1, 2);
        let rowSign = addRow(ws, ['', '', '', '', '', fps.account.toString().toUpperCase(), '', '',], signText)
        mergeCells(ws, rowSign, 6, columns);



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
            Xuất báo giá
        </Button>
    );
};

export default FPExportExcel;
