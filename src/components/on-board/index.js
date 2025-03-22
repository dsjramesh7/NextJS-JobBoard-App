"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CommonForm from "../commonform";
import {
  candidateOnboardFormControls,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnboardFormControls,
} from "@/utils";
import { useUser } from "@clerk/nextjs";

const OnBoard = () => {
  const [currentTab, setCurrentTab] = useState("candidate");
  const [recruiterFormData, setRecuriterFormData] = useState(
    initialRecruiterFormData
  );
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );
  function handleTabChange(value) {
    setCurrentTab(value);
  }
  const recuriterFormDataValid = () => {
    return Object.keys(recruiterFormData).every(
      (key) => recruiterFormData[key].trim() !== ""
    );
  };

  const currentAuthUser = useUser();
  console.log(currentAuthUser);

  const createProfileActionHere = async () => {};
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
          <TabsContent value="candidate">
            <CommonForm
              formControls={candidateOnboardFormControls}
              buttonText={"Onboard as candidate"}
              formData={candidateFormData}
              setFormData={setCandidateFormData}
            />
          </TabsContent>
          <TabsContent value="recruiter">
            <CommonForm
              formControls={recruiterOnboardFormControls}
              buttonText={"Onboard as recruiter"}
              formData={recruiterFormData}
              setFormData={setRecuriterFormData}
              isBtnDisabled={!recuriterFormDataValid()}
              action={createProfileActionHere}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default OnBoard;
