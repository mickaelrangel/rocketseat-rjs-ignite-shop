import { styled } from "../.."
import * as Dialog from '@radix-ui/react-dialog'

export const Overlay = styled(Dialog.Overlay, {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.75)',
    display: 'grid',
})

export const Content = styled(Dialog.Content, {
    minWidth: '32rem',
    width: 480,
    height: 'auto',
    borderRadius: 6,
    padding: '3rem',
    backgroundColor: '$gray800',

    overflow: 'auto',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    flexDirection: 'column',

    fontSize: '$lg',
})

export const CloseButton = styled(Dialog.Close, {
    position: 'absolute',
    background: 'transparent',
    border: 0,
    top: '1.5rem',
    right: '1.5rem',
    lineHeight: 0,
    cursor: 'pointer',
    color: '$gray300',
    marginBottom: '2.5rem'
})

export const Product = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    gap: '1.25rem',
    marginTop: '2rem'
})

export const ImageContainer = styled('div', {
    width: 102,
    height: 93,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    padding: '0.25rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

export const ProductDetails = styled('div', {
    display: 'flex',
    flexDirection: 'column',

    h4: {
        fontSize: '$md',
        fontWeight: 'normal',
    },

    span: {
        fontSize: '$md',
        fontWeight: 'bold',
        marginTop: '0.5rem',
    },

    button: {
        marginTop: '1.5rem',
        border: 0,
        backgroundColor: 'transparent',
        color: '$green300',
        textAlign: 'initial',
        cursor: 'pointer',
        fontSize: '$md',
        fontWeight: 'bold',

        '&:hover': {
            color: '$green500',
        }
    }
})

export const TotalQuantityProducts = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '$md',
    marginTop: '10rem'
})

export const Amount = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '$lg',
    marginTop: '1rem'
})

export const CheckoutButton = styled('button', {
    width: '100%',
    marginTop: '3.5rem',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    '&:not(:disabled):hover': {
        backgroundColor: '$green300',
    },

    '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed'
    }
})