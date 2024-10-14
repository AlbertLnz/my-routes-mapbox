import { useState } from 'react'
import '../styles/navigationbuttons.css'

type Props = {
  handleRequestRoute: (value: string) => void
  handleShowCardInfo: (value: boolean) => void
  routeIndexSelected: number
}

const NavigationButtons = ({
  handleRequestRoute,
  handleShowCardInfo,
  routeIndexSelected,
}: Props) => {
  const [statusInfoButton, setStatusInfoButton] = useState(false)

  const handleClickCardInfo = () => {
    handleShowCardInfo(!statusInfoButton)
    setStatusInfoButton(!statusInfoButton)
  }

  return (
    <div id="buttonContainer">
      <button id="prevButton" onClick={() => handleRequestRoute('-')}></button>

      <button
        id="infoButton"
        data-status={statusInfoButton}
        onClick={handleClickCardInfo}
        disabled={routeIndexSelected === 0}
      ></button>

      <button id="nextButton" onClick={() => handleRequestRoute('+')}></button>
    </div>
  )
}

export default NavigationButtons
