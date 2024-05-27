import React from 'react';

const Stub: React.FC<{pageName: string}> = ({pageName}) => (
    <div className='page'>
        <h3>Stub of {pageName}</h3>
    </div>
);

export default Stub;
