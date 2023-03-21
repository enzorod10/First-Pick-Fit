import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import useWindowSize from '../hooks/useWindowSize';
import { store } from '../store'
import { Provider } from 'react-redux'
import { setUserStatus } from '../redux/features/user/userSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/clientApp'
import {
  DndContext, 
  KeyboardSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  snapCenterToCursor,
  restrictToWindowEdges
} from '@dnd-kit/modifiers'
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const [activeElement, setActiveElement] = useState<any>(null)

  useEffect(() => {
    const resizer = () => {
      document.body.style.height = window.innerHeight + "px";
  }
    document.body.style.height = window.innerHeight + "px";
    window.addEventListener("resize", (_e) => resizer());
  }, [])

  onAuthStateChanged(auth, (user) => {
    if (user){
        store.dispatch(setUserStatus({ loginStatus: true, userId: user.uid}))
    } else {
        store.dispatch(setUserStatus({ loginStatus: false } ))
    }
  });

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5
    }
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5
    }
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  
  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    keyboardSensor,
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
      <Head>
        <meta name="keywords" content="fitness, tracker, workouts, exercises" />
        <meta name="author" content="Enzo Rodriguez" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {(['/dashboard', '/workouts', '/exercises']).includes(appProps.router.pathname) ?
        <Layout windowSize={windowSize}>
          <Component {...pageProps} />
        </Layout> :
        <Component {...pageProps} windowSize={windowSize}/>}
        <DragOverlay>
          {
            activeElement && activeElement?.data?.current.renderDragLayout?.(activeElement.data.current)
          }
        </DragOverlay>
      </DndContext>
    </Provider>
  )
}