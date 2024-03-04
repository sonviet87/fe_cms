export const chanceStatus = {
  STEP_1 : 10,
  STEP_2 : 30,
  STEP_3 : 50,
  STEP_4 : 70,
  STEP_5 : 90,
  STEP_6 : 100,
};
export const chanceProgress = {
  IN_PROGRESS : 0,
  PROGRESS_SUCCESS : 1,
  PROGRESS_FAILED : 2,

};
export const chanceArray = [
  { id: chanceStatus.STEP_1, name: 'Cà phê & ăn Trưa' },
  { id: chanceStatus.STEP_2, name: 'Tư vấn giải pháp' },
  { id: chanceStatus.STEP_3, name: 'Báo giá' },
  { id: chanceStatus.STEP_4, name: 'Thương Lượng giá' },
  { id: chanceStatus.STEP_5, name: 'Thương thảo hợp đồng' },
  { id: chanceStatus.STEP_6, name: 'Ký hợp đồng' },

];
export const getProgressName = (progress) =>{
  console.log(progress)
  switch (progress) {
    case chanceProgress.PROGRESS_SUCCESS:
      return 'Hoàn tất dự án';
    case chanceProgress.PROGRESS_FAILED:
      return 'Dự án thất bại';
    case chanceStatus.STEP_3:

    default:
      return 'Đang tiến hành';
  }
}

export const getStepName = (step) =>{
  switch (step) {
    case chanceStatus.STEP_1:
      return 'Cà phê & ăn Trưa';
    case chanceStatus.STEP_2:
      return 'Tư vấn giải pháp';
    case chanceStatus.STEP_3:
      return 'Báo giá';
    case chanceStatus.STEP_4:
      return 'Thương Lượng giá';
    case chanceStatus.STEP_5:
      return 'Thương thảo hợp đồng';
    case chanceStatus.STEP_6:
      return 'Ký hợp đồng';
    default:
      return '';
  }
}