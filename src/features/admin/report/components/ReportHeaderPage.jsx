import { Button } from '@mui/material';
import { WrapperBoxAlign } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import React from 'react';
import ReportFPExportExcel from './ReportFPExportExcel';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import { Box } from '@mui/system';
function ReportHeaderPage({ list, filter, onHandleIsReport }) {
  return (
    <WrapperBoxAlign align="space-between" isborder={0}>
      <TitleForm lable="Thống kê phương án kinh doanh" isborder={0} />
      <Box>
        <Button
          color="sixth"
          variant="contained"
          startIcon={<EqualizerIcon />}
          sx={{ mb: 2, mr: 2 }}
          size="small"
          onClick={() => {
            onHandleIsReport(true)
          }}
        >
          Xem dạng biểu đồ
        </Button>
        <Button
          color="fiveth"
          variant="contained"
          startIcon={<AutoAwesomeMotionIcon />}
          sx={{ mb: 2, mr: 2 }}
          size="small"
          onClick={() => {
            onHandleIsReport(false)
          }}
        >
          Xem dạng dữ liệu
        </Button>
        <ReportFPExportExcel data={list} filter={filter} />
      </Box>



    </WrapperBoxAlign>
  );
}

export default ReportHeaderPage;
