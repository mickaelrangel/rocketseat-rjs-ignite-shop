import { styled } from "../.."

export const Header = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
})

export const HandbagButton = styled('button', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$gray800',
    padding: '0.75rem',
    borderRadius: 6,
    width: '3rem',
    height: '3rem',
    color: '$white',
    cursor: 'pointer',

    span: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        position: 'absolute',
        marginTop: '-2.5rem',
        marginLeft: '2rem',
        width: '1.25rem',
        height: '1.25rem',
        border: 0,
        borderRadius: '50%',

        fontSize: '0.75rem',

        backgroundColor: '$green300',
        color: 'white'
    },

    '&:hover': {
        backgroundColor: '$green500',
        transition: 'background-color 0.5s'
    },

    '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.8,
        backgroundColor: '$gray800',
        color: 'white',
        border: 0
    }
})