import { useState, useEffect } from 'react';

const GOALS: any = {
  7: "Just a week away from a great start! Let's hit that first milestone.",
  10: "Aim for double digits! You're closer than you think.",
  14: "Two weeks is just around the corner. Your dedication can make it happen!",
  30: "A month of consistency is within reach. What an achievement that will be!",
  45: "Keep up the great work to form lasting habits by reaching 45 days.",
  60: "Two months of commitment is inspiring. You're almost there!",
  75: "Every day brings new challenges. Push through to make it to 75 days.",
  90: "Ninety days of progress is within your grasp. Truly remarkable!",
  120: "Four months is a significant milestone. Your journey can inspire many!",
  150: "Aim for five months of dedication. You have what it takes to be unstoppable.",
  200: "200 days is a testament to resilience. Keep going strong!",
  250: "You're growing every day. Set your sights on 250 days for an incredible achievement.",
  300: "300 days is not far off. Stay focused and keep pushing forward.",
  365: "A year of transformation is a monumental goal. Let's make this incredible journey together."
};

const GOAL_DAYS = [
  7, 10, 14, 30, 45, 60, 75, 90, 120, 150, 200, 250, 300, 365
]



export default function DayStreakTracker({streak}: {streak: number}) {
  // State to track the number of days in the streak.
  const [nextGoal, setNextGoal] = useState(7)
  const [nextGoalMessage, setNextGoalMessage] = useState('')

  useEffect(() => {
    calculateNextGoal(streak)
  }, [streak])

  function calculateNextGoal(streak: number) {
    const eligibleDays = GOAL_DAYS.filter((days) => days > streak)

    const closest = Math.min(...eligibleDays)
    
    setNextGoal(closest)
    setNextGoalMessage(GOALS[closest])
  }
  
  return (
    <div className="flex items-center flex-col justify-center p-4 bg-emerald-200 shadow-md rounded-lg my-4">
      <h2 className="text-2xl text-emerald-300 font-bold" style={{textShadow: 'green 0px 0px 2px'}}>
        <span className="text-emerald-800">Day Streak 🔥:</span>{' '}
        <span className="text-emerald-900">{streak}</span>
      </h2>
      <br/>
      <h3 className="text-xl text-emerald-800 font-bold" style={{textShadow: 'green 0px 0px 2px'}}>Next Goal: {nextGoal}</h3>
      <h3 className="text-md text-emerald-800" style={{textShadow: 'green 0px 0px 1px'}}>{nextGoalMessage}</h3>

      {GOAL_DAYS.includes(streak) ? <>🎉 Congrats for hitting your streak! On to the next!</> : null}
    </div>
  );
}