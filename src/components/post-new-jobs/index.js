"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CommonForm from "../commonform";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";

const PostNewJobs = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState(initialPostNewJobFormData);
  return (
    <div>
      <Button
        onClick={() => {
          console.log("openend");
          setShowDialog(true);
        }}
        className="disabled:opacity-60 flex h-11 justify-center items-center px-5 mt-4 cursor-pointer"
      >
        Post a Job
      </Button>
      <Dialog
        open={showDialog}
        onOpenChange={() => {
          console.log("onopenopendnas");
          setShowDialog(false);
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
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostNewJobs;
