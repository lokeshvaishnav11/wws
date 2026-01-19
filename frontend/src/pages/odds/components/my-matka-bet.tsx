import moment from 'moment'
import React from 'react'
import { useWebsocketUser } from '../../../context/webSocketUser'
import IBet from '../../../models/IBet'
import { RoleType } from '../../../models/User'
import { selectPlaceBet, setBetCount, setbetlist, setBookMarketList } from '../../../redux/actions/bet/betSlice'
import { selectUserData } from '../../../redux/actions/login/loginSlice'
import { selectCurrentMatch } from '../../../redux/actions/sports/sportSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { betDateFormat } from '../../../utils/helper'
import { isMobile } from 'react-device-detect'
import { selectCasinoCurrentMatch } from '../../../redux/actions/casino/casinoSlice'
import { useLocation, useParams } from 'react-router-dom'
import accountService from '../../../services/account.service'
import { send } from 'process'

const MyMatkaBetComponent22 = ({ roundid }: any) => {
  const [getMyAllBet, setMyAllBet] = React.useState<IBet[]>([])

  const getPlaceBet = useAppSelector(selectPlaceBet)
  const getCurrentMatch = useAppSelector(selectCurrentMatch)
  const getCasinoCurrentMatch = useAppSelector(selectCasinoCurrentMatch)
  const userState = useAppSelector(selectUserData)
  const { socketUser } = useWebsocketUser()
  const dispatch = useAppDispatch()
  const [betRefresh, setRefreshStatus] = React.useState<any>(false)
  const location = useLocation();

  const { matchId } = useParams(); // 👈 URL se matchId

  const [matkaList, setMatkaList] = React.useState<any>([])
    
  
  
    // React.useEffect(() => {
    //     const fetchMatkaList = async () => {
    //       try {
    //         const res = await accountService.matkagamelist();
    //         console.log(res?.data?.data, "ffff");
    //         setMatkaList(res?.data?.data);
    //       } catch (err) {
    //         console.error("Matka list error:", err);
    //       }
    //     };
      
    //     fetchMatkaList();
    //   }, [matchId]);
  
  
  
  
  
    // ✅ matching item nikaalo

    React.useEffect(() => {
        const fetchMatkaList = async () => {
          try {
            const res = await accountService.matkagamelist();
            setMatkaList(res?.data?.data || []);
          } catch (err) {
            console.error("Matka list error:", err);
          }
        };
      
        fetchMatkaList();
      }, [matchId]);
      
 
      React.useEffect(() => {
        if (!matkaList.length) return;
      
        const match = matkaList.find((item: any) => item.id == matchId);
      
        if (!match?.roundid) return;
      
        accountService
          .getMatkaBets22(match.roundid)
          .then((res) => {
            setMyAllBet(res?.data?.data?.bets || []);
          })
          .catch((e) => console.error(e));
      }, [matkaList, matchId]);
      

  // ✅ Group bets by selectionName
const groupedMyAllBet = getMyAllBet?.reduce((acc: any, bet: any) => {
  const key = bet.selectionName || "Unknown"
  if (!acc[key]) acc[key] = []
  acc[key].push(bet)
  return acc
}, {}) || {}

React.useEffect(() => {
    if (getPlaceBet?.bet?.marketId) {
      setRefreshStatus((prev: boolean) => !prev);
    }
  }, [getPlaceBet.bet]);
  

  React.useEffect(() => {
    socketUser.on('placedBet', (bet: IBet) => {
      ///setMyAllBet([bet, ...getMyAllBet])
      setRefreshStatus(betRefresh ? false : true)
    })
    return () => {
      socketUser.off('placedBet')
    }
  }, [getMyAllBet])

  React.useEffect(() => {
    socketUser.on('betDelete', ({ betId }) => {
      ///setMyAllBet(getMyAllBet.filter((bet: IBet) => bet._id !== betId))
      setRefreshStatus(betRefresh ? false : true)
      ///dispatch(setBookMarketList({}))
    })
    return () => {
      socketUser.off('betDelete')
    }
  }, [getMyAllBet])

  return (
   <>{roundid  && 
    
    <>
    <h6 className="p-2 w-100 m-0 bg-info text-white text-center">Matka Bets</h6>

   <div className='table-responsive-new' style={{height:"200px", overflowY:"scroll"}}>
      <table className='table coupon-table scorall mybet'>
        <thead>
          <tr style={{background:"#76d68f"}}>
            <th> Sr. </th>
            {userState.user.role !== RoleType.user && <th>Username</th>}
            <th className='text-center'> Narration</th>
            <th className='text-center'> Rate</th>
            <th className='text-center'> Amount</th>
            <th className='text-center'> Selection</th>
            <th className='text-center'> Type</th>



            {/* {!isMobile && <th style={{background:"#76d68f"}}> Place Date</th>} */}
            {/* {!isMobile && <th style={{background:"#76d68f"}}> Match Date</th>} */}
            {/* <th className='text-center'> Dec</th> */}
            <th className='text-center'>Date</th>
          </tr>
        </thead>
      <tbody className='scorall'>
      {Object.keys(groupedMyAllBet).map((roundid: string, groupIndex: number) => (
    <React.Fragment key={roundid}>
      {/* Group Header Row */}
      {/* <tr>
        <td colSpan={8} style={{ backgroundColor:"rgb(17, 40, 62)", color: "white", padding: "8px 10px", textAlign: "left" }}>
          {roundid}dd
        </td>
      </tr> */}

      {/* Grouped Bets */}
      {groupedMyAllBet[roundid]?.map((bet: any, index: number) => (
        <tr
          key={bet._id}
          className={Number(bet.profitLoss?.$numberDecimal) < 0 ? 'bg-danger text-white' : 'bg-success'}
        >
          <td className='no-wrap text-center'>{index + 1}</td>
          {userState.user.role !== RoleType.user && <td>{bet?.userName}</td>}

          <td className='no-wrap text-center'>
            {bet?.roundid}
          </td>

          <td className='no-wrap text-center'>
            {bet.odds}
          </td>

          <td className='no-wrap text-center'>
            {bet.betamount}
          </td>

          <td className='no-wrap text-center'>
            {bet.selectionId}
          </td>


          <td className='no-wrap text-center'>
            {bet?.bettype}
          </td>

          <td className='no-wrap text-center'>
            {moment
              .utc(bet.betClickTime)
              .format('DD/MM/YYYY hh:mm:ss A')}
          </td>
        </tr>
      ))}
    </React.Fragment>
  ))}
</tbody>

      </table>
    </div>
    </>}</>
  )
}

export default MyMatkaBetComponent22
