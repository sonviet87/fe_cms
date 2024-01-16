import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import React from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import SalaryForm from '../components/SalaryForm';
import salaryApi from "../../../../api/salaryAPI";

function AdminSalaryAddEditPage() {

    const [loading, setLoading] = React.useState(false);
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [salary, setSalary] = React.useState({});

    const navigate = useNavigate();

    const initialValue = {
        level: '',
        salary: '',


    };

    React.useEffect(() => {

        if (!id) return;
        (async () => {
            setLoading(true);
            try {
                const res = await salaryApi.get(id);

                if (res.status) {
                    setSalary({
                        salary: res.data.data.salary,
                        level: res.data.data.level ?? '',


                    });

                } else {
                    toast.error(res.message);
                    navigate('/admin/salaries');
                }
            } catch (error) {
                console.log('get contact by id error', error);
            }
            setLoading(false);
        })();
    }, [id, navigate]);


    const handleFormSubmit = async (formValues) => {
        setLoading(true);
        try {
            let res;
            if (isEdit) {
                res = await salaryApi.update(id, formValues);
            } else {
                res = await salaryApi.add(formValues);
            }
            if (res.status) {
                console.log('res.message', res.message);
                if (res.data.status) {
                    toast.success(res.message);
                    navigate('/admin/salaries');
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

    return (
        <WrapperPage >
            {loading && (
                <LoadingOverlay />
            )}
            <TitleForm lable={isEdit ? "Cập nhật lương" : "Thêm lương"} />

            {(!isEdit || Boolean(salary)) && (
                <SalaryForm initialValue={initialValue} onSubmit={handleFormSubmit}  itemValue={salary} isEdit={isEdit} />
            )}

        </WrapperPage>
    );
}

export default AdminSalaryAddEditPage;
