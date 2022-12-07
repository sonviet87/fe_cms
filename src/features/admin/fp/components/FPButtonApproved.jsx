import { Button } from '@mui/material';
import fpApi from 'api/fpAPI';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const FPButtonApproved = ({ status }) => {
    const navigate = useNavigate();
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
        <>
            {(parseInt(statusButton) === 0 || parseInt(statusButton) === 7) && (
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
            {parseInt(statusButton) === 1 && (
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
            {parseInt(statusButton) === 3 && (
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
            {parseInt(statusButton) === 4 && (
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
            {parseInt(statusButton) === 5 && (
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
    );
}

