'use client';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
} from '@mui/material';

export interface ModalStyles {
    cancelButton?: string;
    confirmButton?: string;
    Button?: string;
    Dialog?: string;
    DialogTitle?: string;
    DialogContent?: string;
    DialogActions?: string;
}

export interface ModalProps extends Omit<DialogProps, 'open'> {
    title: string;
    isOpen: boolean;
    cancelDisabled?: boolean;
    confirmDisabled?: boolean;
    setIsOpen: (isOpen: boolean) => void;
    formId?: string;
    onCancel?: () => void;
    onConfirm?: () => void;
    cancelButtonText?: string;
    confirmButtonText?: string;
    removeConfirmButton?: boolean;
    styles?: ModalStyles;
    children: React.ReactNode;
}

const Modal = ({
    title,
    isOpen,
    cancelDisabled,
    confirmDisabled,
    setIsOpen,
    formId,
    onCancel = () => {},
    onConfirm = () => {},
    cancelButtonText,
    confirmButtonText,
    removeConfirmButton = false,
    styles,
    children,
    ...dialogProps
}: ModalProps) => {
    const close = () => setIsOpen(false);

    const handleCancel = () => {
        onCancel();
        close();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={close}
            className={styles?.Dialog ?? ''}
            maxWidth={dialogProps.maxWidth ?? 'md'}
            {...dialogProps}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button
                    className={`${styles?.cancelButton} ${styles?.Button}`}
                    onClick={handleCancel}
                    disabled={cancelDisabled}
                    size='large'
                >
                    {cancelButtonText ?? 'Cancel'}
                </Button>
                {!removeConfirmButton && (
                    <Button
                        className={`${styles?.confirmButton} ${styles?.Button}`}
                        form={formId}
                        type={formId ? 'submit' : 'button'}
                        onClick={() => onConfirm()}
                        disabled={confirmDisabled}
                        size='large'
                    >
                        {confirmButtonText ?? 'Confirm'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
