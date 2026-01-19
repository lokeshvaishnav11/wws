import React from "react";
import LMatch from "../../../models/LMatch";
import moment from "moment";
import { dateFormat } from "../../../utils/helper";

import "./matchlist.css";
import axios from "axios";

interface MatchListProps {
  matchList: any[];
  currentMatch: (match: any) => void;
}

const MatkaList: React.FC<MatchListProps> = ({ matchList, currentMatch }) => {
  //console.log(matchList, "matchlisy",)

  return (
    <div className="card-content">
      <table className="table coupon-table">
        <thead></thead>
        <tbody>
          {matchList?.map((match: any, index: number) => {
            const marketId =
              match?.markets && match?.markets?.length > 0
                ? match?.markets[0]?.marketId
                : null;
            return (
              <tr key={match.matchId}>
                <td>
                  <div className="game-name">
                    <a
                      onClick={() => currentMatch(match)}
                      className="text-dark"
                      href={undefined}
                    ></a>
                  </div>

                  <div className="container w-100  p-0">
                    <div className="card single-match text-center my-2">
                      <a onClick={() => currentMatch(match)}>
                        {/* <h5 className="ng-binding" style={{backgroundColor:"#FFB200",color:"white"}}>  {match.name}-{moment(match?.matchDateTime).format("DD-MM-YYYY")}</h5> */}
                        <h5
                          className="ng-binding"
                          style={{ backgroundColor: "#FFB200", color: "white" }}
                        >
                          {/* {match.gamename}-{moment().format("DD-MM-YYYY")} */}
                          {match?.roundid}
                        </h5>

                        <p
                          className="ng-binding mt-1 mb-1 "
                          style={{ fontSize: "15px", fontWeight: "bold" }}
                        >
                          {/* {moment(match?.matchDateTime).format(dateFormat)} */}
                          {moment()
                            .hour(9)
                            .minute(0)
                            .second(0)
                            .format("DD-MM-YYYY hh:mm A")}
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
