import Head from "next/head";
let publicreading = require("../publicreading.json");
import _ from "lodash";
import { formatISO, isPast } from "date-fns";
import { nextSaturday } from "date-fns";
import { getISODay, addDays } from "date-fns";
import { isSameDay } from "date-fns";
import { format } from "date-fns";

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
        <br />
        <ul>
          {formatted.map((item, i) => {
            if (!isPast(item.start)) {
              //const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })

              if (isSameDay(item.start, sat)) {
                return (
                  <li key={item.start}>
                    <div className="flex flex-col items-center justify-center w-full">
                      <div class="max-w-sm rounded material-card bg-white">
                        <div class="px-6 py-4">
                          <div class="font-bold text-3xl tracking-wide">
                            <h2 className="text-2xl font-bold">
                              {format(item.start, "EEEE MMMM do, yyyy ")}
                            </h2>
                          </div>
                        </div>
                        <img
                          class="w-full rounded-t"
                          src="data:image/svg+xml,%3Csvg%20width%3D%22344%22%20height%3D%22194%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Cdefs%3E%3Cpath%20id%3D%22a%22%20d%3D%22M-1%200h344v194H-1z%22%2F%3E%3C%2Fdefs%3E%3Cg%20transform%3D%22translate(1)%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cmask%20id%3D%22b%22%20fill%3D%22%23fff%22%3E%3Cuse%20xlink%3Ahref%3D%22%23a%22%2F%3E%3C%2Fmask%3E%3Cuse%20fill%3D%22%23BDBDBD%22%20xlink%3Ahref%3D%22%23a%22%2F%3E%3Cg%20mask%3D%22url(%23b)%22%3E%3Cpath%20d%3D%22M173.65%2069.238L198.138%2027%20248%20112.878h-49.3c.008.348.011.697.011%201.046%200%2028.915-23.44%2052.356-52.355%2052.356C117.44%20166.28%2094%20142.84%2094%20113.924c0-28.915%2023.44-52.355%2052.356-52.355%2010%200%2019.347%202.804%2027.294%207.669zm0%200l-25.3%2043.64h50.35c-.361-18.478-10.296-34.61-25.05-43.64z%22%20fill%3D%22%23757575%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                        />
                        <div class="px-6 py-4">
                          <div class="font-bold text-3xl tracking-wide">
                            <small className="text-sm">TORAH:</small>
                            <br />
                            {item.torahPassage}
                          </div>
                          <div class="text-gray-500 text-sm mb-3">
                            {item.title}
                          </div>
                          <div class="font-bold text-3xl tracking-wide">
                            <small className="text-sm">GOSPEL:</small>
                            <br />
                            {item.gospelPassage}
                          </div>
                        </div>
                      </div>
                    </div>
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
