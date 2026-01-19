import React from "react";
import LMatch from "../../../models/LMatch";
import moment from "moment";
import { dateFormat } from "../../../utils/helper";

import "./matchlist.css";

interface MatchListProps {
  matchList: LMatch[];
  currentMatch: (match: LMatch) => void;
  //   memoOdds: (marketId: string | null) => React.ReactNode;
}

const MatchList2: React.FC<MatchListProps> = ({
  matchList,
  currentMatch,
  //   memoOdds,
}) => {
  //console.log(matchList, "matchlisy", currentMatch, "currentmatch", "memoodds");

  return (
    <div className="row mx-1">
      <table className=" ">
        <thead></thead>
        <tbody>
          {matchList?.map((match: LMatch, index: number) => {
            const marketId =
              match?.markets && match?.markets?.length > 0
                ? match?.markets[0].marketId
                : null;
            return (
              <>
                <tr
                  key={match.matchId}
                  className="col-md-6 event-row mb-3 float-left p-1"
                >
                  <a
                    style={{ color: "#000", textDecoration: "none" }}
                    onClick={() => currentMatch(match)}
                  >
                    <div className="card w-100" style={{ cursor: "pointer" }}>
                      <div
                        className="card-headerf font-weight-bolder text-center bg-wcarning p-1 h6 small"
                        style={{ backgroundColor: "black", color: "white" }}
                      >
                        {match?.name}
                      </div>

                      <div className="card-body pt-1 pb-0">
                        <div className="row p-0">
                          <div
                            style={{ marginLeft: "20px" }}
                            className="col-9 p-0"
                          >
                            {/* ✅ Fixed-height IN PLAY section */}
                            <div
                              className="h6 small pl-1 mb-1 pt-1 d-flex align-items-center"
                              style={{ minHeight: "22px" }} // keeps card symmetrical
                            >
                              {moment().isSame(
                                moment(match.matchDateTime),
                                "day"
                              ) &&
                              moment().isAfter(moment(match.matchDateTime)) ? (
                                <>
                                  <svg
                                    className="text-success Blink"
                                    style={{ width: "12px", height: "12px" }}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                                    />
                                  </svg>
                                  <span className="ml-1">IN PLAY</span>
                                </>
                              ) : (
                                <span className="ml-1">IN PLAY</span>
                              )}
                            </div>

                            {/* ✅ Match date */}
                            <div className="badge badger-light">
                              {moment(match.matchDateTime).format(dateFormat)}
                            </div>
                          </div>

                          <div className="col-3 text-right"></div>
                        </div>
                      </div>
                    </div>
                  </a>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default MatchList2;
