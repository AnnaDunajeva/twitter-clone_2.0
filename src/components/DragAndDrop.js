import React, {useState, useMemo, useRef} from 'react';
import {useDropzone} from 'react-dropzone';
import {MdClose, MdCheck} from "react-icons/md"
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'

// const dropContainer = {
//     display: 'flex',
//     margin: '10px 10px 0'
// }
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


function DragAndDrop(props) {
    const [preview, setPreview] = useState(null)
    const cropper = useRef();
    const [cropResult, setCropResult] = useState(null)

    const maxSize = 1000000 //10MB for now
    const file = props.file
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
                props.setFile(acceptedFiles[0])
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

    const handleRemove = (e) => {
        e.preventDefault() 
        props.setFile(null)
        setPreview(null)
        setCropResult(null)
    }
    const handleAccept = () => {
        const crop = cropper.current.cropper.getData()
        props.setCrop(crop)
        setCropResult(cropper.current.getCroppedCanvas().toDataURL())
    }

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
        {preview && !cropResult &&
            <React.Fragment>
                <div style={resultContainer}>
                    <Cropper
                        ref={cropper}
                        src={preview}
                        style={{height: props.config.height, maxWidth: props.config.width}}
                        // Cropper.js options
                        dragMode='move'
                        zoomable={false}
                        aspectRatio={props.config.aspect}
                        viewMode={2}
                        responsive={true}
                        guides={false} 
                        preview='.img-preview'
                    />
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <MdCheck style={removeBtn} className='clickable hover-blue hover-blue-circle-background' onClick={handleAccept}/>
                        <MdClose style={removeBtn} className='clickable hover-blue hover-blue-circle-background' onClick={handleRemove}/>
                    </div>
                </div>
                <div >
                    <div className="img-preview" style={{ width: props.config.previewWidth, height: props.config.previewHeight, overflow: 'hidden', marginTop: '3px' }} />
                </div>
            </React.Fragment>
        }
        {cropResult &&
            <div style={resultContainer}>
                <div style={{...thumbsContainer, width: props.config.previewWidth, height: props.config.previewHeight}}>
                    <div style={thumbInner}>
                        <img
                        src={cropResult}
                        style={img}
                        alt=''
                        />
                    </div>
                </div>
                <MdClose style={removeBtn} className='clickable hover-blue hover-blue-circle-background' onClick={handleRemove}/>
            </div>
        }
        {/* {preview &&
            <div style={resultContainer}>
                <div style={thumbsContainer}>
                    <div style={thumbInner}>
                        <img
                        src={preview}
                        style={img}
                        alt=''
                        />
                    </div>
                </div>
                <MdClose style={removeBtn} className='clickable hover-blue hover-blue-circle-background' onClick={handleRemove}/>
            </div>
        } */}
        </div>
    );
}

export default DragAndDrop