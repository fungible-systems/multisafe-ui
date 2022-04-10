import {useState, useEffect} from 'react';

import useAddress from './use-address';
import useNetwork from './use-network';
import {getBnsName} from '../api';

const useBnsName = (): string | null => {
    const [name, setName] = useState<string | null>(null);
    const address = useAddress();
    const [network, stacksNetwork] = useNetwork()

    useEffect(() => {
        setName(null);
        if (!address) {
            return;
        }

        getBnsName(stacksNetwork, address).then((r)=>{
            if(r){
                setName(r);
            }
        })
    }, [address, network, stacksNetwork])

    return name;
}

export default useBnsName;