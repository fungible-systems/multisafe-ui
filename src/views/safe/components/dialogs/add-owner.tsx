import React, {useRef, useState} from 'react';
import {contractPrincipalCV, noneCV, someCV, standardPrincipalCV, validateStacksAddress} from '@stacks/transactions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {useConnect} from '@stacks/connect-react';
import {DEPLOYER} from '@trustmachines/multisafe-contracts';

import useTranslation from '../../../../hooks/use-translation';
import useModal from '../../../../hooks/use-modal';
import useSafe from '../../../../hooks/use-safe';
import useNetwork from '../../../../hooks/use-network';
import WalletField from '../../../../components/wallet-field';
import CloseModal from '../../../../components/close-modal';

const AddOwner = () => {
    const [safe,] = useSafe();
    const [t] = useTranslation();
    const [, showModal] = useModal();
    const [network, stacksNetwork] = useNetwork();
    const {doContractCall} = useConnect();
    const inputRef = useRef<HTMLInputElement>();
    const [owner, setOwner] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleClose = () => {
        showModal(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOwner(e.target.value);
        setSubmitted(false);
    }

    const isValid = validateStacksAddress(owner);
    let error = '';
    if (submitted && !isValid) {
        error = t('Enter a valid Stacks wallet address');
    } else if (safe.owners.includes(owner)) {
        error = t('This address is already in owner list')
    }

    const handleSave = () => {
        setSubmitted(true);

        if (!isValid || error) {
            inputRef.current?.focus();
            return;
        }

        doContractCall({
            network: stacksNetwork,
            contractAddress: safe.address,
            contractName: safe.name,
            functionName: 'submit',
            functionArgs: [
                contractPrincipalCV(DEPLOYER[network], 'add-owner'),
                contractPrincipalCV(safe.address, safe.name),
                contractPrincipalCV(DEPLOYER[network], 'ft-none'),
                contractPrincipalCV(DEPLOYER[network], 'nft-none'),
                someCV(standardPrincipalCV(owner)),
                noneCV(),
                noneCV(),
            ],
            onFinish: (data) => {
                console.log(data)
            }
        }).then()
    }

    const dialogBody = <>
        <WalletField
            inputProps={{
                inputRef,
                value: owner,
                label: t('Owner address'),
                placeholder: t('Owner address'),
                autoFocus: true,
                onChange: handleChange,
                error: !!error,
                helperText: error || ' ',
                onKeyDown: (e) => {
                    if (e.key === 'Enter') {
                        handleSave();
                    }
                }
            }}
            onBnsResolve={(name) => {
                setOwner(name);
            }}
            isValid={isValid}
        />
    </>;

    const dialogActions = <>
        <Button onClick={handleClose}>{t('Cancel')}</Button>
        <Button onClick={handleSave}>{t('Add')}</Button>
    </>;

    return (
        <>
            <DialogTitle>{t(`Add Owner`)}
                <CloseModal onClick={handleClose}/>
            </DialogTitle>
            <DialogContent>
                <Box sx={{pt: '10px'}}>{dialogBody}</Box>
            </DialogContent>
            <DialogActions>{dialogActions}</DialogActions>
        </>
    );
}

export default AddOwner;