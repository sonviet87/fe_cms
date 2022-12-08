import { Button } from '@mui/material';
import fpApi from 'api/fpAPI';
import { selectRoles } from 'features/auth/authSlice';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fpPermissions, statusApproved } from '../constants/FPConstants';

export const FPButtonApproved = ({ status }) => {
    const navigate = useNavigate();
    const permissions = useSelector(selectRoles)
    const [statusButton, setStatusButton] = useState(0);
    const { id } = useParams();
    React.useEffect(() => {
        setStatusButton(status)
    }, [status])
    const handleChangeStatus = async (value) => {

        try {
            const res = await fpApi.updateStatus(id, value)
            if (res.status) {
                toast.success(res.data.message);
                if (parseInt(value) === 2) { console.log(value); navigate('/admin/fps'); }
                setStatusButton(value)


            }
        } catch (error) {
            console.log('Error', error.message);
        }
    }

    return (
        <>{permissions.includes(fpPermissions.FP_APPROVED_MANAGER) &&
            <>
                {(parseInt(statusButton) === parseInt(statusApproved.STATUS_NEW) || parseInt(statusButton) === parseInt(statusApproved.STATUS_BACK)) && (
                    <><Button
                        color="primary"
                        variant="contained"
                        sx={{ mb: 2, mr: 1 }}
                        size="small"
                        onClick={() => handleChangeStatus(1)}
                    >
                        {' '}
                        Duyệt PAKD
                    </Button>

                        <Button
                            color="error"
                            variant="contained"
                            sx={{ mb: 2, mr: 1 }}
                            size="small"
                            onClick={() => handleChangeStatus(2)}
                        >
                            Hủy PAKD
                        </Button></>
                )}
                {parseInt(statusButton) === parseInt(statusApproved.STATUS_PAKD) && (
                    <><Button
                        color="primary"
                        variant="contained"
                        sx={{ mb: 2, mr: 1 }}
                        size="small"
                        onClick={() => handleChangeStatus(3)}
                    >
                        Duyệt Hợp đồng
                    </Button>
                    </>
                )}
            </>
        }

            {(permissions.includes(fpPermissions.FP_APPROVED_MANAGER) || permissions.includes(fpPermissions.FP_APPROVED_SALE)) &&
                <>   {parseInt(statusButton) === parseInt(statusApproved.STATUS_CONTRACT) && (
                    <><Button
                        color="primary"
                        variant="contained"
                        sx={{ mb: 2, mr: 1 }}
                        size="small"
                        onClick={() => handleChangeStatus(4)}
                    >
                        Duyệt giao hàng
                    </Button>
                    </>
                )}
                    {parseInt(statusButton) === parseInt(statusApproved.STATUS_SHIPPING) && (
                        <><Button
                            color="primary"
                            variant="contained"
                            sx={{ mb: 2, mr: 1 }}
                            size="small"
                            onClick={() => handleChangeStatus(5)}
                        >
                            Xuất hóa đơn
                        </Button>
                        </>
                    )}
                    {parseInt(statusButton) === parseInt(statusApproved.STATUS_INVOICE) && (
                        <><Button
                            color="primary"
                            variant="contained"
                            sx={{ mb: 2, mr: 1 }}
                            size="small"
                            onClick={() => handleChangeStatus(6)}
                        >
                            Hoàn tất hợp đồng
                        </Button>
                            <Button
                                color="error"
                                variant="contained"
                                sx={{ mb: 2, mr: 1 }}
                                size="small"
                                onClick={() => handleChangeStatus(7)}
                            >
                                Trả về
                            </Button>
                        </>
                    )}
                </>
            }
        </>
    );
}

