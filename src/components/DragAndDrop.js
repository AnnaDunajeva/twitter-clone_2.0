import React, {useState, useMemo, useRef} from 'react';
import {useDropzone} from 'react-dropzone';
import {MdClose, MdCheck} from "react-icons/md"
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#bfb6b8',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };


  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };

const thumbsContainer = {
  display: 'flex',
  justifyContent: 'center',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  width: 130,
  height: 130,
  padding: 4,
};

const thumbInner = {
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const text = {
    margin: '20px'
}
const resultContainer = {
    display: 'flex',
    // justifyContent: 'center'
}
const removeBtn = {
    fontSize: '40px',
    marginLeft: '5px',
    padding: '5px'
}


function DragAndDrop({cropResult, handleAcceptImage, handleRemoveImage, file, setFile, config}) {
    const [preview, setPreview] = useState(null)
    const cropper = useRef();

    const maxSize = 1000000 //10MB for now
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
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    return (
        <div>
        {!file && !cropResult &&
            <div {...getRootProps({style})} className='clickable'>
                <input {...getInputProps()}/>
                {isFileTooLarge && !isDragActive && <p style={text}>File is too large.</p>}
                {isDragReject && <p style={text}>File type not accepted, sorry!</p>}
                {!isDragActive && !file && <p style={text}>Drag and drop image here, or click to select a file</p>}
                {isDragActive && !isDragReject && <p style={text}>Drop your image here</p>}
            </div>
        }
        {preview && file && !cropResult &&
            <React.Fragment>
                <div style={resultContainer}>
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
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <MdCheck style={removeBtn} className='clickable hover-blue hover-blue-circle-background' onClick={() =>handleAcceptImage(cropper.current)}/>
                        <MdClose style={removeBtn} className='clickable hover-blue hover-blue-circle-background' onClick={handleRemoveImage}/>
                    </div>
                </div>
                <div >
                    <div className="img-preview" style={{ width: config.previewWidth, height: config.previewHeight, overflow: 'hidden', marginTop: '3px' }} />
                </div>
            </React.Fragment>
        }
        {cropResult &&
            <div style={resultContainer}>
                <div style={{...thumbsContainer, width: config.previewWidth, height: config.previewHeight}}>
                    <div style={thumbInner}>
                        <img
                        src={cropResult}
                        style={img}
                        alt=''
                        />
                    </div>
                </div>
                <MdClose style={removeBtn} className='clickable hover-blue hover-blue-circle-background' onClick={handleRemoveImage}/>
            </div>
        }
        </div>
    );
}

export default DragAndDrop