import React, { useState, useEffect } from 'react';
import hinhAnh from './DJI_0001_W.JPG'; 

function ImageWithBoxes() {
  const [imageDimensions, setImageDimensions] = useState({ width: 1920, height: 1080 });

  const boxes = [
    { x: 1057, y: 507, width: 417, height: 389, class: 'person' },
    { x: 326, y: 708, width: 486, height: 188, class: 'tv' },
    { x: 836, y: 550, width: 89, height: 108, class: 'person' },
    { x: 782, y: 588, width: 114, height: 104, class: 'laptop' },
    { x: 1459, y: 605, width: 142, height: 289, class: 'chair' },
    { x: 1406, y: 596, width: 87, height: 277, class: 'chair' },
    { x: 378, y: 598, width: 107, height: 195, class: 'chair' },
    { x: 320, y: 609, width: 79, height: 207, class: 'chair' },
    { x: 764, y: 727, width: 168, height: 171, class: 'laptop' },
    { x: 1015, y: 582, width: 70, height: 88, class: 'chair' },
    { x: 984, y: 583, width: 112, height: 164, class: 'chair' },
    { x: 601, y: 559, width: 172, height: 117, class: 'tv' },
    { x: 1537, y: 622, width: 64, height: 78, class: 'chair' },
  ];

  useEffect(() => {
    const img = new Image();
    img.src = hinhAnh;
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <img src={hinhAnh} alt="Hình ảnh DJI_0001_W" style={{ width: '100%', height: 'auto' }} />
      {boxes.map((box, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: `${box.x / imageDimensions.width * 100}%`,
            top: `${box.y / imageDimensions.height * 100}%`,
            width: `${box.width / imageDimensions.width * 100}%`,
            height: `${box.height / imageDimensions.height * 100}%`,
            border: '2px solid red', 
          }}
        >
          <span style={{ 
            position: 'absolute', 
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'red',
            color: 'white',
            padding: '2px 5px',
            borderRadius: '5px',
            fontSize: '12px',
          }}>
            {box.class}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ImageWithBoxes;
