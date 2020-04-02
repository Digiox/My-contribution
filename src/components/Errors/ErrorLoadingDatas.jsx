import React, { useEffect } from 'react';

const ErrorLoadingDatas = ({ onLoaded }) => {
    useEffect(() => {
        onLoaded()
    })
    return (
        <div>
            <h2>Nous avons rencontrés des problèmes lors de la collecte de vos données</h2>
        </div>
    );
}

export default ErrorLoadingDatas;