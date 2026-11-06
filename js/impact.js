const WEEKS_PER_MONTH=52/12;

export function estimateIncome({tables,weeklyReservations,noShowPercent,averageSpend,deposit,reductionPercent}){
 const values={tables,weeklyReservations,noShowPercent,averageSpend,deposit,reductionPercent};
 if(Object.values(values).some(value=>!Number.isFinite(Number(value))||Number(value)<0))throw new RangeError('Usa valores numéricos iguales o mayores a cero.');
 if(!Number.isInteger(Number(tables))||Number(tables)<1)throw new RangeError('Indica al menos una mesa.');
 if(!Number.isInteger(Number(weeklyReservations)))throw new RangeError('Las reservas semanales deben ser un número entero.');
 if(!Number.isInteger(Number(averageSpend))||!Number.isInteger(Number(deposit)))throw new RangeError('El consumo y el anticipo deben ser valores enteros en COP.');
 if(Number(noShowPercent)>100||Number(reductionPercent)>100)throw new RangeError('Los porcentajes deben estar entre 0 y 100.');

 const monthlyReservations=Number(weeklyReservations)*WEEKS_PER_MONTH;
 const expectedNoShows=monthlyReservations*Number(noShowPercent)/100;
 const capacityPerMonth=Number(tables)*WEEKS_PER_MONTH;
 const recoveredTablesMonthly=Math.min(
  Math.round((expectedNoShows*Number(reductionPercent)/100)*10)/10,
  capacityPerMonth
 );
 const remainingNoShows=expectedNoShows-recoveredTablesMonthly;
 const monthlyRecoveredRevenue=Math.round(recoveredTablesMonthly*Number(averageSpend));
 return{
  monthlyReservations,
  recoveredTablesMonthly,
  monthlyRecoveredRevenue,
  annualRecoveredRevenue:monthlyRecoveredRevenue*12,
  possibleRetainedDepositsMonthly:Math.round(remainingNoShows*Number(deposit))
 }
}
