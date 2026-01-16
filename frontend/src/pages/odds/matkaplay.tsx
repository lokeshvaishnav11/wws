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

const MatkaPlay = () => {
  const { matchId } = useParams(); // 👈 URL se matchId

  const userState = useAppSelector(selectUserData)
  const dispatch = useAppDispatch()

  const [gameType, setGameType] = React.useState("");
    const [matkaList, setMatkaList] = React.useState<any>([])
  


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
  const match = matkaList.find((item:any) => item.gamename == matchId);

  if (!match) {
    return <div className="text-center mt-3">Match not found</div>;
  }

  const singlePattiNumbers = [
    ...Array.from({ length: 99 }, (_, i) => String(i + 1).padStart(2, "0")),
    "00",
  ];

  const harafNumbers = Array.from({ length: 10 }, (_, i) => i);




   const onBetkkkold = (isBack = false, market: any) => {
    console.log(market,"market in matka")
        if (userState.user.role !== RoleType.user) return false
  
        // if (market.BackPrice1 === 0 && isBack) return false
        // if (market.LayPrice1 === 0 && !isBack) return false
  
        const ipAddress = authService.getIpAddress()
       
        dispatch(
          betPopup({
            isOpen: true,
            betData: {
              isBack,
              odds: isBack ? market.BackPrice1 : market.LayPrice1,
              volume: isBack ? market.BackSize1 : market.LaySize1,
              marketId: market.marketId,
              marketName: 'MATKA',
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
          }),
        )

        console.log(market,"market in matka555")
      }

      const onBet = (isBack = false, market: any) => {
        console.log("🔥 onBet CLICKED");
        console.log("👉 userState:", userState);
        console.log("👉 market received:", market);
      
        if (userState.user.role !== RoleType.user) {
          console.log("❌ User role not allowed:", userState.user.role);
          return false;
        }
      
        const ipAddress = authService.getIpAddress();
        console.log("👉 IP Address:", ipAddress);
      
        const payload:any = {
          isOpen: true,
          betData: {
            isBack,
            odds: gameType === "single" ? 90 : 9,
            volume: 0,
            marketId: match.id,
            marketName: "MATKA",
            matchId: match.roundid,
            selectionName: market.num,
            selectionId: parseInt(market.num),
            pnl: 0,
            stack: 0,
            currentMarketOdds: 0,
            eventId: "MATKA",
            exposure: 0,
            ipAddress,
            type: IBetType.Match,
            matchName: match.name,
            betOn: IBetOn.MATKA,
            gtype: gameType,
            oppsiteVol: 0,
            oddsType: OddsType.M,
          },
        };
      
        console.log("🚀 DISPATCHING betPopup payload:", payload);
      
        dispatch(betPopup(payload));
      
        console.log("✅ betPopup DISPATCHED");
      };

      const usid:any = userState!.user!._id
      
      const matkastake: IUserBetStake[] = [
        {
          userId: usid,
          name1: "100",
          value1: 100,
      
          name2: "200",
          value2: 200,
      
          name3: "500",
          value3: 500,
      
          name4: "1K",
          value4: 1000,
      
          name5: "2K",
          value5: 2000,
      
          name6: "3K",
          value6: 3000,
      
          name7: "5K",
          value7: 5000,
      
          name8: "10K",
          value8: 10000,
      
          name9: "20K",
          value9: 20000,
      
          name10: "25K",
          value10: 25000,
      
          name11: "50K",
          value11: 50000,
      
          name12: "100K",
          value12: 100000,
      
          name13: "200K",
          value13: 200000,
        }
      ];
      
      console.log(matkastake,"makrkk")

  return (
    <div className="container w-100 p-0">
      <div className="col-md-12 d-flex justify-content-center mb-2 mt-2">
        <select
          value={gameType}
          onChange={(e) => setGameType(e.target.value)}
          className="select-satta-gametype"
        >
          <option value="">Select Game Type</option>
          <option value="single">Single Patti</option>
          <option value="haraf">Haraf Andar Bahar</option>
        </select>
      </div>
      <div className="card single-match text-center my-2">
        <a>
          <h5
            className="ng-binding"
            style={{ backgroundColor: "#FFB200", color: "white" }}
          >
            {/* {match.name}-{moment().format("DD-MM-YYYY")} */}
            {match?.roundid}
          </h5>

          <p
            className="ng-binding mt-1 mb-1"
            style={{ fontSize: "15px", fontWeight: "bold" }}
          >
            {moment().hour(9).minute(0).second(0).format("DD-MM-YYYY hh:mm A")}
          </p>
        </a>

        <div>
          {gameType === "single" && (
            <>
              <h5 className="col-12 mb-2 harup-satta-text">Single Patti</h5>
              <div className="row">
                {singlePattiNumbers.map((num) => (
                  <div key={num} className="col-4 col-md-3 mb-2">
                    <button   onClick={() => onBet(true, {num, matchId, })} className="btn btn-info w-100">{num}</button>
                    <span className="btn w-100">0s</span>
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
                    <button onClick={() => onBet(true, {num, matchId })} className="btn btn-info w-100">{num}</button>
                    <span className="btn w-100">0</span>
                  </div>
                ))}
              </div>

              {/* BAHAR */}
              <h5 className="col-12 mb-2 harup-satta-text mt-3">Haraf Bahar</h5>
              <div className="row">
                {harafNumbers.map((num) => (
                  <div key={`bahar-${num}`} className="col-4 col-md-1 mb-2">
                    <button onClick={() => onBet(true, {num, matchId })} className="btn btn-info w-100">{num}</button>
                    <span className="btn w-100">0</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <PlaceBetBox stake={matkastake[0]} />
    </div>
  );
};

export default MatkaPlay;
