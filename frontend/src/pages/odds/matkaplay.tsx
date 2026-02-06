import React from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import authService from "../../services/auth.service";
import { betPopup } from "../../redux/actions/bet/betSlice";
import { RoleType } from "../../models/User";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/actions/login/loginSlice";
import { IBetOn, IBetType } from "../../models/IBet";
import { OddsType } from "../../models/IMarket";
import PlaceBetBox from "./components/place-bet-box";
import { IUserBetStake } from "../../models/IUserStake";
import accountService from "../../services/account.service";
import MyBetComponent from "./components/my-bet.component";
import MyMatkaBetComponent22 from "./components/my-matka-bet";

const MatkaPlay = () => {
  const { matchId ,roundid } = useParams(); // 👈 URL se matchId

  const userState = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  // const [gameType, setGameType] = React.useState("");
  const [gameType, setGameType] = React.useState<"single" | "haraf">("single");

  const [matkaList, setMatkaList] = React.useState<any>([]);

  React.useEffect(() => {
    const fetchMatkaList = async () => {
      try {
        const res = await accountService.matkagamelist();
        console.log(res?.data?.data, "ffff");
        setMatkaList(res?.data?.data);
      } catch (err) {
        console.error("Matka list error:", err);
      }
    };

    fetchMatkaList();
  }, [matchId]);

  // ✅ matching item nikaalo
const match = matkaList.find(
  (item: any) => item.id == matchId && item.roundid == roundid
);


  if (!match) {
    return <div className="text-center mt-3">Match not found</div>;
  }

  const singlePattiNumbers = [
    ...Array.from({ length: 99 }, (_, i) => String(i + 1).padStart(2, "0")),
    "00",
  ];

  const harafNumbers = Array.from({ length: 10 }, (_, i) => i);

  const onBetkkkold = (isBack = false, market: any) => {
    //console.log(market, "market in matka");
    if (userState.user.role !== RoleType.user) return false;

    // if (market.BackPrice1 === 0 && isBack) return false
    // if (market.LayPrice1 === 0 && !isBack) return false

    const ipAddress = authService.getIpAddress();

    dispatch(
      betPopup({
        isOpen: true,
        betData: {
          isBack,
          odds: isBack ? market.BackPrice1 : market.LayPrice1,
          volume: isBack ? market.BackSize1 : market.LaySize1,
          marketId: market.marketId,
          marketName: "MATKA",
          matchId: market.matchId,
          selectionName: market.RunnerName,
          selectionId: market.SelectionId,
          pnl: 0,
          stack: 0,
          currentMarketOdds: isBack ? market.BackPrice1 : market.LayPrice1,
          eventId: market.sportId,
          exposure: -0,
          ipAddress: ipAddress,
          type: IBetType.Match,
          matchName: "matka disawa",
          betOn: IBetOn.MATKA,
          gtype: market.gtype,
          oppsiteVol: isBack ? market.LaySize1 : market.BackSize1,
          oddsType: OddsType.M,
        },
      })
    );

    //console.log(market, "market in matka555");
  };

  const onBet = (isBack = false, market: any, t: any) => {
    //console.log("🔥 onBet CLICKED");
    //console.log("👉 userState:", userState);
    //console.log("👉 market received:", market);

    if (userState.user.role !== RoleType.user) {
      //console.log("❌ User role not allowed:", userState.user.role);
      return false;
    }

    const ipAddress = authService.getIpAddress();
    //console.log("👉 IP Address:", ipAddress);

    const payload: any = {
      isOpen: true,
      betData: {
        isBack,
        odds: gameType === "single" ? 90 : 9,
        volume: 0,
        marketId: match?.id,
        marketName: "MATKA",
        matchId: match?.roundid,
        selectionName: market?.num,
        selectionId: parseInt(market?.num),
        pnl: 0,
        stack: 0,
        currentMarketOdds: 0,
        eventId: "MATKA",
        exposure: 0,
        ipAddress,
        type: IBetType.Match,
        matchName: match?.name,
        betOn: IBetOn.MATKA,
        gtype: t,
        oppsiteVol: 0,
        oddsType: OddsType.M,
      },
    };

    //console.log("🚀 DISPATCHING betPopup payload:", payload);

    dispatch(betPopup(payload));

    //console.log("✅ betPopup DISPATCHED");
  };

  const usid: any = userState!.user!._id;

  const matkastake: IUserBetStake[] = [
    {
      userId: usid,
      name1: "5",
      value1: 5,

      name2: "10",
      value2: 10,

      name3: "25",
      value3: 25,

      name4: "50",
      value4: 50,

      name5: "75",
      value5: 75,

      name6: "100",
      value6: 100,

      name7: "150",
      value7: 150,

      name8: "200",
      value8: 200,

      name9: "300",
      value9: 300,

      name10: "400",
      value10: 400,

      name11: "500",
      value11: 500,

      name12: "1K",
      value12: 1000,

      name13: "2K",
      value13: 2000,
    },
  ];

  //console.log(matkastake, "makrkk");

  const openTime = match?.opentime
  ? moment()
      .tz("Asia/Kolkata")
      .hour(match.opentime.hour)
      .minute(match.opentime.minute)
      .second(0)
      .format("DD-MM-YYYY hh:mm A")
  : "--";

const closeTime = match?.closetime
  ? moment()
      .tz("Asia/Kolkata")
      .add(match.gamename === "Disawar" ? 1 : 0, "day")
      .hour(match.closetime.hour)
      .minute(match.closetime.minute)
      .second(0)
      .format("DD-MM-YYYY hh:mm A")
  : "--";


  return (
    <div className="container w-100 p-0">
      <div className="card single-match text-center my-2">
        <a>
          <h5
            className="ng-binding"
            style={{ backgroundColor: "#FFB200", color: "white" }}
          >
            {/* {match.name}-{moment().format("DD-MM-YYYY")} */}
            {match?.roundid}
          </h5>

          {/* <p
            className="ng-binding mt-1 mb-1"
            style={{ fontSize: "15px", fontWeight: "bold" }}
          >
            {moment().hour(9).minute(0).second(0).format("DD-MM-YYYY hh:mm A")}
          </p> */}
          <p className="mb-1 pt-1">
        <b>Open:</b> {openTime}
      </p>

      <p className="mb-1">
        <b>Close:</b> {closeTime}
      </p>
        </a>
      </div>

      {/* <div className="col-md-12 d-flex justify-content-center mb-2 mt-2">
        <select
          value={gameType}
          onChange={(e) => setGameType(e.target.value)}
          className="select-satta-gametype"
        >
          <option value="">Select Game Type</option>
          <option value="single">Single Patti</option>
          <option value="haraf">Haraf Andar Bahar</option>
        </select>
      </div> */}

      <div className="col-md-12 d-flex justify-content-center mb-2 mt-2">
        <div className="satta-tabs">
          <button
            className={`satta-tab ${gameType === "single" ? "active" : ""}`}
            onClick={() => setGameType("single")}
          >
            Single Patti
          </button>

          <button
            className={`satta-tab ${gameType === "haraf" ? "active" : ""}`}
            onClick={() => setGameType("haraf")}
          >
            Andar Bahar
          </button>
        </div>
      </div>

      <div>
        {gameType === "single" && (
          <>
            <div className="row">
              {singlePattiNumbers.map((num) => (
                <div key={num} className="col-4 col-md-3 mb-2">
                  <button
                    onClick={() => onBet(true, { num, matchId }, "single")}
                    className="btn btn-info w-100"
                  >
                    {num}
                  </button>
                  <span className="btn w-100">0</span>
                </div>
              ))}
            </div>
          </>
        )}

        {gameType === "haraf" && (
          <>
            {/* ANDAR */}
            <h5 className="col-12 mb-2 harup-satta-text">Haraf Andar</h5>
            <div className="row">
              {harafNumbers.map((num) => (
                <div key={`andar-${num}`} className="col-4 col-md-1 mb-2">
                  <button
                    onClick={() => onBet(true, { num, matchId }, "andar")}
                    className="btn btn-info w-100"
                  >
                    {num}
                  </button>
                  <span className="btn w-100">0</span>
                </div>
              ))}
            </div>

            {/* BAHAR */}
            <h5 className="col-12 mb-2 harup-satta-text mt-3">Haraf Bahar</h5>
            <div className="row">
              {harafNumbers.map((num) => (
                <div key={`bahar-${num}`} className="col-4 col-md-1 mb-2">
                  <button
                    onClick={() => onBet(true, { num, matchId }, "bahar")}
                    className="btn btn-info w-100"
                  >
                    {num}
                  </button>
                  <span className="btn w-100">0</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <MyMatkaBetComponent22 roundid={match?.roundid} />

      <PlaceBetBox stake={matkastake[0]} />
    </div>
  );
};

export default MatkaPlay;
