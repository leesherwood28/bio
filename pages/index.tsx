import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Game from '../src/components/Game';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className='grid w-screen h-screen'>
      <Game></Game>
    </div>
  );
};

export default Home;
