import Head from "next/head";
let publicreading = require("../publicreading.json");
import _ from "lodash";
import { formatISO, isPast } from "date-fns";
import { nextSaturday } from "date-fns";
import { getISODay, addDays } from "date-fns";
import { isSameDay } from "date-fns";

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

  function getClosestDayOfNextWeek(dayOfWeek, fromDate = new Date()) {
    // follow the getISODay format (7 for Sunday, 1 for Monday)
    const dayOfWeekMap = {
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thur: 4,
      Fri: 5,
      Sat: 6,
      Sun: 7,
    };

    // -7 means last week
    // dayOfWeekMap[dayOfWeek] get the ISODay for the desired dayOfWeek

    // e.g. If today is Sunday, getISODay(fromDate) will returns 7
    // if the day we want to find is Thursday(4), apart from subtracting one week(-7),
    // we also need to account for the days between Sunday(7) and Thursday(4)
    // Hence we need to also subtract (getISODay(fromDate) - dayOfWeekMap[dayOfWeek])
    const offsetDays = 0 - (getISODay(fromDate) - dayOfWeekMap[dayOfWeek]);

    return addDays(fromDate, offsetDays);
  }

  console.log(getClosestDayOfNextWeek("Sat"));
  let sat = new Date(getClosestDayOfNextWeek("Sat"));

  //test push to github
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Public Reading</h1>
        <ul>
          {formatted.map((item, i) => {
            if (!isPast(item.start)) {
              //const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })

              if (isSameDay(item.start, sat)) {
                return (
                  <li key={item.start}>
                    <h1 className="text-6xl font-bold">
                      {item.start.toString()}
                    </h1>
                    <h2>
                      <strong>TORAH:</strong>

                      {item.torahPassage}
                    </h2>
                  </li>
                );
              } else {
                return (
                  <li key={item.start}>
                    <p>{item.start.toString()}</p>
                  </li>
                );
              }
            }
          })}
        </ul>
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Get started by editing{" "}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            pages/index.js
          </code>
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <a
            href="https://nextjs.org/docs"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Documentation &rarr;</h3>
            <p className="mt-4 text-xl">
              Find in-depth information about Next.js features and API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Learn &rarr;</h3>
            <p className="mt-4 text-xl">
              Learn about Next.js in an interactive course with quizzes!
            </p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Examples &rarr;</h3>
            <p className="mt-4 text-xl">
              Discover and deploy boilerplate example Next.js projects.
            </p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Deploy &rarr;</h3>
            <p className="mt-4 text-xl">
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
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
