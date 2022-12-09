import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import React from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import CategoryForm from '../components/CategoryForm';
import categoryAPi from 'api/categoryAPI';


function AdminCategoryAddEditPage() {

    const [loading, setLoading] = React.useState(false);
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [category, setCategory] = React.useState({});

    const navigate = useNavigate();

    const initialValue = {
        name: '',
        descriptions: '',
        tax_percent: '',

    };

    React.useEffect(() => {

        if (!id) return;
        (async () => {
            setLoading(true);
            try {
                const res = await categoryAPi.get(id);
                if (res.status) {
                    setCategory({
                        name: res.data.data.name,
                        descriptions: res.data.data.descriptions,
                        tax_percent: res.data.data.tax_percent,


                    });

                } else {
                    toast.error(res.message);
                    navigate('/admin/');
                }
            } catch (error) {
                console.log('get category by id error', error);
            }
            setLoading(false);
        })();
    }, [id, navigate]);


    const handleFormSubmit = async (formValues) => {
        setLoading(true);
        try {
            let res;
            if (isEdit) {
                res = await categoryAPi.update(id, formValues);
            } else {
                res = await categoryAPi.add(formValues);
            }
            if (res.status) {

                if (res.data.status) {
                    toast.success(res.message);
                    navigate('/admin/category');
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
            <TitleForm lable={isEdit ? "Cập nhật danh mục" : "Thêm danh mục "} />

            {(!isEdit || Boolean(category)) && (
                <CategoryForm initialValue={initialValue} onSubmit={handleFormSubmit} itemValue={category} isEdit={isEdit} />
            )}

        </WrapperPage>
    );
}

export default AdminCategoryAddEditPage;
