"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import CommonForm from "../commonform";
import {
  candidateOnboardFormControls,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnboardFormControls,
} from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfileAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";
import { API_KEY, SUPABASE_URL } from "@/utils/constants";

const supaBaseClient = createClient(`${SUPABASE_URL}`, `${API_KEY}`);
const OnBoard = () => {
  const [currentTab, setCurrentTab] = useState("candidate");
  const [recruiterFormData, setRecuriterFormData] = useState(
    initialRecruiterFormData
  );
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );
  const [file, setFile] = useState(null);
  function handleTabChange(value) {
    setCurrentTab(value);
  }

  // for validation
  const recuriterFormDataValid = () => {
    return Object.keys(recruiterFormData).every(
      (key) => recruiterFormData[key].trim() !== ""
    );
  };

  const candidateFormDataValid = () => {
    return Object.keys(candidateFormData).every(
      (key) => candidateFormData[key].trim() !== ""
    );
  };

  const currentAuthUser = useUser();
  const { user } = currentAuthUser;
  // console.log(user);

  const createProfileActionHere = async () => {
    const data =
      currentTab === "candidate"
        ? {
            candidateInfo: candidateFormData,
            role: "candidate",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          }
        : {
            recruiterInfo: recruiterFormData,
            role: "recruiter",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          };

    await createProfileAction(data, "/onboard");
  };

  function handleFileChange(event) {
    event.preventDefault();
    setFile(event.target.files[0]);
  }

  const handleFileUploadToSupabase = async () => {
    const { data, error } = await supaBaseClient.storage
      .from("job-board")
      .upload(`/public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    console.log(data, error);
    if (data) {
      setCandidateFormData({
        ...candidateFormData,
        resume: data.path,
      });
    }
  };

  useEffect(() => {
    if (file) handleFileUploadToSupabase();
  }, [file]);
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
              action={createProfileActionHere}
              formControls={candidateOnboardFormControls}
              buttonText={"Onboard as candidate"}
              formData={candidateFormData}
              setFormData={setCandidateFormData}
              handleFileChange={handleFileChange}
              isBtnDisabled={!candidateFormDataValid()}
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
