import React, { useState } from "react";
import LinearProgressWithLabel from "./ProgressBar";
import { BasicButtonStyled } from "./SlytedComponent/Button";
import UploadIcon from '@mui/icons-material/Upload';
import uploadApi from "api/uploadAPI";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { WrapperBoxAlign } from "./SlytedComponent/Wrapper";
import { DeleteIconStyled } from "./SlytedComponent/Icon";
import { Box, Link } from "@mui/material";
import TextFormik from "components/FormElement/TextFormik";

const UploadMuitiFile = ({ control, name, setValue, isEdit, field, index, setError, errors }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    // const [file, setFile] = useState({ name: '', url: '' });

    React.useEffect(() => {
        if (isEdit) {
            if (field) {
                const filesInfo = JSON.parse(field)
                console.log(filesInfo)
                setUploadedFiles(filesInfo);
            }

        }
    }, [field, isEdit])

    const uploadFile = async (file, onUploadProgress) => {

        let formData = new FormData();
        formData.append("file_url", file);

        return await uploadApi.upload(formData, onUploadProgress);
    };

    const upload = (event) => {
        const chosenFiles = Array.prototype.slice.call(event.target.files);
        chosenFiles.forEach((item) => {
            let currentFile = item;
            setProgress(0);
            setCurrentFile(currentFile);

            uploadFile(currentFile, (event) => {
                setProgress(Math.round((100 * event.loaded) / event.total));
            })
                .then((response) => {
                    setMessage(response.data.message);
                    const rs = response.data;
                    const arr = uploadedFiles;
                    arr.push({
                        name: rs.data.name,
                        url: rs.data.file_url
                    })
                    setUploadedFiles([...arr]);
                    setCurrentFile(undefined);
                    setValue(name, JSON.stringify(uploadedFiles))

                })

                .catch(() => {
                    setProgress(0);
                    setMessage("Could not upload the file!");
                    setCurrentFile(undefined);
                });
        });


    };

    const handleDelete = (e, element) => {
        const arr = [...uploadedFiles];
        const index = arr.findIndex((item) => item.name === element)
        arr.splice(index, 1);
        setUploadedFiles([...arr]);
        setValue(name, JSON.stringify([...arr]))
    }

    return (
        <div>
            {currentFile && (
                <LinearProgressWithLabel value={progress} />
            )}

            <label htmlFor={"btn-upload-muitl-" + index}>
                <input
                    id={"btn-upload-muitl-" + index}
                    style={{ display: 'none' }}
                    type="file"
                    multiple
                    onChange={upload} />

                <TextFormik
                    control={control}

                    name={name}
                    style={{ display: 'none' }}

                />
                <BasicButtonStyled
                    className="btn-choose"
                    variant="outlined"
                    component="span" size="small">
                    <KeyboardDoubleArrowUpIcon fontSize="small" />
                </BasicButtonStyled>
            </label>
            <div>
                {uploadedFiles.length !== 0 && uploadedFiles.map((file, index) => {

                    return (<WrapperBoxAlign isborder={false} key={index}>
                        <Link href={process.env.REACT_APP_URL + file.url} target="_blank">{file.name}</Link>
                        <DeleteIconStyled onClick={(e) => handleDelete(e, file.name)} />
                    </WrapperBoxAlign>)
                })}

            </div>

            <div className="alert alert-light" role="alert">
                {message}
            </div>
            {errors?.[name] !== undefined ? <Box sx={{ color: '#d32f2f' }}>{errors?.[name].message}</Box> : ''}

        </div>
    );
};

export default UploadMuitiFile;