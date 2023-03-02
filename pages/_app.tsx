import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import useWindowSize from '../hooks/useWindowSize';
import { store } from '../store'
import { Provider } from 'react-redux'
import { userSlice } from '../redux/features/user/userSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/clientApp'
import {
  DndContext, 
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  restrictToWindowEdges
} from '@dnd-kit/modifiers'
import { useState } from 'react';

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const [activeElement, setActiveElement] = useState<any>(null)

  onAuthStateChanged(auth, (user) => {
    if (user){
        store.dispatch(userSlice.actions.setUserStatus({ loginStatus: true, userId: user.uid}))
    } else {
        store.dispatch(userSlice.actions.setUserStatus({ loginStatus: false } ))
    }
  });

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const pointerSensor = useSensor(PointerSensor);
  
  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    keyboardSensor,
    pointerSensor
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    (active?.data?.current?.type === 'exercise' || active?.data?.current?.type === 'workout') && setActiveElement(active);
  }

  const handleDragEnd = (event: DragStartEvent) => {
    const { active } = event;
    (active?.data?.current?.type === 'exercise' || active?.data?.current?.type === 'workout') && setActiveElement(null);
  }

  const windowSize = useWindowSize()

  return (
    <Provider store={store}>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {(['/signup', '/login']).includes(appProps.router.pathname) ?
          <Component {...pageProps} /> :
          <Layout windowSize={windowSize}>
            <Component {...pageProps} />
          </Layout>}
        <DragOverlay>
          {
            activeElement && activeElement?.data?.current.renderDragLayout?.(activeElement.data.current)
          }
        </DragOverlay>
      </DndContext>
    </Provider>
  )
}