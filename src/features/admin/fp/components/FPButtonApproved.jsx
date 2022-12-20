import { Button } from '@mui/material';
import fpApi from 'api/fpAPI';
import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import { selectRoles } from 'features/auth/authSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fpPermissions, statusApproved } from '../constants/FPConstants';

export const FPButtonApproved = ({ status, onChangeStatus }) => {
    const navigate = useNavigate();
    const permissions = useSelector(selectRoles)
    const [loading, setLoading] = React.useState(false);
    // const [statusButton, setStatusButton] = useState(0);
    const { id } = useParams();
    // React.useEffect(() => {
    //     setStatusButton(status)

    // }, [status])
    const handleChangeStatus = async (value) => {
        setLoading(true);
        try {

            const res = await fpApi.updateStatus(id, value)
            if (res.status) {
                toast.success(res.data.message);
                if (parseInt(value) === 2) { navigate('/admin/fps'); }
                //setStatusButton(value)
                onChangeStatus(value)
                setLoading(false);

            }
        } catch (error) {
            console.log('Error', error.message);
            setLoading(false);
        }
    }

    return (
        <>
            {loading ? <LoadingOverlay /> : ''}
            {permissions.includes(fpPermissions.FP_APPROVED_MANAGER) &&
                <>
                    {(parseInt(status) === parseInt(statusApproved.STATUS_NEW) || parseInt(status) === parseInt(statusApproved.STATUS_BACK)) && (
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
                                onClick={() => handleChangeStatus(7)}
                            >
                                Trả về
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
                    {parseInt(status) === parseInt(statusApproved.STATUS_PAKD) && (
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
                <>   {parseInt(status) === parseInt(statusApproved.STATUS_CONTRACT) && (
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
                    {parseInt(status) === parseInt(statusApproved.STATUS_SHIPPING) && (
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
                    {parseInt(status) === parseInt(statusApproved.STATUS_INVOICE) && (
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

