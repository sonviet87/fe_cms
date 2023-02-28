import React, { useState } from "react";
import LinearProgressWithLabel from "./ProgressBar";
import { BasicButtonStyled } from "./SlytedComponent/Button";
import UploadIcon from '@mui/icons-material/Upload';
import uploadApi from "api/uploadAPI";
import { WrapperBoxAlign } from "./SlytedComponent/Wrapper";
import { DeleteIconStyled } from "./SlytedComponent/Icon";
import { Box, Link } from "@mui/material";
import TextFormik from "components/FormElement/TextFormik";

const UploadFile = ({ control, name, setValue, isEdit, field, index, setError, errors }) => {
    //const [isLoading, setLoading] = useState(false);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState({ name: '', url: '' });
    const arrName = name.split(".");

    React.useEffect(() => {

        if (isEdit) {
            setFile({ name: field.file, url: field.file_url });
            // setLoading(true)
        }
    }, [])

    const uploadFile = (file, onUploadProgress) => {

        let formData = new FormData();
        formData.append("file_url", file);

        return uploadApi.upload(formData, onUploadProgress);
    };

    const upload = (event) => {
        // setLoading(true)
        let currentFile = event.target.files[0];

        setProgress(0);
        setCurrentFile(currentFile);

        uploadFile(currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {
                setMessage(response.data.message);
                const rs = response.data;
                setFile({
                    name: rs.data.name,
                    url: rs.data.file_url
                });
                setCurrentFile(undefined);
                setValue(name, rs.data.name)
                setValue(name + "_url", rs.data.file_url)
                if (setError) setError(name, { type: "custom", message: "" })
                //setLoading(false);
            })

            .catch((e) => {
                console.log(e)
                setProgress(0);
                setMessage("Could not upload the file!");
                setCurrentFile(undefined);
            });

    };

    const handleDelete = () => {
        //setLoading(false);
        setFile({ name: '', url: '' });
        setValue(name, '');
        setValue(name + "_url", '')
    }

    return (
        <div>
            {currentFile && (
                <LinearProgressWithLabel value={progress} />
            )}

            {file.name === '' && <label htmlFor={"btn-upload" + index}>
                <input
                    id={"btn-upload" + index}
                    style={{ display: 'none' }}
                    type="file"
                    onChange={upload} />
                <TextFormik
                    control={control}

                    name={name + "_url"}
                    style={{ display: 'none' }}

                />
                <TextFormik
                    control={control}

                    name={name}
                    style={{ display: 'none' }}

                />
                <BasicButtonStyled
                    className="btn-choose"
                    variant="outlined"
                    component="span" size="small">
                    <UploadIcon />
                </BasicButtonStyled>
            </label>}
            <div>
                {file.name !== '' && (
                    <WrapperBoxAlign isborder={false}>
                        <Link href={process.env.REACT_APP_URL + file.url} target="_blank">{file.name}</Link>
                        <DeleteIconStyled onClick={handleDelete} />
                    </WrapperBoxAlign>
                )}

            </div>

            <div className="alert alert-light" role="alert">
                {message}

            </div>

            {errors?.[name] !== undefined ? <Box sx={{ color: '#d32f2f' }}>{errors?.[name].message}</Box> : ''}
            {errors.hasOwnProperty('details') ? (errors?.details[index]?.[arrName[1]] !== undefined ? <Box sx={{ color: '#d32f2f' }}>{errors?.details[index]?.[arrName[1]].message}</Box> : '') : ''}


        </div>
    );
};

export default UploadFile;