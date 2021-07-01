import Head from "next/head";
let publicreading = require("../publicreading.json");
import _ from "lodash";
import { formatISO, isPast, isSaturday } from "date-fns";
import { nextSaturday } from "date-fns";
import { getISODay, addDays } from "date-fns";
import { isSameDay } from "date-fns";
import { format } from "date-fns";
import SaturdayCard from "../components/SaturdayCard";

// import { formatISO } from "date-fns";

export default function Home(props, formatted) {
  formatted = [];
  //reformat the start property of each event object in the publicreading json file
  _.forEach(publicreading, function (value) {
    console.log(value.start);
    value.start = new Date(value.start);
    console.log(value.start);
    formatted.push(value);
  });
  //let props = {};
  //props.formatted = formatted;
  console.log("i am props", props);
  console.log("i am formatted", formatted);

  let today = new Date();
  // let today = new Date("7/2/21");
  let sat = new Date("6/19/21");
  let nextSat = nextSaturday(today);

  // function getClosestDayOfNextWeek(dayOfWeek, fromDate = today) {
  //   // follow the getISODay format (7 for Sunday, 1 for Monday)
  //   const dayOfWeekMap = {
  //     Mon: 2,
  //     Tue: 3,
  //     Wed: 4,
  //     Thur: 5,
  //     Fri: 6,
  //     Sat: 7,
  //     Sun: 1,
  //   };

  //   // -7 means last week
  //   // dayOfWeekMap[dayOfWeek] get the ISODay for the desired dayOfWeek

  //   // e.g. If today is Sunday, getISODay(fromDate) will returns 7
  //   // if the day we want to find is Thursday(4), apart from subtracting one week(-7),
  //   // we also need to account for the days between Sunday(7) and Thursday(4)
  //   // Hence we need to also subtract (getISODay(fromDate) - dayOfWeekMap[dayOfWeek])
  //   const offsetDays = -1 - (getISODay(fromDate) - dayOfWeekMap[dayOfWeek]);

  //   return addDays(fromDate, offsetDays);
  // }

  // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^");
  // console.log(getClosestDayOfNextWeek("Sat"));
  // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^");
  // // let sat = new Date(getClosestDayOfNextWeek("Sat"));

  console.log(today);
  console.log("i am next saturday");
  console.log(nextSaturday(today));

  //test push to github
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Public Reading | How Church Works </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Public Reading</h1>
        <br />
        <ul>
          {formatted.map((item, i) => {
            if (!isPast(item.start)) {
              //const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })

              //todays date is a saturday
              if (isSaturday(today)) {
                if (isSameDay(today, item.start))
                  return (
                    <div>
                      <SaturdayCard item={item} date={item.start} />
                    </div>
                  );
              } else {
                //todays date is not a saturday
                if (isSameDay(nextSat, item.start)) {
                  return (
                    <div>
                      <SaturdayCard item={item} date={nextSat} />
                    </div>
                  );
                }
              }
            }
          })}
        </ul>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
}
