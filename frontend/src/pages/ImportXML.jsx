import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import customFetch from "../utils/axios/axios";
import { toast } from "react-toastify";

const ImportXML = ({ onUploadSuccess, uploadURL, disabled = false }) => {
  const user = useSelector((state) => state.userState.user);
  const [userStatus, setUserStatus] = useState("");
  const [classStatus, setClassStatus] = useState("");
  const uploadInputRef1 = useRef(null); // Ref for the first form
  const uploadInputRef2 = useRef(null); // Ref for the second form

  const uploadFile = async (e) => {
    e.preventDefault();
    const file = uploadInputRef1.current.files[0];
    const formData = new FormData();
    formData.append("xml-file", file);
    try {
      const response = await customFetch.post(uploadURL + "/user", formData, {
        headers: {
          'X-AUTH-KEY': user.authenticationKey
        }
      });
      toast.success(response.data.message || "Successfully added");
      setStatus(response.data.message || "Successfully added");
      uploadInputRef1.current.value = null;
      if (typeof onUploadSuccess === "function") {
        onUploadSuccess();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setUserStatus(error?.response?.data?.message);
    }
  };

  const classUploadFile = async (e) => {
    e.preventDefault();
    const file = uploadInputRef2.current.files[0];
    const formData = new FormData();
    formData.append("xml-file", file);
    try {
      const response = await customFetch.post("/classes" + uploadURL + "/class", formData, {
        headers: {
          'X-AUTH-KEY': user.authenticationKey
        }
      });
      toast.success(response.data.message || "Successfully added");
      setStatus(response.data.message || "Successfully added");
      uploadInputRef2.current.value = null;
      if (typeof onUploadSuccess === "function") {
        onUploadSuccess();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setClassStatus(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div>
        <form className="flex-gow m-4 max-w-2xl" onSubmit={uploadFile}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">New Member XML File Import</span>
            </label>
            <div className="flex gap-2">
              <input
                ref={uploadInputRef1}
                type="file"
                disabled={disabled}
                className="file-input file-input-bordered file-input-primary"
              />
              <button className="btn btn-primary mr-2" disabled={disabled}>Upload</button>
            </div>
            <div className="label">
              <span className="label-text-alt">{userStatus}</span>
            </div>
          </div>
        </form>
      </div>
      <div>
        <form className="flex-gow m-4 max-w-2xl" onSubmit={classUploadFile}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">New Classes XML File Import</span>
            </label>
            <div className="flex gap-2">
              <input
                ref={uploadInputRef2}
                type="file"
                disabled={disabled}
                className="file-input file-input-bordered file-input-primary"
              />
              <button className="btn btn-primary mr-2" disabled={disabled}>Upload</button>
            </div>
            <div className="label">
              <span className="label-text-alt">{classStatus}</span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ImportXML;
