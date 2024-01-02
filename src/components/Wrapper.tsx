import React from 'react';

type WrapperProps = {
    children: React.ReactNode;
};

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
        <div className="w-lg mx-auto px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    );
};

export default Wrapper;
