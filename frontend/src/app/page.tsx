"use client";
import { DietData } from '@/types/diet-data.type';
import { useState } from 'react';
import { DietForm } from "./_components/diet-form";
import { DietGenerator } from './_components/diet-generator';


export default function Home() {
  const [data, setData] = useState<DietData | null>(null);

  function handleFormSubmit(userInfo: DietData) {
   
    setData(userInfo);
  }
  return (
    <>
      { !data ? (
           <DietForm onSubmit={handleFormSubmit} />
      ):(
        <DietGenerator data={data}/>
      )}
    </>
  );
}
