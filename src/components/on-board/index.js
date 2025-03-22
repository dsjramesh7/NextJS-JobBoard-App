"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CommonForm from "../commonform";
import { recruiterOnboardFormControls } from "@/utils";

const OnBoard = () => {
  const [currentTab, setCurrentTab] = useState("candidate");
  function handleTabChange(value) {
    setCurrentTab(value);
  }
  return (
    <div className="bg-white">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="w-full">
          <div className="flex items-baseline justify-between border-b pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Welcome to onboarding
            </h1>
            <TabsList>
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="candidate">Candidate</TabsContent>
          <TabsContent value="recruiter">
            <CommonForm formControls={recruiterOnboardFormControls} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default OnBoard;
