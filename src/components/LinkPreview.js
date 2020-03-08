// import React, { useEffect } from 'react'
// import linkPreviewGenerator from 'link-preview-generator'

// const LinkPreview = ({link}) => {
//     const linkData = useRef()
//     useEffect(() => {
//         const getLinkData = async() => {
//             const data = await linkPreviewGenerator(link)
//             linkData.current = data
//         }
//         getLinkData()
//     }, [link])

//     return (
//         <div>
//             <img src={linkData.current.img}/>
//             <p>{linkData.current.title}</p>
//             <p>{linkData.current.description}</p>
//             <p>{linkData.current.domain}</p>
//         </div>
//     )
// }

// export default LinkPreview