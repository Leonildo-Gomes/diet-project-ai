"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DietData } from "@/types/diet-data.type";
import { Loader, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

export function DietGenerator( {data}: {data: DietData} ) {
    const [output, setOutput] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);

    const controllerRef = useRef<AbortController | null>(null);

    async function startStreaming() {
        const controller = new AbortController();
        controllerRef.current = controller;
        setIsStreaming(true);
        setOutput("");
        try {
            const response = await fetch("http://localhost:3333/plan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    nome: data.nome,
                    idade: data.idade,
                    altura_cm: data.altura_cm,
                    peso_kg: data.peso_kg,
                    sexo: data.sexo,
                    nivel_atividade: data.nivel_atividade,
                    objetivo: data.objetivo
                 }),
                // permite cancelar a requisicao a qualquer momento
                signal: controller.signal,   
            })
            const reader = response.body?.getReader();
            if (!reader) {
                return;
            }
            const decoder = new TextDecoder("utf-8");
            
            while (true) {
                const { value, done } = await reader!.read();
                if (done) {
                    break;
                }
                //const chunkString = decoder.decode(value);
                setOutput(prev => prev + decoder.decode(value));
            }
            
        }catch (error) {
            if (error instanceof Error && error.name === "AbortError") {
                console.log("fetch aborted"); // ignore abort error
            } 
            console.error(error);
            
        }finally {
            setIsStreaming(false);
            controllerRef.current = null;
        }
        
        
       
        
    }
    async function handleGenerate( ) {
        if(isStreaming) {
            controllerRef.current?.abort();
            setIsStreaming(false);
            return;
        }
        await startStreaming();
        
    }
    return (
        <div className="min-h-screen flex  flex-col items-center justify-center p-4"> 
            <Card className="w-full max-w-4xl border-0 p-4 md:p-6">
                <div className="flex justify-center gap-4">
                    <Button className="cursor-pointer gap-2" size="lg" onClick={handleGenerate} >
                         { isStreaming ? <Loader className="mr-2 h-6 w-6 animate-spin"  /> :  <Sparkles className="mr-2 h-6 w-6" />} 
                       
                       { isStreaming ? "Parar dieta" : "Gerar dieta"} 
                    </Button>
                </div>
                {output && (
                    <div className="bg-card rounded-lg  p-6 border border-border max-h-[500px] overflow-y-auto">
                    <div className="prose prose-sm max-w-none">
                        <ReactMarkdown
                                        components={{
                            h2: ({ node, ...props }) => (
                                <h2
                                className="text-xl font-bold text-green-600 my-1"
                                {...props}
                                />
                            ),
                            h1: ({ node, ...props }) => (
                                <h1
                                className="text-2xl font-bold text-zinc-900 mb-1"
                                {...props}
                                />
                            ),
                            }}
                        >
                            {output}
                        </ReactMarkdown>
                    </div>
                </div>   
                )}
                
            
            </Card>
        </div>
    )
    
}