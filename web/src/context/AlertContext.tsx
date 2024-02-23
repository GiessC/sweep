import type { Severity } from '@/models/alerts/IAlert';
import type IAlert from '@/models/alerts/IAlert';
import TimedQueue from '@/models/queue/TimedQueue';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BsExclamationCircle as ErrorIcon } from 'react-icons/bs';
import { BsExclamationTriangle as WarningIcon } from 'react-icons/bs';
import { BsCheck2Circle as SuccessIcon } from 'react-icons/bs';
import { BsInfoCircle as InfoIcon } from 'react-icons/bs';

const ALERT_TIME_SECONDS = 5;

interface IAlertContext {
    addAlert: (message: string, severity: Severity) => void;
    removeAlert: (id: string) => void;
}

export const AlertContext = createContext<IAlertContext>({
    addAlert: () => {},
    removeAlert: () => {},
});

export interface AlertProviderProps {
    children: JSX.Element;
}

const AlertProvider = ({ children }: AlertProviderProps) => {
    const [alerts, setAlerts] = useState<TimedQueue<IAlert>>(
        new TimedQueue<IAlert>(ALERT_TIME_SECONDS),
    );

    const addAlert = (
        message: string,
        severity: Severity,
        icon?: JSX.Element,
    ) => {
        const newAlert: IAlert = {
            id: uuidv4(),
            message,
            severity,
            icon,
            open: true,
        };
        setAlerts((prevAlerts: TimedQueue<IAlert>) => {
            prevAlerts.enqueue(newAlert);

            return prevAlerts;
        });
    };

    const removeAlert = () => {
        setAlerts((prevAlerts: TimedQueue<IAlert>) => {
            prevAlerts.dequeue();

            return prevAlerts;
        });
    };

    const getDefaultIcon = (alertSeverity: Severity) => {
        if (alertSeverity === 'error') {
            return <ErrorIcon />;
        }
        if (alertSeverity === 'info') {
            return <InfoIcon />;
        }
        if (alertSeverity === 'success') {
            return <SuccessIcon />;
        }
        return <WarningIcon />;
    };

    return (
        <AlertContext.Provider value={{ addAlert, removeAlert }}>
            {children}
            {alerts.toArray().map((alert: IAlert) => (
                <Snackbar
                    key={alert.id}
                    open={alert.open}
                    onClose={() => (alert.open = false)}
                >
                    <Alert
                        severity={alert.severity}
                        onClose={() => (alert.open = false)}
                        variant='filled'
                        icon={alert.icon ?? getDefaultIcon(alert.severity)}
                    >
                        {alert.message}
                    </Alert>
                </Snackbar>
            ))}
        </AlertContext.Provider>
    );
};

export default AlertProvider;
