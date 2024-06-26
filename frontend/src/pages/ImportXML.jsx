import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import customFetch from "../utils/axios/axios";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

export const loader = (store) => async () => {
  const user = store.getState().userState.user;

  try {
    const response = await customFetch("/activity", {
      headers: {
        "X-AUTH-KEY": user?.authenticationKey,
      },
    });

    const userData = await customFetch("/AllUsers", {
      headers: {
        "X-AUTH-KEY": user?.authenticationKey,
      },
    });

    return {
      activities: response.data.allActivities,
      trainersAndManagers: userData.data.users,
    };
  } catch (err) {
    toast.error("You must login first");
    return redirect("/login");
  }
};

const ImportXML = ({ onUploadSuccess, uploadURL, disabled = false }) => {
  const user = useSelector((state) => state.userState.user);
  const { activities, trainersAndManagers } = useLoaderData();

  const [userStatus, setUserStatus] = useState("");
  const [classStatus, setClassStatus] = useState("");
  const uploadInputRef1 = useRef(null); // Ref for the first form
  const uploadInputRef2 = useRef(null); // Ref for the second form

  const [emailExist, setEmailExist] = useState([]);
  const [classAlreadyExist, setClassAlreadyExist] = useState([]);

  const uploadFile = async (e) => {
    e.preventDefault();
    const file = uploadInputRef1.current.files[0];
    const formData = new FormData();
    formData.append("xml-file", file);
    try {
      const response = await customFetch.post(uploadURL + "/user", formData, {
        headers: {
          "X-AUTH-KEY": user.authenticationKey,
        },
      });
      const emailAlreadyExist = response.data.emailThatExist;
      setEmailExist(emailAlreadyExist);
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
      const response = await customFetch.post(
        "/classes" + uploadURL + "/class",
        formData,
        {
          headers: {
            "X-AUTH-KEY": user.authenticationKey,
          },
        }
      );
      const classesAlreadyExist = response.data.classesAlreadyExist;
      setClassAlreadyExist(classesAlreadyExist);
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

  const newClassXML = 'http://localhost:5173/newClass.xml'
  const newUserXML = 'http://localhost:5173/newUser.xml'

  function downloadFileURL (url) {
    const fileName = url.split("/").pop()
    const aTag = document.createElement('a')
    aTag.href= url
    aTag.setAttribute('download',fileName)
    document.body.appendChild(aTag)
    aTag.click()
    aTag.remove()
  } 

  return (
    <>
      <div>
        <form className="flex-gow m-4 max-w-2xl" onSubmit={uploadFile}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">New Member XML File Import</span>
            </label>
            <div className="flex flex-col md:flex-row gap-2">
              <input
                ref={uploadInputRef1}
                type="file"
                disabled={disabled}
                className="file-input file-input-bordered file-input-primary"
              />
              <button className="btn btn-primary mr-2" disabled={disabled}>
                Upload
              </button>
            </div>
            <div className="label">
              <span className="label-text-alt">{userStatus}</span>
            </div>
          </div>
          {emailExist.length > 0 &&
            emailExist.map((email, index) => {
              return (
                <div key={index}>
                  <p className="text-red-500">
                    Email Already Exist : {email[0]?.user_email}
                  </p>
                </div>
              );
            })}
        </form>
      </div>
      <div>
        <form className="flex-gow m-4 max-w-2xl" onSubmit={classUploadFile}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">New Classes XML File Import</span>
            </label>
            <div className="flex flex-col md:flex-row gap-2">
              <input
                ref={uploadInputRef2}
                type="file"
                disabled={disabled}
                className="file-input file-input-bordered file-input-primary"
              />
              <button className="btn btn-primary mr-2" disabled={disabled}>
                Upload
              </button>
            </div>
            <div className="label">
              <span className="label-text-alt">{classStatus}</span>
            </div>
          </div>
          {classAlreadyExist.length > 0 && (
            <>
              <p>
                These are 0 based index check XML file at these index, those
                classes already Exist in database
              </p>
              {classAlreadyExist.map((clazz, index) => {
                return (
                  <div key={index}>
                    <p className="text-red-500">
                      Class at Index {clazz.index}:[ Date: {clazz.date}, Time:{" "}
                      {clazz.time}, activity_id: {clazz.activity_id}, room:{" "}
                      {clazz.room_number} ]
                    </p>
                  </div>
                );
              })}
            </>
          )}
        </form>
      </div>

      <div className="flex gap-3 mb-5">
        <button onClick={() => {downloadFileURL(newUserXML)}} className="btn ">Download newMember.xml</button>
        <button onClick={() => {downloadFileURL(newClassXML)}} className="btn">Download newMember.xml</button>
      </div>

      <div className="overflow-x-auto">
        
        <table className="table table-zebra">
        <caption className="bg-neutral-200 p-2 text-xl">Foreign Key Associated with Users </caption> 
          {/* head */}
          <thead>
            <tr>
              <th>Foreign Key</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {trainersAndManagers.map(user => {
              return <tr key={user.id}>
              <th>{user.id}</th>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
            </tr>
            })}
          </tbody>
        </table>

        <table className="table table-zebra mt-5">
            <caption  className="bg-neutral-200 p-2 text-xl">Foreign Key Associated with Activity  </caption>
          <thead>
            <tr>
              <th>Foreign Key</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => {
              return <tr key={activity.id}>
              <th>{activity.id}</th>
              <td>{activity.activityName}</td>
            </tr>
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ImportXML;
