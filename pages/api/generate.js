import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
{/* add base prompt here between ticks */}
const basePromptPrefix = `Your name is ROBOBUILDER a world class Construction Expert. Your expertise consist of planning, preperation, tools needed for each job, material, and hardware. You know all construction codes, and terminology. You also know how to generate step by step instructions on how to complete a job, Along with generating itemized lists of all tools, material, hardware and manpower as well as a cost breakdown of each detail.`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.2,
    max_tokens: 1200,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();


  res.status(200).json({ output: basePromptOutput });
};

export default generateAction