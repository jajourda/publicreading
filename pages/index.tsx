import Head from "next/head";
import * as React from 'react';
let publicreading = require("../publicreading.json");
import _ from 'lodash'
import { isSaturday, isFuture } from "date-fns";
import { isSameDay } from "date-fns";

import SaturdayCard from "../components/SaturdayCard";
import SaturdayList from "../components/SaturdayList";

export interface IHomeProps {
}

export default function Home(props: IHomeProps) {

  //logic
  //todo - find and store only present and future dates in readings
  const listReadings = _.filter(publicreading, function (item) {
    let rDate = isFuture(new Date(item.start));
    console.log("rDate", rDate);
    if (rDate === true) {
      return item;
    }
  });
  console.log("iw am readings:");
  console.log(listReadings);
  //todo- capturetoday and store in the variable `today`
  const today = new Date();
  //const today = new Date("7/10/2021");
  //todo -run conditional if statement
  let upcomingSaturday;

  console.log("i am TODAY**********");
  console.log(today);
  if (!isSaturday(today)) {
    //> this code should only run on 6 days that are not saturday
    upcomingSaturday = listReadings[0];
    console.log("i am NOT saturday", upcomingSaturday);
  } else {
    upcomingSaturday = _.filter(publicreading, function (item) {
      return isSameDay(today, new Date(item.start));
    })[0];
    console.log("i am saturday", upcomingSaturday);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Public Reading | How Church Works </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Public Reading </h1>
        {/* Saturday Card component */}
        <SaturdayCard item={upcomingSaturday} poop={upcomingSaturday} />
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


