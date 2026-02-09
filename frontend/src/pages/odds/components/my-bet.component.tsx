// // import moment from 'moment'
// // import React from 'react'
// // import { useWebsocketUser } from '../../../context/webSocketUser'
// // import IBet from '../../../models/IBet'
// // import { RoleType } from '../../../models/User'
// // import { selectPlaceBet, setBetCount, setbetlist, setBookMarketList } from '../../../redux/actions/bet/betSlice'
// // import { selectUserData } from '../../../redux/actions/login/loginSlice'
// // import { selectCurrentMatch } from '../../../redux/actions/sports/sportSlice'
// // import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
// // import betService from '../../../services/bet.service'
// // import { betDateFormat } from '../../../utils/helper'
// // import { isMobile } from 'react-device-detect'
// // import { selectCasinoCurrentMatch } from '../../../redux/actions/casino/casinoSlice'
// // import { useLocation } from 'react-router-dom'

// // const MyBetComponent = () => {
// //   const [getMyAllBet, setMyAllBet] = React.useState<IBet[]>([])
// //   const getPlaceBet = useAppSelector(selectPlaceBet)
// //   const getCurrentMatch = useAppSelector(selectCurrentMatch)
// //   const getCasinoCurrentMatch = useAppSelector(selectCasinoCurrentMatch)
// //   const userState = useAppSelector(selectUserData)
// //   const { socketUser } = useWebsocketUser()
// //   const dispatch = useAppDispatch()
// //   const [betRefresh, setRefreshStatus] = React.useState<any>(false)
// //   const location = useLocation();
// //   React.useEffect(() => {
// //     // console.log(getCurrentMatch,"hello world here is Match id")
// //     console.log(getCasinoCurrentMatch?.match_id," getCasinoCurrentMatch hello world here is Match id")

// //     if (getCurrentMatch && getCurrentMatch.matchId && location.pathname.includes('/odds') || getCasinoCurrentMatch && getCasinoCurrentMatch.match_id) {
// //       const dataMatchId: any = getCurrentMatch && getCurrentMatch.matchId && location.pathname.includes('/odds') ? getCurrentMatch.matchId : (getCasinoCurrentMatch && getCasinoCurrentMatch?.event_data?.match_id ? getCasinoCurrentMatch?.event_data?.match_id : 0)
// //       console.log("hello world match")
// //       betService
// //         .getBets(dataMatchId)
// //         .then((bets) => {
// //           console.log(bets.data,"chech bet data")
// //           bets && bets.data && bets.data.data && setMyAllBet(bets.data.data.bets)
// //           dispatch(setbetlist(bets.data.data.bets))
// //           dispatch(setBookMarketList(bets.data.data.odds_profit))
// //           dispatch(setBetCount(bets.data.data.bets.length))
// //         })
// //         .catch((e) => {
// //           console.log(e.stack)
// //         })
// //     }
// //   }, [getCurrentMatch, getCasinoCurrentMatch, betRefresh])

// //   React.useEffect(() => {
// //     if (getPlaceBet.bet.marketId) {
// //       //setMyAllBet([{ ...getPlaceBet.bet }, ...getMyAllBet])
// //       setRefreshStatus(betRefresh ? false : true)
// //     }
// //   }, [getPlaceBet.bet])

//   // React.useEffect(() => {
//   //   socketUser.on('placedBet', (bet: IBet) => {
//   //     ///setMyAllBet([bet, ...getMyAllBet])
//   //     setRefreshStatus(betRefresh ? false : true)
//   //   })
//   //   return () => {
//   //     socketUser.off('placedBet')
//   //   }
//   // }, [getMyAllBet])

// //   // React.useEffect(() => {
// //   //   socketUser.on('betDelete', ({ betId }) => {
// //   //     ///setMyAllBet(getMyAllBet.filter((bet: IBet) => bet._id !== betId))
// //   //     setRefreshStatus(betRefresh ? false : true)
// //   //     ///dispatch(setBookMarketList({}))
// //   //   })
// //   //   return () => {
// //   //     socketUser.off('betDelete')
// //   //   }
// //   // }, [getMyAllBet])

// //   console.log(getMyAllBet,"get my all bets")

// //   return (
// //     <div className='table-responsive-new' style={{height:"200px", overflowY:"scroll"}}>
// //       <table className='table coupon-table scorall mybet'>
// //         <thead>
// //           <tr style={{background:"#76d68f"}}>
// //             <th>Sr.</th>
// //             {userState.user.role !== RoleType.user && <th >Username</th>}
// //             <th className='text-left'> Narration</th>
// //             <th> Rate</th>
// //             <th> Amount</th>

// //             <th> Run</th>
// //             <th> Mode</th>

// //             {/* {!isMobile && <th style={{background:"#76d68f"}}> Place Date</th>} */}
// //             {/* {!isMobile && <th style={{background:"#76d68f"}}> Match Date</th>} */}
// //             <th style={{background:"#76d68f"}}> Dec</th>
// //             {userState.user.role !== RoleType.user && <th> Date</th>}
// //           </tr>
// //         </thead>
// //         <tbody className='scorall'>
// //           {getMyAllBet?.filter((b:any)=>b.bet_on !== "MATCH_ODDS")?.map((bet: IBet, index: number , ) => (
// //             <tr className={bet.isBack ? 'back' : 'lay'} key={bet._id}>
// //               <td className='no-wrap'> {index + 1} </td>
// //               {userState.user.role !== RoleType.user && <td>{bet.userName}</td>}
// //               <td className='no-wrap'>
// //                 {' '}
// //                 {bet.selectionName} /{' '}
// //                 {bet.marketName === 'Fancy' && bet.gtype !== 'fancy1' ? bet.volume.toFixed(2) : bet.odds.toFixed(2)}{' '}
// //               </td>
// //               <td className='no-wrap text-center' > { bet.gtype === 'fancy1' ? bet.odds.toFixed(2) : bet?.volume.toFixed(2) }</td>
// //               <td className='no-wrap'> {bet.stack} </td>

// //               <td className='no-wrap text-center' > { bet.gtype === 'fancy1' ?  bet?.selectionName : bet.odds.toFixed(2) } </td>
// //               <td className='no-wrap text-center' > {bet.isBack ? "Yes" : "No"} </td>

// //               {/* {!isMobile && (
// //                 <td className='no-wrap'> {moment(bet.betClickTime).format(betDateFormat)} </td>
// //               )}
// //               {!isMobile && (
// //                 <td className='no-wrap'> {moment(bet.createdAt).format(betDateFormat)} </td>
// //               )} */}
// //               <td className='no-wrap text-center' > {bet?.result?.result ? bet?.result?.result  :"YES" } </td>
// //               {userState.user.role !== RoleType.user && <td className='no-wrap'>{moment.utc(bet.betClickTime).utcOffset('+05:30').format('DD/MM/YYYY hh:mm:ss A')} </td>}
// //             </tr>

// //           ))}
// //                     <tr>
// //   <td colSpan={8} style={{ backgroundColor: "darkgoldenrod", color: "white", padding: "8px 10px", textAlign: "left" }}>
// //     Match Bets
// //   </td>
// // </tr>

// //                     {getMyAllBet?.filter((b:any)=>b.bet_on === "MATCH_ODDS").map((bet: IBet, index: number , ) => (
// //             <tr className={bet.isBack ? 'back' : 'lay'} key={bet._id}>
// //               <td className='no-wrap'> {index + 1} </td>
// //               {userState.user.role !== RoleType.user && <td>{bet.userName}</td>}
// //               <td className='no-wrap'>
// //                 {' '}
// //                 {bet.selectionName} /{' '}
// //                 {bet.marketName === 'Fancy' && bet.gtype !== 'fancy1' ? bet.volume.toFixed(2) : bet.odds.toFixed(2)}{' '}
// //               </td>
// //               <td className='no-wrap text-center' > {bet.odds.toFixed(2)} </td>
// //               <td className='no-wrap'> {bet.stack} </td>

// //               <td className='no-wrap text-center' > {bet?.selectionName} </td>
// //               <td className='no-wrap text-center' > {bet.isBack ? "Yes" : "No"} </td>

// //               {/* {!isMobile && (
// //                 <td className='no-wrap'> {moment(bet.betClickTime).format(betDateFormat)} </td>
// //               )}
// //               {!isMobile && (
// //                 <td className='no-wrap'> {moment(bet.createdAt).format(betDateFormat)} </td>
// //               )} */}
// //               <td className='no-wrap text-center' > {bet?.result?.result ? bet?.result?.result  :"YES" } </td>
// //               {userState.user.role !== RoleType.user && <td className='no-wrap'>{moment.utc(bet.betClickTime).utcOffset('+05:30').format('DD/MM/YYYY hh:mm:ss A')} </td>}
// //             </tr>

// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   )
// // }

// // export default MyBetComponent

// import moment from "moment-timezone";

// import React from "react";
// import { useWebsocketUser } from "../../../context/webSocketUser";
// import IBet from "../../../models/IBet";
// import { RoleType } from "../../../models/User";
// import {
//   selectPlaceBet,
//   setBetCount,
//   setbetlist,
//   setBookMarketList,
// } from "../../../redux/actions/bet/betSlice";
// import { selectUserData } from "../../../redux/actions/login/loginSlice";
// import { selectCurrentMatch } from "../../../redux/actions/sports/sportSlice";
// import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
// import betService from "../../../services/bet.service";
// import { betDateFormat } from "../../../utils/helper";
// import { isMobile } from "react-device-detect";
// import { selectCasinoCurrentMatch } from "../../../redux/actions/casino/casinoSlice";
// import { useLocation } from "react-router-dom";

// const MyBetComponent = () => {
//   const [getMyAllBet, setMyAllBet] = React.useState<IBet[]>([]);
//   const getPlaceBet = useAppSelector(selectPlaceBet);
//   const getCurrentMatch = useAppSelector(selectCurrentMatch);
//   const getCasinoCurrentMatch = useAppSelector(selectCasinoCurrentMatch);
//   const userState = useAppSelector(selectUserData);
//   const { socketUser } = useWebsocketUser();
//   const dispatch = useAppDispatch();
//   const [betRefresh, setRefreshStatus] = React.useState<any>(false);
//   const location = useLocation();

//   React.useEffect(() => {
//     //console.log(getCasinoCurrentMatch?.match_id, " getCasinoCurrentMatch hello world here is Match id")

//     if (
//       (getCurrentMatch &&
//         getCurrentMatch.matchId &&
//         location.pathname.includes("/odds")) ||
//       (getCasinoCurrentMatch && getCasinoCurrentMatch.match_id)
//     ) {
//       const dataMatchId: any =
//         getCurrentMatch &&
//         getCurrentMatch.matchId &&
//         location.pathname.includes("/odds")
//           ? getCurrentMatch.matchId
//           : getCasinoCurrentMatch && getCasinoCurrentMatch?.event_data?.match_id
//           ? getCasinoCurrentMatch?.event_data?.match_id
//           : 0;
//       //console.log("hello world match");
//       betService
//         .getBets(dataMatchId)
//         .then((bets) => {
//           //console.log(bets.data, "chech bet data");
//           bets &&
//             bets.data &&
//             bets.data.data &&
//             setMyAllBet(bets.data.data.bets);
//           dispatch(setbetlist(bets.data.data.bets));
//           dispatch(setBookMarketList(bets.data.data.odds_profit));
//           dispatch(setBetCount(bets.data.data.bets.length));
//         })
//         .catch((e) => {
//           console.log(e.stack);
//         });
//     }
//   }, [getCurrentMatch, getCasinoCurrentMatch, betRefresh]);

//   React.useEffect(() => {
//     if (getPlaceBet.bet.marketId) {
//       setRefreshStatus(betRefresh ? false : true);
//     }
//   }, [getPlaceBet.bet]);

//   React.useEffect(() => {
//     socketUser.on("placedBet", (bet: IBet) => {
//       setRefreshStatus(betRefresh ? false : true);
//     });
//     return () => {
//       socketUser.off("placedBet");
//     };
//   }, [getMyAllBet]);

//   //console.log(getMyAllBet, "get my all bets")

//   // -----------------------------
//   // ✅ Group Fancy bets by runnerName (selectionName)
//   // -----------------------------
//   const fancyBets =
//     getMyAllBet?.filter((b: any) => b.bet_on !== "MATCH_ODDS") || [];
//   const groupedFancyBets = fancyBets.reduce((acc: any, bet: IBet) => {
//     const key = bet.selectionName || "Unknown";
//     if (!acc[key]) acc[key] = [];
//     acc[key].push(bet);
//     return acc;
//   }, {});

//   // Match Odds bets remain same
//   const matchBets =
//     getMyAllBet?.filter((b: any) => b.bet_on === "MATCH_ODDS") || [];

//   return (
//     <>
//       {" "}

//         <div
//           className="table-responsive-new"
//           style={{ height: getMyAllBet?.length > 0  ? "200px" : "", overflowY: "scroll" }}
//         >
//           <h6 className="card-title d-inline-block">My Bet</h6>
//           <table className="table coupon-table scorall mybet">
//             <thead>
//               <tr style={{ background: "#76d68f" }}>
//                 <th className="p-2">Sr.</th>
//                 {userState.user.role !== RoleType.user && (
//                   <th className="p-2">Username</th>
//                 )}
//                 <th className="text-left p-2"> Narration</th>
//                 <th className="p-2"> Rate</th>
//                 <th className="p-2"> Amount</th>
//                 <th className="p-2"> Run</th>
//                 <th className="p-2"> Mode</th>
//                 <th style={{ background: "#76d68f" }} className="p-2">
//                   {" "}
//                   Dec
//                 </th>
//                 {/* <th className="p-2"> Date</th> */}
//               </tr>
//             </thead>
//             {getMyAllBet?.length > 0 && (
//             <tbody className="scorall">
//               {/* ✅ Match Bets Section (unchanged) */}
//               <tr>
//                 <td
//                   colSpan={8}
//                   style={{
//                     backgroundColor: "black",
//                     color: "white",
//                     padding: "8px 10px",
//                     textAlign: "left",
//                     display:"none"
//                   }}
//                 >
//                   Match Betsb
//                 </td>
//               </tr>

//               {matchBets.map((bet: IBet, index: number) => (
//                 <tr className={bet.isBack ? "back" : "lay"} key={bet._id}>
//                   <td className="no-wrap text-center p-2"> {index + 1} </td>
//                   {userState.user.role !== RoleType.user && (
//                     <td className="no-wrap text-center p-2">{bet.userName}</td>
//                   )}
//                   <td className="no-wrap text-center p-2">
//                     {bet.selectionName} /{" "}
//                     {bet.marketName === "Fancy" && bet.gtype !== "fancy1"
//                       ? bet.volume.toFixed(2)
//                       : (bet.odds * 100 - 100).toFixed()}
//                   </td>
//                   <td className="no-wrap text-center p-2">
//                     {" "}
//                     {(bet.odds * 100 - 100).toFixed()}{" "}
//                   </td>
//                   <td className="no-wrap text-center p-2"> {bet.stack} </td>
//                   <td className="no-wrap text-center p-2">
//                     {" "}
//                     {bet?.selectionName}{" "}
//                   </td>
//                   <td className="no-wrap text-center p-2">
//                     {" "}
//                     {bet.isBack ? "Lagai" : "Khai"}{" "}
//                   </td>
//                   <td className="no-wrap text-center p-2">
//                     {" "}
//                     {bet?.result?.result ? bet?.result?.result : "YES"}{" "}
//                   </td>

//                   {/* <td className='no-wrap text-center p-2'>{moment.utc(bet.betClickTime).utcOffset('+05:30').format('DD/MM/YYYY hh:mm:ss A')} </td> */}
//                   {/* <td className="no-wrap text-center p-2">
//                     {moment(bet.betClickTime).format("DD/MM/YYYY hh:mm:ss A")}
//                   </td> */}
//                 </tr>
//               ))}

//               {/* ✅ Grouped Fancy Bets */}
//               {Object.keys(groupedFancyBets).map(
//                 (runnerName: string, groupIndex: number) => (
//                   <React.Fragment key={runnerName}>
//                     <tr>
//                       <td
//                         colSpan={8}
//                         style={{
//                           backgroundColor: "rgb(17, 40, 62)",
//                           color: "white",
//                           padding: "8px 10px",
//                           textAlign: "left",
//                         }}
//                       >
//                         {runnerName}
//                       </td>
//                     </tr>
//                     {groupedFancyBets[runnerName].map(
//                       (bet: IBet, index: number) => (
//                         <tr
//                           className={bet.isBack ? "back" : "lay"}
//                           key={bet._id}
//                         >
//                           <td className="no-wrap p-2"> {index + 1} </td>
//                           {userState.user.role !== RoleType.user && (
//                             <td>{bet.userName}</td>
//                           )}
//                           <td className="no-wrap p-2">
//                             {bet.selectionName} /{" "}
//                             {bet.marketName === "Fancy" &&
//                             bet.gtype !== "fancy1"
//                               ? bet.volume.toFixed(2)
//                               : (bet.odds * 100 - 100).toFixed(2)}{" "}
//                           </td>
//                           <td className="no-wrap text-center p-2">
//                             {" "}
//                             {bet.gtype === "fancy1"
//                               ? bet.odds.toFixed(2)
//                               : bet?.volume.toFixed(2)}{" "}
//                           </td>
//                           <td className="no-wrap p-2"> {bet.stack} </td>
//                           <td className="no-wrap text-center p-2">
//                             {" "}
//                             {bet.gtype === "fancy1"
//                               ? bet?.selectionName
//                               : bet.odds.toFixed(2)}{" "}
//                           </td>
//                           <td className="no-wrap text-center p-2">
//                             {" "}
//                             {bet.isBack ? "Yes" : "No"}{" "}
//                           </td>
//                           <td className="no-wrap text-center p-2">
//                             {" "}
//                             {bet?.result?.result
//                               ? bet?.result?.result
//                               : "YES"}{" "}
//                           </td>

//                           {/* <td className="no-wrap text-center p-2">
//                             {moment(bet.betClickTime).format(
//                               "DD/MM/YYYY hh:mm:ss A"
//                             )}
//                           </td> */}
//                         </tr>
//                       )
//                     )}
//                   </React.Fragment>
//                 )
//               )}
//             </tbody>)}
//           </table>
//         </div>

//     </>
//   );
// };

// export default MyBetComponent;


// // import moment from "moment-timezone";
// // import React from "react";
// // import { useWebsocketUser } from "../../../context/webSocketUser";
// // import IBet from "../../../models/IBet";
// // import { RoleType } from "../../../models/User";
// // import {
// //   selectPlaceBet,
// //   setBetCount,
// //   setbetlist,
// //   setBookMarketList,
// // } from "../../../redux/actions/bet/betSlice";
// // import { selectUserData } from "../../../redux/actions/login/loginSlice";
// // import { selectCurrentMatch } from "../../../redux/actions/sports/sportSlice";
// // import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
// // import betService from "../../../services/bet.service";
// // import { isMobile } from "react-device-detect";
// // import { selectCasinoCurrentMatch } from "../../../redux/actions/casino/casinoSlice";
// // import { useLocation } from "react-router-dom";

// // const MyBetComponent = () => {
// //   const [getMyAllBet, setMyAllBet] = React.useState<IBet[]>([]);
// //   const getPlaceBet = useAppSelector(selectPlaceBet);
// //   const getCurrentMatch = useAppSelector(selectCurrentMatch);
// //   const getCasinoCurrentMatch = useAppSelector(selectCasinoCurrentMatch);
// //   const userState = useAppSelector(selectUserData);
// //   const { socketUser } = useWebsocketUser();
// //   const dispatch = useAppDispatch();
// //   const [betRefresh, setRefreshStatus] = React.useState(false);
// //   const location = useLocation();

// //   /* ================= FETCH BETS ================= */
// //   React.useEffect(() => {
// //     if (
// //       (getCurrentMatch?.matchId && location.pathname.includes("/odds")) ||
// //       getCasinoCurrentMatch?.event_data?.match_id
// //     ) {
// //       const matchId =
// //         getCurrentMatch?.matchId && location.pathname.includes("/odds")
// //           ? getCurrentMatch.matchId
// //           : getCasinoCurrentMatch?.event_data?.match_id;

// //       betService.getBets(matchId).then((res) => {
// //         const bets = res?.data?.data?.bets || [];
// //         setMyAllBet(bets);
// //         dispatch(setbetlist(bets));
// //         dispatch(setBookMarketList(res.data.data.odds_profit));
// //         dispatch(setBetCount(bets.length));
// //       });
// //     }
// //   }, [getCurrentMatch, getCasinoCurrentMatch, betRefresh]);

// //   /* ================= REFRESH EVENTS ================= */
// //   React.useEffect(() => {
// //     if (getPlaceBet.bet.marketId) setRefreshStatus((p) => !p);
// //   }, [getPlaceBet.bet]);

// //     React.useEffect(() => {
// //     socketUser.on('placedBet', (bet: IBet) => {
// //       ///setMyAllBet([bet, ...getMyAllBet])
// //       setRefreshStatus(betRefresh ? false : true)
// //     })
// //     return () => {
// //       socketUser.off('placedBet')
// //     }
// //   }, [getMyAllBet])

// //   /* ================= GROUP ================= */
// //   const matchBets = getMyAllBet.filter((b: any) => b.bet_on === "MATCH_ODDS");
// //   const fancyBets = getMyAllBet.filter((b: any) => b.bet_on !== "MATCH_ODDS");

// //   const groupedFancyBets = fancyBets.reduce((acc: any, bet: IBet) => {
// //     const key = bet.selectionName || "Fancy";
// //     acc[key] = acc[key] || [];
// //     acc[key].push(bet);
// //     return acc;
// //   }, {});

// //   /* ================= MOBILE BLOCK VIEW ================= */
// //   const BetBlocks = () => (
// //     <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
// //       {matchBets.map((bet, i) => (
// //         <div
// //           key={bet._id}
// //           style={{
// //             background: bet.isBack ? "#cce7ff" : "#ffd6d6",
// //             borderLeft: `4px solid ${bet.isBack ? "#2196f3" : "#e53935"}`,
// //             borderRadius: 6,
// //             padding: 10,
// //             fontSize: 13,
// //           }}
// //         >
// //           <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
// //             <span>#{i + 1}</span>
// //             <span>{bet.isBack ? "Lagai" : "Khai"}</span>
// //           </div>

// //           <p><b>Selection:</b> {bet.selectionName}</p>
// //           <p><b>Rate:</b> {(bet.odds * 100 - 100).toFixed()}</p>
// //           <p><b>Amount:</b> {bet.stack}</p>
// //           <p><b>Status:</b> {bet?.result?.result || "YES"}</p>

// //           <div style={{ fontSize: 11, color: "#444" }}>
// //             {moment(bet.betClickTime).format("DD/MM/YYYY hh:mm A")}
// //           </div>
// //         </div>
// //       ))}

// //       {Object.keys(groupedFancyBets).map((runner) => (
// //         <div key={runner}>
// //           <div
// //             style={{
// //               background: "#11283e",
// //               color: "#fff",
// //               padding: "6px 10px",
// //               borderRadius: 4,
// //               margin: "10px 0 5px",
// //               fontWeight: 600,
// //             }}
// //           >
// //             {runner}
// //           </div>

// //           {groupedFancyBets[runner].map((bet: IBet, i: number) => (
// //             <div
// //               key={bet._id}
// //               style={{
// //                 background: bet.isBack ? "#cce7ff" : "#ffd6d6",
// //                 borderLeft: `4px solid ${bet.isBack ? "#2196f3" : "#e53935"}`,
// //                 borderRadius: 6,
// //                 padding: 10,
// //                 fontSize: 13,
// //                 marginBottom: 8,
// //               }}
// //             >
// //               <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
// //                 <span>#{i + 1}</span>
// //                 <span>{bet.isBack ? "Yes" : "No"}</span>
// //               </div>

// //               <p>
// //                 <b>Rate:</b>{" "}
// //                 {bet.gtype === "fancy1"
// //                   ? bet.odds.toFixed(2)
// //                   : bet.volume.toFixed(2)}
// //               </p>
// //               <p><b>Amount:</b> {bet.stack}</p>
// //               <p><b>Status:</b> {bet?.result?.result || "YES"}</p>
// //             </div>
// //           ))}
// //         </div>
// //       ))}
// //     </div>
// //   );

// //   /* ================= DESKTOP TABLE VIEW ================= */
// //   const BetTable = () => (
// //     <div style={{ maxHeight: 220, overflowY: "auto" }}>
// //       <table className="table coupon-table mybet">
// //         <thead>
// //           <tr style={{ background: "#76d68f" }}>
// //             <th>Sr</th>
// //             {userState.user.role !== RoleType.user && <th>User</th>}
// //             <th>Narration</th>
// //             <th>Rate</th>
// //             <th>Amount</th>
// //             <th>Mode</th>
// //             <th>Dec</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {getMyAllBet.map((bet, i) => (
// //             <tr key={bet._id} className={bet.isBack ? "back" : "lay"}>
// //               <td>{i + 1}</td>
// //               {userState.user.role !== RoleType.user && <td>{bet.userName}</td>}
// //               <td>{bet.selectionName}</td>
// //               <td>{(bet.odds * 100 - 100).toFixed()}</td>
// //               <td>{bet.stack}</td>
// //               <td>{bet.isBack ? "Yes" : "No"}</td>
// //               <td>{bet?.result?.result || "YES"}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );

// //   return (
// //     <>
// //       <h6 style={{ marginBottom: 10 }}>My Bets</h6>
// //       {getMyAllBet.length === 0 ? (
// //         <p style={{ textAlign: "center" }}>No Bets Found</p>
// //       ) : isMobile ? (
// //         <BetBlocks />
// //       ) : (
// //         <BetTable />
// //       )}
// //     </>
// //   );
// // };

// // export default MyBetComponent;


import moment from "moment-timezone";
import React from "react";
import { useWebsocketUser } from "../../../context/webSocketUser";
import IBet from "../../../models/IBet";
import { RoleType } from "../../../models/User";
import {
  selectPlaceBet,
  setBetCount,
  setbetlist,
  setBookMarketList,
} from "../../../redux/actions/bet/betSlice";
import { selectUserData } from "../../../redux/actions/login/loginSlice";
import { selectCurrentMatch } from "../../../redux/actions/sports/sportSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import betService from "../../../services/bet.service";
import { selectCasinoCurrentMatch } from "../../../redux/actions/casino/casinoSlice";
import { useLocation } from "react-router-dom";

const MyBetComponent = () => {
  const [bets, setBets] = React.useState<IBet[]>([]);
  const getPlaceBet = useAppSelector(selectPlaceBet);
  const getCurrentMatch = useAppSelector(selectCurrentMatch);
  const getCasinoCurrentMatch = useAppSelector(selectCasinoCurrentMatch);
  const userState = useAppSelector(selectUserData);
  const { socketUser } = useWebsocketUser();
  const dispatch = useAppDispatch();
  const [refresh, setRefresh] = React.useState(false);
  const location = useLocation();

  /* ================= FETCH BETS ================= */
  React.useEffect(() => {
    const matchId =
      getCurrentMatch?.matchId && location.pathname.includes("/odds")
        ? getCurrentMatch.matchId
        : getCasinoCurrentMatch?.event_data?.match_id;

    if (!matchId) return;

    betService.getBets(matchId).then((res) => {
      const data = res?.data?.data;
      setBets(data?.bets || []);
      dispatch(setbetlist(data?.bets || []));
      dispatch(setBookMarketList(data?.odds_profit || {}));
      dispatch(setBetCount(data?.bets?.length || 0));
    });
  }, [getCurrentMatch, getCasinoCurrentMatch, refresh]);

  React.useEffect(() => {
    if (getPlaceBet.bet.marketId) setRefresh((p) => !p);
  }, [getPlaceBet.bet]);

  React.useEffect(() => {
    const handler = () => setRefresh((p) => !p);

    socketUser.on("placedBet", handler);

    return () => {
      socketUser.off("placedBet", handler);
    };
  }, []);


  /* ================= SPLIT BETS ================= */
  const matchBets = bets.filter((b: any) => b.bet_on === "MATCH_ODDS");
  const fancyBets = bets.filter((b: any) => b.bet_on !== "MATCH_ODDS");

  const groupedFancy = fancyBets.reduce((acc: any, bet: IBet) => {
    const key = bet.selectionName || "Fancy";
    if (!acc[key]) acc[key] = [];
    acc[key].push(bet);
    return acc;
  }, {});

  /* ================= TABLE UI ================= */
  const TableHead = () => (
    <thead>
      <tr style={{ background: "#76d68f" }}>
        <th className="p-2">Sr</th>
        {/* {userState.user.role !== RoleType.user && <th className="p-2">User</th>} */}
        <th className="p-2">Narration</th>
        <th className="p-2">Rate</th>
        <th className="p-2">Amount</th>
        <th className="p-2">Mode</th>
        {/* <th className="p-2">Dec</th> */}
      </tr>
    </thead>
  );

  const TableHeadTwo = ({ runnerName }: { runnerName: string }) => (
    <thead>
      <tr style={{ background: "#76d68f" }}>
        <th className="p-2">Sr</th>
        <th className="p-2">{runnerName}</th>
        <th className="p-2">Rate</th>
        <th className="p-2">Amount</th>
        <th className="p-2">Mode</th>
        <th className="p-2">Dec</th>
      </tr>
    </thead>
  );

  const th: React.CSSProperties = {
    padding: "3px",
    textAlign: "center",
    border: "1px solid #ddd",
    fontWeight: 600,
    wordBreak: "break-word",
    whiteSpace: "normal",   // ⭐ wrap allow
  };

  const td: React.CSSProperties = {
    padding: "3px",
    textAlign: "center",
    border: "1px solid #ddd",
    wordBreak: "break-word",   // ⭐ text break
    whiteSpace: "normal",      // ⭐ wrap
  };



  return (
    <div className="table-responsive-new" style={{ maxHeight: 400, overflowY: "auto" }}>
      
      {/* ================= MATCH ODDS TABLE ================= */}
      {matchBets.length > 0 && (
        <table
          className="coupon-table mybet"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "11px",
            marginBottom: "8px",
          }}
        >
          <thead>
            <tr style={{ background: "#76d68f" }}>
              <th style={th}>Sr</th>
              <th style={th}>Team</th>
              <th style={th}>Rate</th>
              <th style={th}>Amount</th>
              <th style={th}>Mode</th>
              {/* <th style={th}>Dec</th> */}
            </tr>
          </thead>
          <tbody>
            {matchBets.map((bet, i) => (
              <tr key={bet._id} className={bet.isBack ? "back" : "lay"}>
                <td style={td}>{i + 1}</td>
                <td style={td}>{bet.selectionName}</td>
                <td style={td}>{(bet.odds * 100 - 100).toFixed()}</td>
                <td style={td}>{bet.stack}</td>
                <td style={td}>{bet.isBack ? "LAGAI" : "KHAI"}</td>
                {/* <td style={td}>{bet?.result?.result || "YES"}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ================= FANCY TABLE ================= */}
      {Object.keys(groupedFancy).map((runner) => (
        <table
          key={runner}
          className="coupon-table mybet"
          style={{
            width: "100%",
            tableLayout: "fixed",      // ⭐ MOST IMPORTANT
            borderCollapse: "collapse",
            fontSize: "10px",          // chhota font
            marginBottom: "10px",
          }}
        >

          <thead>
            <tr style={{ background: "#76d68f" }}>
              <th style={th}>Sr</th>
              <th style={th}>{runner}</th>
              <th style={th}>Rate</th>
              <th style={th}>Amount</th>
              <th style={th}>Run</th>
              <th style={th}>Mode</th>
              <th style={th}>Dec</th>
            </tr>
          </thead>

          <tbody>
            {groupedFancy[runner].map((bet: IBet, i: number) => (
              <tr key={bet._id} className={bet.isBack ? "back" : "lay"}>
                <td style={td}>{i + 1}</td>
                <td style={td}>{bet.selectionName}</td>
                <td style={td}>
                  {bet.gtype === "fancy1"
                    ? bet.odds.toFixed(2)
                    : bet.volume.toFixed(2)}
                </td>
                <td style={td}>{bet.stack}</td>
                <td style={td}>{bet.odds}</td>
                <td style={td}>{bet.isBack ? "YES" : "NO"}</td>
                <td style={td}>{bet?.result?.result || "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}

    </div>
  );
};

export default MyBetComponent;


