import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';

export interface ModalStyles {
    cancelButton?: string;
    confirmButton?: string;
}

export interface ModalProps {
    title: string;
    isOpen: boolean;
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
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button
                    className={styles?.confirmButton}
                    onClick={handleCancel}
                >
                    {cancelButtonText ?? 'Cancel'}
                </Button>
                {!removeConfirmButton && (
                    <Button
                        className={styles?.confirmButton}
                        form={formId}
                        type={formId ? 'submit' : 'button'}
                        onClick={() => onConfirm()}
                    >
                        {confirmButtonText ?? 'Confirm'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
