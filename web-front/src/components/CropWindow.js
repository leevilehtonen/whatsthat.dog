import React, { useState } from 'react'
import ReactCrop from "react-image-crop";

const getDefaultCanvas = (image) => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, image.width, image.height)
    return canvas;
}

const CropWindow = ({ src, setCanvas }) => {
    const [crop, setCrop] = useState({})
    const [imageRef, setImageRef] = useState(null)


    const onImageLoaded = (image) => {
        setImageRef(image)
        setCanvas(getDefaultCanvas(image))
    };

    const onCropComplete = crop => {
        makeClientCrop(crop);
    };

    const onCropChange = newCrop => {
        setCrop(newCrop);
    };

    const makeClientCrop = async (crop) => {
        if (imageRef && crop.width && crop.height) {
            const croppedCanvas = getCroppedCanvas(imageRef, crop);
            setCanvas(croppedCanvas);
        }
    }

    const getCroppedCanvas = (image, crop) => {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        )
        return canvas;
    }



    return (
        <div className="cropwindow">
            {src && <ReactCrop src={src} crop={crop} onChange={onCropChange} onImageLoaded={onImageLoaded}
                onComplete={onCropComplete} />}
        </div>
    )
}

export default CropWindow;