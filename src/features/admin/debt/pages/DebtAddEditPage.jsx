import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import React from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';

import DebtForm from '../components/DebtForm';
import debtApi from 'api/debtAPI';
import fpApi from 'api/fpAPI';

function AdminDebtAddEditPage() {

    const [loading, setLoading] = React.useState(false);
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [debts, setDebts] = React.useState({});
    const [fp, setFP] = React.useState([]);

    const navigate = useNavigate();

    const initialValue = {
        name: '',
        fp_id: '',
        date_over: '',
        date_collection: '',
        pay_first: '',
        pay_second: '',
        deposit_percent: '',
        date_invoice: '',
        debt_percent: '',
        total_debt: 0,
        isDone: 2,
    };

    React.useEffect(() => {
        (async () => {
            try {
                const res = await fpApi.getList();

                if (res.status) {

                    let arrFP = [];
                    const fpRs = res.data.data;
                    console.log("arrFP", res)
                    fpRs.map((item) => {
                        return arrFP.push({ id: item.id, code: item.code })
                    })
                    setFP(arrFP);

                } else {
                    toast.error(res.message);
                }
            } catch (error) {
                console.log('get fp by id error', error);
            }
        })();
        if (!id) return;
        (async () => {
            setLoading(true);
            try {
                const res = await debtApi.get(id);

                if (res.status) {
                    console.log(res.data.data)
                    console.log(res.data.data.fp_id.id)
                    setDebts({
                        name: res.data.data.name ?? '',
                        fp_id: res.data.data.fp_id?? '',
                        date_over: res.data.data.date_over ?? '',
                        date_collection: res.data.data.date_collection ?? '',
                        number_date_over: res.data.data.number_date_over ?? '',
                        pay_first: res.data.data.pay_first ?? '',
                        pay_second: res.data.data.pay_second ?? '',
                        deposit_percent: res.data.data.deposit_percent ?? '',
                        debt_percent: res.data.data.debt_percent ?? '',
                        total_debt: res.data.data.total_debt ?? '',
                        date_invoice: res.data.data.fp_id?.date_invoice ?? '',
                        account: res.data.data.fp_id?.account ?? '',
                        number_invoice: res.data.data.fp_id?.number_invoice ?? '',
                        details: res.data.data.fp_id.details ?? [],
                        isDone: res.data.data.isDone ?? '',
                    });

                } else {
                    toast.error(res.message);
                    navigate('/admin/debts');
                }
            } catch (error) {
                console.log('get debts by id error', error);
            }
            setLoading(false);
        })();
    }, [id, navigate]);


    const handleFormSubmit = async (formValues) => {
        setLoading(true);
        try {
            let res;
            if (isEdit) {
                res = await debtApi.update(id, formValues);
            } else {
                res = await debtApi.add(formValues);
            }
            if (res.status) {
                console.log('res.message', res.message);
                if (res.data.status) {
                    toast.success(res.message);
                    navigate('/admin/debts');
                } else {
                    toast.error(res.data.message);
                }
            } else {
                toast.error(res.message);
            }

        } catch (error) {
            console.log('Error', error.message);
        }
        setLoading(false);
    };


    console.log(fp)
    return (
        <WrapperPage >
            {loading && (
                <LoadingOverlay />
            )}
            <TitleForm lable={isEdit ? "Cập nhật công nợ" : "Thêm công nợ"} />

            {(!isEdit || Boolean(debts)) && (
                <DebtForm initialValue={initialValue} onSubmit={handleFormSubmit} itemValue={debts} isEdit={isEdit} fp={fp} />
            )}

        </WrapperPage>
    );
}

export default AdminDebtAddEditPage;
