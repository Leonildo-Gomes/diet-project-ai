import OpenAI from "openai";

import fs from 'fs';
import { buildSystemPrompt, buildUserPrompt ,buildDocsSystemPrompt} from './prompt';
import type { DietPlanRequest } from './types';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string,
    timeout: 2*60*1000,
    logLevel: 'debug'
})
export async function* generateDietPlan(input: DietPlanRequest) {
    const diretrizes=fs.readFileSync('knowledge/diretrizes.md', 'utf-8');
    
     const stream= await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {role: "system", content: buildSystemPrompt()},
            {role: "user", content: buildUserPrompt(input)},
            {role: "system", content: buildDocsSystemPrompt(diretrizes)},
        ],
        temperature: 0.6,
        stream: true
     });

      for await (const part of stream) {
        const delta = part.choices[0]?.delta?.content;
        if (delta) {
            yield delta;
        }
    }
    //return "OK";
   
}    
/*
 - stream:false > O modelo pensa, gera toda a resposta inteira, e só depois te devolve.
 - stream:true > O modelo pensa, gera a resposta parcialmente, e te devolve a cada vez que tem uma nova parte.
*/