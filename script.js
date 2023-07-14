let ai_response;
let chat = [
  { role: "user", content: "Hi" },
  { role: "assistant", content: "Hi, how i can help you today" },
];

async function ChatUserAdd(feeling, question) {
  chat.push({
    role: "user",
    content: "My Happines from 0-10. " + feeling + " . My question is ",
    question,
  });
}

async function ChatAssitantAdd(res) {
  chat.push({ role: "assistant", content: res });
}
async function openai_test() {
  let url = "https://api.openai.com/v1/chat/completions";
  let part1 = "sk";
  let part2 = "-LLDtZIQbt300rIyi";
  let part3 = "Bm5LT3BlbkFJwntYQJzMl3xlkgLt63pM";

  let apikey = part1 + part2 + part3;

  let data = {
    model: "gpt-3.5-turbo",
    messages: chat,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apikey}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      const message = responseData.choices[0].message.content;

      ChatAssitantAdd(message);
      const speech = new SpeechSynthesisUtterance(message);
      console.log(document.getElementById("languages").value);
      speech.lang = document.getElementById("languages").value;
      // speech.lang = document.getElementById('languages').value.options[document.getElementById('languages').value].text
      console.log(speech.lang);
      speechSynthesis.speak(speech);
      return message;
    }
  } catch (error) {
    console.log(" error: " + error);
  }
}
