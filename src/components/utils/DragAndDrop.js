import React, {useState, useRef} from 'react';
import {useDropzone} from 'react-dropzone';
import {MdClose, MdCheck} from "react-icons/md"
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'
import IconButton from '../styles/IconButton'
import {DragZoneContainer, CropperContainer, CropResult} from '../styles/DragAndDrop'


function DragAndDrop({
    cropResult, 
    handleAcceptImage, 
    handleRemoveImage, 
    file, 
    setFile, 
    config,
    profile
}) {
    const [preview, setPreview] = useState(null)
    const cropper = useRef();

    const maxSize = 5000000 //5MB
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        rejectedFiles} = useDropzone({
            accept: 'image/jpeg, image/jpg, image/png',
            maxSize,
            multiple: false,
            onDropAccepted: acceptedFiles => {
                console.log(acceptedFiles)
                setFile(acceptedFiles[0])
                setPreview(URL.createObjectURL(acceptedFiles[0]))
            }  
        });
    const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

    return (
        <div>
        {!file && !cropResult &&
            <DragZoneContainer {...getRootProps()} active={isDragActive} accepted={isDragAccept} rejected={isDragReject}>
                <input {...getInputProps()}/>
                {isFileTooLarge && !isDragActive && <p>File is too large, maximum size is 5MB</p>}
                {isDragReject && <p>File type not accepted, sorry!</p>}
                {!isDragActive && !file && !isFileTooLarge && <p>Drag and drop image here, or click to select a file</p>}
                {isDragActive && !isDragReject && <p>Drop your image here</p>}
            </DragZoneContainer>
        }
        {preview && file && !cropResult &&
            <CropperContainer profile={!!profile} aspect={config.aspect}>
                <Cropper
                    ref={cropper}
                    src={preview}
                    style={{height: config.height, width: config.width}}
                    // Cropper.js options
                    dragMode='move'
                    zoomable={false}
                    aspectRatio={config.aspect}
                    viewMode={2}
                    responsive={true}
                    guides={false} 
                    preview='.img-preview'
                />
                <div>
                    <div 
                        className="img-preview" 
                        style={{ width: config.previewWidth, height: config.previewHeight}} >
                    </div>
                    <div>
                        <IconButton 
                            onClick={() =>handleAcceptImage(cropper.current)} 
                            circle size={'40px'} margin={'0 0 0 5px'}>
                                <MdCheck size={30}/>
                        </IconButton>
                        <IconButton 
                            onClick={handleRemoveImage} 
                            circle size={'40px'} margin={'0 0 0 5px'}>
                                <MdClose size={30}/>
                        </IconButton>
                    </div>
                </div>
            </CropperContainer>
        }
        {cropResult &&
            <CropResult>
                <div style={{width: config.previewWidth, height: config.previewHeight}}>
                    <img
                    src={cropResult}
                    alt=''/>
                </div>
                <IconButton onClick={handleRemoveImage} circle size={'40px'} margin={'0 0 0 5px'}>
                    <MdClose size={30}/>
                </IconButton>
            </CropResult>
        }
        </div>
    );
}

export default DragAndDrop