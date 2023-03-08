import { Button } from '@mui/material';
import React from 'react';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import moment from 'moment';
import * as yup from "yup";
import reportDebtSupplierApi from "api/reportDebtSupplierAPI";

const ReportDebtSupplierExportExcel = ({  filter,methods }) => {
  const fontFamily = 'Times New Roman';
  const schema = yup.object().shape({
    startDay: yup.string().required('Xin hãy chọn ngày bắt đầu'),
    endDay: yup.string().required('Xin hãy chọn ngày kết thúc'),
  });

  const exportToExcel = async (fileName, sheetName) => {

    methods.trigger();
    const formValue = methods.getValues();
    const isValid = schema.isValidSync(formValue);
    if (isValid) {
      try {
        const params = {...filter, list: 'list'}
        const res = await reportDebtSupplierApi.getList(params);
        if (res.status) {
          const wb = new ExcelJS.Workbook();
          const wsPAKD = wb.addWorksheet(sheetName, { views: [{ zoomScale: 80, zoomScaleNormal: 80 }] });
          createSheetPAKD(wb, wsPAKD, res.data.data);
          const buf = await wb.xlsx.writeBuffer();
          saveAs(new Blob([buf]), `${fileName}.xlsx`);
        }
      } catch (error) {
        console.log('get fp by id error', error);
      }
    }

  };

  const createSheetPAKD = (wb, ws, data) => {
    const headers = ['No', 'Khách hàng', 'Liên hệ', 'Sale phụ trách', 'Tổng giá bán (VAT)', 'Tình trạng'];

    const columns = headers?.length;
    const widths = [
      { width: 10 },
      { width: 30 },
      { width: 50 },
      { width: 10 },
      { width: 25 },
      { width: 25 },
      { width: 30 },
      { width: 25 },
    ];
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
    const item = {
      border: true,
      money: true,
      height: 0,
      font: { size: 12, bold: false, color: { argb: '000000' }, name: fontFamily },
      alignment: { horizontal: 'center', vertical: 'middle', wrapText: true },
      fill: null,
    };

    if (widths && widths.length > 0) {
      ws.columns = widths;
    }

    //start from row four
    ws.getRow(2).values = '';

    let row = addRow(ws, ['BÁO CÁO CÔNG NỢ NHÀ CUNG CẤP'], title);

    mergeCells(ws, row, 1, columns);
    //add date row

    let rowDate = addRow(
      ws,
        [moment(methods.getValues('startDay')).format('DD-MM-YYYY') + ' - ' + moment(methods.getValues('endDay')).format('DD-MM-YYYY')],
      {
        border: false,
        font: { size: 11, bold: true, color: { argb: '000000' }, name: fontFamily },
        alignment: { horizontal: 'center', vertical: 'middle' },
      },
    );
    mergeCells(ws, rowDate, 1, columns);
    //add empty row
    addRow(ws, ' ');
    addRow(ws, Object.values(headers), header);

    let totalVAT = 0;
    let totalFP = 0;
    data.forEach((r) => {
      totalVAT += parseInt(r.total_debt);
      totalFP++;
    });
    const stringTotal = `(Tổng PAKD: ${totalFP} /  Tổng giá mua (VAT): ${totalVAT.toLocaleString()})`;
    let rowbg = addRow(ws, [stringTotal], {
      border: true,
      height: 50,
      fill: {
        type: 'pattern',
        pattern: 'solid', //darkVertical
        fgColor: {
          argb: '04b2f7',
        },
      },
      font: { size: 12, bold: true, color: { argb: '000000' }, name: fontFamily },
      alignment: { horizontal: 'center', vertical: 'middle' },
    });
    mergeCells(ws, rowbg, 1, columns);
    //raw details

    data.forEach((r) => {
      const row = addRow(
        ws,
        [r.fp.code, r.fp.account, r.supplier, r.fp.user_assign_name, parseInt(r.total_debt), r.isDone],
        item,
      );
      //set style
      row.getCell(2).alignment = { horizontal: 'left', wrapText: true };
      row.getCell(3).alignment = { horizontal: 'left', wrapText: true };
    });

    //ws.getRow(6).value = stringTotal;
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
      Xuất báo cáo
    </Button>
  );
};

export default ReportDebtSupplierExportExcel;
