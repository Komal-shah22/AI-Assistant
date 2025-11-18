// import axios from 'axios';
// const geminiResponse =async(command,assistantName,userName) => {
//   try {
//     const apiUrl = process.env.GEMINI_API_URL
//     const prompt =`you are a virtual assistant named ${assistantName} created by ${userName}. you are not google  .you will now behave like a voice-enabled assistant. your task is to understand the user's natural language input and respond with a JSON object like this:
//     {
//     'type':'general'| 'google_search' | 'youtube_search' | 'youtube_play' | 'get_time' | 'get_date' | 'get_day' | 'get_month'| 'calculator-open' | 'instagram_open'| 'facebook_open' | 'weather_show'|, 'userinput':"<original user input>" {only remove your name from the user input if exists } and agar kisi ne google ya youtube pe kuch search karnay ka bola hai to userinput me only bo search baala text jayee,'response': '<a short spoken response to read out load to the user>' }
//     Instructions:
//     - 'type': determine the intent of the user.
//     - 'userinput': original sentence the user spoke.
//     - 'response': A short voice-friendly reply , e.g , ' sure , playing it now', 'here's what I found', 'today is tuesday', etc.
    
//     type meanings:
//     - 'general': if its a factual information question.
//     - 'google_search': when user asks to search something on google.
//     - 'youtube_search': when user asks to search something on youtube.
//     - 'youtube_play': when user asks to play a specific video on youtube.
//     - 'get_time': when user asks for current time.
//     - 'get_date': when user asks for today's date.
//     - 'get_day': when user asks for current day.
//     - 'get_month': when user asks for current month.
//     - 'calculator_open': when user asks to open calculator.
//     - 'instagram_open': when user asks to open instagram.
//     - 'facebook_open': when user asks to open facebook.
//     - 'weather_show': when user asks for current weather.
//     Make sure the JSON is properly formatted. Here is the user input: 

//     Important: 
//     - use '{author name}' agar koi puchay tume kis ne banaya hai
//     - only respond in JSON format,nothing else.

//     now your userInput is : ${command}

//     `
//     const result = await axios.post(apiUrl,{
//         'contents':[{
//             'parts':[{'text': prompt}]
//         }]
//     })
//     return result.data.candidates[0].content.parts[0].text;
//     } catch (error) {   
//         console.error("❌ Error generating content with Gemini API:", error.response?.data || error.message);
//         throw new Error("Failed to generate content");
//     }
// };
// export default geminiResponse;




// import axios from 'axios';

// const geminiResponse = async (command, assistantName, userName) => {
//   try {
//     const apiUrl = process.env.GEMINI_API_URL;

//     const prompt = `
// You are a virtual assistant named ${assistantName}, created by ${userName}. You are not Google.
// You behave like a voice-enabled assistant. Your job is to understand the user's natural language input and respond ONLY with a JSON object like this:

// {
//   "type": "general" | "google_search" | "youtube_search" | "youtube_play" | "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" | "instagram_open" | "facebook_open" | "weather_show",
//   "userinput": "<original user input, but remove your name if it appears. For Google/Youtube search, only include the search text>",
//   "response": "<a short spoken response, e.g., 'Sure, playing it now', 'Here’s what I found', 'Today is Tuesday'>"
// }

// Instructions:
// - "type": Determine the user’s intent.
// - "userinput": Keep original sentence, cleaned as described above.
// - "response": Give a short, natural voice-friendly sentence.

// Type meanings:
// - general → factual or casual question
// - google_search → user asks to search something on Google
// - youtube_search → user asks to search something on YouTube
// - youtube_play → user asks to play a specific video
// - get_time → user asks for current time
// - get_date → user asks for today’s date
// - get_day → user asks for current day
// - get_month → user asks for current month
// - calculator_open → open calculator
// - instagram_open → open Instagram
// - facebook_open → open Facebook
// - weather_show → show current weather

// Important:
// - Use ${userName} if someone asks who created you.
// - Respond **only in JSON format**, nothing else.

// User input: ${command}
//     `;

//     const result = await axios.post(apiUrl, {
//       contents: [
//         {
//           parts: [{ text: prompt }],
//         },
//       ],
//     });

//     return result.data.candidates[0].content.parts[0].text;
//   } catch (error) {
//     console.error("❌ Error generating content with Gemini API:", error.response?.data || error.message);
//     throw new Error("Failed to generate content");
//   }
// };

// export default geminiResponse;





import axios from 'axios';

const geminiResponse = async (command, assistantName, userName) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL;

    const prompt = `
You are a virtual assistant named ${assistantName}, created by ${userName}. You are not Google.
You behave like a voice-enabled assistant. Your job is to understand the user's natural language input and respond ONLY with a JSON object.

The JSON object must always have this structure:

{
  "type": "general" | "google_search" | "youtube_search" | "youtube_play" | "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" | "instagram_open" | "facebook_open" | "weather_show",
  "userinput": "<the cleaned user input>",
  "response": "<a short voice-friendly answer, e.g., 'Sure, done', 'Here’s what I found', 'Today is Tuesday'>"
}

Rules:
- "type": Determine intent. If unsure or question is general knowledge or casual chat, use "general".
- "userinput": Keep the user's original input, but remove your assistant name if it appears. For searches (Google/YouTube), include only the query.
- "response": Always give a short, natural sentence suitable for speech.

Type meanings:
- general → answer any question that is not a web search or specific app command
- google_search → user asks to search on Google
- youtube_search → user asks to search on YouTube
- youtube_play → user asks to play a specific YouTube video
- get_time → ask for current time
- get_date → ask for current date
- get_day → ask for current day
- get_month → ask for current month
- calculator_open → open calculator
- instagram_open → open Instagram
- facebook_open → open Facebook
- weather_show → show current weather

Important:
- Always respond **only in JSON format**, nothing else.
- If the question is unknown, make your best attempt to answer under "general".
- Use ${userName} if someone asks who created you.

User input: ${command}
    `;

    const result = await axios.post(apiUrl, {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });

    return result.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error(
      "❌ Error generating content with Gemini API:",
      error.response?.data || error.message
    );
    throw new Error("Failed to generate content");
  }
};

export default geminiResponse;
