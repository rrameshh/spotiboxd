import React, { useState } from 'react';

interface StarsProps {
    selectedStar: number;
    setSelectedStar: (index: number) => void;
}

const Stars: React.FC<StarsProps> = ({ selectedStar, setSelectedStar }) => {
    const [hoveredStar, setHoveredStar] = useState<number>(0);

    const handleMouseOver = (index: number) => {
        setHoveredStar(index);
    };

    const handleMouseOut = () => {
        setHoveredStar(0);
    };

    const handleClick = (index: number) => {
        setSelectedStar(index);
        setHoveredStar(0);
    };

    return (
        <>
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
                    integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </head>
            <div style={{ display: 'inline-block' }}>
                {[...Array(5)].map((_, i) => (
                    <i
                        key={i}
                        className={`accent far fa-star display-4 ${i < selectedStar ? 'fas' : (i < hoveredStar ? 'fas' : 'far')}`}
                        onMouseOver={() => handleMouseOver(i + 1)}
                        onMouseOut={handleMouseOut}
                        onClick={() => handleClick(i + 1)}
                        style={{ display: 'inline-block' }}
                    />
                ))}
            </div>
        </>
    );
};

export default Stars;
