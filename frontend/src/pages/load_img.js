import React, { useState } from 'react';
import axios from 'axios';
import '../component/ImageForm.css';

function ImageForm() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);
    const [resultText, setResultText] = useState(null);
    const [objectCounts, setObjectCounts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setProcessedImage(URL.createObjectURL(event.target.files[0]));
        setResultText(null);
        setObjectCounts(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/yolo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setResultText(response.data.message);
            setObjectCounts(response.data.object_counts);

            const imageResponse = await axios.get('http://127.0.0.1:8000/api/yolo_image', {
                responseType: 'arraybuffer'
            });

            const base64 = btoa(
                new Uint8Array(imageResponse.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    '',
                ),
            );

            setProcessedImage(`data:${imageResponse.headers['content-type'].toLowerCase()};base64,${base64}`);
        } catch (error) {
            console.error('Error processing image:', error);
            setResultText('An error occurred while processing the image.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="image-form-container">
            <h2>Image Processing</h2>
            <form onSubmit={handleSubmit}>
                <div className="file-input-container">
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                        accept="image/*"
                        id="file-input"
                        className="file-input"
                    />
                    <label htmlFor="file-input" className="file-input-label">
                        Choose File
                    </label>
                    {selectedFile && <span className="file-name">{selectedFile.name}</span>}
                </div>
                <button type="submit" className="submit-button" disabled={!selectedFile || isLoading}>
                    {isLoading ? 'Processing...' : 'Submit'}
                </button>
            </form>
            {processedImage && (
                <div className="image-container">
                    <img src={processedImage} alt="Processed" className="processed-image" />
                </div>
            )}
            {resultText && <p className="result-text">{resultText}</p>}
            {objectCounts && (
                <div className="object-counts-container">
                    <h3>Object Counts</h3>
                    <ul className="object-counts-list">
                        {Object.entries(objectCounts).map(([object, count]) => (
                            <li key={object}>
                                <span className="object-name">{object}:</span>
                                <span className="object-count">{count}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ImageForm;