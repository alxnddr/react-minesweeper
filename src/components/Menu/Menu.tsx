import { useState } from 'react'
import { SettingsModal } from './SettingsModal'
import { MenuRoot, MenuItem } from './styles'

export const Menu = () => {
  const [isModalOpen, setIsModalOpen] = useState(true)

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <MenuRoot>
      <MenuItem onClick={() => setIsModalOpen(true)}>Settings</MenuItem>
      <SettingsModal isOpen={isModalOpen} onClose={handleModalClose} />
    </MenuRoot>
  )
}
