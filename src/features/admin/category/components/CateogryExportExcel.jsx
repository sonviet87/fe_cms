import { Button } from '@mui/material';
import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
function CateogryExportExcel(props) {
    const fontFamily = 'Times New Roman';

    const exportToExcel = async (fileName, sheetName) => {

        const wb = new ExcelJS.Workbook();
        const wsPAKD = wb.addWorksheet(sheetName, { views: [{ zoomScale: 80, zoomScaleNormal: 80 }] });
        createSheetPAKD(wb, wsPAKD);
        const buf = await wb.xlsx.writeBuffer();
        saveAs(new Blob([buf]), `${fileName}.xlsx`);
    };

    const createSheetPAKD = (wb, ws) => {
        const headers = ['name', 'descriptions', 'tax_percent'];

        const widths = [
            { width: 50 },
            { width: 50 },
            { width: 10 },
        ];
        const header = {
            border: true,
            money: false,
            //height: 70,
            font: {
                size: 12,
                bold: true, //color: { argb: 'FFFFFF' }
                name: fontFamily,
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

        if (widths && widths.length > 0) {
            ws.columns = widths;
        }

        addRow(ws, Object.values(headers), header);


        addRow(ws, ['Nhập tên', 'Nhập mô tả', 10]);
        return ws;
    };

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
            color="fiveth"
            variant="contained"
            startIcon={<AddToPhotosIcon />}
            sx={{ ml: 1 }}

            onClick={() => {
                exportToExcel('fileMau', 'Categories');
            }}
        >
            {' '}
            File mẫu
        </Button>
    );
};

export default CateogryExportExcel;