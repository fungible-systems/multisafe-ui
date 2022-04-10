import React, {useState} from 'react';
import {RouteComponentProps} from '@reach/router';

import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

import useUserSession from '../../hooks/use-user-session';
import useTranslation from '../../hooks/use-translation';

import AppContent from '../../layout/app-content';
import ThemedBox from '../../components/themed-box';
import SafeName from './components/safe-name';
import SafeOwners from './components/safe-owners';
import SafeConfirmations from './components/safe-confirmations';
import SafeReview from './components/safe-review';

const Create = (_: RouteComponentProps) => {
    const [, userData, openAuth, signOut] = useUserSession();
    const [t] = useTranslation();

    const [step, setStep] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [owners, setOwners] = useState<string[]>(['']);
    const [confirmations, setConfirmations] = useState<number>(1);

    return <>
        <AppContent>
            <Typography variant='h4' fontWeight='700' mt='10px' gutterBottom>{t('Create Safe')}</Typography>
            <Typography variant='h6' fontWeight='500'>{t('Create a safe with multiple owners.')}</Typography>
            <Stepper activeStep={step} orientation='vertical' sx={{mt: '40px'}}>
                <Step key={0}>
                    <StepLabel>{t('Safe Name')}</StepLabel>
                    <StepContent>
                        <ThemedBox sx={{maxWidth: '640px', p: '20px'}}>
                            <SafeName name={name} onSubmit={(name) => {
                                setName(name)
                                setStep(step + 1);
                            }}/>
                        </ThemedBox>
                    </StepContent>
                </Step>
                <Step key={1}>
                    <StepLabel>{t('Owners')}</StepLabel>
                    <StepContent>
                        <ThemedBox sx={{maxWidth: '640px', p: '20px'}}>
                        <SafeOwners
                            owners={owners}
                            onBack={(owners) => {
                                setOwners(owners);
                                setStep(step - 1);
                            }}
                            onSubmit={(owners) => {
                                setOwners(owners);
                                setStep(step + 1);
                            }}
                        />
                        </ThemedBox>
                    </StepContent>
                </Step>
                <Step key={3}>
                    <StepLabel>{t('Confirmation Threshold')}</StepLabel>
                    <StepContent>
                        <ThemedBox sx={{maxWidth: '640px', p: '20px'}}>
                        <SafeConfirmations
                            max={owners.length}
                            value={confirmations}
                            onBack={() => {
                                setStep(step - 1);
                            }}
                            onNext={() => {
                                setStep(step + 1);
                            }}
                            onChange={(value) => {
                                setConfirmations(value);
                            }}
                        />
                        </ThemedBox>
                    </StepContent>
                </Step>
                <Step key={4}>
                    <StepLabel>{t('Review')}</StepLabel>
                    <StepContent>
                        <ThemedBox sx={{maxWidth: '690px', p: '20px'}}>
                        <SafeReview
                            name={name}
                            owners={owners}
                            confirmations={confirmations}
                            onBack={() => {
                                setStep(step - 1);
                            }}
                            onNext={() => {
                            }}/>
                        </ThemedBox>
                    </StepContent>
                </Step>
            </Stepper>

        </AppContent>
    </>
}

export default Create;