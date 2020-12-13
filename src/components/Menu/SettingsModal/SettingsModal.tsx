import React from 'react'
import ReactModal from 'react-modal'
import { useForm } from 'react-hook-form'
import { ModalContent, ModalTitle, modalStyles } from './styles'
import { useGameDispatch } from 'src/context/game'
import { InputGroup, ErrorBox } from './styles'

interface Props {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  rows: number
  cols: number
  mines: number
}

// TODO: [AL]: This component is the total lowest quality mess, but it is not that important. I will refactor later if needed.
export const SettingsModal = ({ isOpen, onClose }: Props) => {
  const { startGame } = useGameDispatch()
  const { register, handleSubmit, errors } = useForm<FormData>()

  const handleGameStart = handleSubmit(({ rows, cols, mines }) => {
    startGame({
      mines,
      size: {
        rows,
        cols
      }
    })
    onClose()
  })

  return (
    <ReactModal isOpen={isOpen} style={modalStyles} ariaHideApp={false}>
      <ModalContent>
        <ModalTitle>Game Settings</ModalTitle>

        <form onSubmit={handleGameStart}>
          <InputGroup>
            <label htmlFor='rows'>Height</label>
            <input
              name='rows'
              type='number'
              defaultValue={40}
              ref={register({ min: 1, max: 500, required: true })}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor='cols'>Width</label>
            <input
              name='cols'
              type='number'
              defaultValue={60}
              ref={register({ min: 5, max: 500, required: true })}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor='mines'>Mines</label>
            <input
              name='mines'
              type='number'
              defaultValue={400}
              ref={register({ min: 1, max: 25000, required: true })}
            />
          </InputGroup>

          <ErrorBox>
            {errors.rows && <p>Height must be between 1 and 500</p>}
            {errors.cols && <p>Width must be between 5 and 500</p>}
            {errors.cols && <p>Width must be between 1 and 25000</p>}
          </ErrorBox>
          <InputGroup>
            <input type='submit' value='Start' />
          </InputGroup>
        </form>
      </ModalContent>
    </ReactModal>
  )
}
