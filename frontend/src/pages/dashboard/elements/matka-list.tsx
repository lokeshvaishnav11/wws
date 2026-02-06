// import React from "react";
// import LMatch from "../../../models/LMatch";
// import moment from "moment";
// import { dateFormat } from "../../../utils/helper";

// import "./matchlist.css";
// import axios from "axios";

// interface MatchListProps {
//   matchList: any[];
//   currentMatch: (match: any) => void;
// }

// const MatkaList: React.FC<MatchListProps> = ({ matchList, currentMatch }) => {
//   //console.log(matchList, "matchlisy",)

//   return (
//     <div className="card-content">
//       <table className="table coupon-table">
//         <thead></thead>
//         <tbody>
//           {matchList?.map((match: any, index: number) => {
//             const marketId =
//               match?.markets && match?.markets?.length > 0
//                 ? match?.markets[0]?.marketId
//                 : null;

//                 const openTime = moment()
//     .tz("Asia/Kolkata")
//     .hour(match.opentime.hour)
//     .minute(match.opentime.minute)
//     .second(0)
//     .format("DD-MM-YYYY hh:mm A");

//   const closeTime = moment()
//     .tz("Asia/Kolkata")
//     .add(match.gamename === "Disawar" ? 1 : 0, "day")
//     .hour(match.closetime.hour)
//     .minute(match.closetime.minute)
//     .second(0)
//     .format("DD-MM-YYYY hh:mm A");
                
//             return (
//               <tr key={match.matchId}>
//                 <td>
//                   <div className="game-name">
//                     <a
//                       onClick={() => currentMatch(match)}
//                       className="text-dark"
//                       href={undefined}
//                     ></a>
//                   </div>

//                   <div className="container w-100  p-0">
//                     <div className="card single-match text-center my-2">
//                       <a onClick={() => currentMatch(match)}>
//                         {/* <h5 className="ng-binding" style={{backgroundColor:"#FFB200",color:"white"}}>  {match.name}-{moment(match?.matchDateTime).format("DD-MM-YYYY")}</h5> */}
//                         <h5
//                           className="ng-binding"
//                           style={{ backgroundColor: "#FFB200", color: "white" }}
//                         >
//                           {/* {match.gamename}-{moment().format("DD-MM-YYYY")} */}
//                           {match?.roundid}
//                         </h5>

//                         <p
//                           className="ng-binding mt-1 mb-1 d-none "
//                           style={{ fontSize: "15px", fontWeight: "bold" }}
//                         >
//                           {/* {moment(match?.matchDateTime).format(dateFormat)} */}
//                           {moment()
//                             .hour(9)
//                             .minute(0)
//                             .second(0)
//                             .format("DD-MM-YYYY hh:mm A")}
//                         </p>
//                         <p className="mb-1 pt-1">
//         <b>Open:</b> {openTime}
//       </p>

//       <p className="mb-1">
//         <b>Close:</b> {closeTime}
//       </p>
//                       </a>
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };
// export default MatkaList;



import React from "react";
import moment from "moment-timezone";
import "./matchlist.css";

interface MatchListProps {
  matchList: any[];
  currentMatch: (match: any) => void;
}

const MatkaList: React.FC<MatchListProps> = ({ matchList, currentMatch }) => {
  return (
    <div className="card-content">
      <table className="table coupon-table">
        <tbody>
          {matchList?.map((match: any, index: number) => {
            // safety checks
            if (!match?.opentime || !match?.closetime) return null;

            const openTime = moment()
              .tz("Asia/Kolkata")
              .hour(match.opentime.hour)
              .minute(match.opentime.minute)
              .second(0)
              .format("DD-MM-YYYY hh:mm A");

            const closeTime = moment()
              .tz("Asia/Kolkata")
              .add(match.gamename === "Disawar" ? 1 : 0, "day")
              .hour(match.closetime.hour)
              .minute(match.closetime.minute)
              .second(0)
              .format("DD-MM-YYYY hh:mm A");

            return (
              <tr key={match._id || index}>
                <td>
                  <div className="container w-100 p-0">
                    <div className="card single-match text-center my-2">
                      <a
                        href="#!"
                        onClick={() => currentMatch(match)}
                        style={{ textDecoration: "none" }}
                      >
                        <h5
                          className="ng-binding"
                          style={{
                            backgroundColor: "#FFB200",
                            color: "white",
                          }}
                        >
                          {match.roundid}
                        </h5>

                        <p className="mb-1 pt-1">
                          <b>Open:</b> {openTime}
                        </p>

                        <p className="mb-1">
                          <b>Close:</b> {closeTime}
                        </p>
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MatkaList;
