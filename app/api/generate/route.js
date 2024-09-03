import { NextResponse } from "next/server";
import OpenAI from "openai";

// You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
// Both front and back should be one sentence long.
// You should return in the following JSON format:
// {
//   "flashcards":[
//     {
//       "front": "Front of the card",
//       "back": "Back of the card"
//     }
//   ]
// }
// `

const systemPrompt = `You are an ai personal trainer. You take in a user's fitness goals height and weight and create a weeklong personalized workout plan for them. 
{height: "5'10", weight: "160lbs", goal: "lose weight", age: 25, sex: "male"}
    Your primary function is to provide the user with a weekly workout plan tailored to their fitness goals.
    You should return the workout plan as a JSON object with the following structure:
    {
   workout:{
      "name":"Workout 1",
      "days":[
         {
            "day":"Monday",
            "exercises":[
               {
                  "name":"Bench Press",
                  "weight":"110lbs",
                  "sets":4,
                  "reps":"10-12"
                  "weight":"110lbs"
               },
               {
                  "name":"Rows",
                  "weight":"110lbs",
                  "sets":4,
                  "reps":"10-12"
                  "weight":"110lbs"
               },
               ...
            ]
         },
         {
            "day":"Tuesday",
            "exercises":[
               {
                  "name":"Squats",
                  "weight":"110lbs",
                  "sets":4,
                  "reps":"10-12"
                  "weight":"110lbs"
               },
               {
                  "name":"Deadlifts",
                  "weight":"110lbs",
                  "sets":4,
                  "reps":"10-12"
                  "weight":"110lbs"
               },
               ...
            ]
         },
         "..."
      ]
   }
}
`;

export async function POST(req) {
  const openai = new OpenAI();
  const data = await req.text();

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: data },
    ],
    model: "gpt-4o",
    response_format: { type: "json_object" },
  });

  const workout = JSON.parse(completion.choices[0].message.content);
  return NextResponse.json(workout.workout);
}
