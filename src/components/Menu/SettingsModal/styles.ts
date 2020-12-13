import styled from 'styled-components'

export const modalStyles = {
  content: {
    width: '400px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const ModalTitle = styled.h3`
  font-size: 18px;
  text-align: center;
  margin-bottom: 16px;
`

export const InputGroup = styled.div`
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
`

export const ErrorBox = styled.div`
  padding: 8px 0;
  color: red;
`
