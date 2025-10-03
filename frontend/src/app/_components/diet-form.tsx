"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select } from '@radix-ui/react-select';
import { Utensils } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';


const dietFormSchema = z.object({
  nome: z.string().min(2,"O nome deve ter no mínimo 2 caracteres"),
  idade: z.number().int().positive(),
  altura_cm: z.number().positive(),
  peso_kg: z.number().positive(),
  sexo: z.enum(["masculino", "feminino"], { error: "O sexo é obrigatório" }),
  nivel_atividade: z.enum(["sedentario", "2x_semana", "4x_semana"], { error: "O nível de atividade é obrigatório" }),
  objetivo: z.enum(["perda_de_peso", "hipertrofia", "manter_massa_muscular"], { error: "O objetivo é obrigatório" }),
})

export type DietSchemaFormData = z.infer<typeof dietFormSchema>

interface DietFormProps {
  onSubmit: (data: DietSchemaFormData) => void
}
export function DietForm({onSubmit }: DietFormProps) {
  const form= useForm<DietSchemaFormData>({
      resolver: zodResolver(dietFormSchema),
      defaultValues: {
        nome: "",
        idade: undefined,
        altura_cm: undefined,
        peso_kg: undefined,
        sexo: undefined,
        nivel_atividade: undefined,
        objetivo: undefined,
      },
  })
  return (
    <div className='min-h-screen flex items-center justify-center pl-4'>
      <Card className='w-full max-w-2xl border-0' >
            <div className='p-8'>
                <div className='text-center mb-8'>
                    <div className='flex items-center justify-center mb-4 mx-auto ' >
                        <Utensils className='w-14 h-14 text-green-500'/>
                    </div>
                    <h1 className='text-3xl font-bold text-green-500 mb-2'>Calcule sua dieta</h1>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} 
                        className='space-y-4'
                    >
                        <div>
                            <h3>Dados Pessoais</h3>
                        </div>
                        { /** CAMPO NOME E IDADE */ }
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <FormField
                                control={form.control}
                                name='nome'
                                render ={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl >
                                            <Input 
                                                {...field}
                                                placeholder='Digite seu nome..'
                                            />
                                        </FormControl>
                                    </FormItem>  
                                )}
                            />

                             <FormField
                                control={form.control}
                                name='idade'
                                render ={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Idade</FormLabel>
                                        <FormControl >
                                            <Input 
                                                 type='number'
                                                 step="any"
                                                {...form.register("idade", { 
                                                   setValueAs: (value) => value ==="" ? undefined : Number(value)
                                                })}
                                                placeholder='Ex: 28'
                                            
                                            />
                                        </FormControl>
                                    </FormItem>  
                                )}
                            />
                        </div>
                         { /** CAMPO SEXO E PESO E ALTURA */ }
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                             <FormField
                                control={form.control}
                                name='peso_kg'
                                render ={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Peso em kg</FormLabel>
                                        <FormControl >
                                            <Input 
                                                 type='number'
                                                 step="any"
                                                {...form.register("peso_kg", { 
                                                   setValueAs: (value) => value ==="" ? undefined : parseFloat(value)
                                                })}
                                                placeholder='Ex: 75'
                                            />
                                        </FormControl>
                                    </FormItem>   
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='altura_cm'
                                render ={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Altura em cm</FormLabel>
                                        <FormControl >
                                            <Input 
                                                 type='number'
                                                 step="any"
                                                {...form.register("altura_cm", { 
                                                   setValueAs: (value) => value ==="" ? undefined : parseFloat(value)
                                                })}
                                                placeholder='Ex: 1.70'
                                            
                                            />
                                        </FormControl>
                                    </FormItem>  

                                    
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='sexo'
                                render ={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sexo</FormLabel>
                                        <Select 
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder='Selecione o sexo' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="masculino">Masculino</SelectItem>
                                                <SelectItem value="feminino">Feminino</SelectItem>
                                            </SelectContent>
                                                

                                        </Select>
                                    </FormItem>  

                                    
                                )}
                            />
                        </div>
                        { /** CAMPO ATIVIDADE E OBJETIVO */ }
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <FormField
                                control={form.control}
                                name='nivel_atividade'
                                render ={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nivel de atividade</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder='Selecione o nivel de atividade' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="sedentario">Sedentario</SelectItem>
                                                <SelectItem value="2x_semana">2x por semana</SelectItem>
                                                 <SelectItem value="4x_semana">4x por semana</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>    
                                )}
                            />
                             <FormField
                                control={form.control}
                                name='objetivo'
                                render ={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Objetivo</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder='Selecione o objetivo' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="perda_de_peso">Perda de peso</SelectItem>
                                                <SelectItem value="hipertrofia">Hipertrofia</SelectItem>
                                                 <SelectItem value="manter_massa_muscular">Manter massa muscular</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>    
                                )}
                            />
                        </div>

                        <Button className='w-full mt-4 hover:bg-green-600 opacity-90 cursor-pointer'>
                            Gerar Dieta
                        </Button>
                    </form>
                </Form>
            </div>
      </Card>
    </div>
  )
}