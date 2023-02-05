import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Calendar from '../components/Calendar/Calendar'

export default function Home() {
  return (
    <div className={styles.container}>
      <Calendar />
    </div>
  )
}