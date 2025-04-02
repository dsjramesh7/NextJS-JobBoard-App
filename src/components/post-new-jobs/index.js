"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CommonForm from "../commonform";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import { postNewJobAction } from "@/actions";

const PostNewJobs = ({ user, profileInfo }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    ...initialPostNewJobFormData,
    companyName: profileInfo?.recruiterInfo?.companyName,
  });
  // console.log("Form Data Debug:", formData);

  const handleJobPostValid = () => {
    return Object.keys(formData).every(
      (control) => formData[control]?.trim() !== ""
    );
  };
  const createNewJob = async () => {
    await postNewJobAction(
      {
        ...formData,
        recruiterId: user?.id,
        applicant: [],
      },
      "/jobs"
    );
    setFormData({
      ...initialPostNewJobFormData,
      companyName: profileInfo?.recruiterInfo?.companyName,
    });
    setShowDialog(false);
  };

  return (
    <div>
      <Button
        onClick={() => {
          setShowDialog(true);
        }}
        className="disabled:opacity-60 flex h-11 justify-center items-center px-5 mt-4 cursor-pointer"
      >
        Post a Job
      </Button>
      <Dialog
        open={showDialog}
        onOpenChange={() => {
          setShowDialog(false);
          setFormData({
            ...initialPostNewJobFormData,
            companyName: profileInfo?.recruiterInfo?.companyName,
          });
        }}
      >
        <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
          <DialogHeader>
            <DialogTitle>Post New Job</DialogTitle>
            <div className="grid gap-4 py-4">
              <CommonForm
                buttonText={"Add"}
                formData={formData}
                setFormData={setFormData}
                formControls={postNewJobFormControls}
                isBtnDisabled={!handleJobPostValid()}
                action={createNewJob}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostNewJobs;
