import {
    Breakpoint,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
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

export interface ModalProps {
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
    maxWidth?: Breakpoint;
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
            maxWidth='lg'
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button
                    className={`${styles?.cancelButton} ${styles?.Button}`}
                    onClick={handleCancel}
                    disabled={cancelDisabled}
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
                    >
                        {confirmButtonText ?? 'Confirm'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
