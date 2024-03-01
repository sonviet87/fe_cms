import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import ChanceHeaderPage from "../components/ChanceHeaderPage";
import ChanceForm from "../components/ChanceForm";
import accountApi from "../../../../api/accountAPI";
import {useParams} from "react-router";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import chanceApi from "../../../../api/chanceAPI";


function ChanceAddEditPage() {
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const initialValue = {
        name: '',
        account_id: '',
        contact_id: '',
        user_assign: '',
        prices: '',
        progress: '',
        start_day: '',
        files: ''
    }
    const validationRules = {}
    const schema = yup.object().shape(validationRules );
    const [contacts, setContacts] = React.useState([]);
    const methods = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [disabled, setDisable] = React.useState(false);
    const [chance, setChance] = React.useState({});
    const handleFormSubmit = async (formValues) => {
        setLoading(true);
        try {
            let res;
            if (isEdit) {
                res = await chanceApi.update(id, formValues);
            } else {

                res = await chanceApi.add(formValues);
            }
            if (res.status) {
                if (res.data.status) {
                    toast.success(res.message);
                    navigate('/admin/chances');
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
    }

    const handleCallAPIContact = async (formValues) => {
        const contactRs = await accountApi.getContactByIDAccount(formValues);
        if (contactRs.status) {
            setContacts(contactRs.data.data);
        }
    };


    React.useEffect(() => {
        if (!id) return;
        (async () => {
            setLoading(true);
            try {

                const chanceRs = await chanceApi.get(id);
                if (chanceRs.status) {
                    setChance(chanceRs.data.data);

                    let contactRs = await accountApi.getContactByIDAccount(chanceRs.data.data.account_id.id);
                    if (contactRs.status) {
                        setContacts(contactRs.data.data);
                    }
                } else {
                    toast.error(chanceRs.message);
                    navigate('/admin/chances');
                }
            } catch (error) {
                console.log('get chances by id error', error);
            }
            setLoading(false);
        })();

    }, [id, navigate]);
    return (
        <WrapperPage>
            <FormProvider {...methods}>
                <ChanceHeaderPage  isEdit={isEdit} id={id} chance={chance} initialValue={initialValue} onSubmit={handleFormSubmit}/>
                <ChanceForm initialValue={initialValue}
                            onSubmit={handleFormSubmit}
                            onCallContactAPi={handleCallAPIContact}
                            itemValue={chance}
                            contactValue={contacts}
                            isEdit={isEdit}
                            disabled={disabled}
                            methods={methods} />
            </FormProvider>
        </WrapperPage>
    );
}

export default ChanceAddEditPage;