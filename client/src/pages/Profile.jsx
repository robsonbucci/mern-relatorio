import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { app } from "../firebase";
import {
  updateSuperintendentFailure,
  updateSuperintendentStart,
  updateSuperintendentSuccess,
} from "../redux/user/userSlice.js";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = React.useRef(null);
  const [file, setFile] = React.useState(undefined);
  const [filePerc, setFilePerc] = React.useState(0);
  const [fileUploadError, setFileUploadError] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const [isSecretary, setIsSecretary] = React.useState(currentUser.isSecretary);
  const [privilege, setPrivilege] = React.useState(currentUser.privilege);
  const [updateSuccess, setUpdateSuccess] = React.useState(false);
  const dispatch = useDispatch();

  // firebase storage
  // allow read;
  //allow write: if
  //request.resource.size < 2 * 1024 * 1024 &&
  //request.resource.contentType.matches('imga/.*');

  React.useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      () => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      },
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

    const { id, checked, value } = e.target;
    let updatedFormData = { ...formData };

    if (["regular", "auxiliar", "publicador"].includes(id)) {
      setPrivilege(id);
      updatedFormData["privilege"] = id;
    } else if (id === "isSecretary") {
      setIsSecretary(checked);
      updatedFormData[id] = checked;
    } else if (!["regular", "auxiliar", "publicador", "phone"].includes(id)) {
      updatedFormData[id] = value.toString().toLowerCase().trim();
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateSuperintendentStart());
      const res = await fetch(
        `api/user/superintendent/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateSuperintendentFailure(data.message));
        return;
      }

      dispatch(updateSuperintendentSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateSuperintendentFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={({ target }) => setFile(target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center m-2"
          src={currentUser.avatar || formData.avatar}
          alt="profile"
        />
        <p className="self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Erro ao fazer upload (imagem maior que 2MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">carregando... {filePerc}%</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">
              Imagem carregada com sucesso!
            </span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />

        <fieldset className="flex flex-col gap-4 border p-3">
          <legend className="text-lg font-semibold">
            Selecione seu privilégio
          </legend>
          <div className="border p-3 text-center font-semibold flex flex-col items-baseline gap-4">
            <div className="flex gap-4">
              <label
                className="cursor-pointer text-slate-700"
                htmlFor="isSecretary"
              >
                Secretário
              </label>
              <input
                type="checkbox"
                className="border p-3 rounded-lg"
                id="isSecretary"
                onChange={handleChange}
                checked={isSecretary}
              />
            </div>
            <div className="flex gap-4">
              <label
                className="cursor-pointer text-slate-700"
                htmlFor="publicador"
              >
                Publicador
              </label>
              <input
                type="radio"
                className="border p-3 rounded-lg"
                id="publicador"
                name="privilege"
                onChange={handleChange}
                checked={privilege === "publicador"}
              />
            </div>

            <div className="flex gap-4">
              <label
                className="cursor-pointer text-slate-700"
                htmlFor="auxiliar"
              >
                Pioneiro Auxiliar
              </label>
              <input
                type="radio"
                className="border p-3 rounded-lg"
                id="auxiliar"
                name="privilege"
                onChange={handleChange}
                checked={privilege === "auxiliar"}
              />
            </div>

            <div className="flex gap-4">
              <label
                className="cursor-pointer text-slate-700"
                htmlFor="regular"
              >
                Pioneioro Regular
              </label>
              <input
                type="radio"
                className="border p-3 rounded-lg"
                id="regular"
                name="privilege"
                onChange={handleChange}
                checked={privilege === "regular"}
                maxLength={10}
              />
            </div>
          </div>
        </fieldset>

        <p className="text-red-700 mt-1 mx-auto"> {error ? error : ""}</p>
        <p className="text-green-700 mt-1 mx-auto">
          {updateSuccess ? "Atualizado com sucesso!" : ""}
        </p>
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
        >
          {loading ? "Carregando..." : "Atualizar"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Deletar conta</span>
        <span className="text-red-700 cursor-pointer">Sair</span>
      </div>
    </div>
  );
}
