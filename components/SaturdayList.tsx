import * as React from "react";
import { reading } from "../interfaces/reading";
import { format } from "date-fns";

export interface ISaturdayListProps {
    readings: reading[];
}

export default function SaturdayList(props: ISaturdayListProps) {
    return (
        <div className="container mx-auto py-10 flex justify-center h-screen">
            <div className="  h-full flex flex-col">
                <div
                    className="
        bg-white
        text-sm text-gray-500
        font-bold
        px-5
        py-2
        shadow
        border-b border-gray-300
      "
                >
                    Septennial Reading List
                </div>

                <div
                    className="w-full h-full overflow-auto shadow bg-white"
                    id="journal-scroll"
                >
                    <table className="w-full">
                        <tbody className="">
                            {props.readings.map((item, i) => {
                                return (
                                    <tr
                                        className="
                                      relative
                                      transform
                                      scale-100
                                      text-xs
                                      py-1
                                      border-b-2 border-blue-100
                                      cursor-default
                                      reading-list-row
                                    "
                                        key={item.start.toString() + i}
                                    >
                                        <td className="pl-5 pr-3 whitespace-no-wrap">
                                            <div className="text-gray-400"> {format(new Date(item.start), "EEEE MMMM do, yyyy ")}</div>
                                        </td>

                                        <td className="px-2 py-2 whitespace-no-wrap">
                                            <div className="leading-5 text-gray-500 font-medium">
                                                <small>TORAH</small>
                                            </div>
                                            <div className="leading-5 text-gray-900">
                                                {item.torahPassage}
                                            </div>
                                            <div className="leading-5 text-gray-500 font-medium">
                                                <small>GOSPEL</small>
                                            </div>
                                            <div className="leading-5 text-gray-900">
                                                {item.gospelPassage}
                                            </div>

                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
