import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './ButtonGoToTop.css';

const GoToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // وظيفة التحكم في الظهور
    const toggleVisibility = () => {
        if (window.scrollY  > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // التمرير إلى الأعلى بسلاسة
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        // إضافة مستمع لحدث التمرير (scroll event)
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="scroll-to-top">
            {isVisible && (
                <button onClick={scrollToTop} className="go-to-top-button">
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            )}
        </div>
    );
}

export default GoToTopButton;
