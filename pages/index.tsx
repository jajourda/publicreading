import Head from "next/head";
import * as React from 'react';
// let publicreading = require("../publicreading.json");
import _ from 'lodash'
import { isSaturday, isFuture } from "date-fns";
import { isSameDay } from "date-fns";
import { reading } from '../interfaces/reading';
import SaturdayCard from "../components/SaturdayCard";
import SaturdayList from "../components/SaturdayList";

import { getReadingsList } from '../libs/sheets';

export interface IHomeProps {
  readings: reading[];
}

export default function Home(props: IHomeProps) {

  //logic
  //todo - find and store only present and future dates in readings
  const listReadings = _.filter(props.readings, function (item) {
    // console.log('i am item:')
    // console.log(item)
    let rDate = isFuture(new Date(item.start));
    if (rDate === true) {
      return item;
    }
  });
  //todo- capturetoday and store in the variable `today`
  const today = new Date();
  //const today = new Date("7/10/2021");
  //todo -run conditional if statement
  let upcomingSaturday;

  if (!isSaturday(today)) {
    upcomingSaturday = listReadings[0];
  } else {
    upcomingSaturday = _.filter(props.readings, function (item) {
      return isSameDay(today, new Date(item.start));
    })[0];
  }


  // console.log('i am listReadings@@@@@@@@@@')
  // console.log(listReadings)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Public Reading | How Church Works </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        {/* <h1 className="text-6xl font-bold">test/{readings[0].torahTitle} </h1> */}
        <h1 className="text-6xl font-bold">Public Reading </h1>
        <br />
        {/* Saturday Card component */}
        <SaturdayCard item={upcomingSaturday} />
        <SaturdayList readings={listReadings} />
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://www.youtube.com/channel/UCGp8pFe132gzI6YvnAxHOXw"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img
            src="https://yt3.ggpht.com/ytc/AKedOLSU2P3VVbKEkoCPaJQG9i27gF2Ou1fIzqne3Cl-=s176-c-k-c0x00ffffff-no-rj"
            alt="Vercel Logo"
            className="footer-link"
          />
        </a>
      </footer>
    </div>
  );

}

export async function getStaticProps() {
  const readings = await getReadingsList();
  // console.log('i am readings!!!!!!')
  // console.log(readings)
  // const jsonReadings = readings.map((item, i) => {
  //   console.log('i am a reading')
  //   console.log(JSON.stringify(item))
  // })
  // const jsonReadings = _.map(readings, (item)=>{JSON.stringify(item)});
  return {
    props: {
      readings: readings.slice(1, readings.length), // remove sheet header
    },
    revalidate: 1, // In seconds
  };
}


