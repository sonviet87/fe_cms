import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import React from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';

import DebtForm from '../components/DebtSupplierForm';
import fpApi from 'api/fpAPI';
import debtSupplierApi from 'api/debtSupplierAPI';
import supplierApi from 'api/suppliertAPI';

function AdminDebtSupplierAddEditPage() {

    const [loading, setLoading] = React.useState(false);
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [debts, setDebts] = React.useState({});
    const [fp, setFP] = React.useState({});
    const [supplier, setSupplier] = React.useState([]);

    const navigate = useNavigate();

    const initialValue = {
        name: '',
        fp_id: '',
        date_over: '',
        pay_first: '',
        pay_second: '',
        deposit_percent: '',
        date_invoice: '',
        debt_percent: '',
        total_debt: 0,
        isDone: 1,
        supplier_id: ''
    };

    React.useEffect(() => {
        (async () => {
            try {
                const res = await fpApi.getList();
                if (res.status) {

                    let arrFP = [];
                    const fpRs = res.data.data;
                    // console.log("arrFP", res)
                    fpRs.map((item) => {
                        return arrFP.push({ id: item.id, name: item.code })
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

                const [supplierRs, res] = await Promise.all([
                    supplierApi.getlist(),
                    debtSupplierApi.get(id),

                ]);
                if (supplierRs.status) {

                    setSupplier(supplierRs.data.data)
                }
                if (res.status) {
                    console.log(res.data.data)
                    setDebts({
                        name: res.data.data.name ?? '',
                        fp_id: res.data.data.fp_id.id ?? '',
                        supplier_id: res.data.data.supplier_id ?? '',
                        date_over: res.data.data.date_over ?? '',
                        number_date_over: res.data.data.number_date_over ?? '',
                        pay_first: res.data.data.pay_first ?? '',
                        pay_second: res.data.data.pay_second ?? '',
                        deposit_percent: res.data.data.deposit_percent ?? '',
                        debt_percent: res.data.data.debt_percent ?? '',
                        total_debt: res.data.data.total_debt ?? '',
                        date_invoice: res.data.data.fp_id?.date_invoice ?? '',

                        // number_invoice: res.data.data.fp_id?.number_invoice ?? '',
                        details: res.data.data.fp_id.details ? res.data.data.fp_id.details.filter((item) => {
                            if (item.supplier_id === res.data.data.supplier_id) return item;
                        }) : [],
                        isDone: res.data.data.isDone ?? '',
                    });


                } else {
                    toast.error(res.message);
                    navigate('/admin/debts-supplier');
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
                res = await debtSupplierApi.update(id, formValues);
            } else {
                res = await debtSupplierApi.add(formValues);
            }
            if (res.status) {
                console.log('res.message', res.message);
                if (res.data.status) {
                    toast.success(res.message);
                    navigate('/admin/debts-supplier');
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


    const handleCallAPISupplier = async (formValues) => {
        setLoading(true);

        try {
            const supplierRs = await debtSupplierApi.getListSupplierByFP(formValues);
            if (supplierRs.status) {
                setSupplier(supplierRs.data.data)
            }
        } catch (error) {
            console.log('Error', error.message);
        }
        setLoading(false);

    };


    return (
        <WrapperPage >
            {loading && (
                <LoadingOverlay />
            )}
            <TitleForm lable={isEdit ? "Cập nhật công nợ nhà cung cấp" : "Thêm công nợ nhà cung cấp"} />

            {(!isEdit || Boolean(debts)) && (
                <DebtForm initialValue={initialValue} onSubmit={handleFormSubmit} itemValue={debts} isEdit={isEdit} fp={fp} onCallAPISupplier={handleCallAPISupplier} supplierValue={supplier} />
            )}

        </WrapperPage>
    );
}

export default AdminDebtSupplierAddEditPage;
