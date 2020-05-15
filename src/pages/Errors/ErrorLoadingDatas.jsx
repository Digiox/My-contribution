import React, { useEffect } from 'react';
import { Title } from "../../atoms/index"

const ErrorLoadingDatas = ({ onLoaded }) => {
    useEffect(() => {
        onLoaded()
    })
    return (
            <Title>
                Nous avons rencontrés des problèmes lors de la collecte de vos données
            </Title>
    );
}

export default ErrorLoadingDatas;