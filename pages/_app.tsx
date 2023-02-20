import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { store } from '../store'
import { Provider } from 'react-redux'
import { userSlice } from '../redux/features/user/userSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/clientApp'

export default function App({ Component, pageProps }: AppProps) {

  onAuthStateChanged(auth, (user) => {
    if (user){
        store.dispatch(userSlice.actions.setUserStatus({ loginStatus: true, userId: user.uid}))
    } else {
        store.dispatch(userSlice.actions.setUserStatus({ loginStatus: false } ))
    }
  })

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}