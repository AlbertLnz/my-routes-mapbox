import { routes } from '../data/routes'
import '../styles/infocard.css'

type Props = {
  routeIndex: number
}

const InfoCard = ({ routeIndex }: Props) => {
  const entries = Object.entries(routes)
  const [, routeValues] = entries[routeIndex] // routeKey, routeValues
  const bkgColor = routeValues.difficulty_color + '30'
  return (
    <section id='card'>
      <div
        id='textContainer'
        style={{
          backgroundColor: bkgColor,
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
        }}
      >
        <h2>{routeValues.name}</h2>
        <div
          id='line'
          style={{
            backgroundColor: routeValues.difficulty_color,
          }}
        ></div>
      </div>

      <div id='imgContainer'>
        <img src={routeValues.image} alt={routeValues.name} />
      </div>

      <article id='infoContainer'>
        <ul>
          <li>
            Dificultad: <strong>{routeValues.difficulty}</strong>
          </li>
          <li>
            Distancia Total: <strong>{routeValues.distance}</strong>
          </li>
          <li>
            Tiempo Total: <strong>{routeValues.total_time}</strong>
          </li>
          <li>
            Ascensión: <strong>{routeValues.total_asc}</strong>
          </li>
          <li>
            Descenso: <strong>{routeValues.total_desc}</strong>
          </li>
        </ul>
      </article>

      <div id='linksContainer'>
        <a id='garmin' target='_blank' href={routeValues.link_garmin}>
          <img src='assets/cardImages/garminIcon.webp' alt='Garmin icon' />
        </a>
        <a id='gpx' target='_blank' href={routeValues.gpx}>
          <img src='assets/cardImages/gpxIcon.webp' alt='GPX icon' />
        </a>
      </div>
    </section>
  )
}

export default InfoCard
