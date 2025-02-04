import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import React from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import TechnicalReviewForm from "../components/TechnicalReviewForm";
import technicalReviewtAPI from "../../../../api/technicalReviewtAPI";

function TechnicalReviewAddEditPage() {

    const [loading, setLoading] = React.useState(false);
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [item, setItem] = React.useState({});

    const navigate = useNavigate();

    const initialValue = {
        name: '',
        start_date: '',
        user_id: '',
        points: '',
        data: {
            name: '',
            reviews: '',
            points: '',
            notes: '',

        }

    };

    React.useEffect(() => {

        if (!id) return;
        (async () => {
            setLoading(true);
            try {
                const res = await technicalReviewtAPI.get(id);

                if (res.status) {
                    setItem({
                        name: res.data.data.name ?? '',
                        start_date: res.data.data.start_date?? '',
                        user_id: res.data.data.user_id ?? '',
                        points: res.data.data.points ?? '',
                        data: res.data.data.data ?? '',

                    });

                } else {
                    toast.error(res.message);
                    navigate('/admin/kpi-technical/technical-review');
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
                res = await technicalReviewtAPI.update(id, formValues);
            } else {
                res = await technicalReviewtAPI.add(formValues);
            }
            if (res.status) {
                console.log('res.message', res.message);
                if (res.data.status) {
                    toast.success(res.message);
                    navigate('/admin/kpi-technical/technical-review');
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
            <TitleForm lable={isEdit ? "Cập nhật đánh giá" : "Thêm đánh giá"} />

            {(!isEdit || Boolean(item)) && (
                <TechnicalReviewForm initialValue={initialValue} onSubmit={handleFormSubmit} itemValue={item} isEdit={isEdit}/>
            )}

        </WrapperPage>
    );
}

export default TechnicalReviewAddEditPage;
