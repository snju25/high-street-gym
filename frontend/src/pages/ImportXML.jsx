import { useRef, useState } from "react";
import {useSelector} from "react-redux"
import customFetch from "../utils/axios/axios"
import {toast} from "react-toastify"
const ImportXML =  ({ onUploadSuccess, uploadURL, disabled = false })  => {
  const user = useSelector(state => state.userState.user)
  const [status, setStatus] = useState("")
  const uploadInputRef = useRef(null)

  const uploadFile = async(e) =>{
    e.preventDefault()

    // use fetch to submit file data
    const file = uploadInputRef.current.files[0]

    // fetch needs multipart form data which includes the file we want to upload.
    const formData = new FormData()
    formData.append("xml-file", file)

    // we have the form data object with the file inside, 
    // now we need to use fetch to send it to the backend
    try{
      const response = await customFetch.post(uploadURL,formData, {
        headers: {
          'X-AUTH-KEY': user.authenticationKey
        }
      })
      toast.success(response.data.message || "Successfully added")
      setStatus(response.data.message || "Successfully added")
      uploadInputRef.current.value = null

      if(typeof onUploadSuccess == "function"){
        onUploadSuccess()
      }

    }
    catch(error){
      toast.error(error?.response?.data?.message)
      setStatus(error?.response?.data?.message)
    }
   
  }

  return (
    <div>
      <form className="flex-gow m-4 max-w-2xl" onSubmit={uploadFile}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">XML File Import</span>
          </label>
          <div className="flex gap-2">
            <input
              ref={uploadInputRef}
              type="file"
              disabled = {disabled}
              className="file-input file-input-bordered file-input-primary"
            />
            <button className="btn btn-primary mr-2" disabled={disabled}>Upload</button>
          </div>
          <div className="label"> 
            <span className="label-text-alt">{status}</span>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ImportXML;
