export const statusApproved = {
  STATUS_NEW: 0,
  STATUS_PAKD: 1,
  STATUS_PAKD_FAILED: 2,
  STATUS_CONTRACT: 3,
  STATUS_SHIPPING: 4,
  STATUS_INVOICE: 5,
  STATUS_COMPLETED: 6,
  STATUS_BACK: 7,
};
export const statusArray = [
  { id: statusApproved.STATUS_NEW, name: 'Mới' },
  { id: statusApproved.STATUS_PAKD, name: 'Duyệt PAKD' },
  { id: statusApproved.STATUS_PAKD_FAILED, name: 'Hủy PAKD' },
  { id: statusApproved.STATUS_CONTRACT, name: 'Duyệt hợp đồng' },
  { id: statusApproved.STATUS_SHIPPING, name: 'Duyệt giao hàng' },
  { id: statusApproved.STATUS_INVOICE, name: 'Xuất hóa đơn' },
  { id: statusApproved.STATUS_COMPLETED, name: 'Hoàn tất hợp đồng' },
  { id: statusApproved.STATUS_BACK, name: 'Trả về' },
];

export const fpPermissions = {
  FP_APPROVED_MANAGER: 'fp-approved-manager',
  FP_APPROVED_SALE: 'fp-approved-sale',
  FP_LIST: 'fp-list',
  FP_CREATE: 'fp-create',
  FP_EDIT: 'fp-edit',
  FP_DELETE: 'fp-delete',
  FP_IS_SALE: 'fp-is-sale',
};
