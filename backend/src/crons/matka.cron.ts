
import cron from "node-cron";
import Matkagame from "../models/Matkagames";
import Matka from "../models/Matka";
import { IMatkagame } from "../models/Matkagames";
import { IMatka } from "../models/Matka";

// export const startMatkaCron = () => {cron.schedule("* * * * *", async () => {

//   try {
//     console.log("⏱ Matka cron running...");
//     const now = new Date();
//     const minutesNow = now.getHours() * 60 + now.getMinutes();

//     // today 00:00
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     // const matkas = await Matka.find({});
//         const matkas = [{
//   opentime: { hour: 9, minute: 0 },
//   closetime: { hour: 3, minute: 0 },
//    _id: "6964e9807c22caf6c6ca303b",
//    gamename: 'Dishawar',
//    id: '4',
//   isActive: false,
//    isNextDayClose: true
//  },{
//   opentime: { hour: 11, minute: 2 },
//   closetime: { hour: 3, minute: 0 },
//    _id:" 6964e9807c22caf6c6ca303b",
//    gamename: 'Fridabad',
//    id: '1',
//   isActive: false,
//    isNextDayClose: true
//  }]


//     console.log(`Found ${matkas.length} matka games to process.`);

//     for (const m of matkas) {
//       const openMin = Number(m.opentime.hour) * 60 + Number(m.opentime.minute);
//       const closeMin = Number(m.closetime.hour) * 60 + Number(m.closetime.minute);

//       // ---------- OPEN LOGIC ----------
//       const isOpenTime =
//         openMin < closeMin
//           ? minutesNow === openMin
//           : minutesNow === openMin; // next-day handled by close
//     console.log(m,isOpenTime, minutesNow, openMin, closeMin);
//       if (isOpenTime) {
//         const exists = await Matkagame.findOne({
//           id: m.id,
//           date: today,
//         });

//         if (!exists) {
//           await Matkagame.create({
//             id: m.id,
//             gamename: m.gamename,
//             Date: today,
//             opentime: m.opentime,
//             closetime: m.closetime,
//             isActive: true,
//             result: "pending",
//             roundid: `${m.gamename}-${today.toISOString().split("T")[0]}`,
//           });

//           console.log(`🟢 OPENED: ${m.gamename}`);
//         }
//       }

//       // ---------- CLOSE LOGIC ----------
//       const isCloseTime =
//         openMin < closeMin
//           ? minutesNow === closeMin
//           : minutesNow === closeMin; // Dishawar 3 AM

//       if (isCloseTime) {
//         await Matkagame.updateMany(
//           {
//             id: m.id,
//             isActive: true,
//           },
//           { $set: { isActive: false } }
//         );

//         console.log(`🔴 CLOSED: ${m.gamename}`);
//       }
//     }
//   } catch (err) {
//     console.error("CRON ERROR:", err);
//   }
// })};



// const getISTNow = () =>
//   new Date(Date.now() + 5.5 * 60 * 60 * 1000);

// const getISTMinutes = () => {
//   const d = getISTNow();
//   return d.getHours() * 60 + d.getMinutes();
// };

// const getISTDateOnly = () => {
//   const d = getISTNow();
//   d.setHours(0, 0, 0, 0);
//   return d;
// };

// const getISTDateString = () => {
//   return getISTNow().toISOString().split("T")[0];
// };

// export const startMatkaCron = () => {
//   cron.schedule("* * * * *", async () => {
//     try {
//       console.log("⏱ Matka cron running (IST)...");

//       const minutesNow = getISTMinutes();
//       const today = getISTDateOnly();
//       const todayStr = getISTDateString();

//       const matkas = [
//         // ✅ FARIDABAD
//         {
//           opentime: { hour: 9, minute: 0 },   // 09:00 AM
//           closetime: { hour: 17, minute: 15 }, // 05:15 PM
//           gamename: "Faridabad",
//           id: "1",
//           isNextDayClose: false,
//         },
      
//         // ✅ GHAZIABAD
//         {
//           opentime: { hour: 9, minute: 0 },   // 09:00 AM
//           closetime: { hour: 20, minute: 15 }, // 08:15 PM
//           gamename: "Ghaziabad",
//           id: "2",
//           isNextDayClose: false,
//         },
      
//         // ✅ GALI
//         {
//           opentime: { hour: 9, minute: 0 },   // 09:00 AM
//           closetime: { hour: 22, minute: 30 }, // 10:30 PM
//           gamename: "Gali",
//           id: "3",
//           isNextDayClose: false,
//         },
      
//         // ✅ DISAWAR (next day close)
//         {
//           opentime: { hour: 9, minute: 0 },   // 09:00 AM
//           closetime: { hour: 3, minute: 0 },  // 03:00 AM (next day)
//           gamename: "Disawar",
//           id: "4",
//           isNextDayClose: true,
//         },
//       ];
      

//       for (const m of matkas) {
//         const openMin =
//           Number(m.opentime.hour) * 60 +
//           Number(m.opentime.minute);

//         let closeMin =
//           Number(m.closetime.hour) * 60 +
//           Number(m.closetime.minute);

//         // 🔥 next-day close fix
//         if (m.isNextDayClose && closeMin < openMin) {
//           closeMin += 1440; // add 24h
//         }

//         let currentMin = minutesNow;
//         if (m.isNextDayClose && minutesNow < openMin) {
//           currentMin += 1440;
//         }

//         console.log(
//           m.gamename,
//           "NOW:", currentMin,
//           "OPEN:", openMin,
//           "CLOSE:", closeMin
//         );

//         // ---------- OPEN ----------
//         if (currentMin === openMin) {
//           const exists = await Matkagame.findOne({
//             id: m.id,
//             date: today,
//           });

//           if (!exists) {
//             await Matkagame.create({
//               id: m.id,
//               gamename: m.gamename,
//               date: today,
//               opentime: m.opentime,
//               closetime: m.closetime,
//               isActive: true,
//               result: "pending",
//               roundid: `${m.gamename}-${todayStr}`, // ✅ IST
//             });

//             console.log(`🟢 OPENED: ${m.gamename}`);
//           }
//         }

//         // ---------- CLOSE ----------
//         if (currentMin === closeMin) {
//           await Matkagame.updateMany(
//             { id: m.id, isActive: true },
//             { $set: { isActive: false } }
//           );

//           console.log(`🔴 CLOSED: ${m.gamename}`);
//         }
//       }
//     } catch (err) {
//       console.error("CRON ERROR:", err);
//     }
//   });
// };


const getISTMinutes = () => {
  const now = new Date();

  const hours = now.getUTCHours();
  const minutes = now.getUTCMinutes();

  const istMinutes =
    ((hours * 60 + minutes) + 330) % 1440;

  return istMinutes;
};

const getISTDateOnly = () => {
  const now = new Date();
  const ist = new Date(now.getTime() + 330 * 60 * 1000);
  ist.setHours(0, 0, 0, 0);
  return ist;
};

const getISTDateString = () => {
  const now = new Date();
  const ist = new Date(now.getTime() + 330 * 60 * 1000);
  return ist.toISOString().split("T")[0];
};



export const startMatkaCron = () => {
  cron.schedule("* * * * *", async () => {
    try {
      console.log("⏱ Matka cron running (IST)...");

      const minutesNow = getISTMinutes();
      const today = getISTDateOnly();
      const todayStr = getISTDateString();

      const matkas = [
        {
          opentime: { hour: 9, minute: 0 },
          closetime: { hour: 17, minute: 15 },
          gamename: "Faridabad",
          id: "1",
          isNextDayClose: false,
        },
        {
          opentime: { hour: 9, minute: 0 },
          closetime: { hour: 20, minute: 15 },
          gamename: "Ghaziabad",
          id: "2",
          isNextDayClose: false,
        },
        {
          opentime: { hour: 9, minute: 0 },
          closetime: { hour: 22, minute: 30 },
          gamename: "Gali",
          id: "3",
          isNextDayClose: false,
        },
        {
          opentime: { hour: 9, minute: 0 },
          closetime: { hour: 3, minute: 0 },
          gamename: "Disawar",
          id: "4",
          isNextDayClose: true,
        },
      ];

      for (const m of matkas) {
        const openMin =
          m.opentime.hour * 60 + m.opentime.minute;

        let closeMin =
          m.closetime.hour * 60 + m.closetime.minute;

        if (m.isNextDayClose && closeMin < openMin) {
          closeMin += 1440;
        }

        let currentMin = minutesNow;
        if (m.isNextDayClose && minutesNow < openMin) {
          currentMin += 1440;
        }

        console.log(
          m.gamename,
          "NOW:", currentMin,
          "OPEN:", openMin,
          "CLOSE:", closeMin
        );

        // OPEN
        if (currentMin === openMin) {
          const exists = await Matkagame.findOne({
            id: m.id,
            date: today,
          });

          if (!exists) {
            await Matkagame.create({
              id: m.id,
              gamename: m.gamename,
              date: today,
              opentime: m.opentime,
              closetime: m.closetime,
              isActive: true,
              result: "pending",
              roundid: `${m.gamename}-${todayStr}`,
            });

            console.log(`🟢 OPENED: ${m.gamename}`);
          }
        }

        // CLOSE
        if (currentMin === closeMin) {
          await Matkagame.updateMany(
            { id: m.id, isActive: true },
            { $set: { isActive: false } }
          );

          console.log(`🔴 CLOSED: ${m.gamename}`);
        }
      }
    } catch (err) {
      console.error("CRON ERROR:", err);
    }
  });
};
