"use client"

import styles from "./page.module.css";

import UserList from '@/app/components/userList';
import ModalBox from '@/app/components/ModalBox';
import Loader from "./components/loader";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Hello world!!!</h1>
      <UserList></UserList>
    </main>
  );
}