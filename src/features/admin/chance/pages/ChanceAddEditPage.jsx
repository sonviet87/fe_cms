import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import ChanceHeaderPage from "../components/ChanceHeaderPage";
import ChanceForm from "../components/ChanceForm";
import accountApi from "../../../../api/accountAPI";
import {useParams} from "react-router";


function ChanceAddEditPage() {
    const initialValue = {
        name: '',
        account_id: '',
        contact_id: '',
        user_assign: '',
        prices: '',
        progress: '',
        start_day: ''
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

    }

    const handleCallAPIContact = async (formValues) => {
        const contactRs = await accountApi.getContactByIDAccount(formValues);
        if (contactRs.status) {
            setContacts(contactRs.data.data);
        }
    };
    return (
        <WrapperPage>
            <FormProvider {...methods}>
                <ChanceHeaderPage />
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